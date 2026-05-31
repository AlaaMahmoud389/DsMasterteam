/**
 * ColorInput.stories.jsx — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4747-83318
 */

import React, { useState } from 'react';
import { ColorInput } from './ColorInput';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4747-83318';

export default {
  title: 'Components/ColorInput',
  component: ColorInput,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    size: {
      control: 'select',
      options: ['lg', 'md'],
      description: 'Input height — lg=40px · md=32px',
      table: { defaultValue: { summary: 'lg' } },
    },
    fieldStyle: {
      control: 'select',
      options: ['default', 'filled-darker', 'filled-lighter'],
      description: 'Input background style (Style in Figma)',
      table: { defaultValue: { summary: 'default' } },
    },
    error: {
      control: 'boolean',
      description: 'Error state',
      table: { defaultValue: { summary: 'false' } },
    },
    readOnly: {
      control: 'boolean',
      description: 'Read-only state',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { defaultValue: { summary: 'false' } },
    },
    dir: {
      control: 'select',
      options: ['ltr', 'rtl'],
      description: 'Text direction (RTL in Figma)',
      table: { defaultValue: { summary: 'ltr' } },
    },
    label: {
      control: 'text',
      description: 'Label text (Show Label in Figma)',
      table: { defaultValue: { summary: 'Label' } },
    },
    required: {
      control: 'boolean',
      description: 'Required — shows asterisk on label',
      table: { defaultValue: { summary: 'false' } },
    },
    showLabel: {
      control: 'boolean',
      description: 'Toggle label visibility (Show Label in Figma)',
      table: { defaultValue: { summary: 'true' } },
    },
    helperText: {
      control: 'text',
      description: 'Helper text below input (Show Helper Text in Figma)',
    },
    showHelperText: {
      control: 'boolean',
      description: 'Toggle helper text visibility',
      table: { defaultValue: { summary: 'false' } },
    },
    showIcon: {
      control: 'boolean',
      description: 'Show leading icon (Icon in Figma)',
      table: { defaultValue: { summary: 'false' } },
    },
    showPrefix: {
      control: 'boolean',
      description: 'Show colour swatch prefix (Prefix in Figma)',
      table: { defaultValue: { summary: 'true' } },
    },
    showSuffix: {
      control: 'boolean',
      description: 'Show suffix label (Suffix in Figma)',
      table: { defaultValue: { summary: 'true' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text (Filled Text when empty)',
    },
  },
  args: {
    size: 'lg',
    fieldStyle: 'default',
    error: false,
    readOnly: false,
    disabled: false,
    dir: 'ltr',
    label: 'Colour',
    required: false,
    showLabel: true,
    helperText: 'Pick a brand colour',
    showHelperText: false,
    showIcon: false,
    showPrefix: true,
    showSuffix: true,
    placeholder: 'Enter colour…',
  },
};

/* ── Playground ────────────────────────────────────────────── */
export const Playground = {
  name: 'Playground',
  render: (args) => {
    const [val, setVal] = useState('#7C53EE');
    return <ColorInput {...args} value={val} onChange={setVal} />;
  },
};

/* ── States ────────────────────────────────────────────────── */
export const States = {
  name: 'State: All interaction states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        { label: 'Default (unfilled)', props: { label: 'Default', defaultValue: '' } },
        { label: 'Default (filled)', props: { label: 'Filled', defaultValue: '#7C53EE' } },
        { label: 'Read-only (filled)', props: { label: 'Read-only', defaultValue: '#7C53EE', readOnly: true } },
        { label: 'Disabled (unfilled)', props: { label: 'Disabled', disabled: true } },
        { label: 'Disabled (filled)', props: { label: 'Disabled filled', defaultValue: '#7C53EE', disabled: true } },
        { label: 'Error', props: { label: 'Error', error: true, showHelperText: true, helperText: 'Invalid colour value', defaultValue: '#7C53EE' } },
      ].map(({ label, props }) => (
        <div key={label}>
          <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 8, fontFamily: 'system-ui', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</p>
          <ColorInput {...props} />
        </div>
      ))}
    </div>
  ),
};

