import { MapChart } from './MapChart';

const FIGMA_URL     = 'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4560-5177';
const FIGMA_FILLED  = 'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4560-5176';
const FIGMA_OUTLINE = 'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4560-5175';

/* ── Saudi Arabia population data (population in thousands) */
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
    docs: {
      description: {
        component:
          'Saudi Arabia choropleth map powered by **Google Charts GeoChart** ' +
          '(`https://www.gstatic.com/charts/loader.js`). Renders all 13 administrative ' +
          'provinces using ISO 3166-2:SA codes. Requires network access to the ' +
          '`gstatic.com` CDN. Matches Figma node `4560:5177`.',
      },
    },
  },
  argTypes: {
    title:          { control: 'text' },
    variant:        { control: 'radio', options: ['choropleth', 'filled', 'outline'] },
    showColorScale: { control: 'boolean', description: 'Show colour gradient legend (choropleth only)' },
    loading:        { control: 'boolean' },
    empty:          { control: 'boolean' },
    dir:            { control: 'radio', options: ['ltr', 'rtl'] },
    data:           { control: false },
  },
  args: {
    title:          'Saudi Arabia — Population Distribution',
    data:           SAUDI_DATA,
    variant:        'choropleth',
    showColorScale: true,
    loading:        false,
    empty:          false,
    dir:            'ltr',
  },
};

/* ── Playground ─────────────────────────────────────────── */

export const Playground = {};

/* ── Choropleth — population ────────────────────────────── */

export const ChoroplethPopulation = {
  name: 'Choropleth — Population (thousands)',
  parameters: { design: { type: 'figma', url: FIGMA_URL } },
  args: {
    title:          'Saudi Arabia — Population by Region',
    data:           SAUDI_DATA,
    variant:        'choropleth',
    showColorScale: true,
  },
};

/* ── Choropleth — tourist visitors ─────────────────────── */

export const ChoroplethVisitors = {
  name: 'Choropleth — Tourist Visitors',
  parameters: { design: { type: 'figma', url: FIGMA_URL } },
  args: {
    title:          'Saudi Arabia — Tourist Arrivals by Region',
    data:           SAUDI_DATA_VISITORS,
    variant:        'choropleth',
    showColorScale: true,
  },
};

/* ── Partial data ───────────────────────────────────────── */

export const PartialData = {
  name: 'Partial Data — Some Regions Empty',
  args: {
    title:          'Coverage Map',
    data:           PARTIAL_DATA,
    variant:        'choropleth',
    showColorScale: true,
  },
};

/* ── RTL — Arabic ───────────────────────────────────────── */

export const RTLArabic = {
  name: 'RTL — Arabic',
  args: {
    title:          'المملكة العربية السعودية — توزيع السكان',
    data:           SAUDI_DATA,
    variant:        'choropleth',
    showColorScale: true,
    dir:            'rtl',
  },
};

/* ── Filled (Figma 4560:5176) ───────────────────────────── */

export const FigmaFilled = {
  name: 'Figma — Filled (4560:5176)',
  parameters: { design: { type: 'figma', url: FIGMA_FILLED } },
  args: {
    title:          'Saudi Arabia',
    data:           [],
    variant:        'filled',
    showColorScale: false,
  },
};

/* ── Outline (Figma 4560:5175) ──────────────────────────── */

export const FigmaOutline = {
  name: 'Figma — Outline (4560:5175)',
  parameters: { design: { type: 'figma', url: FIGMA_OUTLINE } },
  args: {
    title:          'Saudi Arabia',
    data:           [],
    variant:        'outline',
    showColorScale: false,
  },
};

/* ── Loading state ──────────────────────────────────────── */

export const LoadingState = {
  name: 'Loading State',
  args: { title: 'Saudi Arabia', data: [], loading: true },
};

/* ── Empty state ────────────────────────────────────────── */

export const EmptyStateStory = {
  name: 'Empty State',
  args: { title: 'Saudi Arabia', data: [], empty: true },
};
