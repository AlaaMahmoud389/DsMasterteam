import { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './RadarChart.module.css';
import { ChartTooltip } from '../shared/ChartTooltip';
import { ChartLegend } from '../shared/ChartLegend';

/**
 * RadarChart — Masterteam Design System
 * Figma: WTmRAkJVvw0IvZMA7wBdTC / node 4527:3421  (legend=true, rtl=false)
 *
 * Geometry: 7-axis heptagon, cx=220, cy=200, R=155, viewBox 440×400
 * Grid rings: 5 (20/40/60/80/100 % of R)
 * Scale badges: pill labels on the top axis (axis 0, θ=−90°)
 * Series rendering: back-to-front (lightest/largest drawn first)
 * Series palette: 6 tokens from Figma series-1…6
 * RTL: axis labels mirror; geometry unchanged (radially symmetric)
 */

const N_AXES = 7;
const CX = 220;
const CY = 200;
const R  = 155;
const RINGS = [0.2, 0.4, 0.6, 0.8, 1.0];

/* ── Figma series color tokens (series-1 = darkest, series-6 = lightest) ── */
const SERIES_STYLES = [
  { stroke: 'var(--chart-series-1, #1849a9)', fill: 'rgba(24,73,169,0.70)',   strokeWidth: 2,   hex: '#1849a9' },
  { stroke: 'var(--chart-series-3, #2e90fa)', fill: 'rgba(46,144,250,0.25)',  strokeWidth: 1.5, hex: '#2e90fa' },
  { stroke: 'var(--chart-series-5, #b2ddff)', fill: 'rgba(178,221,255,0.35)', strokeWidth: 1.5, hex: '#b2ddff' },
  { stroke: 'var(--chart-series-2, #175cd3)', fill: 'rgba(23,92,211,0.30)',   strokeWidth: 1.5, hex: '#175cd3' },
  { stroke: 'var(--chart-series-4, #53b1fd)', fill: 'rgba(83,177,253,0.25)',  strokeWidth: 1.5, hex: '#53b1fd' },
  { stroke: 'var(--chart-series-6, #d1e9ff)', fill: 'rgba(209,233,255,0.40)', strokeWidth: 1.5, hex: '#d1e9ff' },
];

/* ── Geometry helpers ──────────────────────────────────────────────────── */

function axisPoint(axisIdx, fraction, cx, cy, r) {
  const angle = -Math.PI / 2 + axisIdx * (2 * Math.PI / N_AXES);
  return {
    x: cx + r * fraction * Math.cos(angle),
    y: cy + r * fraction * Math.sin(angle),
  };
}

function outerVertex(k) { return axisPoint(k, 1, CX, CY, R); }

function ringPoints(fraction) {
  return Array.from({ length: N_AXES }, (_, k) => {
    const p = axisPoint(k, fraction, CX, CY, R);
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(' ');
}

function seriesPoints(dataArr, maxVal) {
  return Array.from({ length: N_AXES }, (_, k) => {
    const fraction = Math.min((dataArr[k] || 0) / maxVal, 1);
    const p = axisPoint(k, fraction, CX, CY, R);
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(' ');
}

function labelAnchor(k) {
  const angle = -Math.PI / 2 + k * (2 * Math.PI / N_AXES);
  const cos = Math.cos(angle);
  if (cos > 0.3)  return 'start';
  if (cos < -0.3) return 'end';
  return 'middle';
}

/* Badge width: ~7px per char + 16px padding, minimum 34px */
function badgeWidth(label) {
  return Math.max(34, String(label).length * 7 + 16);
}

/* ── Component ─────────────────────────────────────────────────────────── */

export function RadarChart({
  title,
  subtitle,
  series = [],
  axisLabels = [],
  maxValue = 1000,
  showLegend = true,
  showScaleBadges = true,
  loading = false,
  empty = false,
  dir = 'ltr',
}) {
  const cardRef = useRef(null);
  const [hiddenSeries, setHiddenSeries] = useState(new Set());
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, rows: [] });
  const isRtl = dir === 'rtl';

  const toggleSeries = useCallback((idx) => {
    setHiddenSeries(prev => {
      const vis = series.length - prev.size;
      if (!prev.has(idx)) { return vis <= 1 ? prev : new Set([...prev, idx]); }
      const next = new Set(prev); next.delete(idx); return next;
    });
  }, [series.length]);

  const showTip = useCallback((e, axisIdx) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = e.clientX - r.left + (isRtl ? -140 : 14);
    const y = e.clientY - r.top - 48;
    const rows = series
      .map((s, si) => ({
        label: s.label,
        value: String(s.data[axisIdx] ?? 0),
        marker: s.color || SERIES_STYLES[si % SERIES_STYLES.length].hex,
      }))
      .filter((_, si) => !hiddenSeries.has(si));
    setTooltip({ visible: true, x: Math.max(4, x), y: Math.max(4, y), rows });
  }, [series, hiddenSeries, isRtl]);

  const hideTip = useCallback(() => setTooltip(t => ({ ...t, visible: false })), []);

  const VIEW_W   = 440;
  const VIEW_H   = 400;
  const R_LABEL  = R + 26;
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
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} width="100%" className={styles.svg} aria-hidden="true">
          {RINGS.slice(0, -1).map((f, i) => (
            <polygon key={f} points={ringPoints(f)} fill="#e7e9ed" stroke="none"
              className={`${styles.skelPulse} ${styles[`skelDelay${(i % 3) + 1}`]}`} />
          ))}
          <polygon points={ringPoints(1)} fill="#e7e9ed" stroke="none"
            className={`${styles.skelPulse} ${styles.skelDelay1}`} />
        </svg>
      </div>
    );
  }

  /* ── Empty ── */
  if (empty || series.length === 0) {
    return (
      <div className={styles.card} dir={dir} ref={cardRef}>
        {(title || subtitle) && (
          <div className={styles.header}>
            {title    && <p className={styles.title}>{title}</p>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        )}
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} width="100%" className={styles.svg} aria-hidden="true">
          {RINGS.map(f => (
            <polygon key={f} points={ringPoints(f)} fill="none" stroke="#f3f4f6" strokeWidth="1" />
          ))}
          {Array.from({ length: N_AXES }, (_, k) => {
            const outer = outerVertex(k);
            return <line key={k} x1={CX} y1={CY} x2={outer.x.toFixed(1)} y2={outer.y.toFixed(1)} stroke="#f3f4f6" strokeWidth="1" />;
          })}
          <text x={CX} y={CY + 6} textAnchor="middle" fontSize="14" fill="#6c7c96"
            fontFamily="IBM Plex Sans Arabic,sans-serif">No data available</text>
        </svg>
      </div>
    );
  }

  return (
    <div className={styles.card} dir={dir} ref={cardRef}>

      {/* Header */}
      {(title || subtitle) && (
        <div className={styles.header}>
          {title    && <p className={styles.title}>{title}</p>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}

      <div className={styles.content}>
        {/* SVG radar chart */}
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} width="100%"
          role="img" aria-label={title || 'Radar chart'} className={styles.svg}>
          <title>{title || 'Radar chart'}</title>

          {/* Grid rings */}
          <g aria-hidden="true">
            {RINGS.map(f => (
              <polygon key={f} points={ringPoints(f)}
                fill="none" stroke="var(--chart-border, #f3f4f6)" strokeWidth="1" />
            ))}
          </g>

          {/* Axis spokes */}
          <g aria-hidden="true">
            {Array.from({ length: N_AXES }, (_, k) => {
              const outer = outerVertex(k);
              return (
                <line key={k} x1={CX} y1={CY} x2={outer.x.toFixed(1)} y2={outer.y.toFixed(1)}
                  stroke="var(--chart-border, #f3f4f6)" strokeWidth="1" />
              );
            })}
          </g>

          {/* Series polygons — back to front (index N-1 first = lightest/largest) */}
          {seriesOrder.map(si => {
            if (hiddenSeries.has(si)) return null;
            const s = series[si];
            const st = SERIES_STYLES[si % SERIES_STYLES.length];
            return (
              <polygon key={s.label ?? si}
                points={seriesPoints(s.data, maxValue)}
                fill={s.fill || st.fill}
                stroke={s.color || st.stroke}
                strokeWidth={st.strokeWidth}
                strokeLinejoin="round"
              />
            );
          })}

          {/* Interactive dots — one per axis on each visible series */}
          {Array.from({ length: N_AXES }, (_, k) => {
            const visibleSeries = series.filter((_, si) => !hiddenSeries.has(si));
            if (visibleSeries.length === 0) return null;
            const s0 = visibleSeries[0];
            const si0 = series.indexOf(s0);
            const fraction = Math.min((s0.data[k] || 0) / maxValue, 1);
            const p = axisPoint(k, fraction, CX, CY, R);
            const st = SERIES_STYLES[si0 % SERIES_STYLES.length];
            return (
              <circle key={k}
                cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="5"
                fill={s0.color || st.stroke} stroke="#fff" strokeWidth="1.5"
                tabIndex={0} role="button"
                aria-label={`${axisLabels[k] || `Axis ${k + 1}`}: ${s0.data[k] || 0}`}
                onMouseEnter={e => showTip(e, k)}
                onMouseLeave={hideTip}
                onFocus={e => showTip(e, k)}
                onBlur={hideTip}
                style={{ cursor: 'pointer', outline: 'none' }}
              />
            );
          })}

          {/* Axis labels (Figma: 14px/500, #6c7c96) */}
          <g aria-hidden="true">
            {Array.from({ length: N_AXES }, (_, k) => {
              const angle = -Math.PI / 2 + k * (2 * Math.PI / N_AXES);
              const x = CX + R_LABEL * Math.cos(angle);
              const y = CY + R_LABEL * Math.sin(angle);
              const anchor = isRtl
                ? (labelAnchor(k) === 'start' ? 'end' : labelAnchor(k) === 'end' ? 'start' : 'middle')
                : labelAnchor(k);
              return (
                <text key={k} x={x.toFixed(1)} y={y.toFixed(1)}
                  textAnchor={anchor} dominantBaseline="middle"
                  fontSize="14" fontWeight="500"
                  fill="var(--chart-axis, #6c7c96)"
                  fontFamily="IBM Plex Sans Arabic,sans-serif">
                  {axisLabels[k] || `Axis ${k + 1}`}
                </text>
              );
            })}
          </g>

          {/* Scale badges on top axis (k=0) — Figma: pill, #e7e9ed bg, 12px/500 */}
          {showScaleBadges && RINGS.map((f, i) => {
            const p = axisPoint(0, f, CX, CY, R);
            const val = Math.round(maxValue * f);
            const label = val.toLocaleString();
            const bw = badgeWidth(label);
            return (
              <g key={f} aria-hidden="true">
                <rect
                  x={(p.x - bw / 2).toFixed(1)}
                  y={(p.y - 9).toFixed(1)}
                  width={bw}
                  height={18}
                  rx={9}
                  fill="var(--chart-badge-bg, #e7e9ed)"
                  stroke="var(--chart-border, #f3f4f6)"
                  strokeWidth="1"
                />
                <text x={p.x.toFixed(1)} y={(p.y + 4.5).toFixed(1)}
                  textAnchor="middle" fontSize="12" fontWeight="500"
                  fill="var(--chart-title, #000b36)"
                  fontFamily="Inter,IBM Plex Sans Arabic,sans-serif">
                  {label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Interactive legend — Figma: flex-wrap, gap-[12px], dots + labels */}
        {showLegend && series.length > 0 && (
          <ChartLegend
            series={series}
            hiddenSeries={hiddenSeries}
            onToggle={toggleSeries}
            colors={SERIES_STYLES.map(s => s.hex)}
          />
        )}

        {/* Screen-reader table */}
        <table className={styles.srOnly} aria-label={`${title || 'Radar chart'} — data table`}>
          <caption>{title || 'Radar chart'}</caption>
          <thead>
            <tr>
              <th scope="col">Axis</th>
              {series.map((s, i) => <th key={i} scope="col">{s.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: N_AXES }, (_, k) => (
              <tr key={k}>
                <th scope="row">{axisLabels[k] || `Axis ${k + 1}`}</th>
                {series.map((s, si) => <td key={si}>{s.data[k] ?? 0}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ChartTooltip visible={tooltip.visible} x={tooltip.x} y={tooltip.y} rows={tooltip.rows} dir={dir} />
    </div>
  );
}

RadarChart.propTypes = {
  title:           PropTypes.string,
  subtitle:        PropTypes.string,
  series:          PropTypes.arrayOf(PropTypes.shape({
    id:    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string.isRequired,
    data:  PropTypes.arrayOf(PropTypes.number).isRequired,
    color: PropTypes.string,
    fill:  PropTypes.string,
  })).isRequired,
  axisLabels:      PropTypes.arrayOf(PropTypes.string),
  maxValue:        PropTypes.number,
  showLegend:      PropTypes.bool,
  showScaleBadges: PropTypes.bool,
  loading:         PropTypes.bool,
  empty:           PropTypes.bool,
  dir:             PropTypes.oneOf(['ltr', 'rtl']),
};
