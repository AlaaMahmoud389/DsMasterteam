import { AreaChart } from './AreaChart';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4549-4404';

/* ── Figma-sourced design tokens / props ──────────────────────
   From node 4549:4404 (cardDetails=true, rtl=false):
     title        → 'Data Title'
     kpi.value    → '78,909.72'  (display-sm 30px/600)
     kpi.badge    → { icon:'↑', text:'4.5%', label:'from last week' }
     yAxisTitle   → 'Active users'  (rotated label)
     xAxisTitle   → 'Month'         (centered bottom label)
     Y-axis ticks → 0, 100, 200, …, 800  (9 levels)
     X-axis cats  → Jan…Sep  (9 months)
     series       → 6 items in legend; 2 prominent crossing curves in chart
     lineType     → 'smooth'  (Figma shows curved area fills)
   ────────────────────────────────────────────────────────────── */

const FIGMA_CATS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

/* Two crossing smooth curves — matches Figma screenshot proportions */
const FIGMA_SERIES = [
  { id: 1, label: 'Series 1', data: [620, 550, 430, 340, 360, 430, 510, 570, 600] },
  { id: 2, label: 'Series 2', data: [180, 290, 430, 560, 660, 700, 670, 610, 560] },
];

const AR_CATS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر'];

const SIX_SERIES = [
  { id: 1, label: 'Series 1', data: [580, 595, 575, 600, 615, 630, 640, 680, 720] },
  { id: 2, label: 'Series 2', data: [490, 500, 510, 520, 530, 545, 555, 570, 590] },
  { id: 3, label: 'Series 3', data: [390, 400, 415, 420, 450, 470, 480, 510, 555] },
  { id: 4, label: 'Series 4', data: [280, 295, 310, 320, 340, 360, 375, 400, 430] },
  { id: 5, label: 'Series 5', data: [180, 200, 215, 230, 250, 270, 285, 310, 340] },
  { id: 6, label: 'Series 6', data: [100, 120, 140, 160, 180, 205, 225, 260, 300] },
];

const STACKED_SERIES = [
  { id: 1, label: 'Type A', data: [150, 200, 180, 250, 210, 270, 300, 280, 320] },
  { id: 2, label: 'Type B', data: [90, 130, 110, 160, 140, 180, 210, 195, 225] },
  { id: 3, label: 'Type C', data: [50, 80, 60, 100, 80, 110, 130, 115, 145] },
];

const SINGLE_SERIES = [
  { id: 1, label: 'Active users', data: [180, 290, 430, 560, 660, 700, 670, 610, 560] },
];

const FIGMA_KPI = {
  value: '78,909.72',
  badge: { icon: '↑', text: '4.5%', label: 'from last week' },
};

export default {
  title: 'Components/Charts/Area Chart',
  component: AreaChart,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    title:          { control: 'text',    description: 'Card title' },
    subtitle:       { control: 'text',    description: 'Card subtitle' },
    lineType:       { control: 'select',  options: ['smooth', 'line', 'step'], description: 'Line interpolation style' },
    areaType:       { control: 'select',  options: ['multi', 'stacked'],       description: 'Area rendering mode' },
    showLegend:     { control: 'boolean', description: 'Show interactive series legend', table: { defaultValue: { summary: 'true' } } },
    showKpi:        { control: 'boolean', description: 'Show KPI block (Figma: cardDetails)', table: { defaultValue: { summary: 'true' } } },
    showYAxisLabel: { control: 'boolean', description: 'Show rotated Y-axis label', table: { defaultValue: { summary: 'true' } } },
    showXAxisLabel: { control: 'boolean', description: 'Show X-axis title below ticks', table: { defaultValue: { summary: 'true' } } },
    showContent:    { control: 'boolean', description: 'Show X-axis category labels', table: { defaultValue: { summary: 'true' } } },
    yAxisTitle:     { control: 'text',    description: 'Y-axis rotated label' },
    xAxisTitle:     { control: 'text',    description: 'X-axis centered label' },
    maxValue:       { control: 'number',  description: 'Override auto-computed Y-axis maximum' },
    loading:        { control: 'boolean', description: 'Skeleton loading state', table: { defaultValue: { summary: 'false' } } },
    empty:          { control: 'boolean', description: 'Empty state',            table: { defaultValue: { summary: 'false' } } },
    dir:            { control: 'select',  options: ['ltr', 'rtl'],              description: 'RTL variant from Figma' },
    series:         { control: false, description: 'Array of { id, label, data[] }. Up to 6 series.' },
    categories:     { control: false, description: 'X-axis category labels' },
    kpi:            { control: false, description: '{ value, badge: { icon, text, label } }' },
  },
  args: {
    title:          'Data Title',
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    kpi:            FIGMA_KPI,
    series:         FIGMA_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'smooth',
    areaType:       'multi',
    showLegend:     true,
    showKpi:        true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    loading:        false,
    empty:          false,
    dir:            'ltr',
  },
};

