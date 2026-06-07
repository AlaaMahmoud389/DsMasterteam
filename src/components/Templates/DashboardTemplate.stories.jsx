/**
 * Dashboard Template — Masterteam Design System
 * Figma: WTmRAkJVvw0IvZMA7wBdTC / node 7614:37699  (Desktop - 1, 1920px)
 *
 * Grid law — Bootstrap-style responsive columns:
 *   Desktop  ≥ 1180px  →  12 columns · gap 24px · sidebar 256px in-flow  (story at 1440px)
 *   Tablet    876–1179px →  8 columns · gap 24px · sidebar overlay
 *   Mobile    < 876px   →  4 columns · gap 16px · sidebar overlay
 *
 * Figma layout (extracted from node 7614:37699):
 *   Sidebar     256 px wide
 *   NavHeader    74 px tall
 *   Content padding  32 px (desktop) · 24 px (tablet) · 16 px (mobile)
 *   Metrics row  h = 241 px (auto — 4 × Metric cards, each 3 cols)
 *   Chart row 1  h = 457 px (DonutChart + AreaChart, each 6 cols)
 *   Chart row 2  h = 468 px (VerticalBarChart + RadarChart, each 6 cols)
 *   Row gap      24 px between all rows
 */

import { useState } from 'react';
import { NavDrawerPanel } from '../UI Shells-NavDrawer/NavDrawer';
import { Metric } from '../Metric/Metric';
import avatarImg from '../../assets/photos/avatar-1.png';
import { DonutChart } from '../charts/DonutChart/DonutChart';
import { AreaChart } from '../charts/AreaChart/AreaChart';
import { VerticalBarChart } from '../charts/VerticalBarChart/VerticalBarChart';
import { RadarChart } from '../charts/RadarChart/RadarChart';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=7614-37699';

/* ─────────────────────────────────────────────────────────────────────────────
   Header icons
   ──────────────────────────────────────────────────────────────────────────── */

const GlobeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="9" stroke="#233A61" strokeWidth="1.5" />
    <path d="M12 3c-2.8 3.3-4.5 6.7-4.5 9s1.7 5.7 4.5 9M12 3c2.8 3.3 4.5 6.7 4.5 9s-1.7 5.7-4.5 9M3 12h18"
      stroke="#233A61" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
      stroke="#233A61" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0"
      stroke="#233A61" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
    <circle cx="9.5" cy="9.5" r="6" stroke="#9DA4AE" strokeWidth="1.5" />
    <path d="M14.5 14.5L18 18" stroke="#9DA4AE" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
    <rect x="7" y="1" width="6" height="10" rx="3" stroke="#9DA4AE" strokeWidth="1.5" />
    <path d="M3.5 10a8.5 8.5 0 0 0 13 0M10 18v-3" stroke="#9DA4AE" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const HamburgerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path d="M3 6h18M3 12h18M3 18h18" stroke="#233A61" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────────
   Dashboard header  (Figma: Nav Header 7614:37712 · h=74px · p=0 32px)
   ──────────────────────────────────────────────────────────────────────────── */

const DashboardHeader = ({ rtl = false, onMenuClick }) => (
  <header style={{
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    flexDirection:  rtl ? 'row-reverse' : 'row',
    height:         74,
    padding:        '0 32px',
    background:     '#ffffff',
    boxShadow:      '0px 1px 3px rgba(16,24,40,0.10), 0px 1px 2px rgba(16,24,40,0.06)',
    flexShrink:     0,
    boxSizing:      'border-box',
    fontFamily:     "'IBM Plex Sans Arabic', system-ui, sans-serif",
    gap:            16,
  }}>
    {/* Hamburger — visible only on tablet/mobile via CSS */}
    <button
      className="ds-menu-btn"
      onClick={onMenuClick}
      aria-label={rtl ? 'فتح القائمة' : 'Open navigation'}
      type="button"
    >
      <HamburgerIcon />
    </button>

    {/* Search box — Figma: 320×40px */}
    <div className="ds-search-box" style={{
      border:       '1px solid #d2d6db',
      borderRadius: 4,
      background:   '#ffffff',
      display:      'flex',
      alignItems:   'center',
      gap:          8,
      padding:      '0 8px',
      boxSizing:    'border-box',
      direction:    rtl ? 'rtl' : 'ltr',
    }}>
      <SearchIcon />
      <span style={{ flex: 1, fontSize: 16, color: '#9DA4AE', lineHeight: '24px',
        whiteSpace: 'nowrap', overflow: 'hidden' }}>
        {rtl ? 'بحث' : 'Search'}
      </span>
      <MicIcon />
    </div>

    {/* Actions: icons + avatar */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 30, flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <GlobeIcon /><BellIcon />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden',
          flexShrink: 0, border: '2px solid #ffffff', background: '#e5e7eb' }}>
          <img src={avatarImg} alt="Ahmad Alwarda"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="ds-user-text" style={{
          display: 'flex', flexDirection: 'column', textAlign: rtl ? 'right' : 'left' }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#233a61',
            lineHeight: '20px', whiteSpace: 'nowrap' }}>
            {rtl ? 'أحمد الورده' : 'Ahmad Alwarda'}
          </span>
          <span style={{ fontSize: 14, fontWeight: 400, color: '#3c5073',
            lineHeight: '20px', whiteSpace: 'nowrap' }}>
            ahmad@email.com
          </span>
        </div>
      </div>
    </div>
  </header>
);

