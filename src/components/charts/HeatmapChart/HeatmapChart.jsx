import { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './HeatmapChart.module.css';
import { ChartTooltip } from '../shared/ChartTooltip';

/**
 * HeatmapChart — Masterteam Design System
 * Figma: WTmRAkJVvw0IvZMA7wBdTC / node 4600:5922
 *
 * Grid of value-colored cells (rows × cols) with:
 *   - KPI header (cardDetails variant)
 *   - Rotated Y-axis label + value tick labels + horizontal gridlines
 *   - X-axis column labels + optional title
 *   - 7-band color scale bar at the bottom (0→40 default)
 *   - Tooltip on hover/focus
 *   - RTL support (dir prop)
 *
 * Color bands (Figma series tokens):
 *   null/0   → #d2d6db  (--chart-null)
 *   lightest → #d1e9ff  (--chart-series-6)
 *             → #b2ddff  (--chart-series-5)
 *             → #53b1fd  (--chart-series-4)
 *             → #2e90fa  (--chart-series-3)
 *             → #175cd3  (--chart-series-2)
 *   darkest  → #1849a9  (--chart-series-1)
 */

/* ── Color bands (null + 6 intensity levels) ─────────────── */

const BANDS = [
  { css: 'var(--chart-null, #d2d6db)',     hex: '#d2d6db' },
  { css: 'var(--chart-series-6, #d1e9ff)', hex: '#d1e9ff' },
  { css: 'var(--chart-series-5, #b2ddff)', hex: '#b2ddff' },
  { css: 'var(--chart-series-4, #53b1fd)', hex: '#53b1fd' },
  { css: 'var(--chart-series-3, #2e90fa)', hex: '#2e90fa' },
  { css: 'var(--chart-series-2, #175cd3)', hex: '#175cd3' },
  { css: 'var(--chart-series-1, #1849a9)', hex: '#1849a9' },
];

function getBand(value, scaleMax) {
  if (value == null || value === 0) return BANDS[0];
  const t = Math.max(0, Math.min(0.9999, value / scaleMax));
  const idx = 1 + Math.floor(t * (BANDS.length - 1));
  return BANDS[Math.min(idx, BANDS.length - 1)];
}

function isDark(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) < 160;
}

/* ── SVG layout constants ─────────────────────────────────── */

const SVG_W       = 500;
const Y_TITLE_W   = 28;   /* rotated Y-axis label strip */
const Y_TITLE_GAP = 8;    /* gap between label and tick labels */
const Y_TICK_W    = 36;   /* tick label column */
const X_TICK_H    = 22;   /* X-axis category label row height */
const X_TITLE_H   = 28;   /* X-axis title row height */
const PLOT_H      = 241;  /* heatmap grid height (Figma: ~241px for 7 rows × 34px + gaps) */
const PLOT_TOP    = 8;    /* top margin */
const CELL_GAP    = 2;    /* gap between cells */

const PLOT_X = Y_TITLE_W + Y_TITLE_GAP + Y_TICK_W;
const PLOT_W = SVG_W - PLOT_X - 4; /* 4px right margin */
const SVG_H  = PLOT_TOP + PLOT_H + X_TICK_H + X_TITLE_H;

/* ── Component ────────────────────────────────────────────── */

