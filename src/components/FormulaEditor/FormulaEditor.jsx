import { useState, useCallback, useLayoutEffect, useRef } from 'react';
import styles from './FormulaEditor.module.css';

/* ══════════════════════════════════════════════════════════════════
   Data
   ══════════════════════════════════════════════════════════════════ */

const FUNCTION_GROUPS = {
  Math:        ['SUM', 'AVERAGE', 'MIN', 'MAX', 'ROUND'],
  Logical:     ['IF', 'OR', 'AND', 'COALESCE'],
  Hierarchy:   ['CHILD', 'PARENT'],
  Aggregation: ['COUNT', 'COUNT_IF'],
};

const PROPERTY_LIST = [
  'PlannedCost', 'ActualCost', 'Budget', 'Status', 'EndDate',
  'Duration', 'Priority', 'Owner', 'Category', 'Risk', 'Score',
];

const OPERATION_GROUPS = {
  Arithmetic: ['+', '-', '*', '/'],
  Comparison: ['==', '!=', '>', '<', '>=', '<='],
  Logical:    ['&&', '||'],
};

const FUNCTION_EXPANSIONS = {
  SUM:      [['SUM','function'], ['(','syntax'], ['values','param'], [')','syntax']],
  AVERAGE:  [['AVERAGE','function'], ['(','syntax'], ['values','param'], [')','syntax']],
  MIN:      [['MIN','function'], ['(','syntax'], ['values','param'], [')','syntax']],
  MAX:      [['MAX','function'], ['(','syntax'], ['values','param'], [')','syntax']],
  ROUND:    [['ROUND','function'], ['(','syntax'], ['value','param'], [',','syntax'], ['decimals','param'], [')','syntax']],
  IF:       [['IF','function'], ['(','syntax'], ['condition','param'], [',','syntax'], ['trueValue','param'], [',','syntax'], ['falseValue','param'], [')','syntax']],
  OR:       [['OR','function'], ['(','syntax'], ['condition1','param'], [',','syntax'], ['condition2','param'], [')','syntax']],
  AND:      [['AND','function'], ['(','syntax'], ['condition1','param'], [',','syntax'], ['condition2','param'], [')','syntax']],
  COALESCE: [['COALESCE','function'], ['(','syntax'], ['value1','param'], [',','syntax'], ['value2','param'], [')','syntax']],
  CHILD:    [['CHILD','function'], ['(','syntax'], ['*','wildcard'], ['.','syntax'], ['propertyKey','param'], [')','syntax']],
  PARENT:   [['PARENT','function'], ['(','syntax'], ['propertyKey','param'], [')','syntax']],
  COUNT:    [['COUNT','function'], ['(','syntax'], ['values','param'], [')','syntax']],
  COUNT_IF: [['COUNT_IF','function'], ['(','syntax'], ['values','param'], [',','syntax'], ['condition','param'], [')','syntax']],
};

