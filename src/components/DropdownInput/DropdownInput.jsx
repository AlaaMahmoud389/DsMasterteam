import React, { useState, useRef, useEffect } from 'react';
import textStyles from '../TextInput/TextInput.module.css';
import styles from './DropdownInput.module.css';
import { Checkbox } from '../Checkbox/Checkbox';

/**
 * DropdownInput — Masterteam Design System
 *
 * A select-style field sharing TextInput's visual design. Clicking the field
 * opens a dropdown list. Chevron rotates 180° when open.
 *
 * Field props (shared with TextInput):
 *   label / showLabel / labelType / required
 *   size           'medium' | 'large'
 *   state          'default' | 'hovered' | 'pressed' | 'focused' | 'read-only' | 'disabled'
 *   error          boolean
 *   variant        'default' | 'filled-darker' | 'filled-lighter'
 *   placeholder    string
 *   showHelperText / helperText / helperIcon
 *   rtl            boolean
 *   className
 *
 * Dropdown props:
 *   items          array  — [{ type:'item'|'group', value, label, icon, disabled }]
 *   listType       'text' | 'text-multi' | 'icon' | 'icon-text-multi'
 *   selectedValue  string          — controlled single-select
 *   selectedValues string[]        — controlled multi-select
 *   onSelectionChange (val) => void — called with string (single) or string[] (multi)
 */

/* ── Icons ──────────────────────────────────────────────────────── */

function HelperCircleIcon({ color = '#384250' }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16"
      fill="none" aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <circle cx="8" cy="8" r="7.25" stroke={color} strokeWidth="1.5" />
      <path
        d="M6.5 6.25A1.5 1.5 0 0 1 8 4.75a1.5 1.5 0 0 1 1.5 1.5c0 1-1.5 1.5-1.5 2.5"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="8" cy="11.25" r="0.875" fill={color} />
    </svg>
  );
}

