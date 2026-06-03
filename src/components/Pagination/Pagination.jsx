import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Pagination.module.css';

/* ── Icons ───────────────────────────────────────────────────── */

const ChevronLeft = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRight = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Page item computation ───────────────────────────────────── */

function getPageItems(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, current + 2, total];
}

/* ── Page-jump dropdown menu ─────────────────────────────────── */

function PageJumpMenu({ totalPages, currentPage, onSelect, closing, menuRef, size, onAnimationEnd }) {
  return (
    <div
      ref={menuRef}
      className={[styles.menu, closing ? styles.menuClosing : styles.menuOpen, styles[`menu${size}`]].filter(Boolean).join(' ')}
      role="listbox"
      aria-label="Jump to page"
      onAnimationEnd={closing ? onAnimationEnd : undefined}
    >
      <div className={styles.menuScroll}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            type="button"
            role="option"
            aria-selected={p === currentPage}
            className={[styles.menuItem, p === currentPage && styles.menuItemActive].filter(Boolean).join(' ')}
            onClick={() => onSelect(p)}
          >
            <span>{p}</span>
            {p === currentPage && <CheckIcon />}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Component ─────────────────────────────────────────────── */

/**
 * Pagination — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4399-22726
 *
 * Divides large datasets into pages with prev/next navigation.
 * Sizes: Small (24px) · Medium (32px) · Large (40px)
 * RTL: reverses page order and swaps chevron direction
 * Ellipsis: at most one ellipsis per component; clicking it opens an animated jump-to-page dropdown
 */
export function Pagination({
  size         = 'Medium',
  rtl          = false,
  currentPage  = 1,
  totalPages   = 10,
  onPageChange,
  ...rest
}) {
  const items = getPageItems(currentPage, totalPages);
  const displayed = rtl ? [...items].reverse() : items;

  const iconSize  = size === 'Small' ? 16 : size === 'Large' ? 24 : 20;
  const sizeClass = styles[size.toLowerCase()];

  const PrevIcon = rtl ? ChevronRight : ChevronLeft;
  const NextIcon = rtl ? ChevronLeft  : ChevronRight;

  /* Menu state: which ellipsis key's menu is open */
  const [openMenu, setOpenMenu] = useState(null);
  const [closingMenu, setClosingMenu] = useState(null);
  const menuRef = useRef(null);
  const wrapRef = useRef(null);

  const closeMenu = () => {
    if (openMenu === null) return;
    setClosingMenu(openMenu);
    setOpenMenu(null);
  };

  /* Close on click outside */
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) closeMenu();
    };
    if (openMenu !== null) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [openMenu]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeMenu(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [openMenu]);

  const handleMenuAnimEnd = () => setClosingMenu(null);

  const handlePage = (page) => {
    if (typeof page === 'number' && page !== currentPage) onPageChange?.(page);
  };

  const handleDotsClick = (key) => {
    if (openMenu === key) {
      closeMenu();
    } else {
      setOpenMenu(key);
      setClosingMenu(null);
    }
  };

  const handleMenuSelect = (page) => {
    handlePage(page);
    closeMenu();
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      dir={rtl ? 'rtl' : 'ltr'}
      className={[styles.pagination, sizeClass].join(' ')}
      {...rest}
    >
      {/* Prev */}
      <button
        type="button"
        className={styles.navBtn}
        onClick={() => { closeMenu(); handlePage(currentPage - 1); }}
        disabled={currentPage === 1}
        aria-label={rtl ? 'Next page' : 'Previous page'}
      >
        <PrevIcon size={iconSize} />
      </button>

      {/* Page items */}
      {displayed.map((page, idx) => {
        const dotKey = `ellipsis-${idx}`;
        return page === '...'
          ? (
            <div
              key={dotKey}
              ref={openMenu === dotKey || closingMenu === dotKey ? wrapRef : null}
              className={styles.itemWrap}
            >
              <button
                type="button"
                className={[styles.item, styles.ellipsis, styles.ellipsisBtn].join(' ')}
                onClick={() => handleDotsClick(dotKey)}
                aria-haspopup="listbox"
                aria-expanded={openMenu === dotKey}
                aria-label="Jump to page"
              >
                …
              </button>
              {(openMenu === dotKey || closingMenu === dotKey) && (
                <PageJumpMenu
                  menuRef={menuRef}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onSelect={handleMenuSelect}
                  closing={closingMenu === dotKey}
                  size={size}
                  onAnimationEnd={handleMenuAnimEnd}
                />
              )}
            </div>
          )
          : (
            <button
              key={page}
              type="button"
              className={[styles.item, page === currentPage && styles.active].filter(Boolean).join(' ')}
              onClick={() => { closeMenu(); handlePage(page); }}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          );
      })}

      {/* Next */}
      <button
        type="button"
        className={styles.navBtn}
        onClick={() => { closeMenu(); handlePage(currentPage + 1); }}
        disabled={currentPage === totalPages}
        aria-label={rtl ? 'Previous page' : 'Next page'}
      >
        <NextIcon size={iconSize} />
      </button>
    </nav>
  );
}

Pagination.propTypes = {
  /** Item size — Small (24px) · Medium (32px) · Large (40px) */
  size:         PropTypes.oneOf(['Small', 'Medium', 'Large']),
  /** Right-to-left layout — reverses item order and swaps chevron direction */
  rtl:          PropTypes.bool,
  /** Currently active page number (1-based) */
  currentPage:  PropTypes.number,
  /** Total number of pages */
  totalPages:   PropTypes.number,
  /** Called with the new page number when user navigates */
  onPageChange: PropTypes.func,
};
