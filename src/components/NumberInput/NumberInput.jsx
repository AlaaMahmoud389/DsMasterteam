import React, { useState, useRef } from 'react';
import styles from './NumberInput.module.css';
import { Icon } from '../icons/Icon';

/**
 * NumberInput — Masterteam Design System
 * Figma: 4629:3942 (Number Input) · 4629:3845 (Input Prefix-Suffix)
 *
 * Exports:
 *   InputPrefixSuffix — standalone +/− stepper button
 *   NumberInput       — full number stepper field
 *
 * InputPrefixSuffix props:
 *   type        'plus' | 'minus'
 *   state       'default'|'hovered'|'pressed'|'focused'|'selected'|'disabled'
 *   btnStyle    'solid' | 'subtle'   (default 'solid')
 *   size        'large' | 'medium'   (default 'large')
 *   onClick     function
 *
 * NumberInput props:
 *   value           number | string
 *   onChange        function(newValue: number)
 *   label           string        (default 'Label')
 *   showLabel       boolean       (default true)
 *   helperText      string        (default 'Help Text')
 *   showHelperText  boolean       (default false)
 *   placeholder     string        (default '00000')
 *   state           'default'|'hovered'|'pressed'|'focused'|'disabled'|'read-only'
 *   error           boolean
 *   size            'large' | 'medium'
 *   inputStyle      'default' | 'filled-lighter' | 'filled-darker'
 *   btnStyle        'solid' | 'subtle'
 *   labelType       'regular' | 'semibold'
 *   required        boolean
 *   rtl             boolean
 *   min             number
 *   max             number
 *   step            number        (default 1)
 */

/* ── InputPrefixSuffix ────────────────────────────────────────────── */
export function InputPrefixSuffix({
  type = 'plus',
  state = 'default',
  btnStyle = 'solid',
  size = 'large',
  onClick,
  className,
  ...rest
}) {
  const isDisabled = state === 'disabled';

  const cls = [
    styles.btn,
    btnStyle === 'subtle' ? styles.btnSubtle : styles.btnSolid,
    size === 'medium' ? styles.btnMedium : styles.btnLarge,
    styles[`btnState${capitalize(state)}`],
    isDisabled && styles.btnDisabled,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={cls}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-label={type === 'plus' ? 'Increment' : 'Decrement'}
      tabIndex={isDisabled ? -1 : 0}
      {...rest}
    >
      <Icon name={type === 'plus' ? 'add' : 'minus'} size={20} />
    </button>
  );
}

/* ── NumberInput ──────────────────────────────────────────────────── */
export function NumberInput({
  value: valueProp,
  onChange,
  label = 'Label',
  showLabel = true,
  helperText = 'Help Text',
  showHelperText = false,
  placeholder = '00000',
  state = 'default',
  error = false,
  size = 'large',
  inputStyle = 'default',
  btnStyle = 'solid',
  labelType = 'regular',
  required = false,
  rtl = false,
  min,
  max,
  step = 1,
  className,
  ...rest
}) {
  const [internalValue, setInternalValue] = useState('');
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  const isDisabled = state === 'disabled';
  const isReadOnly = state === 'read-only';

  const handleChange = (newVal) => {
    const num = Number(newVal);
    if (isNaN(num)) return;
    let clamped = num;
    if (min !== undefined) clamped = Math.max(min, clamped);
    if (max !== undefined) clamped = Math.min(max, clamped);
    if (!isControlled) setInternalValue(String(clamped));
    onChange?.(clamped);
  };

  const increment = () => {
    if (isDisabled || isReadOnly) return;
    handleChange((Number(value) || 0) + step);
  };

  const decrement = () => {
    if (isDisabled || isReadOnly) return;
    handleChange((Number(value) || 0) - step);
  };

  const wrapperCls = [
    styles.wrapper,
    rtl && styles.rtl,
    className,
  ].filter(Boolean).join(' ');

  const fieldCls = [
    styles.inputField,
    styles[`inputStyle${capitalize(inputStyle.replace(/-/g, ''))}`],
    styles[`state${capitalize(state.replace(/-/g, ''))}`],
    error && styles.error,
    size === 'medium' && styles.sizeMedium,
  ].filter(Boolean).join(' ');

  const inputCls = [
    styles.input,
    size === 'medium' && styles.inputMedium,
  ].filter(Boolean).join(' ');

  const helperCls = [
    styles.helperText,
    error && styles.helperTextError,
  ].filter(Boolean).join(' ');

  const labelCls = [
    styles.label,
    labelType === 'semibold' && styles.labelSemibold,
    isDisabled && styles.labelDisabled,
    size === 'large' && styles.labelLarge,
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperCls} dir={rtl ? 'rtl' : undefined} {...rest}>
      {/* Label */}
      {showLabel && (
        <div className={labelCls}>
          {label}
          {required && <span className={styles.required} aria-hidden="true"> *</span>}
        </div>
      )}

      {/* Input field row */}
      <div className={fieldCls}>
        {/* Plus (increment) button — left in LTR, right in RTL */}
        <InputPrefixSuffix
          type="plus"
          btnStyle={btnStyle}
          size={size}
          state={isDisabled ? 'disabled' : 'default'}
          onClick={increment}
        />

        {/* Value input */}
        <input
          type="number"
          className={inputCls}
          value={value}
          placeholder={placeholder}
          readOnly={isReadOnly}
          disabled={isDisabled}
          min={min}
          max={max}
          step={step}
          onChange={(e) => handleChange(e.target.value)}
          aria-label={label}
          aria-invalid={error || undefined}
        />

        {/* Minus (decrement) button — right in LTR, left in RTL */}
        <InputPrefixSuffix
          type="minus"
          btnStyle={btnStyle}
          size={size}
          state={isDisabled ? 'disabled' : 'default'}
          onClick={decrement}
        />
      </div>

      {/* Helper text */}
      {showHelperText && (
        <div className={helperCls}>
          {error && (
            <span className={styles.helperIcon} aria-hidden="true">
              <Icon name="alert" size={14} />
            </span>
          )}
          <span>{helperText}</span>
        </div>
      )}
    </div>
  );
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
