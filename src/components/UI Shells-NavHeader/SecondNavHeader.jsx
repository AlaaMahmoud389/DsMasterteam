import PropTypes from 'prop-types';
import { Icon } from '../icons/Icon';
import styles from './SecondNavHeader.module.css';

/* ── SecondNavHeader ──────────────────────────────────────────── */
/* Figma: node 5005:13162 — Secondary navigation bar displayed
   above the primary Nav Header. Shows contextual info items on
   one side and icon-only action buttons on the other.
   Icons (cloud-loading, mic-01, zoom-out-area, zoom-in-area)
   are sourced from the shared Icon registry (icons/Icon.jsx).
   Props mirror Figma component properties exactly.
   NOTE: Figma names this prop "style" — renamed to `variant`
   here to avoid shadowing React's reserved `style` prop.       */

export function SecondNavHeader({
  rtl         = false,
  variant     = 'Gray',
  showContent = true,
  showItem2   = true,
  showItem3   = true,
  showItem4   = true,
  showActions = true,
  showAction4 = true,
  showAction3 = true,
  showAction2 = true,
  showDivider = true,
}) {
  const isPrimary = variant === 'Primary';
  const iconColor = isPrimary ? '#F9FAFB' : '#000B36';

  const textClass = [
    styles.itemText,
    isPrimary ? styles.itemTextPrimary : styles.itemTextGray,
  ].join(' ');

  const btnClass = [
    styles.actionBtn,
    isPrimary ? styles.actionBtnPrimary : styles.actionBtnGray,
  ].join(' ');

  /* ── Single content item: [icon] + [label] ──────────────── */
  const renderItem = (label, labelAr) => (
    <div
      key={label}
      className={[styles.item, rtl ? styles.itemRtl : ''].filter(Boolean).join(' ')}
    >
      <span className={styles.itemIcon}>
        <Icon name="cloud-loading" size={24} color={iconColor} />
      </span>
      <span className={textClass} dir="auto">
        {rtl ? labelAr : label}
      </span>
    </div>
  );

  /* ── Content section ────────────────────────────────────── */
  const hasAnyContent = showContent || showItem2 || showItem3 || showItem4;
  const contentEl = hasAnyContent && (
    <div
      className={[
        styles.content,
        rtl ? styles.contentRtl : '',
      ].filter(Boolean).join(' ')}
    >
      {showContent && renderItem('Cloudy',     'غائم')}
      {showItem2   && renderItem('3-Sep-2024', '3-سبتمبر-2024')}
      {showItem3   && renderItem('2:30 PM',    '2:30 مساءً')}
      {showItem4   && renderItem('Al-Riyadh',  'الرياض')}
    </div>
  );

  /* ── Actions section ────────────────────────────────────── */
  const hasAnyAction = showAction4 || showAction3 || showAction2;
  const actionsEl = showActions && hasAnyAction && (
    <div className={styles.actions}>
      {showAction4 && (
        <button
          className={btnClass}
          type="button"
          aria-label={rtl ? 'تسجيل صوتي' : 'Record audio'}
        >
          <Icon name="mic-01" size={20} color={iconColor} />
        </button>
      )}
      {showAction3 && (
        <button
          className={btnClass}
          type="button"
          aria-label={rtl ? 'تصغير العرض' : 'Zoom out area'}
        >
          <Icon name="zoom-out-area" size={20} color={iconColor} />
        </button>
      )}
      {showAction2 && (
        <button
          className={btnClass}
          type="button"
          aria-label={rtl ? 'تكبير العرض' : 'Zoom in area'}
        >
          <Icon name="zoom-in-area" size={20} color={iconColor} />
        </button>
      )}
    </div>
  );

  /* ── RTL: actions left, content right
     LTR: content left, actions right               ── */
  return (
    <div
      className={[
        styles.root,
        isPrimary ? styles.rootPrimary : styles.rootGray,
      ].join(' ')}
    >
      <div className={styles.row}>
        {rtl ? (
          <>
            {actionsEl}
            {contentEl}
          </>
        ) : (
          <>
            {contentEl}
            {actionsEl}
          </>
        )}
      </div>

      {showDivider && (
        <div
          className={[
            styles.divider,
            isPrimary ? styles.dividerPrimary : styles.dividerGray,
          ].join(' ')}
        />
      )}
    </div>
  );
}

SecondNavHeader.propTypes = {
  rtl:         PropTypes.bool,
  /** Visual style — maps to Figma prop "style". Gray = white bg; Primary = blue (#1849a9) bg */
  variant:     PropTypes.oneOf(['Gray', 'Primary']),
  showContent: PropTypes.bool,
  showItem2:   PropTypes.bool,
  showItem3:   PropTypes.bool,
  showItem4:   PropTypes.bool,
  showActions: PropTypes.bool,
  showAction4: PropTypes.bool,
  showAction3: PropTypes.bool,
  showAction2: PropTypes.bool,
  showDivider: PropTypes.bool,
};
