import PropTypes from 'prop-types';
import logoTextUrl from '../../assets/logos/nav-header/logo-text.svg';
import styles from './NavHeader.module.css';

/* ── Logo mark sparkle path (Figma node 5046:11130, exact coords)
   viewBox 0 0 24.61 24.586 — rendered at 24.611×24.584px          ── */
const LOGO_MARK_PATH =
  'M15.5736 0C15.5243 0.0183415 15.4808 0.0494472 15.4474 0.0901367C15.4141 0.130826 15.3922 0.179639 15.3839 0.231586C15.0334 1.23652 14.6117 2.23099 14.1781 3.22248C13.4595 4.95637 12.5961 6.62662 11.5969 8.21547C10.9742 9.16841 10.2164 9.95072 9.11822 10.3332C8.75784 10.4587 8.39955 10.6039 8.03798 10.716C5.84973 11.3523 3.61307 11.8085 1.35039 12.0798C0.895061 12.1165 0.443456 12.1901 1.3912e-05 12.2997C0.0772322 12.3301 0.156525 12.3548 0.237279 12.3739C1.33604 12.485 2.4085 12.6628 3.46812 12.8693C5.08026 13.1834 6.67058 13.5434 8.08609 14.2301C8.43096 14.3816 8.73263 14.6167 8.96381 14.9141C9.195 15.2115 9.3484 15.5618 9.41017 15.9334C9.54321 16.663 9.61062 17.403 9.61157 18.1447C9.61117 20.2011 9.45463 22.2545 9.14332 24.2872C9.12868 24.387 9.08087 24.5048 9.19801 24.586C9.23357 24.503 9.25986 24.4495 9.28107 24.3951C9.83449 22.9805 10.4017 21.5683 11.0549 20.1704C11.7048 18.6923 12.49 17.2775 13.4006 15.9442C13.9617 15.147 14.7546 14.5418 15.6717 14.211C18.177 13.2673 20.6691 12.8986 23.1616 12.5248C23.6397 12.4527 24.1178 12.4004 24.5983 12.3383L24.61 12.2445C23.9325 12.1441 23.2506 12.0535 22.578 11.9409C20.7267 11.6724 18.9061 11.2231 17.1424 10.5995C15.9271 10.1381 15.2497 9.29989 15.1783 7.9534C15.1738 7.86704 15.1637 7.78278 15.1559 7.69672C14.9823 5.72869 15.1559 3.68744 15.3791 1.63634C15.4386 1.09757 15.5073 0.557001 15.5736 0Z';

/* ── Arrow-down-01 (Figma 2078:24098)
   Exact path from Figma, viewBox 0 0 11.2499 6.25,
   centered with translate(4.375, 6.875) inside 20×20  ── */
const ArrowDownIcon = ({ color = '#000B36' }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <g transform="translate(4.375, 6.875)">
      <path
        d="M1.1281 0.254397C1.22967 0.388876 1.53293 0.790329 1.71353 1.02175C2.07526 1.48526 2.56952 2.10117 3.10269 2.71525C3.63856 3.33243 4.20148 3.93351 4.70158 4.37538C4.95234 4.59694 5.17262 4.76531 5.35439 4.87489C5.52535 4.97795 5.62634 4.99938 5.62634 4.99938C5.62634 4.99938 5.72436 4.97795 5.89531 4.87489C6.07709 4.76531 6.29737 4.59695 6.54813 4.37538C7.04822 3.93351 7.61115 3.33243 8.14701 2.71524C8.68018 2.10116 9.17444 1.48524 9.53617 1.02173C9.71678 0.790298 10.0196 0.389413 10.1212 0.254933C10.3259 -0.0230027 10.7175 -0.0829493 10.9955 0.121744C11.2734 0.326438 11.3328 0.717687 11.1281 0.995623L11.1265 0.997696C11.02 1.1387 10.7059 1.55461 10.5216 1.79076C10.1517 2.26475 9.64302 2.89883 9.09089 3.53475C8.54146 4.16756 7.93673 4.81648 7.3758 5.31211C7.09605 5.55929 6.81247 5.78156 6.54067 5.94541C6.28602 6.09893 5.96361 6.25 5.62485 6.24999C5.28609 6.24999 4.96368 6.09892 4.70904 5.94541C4.43723 5.78155 4.15366 5.55929 3.87391 5.31211C3.31298 4.81648 2.70825 4.16757 2.15882 3.53477C1.60669 2.89885 1.098 2.26477 0.7281 1.79079C0.543667 1.55446 0.229495 1.13851 0.123227 0.997819L0.121901 0.996062C-0.0827949 0.718128 -0.0237153 0.326482 0.254219 0.121786C0.532145 -0.0829021 0.923397 -0.023514 1.1281 0.254397Z"
        fill={color}
      />
    </g>
  </svg>
);

