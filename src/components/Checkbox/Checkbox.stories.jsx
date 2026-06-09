import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from './Checkbox';

/* ── Story meta ───────────────────────────────────────────── */

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'padded' },
  argTypes: {
    variant:       { control: 'radio',  options: ['primary', 'neutral'],  description: 'Visual style of the filled checkbox' },
    size:          { control: 'radio',  options: ['xs', 'sm', 'md'],      description: 'Checkbox size — xs=16px · sm=20px · md=24px' },
    checked:       { control: 'boolean',                                   description: 'Checked state' },
    indeterminate: { control: 'boolean',                                   description: 'Indeterminate state — overrides checked visually' },
    disabled:      { control: 'boolean',                                   description: 'Disabled state' },
    readOnly:      { control: 'boolean',                                   description: 'Read-only — displays value, blocks interaction' },
    label:         { control: 'text',                                      description: 'Label text' },
    description:   { control: 'text',                                      description: 'Helper description below the label' },
    error:         { control: 'text',                                      description: 'Error message (sets aria-invalid)' },
    dir:           { control: 'radio',  options: ['ltr', 'rtl'],          description: 'Text direction' },
    onChange:      { action: 'changed' },
  },
};

/* ── Playground ──────────────────────────────────────────── */
export const Playground = {
  args: {
    checked:       false,
    indeterminate: false,
    variant:       'primary',
    size:          'md',
    label:         'Checkbox Label',
    description:   '',
    error:         '',
    disabled:      false,
    readOnly:      false,
    dir:           'ltr',
  },
  render: (args) => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 8 }}>
      <Checkbox {...args} />
    </div>
  ),
};

/* ── Variants ────────────────────────────────────────────── */
export const Variants = {
  name: 'Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { variant: 'primary', label: 'Primary (default)' },
        { variant: 'neutral', label: 'Neutral' },
      ].map(({ variant, label }) => (
        <div key={variant}>
          <p style={{ margin: '0 0 12px', fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>
            {label}
          </p>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Checkbox size="md" variant={variant} checked={false} label="Unchecked" />
            <Checkbox size="md" variant={variant} checked={true}  label="Checked" />
            <Checkbox size="md" variant={variant} indeterminate={true} label="Indeterminate" />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── All Sizes ───────────────────────────────────────────── */
export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { size: 'md', label: 'Medium — 24 × 24 px' },
        { size: 'sm', label: 'Small — 20 × 20 px' },
        { size: 'xs', label: 'X-Small — 16 × 16 px' },
      ].map(({ size, label }) => (
        <div key={size}>
          <p style={{ margin: '0 0 12px', fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>
            {label}
          </p>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Checkbox size={size} checked={false}         variant="primary" label="Unchecked" />
            <Checkbox size={size} checked={true}          variant="primary" label="Checked" />
            <Checkbox size={size} indeterminate={true}    variant="primary" label="Indeterminate" />
            <Checkbox size={size} checked={true}          variant="neutral" label="Neutral" />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── Primary Variant ─────────────────────────────────────── */
export const Primary = {
  name: 'Primary Variant',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 8 }}>
      <Checkbox variant="primary" checked={true} label="Primary checkbox" size="md" />
      <p style={{ marginTop: 8, fontSize: 12, color: '#6C7C96' }}>
        Primary — blue fill (#1849a9) with white icon. Default for most form contexts.
      </p>
    </div>
  ),
};

/* ── Neutral Variant ─────────────────────────────────────── */
export const Neutral = {
  name: 'Neutral Variant',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 8 }}>
      <Checkbox variant="neutral" checked={true} label="Neutral checkbox" size="md" />
      <p style={{ marginTop: 8, fontSize: 12, color: '#6C7C96' }}>
        Neutral — dark navy fill (#1f2a37) with white icon. Use on dark or content-heavy layouts.
      </p>
    </div>
  ),
};

/* ── Unchecked ───────────────────────────────────────────── */
export const Unchecked = {
  name: 'Unchecked',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 8 }}>
      <Checkbox checked={false} label="Unchecked checkbox" size="md" variant="primary" />
    </div>
  ),
};

/* ── Checked ─────────────────────────────────────────────── */
export const Checked = {
  name: 'Checked',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 8 }}>
      <Checkbox checked={true} label="Checked checkbox" size="md" variant="primary" />
    </div>
  ),
};

