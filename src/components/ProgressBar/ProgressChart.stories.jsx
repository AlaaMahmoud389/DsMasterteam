import { ProgressChart } from './ProgressChart';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4531-5667&t=fWTlS4h9RZJZvHwC-4';

const DEFAULT_RINGS = [
  { label: 'Series 1', value: 75, color: '#1c3d8c' },
  { label: 'Series 2', value: 55, color: '#1849a9' },
  { label: 'Series 3', value: 35, color: '#4f83dd' },
];

const DEFAULT_LEGEND = [
  { label: 'Series 1', color: '#1c3d8c' },
  { label: 'Series 2', color: '#1849a9' },
  { label: 'Series 3', color: '#4f83dd' },
  { label: 'Series 4', color: '#7ca6e9' },
  { label: 'Series 5', color: '#aec8f2' },
  { label: 'Series 6', color: '#d5e5f9' },
];

export default {
  title: 'Components/Progress Bar/Progress Chart',
  component: ProgressChart,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    title:       { control: 'text' },
    showTitle:   { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    totalValue:  { control: 'text', description: 'Center big number text' },
    totalLabel:  { control: 'text', description: 'Center label text (shown when showLabel=true)' },
    showLabel:   { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    showLegend:  { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    rtl:         { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
  },
  args: {
    title:      'Card Title',
    showTitle:  true,
    totalValue: '1,000',
    totalLabel: 'Active Users',
    showLabel:  false,
    rings:      DEFAULT_RINGS,
    legend:     DEFAULT_LEGEND,
    showLegend: true,
    rtl:        false,
  },
};

export const Playground = {};

export const WithLabel = {
  name: 'With Center Label',
  args: { showLabel: true, totalLabel: 'Active Users' },
};

export const WithoutLegend = {
  name: 'No Legend',
  args: { showLegend: false },
};

export const WithoutTitle = {
  name: 'No Title',
  args: { showTitle: false },
};

export const LabelAndLegend = {
  name: 'Label + Legend',
  args: { showLabel: true, totalLabel: 'Active Users', showLegend: true },
};

export const LabelNoLegend = {
  name: 'Label, No Legend',
  args: { showLabel: true, totalLabel: 'Active Users', showLegend: false },
};

export const NoLabelNoLegend = {
  name: 'Minimal (no label, no legend)',
  args: { showLabel: false, showLegend: false, showTitle: false },
};

export const RTLArabic = {
  name: 'RTL Arabic',
  args: {
    rtl:        true,
    title:      'العنوان',
    totalValue: '١،٠٠٠',
    totalLabel: 'المستخدمون',
    showLabel:  true,
    legend: [
      { label: 'قيمة 1', color: '#1c3d8c' },
      { label: 'قيمة 2', color: '#1849a9' },
      { label: 'قيمة 3', color: '#4f83dd' },
      { label: 'قيمة 4', color: '#7ca6e9' },
      { label: 'قيمة 5', color: '#aec8f2' },
      { label: 'قيمة 6', color: '#d5e5f9' },
    ],
  },
};

export const AllStates = {
  name: 'All 4 States',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <ProgressChart showTitle={true} showLabel={false} showLegend={true}  title="Legend only"           totalValue="1,000" />
      <ProgressChart showTitle={true} showLabel={true}  showLegend={true}  title="Label + Legend"        totalValue="1,000" totalLabel="Active Users" />
      <ProgressChart showTitle={true} showLabel={false} showLegend={false} title="No Label, No Legend"   totalValue="1,000" />
      <ProgressChart showTitle={true} showLabel={true}  showLegend={false} title="Label only"            totalValue="1,000" totalLabel="Active Users" />
    </div>
  ),
};

export const AllStatesRTL = {
  name: 'All 4 States — RTL',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <ProgressChart rtl showTitle showLabel={false} showLegend={true}  title="العنوان" totalValue="١،٠٠٠"
        legend={[{label:'قيمة 1',color:'#1c3d8c'},{label:'قيمة 2',color:'#1849a9'},{label:'قيمة 3',color:'#4f83dd'},{label:'قيمة 4',color:'#7ca6e9'},{label:'قيمة 5',color:'#aec8f2'},{label:'قيمة 6',color:'#d5e5f9'}]} />
      <ProgressChart rtl showTitle showLabel={true}  showLegend={true}  title="العنوان" totalValue="١،٠٠٠" totalLabel="المستخدمون"
        legend={[{label:'قيمة 1',color:'#1c3d8c'},{label:'قيمة 2',color:'#1849a9'},{label:'قيمة 3',color:'#4f83dd'},{label:'قيمة 4',color:'#7ca6e9'},{label:'قيمة 5',color:'#aec8f2'},{label:'قيمة 6',color:'#d5e5f9'}]} />
      <ProgressChart rtl showTitle showLabel={false} showLegend={false} title="العنوان" totalValue="١،٠٠٠" />
      <ProgressChart rtl showTitle showLabel={true}  showLegend={false} title="العنوان" totalValue="١،٠٠٠" totalLabel="المستخدمون" />
    </div>
  ),
};
