import { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './LineChart.module.css';
import { ChartTooltip } from '../shared/ChartTooltip';
import { ChartLegend } from '../shared/ChartLegend';

/**
 * LineChart — Masterteam Design System
 * Figma nodes:
 *   4399:18102 — base (no KPI)
 *   4560:4600  — with KPI block (cardDetails=true)
 *
 * Figma variants:
 *   cardDetails    → showKpi        (show/hide KPI value + badge block)
 *   rtl            → dir="rtl"      (category order reverses)
 *   showContent    → showContent    (show/hide X-axis category labels)
 *   showXAxisLabel → showXAxisLabel (show/hide X-axis title, e.g. "Month")
 *   showYAxisLabel → showYAxisLabel (show/hide rotated Y-axis label, e.g. "Active users")
 *
 * Line types: line | step | smooth
 * Up to 6 series — Figma series-1…6 tokens
 * Dots invisible by default; appear on hover / keyboard focus
 * Y-axis ticks: #6c7c96 (axis label color) · X-axis labels: #000b36 (title color)
 */

/* ── Figma series color tokens ───────────────────────────── */
const SERIES_STYLES = [
  { stroke: 'var(--chart-series-1, #1849a9)', hex: '#1849a9', gradTop: 'rgba(24,73,169,0.22)'   },
  { stroke: 'var(--chart-series-3, #2e90fa)', hex: '#2e90fa', gradTop: 'rgba(46,144,250,0.18)'  },
  { stroke: 'var(--chart-series-5, #b2ddff)', hex: '#b2ddff', gradTop: 'rgba(178,221,255,0.22)' },
  { stroke: 'var(--chart-series-2, #175cd3)', hex: '#175cd3', gradTop: 'rgba(23,92,211,0.18)'   },
  { stroke: 'var(--chart-series-4, #53b1fd)', hex: '#53b1fd', gradTop: 'rgba(83,177,253,0.15)'  },
  { stroke: 'var(--chart-series-6, #d1e9ff)', hex: '#d1e9ff', gradTop: 'rgba(209,233,255,0.20)' },
];

/* ── Auto-compute Y-axis ticks (max 12 levels) ───────────── */
function computeTicks(maxVal) {
  if (!maxVal || maxVal <= 0) return [0, 100, 200, 300, 400];
  const roughStep = maxVal / 8;
  const mag = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const norm = roughStep / mag;
  const niceStep = norm <= 1 ? mag : norm <= 2 ? 2 * mag : norm <= 5 ? 5 * mag : 10 * mag;
  const niceMax = Math.ceil(maxVal / niceStep) * niceStep;
  const ticks = [];
  for (let t = 0; t <= niceMax + 0.001; t += niceStep) {
    ticks.push(Math.round(t));
    if (ticks.length > 12) break;
  }
  return ticks;
}

/* ── Component ───────────────────────────────────────────── */

export function LineChart({
  title,
  subtitle,
  series = [],
  categories = [],
  lineType = 'line',
  maxValue,
  kpi,
  showKpi = false,
  showLegend = true,
  showYAxisLabel = true,
  showXAxisLabel = true,
  showContent = true,
  yAxisTitle = 'Active users',
  xAxisTitle = 'Month',
  loading = false,
  empty = false,
  dir = 'ltr',
}) {
  const isRtl = dir === 'rtl';
  const cardRef = useRef(null);
  const [hiddenSeries, setHiddenSeries] = useState(new Set());
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, rows: [] });

  const toggleSeries = useCallback((idx) => {
    setHiddenSeries(prev => {
      const vis = series.length - prev.size;
      if (!prev.has(idx)) { return vis <= 1 ? prev : new Set([...prev, idx]); }
      const next = new Set(prev); next.delete(idx); return next;
    });
  }, [series.length]);

  /* Show tooltip with all visible series values for a given category index */
  const showTip = useCallback((e, ci) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const rows = [
      { label: categories[ci] || `Point ${ci + 1}`, value: '' },
      ...series
        .map((s, si) => ({
          label: s.label,
          value: String(s.data[ci] ?? 0),
          marker: s.color || SERIES_STYLES[si % SERIES_STYLES.length].hex,
        }))
        .filter((_, si) => !hiddenSeries.has(si)),
    ];
    setTooltip({
      visible: true,
      x: Math.max(4, e.clientX - r.left + (isRtl ? -140 : 14)),
      y: Math.max(4, e.clientY - r.top - 48),
      rows,
    });
  }, [series, categories, hiddenSeries, isRtl]);

  const hideTip = useCallback(() => setTooltip(t => ({ ...t, visible: false })), []);

  /* ── SVG layout ── */
  const VIEW_W = 560;
  const PLOT_H = 200;
  const Y_LABEL_W = showYAxisLabel ? 64 : 52;
  const X_CAT_H  = showContent     ? 24 : 0;
  const X_TITLE_H = showXAxisLabel ? 28 : 8;
  const margin = {
    top:    16,
    right:  isRtl ? Y_LABEL_W : 16,
    bottom: X_CAT_H + X_TITLE_H,
    left:   isRtl ? 16 : Y_LABEL_W,
  };
  const SVG_H  = margin.top + PLOT_H + margin.bottom;
  const plotX  = margin.left;
  const plotW  = VIEW_W - margin.left - margin.right;
  const plotY  = margin.top;
  const baseY  = plotY + PLOT_H;
  const catCount = categories.length;

  /* Scale */
  let dataMax = 0;
  series.forEach((s, si) => {
    if (!hiddenSeries.has(si)) s.data.forEach(v => { if (v > dataMax) dataMax = v; });
  });
  const ticks    = computeTicks(maxValue || dataMax || 800);
  const finalMax = ticks[ticks.length - 1];

  /* Coordinate helpers */
  const xPos = ci => {
    const idx = isRtl ? catCount - 1 - ci : ci;
    return plotX + (catCount > 1 ? (idx / (catCount - 1)) : 0.5) * plotW;
  };
  const yPos = v => plotY + PLOT_H - (v / finalMax) * PLOT_H;

  /* Path builders */
  function buildLinePath(dataArr) {
    if (catCount < 2) return '';
    if (lineType === 'step') {
      return dataArr.reduce((acc, v, ci) => {
        const x = xPos(ci).toFixed(1), y = yPos(v).toFixed(1);
        if (ci === 0) return `M ${x},${y}`;
        const midX = ((xPos(ci - 1) + xPos(ci)) / 2).toFixed(1);
        return `${acc} H ${midX} V ${y} H ${x}`;
      }, '');
    }
    if (lineType === 'smooth') {
      const pts = dataArr.map((v, ci) => ({ x: xPos(ci), y: yPos(v) }));
      return pts.reduce((acc, pt, i) => {
        if (i === 0) return `M ${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
        const prev = pts[i - 1];
        const cpx = ((prev.x + pt.x) / 2).toFixed(1);
        return `${acc} C ${cpx},${prev.y.toFixed(1)} ${cpx},${pt.y.toFixed(1)} ${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
      }, '');
    }
    return `M ${dataArr.map((v, ci) => `${xPos(ci).toFixed(1)},${yPos(v).toFixed(1)}`).join(' L ')}`;
  }

  const seriesOrder = [...series.keys()].reverse();

  /* ── Skeleton ── */
  if (loading) {
    return (
      <div className={styles.card} dir={dir} ref={cardRef}>
        {(title || subtitle) && (
          <div className={styles.header}>
            {title    && <p className={styles.title}>{title}</p>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        )}
        <svg viewBox={`0 0 ${VIEW_W} ${SVG_H}`} width="100%" className={styles.svg} aria-hidden="true">
          {[0, 1, 2].map(i => (
            <rect key={i} x={plotX} y={plotY + i * (PLOT_H / 3)} width={plotW} height={PLOT_H / 3 - 4}
              rx="4" fill="#e7e9ed"
              className={`${styles.skelPulse} ${styles[`skelDelay${i + 1}`]}`} />
          ))}
        </svg>
      </div>
    );
  }

  /* ── Empty ── */
  if (empty || series.length === 0 || catCount === 0) {
    return (
      <div className={styles.card} dir={dir} ref={cardRef}>
        {(title || subtitle || (showKpi && kpi)) && (
          <div className={styles.header}>
            {title    && <p className={styles.title}>{title}</p>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            {showKpi && kpi && (
              <div className={styles.kpiBlock}>
                <p className={styles.kpiValue}>{kpi.value}</p>
                {kpi.badge && (
                  <div className={styles.kpiRow}>
                    <span className={styles.kpiBadge}>
                      {kpi.badge.icon && <span className={styles.kpiBadgeIcon} aria-hidden="true">{kpi.badge.icon}</span>}
                      {kpi.badge.text}
                    </span>
                    {kpi.badge.label && <span className={styles.kpiLabel}>{kpi.badge.label}</span>}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        <svg viewBox={`0 0 ${VIEW_W} ${SVG_H}`} width="100%" className={styles.svg} aria-hidden="true">
          <text x={VIEW_W / 2} y={SVG_H / 2} textAnchor="middle" fontSize="14" fill="#6c7c96"
            fontFamily="IBM Plex Sans Arabic,sans-serif">No data available</text>
        </svg>
      </div>
    );
  }

  return (
    <div className={styles.card} dir={dir} ref={cardRef}>

      {/* Header — title, subtitle, optional KPI block (Figma: cardDetails=true / node 4560:4600) */}
      {(title || subtitle || (showKpi && kpi)) && (
        <div className={styles.header}>
          {title    && <p className={styles.title}>{title}</p>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {showKpi && kpi && (
            <div className={styles.kpiBlock}>
              <p className={styles.kpiValue}>{kpi.value}</p>
              {kpi.badge && (
                <div className={styles.kpiRow}>
                  <span className={styles.kpiBadge}>
                    {kpi.badge.icon && <span className={styles.kpiBadgeIcon} aria-hidden="true">{kpi.badge.icon}</span>}
                    {kpi.badge.text}
                  </span>
                  {kpi.badge.label && <span className={styles.kpiLabel}>{kpi.badge.label}</span>}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className={styles.content}>
        {/* Legend — Figma: top, flex-wrap, gap-[12px] */}
        {showLegend && series.length > 0 && (
          <ChartLegend
            series={series}
            hiddenSeries={hiddenSeries}
            onToggle={toggleSeries}
            colors={SERIES_STYLES.map(s => s.hex)}
          />
        )}

        <svg viewBox={`0 0 ${VIEW_W} ${SVG_H}`} width="100%"
          role="img" aria-label={title || 'Line chart'} className={styles.svg}>
          <title>{title || 'Line chart'}</title>

          {/* Y-axis rotated label — Figma: 14px/500, #6c7c96 */}
          {showYAxisLabel && yAxisTitle && (
            <text
              x={isRtl ? VIEW_W - 14 : 14}
              y={plotY + PLOT_H / 2}
              textAnchor="middle"
              fontSize="14" fontWeight="500"
              fill="var(--chart-axis, #6c7c96)"
              fontFamily="IBM Plex Sans Arabic,sans-serif"
              transform={`rotate(${isRtl ? 90 : -90},${isRtl ? VIEW_W - 14 : 14},${plotY + PLOT_H / 2})`}
              aria-hidden="true"
            >
              {yAxisTitle}
            </text>
          )}

          {/* Y-axis tick labels + horizontal gridlines — Figma: 14px/400, #6c7c96 */}
          <g aria-hidden="true">
            {ticks.map(t => (
              <g key={t}>
                <line
                  x1={plotX} y1={yPos(t).toFixed(1)}
                  x2={plotX + plotW} y2={yPos(t).toFixed(1)}
                  stroke="var(--chart-border, #f3f4f6)" strokeWidth="1"
                />
                <text
                  x={isRtl ? plotX + plotW + 6 : plotX - 6}
                  y={(yPos(t) + 5).toFixed(1)}
                  textAnchor={isRtl ? 'start' : 'end'}
                  direction="ltr"
                  fontSize="14" fontWeight="400"
                  fill="var(--chart-axis, #6c7c96)"
                  fontFamily="IBM Plex Sans Arabic,sans-serif"
                >
                  {t}
                </text>
              </g>
            ))}
          </g>

          {/* Line strokes — back to front */}
          {seriesOrder.map(si => {
            if (hiddenSeries.has(si)) return null;
            const color = series[si].color || SERIES_STYLES[si % SERIES_STYLES.length].stroke;
            return (
              <path key={`line-${si}`}
                d={buildLinePath(series[si].data)}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}

          {/* Interaction dots — invisible by default, appear on hover/focus */}
          {seriesOrder.map(si => {
            if (hiddenSeries.has(si)) return null;
            const s = series[si];
            const color = s.color || SERIES_STYLES[si % SERIES_STYLES.length].stroke;
            return s.data.map((v, ci) => (
              <circle key={`dot-${si}-${ci}`}
                cx={xPos(ci).toFixed(1)} cy={yPos(v).toFixed(1)} r="4.5"
                fill={color} stroke="#fff" strokeWidth="1.5"
                className={styles.dot}
                tabIndex={0}
                aria-label={`${s.label} — ${categories[ci] || `Point ${ci + 1}`}: ${v}`}
                onMouseEnter={e => showTip(e, ci)}
                onMouseLeave={hideTip}
                onFocus={e => showTip(e, ci)}
                onBlur={hideTip}
              />
            ));
          })}

          {/* X-axis category labels — Figma: 14px/400, #000b36 */}
          {showContent && (
            <g aria-hidden="true">
              {categories.map((cat, ci) => (
                <text key={ci}
                  x={xPos(ci).toFixed(1)}
                  y={(baseY + 18).toFixed(1)}
                  textAnchor="middle"
                  fontSize="14" fontWeight="400"
                  fill="var(--chart-title, #000b36)"
                  fontFamily="IBM Plex Sans Arabic,sans-serif"
                >
                  {cat}
                </text>
              ))}
            </g>
          )}

          {/* X-axis title — Figma: 14px/500, #6c7c96, centered */}
          {showXAxisLabel && xAxisTitle && (
            <text
              x={(plotX + plotW / 2).toFixed(1)}
              y={(SVG_H - 6).toFixed(1)}
              textAnchor="middle"
              fontSize="14" fontWeight="500"
              fill="var(--chart-axis, #6c7c96)"
              fontFamily="IBM Plex Sans Arabic,sans-serif"
              aria-hidden="true"
            >
              {xAxisTitle}
            </text>
          )}
        </svg>

        {/* Screen-reader table */}
        <table className={styles.srOnly} aria-label={`${title || 'Line chart'} — data table`}>
          <caption>{title || 'Line chart'}</caption>
          <thead>
            <tr>
              <th scope="col">Category</th>
              {series.map((s, i) => <th key={i} scope="col">{s.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, ci) => (
              <tr key={ci}>
                <th scope="row">{cat}</th>
                {series.map((s, si) => <td key={si}>{s.data[ci] ?? 0}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ChartTooltip visible={tooltip.visible} x={tooltip.x} y={tooltip.y} rows={tooltip.rows} dir={dir} />
    </div>
  );
}

LineChart.propTypes = {
  title:           PropTypes.string,
  subtitle:        PropTypes.string,
  series:          PropTypes.arrayOf(PropTypes.shape({
    id:    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string.isRequired,
    data:  PropTypes.arrayOf(PropTypes.number).isRequired,
    color: PropTypes.string,
  })).isRequired,
  categories:      PropTypes.arrayOf(PropTypes.string).isRequired,
  lineType:        PropTypes.oneOf(['line', 'step', 'smooth']),
  maxValue:        PropTypes.number,
  kpi: PropTypes.shape({
    value: PropTypes.string,
    badge: PropTypes.shape({ icon: PropTypes.node, text: PropTypes.string, label: PropTypes.string }),
  }),
  showKpi:         PropTypes.bool,
  showLegend:      PropTypes.bool,
  showYAxisLabel:  PropTypes.bool,
  showXAxisLabel:  PropTypes.bool,
  showContent:     PropTypes.bool,
  yAxisTitle:      PropTypes.string,
  xAxisTitle:      PropTypes.string,
  loading:         PropTypes.bool,
  empty:           PropTypes.bool,
  dir:             PropTypes.oneOf(['ltr', 'rtl']),
};
