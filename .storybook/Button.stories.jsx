import { fn } from 'storybook/test';
import { Button } from './Button';

// ── Icon SVGs ─────────────────────────────────────────────────────────────────
// All icons use currentColor so they inherit the button's text color.
// Components accept and spread props so callers can apply RTL mirroring:
//   <ArrowRightIcon style={{ transform: 'scaleX(-1)' }} />
// Rule: directional icons (arrows, chevrons) MUST be mirrored in RTL.
//       symmetrical icons (Plus, Trash) must NOT be mirrored.

const ArrowRightIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDownIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlusIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrashIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3 6H21M8 6V4C8 3.45 8.21 2.96 8.59 2.59C8.96 2.21 9.47 2 10 2H14C14.53 2 15.04 2.21 15.41 2.59C15.79 2.96 16 3.45 16 4V6M19 6L18 20C18 20.53 17.79 21.04 17.41 21.41C17.04 21.79 16.53 22 16 22H8C7.47 22 6.96 21.79 6.59 21.41C6.21 21.04 6 20.53 6 20L5 6H19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Mirrored arrow for RTL contexts (directional icon — must flip in RTL)
const ArrowRightIconRTL = () => <ArrowRightIcon style={{ transform: 'scaleX(-1)' }} />;

// ── Figma link (Masterteam DS — Button node 4159:296) ────────────────────────
const FIGMA_URL = 'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4159-296&t=gv8blf425MZ1IhAY-4';

// ── Story meta ───────────────────────────────────────────────────────────────

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: FIGMA_URL,
    },
    docs: {
      description: {
        component: [
          'Interactive element from the **Masterteam Design System** (Figma node `4159:296`).',
          'Buttons trigger specific actions. The label describes what will happen when clicked.',
          '',
          '**Variants** (Figma `style` prop): `primary` · `neutral` · `secondary-solid` · `transparent` · `danger` · `danger-secondary`',
          '',
          '**Sizes**: `sm` 24 px · `md` 32 px · `lg` 40 px',
          '',
          '[DGA Button Guidelines](https://design.dga.gov.sa/guidelines/components/actions/buttons) · ',
          `[Figma Component](${FIGMA_URL})`,
        ].join('\n'),
      },
    },
  },
  tags: [],
  argTypes: {
    children: {
      control: 'text',
      description: 'Button label text. Required unless `iconOnly` is set.',
      table: { defaultValue: { summary: 'Button' } },
    },
    variant: {
      control: 'select',
      options: ['primary', 'neutral', 'secondary-solid', 'transparent', 'danger', 'danger-secondary'],
      description: 'Figma `style` prop. Controls background, text, and border color.',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '`sm` 24 px · `md` 32 px · `lg` 40 px',
      table: { defaultValue: { summary: 'lg' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state. Uses dedicated tokens (`#d2d6db` bg / `#6c7c96` text), not opacity.',
      table: { defaultValue: { summary: 'false' } },
    },
    loading: {
      control: 'boolean',
      description: 'Shows a spinner overlay. Hides label and icons. Sets `aria-busy="true"`.',
      table: { defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches button to 100% of its container.',
      table: { defaultValue: { summary: 'false' } },
    },
    iconOnly: {
      control: 'boolean',
      description: 'Square icon-only button. Children render as icon, no label. Always set `aria-label`.',
      table: { defaultValue: { summary: 'false' } },
    },
    dir: {
      control: 'select',
      options: ['ltr', 'rtl'],
      description: 'Sets text direction for RTL/Arabic layouts. Directional icons must be mirrored by the caller.',
      table: { defaultValue: { summary: 'ltr' } },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML `<button>` type attribute.',
      table: { defaultValue: { summary: 'button' } },
    },
    leadIcon: {
      control: false,
      description: 'React node rendered in the leading icon slot. Size: 24/20/16 px by `size`.',
    },
    trailIcon: {
      control: false,
      description: 'React node rendered in the trailing icon slot. Size: 24/20/16 px by `size`.',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler. Not called when `disabled` or `loading`.',
    },
  },
  args: {
    children: 'Button',
    size: 'lg',
    onClick: fn(),
  },
};

// ── Playground ───────────────────────────────────────────────────────────────

export const Playground = {
  args: { variant: 'primary', leadIcon: <ArrowRightIcon /> },
};

// ── Variants ─────────────────────────────────────────────────────────────────

export const Primary = {
  name: 'primary',
  args: { variant: 'primary', leadIcon: <ArrowRightIcon />, children: 'Button' },
};

export const Neutral = {
  name: 'neutral',
  args: { variant: 'neutral', leadIcon: <ArrowRightIcon />, children: 'Button' },
};

export const SecondarySolid = {
  name: 'secondary-solid',
  args: { variant: 'secondary-solid', leadIcon: <ArrowRightIcon />, children: 'Button' },
};

export const Transparent = {
  name: 'transparent',
  args: { variant: 'transparent', leadIcon: <ArrowRightIcon />, children: 'Button' },
};

export const Danger = {
  name: 'danger',
  args: { variant: 'danger', leadIcon: <TrashIcon />, children: 'Delete' },
};

export const DangerSecondary = {
  name: 'danger-secondary',
  args: { variant: 'danger-secondary', leadIcon: <TrashIcon />, children: 'Remove' },
};

// ── Sizes ────────────────────────────────────────────────────────────────────

export const Large = {
  name: 'Large — 40 px',
  args: { size: 'lg', leadIcon: <ArrowRightIcon />, children: 'Button' },
};

export const Medium = {
  name: 'Medium — 32 px',
  args: { size: 'md', leadIcon: <ArrowRightIcon />, children: 'Button' },
};

export const Small = {
  name: 'Small — 24 px',
  args: { size: 'sm', leadIcon: <ArrowRightIcon />, children: 'Button' },
};

// ── States ───────────────────────────────────────────────────────────────────

export const Disabled = {
  name: 'Disabled',
  args: { disabled: true, leadIcon: <ArrowRightIcon />, children: 'Button' },
};

export const Loading = {
  name: 'Loading',
  args: { loading: true, children: 'Saving…' },
};

// ── Icons ────────────────────────────────────────────────────────────────────

export const WithLeadIcon = {
  name: 'Lead icon',
  args: { leadIcon: <ArrowRightIcon />, children: 'Next step' },
};

export const WithTrailIcon = {
  name: 'Trail icon',
  args: { trailIcon: <ChevronDownIcon />, children: 'Options' },
};

export const WithBothIcons = {
  name: 'Lead + trail icon',
  args: { leadIcon: <PlusIcon />, trailIcon: <ChevronDownIcon />, children: 'Create' },
};

export const IconOnly = {
  name: 'Icon only',
  args: { iconOnly: true, children: <PlusIcon />, 'aria-label': 'Add item' },
};

// ── RTL ──────────────────────────────────────────────────────────────────────
// Directional icons (ArrowRight) are mirrored via scaleX(-1) per RTL rule.
// Symmetrical icons (Plus, Trash) are NOT mirrored.

export const RTL = {
  name: 'RTL — Arabic',
  args: { dir: 'rtl', leadIcon: <ArrowRightIconRTL />, children: 'إجراء' },
};

// ── Compositions ─────────────────────────────────────────────────────────────

export const AllVariants = {
  name: 'All variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary"           leadIcon={<ArrowRightIcon />}>Primary</Button>
      <Button variant="neutral"           leadIcon={<ArrowRightIcon />}>Neutral</Button>
      <Button variant="secondary-solid"   leadIcon={<ArrowRightIcon />}>Secondary Solid</Button>
      <Button variant="transparent"       leadIcon={<ArrowRightIcon />}>Transparent</Button>
      <Button variant="danger"            leadIcon={<TrashIcon />}>Danger Primary</Button>
      <Button variant="danger-secondary"  leadIcon={<TrashIcon />}>Danger Secondary</Button>
    </div>
  ),
};

export const AllSizes = {
  name: 'All sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button size="sm" leadIcon={<ArrowRightIcon />}>Small 24 px</Button>
      <Button size="md" leadIcon={<ArrowRightIcon />}>Medium 32 px</Button>
      <Button size="lg" leadIcon={<ArrowRightIcon />}>Large 40 px</Button>
    </div>
  ),
};