/* ── Playground ───────────────────────────────────── */

export const Playground = {};

/* ── Figma — exact replica (cardDetails=true) ─────── */

export const FigmaDefault = {
  name: 'Figma — Default (cardDetails=true, RTL=false)',
  args: {
    title:          'Data Title',
    kpi:            FIGMA_KPI,
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    series:         FIGMA_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'smooth',
    showLegend:     true,
    showKpi:        true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    dir:            'ltr',
  },
};

/* ── Figma RTL variant ────────────────────────────── */

export const FigmaRTL = {
  name: 'Figma — RTL',
  args: {
    title:          'عنوان البيانات',
    kpi:            { value: '78,909.72', badge: { icon: '↑', text: '4.5%', label: 'من الأسبوع الماضي' } },
    yAxisTitle:     'المستخدمون النشطون',
    xAxisTitle:     'الشهر',
    series: [
      { id: 1, label: 'السلسلة 1', data: [620, 550, 430, 340, 360, 430, 510, 570, 600] },
      { id: 2, label: 'السلسلة 2', data: [180, 290, 430, 560, 660, 700, 670, 610, 560] },
    ],
    categories:     AR_CATS,
    lineType:       'smooth',
    showLegend:     true,
    showKpi:        true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    dir:            'rtl',
  },
};

/* ── cardDetails=false (no KPI block) ─────────────── */

export const NoKPI = {
  name: 'Figma — cardDetails=false (no KPI)',
  args: {
    title:          'Data Title',
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    series:         FIGMA_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'smooth',
    showLegend:     true,
    showKpi:        false,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    dir:            'ltr',
  },
};

/* ── showContent=false (no X category labels) ─────── */

export const NoXCategories = {
  name: 'Figma — showContent=false',
  args: {
    title:          'Data Title',
    kpi:            FIGMA_KPI,
    series:         FIGMA_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'smooth',
    showLegend:     true,
    showKpi:        true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    false,
    dir:            'ltr',
  },
};

/* ── All axis labels off ──────────────────────────── */

export const NoAxisLabels = {
  name: 'Figma — All axis labels off',
  args: {
    title:          'Data Title',
    kpi:            FIGMA_KPI,
    series:         FIGMA_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'smooth',
    showLegend:     true,
    showKpi:        true,
    showYAxisLabel: false,
    showXAxisLabel: false,
    showContent:    false,
    dir:            'ltr',
  },
};

/* ── Six series (full palette) ────────────────────── */

export const SixSeries = {
  name: 'Six Series (Full Palette)',
  args: {
    title:          'Multi-Series Comparison',
    subtitle:       'All 6 Figma series tokens',
    kpi:            FIGMA_KPI,
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    series:         SIX_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'smooth',
    showLegend:     true,
    showKpi:        true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    dir:            'ltr',
  },
};

/* ── Single series ────────────────────────────────── */

export const SingleSeries = {
  name: 'Single Series',
  args: {
    title:          'Active Users',
    kpi:            FIGMA_KPI,
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    series:         SINGLE_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'smooth',
    showLegend:     false,
    showKpi:        true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    dir:            'ltr',
  },
};

/* ── Stacked area ─────────────────────────────────── */

export const StackedArea = {
  name: 'Stacked Area',
  args: {
    title:          'Stacked Breakdown',
    subtitle:       'Cumulative area chart',
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    series:         STACKED_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'smooth',
    areaType:       'stacked',
    showLegend:     true,
    showKpi:        false,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    dir:            'ltr',
  },
};

/* ── Straight lines ───────────────────────────────── */

export const StraightLine = {
  name: 'Straight Lines',
  args: {
    title:          'Data Title',
    kpi:            FIGMA_KPI,
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    series:         FIGMA_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'line',
    showLegend:     true,
    showKpi:        true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    dir:            'ltr',
  },
};

/* ── Step lines ───────────────────────────────────── */

export const StepLine = {
  name: 'Step Lines',
  args: {
    title:          'Data Title',
    kpi:            FIGMA_KPI,
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    series:         FIGMA_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'step',
    showLegend:     true,
    showKpi:        true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    dir:            'ltr',
  },
};

/* ── Loading state ────────────────────────────────── */

export const LoadingState = {
  name: 'Loading State',
  args: {
    title:      'Data Title',
    series:     [],
    categories: [],
    loading:    true,
  },
};

/* ── Empty state ──────────────────────────────────── */

export const EmptyState = {
  name: 'Empty State',
  args: {
    title:      'Data Title',
    series:     [],
    categories: FIGMA_CATS,
    empty:      true,
  },
};
