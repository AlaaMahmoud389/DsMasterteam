import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { SearchInput } from '../SearchInput/SearchInput';
import { MenuListItem } from '../Menu/Menu';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';
import { Button } from '../Button/Button';
import { Avatar, FIGMA_PHOTO } from '../Avatar/Avatar';
import { Icon } from '../icons/Icon';
import logoMarkWhite from '../../assets/logos/logo-mark-white.svg';

/* ── Default logo ────────────────────────────────────────────────── */

function DefaultLogo({ iconOnly = false }) {
  return (
    <div className={styles.logoInner}>
      <div className={styles.logoMark} aria-hidden="true">
        <img src={logoMarkWhite} width="20" height="20" alt="" />
      </div>
      {!iconOnly && (
        <span className={styles.logoText}>Masterteam</span>
      )}
    </div>
  );
}

/* ── Default menu items ──────────────────────────────────────────── */

const DEFAULT_MENU_ITEMS = [
  { id: 'home',          label: 'Home',          leadIcon: 'home',      state: 'selected' },
  { id: 'messages',      label: 'Messages',       leadIcon: 'message',   trailElement: 'text', trailText: '+5' },
  { id: 'analytics',     label: 'Analytics',      leadIcon: 'chart-bar' },
  { id: 'notifications', label: 'Notifications',  leadIcon: 'bell' },
  { id: 'settings',      label: 'Settings',       leadIcon: 'setting' },
];

/* ════════════════════════════════════════════════════════════════════
   Sidebar
   ════════════════════════════════════════════════════════════════════ */
export function Sidebar({
  variant         = 'ltr',    // 'ltr' | 'rtl' | 'icon-only'

  /* Logo */
  logo,

  /* Menu */
  menuItems       = DEFAULT_MENU_ITEMS,

  /* Search */
  searchValue     = '',
  onSearchChange,

  /* Featured card */
  featuredTitle   = 'Getting Started',
  featuredSubtext = 'Watch this short intro to learn the basics of the platform.',
  featuredVideoSrc,
  featuredVideoPoster,
  featuredButtonLabel = 'Get Started',
  onFeaturedButtonClick,

  /* Profile */
  userName        = 'Nora Ahmed',
  userEmail       = 'nora.ahmed@email.com',
  userAvatarSrc,

  className,
}) {
  const [featuredVisible, setFeaturedVisible] = useState(true);
  const [searchVal, setSearchVal] = useState(searchValue);
  const [collapsed, setCollapsed] = useState(variant === 'icon-only');

  const isRTL      = variant === 'rtl';
  const isIconOnly = collapsed;

  const handleSearchChange = (e) => {
    setSearchVal(e.target.value);
    onSearchChange?.(e);
  };

  const sidebarCls = [
    styles.sidebar,
    isIconOnly && styles.sidebarIconOnly,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={sidebarCls}
      dir={isRTL ? 'rtl' : undefined}
      role="navigation"
      aria-label="Sidebar navigation"
    >
      {/* ══ Header: Logo + Collapse ══════════════════════════════════ */}
      <div className={styles.header}>
        {isIconOnly ? (
          /* Collapsed: logo morphs into expand icon on hover */
          <button
            className={styles.logoToggleBtn}
            type="button"
            aria-label="Expand sidebar"
            onClick={() => setCollapsed(false)}
          >
            <span className={styles.logoToggleDefault}>
              <DefaultLogo iconOnly />
            </span>
            <span className={styles.logoToggleHover}>
              <Icon
                name={isRTL ? 'chevron-left-double' : 'chevron-right-double'}
                size={20}
              />
            </span>
          </button>
        ) : (
          /* Expanded: logo on left, collapse button on right */
          <>
            {logo || <DefaultLogo />}
            <button
              className={styles.collapseBtn}
              type="button"
              aria-label="Collapse sidebar"
              onClick={() => setCollapsed(true)}
            >
              <Icon
                name={isRTL ? 'chevron-right-double' : 'chevron-left-double'}
                size={20}
              />
            </button>
          </>
        )}
      </div>

      {/* ══ Search (hidden in icon-only) ═════════════════════════════ */}
      {!isIconOnly && (
        <SearchInput
          showLabel={false}
          placeholder="Search…"
          value={searchVal}
          onChange={handleSearchChange}
          variant="filled-darker"
          rtl={isRTL}
        />
      )}

      {/* ══ Menu Items ═══════════════════════════════════════════════ */}
      {isIconOnly ? (
        <div className={styles.iconOnlyMenu}>
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={[
                styles.iconOnlyItem,
                item.state === 'selected' && styles.iconOnlyItemSelected,
                item.state === 'disabled' && styles.iconOnlyItemDisabled,
              ].filter(Boolean).join(' ')}
              role="menuitem"
              tabIndex={item.state === 'disabled' ? -1 : 0}
              title={item.label}
              aria-label={item.label}
            >
              <Icon name={item.leadIcon || 'list'} size={24} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.menuList} role="menu">
          {menuItems.map((item) => (
            <MenuListItem
              key={item.id}
              label={item.label}
              leadIcon={item.leadIcon}
              trailElement={item.trailElement || 'none'}
              trailText={item.trailText}
              state={item.state || 'default'}
              rtl={isRTL}
              onClick={item.onClick}
            />
          ))}
        </div>
      )}

      {/* ══ Featured Card (hidden in icon-only or when closed) ═══════ */}
      {!isIconOnly && featuredVisible && (
        <div className={styles.featuredCard}>
          <button
            className={styles.featuredClose}
            type="button"
            aria-label="Close"
            onClick={() => setFeaturedVisible(false)}
          >
            <Icon name="cancel" size={16} />
          </button>

          <p className={styles.featuredTitle}>{featuredTitle}</p>
          <p className={styles.featuredSubtext}>{featuredSubtext}</p>

          <div className={styles.featuredVideo}>
            <VideoPlayer
              src={featuredVideoSrc}
              poster={featuredVideoPoster}
              buttonStyle="semi-transparent"
              buttonSize="small"
            />
          </div>

          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={onFeaturedButtonClick}
          >
            {featuredButtonLabel}
          </Button>
        </div>
      )}

      {/* ══ Spacer pushes divider + profile to the bottom ════════════ */}
      <div className={styles.spacer} aria-hidden="true" />

      {/* ══ Divider ══════════════════════════════════════════════════ */}
      <div className={styles.divider} role="separator" aria-hidden="true" />

      {/* ══ Profile ══════════════════════════════════════════════════ */}
      <div className={styles.profile}>
        <Avatar
          type="image"
          size="sm"
          src={userAvatarSrc || FIGMA_PHOTO}
          alt={userName}
        />
        {!isIconOnly && (
          <div className={styles.profileText}>
            <span className={styles.profileName}>{userName}</span>
            <span className={styles.profileEmail}>{userEmail}</span>
          </div>
        )}
      </div>
    </div>
  );
}
