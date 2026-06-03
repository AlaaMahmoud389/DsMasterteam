import PropTypes from 'prop-types';
import styles from './ProgressIndicator.module.css';

const CheckIcon = ({ strokeColor = 'white' }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8.5L6.5 12L13 5" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const stateOf = (i, currentStep) =>
  i < currentStep ? 'completed' : i === currentStep ? 'current' : 'upcoming';

const lineColor = (state) =>
  state === 'completed'
    ? 'var(--stepper-completed-line, #194185)'
    : 'var(--stepper-upcoming-line, #e5e7eb)';

/**
 * ProgressIndicator — Masterteam Design System
 * Figma: node 4399:23099 — "Progress Indicator"
 *
 * Step-by-step navigation indicator for forms and multi-step processes.
 * Orientations : vertical (default) · horizontal
 * States        : completed · current · upcoming
 * RTL           : dir="rtl" mirrors layout and text direction
 */
export function ProgressIndicator({
  steps = [],
  currentStep = 0,
  orientation = 'vertical',
  variant = 'default',
  showDescription = true,
  rtl = false,
}) {
  const isHorizontal = orientation === 'horizontal';
  const isDot      = variant === 'dot';
  const isOutlined = variant === 'outlined';

  const rootClass = [
    styles.root,
    styles[orientation],
    variant !== 'default' ? styles[`${variant}Variant`] : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={rootClass}
      dir={rtl ? 'rtl' : 'ltr'}
      role="list"
      aria-label="Progress steps"
    >
      {steps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isCurrent  = i === currentStep;
        const isLast     = i === steps.length - 1;
        const isFirst    = i === 0;
        const state      = isCompleted ? 'completed' : isCurrent ? 'current' : 'upcoming';

        return (
          <div
            key={i}
            className={`${styles.step} ${styles[state]}`}
            role="listitem"
            aria-current={isCurrent ? 'step' : undefined}
          >
            <div className={styles.indicator}>

              {/* Horizontal: left half-line — transparent for first step, colored for others */}
              {isHorizontal && (
                <div
                  className={styles.line}
                  style={{ background: isFirst ? 'transparent' : lineColor(stateOf(i - 1, currentStep)) }}
                  aria-hidden="true"
                />
              )}

              {/* Circle / Dot indicator */}
              <div className={styles.circle}>
                {!isDot && (
                  isCompleted
                    ? <CheckIcon strokeColor={isOutlined ? '#194185' : 'white'} />
                    : <span className={styles.stepNum}>{i + 1}</span>
                )}
              </div>

              {/* Vertical: right/bottom line (hidden for last step) */}
              {!isHorizontal && !isLast && (
                <div className={styles.line} aria-hidden="true" />
              )}

              {/* Horizontal: right half-line — transparent for last step */}
              {isHorizontal && (
                <div
                  className={styles.line}
                  style={{ background: isLast ? 'transparent' : undefined }}
                  aria-hidden="true"
                />
              )}
            </div>

            <div className={styles.content}>
              {step.label && <span className={styles.label}>{step.label}</span>}
              {showDescription && step.description && (
                <span className={styles.description}>{step.description}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

ProgressIndicator.propTypes = {
  /** Array of steps — each has a label and optional description */
  steps: PropTypes.arrayOf(PropTypes.shape({
    label:       PropTypes.string,
    description: PropTypes.string,
  })),
  /** 0-based index of the active step — steps before it are "completed" */
  currentStep: PropTypes.number,
  /** Layout direction — vertical stacks steps; horizontal places them in a row */
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  /** Visual style — default (filled circles), dot (small dots), outlined (border-only circles) */
  variant: PropTypes.oneOf(['default', 'dot', 'outlined']),
  /** Show the description line under each step label */
  showDescription: PropTypes.bool,
  /** Right-to-left — mirrors layout for Arabic/Hebrew content */
  rtl: PropTypes.bool,
};
