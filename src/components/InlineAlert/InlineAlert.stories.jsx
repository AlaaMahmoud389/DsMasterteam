import { fn } from 'storybook/test';
import { InlineAlert } from './InlineAlert';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4383-103202';

export default {
  title: 'Components/InlineAlert',
  component: InlineAlert,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'destructive'],
      description: 'Alert severity — controls color palette, icon, and accent color',
      table: { defaultValue: { summary: 'info' } },
    },
    mobile: {
      control: 'boolean',
      description: 'Mobile layout (compact 343 px card with horizontal top accent) vs desktop (full-width bar with vertical side accent)',
      table: { defaultValue: { summary: 'false' } },
    },
    rtl: {
      control: 'boolean',
      description: 'Right-to-left layout for Arabic content',
      table: { defaultValue: { summary: 'false' } },
    },
    dismissible: {
      control: 'boolean',
      description: 'Show the × close button',
      table: { defaultValue: { summary: 'true' } },
    },
    showDescription: {
      control: 'boolean',
      description: 'Show the supporting description paragraph below the title',
      table: { defaultValue: { summary: 'true' } },
    },
    showActions: {
      control: 'boolean',
      description: 'Show the two action buttons below the text',
      table: { defaultValue: { summary: 'false' } },
    },
    title: {
      control: 'text',
      description: 'Bold alert title',
    },
    description: {
      control: 'text',
      description: 'Supporting description text',
    },
    primaryActionLabel: {
      control: 'text',
      description: 'Primary action button label (colored text)',
    },
    secondaryActionLabel: {
      control: 'text',
      description: 'Secondary action button label (neutral text)',
    },
    onClose:           { action: 'closed' },
    onPrimaryAction:   { action: 'primaryAction' },
    onSecondaryAction: { action: 'secondaryAction' },
  },
  args: {
    type: 'info',
    mobile: false,
    rtl: false,
    dismissible: true,
    showDescription: true,
    showActions: false,
    title: 'Notification/Alert message title',
    description: 'When a Notification/Alert needs a further detailed explanation, it goes here.',
    primaryActionLabel: 'Button',
    secondaryActionLabel: 'Button',
    onClose: fn(),
    onPrimaryAction: fn(),
    onSecondaryAction: fn(),
  },
};

/* ── Stories ─────────────────────────────────────────────── */

export const Playground = {};

export const Info = {
  name: 'Info',
  args: { type: 'info' },
};

export const Success = {
  name: 'Success',
  args: { type: 'success' },
};

export const Warning = {
  name: 'Warning',
  args: { type: 'warning' },
};

export const Destructive = {
  name: 'Destructive',
  args: { type: 'destructive' },
};

export const WithActions = {
  name: 'With Actions',
  args: { type: 'info', showActions: true },
};

export const TitleOnly = {
  name: 'Title Only (no description)',
  args: { type: 'warning', showDescription: false },
};

export const NonDismissible = {
  name: 'Non-Dismissible',
  args: { type: 'destructive', dismissible: false },
};

export const Mobile = {
  name: 'Mobile',
  args: { type: 'info', mobile: true },
  parameters: { layout: 'centered' },
};

export const MobileWithActions = {
  name: 'Mobile — With Actions',
  args: { type: 'destructive', mobile: true, showActions: true },
  parameters: { layout: 'centered' },
};

export const RTLArabic = {
  name: 'RTL Arabic',
  args: {
    type: 'info',
    rtl: true,
    title: 'عنوان رسالة الاشعار أو التنبيه',
    description: 'يكتب المحتوى الإضافي هنا في حال ان رسالة الاشعار أو التنبيه تحتاج الى شرح أو تفصيل.',
  },
};

export const RTLMobile = {
  name: 'RTL Arabic — Mobile',
  args: {
    type: 'success',
    rtl: true,
    mobile: true,
    title: 'عنوان رسالة الاشعار أو التنبيه',
    description: 'يكتب المحتوى الإضافي هنا في حال ان رسالة الاشعار أو التنبيه تحتاج الى شرح أو تفصيل.',
  },
  parameters: { layout: 'centered' },
};

export const AllTypes = {
  name: 'All Types',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {['info', 'success', 'warning', 'destructive'].map((t) => (
        <InlineAlert key={t} {...args} type={t} />
      ))}
    </div>
  ),
};

export const AllTypesMobile = {
  name: 'All Types — Mobile',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {['info', 'success', 'warning', 'destructive'].map((t) => (
        <InlineAlert key={t} {...args} type={t} mobile />
      ))}
    </div>
  ),
};
