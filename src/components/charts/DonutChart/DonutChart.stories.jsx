import { DonutChart } from './DonutChart';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4401-26156';

/* ── Segment fixtures ─────────────────────────────── */

const SAMPLE_SEGMENTS = [
  { id: 1, label: 'Series 1', value: 30 },
  { id: 2, label: 'Series 2', value: 25 },
  { id: 3, label: 'Series 3', value: 20 },
  { id: 4, label: 'Series 4', value: 15 },
  { id: 5, label: 'Series 5', value: 7 },
  { id: 6, label: 'Series 6', value: 3 },
];

const SAMPLE_SEGMENTS_4 = [
  { id: 1, label: 'Category A', value: 40 },
  { id: 2, label: 'Category B', value: 30 },
  { id: 3, label: 'Category C', value: 20 },
  { id: 4, label: 'Category D', value: 10 },
];

const RTL_SEGMENTS = [
  { id: 1, label: 'الفئة الأولى', value: 35 },
  { id: 2, label: 'الفئة الثانية', value: 28 },
  { id: 3, label: 'الفئة الثالثة', value: 22 },
  { id: 4, label: 'الفئة الرابعة', value: 15 },
];

/* ── KPI / widget fixtures ────────────────────────── */

const KPI_DEFAULT = {
  value: '78,909.72',
  badge: { icon: '↑', text: '4.5%', label: 'from last week' },
  link:  { text: 'More Details', href: '#' },
};

const RTL_KPI = {
  value: '٧٨٬٩٠٩٫٧٢',
  badge: { icon: '↑', text: '٤٫٥٪', label: 'من الأسبوع الماضي' },
  link:  { text: 'مزيد من التفاصيل', href: '#' },
};

const PROGRESS_ROWS = [
  { label: 'Label', percentage: 20 },
  { label: 'Label', percentage: 40 },
  { label: 'Label', percentage: 60 },
  { label: 'Label', percentage: 15 },
];

const RTL_PROGRESS_ROWS = [
  { label: 'التصنيف', percentage: 20 },
  { label: 'التصنيف', percentage: 40 },
  { label: 'التصنيف', percentage: 60 },
  { label: 'التصنيف', percentage: 15 },
];

/* ── Story default export ─────────────────────────── */

export default {
  title: 'Components/Charts/Donut Chart',
  component: DonutChart,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title and SVG accessible name',
    },
    type: {
      control: { type: 'select' },
      options: ['donut', 'pie', 'half'],
      description: 'Chart geometry type',
    },
    showLegend: {
      control: 'boolean',
      description: 'Show segment legend below chart',
    },
    centerValue: {
      control: 'text',
      description: 'Text displayed in donut centre (donut/half only)',
    },
    centerLabel: {
      control: 'text',
      description: 'Small label below centre value',
    },
    dir: {
      control: { type: 'radio' },
      options: ['ltr', 'rtl'],
      description: 'Text and layout direction',
    },
    loading: {
      control: 'boolean',
      description: 'Show skeleton loading state',
    },
    empty: {
      control: 'boolean',
      description: 'Show empty state (no data)',
    },
    maxValue: {
      control: 'number',
      description: 'Override total for percentage calculation',
    },
    /* Figma: PieChartWidgetTable props */
    showHeader: {
      control: 'boolean',
      description: 'Figma: show/hide entire header (title + KPI + link)',
      table: { defaultValue: { summary: 'true' } },
    },
    showKpi: {
      control: 'boolean',
      description: 'Figma: show/hide KPI value block inside header',
      table: { defaultValue: { summary: 'true' } },
    },
    showTable: {
      control: 'boolean',
      description: 'Figma: tables — show/hide the Progress Table section',
      table: { defaultValue: { summary: 'false' } },
    },
    tableTitleText: {
      control: 'text',
      description: 'Figma: heading text of the Progress Table section',
    },
    showTableTitle: {
      control: 'boolean',
      description: 'Figma: tableTitle — show/hide table heading row',
      table: { defaultValue: { summary: 'true' } },
    },
    kpi:          { control: false },
    progressRows: { control: false },
    segments:     { control: false },
  },
};

/* ── Stories ──────────────────────────────────────── */

export const Playground = {
  args: {
    title: 'Category Distribution',
    segments: SAMPLE_SEGMENTS,
    centerValue: '99,999',
    centerLabel: 'Data Title',
    showLegend: true,
    type: 'donut',
    dir: 'ltr',
    loading: false,
    empty: false,
    showHeader: true,
    showKpi: false,
    showTable: false,
    tableTitleText: 'Table Title',
    showTableTitle: true,
  },
};

export const Donut = {
  name: 'Donut',
  args: {
    title: 'Category Distribution',
    segments: SAMPLE_SEGMENTS,
    centerValue: '99,999',
    centerLabel: 'Data Title',
    showLegend: true,
    type: 'donut',
    dir: 'ltr',
  },
};

export const WithLegend = {
  name: 'With Legend',
  args: {
    title: 'Category Distribution',
    segments: SAMPLE_SEGMENTS,
    centerValue: '99,999',
    centerLabel: 'Total',
    showLegend: true,
    type: 'donut',
    dir: 'ltr',
  },
};