ArrowDownIcon.propTypes = { color: PropTypes.string };

/* ── Login-square-01 (Figma 5005:4689)
   Exact paths from Figma, viewBox 0 0 20.5 20.5,
   centered with translate(1.75, 1.75) inside 24×24   ── */
const LoginSquareIcon = ({ color = '#000B36' }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <g transform="translate(1.75, 1.75)">
      <path
        d="M9.27274 8.28781C9.56977 7.99911 9.57651 7.52428 9.28781 7.22726C8.99911 6.93023 8.52428 6.92349 8.22726 7.21219C8.136 7.30089 7.95419 7.44651 7.68276 7.65971L7.62284 7.70675C7.38071 7.89682 7.09661 8.11981 6.82551 8.34954C6.53495 8.59574 6.23316 8.87131 5.99854 9.14679C5.88096 9.28483 5.76499 9.44043 5.67541 9.60782C5.58902 9.76926 5.5 9.99171 5.5 10.25C5.5 10.5083 5.58902 10.7307 5.67541 10.8922C5.76499 11.0596 5.88096 11.2152 5.99854 11.3532C6.23316 11.6287 6.53495 11.9043 6.82551 12.1505C7.09662 12.3802 7.38068 12.6032 7.62282 12.7932L7.68276 12.8403C7.95419 13.0535 8.136 13.1991 8.22726 13.2878C8.52428 13.5765 8.99911 13.5698 9.28781 13.2727C9.57651 12.9757 9.56977 12.5009 9.27274 12.2122C9.11115 12.0551 8.85404 11.8529 8.60931 11.6607L8.55235 11.6159C8.30663 11.423 8.04386 11.2167 7.79522 11.0061L7.78807 11H14.25C14.6642 11 15 10.6642 15 10.25C15 9.83579 14.6642 9.5 14.25 9.5H7.78807L7.79522 9.49394C8.04385 9.28326 8.30661 9.07698 8.55233 8.88407L8.60931 8.83933C8.85404 8.64711 9.11115 8.44487 9.27274 8.28781Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.3072 2.29058e-07H10.1928C8.00212 -1.31257e-05 6.28144 -2.37375e-05 4.93802 0.180594C3.56137 0.365681 2.46911 0.752715 1.61091 1.61091C0.752715 2.46911 0.365681 3.56137 0.180594 4.93802C-2.37375e-05 6.28144 -1.31257e-05 8.00212 2.29058e-07 10.1928V10.3072C-1.31257e-05 12.4979 -2.37375e-05 14.2186 0.180594 15.562C0.365681 16.9386 0.752715 18.0309 1.61091 18.8891C2.46911 19.7473 3.56137 20.1343 4.93802 20.3194C6.28144 20.5 8.0021 20.5 10.1928 20.5H10.3072C12.4979 20.5 14.2186 20.5 15.562 20.3194C16.9386 20.1343 18.0309 19.7473 18.8891 18.8891C19.7473 18.0309 20.1343 16.9386 20.3194 15.562C20.5 14.2186 20.5 12.4979 20.5 10.3072V10.1928C20.5 8.00214 20.5 6.28144 20.3194 4.93802C20.1343 3.56137 19.7473 2.46911 18.8891 1.61091C18.0309 0.752715 16.9386 0.365681 15.562 0.180594C14.2186 -2.37375e-05 12.4979 -1.31257e-05 10.3072 2.29058e-07ZM2.67157 2.67157C3.20462 2.13853 3.92757 1.82994 5.1379 1.66722C6.36979 1.50159 7.98963 1.5 10.25 1.5C12.5104 1.5 14.1302 1.50159 15.3621 1.66722C16.5724 1.82994 17.2954 2.13853 17.8284 2.67157C18.3615 3.20462 18.6701 3.92757 18.8328 5.1379C18.9984 6.36979 19 7.98963 19 10.25C19 12.5104 18.9984 14.1302 18.8328 15.3621C18.6701 16.5724 18.3615 17.2954 17.8284 17.8284C17.2954 18.3615 16.5724 18.6701 15.3621 18.8328C14.1302 18.9984 12.5104 19 10.25 19C7.98963 19 6.36979 18.9984 5.1379 18.8328C3.92757 18.6701 3.20462 18.3615 2.67157 17.8284C2.13853 17.2954 1.82994 16.5724 1.66722 15.3621C1.50159 14.1302 1.5 12.5104 1.5 10.25C1.5 7.98963 1.50159 6.36979 1.66722 5.1379C1.82994 3.92757 2.13853 3.20462 2.67157 2.67157Z"
        fill={color}
      />
    </g>
  </svg>
);