/* ─────────────────────────────────────────────────────────────────────────────
   Nav Drawer items
   ──────────────────────────────────────────────────────────────────────────── */

const DRAWER_ITEMS = [
  { label: 'Dashboard',     labelAr: 'لوحة التحكم',    type: 'link',   level: 1, state: 'Selected', icon: true,  badge: false },
  { label: 'Analytics',     labelAr: 'التحليلات',       type: 'parent', level: 1, state: 'Default',  icon: true,  badge: true,  badgeCount: '+99', expanded: true },
  { label: 'Overview',      labelAr: 'نظرة عامة',       type: 'link',   level: 2, state: 'Default',  icon: false, badge: true,  badgeCount: '+99' },
  { label: 'Reports',       labelAr: 'التقارير',        type: 'link',   level: 2, state: 'Default',  icon: false, badge: true,  badgeCount: '+99' },
  { label: 'Charts',        labelAr: 'الرسوم البيانية', type: 'link',   level: 2, state: 'Default',  icon: false, badge: true,  badgeCount: '+99' },
  { label: 'Monitoring',    labelAr: 'المراقبة',        type: 'parent', level: 1, state: 'Default',  icon: true,  badge: false, expanded: false },
  { divider: true },
  { label: 'Products',      labelAr: 'المنتجات',        type: 'parent', level: 1, state: 'Default',  icon: true,  badge: false, expanded: true },
  { label: 'Catalog',       labelAr: 'الكتالوج',        type: 'link',   level: 2, state: 'Default',  icon: false, badge: true,  badgeCount: '+99' },
  { label: 'Inventory',     labelAr: 'المخزون',         type: 'link',   level: 2, state: 'Default',  icon: false, badge: true,  badgeCount: '+99' },
  { label: 'Orders',        labelAr: 'الطلبات',         type: 'link',   level: 2, state: 'Default',  icon: false, badge: true,  badgeCount: '+99' },
  { label: 'Customers',     labelAr: 'العملاء',         type: 'parent', level: 1, state: 'Default',  icon: true,  badge: false, expanded: true },
  { label: 'All Customers', labelAr: 'كل العملاء',      type: 'link',   level: 2, state: 'Default',  icon: false, badge: true,  badgeCount: '+99' },
  { label: 'Segments',      labelAr: 'الشرائح',         type: 'link',   level: 2, state: 'Default',  icon: false, badge: true,  badgeCount: '+99' },
  { label: 'Feedback',      labelAr: 'الملاحظات',       type: 'link',   level: 2, state: 'Default',  icon: false, badge: true,  badgeCount: '+99' },
  { divider: true },
  { label: 'Settings',      labelAr: 'الإعدادات',       type: 'link',   level: 1, state: 'Default',  icon: true,  badge: false },
  { label: 'Help',          labelAr: 'المساعدة',        type: 'link',   level: 1, state: 'Disabled', icon: true,  badge: false },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Chart & metric data  (sourced from Figma node 7614:37699)
   ──────────────────────────────────────────────────────────────────────────── */

/* Figma: 4 × Metric instances (7614:37715–37718) · each 378×241 px */
const METRICS = [
  { labelEn: '24h Views', percentage: '50%', changePct: '100%', textEn: 'vs last month', chartType: 'Realistic', trend: 'Positive' },
  { labelEn: '24h Views', percentage: '50%', changePct: '100%', textEn: 'vs last month', chartType: 'Realistic', trend: 'Positive' },
  { labelEn: '24h Views', percentage: '50%', changePct: '100%', textEn: 'vs last month', chartType: 'Realistic', trend: 'Positive' },
  { labelEn: '24h Views', percentage: '50%', changePct: '100%', textEn: 'vs last month', chartType: 'Realistic', trend: 'Positive' },
];

/* Figma: Pie Chart / Widget Table (7614:37720) — gauge LEFT, percentage table RIGHT */
const DONUT_SEGMENTS = [
  { id: 1, label: 'Item Label #1', value: 30 },
  { id: 2, label: 'Item Label #2', value: 35 },
  { id: 3, label: 'Item Label #3', value: 40 },
  { id: 4, label: 'Item Label #4', value: 15 },
];
const DONUT_PCT_ROWS = [
  { label: 'Item Label #1', percentage: 30 },
  { label: 'Item Label #2', percentage: 35 },
  { label: 'Item Label #3', percentage: 40 },
  { label: 'Item Label #4', percentage: 15 },
];
const DONUT_KPI = {
  value: '78,909.72',
  badge: { icon: '↑', text: '4.5%', label: 'from last week' },
  link:  { text: 'More Details', href: '#' },
};

/* Figma: Area chart (7614:37753) — 2 legend series · Jan–Sep · "Active users" y · "Month" x */
const AREA_CATEGORIES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
const AREA_SERIES = [
  { id: 1, label: 'Series 1', data: [620, 550, 430, 340, 360, 430, 510, 570, 600] },
  { id: 2, label: 'Series 2', data: [180, 290, 430, 560, 660, 700, 670, 610, 560] },
];
const AREA_KPI = {
  value: '78,909.72',
  badge: { icon: '↑', text: '4.5%', label: 'from last week' },
};

/* Figma: Vertical Bar Chart (7614:37817) — stacked bars (3 series) + 1 line overlay · Jan–Jul */
const BAR_CATEGORIES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const BAR_SERIES = [
  { id: 1, label: 'Series 1', data: [120, 80,  130, 100, 60,  70,  75] },
  { id: 2, label: 'Series 2', data: [100, 65,  110,  90, 50,  60,  65] },
  { id: 3, label: 'Series 3', data: [ 80, 50,   90,  70, 40,  45,  50] },
  { id: 4, label: 'Series 4', type: 'line', data: [350, 280, 390, 320, 210, 250, 270] },
];

/* Figma: Radar Chart (7614:37818) — 7 "Day" axes · 3 series · maxValue 1000 */
const RADAR_AXES = ['Day', 'Day', 'Day', 'Day', 'Day', 'Day', 'Day'];
const RADAR_SERIES = [
  { id: 1, label: 'Series 1', data: [580, 510, 620, 590, 540, 570, 610] },
  { id: 2, label: 'Series 2', data: [720, 680, 730, 690, 760, 700, 740] },
  { id: 3, label: 'Series 3', data: [900, 850, 800, 920, 880, 840, 890] },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Bootstrap 12 / 8 / 4 grid CSS
   Container queries fire on .ds-shell-wrapper width (= viewport width when
   the shell-wrapper is 100 vw). Sidebar is in-flow on desktop and position:fixed
   (slide-in overlay) on tablet/mobile.
   ──────────────────────────────────────────────────────────────────────────── */

const DASH_CSS = `
  /* ── Named container (fires container queries at wrapper width = viewport) ── */
  .ds-shell-wrapper {
    container-type: inline-size;
    container-name: ds-dash;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  /* ── Root flex shell ── */
  .ds-shell {
    display: flex;
    min-height: 100vh;
    background: #f9fafb;
    font-family: 'IBM Plex Sans Arabic', system-ui, sans-serif;
    position: relative;
  }
  .ds-shell.ds-rtl { flex-direction: row-reverse; }

  /* ──────────────────────────────────────────────────────────────────────────
     SIDEBAR
     Desktop (≥ 1180 px): 256 px in-flow (NavDrawerPanel native width)
     Tablet / Mobile:      position:fixed slide-in overlay
     ────────────────────────────────────────────────────────────────────────── */
  .ds-sidebar {
    width: 256px;
    flex-shrink: 0;
    z-index: 10;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
  }
  /* NavDrawerPanel must fill the sidebar width and height */
  .ds-sidebar > * {
    width: 100% !important;
    min-height: 100vh !important;
    box-sizing: border-box !important;
    flex: 1 !important;
  }

  /* ── Main column ── */
  .ds-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow-x: hidden;
  }

  /* ──────────────────────────────────────────────────────────────────────────
     CONTENT — flex column, rows stack vertically
     Figma: padding 32 px · row-gap 24 px
     ────────────────────────────────────────────────────────────────────────── */
  .ds-content {
    flex: 1;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
  }

  /* ──────────────────────────────────────────────────────────────────────────
     METRICS ROW — Bootstrap 12 cols · 4 cards × 3 cols each
     → repeat(4, 1fr) gives exactly 25 % per card with 24 px gaps
     Figma: 4 × Metric cards, each 378 px at 1920 px viewport
     ────────────────────────────────────────────────────────────────────────── */
  .ds-metrics-row {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
    width: 100%;
  }
  /* Force each Metric to fill its grid cell */
  .ds-metrics-row .ds-metric {
    min-width: 0;
  }
  .ds-metrics-row .ds-metric > * {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
  }

  /* ──────────────────────────────────────────────────────────────────────────
     CHART ROWS — Bootstrap 12 cols · 2 cards × 6 cols each
     → repeat(2, 1fr) gives exactly 50 % per chart with 24 px gap
     Figma row 1: 457 px tall (DonutChart + AreaChart)
     Figma row 2: 468 px tall (VerticalBarChart + RadarChart)
     ────────────────────────────────────────────────────────────────────────── */
  .ds-chart-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
    width: 100%;
    min-width: 0;
  }
  .ds-chart-row-1 { height: 457px; }
  .ds-chart-row-2 { height: 468px; }

  /* Each chart card fills its grid cell completely */
  .ds-chart-card {
    height: 100%;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }
  /* The chart component root div must fill the card wrapper */
  .ds-chart-card > * {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    max-width: 100% !important;
    height: 100% !important;
    min-width: 0 !important;
    min-height: 0 !important;
    box-sizing: border-box !important;
  }
  /* Chart content section grows to fill remaining height inside card */
  .ds-chart-card > * > div:nth-last-of-type(2) {
    flex: 1 !important;
    min-height: 0 !important;
  }
  /* SVG fills the content section */
  .ds-chart-card > * > div:nth-last-of-type(2) > svg[role="img"] {
    flex: 1 !important;
    height: 0 !important;
    min-height: 120px !important;
    width: 100% !important;
  }

  /* Donut card: allow vertical scroll so all series rows are visible */
  .ds-chart-scroll {
    overflow-y: auto !important;
  }
  .ds-chart-scroll > * {
    height: auto !important;
    min-height: 100% !important;
  }

  /* ── Overlay backdrop ── */
  .ds-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 11, 54, 0.45);
    z-index: 199;
    cursor: pointer;
    border: none;
    padding: 0;
  }
  .ds-overlay.active { display: block; }

  /* ── Hamburger button — hidden on desktop ── */
  .ds-menu-btn {
    display: none;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 8px;
    flex-shrink: 0;
    padding: 0;
  }
  .ds-menu-btn:hover         { background: #f3f4f6; }
  .ds-menu-btn:focus-visible { outline: 2px solid #1849a9; outline-offset: 2px; }

  /* ── Search box — 320 px on desktop ── */
  .ds-search-box {
    width: 320px;
    height: 40px;
    flex-shrink: 0;
  }

  /* ── User text ── */
  .ds-user-text { display: flex; }


  /* ════════════════════════════════════════════════════════════════════════════
     TABLET  876 – 1179 px  →  Bootstrap 8 columns
     Sidebar: fixed overlay · Hamburger visible
     Metrics: 2 per row (4 cols each out of 8)
     Charts:  1 per row (full width, stacked)
     ════════════════════════════════════════════════════════════════════════════ */
  @container ds-dash (max-width: 1179px) {

    /* Sidebar becomes fixed overlay, slides from left */
    .ds-sidebar {
      position: fixed;
      top: 0; left: 0;
      height: 100vh;
      z-index: 200;
      transform: translateX(-256px);
    }
    .ds-sidebar.open {
      transform: translateX(0);
      box-shadow: 4px 0 24px rgba(0, 11, 54, 0.18);
    }
    .ds-shell.ds-rtl .ds-sidebar {
      left: auto; right: 0;
      transform: translateX(256px);
    }
    .ds-shell.ds-rtl .ds-sidebar.open {
      transform: translateX(0);
      box-shadow: -4px 0 24px rgba(0, 11, 54, 0.18);
    }

    .ds-menu-btn { display: flex; }

    /* Reduce padding */
    .ds-content { padding: 24px; }

    /* Metrics: 2 per row at tablet (Bootstrap 4-col each out of 8) */
    .ds-metrics-row {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    /* Charts: 1 per row (Bootstrap 8-col each = full width) */
    .ds-chart-row {
      grid-template-columns: minmax(0, 1fr);
      height: auto;
    }
    .ds-chart-card { height: 400px; }
  }


  /* ════════════════════════════════════════════════════════════════════════════
     MOBILE  < 876 px  →  Bootstrap 4 columns
     All cards: 1 per row (full width)
     ════════════════════════════════════════════════════════════════════════════ */
  @container ds-dash (max-width: 875px) {

    /* Mobile: sidebar and hamburger completely hidden — no side navigation */
    .ds-sidebar  { display: none !important; }
    .ds-menu-btn { display: none !important; }

    /* Compact spacing */
    .ds-content { padding: 16px; gap: 16px; }

    /* Search expands, user details hidden */
    .ds-search-box { width: auto; flex: 1; min-width: 0; }
    .ds-user-text  { display: none; }

    /* Metrics: 1 per row (Bootstrap 4-col each = full width) */
    .ds-metrics-row {
      grid-template-columns: minmax(0, 1fr);
      gap: 16px;
    }

    /* Charts: 1 per row, shorter height */
    .ds-chart-row {
      grid-template-columns: minmax(0, 1fr);
      gap: 16px;
      height: auto;
    }
    .ds-chart-card { height: 340px; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Metric row — shared between LTR / RTL
   ──────────────────────────────────────────────────────────────────────────── */

const MetricRow = ({ rtl = false }) =>
  METRICS.map((m, i) => (
    <div key={i} className="ds-metric">
      <Metric
        variant="Small Chart"
        rtl={rtl}
        labelEn={m.labelEn}
        labelAr="المشاهدات خلال 24س"
        percentage={m.percentage}
        changePct={m.changePct}
        textEn={m.textEn}
        textAr="مقارنة بالشهر الماضي"
        chartType={m.chartType}
        trend={m.trend}
        changeType="01"
        showMarker
        showActions
        showChange
        showChart
        showFeaturedIcon
        showInfo
        showSecondaryAction
        showText
      />
    </div>
  ));

/* ─────────────────────────────────────────────────────────────────────────────
   Chart content — LTR
   Row 1 (h=457): DonutChart | AreaChart
   Row 2 (h=468): VerticalBarChart | RadarChart
   ──────────────────────────────────────────────────────────────────────────── */

const ChartRowsLTR = () => (
  <>
    {/* ── Row 1 — 457 px (Figma frame 7614:37719) ── */}
    <div className="ds-chart-row ds-chart-row-1">

      {/* DonutChart — Figma: Pie Chart / Widget Table 7614:37720 (780×457 px)
          Gauge 320×168 px LEFT · percentage table 372 px RIGHT · scrollable */}
      <div className="ds-chart-card ds-chart-scroll">
        <DonutChart
          title="Data Title"
          type="half"
          orientation="landscape"
          tableType="percentage"
          showTable
          showTableTitle
          tableTitleText="Table Title"
          showHeader
          showKpi
          centerValue="99,999"
          centerLabel="Data Title"
          segments={DONUT_SEGMENTS}
          percentageRows={DONUT_PCT_ROWS}
          kpi={DONUT_KPI}
          dir="ltr"
        />
      </div>

      {/* AreaChart — Figma: Area chart 7614:37753 (780×457 px)
          2 series · Jan–Sep · y="Active users" · x="Month" */}
      <div className="ds-chart-card">
        <AreaChart
          title="Data Title"
          series={AREA_SERIES}
          categories={AREA_CATEGORIES}
          kpi={AREA_KPI}
          showKpi
          showLegend
          lineType="smooth"
          areaType="multi"
          yAxisTitle="Active users"
          xAxisTitle="Month"
          showYAxisLabel
          showXAxisLabel
          showContent
          dir="ltr"
        />
      </div>
    </div>

    {/* ── Row 2 — 468 px (Figma frame 7614:37754) ── */}
    <div className="ds-chart-row ds-chart-row-2">

      {/* VerticalBarChart — Figma: Vertical Bar Chart 7614:37817 (780×468 px)
          stacked-combo · 3 bar series stacked + 1 line overlay · Jan–Jul */}
      <div className="ds-chart-card">
        <VerticalBarChart
          title="Card Title"
          categories={BAR_CATEGORIES}
          series={BAR_SERIES}
          barType="stacked-combo"
          showKpi={false}
          showLegend
          yAxisTitle="Value"
          xAxisTitle="Month"
          dir="ltr"
        />
      </div>

      {/* RadarChart — Figma: Radar Chart 7614:37818 (780×468 px)
          7 × "Day" axes · 3 series · maxValue=1000 · scale badges */}
      <div className="ds-chart-card">
        <RadarChart
          title="Card Title"
          axisLabels={RADAR_AXES}
          series={RADAR_SERIES}
          maxValue={1000}
          showLegend={false}
          showScaleBadges
          dir="ltr"
        />
      </div>
    </div>
  </>
);

/* ─────────────────────────────────────────────────────────────────────────────
   Chart content — RTL (Arabic labels, mirrored layout)
   ──────────────────────────────────────────────────────────────────────────── */

const ChartRowsRTL = () => (
  <>
    <div className="ds-chart-row ds-chart-row-1">
      <div className="ds-chart-card ds-chart-scroll">
        <DonutChart
          title="عنوان البيانات"
          type="half"
          orientation="landscape"
          tableType="percentage"
          showTable
          showTableTitle
          tableTitleText="عنوان الجدول"
          showHeader
          showKpi
          centerValue="٩٩٬٩٩٩"
          centerLabel="عنوان البيانات"
          segments={[
            { id: 1, label: 'تسمية العنصر #1', value: 30 },
            { id: 2, label: 'تسمية العنصر #2', value: 35 },
            { id: 3, label: 'تسمية العنصر #3', value: 40 },
            { id: 4, label: 'تسمية العنصر #4', value: 15 },
          ]}
          percentageRows={[
            { label: 'تسمية العنصر #1', percentage: 30 },
            { label: 'تسمية العنصر #2', percentage: 35 },
            { label: 'تسمية العنصر #3', percentage: 40 },
            { label: 'تسمية العنصر #4', percentage: 15 },
          ]}
          kpi={{
            value: '٧٨٬٩٠٩٫٧٢',
            badge: { icon: '↑', text: '٤٫٥٪', label: 'من الأسبوع الماضي' },
            link:  { text: 'مزيد من التفاصيل', href: '#' },
          }}
          dir="rtl"
        />
      </div>
      <div className="ds-chart-card">
        <AreaChart
          title="عنوان البيانات"
          series={[
            { id: 1, label: 'السلسلة 1', data: [620, 550, 430, 340, 360, 430, 510, 570, 600] },
            { id: 2, label: 'السلسلة 2', data: [180, 290, 430, 560, 660, 700, 670, 610, 560] },
          ]}
          categories={['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر']}
          kpi={{ value: '٧٨٬٩٠٩٫٧٢', badge: { icon: '↑', text: '٤٫٥٪', label: 'من الأسبوع الماضي' } }}
          showKpi showLegend lineType="smooth" areaType="multi"
          yAxisTitle="المستخدمون النشطون"
          xAxisTitle="الشهر"
          showYAxisLabel showXAxisLabel showContent
          dir="rtl"
        />
      </div>
    </div>

    <div className="ds-chart-row ds-chart-row-2">
      <div className="ds-chart-card">
        <VerticalBarChart
          title="عنوان البطاقة"
          categories={['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو']}
          series={[
            { id: 1, label: 'السلسلة 1', data: [120,  80, 130, 100, 60,  70,  75] },
            { id: 2, label: 'السلسلة 2', data: [100,  65, 110,  90, 50,  60,  65] },
            { id: 3, label: 'السلسلة 3', data: [ 80,  50,  90,  70, 40,  45,  50] },
            { id: 4, label: 'السلسلة 4', type: 'line', data: [350, 280, 390, 320, 210, 250, 270] },
          ]}
          barType="stacked-combo" showKpi={false} showLegend
          yAxisTitle="القيمة" xAxisTitle="الشهر"
          dir="rtl"
        />
      </div>
      <div className="ds-chart-card">
        <RadarChart
          title="عنوان البطاقة"
          axisLabels={['يوم','يوم','يوم','يوم','يوم','يوم','يوم']}
          series={[
            { id: 1, label: 'السلسلة 1', data: [580, 510, 620, 590, 540, 570, 610] },
            { id: 2, label: 'السلسلة 2', data: [720, 680, 730, 690, 760, 700, 740] },
            { id: 3, label: 'السلسلة 3', data: [900, 850, 800, 920, 880, 840, 890] },
          ]}
          maxValue={1000} showLegend={false} showScaleBadges
          dir="rtl"
        />
      </div>
    </div>
  </>
);

/* ─────────────────────────────────────────────────────────────────────────────
   Dashboard shell — full page layout
   ──────────────────────────────────────────────────────────────────────────── */

const DashboardShell = ({ rtl = false, onColor = false }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <style>{DASH_CSS}</style>
      {/* ds-shell-wrapper is the named CSS container.
          Container queries fire at THIS element's width, not the viewport,
          making AllBreakpoints previews render each panel at its explicit width. */}
      <div className="ds-shell-wrapper">
        <div className={`ds-shell${rtl ? ' ds-rtl' : ''}`}>

          {/* Overlay — active when sidebar is open on tablet/mobile */}
          <button
            type="button"
            className={`ds-overlay${sidebarOpen ? ' active' : ''}`}
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          />

          {/* Sidebar — 256 px, in-flow desktop · overlay tablet/mobile */}
          <div className={`ds-sidebar${sidebarOpen ? ' open' : ''}`}>
            <NavDrawerPanel
              items={DRAWER_ITEMS}
              full
              showHeader
              rtl={rtl}
              onColor={onColor}
            />
          </div>

          {/* Main content column */}
          <div className="ds-main">
            <DashboardHeader rtl={rtl} onMenuClick={() => setSidebarOpen(true)} />

            {/* 12 / 8 / 4 column grid */}
            <div className="ds-content">

              {/* Metrics row — 4 × 3-col cards (desktop) · 2 × 4-col (tablet) · 1 × 4-col (mobile) */}
              <div className="ds-metrics-row">
                <MetricRow rtl={rtl} />
              </div>

              {/* Chart rows */}
              {rtl ? <ChartRowsRTL /> : <ChartRowsLTR />}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Storybook metadata
   ──────────────────────────────────────────────────────────────────────────── */

export default {
  title: 'Templates/Dashboard',
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component:
          'Full-page dashboard assembled from DS components. ' +
          'Figma source: node **7614:37699** (Desktop - 1, 1920 px). ' +
          'Grid: **12 cols** ≥ 1180 px (story at 1440 px) · **8 cols** 876–1179 px · **4 cols** < 876 px (Bootstrap law). ' +
          'Sidebar 256 px in-flow on desktop, overlay on tablet, hidden on mobile. ' +
          'Chart rows match Figma heights: Row 1 = 457 px · Row 2 = 468 px.',
      },
    },
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   Story: Desktop — 1280 px  (12 columns)
   Sidebar 272 px in-flow · metrics 3 cols each · charts 6 cols each
   ──────────────────────────────────────────────────────────────────────────── */

export const DesktopLTR = {
  name: 'Desktop — LTR (1440px · 12 cols)',
  parameters: {
    viewport: {
      viewports: {
        desktop1440: {
          name: 'Desktop (1440px)',
          styles: { width: '1440px', height: '900px' },
          type: 'desktop',
        },
      },
      defaultViewport: 'desktop1440',
    },
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        story:
          'Desktop layout at 1440 px. Bootstrap **12-column** grid (kicks in at ≥ 1180 px). ' +
          'Sidebar 256 px in-flow · content padding 32 px · col-gap 24 px. ' +
          'Metrics row: 4 × Metric cards. ' +
          'Row 1 (457 px): DonutChart + AreaChart (each 6 cols). ' +
          'Row 2 (468 px): VerticalBarChart + RadarChart (each 6 cols).',
      },
    },
  },
  render: () => <DashboardShell />,
};

export const DesktopRTL = {
  name: 'Desktop — RTL (1440px · 12 cols)',
  parameters: {
    viewport: {
      viewports: {
        desktop1440: {
          name: 'Desktop (1440px)',
          styles: { width: '1440px', height: '900px' },
          type: 'desktop',
        },
      },
      defaultViewport: 'desktop1440',
    },
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Desktop layout in **RTL** mode (Arabic). ' +
          'Sidebar on the right side. All components use `dir="rtl"` with Arabic labels.',
      },
    },
  },
  render: () => <DashboardShell rtl />,
};

export const DesktopDarkSidebar = {
  name: 'Desktop — Dark Sidebar (1440px)',
  parameters: {
    viewport: {
      viewports: {
        desktop1440: {
          name: 'Desktop (1440px)',
          styles: { width: '1440px', height: '900px' },
          type: 'desktop',
        },
      },
      defaultViewport: 'desktop1440',
    },
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Desktop layout with `onColor=true` on NavDrawerPanel — renders the dark navy (`#102a56`) sidebar variant.',
      },
    },
  },
  render: () => <DashboardShell onColor />,
};

