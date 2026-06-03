import { Metric } from './Metric';

export default {
  title: 'Components/Metric',
  component: Metric,
  parameters: { layout: 'padded' },
  argTypes: {
    variant:             { control: { type: 'radio' }, options: ['Small Chart', 'Large Chart'] },
    chartType:           { control: { type: 'radio' }, options: ['Realistic', 'Wavy', 'Straight', 'Layers'] },
    trend:               { control: { type: 'radio' }, options: ['Positive', 'Negative'] },
    changeType:          { control: { type: 'radio' }, options: ['01', '02'] },
    rtl:                 { control: 'boolean' },
    showMarker:          { control: 'boolean' },
    labelEn:             { control: 'text' },
    labelAr:             { control: 'text' },
    percentage:          { control: 'text' },
    changePct:           { control: 'text' },
    textEn:              { control: 'text' },
    textAr:              { control: 'text' },
    showActions:         { control: 'boolean' },
    showChange:          { control: 'boolean' },
    showChart:           { control: 'boolean' },
    showFeaturedIcon:    { control: 'boolean' },
    showInfo:            { control: 'boolean' },
    showSecondaryAction: { control: 'boolean' },
    showText:            { control: 'boolean' },
  },
};

const BASE = {
  variant: 'Small Chart',
  rtl: false,
  labelEn: '24h Views',
  labelAr: 'المشاهدات خلال 24س',
  percentage: '50%',
  changePct: '100%',
  textEn: 'vs last month',
  textAr: 'مقارنة بالشهر الماضي',
  showActions: true,
  showChange: true,
  showChart: true,
  showFeaturedIcon: true,
  showInfo: true,
  showSecondaryAction: true,
  showText: true,
  chartType: 'Realistic',
  trend: 'Positive',
  changeType: '01',
  showMarker: true,
};

const WRAP = (style, children) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, padding: 32, background: '#f8fafc', alignItems: 'flex-start', ...style }}>
    {children}
  </div>
);
const LABEL = { fontSize: 10, fontWeight: 700, color: '#d1d5db', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 12 };

// ─── 1. Interactive (Controls) ───────────────────────────────────────────────
export const Default = {
  name: 'Interactive (Controls)',
  args: BASE,
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: 32, background: '#f8fafc', minHeight: '100vh' }}>
      <Metric {...args} />
    </div>
  ),
};

// ─── 2. All Variants (Figma Reference) ──────────────────────────────────────
export const AllVariants = {
  name: 'All Variants — Figma Reference',
  render: () => WRAP({}, [
    ['Small Chart LTR', { variant: 'Small Chart', rtl: false }],
    ['Large Chart LTR', { variant: 'Large Chart', rtl: false }],
    ['Small Chart RTL', { variant: 'Small Chart', rtl: true }],
    ['Large Chart RTL', { variant: 'Large Chart', rtl: true }],
  ].map(([lbl, p]) => (
    <div key={lbl}>
      <div style={LABEL}>{lbl}</div>
      <Metric {...BASE} {...p} />
    </div>
  ))),
};

// ─── 3. Small Chart — LTR ───────────────────────────────────────────────────
export const SmallChartLTR = {
  name: 'Small Chart — LTR',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 32, background: '#f8fafc' }}>
      <Metric {...BASE} variant="Small Chart" rtl={false} />
    </div>
  ),
};

// ─── 4. Small Chart — RTL ───────────────────────────────────────────────────
export const SmallChartRTL = {
  name: 'Small Chart — RTL',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 32, background: '#f8fafc' }}>
      <Metric {...BASE} variant="Small Chart" rtl />
    </div>
  ),
};

// ─── 5. Large Chart — LTR ───────────────────────────────────────────────────
export const LargeChartLTR = {
  name: 'Large Chart — LTR',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 32, background: '#f8fafc' }}>
      <Metric {...BASE} variant="Large Chart" rtl={false} />
    </div>
  ),
};

// ─── 6. Large Chart — RTL ───────────────────────────────────────────────────
export const LargeChartRTL = {
  name: 'Large Chart — RTL',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 32, background: '#f8fafc' }}>
      <Metric {...BASE} variant="Large Chart" rtl />
    </div>
  ),
};

