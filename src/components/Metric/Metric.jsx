import styles from './Metric.module.css';
import { Icon } from '../icons/Icon';
import settingsIconSrc from '../../assets/icons/settings.svg';

// ── Small chart images (128 × 64 px) ────────────────────────────────────────
import smRealisticPos from '../../assets/metric/charts/sm-realistic-positive.png';
import smRealisticNeg from '../../assets/metric/charts/sm-realistic-negative.png';
import smWavyPos      from '../../assets/metric/charts/sm-wavy-positive.png';
import smWavyNeg      from '../../assets/metric/charts/sm-wavy-negative.png';
import smStraightPos  from '../../assets/metric/charts/sm-straight-positive.png';
import smStraightNeg  from '../../assets/metric/charts/sm-straight-negative.png';
import smLayersPos    from '../../assets/metric/charts/sm-layers-positive.png';
import smLayersNeg    from '../../assets/metric/charts/sm-layers-negative.png';

// ── Large chart images (328 × 64 px) ────────────────────────────────────────
import lgRealisticPos from '../../assets/metric/charts/lg-realistic-positive.png';
import lgRealisticNeg from '../../assets/metric/charts/lg-realistic-negative.png';
import lgWavyPos      from '../../assets/metric/charts/lg-wavy-positive.png';
import lgWavyNeg      from '../../assets/metric/charts/lg-wavy-negative.png';
import lgStraightPos  from '../../assets/metric/charts/lg-straight-positive.png';
import lgStraightNeg  from '../../assets/metric/charts/lg-straight-negative.png';
import lgLayersPos    from '../../assets/metric/charts/lg-layers-positive.png';
import lgLayersNeg    from '../../assets/metric/charts/lg-layers-negative.png';

// ── Trade icon paths (fill-based, extracted from Figma frame 4140:89813) ─────
const TRADE_UP_D =
  'M211 1178.25C210.586 1178.25 210.25 1178.59 210.25 1179C210.25 1179.41 210.586 1179.75 211 1179.75H214.189' +
  'L210.47 1183.47C210.015 1183.92 209.721 1184.22 209.476 1184.41C209.244 1184.59 209.135 1184.62 209.067 1184.63' +
  'C209.023 1184.63 208.977 1184.63 208.933 1184.63C208.865 1184.62 208.756 1184.59 208.524 1184.41' +
  'C208.279 1184.22 207.985 1183.92 207.53 1183.47L207.5 1183.44C207.085 1183.02 206.727 1182.67 206.403 1182.41' +
  'C206.058 1182.14 205.676 1181.92 205.202 1181.88C205.068 1181.87 204.932 1181.87 204.798 1181.88' +
  'C204.324 1181.92 203.942 1182.14 203.597 1182.41C203.273 1182.67 202.915 1183.02 202.5 1183.44' +
  'L199.47 1186.47C199.177 1186.76 199.177 1187.24 199.47 1187.53C199.763 1187.82 200.237 1187.82 200.53 1187.53' +
  'L203.53 1184.53C203.985 1184.08 204.279 1183.78 204.524 1183.59C204.756 1183.41 204.865 1183.38 204.933 1183.37' +
  'C204.977 1183.37 205.023 1183.37 205.067 1183.37C205.135 1183.38 205.244 1183.41 205.476 1183.59' +
  'C205.721 1183.78 206.015 1184.08 206.47 1184.53L206.5 1184.56C206.915 1184.98 207.273 1185.33 207.597 1185.59' +
  'C207.942 1185.86 208.324 1186.08 208.798 1186.12C208.932 1186.13 209.068 1186.13 209.202 1186.12' +
  'C209.676 1186.08 210.058 1185.86 210.403 1185.59C210.727 1185.33 211.085 1184.98 211.5 1184.56' +
  'L215.25 1180.81V1184C215.25 1184.41 215.586 1184.75 216 1184.75C216.414 1184.75 216.75 1184.41 216.75 1184' +
  'V1179C216.75 1178.81 216.677 1178.62 216.53 1178.47C216.458 1178.4 216.376 1178.34 216.287 1178.31' +
  'C216.199 1178.27 216.102 1178.25 216 1178.25H211Z';

