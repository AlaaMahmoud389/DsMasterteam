import { LineChart } from './LineChart';

/* ── Figma source: frame "Line chart" node 4560:4599 ──────────────────
   Four variants (Rtl × card details):
     4560:4600  Rtl=false · card details=true   (with KPI)
     4560:4620  Rtl=false · card details=false  (no KPI)
     4560:4635  Rtl=true  · card details=true   (with KPI, Arabic)
     4560:4656  Rtl=true  · card details=false  (no KPI,  Arabic)
──────────────────────────────────────────────────────────────────── */

const FIGMA_FRAME   = 'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4560-4599';
const FIGMA_V1      = 'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4560-4600';
const FIGMA_V2      = 'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4560-4620';
const FIGMA_V3      = 'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4560-4635';
const FIGMA_V4      = 'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4560-4656';

/* ── Figma-sourced data ───────────────────────────────────────────── */

const CATS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
const CATS_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر'];

const SERIES_EN = [
  { id: 1, label: 'Series 1', data: [580, 595, 575, 600, 615, 630, 640, 680, 720] },
  { id: 2, label: 'Series 2', data: [390, 400, 415, 420, 450, 470, 480, 510, 555] },
  { id: 3, label: 'Series 3', data: [100, 130, 165, 200, 230, 270, 300, 360, 420] },
];

const SERIES_AR = [
  { id: 1, label: 'السلسلة 1', data: [580, 595, 575, 600, 615, 630, 640, 680, 720] },
  { id: 2, label: 'السلسلة 2', data: [390, 400, 415, 420, 450, 470, 480, 510, 555] },
  { id: 3, label: 'السلسلة 3', data: [100, 130, 165, 200, 230, 270, 300, 360, 420] },
];

/* Figma node 4560:4600 — KPI values */
const KPI_EN = { value: '78,909.72', badge: { icon: '↑', text: '4.5%', label: 'from last week' } };
const KPI_AR = { value: '78,909.72', badge: { icon: '↑', text: '4.5%', label: 'من الأسبوع الماضي' } };

