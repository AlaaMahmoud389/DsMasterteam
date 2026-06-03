import React from 'react';
import styles from './Link.module.css';
import { Icon } from '../icons/Icon';

/**
 * Link — Masterteam Design System
 * Figma: node 4388:104291
 *
 * Props
 *   href      string   — destination URL
 *   style     'primary' | 'neutral' | 'on-color'   (default: 'primary')
 *   size      'medium' | 'small'                   (default: 'medium')
 *   inline    boolean  — always shows underline (even in default state)
 *   icon      boolean  — shows trailing external-link icon
 *   disabled  boolean
 *   rtl       boolean  — right-to-left layout
 *   target / rel / onClick / className / aria-label — forwarded to <a>
 */
export function Link({
  href,
  children,
  style: linkStyle = 'primary',
  size = 'medium',
  inline = false,
  icon = false,
  disabled = false,
  rtl = false,
  target,
  rel,
  onClick,
  className,
  'aria-label': ariaLabel,
  ...rest
}) {
  const handleClick = (e) => {
    if (disabled) { e.preventDefault(); return; }
    onClick?.(e);
  };

  const cls = [
    styles.link,
    styles[`style${capitalize(linkStyle.replace('-', ''))}`],
    styles[`size${capitalize(size)}`],
    inline && styles.inline,
    disabled && styles.disabled,
    rtl && styles.rtl,
    className,
  ].filter(Boolean).join(' ');

  const iconSize = size === 'small' ? 16 : 20;

  return (
    <a
      href={disabled ? undefined : href}
      className={cls}
      onClick={handleClick}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      target={disabled ? undefined : target}
      rel={target === '_blank' ? (rel ?? 'noopener noreferrer') : rel}
      dir={rtl ? 'rtl' : undefined}
      {...rest}
    >
      <span className={styles.text}>{children}</span>
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          <Icon name="external-link" size={iconSize} />
        </span>
      )}
    </a>
  );
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
