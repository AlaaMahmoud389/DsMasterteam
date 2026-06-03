import { RadarChart } from './RadarChart';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4527-3421';

/* ── Figma-sourced design tokens / props ──────────────────────
   From node 4527:3421 (legend="true", rtl="false" variant):
     axisLabels    → ['Day','Day','Day','Day','Day','Day','Day']  (7 axes all labeled "Day")
     maxValue      → 1000
     showLegend    → true    (legend="true" variant)
     showScaleBadges → true  (scale: 200, 400, 600, 800, 1000)
     seriesLabels  → ['Series 1', 'Series 2', … 'Series 6']
     dir           → 'ltr'  (rtl="false" variant)
   ──────────────────────────────────────────────────────────── */

/* Figma-exact axis labels — all "Day" */
const FIGMA_AXES = ['Day', 'Day', 'Day', 'Day', 'Day', 'Day', 'Day'];

/* Named axis labels for real-world stories */
const DAYS_7    = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SKILLS    = ['Speed', 'Accuracy', 'Strength', 'Agility', 'Endurance', 'Flexibility', 'Balance'];
const METRICS   = ['Revenue', 'Leads', 'Conversion', 'Retention', 'NPS', 'CSAT', 'Churn'];
const AR_AXES   = ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'];

/* ── Series data sets ─────────────────────────────────────── */

/* Figma 3-series (scale 0–1000, back-to-front rendering) */
const FIGMA_3_SERIES = [
  { id: 1, label: 'Series 1', data: [580, 510, 620, 590, 540, 570, 610] },
  { id: 2, label: 'Series 2', data: [720, 680, 730, 690, 760, 700, 740] },
  { id: 3, label: 'Series 3', data: [900, 850, 800, 920, 880, 840, 890] },
];

/* Full 6-series using all Figma series tokens */
const SIX_SERIES = [
  { id: 1, label: 'Series 1', data: [580, 510, 620, 590, 540, 570, 610] },
  { id: 2, label: 'Series 2', data: [680, 640, 710, 660, 730, 670, 690] },
  { id: 3, label: 'Series 3', data: [750, 700, 780, 720, 800, 740, 760] },
  { id: 4, label: 'Series 4', data: [820, 780, 850, 790, 860, 810, 830] },
  { id: 5, label: 'Series 5', data: [870, 840, 900, 860, 910, 870, 880] },
  { id: 6, label: 'Series 6', data: [920, 900, 950, 910, 960, 920, 940] },
];

const ATHLETE_SERIES = [
  { id: 1, label: 'Athlete A', data: [850, 720, 900, 680, 770, 830, 750] },
  { id: 2, label: 'Athlete B', data: [700, 850, 750, 920, 680, 710, 880] },
];

const SINGLE_SERIES = [
  { id: 1, label: 'Performance', data: [650, 780, 820, 700, 880, 740, 800] },
];

export default {
  title: 'Components/Charts/Radar Chart',
  component: RadarChart,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    title:           { control: 'text',    description: 'Card title' },
    subtitle:        { control: 'text',    description: 'Card subtitle' },
    maxValue:        { control: 'number',  description: 'Maximum value for the scale (Figma: 1000)' },
    showLegend:      { control: 'boolean', description: 'Show interactive series legend', table: { defaultValue: { summary: 'true' } } },
    showScaleBadges: { control: 'boolean', description: 'Show scale pill badges on the top axis', table: { defaultValue: { summary: 'true' } } },
    loading:         { control: 'boolean', description: 'Skeleton loading state', table: { defaultValue: { summary: 'false' } } },
    empty:           { control: 'boolean', description: 'Empty state (no data)', table: { defaultValue: { summary: 'false' } } },
    dir:             { control: 'select',  options: ['ltr', 'rtl'], description: 'RTL variant from Figma node 4527:3421' },
    series:          { control: false, description: 'Array of { id, label, data[] } — one per polygon series' },
    axisLabels:      { control: false, description: '7 axis label strings, one per axis going clockwise from top' },
  },
  args: {
    title:           'Card Title',
    series:          FIGMA_3_SERIES,
    axisLabels:      FIGMA_AXES,
    maxValue:        1000,
    showLegend:      true,
    showScaleBadges: true,
    loading:         false,
    empty:           false,
    dir:             'ltr',
  },
};

