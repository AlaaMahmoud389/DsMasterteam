import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Notification.module.css';

/* ── Icons ─────────────────────────────────────────────────── */

const CriticalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2.5L13.5 12.5H2.5L8 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M8 6V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="8" cy="11" r=".75" fill="currentColor"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 5.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="8" cy="10.5" r=".75" fill="currentColor"/>
  </svg>
);

const SuccessIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5.5 8L7.5 10L10.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 7.5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="8" cy="5.5" r=".75" fill="currentColor"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ICONS = {
  Critical: CriticalIcon,
  Warning:  WarningIcon,
  Success:  SuccessIcon,
  Info:     InfoIcon,
  Neutral:  InfoIcon,
};

/* ── Component ─────────────────────────────────────────────── */

/**
 * Notification — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4399-21418
 *
 * Variants   : Critical | Warning | Success | Info | Neutral
 * Dismissible: true (shows ×) | false (no ×)
 * RTL        : rtl=true mirrors layout for Arabic
 */
export function Notification({
  variant     = 'Critical',
  dismissible = true,
  rtl         = false,
  title       = 'Important:',
  message     = 'This is a very important banner message that requires attention.',
  onDismiss,
  ...rest
}) {
  const [dismissing, setDismissing] = useState(false);
  const Icon = ICONS[variant] ?? ICONS.Critical;

  const handleDismiss = () => {
    setDismissing(true);
  };

  const handleAnimationEnd = () => {
    if (dismissing) onDismiss?.();
  };

  return (
    <div
      role="alert"
      dir={rtl ? 'rtl' : 'ltr'}
      className={[
        styles.notification,
        styles[variant.toLowerCase()],
        dismissing && styles.dismissing,
      ].filter(Boolean).join(' ')}
      onAnimationEnd={handleAnimationEnd}
      {...rest}
    >
      <span className={styles.iconWrap} aria-hidden="true">
        <Icon />
      </span>

      <strong className={styles.titleLabel}>{title}</strong>

      <span className={styles.message}>{message}</span>

      {dismissible && (
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
  );
}

Notification.propTypes = {
  /** Figma "style" prop — controls color palette and icon */
  variant:    PropTypes.oneOf(['Critical', 'Warning', 'Success', 'Info', 'Neutral']),
  /** Show or hide the × dismiss button */
  dismissible: PropTypes.bool,
  /** Right-to-left layout for Arabic content */
  rtl:        PropTypes.bool,
  /** Bold label prefix shown before the message */
  title:      PropTypes.string,
  /** Body message text */
  message:    PropTypes.string,
  /** Called when the dismiss button is clicked */
  onDismiss:  PropTypes.func,
};
