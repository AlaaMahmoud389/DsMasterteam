import { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './AreaChart.module.css';
import { ChartTooltip } from '../shared/ChartTooltip';
import { ChartLegend } from '../shared/ChartLegend';

/* ── Figma: WTmRAkJVvw0IvZMA7wBdTC / node 4549:4404 ───────────────────────
   cardDetails (true/false) → showKpi prop
   rtl (False/True)         → dir prop
   showContent              → X-axis category labels
   showXAxisLabel           → X-axis title label
   showYAxisLabel           → rotated Y-axis label
   series colors            → 6-token palette matching LineChart
   Y-ticks                  → 0..800 in 100-steps (9 ticks, maxValue=800)
   ─────────────────────────────────────────────────────────────────────────── */

const SERIES_STYLES = [
  { stroke: 'var(--chart-series-1, #1849a9)', hex: '#1849a9', gradTop: 'rgba(24,73,169,0.22)'   },
  { stroke: 'var(--chart-series-3, #2e90fa)', hex: '#2e90fa', gradTop: 'rgba(46,144,250,0.18)'  },
  { stroke: 'var(--chart-series-5, #b2ddff)', hex: '#b2ddff', gradTop: 'rgba(178,221,255,0.22)' },
  { stroke: 'var(--chart-series-2, #175cd3)', hex: '#175cd3', gradTop: 'rgba(23,92,211,0.18)'   },
  { stroke: 'var(--chart-series-4, #53b1fd)', hex: '#53b1fd', gradTop: 'rgba(83,177,253,0.15)'  },
  { stroke: 'var(--chart-series-6, #d1e9ff)', hex: '#d1e9ff', gradTop: 'rgba(209,233,255,0.20)' },
];

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

function buildLinePath(pts) {
  if (pts.length < 2) return '';
  return 'M ' + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L ');
}

function buildSmoothPath(pts) {
  if (pts.length < 2) return '';
  let d = `M ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx.toFixed(1)},${y0.toFixed(1)} ${cx.toFixed(1)},${y1.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`;
  }
  return d;
}

