import PropTypes from 'prop-types';
import styles from './Footer.module.css';

/* ── Arrow-right-02-sharp icon (Figma: social / accessibility action buttons)
   Square linecaps distinguish the "sharp" variant from the rounded registry icons ── */
const ArrowRightSharpIcon = ({ color = '#1F2A37', size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M5 12H19M13 6L19 12L13 18"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);
ArrowRightSharpIcon.propTypes = { color: PropTypes.string, size: PropTypes.number };

/* ── Static data ────────────────────────────────────────────── */

const LINK_GROUPS = [
  { en: 'Group Label', ar: 'عنوان مجموعة' },
  { en: 'Group Label', ar: 'عنوان مجموعة' },
  { en: 'Group Label', ar: 'عنوان مجموعة' },
  { en: 'Group Label', ar: 'عنوان مجموعة' },
  { en: 'Group Label', ar: 'عنوان مجموعة' },
];

const LEGAL_LINKS = Array.from({ length: 8 }, () => ({
  en: 'Footer Link',
  ar: 'رابط الجزء السفلي',
}));

/* ── Footer ────────────────────────────────────────────────── */
/* Figma: node 5005:14313 — Full-width site footer.
   Displays a nav-links section (5 column groups + social/accessibility
   icon buttons) above a legal bar with links, copyright, and logos.
   RTL: DOM order is swapped for logo/legal; groups align to flex-end.
   Props mirror Figma component properties; `variant` replaces the
   Figma "style" prop to avoid the React reserved prop `style`.      */

export function Footer({
  rtl          = false,
  variant      = 'Default',
  showNavLinks = true,
}) {
  const isPrimary = variant === 'Primary';
  const iconColor = isPrimary ? '#F9FAFB' : '#1F2A37';

  /* ── Shared class helper ────────────────────────────────── */
  const cl = (...names) => names.filter(Boolean).join(' ');

  const textCl   = cl(isPrimary ? styles.textOnColor  : styles.textDefault);
  const linkCl   = cl(isPrimary ? styles.linkOnColor  : styles.linkDefault);
  const divCl    = cl(styles.divider, isPrimary ? styles.dividerOnColor : styles.dividerDefault);
  const btnCl    = cl(styles.iconBtn, isPrimary ? styles.iconBtnPrimary : styles.iconBtnDefault);
  const copyrCl  = cl(styles.copyright, isPrimary ? styles.textOnColor : styles.textDefault);
  const logoTxCl = cl(styles.logoText, isPrimary ? styles.logoTextPrimary : '');

  /* ── Single logo placeholder ───────────────────────────── */
  const LogoItem = () => (
    <div className={styles.logoItem}>
      <svg
        className={cl(styles.logoImg, isPrimary ? styles.logoImgPrimary : '')}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="1" y="1" width="30" height="30" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M16 8v10M13 11c1-1 2.2-1.5 3-1.5s2 .5 3 1.5M11 23l5-3.5 5 3.5M9 23h14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={logoTxCl} dir="auto">
        {rtl ? 'شعار المنصة' : 'Platform Logo'}
      </span>
    </div>
  );

  /* ── Standard link group (label + divider + 5 links) ─────── */
  const renderLinkGroup = (labelEn, labelAr, key) => (
    <div
      key={key}
      className={cl(styles.linkGroup, rtl ? styles.linkGroupRtl : '')}
    >
      <span className={cl(textCl, styles.groupLabel)} dir="auto">
        {rtl ? labelAr : labelEn}
      </span>
      <div className={divCl} />
      <div className={styles.linkList}>
        {Array.from({ length: 5 }, (_, i) => (
          <a key={i} href="#" className={cl(linkCl, styles.footerLink)} dir="auto">
            {rtl ? 'رابط الجزء السفلي' : 'Footer Link'}
          </a>
        ))}
      </div>
    </div>
  );

  /* ── Special group: Social + Accessibility icon buttons ─── */
  const specialGroup = (
    <div className={cl(styles.specialGroup, rtl ? styles.specialGroupRtl : '')}>
      <div className={cl(styles.specialSubGroup, rtl ? styles.specialSubGroupRtl : '')}>
        <span className={cl(textCl, styles.groupLabel)} dir="auto">
          {rtl ? 'تواصل معنا' : 'Social Media'}
        </span>
        <div className={divCl} />
        <div className={styles.btnRow}>
          {Array.from({ length: 4 }, (_, i) => (
            <button
              key={i}
              className={btnCl}
              type="button"
              aria-label={rtl ? 'وسائل التواصل الاجتماعي' : 'Social media'}
            >
              <ArrowRightSharpIcon color={iconColor} size={16} />
            </button>
          ))}
        </div>
      </div>

      <div className={cl(styles.specialSubGroup, rtl ? styles.specialSubGroupRtl : '')}>
        <span className={cl(textCl, styles.groupLabel)} dir="auto">
          {rtl ? 'أدوات الإتاحة والوصول' : 'Accessibility Tools'}
        </span>
        <div className={divCl} />
        <div className={styles.btnRow}>
          {Array.from({ length: 3 }, (_, i) => (
            <button
              key={i}
              className={btnCl}
              type="button"
              aria-label={rtl ? 'أداة الإتاحة' : 'Accessibility tool'}
            >
              <ArrowRightSharpIcon color={iconColor} size={16} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── Legal section ─────────────────────────────────────── */
  const legalContent = (
    <div className={cl(styles.legalContent, rtl ? styles.legalContentRtl : '')}>
      <div className={cl(styles.legalLinks, rtl ? styles.legalLinksRtl : '')}>
        {LEGAL_LINKS.map((link, i) => (
          <a key={i} href="#" className={cl(linkCl, styles.legalLink)} dir="auto">
            {rtl ? link.ar : link.en}
          </a>
        ))}
      </div>

      <div className={cl(styles.legalBottom, rtl ? styles.legalBottomRtl : '')}>
        <span className={copyrCl} dir="auto">
          {rtl
            ? 'جميع الحقوق محفوظة لهيئة الحكومة الرقمية © 2024'
            : 'All Right Reserved For Digital Government Authority © 2024'}
        </span>
        <div className={cl(styles.termsLinks, rtl ? styles.termsLinksRtl : '')}>
          <a href="#" className={linkCl} dir="auto">{rtl ? 'الشروط والأحكام' : 'Terms and Conditions'}</a>
          <a href="#" className={linkCl} dir="auto">{rtl ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
        </div>
      </div>
    </div>
  );

  /* ── Logo block ─────────────────────────────────────────── */
  /* RTL: DOM order swapped so logos appear on the LEFT side.
     No flex-direction override needed — space-between does the rest. */
  const logoBlock = (
    <div className={styles.logoBlock}>
      <LogoItem />
      <LogoItem />
    </div>
  );

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <footer
      className={cl(styles.root, isPrimary ? styles.rootPrimary : styles.rootDefault)}
    >
      <div className={styles.inner}>
        {showNavLinks && (
          <div className={cl(styles.navLinks, rtl ? styles.navLinksRtl : '')}>
            {LINK_GROUPS.map((g, i) => renderLinkGroup(g.en, g.ar, i))}
            {specialGroup}
          </div>
        )}

        <div
          className={cl(
            styles.sectionDivider,
            isPrimary ? styles.dividerOnColor : styles.dividerDefault,
          )}
        />

        {/* RTL: logos first in DOM → LEFT. LTR: legal first → LEFT. */}
        <div className={styles.legalRow}>
          {rtl ? (
            <>{logoBlock}{legalContent}</>
          ) : (
            <>{legalContent}{logoBlock}</>
          )}
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  rtl:          PropTypes.bool,
  /** Visual style — maps to Figma prop "style". Default = light bg; Primary = blue (#1849a9) bg */
  variant:      PropTypes.oneOf(['Default', 'Primary']),
  showNavLinks: PropTypes.bool,
};
