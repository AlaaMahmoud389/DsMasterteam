import styles from './EmptyState.module.css';
import { Button } from '../Button/Button';

// ─── Background pattern assets — Featured icon (node 4770:11221) ──────────────
const BG_CIRCLES_MASK_FI = 'https://www.figma.com/api/mcp/asset/6c10b7a0-93d2-49a7-91bd-386e98d69b9a';
const BG_CIRCLES_IMG_FI  = 'https://www.figma.com/api/mcp/asset/f929f4f9-f4a4-4c27-af04-29c5dd2216e5';

// ─── Background pattern assets — Grid lines / Illustration (node 4770:11188) ──
const BG_GRID_MASK = 'https://www.figma.com/api/mcp/asset/18c48587-1ff7-4e59-ac15-3e4d9724d9f7';
const BG_GRID_V    = 'https://www.figma.com/api/mcp/asset/eca577a8-ab86-4691-b00d-6c4b7ac14199';
const BG_GRID_H    = 'https://www.figma.com/api/mcp/asset/40c7f984-ad33-4d0f-a29c-ecf87eab6127';

// ─── Background pattern assets — File type icon (node 4770:11152) ─────────────
const BG_CIRCLES_MASK_FT = 'https://www.figma.com/api/mcp/asset/a2070bbc-01a6-4813-8453-abf4031fc1f3';
const BG_CIRCLES_IMG_FT  = 'https://www.figma.com/api/mcp/asset/dff68952-9b2d-424b-8bb6-7ae573b00930';

// ─── Featured icon — search-lg (node 4770:11221) ──────────────────────────────
export const SEARCH_ICON = 'https://www.figma.com/api/mcp/asset/7ec2801e-e3c1-47a4-bb1d-7d0f9643c4df';

// ─── File type icon assets (node 4770:11152) ──────────────────────────────────
// imgPage = blue file-page shape; imgIconWrap = folder icon layered on top
const FILE_PAGE     = 'https://www.figma.com/api/mcp/asset/653c88ea-f9e2-45ce-b6a0-0860dad4f97d';
const FILE_BOOKMARK = 'https://www.figma.com/api/mcp/asset/a2f6ff8d-ab5d-4273-93d6-4d821d83d3b6';

// ─── Primary button arrow — arrow-right-02-sharp (node 4796:19877) ────────────
// Figma renders with -rotate-90 -scale-x-100 → CSS: rotate(-90deg) scaleX(-1)
const BTN_ARROW = 'https://www.figma.com/api/mcp/asset/84573b6e-fdf0-47ff-86ae-bd9b69ade439';

// ─── Illustration Cloud sm (node 4770:11408) ──────────────────────────────────
const ILLUS_SM = {
  w: 152, h: 118,
  bgCircle:   'https://www.figma.com/api/mcp/asset/7d0c54fd-6976-48a7-b3cf-1be1c1e2c4c0',
  cloud:      'https://www.figma.com/api/mcp/asset/560810af-64be-4be2-a482-ff824f1db221',
  dot10:      'https://www.figma.com/api/mcp/asset/8dd36360-58fb-4c42-aa6c-9d1416feb864',
  dot14:      'https://www.figma.com/api/mcp/asset/222da1d1-ecdc-401d-a463-cdb98a701982',
  dot8:       'https://www.figma.com/api/mcp/asset/fe337fbd-0bd3-4bda-b579-d2f520f2ff3e',
  searchIcon: 'https://www.figma.com/api/mcp/asset/94e8ac13-d1bb-44fd-893b-6601fb57d2b9',
  bgCircleL: 24, bgCircleSize: 104,
  // Cloud: percentage inset (Figma inset-[13.56%_13.16%_32.2%_13.16%])
  cloudTop: '13.56%', cloudLeft: '13.16%', cloudRight: '13.16%', cloudBottom: '32.2%',
  cloudInner: '0 -17.86% -62.5% -17.86%',
  dots: [
    { src: 'dot10', size: 10, left: 16,  top: 14  },
    { src: 'dot14', size: 14, left: 11,  top: 102 },
    { src: 'dot14', size: 14, left: 138, top: 28  },
    { src: 'dot8',  size: 8,  left: 130, top: 4   },
  ],
  // Overlay: rgba(24,73,169,0.2) + backdrop-blur-[4px] + rounded-[24px]
  overlayL: 52, overlayT: 62, overlaySize: 48, overlayRadius: 24, iconSize: 24,
  bgTop: -188,
};

