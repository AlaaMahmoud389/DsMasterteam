import styles from './Avatar.module.css';

// ─── Figma asset URLs ─────────────────────────────────────────────
// Single photo — used for Image-type size demonstrations (node 4113:655)
export const FIGMA_PHOTO = 'https://www.figma.com/api/mcp/asset/fcc09fa1-996d-4aeb-9509-5c06c4fe59a6';

// 5 distinct Arab person photos — used for avatar groups (node 4113:852)
export const ARAB_PHOTOS = [
  'https://www.figma.com/api/mcp/asset/a13b266f-e586-4e3b-b222-c4f78d663224',
  'https://www.figma.com/api/mcp/asset/5250ecb2-799d-4eb8-b621-0d821cf37ef8',
  'https://www.figma.com/api/mcp/asset/d7e41472-3a9a-41db-9cef-5f8131beb44c',
  'https://www.figma.com/api/mcp/asset/b1f0326a-148a-4283-85fd-63925e94bb8b',
  'https://www.figma.com/api/mcp/asset/275ba1ee-7ba3-4261-8bce-95e9a1a6b068',
];

// Photo used in AvatarWithLabel demos (node 4929:1747)
export const LABEL_PHOTO = 'https://www.figma.com/api/mcp/asset/beb273cd-060f-4156-b9cd-177c809cc085';

// ─── AvatarAddButton asset URLs (node 4120:317) ───────────────────
const ADD_ICON_SM     = 'https://www.figma.com/api/mcp/asset/ebfd8a1b-be42-4f5a-8674-d6b85752584e'; // xs/sm
const ADD_ICON_MD     = 'https://www.figma.com/api/mcp/asset/96e72c3d-8443-4f98-bb3d-e5f02ab733db'; // md
const ADD_ICON_SM_DIS = 'https://www.figma.com/api/mcp/asset/e5b963df-332e-4dea-981b-2425766b282a'; // xs/sm disabled
const ADD_ICON_MD_DIS = 'https://www.figma.com/api/mcp/asset/2d81ee84-0f6e-4b16-aa11-c9047b531c8e'; // md disabled
const ADD_TOOLTIP_ARR = 'https://www.figma.com/api/mcp/asset/e254e38a-d3ac-4d6c-bf94-c102fc702754'; // tooltip caret

const ADD_BTN_CFG = {
  xs: { px: 24, radius: 12, iconPx: 16, icon: ADD_ICON_SM,     iconDis: ADD_ICON_SM_DIS },
  sm: { px: 32, radius: 16, iconPx: 16, icon: ADD_ICON_SM,     iconDis: ADD_ICON_SM_DIS },
  md: { px: 40, radius: 20, iconPx: 20, icon: ADD_ICON_MD,     iconDis: ADD_ICON_MD_DIS },
};

// User icons per size — exported so stories can reference them
export const ICON_URLS = {
  xs_round: 'https://www.figma.com/api/mcp/asset/56074f39-801f-4880-979a-243d724cd0c0', // 24px round (16px icon)
  xs_sq:    'https://www.figma.com/api/mcp/asset/3795340f-66cc-4630-81ab-56f25790204f', // 24px square (16px icon)
  sm:       'https://www.figma.com/api/mcp/asset/79b7f739-a225-4a8d-91f4-28bec3577efb', // 32px (24px icon)
  md:       'https://www.figma.com/api/mcp/asset/d16a06b5-8ac7-4e9b-a0ec-85306146fbf8', // 40px / 48px (32px icon)
  xl:       'https://www.figma.com/api/mcp/asset/c93a927b-cb8f-4840-bcd7-add57658684a', // 64px (40px icon)
  '2xl':    'https://www.figma.com/api/mcp/asset/563d9408-3e85-4eee-95d9-d929ea0c5ead', // 80px (56px icon)
  '3xl':    'https://www.figma.com/api/mcp/asset/3cfb8ad1-8dc6-418c-8ded-45f6fce1bcbf', // 120px (80px icon)
};