function ChevronDownIcon({ color = '#000B36', open = false }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 20 20"
      fill="none" aria-hidden="true"
      style={{
        flexShrink: 0,
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 150ms ease',
      }}
    >
      <path
        d="M5 7.5l5 5 5-5"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function TickIcon() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16"
      fill="none" aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M3 8.5l3.5 3.5 6.5-7"
        stroke="#1849A9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════
   DropdownInput
   ════════════════════════════════════════════════════════════════════ */
export function DropdownInput({
  /* Label */
  label          = 'Label',
  showLabel      = true,
  labelType      = 'regular',
  required       = false,

  /* Field */
  size           = 'medium',
  state          = 'default',
  error          = false,
  variant        = 'default',

  /* Content */
  placeholder    = 'Select...',

  /* Helper text */
  showHelperText = false,
  helperText     = 'Helper text',
  helperIcon,

  /* Direction */
  rtl            = false,

  /* Dropdown */
  items          = [],
  listType       = 'text',
  selectedValue,
  selectedValues,
  onSelectionChange,
  defaultOpen    = false,

  className,
  ...rest
}) {
  const isMulti    = listType === 'text-multi' || listType === 'icon-text-multi';
  const isDisabled = state === 'disabled';
  const isReadOnly = state === 'read-only';
  const isLarge    = size === 'large';

  /* ── Open state ── */
  const [isOpen, setIsOpen] = useState(defaultOpen);

  /* ── Internal selection state (uncontrolled fallback) ── */
  const [internalSingle, setInternalSingle] = useState(null);
  const [internalMulti,  setInternalMulti]  = useState([]);

  /* ── Resolved selection ── */
  const currentSingle = selectedValue  !== undefined ? selectedValue  : internalSingle;
  const currentMulti  = selectedValues !== undefined ? selectedValues : internalMulti;

  /* ── Close on outside click ── */
  const containerRef = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [isOpen]);

  /* ── Display text in the field ── */
  const flatItems = items.filter((i) => i.type !== 'group');

  const getDisplayText = () => {
    if (isMulti) {
      if (currentMulti.length === 0) return '';
      const labels = flatItems
        .filter((i) => currentMulti.includes(i.value))
        .map((i) => i.label);
      return labels.length === 1 ? labels[0] : `${labels.length} selected`;
    }
    const found = flatItems.find((i) => i.value === currentSingle);
    return found ? found.label : '';
  };

  const displayText = getDisplayText();

  /* ── Interaction ── */
  const handleFieldClick = () => {
    if (isDisabled || isReadOnly) return;
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (itemValue) => {
    if (isMulti) {
      const newValues = currentMulti.includes(itemValue)
        ? currentMulti.filter((v) => v !== itemValue)
        : [...currentMulti, itemValue];
      if (selectedValues === undefined) setInternalMulti(newValues);
      onSelectionChange?.(newValues);
    } else {
      if (selectedValue === undefined) setInternalSingle(itemValue);
      onSelectionChange?.(itemValue);
      setIsOpen(false);
    }
  };

  /* ── Class assembly ── */
  const wrapperCls = [
    textStyles.wrapper,
    rtl && textStyles.rtl,
    className,
  ].filter(Boolean).join(' ');

  const labelCls = [
    textStyles.label,
    isLarge ? textStyles.labelLarge : textStyles.labelMedium,
    labelType === 'semibold' && textStyles.labelSemibold,
    isDisabled && textStyles.labelDisabled,
  ].filter(Boolean).join(' ');

  const requiredCls = [
    textStyles.required,
    isLarge ? textStyles.requiredLarge : textStyles.requiredMedium,
  ].filter(Boolean).join(' ');

  const variantCls = variant === 'filled-darker'  ? textStyles.variantFilledDarker
                   : variant === 'filled-lighter' ? textStyles.variantFilledLighter
                   : null;

  const fieldCls = [
    textStyles.field,
    isLarge ? textStyles.fieldLarge : textStyles.fieldMedium,
    variantCls,
    error        ? textStyles.fieldError    :
    isDisabled   ? textStyles.fieldDisabled :
    isReadOnly   ? textStyles.fieldReadOnly :
    state === 'hovered' ? textStyles.fieldHovered :
    state === 'pressed' ? textStyles.fieldPressed :
    state === 'focused' ? textStyles.fieldFocused :
    textStyles.fieldDefault,
    error && state === 'pressed' && textStyles.fieldPressed,
    error && state === 'focused' && textStyles.fieldFocused,
  ].filter(Boolean).join(' ');

  const displayCls = [
    styles.displayText,
    isLarge ? styles.displayTextLarge : '',
    displayText ? styles.displayTextValue : styles.displayTextPlaceholder,
    isDisabled ? styles.displayTextDisabled : '',
  ].filter(Boolean).join(' ');

  const chevronColor = isDisabled ? '#6C7C96' : '#000B36';

  /* ── Item renderer ── */
  const renderItem = (item, index) => {
    if (item.type === 'group') {
      return (
        <div key={`group-${index}`} className={styles.groupLabel} role="presentation">
          {item.label}
        </div>
      );
    }

    const isSelected = isMulti
      ? currentMulti.includes(item.value)
      : currentSingle === item.value;

    const itemCls = [
      styles.item,
      item.disabled && styles.itemDisabled,
    ].filter(Boolean).join(' ');

    return (
      <div
        key={item.value ?? index}
        className={itemCls}
        role="option"
        aria-selected={isSelected}
        aria-disabled={item.disabled || undefined}
        aria-label={listType === 'icon' ? item.label : undefined}
        onClick={() => !item.disabled && handleSelect(item.value)}
      >
        {/* Checkbox — multi-select types only. pointer-events:none so the li owns clicks */}
        {isMulti && (
          <span className={styles.checkboxWrapper}>
            <Checkbox
              size="xs"
              checked={isSelected}
              disabled={item.disabled}
              onChange={() => {}}
              dir={rtl ? 'rtl' : 'ltr'}
            />
          </span>
        )}

        {/* Icon — icon and icon-text-multi types */}
        {(listType === 'icon' || listType === 'icon-text-multi') && item.icon && (
          <span className={styles.iconWrapper}>{item.icon}</span>
        )}

        {/* Label text — all types except icon-only */}
        {listType !== 'icon' && (
          <span className={styles.itemLabel}>{item.label}</span>
        )}

        {/* Tick mark — single-select types only; spacer preserves alignment when unselected */}
        {!isMulti && (
          isSelected
            ? <TickIcon />
            : <span className={styles.tickSpacer} aria-hidden="true" />
        )}
      </div>
    );
  };

  return (
    <div
      className={wrapperCls}
      dir={rtl ? 'rtl' : undefined}
      ref={containerRef}
    >
      {/* Label */}
      {showLabel && (
        <div className={textStyles.labelRow}>
          {required && <span className={requiredCls}>*</span>}
          <span className={labelCls}>{label}</span>
        </div>
      )}

      {/* Field + Dropdown */}
      <div className={styles.fieldWrapper}>
        <div
          className={fieldCls}
          onClick={handleFieldClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFieldClick(); }
            if (e.key === 'Escape') setIsOpen(false);
          }}
          tabIndex={isDisabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          style={{ cursor: isDisabled || isReadOnly ? 'default' : 'pointer' }}
          {...rest}
        >
          <span className={displayCls}>
            {displayText || placeholder}
          </span>
          <ChevronDownIcon color={chevronColor} open={isOpen} />
        </div>

        {isOpen && (
          <div
            className={styles.dropdownList}
            role="listbox"
            aria-multiselectable={isMulti || undefined}
          >
            {items.map(renderItem)}
          </div>
        )}
      </div>

      {/* Helper text */}
      {showHelperText && (
        <div className={textStyles.helperRow}>
          {helperIcon || <HelperCircleIcon color="#384250" />}
          <span className={[
            textStyles.helperText,
            error ? textStyles.helperTextError : textStyles.helperTextNormal,
          ].join(' ')}>
            {helperText}
          </span>
        </div>
      )}
    </div>
  );
}
