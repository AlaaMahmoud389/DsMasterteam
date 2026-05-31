import styles from './ChartTooltip.module.css';

/**
 * ChartTooltip — shared hover/focus tooltip for all chart types.
 * Absolutely positioned inside the chart card (card must be position:relative).
 *
 * props:
 *   visible  — boolean
 *   x, y     — card-relative px coordinates
 *   rows     — [{ label, value, marker? }] list of content rows
 *   dir      — 'ltr' | 'rtl'
 */
export function ChartTooltip({ visible, x, y, rows = [], dir = 'ltr' }) {
  return (
    <div
      className={`${styles.tooltip} ${visible ? styles.visible : ''}`}
      style={{ left: x, top: y }}
      role="tooltip"
      aria-hidden={!visible}
      dir={dir}
    >
      {rows.map((row, i) => (
        <div key={i} className={styles.row}>
          {row.marker && (
            <span
              className={styles.marker}
              style={{ background: row.marker }}
              aria-hidden="true"
            />
          )}
          <span className={styles.label}>{row.label}</span>
          <span className={styles.value}>{row.value}</span>
        </div>
      ))}
    </div>
  );
}