LoginSquareIcon.propTypes = { color: PropTypes.string };

/* ── More-horizontal (Figma 4732:17582)
   3 circular dots, viewBox 0 0 14.509 2.5,
   centered with translate(4.746, 10.75) inside 24×24
   Used as nav-menu button on mobile (<600)            ── */
const MoreHorizontalIcon = ({ color = '#000B36' }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <g transform="translate(4.746, 10.75)">
      <path d="M1.25 0C0.559644 0 0 0.559644 0 1.25C0 1.94036 0.559644 2.5 1.25 2.5H1.25898C1.94934 2.5 2.50898 1.94036 2.50898 1.25C2.50898 0.559644 1.94934 0 1.25898 0H1.25Z" fill={color} />
      <path d="M5.99609 1.25C5.99609 0.559644 6.55574 0 7.24609 0H7.25508C7.94543 0 8.50508 0.559644 8.50508 1.25C8.50508 1.94036 7.94543 2.5 7.25508 2.5H7.24609C6.55574 2.5 5.99609 1.94036 5.99609 1.25Z" fill={color} />
      <path d="M12 1.25C12 0.559644 12.5596 0 13.25 0H13.259C13.9493 0 14.509 0.559644 14.509 1.25C14.509 1.94036 13.9493 2.5 13.259 2.5H13.25C12.5596 2.5 12 1.94036 12 1.25Z" fill={color} />
    </g>
  </svg>
);

MoreHorizontalIcon.propTypes = { color: PropTypes.string };

/* ── Menu-01 / hamburger (Figma 5005:4745)
   3 horizontal lines, viewBox 0 0 17.5 15.5,
   centered with translate(3.25, 4.25) inside 24×24
   Used as utility-menu button on mobile (<600)        ── */
const MenuIcon = ({ color = '#000B36' }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <g transform="translate(3.25, 4.25)">
      <path d="M0 0.75C0 0.335786 0.335786 0 0.75 0H16.75C17.1642 0 17.5 0.335786 17.5 0.75C17.5 1.16421 17.1642 1.5 16.75 1.5H0.75C0.335786 1.5 0 1.16421 0 0.75Z" fill={color} />
      <path d="M0 7.75C0 7.33579 0.335786 7 0.75 7H16.75C17.1642 7 17.5 7.33579 17.5 7.75C17.5 8.16421 17.1642 8.5 16.75 8.5H0.75C0.335786 8.5 0 8.16421 0 7.75Z" fill={color} />
      <path d="M0 14.75C0 14.3358 0.335786 14 0.75 14H16.75C17.1642 14 17.5 14.3358 17.5 14.75C17.5 15.1642 17.1642 15.5 16.75 15.5H0.75C0.335786 15.5 0 15.1642 0 14.75Z" fill={color} />
    </g>
  </svg>
);

