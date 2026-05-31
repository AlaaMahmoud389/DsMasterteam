import PropTypes from 'prop-types';
import styles from './Button.module.css';

/**
 * Button — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4159-296&t=gv8blf425MZ1IhAY-4
 *
 * Variants   : primary | neutral | secondary-solid | transparent | danger | danger-secondary
 * Sizes      : sm (24px) | md (32px) | lg (40px)
 * States     : default | hover | pressed | focused | disabled | loading
 */
export function Button({
  children,
  variant = 'primary',
  size = 'lg',
  disabled = false,
  loading = false,
  fullWidth = false,
  iconOnly = false,
  leadIcon = null,
  trailIcon = null,
  dir,
  type = 'button',
  onClick,
  ...rest
}) {
  const variantClass = {
    'primary':           styles.primary,
    'neutral':           styles.neutral,
    'secondary-solid':   styles.secondarySolid,
    'transparent':       styles.transparent,
    'danger':            styles.danger,
    'danger-secondary':  styles.dangerSecondary,
  }[variant] ?? styles.primary;

  const className = [
    styles.button,
    variantClass,
    styles[size],
    loading   && styles.loading,
    fullWidth && styles.fullWidth,
    iconOnly  && styles.iconOnly,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={className}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading || undefined}
      dir={dir}
      onClick={onClick}
      {...rest}
    >
      {leadIcon && !iconOnly && (
        <span className={styles.iconSlot} aria-hidden="true">
          {leadIcon}
        </span>
      )}

      {iconOnly ? (
        <span className={styles.iconSlot} aria-hidden="true">
          {children}
        </span>
      ) : (
        <span className={styles.label}>{children}</span>
      )}

      {trailIcon && !iconOnly && (
        <span className={styles.iconSlot} aria-hidden="true">
          {trailIcon}
        </span>
      )}
    </button>
  );
}

Button.propTypes = {
  children:  PropTypes.node.isRequired,
  /** Figma styles: primary | neutral | secondary-solid | transparent | danger | danger-secondary */
  variant:   PropTypes.oneOf(['primary', 'neutral', 'secondary-solid', 'transparent', 'danger', 'danger-secondary']),
  /** sm=24px · md=32px · lg=40px */
  size:      PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled:  PropTypes.bool,
  loading:   PropTypes.bool,
  fullWidth: PropTypes.bool,
  /** Renders children as a centered icon (no label). Set aria-label on the button. */
  iconOnly:  PropTypes.bool,
  /** Icon node before the label — 24/20/16px slot by size */
  leadIcon:  PropTypes.node,
  /** Icon node after the label — 24/20/16px slot by size */
  trailIcon: PropTypes.node,
  /** "rtl" flips layout direction for Arabic content */
  dir:       PropTypes.oneOf(['ltr', 'rtl']),
  type:      PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick:   PropTypes.func,
};