// ─── Illustration Cloud md (node 4770:11255) ──────────────────────────────────
const ILLUS_MD = {
  w: 172, h: 128,
  bgCircle:   'https://www.figma.com/api/mcp/asset/ba1ac6f0-a49f-42c0-8efc-ba5ef27cc862',
  cloud:      'https://www.figma.com/api/mcp/asset/00febee5-ec9e-4baf-b079-e04a1e610a4f',
  dot12:      'https://www.figma.com/api/mcp/asset/6485c1e2-f88b-4f4b-8d4c-41a940199e20',
  dot16:      'https://www.figma.com/api/mcp/asset/19f2d7b8-af86-4c36-b063-a0368a3b3814',
  dot10:      'https://www.figma.com/api/mcp/asset/f9952c78-d16f-4d96-beaf-eeec859155de',
  searchIcon: 'https://www.figma.com/api/mcp/asset/8d90ba06-cd33-42de-9411-2081882003ab',
  bgCircleL: 22, bgCircleSize: 128,
  // Cloud: absolute position (Figma h-[80px] left-[16px] top-[16px] w-[140px])
  cloudAbsolute: { left: 16, top: 16, width: 140, height: 80 },
  cloudInner: '0 -14.29% -50% -14.29%',
  dots: [
    { src: 'dot12', size: 12, left: 14,  top: 14  },
    { src: 'dot16', size: 16, left: 9,   top: 104 },
    { src: 'dot16', size: 16, left: 152, top: 28  },
    { src: 'dot10', size: 10, left: 144, top: 4   },
  ],
  // Overlay: rgba(24,73,169,0.2) + backdrop-blur-[4px] + rounded-[36px]
  overlayL: 58, overlayT: 60, overlaySize: 56, overlayRadius: 36, iconSize: 28,
  bgTop: -180,
};

// ─── Illustration Cloud lg (node 4770:11270) ──────────────────────────────────
const ILLUS_LG = {
  w: 220, h: 160,
  bgCircle:   'https://www.figma.com/api/mcp/asset/55750f8b-f391-4b4f-8fa9-78b02095e191',
  cloud:      'https://www.figma.com/api/mcp/asset/689d70a3-1c27-4463-8723-949ecdc2060d',
  dot16:      'https://www.figma.com/api/mcp/asset/b7e627c5-5d91-4753-93c5-ecf8e27bc8a0',
  dot12:      'https://www.figma.com/api/mcp/asset/2ff27bcf-8339-4301-9de8-6d9480c1f850',
  dot20:      'https://www.figma.com/api/mcp/asset/9f3fe870-8275-4c90-b42f-7fb1fc17e54e',
  dot14:      'https://www.figma.com/api/mcp/asset/b00edf1a-8bd2-4a4c-ac6a-6d1d768cfb2b',
  searchIcon: 'https://www.figma.com/api/mcp/asset/5474d53f-99e1-430d-8def-ed876fef74e4',
  bgCircleL: 30, bgCircleSize: 160,
  // Cloud: absolute position (Figma h-[99.429px] left-[24px] top-[16px] w-[174px])
  cloudAbsolute: { left: 24, top: 16, width: 174, height: 99.43 },
  cloudInner: '0 -11.49% -40.23% -11.49%',
  dots: [
    { src: 'dot16', size: 16, left: 18,  top: 12  },
    { src: 'dot12', size: 12, left: 192, top: 120 },
    { src: 'dot20', size: 20, left: 15,  top: 128 },
    { src: 'dot20', size: 20, left: 200, top: 36  },
    { src: 'dot14', size: 14, left: 184, top: 4   },
  ],
  // Overlay: rgba(24,73,169,0.2) + backdrop-blur-[4px] + rounded-[36px]
  overlayL: 82, overlayT: 84, overlaySize: 56, overlayRadius: 36, iconSize: 28,
  bgTop: -160,
};

