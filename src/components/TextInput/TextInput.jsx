import React from 'react';
import styles from './TextInput.module.css';

/**
 * TextInput — Masterteam Design System
 *
 * Exports:
 *   TextInput — full text input with optional label, leading icon, helper text,
 *               and prefix / suffix elements.
 */

/* ── Leading icon (default placeholder) ────────────────────────────── */
function LeadingIcon({ color = '#6C7C96' }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 20 20"
      fill="none" aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M3.5 6h13M3.5 10h13M3.5 14h8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Helper circle icon ─────────────────────────────────────────────── */
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

/* ── Dropdown chevron icon for affix ────────────────────────────────── */
function AffixChevronIcon({ color = '#000B36' }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16"
      fill="none" aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M4 6l4 4 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Leading icon for Dropdown+Icon affix ───────────────────────────── */
function AffixLeadingIcon({ color = '#000B36' }) {
  return (
    <svg
      width="24" height="24" viewBox="0 0 24 24"
      fill="none" aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M4 7h16M4 12h16M4 17h10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Affix (Prefix / Suffix) ─────────────────────────────────────────── */
function Affix({ type, affixStyle, state, text, icon, size, isPrefix, onClick }) {
  const isDisabled = state === 'disabled';
  const isSelected = state === 'selected';
  const isLarge    = size === 'large';
  const iconColor  = isDisabled ? '#6C7C96' : isSelected ? '#F9FAFB' : '#000B36';

  const stateCls = affixStyle === 'subtle'
    ? (state === 'hovered'  ? styles.affixSubtleHovered  :
       state === 'pressed'  ? styles.affixSubtlePressed  :
       state === 'selected' ? styles.affixSubtleSelected :
       state === 'focused'  ? styles.affixSubtleFocused  :
       state === 'disabled' ? styles.affixSubtleDisabled :
       styles.affixSubtleDefault)
    : (state === 'hovered'  ? styles.affixSolidHovered   :
       state === 'pressed'  ? styles.affixSolidPressed   :
       state === 'selected' ? styles.affixSolidSelected  :
       state === 'focused'  ? styles.affixSolidFocused   :
       state === 'disabled' ? styles.affixSolidDisabled  :
       styles.affixSolidDefault);

  const cls = [
    styles.affix,
    isLarge ? styles.affixLarge : styles.affixMedium,
    isPrefix ? styles.affixPrefix : styles.affixSuffix,
    stateCls,
  ].join(' ');

  return (
    <button
      type="button"
      className={cls}
      disabled={isDisabled}
      onClick={!isDisabled ? onClick : undefined}
      tabIndex={isDisabled ? -1 : 0}
    >
      {type === 'dropdown-icon' && (icon || <AffixLeadingIcon color={iconColor} />)}
      <span>{text}</span>
      {(type === 'dropdown' || type === 'dropdown-icon') && <AffixChevronIcon color={iconColor} />}
    </button>
  );
}

/* ════════════════════════════════════════════════════════════════════
   TextInput
   ════════════════════════════════════════════════════════════════════ */
export function TextInput({
  /* Label */
  label          = 'Label',
  showLabel      = true,
  labelType      = 'regular',   // 'regular' | 'semibold'
  required       = false,

  /* Field */
  size           = 'medium',    // 'medium' | 'large'
  state          = 'default',   // 'default' | 'hovered' | 'pressed' | 'focused' | 'read-only' | 'disabled'
  error          = false,
  variant        = 'default',   // 'default' | 'filled-darker' | 'filled-lighter'

  /* Content */
  placeholder    = 'Placeholder',
  value,
  defaultValue,
  onChange,

  /* Leading icon */
  showIcon       = false,
  icon,

  /* Helper text */
  showHelperText = false,
  helperText     = 'Helper text',
  helperIcon,

  /* Prefix */
  showPrefix     = false,
  prefixType     = 'dropdown',  // 'dropdown' | 'dropdown-icon' | 'text'
  prefixStyle    = 'solid',     // 'solid' | 'subtle'
  prefixState    = 'default',   // 'default' | 'hovered' | 'pressed' | 'selected' | 'focused' | 'disabled'
  prefixText     = 'Prefix',
  prefixIcon,
  onPrefixClick,

  /* Suffix */
  showSuffix     = false,
  suffixType     = 'dropdown',
  suffixStyle    = 'solid',
  suffixState    = 'default',
  suffixText     = 'Suffix',
  suffixIcon,
  onSuffixClick,

  /* Direction */
  rtl            = false,

  className,
  ...rest
}) {
  const isDisabled = state === 'disabled';
  const isReadOnly = state === 'read-only';
  const isLarge    = size === 'large';

  /* ── Class assembly ── */
  const wrapperCls = [
    styles.wrapper,
    rtl && styles.rtl,
    className,
  ].filter(Boolean).join(' ');

  const labelCls = [
    styles.label,
    isLarge ? styles.labelLarge : styles.labelMedium,
    labelType === 'semibold' && styles.labelSemibold,
    isDisabled && styles.labelDisabled,
  ].filter(Boolean).join(' ');

  const requiredCls = [
    styles.required,
    isLarge ? styles.requiredLarge : styles.requiredMedium,
  ].filter(Boolean).join(' ');

  const variantCls = variant === 'filled-darker'  ? styles.variantFilledDarker
                   : variant === 'filled-lighter' ? styles.variantFilledLighter
                   : null;

  const fieldCls = [
    styles.field,
    isLarge ? styles.fieldLarge : styles.fieldMedium,
    variantCls,
    error        ? styles.fieldError    :
    isDisabled   ? styles.fieldDisabled :
    isReadOnly   ? styles.fieldReadOnly :
    state === 'hovered' ? styles.fieldHovered :
    state === 'pressed' ? styles.fieldPressed :
    state === 'focused' ? styles.fieldFocused :
    styles.fieldDefault,
    error && state === 'pressed' && styles.fieldPressed,
    error && state === 'focused' && styles.fieldFocused,
    showPrefix && styles.fieldHasPrefix,
    showSuffix && styles.fieldHasSuffix,
  ].filter(Boolean).join(' ');

  const inputCls = [
    styles.input,
    isLarge ? styles.inputLarge : styles.inputMedium,
  ].filter(Boolean).join(' ');

  /* Controlled vs uncontrolled */
  const valueProps = value !== undefined
    ? { value, onChange: onChange || (() => {}) }
    : defaultValue !== undefined
      ? { defaultValue }
      : {};

  return (
    <div className={wrapperCls} dir={rtl ? 'rtl' : undefined}>

      {/* Label */}
      {showLabel && (
        <div className={styles.labelRow}>
          {required && <span className={requiredCls}>*</span>}
          <span className={labelCls}>{label}</span>
        </div>
      )}

      {/* Input field */}
      <div className={fieldCls}>
        {showPrefix && (
          <Affix
            type={prefixType}
            affixStyle={prefixStyle}
            state={prefixState}
            text={prefixText}
            icon={prefixIcon}
            size={size}
            isPrefix={true}
            onClick={onPrefixClick}
          />
        )}
        {showIcon && (icon || <LeadingIcon color={isDisabled ? '#6C7C96' : '#000B36'} />)}
        <input
          type="text"
          className={inputCls}
          placeholder={placeholder}
          disabled={isDisabled}
          readOnly={isReadOnly}
          {...valueProps}
          {...rest}
        />
        {showSuffix && (
          <Affix
            type={suffixType}
            affixStyle={suffixStyle}
            state={suffixState}
            text={suffixText}
            icon={suffixIcon}
            size={size}
            isPrefix={false}
            onClick={onSuffixClick}
          />
        )}
      </div>

      {/* Helper text */}
      {showHelperText && (
        <div className={styles.helperRow}>
          {helperIcon || <HelperCircleIcon color="#384250" />}
          <span className={[
            styles.helperText,
            error ? styles.helperTextError : styles.helperTextNormal,
          ].join(' ')}>
            {helperText}
          </span>
        </div>
      )}

    </div>
  );
}
