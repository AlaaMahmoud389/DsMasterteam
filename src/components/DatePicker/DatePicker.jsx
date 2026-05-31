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
        {isRTL && (
          <svg className={`${styles.chevron} ${isOpen ? styles.chevronUp : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        <span>{year}</span>
        {!isRTL && (
          <svg className={`${styles.chevron} ${isOpen ? styles.chevronUp : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
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
              {isRTL && y === year && <span className={styles.yearCheck} aria-hidden="true">✓</span>}
              <span>{y}</span>
              {!isRTL && y === year && <span className={styles.yearCheck} aria-hidden="true">✓</span>}
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
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
              {showNext && (
                <button type="button" className={styles.navBtn} onClick={onNext} aria-label="Next month">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
          </>
        )}
        {isRTL && (
          <>
            <div className={styles.headerNav}>
              {showPrev && (
                <button type="button" className={styles.navBtn} onClick={onPrev} aria-label="الشهر السابق">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
              {showNext && (
                <button type="button" className={styles.navBtn} onClick={onNext} aria-label="الشهر التالي">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
            <div className={styles.headerEnd}>
              <YearDropdown
                year={year} isOpen={yearDDOpen} isRTL={true}
                onClick={onYearDDToggle} yearRange={yearRange} onSelect={onYearSelect}
              />
              <span className={styles.monthLabel}>{months[month]}</span>
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

          {/* Top: calendar area + quick options */}
          <div className={styles.panelBody}>

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

            {/* Quick options sidebar */}
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
          </div>

          {/* Submit button action bar */}
          {showSubmitButton && (
            <div className={styles.actionsBar}>
              <div className={styles.actionsInner}>
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
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
