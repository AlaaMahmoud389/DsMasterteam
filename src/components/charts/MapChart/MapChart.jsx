import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './MapChart.module.css';

// ── Google Charts singleton loader ────────────────────────────────────────────
let _gcState = 'idle'; // 'idle' | 'loading' | 'ready'
const _gcQueue = [];

function loadGoogleCharts(cb) {
  if (_gcState === 'ready') { cb(); return; }
  _gcQueue.push(cb);
  if (_gcState === 'loading') return;
  _gcState = 'loading';
  const s = document.createElement('script');
  s.src = 'https://www.gstatic.com/charts/loader.js';
  s.async = true;
  s.onload = () => {
    window.google.charts.load('current', { packages: ['geochart'] });
    window.google.charts.setOnLoadCallback(() => {
      _gcState = 'ready';
      _gcQueue.splice(0).forEach(fn => fn());
    });
  };
  s.onerror = () => {
    _gcState = 'idle';
    _gcQueue.splice(0).forEach(fn => fn());
  };
  document.head.appendChild(s);
}

// ── Saudi Arabia ISO 3166-2 province codes ────────────────────────────────────
const SA_ISO = {
  riyadh:             'SA-01',
  makkah:             'SA-02',
  madinah:            'SA-03',
  eastern:            'SA-04',
  qassim:             'SA-05',
  hail:               'SA-06',
  tabuk:              'SA-07',
  'northern-borders': 'SA-08',
  jizan:              'SA-09',
  najran:             'SA-10',
  bahah:              'SA-11',
  jawf:               'SA-12',
  asir:               'SA-14',
};

const SA_LABELS_EN = {
  riyadh: 'Riyadh', makkah: 'Makkah', madinah: 'Madinah',
  eastern: 'Eastern Province', qassim: 'Al-Qassim', hail: 'Hail',
  tabuk: 'Tabuk', 'northern-borders': 'Northern Borders',
  jizan: 'Jizan', najran: 'Najran', bahah: 'Al-Bahah',
  jawf: 'Al-Jawf', asir: 'Asir',
};

const SA_LABELS_AR = {
  riyadh: 'الرياض', makkah: 'مكة المكرمة', madinah: 'المدينة المنورة',
  eastern: 'المنطقة الشرقية', qassim: 'القصيم', hail: 'حائل',
  tabuk: 'تبوك', 'northern-borders': 'الحدود الشمالية',
  jizan: 'جازان', najran: 'نجران', bahah: 'الباحة',
  jawf: 'الجوف', asir: 'عسير',
};

/* ── Helpers ──────────────────────────────────────────────────────────────── */

function buildDataTable(data, variant) {
  const g = window.google;
  const dt = new g.visualization.DataTable();
  dt.addColumn('string', 'Region');
  dt.addColumn('number', 'Value');

  if (variant === 'choropleth' && data.length > 0) {
    data.forEach(d => {
      const iso = SA_ISO[d.id] || d.id;
      dt.addRow([iso, d.value]);
    });
  } else {
    // filled / outline / empty choropleth: give all regions a uniform value
    Object.values(SA_ISO).forEach(iso => dt.addRow([iso, 1]));
  }
  return dt;
}

function buildOptions(variant, showColorScale, data) {
  const isFilled  = variant === 'filled';
  const isOutline = variant === 'outline';

  return {
    region: 'SA',
    resolution: 'provinces',
    displayMode: 'regions',
    backgroundColor: { fill: 'transparent' },
    datalessRegionColor: '#f3f4f6',
    defaultColor: '#f3f4f6',
    colorAxis: isFilled
      ? { colors: ['#1849a9', '#1849a9'] }
      : isOutline
        ? { colors: ['#f0f4ff', '#f0f4ff'] }
        : { colors: ['#d1e9ff', '#1849a9'] },
    legend: (!showColorScale || isFilled || isOutline || data.length === 0) ? 'none' : undefined,
    tooltip: { trigger: 'focus' },
    keepAspectRatio: true,
  };
}

