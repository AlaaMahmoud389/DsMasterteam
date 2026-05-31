import { MapChart } from './MapChart';

const FIGMA_URL      = 'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4560-5177';
const FIGMA_FILLED   = 'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4560-5176';
const FIGMA_OUTLINE  = 'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4560-5175';

/* ── Saudi Arabia — 13 administrative regions (population in thousands) */
const SAUDI_DATA = [
  { id: 'riyadh',           value: 8420 },
  { id: 'makkah',           value: 8560 },
  { id: 'madinah',          value: 2100 },
  { id: 'eastern',          value: 4910 },
  { id: 'asir',             value: 2210 },
  { id: 'tabuk',            value: 910  },
  { id: 'hail',             value: 720  },
  { id: 'northern-borders', value: 380  },
  { id: 'jizan',            value: 1560 },
  { id: 'najran',           value: 620  },
  { id: 'bahah',            value: 480  },
  { id: 'jawf',             value: 560  },
  { id: 'qassim',           value: 1420 },
];

const SAUDI_DATA_VISITORS = [
  { id: 'riyadh',           value: 22400 },
  { id: 'makkah',           value: 18900 },
  { id: 'madinah',          value: 9300  },
  { id: 'eastern',          value: 6800  },
  { id: 'asir',             value: 4200  },
  { id: 'tabuk',            value: 2100  },
  { id: 'hail',             value: 1800  },
  { id: 'northern-borders', value: 950   },
  { id: 'jizan',            value: 3100  },
  { id: 'najran',           value: 1600  },
  { id: 'bahah',            value: 1200  },
  { id: 'jawf',             value: 1400  },
  { id: 'qassim',           value: 3800  },
];

/* Partial — shows NULL_COLOR for regions without data */
const PARTIAL_DATA = [
  { id: 'riyadh',  value: 8420 },
  { id: 'makkah',  value: 8560 },
  { id: 'eastern', value: 4910 },
  { id: 'asir',    value: 2210 },
  { id: 'jizan',   value: 1560 },
];

export default {
  title: 'Components/Charts/Map Chart',
  component: MapChart,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    title:            { control: 'text' },
    variant:          { control: 'radio', options: ['choropleth', 'filled', 'outline'] },
    showColorScale:   { control: 'boolean', description: 'Show colour gradient legend (choropleth only)' },
    showRegionLabels: { control: 'boolean', description: 'Show region name labels inside SVG' },
    loading:          { control: 'boolean' },
    empty:            { control: 'boolean' },
    dir:              { control: 'radio', options: ['ltr', 'rtl'] },
    data:             { control: false },
    regions:          { control: false },
  },
  args: {
    title:            'Saudi Arabia — Population Distribution',
    data:             SAUDI_DATA,
    variant:          'choropleth',
    showColorScale:   true,
    showRegionLabels: true,
    loading:          false,
    empty:            false,
    dir:              'ltr',
  },
};

/* ── Playground ─────────────────────────────────────────────── */

export const Playground = {};

/* ── Figma — filled=true (node 4560:5176) ───────────────────── */

export const FigmaFilled = {
  name: 'Figma — Filled (4560:5176)',
  parameters: { design: { type: 'figma', url: FIGMA_FILLED } },
  args: {
    title:            'Saudi Arabia',
    data:             [],
    variant:          'filled',
    showColorScale:   false,
    showRegionLabels: false,
  },
};

/* ── Figma — filled=false / outline (node 4560:5175) ─────────── */

export const FigmaOutline = {
  name: 'Figma — Outline (4560:5175)',
  parameters: { design: { type: 'figma', url: FIGMA_OUTLINE } },
  args: {
    title:            'Saudi Arabia',
    data:             [],
    variant:          'outline',
    showColorScale:   false,
    showRegionLabels: false,
  },
};

/* ── Choropleth — population ────────────────────────────────── */

export const ChoroplethPopulation = {
  name: 'Choropleth — Population (thousands)',
  args: {
    title:            'Saudi Arabia — Population by Region',
    data:             SAUDI_DATA,
    variant:          'choropleth',
    showColorScale:   true,
    showRegionLabels: true,
  },
};

/* ── Choropleth — visitors ──────────────────────────────────── */

export const ChoroplethVisitors = {
  name: 'Choropleth — Tourist Visitors',
  args: {
    title:            'Saudi Arabia — Tourist Arrivals by Region',
    data:             SAUDI_DATA_VISITORS,
    variant:          'choropleth',
    showColorScale:   true,
    showRegionLabels: true,
  },
};

/* ── Partial data (some regions no data) ────────────────────── */

export const PartialData = {
  name: 'Partial Data — Some Regions Empty',
  args: {
    title:            'Coverage Map',
    data:             PARTIAL_DATA,
    variant:          'choropleth',
    showColorScale:   true,
    showRegionLabels: true,
  },
};

/* ── RTL — Arabic ───────────────────────────────────────────── */

export const RTLArabic = {
  name: 'RTL — Arabic Labels',
  args: {
    title:            'المملكة العربية السعودية — توزيع السكان',
    data:             SAUDI_DATA,
    variant:          'choropleth',
    showColorScale:   true,
    showRegionLabels: true,
    dir:              'rtl',
  },
};

/* ── No region labels ───────────────────────────────────────── */

export const NoLabels = {
  name: 'No Region Labels',
  args: {
    title:            'Saudi Arabia',
    data:             SAUDI_DATA,
    variant:          'choropleth',
    showColorScale:   true,
    showRegionLabels: false,
  },
};

/* ── Loading state ──────────────────────────────────────────── */

export const LoadingState = {
  name: 'Loading State',
  args: {
    title:   'Saudi Arabia',
    data:    [],
    loading: true,
  },
};

/* ── Empty state ────────────────────────────────────────────── */

export const EmptyState = {
  name: 'Empty State',
  args: {
    title: 'Saudi Arabia',
    data:  [],
    empty: true,
  },
};