// ─── Design tokens (Figma node 4113:655) ────────────────────────
// avatar-sm=24 sm2=32 md=40 md2=48 lg=64 lg2=80 xl=120
// Sizes   : xs=24 · sm=32 · md=40 · lg=48 · xl=64 · 2xl=80 · 3xl=120
// Border  : 2px white (all sizes) · 4px white (3xl)
// Ring    : 1px rgba(22,22,22,0.2) (all) · 2px (3xl)
// Shape   : round=9999px · square=4px (all) | 8px (3xl)
const SIZE_CFG = {
  xs:    { px: 24,  font: 10, weight: 700, lh: 14, icon: 16, borderW: 2, ringW: 1, squareR: 4, dot: 8,  dotBorder: 1.5 },
  sm:    { px: 32,  font: 12, weight: 600, lh: 18, icon: 24, borderW: 2, ringW: 1, squareR: 4, dot: 8,  dotBorder: 1.5 },
  md:    { px: 40,  font: 14, weight: 600, lh: 20, icon: 32, borderW: 2, ringW: 1, squareR: 4, dot: 10, dotBorder: 2   },
  lg:    { px: 48,  font: 16, weight: 500, lh: 24, icon: 32, borderW: 2, ringW: 1, squareR: 4, dot: 12, dotBorder: 2   },
  xl:    { px: 64,  font: 20, weight: 500, lh: 30, icon: 40, borderW: 2, ringW: 1, squareR: 4, dot: 14, dotBorder: 2   },
  '2xl': { px: 80,  font: 30, weight: 400, lh: 38, icon: 56, borderW: 2, ringW: 1, squareR: 4, dot: 16, dotBorder: 2   },
  '3xl': { px: 120, font: 36, weight: 400, lh: 44, icon: 80, borderW: 4, ringW: 2, squareR: 8, dot: 20, dotBorder: 2.5, letterSpacing: '-0.72px' },
};

const STATUS_COLORS = {
  online:  '#12b76a',
  offline: '#98a2b3',
  away:    '#f79009',
  notify:  '#f04438',
  primary: '#1849a9',
  badge:   '#175cd3',
};

