import { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './HorizontalBarChart.module.css';
import { ChartTooltip } from '../shared/ChartTooltip';
import { ChartLegend } from '../shared/ChartLegend';

/**
 * HorizontalBarChart — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4578-9576
 *
 * Variants  : single | group | stacked
 * Bar heights: single=28px · group=9px · gap=4px (Figma node 4578:9575 / 4578:9561)
 * Series colors: series-1=#1849a9 · series-3=#2e90fa · series-4=#53b1fd
 * RTL: bars grow right-to-left; category labels shift to right side
 *
 * Axis label colors (from Figma 4578:9575):
 *   tick labels  → charts/header-title/subtitle (#3c5073)
 *   axis titles  → charts/axis/title/label-color (#6c7c96)
 */

const SERIES_COLORS = [
  'var(--chart-series-1, #1849a9)',
  'var(--chart-series-3, #2e90fa)',
  'var(--chart-series-4, #53b1fd)',
];

function computeTicks(maxVal) {
  if (!maxVal || maxVal <= 0) return [0, 100, 200, 300];
  const roughStep = maxVal / 5;
  const mag = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const norm = roughStep / mag;
  const niceStep =
    norm <= 1 ? mag :
    norm <= 2 ? 2 * mag :
    norm <= 5 ? 5 * mag :
    10 * mag;
  const niceMax = Math.ceil(maxVal / niceStep) * niceStep;
  const ticks = [];
  for (let t = 0; t <= niceMax + 0.001; t += niceStep) {
    ticks.push(Math.round(t));
    if (ticks.length > 10) break;
  }
  return ticks;
}

export function HorizontalBarChart({
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
  const isRtl = dir === 'rtl';
  const seriesCount = series.length;
  const catCount = categories.length;

  /* ── Legend filtering state ─────────────────────────── */
  const [hiddenSeries, setHiddenSeries] = useState(new Set());

  const toggleSeries = useCallback((idx) => {
    setHiddenSeries(prev => {
      const visibleCount = series.length - prev.size;
      if (!prev.has(idx)) {
        if (visibleCount <= 1) return prev; // guard: keep ≥1 visible
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

  const showTooltipFromFocus = useCallback((svgBarX, svgBarY, barH, rows) => {
    if (!cardRef.current || !svgRef.current) return;
    const svgEl  = svgRef.current;
    const svgRect  = svgEl.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();
    const scaleX = svgRect.width  / VIEW_W;
    const scaleY = svgRect.height / svgEl.viewBox.baseVal.height;
    const x = svgBarX * scaleX + (svgRect.left - cardRect.left) + 14;
    const y = (svgBarY + barH / 2) * scaleY + (svgRect.top - cardRect.top) - 24;
    setTooltip({ visible: true, x: Math.max(4, x), y: Math.max(4, y), rows, dir });
  }, [dir]);

  /* ── SVG layout — margin-based, direction-aware ──── */
  const VIEW_W = 560;

  const margin = {
    top:    24,
    right:  isRtl ? 120 : 24,
    bottom: 56,
    left:   isRtl ? 24  : 100,
  };

  const SINGLE_BAR_H  = 28;
  const GROUP_BAR_H   = 9;
  const GROUP_BAR_GAP = 4;
  const ROW_GAP       = 16;

  const barClusterH = barType === 'group'
    ? seriesCount * GROUP_BAR_H + Math.max(0, seriesCount - 1) * GROUP_BAR_GAP
    : SINGLE_BAR_H;

  const rowH  = barClusterH + ROW_GAP;
  const SVG_H = margin.top + catCount * rowH + margin.bottom;

  const plotX = margin.left;
  const plotW = VIEW_W - margin.left - margin.right;

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
  } else {
    series.forEach((s, si) => {
      if (hiddenSeries.has(si)) return;
      s.data.forEach(v => { if (v > dataMax) dataMax = v; });
    });
  }

  const ticks    = computeTicks(maxValue || dataMax || 100);
  const finalMax = ticks[ticks.length - 1];
  const scale    = v => (v / finalMax) * plotW;

  const tickX = t => isRtl ? plotX + plotW - scale(t) : plotX + scale(t);

  /* Category labels — 14px gap from plot edge (Figma: gap-[14px]) */
  const catLabelX      = isRtl ? plotX + plotW + 14 : plotX - 14;
  const catLabelAnchor = isRtl ? 'start' : 'end';

  const yTitleX      = isRtl ? VIEW_W - 16 : 16;
  const yTitleRotate = isRtl ? 90 : -90;
  const yTitleMidY   = margin.top + (catCount * rowH) / 2;

  /* ── Bar renderers ──────────────────────────────────── */
  const makeBarsForRow = ({ cat, ci, clusterTopY }) => {
    if (barType === 'single') {
      const s   = series[0];
      const val = s?.data[ci] ?? 0;
      const w   = scale(val);
      const x   = isRtl ? plotX + plotW - w : plotX;
      const fill = val === 0
        ? 'var(--chart-null, #d2d6db)'
        : (s.color || SERIES_COLORS[0]);
      const tooltipRows = [
        { label: cat,       value: String(val) },
        { label: s.label,   value: '', marker: fill },
      ];
      return (
        <rect
          key={`${cat}-0`}
          x={x} y={clusterTopY}
          width={Math.max(w, 0)} height={SINGLE_BAR_H}
          fill={fill} rx="2"
          aria-label={`${cat}: ${val}`}
          tabIndex={0}
          onMouseEnter={e => showTooltipAt(e, tooltipRows)}
          onMouseLeave={hideTooltip}
          onFocus={() => showTooltipFromFocus(x, clusterTopY, SINGLE_BAR_H, tooltipRows)}
          onBlur={hideTooltip}
          onKeyDown={e => e.key === 'Escape' && hideTooltip()}
          style={{ cursor: 'pointer', outline: 'none' }}
        />
      );
    }

    if (barType === 'group') {
      return series.map((s, si) => {
        if (hiddenSeries.has(si)) return null;
        const val  = s.data[ci] ?? 0;
        const w    = scale(val);
        const x    = isRtl ? plotX + plotW - w : plotX;
        const barY = clusterTopY + si * (GROUP_BAR_H + GROUP_BAR_GAP);
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
            x={x} y={barY}
            width={Math.max(w, 0)} height={GROUP_BAR_H}
            fill={fill} rx="1"
            aria-label={`${s.label} — ${cat}: ${val}`}
            tabIndex={0}
            onMouseEnter={e => showTooltipAt(e, tooltipRows)}
            onMouseLeave={hideTooltip}
            onFocus={() => showTooltipFromFocus(x, barY, GROUP_BAR_H, tooltipRows)}
            onBlur={hideTooltip}
            onKeyDown={e => e.key === 'Escape' && hideTooltip()}
            style={{ cursor: 'pointer', outline: 'none' }}
          />
        );
      });
    }

    if (barType === 'stacked') {
      let offset = 0;
      return series.map((s, si) => {
        if (hiddenSeries.has(si)) return null;
        const val  = s.data[ci] ?? 0;
        const w    = scale(val);
        const x    = isRtl
          ? plotX + plotW - scale(offset + val)
          : plotX + scale(offset);
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
            x={x} y={clusterTopY}
            width={Math.max(w, 0)} height={SINGLE_BAR_H}
            fill={fill}
            aria-label={`${s.label} — ${cat}: ${val}`}
            tabIndex={0}
            onMouseEnter={e => showTooltipAt(e, tooltipRows)}
            onMouseLeave={hideTooltip}
            onFocus={() => showTooltipFromFocus(x, clusterTopY, SINGLE_BAR_H, tooltipRows)}
            onBlur={hideTooltip}
            onKeyDown={e => e.key === 'Escape' && hideTooltip()}
            style={{ cursor: 'pointer', outline: 'none' }}
          />
        );
      });
    }

    return null;
  };

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

          {/* Y-axis title (rotated) — color: charts/axis/title/label-color = #6c7c96 */}
          {yAxisTitle && (
            <text
              x={yTitleX}
              y={yTitleMidY}
              textAnchor="middle"
              fontSize="14px"
              fontWeight="500"
              fill="var(--chart-axis-label, #6c7c96)"
              fontFamily="IBM Plex Sans Arabic, sans-serif"
              transform={`rotate(${yTitleRotate}, ${yTitleX}, ${yTitleMidY})`}
              aria-hidden="true"
            >
              {yAxisTitle}
            </text>
          )}

          {/* Vertical grid lines + X-axis tick labels — color: charts/header-title/subtitle = #3c5073 */}
          <g aria-hidden="true">
            {ticks.map(t => {
              const tx = tickX(t);
              return (
                <g key={t}>
                  <line
                    x1={tx} y1={margin.top}
                    x2={tx} y2={margin.top + catCount * rowH}
                    stroke="var(--chart-border, #f3f4f6)"
                    strokeWidth="1"
                  />
                  <text
                    x={tx}
                    y={margin.top + catCount * rowH + 22}
                    textAnchor="middle"
                    fontSize="14px"
                    fill="var(--chart-subtitle, #3c5073)"
                    fontFamily="IBM Plex Sans Arabic, sans-serif"
                  >
                    {t}
                  </text>
                </g>
              );
            })}
          </g>

          {/* X-axis title — color: charts/axis/title/label-color = #6c7c96 */}
          {xAxisTitle && (
            <text
              x={plotX + plotW / 2}
              y={SVG_H - 6}
              textAnchor="middle"
              fontSize="14px"
              fontWeight="500"
              fill="var(--chart-axis-label, #6c7c96)"
              fontFamily="IBM Plex Sans Arabic, sans-serif"
              aria-hidden="true"
            >
              {xAxisTitle}
            </text>
          )}

          {/* Category rows — label color: charts/header-title/subtitle = #3c5073 */}
          {categories.map((cat, ci) => {
            const clusterTopY = margin.top + ci * rowH + ROW_GAP / 2;
            const labelY = clusterTopY + barClusterH / 2 + 5;
            return (
              <g key={cat}>
                <text
                  x={catLabelX}
                  y={labelY}
                  textAnchor={catLabelAnchor}
                  fontSize="14px"
                  fill="var(--chart-subtitle, #3c5073)"
                  fontFamily="IBM Plex Sans Arabic, sans-serif"
                  aria-hidden="true"
                >
                  {cat}
                </text>
                {makeBarsForRow({ cat, ci, clusterTopY })}
              </g>
            );
          })}
        </svg>

        {/* Accessible data table — screen readers */}
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

HorizontalBarChart.propTypes = {
  title:      PropTypes.string.isRequired,
  series:     PropTypes.arrayOf(
    PropTypes.shape({
      id:    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string.isRequired,
      data:  PropTypes.arrayOf(PropTypes.number).isRequired,
      color: PropTypes.string,
    })
  ).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  barType:    PropTypes.oneOf(['single', 'group', 'stacked']),
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