/* ── Sizes ─────────────────────────────────────────────────── */
export const Sizes = {
  name: 'Size: Large vs Medium',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        { label: 'Large (lg) — input 40px', props: { size: 'lg', label: 'Large', defaultValue: '#1849A9' } },
        { label: 'Medium (md) — input 32px', props: { size: 'md', label: 'Medium', defaultValue: '#1849A9' } },
      ].map(({ label, props }) => (
        <div key={label}>
          <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 8, fontFamily: 'system-ui', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</p>
          <ColorInput {...props} />
        </div>
      ))}
    </div>
  ),
};

/* ── Styles ────────────────────────────────────────────────── */
export const Styles = {
  name: 'Style: Default · Filled darker · Filled lighter',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        { label: 'Default — white bg, 1px #D3D7DC border', props: { fieldStyle: 'default', label: 'Default style', defaultValue: '#059669' } },
        { label: 'Filled darker — #F4F5F7 bg, no border', props: { fieldStyle: 'filled-darker', label: 'Filled darker style', defaultValue: '#059669' } },
        { label: 'Filled lighter — #FDFDFE bg, no border', props: { fieldStyle: 'filled-lighter', label: 'Filled lighter style', defaultValue: '#059669' } },
      ].map(({ label, props }) => (
        <div key={label} style={{ background: '#f0f1f3', padding: '12px', borderRadius: 6 }}>
          <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 8, fontFamily: 'system-ui', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</p>
          <ColorInput {...props} />
        </div>
      ))}
    </div>
  ),
};

/* ── Label properties ──────────────────────────────────────── */
export const LabelVariants = {
  name: 'Label: RTL · Required · Show/Hide',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        { desc: 'LTR label', props: { label: 'Colour', dir: 'ltr', defaultValue: '#1849A9' } },
        { desc: 'RTL label', props: { label: 'اللون', dir: 'rtl', defaultValue: '#1849A9' } },
        { desc: 'Required', props: { label: 'Required colour', required: true, defaultValue: '#1849A9' } },
        { desc: 'Disabled label', props: { label: 'Disabled', disabled: true, defaultValue: '#1849A9' } },
        { desc: 'No label (showLabel=false)', props: { label: 'Hidden label', showLabel: false, defaultValue: '#1849A9' } },
      ].map(({ desc, props }) => (
        <div key={desc}>
          <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 8, fontFamily: 'system-ui', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>{desc}</p>
          <ColorInput {...props} />
        </div>
      ))}
    </div>
  ),
};

/* ── Prefix & Suffix ───────────────────────────────────────── */
export const PrefixSuffix = {
  name: 'Prefix · Suffix: Combinations',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        { desc: 'Prefix + Suffix (default)', props: { label: 'All sections', showPrefix: true, showSuffix: true, defaultValue: '#7C53EE' } },
        { desc: 'Prefix only (no suffix)', props: { label: 'No suffix', showPrefix: true, showSuffix: false, defaultValue: '#7C53EE' } },
        { desc: 'Suffix only (no prefix)', props: { label: 'No prefix', showPrefix: false, showSuffix: true, defaultValue: '#7C53EE' } },
        { desc: 'No prefix, no suffix', props: { label: 'Minimal', showPrefix: false, showSuffix: false, defaultValue: '#7C53EE' } },
        { desc: 'With leading icon', props: { label: 'With icon', showIcon: true, defaultValue: '#7C53EE' } },
        { desc: 'Custom suffix text', props: { label: 'Hex suffix', suffixText: 'HEX', defaultValue: '#7C53EE' } },
      ].map(({ desc, props }) => (
        <div key={desc}>
          <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 8, fontFamily: 'system-ui', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>{desc}</p>
          <ColorInput {...props} />
        </div>
      ))}
    </div>
  ),
};

