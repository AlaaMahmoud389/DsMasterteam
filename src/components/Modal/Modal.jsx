import PropTypes from 'prop-types';
import styles from './Modal.module.css';

/* ── Icons ─────────────────────────────────────────────────── */

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 9.5V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="7" r=".875" fill="currentColor"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Component ─────────────────────────────────────────────── */

/**
 * Modal — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4393-101686
 *
 * Desktop: 600 px card with three-button footer (tertiary left, secondary+primary right)
 * Mobile : 320 px card with stacked full-width buttons (primary → secondary → tertiary)
 * RTL    : rtl=true mirrors layout for Arabic
 */
export function Modal({
  mobile               = false,
  rtl                  = false,
  dismissible          = true,
  showDescription      = true,
  showActions          = true,
  title                = 'Title goes here',
  description          = 'When a Modal needs a further detailed explanation, it goes here.',
  primaryActionLabel   = 'Button',
  secondaryActionLabel = 'Button',
  tertiaryActionLabel  = 'Button',
  onClose,
  onPrimaryAction,
  onSecondaryAction,
  onTertiaryAction,
  ...rest
}) {
  const rootClass = [styles.root, mobile && styles.mobile].filter(Boolean).join(' ');

  return (
    <div
      role="dialog"
      aria-modal="true"
      dir={rtl ? 'rtl' : 'ltr'}
      className={rootClass}
      {...rest}
    >
      {/* ── Header: icon row + title text ── */}
      <div className={styles.header}>
        {/* Icon row — close button is absolutely positioned within this row */}
        <div className={styles.titleRow}>
          <span className={styles.iconWrap} aria-hidden="true">
            <InfoIcon />
          </span>

          {dismissible && (
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>
          )}
        </div>

        {/* Title text — full-width row below the icon */}
        <p className={styles.title}>{title}</p>
      </div>

      {/* ── Body ── */}
      {showDescription && (
        <div className={styles.body}>
          <p className={styles.description}>{description}</p>
        </div>
      )}

      {/* ── Actions ── */}
      {showActions && (
        mobile ? (
          /* Mobile: stacked full-width — Primary on top */
          <div className={[styles.actions, styles.actionsMobile].join(' ')}>
            <button type="button" className={[styles.actionPrimary, styles.actionFull].join(' ')} onClick={onPrimaryAction}>
              <span className={styles.arrow}><ArrowIcon /></span>
              {primaryActionLabel}
            </button>
            <button type="button" className={[styles.actionSecondary, styles.actionFull].join(' ')} onClick={onSecondaryAction}>
              <span className={styles.arrow}><ArrowIcon /></span>
              {secondaryActionLabel}
            </button>
            <button type="button" className={[styles.actionTertiary, styles.actionFull].join(' ')} onClick={onTertiaryAction}>
              <span className={styles.arrow}><ArrowIcon /></span>
              {tertiaryActionLabel}
            </button>
          </div>
        ) : (
          /* Desktop: Tertiary (flex-1 left/right) + Secondary + Primary */
          <div className={styles.actions}>
            <span className={styles.tertiaryWrapper}>
              <button type="button" className={styles.actionTertiary} onClick={onTertiaryAction}>
                <span className={styles.arrow}><ArrowIcon /></span>
                {tertiaryActionLabel}
              </button>
            </span>
            <button type="button" className={styles.actionSecondary} onClick={onSecondaryAction}>
              <span className={styles.arrow}><ArrowIcon /></span>
              {secondaryActionLabel}
            </button>
            <button type="button" className={styles.actionPrimary} onClick={onPrimaryAction}>
              <span className={styles.arrow}><ArrowIcon /></span>
              {primaryActionLabel}
            </button>
          </div>
        )
      )}
    </div>
  );
}

Modal.propTypes = {
  /** Mobile layout (320 px) vs desktop (600 px) */
  mobile: PropTypes.bool,
  /** Right-to-left layout for Arabic content */
  rtl: PropTypes.bool,
  /** Show the × close button */
  dismissible: PropTypes.bool,
  /** Show the supporting description paragraph */
  showDescription: PropTypes.bool,
  /** Show the three action buttons */
  showActions: PropTypes.bool,
  /** Modal title text */
  title: PropTypes.string,
  /** Supporting description text */
  description: PropTypes.string,
  /** Primary (filled) action button label */
  primaryActionLabel: PropTypes.string,
  /** Secondary (tinted) action button label */
  secondaryActionLabel: PropTypes.string,
  /** Tertiary (ghost) action button label */
  tertiaryActionLabel: PropTypes.string,
  /** Called when the close button is clicked */
  onClose: PropTypes.func,
  /** Called when the primary action is clicked */
  onPrimaryAction: PropTypes.func,
  /** Called when the secondary action is clicked */
  onSecondaryAction: PropTypes.func,
  /** Called when the tertiary action is clicked */
  onTertiaryAction: PropTypes.func,
};
