/**
 * ContentSwitcher — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4140-89803
 * Component set: node-id=4157:86138 · 12 variants
 * Item set:      node-id=4157:85806 · 144 variants
 * Variant props  : RTL · OnColor · Size · Item Type · State
 * Instance props : Text En · Text AR · 2nd item · 3rd Item
 */

import React, { useCallback } from 'react';
import styles from './ContentSwitcher.module.css';

/* ── ContentSwitcher ────────────────────────────────────────── */
/**
 * A segmented control that lets the user switch between two or more
 * mutually-exclusive views / modes.
 *
 * @param {object}   props
 * @param {Array<{label:string, labelAr?:string, value:any, disabled?:boolean}>} props.items
 *   Ordered list of items to display. Minimum 2, recommended max 4.
 * @param {any}      [props.value]           Currently selected value.
 * @param {function} [props.onChange]        Called with the new value when an item is clicked.
 * @param {'sm'|'md'|'lg'} [props.size='sm'] Size — Small / Medium / Large.
 * @param {boolean}  [props.onColor=false]   On-colour variant (dark background context).
 * @param {boolean}  [props.disabled=false]  Disable all items.
 * @param {'ltr'|'rtl'} [props.dir='ltr']   Text direction.
 * @param {string}   [props.ariaLabel]       Accessible label for the group.
 * @param {string}   [props.className]       Extra class on the wrapper.
 */
export function ContentSwitcher({
  items = [],
  value,
  onChange,
  size = 'sm',
  onColor = false,
  disabled = false,
  dir = 'ltr',
  ariaLabel = 'Content switcher',
  className = '',
}) {
  const sizeClass =
    size === 'md' ? styles.sizeMd
    : size === 'lg' ? styles.sizeLg
    : styles.sizeSm;

  const colourClass = onColor ? styles.onColor : styles.default;

  const handleClick = useCallback(
    (itemValue) => {
      if (!disabled) onChange?.(itemValue);
    },
    [disabled, onChange],
  );

  const handleKeyDown = useCallback(
    (e, itemValue) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!disabled) onChange?.(itemValue);
      }
    },
    [disabled, onChange],
  );

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      dir={dir}
      className={[styles.container, className].filter(Boolean).join(' ')}
    >
      {items.map((item, i) => {
        const isFirst = i === 0;
        const isLast  = i === items.length - 1;
        const isSelected = item.value === value;
        const isDisabled = disabled || item.disabled;

        /* Display label: Arabic when dir=rtl and labelAr provided */
        const displayLabel = dir === 'rtl' && item.labelAr ? item.labelAr : item.label;

        const itemCls = [
          styles.item,
          sizeClass,
          colourClass,
          isFirst && styles.itemFirst,
          isLast  && styles.itemLast,
          isSelected && styles.selected,
        ].filter(Boolean).join(' ');

        return (
          <button
            key={String(item.value ?? i)}
            type="button"
            className={itemCls}
            aria-pressed={isSelected}
            disabled={isDisabled}
            onClick={() => handleClick(item.value)}
            onKeyDown={(e) => handleKeyDown(e, item.value)}
          >
            {displayLabel}
          </button>
        );
      })}
    </div>
  );
}