MenuIcon.propTypes = { color: PropTypes.string };

/* ── Icon colour helper — menu items (focusedSelected → white) ── */
function menuItemIconColor({ focusedSelected, disabled }) {
  if (focusedSelected) return '#F9FAFB';
  if (disabled)        return '#9DA4AE';
  return '#000B36';
}

/* ── Icon colour helper — actions (focusedSelected stays dark) ── */
function actionIconColor({ disabled }) {
  if (disabled) return '#9DA4AE';
  return '#000B36';
}

/* ── NavMenuItem ──────────────────────────────────────────────── */
export function NavMenuItem({
  label    = 'Link',
  labelAr  = 'تبويب',
  selected = false,
  state    = 'Default',
  rtl      = false,
  icon     = false,
}) {
  const isHovered         = state === 'Hovered';
  const isPressed         = state === 'Pressed';
  const isFocused         = state === 'Focused';
  const isDisabled        = state === 'Disabled';
  const isFocusedSelected = isFocused && selected;

  const iconColor = menuItemIconColor({ focusedSelected: isFocusedSelected, disabled: isDisabled });

  const showBlueIndicator = selected && !isDisabled;
  const showGrayIndicator = !selected && (isHovered || isPressed);

  const itemClasses = [
    styles.menuItem,
    selected && !isFocusedSelected ? styles.menuItemSelected        : '',
    isHovered                       ? styles.menuItemHovered         : '',
    isPressed                       ? styles.menuItemPressed         : '',
    isFocused && !isFocusedSelected ? styles.menuItemFocused         : '',
    isFocusedSelected               ? styles.menuItemFocusedSelected : '',
    isDisabled                      ? styles.menuItemDisabled        : '',
    rtl                             ? styles.menuItemRtl             : '',
  ].filter(Boolean).join(' ');

  const labelClasses = [
    styles.menuItemLabel,
    selected && !isFocusedSelected ? styles.menuItemLabelSelected        : '',
    isFocusedSelected               ? styles.menuItemLabelFocusedSelected : '',
    isDisabled                      ? styles.menuItemLabelDisabled        : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={itemClasses}
      disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      type="button"
    >
      {icon && (
        <span className={styles.menuItemLeadingIcon}>
          <LoginSquareIcon color={iconColor} />
        </span>
      )}

      <span className={labelClasses} dir="auto">
        {rtl ? labelAr : label}
      </span>

      <span className={styles.menuItemChevron}>
        <ArrowDownIcon color={iconColor} />
      </span>

      {(showBlueIndicator || showGrayIndicator) && (
        <span className={styles.indicator}>
          <span
            className={[
              styles.indicatorBar,
              showGrayIndicator ? styles.indicatorBarGray : '',
            ].filter(Boolean).join(' ')}
          />
        </span>
      )}

      {isFocusedSelected && <span className={styles.focusOutlineOverlay} />}
    </button>
  );
}

NavMenuItem.propTypes = {
  label:    PropTypes.string,
  labelAr:  PropTypes.string,
  selected: PropTypes.bool,
  state:    PropTypes.oneOf(['Default', 'Hovered', 'Pressed', 'Focused', 'Disabled']),
  rtl:      PropTypes.bool,
  icon:     PropTypes.bool,
};