const TRADE_DOWN_D =
  'M291.53 1178.47C291.237 1178.18 290.763 1178.18 290.47 1178.47C290.177 1178.76 290.177 1179.24 290.47 1179.53' +
  'L293.47 1182.53L293.5 1182.56C293.915 1182.98 294.273 1183.33 294.597 1183.59C294.942 1183.86 295.324 1184.08' +
  ' 295.798 1184.12C295.932 1184.13 296.068 1184.13 296.202 1184.12C296.676 1184.08 297.058 1183.86 297.403 1183.59' +
  'C297.727 1183.33 298.085 1182.98 298.5 1182.56L298.53 1182.53C298.985 1182.08 299.279 1181.78 299.524 1181.59' +
  'C299.756 1181.41 299.865 1181.38 299.933 1181.37C299.977 1181.37 300.023 1181.37 300.067 1181.37' +
  'C300.135 1181.38 300.244 1181.41 300.476 1181.59C300.721 1181.78 301.015 1182.08 301.47 1182.53' +
  'L305.189 1186.25H302C301.586 1186.25 301.25 1186.59 301.25 1187C301.25 1187.41 301.586 1187.75 302 1187.75' +
  'H307C307.102 1187.75 307.199 1187.73 307.287 1187.69C307.376 1187.66 307.458 1187.6 307.53 1187.53' +
  'C307.677 1187.38 307.75 1187.19 307.75 1187V1182C307.75 1181.59 307.414 1181.25 307 1181.25' +
  'C306.586 1181.25 306.25 1181.59 306.25 1182V1185.19L302.5 1181.44C302.085 1181.02 301.727 1180.67 301.403 1180.41' +
  'C301.058 1180.14 300.676 1179.92 300.202 1179.88C300.068 1179.87 299.932 1179.87 299.798 1179.88' +
  'C299.324 1179.92 298.942 1180.14 298.597 1180.41C298.273 1180.67 297.915 1181.02 297.5 1181.44' +
  'L297.47 1181.47C297.015 1181.92 296.721 1182.22 296.476 1182.41C296.244 1182.59 296.135 1182.62 296.067 1182.63' +
  'C296.023 1182.63 295.977 1182.63 295.933 1182.63C295.865 1182.62 295.756 1182.59 295.524 1182.41' +
  'C295.279 1182.22 294.985 1181.92 294.53 1181.47L291.53 1178.47Z';

const SM = {
  Realistic: { Positive: smRealisticPos, Negative: smRealisticNeg },
  Wavy:      { Positive: smWavyPos,      Negative: smWavyNeg      },
  Straight:  { Positive: smStraightPos,  Negative: smStraightNeg  },
  Layers:    { Positive: smLayersPos,    Negative: smLayersNeg    },
};

const LG = {
  Realistic: { Positive: lgRealisticPos, Negative: lgRealisticNeg },
  Wavy:      { Positive: lgWavyPos,      Negative: lgWavyNeg      },
  Straight:  { Positive: lgStraightPos,  Negative: lgStraightNeg  },
  Layers:    { Positive: lgLayersPos,    Negative: lgLayersNeg    },
};

// ── Marker positions (from Figma insets) ────────────────────────────────────
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
    default: return [];
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
    default: return [];
  }
}

// ── Sub-components ───────────────────────────────────────────────────────────

function TradeIcon({ trend = 'Positive', size = 14, color }) {
  const isPos = trend === 'Positive';
  return (
    <svg
      viewBox={isPos ? '199 1178 18 10' : '290 1178 18 10'}
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={isPos ? TRADE_UP_D : TRADE_DOWN_D} fill={color} />
    </svg>
  );
}

function SparklineMarker({ style, color }) {
  return (
    <div style={{ position: 'absolute', ...style }}>
      <div className={styles.markerRing} style={{ borderColor: color }} />
      <div className={styles.markerDot}  style={{ borderColor: color }} />
    </div>
  );
}

function SmallSparkline({ chartType = 'Realistic', trend = 'Positive', showMarker = true }) {
  const src     = SM[chartType]?.[trend] ?? SM.Realistic.Positive;
  const color   = trend === 'Positive' ? '#006121' : '#a30000';
  const markers = getSmallMarkers(chartType, trend);
  return (
    <div className={styles.chartSmall}>
      <img src={src} alt="" className={styles.chartBg} />
      {showMarker && markers.map((pos, i) => (
        <SparklineMarker key={i} style={pos} color={color} />
      ))}
    </div>
  );
}

function LargeSparkline({ chartType = 'Realistic', trend = 'Positive', showMarker = true, bleedPos = null }) {
  const src     = LG[chartType]?.[trend] ?? LG.Realistic.Positive;
  const color   = trend === 'Positive' ? '#006121' : '#a30000';
  const markers = getLargeMarkers(chartType, trend);
  const bleedClass = bleedPos === 'top'    ? styles.chartLargeTop
                   : bleedPos === 'bottom' ? styles.chartLargeBottom
                   : '';
  return (
    <div className={`${styles.chartLarge} ${bleedClass}`}>
      <img src={src} alt="" className={styles.chartBg} />
      {showMarker && markers.map((pos, i) => (
        <SparklineMarker key={i} style={pos} color={color} />
      ))}
    </div>
  );
}

function FeaturedBadge() {
  return (
    <div className={styles.featuredBadge}>
      <TradeIcon trend="Positive" size={16} color="#006121" />
    </div>
  );
}

