import { RiskMatrix } from './RiskMatrix';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4600-9686';

/* ── Figma-sourced design tokens / props ──────────────────────
   From node 4600:9686 (RTL=false variant):
     seriesLabels  → ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5']
     yAxisLabel    → 'Probability'  (Figma: rotated left label)
     xAxisLabel    → 'Impact'       (Figma: centered bottom label)
     showCellValues → true          (Figma: cells display numeric "1")
     showCellLabels → false         (Figma: no text label inside cells)
     dir           → 'ltr'         (Figma variant: rtl="false")
   ─────────────────────────────────────────────────────────── */

const RISK_ITEMS = [
  { id: 'R1', label: 'Data Breach',    likelihood: 2, impact: 5, description: 'Unauthorised access to customer PII.' },
  { id: 'R2', label: 'Supplier Delay', likelihood: 4, impact: 3, description: 'Key hardware supplier unable to deliver.' },
  { id: 'R3', label: 'Budget Overrun', likelihood: 3, impact: 4, description: 'Project scope creep.' },
  { id: 'R4', label: 'Staff Turnover', likelihood: 3, impact: 2, description: 'Loss of key engineering staff.' },
  { id: 'R5', label: 'Regulatory',     likelihood: 1, impact: 5, description: 'New data residency laws.' },
  { id: 'R6', label: 'Cyber Attack',   likelihood: 4, impact: 5, description: 'Ransomware targeting infrastructure.' },
];

/* Values matrix matching Figma (all "1" as placeholder) */
const FIGMA_VALUES = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
];

/* Values derived from sample risk items */
const ITEM_VALUES = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 1],  // R2 (L=4,I=3), R6 (L=4,I=5)
  [0, 1, 0, 1, 0],  // R4 (L=3,I=2), R3 (L=3,I=4)
  [0, 0, 0, 0, 1],  // R1 (L=2,I=5)
  [0, 0, 0, 0, 1],  // R5 (L=1,I=5)
];

export default {
  title: 'Components/Charts/Risk Matrix',
  component: RiskMatrix,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    title:          { control: 'text',    description: 'Card title' },
    subtitle:       { control: 'text',    description: 'Card subtitle' },
    yAxisLabel:     { control: 'text',    description: 'Y-axis title (Figma: "Probability")' },
    xAxisLabel:     { control: 'text',    description: 'X-axis title (Figma: "Impact")' },
    showLegend:     { control: 'boolean', description: 'Show top series legend', table: { defaultValue: { summary: 'true' } } },
    showCellLabels: { control: 'boolean', description: 'Show risk level text inside each cell', table: { defaultValue: { summary: 'false' } } },
    showCellValues: { control: 'boolean', description: 'Show numeric value inside each cell (Figma: true)', table: { defaultValue: { summary: 'true' } } },
    dir:            { control: 'select',  options: ['ltr', 'rtl'], description: 'RTL variant from Figma node 4600:9686' },
    items:          { control: false, description: 'Risk items plotted as markers on the grid' },
    values:         { control: false, description: '5×5 numeric values matrix for cell display' },
    seriesLabels:   { control: false, description: 'Labels for the top legend (default: risk level names)' },
    seriesColors:   { control: false, description: 'Colors for the top legend marks' },
    yLabels:        { control: false, description: 'Y-axis tick labels (top to bottom)' },
    xLabels:        { control: false, description: 'X-axis tick labels (left to right)' },
    customGrid:     { control: false, description: 'Override the default 5×5 risk level grid' },
  },
  args: {
    title:          'Card Title',
    yAxisLabel:     'Probability',
    xAxisLabel:     'Impact',
    showLegend:     true,
    showCellLabels: false,
    showCellValues: true,
    dir:            'ltr',
    seriesLabels:   ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5'],
    values:         FIGMA_VALUES,
  },
};

/* ── Playground ───────────────────────────────── */

export const Playground = {};

/* ── Figma-sourced: exact replica of node 4600:9686 ── */

export const FigmaDefault = {
  name: 'Figma — Default (RTL=false)',
  args: {
    title:        'Card Title',
    yAxisLabel:   'Probability',
    xAxisLabel:   'Impact',
    showLegend:   true,
    showCellValues: true,
    showCellLabels: false,
    seriesLabels: ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5'],
    values:       FIGMA_VALUES,
    dir:          'ltr',
  },
};

/* ── Figma RTL variant ─────────────────────────── */

