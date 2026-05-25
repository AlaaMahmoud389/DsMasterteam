import { useState, useRef, useEffect } from 'react';
import styles from './DatePicker.module.css';

/* ── Constants ──────────────────────────────────────────────────────────── */

const MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTHS_AR = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
const DAYS_EN   = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const DAYS_AR   = ['أحد','إثنين','ثلاثاء','أربعاء','خميس','جمعة','سبت'];

const QUICK_OPTIONS_EN = [
  { key: 'today',       label: 'Today' },
  { key: 'thisWeek',    label: 'This Week' },
  { key: 'lastWeek',    label: 'Last Week' },
  { key: 'thisMonth',   label: 'This Month' },
  { key: 'lastMonth',   label: 'Last Month' },
  { key: 'last3Months', label: 'Last 3 Months' },
  { key: 'last7Days',   label: 'Last 7 Days' },
  { key: 'last30Days',  label: 'Last 30 Days' },
  { key: 'last90Days',  label: 'Last 90 Days' },
];

const QUICK_OPTIONS_AR = [
  { key: 'today',       label: 'اليوم' },
  { key: 'thisWeek',    label: 'هذا الأسبوع' },
  { key: 'lastWeek',    label: 'الأسبوع الماضي' },
  { key: 'thisMonth',   label: 'هذا الشهر' },
  { key: 'lastMonth',   label: 'الشهر الماضي' },
  { key: 'last3Months', label: 'آخر 3 أشهر' },
  { key: 'last7Days',   label: 'آخر 7 أيام' },
  { key: 'last30Days',  label: 'آخر 30 يوم' },
  { key: 'last90Days',  label: 'آخر 90 يوم' },
];

/* ── Helpers ────────────────────────────────────────────────────────────── */

function sameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth()    === b.getMonth()    &&
         a.getDate()     === b.getDate();
}

function stripTime(d) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

function getCalendarDays(year, month) {
  const firstWeekDay = new Date(year, month, 1).getDay();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();
  const daysInPrev   = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = firstWeekDay - 1; i >= 0; i--)
    cells.push({ date: stripTime(new Date(year, month - 1, daysInPrev - i)), adjacent: true });
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ date: stripTime(new Date(year, month, d)), adjacent: false });
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++)
    cells.push({ date: stripTime(new Date(year, month + 1, d)), adjacent: true });
  return cells;
}

