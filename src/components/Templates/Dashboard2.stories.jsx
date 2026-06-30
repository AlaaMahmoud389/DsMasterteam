/**
 * Dashboard 2 — Masterteam Design System
 *
 * Assembled entirely from existing, unmodified DS components:
 *   Sidebar (src/components/Sidebar) · NavHeader (UI Shells-NavHeader)
 *   AreaChart · DonutChart · MapChart · RiskMatrix · VerticalBarChart
 *   Table · Pagination
 *
 * Layout: full-width NavHeader on top · Sidebar (320px, in-flow) + main
 * content column below it. Content: page header, 2-up chart rows, a
 * full-width MapChart, a data Table, and Pagination underneath.
 *
 * No component source files were modified — this file only composes them.
 */

import { useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { NavHeader } from '../UI Shells-NavHeader/NavHeader';
import { AreaChart } from '../charts/AreaChart/AreaChart';
import { DonutChart } from '../charts/DonutChart/DonutChart';
import { MapChart } from '../charts/MapChart/MapChart';
import { RiskMatrix } from '../charts/RiskMatrix/RiskMatrix';
import { VerticalBarChart } from '../charts/VerticalBarChart/VerticalBarChart';
import { Table } from '../Table/Table';
import { Pagination } from '../Pagination/Pagination';
import { ARAB_PHOTOS } from '../Avatar/Avatar';

const FONT = "'IBM Plex Sans Arabic', system-ui, sans-serif";

/* ─────────────────────────────────────────────────────────────────────────────
   Sidebar — menu items (icons from the shared Icon registry)
   ──────────────────────────────────────────────────────────────────────────── */

const SIDEBAR_ITEMS_LTR = [
  { id: 'overview',  label: 'Overview',       leadIcon: 'grid',      state: 'selected' },
  { id: 'analytics', label: 'Analytics',      leadIcon: 'chart-bar' },
  { id: 'operations',label: 'Operations',     leadIcon: 'database' },
  { id: 'risk',      label: 'Risk',           leadIcon: 'alert' },
  { id: 'reports',   label: 'Reports',        leadIcon: 'list',      trailElement: 'text', trailText: '+12' },
  { id: 'notify',    label: 'Notifications',  leadIcon: 'bell' },
  { id: 'settings',  label: 'Settings',       leadIcon: 'setting' },
];

const SIDEBAR_ITEMS_RTL = [
  { id: 'overview',  label: 'نظرة عامة',     leadIcon: 'grid',      state: 'selected' },
  { id: 'analytics', label: 'التحليلات',      leadIcon: 'chart-bar' },
  { id: 'operations',label: 'العمليات',       leadIcon: 'database' },
  { id: 'risk',      label: 'المخاطر',        leadIcon: 'alert' },
  { id: 'reports',   label: 'التقارير',       leadIcon: 'list',      trailElement: 'text', trailText: '+12' },
  { id: 'notify',    label: 'الإشعارات',      leadIcon: 'bell' },
  { id: 'settings',  label: 'الإعدادات',      leadIcon: 'setting' },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Top navbar (NavHeader) — menu + actions
   ──────────────────────────────────────────────────────────────────────────── */

const NAV_MENU_ITEMS = [
  { label: 'Dashboard', labelAr: 'لوحة التحكم', selected: true },
  { label: 'Analytics', labelAr: 'التحليلات' },
  { label: 'Operations', labelAr: 'العمليات' },
  { label: 'Reports',   labelAr: 'التقارير' },
];

const NAV_ACTIONS = [
  { label: 'Notifications', labelAr: 'الإشعارات' },
  { label: 'Settings',      labelAr: 'الإعدادات' },
  { label: 'Profile',       labelAr: 'الملف الشخصي', selected: true },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Chart data
   ──────────────────────────────────────────────────────────────────────────── */

const AREA_CATEGORIES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
const AREA_SERIES = [
  { id: 1, label: 'Shipments', data: [420, 380, 460, 510, 470, 540, 600, 580, 640] },
  { id: 2, label: 'Returns',   data: [60, 75, 50, 65, 80, 55, 70, 62, 58] },
];
const AREA_KPI = {
  value: '4,815',
  badge: { icon: '↑', text: '6.2%', label: 'vs last month' },
};

const DONUT_SEGMENTS = [
  { id: 1, label: 'Express',  value: 38 },
  { id: 2, label: 'Standard', value: 32 },
  { id: 3, label: 'Freight',  value: 20 },
  { id: 4, label: 'Same-day', value: 10 },
];
const DONUT_PCT_ROWS = [
  { label: 'Express',  percentage: 38 },
  { label: 'Standard', percentage: 32 },
  { label: 'Freight',  percentage: 20 },
  { label: 'Same-day', percentage: 10 },
];
const DONUT_KPI = {
  value: '12,940',
  badge: { icon: '↑', text: '3.1%', label: 'from last week' },
  link:  { text: 'More Details', href: '#' },
};

const BAR_CATEGORIES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const BAR_SERIES = [
  { id: 1, label: 'Riyadh',  data: [140, 110, 150, 130, 90,  100, 95] },
  { id: 2, label: 'Makkah',  data: [120, 95,  130, 115, 80,  85,  90] },
  { id: 3, label: 'Eastern', data: [70,  60,  85,  75,  55,  60,  58] },
  { id: 4, label: 'Target',  type: 'line', data: [360, 300, 400, 350, 260, 280, 270] },
];

const RISK_ITEMS = [
  { id: 'R1', label: 'Late Delivery',    likelihood: 4, impact: 3, description: 'Carrier delays during peak season.' },
  { id: 'R2', label: 'Supplier Delay',   likelihood: 3, impact: 4, description: 'Key supplier missing lead times.' },
  { id: 'R3', label: 'Customs Hold',     likelihood: 2, impact: 5, description: 'Cross-border documentation issues.' },
  { id: 'R4', label: 'Warehouse Cap.',   likelihood: 3, impact: 2, description: 'Storage nearing full capacity.' },
  { id: 'R5', label: 'Demand Spike',     likelihood: 4, impact: 4, description: 'Unplanned surge in order volume.' },
  { id: 'R6', label: 'Quality Defect',   likelihood: 1, impact: 4, description: 'Batch defect reported by customer.' },
];

const MAP_DATA = [
  { id: 'riyadh',           value: 8420 },
  { id: 'makkah',           value: 8560 },
  { id: 'madinah',          value: 2100 },
  { id: 'eastern',          value: 4910 },
  { id: 'asir',             value: 2210 },
  { id: 'tabuk',            value: 910  },
  { id: 'hail',             value: 720  },
  { id: 'northern-borders', value: 380  },
  { id: 'jizan',            value: 1560 },
  { id: 'najran',           value: 620  },
  { id: 'bahah',            value: 480  },
  { id: 'jawf',             value: 560  },
  { id: 'qassim',           value: 1420 },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Table — cell renderers (matching the exact Figma tokens already used in
   Table.stories.jsx: action link, category chip, status tag, icon buttons)
   ──────────────────────────────────────────────────────────────────────────── */

const ActionLink = ({ label = 'View' }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    height: 40, padding: '0 12px', borderRadius: 4,
    color: 'var(--button-transparent-icon-default, #175cd3)',
    fontSize: 16, fontWeight: 500, fontFamily: FONT, whiteSpace: 'nowrap',
  }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#175cd3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    {label}
  </span>
);

const CategoryChip = ({ label = 'Item' }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    height: 32, padding: '0 12px', borderRadius: 9999,
    background: 'rgba(24,73,169,0.1)',
    color: 'var(--chips-primary-label-default, #1849a9)',
    fontSize: 16, fontWeight: 500, fontFamily: FONT, whiteSpace: 'nowrap',
  }}>
    {label}
  </span>
);

const StatusTag = ({ label = 'Status', color }) => {
  const bg   = color === 'success' ? '#ecfdf5' : color === 'warning' ? '#fff7ed' : color === 'error' ? '#fef2f2' : '#f3f4f6';
  const dot  = color === 'success' ? '#059669' : color === 'warning' ? '#c2410c' : color === 'error' ? '#dc2626' : '#6b7280';
  const text = color === 'success' ? '#059669' : color === 'warning' ? '#c2410c' : color === 'error' ? '#dc2626' : '#000b36';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      height: 24, padding: '0 8px', borderRadius: 9999,
      background: bg, whiteSpace: 'nowrap', fontFamily: FONT,
    }}>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: dot, flexShrink: 0 }} />
      <span style={{ fontSize: 14, fontWeight: 500, color: text }}>{label}</span>
    </span>
  );
};

