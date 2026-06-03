import PropTypes from 'prop-types';
import styles from './ProgressBar.module.css';

/* ── Status icons (16 × 16) ──────────────────────────────────── */

const HelpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M6.5 6C6.5 5.17 7.17 4.5 8 4.5C8.83 4.5 9.5 5.17 9.5 6C9.5 6.83 8.83 7.5 8 7.5V8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="8" cy="10.5" r="0.625" fill="currentColor"/>
  </svg>
);

const SuccessIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M5.5 8L7.5 10L10.5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M8 5V8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="8" cy="10.5" r="0.625" fill="currentColor"/>
  </svg>
);

/* ── Per-status config ───────────────────────────────────────── */

const STATUS_META = {
  default: { Icon: HelpIcon,   color: '#3c5073' },
  success: { Icon: SuccessIcon, color: '#006121' },
  error:   { Icon: ErrorIcon,   color: '#a30000' },
};

/* ── Fill color ──────────────────────────────────────────────── */

function getFillColor(variant, status) {
  if (status === 'error')   return 'var(--progress-bar-fill-error,   #a30000)';
  if (variant === 'Neutral') return 'var(--progress-bar-fill-neutral, #3c5073)';
  return 'var(--progress-bar-fill-primary, #006121)';
}

/* ── Component ─────────────────────────────────────────────── */

/**
 * ProgressBar — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4399-20639
 *
 * Visual indicator for task / process progress.
 * Variants : Primary (green) · Neutral (navy)
 * Sizes     : Small (4 px) · Medium (8 px) · Large (12 px)
 * States    : default · success · error
 * RTL       : mirrors fill direction
 */
export function ProgressBar({
  value         = 20,
  size          = 'Medium',
  variant       = 'Primary',
  status        = 'default',
  label         = 'Label',
  helperText    = 'Help Text',
  showLabel     = true,
  showHelperText = true,
  rtl           = false,
  ...rest
}) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const { Icon, color } = STATUS_META[status] ?? STATUS_META.default;
  const fillColor = getFillColor(variant, status);

  const displayHelperText =
    status === 'success' ? 'Success' :
    status === 'error'   ? 'Error'   :
    helperText;

  return (
    <div
      dir={rtl ? 'rtl' : 'ltr'}
      className={[styles.root, styles[size.toLowerCase()]].join(' ')}
      {...rest}
    >
      {showLabel && (
        <span className={styles.label}>{label}</span>
      )}

      {/* Track + fill */}
      <div className={styles.track} role="progressbar" aria-valuenow={clampedValue} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div
          className={[styles.fill, size === 'Large' ? styles.fillLarge : null].filter(Boolean).join(' ')}
          style={{
            width: `${clampedValue}%`,
            backgroundColor: fillColor,
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {size === 'Large' && (
            <span className={styles.fillLabel}>{clampedValue}%</span>
          )}
        </div>
      </div>

      {/* Helper text */}
      {showHelperText && (
        <div className={styles.helperRow} style={{ color }}>
          <span className={styles.helperIcon}><Icon /></span>
          <span className={styles.helperText}>{displayHelperText}</span>
        </div>
      )}
    </div>
  );
}

ProgressBar.propTypes = {
  /** Progress value 0–100 */
  value:          PropTypes.number,
  /** Bar height — Small (4 px) · Medium (8 px) · Large (12 px) */
  size:           PropTypes.oneOf(['Small', 'Medium', 'Large']),
  /** Fill color palette — Primary (green #006121) · Neutral (navy #3c5073) */
  variant:        PropTypes.oneOf(['Primary', 'Neutral']),
  /** Current state — affects fill color and helper icon/text */
  status:         PropTypes.oneOf(['default', 'success', 'error']),
  /** Label text rendered above the bar */
  label:          PropTypes.string,
  /** Helper text rendered below the bar (overridden by "Success"/"Error" when status is set) */
  helperText:     PropTypes.string,
  /** Show the label above the bar */
  showLabel:      PropTypes.bool,
  /** Show the helper text below the bar */
  showHelperText: PropTypes.bool,
  /** Right-to-left layout */
  rtl:            PropTypes.bool,
};