const FUNCTION_META = {
  SUM: {
    signature:   'SUM(values)',
    description: 'Calculates the sum of all values',
    returnType:  'number',
    parameters:  [{ name: 'values', type: 'array', description: 'Values to sum' }],
    examples:    ['SUM(CHILDREN(*.Cost))'],
  },
  AVERAGE: {
    signature:   'AVERAGE(values)',
    description: 'Calculates the average of all values',
    returnType:  'number',
    parameters:  [{ name: 'values', type: 'array', description: 'Values to average' }],
    examples:    ['AVERAGE(CHILDREN(*.Score))'],
  },
  MIN: {
    signature:   'MIN(values)',
    description: 'Returns the minimum value from a set',
    returnType:  'number',
    parameters:  [{ name: 'values', type: 'array', description: 'Values to check' }],
    examples:    ['MIN(CHILDREN(*.Cost))'],
  },
  MAX: {
    signature:   'MAX(values)',
    description: 'Returns the maximum value from a set',
    returnType:  'number',
    parameters:  [{ name: 'values', type: 'array', description: 'Values to check' }],
    examples:    ['MAX(CHILDREN(*.Budget))'],
  },
  ROUND: {
    signature:   'ROUND(value, decimals)',
    description: 'Rounds a number to the specified decimal places',
    returnType:  'number',
    parameters:  [
      { name: 'value',    type: 'number', description: 'The value to round' },
      { name: 'decimals', type: 'number', description: 'Number of decimal places' },
    ],
    examples: ['ROUND(PlannedCost, 2)'],
  },
  IF: {
    signature:   'IF(condition, trueValue, falseValue)',
    description: 'Returns one value if condition is true, another if false',
    returnType:  'any',
    parameters:  [
      { name: 'condition',  type: 'boolean', description: 'The condition to evaluate' },
      { name: 'trueValue',  type: 'any',     description: 'Value returned when true' },
      { name: 'falseValue', type: 'any',     description: 'Value returned when false' },
    ],
    examples: ['IF(Status == "Done", 1, 0)'],
  },
  OR: {
    signature:   'OR(condition1, condition2)',
    description: 'Returns true if any condition is true',
    returnType:  'boolean',
    parameters:  [
      { name: 'condition1', type: 'boolean', description: 'First condition to check' },
      { name: 'condition2', type: 'boolean', description: 'Second condition to check' },
    ],
    examples:    ['OR(Status == "Done", Status == "Closed")'],
  },
  AND: {
    signature:   'AND(condition1, condition2)',
    description: 'Returns true if all conditions are true',
    returnType:  'boolean',
    parameters:  [
      { name: 'condition1', type: 'boolean', description: 'First condition to check' },
      { name: 'condition2', type: 'boolean', description: 'Second condition to check' },
    ],
    examples:    ['AND(Budget > 0, Status != "Closed")'],
  },
  COALESCE: {
    signature:   'COALESCE(value1, value2)',
    description: 'Returns the first non-null value from the list',
    returnType:  'any',
    parameters:  [
      { name: 'value1', type: 'any', description: 'First value to check' },
      { name: 'value2', type: 'any', description: 'Fallback value' },
    ],
    examples:    ['COALESCE(ActualCost, PlannedCost)'],
  },
  CHILD: {
    signature:   'CHILD(*.propertyKey)',
    description: "Accesses a child record's field value",
    returnType:  'any',
    parameters:  [{ name: '*.propertyKey', type: 'string', description: 'Wildcard selector + field name on child records' }],
    examples:    ['CHILD(*.Cost)'],
  },
  PARENT: {
    signature:   'PARENT(propertyKey)',
    description: "Accesses the parent record's field value",
    returnType:  'any',
    parameters:  [{ name: 'propertyKey', type: 'string', description: 'Field name on the parent record' }],
    examples:    ['PARENT(Budget)'],
  },
  COUNT: {
    signature:   'COUNT(values)',
    description: 'Counts the number of items in a collection',
    returnType:  'number',
    parameters:  [{ name: 'values', type: 'array', description: 'The collection to count' }],
    examples:    ['COUNT(CHILDREN(*))'],
  },
  COUNT_IF: {
    signature:   'COUNT_IF(values, condition)',
    description: 'Counts items that satisfy a condition',
    returnType:  'number',
    parameters:  [
      { name: 'values',    type: 'array',   description: 'The collection to filter' },
      { name: 'condition', type: 'boolean', description: 'The condition each item must satisfy' },
    ],
    examples: ['COUNT_IF(CHILDREN(*), Status == "Done")'],
  },
};

const TOTAL_FUNCTIONS  = Object.values(FUNCTION_GROUPS).flat().length;
const TOTAL_PROPERTIES = PROPERTY_LIST.length;
const TOTAL_OPERATIONS = Object.values(OPERATION_GROUPS).flat().length;

/* ── Token factory ────────────────────────────────────────────────── */
const mkId = (() => { let n = 0; return () => `tok${++n}`; })();
function mkToken(value, variant) { return { id: mkId(), value, variant }; }
function expandFunction(name) {
  const spec = FUNCTION_EXPANSIONS[name];
  if (!spec) return [mkToken(name, 'function')];
  return spec.map(([value, variant]) => mkToken(value, variant));
}
function tokensToFormula(tokens) { return tokens.map(t => t.value).join(''); }

/* ── Nav match count helper ───────────────────────────────────────── */
function getNavMatchCount(navId, query) {
  if (!query) return Infinity;
  const q = query.toLowerCase();
  if (navId === 'functions')
    return Object.values(FUNCTION_GROUPS).flat().filter(fn => fn.toLowerCase().includes(q)).length;
  if (navId === 'properties')
    return PROPERTY_LIST.filter(p => p.toLowerCase().includes(q)).length;
  if (navId === 'operations')
    return Object.values(OPERATION_GROUPS).flat().filter(op => op.includes(query)).length;
  return 0;
}