/* ── Helper text ───────────────────────────────────────────── */
export const HelperText = {
  name: 'Helper Text: Normal · Error · RTL',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        { desc: 'Helper text visible', props: { label: 'Colour', showHelperText: true, helperText: 'Pick a brand colour from your palette', defaultValue: '#7C53EE' } },
        { desc: 'Error with helper text', props: { label: 'Colour', error: true, showHelperText: true, helperText: 'Invalid colour — must be 6-digit hex', defaultValue: '' } },
        { desc: 'RTL helper text', props: { label: 'اللون', dir: 'rtl', showHelperText: true, helperText: 'اختر لون من لوحة العلامة التجارية', defaultValue: '#7C53EE' } },
      ].map(({ desc, props }) => (
        <div key={desc}>
          <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 8, fontFamily: 'system-ui', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>{desc}</p>
          <ColorInput {...props} />
        </div>
      ))}
    </div>
  ),
};

/* ── RTL ───────────────────────────────────────────────────── */
export const RTL = {
  name: 'RTL Direction',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div>
        <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 8, fontFamily: 'system-ui', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>LTR</p>
        <ColorInput
          dir="ltr"
          label="Brand colour"
          defaultValue="#1849A9"
          showHelperText
          helperText="Enter a hex colour value"
        />
      </div>
      <div>
        <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 8, fontFamily: 'system-ui', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>RTL</p>
        <ColorInput
          dir="rtl"
          label="لون العلامة التجارية"
          defaultValue="#1849A9"
          showHelperText
          helperText="أدخل قيمة لون هيكس"
        />
      </div>
    </div>
  ),
};

/* ── Interactive controlled ────────────────────────────────── */
export const Interactive = {
  name: 'Interactive: Controlled picker',
  render: () => {
    const [color, setColor] = useState('#1849A9');
    const presets = ['#1849A9', '#059669', '#D97706', '#7C53EE', '#DC2626', '#0891B2'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <ColorInput
          label="Primary colour"
          value={color}
          onChange={setColor}
          showHelperText
          helperText="Click the colour swatch to open the picker"
          required
        />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
          <span style={{ fontSize: 12, color: '#6b7280', fontFamily: 'system-ui' }}>Presets:</span>
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setColor(p)}
              style={{
                width: 24, height: 24, borderRadius: 4, background: p,
                border: color === p ? '2px solid #111827' : '1px solid rgba(0,0,0,0.2)',
                cursor: 'pointer',
              }}
              title={p}
              aria-label={`Set colour to ${p}`}
            />
          ))}
        </div>
        <div style={{ fontSize: 12, fontFamily: 'system-ui', color: '#374151' }}>
          Current value: <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 3 }}>{color}</code>
          <span style={{ display: 'inline-block', width: 16, height: 16, borderRadius: 3, background: color, border: '1px solid rgba(0,0,0,.15)', marginLeft: 8, verticalAlign: 'middle' }} />
        </div>
      </div>
    );
  },
};

/* ── All sizes × styles matrix ─────────────────────────────── */
export const FullMatrix = {
  name: 'Full matrix: Sizes × Styles × States',
  render: () => {
    const sizes = ['lg', 'md'];
    const fieldStyles = ['default', 'filled-darker', 'filled-lighter'];
    const configs = [
      { label: 'Unfilled', props: {} },
      { label: 'Filled #7C53EE', props: { defaultValue: '#7C53EE' } },
      { label: 'Read-only', props: { defaultValue: '#7C53EE', readOnly: true } },
      { label: 'Disabled', props: { disabled: true } },
      { label: 'Error', props: { error: true } },
      { label: 'Required', props: { required: true, defaultValue: '#1849A9' } },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, overflowX: 'auto' }}>
        {fieldStyles.map((fs) => (
          <div key={fs}>
            <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 12, fontFamily: 'system-ui', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em' }}>Style: {fs}</p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', background: '#f0f1f3', padding: '16px', borderRadius: 8 }}>
              {configs.map(({ label, props }) => (
                <div key={label} style={{ minWidth: 320 }}>
                  <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 6, fontFamily: 'system-ui' }}>{label}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {sizes.map((sz) => (
                      <ColorInput
                        key={sz}
                        size={sz}
                        fieldStyle={fs}
                        label={`${sz.toUpperCase()} ${label}`}
                        showLabel={false}
                        {...props}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