function KebabBtn({ label }) {
  return (
    <button className={styles.kebabBtn} type="button" aria-label={label}>
      <Icon name="more-vertical" size={20} color="#6b7280" aria-hidden="true" />
    </button>
  );
}

function ChangeBadge({ pct, trend = 'Positive', changeType = '01' }) {
  const isPos   = trend === 'Positive';
  const color   = isPos ? '#006121' : '#a30000';
  const bgColor = isPos ? 'rgba(0,97,33,0.1)' : 'rgba(163,0,0,0.1)';
  return (
    <div className={styles.changeBadge} style={{ background: bgColor }}>
      {changeType === '01'
        ? <Icon name={isPos ? 'arrow-up' : 'arrow-down'} size={14} color={color} aria-hidden="true" />
        : <TradeIcon trend={trend} size={14} color={color} />}
      <span className={styles.changeText} style={{ color }}>{pct}</span>
    </div>
  );
}

function ActionsDivider() {
  return <div className={styles.divider} />;
}

// ── Metric (Figma node 4399:20180) ───────────────────────────────────────────
export function Metric({
  variant             = 'Small Chart',
  rtl                 = false,
  labelEn             = '24h Views',
  labelAr             = 'المشاهدات خلال 24س',
  percentage          = '50%',
  changePct           = '100%',
  textEn              = 'vs last month',
  textAr              = 'مقارنة بالشهر الماضي',
  showActions         = true,
  showChange          = true,
  showChart           = true,
  showFeaturedIcon    = true,
  showInfo            = true,
  showSecondaryAction = true,
  showText            = true,
  chartType           = 'Realistic',
  trend               = 'Positive',
  changeType          = '01',
  showMarker          = true,
  verticalLayout      = false,
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
  const chartProps  = { chartType, trend, showMarker };

  const ActionsLTR = () => (
    <div className={styles.actionsSection}>
      <ActionsDivider />
      <div className={styles.actionsRow}>
        {showSecondaryAction && (
          <button className={styles.settingsBtn} type="button" aria-label="Settings">
            <img src={settingsIconSrc} alt="" width={20} height={20} />
          </button>
        )}
        <div className={styles.actionFlex1End}>
          <button className={styles.viewReportBtn} type="button">
            <span className={styles.viewReportText}>{reportLabel}</span>
            <Icon name="arrow-right" size={16} color="#175cd3" aria-hidden="true" />
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
            <Icon name="arrow-left" size={16} color="#175cd3" aria-hidden="true" />
            <span className={styles.viewReportText}>{reportLabel}</span>
          </button>
        </div>
        {showSecondaryAction && (
          <button className={styles.settingsBtn} type="button" aria-label="إعدادات">
            <img src={settingsIconSrc} alt="" width={20} height={20} />
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
          {rtl && <KebabBtn label="المزيد" />}
          <div className={`${styles.upperContent} ${rtlLarge ? styles.upperContentShrink : styles.upperContentFlex1} ${(rtlSmall || rtlLarge) ? styles.upperContentEnd : ''}`}>
            {rtl && <p dir="auto" className={styles.labelText}>{label}</p>}
            {showFeaturedIcon && <FeaturedBadge />}
            {!rtl && <p className={styles.labelText}>{label}</p>}
          </div>
          {!rtl && <KebabBtn label="More" />}
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
              {showInfo && showChange && <ChangeBadge pct={changePct} trend={trend} changeType={changeType} />}
              {showInfo && showText && <p className={styles.changeSubtext}>{subtext}</p>}
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
              {showInfo && showChange && <ChangeBadge pct={changePct} trend={trend} changeType={changeType} />}
              {showInfo && showText && <p dir="auto" className={styles.changeSubtext}>{subtext}</p>}
            </div>
          )}
        </div>
      )}

      {ltrSmall && showActions && <ActionsLTR />}
      {rtlSmall && showActions && <ActionsRTL />}

      {/* ── LARGE CHART LTR — chart renders first, full-bleed at top ── */}
      {ltrLarge && showChart && <LargeSparkline {...chartProps} bleedPos="top" />}

      {/* ── UPPER SECTION — Large Chart LTR only ── */}
      {ltrLarge && (
        <div className={styles.upperRow}>
          <div className={`${styles.upperContent} ${styles.upperContentFlex1}`}>
            {showFeaturedIcon && <FeaturedBadge />}
            <p className={styles.labelText}>{label}</p>
          </div>
          <KebabBtn label="More" />
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

      {/* ── LARGE CHART RTL — chart renders after content row, full-bleed at bottom ── */}
      {rtlLarge && showChart && <LargeSparkline {...chartProps} bleedPos="bottom" />}

      {rtlLarge && showActions && <ActionsRTL />}
    </div>
  );
}

export default Metric;
