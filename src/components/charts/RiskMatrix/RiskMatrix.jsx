import { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './RiskMatrix.module.css';
import { ChartTooltip } from '../shared/ChartTooltip';

/* ── Risk level tokens ─────────────────────────────────────── */

const RISK_SOLID = {
  'very-high': 'var(--charts-risk-matrix-very-high, #a30000)',
  'high':      'var(--charts-risk-matrix-high, #ff5043)',
  'medium':    'var(--charts-risk-matrix-medium, #dd7600)',
  'low':       'var(--charts-risk-matrix-low, #006121)',
  'very-low':  'var(--charts-risk-matrix-very-low, #51b488)',
};

const RISK_HEX = {
  'very-high': '#a30000',
  'high':      '#ff5043',
  'medium':    '#dd7600',
  'low':       '#006121',
  'very-low':  '#51b488',
};

const RISK_LABELS = {
  'very-high': 'Very High',
  'high':      'High',
  'medium':    'Medium',
  'low':       'Low',
  'very-low':  'Very Low',
};

/* Standard diagonal 5×5 Probability × Impact grid.
   Row 0 = Probability=5 (top/highest), Col 0 = Impact=1 (left/lowest). */
const MATRIX_GRID = [
  ['low',      'medium',    'high',   'very-high', 'very-high'],  // P=5
  ['low',      'medium',    'high',   'high',      'very-high'],  // P=4
  ['low',      'low',       'medium', 'high',      'high'],       // P=3
  ['very-low', 'low',       'low',    'medium',    'high'],       // P=2
  ['very-low', 'very-low',  'low',    'low',       'medium'],     // P=1
];

const RISK_LEVEL_ORDER = ['very-high', 'high', 'medium', 'low', 'very-low'];

const DEFAULT_SERIES_LABELS = ['Very High', 'High', 'Medium', 'Low', 'Very Low'];
const DEFAULT_SERIES_COLORS = ['#a30000', '#ff5043', '#dd7600', '#006121', '#51b488'];

const DEFAULT_Y_LABELS = ['5', '4', '3', '2', '1'];
const DEFAULT_X_LABELS = ['1', '2', '3', '4', '5'];

/* ── Component ─────────────────────────────────────────────── */

export function RiskMatrix({
  title,
  subtitle,
  items = [],
  yAxisLabel = 'Probability',
  xAxisLabel = 'Impact',
  yLabels = DEFAULT_Y_LABELS,
  xLabels = DEFAULT_X_LABELS,
  seriesLabels = DEFAULT_SERIES_LABELS,
  seriesColors = DEFAULT_SERIES_COLORS,
  showLegend = true,
  showCellLabels = false,
  showCellValues = true,
  values,
  customGrid,
  dir = 'ltr',
}) {
  const [activeItem, setActiveItem] = useState(null);
  const [hiddenLevels, setHiddenLevels] = useState(new Set());
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, rows: [] });
  const cardRef = useRef(null);

  const grid = customGrid || MATRIX_GRID;

  /* Toggle a risk level's visibility — enforce at least one visible */
  const toggleLevel = useCallback((levelKey) => {
    setHiddenLevels(prev => {
      const visibleCount = RISK_LEVEL_ORDER.filter(l => !prev.has(l)).length;
      if (!prev.has(levelKey)) {
        if (visibleCount <= 1) return prev;
        return new Set([...prev, levelKey]);
      }
      const next = new Set(prev);
      next.delete(levelKey);
      return next;
    });
  }, []);

  /* Count items per cell */
  const getCellCount = (row, col) => {
    const prob = 5 - row;
    const impact = col + 1;
    return items.filter(it => it.likelihood === prob && it.impact === impact).length;
  };

  const getCellValue = (row, col) => {
    if (values) return values[row]?.[col] ?? null;
    const count = getCellCount(row, col);
    return count > 0 ? count : null;
  };

  const getItemsAtCell = (row, col) => {
    const prob = 5 - row;
    const impact = col + 1;
    return items.filter(it => it.likelihood === prob && it.impact === impact);
  };

  /* Tooltip show/hide */
  const showTip = useCallback((e, ri, ci, level, cellItems, cellVal) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const rows = [
      { label: `${RISK_LABELS[level]} Risk`, value: '', marker: RISK_HEX[level] },
      { label: `${yAxisLabel}: ${yLabels[ri]}`, value: `${xAxisLabel}: ${xLabels[ci]}` },
      ...cellItems.map(it => ({ label: it.label, value: '' })),
    ];
    if (cellVal != null && cellItems.length === 0) {
      rows.push({ label: 'Count', value: String(cellVal) });
    }
    setTooltip({
      visible: true,
      x: Math.max(4, e.clientX - r.left + 14),
      y: Math.max(4, e.clientY - r.top - 48),
      rows,
    });
  }, [yAxisLabel, xAxisLabel, yLabels, xLabels]);

  const hideTip = useCallback(() => {
    setTooltip(t => ({ ...t, visible: false }));
  }, []);

  return (
    <div className={styles.card} dir={dir} ref={cardRef}>
      {/* Title */}
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <p className={styles.title}>{title}</p>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}

      <div className={styles.body}>
        {/* Interactive legend — Series 1–5 / risk level buttons */}
        {showLegend && (
          <ul className={styles.legend} aria-label="Risk level legend">
            {seriesLabels.map((lbl, i) => {
              const levelKey = RISK_LEVEL_ORDER[i];
              const isHidden = hiddenLevels.has(levelKey);
              const color = seriesColors[i] || '#1849a9';
              return (
                <li key={lbl} className={styles.legendItem}>
                  <button
                    type="button"
                    className={`${styles.legendBtn} ${isHidden ? styles.legendBtnHidden : ''}`}
                    aria-pressed={!isHidden}
                    onClick={() => toggleLevel(levelKey)}
                  >
                    <span
                      className={styles.legendMark}
                      style={{ background: isHidden ? '#d2d6db' : color }}
                      aria-hidden="true"
                    />
                    <span className={styles.legendText}>{lbl}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {/* Matrix layout: [Y-label | Grid] / [X-ticks] / [X-label] */}
        <div className={styles.matrixWrap}>
          <div className={styles.matrixInner}>
            {/* Y-axis rotated label */}
            <div className={styles.yAxisWrap} aria-hidden="true">
              <span className={styles.yAxisLabel}>{yAxisLabel}</span>
            </div>

            {/* Grid + tick labels */}
            <div className={styles.gridWrap}>
              {/* Y-axis tick labels */}
              <div className={styles.yTicks}>
                {yLabels.map(lbl => (
                  <div key={lbl} className={styles.yTick}>{lbl}</div>
                ))}
              </div>

              {/* Heatmap rows */}
              <div className={styles.grid} role="table" aria-label={title || 'Risk matrix'}>
                {grid.map((row, ri) => (
                  <div key={ri} className={styles.row} role="row">
                    {row.map((level, ci) => {
                      const cellItems = getItemsAtCell(ri, ci);
                      const cellVal = getCellValue(ri, ci);
                      const bg = RISK_SOLID[level] || '#51b488';
                      const isDimmed = hiddenLevels.has(level);
                      return (
                        <div
                          key={`${ri}-${ci}`}
                          className={`${styles.cell} ${isDimmed ? styles.cellDimmed : ''}`}
                          role="cell"
                          tabIndex={0}
                          style={{ background: bg }}
                          aria-label={`Probability ${yLabels[ri]}, Impact ${xLabels[ci]}: ${RISK_LABELS[level]}${cellItems.length ? ` — ${cellItems.map(it => it.label).join(', ')}` : ''}`}
                          onClick={() => cellItems.length > 0 && setActiveItem(cellItems[0])}
                          onKeyDown={e => e.key === 'Enter' && cellItems.length > 0 && setActiveItem(cellItems[0])}
                          onMouseEnter={e => showTip(e, ri, ci, level, cellItems, cellVal)}
                          onMouseLeave={hideTip}
                          onFocus={e => showTip(e, ri, ci, level, cellItems, cellVal)}
                          onBlur={hideTip}
                        >
                          {showCellLabels && (
                            <span className={styles.cellLabel}>{RISK_LABELS[level]}</span>
                          )}
                          {showCellValues && cellVal != null && (
                            <span className={styles.cellValue}>{cellVal}</span>
                          )}
                          {!showCellValues && cellItems.map(item => (
                            <span
                              key={item.id}
                              className={styles.itemMarker}
                              title={item.label}
                              onClick={e => { e.stopPropagation(); setActiveItem(item); }}
                            >
                              {item.label.charAt(0).toUpperCase()}
                            </span>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* X-axis tick labels */}
          <div className={styles.xTicksRow}>
            <div className={styles.xTicksOffset} />
            <div className={styles.xTicks}>
              {xLabels.map(lbl => (
                <div key={lbl} className={styles.xTick}>{lbl}</div>
              ))}
            </div>
          </div>

          {/* X-axis title */}
          <div className={styles.xAxisWrap} aria-hidden="true">
            <span className={styles.xAxisLabel}>{xAxisLabel}</span>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <ChartTooltip
        visible={tooltip.visible}
        x={tooltip.x}
        y={tooltip.y}
        rows={tooltip.rows}
        dir={dir}
      />

      {/* Active item detail panel */}
      {activeItem && (
        <div className={styles.detailPanel} role="dialog" aria-label={`Risk detail: ${activeItem.label}`}>
          <div className={styles.detailHeader}>
            <div>
              <div className={styles.detailTitle}>{activeItem.label}</div>
              {activeItem.description && <div className={styles.detailDesc}>{activeItem.description}</div>}
            </div>
            <button className={styles.detailClose} onClick={() => setActiveItem(null)} aria-label="Close">×</button>
          </div>
          <div className={styles.detailMeta}>
            <span>Likelihood: <strong>{activeItem.likelihood}/5</strong></span>
            <span>Impact: <strong>{activeItem.impact}/5</strong></span>
            <span>
              {RISK_LABELS[MATRIX_GRID[5 - activeItem.likelihood]?.[activeItem.impact - 1]]} Risk
            </span>
          </div>
        </div>
      )}

      {/* Screen-reader table */}
      <table className={styles.srOnly}>
        <caption>{title ?? 'Risk matrix'} — rows: {yAxisLabel}, columns: {xAxisLabel}</caption>
        <thead>
          <tr>
            <th scope="col">{yAxisLabel} \ {xAxisLabel}</th>
            {xLabels.map((lbl, i) => <th key={i} scope="col">{lbl}</th>)}
          </tr>
        </thead>
        <tbody>
          {grid.map((row, ri) => (
            <tr key={ri}>
              <th scope="row">{yLabels[ri]}</th>
              {row.map((level, ci) => <td key={ci}>{RISK_LABELS[level]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

RiskMatrix.propTypes = {
  title:          PropTypes.string,
  subtitle:       PropTypes.string,
  items:          PropTypes.arrayOf(PropTypes.shape({
    id:          PropTypes.string.isRequired,
    label:       PropTypes.string.isRequired,
    likelihood:  PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
    impact:      PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
    description: PropTypes.string,
  })),
  yAxisLabel:     PropTypes.string,
  xAxisLabel:     PropTypes.string,
  yLabels:        PropTypes.arrayOf(PropTypes.string),
  xLabels:        PropTypes.arrayOf(PropTypes.string),
  seriesLabels:   PropTypes.arrayOf(PropTypes.string),
  seriesColors:   PropTypes.arrayOf(PropTypes.string),
  showLegend:     PropTypes.bool,
  showCellLabels: PropTypes.bool,
  showCellValues: PropTypes.bool,
  values:         PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  customGrid:     PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  dir:            PropTypes.oneOf(['ltr', 'rtl']),
};