const IconBtn = ({ title = '', icon = 'edit' }) => (
  <button title={title} style={{
    width: 32, height: 32, borderRadius: 4, border: 'none',
    background: 'transparent', cursor: 'pointer', padding: 0,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    color: '#6b7280',
  }}>
    {icon === 'edit' ? (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M10.5 3.5L14.5 7.5M2 16L6.5 15L15.5 6A2.121 2.121 0 1 0 12.5 3L3.5 12L2 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M3 4.5H15M7.5 8V13M10.5 8V13M4.5 4.5L5.25 14.25A1.5 1.5 0 0 0 6.75 15.75H11.25A1.5 1.5 0 0 0 12.75 14.25L13.5 4.5M7.5 4.5V3.75A.75.75 0 0 1 8.25 3H9.75A.75.75 0 0 1 10.5 3.75V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )}
  </button>
);

const TABLE_COLUMNS = [
  { key: 'action', label: 'Action', minWidth: 100, render: () => <ActionLink label="View" /> },
  { key: 'id',         label: 'Shipment ID', sortable: true, minWidth: 120 },
  { key: 'customer',   label: 'Customer',    sortable: true, minWidth: 150 },
  { key: 'region',     label: 'Region',      sortable: true, minWidth: 120 },
  { key: 'category',   label: 'Category',    minWidth: 120, render: (val) => <CategoryChip label={val} /> },
  { key: 'status',     label: 'Status',      minWidth: 120, render: (_v, row) => <StatusTag label={row.status} color={row.statusColor} /> },
  { key: 'date',       label: 'Date',        sortable: true, minWidth: 110 },
  {
    key: '_actions', label: '', type: 'actions',
    render: (_v, row) => (
      <span style={{ display: 'inline-flex', gap: 4 }}>
        <IconBtn title={`Edit ${row.id}`}   icon="edit" />
        <IconBtn title={`Delete ${row.id}`} icon="delete" />
      </span>
    ),
  },
];

