import PropTypes from 'prop-types';
import styles from './InlineAlert.module.css';

/* ── Icons ─────────────────────────────────────────────────── */

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 9.5V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="7" r=".875" fill="currentColor"/>
  </svg>
);

const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6.5 10.5L9 13L13.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 7V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="13.5" r=".875" fill="currentColor"/>
  </svg>
);

const DestructiveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 3.5L17.5 16.5H2.5L10 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M10 8.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="14" r=".875" fill="currentColor"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ICONS = {
  info:        InfoIcon,
  success:     SuccessIcon,
  warning:     WarningIcon,
  destructive: DestructiveIcon,
};

/* ── Component ─────────────────────────────────────────────── */

/**
 * InlineAlert — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4383-103202
 *
 * Types      : info | success | warning | destructive
 * Mobile     : compact 343 px card with stacked layout
 * Desktop    : full-width bar with side accent stripe
 * RTL        : rtl=true mirrors layout for Arabic
 */
export function InlineAlert({
  type             = 'info',
  mobile           = false,
  rtl              = false,
  dismissible      = true,
  showDescription  = true,
  showActions      = false,
  title            = 'Notification/Alert message title',
  description      = 'When a Notification/Alert needs a further detailed explanation, it goes here.',
  primaryActionLabel   = 'Button',
  secondaryActionLabel = 'Button',
  onClose,
  onPrimaryAction,
  onSecondaryAction,
  ...rest
}) {
  const Icon = ICONS[type] ?? ICONS.info;

  const rootClass = [
    styles.root,
    styles[type],
    mobile && styles.mobile,
  ].filter(Boolean).join(' ');

  return (
    <div
      role="alert"
      dir={rtl ? 'rtl' : 'ltr'}
      className={rootClass}
      {...rest}
    >
      {/* Accent stripe — vertical (desktop) or horizontal (mobile) */}
      <span className={styles.accentBar} aria-hidden="true" />

      {/* ── Header row: icon + text + close (desktop only text) ── */}
      <div className={styles.header}>
        <span className={styles.iconWrap} aria-hidden="true">
          <Icon />
        </span>

        {!mobile && (
          <div className={styles.textBlock}>
            <p className={styles.title}>{title}</p>
            {showDescription && <p className={styles.description}>{description}</p>}
          </div>
        )}

        {!mobile && dismissible && (
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Dismiss alert"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {/* ── Mobile text (separate row) ── */}
      {mobile && (
        <div className={styles.textBlock}>
          <p className={styles.title}>{title}</p>
          {showDescription && <p className={styles.description}>{description}</p>}
        </div>
      )}

      {/* ── Mobile close button (absolute, does not affect flow) ── */}
      {mobile && dismissible && (
        <button
          type="button"
          className={styles.closeBtnMobile}
          onClick={onClose}
          aria-label="Dismiss alert"
        >
          <CloseIcon />
        </button>
      )}

      {/* ── Action buttons ── */}
      {showActions && (
        <div className={[styles.actions, mobile && styles.actionsVertical].filter(Boolean).join(' ')}>
          <button type="button" className={styles.actionPrimary} onClick={onPrimaryAction}>
            {primaryActionLabel}
          </button>
          <button type="button" className={styles.actionSecondary} onClick={onSecondaryAction}>
            {secondaryActionLabel}
          </button>
        </div>
      )}
    </div>
  );
}

InlineAlert.propTypes = {
  /** Alert severity — controls color palette and icon */
  type: PropTypes.oneOf(['info', 'success', 'warning', 'destructive']),
  /** Mobile layout (compact card 343 px) vs desktop (full-width bar) */
  mobile: PropTypes.bool,
  /** Right-to-left layout for Arabic content */
  rtl: PropTypes.bool,
  /** Show the × dismiss button */
  dismissible: PropTypes.bool,
  /** Show the supporting description paragraph */
  showDescription: PropTypes.bool,
  /** Show the two action buttons below the text */
  showActions: PropTypes.bool,
  /** Bold alert title */
  title: PropTypes.string,
  /** Supporting description text */
  description: PropTypes.string,
  /** Primary action button label */
  primaryActionLabel: PropTypes.string,
  /** Secondary action button label */
  secondaryActionLabel: PropTypes.string,
  /** Called when the dismiss button is clicked */
  onClose: PropTypes.func,
  /** Called when the primary action button is clicked */
  onPrimaryAction: PropTypes.func,
  /** Called when the secondary action button is clicked */
  onSecondaryAction: PropTypes.func,
};
