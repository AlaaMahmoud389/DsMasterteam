import React from 'react';
import styles from './Slider.module.css';

/**
 * Slider — Masterteam Design System
 * Figma: node 4731:482
 *
 * RTL strategy: We feed the native <input type="range"> a flipped value
 * (nativeVal = max - actualVal + min) so the thumb sits at the correct
 * visual position without any CSS transform.  On change we flip back.
 * The track gradient formula mirrors separately based on actual values.
 */

/* ── Help-circle icon ────────────────────────────────────────────── */
function HelpCircleIcon() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16"
      fill="none" aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <circle cx="8" cy="8" r="7.25" stroke="#384250" strokeWidth="1.5" />
      <path
        d="M6.5 6.25A1.5 1.5 0 0 1 8 4.75a1.5 1.5 0 0 1 1.5 1.5c0 1-1.5 1.5-1.5 2.5"
        stroke="#384250" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="8" cy="11.25" r="0.875" fill="#384250" />
    </svg>
  );
}

/* ── RTL value helpers ───────────────────────────────────────────── */
/* Converts an actual value to the value the native input receives. */
function toNative(actual, min, max, rtl) {
  return rtl ? max - actual + min : actual;
}
/* Converts what the native input reports back to an actual value. */
function fromNative(native, min, max, rtl) {
  return rtl ? max - native + min : native;
}

/* ── Track gradient ──────────────────────────────────────────────── */
/*
 * The gradient is computed from ACTUAL values (not native).
 * RTL: fill grows from the right edge, so we invert the stop positions.
 */
function buildGradient({ range, rtl, value, minValue, maxValue, min, max }) {
  const pct = (v) => ((v - min) / (max - min)) * 100;

  if (!range) {
    const f = pct(value);
    return rtl
      ? `linear-gradient(to right, #F3F4F6 ${100 - f}%, #1849A9 ${100 - f}%)`
      : `linear-gradient(to right, #1849A9 ${f}%, #F3F4F6 ${f}%)`;
  }

  const mn = pct(minValue);
  const mx = pct(maxValue);
  return rtl
    ? `linear-gradient(to right, #F3F4F6 ${100 - mx}%, #1849A9 ${100 - mx}%, #1849A9 ${100 - mn}%, #F3F4F6 ${100 - mn}%)`
    : `linear-gradient(to right, #F3F4F6 ${mn}%, #1849A9 ${mn}%, #1849A9 ${mx}%, #F3F4F6 ${mx}%)`;
}

