import PropTypes from 'prop-types';
import styles from './CircularStepper.module.css';

/**
 * CircularStepper — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4250-1945
 *
 * Variants  : primary (blue) | neutral (dark navy)
 * Sizes     : xs (40px) | sm (48px) | md (64px) | lg (80px) | xl (120px)
 * Themes    : light | dark
 * Features  : circular progress arc · inner step counter · optional label/description/navigation · RTL
 *
 * The arc starts from 12 o'clock and fills clockwise.
 * Progress = currentStep / totalSteps (e.g. step 1 of 4 = 25%).
 */

/* ── Size configuration ──────────────────────────────────── */

const SIZE_CFG = {
  xs: { px: 40,  stroke: 4,  font: 9,  lineH: 12 },
  sm: { px: 48,  stroke: 5,  font: 10, lineH: 14 },
  md: { px: 64,  stroke: 6,  font: 13, lineH: 18 },
  lg: { px: 80,  stroke: 8,  font: 16, lineH: 22 },
  xl: { px: 120, stroke: 10, font: 20, lineH: 28 },
};

/* ── CircularStepper ─────────────────────────────────────── */

export function CircularStepper({
  currentStep   = 1,
  totalSteps    = 4,
  size          = 'md',
  variant       = 'primary',
  theme         = 'light',
  label,
  description,
  onNext,
  onBack,
  nextLabel,
  backLabel,
  dir           = 'ltr',
  className,
  ...rest
}) {
  const cfg        = SIZE_CFG[size] ?? SIZE_CFG.md;
  const { px, stroke, font, lineH } = cfg;
  const isDark     = theme === 'dark';
  const isRtl      = dir  === 'rtl';
  const hasContent = !!(label || description || onNext || onBack);

  /* ── SVG arc geometry ── */
  const r           = (px - stroke) / 2;
  const cx          = px / 2;
  const cy          = px / 2;
  const circumf     = 2 * Math.PI * r;
  const progress    = Math.min(Math.max(currentStep / totalSteps, 0), 1);
  const dashOffset  = circumf * (1 - progress);

  /* ── Colors ── */
  const trackColor = isDark
    ? 'var(--stepper-track-dark)'
    : 'var(--stepper-track, #e5e7eb)';

  const arcColor = isDark
    ? 'var(--stepper-oncolor-primary, #ffffff)'   /* white arc on dark backgrounds */
    : variant === 'primary'
      ? 'var(--stepper-fill-primary, #1849a9)'
      : 'var(--stepper-fill-neutral, #1f2a37)';

  const counterColor = isDark
    ? 'var(--stepper-oncolor-primary, #ffffff)'
    : 'var(--stepper-inner-text, #233a61)';

  /* ── Counter text ── */
  const counterText = isRtl
    ? `${currentStep} من ${totalSteps}`
    : `${currentStep} of ${totalSteps}`;

  /* ── Navigation labels (fall back to Arabic if rtl + not provided) ── */
  const resolvedNext = nextLabel ?? (isRtl ? 'التالي' : 'Next');
  const resolvedBack = backLabel ?? (isRtl ? 'السابق' : 'Back');

  /* ── Wrapper class ── */
  const wrapClass = [
    styles.stepper,
    hasContent ? styles.withContent : '',
    isDark     ? styles.dark        : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={wrapClass}
      dir={dir}
      role="status"
      aria-label={
        isRtl
          ? `الخطوة ${currentStep} من ${totalSteps}${label ? ': ' + label : ''}`
          : `Step ${currentStep} of ${totalSteps}${label ? ': ' + label : ''}`
      }
      {...rest}
    >
      {/* ── Circular indicator ── */}
      <div
        className={styles.indicator}
        style={{ width: px, height: px }}
        aria-hidden="true"
      >
        <svg
          width={px}
          height={px}
          viewBox={`0 0 ${px} ${px}`}
          className={styles.svg}
        >
          {/* Inactive track */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={trackColor}
            strokeWidth={stroke}
          />
          {/* Active progress arc */}
          {progress > 0 && (
            <circle
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={arcColor}
              strokeWidth={stroke}
              strokeDasharray={circumf}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Inner step counter */}
        <span
          className={styles.counter}
          style={{
            fontSize:   font,
            lineHeight: `${lineH}px`,
            color:      counterColor,
          }}
        >
          {counterText}
        </span>
      </div>

      {/* ── Text content (optional) ── */}
      {hasContent && (
        <div className={[styles.content, styles[`content_${size}`]].filter(Boolean).join(' ')}>
          {label && (
            <div className={[styles.label, isDark ? styles.labelDark : ''].filter(Boolean).join(' ')}>
              {label}
            </div>
          )}
          {description && (
            <div className={[styles.description, isDark ? styles.descriptionDark : ''].filter(Boolean).join(' ')}>
              {description}
            </div>
          )}
          {(onBack || onNext) && (
            <div className={styles.nav}>
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className={[styles.navBtn, isDark ? styles.navBtnDark : ''].filter(Boolean).join(' ')}
                >
                  {resolvedBack}
                </button>
              )}
              {onNext && (
                <button
                  type="button"
                  onClick={onNext}
                  className={[styles.navBtn, isDark ? styles.navBtnDark : ''].filter(Boolean).join(' ')}
                >
                  {resolvedNext}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

CircularStepper.propTypes = {
  /** Current step number (1-indexed) */
  currentStep: PropTypes.number,
  /** Total number of steps */
  totalSteps: PropTypes.number,
  /** Circle diameter — xs=40 · sm=48 · md=64 · lg=80 · xl=120 */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /** Arc fill color variant */
  variant: PropTypes.oneOf(['primary', 'neutral']),
  /** Color theme — light (default) or dark (inverted, for dark backgrounds) */
  theme: PropTypes.oneOf(['light', 'dark']),
  /** Step title — renders the text content area when provided */
  label: PropTypes.string,
  /** Step description shown below the label */
  description: PropTypes.string,
  /** Next button click handler — renders the Next button when provided */
  onNext: PropTypes.func,
  /** Back button click handler — renders the Back button when provided */
  onBack: PropTypes.func,
  /** Override label for the Next button */
  nextLabel: PropTypes.string,
  /** Override label for the Back button */
  backLabel: PropTypes.string,
  /** Text direction — rtl flips layout and inner text to Arabic format */
  dir: PropTypes.oneOf(['ltr', 'rtl']),
};
