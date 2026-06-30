import { useState } from 'react';
import { FormulaEditor } from './FormulaEditor';

const FONT = "'IBM Plex Sans Arabic', system-ui, sans-serif";

export default {
  title: 'Components/FormulaEditor',
  component: FormulaEditor,
  parameters: { layout: 'padded' },
  tags: [],
};

/* ── Shared section label — matches Tags / TextInput pattern ── */
const sectionLabel = {
  margin: '0 0 12px',
  fontFamily: FONT,
  fontSize: 11,
  fontWeight: 600,
  color: '#6C7C96',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

/* ── Token factory for pre-built defaultTokens ── */
const uid = () => Math.random().toString(36).slice(2, 9);
const t   = (value, variant) => ({ id: uid(), value, variant });

/* ════════════════════════════════════════════════════════════════════
   Playground
   ════════════════════════════════════════════════════════════════════ */
export const Playground = {
  name: 'Playground — Formula Editor',
  argTypes: {
    label:     { control: 'text' },
    showLabel: { control: 'boolean' },
  },
  args: {
    label:     'Formula',
    showLabel: true,
  },
  render: (args) => (
    <div style={{ fontFamily: FONT, padding: 32, maxWidth: 720 }}>
      <FormulaEditor {...args} />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Default — empty state
   ════════════════════════════════════════════════════════════════════ */
export const Default = {
  name: 'Default — Empty',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, maxWidth: 720 }}>
      <p style={sectionLabel}>Empty formula box</p>
      <FormulaEditor label="Formula" />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Function Tokens — each function expands into multiple tokens
   ════════════════════════════════════════════════════════════════════ */
export const FunctionTokens = {
  name: 'Function Tokens',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 720 }}>
      <div>
        <p style={sectionLabel}>SUM — single parameter</p>
        <FormulaEditor
          label="Formula"
          defaultTokens={[
            t('SUM', 'function'), t('(', 'syntax'), t('values', 'param'), t(')', 'syntax'),
          ]}
        />
      </div>

      <div>
        <p style={sectionLabel}>ROUND — two parameters</p>
        <FormulaEditor
          label="Formula"
          defaultTokens={[
            t('ROUND', 'function'), t('(', 'syntax'), t('value', 'param'),
            t(',', 'syntax'), t('decimals', 'param'), t(')', 'syntax'),
          ]}
        />
      </div>

      <div>
        <p style={sectionLabel}>IF — three parameters</p>
        <FormulaEditor
          label="Formula"
          defaultTokens={[
            t('IF', 'function'), t('(', 'syntax'), t('condition', 'param'),
            t(',', 'syntax'), t('trueValue', 'param'),
            t(',', 'syntax'), t('falseValue', 'param'), t(')', 'syntax'),
          ]}
        />
      </div>

      <div>
        <p style={sectionLabel}>CHILD — wildcard + dot + parameter</p>
        <FormulaEditor
          label="Formula"
          defaultTokens={[
            t('CHILD', 'function'), t('(', 'syntax'), t('*', 'wildcard'),
            t('.', 'syntax'), t('propertyKey', 'param'), t(')', 'syntax'),
          ]}
        />
      </div>

      <div>
        <p style={sectionLabel}>COUNT_IF — two parameters</p>
        <FormulaEditor
          label="Formula"
          defaultTokens={[
            t('COUNT_IF', 'function'), t('(', 'syntax'), t('values', 'param'),
            t(',', 'syntax'), t('condition', 'param'), t(')', 'syntax'),
          ]}
        />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Property Tokens
   ════════════════════════════════════════════════════════════════════ */
export const PropertyTokens = {
  name: 'Property Tokens',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 720 }}>
      <div>
        <p style={sectionLabel}>Single property</p>
        <FormulaEditor
          label="Formula"
          defaultTokens={[t('PlannedCost', 'property')]}
        />
      </div>

      <div>
        <p style={sectionLabel}>Property comparison</p>
        <FormulaEditor
          label="Formula"
          defaultTokens={[
            t('ActualCost', 'property'),
            t('>', 'operation'),
            t('Budget', 'property'),
          ]}
        />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   All Token Types — every variant in one formula box
   ════════════════════════════════════════════════════════════════════ */
export const AllTokenTypes = {
  name: 'All Token Types',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, maxWidth: 720 }}>
      <p style={sectionLabel}>All 7 variants — function · param · property · operation · syntax · wildcard · custom</p>
      <FormulaEditor
        label="Formula"
        defaultTokens={[
          t('COUNT_IF', 'function'),
          t('(', 'syntax'),
          t('CHILD', 'function'),
          t('(', 'syntax'),
          t('*', 'wildcard'),
          t('.', 'syntax'),
          t('Status', 'property'),
          t(')', 'syntax'),
          t(',', 'syntax'),
          t('Status', 'property'),
          t('==', 'operation'),
          t('"Done"', 'custom'),
          t(')', 'syntax'),
        ]}
      />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Mixed Formula — realistic multi-line formula
   ════════════════════════════════════════════════════════════════════ */
