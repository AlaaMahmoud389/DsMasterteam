import { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './VerticalBarChart.module.css';
import { ChartTooltip } from '../shared/ChartTooltip';
import { ChartLegend } from '../shared/ChartLegend';

/**
 * VerticalBarChart — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4471-3525
 *
 * Variants  : single | group | stacked | combo
 * Bar widths: single=34px · group=10px · gap=4px (Figma node 4471:3525)
 * Series colors: series-1=#1849a9 · series-3=#2e90fa · series-4=#53b1fd
 * RTL: category order reverses (first category on the right)
 *
 * Axis label colors (from Figma 4471:3525):
 *   tick labels      → charts/header-title/title (#000b36)
 *   category labels  → charts/header-title/title (#000b36)
 *   axis titles      → charts/header-title/title (#000b36)
 *   (VBC uses title color for ALL axis text, unlike HBC which uses subtitle/axis-label)
 */

const SERIES_COLORS = [
  'var(--chart-series-1, #1849a9)',
  'var(--chart-series-3, #2e90fa)',
  'var(--chart-series-4, #53b1fd)',
  'var(--chart-series-2, #175cd3)',
  'var(--chart-series-5, #b2ddff)',
  'var(--chart-series-6, #d1e9ff)',
];

function computeTicks(maxVal) {
  if (!maxVal || maxVal <= 0) return [0, 100, 200, 300];
  const roughStep = maxVal / 5;
  const mag = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const norm = roughStep / mag;
  const niceStep =
    norm <= 1   ? mag :
    norm <= 2   ? 2 * mag :
    norm <= 5   ? 5 * mag :
    10 * mag;
  const niceMax = Math.ceil(maxVal / niceStep) * niceStep;
  const ticks = [];
  for (let t = 0; t <= niceMax + 0.001; t += niceStep) {
    ticks.push(Math.round(t));
    if (ticks.length > 10) break;
  }
  return ticks;
}

export function VerticalBarChart({
  title,
  series = [],
  categories = [],
  barType = 'single',
  maxValue,
  kpi,
  showLegend = false,
  showKpi = true,
  yAxisTitle,
  xAxisTitle,
  dir = 'ltr',
}) {
  const isRtl      = dir === 'rtl';
  const seriesCount = series.length;
  const catCount    = categories.length;

  /* ── Legend filtering state ─────────────────────────── */
  const [hiddenSeries, setHiddenSeries] = useState(new Set());

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

  /* ── Tooltip state ──────────────────────────────────── */
  const cardRef = useRef(null);
  const svgRef  = useRef(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, rows: [], dir });

  const showTooltipAt = useCallback((e, rows) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + (isRtl ? -140 : 14);
    const y = e.clientY - rect.top  - 48;
    setTooltip({ visible: true, x: Math.max(4, x), y: Math.max(4, y), rows, dir });
  }, [isRtl, dir]);

  const hideTooltip = useCallback(() => {
    setTooltip(t => ({ ...t, visible: false }));
  }, []);

  const showTooltipFromFocus = useCallback((svgBarX, svgBarY, bW, rows) => {
    if (!cardRef.current || !svgRef.current) return;
    const svgEl    = svgRef.current;
    const svgRect  = svgEl.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();
    const scaleX   = svgRect.width  / VIEW_W;
    const scaleY   = svgRect.height / svgEl.viewBox.baseVal.height;
    const x = (svgBarX + bW / 2) * scaleX + (svgRect.left - cardRect.left) + 14;
    const y = svgBarY * scaleY + (svgRect.top - cardRect.top) - 32;
    setTooltip({ visible: true, x: Math.max(4, x), y: Math.max(4, y), rows, dir });
  }, [dir]);

  /* ── SVG layout — margin-based, direction-aware ──── */
  const VIEW_W = 560;
  const PLOT_H  = 180;

  const margin = {
    top:    32,
    right:  isRtl ? 88 : 24,   /* RTL: 12px gap + ~40px label + 20px title breathing room */
    bottom: 56,
    left:   isRtl ? 24 : 72,
  };

  const SVG_H   = margin.top + PLOT_H + margin.bottom;
  const plotX   = margin.left;
  const plotW   = VIEW_W - margin.left - margin.right;
  const plotY   = margin.top;

  const SINGLE_BAR_W  = 34;
  const GROUP_BAR_W   = 10;
  const GROUP_BAR_GAP = 4;

  const colW      = plotW / Math.max(catCount, 1);
  const singleBarW = Math.min(SINGLE_BAR_W, colW * 0.55);

  /* Max value — account for hidden series */
  let dataMax = 0;
  if (barType === 'stacked') {
    for (let i = 0; i < catCount; i++) {
      const sum = series.reduce((acc, s, si) => {
        if (hiddenSeries.has(si)) return acc;
        return acc + (s.data[i] || 0);
      }, 0);
      if (sum > dataMax) dataMax = sum;
    }
  } else if (barType === 'stacked-combo') {
    for (let i = 0; i < catCount; i++) {
      const sum = series.reduce((acc, s, si) => {
        if (hiddenSeries.has(si) || s.type === 'line') return acc;
        return acc + (s.data[i] || 0);
      }, 0);
      if (sum > dataMax) dataMax = sum;
    }
    series.forEach((s, si) => {
      if (!hiddenSeries.has(si) && s.type === 'line') {
        s.data.forEach(v => { if (v > dataMax) dataMax = v; });
      }
    });
  } else {
    series.forEach((s, si) => {
      if (hiddenSeries.has(si)) return;
      s.data.forEach(v => { if (v > dataMax) dataMax = v; });
    });
  }

  const ticks    = computeTicks(maxValue || dataMax || 100);
  const finalMax = ticks[ticks.length - 1];
  const scale    = v => (v / finalMax) * PLOT_H;

  /* RTL: reverse category column order */
  const colCenterX = ci => {
    const idx = isRtl ? catCount - 1 - ci : ci;
    return plotX + idx * colW + colW / 2;
  };

  const valY      = v => plotY + PLOT_H - scale(v);
  const baselineY = plotY + PLOT_H;

  /* Y-axis — right side in RTL, left side in LTR */
  const tickLabelX      = isRtl ? plotX + plotW + 12 : plotX - 8;  /* 12px outside plot edge in RTL */
  const tickLabelAnchor = isRtl ? 'start' : 'end';
  const yTitleX         = isRtl ? VIEW_W - 18 : 14;                /* title at far edge with padding */
  const yTitleRotate    = isRtl ? 90 : -90;
  const yTitleMidY      = plotY + PLOT_H / 2;
  const yAxisLineX      = isRtl ? plotX + plotW : plotX;           /* axis line on right in RTL */

  return (
    <div className={styles.card} dir={dir} ref={cardRef}>
      <p className={styles.title}>{title}</p>

      <div className={styles.content}>
        {showKpi && kpi && (
          <div className={styles.kpiBlock}>
            <p className={styles.kpiValue}>{kpi.value}</p>
            {kpi.badge && (
              <div className={styles.kpiRow}>
                <span className={styles.kpiBadge} aria-label={`Trend: ${kpi.badge.text}`}>
                  {kpi.badge.icon && <span aria-hidden="true">{kpi.badge.icon}</span>}
                  {' '}{kpi.badge.text}
                </span>
                {kpi.badge.label && (
                  <span className={styles.kpiLabel}>{kpi.badge.label}</span>
                )}
              </div>
            )}
          </div>
        )}

        {showLegend && seriesCount > 1 && (
          <ChartLegend
            series={series}
            hiddenSeries={hiddenSeries}
            onToggle={toggleSeries}
            colors={SERIES_COLORS}
          />
        )}

        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_W} ${SVG_H}`}
          width="100%"
          role="img"
          aria-label={title}
          className={styles.svg}
        >
          <title>{title}</title>

          {/* Y-axis title — Figma VBC: charts/header-title/title = #000b36 */}
          {yAxisTitle && (
            <text
              x={yTitleX}
              y={yTitleMidY}
              textAnchor="middle"
              fontSize="14px"
              fontWeight="500"
              fill="var(--chart-title, #000b36)"
              fontFamily="IBM Plex Sans Arabic, sans-serif"
              transform={`rotate(${yTitleRotate}, ${yTitleX}, ${yTitleMidY})`}
              aria-hidden="true"
            >
              {yAxisTitle}
            </text>
          )}

          {/* Horizontal grid lines + Y-axis tick labels — Figma VBC: #000b36 */}
          <g aria-hidden="true">
            {ticks.map(t => {
              const ty = valY(t);
              return (
                <g key={t}>
                  <line
                    x1={plotX}         y1={ty}
                    x2={plotX + plotW} y2={ty}
                    stroke="var(--chart-border, #f3f4f6)"
                    strokeWidth="1"
                  />
                  <text
                    x={tickLabelX}
                    y={ty + 4}
                    textAnchor={tickLabelAnchor}
                    direction="ltr"
                    fontSize="14px"
                    fill="var(--chart-title, #000b36)"
                    fontFamily="IBM Plex Sans Arabic, sans-serif"
                  >
                    {t}
                  </text>
                </g>
              );
            })}
          </g>

          {/* X-axis baseline + Y-axis line */}
          <g aria-hidden="true">
            <line
              x1={plotX} y1={baselineY}
              x2={plotX + plotW} y2={baselineY}
              stroke="var(--chart-border, #e5e7eb)" strokeWidth="1.5"
            />
            <line
              x1={yAxisLineX} y1={plotY}
              x2={yAxisLineX} y2={baselineY}
              stroke="var(--chart-border, #e5e7eb)" strokeWidth="1.5"
            />
          </g>

          {/* X-axis title — Figma VBC: charts/header-title/title = #000b36 */}
          {xAxisTitle && (
            <text
              x={plotX + plotW / 2}
              y={SVG_H - 8}
              textAnchor="middle"
              fontSize="14px"
              fontWeight="500"
              fill="var(--chart-title, #000b36)"
              fontFamily="IBM Plex Sans Arabic, sans-serif"
              direction={isRtl ? 'rtl' : undefined}
              aria-hidden="true"
            >
              {xAxisTitle}
            </text>
          )}

          {/* Bars + category labels per column */}
          {categories.map((cat, ci) => {
            const cx = colCenterX(ci);
            let bars = null;

            if (barType === 'single') {
              const val  = series[0]?.data[ci] ?? 0;
              const bH   = scale(val);
              const fill = val === 0
                ? 'var(--chart-null, #d2d6db)'
                : (series[0].color || SERIES_COLORS[0]);
              const bX = cx - singleBarW / 2;
              const bY = valY(val);
              const tooltipRows = [
                { label: cat,           value: String(val) },
                { label: series[0].label, value: '', marker: fill },
              ];
              bars = (
                <rect
                  x={bX} y={bY}
                  width={singleBarW} height={Math.max(bH, 0)}
                  fill={fill} rx="2"
                  aria-label={`${cat}: ${val}`}
                  tabIndex={0}
                  onMouseEnter={e => showTooltipAt(e, tooltipRows)}
                  onMouseLeave={hideTooltip}
                  onFocus={() => showTooltipFromFocus(bX, bY, singleBarW, tooltipRows)}
                  onBlur={hideTooltip}
                  onKeyDown={e => e.key === 'Escape' && hideTooltip()}
                  style={{ cursor: 'pointer', outline: 'none' }}
                />
              );

            } else if (barType === 'group') {
              const clusterW    = seriesCount * GROUP_BAR_W + Math.max(0, seriesCount - 1) * GROUP_BAR_GAP;
              const clusterLeft = cx - clusterW / 2;
              bars = series.map((s, si) => {
                if (hiddenSeries.has(si)) return null;
                const val  = s.data[ci] ?? 0;
                const bH   = scale(val);
                const bX   = clusterLeft + si * (GROUP_BAR_W + GROUP_BAR_GAP);
                const bY   = valY(val);
                const fill = val === 0
                  ? 'var(--chart-null, #d2d6db)'
                  : (s.color || SERIES_COLORS[si]);
                const tooltipRows = [
                  { label: cat,     value: String(val) },
                  { label: s.label, value: '', marker: fill },
                ];
                return (
                  <rect
                    key={`${cat}-g${si}`}
                    x={bX} y={bY}
                    width={GROUP_BAR_W} height={Math.max(bH, 0)}
                    fill={fill} rx="1"
                    aria-label={`${s.label} — ${cat}: ${val}`}
                    tabIndex={0}
                    onMouseEnter={e => showTooltipAt(e, tooltipRows)}
                    onMouseLeave={hideTooltip}
                    onFocus={() => showTooltipFromFocus(bX, bY, GROUP_BAR_W, tooltipRows)}
                    onBlur={hideTooltip}
                    onKeyDown={e => e.key === 'Escape' && hideTooltip()}
                    style={{ cursor: 'pointer', outline: 'none' }}
                  />
                );
              });

            } else if (barType === 'stacked') {
              let offset = 0;
              bars = series.map((s, si) => {
                if (hiddenSeries.has(si)) return null;
                const val     = s.data[ci] ?? 0;
                const segTopY = valY(offset + val);
                const segH    = scale(val);
                offset += val;
                const fill = val === 0
                  ? 'var(--chart-null, #d2d6db)'
                  : (s.color || SERIES_COLORS[si]);
                const tooltipRows = [
                  { label: cat,     value: String(val) },
                  { label: s.label, value: '', marker: fill },
                ];
                return (
                  <rect
                    key={`${cat}-st${si}`}
                    x={cx - singleBarW / 2} y={segTopY}
                    width={singleBarW} height={Math.max(segH, 0)}
                    fill={fill}
                    aria-label={`${s.label} — ${cat}: ${val}`}
                    tabIndex={0}
                    onMouseEnter={e => showTooltipAt(e, tooltipRows)}
                    onMouseLeave={hideTooltip}
                    onFocus={() => showTooltipFromFocus(cx - singleBarW / 2, segTopY, singleBarW, tooltipRows)}
                    onBlur={hideTooltip}
                    onKeyDown={e => e.key === 'Escape' && hideTooltip()}
                    style={{ cursor: 'pointer', outline: 'none' }}
                  />
                );
              });

            } else if (barType === 'combo') {
              const s0  = series[0];
              const val = s0?.data[ci] ?? 0;
              const bH  = scale(val);
              const bX  = cx - singleBarW / 2;
              const bY  = valY(val);
              const fill = val === 0
                ? 'var(--chart-null, #d2d6db)'
                : (s0.color || SERIES_COLORS[0]);
              const tooltipRows = [
                { label: cat,       value: String(val) },
                { label: s0?.label, value: '', marker: fill },
              ];
              bars = (
                <rect
                  key={`${cat}-combo-bar`}
                  x={bX} y={bY}
                  width={singleBarW} height={Math.max(bH, 0)}
                  fill={fill} rx="2"
                  aria-label={`${s0?.label} — ${cat}: ${val}`}
                  tabIndex={0}
                  onMouseEnter={e => showTooltipAt(e, tooltipRows)}
                  onMouseLeave={hideTooltip}
                  onFocus={() => showTooltipFromFocus(bX, bY, singleBarW, tooltipRows)}
                  onBlur={hideTooltip}
                  onKeyDown={e => e.key === 'Escape' && hideTooltip()}
                  style={{ cursor: 'pointer', outline: 'none' }}
                />
              );

            } else if (barType === 'stacked-combo') {
              let offset = 0;
              bars = series.map((s, si) => {
                if (s.type === 'line') return null;
                if (hiddenSeries.has(si)) return null;
                const val     = s.data[ci] ?? 0;
                const segTopY = valY(offset + val);
                const segH    = scale(val);
                offset += val;
                const fill = val === 0
                  ? 'var(--chart-null, #d2d6db)'
                  : (s.color || SERIES_COLORS[si % SERIES_COLORS.length]);
                const tooltipRows = [
                  { label: cat,     value: String(val) },
                  { label: s.label, value: '', marker: fill },
                ];
                return (
                  <rect
                    key={`${cat}-sc${si}`}
                    x={cx - singleBarW / 2} y={segTopY}
                    width={singleBarW} height={Math.max(segH, 0)}
                    fill={fill}
                    aria-label={`${s.label} — ${cat}: ${val}`}
                    tabIndex={0}
                    onMouseEnter={e => showTooltipAt(e, tooltipRows)}
                    onMouseLeave={hideTooltip}
                    onFocus={() => showTooltipFromFocus(cx - singleBarW / 2, segTopY, singleBarW, tooltipRows)}
                    onBlur={hideTooltip}
                    onKeyDown={e => e.key === 'Escape' && hideTooltip()}
                    style={{ cursor: 'pointer', outline: 'none' }}
                  />
                );
              });
            }

            return (
              <g key={cat}>
                {bars}
                {/* Category label — Figma VBC: charts/header-title/title = #000b36 */}
                <text
                  x={cx}
                  y={baselineY + 28}
                  textAnchor="middle"
                  fontSize="14px"
                  fill="var(--chart-title, #000b36)"
                  fontFamily="IBM Plex Sans Arabic, sans-serif"
                  direction={isRtl ? 'rtl' : undefined}
                  aria-hidden="true"
                >
                  {cat}
                </text>
              </g>
            );
          })}

          {/* Combo / stacked-combo: line series overlay */}
          {(barType === 'combo' || barType === 'stacked-combo') && series.map((s, si) => {
            const isLine = barType === 'combo' ? si > 0 : s.type === 'line';
            if (!isLine) return null;
            if (hiddenSeries.has(si)) return null;
            const color = s.color || SERIES_COLORS[si % SERIES_COLORS.length];
            const points = categories.map((_, ci) => {
              const cx  = colCenterX(ci);
              const val = s.data[ci] ?? 0;
              return `${cx},${valY(val)}`;
            }).join(' ');
            return (
              <g key={`line-${s.label}`} aria-hidden="true">
                <polyline
                  points={points}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {categories.map((cat, ci) => {
                  const cx  = colCenterX(ci);
                  const val = s.data[ci] ?? 0;
                  const tooltipRows = [
                    { label: cat,     value: String(val) },
                    { label: s.label, value: '', marker: color },
                  ];
                  return (
                    <circle
                      key={`dot-${ci}`}
                      cx={cx} cy={valY(val)}
                      r="4"
                      fill={color}
                      stroke="#fff"
                      strokeWidth="1.5"
                      aria-label={`${s.label} — ${cat}: ${val}`}
                      tabIndex={0}
                      onMouseEnter={e => showTooltipAt(e, tooltipRows)}
                      onMouseLeave={hideTooltip}
                      onBlur={hideTooltip}
                      onKeyDown={e => e.key === 'Escape' && hideTooltip()}
                      style={{ cursor: 'pointer', outline: 'none' }}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Accessible data table */}
        <table className={styles.srOnly} aria-label={`${title} — data table`}>
          <caption>{title}</caption>
          <thead>
            <tr>
              <th scope="col">Category</th>
              {series.map(s => <th key={s.label} scope="col">{s.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, ci) => (
              <tr key={cat}>
                <th scope="row">{cat}</th>
                {series.map(s => <td key={s.label}>{s.data[ci] ?? 0}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tooltip — absolutely positioned inside card */}
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

VerticalBarChart.propTypes = {
  title:      PropTypes.string.isRequired,
  series:     PropTypes.arrayOf(
    PropTypes.shape({
      id:    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string.isRequired,
      data:  PropTypes.arrayOf(PropTypes.number).isRequired,
      color: PropTypes.string,
      type:  PropTypes.oneOf(['bar', 'line']),
    })
  ).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  barType:    PropTypes.oneOf(['single', 'group', 'stacked', 'combo', 'stacked-combo']),
  maxValue:   PropTypes.number,
  kpi: PropTypes.shape({
    value: PropTypes.string,
    badge: PropTypes.shape({
      icon:  PropTypes.node,
      text:  PropTypes.string,
      label: PropTypes.string,
    }),
  }),
  showLegend: PropTypes.bool,
  showKpi:    PropTypes.bool,
  yAxisTitle: PropTypes.string,
  xAxisTitle: PropTypes.string,
  dir:        PropTypes.oneOf(['ltr', 'rtl']),
};
