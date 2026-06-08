import { useId, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Checkbox.module.css';

/**
 * Checkbox — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4112-15
 *
 * Variants : primary (blue) | neutral (dark navy)
 * Sizes    : xs (16px) | sm (20px) | md (24px)
 * States   : default · hover · pressed · focused · read-only · disabled
 * Features : label · description · error message · indeterminate · RTL
 */

/* ── Icons ───────────────────────────────────────────────── */

function CheckIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2 6.5L4.5 9L10 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IndeterminateIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2 6H10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 4.5v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7" cy="10" r="0.75" fill="currentColor" />
    </svg>
  );
}

/* ── Checkbox ────────────────────────────────────────────── */

export function Checkbox({
  checked = false,
  indeterminate = false,
  variant = 'primary',
  size = 'md',
  label,
  description,
  error,
  disabled = false,
  readOnly = false,
  dir = 'ltr',
  onChange,
  id: idProp,
  name,
  value,
  className,
  ...rest
}) {
  const autoId  = useId();
  const id      = idProp ?? autoId;
  const inputRef = useRef(null);

  const descId  = description ? `${id}-desc`  : undefined;
  const errorId = error       ? `${id}-error` : undefined;

  /* Sync the non-attribute indeterminate property */
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const isFilled = checked || indeterminate;
  const iconSize = size === 'md' ? 12 : size === 'sm' ? 10 : 8;

  /* ── Class computation ── */
  const boxClass = [
    styles.box,
    styles[`size_${size}`],
    disabled && !isFilled             ? styles.disabled_unchecked :
    disabled &&  isFilled             ? styles.disabled_checked   :
    readOnly && !isFilled             ? styles.readOnly_unchecked :
    readOnly &&  isFilled             ? styles[`readOnly_${variant}`] :
    isFilled                          ? styles[`variant_${variant}`] :
                                        styles.unchecked,
  ].filter(Boolean).join(' ');

  const rowClass = [
    styles.row,
    disabled ? styles.rowDisabled : '',
    readOnly ? styles.rowReadOnly : '',
  ].filter(Boolean).join(' ');

  /* ── Change handler — no-op for disabled / readOnly ── */
  const handleChange = useCallback(
    (e) => { if (!disabled && !readOnly) onChange?.(e); },
    [disabled, readOnly, onChange],
  );

  /* ── Size value for CSS custom property (description indent) ── */
  const sizeVal = size === 'md' ? '24px' : size === 'sm' ? '20px' : '16px';

  return (
    <div
      className={[styles.wrapper, className].filter(Boolean).join(' ')}
      dir={dir}
      style={{ '--_cb-size': sizeVal }}
    >
      {/* Label row: hidden input + visual box + label text */}
      <label className={rowClass} htmlFor={id}>
        <input
          ref={inputRef}
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          aria-checked={indeterminate ? 'mixed' : checked}
          aria-readonly={readOnly || undefined}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={[descId, errorId].filter(Boolean).join(' ') || undefined}
          className={styles.input}
          {...rest}
        />
        <span className={boxClass} aria-hidden="true">
          {isFilled && (
            indeterminate
              ? <IndeterminateIcon size={iconSize} />
              : <CheckIcon size={iconSize} />
          )}
        </span>
        {label && (
          <span className={[
            styles.labelText,
            disabled ? styles.labelDisabled : '',
          ].filter(Boolean).join(' ')}>
            {label}
          </span>
        )}
      </label>

      {/* Description */}
      {description && (
        <div id={descId} className={styles.description}>
          {description}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div id={errorId} className={styles.errorMsg} role="alert">
          <ErrorIcon />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

Checkbox.propTypes = {
  /** Whether the checkbox is checked */
  checked: PropTypes.bool,
  /** Indeterminate state — overrides checked visually, sets aria-checked="mixed" */
  indeterminate: PropTypes.bool,
  /** Visual style of the filled checkbox */
  variant: PropTypes.oneOf(['primary', 'neutral']),
  /** Checkbox size — xs=16px · sm=20px · md=24px */
  size: PropTypes.oneOf(['xs', 'sm', 'md']),
  /** Label text displayed beside the checkbox */
  label: PropTypes.string,
  /** Helper description rendered below the label */
  description: PropTypes.string,
  /** Error message rendered below the description; sets aria-invalid */
  error: PropTypes.string,
  /** Disables all interaction and applies disabled tokens */
  disabled: PropTypes.bool,
  /** Prevents value changes while preserving the checked display */
  readOnly: PropTypes.bool,
  /** Text direction — rtl mirrors layout for Arabic */
  dir: PropTypes.oneOf(['ltr', 'rtl']),
  /** Change handler — receives the native input event */
  onChange: PropTypes.func,
  /** HTML id — auto-generated if omitted */
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
};

/* ── CheckboxGroup ───────────────────────────────────────── */

/**
 * Semantic wrapper for a group of related checkboxes.
 * Renders as <fieldset> with an optional <legend>.
 */
export function CheckboxGroup({
  legend,
  children,
  dir = 'ltr',
  gap = 'md',
  className,
}) {
  const gapMap = { sm: '8px', md: '16px', lg: '24px' };
  return (
    <fieldset
      className={[styles.group, className].filter(Boolean).join(' ')}
      dir={dir}
      style={{ gap: gapMap[gap] ?? gapMap.md }}
    >
      {legend && <legend className={styles.groupLegend}>{legend}</legend>}
      {children}
    </fieldset>
  );
}

CheckboxGroup.propTypes = {
  /** Optional group label rendered as <legend> */
  legend: PropTypes.string,
  children: PropTypes.node,
  /** Text direction */
  dir: PropTypes.oneOf(['ltr', 'rtl']),
  /** Vertical gap between items */
  gap: PropTypes.oneOf(['sm', 'md', 'lg']),
};
