import { AreaChart } from './AreaChart';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY';

const MONTHS_7 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const MONTHS_4 = ['Jan', 'Feb', 'Mar', 'Apr'];

const SINGLE = [{ id: 1, label: 'Active Users', data: [280, 420, 360, 510, 390, 470, 540] }];
const MULTI  = [
  { id: 1, label: 'Series 1', data: [280, 420, 360, 510, 390, 470, 540] },
  { id: 2, label: 'Series 2', data: [180, 260, 220, 310, 280, 340, 400] },
];
const STACKED = [
  { id: 1, label: 'Type A', data: [150, 200, 180, 250, 210, 270, 300] },
  { id: 2, label: 'Type B', data: [90, 130, 110, 160, 140, 180, 210] },
  { id: 3, label: 'Type C', data: [50, 80, 60, 100, 80, 110, 130] },
];
const RTL_MULTI = [
  { id: 1, label: 'السلسلة الأولى', data: [280, 420, 360, 510] },
  { id: 2, label: 'السلسلة الثانية', data: [180, 260, 220, 310] },
];
const KPI = { value: '78,909.72', badge: { icon: '↑', text: '4.5%', label: 'from last week' } };

export default {
  title: 'Components/Charts/Area Chart',
  component: AreaChart,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  tags: [],
  argTypes: {
    title:      { control: 'text' },
    areaType:   { control: 'select', options: ['single', 'multi', 'stacked'] },
    showLegend: { control: 'boolean' },
    showKpi:    { control: 'boolean' },
    loading:    { control: 'boolean' },
    empty:      { control: 'boolean' },
    dir:        { control: 'select', options: ['ltr', 'rtl'] },
    yAxisTitle: { control: 'text' },
    xAxisTitle: { control: 'text' },
    series:     { control: false },
    categories: { control: false },
    kpi:        { control: false },
  },
  args: {
    title: 'Monthly Active Users', categories: MONTHS_7, series: SINGLE,
    areaType: 'single', showLegend: false, showKpi: true, loading: false,
    empty: false, dir: 'ltr', kpi: KPI, yAxisTitle: 'Users', xAxisTitle: 'Month',
  },
};

export const Playground = {};

export const SingleArea = {
  name: 'Single Area',
  args: { title: 'Monthly Active Users', categories: MONTHS_7, series: SINGLE, areaType: 'single', showLegend: false },
};

export const MultiArea = {
  name: 'Multi-Series Area',
  args: { title: 'Series Comparison', categories: MONTHS_7, series: MULTI, areaType: 'multi', showLegend: true, showKpi: false },
};

export const StackedArea = {
  name: 'Stacked Area',
  args: { title: 'Stacked Breakdown', categories: MONTHS_7, series: STACKED, areaType: 'stacked', showLegend: true, showKpi: false },
};

export const RTLArabic = {
  name: 'RTL Arabic',
  args: {
    title: 'النشاط الشهري', categories: ['يناير', 'فبراير', 'مارس', 'أبريل'],
    series: RTL_MULTI, areaType: 'multi', showLegend: true, showKpi: false, dir: 'rtl',
  },
};

export const LoadingState = {
  name: 'Loading State',
  args: { title: 'Monthly Active Users', series: [], categories: [], loading: true },
};

export const EmptyState = {
  name: 'Empty State',
  args: { title: 'Monthly Active Users', series: [], categories: [], empty: true },
};
