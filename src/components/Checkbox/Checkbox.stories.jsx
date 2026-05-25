import { useState } from 'react';
import { Checkbox, CheckboxGroup } from './Checkbox';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4112-15';

/* ── Story meta ───────────────────────────────────────────── */

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'neutral'],
      description: 'Visual style of the filled checkbox',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
      description: 'Checkbox size — xs=16px · sm=20px · md=24px',
      table: { defaultValue: { summary: 'md' } },
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
      table: { defaultValue: { summary: 'false' } },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state — overrides checked visually',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { defaultValue: { summary: 'false' } },
    },
    readOnly: {
      control: 'boolean',
      description: 'Read-only — displays value, blocks interaction',
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    description: {
      control: 'text',
      description: 'Helper description below the label',
    },
    error: {
      control: 'text',
      description: 'Error message (sets aria-invalid)',
    },
    dir: {
      control: 'select',
      options: ['ltr', 'rtl'],
      description: 'Text direction',
      table: { defaultValue: { summary: 'ltr' } },
    },
    onChange: { action: 'changed' },
  },
  args: {
    checked: false,
    indeterminate: false,
    variant: 'primary',
    size: 'md',
    label: 'Checkbox Label',
    description: '',
    error: '',
    disabled: false,
    readOnly: false,
    dir: 'ltr',
  },
};

/* ── Playground ──────────────────────────────────────────── */

export const Playground = {};

/* ── Variants ────────────────────────────────────────────── */

export const Primary = {
  name: 'Primary Variant',
  args: { variant: 'primary', checked: true, label: 'Primary checkbox' },
};

export const Neutral = {
  name: 'Neutral Variant',
  args: { variant: 'neutral', checked: true, label: 'Neutral checkbox' },
};

/* ── Sizes ───────────────────────────────────────────────── */

export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { size: 'md', label: 'Medium (24px)' },
        { size: 'sm', label: 'Small (20px)' },
        { size: 'xs', label: 'X-Small (16px)' },
      ].map(({ size, label }) => (
        <div key={size} style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Checkbox size={size} label={label} checked={false} />
          <Checkbox size={size} label={label} checked={true} variant="primary" />
          <Checkbox size={size} label={label} indeterminate={true} variant="primary" />
          <Checkbox size={size} label={label} checked={true} variant="neutral" />
        </div>
      ))}
    </div>
  ),
};

/* ── Check states ─────────────────────────────────────────── */

export const Unchecked = {
  name: 'Unchecked',
  args: { checked: false, label: 'Unchecked checkbox' },
};

export const Checked = {
  name: 'Checked',
  args: { checked: true, label: 'Checked checkbox' },
};

export const Indeterminate = {
  name: 'Indeterminate',
  args: { indeterminate: true, label: 'Indeterminate checkbox' },
};

/* ── Form field variants ──────────────────────────────────── */

export const WithDescription = {
  name: 'With Description',
  args: {
    checked: false,
    label: 'Checkbox Label',
    description: 'When a selection needs a further detailed explanation, it goes here.',
  },
};

export const WithError = {
  name: 'With Error',
  args: {
    checked: false,
    label: 'Checkbox Label',
    description: 'When a selection needs a further detailed explanation, it goes here.',
    error: 'Error / Warning message',
  },
};

/* ── Special states ──────────────────────────────────────── */

export const ReadOnly = {
  name: 'Read-Only',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <Checkbox readOnly checked={false} label="Read-only unchecked" />
      <Checkbox readOnly checked={true} variant="primary" label="Read-only checked (primary)" />
      <Checkbox readOnly checked={true} variant="neutral" label="Read-only checked (neutral)" />
      <Checkbox readOnly indeterminate={true} variant="primary" label="Read-only indeterminate" />
    </div>
  ),
};

export const Disabled = {
  name: 'Disabled',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <Checkbox disabled checked={false} label="Disabled unchecked" />
      <Checkbox disabled checked={true} variant="primary" label="Disabled checked (primary)" />
      <Checkbox disabled checked={true} variant="neutral" label="Disabled checked (neutral)" />
      <Checkbox disabled indeterminate={true} label="Disabled indeterminate" />
    </div>
  ),
};

/* ── RTL ─────────────────────────────────────────────────── */

export const RTLArabic = {
  name: 'RTL Arabic',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox
        dir="rtl"
        checked={false}
        label="عنوان اختيار متعدد"
        description="يكتب المحتوى الإضافي هنا في حال ان عنوان الاختيار يحتاج إلى شرح أو تفصيل."
      />
      <Checkbox
        dir="rtl"
        checked={true}
        variant="primary"
        label="عنوان اختيار متعدد"
        description="يكتب المحتوى الإضافي هنا في حال ان عنوان الاختيار يحتاج إلى شرح أو تفصيل."
      />
      <Checkbox
        dir="rtl"
        checked={false}
        label="رسالة خطأ أو تحذير"
        error="رسالة خطأ أو تحذير"
      />
    </div>
  ),
};

/* ── Group ───────────────────────────────────────────────── */

export const Group = {
  name: 'Checkbox Group',
  render: () => {
    const [values, setValues] = useState({ option1: true, option2: false, option3: false });
    const allChecked  = Object.values(values).every(Boolean);
    const someChecked = Object.values(values).some(Boolean);
    const toggle = (key) => setValues(prev => ({ ...prev, [key]: !prev[key] }));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <CheckboxGroup legend="Select options">
          <Checkbox
            checked={allChecked}
            indeterminate={someChecked && !allChecked}
            label="Select all"
            onChange={() => setValues({ option1: !allChecked, option2: !allChecked, option3: !allChecked })}
          />
          <Checkbox checked={values.option1} label="Option 1" onChange={() => toggle('option1')} />
          <Checkbox checked={values.option2} label="Option 2" onChange={() => toggle('option2')} />
          <Checkbox checked={values.option3} label="Option 3" onChange={() => toggle('option3')} />
        </CheckboxGroup>
      </div>
    );
  },
};

/* ── All states grid — Primary ───────────────────────────── */

export const PrimaryAllStates = {
  name: 'Primary — All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { label: 'Default',      extra: {} },
        { label: 'Checked',      extra: { checked: true } },
        { label: 'Indeterminate',extra: { indeterminate: true } },
        { label: 'Read-only',    extra: { checked: true, readOnly: true } },
        { label: 'Disabled',     extra: { disabled: true } },
      ].map(({ label, extra }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ minWidth: 100, fontSize: 12, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</span>
          <Checkbox size="xs" variant="primary" {...extra} />
          <Checkbox size="sm" variant="primary" {...extra} />
          <Checkbox size="md" variant="primary" {...extra} />
        </div>
      ))}
    </div>
  ),
};

/* ── All states grid — Neutral ───────────────────────────── */

export const NeutralAllStates = {
  name: 'Neutral — All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { label: 'Default',      extra: {} },
        { label: 'Checked',      extra: { checked: true } },
        { label: 'Indeterminate',extra: { indeterminate: true } },
        { label: 'Read-only',    extra: { checked: true, readOnly: true } },
        { label: 'Disabled',     extra: { disabled: true } },
      ].map(({ label, extra }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ minWidth: 100, fontSize: 12, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</span>
          <Checkbox size="xs" variant="neutral" {...extra} />
          <Checkbox size="sm" variant="neutral" {...extra} />
          <Checkbox size="md" variant="neutral" {...extra} />
        </div>
      ))}
    </div>
  ),
};
