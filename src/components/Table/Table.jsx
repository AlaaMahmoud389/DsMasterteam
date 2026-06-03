import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Table.module.css';

/* ── Sort icon ─────────────────────────────────────────────── */
const SortIcon = ({ dir }) => (
  <span className={`${styles.sortIcon} ${dir ? styles[dir] : ''}`} aria-hidden="true">
    <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
      <path className={styles.sortUp}   d="M4 0L8 5H0L4 0Z" fill="#6b7280" />
    </svg>
    <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
      <path className={styles.sortDown} d="M4 5L0 0H8L4 5Z" fill="#6b7280" />
    </svg>
  </span>
);

/**
 * Table — Masterteam Design System
 * Figma: node 4804:93375
 *
 * A data table with optional selection, sorting, compact density,
 * alternating rows, contained (bordered card) layout, and RTL support.
 */
export function Table({
  columns = [],
  data = [],
  compact = false,
  alternatingRows = false,
  contained = false,
  selectable = false,
  rtl = false,
  emptyText = 'No data available',
  onRowClick,
  selectedIds = [],
  onSelectionChange,
  rowClassName,
}) {
  const [sortKey, setSortKey]   = useState(null);
  const [sortDir, setSortDir]   = useState('asc');
  const [allChecked, setAllChecked] = useState(false);
  const [localSelected, setLocalSelected] = useState(new Set(selectedIds));

  const handleSort = (col) => {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(col.key);
      setSortDir('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const va = a[sortKey] ?? '';
    const vb = b[sortKey] ?? '';
    const cmp = String(va).localeCompare(String(vb), undefined, { numeric: true });
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const toggleRow = (id) => {
    const next = new Set(localSelected);
    next.has(id) ? next.delete(id) : next.add(id);
    setLocalSelected(next);
    onSelectionChange?.(Array.from(next));
  };

  const toggleAll = () => {
    if (allChecked) {
      setLocalSelected(new Set());
      setAllChecked(false);
      onSelectionChange?.([]);
    } else {
      const all = new Set(data.map(r => r.id));
      setLocalSelected(all);
      setAllChecked(true);
      onSelectionChange?.(Array.from(all));
    }
  };

  const wrapClass = [
    styles.tableWrap,
    contained ? styles.contained : '',
    compact   ? styles.compact   : '',
    rtl       ? styles.rtl       : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapClass} dir={rtl ? 'rtl' : undefined}>
      <div className={styles.scrollWrap}>
      <table className={styles.table} role="grid">
        <thead className={styles.thead}>
          <tr>
            {selectable && (
              <th className={styles.checkTh}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={allChecked}
                  onChange={toggleAll}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map((col) => (
              col.type === 'actions' ? (
                <th key={col.key} className={styles.actionsTh} style={{ width: col.width || 64 }}>
                  {col.label}
                </th>
              ) : (
              <th
                key={col.key}
                className={[
                  styles.th,
                  col.sortable ? styles.sortable : '',
                  col.align === 'right'  ? styles.alignRight  : '',
                  col.align === 'center' ? styles.alignCenter : '',
                ].filter(Boolean).join(' ')}
                style={{ width: col.width || undefined, minWidth: col.minWidth || undefined }}
                onClick={() => handleSort(col)}
                aria-sort={col.sortable ? (sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none') : undefined}
              >
                <span className={styles.thInner}>
                  {col.label}
                  {col.sortable && (
                    <SortIcon dir={sortKey === col.key ? sortDir : null} />
                  )}
                </span>
              </th>
              )
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className={styles.emptyCell}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            sortedData.map((row, idx) => {
              const isSelected = localSelected.has(row.id);
              const isAlt = alternatingRows && idx % 2 !== 0;
              const trClass = [
                styles.tr,
                isSelected ? styles.selected : '',
                isAlt      ? styles.altRow   : '',
                rowClassName?.(row, idx) || '',
              ].filter(Boolean).join(' ');

              return (
                <tr
                  key={row.id ?? idx}
                  className={trClass}
                  onClick={() => onRowClick?.(row)}
                  aria-selected={selectable ? isSelected : undefined}
                >
                  {selectable && (
                    <td className={styles.checkTd}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={isSelected}
                        onChange={() => toggleRow(row.id)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Select row ${idx + 1}`}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    col.type === 'actions' ? (
                      <td key={col.key} className={styles.actionsTd}>
                        {col.render ? col.render(row[col.key], row) : null}
                      </td>
                    ) : (
                    <td
                      key={col.key}
                      className={[
                        styles.td,
                        col.align === 'right'  ? styles.alignRight  : '',
                        col.align === 'center' ? styles.alignCenter : '',
                      ].filter(Boolean).join(' ')}
                      style={{ width: col.width || undefined }}
                    >
                      {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                    </td>
                    )
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}

Table.propTypes = {
  /** Column definitions */
  columns: PropTypes.arrayOf(PropTypes.shape({
    key:      PropTypes.string.isRequired,
    label:    PropTypes.string.isRequired,
    width:    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** 'left' (default) | 'center' | 'right' */
    align:    PropTypes.oneOf(['left', 'center', 'right']),
    /** Enable click-to-sort for this column */
    sortable: PropTypes.bool,
    /** Custom cell renderer: (value, row) => ReactNode */
    render:   PropTypes.func,
  })),
  /** Row data — each row object should have a unique `id` field */
  data:            PropTypes.arrayOf(PropTypes.object),
  /** Reduce row height from 64 px to 48 px */
  compact:         PropTypes.bool,
  /** Stripe even rows with alternate background */
  alternatingRows: PropTypes.bool,
  /** Wrap table in a bordered card container */
  contained:       PropTypes.bool,
  /** Show leading checkbox column for row selection */
  selectable:      PropTypes.bool,
  /** Flip layout for Arabic / Hebrew */
  rtl:             PropTypes.bool,
  /** Message shown when data is empty */
  emptyText:       PropTypes.string,
  /** Called when a row is clicked: (row) => void */
  onRowClick:      PropTypes.func,
  /** Controlled set of selected row ids */
  selectedIds:     PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  /** Called when selection changes: (ids[]) => void */
  onSelectionChange: PropTypes.func,
  /** Per-row extra CSS class: (row, idx) => string */
  rowClassName: PropTypes.func,
};
