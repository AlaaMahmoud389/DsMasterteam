import React from 'react';
import styles from './Tags.module.css';

/* ═══════════════════════════════════════════════════════════════════
   Color maps
   ═══════════════════════════════════════════════════════════════════ */

const STATUS_COLORS = {
  subtle: {
    neutral: { bg: '#F3F4F6', text: '#000B36', circle: '#000B36' },
    success: { bg: '#E6F4EE', text: '#006121', circle: '#006121' },
    primary: { bg: '#F3F4F6', text: '#1849A9', circle: '#1849A9' },
    warning: { bg: '#FEF4E6', text: '#DD7600', circle: '#DD7600' },
    error:   { bg: '#FDECEB', text: '#A30000', circle: '#A30000' },
  },
  inverted: {
    neutral: { bg: '#1F2A37', text: '#F3F4F6', circle: '#F3F4F6' },
    success: { bg: '#007B3B', text: '#F3F4F6', circle: '#F3F4F6' },
    primary: { bg: '#1570EF', text: '#F3F4F6', circle: '#F3F4F6' },
    warning: { bg: '#F79009', text: '#F3F4F6', circle: '#F3F4F6' },
    error:   { bg: '#F04438', text: '#F3F4F6', circle: '#F3F4F6' },
  },
  ghost: {
    neutral: { bg: 'transparent', text: '#000B36', circle: '#000B36' },
    success: { bg: 'transparent', text: '#006121', circle: '#006121' },
    primary: { bg: 'transparent', text: '#1849A9', circle: '#1849A9' },
    warning: { bg: 'transparent', text: '#DD7600', circle: '#DD7600' },
    error:   { bg: 'transparent', text: '#A30000', circle: '#A30000' },
  },
};

const TAG_COLORS = {
  neutral: { bg: '#F3F4F6', stroke: '#D2D6DB', text: '#000B36', icon: '#000B36' },
  success: { bg: '#E6F4EE', stroke: '#9CD4BB', text: '#006121', icon: '#006121' },
  primary: { bg: '#F3F4F6', stroke: '#CED3DC', text: '#1849A9', icon: '#1849A9' },
  warning: { bg: '#FEF4E6', stroke: '#FDDEB5', text: '#DD7600', icon: '#DD7600' },
  error:   { bg: '#FDECEB', stroke: '#F68F87', text: '#A30000', icon: '#A30000' },
};

/* ═══════════════════════════════════════════════════════════════════
   Size maps
   ═══════════════════════════════════════════════════════════════════ */

const STATUS_SIZES = {
  medium: { height: 32, paddingX: 16, fontSize: 16, lineHeight: 24, circleSize: 10, gap: 8 },
  small:  { height: 24, paddingX: 8,  fontSize: 14, lineHeight: 20, circleSize: 10, gap: 6 },
  xsmall: { height: 20, paddingX: 8,  fontSize: 10, lineHeight: 14, circleSize: 10, gap: 4 },
};

const TAG_SIZES = {
  medium: { height: 32, paddingX: 16, fontSize: 16, lineHeight: 24, iconSize: 16 },
  small:  { height: 24, paddingX: 8,  fontSize: 14, lineHeight: 20, iconSize: 14 },
  xsmall: { height: 20, paddingX: 8,  fontSize: 10, lineHeight: 14, iconSize: 12 },
};

/* ═══════════════════════════════════════════════════════════════════
   StatusTag
   ═══════════════════════════════════════════════════════════════════ */

export function StatusTag({
  status   = 'neutral',
  type     = 'subtle',
  size     = 'medium',
  rtl      = false,
  children = 'Status',
}) {
  const col = (STATUS_COLORS[type] ?? STATUS_COLORS.subtle)[status] ?? STATUS_COLORS.subtle.neutral;
  const sz  = STATUS_SIZES[size] ?? STATUS_SIZES.medium;

  return (
    <span
      className={styles.statusTag}
      dir={rtl ? 'rtl' : 'ltr'}
      style={{
        height:             sz.height,
        paddingInlineStart: sz.paddingX,
        paddingInlineEnd:   sz.paddingX,
        fontSize:           sz.fontSize,
        lineHeight:         `${sz.lineHeight}px`,
        backgroundColor:    col.bg,
        color:              col.text,
        gap:                sz.gap,
      }}
    >
      <span
        className={styles.statusCircle}
        style={{ width: sz.circleSize, height: sz.circleSize, backgroundColor: col.circle }}
        aria-hidden="true"
      />
      <span>{children}</span>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Tag
   ═══════════════════════════════════════════════════════════════════ */

export function Tag({
  status    = 'neutral',
  size      = 'medium',
  rtl       = false,
  rounded   = false,
  outline   = false,
  iconOnly  = false,
  leadIcon  = null,
  trailIcon = null,
  children  = 'Tag',
}) {
  const col = TAG_COLORS[status] ?? TAG_COLORS.neutral;
  const sz  = TAG_SIZES[size]    ?? TAG_SIZES.medium;

  const renderIcon = (icon) => {
    if (!icon || !React.isValidElement(icon)) return null;
    return (
      <span
        className={styles.tagIcon}
        style={{ width: sz.iconSize, height: sz.iconSize, color: col.icon }}
        aria-hidden="true"
      >
        {React.cloneElement(icon, { size: sz.iconSize })}
      </span>
    );
  };

  return (
    <span
      className={styles.tag}
      dir={rtl ? 'rtl' : 'ltr'}
      style={{
        height:          sz.height,
        width:           iconOnly ? sz.height : undefined,
        paddingInlineStart: iconOnly ? 0 : sz.paddingX,
        paddingInlineEnd:   iconOnly ? 0 : sz.paddingX,
        justifyContent:  iconOnly ? 'center' : undefined,
        fontSize:        sz.fontSize,
        lineHeight:      `${sz.lineHeight}px`,
        backgroundColor: col.bg,
        borderColor:     outline ? col.text : col.stroke,
        color:           col.text,
        borderRadius:    rounded ? 9999 : 4,
      }}
    >
      {iconOnly
        ? renderIcon(leadIcon ?? trailIcon)
        : <>
            {leadIcon  && renderIcon(leadIcon)}
            <span className={styles.tagText}>{children}</span>
            {trailIcon && renderIcon(trailIcon)}
          </>
      }
    </span>
  );
}