const ILLUS_BY_SIZE = { sm: ILLUS_SM, md: ILLUS_MD, lg: ILLUS_LG };

// ─── Featured icon size config ─────────────────────────────────────────────────
const FEATURED_CFG = {
  sm: { box: 48, radius: 10, iconSize: 24, bgTop: -216 },
  md: { box: 48, radius: 10, iconSize: 24, bgTop: -216 },
  lg: { box: 56, radius: 12, iconSize: 28, bgTop: -212 },
};

// ─── File type icon config ─────────────────────────────────────────────────────
const FILE_CFG = {
  sm: { wrapPad: 32, iconSize: 40, bgTop: -188 },
  md: { wrapPad: 32, iconSize: 40, bgTop: -188 },
  lg: { wrapPad: 32, iconSize: 40, bgTop: -188 },
};

// ─── Background pattern ───────────────────────────────────────────────────────
function BgPattern({ iconType, topOffset }) {
  if (iconType === 'illustration') {
    return (
      <div
        className={styles.bgWrap}
        style={{ top: topOffset, maskImage: `url('${BG_GRID_MASK}')`, WebkitMaskImage: `url('${BG_GRID_MASK}')` }}
      >
        <div className={styles.bgGridLines}>
          <img src={BG_GRID_V} alt="" className={styles.bgGridImg} />
          <img src={BG_GRID_H} alt="" className={styles.bgGridImgH} />
        </div>
      </div>
    );
  }
  const mask = iconType === 'file-type-icon' ? BG_CIRCLES_MASK_FT : BG_CIRCLES_MASK_FI;
  const img  = iconType === 'file-type-icon' ? BG_CIRCLES_IMG_FT  : BG_CIRCLES_IMG_FI;
  return (
    <div
      className={styles.bgWrap}
      style={{ top: topOffset, maskImage: `url('${mask}')`, WebkitMaskImage: `url('${mask}')` }}
    >
      <img src={img} alt="" className={styles.bgCirclesImg} />
    </div>
  );
}

// ─── Featured icon indicator (node 4770:11221) ────────────────────────────────
function FeaturedIconIndicator({ size, icon }) {
  const cfg = FEATURED_CFG[size] ?? FEATURED_CFG.sm;
  return (
    <div
      className={styles.featuredBox}
      style={{ width: cfg.box, height: cfg.box, borderRadius: cfg.radius }}
    >
      <img
        src={icon || SEARCH_ICON}
        alt=""
        style={{ width: cfg.iconSize, height: cfg.iconSize, display: 'block', objectFit: 'contain' }}
      />
    </div>
  );
}