function CheckIcon() {
  return (
    <svg width="60%" height="60%" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getIconUrl(size, square) {
  if (size === 'xs') return square ? ICON_URLS.xs_sq : ICON_URLS.xs_round;
  if (size === 'lg') return ICON_URLS.md;
  return ICON_URLS[size] || ICON_URLS.md;
}

// ─── Avatar ───────────────────────────────────────────────────────
// type      : 'initials' | 'icon' | 'image'  (also accepts Figma-style 'Initials'|'Icon'|'Image')
// size      : 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
// square    : boolean — 4px radius (8px at 3xl); default round
// border    : boolean — adds rgba(22,22,22,0.2) ring overlay
// initials  : string — shown when type=initials (max 2 chars)
// src       : URL for image type (defaults to Figma photo)
// color     : background color for initials/icon type
// textColor : initials text color (Figma token: #233a61)
// swapIcon  : ReactNode — replace default person icon in icon type
// status    : 'online'|'offline'|'away'|'notify'|'primary'|'badge'
// dir       : 'ltr' | 'rtl'
export function Avatar({
  type = 'initials',
  size = 'md',
  square = false,
  initials = 'AB',
  src,
  alt = '',
  status = null,
  notifyCount,
  color = 'transparent',
  textColor = '#233a61',
  border = false,
  swapIcon,
  dir,
  style,
  className,
}) {
  const cfg = SIZE_CFG[size] || SIZE_CFG.md;
  const radius = square ? cfg.squareR : 9999;
  const isRTL = dir === 'rtl';

  const typeNorm = (type || '').toLowerCase();
  const isImage = typeNorm === 'image';
  const isIcon = typeNorm === 'icon';

  const rootBg = isImage ? '#fff' : color;
  const bgOverlay = isImage ? '#fff' : 'rgba(255,255,255,0.2)';
  const iconUrl = getIconUrl(size, square);

  const initialsStyle = {
    fontSize: cfg.font,
    fontWeight: cfg.weight,
    lineHeight: cfg.lh + 'px',
    color: textColor,
    ...(cfg.letterSpacing ? { letterSpacing: cfg.letterSpacing } : {}),
  };

  return (
    <div
      className={[styles.avatarWrap, className].filter(Boolean).join(' ')}
      style={{ width: cfg.px, height: cfg.px, ...style }}
      dir={dir}
      role="img"
      aria-label={alt || (isImage ? 'avatar image' : isIcon ? 'user icon' : initials)}
    >
      {/* ── Inner circle — overflow:hidden clips image/initials/icon ── */}
      <div
        className={styles.root}
        style={{ width: cfg.px, height: cfg.px, borderRadius: radius, background: rootBg }}
      >
        {/* ── bg layer: white border ring + alpha overlay ── */}
        <div
          className={styles.bg}
          style={{
            borderRadius: 'inherit',
            background: bgOverlay,
            border: `${cfg.borderW}px solid #fff`,
            boxSizing: 'border-box',
          }}
        />

        {/* ── Initials ── */}
        {!isImage && !isIcon && (
          <span className={styles.initials} style={initialsStyle}>
            {String(initials).slice(0, 2).toUpperCase()}
          </span>
        )}

        {/* ── Icon — Figma asset image ── */}
        {isIcon && (
          <span className={styles.iconWrap}>
            {swapIcon || (
              <img
                src={iconUrl}
                alt=""
                width={cfg.icon}
                height={cfg.icon}
                style={{ display: 'block' }}
              />
            )}
          </span>
        )}

        {/* ── Image ── */}
        {isImage && (
          <div
            className={styles.imageWrap}
            style={{
              borderRadius: 'inherit',
              border: `${cfg.borderW}px solid #fff`,
              boxSizing: 'border-box',
            }}
          >
            <img
              className={styles.img}
              src={src || FIGMA_PHOTO}
              alt={alt}
            />
          </div>
        )}

        {/* ── Ring overlay (border prop) ── */}
        {border && (
          <div
            className={styles.ring}
            style={{
              borderRadius: 'inherit',
              border: `${cfg.ringW}px solid rgba(22,22,22,0.2)`,
            }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* ── Status dot — outside overflow:hidden so it renders in front ── */}
      {status && (
        <span
          className={styles.statusDot}
          style={{
            width: cfg.dot,
            height: cfg.dot,
            borderRadius: status === 'badge' ? 4 : 9999,
            background: STATUS_COLORS[status] || STATUS_COLORS.online,
            borderWidth: cfg.dotBorder,
            [isRTL ? 'left' : 'right']: 0,
            transform: `translate(${isRTL ? '-20%' : '20%'}, 20%)`,
          }}
          aria-label={`Status: ${status}`}
        >
          {status === 'badge' && <CheckIcon />}
          {status === 'notify' && notifyCount != null && (
            <span className={styles.notifyCount}>{notifyCount}</span>
          )}
        </span>
      )}
    </div>
  );
}

// ─── AvatarGroup ──────────────────────────────────────────────────
export function AvatarGroup({ children, stacked = true, size = 'sm', max = 5, overflowLabel }) {
  const items = (Array.isArray(children) ? children : [children]).filter(Boolean);
  const visible = items.slice(0, max);
  const overflow = items.length - max;
  const cfg = SIZE_CFG[size] || SIZE_CFG.sm;
  const overlapOffset = Math.round(cfg.px * 0.22);
  const overflowText = overflowLabel || `+${overflow}`;

  return (
    <div className={[styles.group, stacked ? styles.stacked : styles.spaced].filter(Boolean).join(' ')}>
      {visible.map((child, i) => (
        <div
          key={i}
          className={stacked ? styles.stackItem : undefined}
          style={stacked
            ? { marginInlineEnd: i < visible.length - 1 || overflow > 0 ? -overlapOffset : 0, zIndex: visible.length - i }
            : undefined}
        >
          {child}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={[styles.root, styles.stackItem].join(' ')}
          style={{ width: cfg.px, height: cfg.px, borderRadius: 9999, zIndex: 0, marginInlineEnd: 0, background: '#dbeafe' }}
        >
          <div className={styles.bg} style={{ borderRadius: 9999, background: 'rgba(255,255,255,0.2)', border: '2px solid #fff', boxSizing: 'border-box' }} />
          <span className={styles.initials} style={{ fontSize: cfg.font, fontWeight: cfg.weight, lineHeight: cfg.lh + 'px', color: '#233a61' }}>
            {overflowText}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── AvatarWithLabel ──────────────────────────────────────────────
export function AvatarWithLabel({
  src,
  initials = 'AB',
  type = 'initials',
  color = 'transparent',
  textColor = '#233a61',
  size = 'md',
  name = 'User Name',
  caption,
  status = null,
  border = false,
  dir = 'ltr',
}) {
  // Figma node 4929:1747 — Text sm/Medium for sm+md, Text md/Medium for lg
  const nameFontSize = { xs: 12, sm: 14, md: 14, lg: 16 }[size] ?? 14;
  const capFontSize  = { xs: 10, sm: 12, md: 14, lg: 16 }[size] ?? 12;
  const groupGap     = size === 'sm' ? 10 : 12;

  return (
    <div className={styles.labelGroup} style={{ gap: groupGap }} dir={dir}>
      <Avatar type={type} size={size} initials={initials} src={src} color={color} textColor={textColor} status={status} border={border} alt={name} dir={dir} />
      <div className={styles.labelText}>
        <span className={styles.labelName} style={{ fontSize: nameFontSize }}>{name}</span>
        {caption && <span className={styles.labelCaption} style={{ fontSize: capFontSize }}>{caption}</span>}
      </div>
    </div>
  );
}

// ─── AvatarAddButton ──────────────────────────────────────────────
// Figma node 4120:317 — "+" button used alongside avatar groups
// size  : 'xs' (24px) | 'sm' (32px) | 'md' (40px)
// state : 'default' | 'hover' | 'focus' | 'disabled'
export function AvatarAddButton({
  size = 'xs',
  state = 'default',
  label = 'Add user',
  onClick,
  className,
  style,
}) {
  const cfg = ADD_BTN_CFG[size] || ADD_BTN_CFG.xs;
  const isDisabled = state === 'disabled';
  const isFocus    = state === 'focus';
  const isHover    = state === 'hover';
  const iconSrc    = isDisabled ? cfg.iconDis : cfg.icon;

  const btnCls = [
    styles.addBtn,
    isDisabled && styles.addBtnDisabled,
    isFocus    && styles.addBtnFocus,
    isHover    && styles.addBtnHover,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.addBtnWrap} style={style}>
      {/* Tooltip — visible when state="hover" */}
      {isHover && (
        <div className={styles.addBtnTooltip}>
          <div className={styles.addBtnTooltipBody}>
            <span className={styles.addBtnTooltipText}>{label}</span>
          </div>
          <img className={styles.addBtnTooltipArrow} src={ADD_TOOLTIP_ARR} alt="" width={16} height={6} />
        </div>
      )}

      <button
        type="button"
        className={btnCls}
        style={{ width: cfg.px, height: cfg.px, borderRadius: cfg.radius }}
        disabled={isDisabled}
        onClick={!isDisabled ? onClick : undefined}
        aria-label={label}
      >
        <img src={iconSrc} alt="" width={cfg.iconPx} height={cfg.iconPx} style={{ display: 'block' }} />
      </button>
    </div>
  );
}