export const MixedFormula = {
  name: 'Mixed Formula',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 720 }}>
      <div>
        <p style={sectionLabel}>Budget rollup — SUM of children</p>
        <FormulaEditor
          label="Budget Rollup"
          defaultTokens={[
            t('SUM', 'function'), t('(', 'syntax'),
            t('CHILD', 'function'), t('(', 'syntax'), t('*', 'wildcard'), t('.', 'syntax'), t('Budget', 'property'), t(')', 'syntax'),
            t(')', 'syntax'),
          ]}
        />
      </div>

      <div>
        <p style={sectionLabel}>Conditional cost — IF with comparison</p>
        <FormulaEditor
          label="Conditional Cost"
          defaultTokens={[
            t('IF', 'function'), t('(', 'syntax'),
            t('ActualCost', 'property'), t('>', 'operation'), t('PlannedCost', 'property'),
            t(',', 'syntax'),
            t('ActualCost', 'property'),
            t(',', 'syntax'),
            t('PlannedCost', 'property'),
            t(')', 'syntax'),
          ]}
        />
      </div>

      <div>
        <p style={sectionLabel}>Done task count</p>
        <FormulaEditor
          label="Done Count"
          defaultTokens={[
            t('COUNT_IF', 'function'), t('(', 'syntax'),
            t('CHILD', 'function'), t('(', 'syntax'), t('*', 'wildcard'), t('.', 'syntax'), t('Status', 'property'), t(')', 'syntax'),
            t(',', 'syntax'),
            t('Status', 'property'), t('==', 'operation'), t('"Done"', 'custom'),
            t(')', 'syntax'),
          ]}
        />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Multi-row — tokens wrap across lines (demonstrates row numbers)
   ════════════════════════════════════════════════════════════════════ */
export const MultiRow = {
  name: 'Multi-row — Line Numbers',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, maxWidth: 560 }}>
      <p style={sectionLabel}>Narrow container — tokens wrap across rows</p>
      <FormulaEditor
        label="Complex Formula"
        defaultTokens={[
          t('IF', 'function'), t('(', 'syntax'),
          t('AND', 'function'), t('(', 'syntax'),
          t('Budget', 'property'), t('>', 'operation'), t('0', 'custom'),
          t(',', 'syntax'),
          t('Status', 'property'), t('!=', 'operation'), t('"Closed"', 'custom'),
          t(')', 'syntax'),
          t(',', 'syntax'),
          t('ROUND', 'function'), t('(', 'syntax'),
          t('ActualCost', 'property'), t('/', 'operation'), t('Budget', 'property'),
          t(',', 'syntax'), t('2', 'custom'), t(')', 'syntax'),
          t(',', 'syntax'), t('0', 'custom'),
          t(')', 'syntax'),
        ]}
      />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   No Label
   ════════════════════════════════════════════════════════════════════ */
export const NoLabel = {
  name: 'No Label',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, maxWidth: 720 }}>
      <p style={sectionLabel}>showLabel={'{false}'}</p>
      <FormulaEditor showLabel={false} />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   In a Card
   ════════════════════════════════════════════════════════════════════ */
export const InCard = {
  name: 'In a Card',
  render: () => {
    const [formula, setFormula] = useState('');
    return (
      <div style={{ fontFamily: FONT, padding: 32 }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          padding: 24,
          maxWidth: 720,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600, color: '#000b36', fontFamily: FONT }}>
              Edit Column Formula
            </h3>
            <p style={{ margin: 0, fontSize: 13, color: '#6c7c96', fontFamily: FONT, lineHeight: '20px' }}>
              Build a formula using the helper. Click any item to add it.
            </p>
          </div>
          <FormulaEditor label="Formula" onChange={(f) => setFormula(f)} />
          {formula && (
            <div style={{ padding: '6px 10px', background: '#f0f9ff', borderRadius: 4, border: '1px solid #bae6fd' }}>
              <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#0369a1' }}>{formula}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button style={{ height: 32, padding: '0 12px', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 4, fontSize: 13, fontFamily: FONT, cursor: 'pointer', color: '#000b36' }}>
              Cancel
            </button>
            <button style={{ height: 32, padding: '0 16px', background: '#1849a9', border: 'none', borderRadius: 4, fontSize: 13, fontFamily: FONT, cursor: 'pointer', color: '#ffffff', fontWeight: 500 }}>
              Apply Formula
            </button>
          </div>
        </div>
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   onChange Callback
   ════════════════════════════════════════════════════════════════════ */
export const WithCallback = {
  name: 'With onChange Callback',
  render: () => {
    const [formula, setFormula] = useState('');
    const [count,   setCount]   = useState(0);
    return (
      <div style={{ fontFamily: FONT, padding: 32, maxWidth: 720 }}>
        <p style={sectionLabel}>Live formula string from onChange(formula, tokens)</p>
        <FormulaEditor
          label="Formula"
          onChange={(f, toks) => { setFormula(f); setCount(toks.length); }}
        />
        <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
          <div style={{ flex: 1, padding: '8px 12px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 4 }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.04em' }}>Formula string</p>
            <p style={{ margin: '4px 0 0', fontFamily: 'monospace', fontSize: 13, color: '#1849a9', wordBreak: 'break-all' }}>{formula || '—'}</p>
          </div>
          <div style={{ padding: '8px 12px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 4, minWidth: 100 }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.04em' }}>Tokens</p>
            <p style={{ margin: '4px 0 0', fontFamily: 'monospace', fontSize: 20, fontWeight: 700, color: '#000b36' }}>{count}</p>
          </div>
        </div>
      </div>
    );
  },
};
