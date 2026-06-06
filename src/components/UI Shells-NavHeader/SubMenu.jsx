import PropTypes from 'prop-types';
import styles from './SubMenu.module.css';

/* ── Exact Figma SVG paths (checkmark-square-02, Style=Stroke, Type=Rounded)
   Source: node 5005:4716 / assets bc4d525d / 16b1fced / 22b74547
   viewBox 0 0 20.5 20.5 — rendered at 24×24 via viewBox scaling         ── */

const CHECKMARK_PATH =
  'M14.8029 7.7568C15.0828 7.45146 15.0621 6.97703 14.7568 6.69714C14.4515 6.41724 13.977 6.43787 13.6971 6.74321L8.72644 12.1658L6.78033 10.2197C6.48744 9.92678 6.01256 9.92678 5.71967 10.2197C5.42678 10.5126 5.42678 10.9874 5.71967 11.2803L8.21967 13.7803C8.36432 13.925 8.56178 14.0043 8.76629 13.9998C8.97081 13.9954 9.16464 13.9076 9.30287 13.7568L14.8029 7.7568Z';

const SQUARE_PATH =
  'M10.3072 2.29058e-07H10.1928C8.00212 -1.31257e-05 6.28144 -2.37375e-05 4.93802 0.180594C3.56137 0.365681 2.46911 0.752715 1.61091 1.61091C0.752715 2.46911 0.365681 3.56137 0.180594 4.93802C-2.37375e-05 6.28144 -1.31257e-05 8.00212 2.29058e-07 10.1928V10.3072C-1.31257e-05 12.4979 -2.37375e-05 14.2186 0.180594 15.562C0.365681 16.9386 0.752715 18.0309 1.61091 18.8891C2.46911 19.7473 3.56137 20.1343 4.93802 20.3194C6.28144 20.5 8.0021 20.5 10.1928 20.5H10.3072C12.4979 20.5 14.2186 20.5 15.562 20.3194C16.9386 20.1343 18.0309 19.7473 18.8891 18.8891C19.7473 18.0309 20.1343 16.9386 20.3194 15.562C20.5 14.2186 20.5 12.4979 20.5 10.3072V10.1928C20.5 8.00214 20.5 6.28144 20.3194 4.93802C20.1343 3.56137 19.7473 2.46911 18.8891 1.61091C18.0309 0.752715 16.9386 0.365681 15.562 0.180594C14.2186 -2.37375e-05 12.4979 -1.31257e-05 10.3072 2.29058e-07ZM2.67157 2.67157C3.20462 2.13853 3.92757 1.82994 5.1379 1.66722C6.36979 1.50159 7.98963 1.5 10.25 1.5C12.5104 1.5 14.1302 1.50159 15.3621 1.66722C16.5724 1.82994 17.2954 2.13853 17.8284 2.67157C18.3615 3.20462 18.6701 3.92757 18.8328 5.1379C18.9984 6.36979 19 7.98963 19 10.25C19 12.5104 18.9984 14.1302 18.8328 15.3621C18.6701 16.5724 18.3615 17.2954 17.8284 17.8284C17.2954 18.3615 16.5724 18.6701 15.3621 18.8328C14.1302 18.9984 12.5104 19 10.25 19C7.98963 19 6.36979 18.9984 5.1379 18.8328C3.92757 18.6701 3.20462 18.3615 2.67157 17.8284C2.13853 17.2954 1.82994 16.5724 1.66722 15.3621C1.50159 14.1302 1.5 12.5104 1.5 10.25C1.5 7.98963 1.50159 6.36979 1.66722 5.1379C1.82994 3.92757 2.13853 3.20462 2.67157 2.67157Z';

export const CheckmarkSquareIcon = ({ color }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 20.5 20.5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path d={CHECKMARK_PATH} fill={color} />
    <path d={SQUARE_PATH} fillRule="evenodd" clipRule="evenodd" fill={color} />
  </svg>
);

CheckmarkSquareIcon.propTypes = { color: PropTypes.string.isRequired };

/* ── Icon colour rules (from Figma node 5005:4793)
   Simple icon  + Default bg  → #000B36
   Simple icon  + Dark green  → #F9FAFB
   Boxed icon   + Default bg  → #1849A9
   Boxed icon   + Dark green  → #F9FAFB              ── */

function iconColor({ isDark, isBoxed }) {
  if (isDark) return '#F9FAFB';
  if (isBoxed) return '#1849A9';
  return '#000B36';
}

/* ── SubMenu ──────────────────────────────────────────────── */

/**
 * Nav Header Sub-Menu panel (Figma node 5005:5487).
 * Drops below the top navigation bar to show grouped mega-menu links.
 *
 * RTL layout: content block renders before icon in DOM, item uses
 * justify-content: flex-end — matches Figma node 5005:4793 exactly.
 *
 * Interactive states (hover/active/focus-visible) are handled via CSS
 * pseudo-classes with label underline cascade.
 */
