import { MapChart } from './MapChart';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY';

const WORLD_DATA = [
  { id: 'NA',  value: 8420, label: 'North America' },
  { id: 'EU',  value: 6230, label: 'Europe' },
  { id: 'AS',  value: 9870, label: 'Asia' },
  { id: 'SA',  value: 3150, label: 'South America' },
  { id: 'AF',  value: 1980, label: 'Africa' },
  { id: 'ME',  value: 4560, label: 'Middle East' },
  { id: 'SEA', value: 5340, label: 'SE Asia' },
  { id: 'OC',  value: 1200, label: 'Oceania' },
];

const PARTIAL_DATA = [
  { id: 'EU',  value: 6230 },
  { id: 'AS',  value: 9870 },
  { id: 'NA',  value: 8420 },
  { id: 'ME',  value: 4560 },
];

export default {
  title: 'Components/Charts/Map Chart',
  component: MapChart,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  tags: [],
  argTypes: {
    title:          { control: 'text' },
    showColorScale: { control: 'boolean' },
    showLegend:     { control: 'boolean' },
    loading:        { control: 'boolean' },
    empty:          { control: 'boolean' },
    dir:            { control: 'select', options: ['ltr', 'rtl'] },
    data:           { control: false },
    regions:        { control: false },
  },
  args: {
    title: 'Global User Distribution', data: WORLD_DATA,
    showColorScale: true, showLegend: false, loading: false, empty: false, dir: 'ltr',
  },
};

export const Playground = {};

export const WorldMap = {
  name: 'World Regions',
  args: { title: 'Global User Distribution', data: WORLD_DATA, showColorScale: true },
};

export const WithLegend = {
  name: 'With Region Legend',
  args: { title: 'Global User Distribution', data: WORLD_DATA, showColorScale: true, showLegend: true },
};

export const PartialData = {
  name: 'Partial Data (Some Regions Empty)',
  args: { title: 'Coverage Map', data: PARTIAL_DATA, showColorScale: true, showLegend: true },
};

export const RTLArabic = {
  name: 'RTL Arabic',
  args: {
    title: 'التوزيع الجغرافي للمستخدمين',
    data: WORLD_DATA, showColorScale: true, showLegend: true, dir: 'rtl',
  },
};

export const LoadingState = {
  name: 'Loading State',
  args: { title: 'Global User Distribution', data: [], loading: true },
};

export const EmptyState = {
  name: 'Empty State',
  args: { title: 'Global User Distribution', data: [], empty: true },
};