export function HeatmapChart({
  title,
  subtitle,
  kpi,
  showKpi = false,
  data = [],
  rowLabels = [],
  colLabels = [],
  yAxisTitle = 'Active users',
  xAxisTitle = 'Month',
  yTicks = ['500', '400', '300', '200', '100', '0'],
  scaleMin = 0,
  scaleMax = 40,
  showColorScale = true,
  dir = 'ltr',
}) {
  const cardRef = useRef(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, rows: [] });
  const isRtl = dir === 'rtl';

  const rowCount = data.length;
  const colCount = Math.max(colLabels.length, data[0]?.length ?? 0);

  const cellW = colCount > 0 ? (PLOT_W - (colCount - 1) * CELL_GAP) / colCount : 32;
  const cellH = rowCount > 0 ? (PLOT_H - (rowCount - 1) * CELL_GAP) / rowCount : 34;

  /* Y-axis gridline positions — evenly spaced */
  const gridLineY = yTicks.map((_, i) =>
    PLOT_TOP + (i / Math.max(yTicks.length - 1, 1)) * PLOT_H
  );

  /* Resolve column ordering */
  const displayCols = isRtl ? [...colLabels].reverse() : colLabels;

  const showTip = useCallback((e, ri, ci, value) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: Math.max(4, e.clientX - r.left + 14),
      y: Math.max(4, e.clientY - r.top - 48),
      rows: [
        { label: rowLabels[ri] || `Row ${ri + 1}`, value: String(value ?? '—'), marker: getBand(value, scaleMax).hex },
        { label: colLabels[ci] || `Col ${ci + 1}`, value: '' },
      ],
    });
  }, [rowLabels, colLabels, scaleMax]);

  const hideTip = useCallback(() => setTooltip(t => ({ ...t, visible: false })), []);

  return (
    <div className={styles.card} dir={dir} ref={cardRef}>

      {/* Header */}
      {(title || subtitle) && (
        <div className={styles.header}>
          {title    && <p className={styles.title}>{title}</p>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}

      {/* KPI block — Figma: cardDetails="true" */}
      {showKpi && kpi && (
        <div className={styles.kpiBlock}>
          <p className={styles.kpiValue}>{kpi.value}</p>
          {kpi.badge && (
            <div className={styles.kpiBadgeRow}>
              <span className={styles.kpiBadge}>
                <span className={styles.kpiBadgeIcon} aria-hidden="true">
                  {kpi.badge.icon || '↑'}
                </span>
                <span>{kpi.badge.text}</span>
              </span>
              {kpi.badge.label && (
                <span className={styles.kpiBadgeLabel}>{kpi.badge.label}</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* SVG chart area */}
      <div className={styles.svgWrap}>
        <svg
          width="100%"
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          role="img"
          aria-label={title || 'Heatmap chart'}
          overflow="visible"
        >
          <title>{title ?? 'Heatmap chart'}</title>

          {/* Y-axis label (rotated -90°) */}
          {yAxisTitle && (
            <text
              x={Y_TITLE_W / 2}
              y={PLOT_TOP + PLOT_H / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(-90, ${Y_TITLE_W / 2}, ${PLOT_TOP + PLOT_H / 2})`}
              className={styles.axisTitle}
            >
              {yAxisTitle}
            </text>
          )}

          {/* Y-axis tick labels */}
          {yTicks.map((tick, i) => (
            <text
              key={i}
              x={Y_TITLE_W + Y_TITLE_GAP + Y_TICK_W - 4}
              y={gridLineY[i]}
              textAnchor="end"
              dominantBaseline="middle"
              className={styles.tickLabel}
            >
              {tick}
            </text>
          ))}

          {/* Horizontal gridlines */}
          {gridLineY.map((y, i) => (
            <line
              key={i}
              x1={PLOT_X}
              y1={y}
              x2={PLOT_X + PLOT_W}
              y2={y}
              className={styles.gridLine}
            />
          ))}

          {/* Heatmap cells */}
          {data.map((row, ri) => {
            const displayRow = isRtl ? [...row].reverse() : row;
            return displayRow.map((val, ci) => {
              const realCi = isRtl ? row.length - 1 - ci : ci;
              const band = getBand(val, scaleMax);
              const cx = PLOT_X + ci * (cellW + CELL_GAP);
              const cy = PLOT_TOP + ri * (cellH + CELL_GAP);
              return (
                <rect
                  key={`${ri}-${ci}`}
                  x={cx}
                  y={cy}
                  width={cellW}
                  height={cellH}
                  rx={2}
                  fill={band.css}
                  role="cell"
                  tabIndex={0}
                  aria-label={`${rowLabels[ri] || `Row ${ri + 1}`}, ${colLabels[realCi] || `Col ${realCi + 1}`}: ${val ?? '—'}`}
                  className={styles.cell}
                  onMouseEnter={e => showTip(e, ri, realCi, val)}
                  onMouseLeave={hideTip}
                  onFocus={e => showTip(e, ri, realCi, val)}
                  onBlur={hideTip}
                />
              );
            });
          })}

          {/* X-axis column labels */}
          {displayCols.map((lbl, i) => {
            const cx = PLOT_X + i * (cellW + CELL_GAP) + cellW / 2;
            return (
              <text
                key={i}
                x={cx}
                y={PLOT_TOP + PLOT_H + X_TICK_H / 2 + 4}
                textAnchor="middle"
                dominantBaseline="middle"
                className={styles.tickLabel}
              >
                {lbl}
              </text>
            );
          })}

          {/* X-axis title */}
          {xAxisTitle && (
            <text
              x={PLOT_X + PLOT_W / 2}
              y={PLOT_TOP + PLOT_H + X_TICK_H + X_TITLE_H / 2 + 4}
              textAnchor="middle"
              dominantBaseline="middle"
              className={styles.axisTitle}
            >
              {xAxisTitle}
            </text>
          )}
        </svg>
      </div>

      {/* Color scale bar — Figma: bottom indicator with 7 bands, 0…40 */}
      {showColorScale && (
        <div className={styles.colorScaleWrap}>
          <span className={styles.scaleLabel}>{scaleMin}</span>
          <div className={styles.scaleBands} aria-label={`Color scale: ${scaleMin} to ${scaleMax}`}>
            {BANDS.map((b, i) => (
              <div
                key={i}
                className={styles.scaleBand}
                style={{ background: b.css }}
                title={i === 0 ? `0–${Math.round(scaleMax / (BANDS.length - 1))}` : undefined}
              />
            ))}
          </div>
          <span className={styles.scaleLabel}>{scaleMax}</span>
        </div>
      )}

      {/* Screen-reader table */}
      <table className={styles.srOnly} aria-label={`${title ?? 'Heatmap'} — data table`}>
        <caption>{title ?? 'Heatmap'}</caption>
        <thead>
          <tr>
            <th scope="col"> </th>
            {colLabels.map((lbl, i) => <th key={i} scope="col">{lbl}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, ri) => (
            <tr key={ri}>
              <th scope="row">{rowLabels[ri] ?? `Row ${ri + 1}`}</th>
              {row.map((v, ci) => <td key={ci}>{v}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <ChartTooltip
        visible={tooltip.visible}
        x={tooltip.x}
        y={tooltip.y}
        rows={tooltip.rows}
        dir={dir}
      />
    </div>
  );
}

HeatmapChart.propTypes = {
  title:          PropTypes.string,
  subtitle:       PropTypes.string,
  kpi:            PropTypes.shape({
    value:   PropTypes.string.isRequired,
    badge:   PropTypes.shape({
      icon:  PropTypes.string,
      text:  PropTypes.string,
      label: PropTypes.string,
    }),
  }),
  showKpi:        PropTypes.bool,
  data:           PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  rowLabels:      PropTypes.arrayOf(PropTypes.string),
  colLabels:      PropTypes.arrayOf(PropTypes.string),
  yAxisTitle:     PropTypes.string,
  xAxisTitle:     PropTypes.string,
  yTicks:         PropTypes.arrayOf(PropTypes.string),
  scaleMin:       PropTypes.number,
  scaleMax:       PropTypes.number,
  showColorScale: PropTypes.bool,
  dir:            PropTypes.oneOf(['ltr', 'rtl']),
};
