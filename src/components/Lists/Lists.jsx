import React from 'react';
import styles from './Lists.module.css';
import { Icon } from '../icons/Icon';

/**
 * Lists — Masterteam Design System
 * Figma: nodes 4389:245 (List item) · 4389:154 (List)
 *
 * Components exported:
 *   ListItem  — a single list row
 *   List      — full list with automatic marker numbering
 *
 * ListItem props:
 *   children  string   — label text
 *   type      'ordered' | 'unordered' | 'with-icon'  (default: 'unordered')
 *   level     1 | 2                                  (default: 1)
 *   style     'primary' | 'neutral' | 'on-color'     (default: 'primary')
 *   rtl       boolean
 *   marker    string   — override the auto-generated marker ('1-', 'a-', '-', '•')
 *   icon      string   — icon name for type='with-icon'  (default: 'chevron-right')
 *
 * List props:
 *   items     Array<{ children, level? }>
 *   type      same as ListItem
 *   style     same as ListItem
 *   rtl       boolean
 *   icon      string   — icon for type='with-icon'
 */

/* ── ListItem ──────────────────────────────────────────────────────── */
export function ListItem({
  children,
  type = 'unordered',
  level = 1,
  style: listStyle = 'primary',
  rtl = false,
  marker,
  icon = 'chevron-right',
  className,
}) {
  const styleClass = {
    primary: styles.stylePrimary,
    neutral: styles.styleNeutral,
    'on-color': styles.styleOnColor,
  }[listStyle] ?? styles.stylePrimary;

  const cls = [
    styles.listItem,
    level === 2 && styles.levelTwo,
    rtl && styles.rtl,
    styleClass,
    className,
  ].filter(Boolean).join(' ');

  const resolvedMarker = marker ?? defaultMarker(type, level);

  return (
    <div className={cls} dir={rtl ? 'rtl' : undefined}>
      {type === 'with-icon' ? (
        <span className={styles.iconMarker} aria-hidden="true">
          <Icon name={icon} size={16} />
        </span>
      ) : (
        <span className={styles.marker} aria-hidden="true">{resolvedMarker}</span>
      )}
      <span className={styles.label}>{children}</span>
    </div>
  );
}

/* ── List ──────────────────────────────────────────────────────────── */
export function List({
  items = [],
  type = 'unordered',
  style: listStyle = 'primary',
  rtl = false,
  icon = 'chevron-right',
  className,
}) {
  const withMarkers = computeMarkers(items, type);

  return (
    <div className={[styles.list, className].filter(Boolean).join(' ')}>
      {withMarkers.map(({ children, level = 1, marker }, i) => (
        <ListItem
          key={i}
          type={type}
          level={level}
          style={listStyle}
          rtl={rtl}
          marker={marker}
          icon={icon}
        >
          {children}
        </ListItem>
      ))}
    </div>
  );
}

/* ── helpers ───────────────────────────────────────────────────────── */

function defaultMarker(type, level) {
  if (type === 'ordered') return level === 1 ? '1-' : 'a-';
  if (type === 'unordered') return level === 1 ? '-' : '•';
  return '';
}

function computeMarkers(items, type) {
  let l1Counter = 0;
  let l2Counter = 0;
  return items.map((item) => {
    const level = item.level ?? 1;
    let marker = '';
    if (type === 'ordered') {
      if (level === 1) {
        l1Counter += 1;
        l2Counter = 0;
        marker = `${l1Counter}-`;
      } else {
        l2Counter += 1;
        marker = `${String.fromCharCode(96 + l2Counter)}-`;
      }
    } else if (type === 'unordered') {
      marker = level === 1 ? '-' : '•';
    }
    return { ...item, marker };
  });
}
