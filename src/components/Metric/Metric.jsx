import styles from './Metric.module.css';

const A = 'https://www.figma.com/api/mcp/asset/';

// ─── Change badge icons ─────────────────────────────────────────────────────
const ICON_ARROW_POS  = A + '471a028e-2b88-4982-9e62-d25e902ccac7'; // arrow-up-02 positive
const ICON_ARROW_NEG  = A + 'cfac78f6-14ec-4811-b373-0becd29183ca'; // arrow-up-02 negative
const ICON_TRADE_UP   = A + '7263cd5b-39b0-4d3f-b704-467da3422049'; // trade-up
const ICON_TRADE_DOWN = A + '6bffedd8-aac4-479a-827f-d04f11a5ef8b'; // trade-down

// ─── Small Chart assets 128 × 64 ───────────────────────────────────────────
const SM = {
  Wavy:     { Positive: { bg: A+'d6378dd4-daa6-4ade-abe2-f0c408790309', line: A+'3d94b41d-2749-42cc-b99b-07b22a53ae81' },
              Negative: { bg: A+'9947f32a-48a6-4d78-8e5f-3a51d2fad8da', line: A+'fa14a446-0223-4811-9b28-a389efccb081', mirror: true } },
  Realistic:{ Positive: { bg: A+'27934ea2-e469-47ba-a984-99d319ed3d63', line: A+'fe17cf88-cee0-40a5-8f5d-10af722d9ade' },
              Negative: { bg: A+'5ce026ec-174c-4233-a258-353dce7cd78e', line: A+'f22377da-0e41-40c9-a915-639a456cb4f9' } },
  Straight: { Positive: { bg: A+'6ac2b450-3cf1-4e6b-8d66-c68205f67298', line: A+'3d010701-042d-4d9c-bb39-f3e1cfcc9bc9' },
              Negative: { bg: A+'a5ee92b5-cb0e-4551-93ad-c9fa26d31707', line: A+'955ab3fb-cf7a-4c51-b021-d372d3c6a35c' } },
  Layers:   { Positive: { bg: A+'fd8bc0eb-e99c-4826-b8d0-4f0228eabda9', line: A+'1a8b072b-ec0d-45b5-89c6-1c2d54c647e0', layerTop: '12px' },
              Negative: { bg: A+'becc706e-90ad-4644-8824-92531caf751f', line: A+'e1c8da81-c96d-47be-bb0f-a0121eb9bfa9', layerTop: '18px' } },
};

// ─── Large Chart assets 328 × 64 ───────────────────────────────────────────
const LG = {
  Wavy:     { Positive: { bg: A+'3bcbba6c-69b1-471b-be80-4d732ceaad2c', line: A+'6c501c9a-9b9f-4568-9ec8-2036b847387b' },
              Negative: { bg: A+'a3eaa951-0b19-45a7-8272-674027eb16bd', line: A+'d7aadf99-63e0-4a0d-ac58-a72e83486fd7', mirror: true } },
  Realistic:{ Positive: { bg: A+'0d7988b2-ad5f-4ef1-8c76-396ddcf13bc4', line: A+'6afada0b-b121-4ace-8e38-c7eaefac945b' },
              Negative: { bg: A+'adb2ff16-5dbc-4507-a460-69adfef8ed82', line: A+'a717b559-8f08-47ce-a4d3-fe4baaf2854b', separateBg: true } },
  Straight: { Positive: { bg: A+'9d491451-3c03-435d-b98a-15fae007ac66', line: A+'2ce2e21f-3be7-45a8-9775-d6c841d521e6' },
              Negative: { bg: A+'28fd2245-1754-4d09-8793-75556caad407', line: A+'25a6af24-6f7c-4bf9-a909-9acb426fea11' } },
  Layers:   { Positive: { bg: A+'a810276a-f0aa-4200-b60e-bbb0a8f9de5a', line: A+'e92d4f78-1b8a-4c27-8ccc-42f61dd11808', layerTop: '12px' },
              Negative: { bg: A+'1b843122-1966-437b-9b49-4b1e54c4ca33', line: A+'836edcca-fff8-4a4f-b886-cc1dfc2b0d63', layerTop: '18px' } },
};

// ─── Featured icon badge (gear) — fresh per variant ─────────────────────────
const ICON_FT_SM_LTR = A + 'da52b5a6-0c78-469d-bd81-19fbf189c2f1'; // SM LTR
const ICON_FT_RTL    = A + '961c7083-bd3e-4062-9b17-c1de2b97cd76'; // SM RTL + LG RTL
const ICON_FT_LG_LTR = A + 'c1d6a80d-1257-40d6-9904-2ffcf597fcb1'; // LG LTR

