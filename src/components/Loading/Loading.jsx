import React from 'react';
import styles from './Loading.module.css';

/**
 * Loading — Masterteam Design System
 * Figma: node 4389:1155
 *
 * A circular spinner built from two arcs (Track + Tail) that rotate
 * continuously. The Indicator frames (1-4) in Figma represent 4 rotation
 * positions of the 90° tail arc — reproduced here as a CSS keyframe animation.
 *
 * Props:
 *   size    'xx-small'|'x-small'|'small'|'medium'|'large'|'x-large'|'xx-large'
 *             (default: 'medium')
 *   style   'primary'|'neutral'|'on-color'  (default: 'primary')
 *   label   string  — accessible aria-label  (default: 'Loading')
 */
export function Loading({
  size = 'medium',
  style: loadingStyle = 'primary',
  label = 'Loading',
  className,
  ...rest
}) {
  const sizeClass = {
    'xx-small': styles.sizeXxSmall,
    'x-small':  styles.sizeXSmall,
    'small':    styles.sizeSmall,
    'medium':   styles.sizeMedium,
    'large':    styles.sizeLarge,
    'x-large':  styles.sizeXLarge,
    'xx-large': styles.sizeXxLarge,
  }[size] ?? styles.sizeMedium;

  const styleClass = {
    'primary':  styles.stylePrimary,
    'neutral':  styles.styleNeutral,
    'on-color': styles.styleOnColor,
  }[loadingStyle] ?? styles.stylePrimary;

  return (
    <div
      className={[styles.spinner, sizeClass, styleClass, className].filter(Boolean).join(' ')}
      role="status"
      aria-label={label}
      aria-live="polite"
      {...rest}
    />
  );
}
