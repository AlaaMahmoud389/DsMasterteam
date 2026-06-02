import React from 'react';
import styles from './Menu.module.css';
import { Icon } from '../icons/Icon';

/**
 * Menu — Masterteam Design System
 * Figma: nodes 4458:1032 (Menu list item) · 4458:1381 (Menu)
 *
 * Exports:
 *   MenuListItem  — a single interactive row
 *   MenuSection   — a labeled group of items
 *   Menu          — full menu panel
 *
 * MenuListItem props:
 *   label          string   — item text
 *   leadIcon       string   — icon name for the leading icon (null = no icon, 'text-only' style)
 *   trailElement   'none'|'text'|'icon'|'button'|'tag'|'switch'  (default: 'none')
 *   trailText      string   — text shown when trailElement='text'  (e.g. '+99')
 *   trailIcon      string   — icon name when trailElement='icon'   (default: 'tick')
 *   trailTagText   string   — label text when trailElement='tag'   (default: 'Label')
 *   switchChecked  boolean  — checked state when trailElement='switch'
 *   onSwitchChange function — called when switch is toggled
 *   state          'default'|'hovered'|'pressed'|'focused'|'disabled'|'selected'
 *   subItem        boolean  — marks as sub-item (semantic, no visual indent in the item itself)
 *   rtl            boolean
 *   onClick        function
 *
 * MenuSection props:
 *   groupLabel  string   — section header text (uppercase)
 *   items       array of MenuListItem prop objects
 *   rtl         boolean
 *
 * Menu props:
 *   sections  array of { groupLabel, items }
 *   style     'all'|'text-only'|'text-icon'   (default: 'all')
 *   rtl       boolean
 */

/* ── MenuListItem ──────────────────────────────────────────────────── */
export function MenuListItem({
  label = 'Item Label',
  leadIcon = 'list',
  trailElement = 'none',
  trailText = '+99',
  trailIcon = 'tick',
  trailTagText = 'Label',
  switchChecked = false,
  onSwitchChange,
  state = 'default',
  subItem = false,
  rtl = false,
  onClick,
  className,
  ...rest
}) {
  const isDisabled = state === 'disabled';

  const cls = [
    styles.item,
    styles[`state${capitalize(state)}`],
    isDisabled && styles.disabled,
    rtl && styles.rtl,
    subItem && styles.subItem,
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (isDisabled) return;
    onClick?.(e);
  };

  return (
    <div
      className={cls}
      role="menuitem"
      aria-disabled={isDisabled || undefined}
      aria-selected={state === 'selected' || undefined}
      tabIndex={isDisabled ? -1 : 0}
      dir={rtl ? 'rtl' : undefined}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(e); }}
      {...rest}
    >
      {/* Lead icon — hidden for sub-items */}
      {leadIcon && !subItem && (
        <span className={styles.leadIcon} aria-hidden="true">
          <Icon name={leadIcon} size={24} />
        </span>
      )}

      {/* Label */}
      <span className={styles.label}>{label}</span>

      {/* Trail element */}
      {trailElement === 'text' && (
        <span className={styles.trailText}>{trailText}</span>
      )}

      {trailElement === 'icon' && (
        <span className={styles.trailIcon} aria-hidden="true">
          <Icon name={trailIcon} size={24} />
        </span>
      )}

      {trailElement === 'button' && (
        <span className={styles.trailButton} aria-hidden="true">
          <Icon name="chevron-right" size={16} />
        </span>
      )}

      {trailElement === 'tag' && (
        <span className={styles.trailTag}>
          <span className={styles.trailTagText}>{trailTagText}</span>
        </span>
      )}

      {trailElement === 'switch' && (
        <button
          type="button"
          role="switch"
          aria-checked={switchChecked}
          className={[styles.trailSwitch, switchChecked && styles.switchOn].filter(Boolean).join(' ')}
          onClick={(e) => {
            e.stopPropagation();
            if (!isDisabled) onSwitchChange?.(!switchChecked);
          }}
          tabIndex={-1}
          aria-label="Toggle"
        >
          <span className={styles.switchThumb} />
        </button>
      )}
    </div>
  );
}

/* ── MenuSection ───────────────────────────────────────────────────── */
export function MenuSection({
  groupLabel,
  items = [],
  rtl = false,
}) {
  return (
    <div className={styles.section} dir={rtl ? 'rtl' : undefined}>
      {groupLabel && (
        <div className={styles.groupLabel}>{groupLabel}</div>
      )}
      <div className={styles.itemsGroup} role="group" aria-label={groupLabel}>
        {items.map((item, i) => (
          <MenuListItem key={i} rtl={rtl} {...item} />
        ))}
      </div>
    </div>
  );
}

/* ── Menu ──────────────────────────────────────────────────────────── */
export function Menu({
  sections = [],
  style: menuStyle = 'all',
  rtl = false,
  className,
  ...rest
}) {
  const showLeadIcon = menuStyle !== 'text-only';

  return (
    <div
      className={[styles.menu, className].filter(Boolean).join(' ')}
      role="menu"
      dir={rtl ? 'rtl' : undefined}
      {...rest}
    >
      {sections.map((section, i) => (
        <MenuSection
          key={i}
          groupLabel={section.groupLabel}
          rtl={rtl}
          items={section.items.map((item) => ({
            ...item,
            leadIcon: showLeadIcon ? (item.leadIcon ?? 'list') : null,
          }))}
        />
      ))}
    </div>
  );
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
