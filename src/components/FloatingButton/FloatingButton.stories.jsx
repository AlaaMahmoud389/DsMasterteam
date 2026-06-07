import { fn } from 'storybook/test';
import { FloatingButton } from './FloatingButton';
import { PlusIcon, ArrowRightIcon } from '../Button/ButtonIcons';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4380-12202';

export default {
  title: 'Components/FloatingButton',
  component: FloatingButton,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'brand', 'secondary'],
      description: 'Primary-Neutral · Primary-Brand · Secondary-Solid',
      table: { defaultValue: { summary: 'brand' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: 'sm = 56 px · lg = 64 px',
      table: { defaultValue: { summary: 'lg' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    iconOnly: {
      control: 'boolean',
      description: 'true → circle · false → pill with leadIcon + label',
      table: { defaultValue: { summary: 'true' } },
    },
    onColor: {
      control: 'boolean',
      description: 'White button for colored/dark surfaces',
      table: { defaultValue: { summary: 'false' } },
    },
    dir: {
      control: 'select',
      options: ['ltr', 'rtl'],
      description: 'Text direction for Arabic layouts',
    },
    leadIcon: { control: false },
    onClick:  { action: 'clicked' },
  },
  args: {
    children: <PlusIcon />,
    size: 'lg',
    iconOnly: true,
    onClick: fn(),
  },
};

/* ── Stories ─────────────────────────────────────────────── */

export const Playground = {
  args: { variant: 'brand', 'aria-label': 'Add' },
};

export const Neutral = {
  name: 'Neutral',
  args: { variant: 'neutral', 'aria-label': 'Add' },
};

export const Brand = {
  name: 'Brand',
  args: { variant: 'brand', 'aria-label': 'Add' },
};

export const Secondary = {
  name: 'Secondary',
  args: { variant: 'secondary', 'aria-label': 'Add' },
};

export const WithLabel = {
  name: 'With Label — pill mode',
  args: {
    variant: 'brand',
    iconOnly: false,
    leadIcon: <PlusIcon />,
    children: 'Button',
    'aria-label': undefined,
  },
};

export const SmallSize = {
  name: 'Small (56 px)',
  args: { variant: 'brand', size: 'sm', 'aria-label': 'Add' },
};

export const LargeSize = {
  name: 'Large (64 px)',
  args: { variant: 'brand', size: 'lg', 'aria-label': 'Add' },
};

export const OnColor = {
  name: 'On Color',
  args: { variant: 'brand', onColor: true, 'aria-label': 'Add' },
  parameters: { backgrounds: { default: 'dark' } },
};

export const Disabled = {
  name: 'Disabled',
  args: { variant: 'brand', disabled: true, 'aria-label': 'Add (disabled)' },
};

export const RTLArabic = {
  name: 'RTL — pill mode',
  args: {
    variant: 'brand',
    dir: 'rtl',
    iconOnly: false,
    leadIcon: <ArrowRightIcon style={{ transform: 'scaleX(-1)' }} />,
    children: 'إضافة',
    'aria-label': undefined,
  },
};
