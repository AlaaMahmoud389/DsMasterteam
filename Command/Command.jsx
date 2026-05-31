import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Command.module.css';

// ─── Static local assets (node 4747:83322) ───────────────────────
import _searchIcon    from '../../assets/icons/search.svg';
import _helpIcon      from '../../assets/icons/help.svg';
import _userIcon      from '../../assets/icons/user.svg';
import _dotIcon       from '../../assets/icons/dot.svg';
import _arrowRightImg from '../../assets/icons/arrow-right.png';
import _arrowUpImg    from '../../assets/icons/arrow-up.svg';
import _arrowDownImg  from '../../assets/icons/arrow-down.svg';
import _enterImg      from '../../assets/icons/enter.svg';
import _arrowLeftImg  from '../../assets/icons/arrow-left.svg';
import _settingsImg   from '../../assets/icons/settings.svg';

const SEARCH_ICON          = _searchIcon;
const HELP_ICON            = _helpIcon;
export const AVATAR_SM_ICON = _userIcon;
export const AVATAR_MD_ICON = _userIcon;
export const DOT_IMG        = _dotIcon;
const ARROW_RIGHT_IMG       = _arrowRightImg;
const ARROW_UP_IMG          = _arrowUpImg;
const ARROW_DOWN_IMG        = _arrowDownImg;
const ENTER_IMG             = _enterImg;
const ARROW_LEFT_IMG        = _arrowLeftImg;
const SETTINGS_IMG          = _settingsImg;

// ─── CommandInput ──────────────────────────────────────────────────
// state       : 'placeholder' | 'filled' | 'focus'
// value       : controlled search string
// placeholder : input hint text (default 'Search')
// rtl         : boolean
// autoFocus   : boolean
// onSearch    : (value: string) => void
export function CommandInput({
  state = 'placeholder',
  value = '',
  placeholder = 'Search',
  rtl = false,
  autoFocus = false,
  onSearch,
  onKeyDown,
}) {
  const isFilled = state === 'filled' || value;
  const isFocus  = state === 'focus';

  return (
    <div
      className={[styles.input, isFocus && styles.inputFocus].filter(Boolean).join(' ')}
      dir={rtl ? 'rtl' : undefined}
    >
      {!rtl && <img src={SEARCH_ICON} alt="" className={styles.searchIcon} />}
      <input
        className={styles.inputField}
        style={{ color: isFilled ? '#000b36' : '#6c7c96' }}
        type="text"
        value={value}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChange={e => onSearch?.(e.target.value)}
        onKeyDown={onKeyDown}
        aria-label={placeholder}
        dir={rtl ? 'rtl' : undefined}
      />
      <img src={HELP_ICON} alt="Help" className={styles.helpIcon} />
      <div className={styles.inputShortcut}>
        <span className={styles.inputShortcutKey}>⌘/</span>
      </div>
      {rtl && <img src={SEARCH_ICON} alt="" className={styles.searchIcon} />}
    </div>
  );
}

// ─── CommandShortcut ───────────────────────────────────────────────
// Figma node 4807:133374 — all 4 dual variants:
//   dual='False'  → single key badge  (⌘C)
//   dual='True'   → two key badges with arrow (⌘K → C)
//   dual='Dual3'  → same layout as True
//   dual='Dual4'  → single key badge  (⌘C)
// Accepts shortcut prop: string (single) | [key1, key2] (dual)
export function CommandShortcut({ shortcut, active = false }) {
  if (!shortcut) return null;

  // Dual shortcut: [key1, key2] → key1 → key2
  if (Array.isArray(shortcut)) {
    const [k1, k2] = shortcut;
    return (
      <div className={styles.dualShortcut}>
        <span className={[styles.dualKey, active && styles.dualKeyActive].filter(Boolean).join(' ')}>{k1}</span>
        <img src={ARROW_RIGHT_IMG} alt="" className={styles.shortcutArrow} />
        <span className={[styles.dualKey, active && styles.dualKeyActive].filter(Boolean).join(' ')}>{k2}</span>
      </div>
    );
  }

  // Single shortcut: string → key badge
  return (
    <div className={styles.singleShortcut}>
      <span className={[styles.singleKey, active && styles.singleKeyActive].filter(Boolean).join(' ')}>
        {shortcut}
      </span>
    </div>
  );
}

// ─── Internal — leading icon/dot ──────────────────────────────────
function AvatarPlaceholder({ stacked = false }) {
  const px  = stacked ? 32 : 24;
  const src = stacked ? AVATAR_MD_ICON : AVATAR_SM_ICON;
  return (
    <div className={styles.avatarIcon} style={{ width: px, height: px }}>
      <img src={src} alt="" style={{ width: '66.67%', height: '66.67%', display: 'block' }} />
    </div>
  );
}

