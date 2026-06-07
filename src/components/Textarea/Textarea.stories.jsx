import React, { useState } from 'react';
import { Textarea } from './Textarea';

const FONT = "'IBM Plex Sans Arabic', system-ui, sans-serif";

export default {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: { layout: 'padded' },
  tags: [],
};

const LABEL = {
  style: {
    fontSize: 11,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '.06em',
    marginBottom: 12,
    fontFamily: FONT,
  },
};

const WRAP = { style: { maxWidth: 400 } };

const ALL_STATES = ['default', 'hovered', 'pressed', 'focused', 'read-only', 'disabled'];

/* ════════════════════════════════════════════════════════════════════
   Playground
   ════════════════════════════════════════════════════════════════════ */
export const Playground = {
  name: 'Playground — Textarea',
  argTypes: {
    size:           { control: 'select',  options: ['medium', 'large'] },
    state:          { control: 'select',  options: ALL_STATES },
    error:          { control: 'boolean' },
    variant:        { control: 'select',  options: ['default', 'filled-darker', 'filled-lighter'] },
    label:          { control: 'text' },
    showLabel:      { control: 'boolean' },
    labelType:      { control: 'select',  options: ['regular', 'semibold'] },
    required:       { control: 'boolean' },
    placeholder:    { control: 'text' },
    showHelperText: { control: 'boolean' },
    helperText:     { control: 'text' },
    rtl:            { control: 'boolean' },
  },
  args: {
    size:           'medium',
    state:          'default',
    error:          false,
    variant:        'default',
    label:          'Label',
    showLabel:      true,
    labelType:      'regular',
    required:       false,
    placeholder:    'Placeholder',
    showHelperText: false,
    helperText:     'Helper text',
    rtl:            false,
  },
  render: (args) => (
    <div {...WRAP}>
      <Textarea {...args} />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   All States
   ════════════════════════════════════════════════════════════════════ */
export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {ALL_STATES.map((state) => (
        <div key={state}>
          <p {...LABEL}>{state}</p>
          <div {...WRAP}>
            <Textarea
              label="Label"
              state={state}
              placeholder="Placeholder"
              defaultValue={state === 'read-only' ? 'Read-only content' : ''}
            />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Error State
   ════════════════════════════════════════════════════════════════════ */
export const ErrorState = {
  name: 'Error State',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {['default', 'focused', 'pressed'].map((state) => (
        <div key={state}>
          <p {...LABEL}>Error + {state}</p>
          <div {...WRAP}>
            <Textarea
              label="Label"
              state={state}
              error={true}
              placeholder="Placeholder"
              showHelperText
              helperText="This field has an error"
            />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Sizes
   ════════════════════════════════════════════════════════════════════ */
export const Sizes = {
  name: 'Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {['medium', 'large'].map((size) => (
        <div key={size}>
          <p {...LABEL}>{size}</p>
          <div {...WRAP}>
            <Textarea label="Label" size={size} placeholder="Placeholder" />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Variants
   ════════════════════════════════════════════════════════════════════ */
export const Variants = {
  name: 'Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        { variant: 'default',        label: 'Default' },
        { variant: 'filled-darker',  label: 'Filled Darker' },
        { variant: 'filled-lighter', label: 'Filled Lighter' },
      ].map(({ variant, label }) => (
        <div key={variant}>
          <p {...LABEL}>{label}</p>
          <div {...WRAP}>
            <Textarea label="Label" variant={variant} placeholder="Placeholder" />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   With Helper Text
   ════════════════════════════════════════════════════════════════════ */
export const WithHelperText = {
  name: 'With Helper Text',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p {...LABEL}>Normal helper text</p>
        <div {...WRAP}>
          <Textarea
            label="Description"
            placeholder="Enter a description…"
            showHelperText
            helperText="Maximum 500 characters"
          />
        </div>
      </div>
      <div>
        <p {...LABEL}>Error helper text</p>
        <div {...WRAP}>
          <Textarea
            label="Description"
            placeholder="Enter a description…"
            error
            showHelperText
            helperText="This field is required"
          />
        </div>
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Label Types
   ════════════════════════════════════════════════════════════════════ */
export const LabelTypes = {
  name: 'Label Types',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        { labelType: 'regular',  required: false, label: 'Regular label' },
        { labelType: 'semibold', required: false, label: 'Semibold label' },
        { labelType: 'regular',  required: true,  label: 'Required field' },
      ].map(({ labelType, required, label }) => (
        <div key={label}>
          <p {...LABEL}>{label}</p>
          <div {...WRAP}>
            <Textarea label={label} labelType={labelType} required={required} placeholder="Placeholder" />
          </div>
        </div>
      ))}
      <div>
        <p {...LABEL}>Hidden label</p>
        <div {...WRAP}>
          <Textarea label="Hidden label" showLabel={false} placeholder="No visible label" />
        </div>
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Controlled — live character count
   ════════════════════════════════════════════════════════════════════ */
export const Controlled = {
  name: 'Controlled — Character Count',
  render: () => {
    const [val, setVal] = useState('');
    const max = 200;
    return (
      <div {...WRAP}>
        <Textarea
          label="Message"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Type something…"
          showHelperText
          helperText={`${val.length} / ${max} characters`}
          maxLength={max}
        />
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   RTL
   ════════════════════════════════════════════════════════════════════ */
export const RTL = {
  name: 'RTL',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {['default', 'focused', 'disabled'].map((state) => (
        <div key={state}>
          <p {...LABEL}>{state} · RTL</p>
          <div {...WRAP}>
            <Textarea
              label="التسمية"
              state={state}
              placeholder="نص توضيحي"
              showHelperText
              helperText="نص مساعد"
              rtl
            />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Full Matrix
   ════════════════════════════════════════════════════════════════════ */
export const FullMatrix = {
  name: 'Full Matrix',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
      {ALL_STATES.map((state) => (
        <div key={state}>
          <p {...LABEL}>{state}</p>
          <Textarea
            label="Label"
            state={state}
            placeholder="Placeholder"
            showHelperText
            helperText="Helper text"
            defaultValue={state === 'read-only' ? 'Read-only content' : ''}
          />
        </div>
      ))}
    </div>
  ),
};