// ─── 7. Trend — Positive vs Negative ────────────────────────────────────────
export const TrendStates = {
  name: 'Trend — Positive & Negative',
  render: () => WRAP({}, [
    ['Realistic — Positive', { chartType: 'Realistic', trend: 'Positive' }],
    ['Realistic — Negative', { chartType: 'Realistic', trend: 'Negative' }],
    ['Wavy — Positive',      { chartType: 'Wavy',      trend: 'Positive' }],
    ['Wavy — Negative',      { chartType: 'Wavy',      trend: 'Negative' }],
    ['Straight — Positive',  { chartType: 'Straight',  trend: 'Positive' }],
    ['Straight — Negative',  { chartType: 'Straight',  trend: 'Negative' }],
    ['Layers — Positive',    { chartType: 'Layers',    trend: 'Positive' }],
    ['Layers — Negative',    { chartType: 'Layers',    trend: 'Negative' }],
  ].map(([lbl, p]) => (
    <div key={lbl}>
      <div style={LABEL}>{lbl}</div>
      <Metric {...BASE} variant="Small Chart" rtl={false} {...p} />
    </div>
  ))),
};

// ─── 8. Chart Types — Small ──────────────────────────────────────────────────
export const ChartTypesSmall = {
  name: 'Chart Types — Small',
  render: () => WRAP({}, ['Realistic','Wavy','Straight','Layers'].flatMap(ct => [
    <div key={ct + '-pos'}>
      <div style={LABEL}>{ct} / Positive</div>
      <Metric {...BASE} variant="Small Chart" chartType={ct} trend="Positive" />
    </div>,
    <div key={ct + '-neg'}>
      <div style={LABEL}>{ct} / Negative</div>
      <Metric {...BASE} variant="Small Chart" chartType={ct} trend="Negative" />
    </div>,
  ])),
};

// ─── 9. Chart Types — Large ──────────────────────────────────────────────────
export const ChartTypesLarge = {
  name: 'Chart Types — Large',
  render: () => WRAP({}, ['Realistic','Wavy','Straight','Layers'].flatMap(ct => [
    <div key={ct + '-pos'}>
      <div style={LABEL}>{ct} / Positive</div>
      <Metric {...BASE} variant="Large Chart" chartType={ct} trend="Positive" />
    </div>,
    <div key={ct + '-neg'}>
      <div style={LABEL}>{ct} / Negative</div>
      <Metric {...BASE} variant="Large Chart" chartType={ct} trend="Negative" />
    </div>,
  ])),
};

// ─── 10. Change Badge Types ───────────────────────────────────────────────────
export const ChangeBadgeTypes = {
  name: 'Change Badge — Type 01 vs 02',
  render: () => WRAP({}, [
    ['Type 01 — Positive', { changeType: '01', trend: 'Positive' }],
    ['Type 01 — Negative', { changeType: '01', trend: 'Negative' }],
    ['Type 02 — Positive', { changeType: '02', trend: 'Positive' }],
    ['Type 02 — Negative', { changeType: '02', trend: 'Negative' }],
  ].map(([lbl, p]) => (
    <div key={lbl}>
      <div style={LABEL}>{lbl}</div>
      <Metric {...BASE} variant="Small Chart" rtl={false} {...p} />
    </div>
  ))),
};

// ─── 11. Marker On / Off ─────────────────────────────────────────────────────
export const MarkerStates = {
  name: 'Marker — On & Off',
  render: () => WRAP({}, [
    ['With Marker',    { showMarker: true }],
    ['Without Marker', { showMarker: false }],
  ].map(([lbl, p]) => (
    <div key={lbl}>
      <div style={LABEL}>{lbl}</div>
      <Metric {...BASE} variant="Small Chart" rtl={false} {...p} />
    </div>
  ))),
};

// ─── 12. Toggle States ────────────────────────────────────────────────────────
export const ToggleStates = {
  name: 'Toggle States',
  render: () => WRAP({}, [
    { label: 'No Actions',          props: { showActions: false } },
    { label: 'No Change Badge',     props: { showChange: false } },
    { label: 'No Chart',            props: { showChart: false } },
    { label: 'No Featured Icon',    props: { showFeaturedIcon: false } },
    { label: 'No Info Section',     props: { showInfo: false } },
    { label: 'No Secondary Action', props: { showSecondaryAction: false } },
  ].map(({ label, props }) => (
    <div key={label}>
      <div style={LABEL}>{label}</div>
      <Metric {...BASE} variant="Small Chart" rtl={false} {...props} />
    </div>
  ))),
};

// ─── 13. RTL — All Chart Types ────────────────────────────────────────────────
export const RTLAllTypes = {
  name: 'RTL — All Chart Types',
  render: () => WRAP({}, ['Realistic','Wavy','Straight','Layers'].flatMap(ct => [
    <div key={ct + '-pos'}>
      <div style={LABEL}>{ct} / Positive (RTL)</div>
      <Metric {...BASE} variant="Small Chart" rtl chartType={ct} trend="Positive" />
    </div>,
    <div key={ct + '-neg'}>
      <div style={LABEL}>{ct} / Negative (RTL)</div>
      <Metric {...BASE} variant="Small Chart" rtl chartType={ct} trend="Negative" />
    </div>,
  ])),
};