/* ── NavAction ────────────────────────────────────────────────── */
export function NavAction({
  label    = 'Action',
  labelAr  = 'إجراء',
  selected = false,
  state    = 'Default',
  rtl      = false,
  iconOnly = false,
}) {
  const isHovered         = state === 'Hovered';
  const isPressed         = state === 'Pressed';
  const isFocused         = state === 'Focused';
  const isDisabled        = state === 'Disabled';
  const isFocusedSelected = isFocused && selected;

  const iconColor = actionIconColor({ disabled: isDisabled });

  const actionClasses = [
    styles.action,
    selected && !isFocusedSelected ? styles.actionSelected        : '',
    isHovered                       ? styles.actionHovered         : '',
    isPressed                       ? styles.actionPressed         : '',
    isFocused && !isFocusedSelected ? styles.actionFocused         : '',
    isFocusedSelected               ? styles.actionFocusedSelected : '',
    isDisabled                      ? styles.actionDisabled        : '',
    rtl                             ? styles.actionRtl             : '',
  ].filter(Boolean).join(' ');

  const labelClasses = [
    styles.actionLabel,
    selected && !isFocusedSelected ? styles.actionLabelSelected : '',
    isDisabled                      ? styles.actionLabelDisabled : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={actionClasses}
      disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      type="button"
    >
      <span className={styles.actionIcon}>
        <LoginSquareIcon color={iconColor} />
      </span>
      {!iconOnly && (
        <span className={labelClasses} dir="auto">
          {rtl ? labelAr : label}
        </span>
      )}

      {selected && !isDisabled && (
        <span className={styles.indicator}>
          <span className={styles.indicatorBar} />
        </span>
      )}

      {isFocusedSelected && <span className={styles.focusOutlineOverlay} />}
    </button>
  );
}

NavAction.propTypes = {
  label:    PropTypes.string,
  labelAr:  PropTypes.string,
  selected: PropTypes.bool,
  state:    PropTypes.oneOf(['Default', 'Hovered', 'Pressed', 'Focused', 'Disabled']),
  rtl:      PropTypes.bool,
  iconOnly: PropTypes.bool,
};