export const WithoutLegend = {
  name: 'Without Legend',
  args: {
    title: 'Category Distribution',
    segments: SAMPLE_SEGMENTS_4,
    centerValue: '100',
    centerLabel: 'Data Title',
    showLegend: false,
    type: 'donut',
    dir: 'ltr',
  },
};

/* ── Figma widget variants ────────────────────────── */

export const WithKpiHeader = {
  name: 'With KPI Header',
  args: {
    title: 'Data Title',
    segments: SAMPLE_SEGMENTS_4,
    centerValue: '99,999',
    centerLabel: 'Data Title',
    showLegend: false,
    type: 'donut',
    dir: 'ltr',
    showHeader: true,
    kpi: KPI_DEFAULT,
    showKpi: true,
    showTable: false,
  },
};

export const WithProgressTable = {
  name: 'With Progress Table',
  args: {
    title: 'Data Title',
    segments: SAMPLE_SEGMENTS_4,
    centerValue: '99,999',
    centerLabel: 'Data Title',
    showLegend: false,
    type: 'donut',
    dir: 'ltr',
    showHeader: true,
    kpi: KPI_DEFAULT,
    showKpi: true,
    showTable: true,
    tableTitleText: 'Table Title',
    showTableTitle: true,
    progressRows: PROGRESS_ROWS,
  },
};

export const NoTableTitle = {
  name: 'Progress Table — No Title',
  args: {
    title: 'Data Title',
    segments: SAMPLE_SEGMENTS_4,
    centerValue: '99,999',
    centerLabel: 'Data Title',
    showLegend: false,
    type: 'donut',
    dir: 'ltr',
    showHeader: true,
    kpi: KPI_DEFAULT,
    showKpi: true,
    showTable: true,
    showTableTitle: false,
    progressRows: PROGRESS_ROWS,
  },
};

export const NoHeader = {
  name: 'No Header',
  args: {
    title: 'Data Title',
    segments: SAMPLE_SEGMENTS_4,
    centerValue: '99,999',
    centerLabel: 'Data Title',
    showLegend: false,
    type: 'donut',
    dir: 'ltr',
    showHeader: false,
    showTable: true,
    tableTitleText: 'Table Title',
    showTableTitle: true,
    progressRows: PROGRESS_ROWS,
  },
};

export const FullWidget = {
  name: 'Full Widget (Figma: Progress Table)',
  args: {
    title: 'Data Title',
    segments: SAMPLE_SEGMENTS_4,
    centerValue: '99,999',
    centerLabel: 'Data Title',
    showLegend: false,
    type: 'donut',
    dir: 'ltr',
    showHeader: true,
    kpi: KPI_DEFAULT,
    showKpi: true,
    showTable: true,
    tableTitleText: 'Table Title',
    showTableTitle: true,
    progressRows: PROGRESS_ROWS,
  },
};

export const RTLArabic = {
  name: 'RTL Arabic',
  args: {
    title: 'توزيع الفئات',
    segments: RTL_SEGMENTS,
    centerValue: '٩٩٬٩٩٩',
    centerLabel: 'المجموع',
    showLegend: true,
    type: 'donut',
    dir: 'rtl',
  },
};

export const RTLFullWidget = {
  name: 'RTL Full Widget',
  args: {
    title: 'عنوان البيانات',
    segments: RTL_SEGMENTS,
    centerValue: '٩٩٬٩٩٩',
    centerLabel: 'عنوان البيانات',
    showLegend: false,
    type: 'donut',
    dir: 'rtl',
    showHeader: true,
    kpi: RTL_KPI,
    showKpi: true,
    showTable: true,
    tableTitleText: 'عنوان الجدول',
    showTableTitle: true,
    progressRows: RTL_PROGRESS_ROWS,
  },
};

export const Pie = {
  name: 'Pie',
  args: {
    title: 'Sales by Category',
    segments: SAMPLE_SEGMENTS_4,
    showLegend: true,
    type: 'pie',
    dir: 'ltr',
  },
};

export const HalfDonut = {
  name: 'Half Donut',
  args: {
    title: 'Progress Overview',
    segments: SAMPLE_SEGMENTS_4,
    centerValue: '75%',
    centerLabel: 'Complete',
    showLegend: true,
    type: 'half',
    dir: 'ltr',
  },
};

export const HalfDonutRTL = {
  name: 'Half Donut RTL',
  args: {
    title: 'معدل الإنجاز',
    segments: [
      { id: 1, label: 'مكتمل', value: 68 },
      { id: 2, label: 'متبقي', value: 32 },
    ],
    centerValue: '68%',
    centerLabel: 'مكتمل',
    showLegend: true,
    type: 'half',
    dir: 'rtl',
  },
};

export const EmptyState = {
  name: 'Empty State',
  args: {
    title: 'Category Distribution',
    segments: [],
    showLegend: false,
    empty: true,
    type: 'donut',
    dir: 'ltr',
  },
};

export const LoadingState = {
  name: 'Loading State',
  args: {
    title: 'Category Distribution',
    segments: [],
    showLegend: false,
    loading: true,
    type: 'donut',
    dir: 'ltr',
  },
};

export const WithTooltip = {
  name: 'With Tooltip',
  args: {
    title: 'Hover a Segment for Tooltip',
    segments: SAMPLE_SEGMENTS_4,
    centerValue: '100',
    centerLabel: 'Items',
    showLegend: true,
    type: 'donut',
    dir: 'ltr',
  },
};
