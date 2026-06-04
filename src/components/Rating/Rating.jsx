import React, { useState } from 'react';
import styles from './Rating.module.css';

/**
 * Rating — Masterteam Design System
 * Figma: node 4250:1940
 *
 * Exports:
 *   RatingStar  — single star, matches _RatingStar Figma component set
 *   Rating      — 5-star interactive row, matches Rating Figma component set
 *
 * RatingStar props:
 *   size    'large' | 'medium' | 'small'   (default 'large')
 *   state   'normal' | 'selected' | 'half' | 'pressed'  (default 'normal')
 *   brand   boolean  — brand (blue) vs default (amber)  (default false)
 *
 * Rating props:
 *   value     number   — current rating 0–count, supports 0.5 increments  (default 0)
 *   onChange  fn(n)    — called with new integer value when star clicked
 *   size      'large' | 'medium' | 'small'   (default 'large')
 *   brand     boolean                          (default false)
 *   readOnly  boolean                          (default false)
 *   count     number   — number of stars       (default 5)
 */

const FULL_STAR_PATH =
  'M22.1839 3.93733C22.8987 2.38758 25.1013 2.38759 25.8161 3.93733L30.3024 13.6635C30.5937 14.2952 31.1923 14.73 31.883 14.8119L42.5195 16.0731C44.2143 16.274 44.8949 18.3688 43.6419 19.5275L35.7781 26.7998C35.2674 27.272 35.0388 27.9757 35.1744 28.6579L37.2618 39.1636C37.5944 40.8375 35.8125 42.1321 34.3233 41.2985L24.9769 36.0668C24.3699 35.7271 23.6301 35.7271 23.0231 36.0668L13.6767 41.2985C12.1875 42.1321 10.4056 40.8375 10.7382 39.1636L12.8256 28.6579C12.9612 27.9757 12.7326 27.272 12.2219 26.7998L4.35805 19.5275C3.10505 18.3688 3.78569 16.274 5.48048 16.0731L16.117 14.8119C16.8077 14.73 17.4063 14.2952 17.6976 13.6635L22.1839 3.93733Z';

/* Left half of star — layered on top of gray base for half-filled effect */
const HALF_LEFT_PATH =
  'M23.496 1.03647C23.6192 0.783227 24 0.870912 24 1.15251V36.1209C24 36.8554 23.5974 37.5308 22.9513 37.8802L13.3818 43.0551C11.9179 43.8467 10.184 42.6084 10.4577 40.9669L12.331 29.7325C12.4371 29.0963 12.2298 28.4479 11.7743 27.9912L3.79741 19.9933C2.63863 18.8314 3.29494 16.8455 4.91784 16.6029L15.8433 14.9699C16.4995 14.8718 17.0644 14.4547 17.3512 13.8564L23.496 1.03647Z';

const SIZE_PX = { large: 48, medium: 32, small: 24 };

/* ── Internal SVG renderer ──────────────────────────────────────────── */
function StarSVG({ size, state, brand }) {
  const sz = SIZE_PX[size] ?? 48;
  const selectedColor = brand ? '#1849A9' : '#F79009';

  /* Pressed: ring circle + gray star, sized sz+6 */
  if (state === 'pressed') {
    const pSz = sz + 6;
    return (
      <svg
        width={pSz}
        height={pSz}
        viewBox={`0 0 ${pSz} ${pSz}`}
        fill="none"
        aria-hidden="true"
        style={{ display: 'block' }}
      >
        <circle cx={pSz / 2} cy={pSz / 2} r={pSz / 2} fill="#F3F4F6" />
        <g transform={`translate(3,3) scale(${sz / 48})`}>
          <path d={FULL_STAR_PATH} fill="#E5E7EB" />
        </g>
      </svg>
    );
  }

  const fillColor = state === 'selected' ? selectedColor : '#E5E7EB';
  const isHalf = state === 'half';

  return (
    <svg
      width={sz}
      height={sz}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <path d={FULL_STAR_PATH} fill={fillColor} />
      {isHalf && <path d={HALF_LEFT_PATH} fill={selectedColor} />}
    </svg>
  );
}

/* ── RatingStar ─────────────────────────────────────────────────────── */
export function RatingStar({
  size = 'large',
  state = 'normal',
  brand = false,
  className,
  style,
  ...rest
}) {
  return (
    <span
      className={[styles.starWrap, className].filter(Boolean).join(' ')}
      style={style}
      {...rest}
    >
      <StarSVG size={size} state={state} brand={brand} />
    </span>
  );
}

/* ── Rating ─────────────────────────────────────────────────────────── */
export function Rating({
  value = 0,
  onChange,
  size = 'large',
  brand = false,
  readOnly = false,
  count = 5,
  className,
  ...rest
}) {
  const [hoverValue, setHoverValue] = useState(null);
  const [pressedIndex, setPressedIndex] = useState(null);
  const displayValue = hoverValue ?? value;

  function getState(index) {
    if (pressedIndex === index) return 'normal'; // gray star; ring handled via CSS
    const n = index + 1;
    if (displayValue >= n) return 'selected';
    if (displayValue >= n - 0.5) return 'half';
    return 'normal';
  }

  return (
    <div
      className={[styles.ratingRow, className].filter(Boolean).join(' ')}
      role="group"
      aria-label="Star rating"
      {...rest}
    >
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          className={[
            styles.starBtn,
            readOnly && styles.readOnly,
            pressedIndex === i && styles.starBtnPressed,
          ].filter(Boolean).join(' ')}
          onMouseDown={() => !readOnly && setPressedIndex(i)}
          onMouseUp={() => !readOnly && setPressedIndex(null)}
          onClick={() => !readOnly && onChange?.(i + 1)}
          onMouseEnter={() => !readOnly && setHoverValue(i + 1)}
          onMouseLeave={() => {
            if (!readOnly) {
              setHoverValue(null);
              setPressedIndex(null);
            }
          }}
          tabIndex={readOnly ? -1 : 0}
          aria-label={`${i + 1} out of ${count} stars`}
          aria-pressed={!readOnly && value === i + 1}
        >
          <StarSVG size={size} state={getState(i)} brand={brand} />
        </button>
      ))}
    </div>
  );
}