function formatLong(date) {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function formatShort(date) {
  if (!date) return '';
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${d}/${m}/${date.getFullYear()}`;
}

function getQuickRange(key, today) {
  const t = stripTime(today);
  switch (key) {
    case 'today':       return [t, t];
    case 'thisWeek': {
      const s = new Date(t); s.setDate(t.getDate() - t.getDay());
      const e = new Date(t); e.setDate(t.getDate() + (6 - t.getDay()));
      return [stripTime(s), stripTime(e)];
    }
    case 'lastWeek': {
      const s = new Date(t); s.setDate(t.getDate() - t.getDay() - 7);
      const e = new Date(t); e.setDate(t.getDate() - t.getDay() - 1);
      return [stripTime(s), stripTime(e)];
    }
    case 'thisMonth': {
      return [stripTime(new Date(t.getFullYear(), t.getMonth(), 1)),
              stripTime(new Date(t.getFullYear(), t.getMonth() + 1, 0))];
    }
    case 'lastMonth': {
      return [stripTime(new Date(t.getFullYear(), t.getMonth() - 1, 1)),
              stripTime(new Date(t.getFullYear(), t.getMonth(), 0))];
    }
    case 'last3Months': {
      const s = new Date(t); s.setMonth(t.getMonth() - 3);
      return [stripTime(s), t];
    }
    case 'last7Days': {
      const s = new Date(t); s.setDate(t.getDate() - 6);
      return [stripTime(s), t];
    }
    case 'last30Days': {
      const s = new Date(t); s.setDate(t.getDate() - 29);
      return [stripTime(s), t];
    }
    case 'last90Days': {
      const s = new Date(t); s.setDate(t.getDate() - 89);
      return [stripTime(s), t];
    }
    default: return [t, t];
  }
}

/* ── Year Dropdown ──────────────────────────────────────────────────────── */

function YearDropdown({ year, isOpen, isRTL, onClick, yearRange, onSelect }) {
  return (
    <div className={styles.yearDropdownWrapper}>
      <button
        type="button"
        className={styles.yearBtn}
        onClick={onClick}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select year"
      >
        <span>{year}</span>
        <svg className={`${styles.chevron} ${isOpen ? styles.chevronUp : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {isOpen && (
        <div className={`${styles.yearDropdown} ${isRTL ? styles.yearDropdownRTL : ''}`} role="listbox">
          {yearRange.map(y => (
            <button
              key={y}
              type="button"
              role="option"
              aria-selected={y === year}
              className={`${styles.yearOption} ${y === year ? styles.yearOptionActive : ''}`}
              onClick={() => onSelect(y)}
            >
              <span>{y}</span>
              {y === year && <span className={styles.yearCheck} aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Calendar Grid ──────────────────────────────────────────────────────── */

function CalendarGrid({
  year, month, months, days, isRTL,
  showPrev, showNext, onPrev, onNext,
  yearDDOpen, onYearDDToggle, yearRange, onYearSelect,
  cells, onDateClick, onHover, onLeave,
  isSelected, isInRange, isRangeStart, isRangeEnd, isToday, isDisabled,
  disabled,
}) {
  return (
    <div className={styles.calendar}>
      {/* Header */}
      <div className={styles.header}>
        {!isRTL && (
          <>
            <div className={styles.headerStart}>
              <span className={styles.monthLabel}>{months[month]}</span>
              <YearDropdown
                year={year} isOpen={yearDDOpen} isRTL={false}
                onClick={onYearDDToggle} yearRange={yearRange} onSelect={onYearSelect}
              />
            </div>
            <div className={styles.headerNav}>
              {showPrev && (
                <button type="button" className={styles.navBtn} onClick={onPrev} aria-label="Previous month">
                  {/* arrow-left-02 — Stroke / Rounded — from Figma node 7060:6399 */}
                  <svg width="24" height="24" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                    <path d="M11.2504 19.9997C11.2504 20.3733 11.4161 20.7198 11.5729 20.9801C11.7422 21.2609 11.9699 21.5508 12.2196 21.8335C12.7206 22.4005 13.3743 23.0095 14.0087 23.5604C14.6468 24.1145 15.2827 24.6247 15.7577 24.9955C15.9956 25.1812 16.1941 25.3326 16.3335 25.4379C16.4032 25.4906 16.4582 25.5318 16.496 25.56L16.5396 25.5923L16.5511 25.6009L16.5551 25.6039C16.8886 25.8495 17.3586 25.7786 17.6042 25.4451C17.8499 25.1116 17.7787 24.6422 17.4452 24.3965L17.4325 24.3871L17.3925 24.3573C17.357 24.3309 17.3046 24.2917 17.2376 24.2411C17.1036 24.1398 16.9115 23.9932 16.6806 23.813C16.2182 23.4521 15.6041 22.9592 14.9922 22.4278C14.3765 21.8932 13.7802 21.3344 13.3437 20.8403C13.3161 20.8091 13.2894 20.7784 13.2636 20.7482L28.0004 20.7482C28.4147 20.7482 28.7504 20.4124 28.7504 19.9982C28.7504 19.584 28.4147 19.2482 28.0004 19.2482L13.2661 19.2482C13.2912 19.219 13.317 19.1893 13.3437 19.1591C13.7802 18.665 14.3765 18.1062 14.9922 17.5716C15.6041 17.0402 16.2181 16.5473 16.6806 16.1863C16.9114 16.0062 17.1036 15.8596 17.2376 15.7583C17.3046 15.7077 17.357 15.6685 17.3925 15.6421L17.4325 15.6123L17.4452 15.6029C17.7787 15.3572 17.8499 14.8877 17.6042 14.5543C17.3586 14.2208 16.8886 14.1499 16.5551 14.3955L16.5511 14.3985L16.5396 14.407L16.496 14.4394C16.4582 14.4676 16.4032 14.5088 16.3335 14.5615C16.1941 14.6668 15.9956 14.8182 15.7577 15.0039C15.2826 15.3747 14.6468 15.8849 14.0087 16.439C13.3743 16.9899 12.7206 17.5988 12.2196 18.1659C11.9699 18.4486 11.7422 18.7385 11.5729 19.0193C11.417 19.278 11.2524 19.622 11.2504 19.993Z" fill="currentColor"/>
                  </svg>
                </button>
              )}
              {showNext && (
                <button type="button" className={styles.navBtn} onClick={onNext} aria-label="Next month">
                  {/* arrow-right-02 — Stroke / Rounded — from Figma node 7060:6400 */}
                  <svg width="24" height="24" viewBox="40 0 40 40" fill="none" aria-hidden="true">
                    <path d="M68.7496 19.9996C68.7496 19.626 68.5839 19.2795 68.4271 19.0193C68.2578 18.7384 68.0301 18.4485 67.7804 18.1658C67.2794 17.5988 66.6257 16.9898 65.9914 16.4389C65.3533 15.8848 64.7174 15.3746 64.2423 15.0038C64.0044 14.8181 63.806 14.6667 63.6665 14.5614C63.5968 14.5087 63.5418 14.4675 63.504 14.4393L63.4604 14.407L63.4489 14.3984L63.4449 14.3954C63.1114 14.1498 62.6414 14.2207 62.3958 14.5542C62.1501 14.8877 62.2213 15.3571 62.5548 15.6028L62.5675 15.6122L62.6076 15.642C62.643 15.6684 62.6954 15.7076 62.7624 15.7582C62.8964 15.8595 63.0886 16.0061 63.3194 16.1863C63.7819 16.5472 64.396 17.0401 65.0079 17.5715C65.6235 18.1061 66.2198 18.6649 66.6563 19.159C66.6839 19.1902 66.7106 19.2209 66.7364 19.2511L51.9996 19.2511C51.5854 19.2511 51.2496 19.5869 51.2496 20.0011C51.2496 20.4153 51.5854 20.7511 51.9996 20.7511L66.7339 20.7511C66.7089 20.7803 66.683 20.81 66.6563 20.8403C66.2198 21.3343 65.6235 21.8931 65.0079 22.4277C64.396 22.9591 63.7819 23.452 63.3194 23.813C63.0886 23.9931 62.8964 24.1397 62.7624 24.241C62.6954 24.2916 62.643 24.3308 62.6076 24.3572L62.5675 24.387L62.5548 24.3964C62.2213 24.6421 62.1501 25.1116 62.3958 25.4451C62.6414 25.7786 63.1114 25.8494 63.4449 25.6038L63.4489 25.6008L63.4604 25.5923L63.504 25.5599C63.5418 25.5317 63.5968 25.4905 63.6666 25.4378C63.806 25.3325 64.0044 25.1811 64.2423 24.9954C64.7174 24.6246 65.3533 24.1144 65.9914 23.5603C66.6257 23.0094 67.2794 22.4005 67.7804 21.8334C68.0301 21.5507 68.2578 21.2608 68.4271 20.98C68.583 20.7213 68.7476 20.3773 68.7496 20.0063Z" fill="currentColor"/>
                  </svg>
                </button>
              )}
            </div>
          </>
        )}
        {isRTL && (
          <>
            <div className={styles.headerEnd}>
              <span className={styles.monthLabel}>{months[month]}</span>
              <YearDropdown
                year={year} isOpen={yearDDOpen} isRTL={true}
                onClick={onYearDDToggle} yearRange={yearRange} onSelect={onYearSelect}
              />
            </div>
            <div className={styles.headerNav}>
              {showPrev && (
                <button type="button" className={styles.navBtn} onClick={onPrev} aria-label="الشهر السابق">
                  {/* arrow-right-02 — RTL prev navigates backward (right direction in RTL) */}
                  <svg width="24" height="24" viewBox="40 0 40 40" fill="none" aria-hidden="true">
                    <path d="M68.7496 19.9996C68.7496 19.626 68.5839 19.2795 68.4271 19.0193C68.2578 18.7384 68.0301 18.4485 67.7804 18.1658C67.2794 17.5988 66.6257 16.9898 65.9914 16.4389C65.3533 15.8848 64.7174 15.3746 64.2423 15.0038C64.0044 14.8181 63.806 14.6667 63.6665 14.5614C63.5968 14.5087 63.5418 14.4675 63.504 14.4393L63.4604 14.407L63.4489 14.3984L63.4449 14.3954C63.1114 14.1498 62.6414 14.2207 62.3958 14.5542C62.1501 14.8877 62.2213 15.3571 62.5548 15.6028L62.5675 15.6122L62.6076 15.642C62.643 15.6684 62.6954 15.7076 62.7624 15.7582C62.8964 15.8595 63.0886 16.0061 63.3194 16.1863C63.7819 16.5472 64.396 17.0401 65.0079 17.5715C65.6235 18.1061 66.2198 18.6649 66.6563 19.159C66.6839 19.1902 66.7106 19.2209 66.7364 19.2511L51.9996 19.2511C51.5854 19.2511 51.2496 19.5869 51.2496 20.0011C51.2496 20.4153 51.5854 20.7511 51.9996 20.7511L66.7339 20.7511C66.7089 20.7803 66.683 20.81 66.6563 20.8403C66.2198 21.3343 65.6235 21.8931 65.0079 22.4277C64.396 22.9591 63.7819 23.452 63.3194 23.813C63.0886 23.9931 62.8964 24.1397 62.7624 24.241C62.6954 24.2916 62.643 24.3308 62.6076 24.3572L62.5675 24.387L62.5548 24.3964C62.2213 24.6421 62.1501 25.1116 62.3958 25.4451C62.6414 25.7786 63.1114 25.8494 63.4449 25.6038L63.4489 25.6008L63.4604 25.5923L63.504 25.5599C63.5418 25.5317 63.5968 25.4905 63.6666 25.4378C63.806 25.3325 64.0044 25.1811 64.2423 24.9954C64.7174 24.6246 65.3533 24.1144 65.9914 23.5603C66.6257 23.0094 67.2794 22.4005 67.7804 21.8334C68.0301 21.5507 68.2578 21.2608 68.4271 20.98C68.583 20.7213 68.7476 20.3773 68.7496 20.0063Z" fill="currentColor"/>
                  </svg>
                </button>
              )}
              {showNext && (
                <button type="button" className={styles.navBtn} onClick={onNext} aria-label="الشهر التالي">
                  {/* arrow-left-02 — RTL next navigates forward (left direction in RTL) */}
                  <svg width="24" height="24" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                    <path d="M11.2504 19.9997C11.2504 20.3733 11.4161 20.7198 11.5729 20.9801C11.7422 21.2609 11.9699 21.5508 12.2196 21.8335C12.7206 22.4005 13.3743 23.0095 14.0087 23.5604C14.6468 24.1145 15.2827 24.6247 15.7577 24.9955C15.9956 25.1812 16.1941 25.3326 16.3335 25.4379C16.4032 25.4906 16.4582 25.5318 16.496 25.56L16.5396 25.5923L16.5511 25.6009L16.5551 25.6039C16.8886 25.8495 17.3586 25.7786 17.6042 25.4451C17.8499 25.1116 17.7787 24.6422 17.4452 24.3965L17.4325 24.3871L17.3925 24.3573C17.357 24.3309 17.3046 24.2917 17.2376 24.2411C17.1036 24.1398 16.9115 23.9932 16.6806 23.813C16.2182 23.4521 15.6041 22.9592 14.9922 22.4278C14.3765 21.8932 13.7802 21.3344 13.3437 20.8403C13.3161 20.8091 13.2894 20.7784 13.2636 20.7482L28.0004 20.7482C28.4147 20.7482 28.7504 20.4124 28.7504 19.9982C28.7504 19.584 28.4147 19.2482 28.0004 19.2482L13.2661 19.2482C13.2912 19.219 13.317 19.1893 13.3437 19.1591C13.7802 18.665 14.3765 18.1062 14.9922 17.5716C15.6041 17.0402 16.2181 16.5473 16.6806 16.1863C16.9114 16.0062 17.1036 15.8596 17.2376 15.7583C17.3046 15.7077 17.357 15.6685 17.3925 15.6421L17.4325 15.6123L17.4452 15.6029C17.7787 15.3572 17.8499 14.8877 17.6042 14.5543C17.3586 14.2208 16.8886 14.1499 16.5551 14.3955L16.5511 14.3985L16.5396 14.407L16.496 14.4394C16.4582 14.4676 16.4032 14.5088 16.3335 14.5615C16.1941 14.6668 15.9956 14.8182 15.7577 15.0039C15.2826 15.3747 14.6468 15.8849 14.0087 16.439C13.3743 16.9899 12.7206 17.5988 12.2196 18.1659C11.9699 18.4486 11.7422 18.7385 11.5729 19.0193C11.417 19.278 11.2524 19.622 11.2504 19.993Z" fill="currentColor"/>
                  </svg>
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Weekday headers */}
      <div className={styles.weekdays}>
        {days.map((d, i) => <div key={i} className={styles.weekday}>{d}</div>)}
      </div>

      {/* Date grid */}
      <div className={styles.grid} role="grid" aria-label={`${months[month]} ${year}`}>
        {cells.map(({ date, adjacent }, idx) => {
          const sel     = isSelected(date);
          const todayD  = isToday(date);
          const dis     = isDisabled(date) || disabled;
          const inRange = isInRange(date);
          const rStart  = isRangeStart(date);
          const rEnd    = isRangeEnd(date);

          const wrapCls = [
            styles.cellWrapper,
            inRange ? styles.cellInRange   : '',
            rStart  ? styles.cellRangeStart : '',
            rEnd    ? styles.cellRangeEnd   : '',
          ].join(' ');

          const cellCls = [
            styles.cell,
            sel          ? styles.cellSelected  : '',
            todayD && !sel ? styles.cellToday   : '',
            adjacent     ? styles.cellAdjacent  : '',
            dis          ? styles.cellDisabled  : '',
          ].join(' ');

          return (
            <div key={idx} className={wrapCls} role="gridcell">
              <button
                type="button"
                className={cellCls}
                disabled={dis}
                aria-label={date.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' })}
                aria-selected={sel}
                tabIndex={dis ? -1 : 0}
                onClick={() => !dis && onDateClick(date)}
                onMouseEnter={() => onHover && onHover(date)}
                onMouseLeave={() => onLeave && onLeave()}
              >
                <span className={styles.cellInner}>{date.getDate()}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Date Input Field ───────────────────────────────────────────────────── */

function DateInputField({ label, value, placeholder, isRTL }) {
  return (
    <div className={styles.dateInput}>
      {label && <div className={styles.dateInputLabel}>{label}</div>}
      <div className={`${styles.dateInputBox} ${!value ? styles.dateInputBoxEmpty : ''}`}>
        <span className={value ? styles.dateInputValue : styles.dateInputPlaceholder}>
          {value ? formatLong(value) : placeholder}
        </span>
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────────────────── */

export function DatePicker({
  /* value */
  value,
  defaultValue,
  onChange,
  /* mode */
  mode            = 'single',  // 'single' | 'range'
  inline          = false,
  /* feature flags */
  showInputField  = false,     // show date display input(s) above calendar
  dualMonth       = false,     // show two calendar months side-by-side
  showQuickOptions = false,    // show quick-select shortcuts sidebar
  showSubmitButton = false,    // show Apply / Cancel action bar
  /* submit callbacks */
  onApply,
  onCancel,
  /* trigger field */
  label,
  helperText,
  errorMessage,
  placeholder,
  /* i18n */
  dir             = 'ltr',
  /* constraints */
  disabled        = false,
  readOnly        = false,
  minDate,
  maxDate,
}) {
  const isRTL    = dir === 'rtl';
  const isRange  = mode === 'range';
  const months   = isRTL ? MONTHS_AR : MONTHS_EN;
  const days     = isRTL ? DAYS_AR   : DAYS_EN;
  const quickOpts = isRTL ? QUICK_OPTIONS_AR : QUICK_OPTIONS_EN;
  const defaultPH = isRTL ? 'يوم/شهر/سنة' : 'DD/MM/YY';
  const triggerPH = placeholder ?? defaultPH;

  const today = stripTime(new Date());

  /* ── State ──────────────────────────────────────────────────────── */

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(() => defaultValue ? stripTime(defaultValue) : null);
  const selected = isControlled ? value : internal;

  // Range selection
  const [rangeStart,  setRangeStart]  = useState(null);
  const [rangeEnd,    setRangeEnd]    = useState(null);
  const [hovered,     setHovered]     = useState(null);
  const [activeQuick, setActiveQuick] = useState(null);

  // Pending state for submit-button mode
  const [pendingStart, setPendingStart] = useState(null);
  const [pendingEnd,   setPendingEnd]   = useState(null);

  // Calendar navigation
  const initRef = (isRange ? null : selected) ?? today;
  const [viewYear,  setViewYear]  = useState(initRef.getFullYear());
  const [viewMonth, setViewMonth] = useState(initRef.getMonth());

  // For dual-month: second calendar always shows next month
  const view2Month = viewMonth === 11 ? 0  : viewMonth + 1;
  const view2Year  = viewMonth === 11 ? viewYear + 1 : viewYear;

  // UI open/close state
  const [open,        setOpen]        = useState(inline);
  const [yearDDOpen,  setYearDDOpen]  = useState(false);
  const [yearDDOpen2, setYearDDOpen2] = useState(false);

  const containerRef = useRef(null);
  const triggerRef   = useRef(null);
  const panelRef     = useRef(null);

  useEffect(() => { setOpen(inline); }, [inline]);

  /* ── Click-outside ──────────────────────────────────────────────── */

  useEffect(() => {
    if (inline) return;
    function handle(e) {
      if (
        panelRef.current   && !panelRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
        setYearDDOpen(false);
        setYearDDOpen2(false);
      }
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [inline]);

  /* ── Navigation ─────────────────────────────────────────────────── */

  function prevMonth() {
    setViewMonth(m => {
      if (m === 0) { setViewYear(y => y - 1); return 11; }
      return m - 1;
    });
  }

  function nextMonth() {
    setViewMonth(m => {
      if (m === 11) { setViewYear(y => y + 1); return 0; }
      return m + 1;
    });
  }

  /* ── Date selection ──────────────────────────────────────────────── */

  function commitRange(start, end) {
    if (showSubmitButton) {
      setPendingStart(start);
      setPendingEnd(end);
    } else {
      setRangeStart(start);
      setRangeEnd(end);
      onChange?.([start, end]);
      if (!inline && end) setOpen(false);
    }
  }

  function handleDateClick(date) {
    if (disabled || readOnly) return;
    if (minDate && date < stripTime(minDate)) return;
    if (maxDate && date > stripTime(maxDate)) return;

    if (!isRange) {
      if (showSubmitButton) {
        setPendingStart(date);
      } else {
        if (!isControlled) setInternal(date);
        onChange?.(date);
        if (!inline) setOpen(false);
      }
    } else {
      const activeStart = showSubmitButton ? pendingStart : rangeStart;
      const activeEnd   = showSubmitButton ? pendingEnd   : rangeEnd;

      if (!activeStart || (activeStart && activeEnd)) {
        if (showSubmitButton) { setPendingStart(date); setPendingEnd(null); }
        else { setRangeStart(date); setRangeEnd(null); onChange?.([date, null]); }
        setActiveQuick(null);
      } else {
        const [s, e] = date < activeStart ? [date, activeStart] : [activeStart, date];
        commitRange(s, e);
        setActiveQuick(null);
      }
    }
  }

  function handleQuickOption(key) {
    const [s, e] = getQuickRange(key, today);
    setActiveQuick(key);
    if (showSubmitButton) {
      setPendingStart(s); setPendingEnd(e);
    } else {
      setRangeStart(s); setRangeEnd(e);
      onChange?.([s, e]);
    }
    // Navigate calendar to show start date
    setViewYear(s.getFullYear());
    setViewMonth(s.getMonth());
  }

  function handleApply() {
    if (!isRange) {
      if (pendingStart) {
        if (!isControlled) setInternal(pendingStart);
        onChange?.(pendingStart);
      }
    } else {
      if (pendingStart) {
        setRangeStart(pendingStart); setRangeEnd(pendingEnd);
        onChange?.([pendingStart, pendingEnd]);
      }
    }
    if (!inline) setOpen(false);
    onApply?.();
  }

  function handleCancel() {
    setPendingStart(null); setPendingEnd(null);
    setActiveQuick(null);
    if (!inline) setOpen(false);
    onCancel?.();
  }

  /* ── Cell classifiers ────────────────────────────────────────────── */

  const activeStart = showSubmitButton ? pendingStart : rangeStart;
  const activeEnd   = showSubmitButton ? pendingEnd   : rangeEnd;

  function isSelected(date) {
    if (isRange) return sameDay(date, activeStart) || sameDay(date, activeEnd);
    const sel = showSubmitButton ? pendingStart : selected;
    return sameDay(date, sel);
  }

  function isInRange(date) {
    if (!isRange || !activeStart) return false;
    const end = activeEnd ?? hovered;
    if (!end) return false;
    const [s, e] = activeStart <= end ? [activeStart, end] : [end, activeStart];
    return date > s && date < e;
  }

  function isRangeStartFn(date) { return isRange && sameDay(date, activeStart); }
  function isRangeEndFn(date)   { return isRange && sameDay(date, activeEnd); }
  function isTodayFn(date)      { return sameDay(date, today); }
  function isDisabledFn(date) {
    if (minDate && date < stripTime(minDate)) return true;
    if (maxDate && date > stripTime(maxDate)) return true;
    return false;
  }

  /* ── Trigger display ─────────────────────────────────────────────── */

  const triggerDisplay = isRange
    ? (rangeStart ? `${formatShort(rangeStart)}${rangeEnd ? '  —  ' + formatShort(rangeEnd) : ''}` : '')
    : formatShort(selected);

  const hasError = !!errorMessage;
  const yearRange = Array.from({ length: 16 }, (_, i) => viewYear - 5 + i);

  const cells1 = getCalendarDays(viewYear,  viewMonth);
  const cells2 = getCalendarDays(view2Year, view2Month);

  /* ── Panel layout classes ────────────────────────────────────────── */

  const panelCls = [
    styles.panel,
    inline ? styles.panelInline : styles.panelDropdown,
    dualMonth ? styles.panelDual : '',
    showQuickOptions ? styles.panelWithQuick : '',
  ].join(' ');

  /* ── Render ──────────────────────────────────────────────────────── */

  return (
    <div ref={containerRef} className={`${styles.root} ${isRTL ? styles.rtl : ''}`} dir={dir}>

      {/* ── Trigger field ──────────────────────────────────────────── */}
      {!inline && (
        <div className={styles.fieldWrapper}>
          {label && <label className={styles.label}>{label}</label>}
          <button
            ref={triggerRef}
            type="button"
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => { if (!disabled && !readOnly) setOpen(o => !o); }}
            className={[
              styles.trigger,
              hasError  ? styles.triggerError    : '',
              disabled  ? styles.triggerDisabled  : '',
              readOnly  ? styles.triggerReadonly  : '',
            ].join(' ')}
          >
            <span className={`${styles.triggerText} ${!triggerDisplay ? styles.triggerPlaceholder : ''}`}>
              {triggerDisplay || triggerPH}
            </span>
            <span className={styles.calendarIcon} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1.5" y="3.5" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25"/>
                <path d="M1.5 7h13" stroke="currentColor" strokeWidth="1.25"/>
                <path d="M5 1.5v3M11 1.5v3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
              </svg>
            </span>
          </button>
          {hasError && <div className={styles.errorMsg}>{errorMessage}</div>}
          {!hasError && helperText && <div className={styles.helperText}>{helperText}</div>}
        </div>
      )}

      {/* ── Calendar panel ─────────────────────────────────────────── */}
      {(inline || open) && (
        <div ref={panelRef} role="dialog" aria-label={isRTL ? 'منتقي التاريخ' : 'Date picker'} className={panelCls}>

          {/* Top: quick options (start) + calendar area */}
          <div className={styles.panelBody}>

            {/* Quick options sidebar — rendered first so it sits on the
                inline-start edge: left in LTR, right in RTL */}
            {showQuickOptions && (
              <div className={styles.quickOptions} role="region" aria-label={isRTL ? 'اختصارات' : 'Shortcuts'}>
                <div className={styles.quickOptionsLabel}>{isRTL ? 'اختصارات' : 'Shortcuts'}</div>
                {quickOpts.map(({ key, label: optLabel }) => (
                  <button
                    key={key}
                    type="button"
                    className={`${styles.quickOption} ${activeQuick === key ? styles.quickOptionActive : ''}`}
                    onClick={() => handleQuickOption(key)}
                  >
                    {optLabel}
                  </button>
                ))}
              </div>
            )}

            {/* Calendar & input column */}
            <div className={styles.calendarArea}>

              {/* Input field row */}
              {showInputField && (
                <div className={styles.inputRow}>
                  {isRange ? (
                    <>
                      <DateInputField
                        label={isRTL ? 'من' : 'From'}
                        value={activeStart}
                        placeholder={isRTL ? 'يوم/شهر/سنة' : 'Month DD, YYYY'}
                        isRTL={isRTL}
                      />
                      <div className={styles.inputSeparator}>—</div>
                      <DateInputField
                        label={isRTL ? 'إلى' : 'To'}
                        value={activeEnd}
                        placeholder={isRTL ? 'يوم/شهر/سنة' : 'Month DD, YYYY'}
                        isRTL={isRTL}
                      />
                    </>
                  ) : (
                    <DateInputField
                      label={isRTL ? 'التاريخ' : 'Date'}
                      value={showSubmitButton ? pendingStart : selected}
                      placeholder={isRTL ? 'يوم/شهر/سنة' : 'Month DD, YYYY'}
                      isRTL={isRTL}
                    />
                  )}
                </div>
              )}

              {/* Calendar(s) row */}
              <div className={styles.calendarsRow}>
                <CalendarGrid
                  year={viewYear} month={viewMonth}
                  months={months} days={days} isRTL={isRTL}
                  showPrev={true} showNext={!dualMonth}
                  onPrev={prevMonth} onNext={nextMonth}
                  yearDDOpen={yearDDOpen}
                  onYearDDToggle={() => setYearDDOpen(o => !o)}
                  yearRange={yearRange}
                  onYearSelect={y => { setViewYear(y); setYearDDOpen(false); }}
                  cells={cells1}
                  onDateClick={handleDateClick}
                  onHover={isRange ? setHovered : null}
                  onLeave={isRange ? () => setHovered(null) : null}
                  isSelected={isSelected}
                  isInRange={isInRange}
                  isRangeStart={isRangeStartFn}
                  isRangeEnd={isRangeEndFn}
                  isToday={isTodayFn}
                  isDisabled={isDisabledFn}
                  disabled={disabled}
                />

                {dualMonth && (
                  <CalendarGrid
                    year={view2Year} month={view2Month}
                    months={months} days={days} isRTL={isRTL}
                    showPrev={false} showNext={true}
                    onPrev={prevMonth} onNext={nextMonth}
                    yearDDOpen={yearDDOpen2}
                    onYearDDToggle={() => setYearDDOpen2(o => !o)}
                    yearRange={Array.from({ length: 16 }, (_, i) => view2Year - 5 + i)}
                    onYearSelect={y => {
                      // Back-calculate what main viewYear should be
                      if (viewMonth === 11) setViewYear(y - 1); else setViewYear(y);
                      setYearDDOpen2(false);
                    }}
                    cells={cells2}
                    onDateClick={handleDateClick}
                    onHover={isRange ? setHovered : null}
                    onLeave={isRange ? () => setHovered(null) : null}
                    isSelected={isSelected}
                    isInRange={isInRange}
                    isRangeStart={isRangeStartFn}
                    isRangeEnd={isRangeEndFn}
                    isToday={isTodayFn}
                    isDisabled={isDisabledFn}
                    disabled={disabled}
                  />
                )}
              </div>
            </div>

          </div>

          {/* Submit button action bar */}
          {showSubmitButton && (
            <div className={styles.actionsBar}>
              <div className={styles.actionsInner}>
                <button
                  type="button"
                  className={styles.btnCancel}
                  onClick={handleCancel}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="button"
                  className={styles.btnApply}
                  onClick={handleApply}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2.5 8.5L6 12L13.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {isRTL ? 'تأكيد' : 'Apply'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
