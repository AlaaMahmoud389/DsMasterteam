import { fn } from 'storybook/test';
import { Button } from './Button';
import { ArrowRightIcon, TrashIcon } from './ButtonIcons';

const ArrowRightIconRTL = () => <ArrowRightIcon style={{ transform: 'scaleX(-1)' }} />;

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4159-296&t=gv8blf425MZ1IhAY-4';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'neutral', 'secondary-solid', 'transparent', 'danger', 'danger-secondary'],
      description: 'Visual style from Figma',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'sm=24px · md=32px · lg=40px',
      table: { defaultValue: { summary: 'lg' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    loading: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    iconOnly: {
      control: 'boolean',
      description: 'Square icon button — always set aria-label',
      table: { defaultValue: { summary: 'false' } },
    },
    dir: {
      control: 'select',
      options: ['ltr', 'rtl'],
      description: 'Text direction for RTL/Arabic layouts',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      table: { defaultValue: { summary: 'button' } },
    },
    leadIcon: { control: false, description: 'React node for leading icon slot' },
    trailIcon: { control: false, description: 'React node for trailing icon slot' },
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'Button',
    size: 'lg',
    onClick: fn(),
  },
};

export const Playground = {
  args: { variant: 'primary', leadIcon: <ArrowRightIcon /> },
};

export const Primary = {
  name: 'Primary',
  args: { variant: 'primary', leadIcon: <ArrowRightIcon />, children: 'Button' },
};

export const Neutral = {
  name: 'Neutral',
  args: { variant: 'neutral', leadIcon: <ArrowRightIcon />, children: 'Button' },
};

export const SecondarySolid = {
  name: 'Secondary Solid',
  args: { variant: 'secondary-solid', leadIcon: <ArrowRightIcon />, children: 'Button' },
};

export const Transparent = {
  name: 'Transparent',
  args: { variant: 'transparent', leadIcon: <ArrowRightIcon />, children: 'Button' },
};

export const Danger = {
  name: 'Danger',
  args: { variant: 'danger', leadIcon: <TrashIcon />, children: 'Delete' },
};

export const Disabled = {
  name: 'Disabled',
  args: { variant: 'primary', disabled: true, leadIcon: <ArrowRightIcon />, children: 'Button' },
};

export const RTLArabic = {
  name: 'RTL Arabic',
  args: { variant: 'primary', dir: 'rtl', leadIcon: <ArrowRightIconRTL />, children: 'إجراء' },
};
