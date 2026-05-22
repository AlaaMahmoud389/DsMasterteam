import { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './MapChart.module.css';
import { ChartTooltip } from '../shared/ChartTooltip';

/**
 * MapChart — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY
 *
 * SVG-based region map. Each region is identified by a string `id` matching an entry in `data`.
 * Color is interpolated across the design-system blue ramp based on region value.
 * Supports two view modes:
 *   - 'world'  — simplified world region blocks
 *   - 'custom' — caller supplies `regions` array with SVG path/rect definitions
 *
 * RTL: legend text direction mirrors; map geometry unchanged.
 */

const COLOR_RAMP = ['#d1e9ff', '#b2ddff', '#53b1fd', '#2e90fa', '#175cd3', '#1849a9'];
const NULL_COLOR = '#f3f4f6';

function valueToColor(value, min, max) {
  if (value == null || max === min) return COLOR_RAMP[0];
  const t = (value - min) / (max - min);
  const idx = Math.round(t * (COLOR_RAMP.length - 1));
  return COLOR_RAMP[Math.max(0, Math.min(idx, COLOR_RAMP.length - 1))];
}

/* Simplified world region blocks — approximate geographic layout */
const WORLD_REGIONS = [
  { id: 'NA',  label: 'North America',  d: 'M 20,60 L 130,60 L 130,160 L 20,160 Z' },
  { id: 'SA',  label: 'South America',  d: 'M 50,170 L 130,170 L 130,290 L 50,290 Z' },
  { id: 'EU',  label: 'Europe',         d: 'M 190,55 L 270,55 L 270,140 L 190,140 Z' },
  { id: 'AF',  label: 'Africa',         d: 'M 185,150 L 270,150 L 270,290 L 185,290 Z' },
  { id: 'ME',  label: 'Middle East',    d: 'M 278,130 L 330,130 L 330,200 L 278,200 Z' },
  { id: 'AS',  label: 'Asia',           d: 'M 338,50 L 490,50 L 490,190 L 338,190 Z' },
  { id: 'SEA', label: 'SE Asia',        d: 'M 400,198 L 490,198 L 490,270 L 400,270 Z' },
  { id: 'OC',  label: 'Oceania',        d: 'M 420,278 L 500,278 L 500,330 L 420,330 Z' },
];

export function MapChart({
  title,
  data = [],
  regions,
  showColorScale = true,
  showLegend = false,
  loading = false,
  empty = false,
  dir = 'ltr',
}) {
  const cardRef = useRef(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, rows: [] });

  const values = data.map(d => d.value).filter(v => v != null);
  const minVal = values.length ? Math.min(...values) : 0;
  const maxVal = values.length ? Math.max(...values) : 1;

  const getRegionData = useCallback((id) => data.find(d => d.id === id), [data]);

  const showTip = useCallback((e, region, rd) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const rows = [
      { label: region.label, value: rd ? rd.value.toLocaleString() : 'N/A' },
    ];
    if (rd?.label) rows.push({ label: rd.label, value: '' });
    setTooltip({ visible: true, x: Math.max(4, e.clientX - r.left + 14), y: Math.max(4, e.clientY - r.top - 48), rows });
  }, []);

  const hideTip = useCallback(() => setTooltip(t => ({ ...t, visible: false })), []);

  const displayRegions = regions || WORLD_REGIONS;
  const VIEW_W = 520;
  const VIEW_H = 340;

  if (loading) {
    return (
      <div className={styles.card} dir={dir} ref={cardRef}>
        <p className={styles.title}>{title}</p>
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} width="100%" className={styles.svg} aria-hidden="true">
          {displayRegions.slice(0, 4).map((reg, i) => (
            <path key={reg.id} d={reg.d} fill="#e7e9ed" stroke="#fff" strokeWidth="2"
              className={`${styles.skelPulse} ${styles[`skelDelay${(i % 2) + 1}`]}`} />
          ))}
        </svg>
      </div>
    );
  }

  if (empty || data.length === 0) {
    return (
      <div className={styles.card} dir={dir} ref={cardRef}>
        <p className={styles.title}>{title}</p>
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} width="100%" className={styles.svg} aria-hidden="true">
          {displayRegions.map(reg => (
            <path key={reg.id} d={reg.d} fill={NULL_COLOR} stroke="#fff" strokeWidth="2" />
          ))}
          <text x={VIEW_W / 2} y={VIEW_H / 2} textAnchor="middle" fontSize="14" fill="#6c7c96"
            fontFamily="IBM Plex Sans Arabic,sans-serif">No data available</text>
        </svg>
      </div>
    );
  }

  return (
    <div className={styles.card} dir={dir} ref={cardRef}>
      <p className={styles.title}>{title}</p>
      <div className={styles.content}>
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} width="100%" role="img"
          aria-label={title} className={styles.svg}>
          <title>{title}</title>

          {displayRegions.map(region => {
            const rd = getRegionData(region.id);
            const fill = rd ? valueToColor(rd.value, minVal, maxVal) : NULL_COLOR;
            return (
              <path
                key={region.id}
                d={region.d}
                fill={fill}
                stroke="#fff"
                strokeWidth="2"
                strokeLinejoin="round"
                className={styles.region}
                tabIndex={0}
                role="button"
                aria-label={`${region.label}: ${rd ? rd.value.toLocaleString() : 'No data'}`}
                onMouseEnter={e => showTip(e, region, rd)}
                onMouseLeave={hideTip}
                onFocus={e => showTip(e, region, rd)}
                onBlur={hideTip}
              />
            );
          })}
        </svg>

        {showColorScale && (
          <div className={styles.colorScale}>
            <span className={styles.scaleLabel}>{minVal.toLocaleString()}</span>
            <div className={styles.scaleBar} />
            <span className={styles.scaleLabel}>{maxVal.toLocaleString()}</span>
          </div>
        )}

        {showLegend && data.length > 0 && (
          <div className={styles.legend}>
            {data.map(d => {
              const region = displayRegions.find(r => r.id === d.id);
              const fill = valueToColor(d.value, minVal, maxVal);
              return (
                <div key={d.id} className={styles.legendItem}>
                  <div className={styles.legendSwatch} style={{ background: fill }} />
                  <span>{region?.label || d.id}: {d.value.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        )}

        <table className={styles.srOnly} aria-label={`${title} — data table`}>
          <caption>{title}</caption>
          <thead><tr><th>Region</th><th>Value</th></tr></thead>
          <tbody>
            {data.map(d => {
              const region = displayRegions.find(r => r.id === d.id);
              return <tr key={d.id}><th>{region?.label || d.id}</th><td>{d.value}</td></tr>;
            })}
          </tbody>
        </table>
      </div>

      <ChartTooltip visible={tooltip.visible} x={tooltip.x} y={tooltip.y} rows={tooltip.rows} dir={dir} />
    </div>
  );
}

MapChart.propTypes = {
  title:          PropTypes.string.isRequired,
  data:           PropTypes.arrayOf(PropTypes.shape({
    id:    PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    label: PropTypes.string,
  })).isRequired,
  regions:        PropTypes.arrayOf(PropTypes.shape({
    id:    PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    d:     PropTypes.string.isRequired,
  })),
  showColorScale: PropTypes.bool,
  showLegend:     PropTypes.bool,
  loading:        PropTypes.bool,
  empty:          PropTypes.bool,
  dir:            PropTypes.oneOf(['ltr', 'rtl']),
};
