import React, { useState, useRef, useCallback } from 'react';
import textStyles from '../TextInput/TextInput.module.css';
import styles from './Textarea.module.css';

/* ── Icons ──────────────────────────────────────────────────────────── */

function HelperCircleIcon({ color = '#384250' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="7.25" stroke={color} strokeWidth="1.5" />
      <path d="M6.5 6.25A1.5 1.5 0 0 1 8 4.75a1.5 1.5 0 0 1 1.5 1.5c0 1-1.5 1.5-1.5 2.5"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="11.25" r="0.875" fill={color} />
    </svg>
  );
}

function ResizeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 10.5L10.5 2M5.5 10.5L10.5 5.5M9 10.5L10.5 9"
        stroke="#1849A9" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════
   Textarea
   ════════════════════════════════════════════════════════════════════ */
export function Textarea({
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
  placeholder    = 'Placeholder',
  value,
  defaultValue,
  onChange,

  /* Helper text */
  showHelperText = false,
  helperText     = 'Helper text',
  helperIcon,

  /* Direction */
  rtl            = false,

  className,
  ...rest
}) {
  const isDisabled = state === 'disabled';
  const isReadOnly = state === 'read-only';
  const isLarge    = size === 'large';

  /* ── Resize drag state ── */
  const [textareaHeight, setTextareaHeight] = useState(96);
  const dragRef = useRef(null);

  const onResizeStart = useCallback((e) => {
    if (e.button !== 0 || isDisabled || isReadOnly) return;
    e.preventDefault();
    dragRef.current = { startY: e.clientY, startH: textareaHeight };

    const onMove = (e) => {
      const { startY, startH } = dragRef.current;
      setTextareaHeight(Math.max(96, startH + e.clientY - startY));
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [textareaHeight, isDisabled, isReadOnly]);

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
    styles.textareaField,
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

  const textareaCls = [
    styles.textarea,
    isLarge ? styles.textareaLarge : styles.textareaMedium,
  ].filter(Boolean).join(' ');

  const valueProps = value !== undefined
    ? { value, onChange: onChange || (() => {}) }
    : defaultValue !== undefined
      ? { defaultValue }
      : {};

  const showResizeHandle = !isDisabled && !isReadOnly;

  return (
    <div className={wrapperCls} dir={rtl ? 'rtl' : undefined}>

      {/* Label */}
      {showLabel && (
        <div className={textStyles.labelRow}>
          {required && <span className={requiredCls}>*</span>}
          <span className={labelCls}>{label}</span>
        </div>
      )}

      {/* Textarea field */}
      <div className={fieldCls}>
        <textarea
          className={textareaCls}
          placeholder={placeholder}
          disabled={isDisabled}
          readOnly={isReadOnly}
          dir={rtl ? 'rtl' : 'ltr'}
          style={{ height: textareaHeight }}
          {...valueProps}
          {...rest}
        />
        {showResizeHandle && (
          <>
            <span className={styles.scrollbarDivider} aria-hidden="true" />
            <span
              className={styles.resizeHandle}
              onMouseDown={onResizeStart}
              aria-hidden="true"
            >
              <ResizeIcon />
            </span>
          </>
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