function buildStepPath(pts) {
  if (pts.length < 2) return '';
  let d = `M ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    d += ` H ${x1.toFixed(1)} V ${y1.toFixed(1)}`;
  }
  return d;
}

export function AreaChart({
  title,
  subtitle,
  series = [],
  categories = [],
  lineType = 'smooth',
  areaType = 'multi',
  maxValue,
  kpi,
  showLegend = true,
  showKpi = true,
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
      const visibleCount = series.length - prev.size;
      if (!prev.has(idx)) {
        if (visibleCount <= 1) return prev;
        return new Set([...prev, idx]);
      }
      const next = new Set(prev);
      next.delete(idx);
      return next;
    });
  }, [series.length]);

  const showTip = useCallback((e, ci) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = e.clientX - r.left + (isRtl ? -140 : 14);
    const y = e.clientY - r.top - 48;
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
    setTooltip({ visible: true, x: Math.max(4, x), y: Math.max(4, y), rows });
  }, [series, categories, hiddenSeries, isRtl]);

  const hideTip = useCallback(() => setTooltip(t => ({ ...t, visible: false })), []);

  /* ── SVG layout ─────────────────────────────────────── */
  const VIEW_W = 560;
  const PLOT_H = 200;
  const margin = { top: 16, right: isRtl ? 56 : 20, bottom: 56, left: isRtl ? 20 : 56 };
  const SVG_H = margin.top + PLOT_H + margin.bottom;
  const plotX = margin.left;
  const plotW = VIEW_W - margin.left - margin.right;
  const plotY = margin.top;
  const catCount = categories.length;

  let dataMax = 0;
  series.forEach((s, si) => {
    if (!hiddenSeries.has(si)) s.data.forEach(v => { if (v > dataMax) dataMax = v; });
  });

  const ticks = computeTicks(maxValue || dataMax || 100);
  const finalMax = ticks[ticks.length - 1];
  const xPos = ci => {
    const idx = isRtl ? catCount - 1 - ci : ci;
    return plotX + (catCount > 1 ? idx / (catCount - 1) : 0.5) * plotW;
  };
  const yPos = v => plotY + PLOT_H - (v / finalMax) * PLOT_H;
  const baseY = plotY + PLOT_H;

  const tickLabelX = isRtl ? plotX + plotW + 8 : plotX - 8;
  const tickAnchor = isRtl ? 'start' : 'end';
  const yTitleX = isRtl ? VIEW_W - 12 : 12;

  function makePts(dataArr) {
    return dataArr.map((v, ci) => [xPos(ci), yPos(v)]);
  }
  function buildPath(dataArr) {
    const pts = makePts(dataArr);
    if (lineType === 'smooth') return buildSmoothPath(pts);
    if (lineType === 'step')   return buildStepPath(pts);
    return buildLinePath(pts);
  }
  function buildAreaPath(dataArr) {
    if (catCount < 2) return '';
    const linePart = buildPath(dataArr);
    const lastX = xPos(catCount - 1).toFixed(1);
    const firstX = xPos(0).toFixed(1);
    return `${linePart} L ${lastX},${baseY.toFixed(1)} L ${firstX},${baseY.toFixed(1)} Z`;
  }

  const seriesOrder = [...series.keys()].reverse();

  /* ── Skeleton ──────────────────────────────────────── */
  if (loading) {
    return (
      <div className={styles.card} dir={dir} ref={cardRef}>
        {title && <div className={styles.header}><p className={styles.title}>{title}</p></div>}
        <svg viewBox={`0 0 ${VIEW_W} ${SVG_H}`} width="100%" className={styles.svg} aria-hidden="true">
          {[0, 1, 2, 3, 4].map(i => (
            <rect key={i} x={plotX} y={plotY + i * (PLOT_H / 5)} width={plotW} height={PLOT_H / 5 - 4}
              rx="4" fill="#e7e9ed" className={`${styles.skelPulse} ${styles[`skelDelay${i % 3 + 1}`]}`} />
          ))}
        </svg>
      </div>
    );
  }

  /* ── Empty ─────────────────────────────────────────── */
  if (empty || series.length === 0 || catCount === 0) {
    return (
      <div className={styles.card} dir={dir} ref={cardRef}>
        {title && <div className={styles.header}><p className={styles.title}>{title}</p></div>}
        <svg viewBox={`0 0 ${VIEW_W} ${SVG_H}`} width="100%" className={styles.svg} aria-hidden="true">
          <text x={VIEW_W / 2} y={SVG_H / 2} textAnchor="middle" fontSize="14"
            fill="#6c7c96" fontFamily="IBM Plex Sans Arabic,sans-serif">No data available</text>
        </svg>
      </div>
    );
  }

  /* ── Stacked area offsets ──────────────────────────── */
  let stackedOffsets = null;
  let stackedTopPts = null;
  let stackedBotPts = null;
  if (areaType === 'stacked') {
    stackedOffsets = new Array(catCount).fill(0);
    stackedTopPts = [];
    stackedBotPts = [];
    series.forEach((s, si) => {
      if (hiddenSeries.has(si)) {
        stackedTopPts.push(null);
        stackedBotPts.push(null);
        return;
      }
      const bot = s.data.map((_, ci) => [xPos(ci), yPos(stackedOffsets[ci])]);
      s.data.forEach((v, ci) => { stackedOffsets[ci] += v; });
      const top = s.data.map((_, ci) => [xPos(ci), yPos(stackedOffsets[ci])]);
      stackedTopPts.push(top);
      stackedBotPts.push(bot);
    });
  }

  return (
    <div className={styles.card} dir={dir} ref={cardRef}>
      <div className={styles.header}>
        {title && <p className={styles.title}>{title}</p>}
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

      <div className={styles.content}>
        {showLegend && series.length > 1 && (
          <ChartLegend
            series={series}
            hiddenSeries={hiddenSeries}
            onToggle={toggleSeries}
            colors={SERIES_STYLES.map(c => c.hex)}
          />
        )}

        <svg viewBox={`0 0 ${VIEW_W} ${SVG_H}`} width="100%" role="img"
          aria-label={title} className={styles.svg}>
          <title>{title}</title>

          <defs>
            {series.map((_, si) => {
              const st = SERIES_STYLES[si % SERIES_STYLES.length];
              return (
                <linearGradient key={si} id={`acg-${si}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={st.gradTop} stopOpacity="1" />
                  <stop offset="100%" stopColor={st.hex} stopOpacity="0" />
                </linearGradient>
              );
            })}
          </defs>

          {/* Y-axis rotated label */}
          {showYAxisLabel && yAxisTitle && (
            <text
              x={yTitleX} y={plotY + PLOT_H / 2}
              textAnchor="middle" fontSize="14" fontWeight="500"
              fill="var(--chart-axis, #6c7c96)"
              fontFamily="IBM Plex Sans Arabic,sans-serif"
              transform={`rotate(${isRtl ? 90 : -90},${yTitleX},${plotY + PLOT_H / 2})`}
              aria-hidden="true"
            >{yAxisTitle}</text>
          )}

          {/* Y-ticks + gridlines */}
          <g aria-hidden="true">
            {ticks.map(t => (
              <g key={t}>
                <line x1={plotX} y1={yPos(t)} x2={plotX + plotW} y2={yPos(t)}
                  stroke="var(--chart-border, #f3f4f6)" strokeWidth="1" />
                <text x={tickLabelX} y={yPos(t) + 5} textAnchor={tickAnchor}
                  fontSize="14" fill="var(--chart-axis, #6c7c96)"
                  fontFamily="IBM Plex Sans Arabic,sans-serif">{t}</text>
              </g>
            ))}
          </g>

          {/* ── Multi mode: gradient area fills (back-to-front) ── */}
          {areaType !== 'stacked' && seriesOrder.map(si => {
            if (hiddenSeries.has(si)) return null;
            return (
              <path key={`area-${si}`}
                d={buildAreaPath(series[si].data)}
                fill={`url(#acg-${si})`} />
            );
          })}

          {/* ── Stacked mode: area fills ── */}
          {areaType === 'stacked' && series.map((s, si) => {
            if (hiddenSeries.has(si) || !stackedTopPts[si]) return null;
            const st = SERIES_STYLES[si % SERIES_STYLES.length];
            const top = stackedTopPts[si];
            const bot = stackedBotPts[si];
            const topStr = top.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L ');
            const botStr = [...bot].reverse().map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L ');
            const areaPath = `M ${topStr} L ${botStr} Z`;
            return (
              <path key={`sarea-${si}`} d={areaPath} fill={st.gradTop} />
            );
          })}

          {/* ── Multi mode: line strokes (back-to-front) ── */}
          {areaType !== 'stacked' && seriesOrder.map(si => {
            if (hiddenSeries.has(si)) return null;
            const st = SERIES_STYLES[si % SERIES_STYLES.length];
            return (
              <path key={`line-${si}`}
                d={buildPath(series[si].data)}
                fill="none" stroke={st.stroke} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" />
            );
          })}

          {/* ── Stacked mode: line strokes ── */}
          {areaType === 'stacked' && series.map((s, si) => {
            if (hiddenSeries.has(si) || !stackedTopPts[si]) return null;
            const st = SERIES_STYLES[si % SERIES_STYLES.length];
            const top = stackedTopPts[si];
            const linePath = 'M ' + top.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L ');
            return (
              <path key={`sline-${si}`} d={linePath}
                fill="none" stroke={st.stroke} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" />
            );
          })}

          {/* Hover-only dots (multi) */}
          {areaType !== 'stacked' && seriesOrder.map(si => {
            if (hiddenSeries.has(si)) return null;
            const st = SERIES_STYLES[si % SERIES_STYLES.length];
            return series[si].data.map((v, ci) => (
              <circle key={`dot-${si}-${ci}`}
                cx={xPos(ci)} cy={yPos(v)} r="4"
                fill={st.hex} stroke="#fff" strokeWidth="1.5"
                className={styles.dot}
                tabIndex={0}
                aria-label={`${series[si].label} — ${categories[ci] ?? ci}: ${v}`}
                onMouseEnter={e => showTip(e, ci)} onMouseLeave={hideTip}
                onFocus={e => showTip(e, ci)} onBlur={hideTip} />
            ));
          })}

          {/* Hover-only dots (stacked) */}
          {areaType === 'stacked' && series.map((s, si) => {
            if (hiddenSeries.has(si) || !stackedTopPts[si]) return null;
            const st = SERIES_STYLES[si % SERIES_STYLES.length];
            return stackedTopPts[si].map(([cx, cy], ci) => (
              <circle key={`sdot-${si}-${ci}`}
                cx={cx} cy={cy} r="4"
                fill={st.hex} stroke="#fff" strokeWidth="1.5"
                className={styles.dot}
                tabIndex={0}
                aria-label={`${s.label} — ${categories[ci] ?? ci}: ${s.data[ci]}`}
                onMouseEnter={e => showTip(e, ci)} onMouseLeave={hideTip}
                onFocus={e => showTip(e, ci)} onBlur={hideTip} />
            ));
          })}

          {/* X-axis category labels */}
          {showContent && (
            <g aria-hidden="true">
              {categories.map((cat, ci) => (
                <text key={ci} x={xPos(ci)} y={baseY + 18} textAnchor="middle"
                  fontSize="14" fill="var(--chart-title, #000b36)"
                  fontFamily="IBM Plex Sans Arabic,sans-serif">{cat}</text>
              ))}
            </g>
          )}

          {/* X-axis title */}
          {showXAxisLabel && xAxisTitle && (
            <text x={plotX + plotW / 2} y={SVG_H - 4} textAnchor="middle"
              fontSize="14" fontWeight="500" fill="var(--chart-axis, #6c7c96)"
              fontFamily="IBM Plex Sans Arabic,sans-serif" aria-hidden="true">
              {xAxisTitle}
            </text>
          )}
        </svg>

        <table className={styles.srOnly} aria-label={`${title} — data table`}>
          <caption>{title}</caption>
          <thead>
            <tr><th>Category</th>{series.map(s => <th key={s.label}>{s.label}</th>)}</tr>
          </thead>
          <tbody>
            {categories.map((cat, ci) => (
              <tr key={cat}>
                <th>{cat}</th>
                {series.map(s => <td key={s.label}>{s.data[ci] ?? 0}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ChartTooltip visible={tooltip.visible} x={tooltip.x} y={tooltip.y} rows={tooltip.rows} dir={dir} />
    </div>
  );
}

AreaChart.propTypes = {
  title:          PropTypes.string,
  subtitle:       PropTypes.string,
  series:         PropTypes.arrayOf(PropTypes.shape({
    id:    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string.isRequired,
    data:  PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
  categories:     PropTypes.arrayOf(PropTypes.string).isRequired,
  lineType:       PropTypes.oneOf(['line', 'step', 'smooth']),
  areaType:       PropTypes.oneOf(['multi', 'stacked']),
  maxValue:       PropTypes.number,
  kpi: PropTypes.shape({
    value: PropTypes.string,
    badge: PropTypes.shape({ icon: PropTypes.node, text: PropTypes.string, label: PropTypes.string }),
  }),
  showLegend:     PropTypes.bool,
  showKpi:        PropTypes.bool,
  showYAxisLabel: PropTypes.bool,
  showXAxisLabel: PropTypes.bool,
  showContent:    PropTypes.bool,
  yAxisTitle:     PropTypes.string,
  xAxisTitle:     PropTypes.string,
  loading:        PropTypes.bool,
  empty:          PropTypes.bool,
  dir:            PropTypes.oneOf(['ltr', 'rtl']),
};
