import { HeatmapChart } from './HeatmapChart';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4600-5922';

/* ── Figma-sourced design tokens / props ──────────────────────
   From node 4600:5922 (cardDetails="true", rtl="false" variant):
     yAxisTitle  → 'Active users'   (Figma: rotated left label)
     xAxisTitle  → 'Month'          (Figma: centered bottom label)
     yTicks      → ['500','400','300','200','100','0']
     scaleMax    → 40               (Figma: color scale 0–40)
     rows        → 7 (Mon–Sun)
     cols        → 9 months (Jan–Sep)
     kpi value   → '78,909.72'
     kpi badge   → ↑ 4.5%  "from last week"
   ──────────────────────────────────────────────────────────── */

const ROW_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const COL_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

/* 7×9 data matrix — values in 0–40 range (Figma scale) */
const FIGMA_DATA = [
  [5,  12, 18, 22, 30, 35, 28, 20, 15],
  [8,  20, 32, 38, 40, 36, 29, 22, 18],
  [10, 25, 35, 40, 38, 34, 26, 20, 16],
  [7,  18, 28, 36, 40, 37, 30, 24, 19],
  [4,  10, 20, 28, 32, 35, 27, 18, 12],
  [2,   5, 10, 15, 18, 22, 16, 10,  6],
  [1,   3,  6, 10, 12, 15, 10,  6,  3],
];

const DEFAULT_KPI = {
  value: '78,909.72',
  badge: { icon: '↑', text: '4.5%', label: 'from last week' },
};

/* Arabic labels for RTL variant */
const ROW_LABELS_AR = ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'];
const COL_LABELS_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر'];

/* Larger grid (7×12) for LargeGrid story */
const MONTHS_12 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const LARGE_DATA = [
  [5, 12, 18, 22, 30, 35, 28, 20, 15, 10,  6, 3],
  [8, 20, 32, 38, 40, 36, 29, 22, 18, 13,  8, 4],
  [10, 25, 35, 40, 38, 34, 26, 20, 16, 11,  7, 3],
  [7, 18, 28, 36, 40, 37, 30, 24, 19, 14,  9, 5],
  [4, 10, 20, 28, 32, 35, 27, 18, 12,  8,  5, 2],
  [2,  5, 10, 15, 18, 22, 16, 10,  6,  4,  2, 1],
  [1,  3,  6, 10, 12, 15, 10,  6,  3,  2,  1, 0],
];

export default {
  title: 'Components/Charts/Heatmap Chart',
  component: HeatmapChart,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    title:          { control: 'text',    description: 'Card title' },
    subtitle:       { control: 'text',    description: 'Card subtitle' },
    yAxisTitle:     { control: 'text',    description: 'Y-axis rotated label (Figma: "Active users")' },
    xAxisTitle:     { control: 'text',    description: 'X-axis centered label (Figma: "Month")' },
    scaleMin:       { control: 'number',  description: 'Color scale minimum (Figma: 0)' },
    scaleMax:       { control: 'number',  description: 'Color scale maximum (Figma: 40)' },
    showColorScale: { control: 'boolean', description: 'Show 7-band color scale bar at bottom', table: { defaultValue: { summary: 'true' } } },
    showKpi:        { control: 'boolean', description: 'Show KPI header block (Figma: cardDetails)', table: { defaultValue: { summary: 'false' } } },
    dir:            { control: 'select',  options: ['ltr', 'rtl'], description: 'RTL variant from Figma' },
    data:           { control: false, description: '2D array of numeric values (rows × cols)' },
    rowLabels:      { control: false, description: 'Row labels (Y axis, e.g. Mon–Sun)' },
    colLabels:      { control: false, description: 'Column labels (X axis, e.g. Jan–Sep)' },
    yTicks:         { control: false, description: 'Y-axis gridline tick labels (top to bottom)' },
    kpi:            { control: false, description: 'KPI block: { value, badge: { icon, text, label } }' },
  },
  args: {
    title:          'Active Users Heatmap',
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    yTicks:         ['500', '400', '300', '200', '100', '0'],
    scaleMin:       0,
    scaleMax:       40,
    showColorScale: true,
    showKpi:        true,
    kpi:            DEFAULT_KPI,
    rowLabels:      ROW_LABELS,
    colLabels:      COL_LABELS,
    data:           FIGMA_DATA,
    dir:            'ltr',
  },
};