export const AllStates = {
  name: 'All states',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="primary" leadIcon={<ArrowRightIcon />}>Default</Button>
      <Button variant="primary" leadIcon={<ArrowRightIcon />} loading>Loading</Button>
      <Button variant="primary" leadIcon={<ArrowRightIcon />} disabled>Disabled</Button>
    </div>
  ),
};

export const AllVariantsDisabled = {
  name: 'All variants — disabled',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary"          disabled leadIcon={<ArrowRightIcon />}>Primary</Button>
      <Button variant="neutral"          disabled leadIcon={<ArrowRightIcon />}>Neutral</Button>
      <Button variant="secondary-solid"  disabled leadIcon={<ArrowRightIcon />}>Secondary Solid</Button>
      <Button variant="transparent"      disabled leadIcon={<ArrowRightIcon />}>Transparent</Button>
      <Button variant="danger"           disabled leadIcon={<TrashIcon />}>Danger Primary</Button>
      <Button variant="danger-secondary" disabled leadIcon={<TrashIcon />}>Danger Secondary</Button>
    </div>
  ),
};

export const DestructiveAll = {
  name: 'Destructive — all',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="danger"           leadIcon={<TrashIcon />}>Delete</Button>
      <Button variant="danger-secondary" leadIcon={<TrashIcon />}>Remove</Button>
      <Button variant="danger"           disabled leadIcon={<TrashIcon />}>Delete (disabled)</Button>
      <Button variant="danger-secondary" disabled leadIcon={<TrashIcon />}>Remove (disabled)</Button>
    </div>
  ),
};

export const IconOnlyAll = {
  name: 'Icon only — all sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button size="sm" iconOnly aria-label="Add"><PlusIcon /></Button>
      <Button size="md" iconOnly aria-label="Add"><PlusIcon /></Button>
      <Button size="lg" iconOnly aria-label="Add"><PlusIcon /></Button>
    </div>
  ),
};

export const RTLAll = {
  name: 'RTL — all variants',
  parameters: { controls: { disable: true } },
  render: () => (
    // Directional arrow icon is mirrored (scaleX -1) in RTL per design rule.
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }} dir="rtl">
      <Button variant="primary"         dir="rtl" leadIcon={<ArrowRightIconRTL />}>إجراء</Button>
      <Button variant="neutral"         dir="rtl" leadIcon={<ArrowRightIconRTL />}>إجراء</Button>
      <Button variant="secondary-solid" dir="rtl" leadIcon={<ArrowRightIconRTL />}>إجراء</Button>
      <Button variant="transparent"     dir="rtl" leadIcon={<ArrowRightIconRTL />}>إجراء</Button>
    </div>
  ),
};

export const FullWidth = {
  name: 'Full width',
  parameters: { layout: 'padded', controls: { disable: true } },
  args: { fullWidth: true, leadIcon: <ArrowRightIcon />, children: 'Full-width button' },
};
