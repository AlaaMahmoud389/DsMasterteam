import { fn } from 'storybook/test';
import { Modal } from './Modal';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4393-101686';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    mobile: {
      control: 'boolean',
      description: 'Mobile layout (320 px card) vs desktop (600 px card)',
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
      description: 'Show the three action buttons in the footer',
      table: { defaultValue: { summary: 'true' } },
    },
    title: {
      control: 'text',
      description: 'Modal heading text',
    },
    description: {
      control: 'text',
      description: 'Supporting body text below the title',
    },
    primaryActionLabel: {
      control: 'text',
      description: 'Primary (filled) action button label',
    },
    secondaryActionLabel: {
      control: 'text',
      description: 'Secondary (tinted) action button label',
    },
    tertiaryActionLabel: {
      control: 'text',
      description: 'Tertiary (ghost) action button label',
    },
    onClose:           { action: 'closed' },
    onPrimaryAction:   { action: 'primaryAction' },
    onSecondaryAction: { action: 'secondaryAction' },
    onTertiaryAction:  { action: 'tertiaryAction' },
  },
  args: {
    mobile: false,
    rtl: false,
    dismissible: true,
    showDescription: true,
    showActions: true,
    title: 'Title goes here',
    description: 'When a Modal needs a further detailed explanation, it goes here.',
    primaryActionLabel: 'Button',
    secondaryActionLabel: 'Button',
    tertiaryActionLabel: 'Button',
    onClose: fn(),
    onPrimaryAction: fn(),
    onSecondaryAction: fn(),
    onTertiaryAction: fn(),
  },
};

/* ── Stories ─────────────────────────────────────────────── */

export const Playground = {};

export const Desktop = {
  name: 'Desktop',
  args: { mobile: false },
};

export const DesktopRTL = {
  name: 'Desktop RTL',
  args: {
    mobile: false,
    rtl: true,
    title: 'عنوان الرسالة يُكتب هنا',
    description: 'يُكتب المحتوى الاضافي هنا في حال أن رسالة الاشعار أو التنبيه تحتاج الى شرح أو تفصيل.',
    primaryActionLabel: 'إجراء',
    secondaryActionLabel: 'إجراء',
    tertiaryActionLabel: 'إجراء',
  },
};

export const Mobile = {
  name: 'Mobile',
  args: { mobile: true },
};

export const MobileRTL = {
  name: 'Mobile RTL',
  args: {
    mobile: true,
    rtl: true,
    title: 'عنوان الرسالة يُكتب هنا',
    description: 'يُكتب المحتوى الاضافي هنا في حال أن رسالة الاشعار أو التنبيه تحتاج الى شرح أو تفصيل.',
    primaryActionLabel: 'إجراء',
    secondaryActionLabel: 'إجراء',
    tertiaryActionLabel: 'إجراء',
  },
};

export const NoActions = {
  name: 'No Actions',
  args: { showActions: false },
};

export const TitleOnly = {
  name: 'Title Only (no description)',
  args: { showDescription: false },
};

export const NonDismissible = {
  name: 'Non-Dismissible',
  args: { dismissible: false },
};

export const AllVariants = {
  name: 'All Variants',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
      <Modal {...args} mobile={false} />
      <Modal {...args} mobile={true} />
    </div>
  ),
};

export const AllVariantsRTL = {
  name: 'All Variants — RTL',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
      <Modal
        {...args}
        mobile={false}
        rtl={true}
        title="عنوان الرسالة يُكتب هنا"
        description="يُكتب المحتوى الاضافي هنا في حال أن رسالة الاشعار أو التنبيه تحتاج الى شرح أو تفصيل."
        primaryActionLabel="إجراء"
        secondaryActionLabel="إجراء"
        tertiaryActionLabel="إجراء"
      />
      <Modal
        {...args}
        mobile={true}
        rtl={true}
        title="عنوان الرسالة يُكتب هنا"
        description="يُكتب المحتوى الاضافي هنا في حال أن رسالة الاشعار أو التنبيه تحتاج الى شرح أو تفصيل."
        primaryActionLabel="إجراء"
        secondaryActionLabel="إجراء"
        tertiaryActionLabel="إجراء"
      />
    </div>
  ),
};
