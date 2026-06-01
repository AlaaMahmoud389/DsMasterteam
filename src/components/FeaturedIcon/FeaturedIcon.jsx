/**
 * FeaturedIcon — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4388-1265
 * Component set: node-id=4388:1265
 * Variant props: Size · Color · Circle · OnColor
 * Sizes: sm · md · lg · xl
 * Colors: default · info · success · warning · error · brand · gray-attention
 */

import React from 'react';
import { Icon } from '../icons/Icon';
import styles from './FeaturedIcon.module.css';

/* Icon px size matched to each container size */
const ICON_SIZE_MAP = { sm: 16, md: 20, lg: 24, xl: 32 };

const SIZE_CLASS = {
  sm: 'sizeSm',
  md: 'sizeMd',
  lg: 'sizeLg',
  xl: 'sizeXl',
};

const COLOR_CLASS = {
  'default':        'colorDefault',
  'info':           'colorInfo',
  'success':        'colorSuccess',
  'warning':        'colorWarning',
  'error':          'colorError',
  'brand':          'colorBrand',
  'gray-attention': 'colorGrayAttention',
};

/**
 * A decorative badge that pairs a semantic color with an icon.
 *
 * @param {object}  props
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md']
 *   Container + icon size — sm(32px) · md(40px) · lg(48px) · xl(56px).
 * @param {'default'|'info'|'success'|'warning'|'error'|'brand'|'gray-attention'} [props.color='default']
 *   Semantic color token.
 * @param {boolean} [props.circle=false]
 *   true → full circle (border-radius 50%); false → rounded rectangle (4 px corners).
 * @param {boolean} [props.onColor=false]
 *   true → colored background fill (OnColor=Yes);
 *   false → white background with a colored border (OnColor=No).
 * @param {string}  [props.icon]
 *   Icon name from the design-system registry. Renders at the correct px size automatically.
 * @param {React.ReactNode} [props.children]
 *   Custom icon element — used when the icon prop is not provided.
 * @param {string}  [props.className]   Extra class on the container.
 * @param {string}  [props.aria-label]  Accessible label; makes the container role="img".
 */
export function FeaturedIcon({
  size     = 'md',
  color    = 'default',
  circle   = false,
  onColor  = false,
  icon,
  children,
  className = '',
  'aria-label': ariaLabel,
}) {
  const sizeClass  = styles[SIZE_CLASS[size]  ?? 'sizeMd'];
  const colorClass = styles[COLOR_CLASS[color] ?? 'colorDefault'];

  const cls = [
    styles.container,
    sizeClass,
    colorClass,
    circle  ? styles.isCircle       : null,
    !onColor ? styles.noBackground  : null,
    className || null,
  ].filter(Boolean).join(' ');

  const iconPx = ICON_SIZE_MAP[size] ?? 20;

  const renderedIcon = icon
    ? <Icon name={icon} size={iconPx} aria-hidden="true" />
    : children;

  return (
    <div
      className={cls}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel ? 'true' : undefined}
    >
      {renderedIcon}
    </div>
  );
}
