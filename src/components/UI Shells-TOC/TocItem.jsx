import PropTypes from 'prop-types';
import styles from './TocItem.module.css';

/**
 * TocItem — Masterteam Design System
 * Figma: node 5005:13372
 *
 * A navigational entry in a Table of Contents list.
 * Supports 3 heading levels, selected/unselected, four
 * interaction states, and full RTL (Arabic) layout.
 *
 * RTL is implemented via physical CSS mirroring (swapped padding +
 * indicator at right:0) — the container does NOT use dir="rtl" so
 * that flex alignment properties (items-start/end) resolve to
 * physical left/right, matching the Figma layout exactly.
 */
export function TocItem({
  level,
  rtl,
  selected,
  state,
  textAr,
  textEn,
  style,
}) {
  const isHovered = state === 'Hovered';
  const isPressed = state === 'Pressed';
  const isFocused = state === 'Focused';
  const isActive  = isHovered || isPressed;

  /* ── Root container ── */
  const itemClass = [
    styles.item,
    rtl       ? styles.itemRtl : '',
    isHovered ? styles.hovered : '',
    isPressed ? styles.pressed : '',
    isFocused ? styles.focused : '',
  ].filter(Boolean).join(' ');

  /* ── Text wrapper (div) ── */
  const textWrapClass = [
    styles.textWrap,
    rtl ? styles.textWrapRtl : '',
  ].filter(Boolean).join(' ');

  /* ── Text <p> ── */
  const textClass = [
    styles.text,
    selected           ? styles.textSelected   : styles.textUnselected,
    !selected && isActive ? styles.textActive  : '',
  ].filter(Boolean).join(' ');

  /* ── Selection indicator ──
     Figma rules:
       focused + selected   → empty invisible div at -2px border offsets
       focused + unselected → nothing
       hovered/pressed (any selection) + non-focused → colored bar
       default + selected   → colored bar
       default + unselected → nothing
  */
  let indicator = null;
  if (isFocused && selected) {
    /* Empty placeholder — covers the border inset area, no visible bg */
    indicator = (
      <div
        className={[
          styles.indicatorFocused,
          rtl ? styles.indicatorFocusedRtl : '',
        ].filter(Boolean).join(' ')}
      />
    );
  } else if (!isFocused && (selected || isActive)) {
    indicator = (
      <div className={[
        styles.indicator,
        rtl ? styles.indicatorRtl : '',
      ].filter(Boolean).join(' ')}>
        <div className={[
          styles.bar,
          selected ? styles.barSelected : styles.barUnselected,
        ].join(' ')} />
      </div>
    );
  }

  /* ── Nesting indent bars ──
     Level 2 → 1 bar, Level 3 → 2 bars
     LTR: bars come before tab title in DOM (appear on left)
     RTL: bars come after  tab title in DOM (appear on right, because
          the container flex is still LTR — physical mirroring)
  */
  const nestingCount =
    level === 'Level 2 (H3)' ? 1 :
    level === 'Level 3 (H4)' ? 2 : 0;

  const nestingIndicatorClass = [
    styles.nestingIndicator,
    rtl ? styles.nestingIndicatorRtl : '',
  ].filter(Boolean).join(' ');

  const nestingBars = nestingCount > 0 && (
    Array.from({ length: nestingCount }).map((_, i) => (
      <div key={i} className={styles.nestingWrap}>
        <div className={nestingIndicatorClass}>
          <div className={styles.nestingBar} />
        </div>
      </div>
    ))
  );

  const text = rtl ? textAr : textEn;

  return (
    /* No dir="rtl" on container — RTL is purely physical CSS mirroring */
    <div className={itemClass} style={style} role="listitem" tabIndex={0}>

      {/* Nesting bars: left of text (LTR) */}
      {!rtl && nestingBars}

      {/* Tab title */}
      <div className={styles.tabTitle}>
        <div className={textWrapClass}>
          <p className={textClass} dir={rtl ? 'auto' : undefined}>
            {text}
          </p>
        </div>
      </div>

      {/* Nesting bars: right of text (RTL) */}
      {rtl && nestingBars}

      {/* Selection / focus indicator */}
      {indicator}
    </div>
  );
}

TocItem.propTypes = {
  level:    PropTypes.oneOf(['Level 1 (H2)', 'Level 2 (H3)', 'Level 3 (H4)']),
  rtl:      PropTypes.bool,
  selected: PropTypes.bool,
  state:    PropTypes.oneOf(['Default', 'Hovered', 'Pressed', 'Focused']),
  textAr:   PropTypes.string,
  textEn:   PropTypes.string,
  style:    PropTypes.object,
};

TocItem.defaultProps = {
  level:    'Level 1 (H2)',
  rtl:      false,
  selected: true,
  state:    'Default',
  textAr:   'قسم صفحة',
  textEn:   'Page Section',
};