/* ── Component ────────────────────────────────────────────────────────────── */

/**
 * MapChart — Saudi Arabia GeoChart via Google Charts
 * Figma: node 4560:5177 — choropleth / filled / outline variants
 *
 * Renders Saudi Arabia's 13 administrative provinces using the Google Charts
 * GeoChart API (https://www.gstatic.com/charts/loader.js). The script is
 * loaded once and cached across renders.
 */
export function MapChart({
  title,
  data           = [],
  variant        = 'choropleth',
  showColorScale = true,
  loading        = false,
  empty          = false,
  dir            = 'ltr',
}) {
  const containerRef = useRef(null);
  const chartRef     = useRef(null);
  const [gcReady, setGcReady] = useState(_gcState === 'ready');

  // Load Google Charts once
  useEffect(() => {
    if (_gcState === 'ready') { setGcReady(true); return; }
    loadGoogleCharts(() => setGcReady(true));
  }, []);

  const drawChart = useCallback(() => {
    if (!gcReady || !containerRef.current || loading) return;
    const isEmptyState = empty || (variant === 'choropleth' && data.length === 0);
    if (isEmptyState) return;

    try {
      if (chartRef.current) chartRef.current.clearChart();
      chartRef.current = new window.google.visualization.GeoChart(containerRef.current);
      chartRef.current.draw(buildDataTable(data, variant), buildOptions(variant, showColorScale, data));
    } catch (err) {
      console.warn('MapChart: Google Charts draw error', err);
    }
  }, [gcReady, data, variant, showColorScale, loading, empty]);

  useEffect(() => { drawChart(); }, [drawChart]);

  // Redraw on resize
  useEffect(() => {
    if (!gcReady) return;
    const ro = new ResizeObserver(() => drawChart());
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [gcReady, drawChart]);

  /* ── Loading skeleton ─────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className={styles.card} dir={dir}>
        {title && <p className={styles.title}>{title}</p>}
        <div className={`${styles.skeleton} ${styles.skelPulse}`} />
      </div>
    );
  }

  /* ── Empty state ──────────────────────────────────────────────────────── */
  if (empty || (variant === 'choropleth' && data.length === 0)) {
    return (
      <div className={styles.card} dir={dir}>
        {title && <p className={styles.title}>{title}</p>}
        <div className={styles.emptyBox}>
          <span className={styles.emptyText}>
            {dir === 'rtl' ? 'لا توجد بيانات متاحة' : 'No data available'}
          </span>
        </div>
      </div>
    );
  }

  /* ── Main render ──────────────────────────────────────────────────────── */
  return (
    <div className={styles.card} dir={dir}>
      {title && <p className={styles.title}>{title}</p>}
      {/* Show skeleton until Google Charts is ready */}
      {!gcReady && <div className={`${styles.skeleton} ${styles.skelPulse}`} />}
      <div
        ref={containerRef}
        className={styles.gchart}
        style={{ display: gcReady ? 'block' : 'none' }}
        role="img"
        aria-label={title}
      />
    </div>
  );
}

MapChart.propTypes = {
  title:          PropTypes.string,
  data:           PropTypes.arrayOf(PropTypes.shape({
    id:    PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    label: PropTypes.string,
  })),
  /** 'choropleth' — data-driven colour; 'filled' — solid blue; 'outline' — white with navy border */
  variant:        PropTypes.oneOf(['choropleth', 'filled', 'outline']),
  showColorScale: PropTypes.bool,
  loading:        PropTypes.bool,
  empty:          PropTypes.bool,
  dir:            PropTypes.oneOf(['ltr', 'rtl']),
};

/* ── Re-export Arabic/English label maps for stories ─────────────────────── */
export { SA_LABELS_EN, SA_LABELS_AR, SA_ISO };
