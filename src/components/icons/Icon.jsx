import PropTypes from 'prop-types';

/**
 * Icon — Masterteam Design System
 * Source: Figma · Icons page (node 258:3) · Huge Icon Set v2.0 · Sharp style
 *
 * Each icon is a 24×24 viewBox inline SVG.
 * Stroke width: 1.5 · strokeLinecap / strokeLinejoin: round · fill: none
 * Color via CSS currentColor — set on parent or via className/style.
 *
 * Directional icons (arrow-*) should be mirrored in RTL:
 *   style={{ transform: dir === 'rtl' ? 'scaleX(-1)' : 'none' }}
 */

/* ── Icon path registry ─────────────────────────────────────────── */

const ICONS = {
  /* Weather / Context --------------------------------------------- */
  'cloud-loading':        'M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z M12 15v1.5M11 15.75h2',

  /* Mic & Zoom (SecondNavHeader action buttons) ------------------- */
  'mic-01':               'M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z M5 10a7 7 0 0 0 14 0M12 19v3M8 22h8',
  'zoom-out-area':        'M3 3l6 6M3 3h5M3 3v5M21 3l-6 6M21 3h-5M21 3v5M3 21l6-6M3 21h5M3 21v-5M21 21l-6-6M21 21h-5M21 21v-5',
  'zoom-in-area':         'M3 3h5M3 3v5M9 9L3 3M21 3h-5M21 3v5M15 9L21 3M3 21h5M3 21v-5M9 15L3 21M21 21h-5M21 21v-5M15 15L21 21',

  /* Arrows -------------------------------------------------------- */
  'arrow-right':          'M5 12H19M19 12L13 6M19 12L13 18',
  'arrow-left':           'M19 12H5M5 12L11 6M5 12L11 18',
  'arrow-up':             'M12 19V5M12 5L6 11M12 5L18 11',
  'arrow-down':           'M12 5V19M12 19L6 13M12 19L18 13',
  'arrow-up-right':       'M7 17L17 7M17 7H7M17 7V17',
  'arrow-down-left':      'M17 7L7 17M7 17H17M7 17V7',
  'arrow-reload':         'M1 4v6h6M23 20v-6h-6M20.49 9a9 9 0 0 0-17.15 2.37M3.51 15a9 9 0 0 0 17.15-2.37',

  /* Chevrons ------------------------------------------------------ */
  'chevron-right':        'M9 6L15 12L9 18',
  'chevron-left':         'M15 6L9 12L15 18',
  'chevron-up':           'M18 15L12 9L6 15',
  'chevron-down':         'M6 9L12 15L18 9',
  'chevron-right-double': 'M6 6L12 12L6 18M12 6L18 12L12 18',
  'chevron-left-double':  'M18 6L12 12L18 18M12 6L6 12L12 18',

  /* Actions ------------------------------------------------------- */
  'cancel':               'M18 6L6 18M6 6L18 18',
  'cancel-circle':        'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM9 9L15 15M15 9L9 15',
  'add':                  'M12 5V19M5 12H19',
  'add-circle':           'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 8V16M8 12H16',
  'minus':                'M5 12H19',
  'minus-circle':         'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8 12H16',
  'tick':                 'M20 6L9 17L4 12',
  'tick-double':          'M3 12L8 17L15 8M9 17L21 5',
  'tick-circle':          'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8 12L10.5 14.5L16 9',

  /* Edit & File --------------------------------------------------- */
  'edit':                 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
  'delete':               'M3 6H21M8 6V4C8 3.45 8.21 2.96 8.59 2.59C8.96 2.21 9.47 2 10 2H14C14.53 2 15.04 2.21 15.41 2.59C15.79 2.96 16 3.45 16 4V6M19 6L18 20C18 20.53 17.79 21.04 17.41 21.41C17.04 21.79 16.53 22 16 22H8C7.47 22 6.96 21.79 6.59 21.41C6.21 21.04 6 20.53 6 20L5 6H19Z',
  'copy':                 'M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1',

  /* Search & Filter ----------------------------------------------- */
  'search':               'M21 21L16.65 16.65M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
  'filter':               'M2 4H22L14.5 12V19L9.5 21V12L2 4Z',
  'sort':                 'M3 6H21M7 12H17M10 18H14',

  /* Eye ----------------------------------------------------------- */
  'eye':                  'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  'eye-off':              'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1L23 23M14.12 14.12a3 3 0 0 1-4.24-4.24',

  /* Home & Navigation --------------------------------------------- */
  'home':                 'M3 9L12 2L21 9V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2ZM9 22V12H15V22',
  'link':                 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  'external-link':        'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3',

  /* User ---------------------------------------------------------- */
  'user':                 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
  'user-circle':          'M12 22c5.5228 0 10-4.4772 10-10S17.5228 2 12 2 2 6.4772 2 12s4.4772 10 10 10zM12 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM5.47 19.3a9 9 0 0 1 13.06 0',
  'users':                'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',

  /* Notification & Alert ------------------------------------------ */
  'bell':                 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0',
  'bell-off':             'M13.73 21a2 2 0 0 1-3.46 0M18.63 13A17.89 17.89 0 0 1 18 8M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14M18 8a6 6 0 0 0-9.33-5M1 1L23 23',
  'notification':         'M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zM18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9',
  'alert':                'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0ZM12 9v4M12 17h.01',
  'information-circle':   'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01',
  'help-circle':          'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01',

  /* Settings ------------------------------------------------------ */
  'setting':              'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',

  /* Media --------------------------------------------------------- */
  'star':                 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  'heart':                'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
  'bookmark':             'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z',

  /* Calendar & Time ----------------------------------------------- */
  'calendar':             'M8 2v4M16 2v4M3 10h18M21 8V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2z',
  'time':                 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',

  /* Download & Upload --------------------------------------------- */
  'download':             'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
  'upload':               'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12',
  'share':                'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13',

  /* Layout -------------------------------------------------------- */
  'grid':                 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  'list':                 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  'menu':                 'M3 12h18M3 6h18M3 18h18',
  'more-horizontal':      'M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  'more-vertical':        'M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',

  /* Communication ------------------------------------------------- */
  'message':              'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  'mail':                 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6',
  'phone':                'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z',

  /* Data ---------------------------------------------------------- */
  'chart-bar':            'M18 20V10M12 20V4M6 20v-6',
  'chart-line':           'M3 3v18h18M18.5 8.5l-5.5 5.5-4-4-4 4',
  'database':             'M12 2C6.48 2 2 4.24 2 7s4.48 5 10 5 10-2.24 10-5-4.48-5-10-5zM2 17c0 2.76 4.48 5 10 5s10-2.24 10-5M2 12c0 2.76 4.48 5 10 5s10-2.24 10-5',
};

/* ── Icon component ─────────────────────────────────────────────── */

export function Icon({
  name,
  size = 24,
  color,
  style,
  className,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
  ...rest
}) {
  const path = ICONS[name];

  if (!path) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[Icon] Unknown icon: "${name}". Available: ${Object.keys(ICONS).join(', ')}`);
    }
    return null;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      style={{ color, ...style }}
      className={className}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ?? (ariaLabel ? undefined : 'true')}
      {...rest}
    >
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** All icon names registered in the design system */
export const ICON_NAMES = Object.keys(ICONS);

Icon.propTypes = {
  /** Icon name from the Figma design system (Huge Icon Set v2.0 · Sharp style) */
  name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
  /** Icon size in px — matches Figma sizes 16 / 20 / 24 / 32 */
  size: PropTypes.oneOf([16, 20, 24, 32]),
  /** CSS color value — overrides currentColor */
  color: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  /** Accessible label for standalone icons */
  'aria-label': PropTypes.string,
  /** Explicitly set aria-hidden (default: true when no aria-label) */
  'aria-hidden': PropTypes.oneOf(['true', 'false', true, false]),
};
