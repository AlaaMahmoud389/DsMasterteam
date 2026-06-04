import React, { useState, useEffect } from 'react';
import styles from './Switch.module.css';

/**
 * Switch — Masterteam Design System
 * Figma: node 4457:791 (Switch) · 4501:160 (Switch Label)
 *
 * Switch props:
 *   checked        boolean  — on/off state
 *   showIcon       boolean  — show tick icon inside thumb when on
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

/* ── Inline icons (replaces external Icon dependency) ────────── */
function TickIcon({ size = 10, className }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 10 10"
      fill="none" aria-hidden="true" className={className}
    >
      <path
        d="M1.5 5l2.5 2.5 4.5-5"
        stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertIcon({ size = 16 }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 16 16"
      fill="none" aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.75" fill="currentColor" />
    </svg>
  );
}

/* ── State map ───────────────────────────────────────────────── */
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

  /* squishing: true for ~150 ms after every toggle, adds .thumbSquish
     which widens the thumb to 22 px via CSS transition (squish effect).
     CSS transitions on left/right handle the slide. No @keyframes needed. */
  const [squishing, setSquishing] = useState(false);

  useEffect(() => {
    if (!squishing) return;
    const t = setTimeout(() => setSquishing(false), 150);
    return () => clearTimeout(t);
  }, [squishing]);

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
    squishing && styles.thumbSquish,
  ].filter(Boolean).join(' ');

  const handleChange = () => {
    if (!isDisabled) {
      setSquishing(true);
      onChange?.(!checked);
    }
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
          <TickIcon size={10} className={styles.thumbIcon} />
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
            <AlertIcon size={16} />
          </span>
          <span className={styles.alertText}>{alertMessage}</span>
        </div>
      )}
    </div>
  );
}
