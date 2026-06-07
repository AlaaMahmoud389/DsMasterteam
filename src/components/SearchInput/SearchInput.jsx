import React, { useState } from 'react';
import textStyles from '../TextInput/TextInput.module.css';
import styles from './SearchInput.module.css';

/**
 * SearchInput — Masterteam Design System
 *
 * A search field built on the same visual foundation as TextInput.
 * Always shows a leading search icon and a trailing mic icon.
 * When the field is focused and has a value, a clear (×) button
 * appears to the left of the mic, separated by a vertical divider.
 *
 * Props:
 *   label          string
 *   showLabel      boolean
 *   labelType      'regular' | 'semibold'
 *   required       boolean
 *   size           'medium' | 'large'
 *   state          'default' | 'hovered' | 'pressed' | 'focused' | 'read-only' | 'disabled'
 *   variant        'default' | 'filled-darker' | 'filled-lighter'
 *   placeholder    string
 *   value          string  — controlled value
 *   onChange       (e: React.ChangeEvent) => void
 *   onClear        () => void  — called when × is clicked (falls back to onChange(''))
 *   showHelperText boolean
 *   helperText     string
 *   helperIcon     ReactNode
 *   rtl            boolean
 *   className      string
 */

/* ── Icons ──────────────────────────────────────────────────────────── */

function HelperCircleIcon({ color = '#384250' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="7.25" stroke={color} strokeWidth="1.5" />
      <path d="M6.5 6.25A1.5 1.5 0 0 1 8 4.75a1.5 1.5 0 0 1 1.5 1.5c0 1-1.5 1.5-1.5 2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="11.25" r="0.875" fill={color} />
    </svg>
  );
}

function SearchIcon({ color = '#6C7C96' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="9" r="5.5" stroke={color} strokeWidth="1.5" />
      <path d="M13.5 13.5L17 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MicIcon({ color = '#000B36' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="7" y="2" width="6" height="9" rx="3" stroke={color} strokeWidth="1.5" />
      <path d="M4 10a6 6 0 0 0 12 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 16v2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ClearIcon({ color = '#6C7C96' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M4 4l8 8M12 4l-8 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SearchInput
   ════════════════════════════════════════════════════════════════════ */
export function SearchInput({
  label          = 'Label',
  showLabel      = true,
  labelType      = 'regular',
  required       = false,

  size           = 'medium',
  state          = 'default',
  variant        = 'default',

  placeholder    = 'Search...',
  value          = '',
  onChange,
  onClear,

  showHelperText = false,
  helperText     = 'Helper text',
  helperIcon,

  showMic        = true,

  rtl            = false,
  className,
  ...rest
}) {
  const isDisabled = state === 'disabled';
  const isReadOnly = state === 'read-only';
  const isLarge    = size === 'large';

  /* Real focus tracked for clear-button visibility */
  const [localFocused, setLocalFocused] = useState(false);

  /* Show clear button when focused (real or forced via state prop) and field has a value */
  const showClear = (localFocused || state === 'focused') && !!value && !isDisabled && !isReadOnly;

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
    isDisabled   ? textStyles.fieldDisabled :
    isReadOnly   ? textStyles.fieldReadOnly :
    state === 'hovered' ? textStyles.fieldHovered :
    state === 'pressed' ? textStyles.fieldPressed :
    state === 'focused' ? textStyles.fieldFocused :
    textStyles.fieldDefault,
  ].filter(Boolean).join(' ');

  const inputCls = [
    textStyles.input,
    isLarge ? textStyles.inputLarge : textStyles.inputMedium,
  ].filter(Boolean).join(' ');

  /* ── Handlers ── */
  const handleClear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClear) {
      onClear();
    } else {
      onChange?.({ target: { value: '' } });
    }
  };

  const iconColor    = isDisabled ? '#6C7C96' : '#6C7C96';
  const micColor     = isDisabled ? '#6C7C96' : '#000B36';

  return (
    <div
      className={wrapperCls}
      dir={rtl ? 'rtl' : undefined}
    >
      {/* Label */}
      {showLabel && (
        <div className={textStyles.labelRow}>
          {required && <span className={requiredCls}>*</span>}
          <span className={labelCls}>{label}</span>
        </div>
      )}

      {/* Field */}
      <div className={fieldCls}>
        {/* Leading search icon */}
        <span className={styles.searchIcon} aria-hidden="true">
          <SearchIcon color={iconColor} />
        </span>

        {/* Text input */}
        <input
          type="text"
          className={inputCls}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          readOnly={isReadOnly}
          onFocus={() => setLocalFocused(true)}
          onBlur={() => setLocalFocused(false)}
          aria-label={!showLabel ? (placeholder || 'Search') : undefined}
          {...rest}
        />

        {/* Trailing group: [clear ×] [divider] [mic] */}
        {(showClear || showMic) && (
          <div className={styles.trailingGroup}>
            {showClear && (
              <>
                <button
                  type="button"
                  className={styles.clearButton}
                  onClick={handleClear}
                  aria-label="Clear search"
                  tabIndex={-1}
                >
                  <ClearIcon color="#000B36" />
                </button>
                {showMic && <span className={styles.divider} aria-hidden="true" />}
              </>
            )}
            {showMic && (
              <button
                type="button"
                className={styles.micButton}
                aria-label="Voice search"
                disabled={isDisabled}
                tabIndex={isDisabled ? -1 : 0}
              >
                <MicIcon color={micColor} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Helper text */}
      {showHelperText && (
        <div className={textStyles.helperRow}>
          {helperIcon || <HelperCircleIcon color="#384250" />}
          <span className={[textStyles.helperText, textStyles.helperTextNormal].join(' ')}>
            {helperText}
          </span>
        </div>
      )}
    </div>
  );
}
