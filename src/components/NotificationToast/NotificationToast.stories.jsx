import { NotificationToast } from './NotificationToast';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4399-21638&t=fWTlS4h9RZJZvHwC-4';

export default {
  title: 'Components/Notification Toast',
  component: NotificationToast,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    variant: {
      control: 'select',
      options: ['Neutral', 'Info', 'Critical/Error', 'Warning', 'Success'],
      description: 'Visual type — maps to Figma "type" prop',
      table: { defaultValue: { summary: 'Neutral' } },
    },
    closeButton: {
      control: 'boolean',
      description: 'Show × dismiss button',
      table: { defaultValue: { summary: 'true' } },
    },
    actions: {
      control: 'boolean',
      description: 'Show two action buttons',
      table: { defaultValue: { summary: 'false' } },
    },
    helperText: {
      control: 'boolean',
      description: 'Show secondary description text',
      table: { defaultValue: { summary: 'true' } },
    },
    mobile: {
      control: 'boolean',
      description: '343px mobile card width vs 484px desktop',
      table: { defaultValue: { summary: 'false' } },
    },
    rtl: {
      control: 'boolean',
      description: 'Right-to-left layout for Arabic',
      table: { defaultValue: { summary: 'false' } },
    },
    title: {
      control: 'text',
      description: 'Main title text (semibold)',
    },
    description: {
      control: 'text',
      description: 'Secondary helper/description text',
    },
    action1Label: { control: 'text', description: 'Label for action button 1' },
    action2Label: { control: 'text', description: 'Label for action button 2' },
    onDismiss:  { action: 'dismissed' },
    onAction1:  { action: 'action1-clicked' },
    onAction2:  { action: 'action2-clicked' },
  },
  args: {
    variant:      'Neutral',
    closeButton:  true,
    actions:      false,
    helperText:   true,
    mobile:       false,
    rtl:          false,
    title:        'Notification/Alert message title',
    description:  'When a Notification/Alert needs a further detailed explanation, it goes here.',
    action1Label: 'Action',
    action2Label: 'Action',
  },
};

export const Playground = {};

export const Neutral = {
  name: 'Neutral',
  args: { variant: 'Neutral' },
};

export const Info = {
  name: 'Info',
  args: { variant: 'Info' },
};

export const CriticalError = {
  name: 'Critical / Error',
  args: { variant: 'Critical/Error' },
};

export const Warning = {
  name: 'Warning',
  args: { variant: 'Warning' },
};

export const Success = {
  name: 'Success',
  args: { variant: 'Success' },
};

export const WithActions = {
  name: 'With Actions',
  args: { variant: 'Info', actions: true },
};

export const NoHelperText = {
  name: 'No Helper Text',
  args: { variant: 'Warning', helperText: false },
};

export const Mobile = {
  name: 'Mobile',
  args: { variant: 'Critical/Error', mobile: true },
};

export const MobileWithActions = {
  name: 'Mobile + Actions',
  args: { variant: 'Success', mobile: true, actions: true },
};

export const RTLArabic = {
  name: 'RTL Arabic',
  args: {
    variant:     'Critical/Error',
    rtl:         true,
    title:       'عنوان رسالة الاشعار أو التنبيه',
    description: 'يكتب المحتوى الإضافي هنا في حال ان رسالة الاشعار أو التنبيه تحتاج الى شرح أو تفصيل.',
  },
};

export const RTLArabicWithActions = {
  name: 'RTL Arabic + Actions',
  args: {
    variant:      'Warning',
    rtl:          true,
    actions:      true,
    title:        'عنوان رسالة الاشعار أو التنبيه',
    description:  'يكتب المحتوى الإضافي هنا في حال ان رسالة الاشعار أو التنبيه تحتاج الى شرح أو تفصيل.',
    action1Label: 'إجراء',
    action2Label: 'إجراء',
  },
};

export const AllVariants = {
  name: 'All Variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      {['Neutral', 'Info', 'Critical/Error', 'Warning', 'Success'].map((v) => (
        <NotificationToast key={v} {...args} variant={v} />
      ))}
    </div>
  ),
};