// ─── Illustration indicator — all 3 sizes with exact Figma pixel positions ────
function IllustrationIndicator({ size, icon }) {
  const c = ILLUS_BY_SIZE[size] ?? ILLUS_SM;

  const cloudContent = (
    <img src={c.cloud} alt="" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
  );

  return (
    <div style={{ width: c.w, height: c.h, position: 'relative', flexShrink: 0 }}>
      {/* Background circle */}
      <img
        src={c.bgCircle}
        alt=""
        style={{ position: 'absolute', left: c.bgCircleL, top: 0, width: c.bgCircleSize, height: c.bgCircleSize, display: 'block' }}
      />

      {/* Cloud — sm: percentage inset, md/lg: absolute pixels */}
      {size === 'sm' ? (
        <div style={{ position: 'absolute', top: c.cloudTop, left: c.cloudLeft, right: c.cloudRight, bottom: c.cloudBottom }}>
          <div style={{ position: 'absolute', inset: c.cloudInner }}>
            {cloudContent}
          </div>
        </div>
      ) : (
        <div style={{ position: 'absolute', left: c.cloudAbsolute.left, top: c.cloudAbsolute.top, width: c.cloudAbsolute.width, height: c.cloudAbsolute.height, overflow: 'visible' }}>
          <div style={{ position: 'absolute', inset: c.cloudInner }}>
            {cloudContent}
          </div>
        </div>
      )}

      {/* Decorative dots — exact Figma positions */}
      {c.dots.map((dot, i) => (
        <img
          key={i}
          src={c[dot.src]}
          alt=""
          style={{ position: 'absolute', left: dot.left, top: dot.top, width: dot.size, height: dot.size, display: 'block' }}
        />
      ))}

      {/* Frosted overlay — Figma: backdrop-blur-[4px], rgba(24,73,169,0.2), exact radius per size */}
      <div
        style={{
          position: 'absolute',
          left: c.overlayL,
          top: c.overlayT,
          width: c.overlaySize,
          height: c.overlaySize,
          borderRadius: c.overlayRadius,
          background: 'rgba(24,73,169,0.2)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={icon || c.searchIcon}
          alt=""
          style={{ width: c.iconSize, height: c.iconSize, display: 'block' }}
        />
      </div>
    </div>
  );
}

// ─── File type icon indicator (node 4770:11152) ───────────────────────────────
function FileTypeIconIndicator({ size }) {
  const cfg = FILE_CFG[size] ?? FILE_CFG.sm;
  return (
    <div className={styles.fileWrap} style={{ padding: cfg.wrapPad }}>
      {/* Figma: drop-shadow(0px 1px 1.5px rgba(16,24,40,0.1)) drop-shadow(0px 1px 1px rgba(16,24,40,0.06)) */}
      <div style={{
        position: 'relative',
        width: cfg.iconSize,
        height: cfg.iconSize,
        flexShrink: 0,
        filter: 'drop-shadow(0px 1px 1.5px rgba(16,24,40,0.10)) drop-shadow(0px 1px 1px rgba(16,24,40,0.06))',
      }}>
        {/* Blue file-page shape: inset 0 10% */}
        <img src={FILE_PAGE} alt="" style={{ position: 'absolute', inset: '0 10%', width: '80%', height: '100%', display: 'block', objectFit: 'contain' }} />
      </div>
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────
export function EmptyState({
  iconType       = 'featured-icon',
  size           = 'sm',
  rtl            = false,
  title          = 'No projects found',
  description    = 'Your search "Landing page design" did not match any projects. Please try again.',
  primaryLabel   = 'Button',
  secondaryLabel = 'Button',
  onPrimary,
  onSecondary,
  icon,
  showArrow      = true,
  className,
  style,
}) {
  const bgTop =
    iconType === 'featured-icon'
      ? (FEATURED_CFG[size] ?? FEATURED_CFG.sm).bgTop
      : iconType === 'illustration'
      ? (ILLUS_BY_SIZE[size] ?? ILLUS_SM).bgTop
      : (FILE_CFG[size] ?? FILE_CFG.sm).bgTop;

  return (
    <div
      className={[styles.wrapper, className].filter(Boolean).join(' ')}
      dir={rtl ? 'rtl' : undefined}
      style={style}
    >
      <BgPattern iconType={iconType} topOffset={bgTop} />

      <div className={styles.inner}>
        <div className={styles.content}>
          {iconType === 'featured-icon'  && <FeaturedIconIndicator  size={size} icon={icon} />}
          {iconType === 'illustration'   && <IllustrationIndicator  size={size} icon={icon} />}
          {iconType === 'file-type-icon' && <FileTypeIconIndicator  size={size} />}

          <div className={styles.textGroup}>
            <p className={styles.title}>{title}</p>
            {description && <p className={styles.description}>{description}</p>}
          </div>
        </div>

        {/* Actions — design-system Button component, matching Figma gap-[12px] between buttons */}
        {(primaryLabel || secondaryLabel) && (
          <div className={styles.actions}>
            {secondaryLabel && (
              <Button variant="neutral" size="lg" onClick={onSecondary} dir={rtl ? 'rtl' : 'ltr'}>
                {secondaryLabel}
              </Button>
            )}
            {primaryLabel && (
              <Button
                variant="primary"
                size="lg"
                onClick={onPrimary}
                dir={rtl ? 'rtl' : 'ltr'}
                leadIcon={showArrow ? (
                  <img
                    src={BTN_ARROW}
                    alt=""
                    style={{
                      width: 16,
                      height: 16,
                      display: 'block',
                      flexShrink: 0,
                      // Figma: -rotate-90 -scale-x-100
                      transform: rtl ? 'rotate(90deg) scaleX(1)' : 'rotate(-90deg) scaleX(-1)',
                    }}
                  />
                ) : null}
              >
                {primaryLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