function DotIndicator() {
  return (
    <div className={styles.dotWrap}>
      <img src={DOT_IMG} alt="" className={styles.dotImg} />
    </div>
  );
}

// ─── CommandMenuItem ───────────────────────────────────────────────
// type          : 'icon' | 'dot'           (Figma: Type=Icon leading | Dot leading)
// state         : 'default' | 'hover' | 'focus'  (Figma: State=Default|Hover|Focus)
// text          : 'default' | 'stacked'    (Figma: Text=Default|Stacked)
// size          : 'sm' | 'md'              (Figma: Size=sm|md)
// label         : string  — primary text
// supportingText: string  — secondary text (shown in default mode or stacked)
// shortcut      : string | [key1,key2] | null  (Figma: _Command shortcut)
// rtl           : boolean                  (Figma: Rtl=true|false)
// active        : boolean — keyboard-active item (shows focus ring, overrides state)
// onClick       : () => void
export function CommandMenuItem({
  type          = 'icon',
  state         = 'default',
  text          = 'default',
  size          = 'sm',
  label         = 'Olivia Rhye',
  supportingText = '@olivia',
  shortcut,
  rtl           = false,
  active        = false,
  onClick,
  id,
}) {
  const isStacked = text === 'stacked';
  const isDot     = type === 'dot';
  const isLarge   = isStacked;          // stacked uses md-sized avatar

  const effectiveState = active ? 'focus' : state;

  const contentCls = [
    styles.itemContent,
    effectiveState === 'hover' && styles.itemHover,
    effectiveState === 'focus' && styles.itemFocus,
    isStacked && styles.itemStacked,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={styles.menuItem}
      dir={rtl ? 'rtl' : undefined}
      onClick={onClick}
      role="option"
      aria-selected={active}
      id={id}
    >
      <div className={contentCls}>
        {/* RTL: shortcut on the start side */}
        {rtl && shortcut && <CommandShortcut shortcut={shortcut} active={active} />}

        {/* Leading element */}
        {isDot && !isStacked && <DotIndicator />}
        {!isDot && <AvatarPlaceholder stacked={isLarge} />}

        {/* Text group */}
        {isStacked && isDot ? (
          <div className={[styles.textGroup, styles.textStacked].join(' ')}>
            <div className={styles.stackedDotRow}>
              <DotIndicator />
              <span className={styles.primaryText} dir={rtl ? 'auto' : undefined}>
                {label}
              </span>
            </div>
            {supportingText && (
              <span className={styles.secondaryText} dir={rtl ? 'auto' : undefined}>
                {supportingText}
              </span>
            )}
          </div>
        ) : isStacked ? (
          <div className={[styles.textGroup, styles.textStacked].join(' ')}>
            <span className={styles.primaryText} dir={rtl ? 'auto' : undefined}>{label}</span>
            {supportingText && (
              <span className={styles.secondaryText} dir={rtl ? 'auto' : undefined}>{supportingText}</span>
            )}
          </div>
        ) : (
          <div className={styles.textGroup}>
            <span className={styles.primaryText} dir={rtl ? 'auto' : undefined}>{label}</span>
            {supportingText && (
              <span className={styles.secondaryText} dir={rtl ? 'auto' : undefined}>{supportingText}</span>
            )}
          </div>
        )}

        {/* LTR: shortcut on the end side */}
        {!rtl && shortcut && <CommandShortcut shortcut={shortcut} active={active} />}
      </div>
    </div>
  );
}

// ─── CommandMenuSection ────────────────────────────────────────────
// heading  : string — section label (e.g. "Recent" / "حديث")
// items    : array of CommandMenuItem props
// rtl      : boolean
// bordered : boolean — show bottom border separator
export function CommandMenuSection({ heading, items = [], rtl = false, bordered = true }) {
  return (
    <div
      className={[styles.section, bordered && styles.sectionBordered].filter(Boolean).join(' ')}
      role="group"
      aria-label={heading}
    >
      {heading && (
        <div className={styles.sectionHeading} dir={rtl ? 'rtl' : undefined}>
          {rtl ? 'حديث' : heading}
        </div>
      )}
      <div className={styles.sectionItems} role="listbox">
        {items.map((item, i) => (
          <CommandMenuItem key={item.id ?? i} rtl={rtl} {...item} />
        ))}
      </div>
    </div>
  );
}

