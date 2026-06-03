import { useState, useRef, useEffect } from 'react';
import styles from './Breadcrumb.module.css';

// ─── Design tokens ────────────────────────────────────────────────
// --breadcrumb/text/default   : #000b36  (ancestor links)
// --breadcrumb/text/current   : #3c5073  (current page)
// --breadcrumb/bg             : #f9fafb  (withBackground pill)
// Font: IBM Plex Sans Arabic · 14px · 400 · lh 20px
// Separator: 16×16 · Home icon: 24×24 · gap: 4px

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 10.5L12 4l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V10.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21V13h6v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────────
// items:           [{ label, href? }, ...] — last item is the current page
// withIcon:        show home icon as root anchor
// withBackground:  grey pill background (#f9fafb, h=34px, r=8px, px=8px)
// withBorder:      top + bottom border (h=36px)
// maxVisible:      collapse middle items to "…" when exceeded (default 5)
// defaultExpanded: start with overflow fully expanded inline
// dir:             'ltr' | 'rtl'
//
// Overflow states:
//   Middle-overflow-closed  — "…" visible; clicking opens the menu
//   Middle-overflow (menu)  — dropdown lists hidden items + "Show all"
//   Middle-overflow (open)  — all items expanded inline (via "Show all")
export function Breadcrumb({
  items = [],
  withIcon = false,
  withBackground = false,
  withBorder = false,
  maxVisible = 5,
  defaultExpanded = false,
  dir = 'ltr',
  className,
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [menuOpen, setMenuOpen]   = useState(false);
  const wrapperRef = useRef(null);
  const isRTL = dir === 'rtl';
  const Sep = isRTL ? ChevronLeft : ChevronRight;

  const hasOverflow = items.length > maxVisible;
  const displayItems = hasOverflow && !expanded
    ? [items[0], null, ...items.slice(-2)]   // closed: first + … + last 2
    : items;                                  // open: all items

  // The items hidden behind "…" — rendered inside the dropdown menu
  const hiddenItems = hasOverflow && !expanded ? items.slice(1, -2) : [];

  // Close menu on outside click or Escape
  useEffect(() => {
    if (!menuOpen) return;
    function onPointerDown(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const rootCls = [
    styles.root,
    withBackground && styles.withBackground,
    withBorder && styles.withBorder,
    className,
  ].filter(Boolean).join(' ');

  return (
    <nav aria-label="Breadcrumb" dir={dir}>
      <ol className={rootCls}>
        {/* Home icon — root anchor */}
        {withIcon && (
          <li className={styles.item}>
            <span className={styles.homeIcon}><HomeIcon /></span>
          </li>
        )}

        {displayItems.map((item, idx) => {
          // ── "…" overflow button + dropdown menu ──────────────────
          if (item === null) {
            return (
              <li key="overflow" className={[styles.item, styles.overflowWrapper].join(' ')} ref={wrapperRef}>
                <span className={styles.sep} aria-hidden="true"><Sep /></span>
                <button
                  className={[styles.overflowBtn, menuOpen && styles.overflowBtnActive].filter(Boolean).join(' ')}
                  type="button"
                  aria-label="Show hidden breadcrumb items"
                  aria-expanded={menuOpen}
                  aria-haspopup="menu"
                  onClick={() => setMenuOpen(o => !o)}
                >
                  …
                </button>

                {/* ── Overflow dropdown menu (Middle-overflow) ── */}
                {menuOpen && (
                  <ul
                    role="menu"
                    className={styles.overflowMenu}
                    style={isRTL ? { right: 0 } : { left: 0 }}
                    dir={dir}
                  >
                    {hiddenItems.map((hItem, hIdx) => (
                      <li key={hIdx} role="none">
                        <a
                          role="menuitem"
                          href={hItem.href || '#'}
                          className={styles.menuLink}
                          onClick={() => setMenuOpen(false)}
                        >
                          {hItem.label}
                        </a>
                      </li>
                    ))}
                    {hiddenItems.length > 0 && (
                      <li role="none" aria-hidden="true" className={styles.menuDivider} />
                    )}
                    <li role="none">
                      <button
                        role="menuitem"
                        type="button"
                        className={styles.menuShowAll}
                        onClick={() => { setExpanded(true); setMenuOpen(false); }}
                      >
                        Show all
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            );
          }

          const isFirst = idx === 0;
          const isCurrent = idx === displayItems.length - 1;
          const showSep = !isFirst || withIcon;

          return (
            <li key={idx} className={styles.item}>
              {showSep && (
                <span className={styles.sep} aria-hidden="true"><Sep /></span>
              )}
              {isCurrent ? (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a href={item.href || '#'} className={styles.link}>
                  {item.label}
                </a>
              )}
            </li>
          );
        })}

        {/* Collapse button — visible only in middle-overflow inline-expanded state */}
        {hasOverflow && expanded && (
          <li className={styles.item}>
            <button
              className={styles.collapseBtn}
              type="button"
              aria-label="Collapse breadcrumb items"
              onClick={() => setExpanded(false)}
            >
              ←
            </button>
          </li>
        )}
      </ol>
    </nav>
  );
}
