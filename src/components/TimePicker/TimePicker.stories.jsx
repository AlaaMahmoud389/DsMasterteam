import { TimePicker } from './TimePicker';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4770-12915&t=ohnsyAtOEvJbxf9o-4';

export default {
  title: 'Components/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    type: {
      control: 'select',
      options: ['Stepper', 'Dropdown', 'Input', 'Timer'],
      description: 'Visual interaction pattern for selecting time',
      table: { defaultValue: { summary: 'Stepper' } },
    },
    hours: {
      control: 'text',
      description: 'Initial hours value (0–11)',
      table: { defaultValue: { summary: '00' } },
    },
    minutes: {
      control: 'text',
      description: 'Initial minutes value (0–59)',
      table: { defaultValue: { summary: '00' } },
    },
    seconds: {
      control: 'text',
      description: 'Initial seconds value (0–59)',
      table: { defaultValue: { summary: '00' } },
    },
    period: {
      control: 'radio',
      options: ['AM', 'PM'],
      description: 'Initial AM / PM selection',
      table: { defaultValue: { summary: 'AM' } },
    },
    showSeconds: {
      control: 'boolean',
      description: 'Display the seconds unit',
      table: { defaultValue: { summary: 'true' } },
    },
    rtl: {
      control: 'boolean',
      description: 'Right-to-left layout for Arabic / Hebrew',
      table: { defaultValue: { summary: 'false' } },
    },
    typing: {
      control: 'boolean',
      description: 'Show blinking cursor — Input type only',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    type:        'Stepper',
    hours:       '00',
    minutes:     '00',
    seconds:     '00',
    period:      'AM',
    showSeconds: true,
    rtl:         false,
    typing:      false,
  },
};

/* ── Playground ───────────────────────────────────────────────── */

export const Playground = {};

/* ── Stepper ──────────────────────────────────────────────────── */

export const StepperAM = {
  name: 'Stepper — AM',
  args: { type: 'Stepper', period: 'AM' },
};

export const StepperPM = {
  name: 'Stepper — PM',
  args: { type: 'Stepper', period: 'PM' },
};

/* ── Dropdown ─────────────────────────────────────────────────── */

export const DropdownAM = {
  name: 'Dropdown — AM',
  args: { type: 'Dropdown', period: 'AM' },
};

export const DropdownPM = {
  name: 'Dropdown — PM',
  args: { type: 'Dropdown', period: 'PM' },
};

/* ── Input ────────────────────────────────────────────────────── */

export const InputAM = {
  name: 'Input — AM',
  args: { type: 'Input', period: 'AM' },
};

export const InputPM = {
  name: 'Input — PM',
  args: { type: 'Input', period: 'PM' },
};

export const InputTyping = {
  name: 'Input — Typing',
  args: { type: 'Input', typing: true, hours: '09', minutes: '30' },
};

/* ── Timer ────────────────────────────────────────────────────── */

export const TimerAM = {
  name: 'Timer — AM',
  args: { type: 'Timer', period: 'AM' },
};

export const TimerPM = {
  name: 'Timer — PM',
  args: { type: 'Timer', period: 'PM' },
};

/* ── Variations ───────────────────────────────────────────────── */

export const WithoutSeconds = {
  name: 'Without Seconds',
  args: { showSeconds: false },
};

export const RTLArabic = {
  name: 'RTL Arabic',
  args: { rtl: true, type: 'Stepper' },
};

/* ── All types grid ───────────────────────────────────────────── */

export const AllTypes = {
  name: 'All Types',
  render: (args) => {
    const label = (text) => (
      <span style={{
        fontSize: 11, fontWeight: 600, color: '#6b7280',
        textTransform: 'uppercase', letterSpacing: '0.05em',
        fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
        marginBottom: 6, display: 'block',
      }}>
        {text}
      </span>
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'flex-start' }}>
        <div>{label('Stepper')}  <TimePicker {...args} type="Stepper"  /></div>
        <div>{label('Dropdown')} <TimePicker {...args} type="Dropdown" /></div>
        <div>{label('Input')}    <TimePicker {...args} type="Input"    /></div>
        <div>{label('Timer')}    <TimePicker {...args} type="Timer"    /></div>
      </div>
    );
  },
};

/* ── AM vs PM comparison ──────────────────────────────────────── */

export const AMvsPM = {
  name: 'AM vs PM',
  render: (args) => {
    const row = (type) => (
      <div key={type} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{
          fontSize: 11, fontWeight: 600, color: '#6b7280',
          textTransform: 'uppercase', letterSpacing: '0.05em',
          fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
        }}>
          {type}
        </span>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <TimePicker {...args} type={type} period="AM" />
          <TimePicker {...args} type={type} period="PM" />
        </div>
      </div>
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {['Stepper', 'Dropdown', 'Input', 'Timer'].map(row)}
      </div>
    );
  },
};
