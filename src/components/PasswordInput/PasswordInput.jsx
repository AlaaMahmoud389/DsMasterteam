import React, { useState } from 'react';
import textStyles from '../TextInput/TextInput.module.css';
import styles from './PasswordInput.module.css';

/* ── Eye icons (20×20) ──────────────────────────────────────────────── */

function EyeIcon({ color = 'currentColor' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path
        d="M1.5 10C1.5 10 4.5 4.25 10 4.25S18.5 10 18.5 10 15.5 15.75 10 15.75 1.5 10 1.5 10z"
        stroke={color} strokeWidth="1.5" strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.25" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function EyeOffIcon({ color = 'currentColor' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M3 3l14 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M7.7 5.5A9 9 0 0 1 10 5.25C15.5 5.25 18.5 10 18.5 10s-.9 1.8-2.6 3.3M5.5 7.2C3.5 8.8 1.5 10 1.5 10s3 4.75 8.5 4.75c1.4 0 2.7-.3 3.8-.9"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <path d="M8.2 10a2 2 0 0 0 1.8 1.8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Helper circle icon ─────────────────────────────────────────────── */

function HelperCircleIcon({ color = '#384250' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="7.25" stroke={color} strokeWidth="1.5" />
      <path
        d="M6.5 6.25A1.5 1.5 0 0 1 8 4.75a1.5 1.5 0 0 1 1.5 1.5c0 1-1.5 1.5-1.5 2.5"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="8" cy="11.25" r="0.875" fill={color} />
    </svg>
  );
}

/* ── Leading icon (default placeholder) ────────────────────────────── */

function LeadingIcon({ color = '#6C7C96' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M3.5 6h13M3.5 10h13M3.5 14h8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Affix sub-components ────────────────────────────────────────────── */

function AffixChevronIcon({ color = '#000B36' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M4 6l4 4 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AffixLeadingIcon({ color = '#000B36' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M4 7h16M4 12h16M4 17h10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Affix({ type, affixStyle, state, text, icon, size, isPrefix, onClick }) {
  const isDisabled = state === 'disabled';
  const isSelected = state === 'selected';
  const isLarge    = size === 'large';
  const iconColor  = isDisabled ? '#6C7C96' : isSelected ? '#F9FAFB' : '#000B36';

  const stateCls = affixStyle === 'subtle'
    ? (state === 'hovered'  ? textStyles.affixSubtleHovered  :
       state === 'pressed'  ? textStyles.affixSubtlePressed  :
       state === 'selected' ? textStyles.affixSubtleSelected :
       state === 'focused'  ? textStyles.affixSubtleFocused  :
       state === 'disabled' ? textStyles.affixSubtleDisabled :
       textStyles.affixSubtleDefault)
    : (state === 'hovered'  ? textStyles.affixSolidHovered   :
       state === 'pressed'  ? textStyles.affixSolidPressed   :
       state === 'selected' ? textStyles.affixSolidSelected  :
       state === 'focused'  ? textStyles.affixSolidFocused   :
       state === 'disabled' ? textStyles.affixSolidDisabled  :
       textStyles.affixSolidDefault);

  const cls = [
    textStyles.affix,
    isLarge ? textStyles.affixLarge : textStyles.affixMedium,
    isPrefix ? textStyles.affixPrefix : textStyles.affixSuffix,
    stateCls,
    type === 'text' && textStyles.affixTextOnly,
  ].filter(Boolean).join(' ');

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
   PasswordInput
   ════════════════════════════════════════════════════════════════════ */
export function PasswordInput({
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
  placeholder    = 'Password',
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
  prefixType     = 'dropdown',
  prefixStyle    = 'solid',
  prefixState    = 'default',
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
  const [showPassword, setShowPassword] = useState(false);

  const isDisabled = state === 'disabled';
  const isReadOnly = state === 'read-only';
  const isLarge    = size === 'large';

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
    showPrefix && textStyles.fieldHasPrefix,
    showSuffix && textStyles.fieldHasSuffix,
  ].filter(Boolean).join(' ');

  const inputCls = [
    textStyles.input,
    isLarge ? textStyles.inputLarge : textStyles.inputMedium,
  ].filter(Boolean).join(' ');

  const eyeBtnCls = [
    styles.eyeButton,
    isDisabled && styles.eyeButtonDisabled,
  ].filter(Boolean).join(' ');

  const valueProps = value !== undefined
    ? { value, onChange: onChange || (() => {}) }
    : defaultValue !== undefined
      ? { defaultValue }
      : {};

  return (
    <div className={wrapperCls} dir={rtl ? 'rtl' : undefined}>

      {/* Label */}
      {showLabel && (
        <div className={textStyles.labelRow}>
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
          type={showPassword ? 'text' : 'password'}
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
        {/* Eye toggle — always present */}
        <button
          type="button"
          className={eyeBtnCls}
          onClick={() => !isDisabled && setShowPassword((v) => !v)}
          tabIndex={isDisabled ? -1 : 0}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          disabled={isDisabled}
        >
          {showPassword
            ? <EyeIcon   color="currentColor" />
            : <EyeOffIcon color="currentColor" />
          }
        </button>
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