/* ── Playground ───────────────────────────────── */

export const Playground = {};

/* ── Figma-sourced: exact replica of node 4600:5922 ── */

export const FigmaDefault = {
  name: 'Figma — Default (cardDetails=true, RTL=false)',
  args: {
    title:          'Active Users',
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    yTicks:         ['500', '400', '300', '200', '100', '0'],
    scaleMin:       0,
    scaleMax:       40,
    showColorScale: true,
    showKpi:        true,
    kpi:            DEFAULT_KPI,
    rowLabels:      ROW_LABELS,
    colLabels:      COL_LABELS,
    data:           FIGMA_DATA,
    dir:            'ltr',
  },
};

/* ── Figma RTL variant ─────────────────────────── */

export const FigmaRTL = {
  name: 'Figma — RTL',
  args: {
    title:          'نشاط المستخدمين',
    yAxisTitle:     'المستخدمون النشطون',
    xAxisTitle:     'الشهر',
    yTicks:         ['500', '400', '300', '200', '100', '0'],
    scaleMin:       0,
    scaleMax:       40,
    showColorScale: true,
    showKpi:        true,
    kpi:            { value: '78,909.72', badge: { icon: '↑', text: '4.5%', label: 'من الأسبوع الماضي' } },
    rowLabels:      ROW_LABELS_AR,
    colLabels:      COL_LABELS_AR,
    data:           FIGMA_DATA,
    dir:            'rtl',
  },
};

/* ── No KPI block (cardDetails=false) ─────────── */

export const NoKPI = {
  name: 'No KPI Block',
  args: {
    title:          'Weekly Activity',
    subtitle:       'Jan – Sep 2025',
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    yTicks:         ['500', '400', '300', '200', '100', '0'],
    scaleMin:       0,
    scaleMax:       40,
    showColorScale: true,
    showKpi:        false,
    rowLabels:      ROW_LABELS,
    colLabels:      COL_LABELS,
    data:           FIGMA_DATA,
    dir:            'ltr',
  },
};

/* ── Color scale bar only, no KPI ─────────────── */

export const ColorScaleOnly = {
  name: 'Color Scale — No KPI',
  args: {
    title:          'Activity Distribution',
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    yTicks:         ['500', '400', '300', '200', '100', '0'],
    scaleMin:       0,
    scaleMax:       40,
    showColorScale: true,
    showKpi:        false,
    rowLabels:      ROW_LABELS,
    colLabels:      COL_LABELS,
    data:           FIGMA_DATA,
    dir:            'ltr',
  },
};

/* ── No color scale ───────────────────────────── */

export const NoColorScale = {
  name: 'No Color Scale Bar',
  args: {
    title:          'Active Users Heatmap',
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    yTicks:         ['500', '400', '300', '200', '100', '0'],
    scaleMin:       0,
    scaleMax:       40,
    showColorScale: false,
    showKpi:        true,
    kpi:            DEFAULT_KPI,
    rowLabels:      ROW_LABELS,
    colLabels:      COL_LABELS,
    data:           FIGMA_DATA,
    dir:            'ltr',
  },
};

/* ── Full 12-month grid ────────────────────────── */

export const LargeGrid = {
  name: 'Full Year (7×12)',
  args: {
    title:          'Annual Activity — 2025',
    subtitle:       'Full year: January – December',
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    yTicks:         ['500', '400', '300', '200', '100', '0'],
    scaleMin:       0,
    scaleMax:       40,
    showColorScale: true,
    showKpi:        true,
    kpi:            { value: '1,024,512', badge: { icon: '↑', text: '12.3%', label: 'vs last year' } },
    rowLabels:      ROW_LABELS,
    colLabels:      MONTHS_12,
    data:           LARGE_DATA,
    dir:            'ltr',
  },
};