export default {
  title: 'Components/Charts/Line Chart',
  component: LineChart,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_FRAME },
  },
  tags: [],
  argTypes: {
    title:           { control: 'text' },
    subtitle:        { control: 'text' },
    lineType:        { control: 'select', options: ['line', 'step', 'smooth'] },
    showKpi:         { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    showLegend:      { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    showYAxisLabel:  { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    showXAxisLabel:  { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    showContent:     { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    yAxisTitle:      { control: 'text' },
    xAxisTitle:      { control: 'text' },
    maxValue:        { control: 'number' },
    loading:         { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    empty:           { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    dir:             { control: 'radio', options: ['ltr', 'rtl'] },
    series:          { control: false },
    categories:      { control: false },
    kpi:             { control: false },
  },
  /* Default args match node 4560:4600 — Rtl=false, card details=true */
  args: {
    title:          'Data Title',
    kpi:            KPI_EN,
    showKpi:        true,
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    series:         SERIES_EN,
    categories:     CATS_EN,
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

/* ── Playground ─────────────────────────────────────────────────── */

export const Playground = {};

/* ────────────────────────────────────────────────────────────────
   Figma frame 4560:4599 — four canonical variants
──────────────────────────────────────────────────────────────────── */

/* V1 — Rtl=false · card details=true (node 4560:4600) */
export const FigmaRtlFalseKpiTrue = {
  name: 'Figma — Rtl=false · card details=true (4560:4600)',
  parameters: { design: { type: 'figma', url: FIGMA_V1 } },
  args: {
    title:          'Data Title',
    kpi:            KPI_EN,
    showKpi:        true,
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    series:         SERIES_EN,
    categories:     CATS_EN,
    lineType:       'line',
    showLegend:     true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    dir:            'ltr',
  },
};

/* V2 — Rtl=false · card details=false (node 4560:4620) */
export const FigmaRtlFalseKpiFalse = {
  name: 'Figma — Rtl=false · card details=false (4560:4620)',
  parameters: { design: { type: 'figma', url: FIGMA_V2 } },
  args: {
    title:          'Card Title',
    showKpi:        false,
    yAxisTitle:     'Active users',
    xAxisTitle:     'Month',
    series:         SERIES_EN,
    categories:     CATS_EN,
    lineType:       'line',
    showLegend:     true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    dir:            'ltr',
  },
};

/* V3 — Rtl=true · card details=true (node 4560:4635) */
export const FigmaRtlTrueKpiTrue = {
  name: 'Figma — Rtl=true · card details=true (4560:4635)',
  parameters: { design: { type: 'figma', url: FIGMA_V3 } },
  args: {
    title:          'عنوان البيانات',
    kpi:            KPI_AR,
    showKpi:        true,
    yAxisTitle:     'المستخدمون النشطون',
    xAxisTitle:     'الشهر',
    series:         SERIES_AR,
    categories:     CATS_AR,
    lineType:       'line',
    showLegend:     true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    dir:            'rtl',
  },
};

/* V4 — Rtl=true · card details=false (node 4560:4656) */
export const FigmaRtlTrueKpiFalse = {
  name: 'Figma — Rtl=true · card details=false (4560:4656)',
  parameters: { design: { type: 'figma', url: FIGMA_V4 } },
  args: {
    title:          'عنوان البطاقة',
    showKpi:        false,
    yAxisTitle:     'المستخدمون النشطون',
    xAxisTitle:     'الشهر',
    series:         SERIES_AR,
    categories:     CATS_AR,
    lineType:       'line',
    showLegend:     true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showContent:    true,
    dir:            'rtl',
  },
};

/* ────────────────────────────────────────────────────────────────
   Supplementary variants
──────────────────────────────────────────────────────────────────── */

export const SmoothLine = {
  name: 'Line Style — Smooth',
  args: {
    title: 'Card Title', yAxisTitle: 'Active users', xAxisTitle: 'Month',
    series: SERIES_EN, categories: CATS_EN,
    lineType: 'smooth', showLegend: true, showKpi: false,
    showYAxisLabel: true, showXAxisLabel: true, showContent: true, dir: 'ltr',
  },
};

export const StepLine = {
  name: 'Line Style — Step',
  args: {
    title: 'Step Chart', yAxisTitle: 'Active users', xAxisTitle: 'Month',
    series: SERIES_EN, categories: CATS_EN,
    lineType: 'step', showLegend: true, showKpi: false,
    showYAxisLabel: true, showXAxisLabel: true, showContent: true, dir: 'ltr',
  },
};

export const SixSeries = {
  name: 'Six Series (Full Palette)',
  args: {
    title: 'Multi-Series Comparison', yAxisTitle: 'Active users', xAxisTitle: 'Month',
    series: [
      { id: 1, label: 'Series 1', data: [580, 595, 575, 600, 615, 630, 640, 680, 720] },
      { id: 2, label: 'Series 2', data: [490, 500, 510, 520, 530, 545, 555, 570, 590] },
      { id: 3, label: 'Series 3', data: [390, 400, 415, 420, 450, 470, 480, 510, 555] },
      { id: 4, label: 'Series 4', data: [280, 295, 310, 320, 340, 360, 375, 400, 430] },
      { id: 5, label: 'Series 5', data: [180, 200, 215, 230, 250, 270, 285, 310, 340] },
      { id: 6, label: 'Series 6', data: [100, 120, 140, 160, 180, 205, 225, 260, 300] },
    ],
    categories: CATS_EN, lineType: 'line', showLegend: true, showKpi: false,
    showYAxisLabel: true, showXAxisLabel: true, showContent: true, dir: 'ltr',
  },
};

export const NoAxisLabels = {
  name: 'All Axis Labels Off',
  args: {
    title: 'Card Title', series: SERIES_EN, categories: CATS_EN,
    lineType: 'line', showLegend: true, showKpi: false,
    showYAxisLabel: false, showXAxisLabel: false, showContent: false, dir: 'ltr',
  },
};

export const LoadingState = {
  name: 'Loading State',
  args: { title: 'Card Title', series: [], categories: [], loading: true },
};

export const EmptyState = {
  name: 'Empty State',
  args: { title: 'Card Title', series: [], categories: CATS_EN, empty: true },
};
