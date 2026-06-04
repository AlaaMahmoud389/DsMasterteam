import React, { useState } from 'react';
import styles from './Tabs.module.css';

/**
 * Tabs — Masterteam Design System
 * Figma: node 4747:83313
 *
 * Exports:
 *   VerticalTab       — single vertical tab (all states, for stories)
 *   HorizontalTab     — single horizontal tab (all states, for stories)
 *   VerticalTabList   — interactive vertical tab navigation
 *   HorizontalTabList — interactive horizontal tab navigation
 */

/* ── Three-dots menu icon ─────────────────────────────────────────── */
function ThreeDotsIcon({ color = '#000B36' }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16"
      fill="none" aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <circle cx="3"  cy="8" r="1.5" fill={color} />
      <circle cx="8"  cy="8" r="1.5" fill={color} />
      <circle cx="13" cy="8" r="1.5" fill={color} />
    </svg>
  );
}

/* ── Generic placeholder icon ─────────────────────────────────────── */
function TabIcon({ color = '#000B36' }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16"
      fill="none" aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M2 4h12M2 8h12M2 12h8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════
   VerticalTab — single tab (presentational, all states)
   ════════════════════════════════════════════════════════════════════ */
export function VerticalTab({
  label    = 'Tab',
  size     = 'medium',
  selected = false,
  state    = 'default',   // 'default' | 'hovered' | 'pressed' | 'focused' | 'disabled'
  showIcon = false,
  icon,
  rtl      = false,
  onClick,
  className,
  ...rest
}) {
  const disabled = state === 'disabled';

  const cls = [
    styles.vtab,
    styles[`vtab${capitalize(size)}`],
    selected  && styles.vtabSelected,
    disabled  && styles.vtabDisabled,
    state === 'hovered' && !selected && styles.vtabHovered,
    state === 'pressed' && !selected && styles.vtabPressed,
    state === 'focused' && styles.vtabFocused,
    rtl && styles.rtl,
    className,
  ].filter(Boolean).join(' ');

  const iconColor = disabled ? '#6C7C96' : '#000B36';

  return (
    <button
      type="button"
      className={cls}
      disabled={disabled}
      onClick={onClick}
      aria-selected={selected}
      tabIndex={disabled ? -1 : 0}
      dir={rtl ? 'rtl' : undefined}
      {...rest}
    >
      {showIcon && (icon || <TabIcon color={iconColor} />)}
      <span className={styles.tabLabel}>{label}</span>
    </button>
  );
}

/* ════════════════════════════════════════════════════════════════════
   HorizontalTab — single tab (presentational, all states)
   ════════════════════════════════════════════════════════════════════ */
export function HorizontalTab({
  label    = 'Tab',
  size     = 'medium',
  selected = false,
  state    = 'default',
  showIcon = false,
  icon,
  rtl      = false,
  onClick,
  className,
  ...rest
}) {
  const disabled = state === 'disabled';

  const cls = [
    styles.htab,
    styles[`htab${capitalize(size)}`],
    selected  && styles.htabSelected,
    disabled  && styles.htabDisabled,
    state === 'hovered' && !selected && styles.htabHovered,
    state === 'pressed' && !selected && styles.htabPressed,
    state === 'focused' && styles.htabFocused,
    rtl && styles.rtl,
    className,
  ].filter(Boolean).join(' ');

  const iconColor = disabled ? '#6C7C96' : '#000B36';

  return (
    <button
      type="button"
      className={cls}
      disabled={disabled}
      onClick={onClick}
      aria-selected={selected}
      tabIndex={disabled ? -1 : 0}
      dir={rtl ? 'rtl' : undefined}
      {...rest}
    >
      {showIcon && (icon || <TabIcon color={iconColor} />)}
      <span className={styles.tabLabel}>{label}</span>
    </button>
  );
}

/* ════════════════════════════════════════════════════════════════════
   VerticalTabList — interactive vertical tab navigation
   ════════════════════════════════════════════════════════════════════ */
export function VerticalTabList({
  tabs       = [],          // [{ id, label, icon?, disabled? }]
  activeTab,
  onTabChange,
  size       = 'medium',    // 'small' | 'medium' | 'large'
  showIcons  = false,
  rtl        = false,
  className,
  ...rest
}) {
  return (
    <div
      className={[styles.vtabList, rtl && styles.rtl, className].filter(Boolean).join(' ')}
      role="tablist"
      aria-orientation="vertical"
      dir={rtl ? 'rtl' : undefined}
      {...rest}
    >
      {tabs.map((tab) => {
        const selected = tab.id === activeTab;
        const disabled = !!tab.disabled;
        const iconColor = disabled ? '#6C7C96' : '#000B36';

        const cls = [
          styles.vtab,
          styles[`vtab${capitalize(size)}`],
          selected  && styles.vtabSelected,
          disabled  && styles.vtabDisabled,
        ].filter(Boolean).join(' ');

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            className={cls}
            disabled={disabled}
            aria-selected={selected}
            onClick={() => !disabled && onTabChange?.(tab.id)}
            tabIndex={disabled ? -1 : 0}
          >
            {showIcons && (tab.icon || <TabIcon color={iconColor} />)}
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   HorizontalTabList — interactive horizontal tab navigation
   ════════════════════════════════════════════════════════════════════ */
export function HorizontalTabList({
  tabs       = [],
  activeTab,
  onTabChange,
  size       = 'medium',
  showIcons  = false,
  flush      = false,
  divider    = true,
  showMore   = false,
  onMoreClick,
  rtl        = false,
  className,
  ...rest
}) {
  const containerCls = [
    styles.htabListContainer,
    divider && styles.htabListDivider,
    rtl && styles.rtl,
    className,
  ].filter(Boolean).join(' ');

  const wrapperCls = [
    styles.htabList,
    flush && styles[`htabListFlush${capitalize(size)}`],
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerCls}
      dir={rtl ? 'rtl' : undefined}
      {...rest}
    >
      <div className={wrapperCls} role="tablist">
        {tabs.map((tab) => {
          const selected = tab.id === activeTab;
          const disabled = !!tab.disabled;
          const iconColor = disabled ? '#6C7C96' : '#000B36';

          const cls = [
            styles.htab,
            styles[`htab${capitalize(size)}`],
            selected  && styles.htabSelected,
            disabled  && styles.htabDisabled,
          ].filter(Boolean).join(' ');

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              className={cls}
              disabled={disabled}
              aria-selected={selected}
              onClick={() => !disabled && onTabChange?.(tab.id)}
              tabIndex={disabled ? -1 : 0}
            >
              {showIcons && (tab.icon || <TabIcon color={iconColor} />)}
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          );
        })}
        {showMore && (
          <HorizontalMoreTab size={size} rtl={rtl} onClick={onMoreClick} />
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   HorizontalMoreTab — three-dots overflow button for HorizontalTabList
   ════════════════════════════════════════════════════════════════════ */
export function HorizontalMoreTab({
  size     = 'medium',
  state    = 'default',
  rtl      = false,
  onClick,
  className,
  ...rest
}) {
  const disabled = state === 'disabled';

  const cls = [
    styles.htab,
    styles[`htab${capitalize(size)}`],
    styles.htabMore,
    disabled  && styles.htabDisabled,
    state === 'hovered'  && styles.htabHovered,
    state === 'pressed'  && styles.htabPressed,
    state === 'focused'  && styles.htabFocused,
    rtl && styles.rtl,
    className,
  ].filter(Boolean).join(' ');

  const iconColor = disabled ? '#6C7C96' : '#000B36';

  return (
    <button
      type="button"
      className={cls}
      disabled={disabled}
      onClick={onClick}
      tabIndex={disabled ? -1 : 0}
      dir={rtl ? 'rtl' : undefined}
      aria-label="More options"
      {...rest}
    >
      <ThreeDotsIcon color={iconColor} />
    </button>
  );
}

/* ── util ─────────────────────────────────────────────────────────── */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
