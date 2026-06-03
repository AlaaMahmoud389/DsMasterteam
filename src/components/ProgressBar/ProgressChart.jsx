import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './ProgressChart.module.css';

/* ── SVG ring config ─────────────────────────────────────────── */
const SVG_SIZE = 270;
const CX = SVG_SIZE / 2;
const CY = SVG_SIZE / 2;
const RING_CONFIG = [
  { r: 113, sw: 20 },  // outer
  { r: 90,  sw: 18 },  // middle
  { r: 67,  sw: 16 },  // inner
];

const DEFAULT_RINGS = [
  { label: 'Series 1', value: 75, color: '#1c3d8c' },
  { label: 'Series 2', value: 55, color: '#1849a9' },
  { label: 'Series 3', value: 35, color: '#4f83dd' },
];

const DEFAULT_LEGEND = [
  { label: 'Series 1', color: '#1c3d8c' },
  { label: 'Series 2', color: '#1849a9' },
  { label: 'Series 3', color: '#4f83dd' },
  { label: 'Series 4', color: '#7ca6e9' },
  { label: 'Series 5', color: '#aec8f2' },
  { label: 'Series 6', color: '#d5e5f9' },
];

/**
 * ProgressChart — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4531-5667
 *
 * Three concentric ring chart with optional card title, center value/label, and legend.
 */
export function ProgressChart({
  title        = 'Card Title',
  showTitle    = true,
  totalValue   = '1,000',
  totalLabel   = '',
  showLabel    = false,
  rings        = DEFAULT_RINGS,
  legend       = DEFAULT_LEGEND,
  showLegend   = true,
  rtl          = false,
  ...rest
}) {
  const [tooltip, setTooltip] = useState(null);
  const chartRef = useRef(null);

  const handleArcMove = (e, ring) => {
    const rect = chartRef.current.getBoundingClientRect();
    setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, label: ring.label, value: ring.value, color: ring.color });
  };

  return (
    <div
      className={styles.card}
      dir={rtl ? 'rtl' : 'ltr'}
      {...rest}
    >
      {showTitle && (
        <div className={styles.titleRow}>
          <span className={styles.title}>{title}</span>
        </div>
      )}

      {/* Ring chart area */}
      <div className={styles.chartArea} ref={chartRef}>
        <svg
          width={SVG_SIZE}
          height={SVG_SIZE}
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
          className={styles.svg}
          style={rtl ? { transform: 'scaleX(-1)' } : undefined}
          aria-hidden="true"
        >
          {RING_CONFIG.map(({ r, sw }, idx) => {
            const ring = rings[idx];
            if (!ring) return null;
            const circ = 2 * Math.PI * r;
            const offset = circ * (1 - Math.min(100, Math.max(0, ring.value)) / 100);
            return (
              <g key={idx}>
                {/* Track */}
                <circle cx={CX} cy={CY} r={r} fill="none" stroke="var(--progress-chart-track, #e7e9ed)" strokeWidth={sw} />
                {/* Fill arc */}
                <circle
                  cx={CX} cy={CY} r={r}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth={sw}
                  strokeDasharray={circ}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${CX} ${CY})`}
                  style={{ transition: 'stroke-dashoffset 0.4s cubic-bezier(0.4,0,0.2,1)', cursor: 'pointer' }}
                  onMouseMove={(e) => handleArcMove(e, ring)}
                  onMouseLeave={() => setTooltip(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className={styles.tooltip}
            style={{ left: tooltip.x + 14, top: tooltip.y - 40, pointerEvents: 'none' }}
          >
            <span className={styles.tooltipMark} style={{ background: tooltip.color }} />
            <span className={styles.tooltipLabel}>{tooltip.label}:</span>
            <span className={styles.tooltipValue}>{tooltip.value}%</span>
          </div>
        )}

        {/* Center overlay */}
        <div className={styles.centerOverlay}>
          {showLabel && totalLabel && (
            <div className={styles.centerLabel}>{totalLabel}</div>
          )}
          <div className={styles.centerValue}>{totalValue}</div>
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className={styles.legend} dir={rtl ? 'rtl' : 'ltr'}>
          {legend.map((item, i) => (
            <div key={i} className={styles.legendItem}>
              {!rtl && <span className={styles.legendMark} style={{ background: item.color }} />}
              <span className={styles.legendLabel}>{item.label}</span>
              {rtl && <span className={styles.legendMark} style={{ background: item.color }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ProgressChart.propTypes = {
  title:      PropTypes.string,
  showTitle:  PropTypes.bool,
  totalValue: PropTypes.string,
  totalLabel: PropTypes.string,
  showLabel:  PropTypes.bool,
  rings:      PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
    color: PropTypes.string,
  })),
  legend:     PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    color: PropTypes.string,
  })),
  showLegend: PropTypes.bool,
  rtl:        PropTypes.bool,
};
