import PropTypes from 'prop-types';
import styles from './Toc.module.css';
import { TocItem } from './TocItem';

/**
 * Toc — Table of Contents panel — Masterteam Design System
 * Figma: node 5005:13679
 *
 * Full TOC panel with a page-name header ("On this page" + title)
 * and a scrollable list of TocItem navigational entries.
 *
 * Items are rendered at full panel width (222px) instead of the
 * standalone TocItem width (200px), matching the Figma layout.
 */
export function Toc({
  rtl,
  pageName,
  pageNameAr,
  items,
}) {
  const containerClass = [
    styles.toc,
    rtl ? styles.tocRtl : '',
  ].filter(Boolean).join(' ');

  const sectionClass = [
    styles.pageNameSection,
    rtl ? styles.pageNameSectionRtl : '',
  ].filter(Boolean).join(' ');

  const listClass = [
    styles.itemsList,
    rtl ? styles.itemsListRtl : '',
  ].filter(Boolean).join(' ');

  const label = rtl ? 'في هذه الصفحة' : 'On this page';
  const title = rtl ? pageNameAr : pageName;

  return (
    <div className={containerClass}>

      {/* ── Page name header ── */}
      <div className={sectionClass}>
        <div className={styles.pageLabel}>
          <p className={styles.pageLabelText} dir={rtl ? 'auto' : undefined}>
            {label}
          </p>
        </div>
        <div className={styles.pageTitle}>
          <p className={styles.pageTitleText} dir={rtl ? 'auto' : undefined}>
            {title}
          </p>
        </div>
      </div>

      {/* ── TOC Items list ── */}
      {/* Items stretch to full panel width via style override */}
      <div className={listClass}>
        {items.map((item, i) => (
          <TocItem
            key={i}
            level={item.level}
            selected={item.selected}
            state={item.state || 'Default'}
            rtl={rtl}
            textEn={item.textEn}
            textAr={item.textAr}
            style={{ width: '100%', minWidth: 140 }}
          />
        ))}
      </div>

    </div>
  );
}

Toc.propTypes = {
  rtl:        PropTypes.bool,
  pageName:   PropTypes.string,
  pageNameAr: PropTypes.string,
  items:      PropTypes.arrayOf(PropTypes.shape({
    level:    PropTypes.oneOf(['Level 1 (H2)', 'Level 2 (H3)', 'Level 3 (H4)']),
    selected: PropTypes.bool,
    state:    PropTypes.oneOf(['Default', 'Hovered', 'Pressed', 'Focused']),
    textEn:   PropTypes.string,
    textAr:   PropTypes.string,
  })),
};

Toc.defaultProps = {
  rtl:        false,
  pageName:   '[Page Name]',
  pageNameAr: '[اسم الصفحة]',
  items:      [],
};
