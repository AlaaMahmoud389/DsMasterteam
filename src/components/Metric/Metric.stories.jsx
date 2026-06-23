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

const BG = '#f0f2f5';
const LABEL = {
  fontSize: 10,
  fontWeight: 700,
  color: '#9ca3af',
  letterSpacing: '.08em',
  textTransform: 'uppercase',
  marginBottom: 12,
};

/* Scrollable row — matches Figma side-by-side reference */
const Row = ({ children, pad = 32 }) => (
  <div style={{ overflowX: 'auto', background: BG, padding: pad }}>
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', width: 'max-content' }}>
      {children}
    </div>
  </div>
);

/* Wrapping grid — for larger sets (chart type / trend grids) */
const Grid = ({ children }) => (
  <div style={{ background: BG, padding: 32 }}>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
      {children}
    </div>
  </div>
);

const Card = ({ label, children }) => (
  <div style={{ width: 360, flexShrink: 0 }}>
    {label && <div style={LABEL}>{label}</div>}
    {children}
  </div>
);

// ─── 1. Interactive (Controls) ───────────────────────────────────────────────
export const Default = {
  name: 'Interactive (Controls)',
  args: BASE,
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 32, background: BG }}>
      <Metric {...args} />
    </div>
  ),
};

// ─── 2. All Variants — matches the Figma 4-card reference ───────────────────
export const AllVariants = {
  name: 'All Variants — Figma Reference',
  render: () => (
    <Row>
      <Card label="Large Chart — LTR"><Metric {...BASE} variant="Large Chart" rtl={false} /></Card>
      <Card label="Small Chart — LTR"><Metric {...BASE} variant="Small Chart" rtl={false} /></Card>
      <Card label="Small Chart — RTL"><Metric {...BASE} variant="Small Chart" rtl /></Card>
      <Card label="Large Chart — RTL"><Metric {...BASE} variant="Large Chart" rtl /></Card>
    </Row>
  ),
};

// ─── 3. Small Chart — LTR ───────────────────────────────────────────────────
export const SmallChartLTR = {
  name: 'Small Chart — LTR',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 32, background: BG }}>
      <Metric {...BASE} variant="Small Chart" rtl={false} />
    </div>
  ),
};

// ─── 4. Small Chart — RTL ───────────────────────────────────────────────────
export const SmallChartRTL = {
  name: 'Small Chart — RTL',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 32, background: BG }}>
      <Metric {...BASE} variant="Small Chart" rtl />
    </div>
  ),
};

// ─── 5. Large Chart — LTR ───────────────────────────────────────────────────
export const LargeChartLTR = {
  name: 'Large Chart — LTR',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 32, background: BG }}>
      <Metric {...BASE} variant="Large Chart" rtl={false} />
    </div>
  ),
};

// ─── 6. Large Chart — RTL ───────────────────────────────────────────────────
export const LargeChartRTL = {
  name: 'Large Chart — RTL',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 32, background: BG }}>
      <Metric {...BASE} variant="Large Chart" rtl />
    </div>
  ),
};

// ─── 7. Trend — Positive vs Negative ────────────────────────────────────────
export const TrendStates = {
  name: 'Trend — Positive & Negative',
  render: () => (
    <Grid>
      {['Realistic', 'Wavy', 'Straight', 'Layers'].flatMap(ct => [
        <Card key={ct + '-pos'} label={`${ct} — Positive`}>
          <Metric {...BASE} variant="Small Chart" chartType={ct} trend="Positive" />
        </Card>,
        <Card key={ct + '-neg'} label={`${ct} — Negative`}>
          <Metric {...BASE} variant="Small Chart" chartType={ct} trend="Negative" />
        </Card>,
      ])}
    </Grid>
  ),
};

// ─── 8. Chart Types — Small ──────────────────────────────────────────────────
export const ChartTypesSmall = {
  name: 'Chart Types — Small',
  render: () => (
    <Grid>
      {['Realistic', 'Wavy', 'Straight', 'Layers'].flatMap(ct => [
        <Card key={ct + '-pos'} label={`${ct} / Positive`}>
          <Metric {...BASE} variant="Small Chart" chartType={ct} trend="Positive" />
        </Card>,
        <Card key={ct + '-neg'} label={`${ct} / Negative`}>
          <Metric {...BASE} variant="Small Chart" chartType={ct} trend="Negative" />
        </Card>,
      ])}
    </Grid>
  ),
};

// ─── 9. Chart Types — Large ──────────────────────────────────────────────────
export const ChartTypesLarge = {
  name: 'Chart Types — Large',
  render: () => (
    <Grid>
      {['Realistic', 'Wavy', 'Straight', 'Layers'].flatMap(ct => [
        <Card key={ct + '-pos'} label={`${ct} / Positive`}>
          <Metric {...BASE} variant="Large Chart" chartType={ct} trend="Positive" />
        </Card>,
        <Card key={ct + '-neg'} label={`${ct} / Negative`}>
          <Metric {...BASE} variant="Large Chart" chartType={ct} trend="Negative" />
        </Card>,
      ])}
    </Grid>
  ),
};

// ─── 10. Change Badge Types ───────────────────────────────────────────────────
export const ChangeBadgeTypes = {
  name: 'Change Badge — Type 01 vs 02',
  render: () => (
    <Row>
      <Card label="Type 01 — Positive"><Metric {...BASE} changeType="01" trend="Positive" /></Card>
      <Card label="Type 01 — Negative"><Metric {...BASE} changeType="01" trend="Negative" /></Card>
      <Card label="Type 02 — Positive"><Metric {...BASE} changeType="02" trend="Positive" /></Card>
      <Card label="Type 02 — Negative"><Metric {...BASE} changeType="02" trend="Negative" /></Card>
    </Row>
  ),
};

// ─── 11. Marker On / Off ─────────────────────────────────────────────────────
export const MarkerStates = {
  name: 'Marker — On & Off',
  render: () => (
    <Row>
      <Card label="With Marker"><Metric {...BASE} showMarker={true} /></Card>
      <Card label="Without Marker"><Metric {...BASE} showMarker={false} /></Card>
    </Row>
  ),
};

// ─── 12. Toggle States ────────────────────────────────────────────────────────
export const ToggleStates = {
  name: 'Toggle States',
  render: () => (
    <Grid>
      <Card label="No Actions">         <Metric {...BASE} showActions={false} /></Card>
      <Card label="No Change Badge">    <Metric {...BASE} showChange={false} /></Card>
      <Card label="No Chart">           <Metric {...BASE} showChart={false} /></Card>
      <Card label="No Featured Icon">   <Metric {...BASE} showFeaturedIcon={false} /></Card>
      <Card label="No Info Section">    <Metric {...BASE} showInfo={false} /></Card>
      <Card label="No Secondary Action"><Metric {...BASE} showSecondaryAction={false} /></Card>
    </Grid>
  ),
};

// ─── 13. RTL — All Chart Types ────────────────────────────────────────────────
export const RTLAllTypes = {
  name: 'RTL — All Chart Types',
  render: () => (
    <Grid>
      {['Realistic', 'Wavy', 'Straight', 'Layers'].flatMap(ct => [
        <Card key={ct + '-pos'} label={`${ct} / Positive (RTL)`}>
          <Metric {...BASE} variant="Small Chart" rtl chartType={ct} trend="Positive" />
        </Card>,
        <Card key={ct + '-neg'} label={`${ct} / Negative (RTL)`}>
          <Metric {...BASE} variant="Small Chart" rtl chartType={ct} trend="Negative" />
        </Card>,
      ])}
    </Grid>
  ),
};
