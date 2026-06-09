import styles from './Metric.module.css';

const A = 'https://www.figma.com/api/mcp/asset/';

// ─── Change badge icons ─────────────────────────────────────────────────────
const ICON_ARROW_POS  = A + '7688b61b-ed56-4fd9-aeb0-7743641d78a8'; // arrow-up-02 positive
const ICON_ARROW_NEG  = A + '7688b61b-ed56-4fd9-aeb0-7743641d78a8'; // arrow-up-02 negative
const ICON_TRADE_UP   = A + '7263cd5b-39b0-4d3f-b704-467da3422049'; // trade-up
const ICON_TRADE_DOWN = A + '6bffedd8-aac4-479a-827f-d04f11a5ef8b'; // trade-down

// ─── Small Chart assets 128 × 64 ───────────────────────────────────────────
const SM = {
  Wavy:     { Positive: { bg: A+'704475df-f20a-4c34-a187-84f04e2e91b8', line: A+'5fa3ea06-0d6c-48d9-9f46-3cc3c8f0bc01' },
              Negative: { bg: A+'783d5747-3697-4549-8a6e-c783265ad768', line: A+'94ed11f2-965e-4402-803a-5264ac1fc08b', mirror: true } },
  Realistic:{ Positive: { bg: A+'56ff198c-2e6d-408b-bd17-c5bb4d46fa04', line: A+'a7514274-a760-46c3-9ce7-aed99ccb7d2e' },
              Negative: { bg: A+'6bc93a82-eaf5-4986-be96-7daf88d29cda', line: A+'bb3c6439-e2a9-44eb-a54e-40daba7c6aeb' } },
  Straight: { Positive: { bg: A+'c4bf7782-2001-4ff4-88ef-40e45af67d66', line: A+'4b65dffc-258e-4612-9829-22e9ddf9a11e' },
              Negative: { bg: A+'cd0ef5da-bfc8-488e-a1f8-1f9bd36b255c', line: A+'fada34f9-4536-4b66-b254-c951f67b4e1d' } },
  Layers:   { Positive: { bg: A+'106726ab-bf84-42bc-8842-b0e6043b103e', line: A+'bb9721b0-8bcf-4fdb-8df8-b24d60c4b209', layerTop: '12px' },
              Negative: { bg: A+'00c3018b-0c9f-4eda-ac7f-1ed2e20422aa', line: A+'4ace226b-1857-4a32-9729-54de4a92011b', layerTop: '18px' } },
};

// ─── Large Chart assets 328 × 64 ───────────────────────────────────────────
const LG = {
  Wavy:     { Positive: { bg: A+'386ca56b-03c1-47ce-a184-5bdb717082c4', line: A+'18830759-b9eb-4bb2-8198-422d68eabf9b' },
              Negative: { bg: A+'5cbd3cab-54b7-4527-bc03-6239855e407b', line: A+'ef0cf04f-5f1b-4c27-a97c-1ea27f48b8be', mirror: true } },
  Realistic:{ Positive: { bg: A+'d78518c8-bda1-4391-ab3d-453732a02ba7', line: A+'22f2425a-8901-4825-9c39-20252d569c0d' },
              Negative: { bg: A+'e3bb5192-7496-4a9a-9a26-fdcc4e11f565', line: A+'e8cf712c-1e6d-4de2-b88a-d90f7530895d', separateBg: true } },
  Straight: { Positive: { bg: A+'677c55d0-1c92-413b-aef6-e8061055e42c', line: A+'06a56cb7-b8e4-4a0e-852f-abd1d2fbb6e3' },
              Negative: { bg: A+'bfdec1d2-6d89-417f-9d78-df93c1b127e0', line: A+'01df3866-6538-4306-84e8-417080d858e5' } },
  Layers:   { Positive: { bg: A+'05526599-67d1-4d9d-af7d-efe0e7b75bfa', line: A+'ab286bda-2f9c-42da-8334-dbfee44a19ce', layerTop: '12px' },
              Negative: { bg: A+'eeae8f31-1540-4ead-8917-6dc8300ddbee', line: A+'8b5d979f-ceb6-432d-adc4-a5f6d1747935', layerTop: '18px' } },
};

// ─── Featured icon badge (gear) — fresh per variant ─────────────────────────
const ICON_FT_SM_LTR = A + '24950801-61d3-4150-99c5-ced2f7da933a'; // SM LTR
const ICON_FT_RTL    = A + '3855559f-670a-4068-9123-ff6fbc6e8974'; // SM RTL + LG RTL
const ICON_FT_LG_LTR = A + '6dfd98e8-4a7e-48b0-91ea-e8f71f4fb329'; // LG LTR

// ─── More-vertical icon (⋮) "elements" sprite — exact Figma inset rendering ─
const ICON_MORE_VERT     = A + 'e601344b-29c6-4c9b-8745-92430098c8b7'; // SM / RTL / LG RTL
const ICON_MORE_VERT_LGL = A + '2b75c897-2f84-4d93-b434-12ac723fde02'; // LG LTR (slightly different offset)

// ─── Settings icon — fresh per variant ──────────────────────────────────────
const ICON_SETTINGS_SM_LTR = A + '373effc1-7438-497b-aaec-b832ea16c03e';
const ICON_SETTINGS_SM_RTL = A + '7b8371f6-9cc5-4606-87ac-d05bc0f7214d';
const ICON_SETTINGS_LG_LTR = A + 'ac7950ba-688f-428e-8229-26e8eeac5c9e';
const ICON_SETTINGS_LG_RTL = A + '7cb9ebb3-8987-455a-863f-f744750d38f8';

// ─── Report arrow icons — "elements" sprite, container-query rotation ────────
const ICON_REPORT_RIGHT = A + '7142e1ed-a3dd-4df7-862a-476a952e6d64'; // → LTR
const ICON_REPORT_LEFT  = A + '2b1088e6-1476-48d6-b78e-05a10c09a1e7'; // ← RTL

// ─── Marker positions (translated from Figma Tailwind insets) ───────────────
function getSmallMarkers(chartType, trend) {
  const isPos = trend === 'Positive';
  switch (chartType) {
    case 'Wavy':
      return isPos
        ? [{ top: '21.88%', right: '11.4%', bottom: '43.75%', left: '75.4%' }]
        : [{ top: '53.13%', right: '11.4%', bottom: '12.5%',  left: '75.4%' }];
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
  verticalLayout   = false,
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
        <div className={`${styles.body} ${rtlSmall ? styles.bodyRtl : styles.bodyLtr} ${verticalLayout ? styles.bodyVertical : ''}`}>
          {ltrSmall && !verticalLayout && (
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
          {ltrSmall && verticalLayout && (
            <div className={styles.bodyVerticalTop}>
              <p className={styles.percentage}>{percentage}</p>
              {showInfo && showChange && (
                <ChangeBadge pct={changePct} trend={trend} changeType={changeType} />
              )}
              {showInfo && showText && (
                <p className={styles.changeSubtext}>{subtext}</p>
              )}
            </div>
          )}
          {showChart && <SmallSparkline {...chartProps} />}
          {rtlSmall && !verticalLayout && (
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
          {rtlSmall && verticalLayout && (
            <div className={`${styles.bodyVerticalTop} ${styles.bodyVerticalTopRtl}`}>
              <p className={styles.percentage}>{percentage}</p>
              {showInfo && showChange && (
                <ChangeBadge pct={changePct} trend={trend} changeType={changeType} />
              )}
              {showInfo && showText && (
                <p dir="auto" className={styles.changeSubtext}>{subtext}</p>
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