const TABLE_ROWS = [
  { id: 'SH-1042', customer: 'Sarah Al-Qassem', region: 'Riyadh',  category: 'Express',  status: 'Delivered',  statusColor: 'success', date: '2026-06-18' },
  { id: 'SH-1041', customer: 'Khalid Mansour',  region: 'Makkah',  category: 'Standard', status: 'In Transit', statusColor: 'warning', date: '2026-06-18' },
  { id: 'SH-1040', customer: 'Leila Hadid',     region: 'Eastern', category: 'Freight',  status: 'Delayed',    statusColor: 'error',   date: '2026-06-17' },
  { id: 'SH-1039', customer: 'Omar Al-Farsi',   region: 'Madinah', category: 'Express',  status: 'Delivered',  statusColor: 'success', date: '2026-06-17' },
  { id: 'SH-1038', customer: 'Nour Abdallah',   region: 'Asir',    category: 'Same-day', status: 'In Transit', statusColor: 'warning', date: '2026-06-16' },
  { id: 'SH-1037', customer: 'Tariq Salim',     region: 'Riyadh',  category: 'Standard', status: 'Delivered',  statusColor: 'success', date: '2026-06-16' },
  { id: 'SH-1036', customer: 'Rana Khoury',     region: 'Jizan',   category: 'Freight',  status: 'Delivered',  statusColor: 'success', date: '2026-06-15' },
  { id: 'SH-1035', customer: 'Yusuf Hammad',    region: 'Qassim',  category: 'Express',  status: 'Cancelled',  statusColor: 'error',   date: '2026-06-15' },
  { id: 'SH-1034', customer: 'Dana Karam',      region: 'Makkah',  category: 'Standard', status: 'Delivered',  statusColor: 'success', date: '2026-06-14' },
];