export function SubMenu({
  background = 'Default',
  linkStyle  = 'Text only',
  fullWidth  = false,
  rtl        = false,
  columns    = [],
}) {
  const isDark  = background === 'Dark green';
  const isBoxed = linkStyle  === 'Boxed icon';
  const hasIcon = linkStyle  === 'Simple icon' || isBoxed;
  const fill    = iconColor({ isDark, isBoxed });

  const renderIcon = () =>
    isBoxed ? (
      <span
        className={[
          styles.iconBoxed,
          isDark ? styles.iconBoxedDark : '',
        ].filter(Boolean).join(' ')}
      >
        <CheckmarkSquareIcon color={fill} />
      </span>
    ) : (
      <span className={styles.iconSimple}>
        <CheckmarkSquareIcon color={fill} />
      </span>
    );

  return (
    <div className={styles.subMenu}>
      <div
        className={[
          styles.panel,
          isDark    ? styles.panelDark      : '',
          fullWidth ? styles.panelFullWidth : '',
        ].filter(Boolean).join(' ')}
      >
        <div
          className={[
            styles.content,
            rtl ? styles.contentRtl : '',
          ].filter(Boolean).join(' ')}
        >
          {columns.map((col, ci) => (
            <div
              key={ci}
              className={[
                styles.column,
                rtl ? styles.columnRtl : '',
              ].filter(Boolean).join(' ')}
            >
              {/* ── Group label ── */}
              <div className={styles.groupLabelRow}>
                <p
                  className={[
                    styles.groupLabel,
                    isDark ? styles.groupLabelDark : '',
                    rtl    ? styles.groupLabelRtl  : '',
                  ].filter(Boolean).join(' ')}
                  dir="auto"
                >
                  {rtl ? col.labelAr : col.label}
                </p>
              </div>

              {/* ── Navigation items ── */}
              <div className={styles.itemsList}>
                {(col.items || []).map((item, ii) => (
                  <div
                    key={ii}
                    className={[
                      styles.item,
                      isDark ? styles.itemDark : '',
                      rtl    ? styles.itemRtl  : '',
                    ].filter(Boolean).join(' ')}
                    role="button"
                    tabIndex={0}
                  >
                    {rtl ? (
                      /* RTL: text block first (right side), icon second (left) */
                      <>
                        <div
                          className={[
                            styles.itemTextBlock,
                            styles.itemTextBlockRtl,
                          ].join(' ')}
                        >
                          <div
                            className={[
                              styles.textAndBadge,
                              styles.textAndBadgeRtl,
                            ].join(' ')}
                          >
                            <p
                              className={[
                                styles.itemLabel,
                                isDark ? styles.itemLabelDark : '',
                                styles.itemLabelRtl,
                              ].filter(Boolean).join(' ')}
                              dir="auto"
                            >
                              {item.textAr}
                            </p>
                          </div>
                          {item.helperTextAr && (
                            <p
                              className={[
                                styles.itemHelper,
                                isDark ? styles.itemHelperDark : '',
                                styles.itemHelperRtl,
                              ].filter(Boolean).join(' ')}
                              dir="auto"
                            >
                              {item.helperTextAr}
                            </p>
                          )}
                        </div>
                        {hasIcon && renderIcon()}
                      </>
                    ) : (
                      /* LTR: icon first, text block second */
                      <>
                        {hasIcon && renderIcon()}
                        <div className={styles.itemTextBlock}>
                          <div className={styles.textAndBadge}>
                            <p
                              className={[
                                styles.itemLabel,
                                isDark ? styles.itemLabelDark : '',
                              ].filter(Boolean).join(' ')}
                              dir="auto"
                            >
                              {item.text}
                            </p>
                          </div>
                          {item.helperText && (
                            <p
                              className={[
                                styles.itemHelper,
                                isDark ? styles.itemHelperDark : '',
                              ].filter(Boolean).join(' ')}
                              dir="auto"
                            >
                              {item.helperText}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

SubMenu.propTypes = {
  /** Panel background — `'Default'` (white) or `'Dark green'` (#102a56) */
  background: PropTypes.oneOf(['Default', 'Dark green']),
  /** Icon style — `'Text only'` | `'Simple icon'` | `'Boxed icon'` */
  linkStyle:  PropTypes.oneOf(['Text only', 'Simple icon', 'Boxed icon']),
  /** Expand panel to 1440 px max-width (true) or 1320 px (false) */
  fullWidth:  PropTypes.bool,
  /** RTL layout — physical CSS + DOM reorder; no `dir="rtl"` on containers */
  rtl:        PropTypes.bool,
  /**
   * Columns array.
   * `{ label, labelAr, items: [{ text, textAr, helperText, helperTextAr }] }`
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label:   PropTypes.string,
      labelAr: PropTypes.string,
      items:   PropTypes.arrayOf(
        PropTypes.shape({
          text:         PropTypes.string,
          textAr:       PropTypes.string,
          helperText:   PropTypes.string,
          helperTextAr: PropTypes.string,
        })
      ),
    })
  ),
};
