/**
 * Divider — Masterteam Design System
 * A visual separator used to divide content horizontally or vertically.
 * Variants: Orientation · Color · OnColor
 */

import React from 'react';
import styles from './Divider.module.css';

/**
 * @param {object}  props
 * @param {'horizontal'|'vertical'} [props.orientation='horizontal']  Layout direction of the divider line.
 * @param {'neutral'|'primary'|'solidWhite'} [props.color='neutral']  Color token.
 *   - neutral    : #ffffff at 30% opacity — works in both default and on-color contexts.
 *   - primary    : #1849A9 — use on light/default backgrounds.
 *   - solidWhite : #ffffff at 100% — use only in on-color (dark) contexts.
 * @param {boolean} [props.onColor=false]  Signals the divider sits on the dark #000B36 background.
 * @param {string}  [props.className]      Extra class applied to the element.
 */
export function Divider({
  orientation = 'horizontal',
  color = 'neutral',
  onColor = false,
  className = '',
}) {
  const orientationClass = orientation === 'vertical' ? styles.vertical : styles.horizontal;

  const colorClass =
    color === 'primary'    ? styles.primary
    : color === 'solidWhite' ? styles.solidWhite
    : styles.neutral;

  const cls = [
    styles.divider,
    orientationClass,
    colorClass,
    onColor && styles.onColorContext,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cls}
    />
  );
}
