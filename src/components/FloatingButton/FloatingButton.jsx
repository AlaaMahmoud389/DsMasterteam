import PropTypes from 'prop-types';
import styles from './FloatingButton.module.css';

/**
 * FloatingButton — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4380-12202
 *
 * Variants : neutral (Primary-Neutral) | brand (Primary-Brand) | secondary (Secondary-Solid)
 * Sizes    : sm (56 px) | lg (64 px)
 * Modes    : iconOnly=true → circle  |  iconOnly=false → pill with leadIcon + label
 * OnColor  : white button for colored / dark backgrounds
 */
export function FloatingButton({
  children,
  variant = 'brand',
  size = 'lg',
  disabled = false,
  iconOnly = true,
  onColor = false,
  leadIcon = null,
  dir,
  type = 'button',
  onClick,
  ...rest
}) {
  const variantClass = {
    neutral:   styles.neutral,
    brand:     styles.brand,
    secondary: styles.secondary,
  }[variant] ?? styles.brand;

  const cls = [
    styles.root,
    variantClass,
    styles[size],
    iconOnly && styles.iconOnly,
    onColor  && styles.onColor,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={cls}
      disabled={disabled}
      aria-disabled={disabled}
      dir={dir}
      onClick={onClick}
      {...rest}
    >
      {iconOnly ? (
        <span className={styles.icon} aria-hidden="true">{children}</span>
      ) : (
        <>
          {leadIcon && <span className={styles.icon} aria-hidden="true">{leadIcon}</span>}
          <span className={styles.label}>{children}</span>
        </>
      )}
    </button>
  );
}

FloatingButton.propTypes = {
  /** Icon node (iconOnly) or label text (pill mode) */
  children:  PropTypes.node.isRequired,
  /** Primary-Neutral · Primary-Brand · Secondary-Solid */
  variant:   PropTypes.oneOf(['neutral', 'brand', 'secondary']),
  /** sm = 56 px · lg = 64 px */
  size:      PropTypes.oneOf(['sm', 'lg']),
  disabled:  PropTypes.bool,
  /** true → circular icon button (always set aria-label) */
  iconOnly:  PropTypes.bool,
  /** true → white button for placement on colored/dark surfaces */
  onColor:   PropTypes.bool,
  /** Leading icon for pill (iconOnly=false) mode */
  leadIcon:  PropTypes.node,
  dir:       PropTypes.oneOf(['ltr', 'rtl']),
  type:      PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick:   PropTypes.func,
};