// ─── More-vertical icon (⋮) "elements" sprite — exact Figma inset rendering ─
const ICON_MORE_VERT     = A + '905c6488-bd1e-4fa3-b888-d57e905dafb4'; // SM / RTL / LG RTL
const ICON_MORE_VERT_LGL = A + '8b22207f-8613-4c91-92d5-a31b011fbe7b'; // LG LTR (slightly different offset)

// ─── Settings icon — fresh per variant ──────────────────────────────────────
const ICON_SETTINGS_SM_LTR = A + 'ee7617c0-c255-469c-948a-9aa1138b4d7b';
const ICON_SETTINGS_SM_RTL = A + '553ef906-0299-48af-9ae4-b533cc86810c';
const ICON_SETTINGS_LG_LTR = A + '260d5e5c-1162-4e66-8d89-f9d0465eed36';
const ICON_SETTINGS_LG_RTL = A + '8019bc7b-8acb-41ec-97b5-ebaa8cb22a5d';

// ─── Report arrow icons — "elements" sprite, container-query rotation ────────
const ICON_REPORT_RIGHT = A + 'ed641b69-db5e-4cca-8b71-2a1bbbdc92d1'; // → LTR
const ICON_REPORT_LEFT  = A + '0f541ba2-0e49-4f04-b0b0-9552ca5b560e'; // ← RTL

// ─── Marker positions (translated from Figma Tailwind insets) ───────────────
function getSmallMarkers(chartType, trend) {
  const isPos = trend === 'Positive';
  switch (chartType) {
    case 'Wavy':
      return isPos
        ? [{ top: '21.88%', right: '9.38%', bottom: '43.75%', left: '73.44%' }]
        : [{ top: '53.13%', right: '9.38%', bottom: '12.5%',  left: '73.44%' }];
    case 'Realistic':
      return isPos
        ? [{ top: 3, bottom: 39, left: 'calc(50% + 21px)', transform: 'translateX(-50%)', width: 22 }]
        : [{ top: '25%', right: '28.13%', bottom: '40.63%', left: '54.69%' }];
    case 'Straight':
      return isPos
        ? [
            { top: '40.63%', right: '18.75%', bottom: '25%',    left: '64.06%' },
            { top: '25%',    right: '64.06%', bottom: '40.63%', left: '18.75%' },
          ]
        : [
            { top: '25%',    right: '18.75%', bottom: '40.63%', left: '64.06%' },
            { top: '40.63%', right: '64.06%', bottom: '25%',    left: '18.75%' },
          ];
    default: return []; // Layers — no markers
  }
}