/* ── Indeterminate ───────────────────────────────────────── */
export const Indeterminate = {
  name: 'Indeterminate',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 8 }}>
      <Checkbox indeterminate={true} label="Indeterminate checkbox" size="md" variant="primary" />
      <p style={{ marginTop: 8, fontSize: 12, color: '#6C7C96' }}>
        Indeterminate — renders a dash icon; sets aria-checked="mixed".
      </p>
    </div>
  ),
};

/* ── With Description ────────────────────────────────────── */
export const WithDescription = {
  name: 'With Description',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 8 }}>
      <Checkbox
        checked={false}
        label="Checkbox Label"
        description="When a selection needs a further detailed explanation, it goes here."
        size="md"
        variant="primary"
      />
    </div>
  ),
};

/* ── With Error ──────────────────────────────────────────── */
export const WithError = {
  name: 'With Error',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 8 }}>
      <Checkbox
        checked={false}
        label="Checkbox Label"
        description="When a selection needs a further detailed explanation, it goes here."
        error="Error / Warning message"
        size="md"
        variant="primary"
      />
    </div>
  ),
};

/* ── Read-Only ───────────────────────────────────────────── */
export const ReadOnly = {
  name: 'Read-Only',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <Checkbox readOnly checked={false}         label="Read-only unchecked" />
      <Checkbox readOnly checked={true}  variant="primary" label="Read-only checked (primary)" />
      <Checkbox readOnly checked={true}  variant="neutral" label="Read-only checked (neutral)" />
      <Checkbox readOnly indeterminate={true} variant="primary" label="Read-only indeterminate" />
    </div>
  ),
};

/* ── Disabled ────────────────────────────────────────────── */
export const Disabled = {
  name: 'Disabled',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <Checkbox disabled checked={false}         label="Disabled unchecked" />
      <Checkbox disabled checked={true}  variant="primary" label="Disabled checked (primary)" />
      <Checkbox disabled checked={true}  variant="neutral" label="Disabled checked (neutral)" />
      <Checkbox disabled indeterminate={true}    label="Disabled indeterminate" />
    </div>
  ),
};

/* ── RTL Arabic ──────────────────────────────────────────── */
export const RTLArabic = {
  name: 'RTL Arabic',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <Checkbox dir="rtl" checked={false} label="عنوان اختيار متعدد" description="يكتب المحتوى الإضافي هنا في حال ان عنوان الاختيار يحتاج إلى شرح أو تفصيل." />
      <Checkbox dir="rtl" checked={true}  variant="primary" label="عنوان اختيار متعدد" description="يكتب المحتوى الإضافي هنا في حال ان عنوان الاختيار يحتاج إلى شرح أو تفصيل." />
      <Checkbox dir="rtl" checked={false} label="رسالة خطأ أو تحذير" error="رسالة خطأ أو تحذير" />
    </div>
  ),
};

/* ── Checkbox Group ──────────────────────────────────────── */
export const Group = {
  name: 'Checkbox Group',
  render: () => {
    const [values, setValues] = useState({ option1: true, option2: false, option3: false });
    const allChecked  = Object.values(values).every(Boolean);
    const someChecked = Object.values(values).some(Boolean);
    const toggle = (key) => setValues(prev => ({ ...prev, [key]: !prev[key] }));
    return (
      <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
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
        <p style={{ marginTop: 12, fontSize: 12, color: '#6C7C96' }}>
          Interact with the checkboxes — the parent "Select all" reflects partial and full selection states.
        </p>
      </div>
    );
  },
};

/* ── Primary — All States ────────────────────────────────── */
export const PrimaryAllStates = {
  name: 'Primary — All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { label: 'Default',       extra: {} },
        { label: 'Checked',       extra: { checked: true } },
        { label: 'Indeterminate', extra: { indeterminate: true } },
        { label: 'Read-only',     extra: { checked: true, readOnly: true } },
        { label: 'Disabled',      extra: { disabled: true } },
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

/* ── Neutral — All States ────────────────────────────────── */
export const NeutralAllStates = {
  name: 'Neutral — All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { label: 'Default',       extra: {} },
        { label: 'Checked',       extra: { checked: true } },
        { label: 'Indeterminate', extra: { indeterminate: true } },
        { label: 'Read-only',     extra: { checked: true, readOnly: true } },
        { label: 'Disabled',      extra: { disabled: true } },
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
