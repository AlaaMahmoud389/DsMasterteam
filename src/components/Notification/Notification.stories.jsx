import { Notification } from './Notification';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4399-21418&t=fWTlS4h9RZJZvHwC-4';

export default {
  title: 'Components/Notification',
  component: Notification,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    variant: {
      control: 'select',
      options: ['Critical', 'Warning', 'Success', 'Info', 'Neutral'],
      description: 'Visual style — maps to Figma "style" prop',
      table: { defaultValue: { summary: 'Critical' } },
    },
    dismissible: {
      control: 'boolean',
      description: 'Show the × close button',
      table: { defaultValue: { summary: 'true' } },
    },
    rtl: {
      control: 'boolean',
      description: 'Right-to-left layout for Arabic content',
      table: { defaultValue: { summary: 'false' } },
    },
    title: {
      control: 'text',
      description: 'Bold label prefix (e.g. "Important:")',
    },
    message: {
      control: 'text',
      description: 'Body message text',
    },
    onDismiss: { action: 'dismissed' },
  },
  args: {
    variant:    'Critical',
    dismissible: true,
    rtl:        false,
    title:      'Important:',
    message:    'This is a very important banner message that requires attention.',
  },
};

export const Playground = {};

export const Critical = {
  name: 'Critical',
  args: { variant: 'Critical' },
};

export const Warning = {
  name: 'Warning',
  args: { variant: 'Warning' },
};

export const Success = {
  name: 'Success',
  args: { variant: 'Success' },
};

export const Info = {
  name: 'Info',
  args: { variant: 'Info' },
};

export const Neutral = {
  name: 'Neutral',
  args: { variant: 'Neutral' },
};

export const NonDismissible = {
  name: 'Non-Dismissible',
  args: { variant: 'Info', dismissible: false },
};

export const RTLArabic = {
  name: 'RTL Arabic',
  args: {
    variant:    'Critical',
    rtl:        true,
    title:      'مهم:',
    message:    'هذه رسالة تنبيهية مهمة للغاية تستدعي التركيز.',
  },
};

export const AllVariants = {
  name: 'All Variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {['Critical', 'Warning', 'Success', 'Info', 'Neutral'].map((v) => (
        <Notification key={v} {...args} variant={v} />
      ))}
    </div>
  ),
};
