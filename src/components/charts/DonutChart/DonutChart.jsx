import { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './DonutChart.module.css';
import { ChartTooltip } from '../shared/ChartTooltip';
import { ChartLegend } from '../shared/ChartLegend';

/**
 * DonutChart — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4112-14
 *
 * Types    : donut | pie | half
 * SVG geo  : cx=140, cy=140, outerRadius=110, innerRadius=65 (donut/half), 0 (pie)
 * Start    : −90° (12 o'clock), clockwise
 * Series   : series-1=#1849a9 … series-6=#d1e9ff
 * RTL      : dir="rtl" on card; arcs stay clockwise; legend/text mirrors
 */

const CX = 140;
const CY = 140;
const OUTER_R = 110;
const INNER_R = 65;

const SERIES_COLORS = [
  'var(--chart-series-1, #1849a9)',
  'var(--chart-series-2, #175cd3)',
  'var(--chart-series-3, #2e90fa)',
  'var(--chart-series-4, #53b1fd)',
  'var(--chart-series-5, #b2ddff)',
  'var(--chart-series-6, #d1e9ff)',
];

// Half donut uses larger radii to fill the 280×140 frame (matches Figma 320×160 proportions)
const OUTER_R_HALF = 130;
const INNER_R_HALF = 85;

/**
 * Convert polar coordinates to Cartesian (angle 0° = right, −90° = top).
 * We feed raw degree values directly (not offset by −90 separately),
 * because our startAngle accumulator already encodes direction.
 */
function toRad(deg) {
  return (deg * Math.PI) / 180;
}

function polarToXY(cx, cy, r, angleDeg) {
  return {
    x: cx + r * Math.cos(toRad(angleDeg)),
    y: cy + r * Math.sin(toRad(angleDeg)),
  };
}

/**
 * Build an SVG arc path for a donut slice.
 * Angles are in degrees, measured from 3 o'clock, clockwise.
 * (We offset by −90° in the accumulator so 0° starts at 12 o'clock.)
 */
function buildArcPath(cx, cy, outerR, innerR, startDeg, endDeg) {
  const o1 = polarToXY(cx, cy, outerR, startDeg);
  const o2 = polarToXY(cx, cy, outerR, endDeg);
  const i2 = polarToXY(cx, cy, innerR, endDeg);
  const i1 = polarToXY(cx, cy, innerR, startDeg);
  const sweep = endDeg - startDeg > 180 ? 1 : 0;

  if (innerR === 0) {
    // Pie slice: outer arc + line to centre
    return [
      `M ${cx} ${cy}`,
      `L ${o1.x.toFixed(3)} ${o1.y.toFixed(3)}`,
      `A ${outerR} ${outerR} 0 ${sweep} 1 ${o2.x.toFixed(3)} ${o2.y.toFixed(3)}`,
      'Z',
    ].join(' ');
  }

  return [
    `M ${o1.x.toFixed(3)} ${o1.y.toFixed(3)}`,
    `A ${outerR} ${outerR} 0 ${sweep} 1 ${o2.x.toFixed(3)} ${o2.y.toFixed(3)}`,
    `L ${i2.x.toFixed(3)} ${i2.y.toFixed(3)}`,
    `A ${innerR} ${innerR} 0 ${sweep} 0 ${i1.x.toFixed(3)} ${i1.y.toFixed(3)}`,
    'Z',
  ].join(' ');
}

export function DonutChart({
  title,
  segments = [],
  centerValue,
  centerLabel,
  showLegend = true,
  type = 'donut',
  dir = 'ltr',
  loading = false,
  empty = false,
  maxValue,
  /* ── Figma: PieChartWidgetTable props ── */
  showHeader = true,
  kpi,
  showKpi = true,
  progressRows = [],
  showTable = false,
  tableTitleText,
  showTableTitle = true,
}) {
  const isHalf = type === 'half';
  const isPie  = type === 'pie';
  const outerR = isHalf ? OUTER_R_HALF : OUTER_R;
  const innerR = isPie ? 0 : (isHalf ? INNER_R_HALF : INNER_R);

  /* ── Legend filtering state ───────────────────────── */
  const [hiddenSegments, setHiddenSegments] = useState(new Set());

  const toggleSegment = useCallback((idx) => {
    setHiddenSegments(prev => {
      const visibleCount = segments.length - prev.size;
      if (!prev.has(idx)) {
        if (visibleCount <= 1) return prev; // guard: keep ≥1 visible
        return new Set([...prev, idx]);
      }
      const next = new Set(prev);
      next.delete(idx);
      return next;
    });
  }, [segments.length]);

  /* ── Tooltip state ──────────────────────────────── */
  const cardRef = useRef(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, rows: [] });

  const showTooltipAt = useCallback((e, rows) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + 14;
    const y = e.clientY - rect.top - 48;
    setTooltip({ visible: true, x: Math.max(4, x), y: Math.max(4, y), rows });
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltip(t => ({ ...t, visible: false }));
  }, []);

  /* ── Segment angle calculation ───────────────────── */
  // Total value — respect hidden segments
  const visibleSegments = segments.filter((_, i) => !hiddenSegments.has(i));
  const totalValue = maxValue || visibleSegments.reduce((sum, s) => sum + (s.value || 0), 0) || 1;

  const sweepTotal = isHalf ? 180 : 360;
  // half donut starts at −180° (9 o'clock) and sweeps clockwise to 0° (3 o'clock)
  // donut/pie starts at −90° (12 o'clock) and sweeps 360°
  let currentAngle = isHalf ? -180 : -90;

  /* ── SVG viewBox ─────────────────────────────────── */
  // Half donut: crop the SVG to just the upper arc + a small notch for center text
  const viewBox = isHalf ? `0 0 280 145` : `0 0 280 280`;
  const svgWidth = '100%';
  const svgStyle = isHalf ? { maxWidth: 280, aspectRatio: '280/145' } : { maxWidth: 280, aspectRatio: '1' };

  /* ── Skeleton placeholder segments (6 equal slices) ─ */
  const SKEL_DELAYS = [0, 0.15, 0.3, 0.45, 0.6, 0.75];
  const skelSlices = Array.from({ length: 6 }, (_, i) => {
    const sliceDeg   = isHalf ? 30 : 60;
    const startAngle = isHalf ? -180 : -90;
    const start = startAngle + i * sliceDeg;
    return { start, end: start + sliceDeg, delay: SKEL_DELAYS[i] };
  });

  /* ── Center text Y positions ─────────────────────── */
  // Figma: label (14px) above value (36px/Bold/-0.72px) — both centered in ring hole
  // Donut: centered at cy=140 in 280×280 viewBox
  // Half:  with INNER_R_HALF=85, hole spans y=55..140 (85px). Label at 35% in, value at 71% in.
  const centerLabelY = isHalf ? 90 : 123;
  const centerValueY = isHalf ? 117 : 155;

  return (
    <div className={styles.card} dir={dir} ref={cardRef}>
      {showHeader && (
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p className={styles.title}>{title}</p>
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
          </div>
          {kpi?.link && (
            <a
              href={kpi.link.href || '#'}
              className={styles.moreDetailsLink}
              dir="auto"
            >
              {kpi.link.text || 'More Details'}
              <svg className={styles.linkIcon} viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M13 3h6v6M10 12L19 3M19 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>
      )}

      <div className={styles.content}>
        {/* ── SVG donut ────────────────────────────── */}
        <div className={styles.svgWrapper}>
          <svg
            viewBox={viewBox}
            width={svgWidth}
            style={svgStyle}
            role="img"
            aria-label={`${title} — ${type} chart`}
            className={styles.svg}
          >
            <title>{title}</title>

            {/* Loading skeleton rectangles for centre text */}
            {loading && (
              <>
                <rect
                  x="100"
                  y={isHalf ? 79 : 110}
                  width="80" height="12" rx="3"
                  fill="var(--chart-skeleton, #e7e9ed)"
                  className={styles.skelPulse}
                  style={{ animationDelay: '0.3s' }}
                  aria-hidden="true"
                />
                <rect
                  x="82"
                  y={isHalf ? 93 : 131}
                  width="116" height="26" rx="4"
                  fill="var(--chart-skeleton, #e7e9ed)"
                  className={styles.skelPulse}
                  aria-hidden="true"
                />
              </>
            )}

            {/* Loading arc segments */}
            {loading && skelSlices.map((sl, i) => (
              <path
                key={i}
                d={buildArcPath(CX, CY, outerR, innerR, sl.start, sl.end)}
                fill="var(--chart-skeleton, #e7e9ed)"
                className={styles.skelPulse}
                style={{ animationDelay: `${sl.delay}s` }}
                aria-hidden="true"
              />
            ))}

            {/* Empty state */}
            {!loading && empty && (() => {
              const sliceDeg   = isHalf ? 30 : 60;
              const startAngle = isHalf ? -180 : -90;
              const empSlices = Array.from({ length: 6 }, (_, i) => {
                const s = startAngle + i * sliceDeg;
                return buildArcPath(CX, CY, outerR, innerR, s, s + sliceDeg);
              });
              return empSlices.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="var(--chart-null, #d2d6db)"
                  aria-hidden="true"
                />
              ));
            })()}

            {/* Normal segments */}
            {!loading && !empty && segments.map((seg, i) => {
              const isHidden = hiddenSegments.has(i);
              const color = isHidden
                ? 'var(--chart-legend-hidden, #d2d6db)'
                : (seg.color || SERIES_COLORS[i % SERIES_COLORS.length]);

              const segValue = isHidden ? 0 : (seg.value || 0);
              // For hidden segments, still render a tiny arc for smooth toggle (or skip)
              if (isHidden) {
                // Advance angle by 0 (hidden = zero width arc, skip rendering)
                return null;
              }

              const pct = segValue / totalValue;
              const angleDelta = sweepTotal * pct;
              const startDeg = currentAngle;
              const endDeg   = currentAngle + angleDelta;
              currentAngle   = endDeg;

              const pctLabel = totalValue > 0 ? `${(pct * 100).toFixed(1)}%` : '0%';
              const tooltipRows = [
                { label: seg.label, value: `${pctLabel} · ${seg.value}`, marker: color },
              ];

              return (
                <path
                  key={seg.id ?? i}
                  d={buildArcPath(CX, CY, outerR, innerR, startDeg, endDeg)}
                  fill={color}
                  aria-label={`${seg.label}: ${pctLabel}`}
                  tabIndex={0}
                  role="button"
                  style={{ cursor: 'pointer', outline: 'none' }}
                  onMouseEnter={e => showTooltipAt(e, tooltipRows)}
                  onMouseLeave={hideTooltip}
                  onFocus={e => showTooltipAt(e, tooltipRows)}
                  onBlur={hideTooltip}
                  onKeyDown={e => {
                    if (e.key === 'Escape') hideTooltip();
                    if (e.key === 'Enter' || e.key === ' ') showTooltipAt(e, tooltipRows);
                  }}
                />
              );
            })}

            {/* (loading centre text rendered above arc segments — see top of SVG) */}

            {/* Donut hole — full circle for donut; upper-semicircle for half.
                The full circle in half mode extends below the viewBox and (with
                overflow:visible on the SVG) paints white over the legend — using
                a semicircle path keeps it contained within the viewBox. */}
            {!isPie && !isHalf && (
              <circle cx={CX} cy={CY} r={innerR} fill="white" aria-hidden="true" />
            )}
            {!isPie && isHalf && (
              <path
                d={`M ${CX - innerR} ${CY} A ${innerR} ${innerR} 0 0 1 ${CX + innerR} ${CY} Z`}
                fill="white"
                aria-hidden="true"
              />
            )}

            {/* Center text — Figma: label (14px/400) ABOVE value (36px/700/-0.72px) */}
            {!loading && !isPie && (
              <>
                {(centerLabel || empty) && (
                  <text
                    x={CX}
                    y={centerLabelY}
                    textAnchor="middle"
                    fontFamily="'IBM Plex Sans Arabic', sans-serif"
                    fontSize="14"
                    fontWeight="400"
                    fill={empty ? 'var(--chart-null, #d2d6db)' : 'var(--chart-axis-label, #6c7c96)'}
                    aria-hidden="true"
                  >
                    {empty ? 'No data' : centerLabel}
                  </text>
                )}
                {(centerValue || empty) && (
                  <text
                    x={CX}
                    y={centerValueY}
                    textAnchor="middle"
                    fontFamily="'IBM Plex Sans Arabic', sans-serif"
                    fontSize="36"
                    fontWeight="700"
                    fill={empty ? 'var(--chart-null, #d2d6db)' : 'var(--chart-title, #000b36)'}
                    style={{ letterSpacing: '-0.72px' }}
                    aria-hidden="true"
                  >
                    {empty ? '—' : centerValue}
                  </text>
                )}
              </>
            )}
          </svg>
        </div>

        {/* Legend */}
        {showLegend && !loading && !empty && segments.length > 0 && (
          <ChartLegend
            series={segments.map(s => ({ id: s.id, label: s.label, color: s.color }))}
            hiddenSeries={hiddenSegments}
            onToggle={toggleSegment}
            colors={SERIES_COLORS}
          />
        )}

        {/* Accessible data table — screen readers */}
        <table className={styles.srOnly} aria-label={`${title} — data table`}>
          <caption>{title}</caption>
          <thead>
            <tr>
              <th scope="col">Segment</th>
              <th scope="col">Value</th>
              <th scope="col">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {segments.map((seg, i) => {
              const pct = totalValue > 0 ? ((seg.value / totalValue) * 100).toFixed(1) : '0.0';
              return (
                <tr key={seg.id ?? i}>
                  <th scope="row">{seg.label}</th>
                  <td>{seg.value}</td>
                  <td>{pct}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Progress Table (Figma: tables prop) ─────── */}
      {showTable && progressRows.length > 0 && (
        <div className={styles.progressTable}>
          {showTableTitle && tableTitleText && (
            <div className={styles.tableHeader}>
              <span className={styles.tableTitle}>{tableTitleText}</span>
              <span className={styles.tableDots} aria-hidden="true">···</span>
            </div>
          )}
          {progressRows.map((row, i) => {
            const color = row.color || SERIES_COLORS[i % SERIES_COLORS.length];
            const pct = Math.min(100, Math.max(0, row.percentage));
            const isDark = pct >= 20;
            return (
              <div key={i} className={styles.progressRow}>
                <span className={styles.progressLabel}>{row.label}</span>
                <div className={styles.progressBarTrack} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${row.label}: ${pct}%`}>
                  <div
                    className={styles.progressBarFill}
                    style={{ width: `${pct}%`, background: color }}
                  >
                    <span className={styles.progressBarValue} style={{ color: isDark ? 'var(--chart-progress-text-light, #f9fafb)' : 'var(--chart-subtitle, #3c5073)' }}>
                      {pct}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

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

DonutChart.propTypes = {
  title:       PropTypes.string.isRequired,
  segments:    PropTypes.arrayOf(
    PropTypes.shape({
      id:    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string,
    })
  ),
  centerValue: PropTypes.string,
  centerLabel: PropTypes.string,
  showLegend:  PropTypes.bool,
  type:        PropTypes.oneOf(['donut', 'pie', 'half']),
  dir:         PropTypes.oneOf(['ltr', 'rtl']),
  loading:     PropTypes.bool,
  empty:       PropTypes.bool,
  maxValue:    PropTypes.number,
  /* Figma: PieChartWidgetTable props */
  showHeader:     PropTypes.bool,
  kpi: PropTypes.shape({
    value: PropTypes.string,
    badge: PropTypes.shape({
      icon:  PropTypes.node,
      text:  PropTypes.string,
      label: PropTypes.string,
    }),
    link: PropTypes.shape({
      text: PropTypes.string,
      href: PropTypes.string,
    }),
  }),
  showKpi:        PropTypes.bool,
  progressRows:   PropTypes.arrayOf(
    PropTypes.shape({
      label:       PropTypes.string.isRequired,
      percentage:  PropTypes.number.isRequired,
      color:       PropTypes.string,
    })
  ),
  showTable:      PropTypes.bool,
  tableTitleText: PropTypes.string,
  showTableTitle: PropTypes.bool,
};
