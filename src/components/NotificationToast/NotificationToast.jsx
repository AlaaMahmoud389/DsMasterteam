import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './NotificationToast.module.css';

/* ── Icons (20 × 20 for medium featured-icon circle) ────────── */

const CriticalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 3L17 16H3L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M10 8V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="13.75" r=".875" fill="currentColor"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="13" r=".875" fill="currentColor"/>
  </svg>
);

const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 10L9.5 12.5L13.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 9.5V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="7" r=".875" fill="currentColor"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const VARIANT_META = {
  'Neutral':        { Icon: InfoIcon,     iconBg: '#f3f4f6', accentColor: '#d2d6db' },
  'Info':           { Icon: InfoIcon,     iconBg: '#eff8ff', accentColor: '#1849a9' },
  'Critical/Error': { Icon: CriticalIcon, iconBg: '#fdeceb', accentColor: '#a30000' },
  'Warning':        { Icon: WarningIcon,  iconBg: '#fef4e6', accentColor: '#dd7600' },
  'Success':        { Icon: SuccessIcon,  iconBg: '#e6f4ee', accentColor: '#006121' },
};

/* CSS class-safe key from variant name */
const variantClass = (v) => v.replace('/', '-').toLowerCase(); // e.g. "critical-error"

/* ── Component ─────────────────────────────────────────────── */

/**
 * NotificationToast — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4399-21638
 *
 * Transient card notification that appears on top of content.
 * Type     : Neutral | Info | Critical/Error | Warning | Success
 * Sizes    : default (484px) | mobile (343px)
 * Options  : closeButton · helperText · actions · rtl
 */
export function NotificationToast({
  variant       = 'Neutral',
  closeButton   = true,
  actions       = false,
  helperText    = true,
  mobile        = false,
  rtl           = false,
  title         = 'Notification/Alert message title',
  description   = 'When a Notification needs a further detailed explanation, it goes here.',
  action1Label  = 'Action',
  action2Label  = 'Action',
  onDismiss,
  onAction1,
  onAction2,
  ...rest
}) {
  const [dismissing, setDismissing] = useState(false);
  const meta = VARIANT_META[variant] ?? VARIANT_META['Neutral'];
  const { Icon, iconBg } = meta;

  const handleDismiss = () => setDismissing(true);
  const handleAnimationEnd = () => { if (dismissing) onDismiss?.(); };

  const rootClass = [
    styles.toast,
    styles[variantClass(variant)],
    mobile   && styles.mobile,
    rtl      && styles.rtl,
    dismissing && styles.dismissing,
  ].filter(Boolean).join(' ');

  return (
    <div
      role="alert"
      dir={rtl ? 'rtl' : 'ltr'}
      className={rootClass}
      onAnimationEnd={handleAnimationEnd}
      {...rest}
    >
      {/* Accent border — vertical (desktop) or horizontal (mobile) */}
      <div className={styles.accent} aria-hidden="true" />

      {/* Header row: icon + text block + close button */}
      <div className={styles.header}>
        <span className={styles.iconWrap} style={{ background: iconBg }} aria-hidden="true">
          <Icon />
        </span>

        <div className={styles.textBlock}>
          <strong className={styles.titleText}>{title}</strong>
          {helperText && (
            <span className={styles.descriptionText}>{description}</span>
          )}
        </div>

        {closeButton && (
          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleDismiss}
            aria-label="Dismiss notification"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {/* Action buttons */}
      {actions && (
        <div className={styles.actionsRow}>
          <button type="button" className={styles.actionBtn} onClick={onAction1}>
            {action1Label}
          </button>
          <button type="button" className={styles.actionBtn} onClick={onAction2}>
            {action2Label}
          </button>
        </div>
      )}
    </div>
  );
}

NotificationToast.propTypes = {
  /** Visual type — maps to Figma "type" prop */
  variant:      PropTypes.oneOf(['Neutral', 'Info', 'Critical/Error', 'Warning', 'Success']),
  /** Show × close button */
  closeButton:  PropTypes.bool,
  /** Show two action buttons below the content */
  actions:      PropTypes.bool,
  /** Show the secondary description line */
  helperText:   PropTypes.bool,
  /** 343px mobile width vs 484px desktop width */
  mobile:       PropTypes.bool,
  /** Right-to-left layout for Arabic content */
  rtl:          PropTypes.bool,
  /** Main title text (semibold) */
  title:        PropTypes.string,
  /** Secondary description text (regular, smaller) */
  description:  PropTypes.string,
  /** Label for the first action button */
  action1Label: PropTypes.string,
  /** Label for the second action button */
  action2Label: PropTypes.string,
  /** Called when the dismiss button animation completes */
  onDismiss:    PropTypes.func,
  /** Called when action 1 is clicked */
  onAction1:    PropTypes.func,
  /** Called when action 2 is clicked */
  onAction2:    PropTypes.func,
};