/* ── Playground ───────────────────────────────── */

export const Playground = {};

/* ── Figma exact replica ─────────────────────── */

export const FigmaDefault = {
  name: 'Figma — Default (legend=true, RTL=false)',
  args: {
    title:           'Card Title',
    axisLabels:      FIGMA_AXES,
    series:          FIGMA_3_SERIES,
    maxValue:        1000,
    showLegend:      true,
    showScaleBadges: true,
    dir:             'ltr',
  },
};

/* ── Figma RTL variant ─────────────────────────── */

export const FigmaRTL = {
  name: 'Figma — RTL',
  args: {
    title:           'عنوان البطاقة',
    axisLabels:      AR_AXES,
    series: [
      { id: 1, label: 'السلسلة 1', data: [580, 510, 620, 590, 540, 570, 610] },
      { id: 2, label: 'السلسلة 2', data: [720, 680, 730, 690, 760, 700, 740] },
      { id: 3, label: 'السلسلة 3', data: [900, 850, 800, 920, 880, 840, 890] },
    ],
    maxValue:        1000,
    showLegend:      true,
    showScaleBadges: true,
    dir:             'rtl',
  },
};

/* ── No legend ─────────────────────────────────── */

export const NoLegend = {
  name: 'Figma — legend=false',
  args: {
    title:           'Card Title',
    axisLabels:      FIGMA_AXES,
    series:          FIGMA_3_SERIES,
    maxValue:        1000,
    showLegend:      false,
    showScaleBadges: true,
    dir:             'ltr',
  },
};

/* ── Six series (full palette) ─────────────────── */

export const SixSeries = {
  name: 'Six Series (Full Palette)',
  args: {
    title:           'Full Series Palette',
    subtitle:        'All 6 Figma series tokens',
    axisLabels:      DAYS_7,
    series:          SIX_SERIES,
    maxValue:        1000,
    showLegend:      true,
    showScaleBadges: true,
    dir:             'ltr',
  },
};

/* ── Skills comparison (2 series) ─────────────── */

export const SkillsComparison = {
  name: 'Skills Comparison',
  args: {
    title:           'Athlete Skill Comparison',
    axisLabels:      SKILLS,
    series:          ATHLETE_SERIES,
    maxValue:        1000,
    showLegend:      true,
    showScaleBadges: true,
    dir:             'ltr',
  },
};

/* ── Single series ─────────────────────────────── */

export const SingleSeries = {
  name: 'Single Series',
  args: {
    title:           'Performance Score',
    axisLabels:      METRICS,
    series:          SINGLE_SERIES,
    maxValue:        1000,
    showLegend:      false,
    showScaleBadges: true,
    dir:             'ltr',
  },
};

/* ── No scale badges ───────────────────────────── */

export const NoScaleBadges = {
  name: 'No Scale Badges',
  args: {
    title:           'Clean Radar',
    axisLabels:      SKILLS,
    series:          ATHLETE_SERIES,
    maxValue:        1000,
    showLegend:      true,
    showScaleBadges: false,
    dir:             'ltr',
  },
};

/* ── Loading state ─────────────────────────────── */

export const LoadingState = {
  name: 'Loading State',
  args: {
    title:   'Card Title',
    series:  [],
    loading: true,
  },
};

/* ── Empty state ───────────────────────────────── */

export const EmptyState = {
  name: 'Empty State',
  args: {
    title:       'Card Title',
    axisLabels:  FIGMA_AXES,
    series:      [],
    empty:       true,
  },
};
