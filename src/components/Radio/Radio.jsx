import PropTypes from 'prop-types';
import styles from './Radio.module.css';

/* ── Alert icon — exact path from Figma node 2078:19161 ─────── */
const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 14.8333 14.8333" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.41667 4.75V7.41667M7.41667 10.0833H7.42333M14.0833 7.41667C14.0833 11.0986 11.0986 14.0833 7.41667 14.0833C3.73477 14.0833 0.75 11.0986 0.75 7.41667C0.75 3.73477 3.73477 0.75 7.41667 0.75C11.0986 0.75 14.0833 3.73477 14.0833 7.41667Z"
      stroke="#a30000"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Radio — Masterteam Design System
 * Figma: node 4399:23544 (Radio), 4399:23649 (Radio Label)
 *
 * A single radio input with optional label, helper text, and error message.
 * Use inside a <RadioGroup> for grouped single-select behaviour.
 *
 * Styles  : primary (blue) · neutral (dark navy)
 * States  : default · hover (CSS) · focus (CSS) · pressed (CSS) · readOnly · disabled
 * RTL     : dir="rtl" via rtl prop
 */
export function Radio({
  id,
  name,
  value,
  label,
  helperText,
  errorText,
  checked,
  defaultChecked,
  onChange,
  radioStyle = 'primary',
  disabled = false,
  readOnly = false,
  rtl = false,
}) {
  const wrapClass = [
    styles.wrapper,
    styles[radioStyle],
    rtl        ? styles.rtl      : '',
    disabled   ? styles.disabled : '',
    readOnly   ? styles.readOnly : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapClass} dir={rtl ? 'rtl' : undefined}>
      <label className={styles.labelRow}>
        <span className={styles.controlWrap}>
          <input
            id={id}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            disabled={disabled || readOnly}
            aria-disabled={disabled || undefined}
            aria-readonly={readOnly || undefined}
            className={styles.input}
          />
          {/* Custom visual ring + dot */}
          <span className={styles.ring} aria-hidden="true">
            <span className={styles.dot} />
          </span>
        </span>
        {label && <span className={styles.labelText}>{label}</span>}
      </label>

      {helperText && !errorText && (
        <p className={styles.helperText}>{helperText}</p>
      )}

      {errorText && (
        <div className={styles.errorRow} role="alert">
          <AlertIcon />
          <span className={styles.errorText}>{errorText}</span>
        </div>
      )}
    </div>
  );
}

Radio.propTypes = {
  id:             PropTypes.string,
  name:           PropTypes.string,
  value:          PropTypes.string,
  label:          PropTypes.string,
  helperText:     PropTypes.string,
  errorText:      PropTypes.string,
  checked:        PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange:       PropTypes.func,
  /** 'primary' (blue) or 'neutral' (dark navy) */
  radioStyle:     PropTypes.oneOf(['primary', 'neutral']),
  disabled:       PropTypes.bool,
  readOnly:       PropTypes.bool,
  rtl:            PropTypes.bool,
};

/* ──────────────────────────────────────────────────────────────
   RadioGroup — wraps multiple Radio items into a labelled group
   ────────────────────────────────────────────────────────────── */
export function RadioGroup({
  legend,
  name,
  value,
  onChange,
  options = [],
  radioStyle = 'primary',
  orientation = 'vertical',
  disabled = false,
  readOnly = false,
  rtl = false,
  errorText,
}) {
  const groupClass = [
    styles.group,
    orientation === 'horizontal' ? styles.groupHorizontal : styles.groupVertical,
    rtl ? styles.rtl : '',
  ].filter(Boolean).join(' ');

  return (
    <fieldset className={styles.fieldset} dir={rtl ? 'rtl' : undefined}>
      {legend && <legend className={styles.legend}>{legend}</legend>}
      <div className={groupClass}>
        {options.map((opt) => (
          <Radio
            key={opt.value}
            id={`${name}-${opt.value}`}
            name={name}
            value={opt.value}
            label={opt.label}
            helperText={opt.helperText}
            checked={value === opt.value}
            onChange={onChange}
            radioStyle={radioStyle}
            disabled={disabled || opt.disabled}
            readOnly={readOnly || opt.readOnly}
            rtl={rtl}
          />
        ))}
      </div>
      {errorText && (
        <div className={styles.errorRow} role="alert" style={{ marginTop: 8 }}>
          <AlertIcon />
          <span className={styles.errorText}>{errorText}</span>
        </div>
      )}
    </fieldset>
  );
}

RadioGroup.propTypes = {
  legend:      PropTypes.string,
  name:        PropTypes.string.isRequired,
  value:       PropTypes.string,
  onChange:    PropTypes.func,
  options:     PropTypes.arrayOf(PropTypes.shape({
    value:     PropTypes.string.isRequired,
    label:     PropTypes.string,
    helperText: PropTypes.string,
    disabled:  PropTypes.bool,
    readOnly:  PropTypes.bool,
  })),
  radioStyle:  PropTypes.oneOf(['primary', 'neutral']),
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  disabled:    PropTypes.bool,
  readOnly:    PropTypes.bool,
  rtl:         PropTypes.bool,
  errorText:   PropTypes.string,
};
