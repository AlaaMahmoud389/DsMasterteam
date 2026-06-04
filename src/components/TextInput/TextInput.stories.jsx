import React, { useState } from 'react';
import { TextInput } from './TextInput';

const FONT = "'IBM Plex Sans Arabic', system-ui, sans-serif";

export default {
  title: 'Components/TextInput',
  parameters: {
    layout: 'padded',
  },
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

const WRAP = { style: { maxWidth: 320 } };

const ALL_STATES = ['default', 'hovered', 'pressed', 'focused', 'read-only', 'disabled'];

/* ════════════════════════════════════════════════════════════════════
   Playground
   ════════════════════════════════════════════════════════════════════ */
export const Playground = {
  name: 'Playground — Text Input',
  argTypes: {
    size:          { control: 'select',  options: ['medium', 'large'] },
    state:         { control: 'select',  options: ALL_STATES },
    error:         { control: 'boolean' },
    variant:       { control: 'select',  options: ['default', 'filled-darker', 'filled-lighter'] },
    label:         { control: 'text' },
    showLabel:     { control: 'boolean' },
    labelType:     { control: 'select',  options: ['regular', 'semibold'] },
    required:      { control: 'boolean' },
    placeholder:   { control: 'text' },
    showIcon:      { control: 'boolean' },
    showHelperText:{ control: 'boolean' },
    helperText:    { control: 'text' },
    showPrefix:    { control: 'boolean' },
    prefixType:    { control: 'select', options: ['dropdown', 'dropdown-icon', 'text'] },
    prefixStyle:   { control: 'select', options: ['solid', 'subtle'] },
    prefixState:   { control: 'select', options: ['default', 'hovered', 'pressed', 'selected', 'focused', 'disabled'] },
    prefixText:    { control: 'text' },
    showSuffix:    { control: 'boolean' },
    suffixType:    { control: 'select', options: ['dropdown', 'dropdown-icon', 'text'] },
    suffixStyle:   { control: 'select', options: ['solid', 'subtle'] },
    suffixState:   { control: 'select', options: ['default', 'hovered', 'pressed', 'selected', 'focused', 'disabled'] },
    suffixText:    { control: 'text' },
    rtl:           { control: 'boolean' },
  },
  args: {
    size: 'medium',
    state: 'default',
    error: false,
    variant: 'default',
    label: 'Label',
    showLabel: true,
    labelType: 'regular',
    required: false,
    placeholder: 'Placeholder',
    showIcon: false,
    showHelperText: false,
    helperText: 'Helper text',
    showPrefix: false,
    prefixType: 'dropdown',
    prefixStyle: 'solid',
    prefixState: 'default',
    prefixText: 'USD',
    showSuffix: false,
    suffixType: 'dropdown',
    suffixStyle: 'solid',
    suffixState: 'default',
    suffixText: '.com',
    rtl: false,
  },
  render: (args) => {
    const [val, setVal] = useState('');
    return (
      <div style={{ fontFamily: FONT, padding: 32, maxWidth: 320 }}>
        <TextInput
          {...args}
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   States — all 7
   ════════════════════════════════════════════════════════════════════ */
export const States = {
  name: 'States — All',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
      {ALL_STATES.map((state) => (
        <div key={state} {...WRAP}>
          <div style={LABEL.style}>{state}</div>
          <TextInput
            state={state}
            label="Label"
            placeholder="Placeholder"
            showHelperText
            helperText="Helper text"
            defaultValue={state === 'read-only' || state === 'disabled' ? 'Input value' : undefined}
          />
        </div>
      ))}
      <div {...WRAP}>
        <div style={LABEL.style}>Error</div>
        <TextInput
          error
          label="Label"
          placeholder="Placeholder"
          showHelperText
          helperText="This field has an error"
        />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Sizes
   ════════════════════════════════════════════════════════════════════ */
export const Sizes = {
  name: 'Sizes — Medium & Large',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div {...WRAP}>
        <div style={LABEL.style}>Medium — 32px</div>
        <TextInput size="medium" label="Label" placeholder="Placeholder" showHelperText helperText="Helper text" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Large — 40px</div>
        <TextInput size="large" label="Label" placeholder="Placeholder" showHelperText helperText="Helper text" />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Label Variants
   ════════════════════════════════════════════════════════════════════ */
export const LabelVariants = {
  name: 'Label — Variants',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div {...WRAP}>
        <div style={LABEL.style}>Regular label</div>
        <TextInput label="Regular Label" labelType="regular" placeholder="Placeholder" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Semibold label</div>
        <TextInput label="Semibold Label" labelType="semibold" placeholder="Placeholder" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Required (*) — Medium</div>
        <TextInput label="Required Field" required placeholder="Placeholder" size="medium" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Required (*) — Large</div>
        <TextInput label="Required Field" required placeholder="Placeholder" size="large" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Required (*) RTL</div>
        <TextInput label="حقل مطلوب" required placeholder="النص التوضيحي" rtl />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Disabled label</div>
        <TextInput label="Disabled Label" state="disabled" placeholder="Placeholder" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>No label</div>
        <TextInput showLabel={false} placeholder="Placeholder" />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   With Leading Icon
   ════════════════════════════════════════════════════════════════════ */
export const WithIcon = {
  name: 'With Leading Icon',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
      {ALL_STATES.map((state) => (
        <div key={state} {...WRAP}>
          <div style={LABEL.style}>{state} + icon</div>
          <TextInput
            state={state}
            showIcon
            label="Label"
            placeholder="Placeholder"
            defaultValue={state === 'read-only' || state === 'disabled' ? 'Input value' : undefined}
          />
        </div>
      ))}
      <div {...WRAP}>
        <div style={LABEL.style}>Error + icon</div>
        <TextInput error showIcon label="Label" placeholder="Placeholder" />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   With Helper Text
   ════════════════════════════════════════════════════════════════════ */
export const WithHelperText = {
  name: 'With Helper Text',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div {...WRAP}>
        <div style={LABEL.style}>Normal helper text</div>
        <TextInput
          label="Label"
          placeholder="Placeholder"
          showHelperText
          helperText="This is a helper message"
        />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Error with helper text</div>
        <TextInput
          error
          label="Label"
          placeholder="Placeholder"
          showHelperText
          helperText="This field is required"
        />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Disabled with helper text</div>
        <TextInput
          state="disabled"
          label="Label"
          placeholder="Placeholder"
          showHelperText
          helperText="This field is disabled"
        />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   RTL
   ════════════════════════════════════════════════════════════════════ */
export const RTL = {
  name: 'RTL',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div {...WRAP}>
        <div style={LABEL.style}>RTL — Default</div>
        <TextInput rtl label="تسمية" placeholder="النص التوضيحي" showHelperText helperText="نص المساعدة" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>RTL — Large</div>
        <TextInput rtl size="large" label="تسمية" placeholder="النص التوضيحي" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>RTL — Required</div>
        <TextInput rtl label="حقل مطلوب" required placeholder="النص التوضيحي" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>RTL — With icon</div>
        <TextInput rtl showIcon label="تسمية" placeholder="النص التوضيحي" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>RTL — Error</div>
        <TextInput rtl error label="تسمية" placeholder="النص التوضيحي" showHelperText helperText="هذا الحقل مطلوب" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>RTL — Disabled</div>
        <TextInput rtl state="disabled" label="تسمية" placeholder="النص التوضيحي" />
      </div>
    </div>
  ),
};

const AFFIX_STATES = ['default', 'hovered', 'pressed', 'selected', 'focused', 'disabled'];

/* ════════════════════════════════════════════════════════════════════
   With Prefix
   ════════════════════════════════════════════════════════════════════ */
export const WithPrefix = {
  name: 'With Prefix',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>

      <div style={{ fontSize: 13, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.06em' }}>Types — Solid</div>
      {[
        { type: 'dropdown',      label: 'Dropdown' },
        { type: 'dropdown-icon', label: 'Dropdown + Icon' },
        { type: 'text',          label: 'Text Only' },
      ].map(({ type, label }) => (
        <div key={type} {...WRAP}>
          <div style={LABEL.style}>{label}</div>
          <TextInput label="Label" placeholder="Placeholder" showPrefix prefixType={type} prefixStyle="solid" prefixText="USD" />
        </div>
      ))}

      <div style={{ fontSize: 13, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 8 }}>States — Solid</div>
      {AFFIX_STATES.map((s) => (
        <div key={s} {...WRAP}>
          <div style={LABEL.style}>{s}</div>
          <TextInput label="Label" placeholder="Placeholder" showPrefix prefixType="dropdown" prefixStyle="solid" prefixState={s} prefixText="USD" />
        </div>
      ))}

      <div style={{ fontSize: 13, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 8 }}>States — Subtle</div>
      {AFFIX_STATES.map((s) => (
        <div key={s} {...WRAP}>
          <div style={LABEL.style}>{s}</div>
          <TextInput label="Label" placeholder="Placeholder" showPrefix prefixType="dropdown" prefixStyle="subtle" prefixState={s} prefixText="USD" />
        </div>
      ))}

      <div style={{ fontSize: 13, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 8 }}>Large</div>
      <div {...WRAP}>
        <div style={LABEL.style}>Solid · Large</div>
        <TextInput size="large" label="Label" placeholder="Placeholder" showPrefix prefixType="dropdown-icon" prefixStyle="solid" prefixText="USD" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Subtle · Large</div>
        <TextInput size="large" label="Label" placeholder="Placeholder" showPrefix prefixType="dropdown-icon" prefixStyle="subtle" prefixText="USD" />
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 8 }}>RTL</div>
      <div {...WRAP}>
        <div style={LABEL.style}>RTL — Solid</div>
        <TextInput rtl label="تسمية" placeholder="النص التوضيحي" showPrefix prefixType="dropdown" prefixStyle="solid" prefixText="SAR" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>RTL — Subtle</div>
        <TextInput rtl label="تسمية" placeholder="النص التوضيحي" showPrefix prefixType="dropdown" prefixStyle="subtle" prefixText="SAR" />
      </div>

    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   With Suffix
   ════════════════════════════════════════════════════════════════════ */
export const WithSuffix = {
  name: 'With Suffix',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>

      <div style={{ fontSize: 13, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.06em' }}>Types — Solid</div>
      {[
        { type: 'dropdown',      label: 'Dropdown' },
        { type: 'dropdown-icon', label: 'Dropdown + Icon' },
        { type: 'text',          label: 'Text Only' },
      ].map(({ type, label }) => (
        <div key={type} {...WRAP}>
          <div style={LABEL.style}>{label}</div>
          <TextInput label="Label" placeholder="Placeholder" showSuffix suffixType={type} suffixStyle="solid" suffixText=".com" />
        </div>
      ))}

      <div style={{ fontSize: 13, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 8 }}>States — Solid</div>
      {AFFIX_STATES.map((s) => (
        <div key={s} {...WRAP}>
          <div style={LABEL.style}>{s}</div>
          <TextInput label="Label" placeholder="Placeholder" showSuffix suffixType="dropdown" suffixStyle="solid" suffixState={s} suffixText=".com" />
        </div>
      ))}

      <div style={{ fontSize: 13, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 8 }}>States — Subtle</div>
      {AFFIX_STATES.map((s) => (
        <div key={s} {...WRAP}>
          <div style={LABEL.style}>{s}</div>
          <TextInput label="Label" placeholder="Placeholder" showSuffix suffixType="dropdown" suffixStyle="subtle" suffixState={s} suffixText=".com" />
        </div>
      ))}

      <div style={{ fontSize: 13, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 8 }}>Large</div>
      <div {...WRAP}>
        <div style={LABEL.style}>Solid · Large</div>
        <TextInput size="large" label="Label" placeholder="Placeholder" showSuffix suffixType="dropdown-icon" suffixStyle="solid" suffixText=".com" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Subtle · Large</div>
        <TextInput size="large" label="Label" placeholder="Placeholder" showSuffix suffixType="dropdown-icon" suffixStyle="subtle" suffixText=".com" />
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 8 }}>RTL</div>
      <div {...WRAP}>
        <div style={LABEL.style}>RTL — Solid</div>
        <TextInput rtl label="تسمية" placeholder="النص التوضيحي" showSuffix suffixType="dropdown" suffixStyle="solid" suffixText="SAR" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>RTL — Subtle</div>
        <TextInput rtl label="تسمية" placeholder="النص التوضيحي" showSuffix suffixType="dropdown" suffixStyle="subtle" suffixText="SAR" />
      </div>

    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   With Prefix AND Suffix
   ════════════════════════════════════════════════════════════════════ */
export const WithPrefixAndSuffix = {
  name: 'With Prefix & Suffix',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div {...WRAP}>
        <div style={LABEL.style}>Both — Solid</div>
        <TextInput label="Label" placeholder="Placeholder" showPrefix prefixType="dropdown" prefixStyle="solid" prefixText="USD" showSuffix suffixType="text" suffixStyle="solid" suffixText=".00" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Both — Subtle</div>
        <TextInput label="Label" placeholder="Placeholder" showPrefix prefixType="dropdown" prefixStyle="subtle" prefixText="USD" showSuffix suffixType="text" suffixStyle="subtle" suffixText=".00" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Both — Dropdown+Icon prefix, Text suffix</div>
        <TextInput label="Label" placeholder="Placeholder" showPrefix prefixType="dropdown-icon" prefixStyle="solid" prefixText="USD" showSuffix suffixType="text" suffixStyle="subtle" suffixText="per unit" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Both — Large</div>
        <TextInput size="large" label="Label" placeholder="Placeholder" showPrefix prefixType="dropdown" prefixStyle="solid" prefixText="USD" showSuffix suffixType="dropdown" suffixStyle="solid" suffixText=".com" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Both — Error</div>
        <TextInput error label="Label" placeholder="Placeholder" showPrefix prefixType="dropdown" prefixStyle="solid" prefixText="USD" showSuffix suffixType="text" suffixStyle="solid" suffixText=".00" showHelperText helperText="Invalid amount" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Both — RTL</div>
        <TextInput rtl label="تسمية" placeholder="النص التوضيحي" showPrefix prefixType="dropdown" prefixStyle="solid" prefixText="SAR" showSuffix suffixType="text" suffixStyle="subtle" suffixText="شهرياً" />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Variant — Filled Darker
   ════════════════════════════════════════════════════════════════════ */
export const FilledDarker = {
  name: 'Variant — Filled Darker',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
      {ALL_STATES.map((state) => (
        <div key={state} {...WRAP}>
          <div style={LABEL.style}>{state}</div>
          <TextInput
            variant="filled-darker"
            state={state}
            label="Label"
            placeholder="Placeholder"
            showHelperText
            helperText="Helper text"
            defaultValue={state === 'read-only' || state === 'disabled' ? 'Input value' : undefined}
          />
        </div>
      ))}
      <div {...WRAP}>
        <div style={LABEL.style}>Error</div>
        <TextInput variant="filled-darker" error label="Label" placeholder="Placeholder" showHelperText helperText="This field has an error" />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Variant — Filled Lighter
   ════════════════════════════════════════════════════════════════════ */
export const FilledLighter = {
  name: 'Variant — Filled Lighter',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
      {ALL_STATES.map((state) => (
        <div key={state} {...WRAP}>
          <div style={LABEL.style}>{state}</div>
          <TextInput
            variant="filled-lighter"
            state={state}
            label="Label"
            placeholder="Placeholder"
            showHelperText
            helperText="Helper text"
            defaultValue={state === 'read-only' || state === 'disabled' ? 'Input value' : undefined}
          />
        </div>
      ))}
      <div {...WRAP}>
        <div style={LABEL.style}>Error</div>
        <TextInput variant="filled-lighter" error label="Label" placeholder="Placeholder" showHelperText helperText="This field has an error" />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Full Matrix
   ════════════════════════════════════════════════════════════════════ */
export const FullMatrix = {
  name: 'Full Matrix — All Variants',
  render: () => {
    const col = (label, node) => (
      <div key={label} style={{ width: 280, padding: 16, background: '#f9fafb', borderRadius: 8, border: '1px solid #e5e7eb' }}>
        <div style={LABEL.style}>{label}</div>
        {node}
      </div>
    );
    return (
      <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>

        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600, color: '#111827' }}>Default — All States</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {ALL_STATES.map((state) => col(state,
            <TextInput state={state} label="Label" placeholder="Placeholder"
              defaultValue={state === 'read-only' || state === 'disabled' ? 'Input value' : undefined} />
          ))}
          {col('error', <TextInput error label="Label" placeholder="Placeholder" showHelperText helperText="Error message" />)}
        </div>

        <h3 style={{ margin: '16px 0 8px', fontSize: 16, fontWeight: 600, color: '#111827' }}>Filled Darker — All States</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {ALL_STATES.map((state) => col(state,
            <TextInput variant="filled-darker" state={state} label="Label" placeholder="Placeholder"
              defaultValue={state === 'read-only' || state === 'disabled' ? 'Input value' : undefined} />
          ))}
          {col('error', <TextInput variant="filled-darker" error label="Label" placeholder="Placeholder" showHelperText helperText="Error message" />)}
        </div>

        <h3 style={{ margin: '16px 0 8px', fontSize: 16, fontWeight: 600, color: '#111827' }}>Filled Lighter — All States</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {ALL_STATES.map((state) => col(state,
            <TextInput variant="filled-lighter" state={state} label="Label" placeholder="Placeholder"
              defaultValue={state === 'read-only' || state === 'disabled' ? 'Input value' : undefined} />
          ))}
          {col('error', <TextInput variant="filled-lighter" error label="Label" placeholder="Placeholder" showHelperText helperText="Error message" />)}
        </div>

        <h3 style={{ margin: '16px 0 8px', fontSize: 16, fontWeight: 600, color: '#111827' }}>Large — All States</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {ALL_STATES.map((state) => col(state + ' · large',
            <TextInput size="large" state={state} label="Label" placeholder="Placeholder"
              defaultValue={state === 'read-only' || state === 'disabled' ? 'Input value' : undefined} />
          ))}
          {col('error · large', <TextInput size="large" error label="Label" placeholder="Placeholder" showHelperText helperText="Error message" />)}
        </div>

        <h3 style={{ margin: '16px 0 8px', fontSize: 16, fontWeight: 600, color: '#111827' }}>With Icon — All States</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {ALL_STATES.map((state) => col(state + ' + icon',
            <TextInput size="medium" state={state} showIcon label="Label" placeholder="Placeholder"
              defaultValue={state === 'read-only' || state === 'disabled' ? 'Input value' : undefined} />
          ))}
          {col('error + icon', <TextInput size="medium" error showIcon label="Label" placeholder="Placeholder" />)}
        </div>

        <h3 style={{ margin: '16px 0 8px', fontSize: 16, fontWeight: 600, color: '#111827' }}>Label Variants</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {col('regular label',   <TextInput label="Regular" labelType="regular" placeholder="Placeholder" />)}
          {col('semibold label',  <TextInput label="Semibold" labelType="semibold" placeholder="Placeholder" />)}
          {col('required · LTR', <TextInput label="Required" required placeholder="Placeholder" />)}
          {col('required · RTL', <TextInput label="مطلوب" required rtl placeholder="النص التوضيحي" />)}
        </div>

      </div>
    );
  },
};
