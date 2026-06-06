import PropTypes from 'prop-types';
import styles from './NavDrawer.module.css';

/* ── home-05 icon (Figma 5005:10397) — 16×16 house fill ── */
const HomeIcon = ({ color = '#000B36' }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 14.3333 13.6667"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M6.5 10.1667C6.5 9.79848 6.79848 9.5 7.16667 9.5H7.17265C7.54084 9.5 7.83932 9.79848 7.83932 10.1667C7.83932 10.5349 7.54084 10.8333 7.17265 10.8333H7.16667C6.79848 10.8333 6.5 10.5349 6.5 10.1667Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.33333 5.72699L0.846055 6.19423C0.646737 6.38535 0.330224 6.37871 0.139104 6.17939C-0.0520167 5.98007 -0.0453711 5.66356 0.153947 5.47244L3.0761 2.67047C3.94231 1.83987 4.62882 1.18159 5.23828 0.73571C5.86632 0.276236 6.46744 0 7.16667 0C7.8659 0 8.46701 0.276236 9.09506 0.73571C9.70452 1.18159 10.391 1.83987 11.2572 2.67048L14.1794 5.47244C14.3787 5.66356 14.3854 5.98007 14.1942 6.17939C14.0031 6.37871 13.6866 6.38535 13.4873 6.19423L13 5.72699V7.87094C13 9.0961 13 10.0665 12.8979 10.826C12.7928 11.6076 12.5714 12.2403 12.0725 12.7392C11.5736 13.2381 10.941 13.4595 10.1593 13.5646C9.39988 13.6667 8.42947 13.6667 7.20431 13.6667H7.12906C5.9039 13.6667 4.93346 13.6667 4.17399 13.5646C3.39237 13.4595 2.75974 13.2381 2.26083 12.7392C1.76192 12.2403 1.54051 11.6076 1.43542 10.826C1.33331 10.0665 1.33332 9.09612 1.33333 7.87095L1.33333 5.72699ZM3.74149 3.41788C4.64042 2.55592 5.27941 1.94466 5.82873 1.54278C6.36571 1.14993 6.76133 1 7.16667 1C7.57201 1 7.96762 1.14993 8.50461 1.54278C9.05392 1.94466 9.69291 2.55592 10.5918 3.41789L12 4.76812V7.83333C12 9.10455 11.9989 10.0077 11.9068 10.6928C11.8167 11.3635 11.6475 11.7499 11.3654 12.0321C11.0833 12.3142 10.6968 12.4833 10.0261 12.5735C9.34099 12.6656 8.43788 12.6667 7.16667 12.6667C5.89545 12.6667 4.99234 12.6656 4.30723 12.5735C3.63651 12.4833 3.25008 12.3142 2.96794 12.0321C2.6858 11.7499 2.51668 11.3635 2.42651 10.6928C2.3344 10.0077 2.33333 9.10455 2.33333 7.83333V4.76812L3.74149 3.41788Z"
      fill={color}
    />
  </svg>
);

HomeIcon.propTypes = { color: PropTypes.string };

