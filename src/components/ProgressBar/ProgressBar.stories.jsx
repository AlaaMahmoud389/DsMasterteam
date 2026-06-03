import { ProgressBar } from './ProgressBar';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4399-20639&t=fWTlS4h9RZJZvHwC-4';

export default {
  title: 'Components/Progress Bar/Progress Line',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress percentage 0–100',
      table: { defaultValue: { summary: '20' } },
    },
    size: {
      control: 'select',
      options: ['Small', 'Medium', 'Large'],
      description: 'Bar height — Small 4px · Medium 8px · Large 12px',
      table: { defaultValue: { summary: 'Medium' } },
    },
    variant: {
      control: 'select',
      options: ['Primary', 'Neutral'],
      description: 'Color palette — Primary (green) · Neutral (navy)',
      table: { defaultValue: { summary: 'Primary' } },
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'error'],
      description: 'State — controls fill color and helper icon/text',
      table: { defaultValue: { summary: 'default' } },
    },
    label: {
      control: 'text',
      description: 'Label text above the bar',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the bar (overridden by "Success"/"Error" when status set)',
    },
    showLabel: {
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    showHelperText: {
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    rtl: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    value:          20,
    size:           'Medium',
    variant:        'Primary',
    status:         'default',
    label:          'Label',
    helperText:     'Help Text',
    showLabel:      true,
    showHelperText: true,
    rtl:            false,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const Playground = {};

/* ── Variant stories ─────────────────────────────────────────── */

export const PrimaryDefault = {
  name: 'Primary — In Progress',
  args: { variant: 'Primary', value: 50, status: 'default' },
};

export const PrimarySuccess = {
  name: 'Primary — Success',
  args: { variant: 'Primary', value: 100, status: 'success' },
};

export const PrimaryError = {
  name: 'Primary — Error',
  args: { variant: 'Primary', value: 0, status: 'error' },
};

export const NeutralDefault = {
  name: 'Neutral — In Progress',
  args: { variant: 'Neutral', value: 50, status: 'default' },
};

export const NeutralSuccess = {
  name: 'Neutral — Success',
  args: { variant: 'Neutral', value: 100, status: 'success' },
};

export const NeutralError = {
  name: 'Neutral — Error',
  args: { variant: 'Neutral', value: 0, status: 'error' },
};

/* ── Size stories ────────────────────────────────────────────── */

export const Small = {
  name: 'Small (4 px)',
  args: { size: 'Small', value: 40 },
};

export const Medium = {
  name: 'Medium (8 px)',
  args: { size: 'Medium', value: 40 },
};

export const Large = {
  name: 'Large (12 px)',
  args: { size: 'Large', value: 40 },
};

/* ── No label / helper ───────────────────────────────────────── */

export const NoLabel = {
  name: 'No Label',
  args: { showLabel: false, value: 60 },
};

export const NoHelperText = {
  name: 'No Helper Text',
  args: { showHelperText: false, value: 60 },
};

export const Minimal = {
  name: 'Minimal (bar only)',
  args: { showLabel: false, showHelperText: false, value: 60 },
};

/* ── RTL ─────────────────────────────────────────────────────── */

export const RTLArabic = {
  name: 'RTL Arabic',
  args: {
    rtl:        true,
    label:      'عنوان',
    helperText: 'نص مساعد',
    value:      50,
  },
};

/* ── All sizes + variants ────────────────────────────────────── */

export const AllSizesAndVariants = {
  name: 'All Sizes × Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 360 }}>
      {['Small', 'Medium', 'Large'].map(size => (
        <div key={size}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#6b7280', marginBottom: 12, letterSpacing: '.08em' }}>{size}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ProgressBar size={size} variant="Primary" value={60} label="Primary — 60%" />
            <ProgressBar size={size} variant="Neutral" value={40} label="Neutral — 40%" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 360 }}>
      <ProgressBar value={30}  status="default" label="In Progress — 30%" helperText="Uploading files…" />
      <ProgressBar value={70}  status="default" label="In Progress — 70%" helperText="Almost done…" />
      <ProgressBar value={100} status="success" label="Complete — 100%" />
      <ProgressBar value={0}   status="error"   label="Failed — 0%" />
      <ProgressBar value={35}  variant="Neutral" status="default" label="Neutral — 35%" />
      <ProgressBar value={100} variant="Neutral" status="success" label="Neutral — Success" />
      <ProgressBar value={0}   variant="Neutral" status="error"   label="Neutral — Error" />
    </div>
  ),
};