export const FigmaRTL = {
  name: 'Figma — RTL',
  args: {
    title:        'مصفوفة المخاطر',
    yAxisLabel:   'الاحتمالية',
    xAxisLabel:   'التأثير',
    showLegend:   true,
    showCellValues: true,
    showCellLabels: false,
    seriesLabels: ['السلسلة 1', 'السلسلة 2', 'السلسلة 3', 'السلسلة 4', 'السلسلة 5'],
    values:       FIGMA_VALUES,
    dir:          'rtl',
  },
};

/* ── Semantic risk-level legend ───────────────── */

export const WithRiskLegend = {
  name: 'Semantic Risk Labels',
  args: {
    title:          'Risk Assessment Matrix',
    subtitle:       'Q2 2025 — Project Alpha',
    yAxisLabel:     'Probability',
    xAxisLabel:     'Impact',
    showLegend:     true,
    showCellValues: false,
    showCellLabels: true,
    seriesLabels:   ['Very High', 'High', 'Medium', 'Low', 'Very Low'],
    dir:            'ltr',
  },
};

/* ── With risk items plotted ──────────────────── */

export const WithRiskItems = {
  name: 'With Risk Items (Counts)',
  args: {
    title:          'Project Risk Register',
    subtitle:       'Q2 2025 — 6 items mapped',
    yAxisLabel:     'Probability',
    xAxisLabel:     'Impact',
    showLegend:     true,
    showCellValues: true,
    showCellLabels: false,
    seriesLabels:   ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5'],
    items:          RISK_ITEMS,
    values:         ITEM_VALUES,
    dir:            'ltr',
  },
};

/* ── Custom values (real data) ────────────────── */

export const CustomValues = {
  name: 'Custom Numeric Values',
  args: {
    title:          'Risk Frequency Matrix',
    subtitle:       'Count of risks per cell — H2 2025',
    yAxisLabel:     'Probability',
    xAxisLabel:     'Impact',
    showLegend:     true,
    showCellValues: true,
    showCellLabels: false,
    seriesLabels:   ['Very High', 'High', 'Medium', 'Low', 'Very Low'],
    values: [
      [0, 2, 0, 3, 5],
      [1, 0, 4, 2, 3],
      [0, 1, 0, 4, 2],
      [2, 0, 1, 0, 1],
      [1, 1, 0, 2, 0],
    ],
    dir: 'ltr',
  },
};

/* ── Color-only (no values, no labels) ───────── */

export const ColorOnly = {
  name: 'Color Only',
  args: {
    title:          'Risk Heatmap',
    yAxisLabel:     'Probability',
    xAxisLabel:     'Impact',
    showLegend:     true,
    showCellValues: false,
    showCellLabels: false,
    seriesLabels:   ['Very High', 'High', 'Medium', 'Low', 'Very Low'],
    dir:            'ltr',
  },
};

/* ── No legend ────────────────────────────────── */

export const NoLegend = {
  name: 'No Legend',
  args: {
    title:          'Compact Risk Matrix',
    yAxisLabel:     'Probability',
    xAxisLabel:     'Impact',
    showLegend:     false,
    showCellValues: true,
    values:         FIGMA_VALUES,
    dir:            'ltr',
  },
};

/* ── Legend filtering (interactive) ──────────── */

export const LegendFiltering = {
  name: 'Legend Filtering',
  args: {
    title:          'Interactive Risk Filter',
    subtitle:       'Click legend items to hide / show risk levels',
    yAxisLabel:     'Probability',
    xAxisLabel:     'Impact',
    showLegend:     true,
    showCellValues: true,
    showCellLabels: false,
    seriesLabels:   ['Very High', 'High', 'Medium', 'Low', 'Very Low'],
    values:         FIGMA_VALUES,
    dir:            'ltr',
  },
};

/* ── With tooltip + risk items ────────────────── */

export const WithTooltip = {
  name: 'With Tooltip + Items',
  args: {
    title:          'Risk Register — Hover for Details',
    subtitle:       'Hover or focus any cell to see the tooltip',
    yAxisLabel:     'Probability',
    xAxisLabel:     'Impact',
    showLegend:     true,
    showCellValues: true,
    showCellLabels: false,
    seriesLabels:   ['Very High', 'High', 'Medium', 'Low', 'Very Low'],
    items:          RISK_ITEMS,
    values:         ITEM_VALUES,
    dir:            'ltr',
  },
};
