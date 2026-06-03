import { RadialChart } from './RadialChart';

export default {
  title: 'Components/Progress Bar/Radial',
  component: RadialChart,
  parameters: {
    layout: 'padded',
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    size:         { control: 'radio',    options: ['medium', 'small'] },
    showTrend:    { control: 'boolean' },
    showViewMore: { control: 'boolean' },
    showLabels:   { control: 'boolean' },
    rtl:          { control: 'boolean' },
    title:        { control: 'text' },
    kpiValue:     { control: 'text' },
    trendValue:   { control: 'text' },
    trendLabel:   { control: 'text' },
  },
};

/* ── Shared ring data ──────────────────────────────────────── */

const SAMPLE_RINGS = [
  { label: 'Data 1', value: 75, color: '#1c3d8c' },
  { label: 'Data 2', value: 55, color: '#1849a9' },
  { label: 'Data 3', value: 35, color: '#4f83dd' },
  { label: 'Data 4', value: 20, color: '#7ca6e9' },
];

/* ── Stories ───────────────────────────────────────────────── */

export const Playground = {
  args: {
    title:        'Data Title',
    kpiValue:     '78,909.72',
    trendValue:   '4.5%',
    trendLabel:   'from last week',
    showTrend:    true,
    showViewMore: true,
    size:         'medium',
    rings:        SAMPLE_RINGS,
    showLabels:   true,
    rtl:          false,
  },
};

export const MediumSize = {
  name: 'Medium (314 px)',
  args: {
    size:      'medium',
    rings:     SAMPLE_RINGS,
    showLabels: true,
  },
};

export const SmallSize = {
  name: 'Small (232 px)',
  args: {
    size:       'small',
    rings:      SAMPLE_RINGS,
    showLabels: false,
  },
};

export const WithoutTrend = {
  name: 'Without Trend Badge',
  args: {
    rings:     SAMPLE_RINGS,
    showTrend: false,
  },
};

export const WithoutViewMore = {
  name: 'Without View More',
  args: {
    rings:        SAMPLE_RINGS,
    showViewMore: false,
  },
};

export const WithoutLabels = {
  name: 'Without Data Labels',
  args: {
    rings:      SAMPLE_RINGS,
    showLabels: false,
  },
};

export const MinimalCard = {
  name: 'Minimal (No Trend, No Link, No Labels)',
  args: {
    rings:        SAMPLE_RINGS,
    showTrend:    false,
    showViewMore: false,
    showLabels:   false,
  },
};

export const RTLArabic = {
  name: 'RTL / Arabic',
  args: {
    title:        'عنوان البيانات',
    kpiValue:     '78,909.72',
    trendValue:   '4.5%',
    trendLabel:   'من الأسبوع الماضي',
    showTrend:    true,
    showViewMore: true,
    size:         'medium',
    rings:        SAMPLE_RINGS,
    showLabels:   false,
    rtl:          true,
  },
};

/* ── All States grid ─────────────────────────────────────── */

export const AllStates = {
  name: 'All States (2×2 Grid)',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <RadialChart title="Medium — Full"  size="medium" rings={SAMPLE_RINGS} showLabels showTrend showViewMore />
      <RadialChart title="Medium — No Labels" size="medium" rings={SAMPLE_RINGS} showLabels={false} showTrend showViewMore />
      <RadialChart title="Small — Full"   size="small"  rings={SAMPLE_RINGS} showTrend showViewMore />
      <RadialChart title="Small — Minimal" size="small" rings={SAMPLE_RINGS} showTrend={false} showViewMore={false} />
    </div>
  ),
  parameters: { layout: 'padded' },
};

export const AllStatesRTL = {
  name: 'All States RTL (2×2 Grid)',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <RadialChart title="متوسط — كامل"    size="medium" rings={SAMPLE_RINGS} showTrend showViewMore rtl />
      <RadialChart title="متوسط — بدون اتجاه" size="medium" rings={SAMPLE_RINGS} showTrend={false} showViewMore rtl />
      <RadialChart title="صغير — كامل"    size="small"  rings={SAMPLE_RINGS} showTrend showViewMore rtl />
      <RadialChart title="صغير — مبسط"   size="small"  rings={SAMPLE_RINGS} showTrend={false} showViewMore={false} rtl />
    </div>
  ),
  parameters: { layout: 'padded' },
};
