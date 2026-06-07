import React, { useState } from 'react';
import styles from './Tree.module.css';
import { Switch } from '../Switch/Switch';

/* ═══════════════════════════════════════════════════════════════════
   Internal icons
   ═══════════════════════════════════════════════════════════════════ */

function ChevronIcon({ size = 24, color = '#000B36', expanded = false, rtl = false }) {
  const deg = expanded ? 90 : (rtl ? 180 : 0);
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" aria-hidden="true"
      style={{ transform: `rotate(${deg}deg)`, transition: 'transform 200ms ease', flexShrink: 0 }}
    >
      <path d="M9 6l6 6-6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   State color tokens
   ═══════════════════════════════════════════════════════════════════ */

const ICON_COLOR = {
  default:  '#000B36',
  hovered:  '#000B36',
  pressed:  '#000B36',
  selected: '#000B36',
  disabled: '#6C7C96',
};

/* ═══════════════════════════════════════════════════════════════════
   TreeItem  — single row
   ═══════════════════════════════════════════════════════════════════ */

export function TreeItem({
  label         = 'Item',
  level         = 1,
  state         = 'default',
  hasChildren   = false,
  isExpanded    = false,
  icon,
  showIcon1     = false,
  icon1,
  showIcon2     = false,
  icon2,
  showIcon3     = false,
  icon3,
  showSwitch    = false,
  switchChecked = false,
  onSwitchChange,
  rtl           = false,
  onClick,
  className,
}) {
  const isDisabled  = state === 'disabled';
  const iconColor   = ICON_COLOR[state] ?? '#000B36';
  const textColor   = isDisabled ? '#6C7C96' : '#000B36';
  const marginStart = (level - 1) * 16;

  const rowCls = [
    styles.row,
    styles[`state${state.charAt(0).toUpperCase() + state.slice(1)}`],
    className,
  ].filter(Boolean).join(' ');

  const wrapIcon = (el, size = 24) => {
    if (!el || !React.isValidElement(el)) return null;
    return (
      <span className={styles.iconWrap} style={{ color: iconColor }}>
        {React.cloneElement(el, { size: el.props.size ?? size })}
      </span>
    );
  };

  const hasRight = showIcon1 || showIcon2 || showIcon3 || showSwitch;

  return (
    <div
      className={rowCls}
      style={{ marginInlineStart: marginStart }}
      onClick={!isDisabled ? onClick : undefined}
      dir={rtl ? 'rtl' : undefined}
      aria-disabled={isDisabled || undefined}
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
    >
      {/* Dropdown chevron — only rendered when the item has children */}
      {hasChildren && (
        <span className={styles.chevronWrap}>
          <ChevronIcon size={24} color={iconColor} expanded={isExpanded} rtl={rtl} />
        </span>
      )}

      {/* Item icon */}
      {icon && wrapIcon(icon, 24)}

      {/* Label */}
      <span className={styles.label} style={{ color: textColor }}>{label}</span>

      {/* Right group — action icons (20px) + switch */}
      {hasRight && (
        <span className={styles.rightGroup}>
          {showIcon1 && wrapIcon(icon1, 20)}
          {showIcon2 && wrapIcon(icon2, 20)}
          {showIcon3 && wrapIcon(icon3, 20)}
          {showSwitch && (
            <Switch
              checked={switchChecked}
              state={isDisabled ? 'disabled' : 'default'}
              onChange={!isDisabled ? onSwitchChange : undefined}
              rtl={rtl}
            />
          )}
        </span>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Tree  — recursive stateful wrapper
   ═══════════════════════════════════════════════════════════════════ */

function renderNodes(nodes, { level, expandedIds, switchStates, onToggle, onSwitchChange, rtl }) {
  return nodes.map((node) => {
    const hasChildren = !!(node.children && node.children.length > 0);
    const isExpanded  = expandedIds.has(node.id);

    return (
      <React.Fragment key={node.id}>
        <TreeItem
          label={node.label}
          level={Math.min(level, 4)}
          state={node.state ?? 'default'}
          hasChildren={hasChildren}
          isExpanded={isExpanded}
          icon={node.icon}
          showIcon1={!!node.showIcon1}
          icon1={node.icon1}
          showIcon2={!!node.showIcon2}
          icon2={node.icon2}
          showIcon3={!!node.showIcon3}
          icon3={node.icon3}
          showSwitch={!!node.showSwitch}
          switchChecked={switchStates[node.id] ?? node.switchChecked ?? false}
          onSwitchChange={(checked) => onSwitchChange(node.id, checked)}
          rtl={rtl}
          onClick={() => hasChildren && onToggle(node.id)}
        />
        {isExpanded && hasChildren && renderNodes(node.children, {
          level: level + 1,
          expandedIds,
          switchStates,
          onToggle,
          onSwitchChange,
          rtl,
        })}
      </React.Fragment>
    );
  });
}

export function Tree({ items = [], rtl = false, className }) {
  const [expandedIds,  setExpandedIds]  = useState(new Set());
  const [switchStates, setSwitchStates] = useState({});

  const handleToggle = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSwitchChange = (id, checked) => {
    setSwitchStates((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <div
      className={[styles.tree, className].filter(Boolean).join(' ')}
      role="tree"
      dir={rtl ? 'rtl' : undefined}
    >
      {renderNodes(items, {
        level: 1,
        expandedIds,
        switchStates,
        onToggle:       handleToggle,
        onSwitchChange: handleSwitchChange,
        rtl,
      })}
    </div>
  );
}