// ─── CommandFooter ─────────────────────────────────────────────────
// rtl : boolean
export function CommandFooter({ rtl = false }) {
  const ltrHints = [
    { icons: [ARROW_UP_IMG, ARROW_DOWN_IMG], label: 'to navigate' },
    { icons: [ENTER_IMG],                   label: 'to select' },
    { text: 'esc',                           label: 'to close' },
    { icons: [ARROW_LEFT_IMG],              label: 'return to parent' },
  ];
  const rtlHints = [
    { icons: [ARROW_DOWN_IMG, ARROW_UP_IMG], label: 'للتنقل' },
    { icons: [ENTER_IMG],                   label: 'للاختيار' },
    { text: 'إلغاء',                         label: 'لإغلاق' },
    { icons: [ARROW_LEFT_IMG],              label: 'العودة إلى المستوى الأعلى' },
  ];
  const hints = rtl ? rtlHints : ltrHints;

  return (
    <div className={styles.footer} dir={rtl ? 'rtl' : undefined}>
      {/* Settings icon — always left for LTR, right for RTL (first in DOM for RTL) */}
      <button className={styles.settingsBtn} type="button" aria-label="Settings">
        <img src={SETTINGS_IMG} alt="" width={20} height={20} style={{ display: 'block' }} />
      </button>

      <div className={[styles.footerContent, rtl && styles.footerContentRtl].filter(Boolean).join(' ')}>
        {hints.map((hint, i) => (
          <div key={i} className={styles.footerHint}>
            {hint.icons && (
              <div className={styles.footerKeyGroup}>
                {hint.icons.map((src, j) => (
                  <div key={j} className={styles.footerKey}>
                    <img src={src} alt="" width={16} height={16} style={{ display: 'block' }} />
                  </div>
                ))}
              </div>
            )}
            {hint.text && (
              <div className={styles.footerKeyText}>
                <span>{hint.text}</span>
              </div>
            )}
            <span className={styles.footerHintLabel} dir={rtl ? 'auto' : undefined}>
              {hint.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Command (assembled bar) ───────────────────────────────────────
// Full command bar matching Figma node 4807:133549.
// Fully interactive: type to filter, ↑↓ to navigate, Enter to select, Esc to close.
//
// sections    : [{ heading?, items[] }]  — each item = CommandMenuItem props
// placeholder : string (default 'Search')
// footer      : boolean (default true) — show keyboard hint footer
// rtl         : boolean
// autoFocus   : boolean (default true) — focus input on mount
// onSelect    : (item) => void — fired on Enter or click
// onClose     : () => void     — fired on Escape
export function Command({
  sections  = [],
  placeholder = 'Search',
  footer    = true,
  rtl       = false,
  autoFocus = true,
  onSelect,
  onClose,
  className,
  style,
}) {
  const [query,     setQuery]     = useState('');
  const [activeIdx, setActiveIdx] = useState(-1);

  // Build filtered section list
  const filtered = sections
    .map(sec => ({
      ...sec,
      items: (sec.items || []).filter(item =>
        !query || (item.label ?? '').toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter(sec => sec.items.length > 0);

  const flatItems = filtered.flatMap(s => s.items);
  const total     = flatItems.length;

  const handleSearch = useCallback(v => {
    setQuery(v);
    setActiveIdx(-1);
  }, []);

  const handleKeyDown = useCallback(e => {
    if (!total) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIdx(i => (i + 1 < total ? i + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIdx(i => (i > 0 ? i - 1 : total - 1));
        break;
      case 'Enter':
        if (activeIdx >= 0) {
          e.preventDefault();
          onSelect?.(flatItems[activeIdx]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose?.();
        break;
    }
  }, [total, activeIdx, flatItems, onSelect, onClose]);

  // Enhance items with active flag + click handler
  let runIdx = 0;
  const enhanced = filtered.map(sec => ({
    ...sec,
    items: sec.items.map(item => {
      const i = runIdx++;
      return {
        ...item,
        active:  i === activeIdx,
        onClick: () => { setActiveIdx(i); onSelect?.(item); },
      };
    }),
  }));

  return (
    <div
      className={[styles.bar, className].filter(Boolean).join(' ')}
      style={style}
      dir={rtl ? 'rtl' : undefined}
      aria-label="Command palette"
    >
      <div className={styles.barInput}>
        <CommandInput
          state={query ? 'filled' : 'placeholder'}
          value={query}
          placeholder={placeholder}
          rtl={rtl}
          autoFocus={autoFocus}
          onSearch={handleSearch}
          onKeyDown={handleKeyDown}
        />
      </div>

      {total === 0 && query && (
        <div className={styles.emptyState}>
          No results for <strong>"{query}"</strong>
        </div>
      )}

      {enhanced.map((sec, i) => (
        <CommandMenuSection
          key={i}
          heading={sec.heading}
          items={sec.items}
          rtl={rtl}
          bordered={i < enhanced.length - 1 || footer}
        />
      ))}

      {footer && <CommandFooter rtl={rtl} />}
    </div>
  );
}
