import { HorizontalBarChart } from './HorizontalBarChart';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4578-9576&t=gv8blf425MZ1IhAY-4';

/* ── Shared data fixtures ─────────────────────────── */

const MONTHS_5  = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
const MONTHS_4  = ['jan', 'feb', 'mar', 'May'];

const SINGLE_SERIES = [
  { id: 1, label: 'Activity', data: [500, 200, 240, 130, 240] },
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

const RTL_SERIES = [
  { id: 1, label: 'النشاط', data: [500, 200, 240, 130] },
];

const RTL_STACKED_SERIES = [
  { id: 1, label: 'النوع أ', data: [150, 120, 180, 100] },
  { id: 2, label: 'النوع ب', data: [90, 80, 70, 100] },
  { id: 3, label: 'النوع ج', data: [60, 40, 50, 100] },
];

const RTL_CATS = ['يناير', 'فبراير', 'مارس', 'أبريل'];

const KPI_DEFAULT = {
  value: '78,909.72',
  badge: { icon: '↑', text: '4.5%', label: 'from last week' },
};

/* ── Story default export ─────────────────────────── */

export default {
  title: 'Components/Charts/Horizontal Bar Chart',
  component: HorizontalBarChart,
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
      options: ['single', 'group', 'stacked'],
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
      description: 'Layout direction — rtl mirrors chart',
      table: { defaultValue: { summary: 'ltr' } },
    },
    maxValue: {
      control: 'number',
      description: 'Override X-axis maximum',
    },
    yAxisTitle: {
      control: 'text',
      description: 'Rotated Y-axis (category) title',
    },
    xAxisTitle: {
      control: 'text',
      description: 'X-axis (value) title',
    },
    series:     { control: false },
    categories: { control: false },
    kpi:        { control: false },
  },
  args: {
    title:       'Monthly Activity Distribution',
    categories:  MONTHS_5,
    series:      SINGLE_SERIES,
    barType:     'single',
    kpi:         KPI_DEFAULT,
    showKpi:     true,
    showLegend:  false,
    yAxisTitle:  'Month',
    xAxisTitle:  'Active',
    dir:         'ltr',
  },
};

/* ── Stories ──────────────────────────────────────── */

export const Playground = {};

export const SingleBar = {
  name: 'Single Bar',
  args: {
    title:      'Monthly Activity Distribution',
    categories: MONTHS_5,
    series:     SINGLE_SERIES,
    barType:    'single',
    kpi:        KPI_DEFAULT,
    showKpi:    true,
    showLegend: false,
    yAxisTitle: 'Month',
    xAxisTitle: 'Active',
    dir:        'ltr',
  },
};

export const GroupBar = {
  name: 'Group Bar',
  args: {
    title:      'Comparative Data',
    categories: MONTHS_4,
    series:     GROUP_SERIES,
    barType:    'group',
    kpi:        KPI_DEFAULT,
    showKpi:    true,
    showLegend: true,
    yAxisTitle: 'Month',
    xAxisTitle: 'Active',
    dir:        'ltr',
  },
};

export const StackedBar = {
  name: 'Stacked Bar',
  args: {
    title:      'Share by Category',
    categories: ['Jan', 'Feb', 'Mar', 'Apr'],
    series:     STACKED_SERIES,
    barType:    'stacked',
    showKpi:    false,
    showLegend: true,
    yAxisTitle: 'Month',
    xAxisTitle: 'Total',
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
    yAxisTitle: 'الشهر',
    xAxisTitle: 'الإجمالي',
    dir:        'rtl',
  },
};

export const WithTooltip = {
  name: 'With Tooltip',
  args: {
    title:      'Monthly Activity — hover bars to see tooltip',
    categories: MONTHS_5,
    series:     SINGLE_SERIES,
    barType:    'single',
    kpi:        KPI_DEFAULT,
    showKpi:    true,
    showLegend: false,
    yAxisTitle: 'Month',
    xAxisTitle: 'Active',
    dir:        'ltr',
  },
};

export const LegendFiltering = {
  name: 'Legend Filtering',
  args: {
    title:      'Comparative Data — click legend to toggle series',
    categories: MONTHS_4,
    series:     GROUP_SERIES,
    barType:    'group',
    showKpi:    false,
    showLegend: true,
    yAxisTitle: 'Month',
    xAxisTitle: 'Active',
    dir:        'ltr',
  },
};
