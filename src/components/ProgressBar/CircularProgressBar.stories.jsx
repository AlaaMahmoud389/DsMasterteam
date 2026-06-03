import { CircularProgressBar } from './CircularProgressBar';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4399-20424&t=fWTlS4h9RZJZvHwC-4';

export default {
  title: 'Components/Progress Bar/Circular',
  component: CircularProgressBar,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    size: {
      control: 'select',
      options: [64, 80, 120, 160, 200],
      description: 'Ring diameter in pixels',
      table: { defaultValue: { summary: '120' } },
    },
    variant: {
      control: 'select',
      options: ['Primary', 'Neutral', 'Success', 'Error'],
      description: 'Color style — Primary (green) · Neutral (navy) · Success · Error',
      table: { defaultValue: { summary: 'Primary' } },
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress 0–100. Ignored when variant is Success or Error (always shows full ring).',
      table: { defaultValue: { summary: '50' } },
    },
    showText: {
      control: 'boolean',
      description: 'Show percentage value or status icon in the center',
      table: { defaultValue: { summary: 'true' } },
    },
    label: {
      control: 'text',
      description: 'Descriptive label below the ring — only rendered for size ≥ 120',
    },
    rtl: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    size:     120,
    variant:  'Primary',
    value:    50,
    showText: true,
    label:    'Active users',
    rtl:      false,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, display: 'inline-block' }}>
        <Story />
      </div>
    ),
  ],
};

export const Playground = {};

/* ── Variant stories ─────────────────────────────────────────── */

export const PrimaryDefault = {
  name: 'Primary — 50%',
  args: { variant: 'Primary', value: 50, size: 120, label: 'Active users' },
};

export const NeutralDefault = {
  name: 'Neutral — 50%',
  args: { variant: 'Neutral', value: 50, size: 120, label: 'Active users' },
};

export const SuccessState = {
  name: 'Success',
  args: { variant: 'Success', size: 120, label: 'Task complete' },
};

export const ErrorState = {
  name: 'Error',
  args: { variant: 'Error', size: 120, label: 'Upload failed' },
};

/* ── Size stories ────────────────────────────────────────────── */

export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap' }}>
      {[64, 80, 120, 160, 200].map(s => (
        <CircularProgressBar
          key={s}
          size={s}
          variant="Primary"
          value={50}
          label={s >= 120 ? 'Active users' : ''}
        />
      ))}
    </div>
  ),
};

/* ── All variants ────────────────────────────────────────────── */

export const AllVariants = {
  name: 'All Variants (120 px)',
  render: () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <CircularProgressBar size={120} variant="Primary" value={50} label="Active users" />
      <CircularProgressBar size={120} variant="Neutral" value={50} label="Active users" />
      <CircularProgressBar size={120} variant="Success" label="Task complete" />
      <CircularProgressBar size={120} variant="Error"   label="Upload failed" />
    </div>
  ),
};

/* ── Full grid ───────────────────────────────────────────────── */

export const AllSizesAndVariants = {
  name: 'All Sizes × Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {[
        { variant: 'Primary', label: 'Active users' },
        { variant: 'Neutral', label: 'Active users' },
        { variant: 'Success', label: 'Task complete' },
        { variant: 'Error',   label: 'Upload failed' },
      ].map(({ variant, label }) => (
        <div key={variant}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#6b7280', marginBottom: 16, letterSpacing: '.08em' }}>{variant}</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap' }}>
            {[64, 80, 120, 160, 200].map(s => (
              <CircularProgressBar
                key={s}
                size={s}
                variant={variant}
                value={50}
                label={s >= 120 ? label : ''}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── RTL ─────────────────────────────────────────────────────── */

export const RTLArabic = {
  name: 'RTL Arabic',
  args: {
    rtl:     true,
    label:   'مستخدم نشط',
    value:   50,
    size:    120,
    variant: 'Primary',
  },
};

export const RTLAllVariants = {
  name: 'RTL — All Variants',
  render: () => (
    <div dir="rtl" style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <CircularProgressBar size={120} variant="Primary" value={50} label="مستخدم نشط" rtl />
      <CircularProgressBar size={120} variant="Neutral" value={50} label="مستخدم نشط" rtl />
      <CircularProgressBar size={120} variant="Success" label="مكتمل"                rtl />
      <CircularProgressBar size={120} variant="Error"   label="فشل التحميل"           rtl />
    </div>
  ),
};

/* ── Edge cases ──────────────────────────────────────────────── */

export const ZeroProgress = {
  name: '0% — Not started',
  args: { variant: 'Primary', value: 0, size: 120, label: 'Not started' },
};

export const FullProgress = {
  name: '100% — In Progress (not Success)',
  args: { variant: 'Primary', value: 100, size: 120, label: '100% complete' },
};

export const NoText = {
  name: 'No center text',
  args: { showText: false, value: 60, size: 120 },
};
