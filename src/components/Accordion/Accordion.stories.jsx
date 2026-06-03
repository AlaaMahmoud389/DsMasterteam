import { Accordion } from './Accordion';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4113-1059&t=gv8blf425MZ1IhAY-4';

const CONTENT_EN =
  'The accordion component delivers large amounts of content in a small space through progressive disclosure. The user gets key details about the underlying content and can choose to expand that content.';

const CONTENT_AR =
  'المرجع الوطني الأول للمعلومات والخدمات الحكومية الرقمية كافة في المملكة العربية السعودية والمصدر المتخصص في التسهيل على المواطنين والمقيمين ورجال الأعمال والزوّار للبحث والوصول بكل سهولة ويسر.';

const DEFAULT_ITEMS = [
  { title: 'What is an accordion?', content: CONTENT_EN },
  { title: 'When to use it?',       content: CONTENT_EN },
  { title: 'Accessibility',         content: CONTENT_EN },
];

export default {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'single: one item open at a time · multiple: any number open',
      table: { defaultValue: { summary: 'single' } },
    },
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm'],
      description: 'lg=56px · md=48px · sm=40px header height',
      table: { defaultValue: { summary: 'lg' } },
    },
    iconAlignment: {
      control: 'select',
      options: ['trailing', 'leading'],
      description: 'Chevron position relative to the title',
      table: { defaultValue: { summary: 'trailing' } },
    },
    flush: {
      control: 'boolean',
      description: 'Remove item borders for edge-to-edge / flush placement',
      table: { defaultValue: { summary: 'false' } },
    },
    dir: {
      control: 'select',
      options: ['ltr', 'rtl'],
      description: 'Text direction for RTL/Arabic layouts',
    },
    items: { control: 'object', description: 'Array of accordion items' },
  },
  args: {
    items: DEFAULT_ITEMS,
    type: 'single',
    size: 'lg',
    iconAlignment: 'trailing',
    flush: false,
  },
};

export const Playground = {
  args: {
    items: [
      { title: 'Accordion Title', content: CONTENT_EN, defaultOpen: true },
      { title: 'Another Item',    content: CONTENT_EN },
    ],
  },
};

export const Default = {
  name: 'Default',
  args: {
    items: DEFAULT_ITEMS,
    type: 'single',
  },
};

export const SingleOpen = {
  name: 'Single Open',
  args: {
    items: [
      { title: 'What is an accordion?', content: CONTENT_EN, defaultOpen: true },
      { title: 'When to use it?',       content: CONTENT_EN },
      { title: 'Accessibility',         content: CONTENT_EN },
    ],
    type: 'single',
  },
};

export const MultipleOpen = {
  name: 'Multiple Open',
  args: {
    items: [
      { title: 'What is an accordion?', content: CONTENT_EN, defaultOpen: true },
      { title: 'When to use it?',       content: CONTENT_EN, defaultOpen: true },
      { title: 'Accessibility',         content: CONTENT_EN },
    ],
    type: 'multiple',
  },
};

export const Disabled = {
  name: 'Disabled',
  args: {
    items: [
      { title: 'Available item',  content: CONTENT_EN },
      { title: 'Disabled item',   content: CONTENT_EN, disabled: true },
      { title: 'Available item',  content: CONTENT_EN },
    ],
    type: 'single',
  },
};

export const RTLArabic = {
  name: 'RTL Arabic',
  args: {
    dir: 'rtl',
    type: 'single',
    items: [
      { title: 'ما هو الأكورديون؟', content: CONTENT_AR, defaultOpen: true },
      { title: 'متى تستخدمه؟',      content: CONTENT_AR },
      { title: 'إمكانية الوصول',    content: CONTENT_AR },
    ],
  },
};