/* ── Slider ───────────────────────────────────────────────────────── */
export function Slider({
  value = 20,
  onChange,

  minValue = 0,
  maxValue = 50,
  onRangeChange,

  min = 0,
  max = 100,
  step = 1,

  size = 'medium',
  range = false,
  rtl = false,
  disabled = false,

  showLabel = true,
  label = 'Label',
  labelType = 'regular',
  required = false,

  showHelperText = true,
  helperText = 'Help Text',

  className,
  ...rest
}) {
  const isSmall = size === 'small';
  const bg = buildGradient({ range, rtl, value, minValue, maxValue, min, max });

  /*
   * z-index: when both range thumbs sit at the same native-max position
   * (LTR: both at actual-max; RTL: both at actual-min), we lift the min
   * input so the user can drag it back inward.
   */
  const nativeMin = toNative(minValue, min, max, rtl);
  const nativeMax = toNative(maxValue, min, max, rtl);
  const bothAtNativeMax = range && nativeMin >= max && nativeMax >= max;

  const pctStr = (v) => `${Math.round(v)}%`;

  /* ── Class assembly ── */
  const wrapCls = [
    styles.wrapper,
    isSmall ? styles.sizeSmall : styles.sizeMedium,
    rtl && styles.rtl,
    disabled && styles.wrapDisabled,
    className,
  ].filter(Boolean).join(' ');

  const labelCls = [
    styles.label,
    isSmall ? styles.labelSmall : styles.labelMedium,
    labelType === 'semibold' && styles.labelSemibold,
    disabled && styles.labelDisabled,
  ].filter(Boolean).join(' ');

  const trackWrapCls = [styles.trackWrap, isSmall ? styles.trackWrapSmall : styles.trackWrapMedium].join(' ');
  const trackCls     = [styles.track,     isSmall ? styles.trackSmall     : styles.trackMedium    ].join(' ');
  const baseInputCls = [styles.rangeInput, isSmall ? styles.rangeInputSmall : styles.rangeInputMedium].join(' ');
  const helperTextCls = [styles.helperText, isSmall ? styles.helperTextSmall : styles.helperTextMedium].join(' ');

  /* ── Event handlers ── */
  const handleSingleChange = (e) => {
    if (!disabled) onChange?.(fromNative(Number(e.target.value), min, max, rtl));
  };

  const handleMinChange = (e) => {
    if (!disabled) {
      const native = Number(e.target.value);
      if (rtl) {
        /*
         * In RTL, the min-thumb has a HIGHER native value (right side).
         * Its native value must stay above nativeMax + step so it
         * never crosses the max-thumb.
         */
        const constrained = Math.max(native, nativeMax + step);
        onRangeChange?.({ min: fromNative(constrained, min, max, rtl), max: maxValue });
      } else {
        onRangeChange?.({ min: Math.min(native, maxValue - step), max: maxValue });
      }
    }
  };

  const handleMaxChange = (e) => {
    if (!disabled) {
      const native = Number(e.target.value);
      if (rtl) {
        /*
         * In RTL, the max-thumb has a LOWER native value (left side).
         * Its native value must stay below nativeMin - step.
         */
        const constrained = Math.min(native, nativeMin - step);
        onRangeChange?.({ min: minValue, max: fromNative(constrained, min, max, rtl) });
      } else {
        onRangeChange?.({ min: minValue, max: Math.max(native, minValue + step) });
      }
    }
  };

  return (
    <div className={wrapCls} dir={rtl ? 'rtl' : undefined} {...rest}>

      {/* Label */}
      {showLabel && (
        <div className={styles.labelRow}>
          {required && <span className={styles.required}>*</span>}
          <span className={labelCls}>{label}</span>
        </div>
      )}

      {/* Track row */}
      <div className={styles.trackRow}>

        {/* Range — start percentage.
            DOM order: [minValue%] [track] [maxValue%]
            RTL flex reverses it visually → minValue% appears on the right,
            maxValue% on the left — matching the thumb positions. */}
        {range && <span className={styles.percentage}>{pctStr(minValue)}</span>}

        {/* Track + overlaid input(s) */}
        <div className={trackWrapCls}>
          <div className={trackCls} style={{ background: bg }} />

          {range ? (
            <>
              {/*
               * Min input — controls the lower bound.
               * In RTL its native value is (max - minValue), so the thumb
               * sits on the right side of the track at low actual values.
               */}
              <input
                type="range"
                className={`${baseInputCls} ${styles.rangeInputMin}`}
                style={{ zIndex: bothAtNativeMax ? 5 : 3 }}
                min={min} max={max} step={step}
                value={nativeMin}
                onChange={handleMinChange}
                disabled={disabled}
                aria-label="Minimum value"
              />
              {/*
               * Max input — controls the upper bound.
               * In RTL its native value is (max - maxValue), thumb on the left.
               */}
              <input
                type="range"
                className={`${baseInputCls} ${styles.rangeInputMax}`}
                style={{ zIndex: bothAtNativeMax ? 3 : 5 }}
                min={min} max={max} step={step}
                value={nativeMax}
                onChange={handleMaxChange}
                disabled={disabled}
                aria-label="Maximum value"
              />
            </>
          ) : (
            /*
             * Single slider.
             * RTL: native value = max - value, so at value=0 the thumb
             * is at the native-max position (right edge) as expected.
             */
            <input
              type="range"
              className={baseInputCls}
              min={min} max={max} step={step}
              value={toNative(value, min, max, rtl)}
              onChange={handleSingleChange}
              disabled={disabled}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={value}
            />
          )}
        </div>

        {/* Single — value label (right in LTR, left in RTL via flex) */}
        {!range && <span className={styles.percentage}>{pctStr(value)}</span>}

        {/* Range — end percentage */}
        {range && <span className={styles.percentage}>{pctStr(maxValue)}</span>}
      </div>

      {/* Helper text */}
      {showHelperText && (
        <div className={styles.helperRow}>
          <HelpCircleIcon />
          <span className={helperTextCls}>{helperText}</span>
        </div>
      )}
    </div>
  );
}
