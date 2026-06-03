import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TimePicker.module.css';

/* ── SVG icons (matching Figma asset shapes) ─────────────────── */

/* time-04 — clock icon */
const ClockSvg = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 4.5V9L12 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* selector — up/down arrows combined (↕) */
const SelectorSvg = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M5 6.5L8 3.5L11 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 9.5L8 12.5L11 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* chevron-down */
const ChevDownSvg = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Helpers ─────────────────────────────────────────────────── */

const pad   = (n) => String(n).padStart(2, '0');
const cycle = (v, step, max) => ((v + step) % max + max) % max;

/* Label maps for RTL (Arabic) */
const LABELS = {
  ltr: { hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds', am: 'AM', pm: 'PM' },
  rtl: { hours: 'ساعات', minutes: 'دقائق',  seconds: 'ثواني',  am: 'ص',  pm: 'م'  },
};

/* ── Colon separator for Dropdown ───────────────────────────── */

function ColonBar() {
  return (
    <span className={styles.ddColon} aria-hidden="true">:</span>
  );
}

/* ── Stepper type ────────────────────────────────────────────── */

function StepperBox({ value, max, label, onChange }) {
  return (
    <div className={styles.stepperBox}>
      <span className={styles.stepperVal} aria-live="polite" aria-atomic="true">
        {pad(value)}
      </span>
      <div className={styles.selectorWrap}>
        <SelectorSvg />
        <button
          type="button"
          className={`${styles.selectorHalf} ${styles.selectorUp}`}
          onClick={() => onChange(cycle(value, 1, max))}
          aria-label={`Increase ${label}`}
        />
        <button
          type="button"
          className={`${styles.selectorHalf} ${styles.selectorDown}`}
          onClick={() => onChange(cycle(value, -1, max))}
          aria-label={`Decrease ${label}`}
        />
      </div>
    </div>
  );
}

function StepperView({ h, m, s, period, showSeconds, onH, onM, onS, onPeriod, rtl }) {
  const L = rtl ? LABELS.rtl : LABELS.ltr;

  const boxes = showSeconds
    ? [
        <StepperBox key="h" value={h} max={12} label="hours"   onChange={onH} />,
        <StepperBox key="m" value={m} max={60} label="minutes" onChange={onM} />,
        <StepperBox key="s" value={s} max={60} label="seconds" onChange={onS} />,
      ]
    : [
        <StepperBox key="h" value={h} max={12} label="hours"   onChange={onH} />,
        <StepperBox key="m" value={m} max={60} label="minutes" onChange={onM} />,
      ];

  const periodText = (
    <button
      type="button"
      className={styles.stepperPeriod}
      onClick={() => onPeriod(period === 'AM' ? 'PM' : 'AM')}
      aria-label={`Period: ${period === 'AM' ? L.am : L.pm}, click to toggle`}
    >
      {period === 'AM' ? L.am : L.pm}
    </button>
  );

  const clock = (
    <span className={styles.clockIcon}>
      <ClockSvg />
    </span>
  );

  /* Same DOM order for LTR and RTL — CSS direction:rtl on .wrap reverses visual layout */
  return <>{clock}{boxes}{periodText}</>;
}

/* ── Dropdown type ───────────────────────────────────────────── */

function DdUnit({ value, max, label, onChange, showColon }) {
  const opts = Array.from({ length: max }, (_, i) => i);
  return (
    <>
      <div className={styles.ddGroup}>
        <span className={styles.ddLabel}>{label}</span>
        <div className={styles.ddContent}>
          <div className={styles.ddBox}>
            <span className={styles.ddSelectVal}>{pad(value)}</span>
            <div className={styles.ddChevWrap}>
              <ChevDownSvg />
              <select
                className={styles.ddSelect}
                value={value}
                onChange={(e) => onChange(+e.target.value)}
                aria-label={label}
              >
                {opts.map((i) => (
                  <option key={i} value={i}>{pad(i)}</option>
                ))}
              </select>
            </div>
          </div>
          {showColon && <ColonBar />}
        </div>
      </div>
    </>
  );
}

function DdPeriod({ value, onChange, rtl }) {
  const L = rtl ? LABELS.rtl : LABELS.ltr;
  return (
    <div className={`${styles.ddGroup} ${styles.ddGroupPeriod}`}>
      <div className={styles.ddPeriodContent}>
        <div className={styles.ddBox}>
          <span className={styles.ddSelectVal}>{value === 'AM' ? L.am : L.pm}</span>
          <div className={styles.ddChevWrap}>
            <ChevDownSvg />
            <select
              className={styles.ddSelect}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              aria-label="Period"
            >
              <option value="AM">{L.am}</option>
              <option value="PM">{L.pm}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownView({ h, m, s, period, showSeconds, onH, onM, onS, onPeriod, rtl }) {
  const L = rtl ? LABELS.rtl : LABELS.ltr;

  /* Same DOM order for LTR and RTL — CSS direction:rtl (inherited from .wrap) reverses layout */
  return (
    <div className={styles.ddWrap} dir={rtl ? 'rtl' : undefined}>
      <DdUnit value={h} max={12} label={L.hours}   onChange={onH} showColon={true} />
      <DdUnit value={m} max={60} label={L.minutes}  onChange={onM} showColon={showSeconds} />
      {showSeconds && (
        <DdUnit value={s} max={60} label={L.seconds} onChange={onS} showColon={false} />
      )}
      <DdPeriod value={period} onChange={onPeriod} rtl={rtl} />
    </div>
  );
}

/* ── Input type ──────────────────────────────────────────────── */

function InputView({ h, m, s, period, showSeconds, typing, onPeriod, rtl }) {
  const L = rtl ? LABELS.rtl : LABELS.ltr;

  const timeBox = (
    <div className={styles.inputBox} aria-live="polite" aria-atomic="true">
      <span className={styles.inputHours}>{pad(h)}</span>
      {typing && <span className={styles.inputCursor} aria-hidden="true" />}
      <span className={styles.inputColon}>:</span>
      <span className={styles.inputMinSec}>{pad(m)}</span>
      {showSeconds && (
        <>
          <span className={styles.inputColon}>:</span>
          <span className={styles.inputMinSec}>{pad(s)}</span>
        </>
      )}
    </div>
  );

  const periodTabs = (
    <div className={styles.inputPeriod} role="group" aria-label="Period">
      {['AM', 'PM'].map((p) => (
        <button
          key={p}
          type="button"
          className={[styles.inputPeriodBtn, period === p ? styles.inputPeriodBtnActive : ''].filter(Boolean).join(' ')}
          onClick={() => onPeriod(p)}
          aria-pressed={period === p}
        >
          {p === 'AM' ? L.am : L.pm}
        </button>
      ))}
    </div>
  );

  const clock = (
    <span className={styles.clockIcon}>
      <ClockSvg />
    </span>
  );

  /* Same DOM order for LTR and RTL — CSS direction:rtl on .wrap reverses visual layout */
  return (
    <div className={styles.inputWrap}>
      {clock}{timeBox}{periodTabs}
    </div>
  );
}

/* ── Timer type ──────────────────────────────────────────────── */

function TimerColon() {
  return (
    <div className={styles.timerColon} aria-hidden="true">
      <div className={styles.timerColonDot}>
        <span className={styles.timerColonChar}>:</span>
      </div>
      <div className={styles.timerColonFiller} />
    </div>
  );
}

function TimerView({ h, m, s, period, showSeconds, onPeriod, rtl }) {
  const L = rtl ? LABELS.rtl : LABELS.ltr;

  const units = (
    <div className={styles.timerTime}>
      <div className={styles.timerUnit}>
        <div className={styles.timerBox}>
          <span className={styles.timerVal} aria-live="polite">{pad(h)}</span>
        </div>
        <span className={styles.timerLabel}>{L.hours}</span>
      </div>
      <TimerColon />
      <div className={styles.timerUnit}>
        <div className={styles.timerBox}>
          <span className={styles.timerVal} aria-live="polite">{pad(m)}</span>
        </div>
        <span className={styles.timerLabel}>{rtl ? 'دقائق' : 'Minute'}</span>
      </div>
      {showSeconds && (
        <>
          <TimerColon />
          <div className={styles.timerUnit}>
            <div className={styles.timerBox}>
              <span className={styles.timerVal} aria-live="polite">{pad(s)}</span>
            </div>
            <span className={styles.timerLabel}>{L.seconds}</span>
          </div>
        </>
      )}
    </div>
  );

  const periodStack = (
    <div className={[styles.timerPeriod, rtl ? styles.timerPeriodRtl : ''].filter(Boolean).join(' ')} role="group" aria-label="Period">
      {['AM', 'PM'].map((p) => (
        <button
          key={p}
          type="button"
          className={[styles.timerPeriodBtn, period === p ? styles.timerPeriodBtnActive : ''].filter(Boolean).join(' ')}
          onClick={() => onPeriod(p)}
          aria-pressed={period === p}
        >
          {p === 'AM' ? L.am : L.pm}
        </button>
      ))}
    </div>
  );

  /* Same DOM order for LTR and RTL — CSS direction:rtl on .wrap reverses visual layout */
  return <>{units}{periodStack}</>;
}

/* ── TimePicker ──────────────────────────────────────────────── */

/**
 * TimePicker — Masterteam Design System
 * Figma: node 4770:12915
 *
 * Four interaction patterns for selecting time:
 *   Stepper  — value boxes with ↕ selector icon
 *   Dropdown — labeled selects with chevron
 *   Input    — formatted display + AM/PM tab toggle
 *   Timer    — large display with stacked AM/PM
 */
export function TimePicker({
  type        = 'Stepper',
  hours       = '00',
  minutes     = '00',
  seconds     = '00',
  period: initialPeriod = 'AM',
  showSeconds = true,
  rtl         = false,
  typing      = false,
}) {
  const [h,      setH]      = useState(parseInt(hours,   10) || 0);
  const [m,      setM]      = useState(parseInt(minutes, 10) || 0);
  const [s,      setS]      = useState(parseInt(seconds, 10) || 0);
  const [period, setPeriod] = useState(initialPeriod);

  const sharedProps = { h, m, s, period, showSeconds, onH: setH, onM: setM, onS: setS, onPeriod: setPeriod, rtl };

  const wrapClass = [
    styles.wrap,
    type === 'Dropdown' ? styles.wrapDropdown : '',
    type === 'Timer'    ? styles.wrapTimer    : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapClass} dir={rtl ? 'rtl' : undefined}>
      {type === 'Stepper'  && <StepperView  {...sharedProps} />}
      {type === 'Dropdown' && <DropdownView {...sharedProps} />}
      {type === 'Input'    && <InputView    {...sharedProps} typing={typing} />}
      {type === 'Timer'    && <TimerView    {...sharedProps} />}
    </div>
  );
}

TimePicker.propTypes = {
  type:        PropTypes.oneOf(['Stepper', 'Dropdown', 'Input', 'Timer']),
  hours:       PropTypes.string,
  minutes:     PropTypes.string,
  seconds:     PropTypes.string,
  period:      PropTypes.oneOf(['AM', 'PM']),
  showSeconds: PropTypes.bool,
  rtl:         PropTypes.bool,
  typing:      PropTypes.bool,
};
