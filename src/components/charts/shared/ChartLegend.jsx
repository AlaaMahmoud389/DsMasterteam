import styles from './ChartLegend.module.css';

/**
 * ChartLegend — interactive series toggle legend.
 * Each item is a <button> with aria-pressed for keyboard accessibility.
 * onToggle(index) is called on click — parent enforces "at least one visible" guard.
 *
 * props:
 *   series       — same series array passed to the chart
 *   hiddenSeries — Set<number> of hidden series indices
 *   onToggle     — (index: number) => void
 *   colors       — string[] fallback color per series index
 */
export function ChartLegend({ series, hiddenSeries, onToggle, colors = [] }) {
  return (
    <ul className={styles.legend} aria-label="Chart legend">
      {series.map((s, i) => {
        const isHidden = hiddenSeries.has(i);
        const color = s.color || colors[i] || '#1849a9';
        return (
          <li key={s.id ?? s.label} className={styles.item}>
            <button
              type="button"
              className={`${styles.btn} ${isHidden ? styles.btnHidden : ''}`}
              aria-pressed={!isHidden}
              onClick={() => onToggle(i)}
            >
              <span
                className={styles.mark}
                style={{ background: isHidden ? 'var(--chart-legend-hidden, #d2d6db)' : color }}
                aria-hidden="true"
              />
              <span className={styles.text}>{s.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
