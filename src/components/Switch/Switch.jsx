import React from 'react';
import styles from './Switch.module.css';
import { Icon } from '../icons/Icon';

/**
 * Switch — Masterteam Design System
 * Figma: node 4457:791 (Switch) · 4501:160 (Switch Label)
 *
 * Switch props:
 *   checked        boolean  — on/off state
 *   showIcon       boolean  — show tick icon inside thumb when on (only visible when checked)
 *   state          'default'|'hovered'|'pressed'|'focused'|'disabled'
 *   rtl            boolean
 *   onChange       function — called with new boolean value
 *   className      string
 *
 * SwitchLabel props:
 *   label          string   — main label text
 *   checked        boolean
 *   showIcon       boolean
 *   state          'default'|'hovered'|'pressed'|'focused'|'disabled'
 *   trailSwitch    boolean  — when true, switch appears on the right (LTR) / left (RTL)
 *   helperText     string   — optional helper text below the label row
 *   alertMessage   string   — optional error/alert message below helper text
 *   rtl            boolean
 *   onChange       function
 */

const STATE_MAP = {
  default:  'stateDefault',
  hovered:  'stateHovered',
  pressed:  'statePressed',
  focused:  'stateFocused',
  disabled: 'stateDisabled',
};

/* ── Switch ──────────────────────────────────────────────────────────── */
export function Switch({
  checked = false,
  showIcon = false,
  state = 'default',
  rtl = false,
  onChange,
  className,
  ...rest
}) {
  const isDisabled = state === 'disabled';

  const trackCls = [
    styles.track,
    checked ? styles.trackOn : styles.trackOff,
    styles[STATE_MAP[state] ?? 'stateDefault'],
    isDisabled && styles.disabled,
    rtl && styles.rtl,
    className,
  ].filter(Boolean).join(' ');

  const thumbCls = [
    styles.thumb,
    checked ? styles.thumbOn : styles.thumbOff,
    rtl && styles.thumbRtl,
    checked && rtl && styles.thumbRtlOn,
  ].filter(Boolean).join(' ');

  const handleChange = () => {
    if (!isDisabled) onChange?.(!checked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={trackCls}
      onClick={handleChange}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleChange(); }}
      disabled={isDisabled}
      dir={rtl ? 'rtl' : undefined}
      {...rest}
    >
      <span className={thumbCls}>
        {showIcon && checked && (
          <Icon name="tick" size={10} className={styles.thumbIcon} />
        )}
      </span>
    </button>
  );
}

/* ── SwitchLabel ─────────────────────────────────────────────────────── */
export function SwitchLabel({
  label = 'Switch Label',
  checked = false,
  showIcon = false,
  state = 'default',
  trailSwitch = false,
  helperText = null,
  alertMessage = null,
  rtl = false,
  onChange,
  className,
  ...rest
}) {
  const rowCls = [
    styles.labelRow,
    trailSwitch && styles.labelRowTrail,
    rtl && styles.labelRowRtl,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={[styles.switchLabel, rtl && styles.switchLabelRtl, className].filter(Boolean).join(' ')}
      dir={rtl ? 'rtl' : undefined}
      {...rest}
    >
      <div className={rowCls}>
        <Switch
          checked={checked}
          showIcon={showIcon}
          state={state}
          rtl={rtl}
          onChange={onChange}
        />
        <span className={styles.labelText}>{label}</span>
      </div>

      {helperText && (
        <p className={styles.helperText}>{helperText}</p>
      )}

      {alertMessage && (
        <div className={styles.alertRow}>
          <span className={styles.alertIcon} aria-hidden="true">
            <Icon name="alert" size={16} />
          </span>
          <span className={styles.alertText}>{alertMessage}</span>
        </div>
      )}
    </div>
  );
}