/* ─────────────────────────────────────────────────────────────────────────────
   Story: Tablet — 960 px  (8 columns)
   Sidebar overlay · metrics 4 cols each (2/row) · charts full-width (8 cols)
   ──────────────────────────────────────────────────────────────────────────── */

export const TabletLTR = {
  name: 'Tablet — LTR (876px · 8 cols)',
  parameters: {
    viewport: {
      viewports: {
        tablet960: {
          name: 'Tablet (960px)',
          styles: { width: '876px', height: '768px' },
          type: 'tablet',
        },
      },
      defaultViewport: 'tablet960',
    },
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Tablet layout at 960 px. Bootstrap **8-column** grid. ' +
          'Sidebar hidden (fixed overlay, hamburger toggle). ' +
          'Content padding 24 px · col-gap 24 px. ' +
          'Metrics: 2 per row (each 4 cols). ' +
          'Charts: 1 per row (each 8 cols = full width, height 400 px).',
      },
    },
  },
  render: () => <DashboardShell />,
};

export const TabletRTL = {
  name: 'Tablet — RTL (876px · 8 cols)',
  parameters: {
    viewport: {
      viewports: {
        tablet960: {
          name: 'Tablet (960px)',
          styles: { width: '876px', height: '768px' },
          type: 'tablet',
        },
      },
      defaultViewport: 'tablet960',
    },
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Tablet layout in **RTL** mode. Sidebar slides from the right.',
      },
    },
  },
  render: () => <DashboardShell rtl />,
};

