import { LineChart } from './LineChart';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4399-18102';

/* ── Figma-sourced design tokens / props ──────────────────────
   From node 4399:18102 (rtl=False, showContent=true, showXAxisLabel=true, showYAxisLabel=true):
     yAxisTitle   → 'Active users'  (Figma: rotated left label)
     xAxisTitle   → 'Month'         (Figma: centered bottom label)
     Y-axis ticks → 0, 100, 200, …, 800  (9 levels, auto-computed for maxValue=800)
     X-axis cats  → Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep  (9 months)
     series       → Series 1 (dark navy), Series 2 (med blue), Series 3 (light blue)
     legend       → 6 items (Series 1–6)
   ──────────────────────────────────────────────────────────── */

const FIGMA_CATS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

/* 3-series data matching Figma screenshot proportions */
const FIGMA_SERIES = [
  { id: 1, label: 'Series 1', data: [580, 595, 575, 600, 615, 630, 640, 680, 720] },
  { id: 2, label: 'Series 2', data: [390, 400, 415, 420, 450, 470, 480, 510, 555] },
  { id: 3, label: 'Series 3', data: [100, 130, 165, 200, 230, 270, 300, 360, 420] },
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

const SINGLE_SERIES = [
  { id: 1, label: 'Active users', data: [580, 595, 575, 600, 615, 630, 640, 680, 720] },
];

export default {
  title: 'Components/Charts/Line Chart',
  component: LineChart,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    title:           { control: 'text',    description: 'Card title' },
    subtitle:        { control: 'text',    description: 'Card subtitle' },
    lineType:        { control: 'select',  options: ['line', 'step', 'smooth'], description: 'Line interpolation style' },
    showLegend:      { control: 'boolean', description: 'Show interactive series legend', table: { defaultValue: { summary: 'true' } } },
    showYAxisLabel:  { control: 'boolean', description: 'Show rotated Y-axis label (Figma variant)', table: { defaultValue: { summary: 'true' } } },
    showXAxisLabel:  { control: 'boolean', description: 'Show X-axis title below ticks (Figma variant)', table: { defaultValue: { summary: 'true' } } },
    showContent:     { control: 'boolean', description: 'Show X-axis category labels (Figma: showContent variant)', table: { defaultValue: { summary: 'true' } } },
    yAxisTitle:      { control: 'text',    description: 'Y-axis rotated label (Figma: "Active users")' },
    xAxisTitle:      { control: 'text',    description: 'X-axis centered label (Figma: "Month")' },
    maxValue:        { control: 'number',  description: 'Override auto-computed Y-axis maximum' },
    loading:         { control: 'boolean', description: 'Skeleton loading state', table: { defaultValue: { summary: 'false' } } },
    empty:           { control: 'boolean', description: 'Empty state', table: { defaultValue: { summary: 'false' } } },
    dir:             { control: 'select',  options: ['ltr', 'rtl'], description: 'RTL variant from Figma' },
    series:          { control: false, description: 'Array of { id, label, data[] }. Up to 6 series.' },
    categories:      { control: false, description: 'X-axis category labels (e.g. month names)' },
  },
  args: {
    title:          'Card Title',
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    series:         FIGMA_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'line',
    showLegend:     true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    loading:        false,
    empty:          false,
    dir:            'ltr',
  },
};

/* ── Playground ───────────────────────────────── */

export const Playground = {};

/* ── Figma — exact replica ─────────────────────── */

export const FigmaDefault = {
  name: 'Figma — Default (all labels visible, RTL=false)',
  args: {
    title:          'Card Title',
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    series:         FIGMA_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'line',
    showLegend:     true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    dir:            'ltr',
  },
};

/* ── Figma RTL variant ─────────────────────────── */

export const FigmaRTL = {
  name: 'Figma — RTL',
  args: {
    title:          'المستخدمون النشطون',
    yAxisTitle:     'المستخدمون النشطون',
    xAxisTitle:     'الشهر',
    series: [
      { id: 1, label: 'السلسلة 1', data: [580, 595, 575, 600, 615, 630, 640, 680, 720] },
      { id: 2, label: 'السلسلة 2', data: [390, 400, 415, 420, 450, 470, 480, 510, 555] },
      { id: 3, label: 'السلسلة 3', data: [100, 130, 165, 200, 230, 270, 300, 360, 420] },
    ],
    categories:     AR_CATS,
    lineType:       'line',
    showLegend:     true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    dir:            'rtl',
  },
};

/* ── showContent=false (no X category labels) ──── */

export const NoXCategories = {
  name: 'Figma — showContent=false',
  args: {
    title:          'Card Title',
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    series:         FIGMA_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'line',
    showLegend:     true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    false,
    dir:            'ltr',
  },
};

/* ── showXAxisLabel=false (no "Month" title) ────── */

export const NoXAxisLabel = {
  name: 'Figma — showXAxisLabel=false',
  args: {
    title:          'Card Title',
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    series:         FIGMA_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'line',
    showLegend:     true,
    showYAxisLabel: true,
    showXAxisLabel: false,
    showContent:    true,
    dir:            'ltr',
  },
};

/* ── showYAxisLabel=false (no "Active users" label) */

export const NoYAxisLabel = {
  name: 'Figma — showYAxisLabel=false',
  args: {
    title:          'Card Title',
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    series:         FIGMA_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'line',
    showLegend:     true,
    showYAxisLabel: false,
    showXAxisLabel: true,
    showContent:    true,
    dir:            'ltr',
  },
};

/* ── All labels off ───────────────────────────── */

export const NoAxisLabels = {
  name: 'Figma — All axis labels off',
  args: {
    title:          'Card Title',
    series:         FIGMA_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'line',
    showLegend:     true,
    showYAxisLabel: false,
    showXAxisLabel: false,
    showContent:    false,
    dir:            'ltr',
  },
};

/* ── Six series (full palette) ─────────────────── */

export const SixSeries = {
  name: 'Six Series (Full Palette)',
  args: {
    title:          'Multi-Series Comparison',
    subtitle:       'All 6 Figma series tokens',
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    series:         SIX_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'line',
    showLegend:     true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    dir:            'ltr',
  },
};

/* ── Single series ─────────────────────────────── */

export const SingleSeries = {
  name: 'Single Series',
  args: {
    title:          'Active Users',
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    series:         SINGLE_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'line',
    showLegend:     false,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    dir:            'ltr',
  },
};

/* ── Smooth (curved) lines ─────────────────────── */

export const SmoothLine = {
  name: 'Smooth / Curved Lines',
  args: {
    title:          'Card Title',
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    series:         FIGMA_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'smooth',
    showLegend:     true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    dir:            'ltr',
  },
};

/* ── Step lines ────────────────────────────────── */

export const StepLine = {
  name: 'Step Lines',
  args: {
    title:          'Step Chart',
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    series:         FIGMA_SERIES,
    categories:     FIGMA_CATS,
    lineType:       'step',
    showLegend:     true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    dir:            'ltr',
  },
};

/* ── Loading state ─────────────────────────────── */

export const LoadingState = {
  name: 'Loading State',
  args: {
    title:    'Card Title',
    series:   [],
    categories: [],
    loading:  true,
  },
};

/* ── Empty state ───────────────────────────────── */

export const EmptyState = {
  name: 'Empty State',
  args: {
    title:      'Card Title',
    series:     [],
    categories: FIGMA_CATS,
    empty:      true,
  },
};