function getLargeMarkers(chartType, trend) {
  const isPos = trend === 'Positive';
  switch (chartType) {
    case 'Wavy':
      return isPos
        ? [{ top: 14, bottom: 28, left: 'calc(50% + 107px)', transform: 'translateX(-50%)', width: 22 }]
        : [{ top: '56.25%', bottom: '9.38%', left: 'calc(50% + 111px)', transform: 'translateX(-50%)', width: 22 }];
    case 'Realistic':
      return isPos
        ? [{ top: 'calc(50% - 19px)', left: 'calc(50% + 56px)', transform: 'translate(-50%, -50%)', width: 22, height: 22 }]
        : [{ top: 15, bottom: 26.81, left: 'calc(50% + 44px)', transform: 'translateX(-50%)', width: 22 }];
    case 'Straight':
      return isPos
        ? [
            { top: 26, bottom: 16, left: 'calc(50% + 75px)', transform: 'translateX(-50%)', width: 22 },
            { top: 16, bottom: 26, left: 'calc(50% - 76px)', transform: 'translateX(-50%)', width: 22 },
          ]
        : [
            { top: '25%',    bottom: '40.63%', right: 75,  width: 22 },
            { top: '42.19%', bottom: '23.44%', right: 228, width: 22 },
          ];
    default: return []; // Layers — no markers
  }
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function SparklineMarker({ style, color }) {
  return (
    <div style={{ position: 'absolute', ...style }}>
      <div className={styles.markerRing} style={{ borderColor: color }} />
      <div className={styles.markerDot} style={{ borderColor: color }} />
    </div>
  );
}

// ─── MoreVertIcon — replicates Figma "Icon/more-vertical" sprite-clip rendering
// The element asset is a very wide SVG; the clip shows only the vertical-dot slice.
function MoreVertIcon({ src, lgLtr = false }) {
  // LG LTR uses a slightly different horizontal inset in the Figma sprite
  const l = lgLtr ? '-4514.98%' : '-4521.21%';
  const r = lgLtr ? '-4513.38%' : '-4519.75%';
  return (
    <div className={styles.moreVertOuter}>
      <div className={styles.moreVertClip}>
        <div className={styles.moreVertElements}>
          <div className={styles.moreVertImgWrap} style={{ left: l, right: r }}>
            <img src={src} alt="" className={styles.moreVertImg} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ArrowIcon — replicates Figma "arrow-right/left-02-sharp" rotation rendering
// Fixed px values replace container-query units (100cqw / 100cqh).
// Container 14.4 × 9 px → inner div 9 × 14.4 px → rotate(-90deg) scaleX(-1) → visible 14.4 × 9 px.
function ArrowIcon({ src, direction = 'right' }) {
  const wrapClass = direction === 'right' ? styles.arrowImgWrapRight : styles.arrowImgWrapLeft;
  return (
    <div className={styles.arrowOuter}>
      <div className={styles.arrowClip}>
        <div className={styles.arrowFlex}>
          <div className={styles.arrowRotate}>
            <div className={styles.arrowRelative}>
              <div className={wrapClass}>
                <img src={src} alt="" className={styles.arrowImg} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SettingsIcon — inset rendering matching Figma Leading Icon structure ────
function SettingsIcon({ src }) {
  return (
    <div className={styles.settingsOuter}>
      <div className={styles.settingsInset}>
        <img src={src} alt="" className={styles.settingsInsetImg} />
      </div>
    </div>
  );
}

function SmallSparkline({ chartType = 'Realistic', trend = 'Positive', showMarker = true }) {
  const assets = SM[chartType]?.[trend] || SM.Realistic.Positive;
  const isLayers   = chartType === 'Layers';
  const isWavyNeg  = chartType === 'Wavy' && trend === 'Negative';
  const color      = trend === 'Positive' ? '#006121' : '#a30000';
  const markers    = getSmallMarkers(chartType, trend);

  return (
    <div className={styles.chartSmall}>
      <img src={assets.bg} alt="" className={styles.chartBg} />

      {isWavyNeg ? (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <div style={{ transform: 'scaleX(-1)', width: '100%', height: '100%', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-1.56%', right: '-0.78%', bottom: '-1.56%', left: '-0.78%' }}>
              <img src={assets.line} alt="" className={styles.chartLineImg} />
            </div>
          </div>
        </div>
      ) : isLayers ? (
        <div style={{ position: 'absolute', top: assets.layerTop, right: 0, bottom: 0, left: 0 }}>
          <img src={assets.line} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      ) : (
        <div className={styles.chartLineWrapSmall}>
          <img src={assets.line} alt="" className={styles.chartLineImg} />
        </div>
      )}

      {showMarker && markers.map((pos, i) => (
        <SparklineMarker key={i} style={pos} color={color} />
      ))}
    </div>
  );
}

function LargeSparkline({ chartType = 'Realistic', trend = 'Positive', showMarker = true }) {
  const assets       = LG[chartType]?.[trend] || LG.Realistic.Positive;
  const isLayers     = chartType === 'Layers';
  const isWavyNeg    = chartType === 'Wavy'     && trend === 'Negative';
  const isRealisticNeg = chartType === 'Realistic' && trend === 'Negative';
  const color        = trend === 'Positive' ? '#006121' : '#a30000';
  const markers      = getLargeMarkers(chartType, trend);

  return (
    <div className={styles.chartLarge}>
      {isRealisticNeg ? (
        <>
          <div style={{ position: 'absolute', inset: '0 0 -0.19px 0' }}>
            <img src={assets.bg} alt="" className={styles.chartBg} />
          </div>
          <div style={{ position: 'absolute', inset: '0 0 -0.19px 0' }}>
            <div style={{ position: 'absolute', top: '-1.56%', right: '-0.3%', bottom: '-1.56%', left: '-0.3%' }}>
              <img src={assets.line} alt="" className={styles.chartLineImg} />
            </div>
          </div>
        </>
      ) : (
        <>
          <img src={assets.bg} alt="" className={styles.chartBg} />
          {isWavyNeg ? (
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              <div style={{ transform: 'scaleX(-1)', width: '100%', height: '100%', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-1.56%', right: '-0.3%', bottom: '-1.56%', left: '-0.3%' }}>
                  <img src={assets.line} alt="" className={styles.chartLineImg} />
                </div>
              </div>
            </div>
          ) : isLayers ? (
            <div style={{ position: 'absolute', top: assets.layerTop, right: 0, bottom: 0, left: 0 }}>
              <img src={assets.line} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ) : (
            <div className={styles.chartLineWrapLarge}>
              <img src={assets.line} alt="" className={styles.chartLineImg} />
            </div>
          )}
        </>
      )}

      {showMarker && markers.map((pos, i) => (
        <SparklineMarker key={i} style={pos} color={color} />
      ))}
    </div>
  );
}

function FeaturedBadge({ src }) {
  return (
    <div className={styles.featuredBadge}>
      <div className={styles.featuredIconClip}>
        <img src={src} alt="" className={styles.featuredIconImg} />
      </div>
    </div>
  );
}

function ChangeBadge({ pct, trend = 'Positive', changeType = '01' }) {
  const isPos   = trend === 'Positive';
  const color   = isPos ? '#006121' : '#a30000';
  const bgColor = isPos ? 'rgba(0,97,33,0.1)' : 'rgba(163,0,0,0.1)';

  return (
    <div className={styles.changeBadge} style={{ background: bgColor }}>
      {changeType === '01' ? (
        <div className={styles.arrowUpWrap}>
          <img src={isPos ? ICON_ARROW_POS : ICON_ARROW_NEG} alt="" className={styles.arrowUpImg} />
        </div>
      ) : (
        <div className={styles.tradeIconWrap}>
          <div className={styles.tradeIconInner}>
            <img src={isPos ? ICON_TRADE_UP : ICON_TRADE_DOWN} alt="" className={styles.tradeIconImg} />
          </div>
        </div>
      )}
      <span className={styles.changeText} style={{ color }}>{pct}</span>
    </div>
  );
}

function ActionsDivider() {
  return <div className={styles.divider} />;
}

// ─── Metric (Figma node 4399:20180) ─────────────────────────────────────────
export function Metric({
  variant          = 'Small Chart',
  rtl              = false,
  labelEn          = '24h Views',
  labelAr          = 'المشاهدات خلال 24س',
  percentage       = '50%',
  changePct        = '100%',
  textEn           = 'vs last month',
  textAr           = 'مقارنة بالشهر الماضي',
  showActions      = true,
  showChange       = true,
  showChart        = true,
  showFeaturedIcon = true,
  showInfo         = true,
  showSecondaryAction = true,
  showText         = true,
  chartType        = 'Realistic',
  trend            = 'Positive',
  changeType       = '01',
  showMarker       = true,
}) {
  const isSmall  = variant === 'Small Chart';
  const isLarge  = variant === 'Large Chart';
  const ltrSmall = !rtl && isSmall;
  const rtlSmall =  rtl && isSmall;
  const ltrLarge = !rtl && isLarge;
  const rtlLarge =  rtl && isLarge;

  const label       = rtl ? labelAr : labelEn;
  const subtext     = rtl ? textAr  : textEn;
  const reportLabel = rtl ? 'عرض التقرير' : 'View Report';
  const featuredSrc  = ltrLarge ? ICON_FT_LG_LTR : (rtl ? ICON_FT_RTL : ICON_FT_SM_LTR);
  const moreVertSrc  = ltrLarge ? ICON_MORE_VERT_LGL : ICON_MORE_VERT;
  const settingsSrc  = isLarge ? (rtl ? ICON_SETTINGS_LG_RTL : ICON_SETTINGS_LG_LTR)
                                : (rtl ? ICON_SETTINGS_SM_RTL : ICON_SETTINGS_SM_LTR);
  const chartProps   = { chartType, trend, showMarker };

  const ActionsLTR = () => (
    <div className={styles.actionsSection}>
      <ActionsDivider />
      <div className={styles.actionsRow}>
        {showSecondaryAction && (
          <button className={styles.settingsBtn} type="button" aria-label="Settings">
            <SettingsIcon src={settingsSrc} />
          </button>
        )}
        <div className={styles.actionFlex1End}>
          <button className={styles.viewReportBtn} type="button">
            <span className={styles.viewReportText}>{reportLabel}</span>
            <ArrowIcon src={ICON_REPORT_RIGHT} direction="right" />
          </button>
        </div>
      </div>
    </div>
  );

  const ActionsRTL = () => (
    <div className={styles.actionsSection}>
      <ActionsDivider />
      <div className={styles.actionsRow}>
        <div className={styles.actionFlex1Start}>
          <button className={styles.viewReportBtn} type="button">
            <ArrowIcon src={ICON_REPORT_LEFT} direction="left" />
            <span className={styles.viewReportText}>{reportLabel}</span>
          </button>
        </div>
        {showSecondaryAction && (
          <button className={styles.settingsBtn} type="button" aria-label="إعدادات">
            <SettingsIcon src={settingsSrc} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.card}>

      {/* ── UPPER SECTION — Small Chart (LTR & RTL) + Large Chart RTL ── */}
      {(isSmall || rtlLarge) && (
        <div className={`${styles.upperRow} ${rtlLarge ? styles.upperRowItemsStart : ''}`}>
          {rtl && <MoreVertIcon src={moreVertSrc} lgLtr={false} />}
          <div className={`${styles.upperContent} ${rtlLarge ? styles.upperContentShrink : styles.upperContentFlex1} ${(rtlSmall || rtlLarge) ? styles.upperContentEnd : ''}`}>
            {rtl && <p dir="auto" className={styles.labelText}>{label}</p>}
            {showFeaturedIcon && <FeaturedBadge src={featuredSrc} />}
            {!rtl && <p className={styles.labelText}>{label}</p>}
          </div>
          {!rtl && <MoreVertIcon src={moreVertSrc} lgLtr={false} />}
        </div>
      )}

      {/* ── BODY — Small Chart ── */}
      {isSmall && (
        <div className={`${styles.body} ${rtlSmall ? styles.bodyRtl : styles.bodyLtr}`}>
          {ltrSmall && (
            <div className={styles.valueBlock}>
              <p className={styles.percentage}>{percentage}</p>
              {showInfo && (
                <div className={styles.infoRow}>
                  {showChange && <ChangeBadge pct={changePct} trend={trend} changeType={changeType} />}
                  {showText && <p className={styles.changeSubtext}>{subtext}</p>}
                </div>
              )}
            </div>
          )}
          {showChart && <SmallSparkline {...chartProps} />}
          {rtlSmall && (
            <div className={`${styles.valueBlock} ${styles.valueBlockRtl}`}>
              <p className={styles.percentage}>{percentage}</p>
              {showInfo && (
                <div className={`${styles.infoRow} ${styles.infoRowRtl}`}>
                  {showText && <p dir="auto" className={styles.changeSubtext}>{subtext}</p>}
                  {showChange && <ChangeBadge pct={changePct} trend={trend} changeType={changeType} />}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {ltrSmall && showActions && <ActionsLTR />}
      {rtlSmall && showActions && <ActionsRTL />}

      {/* ── LARGE CHART LTR — chart renders first ── */}
      {ltrLarge && showChart && <LargeSparkline {...chartProps} />}

      {/* ── UPPER SECTION — Large Chart LTR only ── */}
      {ltrLarge && (
        <div className={styles.upperRow}>
          <div className={`${styles.upperContent} ${styles.upperContentFlex1}`}>
            {showFeaturedIcon && <FeaturedBadge src={featuredSrc} />}
            <p className={styles.labelText}>{label}</p>
          </div>
          <MoreVertIcon src={moreVertSrc} lgLtr={ltrLarge} />
        </div>
      )}

      {/* ── CONTENT ROW — Large Chart ── */}
      {isLarge && (
        <div className={`${styles.largeContentRow} ${rtlLarge ? styles.largeContentRowRtl : styles.largeContentRowLtr}`}>
          <p className={styles.percentage}>{percentage}</p>
          {ltrLarge && showInfo && (
            <div className={`${styles.infoRow} ${styles.infoRowFlex1} ${styles.infoRowEnd}`}>
              {showChange && <ChangeBadge pct={changePct} trend={trend} changeType={changeType} />}
              {showText && <p className={styles.changeSubtext}>{subtext}</p>}
            </div>
          )}
          {rtlLarge && showInfo && (
            <div className={`${styles.infoRow} ${styles.infoRowFlex1} ${styles.infoRowEnd}`}>
              {showText && <p dir="auto" className={styles.changeSubtext}>{subtext}</p>}
              {showChange && <ChangeBadge pct={changePct} trend={trend} changeType={changeType} />}
            </div>
          )}
        </div>
      )}

      {ltrLarge && showActions && <ActionsLTR />}

      {/* ── LARGE CHART RTL — chart renders after content row ── */}
      {rtlLarge && showChart && <LargeSparkline {...chartProps} />}

      {rtlLarge && showActions && <ActionsRTL />}
    </div>
  );
}

export default Metric;