/* ══════════════════════════════════════════════════════════════════
   SVG Icons
   ══════════════════════════════════════════════════════════════════ */

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FunctionsNavIcon({ color = '#6C7C96' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M5 3.5C5 3.5 4 3.5 3.5 4.5V11.5C3.5 12.5 4.5 12.5 4.5 12.5H5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 3.5C11 3.5 12 3.5 12.5 4.5V11.5C12.5 12.5 11.5 12.5 11.5 12.5H11" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 8h6" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PropertiesNavIcon({ color = '#6C7C96' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M2.5 4.5h11M2.5 8h8M2.5 11.5h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function OperationsNavIcon({ color = '#6C7C96' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M8 3v10M3 8h10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="4" cy="12" r="1" fill={color} />
      <circle cx="12" cy="12" r="1" fill={color} />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true" style={{ display: 'block' }}>
      <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Rich Function Tooltip
   ══════════════════════════════════════════════════════════════════ */

function FunctionRichTooltip({ meta, name, style }) {
  return (
    <div className={styles.richTooltip} style={style} role="tooltip" aria-label={`${name} documentation`}>
      <div className={styles.ttHeader}>
        <code className={styles.ttSignature}>{meta.signature}</code>
        <p className={styles.ttDescription}>{meta.description}</p>
      </div>
      <div className={styles.ttDivider} />
      <div className={styles.ttSection}>
        <div className={styles.ttSectionLabel}>RETURN</div>
        <span className={styles.ttTypeBadge}>{meta.returnType}</span>
      </div>
      <div className={styles.ttDivider} />
      <div className={styles.ttSection}>
        <div className={styles.ttSectionLabel}>PARAMETER</div>
        {meta.parameters.map((p, i) => (
          <div key={i} className={styles.ttParam}>
            <div className={styles.ttCodeBlock}>
              <span className={styles.ttParamName}>{p.name}</span>
              <span className={styles.ttParamType}>{p.type}</span>
            </div>
            <p className={styles.ttParamDesc}>{p.description}</p>
          </div>
        ))}
      </div>
      {meta.examples?.length > 0 && (
        <>
          <div className={styles.ttDivider} />
          <div className={styles.ttSection}>
            <div className={styles.ttSectionLabel}>EXAMPLES</div>
            {meta.examples.map((ex, i) => (
              <code key={i} className={styles.ttExample}>{ex}</code>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Helper panel clickable tags
   ══════════════════════════════════════════════════════════════════ */

function FunctionTag({ name, onInsert, onTooltipShow, onTooltipHide }) {
  const meta = FUNCTION_META[name];
  return (
    <button
      type="button"
      className={styles.functionTag}
      onClick={() => onInsert(name)}
      onMouseEnter={(e) => meta && onTooltipShow(name, meta, e.currentTarget.getBoundingClientRect())}
      onMouseLeave={onTooltipHide}
      onFocus={(e)   => meta && onTooltipShow(name, meta, e.currentTarget.getBoundingClientRect())}
      onBlur={onTooltipHide}
    >
      <span className={styles.funcPrefix} aria-hidden="true">f</span>
      <span>{name}</span>
    </button>
  );
}

function PropertyTag({ name, onInsert }) {
  return (
    <button type="button" className={styles.propertyTag} onClick={() => onInsert(name)}>
      {name}
    </button>
  );
}

function OperationTag({ symbol, onInsert }) {
  return (
    <button type="button" className={styles.operationTag} onClick={() => onInsert(symbol)}>
      {symbol}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Formula token — each item in the formula box
   ══════════════════════════════════════════════════════════════════ */

function FormulaToken({ token, onRemove }) {
  const isSyntax   = token.variant === 'syntax' || token.variant === 'wildcard';
  const isFunction = token.variant === 'function';

  const tokenCls = [
    styles.fToken,
    isSyntax                           && styles.fTokenSyntax,
    isFunction                         && styles.fTokenFunction,
    token.variant === 'param'          && styles.fTokenParam,
    token.variant === 'property'       && styles.fTokenProperty,
    token.variant === 'operation'      && styles.fTokenOperation,
    token.variant === 'wildcard'       && styles.fTokenWildcard,
    token.variant === 'custom'         && styles.fTokenCustom,
  ].filter(Boolean).join(' ');

  return (
    <div className={tokenCls} role="listitem" data-token-id={token.id}>
      {isFunction && <span className={styles.fTokenFPrefix} aria-hidden="true">f</span>}
      <span className={styles.fTokenValue}>{token.value}</span>
      <button
        type="button"
        className={styles.fTokenRemove}
        onClick={onRemove}
        aria-label={`Remove ${token.value}`}
        tabIndex={0}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Category group
   ══════════════════════════════════════════════════════════════════ */

function CategoryGroup({ title, children }) {
  return (
    <div className={styles.categoryGroup}>
      <h4 className={styles.categoryHeading}>{title}</h4>
      <div className={styles.categoryItems}>{children}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Content panels
   ══════════════════════════════════════════════════════════════════ */

function FunctionsContent({ search, onInsert, onTooltipShow, onTooltipHide }) {
  const groups = Object.entries(FUNCTION_GROUPS)
    .map(([cat, fns]) => ({
      cat,
      fns: search ? fns.filter(fn => fn.toLowerCase().includes(search.toLowerCase())) : fns,
    }))
    .filter(({ fns }) => fns.length > 0);

  if (!groups.length) return null;
  return (
    <>
      {groups.map(({ cat, fns }) => (
        <CategoryGroup key={cat} title={cat}>
          {fns.map(fn => (
            <FunctionTag
              key={fn}
              name={fn}
              onInsert={onInsert}
              onTooltipShow={onTooltipShow}
              onTooltipHide={onTooltipHide}
            />
          ))}
        </CategoryGroup>
      ))}
    </>
  );
}

function PropertiesContent({ search, onInsert }) {
  const props = search
    ? PROPERTY_LIST.filter(p => p.toLowerCase().includes(search.toLowerCase()))
    : PROPERTY_LIST;
  if (!props.length) return null;
  return (
    <CategoryGroup title="Properties">
      {props.map(p => <PropertyTag key={p} name={p} onInsert={onInsert} />)}
    </CategoryGroup>
  );
}

function OperationsContent({ search, onInsert }) {
  const groups = Object.entries(OPERATION_GROUPS)
    .map(([cat, ops]) => ({
      cat,
      ops: search ? ops.filter(op => op.includes(search)) : ops,
    }))
    .filter(({ ops }) => ops.length > 0);
  if (!groups.length) return null;
  return (
    <>
      {groups.map(({ cat, ops }) => (
        <CategoryGroup key={cat} title={cat}>
          {ops.map(op => <OperationTag key={op} symbol={op} onInsert={onInsert} />)}
        </CategoryGroup>
      ))}
    </>
  );
}

/* ── Empty search state ───────────────────────────────────────────── */

function EmptySearch({ query }) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIconWrap}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="12.5" cy="12.5" r="8" stroke="#D2D6DB" strokeWidth="2" />
          <path d="M19 19l5 5" stroke="#D2D6DB" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 10l5 5M15 10l-5 5" stroke="#D2D6DB" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <p className={styles.emptyTitle}>No results for "{query}"</p>
      <p className={styles.emptyBody}>Try a different function name, property, or operator.</p>
    </div>
  );
}

/* ── Nav config ───────────────────────────────────────────────────── */

const NAV_ITEMS = [
  { id: 'functions',  label: 'Functions',  count: TOTAL_FUNCTIONS,  Icon: FunctionsNavIcon  },
  { id: 'properties', label: 'Properties', count: TOTAL_PROPERTIES, Icon: PropertiesNavIcon },
  { id: 'operations', label: 'Operations', count: TOTAL_OPERATIONS, Icon: OperationsNavIcon },
];

/* ══════════════════════════════════════════════════════════════════
   FormulaEditor
   ══════════════════════════════════════════════════════════════════ */

export function FormulaEditor({
  label          = 'Formula',
  showLabel      = true,
  defaultTokens  = [],
  onChange,
  onTokensChange,
  className,
  style,
}) {
  const [tokens,      setTokens]      = useState(defaultTokens);
  const [search,      setSearch]      = useState('');
  const [activeNav,   setActiveNav]   = useState('functions');
  const [insertValue, setInsertValue] = useState('');
  const [tooltip,     setTooltip]     = useState(null);
  const [rowNumbers,  setRowNumbers]  = useState([{ top: 14, label: 1 }]);

  const tokensContainerRef = useRef(null);

  /* ── Measure token rows for line numbers ── */
  useLayoutEffect(() => {
    const container = tokensContainerRef.current;
    if (!container || tokens.length === 0) {
      setRowNumbers([{ top: 14, label: 1 }]);
      return;
    }
    const els = container.querySelectorAll('[data-token-id]');
    if (!els.length) {
      setRowNumbers([{ top: 14, label: 1 }]);
      return;
    }
    const seen = new Map();
    let idx = 0;
    els.forEach(el => {
      const top = el.offsetTop;
      if (!seen.has(top)) seen.set(top, { top, label: ++idx });
    });
    setRowNumbers(Array.from(seen.values()));
  }, [tokens]);

  /* ── Notify parent ── */
  const notify = useCallback((next) => {
    const formula = tokensToFormula(next);
    onChange?.(formula, next);
    onTokensChange?.(next);
  }, [onChange, onTokensChange]);

  /* ── Add tokens ── */
  const addTokens = useCallback((newTokens) => {
    setTokens(prev => {
      const next = [...prev, ...newTokens];
      notify(next);
      return next;
    });
  }, [notify]);

  const handleInsertFunction  = useCallback((name)   => addTokens(expandFunction(name)), [addTokens]);
  const handleInsertProperty  = useCallback((name)   => addTokens([mkToken(name, 'property')]), [addTokens]);
  const handleInsertOperation = useCallback((symbol) => addTokens([mkToken(symbol, 'operation')]), [addTokens]);
  const handleInsertCustom    = useCallback((text) => {
    if (!text.trim()) return;
    addTokens([mkToken(text.trim(), 'custom')]);
  }, [addTokens]);

  /* ── Remove / clear ── */
  const handleRemoveToken = useCallback((id) => {
    setTokens(prev => {
      const next = prev.filter(t => t.id !== id);
      notify(next);
      return next;
    });
  }, [notify]);

  const handleClearAll = useCallback(() => {
    setTokens([]);
    notify([]);
  }, [notify]);

  /* ── Tooltip ── */
  const handleTooltipShow = useCallback((name, meta, rect) => setTooltip({ name, meta, rect }), []);
  const handleTooltipHide = useCallback(() => setTooltip(null), []);

  /* ── Search + nav derived state ── */
  const hasSearch = search.trim().length > 0;
  const navMatchCounts = {
    functions:  getNavMatchCount('functions',  search),
    properties: getNavMatchCount('properties', search),
    operations: getNavMatchCount('operations', search),
  };

  /* Effective active nav: auto-picks first matching when active has 0 results */
  let effectiveActive = activeNav;
  if (hasSearch && navMatchCounts[activeNav] === 0) {
    const first = NAV_ITEMS.find(n => navMatchCounts[n.id] > 0);
    if (first) effectiveActive = first.id;
  }

  const hasAnyResults = NAV_ITEMS.some(n => navMatchCounts[n.id] > 0);
  const formula       = tokensToFormula(tokens);

  /* ── Tooltip position ── */
  let tooltipStyle = null;
  if (tooltip?.rect) {
    const W = 296, H = 260, gap = 8;
    const top  = tooltip.rect.top > H + gap
      ? tooltip.rect.top - H - gap
      : tooltip.rect.bottom + gap;
    const left = Math.min(
      Math.max(8, tooltip.rect.left),
      (typeof window !== 'undefined' ? window.innerWidth : 1200) - W - 8,
    );
    tooltipStyle = { top, left };
  }

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')} style={style}>

      {/* Component label */}
      {showLabel && (
        <div className={styles.labelRow}>
          <span className={styles.label}>{label}</span>
        </div>
      )}

      {/* ── Helper panel ── */}
      <div className={styles.helperPanel}>

        {/* Search bar + Insert field */}
        <div className={styles.searchBar}>
          <div className={styles.searchSection}>
            <span className={styles.searchIconWrap}><SearchIcon /></span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search functions, properties, operations…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search formula helper"
            />
            {search && (
              <button
                type="button"
                className={styles.clearSearch}
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
          <div className={styles.searchDivider} aria-hidden="true" />
          <div className={styles.insertSection}>
            <span className={styles.insertLabel}>Insert</span>
            <input
              type="text"
              className={styles.insertInput}
              placeholder="Any value…"
              value={insertValue}
              onChange={e => setInsertValue(e.target.value)}
              aria-label="Insert custom value into formula"
              onKeyDown={e => {
                if (e.key === 'Enter' && insertValue.trim()) {
                  e.preventDefault();
                  handleInsertCustom(insertValue);
                  setInsertValue('');
                }
              }}
            />
            <button
              type="button"
              className={styles.insertBtn}
              onClick={() => {
                if (insertValue.trim()) {
                  handleInsertCustom(insertValue);
                  setInsertValue('');
                }
              }}
              aria-label="Insert value"
              title="Press Enter or click to insert"
            >
              <PlusIcon />
            </button>
          </div>
        </div>

        {/* Panel body: left nav + right content */}
        <div className={styles.panelBody}>

          {/* Left nav — always visible; muted when no search results in that section */}
          <nav className={styles.leftNav} aria-label="Formula helper navigation">
            {NAV_ITEMS.map(({ id, label: navLabel, count, Icon }) => {
              const isActive = effectiveActive === id;
              const isMuted  = hasSearch && navMatchCounts[id] === 0;
              const iconColor = isMuted ? '#d2d6db' : (isActive ? '#1849a9' : '#6C7C96');
              const displayCount = hasSearch ? navMatchCounts[id] : count;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={isActive && !isMuted}
                  className={[
                    styles.navItem,
                    isActive && !isMuted && styles.navItemActive,
                    isMuted && styles.navItemMuted,
                  ].filter(Boolean).join(' ')}
                  onClick={() => { if (!isMuted) setActiveNav(id); }}
                >
                  <span className={styles.navIcon}><Icon color={iconColor} /></span>
                  <span className={styles.navLabel}>{navLabel}</span>
                  <span className={[
                    styles.navCount,
                    isActive && !isMuted && styles.navCountActive,
                    isMuted && styles.navCountMuted,
                  ].filter(Boolean).join(' ')}>
                    {displayCount}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right content */}
          <div className={styles.rightContent}>
            {hasSearch && !hasAnyResults ? (
              <EmptySearch query={search} />
            ) : (
              <>
                {effectiveActive === 'functions' && (
                  <FunctionsContent
                    search={search}
                    onInsert={handleInsertFunction}
                    onTooltipShow={handleTooltipShow}
                    onTooltipHide={handleTooltipHide}
                  />
                )}
                {effectiveActive === 'properties' && (
                  <PropertiesContent search={search} onInsert={handleInsertProperty} />
                )}
                {effectiveActive === 'operations' && (
                  <OperationsContent search={search} onInsert={handleInsertOperation} />
                )}
              </>
            )}
          </div>

        </div>
      </div>

      {/* ── Formula area label ── */}
      <div className={styles.formulaAreaLabel}>Formula Editor</div>

      {/* ── Formula box with row numbers ── */}
      <div className={styles.formulaBoxOuter}>
        {/* Row number gutter */}
        <div className={styles.lineGutter} aria-hidden="true">
          {rowNumbers.map(({ top, label: lineLabel }) => (
            <span key={lineLabel} className={styles.lineNumber} style={{ top }}>
              {lineLabel}
            </span>
          ))}
        </div>

        {/* Token display area */}
        <div
          className={styles.formulaBox}
          ref={tokensContainerRef}
          role="list"
          aria-label="Formula tokens"
        >
          {tokens.length === 0 ? (
            <span className={styles.formulaPlaceholder}>
              Click functions, properties, or operations above to build your formula…
            </span>
          ) : (
            tokens.map(token => (
              <FormulaToken
                key={token.id}
                token={token}
                onRemove={() => handleRemoveToken(token.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* ── Clear All + Token Count + Debug + JSON — visible once tokens exist ── */}
      {tokens.length > 0 && (
        <>
          <div className={styles.formulaActions}>
            <button
              type="button"
              className={styles.clearAllBtn}
              onClick={handleClearAll}
              aria-label="Clear all formula tokens"
            >
              Clear all
            </button>
          </div>
          <div className={styles.debugOutput}>
            <span className={styles.debugLabel}>Debug</span>
            <div
              className={styles.debugInput}
              role="textbox"
              aria-readonly="true"
              aria-label="Formula debug output"
            >
              {formula}
            </div>
          </div>
          <div className={styles.jsonOutput}>
            <div className={styles.jsonHeader}>
              <span className={styles.jsonLabel}>Token Count</span>
              <span className={styles.tokenCountValue}>{tokens.length}</span>
            </div>
            <pre className={styles.jsonPre} aria-label="Token JSON output">
              {JSON.stringify(tokens, null, 2)}
            </pre>
          </div>
        </>
      )}

      {/* Fixed-position rich tooltip */}
      {tooltip && tooltipStyle && (
        <FunctionRichTooltip
          name={tooltip.name}
          meta={tooltip.meta}
          style={{ position: 'fixed', zIndex: 9999, ...tooltipStyle }}
        />
      )}

    </div>
  );
}