/* ─────────────────────────────────────────────────────────────────────────────
   Story: Mobile — 375 px  (4 columns)
   Sidebar overlay · all cards full-width · charts 340 px tall
   ──────────────────────────────────────────────────────────────────────────── */

export const MobileLTR = {
  name: 'Mobile — LTR (375px · 4 cols)',
  parameters: {
    viewport: {
      viewports: {
        mobile375: {
          name: 'Mobile (375px)',
          styles: { width: '375px', height: '812px' },
          type: 'mobile',
        },
      },
      defaultViewport: 'mobile375',
    },
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Mobile layout at 375 px. Bootstrap **4-column** grid. ' +
          'Sidebar overlay (hamburger toggle). ' +
          'Content padding 16 px · col-gap 16 px. ' +
          'All cards span full 4 cols. Charts height 340 px.',
      },
    },
  },
  render: () => <DashboardShell />,
};

export const MobileRTL = {
  name: 'Mobile — RTL (375px · 4 cols)',
  parameters: {
    viewport: {
      viewports: {
        mobile375: {
          name: 'Mobile (375px)',
          styles: { width: '375px', height: '812px' },
          type: 'mobile',
        },
      },
      defaultViewport: 'mobile375',
    },
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Mobile layout in **RTL** mode.',
      },
    },
  },
  render: () => <DashboardShell rtl />,
};
