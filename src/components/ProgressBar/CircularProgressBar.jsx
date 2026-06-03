import PropTypes from 'prop-types';
import styles from './CircularProgressBar.module.css';

/* ── Per-size config ─────────────────────────────────────────── */

const SIZE_CONFIG = {
  64:  { strokeWidth: 6,  valueFontSize: 14, valueFontWeight: 700, valueLineHeight: 20, letterSpacing: undefined, labelConfig: null,                             iconSize: 20 },
  80:  { strokeWidth: 7,  valueFontSize: 18, valueFontWeight: 700, valueLineHeight: 28, letterSpacing: undefined, labelConfig: null,                             iconSize: 24 },
  120: { strokeWidth: 10, valueFontSize: 24, valueFontWeight: 700, valueLineHeight: 32, letterSpacing: undefined, labelConfig: { fontSize: 14, lineHeight: 20 }, iconSize: 32 },
  160: { strokeWidth: 12, valueFontSize: 30, valueFontWeight: 700, valueLineHeight: 38, letterSpacing: undefined, labelConfig: { fontSize: 16, lineHeight: 24 }, iconSize: 40 },
  200: { strokeWidth: 16, valueFontSize: 36, valueFontWeight: 700, valueLineHeight: 44, letterSpacing: '-0.72px', labelConfig: { fontSize: 20, lineHeight: 30 }, iconSize: 52 },
};

const ARC_COLOR = {
  Primary: '#006121',
  Neutral: '#3c5073',
  Success: '#006121',
  Error:   '#a30000',
};

/* ── Status icons ────────────────────────────────────────────── */

const SuccessIcon = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill={color}/>
    <path d="M6 12.5L10 16.5L18 8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ErrorIcon = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill={color}/>
    <path d="M8 8L16 16M16 8L8 16" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);

/* ── Component ─────────────────────────────────────────────── */

/**
 * CircularProgressBar — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4399-20424
 *
 * Circular visual indicator for task / process progress.
 * Sizes   : 64 · 80 · 120 · 160 · 200 px
 * Variants: Primary (green) · Neutral (navy) · Success · Error
 * RTL     : mirrors arc direction (counterclockwise fill)
 */
export function CircularProgressBar({
  size     = 120,
  variant  = 'Primary',
  value    = 50,
  showText = true,
  label    = '',
  rtl      = false,
  ...rest
}) {
  const sizeNum = typeof size === 'string' ? parseInt(size, 10) : size;
  const cfg = SIZE_CONFIG[sizeNum] ?? SIZE_CONFIG[120];
  const { strokeWidth, valueFontSize, valueFontWeight, valueLineHeight, letterSpacing, labelConfig, iconSize } = cfg;

  const isSuccess = variant === 'Success';
  const isError   = variant === 'Error';
  const isStatus  = isSuccess || isError;

  const clampedValue = isStatus ? 100 : Math.min(100, Math.max(0, value));
  const arcColor = ARC_COLOR[variant] ?? ARC_COLOR.Primary;

  const cx = sizeNum / 2;
  const cy = sizeNum / 2;
  const radius = cx - strokeWidth / 2 - 1;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - clampedValue / 100);

  const labelColor =
    isSuccess ? '#006121' :
    isError   ? '#a30000' :
    '#3c5073';

  return (
    <div
      className={styles.root}
      dir={rtl ? 'rtl' : 'ltr'}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label || `${variant} progress: ${clampedValue}%`}
      {...rest}
    >
      <div className={styles.circleWrap} style={{ width: sizeNum, height: sizeNum }}>
        {/* SVG ring — scaleX(-1) mirrors arc direction for RTL */}
        <svg
          width={sizeNum}
          height={sizeNum}
          viewBox={`0 0 ${sizeNum} ${sizeNum}`}
          className={styles.svg}
          style={rtl ? { transform: 'scaleX(-1)' } : undefined}
          aria-hidden="true"
        >
          {/* Background track */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="var(--circular-progress-track, #e7e9ed)"
            strokeWidth={strokeWidth}
          />
          {/* Fill arc — starts at 12 o'clock (-90° rotation) */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={arcColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: 'stroke-dashoffset 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </svg>

        {/* Center overlay */}
        {showText && (
          <div className={styles.center}>
            {isSuccess && (
              <span className={styles.statusIcon}>
                <SuccessIcon size={iconSize} color={arcColor} />
              </span>
            )}
            {isError && (
              <span className={styles.statusIcon}>
                <ErrorIcon size={iconSize} color={arcColor} />
              </span>
            )}
            {!isStatus && (
              <span
                className={styles.valueText}
                style={{
                  fontSize: valueFontSize,
                  fontWeight: valueFontWeight,
                  lineHeight: `${valueLineHeight}px`,
                  color: 'var(--circular-progress-value-color, #3c5073)',
                  ...(letterSpacing ? { letterSpacing } : {}),
                }}
              >
                {clampedValue}%
              </span>
            )}
            {labelConfig && label && (
              <span
                className={styles.centerLabel}
                style={{
                  fontSize: labelConfig.fontSize,
                  lineHeight: `${labelConfig.lineHeight}px`,
                  color: labelColor,
                }}
              >
                {label}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

CircularProgressBar.propTypes = {
  /** Container size in px — 64 · 80 · 120 · 160 · 200 */
  size:     PropTypes.oneOf([64, 80, 120, 160, 200]),
  /** Color style — Primary (green) · Neutral (navy) · Success · Error */
  variant:  PropTypes.oneOf(['Primary', 'Neutral', 'Success', 'Error']),
  /** Progress percentage 0–100 (ignored for Success/Error which always show full ring) */
  value:    PropTypes.number,
  /** Show center text (percentage) or icon (Success/Error) */
  showText: PropTypes.bool,
  /** Descriptive label shown below the ring — only rendered for size ≥ 120 */
  label:    PropTypes.string,
  /** Right-to-left — mirrors the arc fill direction (counterclockwise) */
  rtl:      PropTypes.bool,
};