/* ── Arrow-down-01 (Figma 2078:24098) — 16×16 chevron ── */
const ChevronDownIcon = ({ color = '#000B36', rotated = false }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    style={{
      transform: rotated ? 'rotate(180deg)' : 'none',
      transition: 'transform 0.2s ease',
    }}
  >
    <path
      d="M3.5 6L8 10.5L12.5 6"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

ChevronDownIcon.propTypes = { color: PropTypes.string, rotated: PropTypes.bool };

/* ── External link icon — 16×16 ── */
const ExternalLinkIcon = ({ color = '#000B36' }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M6.5 3.5H3C2.72386 3.5 2.5 3.72386 2.5 4V13C2.5 13.2761 2.72386 13.5 3 13.5H12C12.2761 13.5 12.5 13.2761 12.5 13V9.5"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M9.5 2.5H13.5V6.5M13.5 2.5L7.5 8.5"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

ExternalLinkIcon.propTypes = { color: PropTypes.string };

/* ── Logo mark — Figma 5024:15662 (4-pointed sparkle star) ── */
const LogoMarkIcon = ({ size = 18, color = '#1849A9' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 17.6171 17.6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M11.1484 0C11.1131 0.0131298 11.082 0.035397 11.0581 0.0645246C11.0342 0.0936523 11.0185 0.128595 11.0126 0.165781C10.7617 0.885166 10.4599 1.59706 10.1495 2.30682C9.63506 3.54804 9.01695 4.74368 8.3017 5.88107C7.85591 6.56323 7.31343 7.12325 6.52731 7.39706C6.26933 7.4869 6.01285 7.59087 5.75401 7.67108C4.18755 8.12661 2.58643 8.45314 0.966679 8.64737C0.640733 8.67365 0.31745 8.7263 9.95893e-06 8.80481C0.0552869 8.82653 0.112049 8.84426 0.169857 8.85786C0.95641 8.93744 1.72413 9.06472 2.48266 9.21253C3.63672 9.43735 4.77516 9.69511 5.78846 10.1867C6.03533 10.2951 6.25128 10.4634 6.41678 10.6763C6.58227 10.8892 6.69209 11.14 6.7363 11.406C6.83154 11.9283 6.87979 12.458 6.88048 12.9889C6.88018 14.461 6.76813 15.931 6.54527 17.3861C6.53479 17.4575 6.50057 17.5418 6.58442 17.6C6.60988 17.5405 6.6287 17.5022 6.64389 17.4633C7.04005 16.4507 7.44606 15.4397 7.91367 14.439C8.3789 13.3809 8.94103 12.3682 9.59287 11.4137C9.99453 10.843 10.5622 10.4098 11.2186 10.173C13.012 9.49746 14.7961 9.23349 16.5803 8.96589C16.9226 8.91434 17.2648 8.8769 17.6088 8.83241L17.6171 8.76524C17.1322 8.69337 16.644 8.62855 16.1625 8.54791C14.8373 8.35569 13.534 8.03407 12.2715 7.58766C11.4015 7.25738 10.9166 6.65736 10.8654 5.69347C10.8622 5.63165 10.855 5.57133 10.8494 5.50972C10.7251 4.1009 10.8494 2.63967 11.0092 1.17138C11.0518 0.785697 11.101 0.398731 11.1484 0Z"
      fill={color}
    />
  </svg>
);

/* ── Sidebar-left icon — Figma 4075:166693 (panel + divider + chevron) ── */
const SidebarLeftIcon = ({ color = '#000B36' }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 25.5 23.1"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    {/* Outer panel rectangle */}
    <path
      d="M0.75 11.55C0.75 7.05032 0.75 4.80048 1.8959 3.22329C2.26598 2.71392 2.71392 2.26598 3.22329 1.8959C4.80048 0.75 7.05032 0.75 11.55 0.75H13.95C18.4497 0.75 20.6995 0.75 22.2767 1.8959C22.7861 2.26598 23.234 2.71392 23.6041 3.22329C24.75 4.80048 24.75 7.05032 24.75 11.55C24.75 16.0497 24.75 18.2995 23.6041 19.8767C23.234 20.3861 22.7861 20.834 22.2767 21.2041C20.6995 22.35 18.4497 22.35 13.95 22.35H11.55C7.05032 22.35 4.80048 22.35 3.22329 21.2041C2.71392 20.834 2.26598 20.3861 1.8959 19.8767C0.75 18.2995 0.75 16.0497 0.75 11.55Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Left panel vertical divider */}
    <path
      d="M9.75 1.35L9.75 21.75"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Left panel content lines */}
    <path
      d="M4.35 5.55C4.35 5.55 5.44706 5.55 6.15 5.55"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.35 10.35H6.15"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Right panel chevron (collapse arrow) */}
    <path
      d="M18.75 9.15L17.2782 10.4186C16.6594 10.952 16.35 11.2186 16.35 11.55C16.35 11.8814 16.6594 12.148 17.2782 12.6814L18.75 13.95"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

SidebarLeftIcon.propTypes = { color: PropTypes.string };

/* ── Icon colour helper ── */
function iconColor({ onColor, selected, disabled }) {
  if (disabled) return '#9DA4AE';
  if (onColor)  return '#F9FAFB';
  if (selected) return '#1849A9';
  return '#000B36';
}

/* ── NavDrawerItem ────────────────────────────────────────── */
export function NavDrawerItem({
  label        = 'Link',
  labelAr      = 'رابط',
  type         = 'link',
  level        = 1,
  state        = 'Default',
  rtl          = false,
  full         = true,
  onColor      = false,
  badge        = false,
  badgeCount   = '+99',
  expanded     = false,
  externalLink = false,
  icon         = true,
}) {
  const isHovered  = state === 'Hovered';
  const isPressed  = state === 'Pressed';
  const isFocused  = state === 'Focused';
  const isSelected = state === 'Selected';
  const isDisabled = state === 'Disabled';

  const ic = iconColor({ onColor, selected: isSelected, disabled: isDisabled });

  /* ── Item class list ── */
  const itemClasses = [
    styles.item,
    full ? styles.itemFull : styles.itemIcon,
    level === 2 ? (rtl ? styles.itemLevel2Rtl : styles.itemLevel2) : '',
    onColor   ? styles.itemOnColor  : '',
    isHovered  ? styles.itemHovered  : '',
    isPressed  ? styles.itemPressed  : '',
    isFocused  ? styles.itemFocused  : '',
    isSelected ? styles.itemSelected : '',
    isDisabled ? styles.itemDisabled : '',
    rtl        ? styles.itemRtl      : '',
  ].filter(Boolean).join(' ');

  /* ── Label class list ── */
  const labelClasses = [
    styles.label,
    level === 2    ? styles.labelLevel2   : '',
    isSelected     ? styles.labelSelected : '',
    isDisabled     ? styles.labelDisabled : '',
    onColor        ? styles.labelOnColor  : '',
  ].filter(Boolean).join(' ');

  /* ── Icon-only variant (full=false) ── */
  if (!full) {
    return (
      <button
        className={itemClasses}
        disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        type="button"
        aria-label={rtl ? labelAr : label}
      >
        {isSelected && <span className={styles.indicator} />}
        {isHovered && !isSelected && (
          <span className={[styles.indicator, styles.indicatorHover].join(' ')} />
        )}
        <span className={styles.iconWrap}>
          <HomeIcon color={ic} />
        </span>
      </button>
    );
  }

  /* ── Full variant ── */
  return (
    <button
      className={itemClasses}
      disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      type="button"
    >
      {/* Left-edge indicator: selected = blue, hovered = gray */}
      {isSelected && <span className={styles.indicator} />}
      {isHovered && !isSelected && (
        <span className={[styles.indicator, styles.indicatorHover].join(' ')} />
      )}

      {/* Leading icon — only Level 1 items */}
      {icon && level === 1 && (
        <span className={styles.iconWrap}>
          <HomeIcon color={ic} />
        </span>
      )}

      {/* Label */}
      <span className={labelClasses} dir="auto">
        {rtl ? labelAr : label}
      </span>

      {/* Trailing: chevron for Parent, external-link icon for L2, badge */}
      {type === 'parent' && level === 1 && (
        <span className={styles.chevron}>
          <ChevronDownIcon color={ic} rotated={expanded} />
        </span>
      )}

      {type === 'link' && level === 2 && externalLink && (
        <span className={styles.externalIcon}>
          <ExternalLinkIcon color={ic} />
        </span>
      )}

      {badge && (
        <span className={[styles.badge, onColor ? styles.badgeOnColor : ''].filter(Boolean).join(' ')}>
          <span className={[styles.badgeText, onColor ? styles.badgeTextOnColor : ''].filter(Boolean).join(' ')}>
            {badgeCount}
          </span>
        </span>
      )}
    </button>
  );
}

NavDrawerItem.propTypes = {
  label:        PropTypes.string,
  labelAr:      PropTypes.string,
  type:         PropTypes.oneOf(['link', 'parent']),
  level:        PropTypes.oneOf([1, 2]),
  state:        PropTypes.oneOf(['Default', 'Hovered', 'Pressed', 'Focused', 'Selected', 'Disabled']),
  rtl:          PropTypes.bool,
  full:         PropTypes.bool,
  onColor:      PropTypes.bool,
  badge:        PropTypes.bool,
  badgeCount:   PropTypes.string,
  expanded:     PropTypes.bool,
  externalLink: PropTypes.bool,
  icon:         PropTypes.bool,
};

/* ── NavDrawer container ──────────────────────────────────── */
export function NavDrawer({
  items   = [],
  rtl     = false,
  onColor = false,
  full    = true,
}) {
  return (
    <nav
      className={[styles.drawer, onColor ? styles.drawerOnColor : ''].filter(Boolean).join(' ')}
      aria-label={rtl ? 'قائمة التصفح الجانبية' : 'Navigation drawer'}
    >
      <ul className={styles.drawerList}>
        {items.map((item, i) => (
          <li key={item.label || String(i)}>
            <NavDrawerItem
              label={item.label}
              labelAr={item.labelAr}
              type={item.type || 'link'}
              level={item.level || 1}
              state={item.state || 'Default'}
              rtl={rtl}
              full={full}
              onColor={onColor}
              badge={item.badge || false}
              badgeCount={item.badgeCount || '+99'}
              expanded={item.expanded || false}
              externalLink={item.externalLink || false}
              icon={item.icon !== undefined ? item.icon : true}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

NavDrawer.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label:        PropTypes.string,
      labelAr:      PropTypes.string,
      type:         PropTypes.oneOf(['link', 'parent']),
      level:        PropTypes.oneOf([1, 2]),
      state:        PropTypes.string,
      badge:        PropTypes.bool,
      badgeCount:   PropTypes.string,
      expanded:     PropTypes.bool,
      externalLink: PropTypes.bool,
      icon:         PropTypes.bool,
    })
  ),
  rtl:     PropTypes.bool,
  onColor: PropTypes.bool,
  full:    PropTypes.bool,
};

/* ── NavDrawerHeader ──────────────────────────────────── */
export function NavDrawerHeader({ rtl = false, onColor = false, full = true, onToggle }) {
  const toggleColor = onColor ? '#F9FAFB' : '#000B36';
  const markColor   = onColor ? '#F9FAFB' : '#1849A9';

  const logo = (
    <div className={styles.logo}>
      <LogoMarkIcon size={18} color={markColor} />
      <span className={[styles.logoText, onColor ? styles.logoTextOnColor : ''].filter(Boolean).join(' ')}>
        master team
      </span>
    </div>
  );

  const toggleBtn = (
    <button
      className={[styles.sidebarToggle, onColor ? styles.sidebarToggleOnColor : ''].filter(Boolean).join(' ')}
      type="button"
      onClick={onToggle}
      aria-label={rtl ? 'طي الشريط الجانبي' : 'Collapse sidebar'}
    >
      <SidebarLeftIcon color={toggleColor} />
    </button>
  );

  const headerClasses = [
    styles.panelHeader,
    onColor ? styles.panelHeaderOnColor   : '',
    rtl     ? styles.panelHeaderRtl       : '',
    !full   ? styles.panelHeaderCollapsed : '',
  ].filter(Boolean).join(' ');

  if (!full) {
    return (
      <div className={headerClasses}>
        <LogoMarkIcon size={32} color={markColor} />
      </div>
    );
  }

  return (
    <div className={headerClasses}>
      {rtl ? <>{toggleBtn}{logo}</> : <>{logo}{toggleBtn}</>}
    </div>
  );
}

NavDrawerHeader.propTypes = {
  rtl:      PropTypes.bool,
  onColor:  PropTypes.bool,
  full:     PropTypes.bool,
  onToggle: PropTypes.func,
};

/* ── NavDrawerPanel ───────────────────────────────────── */
export function NavDrawerPanel({
  items      = [],
  rtl        = false,
  onColor    = false,
  full       = true,
  showHeader = true,
  border     = 'none',
  overlay    = false,
  onToggle,
}) {
  const panelClasses = [
    styles.panel,
    onColor              ? styles.panelOnColor     : '',
    !full                ? styles.panelCollapsed   : '',
    overlay              ? styles.panelOverlay     : '',
    border === 'right'   ? styles.panelBorderRight : '',
    border === 'left'    ? styles.panelBorderLeft  : '',
  ].filter(Boolean).join(' ');

  return (
    <nav className={panelClasses} aria-label={rtl ? 'قائمة التصفح الجانبية' : 'Navigation drawer'}>
      {showHeader && (
        <NavDrawerHeader rtl={rtl} onColor={onColor} full={full} onToggle={onToggle} />
      )}
      <div className={[styles.panelItems, !full ? styles.panelItemsCollapsed : ''].filter(Boolean).join(' ')}>
        <ul className={styles.panelItemsList}>
          {items.map((item, i) => {
            const key = item.divider ? `div-${i}` : (item.label || String(i));
            if (item.divider) {
              if (!full) return null;
              return (
                <li
                  key={key}
                  className={[styles.dividerItem, onColor ? styles.dividerItemOnColor : ''].filter(Boolean).join(' ')}
                  aria-hidden="true"
                >
                  <hr className={styles.dividerLine} />
                </li>
              );
            }
            return (
              <li key={key}>
                <NavDrawerItem
                  label={item.label}
                  labelAr={item.labelAr}
                  type={item.type || 'link'}
                  level={item.level || 1}
                  state={item.state || 'Default'}
                  rtl={rtl}
                  full={full}
                  onColor={onColor}
                  badge={item.badge || false}
                  badgeCount={item.badgeCount || '+99'}
                  expanded={item.expanded || false}
                  externalLink={item.externalLink || false}
                  icon={item.icon !== undefined ? item.icon : true}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

NavDrawerPanel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      divider:      PropTypes.bool,
      label:        PropTypes.string,
      labelAr:      PropTypes.string,
      type:         PropTypes.oneOf(['link', 'parent']),
      level:        PropTypes.oneOf([1, 2]),
      state:        PropTypes.string,
      badge:        PropTypes.bool,
      badgeCount:   PropTypes.string,
      expanded:     PropTypes.bool,
      externalLink: PropTypes.bool,
      icon:         PropTypes.bool,
    })
  ),
  rtl:        PropTypes.bool,
  onColor:    PropTypes.bool,
  full:       PropTypes.bool,
  showHeader: PropTypes.bool,
  border:     PropTypes.oneOf(['none', 'right', 'left']),
  overlay:    PropTypes.bool,
  onToggle:   PropTypes.func,
};
