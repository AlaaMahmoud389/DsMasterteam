import styles from './Avatar.module.css';

// ─── Static local assets ─────────────────────────────────────────
import _userIconSvg  from '../../assets/icons/user.svg';
import _addNormalSm  from '../../assets/icons/add-normal-sm.svg';
import _addNormalMd  from '../../assets/icons/add-normal-md.svg';
import _addDisabledSm from '../../assets/icons/add-disabled-sm.svg';
import _addDisabledMd from '../../assets/icons/add-disabled-md.svg';
import _avatar1    from '../../assets/photos/avatar-1.png';
import _avatar2    from '../../assets/photos/avatar-2.png';
import _avatar3    from '../../assets/photos/avatar-3.png';
import _avatar4    from '../../assets/photos/avatar-4.png';
import _figmaDemo  from '../../assets/photos/avatar-figma-demo.png';

// ─── Photo constants ──────────────────────────────────────────────
// FIGMA_PHOTO  : Figma node 4113:655 image-type row placeholder
// ARAB_PHOTOS  : 5 hijabi female portraits (no male) for image rows & groups
// LABEL_PHOTO  : woman in white hijab — used for female persona (Nora)
export const FIGMA_PHOTO = _figmaDemo;
export const ARAB_PHOTOS = [_avatar1, _avatar3, _avatar4, _avatar3, _avatar1];
export const LABEL_PHOTO = _avatar4;

// ─── AvatarAddButton icon (node 4120:317) ────────────────────────
const ADD_BTN_CFG = {
  xs: { px: 24, radius: 12, iconPx: 16, icon: _addNormalSm,  iconDis: _addDisabledSm },
  sm: { px: 32, radius: 16, iconPx: 16, icon: _addNormalSm,  iconDis: _addDisabledSm },
  md: { px: 40, radius: 20, iconPx: 20, icon: _addNormalMd,  iconDis: _addDisabledMd },
};

// User icons — single SVG scales for all sizes (node 4113:655)
export const ICON_URLS = {
  xs_round: _userIconSvg,
  xs_sq:    _userIconSvg,
  sm:       _userIconSvg,
  md:       _userIconSvg,
  xl:       _userIconSvg,
  '2xl':    _userIconSvg,
  '3xl':    _userIconSvg,
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

function getIconUrl() {
  return _userIconSvg;
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
              onError={e => { e.currentTarget.src = _userIconSvg; e.currentTarget.style.objectFit = 'contain'; e.currentTarget.style.padding = '15%'; }}
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
          <svg className={styles.addBtnTooltipArrow} width={16} height={6} viewBox="0 0 16 6" fill="none" aria-hidden="true">
            <path d="M0 0 L8 6 L16 0 Z" fill="#233a61"/>
          </svg>
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
        <img src={isDisabled ? cfg.iconDis : cfg.icon} alt="" width={cfg.iconPx} height={cfg.iconPx} style={{ display: 'block' }} />
      </button>
    </div>
  );
}
