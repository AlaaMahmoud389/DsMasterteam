import { VerticalBarChart } from './VerticalBarChart';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4471-3525&t=gv8blf425MZ1IhAY-4';

/* ── Shared data fixtures ─────────────────────────── */

const MONTHS_7 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const MONTHS_4 = ['Jan', 'Feb', 'Mar', 'Apr'];

const SINGLE_SERIES = [
  { id: 1, label: 'Active Users', data: [500, 240, 270, 180, 430, 200, 130] },
];

const GROUP_SERIES = [
  { id: 1, label: 'Series 1', data: [300, 280, 300, 290] },
  { id: 2, label: 'Series 2', data: [200, 185, 220, 170] },
  { id: 3, label: 'Series 3', data: [100, 110, 130, 90] },
];

const STACKED_SERIES = [
  { id: 1, label: 'Type A', data: [150, 120, 180, 100] },
  { id: 2, label: 'Type B', data: [90, 80, 70, 100] },
  { id: 3, label: 'Type C', data: [60, 40, 50, 100] },
];

const RTL_STACKED_SERIES = [
  { id: 1, label: 'النوع أ', data: [150, 120, 180, 100] },
  { id: 2, label: 'النوع ب', data: [90, 80, 70, 100] },
  { id: 3, label: 'النوع ج', data: [60, 40, 50, 100] },
];

const COMBO_SERIES = [
  { id: 1, label: 'المبيعات',    data: [300, 200, 250, 180, 400, 220, 150] },
  { id: 2, label: 'معدل النمو',  data: [220, 180, 200, 160, 350, 200, 130] },
];

const RTL_CATS = ['يناير', 'فبراير', 'مارس', 'أبريل'];

const KPI_DEFAULT = {
  value: '78,909.72',
  badge: { icon: '↑', text: '4.5%', label: 'from last week' },
};

/* ── Story default export ─────────────────────────── */

export default {
  title: 'Components/Charts/Vertical Bar Chart',
  component: VerticalBarChart,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    title: {
      control: 'text',
      description: 'Chart title and SVG accessible name',
    },
    barType: {
      control: 'select',
      options: ['single', 'group', 'stacked', 'combo'],
      description: 'Bar layout mode from Figma',
      table: { defaultValue: { summary: 'single' } },
    },
    showKpi: {
      control: 'boolean',
      description: 'Toggle KPI block',
      table: { defaultValue: { summary: 'true' } },
    },
    showLegend: {
      control: 'boolean',
      description: 'Show legend — required for multi-series',
      table: { defaultValue: { summary: 'false' } },
    },
    dir: {
      control: 'select',
      options: ['ltr', 'rtl'],
      description: 'Layout direction — rtl reverses category order',
      table: { defaultValue: { summary: 'ltr' } },
    },
    maxValue: {
      control: 'number',
      description: 'Override Y-axis maximum',
    },
    yAxisTitle: {
      control: 'text',
      description: 'Rotated Y-axis (value) title',
    },
    xAxisTitle: {
      control: 'text',
      description: 'X-axis (category) title',
    },
    series:     { control: false },
    categories: { control: false },
    kpi:        { control: false },
  },
  args: {
    title:      'Monthly Active Users',
    categories: MONTHS_7,
    series:     SINGLE_SERIES,
    barType:    'single',
    kpi:        KPI_DEFAULT,
    showKpi:    true,
    showLegend: false,
    yAxisTitle: 'Active users',
    xAxisTitle: 'Month',
    dir:        'ltr',
  },
};

/* ── Stories ──────────────────────────────────────── */

export const Playground = {};

export const SingleBar = {
  name: 'Single Bar',
  args: {
    title:      'Monthly Active Users',
    categories: MONTHS_7,
    series:     SINGLE_SERIES,
    barType:    'single',
    kpi:        KPI_DEFAULT,
    showKpi:    true,
    showLegend: false,
    yAxisTitle: 'Active users',
    xAxisTitle: 'Month',
    dir:        'ltr',
  },
};

export const GroupBar = {
  name: 'Group Bar',
  args: {
    title:      'Comparative Monthly Data',
    categories: MONTHS_4,
    series:     GROUP_SERIES,
    barType:    'group',
    kpi:        KPI_DEFAULT,
    showKpi:    true,
    showLegend: true,
    yAxisTitle: 'Value',
    xAxisTitle: 'Month',
    dir:        'ltr',
  },
};

export const StackedBar = {
  name: 'Stacked Bar',
  args: {
    title:      'Share by Category',
    categories: MONTHS_4,
    series:     STACKED_SERIES,
    barType:    'stacked',
    showKpi:    false,
    showLegend: true,
    yAxisTitle: 'Total',
    xAxisTitle: 'Month',
    dir:        'ltr',
  },
};

export const RTLArabic = {
  name: 'RTL Arabic',
  args: {
    title:      'توزيع النشاط الشهري',
    categories: RTL_CATS,
    series:     RTL_STACKED_SERIES,
    barType:    'stacked',
    showKpi:    false,
    showLegend: true,
    yAxisTitle: 'القيمة',
    xAxisTitle: 'الشهر',
    dir:        'rtl',
  },
};

export const ComboChart = {
  name: 'Combo Chart',
  args: {
    title:      'Sales vs Growth Rate',
    categories: MONTHS_7,
    series:     COMBO_SERIES,
    barType:    'combo',
    showKpi:    false,
    showLegend: true,
    yAxisTitle: 'Value',
    xAxisTitle: 'Month',
    dir:        'ltr',
  },
};

export const WithTooltip = {
  name: 'With Tooltip',
  args: {
    title:      'Monthly Active Users — hover bars to see tooltip',
    categories: MONTHS_7,
    series:     SINGLE_SERIES,
    barType:    'single',
    kpi:        KPI_DEFAULT,
    showKpi:    true,
    showLegend: false,
    yAxisTitle: 'Active users',
    xAxisTitle: 'Month',
    dir:        'ltr',
  },
};

export const LegendFiltering = {
  name: 'Legend Filtering',
  args: {
    title:      'Comparative Monthly Data — click legend to toggle series',
    categories: MONTHS_4,
    series:     GROUP_SERIES,
    barType:    'group',
    showKpi:    false,
    showLegend: true,
    yAxisTitle: 'Value',
    xAxisTitle: 'Month',
    dir:        'ltr',
  },
};
