/**
 * ColorInput — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4747-83318
 * Component set: node-id=4798-23371 · 216 variants · 6 properties
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './ColorInput.module.css';

/* ── Colour helpers ─────────────────────────────────────────── */

/** Convert hex string → {h,s,v} */
function hexToHsv(hex) {
  const clean = hex.replace(/^#/, '').replace(/^([0-9a-f])([0-9a-f])([0-9a-f])$/i, '$1$1$2$2$3$3');
  if (!/^[0-9a-f]{6}$/i.test(clean)) return { h: 0, s: 0, v: 100 };
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return {
    h: Math.round(h * 360),
    s: max === 0 ? 0 : Math.round((d / max) * 100),
    v: Math.round(max * 100),
  };
}

/** Convert {h,s,v} → hex string */
function hsvToHex({ h, s, v }) {
  const sv = s / 100, vv = v / 100;
  const c = vv * sv, x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = vv - c;
  let r = 0, g = 0, b = 0;
  if (h < 60)       { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else              { r = c; b = x; }
  const toHex = (n) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function isValidHex(v) {
  return /^#?[0-9a-f]{3}([0-9a-f]{3})?$/i.test(v.trim());
}

function normaliseHex(v) {
  const clean = v.replace(/^#/, '');
  if (clean.length === 3) return '#' + clean.split('').map((c) => c + c).join('');
  if (clean.length === 6) return '#' + clean;
  return null;
}

/* ── Color Picker panel ─────────────────────────────────────── */
function ColorPickerPanel({ hsv, onChange, dir }) {
  const spaceRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  // Pointer position in the color space (0–100 for both axes)
  const pointerLeft = hsv.s;       // x = saturation
  const pointerTop  = 100 - hsv.v; // y = 100 - value (top-left = white)

  function handleSpacePointer(e) {
    if (!spaceRef.current) return;
    const rect = spaceRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top)  / rect.height));
    const newHsv = { h: hsv.h, s: Math.round(x * 100), v: Math.round((1 - y) * 100) };
    onChange(newHsv);
  }

  function onSpaceMouseDown(e) {
    setDragging(true);
    handleSpacePointer(e);
  }

  useEffect(() => {
    if (!dragging) return;
    const up = () => setDragging(false);
    const move = (e) => handleSpacePointer(e);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  });

  return (
    <div className={styles.pickerPanel} dir={dir}>
      {/* Colour space gradient */}
      <div
        ref={spaceRef}
        className={styles.colorSpace}
        style={{ background: `linear-gradient(to right, #fff, hsl(${hsv.h}, 100%, 50%))` }}
        onMouseDown={onSpaceMouseDown}
        role="presentation"
      >
        {/* Dark overlay (top transparent → bottom black) */}
        <div className={styles.colorSpaceDark} />
        {/* Pointer */}
        <div
          className={styles.colorPointer}
          style={{ left: `${pointerLeft}%`, top: `${pointerTop}%` }}
        />
      </div>

      {/* Hue slider */}
      <div className={styles.hueRow}>
        <div
          className={styles.currentSwatch}
          style={{ background: hsvToHex(hsv) }}
          aria-hidden="true"
        />
        <input
          type="range"
          min="0"
          max="360"
          value={hsv.h}
          onChange={(e) => onChange({ ...hsv, h: Number(e.target.value) })}
          className={styles.hueSlider}
          aria-label="Hue"
        />
      </div>

      {/* Hex input */}
      <div className={styles.hexRow}>
        <span className={styles.hexHash}>#</span>
        <input
          type="text"
          maxLength={6}
          value={hsvToHex(hsv).slice(1).toUpperCase()}
          onChange={(e) => {
            const raw = '#' + e.target.value;
            if (isValidHex(raw)) {
              const norm = normaliseHex(raw);
              if (norm) onChange(hexToHsv(norm));
            }
          }}
          className={styles.hexInput}
          aria-label="Hex colour code"
          spellCheck={false}
        />
      </div>
    </div>
  );
}

/* ── Main ColorInput component ──────────────────────────────── */
/**
 * @param {object}   props
 * @param {string}   [props.value]              Controlled hex colour value (e.g. "#7C53EE")
 * @param {string}   [props.defaultValue]       Default hex colour (uncontrolled)
 * @param {function} [props.onChange]           (hexValue: string) => void
 * @param {'lg'|'md'} [props.size='lg']          Size — lg=40px input / md=32px input
 * @param {'default'|'filled-darker'|'filled-lighter'} [props.fieldStyle='default'] Input background style
 * @param {boolean}  [props.error=false]        Error state
 * @param {boolean}  [props.readOnly=false]     Read-only state
 * @param {boolean}  [props.disabled=false]     Disabled state
 * @param {'ltr'|'rtl'} [props.dir='ltr']       Text direction
 * @param {string}   [props.label]              Label text (Show Label)
 * @param {boolean}  [props.required=false]     Required — shows asterisk on label
 * @param {boolean}  [props.showLabel=true]     Toggle label visibility
 * @param {string}   [props.helperText]         Helper text below input
 * @param {boolean}  [props.showHelperText=false] Toggle helper text visibility
 * @param {boolean}  [props.showIcon=false]     Show leading icon (Icon prop in Figma)
 * @param {React.ReactNode} [props.icon]        Custom leading icon
 * @param {boolean}  [props.showPrefix=true]    Show colour swatch prefix (Prefix prop in Figma)
 * @param {boolean}  [props.showSuffix=true]    Show suffix area (Suffix prop in Figma)
 * @param {string}   [props.suffixText]         Suffix text content
 * @param {string}   [props.placeholder]        Placeholder text (Filled Text when empty)
 * @param {string}   [props.className]          Extra class
 */
export function ColorInput({
  value: controlledValue,
  defaultValue = '#7C53EE',
  onChange,
  size = 'lg',
  fieldStyle = 'default',
  error = false,
  readOnly = false,
  disabled = false,
  dir = 'ltr',
  label = 'Label',
  required = false,
  showLabel = true,
  helperText = 'Help Text',
  showHelperText = false,
  showIcon = false,
  icon,
  showPrefix = true,
  showSuffix = true,
  suffixText,
  placeholder = 'Enter colour…',
  className = '',
}) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const hex = isControlled ? (controlledValue || '') : internalValue;

  const [open, setOpen] = useState(false);
  const [hsv, setHsv] = useState(() => hexToHsv(hex || '#7C53EE'));
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef(null);

  const isFilled = Boolean(hex && isValidHex(hex));
  const displayHex = isFilled ? hex.replace(/^#/, '').toUpperCase() : '';

  /* Sync HSV when controlled value changes */
  useEffect(() => {
    if (hex && isValidHex(hex)) {
      const norm = normaliseHex(hex);
      if (norm) setHsv(hexToHsv(norm));
    }
  }, [hex]);

  /* Close picker on outside click */
  useEffect(() => {
    if (!open) return;
    function handleOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setFocused(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  function handleHsvChange(newHsv) {
    setHsv(newHsv);
    const newHex = hsvToHex(newHsv);
    if (!isControlled) setInternalValue(newHex);
    onChange?.(newHex);
  }

  function handleSwatchClick() {
    if (disabled || readOnly) return;
    setOpen((p) => !p);
    setFocused(true);
  }

  function handleFieldClick() {
    if (disabled || readOnly) return;
    setFocused(true);
  }

  function handleFieldKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSwatchClick();
    }
    if (e.key === 'Escape') {
      setOpen(false);
      setFocused(false);
    }
  }

  /* ── Class assembly ─────────────────────────────────────── */
  const rootCls = [
    styles.root,
    styles[size === 'md' ? 'sizeMd' : 'sizeLg'],
    styles[fieldStyle === 'filled-darker' ? 'styleDarker' : fieldStyle === 'filled-lighter' ? 'styleLighter' : 'styleDefault'],
    focused   && styles.focused,
    open      && styles.pickerOpen,
    error     && styles.error,
    readOnly  && styles.readOnly,
    disabled  && styles.disabled,
    className,
  ].filter(Boolean).join(' ');

  const swatchBg = isFilled ? hsvToHex(hsv) : '#E6E8EC';

  return (
    <div ref={wrapperRef} className={rootCls} dir={dir}>

      {/* ── Label ─────────────────────────────────────────── */}
      {showLabel && label && (
        <div className={styles.labelRow}>
          {required && (
            <span className={styles.required} aria-hidden="true">*</span>
          )}
          <label className={styles.labelText}>{label}</label>
        </div>
      )}

      {/* ── Input field ───────────────────────────────────── */}
      <div
        className={styles.inputField}
        role="group"
        aria-label={label || 'Colour input'}
      >
        {/* Focus underline (Focused / Pressed states) */}
        {(focused || open) && !readOnly && !disabled && (
          <div className={styles.focusUnderline} aria-hidden="true" />
        )}

        {/* Prefix — colour swatch */}
        {showPrefix && (
          <button
            type="button"
            className={styles.prefix}
            onClick={handleSwatchClick}
            onFocus={() => { if (!disabled && !readOnly) setFocused(true); }}
            onBlur={() => { if (!open) setFocused(false); }}
            onKeyDown={handleFieldKeyDown}
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label={`Colour: ${displayHex || 'none'}. Click to open picker`}
            tabIndex={disabled ? -1 : 0}
          >
            <span
              className={styles.swatchRect}
              style={{ background: swatchBg }}
              aria-hidden="true"
            />
          </button>
        )}

        {/* Content — icon + text */}
        <div className={styles.content} onClick={handleFieldClick}>
          {showIcon && (
            <span className={styles.leadIcon} aria-hidden="true">
              {icon ?? <DefaultSearchIcon />}
            </span>
          )}
          <div className={styles.textArea}>
            {isFilled ? (
              <span className={styles.enteredText}>{displayHex}</span>
            ) : (
              <span className={styles.placeholder}>{placeholder}</span>
            )}
          </div>
        </div>

        {/* Suffix */}
        {showSuffix && (
          <div className={styles.suffix} aria-hidden="true">
            <span className={styles.suffixText}>{suffixText ?? (dir === 'rtl' ? 'هكس' : 'HEX')}</span>
          </div>
        )}
      </div>

      {/* ── Colour picker panel (Focused Picker state) ─────── */}
      {open && (
        <div
          className={styles.pickerWrapper}
          role="dialog"
          aria-label={dir === 'rtl' ? 'منتقي الألوان' : 'Colour picker'}
        >
          <ColorPickerPanel hsv={hsv} onChange={handleHsvChange} dir={dir} />
        </div>
      )}

      {/* ── Helper / error text ────────────────────────────── */}
      {showHelperText && helperText && (
        <div className={`${styles.helperRow} ${error ? styles.helperError : ''}`}>
          <span className={styles.helperIcon} aria-hidden="true">
            <HelpIcon />
          </span>
          <span className={styles.helperText}>{helperText}</span>
        </div>
      )}
    </div>
  );
}

/* ── Built-in icons ─────────────────────────────────────────── */
function DefaultSearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 11.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.3 6.3A1.7 1.7 0 0 1 8 5a1.75 1.75 0 0 1 1.75 1.75c0 1.25-1.75 1.5-1.75 2.75" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
