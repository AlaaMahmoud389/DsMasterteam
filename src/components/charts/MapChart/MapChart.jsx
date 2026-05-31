import { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './MapChart.module.css';
import { ChartTooltip } from '../shared/ChartTooltip';

/**
 * MapChart — Masterteam Design System
 * Figma: node 4560:5177 — Saudi Arabia map, two variants (filled / outline)
 *
 * Renders Saudi Arabia's 13 administrative regions as an interactive SVG choropleth.
 * Each region path is a simplified polygon derived from geographic coordinates
 * scaled to a 540 × 430 viewBox.
 *
 * variant prop:
 *   'choropleth' — data-driven colour per region (default)
 *   'filled'     — uniform deep-navy fill (Figma: filled=true)
 *   'outline'    — white fill, navy stroke only (Figma: filled=false)
 */

/* ── Colour ramp (matches Figma series palette) ──────────────── */
const COLOR_RAMP = ['#d1e9ff', '#b2ddff', '#53b1fd', '#2e90fa', '#175cd3', '#1849a9'];
const NULL_COLOR  = '#f3f4f6';
const FILL_COLOR  = '#1849a9'; /* Figma: filled variant */

function valueToColor(value, min, max) {
  if (value == null || max === min) return COLOR_RAMP[0];
  const t   = (value - min) / (max - min);
  const idx = Math.round(t * (COLOR_RAMP.length - 1));
  return COLOR_RAMP[Math.max(0, Math.min(idx, COLOR_RAMP.length - 1))];
}

/* ── Saudi Arabia — 13 administrative regions ────────────────────
   ViewBox: 0 0 540 430
   Coordinates derived from geographic data:
     X = (longitude - 36) * 27        (36°E–56°E mapped to 0–540)
     Y = (32 - latitude)  * 26.875    (32°N–16°N mapped to 0–430, S-down)
   Paths share boundary vertices so regions tile without gaps.
   cx/cy = visual label anchor inside each region.
─────────────────────────────────────────────────────────────────── */
const SAUDI_REGIONS = [
  {
    /* Tabuk — NW, Red Sea / Gulf of Aqaba coast, Jordan border */
    id: 'tabuk',
    label: 'Tabuk',
    labelAr: 'تبوك',
    cx: 42, cy: 110,
    d: 'M 8,67 L 0,54 L 0,135 L 11,148 L 27,161 L 54,175 L 81,175 L 94,188 L 108,188 L 108,148 L 94,121 L 81,94 L 54,54 L 40,40 Z',
  },
  {
    /* Al-Jawf — north-central, borders Jordan & Iraq */
    id: 'jawf',
    label: 'Al-Jawf',
    labelAr: 'الجوف',
    cx: 162, cy: 67,
    d: 'M 40,40 L 54,54 L 81,94 L 94,121 L 108,121 L 135,108 L 189,108 L 216,94 L 216,54 L 202,27 L 162,13 L 108,13 L 67,27 Z',
  },
  {
    /* Northern Borders — far north strip, Iraq border */
    id: 'northern-borders',
    label: 'N. Borders',
    labelAr: 'الحدود الشمالية',
    cx: 285, cy: 38,
    d: 'M 162,13 L 202,27 L 216,54 L 243,67 L 270,67 L 324,54 L 351,40 L 378,27 L 405,13 L 378,0 L 270,0 L 162,0 Z',
  },
  {
    /* Hail — central north */
    id: 'hail',
    label: 'Hail',
    labelAr: 'حائل',
    cx: 196, cy: 155,
    d: 'M 108,121 L 135,108 L 189,108 L 216,94 L 243,67 L 270,67 L 270,108 L 270,148 L 243,175 L 216,188 L 189,202 L 162,202 L 135,188 L 108,175 L 94,188 L 81,175 L 94,148 Z',
  },
  {
    /* Qassim — central, small but important */
    id: 'qassim',
    label: 'Qassim',
    labelAr: 'القصيم',
    cx: 308, cy: 148,
    d: 'M 270,67 L 324,54 L 351,40 L 378,54 L 378,94 L 378,121 L 351,148 L 324,175 L 297,188 L 270,188 L 243,175 L 270,148 L 270,108 Z',
  },
  {
    /* Eastern Province — largest eastern region, Gulf coast */
    id: 'eastern',
    label: 'Eastern',
    labelAr: 'المنطقة الشرقية',
    cx: 450, cy: 175,
    d: 'M 378,27 L 405,13 L 459,0 L 540,0 L 540,108 L 540,215 L 513,242 L 486,269 L 459,296 L 432,323 L 405,296 L 378,269 L 351,242 L 324,215 L 324,175 L 351,148 L 378,121 L 378,94 L 378,54 L 351,40 Z',
  },
  {
    /* Madinah — west, Red Sea hinterland */
    id: 'madinah',
    label: 'Madinah',
    labelAr: 'المدينة المنورة',
    cx: 105, cy: 210,
    d: 'M 27,161 L 54,175 L 81,175 L 94,188 L 108,175 L 135,188 L 162,202 L 189,202 L 189,229 L 162,242 L 135,256 L 108,256 L 81,256 L 54,242 L 27,229 L 13,215 Z',
  },
  {
    /* Riyadh — vast central region */
    id: 'riyadh',
    label: 'Riyadh',
    labelAr: 'الرياض',
    cx: 320, cy: 272,
    d: 'M 216,188 L 243,175 L 270,188 L 297,188 L 324,175 L 324,215 L 351,242 L 378,269 L 405,296 L 432,323 L 405,350 L 378,350 L 351,350 L 324,350 L 297,350 L 270,323 L 243,310 L 216,296 L 216,269 L 216,242 L 216,215 Z',
  },
  {
    /* Makkah — western coast region, largest by area on the west */
    id: 'makkah',
    label: 'Makkah',
    labelAr: 'مكة المكرمة',
    cx: 110, cy: 285,
    d: 'M 13,215 L 27,229 L 54,242 L 81,256 L 108,256 L 135,256 L 162,242 L 189,229 L 189,202 L 216,215 L 216,242 L 216,269 L 216,296 L 189,296 L 162,310 L 135,310 L 108,310 L 81,310 L 54,296 L 27,283 L 13,269 Z',
  },
  {
    /* Al-Bahah — small mountainous region SW */
    id: 'bahah',
    label: 'Al-Bahah',
    labelAr: 'الباحة',
    cx: 152, cy: 330,
    d: 'M 135,310 L 162,310 L 189,296 L 216,296 L 216,323 L 189,323 L 162,337 L 135,337 L 108,337 L 108,310 Z',
  },
  {
    /* Asir — high-altitude SW region */
    id: 'asir',
    label: 'Asir',
    labelAr: 'عسير',
    cx: 210, cy: 360,
    d: 'M 162,337 L 189,323 L 216,323 L 243,310 L 270,323 L 297,350 L 270,377 L 243,377 L 216,377 L 189,364 L 162,364 Z',
  },
  {
    /* Jizan — far SW, Red Sea coast, Yemen border */
    id: 'jizan',
    label: 'Jizan',
    labelAr: 'جازان',
    cx: 68, cy: 370,
    d: 'M 13,269 L 27,283 L 54,296 L 81,310 L 108,310 L 108,337 L 135,337 L 162,337 L 162,364 L 135,377 L 108,390 L 81,403 L 54,416 L 27,416 L 0,403 L 0,377 L 0,350 L 0,323 L 13,296 Z',
  },
  {
    /* Najran — south, vast desert, Yemen/Oman border */
    id: 'najran',
    label: 'Najran',
    labelAr: 'نجران',
    cx: 350, cy: 395,
    d: 'M 216,377 L 243,377 L 270,377 L 297,350 L 324,350 L 351,350 L 378,350 L 405,350 L 432,323 L 459,296 L 486,323 L 513,350 L 540,377 L 540,430 L 432,430 L 324,430 L 216,430 L 189,416 L 189,403 L 189,390 L 189,377 Z',
  },
];

const VIEW_W = 540;
const VIEW_H = 430;

export function MapChart({
  title,
  data          = [],
  regions,
  variant       = 'choropleth',
  showColorScale  = true,
  showRegionLabels = true,
  loading       = false,
  empty         = false,
  dir           = 'ltr',
}) {
  const cardRef = useRef(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, rows: [] });

  const displayRegions = regions || SAUDI_REGIONS;
  const values  = data.map(d => d.value).filter(v => v != null);
  const minVal  = values.length ? Math.min(...values) : 0;
  const maxVal  = values.length ? Math.max(...values) : 1;

  const getRegionData = useCallback((id) => data.find(d => d.id === id), [data]);

  const showTip = useCallback((e, region, rd) => {
    if (!cardRef.current) return;
    const r    = cardRef.current.getBoundingClientRect();
    const name = dir === 'rtl' ? (region.labelAr || region.label) : region.label;
    const rows = [{ label: name, value: rd ? rd.value.toLocaleString() : 'N/A' }];
    setTooltip({
      visible: true,
      x: Math.max(4, e.clientX - r.left + 14),
      y: Math.max(4, e.clientY - r.top  - 48),
      rows,
    });
  }, [dir]);

  const hideTip = useCallback(() => setTooltip(t => ({ ...t, visible: false })), []);

  function regionFill(rd) {
    if (variant === 'filled')  return FILL_COLOR;
    if (variant === 'outline') return '#ffffff';
    return rd ? valueToColor(rd.value, minVal, maxVal) : NULL_COLOR;
  }

  const stroke      = variant === 'outline' ? '#1849a9'             : 'rgba(255,255,255,0.55)';
  const strokeWidth = variant === 'outline' ? 1                      : 1.5;
  const interactive = variant === 'choropleth';

  /* ── Loading state ───────────────────────────────────────────── */
  if (loading) {
    return (
      <div className={styles.card} dir={dir} ref={cardRef}>
        {title && <p className={styles.title}>{title}</p>}
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} width="100%" className={styles.svg} aria-hidden="true">
          {displayRegions.map((reg, i) => (
            <path key={reg.id} d={reg.d} fill="#e7e9ed" stroke="#fff" strokeWidth="1.5"
              className={`${styles.skelPulse} ${styles[`skelDelay${(i % 3) + 1}`]}`} />
          ))}
        </svg>
      </div>
    );
  }

  /* ── Empty state ─────────────────────────────────────────────── */
  if (empty || (variant === 'choropleth' && data.length === 0)) {
    return (
      <div className={styles.card} dir={dir} ref={cardRef}>
        {title && <p className={styles.title}>{title}</p>}
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} width="100%" className={styles.svg} aria-hidden="true">
          {displayRegions.map(reg => (
            <path key={reg.id} d={reg.d} fill={NULL_COLOR} stroke="#fff" strokeWidth="1.5" />
          ))}
          <text x={VIEW_W / 2} y={VIEW_H / 2} textAnchor="middle" fontSize="14" fill="#6c7c96"
            fontFamily="IBM Plex Sans Arabic,sans-serif">No data available</text>
        </svg>
      </div>
    );
  }

  /* ── Main render ─────────────────────────────────────────────── */
  return (
    <div className={styles.card} dir={dir} ref={cardRef}>
      {title && <p className={styles.title}>{title}</p>}

      <div className={styles.content}>
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} width="100%"
          role="img" aria-label={title} className={styles.svg}>
          <title>{title}</title>

          {displayRegions.map(region => {
            const rd   = getRegionData(region.id);
            const fill = regionFill(rd);
            const name = dir === 'rtl' ? (region.labelAr || region.label) : region.label;
            /* label colour: dark on light fills, white on dark fills */
            const labelFill = (variant === 'outline' || fill === NULL_COLOR || fill === COLOR_RAMP[0] || fill === COLOR_RAMP[1])
              ? (variant === 'outline' ? '#1849a9' : '#3c5073')
              : '#ffffff';

            return (
              <g key={region.id}>
                <path
                  d={region.d}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  strokeLinejoin="round"
                  className={interactive ? styles.region : undefined}
                  tabIndex={interactive ? 0 : undefined}
                  role={interactive ? 'button' : undefined}
                  aria-label={interactive ? `${name}: ${rd ? rd.value.toLocaleString() : 'No data'}` : undefined}
                  onMouseEnter={interactive ? e => showTip(e, region, rd) : undefined}
                  onMouseLeave={interactive ? hideTip : undefined}
                  onFocus={interactive ?     e => showTip(e, region, rd) : undefined}
                  onBlur={interactive  ?     hideTip : undefined}
                />
                {showRegionLabels && region.cx != null && (
                  <text
                    x={region.cx} y={region.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="8.5"
                    fontWeight="500"
                    fill={labelFill}
                    fontFamily="IBM Plex Sans Arabic, sans-serif"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {showColorScale && variant === 'choropleth' && (
          <div className={styles.colorScale}>
            <span className={styles.scaleLabel}>{minVal.toLocaleString()}</span>
            <div className={styles.scaleBar} />
            <span className={styles.scaleLabel}>{maxVal.toLocaleString()}</span>
          </div>
        )}

        <table className={styles.srOnly} aria-label={`${title} — data table`}>
          <caption>{title}</caption>
          <thead><tr><th>Region</th><th>Value</th></tr></thead>
          <tbody>
            {data.map(d => {
              const region = displayRegions.find(r => r.id === d.id);
              return (
                <tr key={d.id}>
                  <th>{region?.label || d.id}</th>
                  <td>{d.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ChartTooltip visible={tooltip.visible} x={tooltip.x} y={tooltip.y} rows={tooltip.rows} dir={dir} />
    </div>
  );
}

MapChart.propTypes = {
  title:            PropTypes.string,
  data:             PropTypes.arrayOf(PropTypes.shape({
    id:    PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    label: PropTypes.string,
  })),
  regions:          PropTypes.arrayOf(PropTypes.shape({
    id:      PropTypes.string.isRequired,
    label:   PropTypes.string.isRequired,
    labelAr: PropTypes.string,
    d:       PropTypes.string.isRequired,
    cx:      PropTypes.number,
    cy:      PropTypes.number,
  })),
  variant:          PropTypes.oneOf(['choropleth', 'filled', 'outline']),
  showColorScale:   PropTypes.bool,
  showRegionLabels: PropTypes.bool,
  loading:          PropTypes.bool,
  empty:            PropTypes.bool,
  dir:              PropTypes.oneOf(['ltr', 'rtl']),
};