const TABLE_COLUMNS_AR = [
  { key: 'action', label: 'الإجراء', minWidth: 100, render: () => <ActionLink label="عرض" /> },
  { key: 'id',         label: 'رقم الشحنة',  sortable: true, minWidth: 130 },
  { key: 'customer',   label: 'العميل',       sortable: true, minWidth: 150 },
  { key: 'region',     label: 'المنطقة',      sortable: true, minWidth: 120 },
  { key: 'category',   label: 'التصنيف',      minWidth: 120, render: (val) => <CategoryChip label={val} /> },
  { key: 'status',     label: 'الحالة',       minWidth: 120, render: (_v, row) => <StatusTag label={row.status} color={row.statusColor} /> },
  { key: 'date',       label: 'التاريخ',      sortable: true, minWidth: 110 },
  {
    key: '_actions', label: '', type: 'actions',
    render: (_v, row) => (
      <span style={{ display: 'inline-flex', gap: 4 }}>
        <IconBtn title={`تعديل ${row.id}`}  icon="edit" />
        <IconBtn title={`حذف ${row.id}`}    icon="delete" />
      </span>
    ),
  },
];

const TABLE_ROWS_AR = [
  { id: 'SH-1042', customer: 'سارة القاسم',   region: 'الرياض',        category: 'سريع',     status: 'تم التسليم', statusColor: 'success', date: '2026-06-18' },
  { id: 'SH-1041', customer: 'خالد منصور',     region: 'مكة المكرمة',   category: 'عادي',     status: 'في الطريق',  statusColor: 'warning', date: '2026-06-18' },
  { id: 'SH-1040', customer: 'ليلى حديد',      region: 'الشرقية',       category: 'شحن',      status: 'متأخر',      statusColor: 'error',   date: '2026-06-17' },
  { id: 'SH-1039', customer: 'عمر الفارسي',    region: 'المدينة المنورة', category: 'سريع',  status: 'تم التسليم', statusColor: 'success', date: '2026-06-17' },
  { id: 'SH-1038', customer: 'نور عبدالله',    region: 'عسير',          category: 'نفس اليوم', status: 'في الطريق', statusColor: 'warning', date: '2026-06-16' },
  { id: 'SH-1037', customer: 'طارق سليم',      region: 'الرياض',        category: 'عادي',     status: 'تم التسليم', statusColor: 'success', date: '2026-06-16' },
  { id: 'SH-1036', customer: 'رنا خوري',       region: 'جازان',         category: 'شحن',      status: 'تم التسليم', statusColor: 'success', date: '2026-06-15' },
  { id: 'SH-1035', customer: 'يوسف حماد',      region: 'القصيم',        category: 'سريع',     status: 'ملغى',       statusColor: 'error',   date: '2026-06-15' },
  { id: 'SH-1034', customer: 'دانا كرم',       region: 'مكة المكرمة',   category: 'عادي',     status: 'تم التسليم', statusColor: 'success', date: '2026-06-14' },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Layout CSS
   ──────────────────────────────────────────────────────────────────────────── */

const D2_CSS = `
  .d2-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #f9fafb;
    font-family: ${FONT};
  }
  .d2-body { display: flex; flex: 1; min-width: 0; }
  .d2-main { flex: 1; display: flex; flex-direction: column; min-width: 0; overflow-x: hidden; }
  .d2-content {
    flex: 1;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    box-sizing: border-box;
    min-width: 0;
  }
  .d2-header { display: flex; flex-direction: column; gap: 4px; }
  .d2-title { font-size: 24px; font-weight: 600; line-height: 32px; color: #000b36; margin: 0; }
  .d2-subtitle { font-size: 14px; font-weight: 400; line-height: 20px; color: #3c5073; margin: 0; }
  .d2-chart-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
    width: 100%;
    min-width: 0;
  }
  .d2-chart-card { min-width: 0; }
  .d2-card {
    background: var(--chart-container-bg, #ffffff);
    border: 1px solid var(--chart-border, #f3f4f6);
    border-radius: var(--chart-container-radius, 8px);
    padding: var(--chart-container-padding, 24px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .d2-card-title { font-size: 18px; font-weight: 600; line-height: 28px; color: #000b36; margin: 0; }
  .d2-card-subtitle { font-size: 14px; font-weight: 400; line-height: 20px; color: #3c5073; margin: 0; }
  .d2-foot-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }
  .d2-foot-text { font-size: 14px; color: #3c5073; }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Dashboard shell
   ──────────────────────────────────────────────────────────────────────────── */

const Dashboard2Shell = ({ rtl = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  const sidebarItems = rtl ? SIDEBAR_ITEMS_RTL : SIDEBAR_ITEMS_LTR;
  const tableColumns = rtl ? TABLE_COLUMNS_AR : TABLE_COLUMNS;
  const tableRows    = rtl ? TABLE_ROWS_AR    : TABLE_ROWS;
  const dir          = rtl ? 'rtl' : 'ltr';

  return (
    <>
      <style>{D2_CSS}</style>
      <div className="d2-shell" dir={dir}>
        {/* ── Top navbar ── */}
        <NavHeader
          rtl={rtl}
          fullWidth
          breakpoint=">960"
          menuItems={NAV_MENU_ITEMS}
          actions={NAV_ACTIONS}
        />

        <div className="d2-body" style={{ flexDirection: rtl ? 'row-reverse' : 'row' }}>
          {/* ── Sidebar ── */}
          <Sidebar
            variant={rtl ? 'rtl' : 'ltr'}
            menuItems={sidebarItems}
            featuredTitle={rtl ? 'البدء' : 'Getting Started'}
            featuredSubtext={rtl
              ? 'شاهد هذا الفيديو القصير لتتعلم أساسيات لوحة التحكم.'
              : 'Watch this short intro to learn the basics of the dashboard.'}
            featuredButtonLabel={rtl ? 'ابدأ' : 'Get Started'}
            userName={rtl ? 'نورة أحمد' : 'Nora Ahmed'}
            userEmail="nora.ahmed@email.com"
            userAvatarSrc={ARAB_PHOTOS[0]}
          />

          {/* ── Main column ── */}
          <div className="d2-main">
            <div className="d2-content">

              {/* Page header */}
              <div className="d2-header">
                <h1 className="d2-title">{rtl ? 'نظرة عامة على العمليات' : 'Operations Overview'}</h1>
                <p className="d2-subtitle">
                  {rtl
                    ? 'تابع الأداء والمخاطر والنشاط الإقليمي في الوقت الفعلي.'
                    : 'Track performance, risk, and regional activity in real time.'}
                </p>
              </div>

              {/* Chart row 1 — AreaChart + DonutChart */}
              <div className="d2-chart-row">
                <div className="d2-chart-card">
                  <AreaChart
                    title={rtl ? 'اتجاه الشحنات' : 'Shipment Trend'}
                    series={AREA_SERIES}
                    categories={AREA_CATEGORIES}
                    kpi={AREA_KPI}
                    showKpi
                    showLegend
                    lineType="smooth"
                    areaType="multi"
                    yAxisTitle={rtl ? 'الشحنات' : 'Shipments'}
                    xAxisTitle={rtl ? 'الشهر' : 'Month'}
                    showYAxisLabel
                    showXAxisLabel
                    showContent
                    dir={dir}
                  />
                </div>
                <div className="d2-chart-card">
                  <DonutChart
                    title={rtl ? 'مزيج الشحن' : 'Shipping Mix'}
                    type="half"
                    orientation="landscape"
                    tableType="percentage"
                    showTable
                    showTableTitle
                    tableTitleText={rtl ? 'حسب النوع' : 'By Type'}
                    showHeader
                    showKpi
                    centerValue={rtl ? '١٢٬٩٤٠' : '12,940'}
                    centerLabel={rtl ? 'إجمالي الشحنات' : 'Total Shipments'}
                    segments={DONUT_SEGMENTS}
                    percentageRows={DONUT_PCT_ROWS}
                    kpi={DONUT_KPI}
                    dir={dir}
                  />
                </div>
              </div>

              {/* Chart row 2 — VerticalBarChart + RiskMatrix */}
              <div className="d2-chart-row">
                <div className="d2-chart-card">
                  <VerticalBarChart
                    title={rtl ? 'الإنتاجية الشهرية حسب المنطقة' : 'Monthly Throughput by Region'}
                    categories={BAR_CATEGORIES}
                    series={BAR_SERIES}
                    barType="stacked-combo"
                    showKpi={false}
                    showLegend
                    yAxisTitle={rtl ? 'الوحدات' : 'Units'}
                    xAxisTitle={rtl ? 'الشهر' : 'Month'}
                    dir={dir}
                  />
                </div>
                <div className="d2-chart-card">
                  <RiskMatrix
                    title={rtl ? 'تقييم المخاطر التشغيلية' : 'Operational Risk Assessment'}
                    subtitle={rtl ? 'الاحتمالية × التأثير' : 'Likelihood × Impact'}
                    items={RISK_ITEMS}
                    yAxisLabel={rtl ? 'الاحتمالية' : 'Probability'}
                    xAxisLabel={rtl ? 'التأثير' : 'Impact'}
                    showLegend
                    showCellValues
                    dir={dir}
                  />
                </div>
              </div>

              {/* MapChart — full width */}
              <MapChart
                title={rtl ? 'حجم الشحنات حسب المنطقة — السعودية' : 'Shipment Volume by Region — Saudi Arabia'}
                data={MAP_DATA}
                variant="choropleth"
                showColorScale
                dir={dir}
              />

              {/* Table card */}
              <div className="d2-card">
                <div className="d2-header">
                  <p className="d2-card-title">{rtl ? 'أحدث الشحنات' : 'Recent Shipments'}</p>
                  <p className="d2-card-subtitle">
                    {rtl ? 'آخر الشحنات المسجلة عبر جميع المناطق.' : 'Latest shipments recorded across all regions.'}
                  </p>
                </div>

                <Table
                  columns={tableColumns}
                  data={tableRows}
                  alternatingRows
                  rtl={rtl}
                  emptyText={rtl ? 'لا توجد بيانات متاحة' : 'No data available'}
                />

                <div className="d2-foot-row" style={{ flexDirection: rtl ? 'row-reverse' : 'row' }}>
                  <span className="d2-foot-text">
                    {rtl
                      ? `عرض ١–${tableRows.length} من ١٠٤ نتيجة`
                      : `Showing 1–${tableRows.length} of 104 entries`}
                  </span>
                  <Pagination
                    size="Medium"
                    rtl={rtl}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>

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
  title: 'Templates/Dashboard2',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A second full-page dashboard template assembled purely from existing, ' +
          'unmodified DS components: **Sidebar** + **NavHeader** (top navbar) for ' +
          'navigation, **AreaChart**, **DonutChart**, **VerticalBarChart**, **RiskMatrix** ' +
          'and **MapChart** for data visualization, and **Table** + **Pagination** for ' +
          'tabular data. Every interactive state (chart legends, tooltips, table sorting, ' +
          'pagination jump-menu, sidebar collapse/search/featured-card dismiss, nav hover/' +
          'focus states) comes from the components themselves — nothing was re-implemented.',
      },
    },
  },
};

export const Desktop = {
  name: 'Desktop — LTR (1440px)',
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
  },
  render: () => <Dashboard2Shell />,
};

export const DesktopRTL = {
  name: 'Desktop — RTL (1440px)',
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
        story: 'RTL layout — Sidebar on the right, NavHeader mirrored, Arabic labels throughout.',
      },
    },
  },
  render: () => <Dashboard2Shell rtl />,
};
