import PropTypes from 'prop-types';
import styles from './RadialChart.module.css';

/* ── Ring geometry ───────────────────────────────────────────── */

const SVG_MEDIUM = 314;
const SVG_SMALL  = 232;

const RING_CONFIG_MEDIUM = [
  { r: 146, sw: 22 },
  { r: 124, sw: 20 },
  { r: 103, sw: 18 },
  { r:  83, sw: 16 },
];

const RING_CONFIG_SMALL = [
  { r: 108, sw: 16 },
  { r:  91, sw: 14 },
  { r:  75, sw: 12 },
  { r:  59, sw: 10 },
];

/* ── Default data ────────────────────────────────────────────── */

const DEFAULT_RINGS = [
  { label: 'Data 1', labelAr: 'بيانات 1', value: 75, color: '#1c3d8c' },
  { label: 'Data 2', labelAr: 'بيانات 2', value: 55, color: '#1849a9' },
  { label: 'Data 3', labelAr: 'بيانات 3', value: 35, color: '#4f83dd' },
  { label: 'Data 4', labelAr: 'بيانات 4', value: 20, color: '#7ca6e9' },
];

/* ── Icons ───────────────────────────────────────────────────── */

const TrendUpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Component ─────────────────────────────────────────────── */

/**
 * RadialChart — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4548-5751
 *
 * Four-ring concentric chart card with KPI header and optional data labels.
 * Sizes: medium (314 px rings) · small (232 px rings)
 * RTL: mirrors arc direction via scaleX(-1) on SVG
 */
export function RadialChart({
  title        = 'Data Title',
  kpiValue     = '78,909.72',
  trendValue   = '4.5%',
  trendLabel   = 'from last week',
  showTrend    = true,
  showViewMore = true,
  size         = 'medium',
  rings        = DEFAULT_RINGS,
  showLabels   = true,
  rtl          = false,
  ...rest
}) {
  const isMedium   = size === 'medium';
  const SVG_SIZE   = isMedium ? SVG_MEDIUM : SVG_SMALL;
  const CX         = SVG_SIZE / 2;
  const CY         = SVG_SIZE / 2;
  const ringConfig = isMedium ? RING_CONFIG_MEDIUM : RING_CONFIG_SMALL;

  return (
    <div
      className={[styles.card, isMedium ? styles.medium : styles.small].join(' ')}
      dir={rtl ? 'rtl' : 'ltr'}
      {...rest}
    >
      {/* ── Header ────────────────────────────────────────────── */}
      <div className={styles.header}>
        {!rtl && (
          <div className={styles.headerLeft}>
            <span className={styles.title}>{title}</span>
            <span className={styles.kpiValue}>{kpiValue}</span>
            {showTrend && (
              <div className={styles.trendRow}>
                <span className={styles.trendBadge}>
                  <TrendUpIcon />
                  {trendValue}
                </span>
                <span className={styles.trendLabel}>{trendLabel}</span>
              </div>
            )}
          </div>
        )}
        {rtl && (
          <div className={styles.headerLeft} style={{ alignItems: 'flex-end' }}>
            <span className={styles.title} style={{ textAlign: 'right' }}>{title}</span>
            <span className={styles.kpiValue} style={{ textAlign: 'right' }}>{kpiValue}</span>
            {showTrend && (
              <div className={styles.trendRow} style={{ flexDirection: 'row-reverse' }}>
                <span className={styles.trendLabel}>{trendLabel}</span>
                <span className={styles.trendBadge}>
                  <TrendUpIcon />
                  {trendValue}
                </span>
              </div>
            )}
          </div>
        )}
        {showViewMore && (
          <button
            type="button"
            className={styles.viewMore}
            aria-label={rtl ? 'عرض المزيد' : 'View more'}
            style={rtl ? { flexDirection: 'row-reverse' } : undefined}
          >
            <ExternalLinkIcon />
            <span>{rtl ? 'عرض المزيد' : 'View more'}</span>
          </button>
        )}
      </div>

      {/* ── Ring chart ────────────────────────────────────────── */}
      <div className={styles.chartArea}>
        <svg
          width={SVG_SIZE}
          height={SVG_SIZE}
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
          className={styles.svg}
          style={rtl ? { transform: 'scaleX(-1)' } : undefined}
          aria-hidden="true"
        >
          {ringConfig.map(({ r, sw }, idx) => {
            const ring = rings[idx];
            if (!ring) return null;
            const circ   = 2 * Math.PI * r;
            const offset = circ * (1 - Math.min(100, Math.max(0, ring.value)) / 100);

            /*
             * Data label placed at the 12-o'clock position of each ring (arc start),
             * slightly left of center — matches Figma node 4548:5517 label layout.
             * Only shown in medium size and LTR (RTL arcs are mirrored via scaleX(-1),
             * which would mirror SVG text; labels are suppressed for RTL).
             */
            let labelEl = null;
            if (isMedium && showLabels && !rtl) {
              const lx = CX - sw / 2 - 4;
              const ly = CY - r;
              labelEl = (
                <text
                  key={`lbl-${idx}`}
                  x={lx}
                  y={ly}
                  fontSize={11}
                  fill="#3c5073"
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontFamily="'Inter', system-ui, sans-serif"
                >
                  {ring.label}
                </text>
              );
            }

            return (
              <g key={idx}>
                {/* Track */}
                <circle
                  cx={CX} cy={CY} r={r}
                  fill="none"
                  stroke="var(--radial-chart-track, #e7e9ed)"
                  strokeWidth={sw}
                />
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
                  style={{ transition: 'stroke-dashoffset 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
                />
                {labelEl}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

RadialChart.propTypes = {
  title:        PropTypes.string,
  kpiValue:     PropTypes.string,
  trendValue:   PropTypes.string,
  trendLabel:   PropTypes.string,
  showTrend:    PropTypes.bool,
  showViewMore: PropTypes.bool,
  size:         PropTypes.oneOf(['medium', 'small']),
  rings:        PropTypes.arrayOf(PropTypes.shape({
    label:   PropTypes.string,
    labelAr: PropTypes.string,
    value:   PropTypes.number,
    color:   PropTypes.string,
  })),
  showLabels: PropTypes.bool,
  rtl:        PropTypes.bool,
};