/* ── NavHeader ────────────────────────────────────────────────── */
export function NavHeader({
  rtl        = false,
  fullWidth  = false,
  breakpoint = '>960',
  menuItems  = [],
  actions    = [],
}) {
  /* Shared logo element */
  const logoEl = (
    <div
      className={[styles.logo, rtl ? styles.logoRtl : ''].filter(Boolean).join(' ')}
      role="link"
      tabIndex={0}
      aria-label="masterteam home"
    >
      <div className={styles.logoMarkWrap}>
        <svg
          width="24.611"
          height="24.584"
          viewBox="0 0 24.61 24.586"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path d={LOGO_MARK_PATH} fill="#334DFF" />
        </svg>
      </div>
      <img src={logoTextUrl} alt="masterteam" className={styles.logoTextImg} />
    </div>
  );

  /* ── Desktop (>960) ─────────────────────────────────────────── */
  if (breakpoint === '>960') {
    const menuEl = menuItems.length > 0 && (
      <nav className={styles.menuItems} aria-label={rtl ? 'قائمة التصفح' : 'Main navigation'}>
        {menuItems.map((item, i, arr) => (
          <NavMenuItem
            key={i}
            label={item.label}
            labelAr={item.labelAr}
            selected={item.selected && arr.findIndex(m => m.selected) === i}
            icon={item.icon !== undefined ? item.icon : false}
            rtl={rtl}
          />
        ))}
      </nav>
    );

    /* RTL: menu items render before logo in DOM so both sit at right edge
       (parent justify-end keeps them rightmost, logo is furthest right) */
    const logoAndMenu = (
      <div
        className={[
          styles.logoAndMenu,
          rtl ? styles.logoAndMenuRtl : '',
        ].filter(Boolean).join(' ')}
      >
        {rtl ? <>{menuEl}{logoEl}</> : <>{logoEl}{menuEl}</>}
      </div>
    );

    const actionsEl = actions.length > 0 && (
      <div
        className={[
          styles.actions,
          rtl ? styles.actionsRtl : '',
        ].filter(Boolean).join(' ')}
      >
        {actions.map((action, i, arr) => (
          <NavAction
            key={i}
            label={action.label}
            labelAr={action.labelAr}
            selected={action.selected && arr.findIndex(a => a.selected) === i}
            rtl={rtl}
          />
        ))}
      </div>
    );

    return (
      <header className={styles.navHeader}>
        <div
          className={[
            styles.bar,
            fullWidth ? styles.barFullWidth : '',
          ].filter(Boolean).join(' ')}
        >
          {rtl ? (
            <>
              {actionsEl}
              {logoAndMenu}
            </>
          ) : (
            <>
              {logoAndMenu}
              {actionsEl}
            </>
          )}
        </div>
      </header>
    );
  }

  /* ── Tablet (600>960) ───────────────────────────────────────── */
  if (breakpoint === '600>960') {
    const navMenuBtn = (
      <button
        className={styles.iconBtn}
        type="button"
        aria-label={rtl ? 'قائمة التصفح' : 'Navigation menu'}
      >
        <span style={{ display: 'inline-flex', transform: 'rotate(-90deg)' }}>
          <ArrowDownIcon />
        </span>
      </button>
    );

    const utilityBtn = (
      <button
        className={styles.iconBtn}
        type="button"
        aria-label={rtl ? 'قائمة المزيد' : 'Utility menu'}
      >
        <span style={{ display: 'inline-flex', transform: 'rotate(-90deg)' }}>
          <ArrowDownIcon />
        </span>
      </button>
    );

    /* First action shown as icon-only in the actions column */
    const iconAction = actions.length > 0 ? (
      <NavAction
        label={actions[0].label}
        labelAr={actions[0].labelAr}
        selected={actions[0].selected}
        rtl={rtl}
        iconOnly
      />
    ) : null;

    return (
      <header className={styles.navHeader}>
        <div className={[styles.bar, styles.barTablet].join(' ')}>
          {rtl ? (
            <>
              {/* RTL: [utility + icon-action] | [logo] | [navMenuBtn] */}
              <div className={styles.respStartCol}>
                {utilityBtn}
                {iconAction}
              </div>
              <div className={styles.respLogoCol}>{logoEl}</div>
              <div className={styles.respEndCol}>{navMenuBtn}</div>
            </>
          ) : (
            <>
              {/* LTR: [navMenuBtn] | [logo] | [icon-action + utility] */}
              <div className={styles.respStartCol}>{navMenuBtn}</div>
              <div className={styles.respLogoCol}>{logoEl}</div>
              <div className={styles.respEndCol}>
                {iconAction}
                {utilityBtn}
              </div>
            </>
          )}
        </div>
      </header>
    );
  }

  /* ── Mobile (<600) ──────────────────────────────────────────── */
  const navMenuBtn = (
    <button
      className={styles.iconBtn}
      type="button"
      aria-label={rtl ? 'قائمة التصفح' : 'Navigation menu'}
    >
      <MoreHorizontalIcon />
    </button>
  );

  const utilityBtn = (
    <button
      className={styles.iconBtn}
      type="button"
      aria-label={rtl ? 'قائمة المزيد' : 'Utility menu'}
    >
      <MenuIcon />
    </button>
  );

  return (
    <header className={styles.navHeader}>
      <div className={[styles.bar, styles.barMobile].join(' ')}>
        {rtl ? (
          <>
            {/* RTL: [utility] | [logo shrink-0] | [navMenuBtn] */}
            <div className={styles.respStartCol}>{utilityBtn}</div>
            {logoEl}
            <div className={styles.respEndCol}>{navMenuBtn}</div>
          </>
        ) : (
          <>
            {/* LTR: [navMenuBtn] | [logo shrink-0] | [utility] */}
            <div className={styles.respStartCol}>{navMenuBtn}</div>
            {logoEl}
            <div className={styles.respEndCol}>{utilityBtn}</div>
          </>
        )}
      </div>
    </header>
  );
}

NavHeader.propTypes = {
  rtl:        PropTypes.bool,
  fullWidth:  PropTypes.bool,
  breakpoint: PropTypes.oneOf(['>960', '600>960', '<600']),
  menuItems:  PropTypes.arrayOf(
    PropTypes.shape({
      label:    PropTypes.string,
      labelAr:  PropTypes.string,
      selected: PropTypes.bool,
      icon:     PropTypes.bool,
    })
  ),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label:    PropTypes.string,
      labelAr:  PropTypes.string,
      selected: PropTypes.bool,
    })
  ),
};
