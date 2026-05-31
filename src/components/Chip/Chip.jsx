/**
 * Chip — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4140-89804
 * Component set: node-id=4157-86523 · 288 variants · 6 variant properties
 * Variant props  : RTL · State · Style · Size · Rounded · On-color
 * Instance props : Text EN · Text AR · Show Lead Icon · Show Trail Icon · Close Button
 */

import React, { useCallback } from 'react';
import styles from './Chip.module.css';

/* ── Built-in icon shapes ─────────────────────────────────── */

/** Default lead icon — small circle (swap-able via leadIcon prop) */
export function ChipLeadIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="5" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

/** Default trail icon — small chevron-right (swap-able via trailIcon prop) */
export function ChipTrailIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Close / remove icon used by Button-Close */
function XIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1.5 1.5L10.5 10.5M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Chip ───────────────────────────────────────────────────── */
/**
 * @param {object}  props
 * @param {string}  [props.label='Item']            Chip text (Text EN in Figma)
 * @param {string}  [props.labelAr]                 Arabic label (Text AR in Figma); shown when dir='rtl'
 * @param {'primary'|'neutral'} [props.chipStyle='primary']  Style variant
 * @param {'sm'|'md'|'lg'}      [props.size='lg']            Size
 * @param {boolean} [props.rounded=true]            Rounded corners (9999 px)
 * @param {boolean} [props.onColor=false]           On-color variant (solid dark background)
 * @param {'default'|'hovered'|'focused'|'pressed'|'selected'|'disabled'} [props.state='default']
 *   Controlled display state. Leave unset for interactive behaviour.
 * @param {boolean} [props.selected=false]          Selected toggle state
 * @param {boolean} [props.disabled=false]          Disabled state
 * @param {'ltr'|'rtl'} [props.dir='ltr']           Text direction
 * @param {boolean} [props.showLeadIcon=false]      Show leading icon
 * @param {React.ReactNode} [props.leadIcon]        Custom lead icon node
 * @param {boolean} [props.showTrailIcon=false]     Show trailing icon
 * @param {React.ReactNode} [props.trailIcon]       Custom trail icon node
 * @param {boolean} [props.showCloseButton=false]   Show close / remove button
 * @param {function} [props.onClose]                Called when close button clicked
 * @param {function} [props.onClick]                Called when chip is clicked / activated
 * @param {string}  [props.className]               Extra class
 */
export function Chip({
  label = 'Item',
  labelAr,
  chipStyle = 'primary',
  size = 'lg',
  rounded = true,
  onColor = false,
  state,                 // optional controlled state
  selected = false,
  disabled = false,
  dir = 'ltr',
  showLeadIcon = false,
  leadIcon,
  showTrailIcon = false,
  trailIcon,
  showCloseButton = false,
  onClose,
  onClick,
  className = '',
}) {
  /* Resolve effective state flags */
  const isDisabled = disabled || state === 'disabled';
  const isSelected = selected || state === 'selected';
  const isFocused  = state === 'focused';

  /* Icon sizing by chip size */
  const iconSize = size === 'sm' ? 10 : size === 'md' ? 12 : 16;

  /* Build class list */
  const rootCls = [
    styles.chip,
    styles[size === 'sm' ? 'sizeSm' : size === 'md' ? 'sizeMd' : 'sizeLg'],
    styles[chipStyle === 'neutral' ? 'neutral' : 'primary'],
    rounded   && styles.rounded,
    onColor   && styles.onColor,
    isSelected && styles.selected,
    isFocused  && styles.focused,
    isDisabled && styles.disabled,
    className,
  ].filter(Boolean).join(' ');

  /* Display label — use AR text when dir=rtl and labelAr provided */
  const displayLabel = (dir === 'rtl' && labelAr) ? labelAr : label;

  const handleKeyDown = useCallback((e) => {
    if (isDisabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  }, [isDisabled, onClick]);

  const handleClose = useCallback((e) => {
    e.stopPropagation();
    if (!isDisabled) onClose?.();
  }, [isDisabled, onClose]);

  const handleCloseKey = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      if (!isDisabled) onClose?.();
    }
  }, [isDisabled, onClose]);

  return (
    /*
     * We use <span role="button"> instead of <button> so that the
     * close <button> inside is valid HTML (nested <button> is illegal).
     */
    <span
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      dir={dir}
      aria-pressed={isSelected}
      aria-disabled={isDisabled}
      className={rootCls}
      onClick={isDisabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
    >
      {/* Lead icon */}
      {showLeadIcon && (
        <span className={styles.iconWrap} aria-hidden="true">
          {leadIcon ?? <ChipLeadIcon size={iconSize} />}
        </span>
      )}

      {/* Label */}
      <span className={styles.label}>{displayLabel}</span>

      {/* Trail icon */}
      {showTrailIcon && (
        <span className={styles.iconWrap} aria-hidden="true">
          {trailIcon ?? <ChipTrailIcon size={iconSize} />}
        </span>
      )}

      {/* Close / remove button */}
      {showCloseButton && (
        <button
          type="button"
          className={styles.closeBtn}
          onClick={handleClose}
          onKeyDown={handleCloseKey}
          aria-label="Remove"
          tabIndex={isDisabled ? -1 : 0}
          disabled={isDisabled}
        >
          <XIcon size={iconSize} />
        </button>
      )}
    </span>
  );
}

/* ── ChipGroup ──────────────────────────────────────────────── */
/**
 * Renders a row of chips from an `items` array, forwarding shared props.
 *
 * @param {object}   props
 * @param {Array<{label:string, labelAr?:string, selected?:boolean, onClose?:function, onClick?:function}>} props.items
 * @param {'primary'|'neutral'} [props.chipStyle]
 * @param {'sm'|'md'|'lg'}      [props.size]
 * @param {boolean}  [props.rounded]
 * @param {boolean}  [props.onColor]
 * @param {boolean}  [props.disabled]
 * @param {'ltr'|'rtl'} [props.dir]
 * @param {boolean}  [props.showLeadIcon]
 * @param {boolean}  [props.showTrailIcon]
 * @param {boolean}  [props.showCloseButton]
 * @param {string}   [props.gap='8px']
 */
export function ChipGroup({
  items = [],
  chipStyle,
  size,
  rounded,
  onColor,
  disabled,
  dir,
  showLeadIcon,
  showTrailIcon,
  showCloseButton,
  gap = '8px',
}) {
  return (
    <div
      role="list"
      style={{ display: 'flex', flexWrap: 'wrap', gap, direction: dir === 'rtl' ? 'rtl' : 'ltr' }}
    >
      {items.map((item, i) => (
        <div role="listitem" key={i}>
          <Chip
            label={item.label}
            labelAr={item.labelAr}
            chipStyle={chipStyle}
            size={size}
            rounded={rounded}
            onColor={onColor}
            selected={item.selected}
            disabled={disabled ?? item.disabled}
            dir={dir}
            showLeadIcon={showLeadIcon}
            showTrailIcon={showTrailIcon}
            showCloseButton={showCloseButton}
            onClose={item.onClose}
            onClick={item.onClick}
          />
        </div>
      ))}
    </div>
  );
}
