import React, { useState } from 'react';
import { PasswordInput } from './PasswordInput';

const FONT = "'IBM Plex Sans Arabic', system-ui, sans-serif";

export default {
  title: 'Components/PasswordInput',
  component: PasswordInput,
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

const WRAP = { style: { maxWidth: 320 } };

const ALL_STATES = ['default', 'hovered', 'pressed', 'focused', 'read-only', 'disabled'];
const AFFIX_STATES = ['default', 'hovered', 'pressed', 'selected', 'focused', 'disabled'];

/* ════════════════════════════════════════════════════════════════════
   Playground
   ════════════════════════════════════════════════════════════════════ */
export const Playground = {
  name: 'Playground — Password Input',
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
    prefixState:   { control: 'select', options: AFFIX_STATES },
    prefixText:    { control: 'text' },
    showSuffix:    { control: 'boolean' },
    suffixType:    { control: 'select', options: ['dropdown', 'dropdown-icon', 'text'] },
    suffixStyle:   { control: 'select', options: ['solid', 'subtle'] },
    suffixState:   { control: 'select', options: AFFIX_STATES },
    suffixText:    { control: 'text' },
    rtl:           { control: 'boolean' },
  },
  args: {
    size: 'medium',
    state: 'default',
    error: false,
    variant: 'default',
    label: 'Password',
    showLabel: true,
    labelType: 'regular',
    required: false,
    placeholder: 'Enter your password',
    showIcon: false,
    showHelperText: false,
    helperText: 'Helper text',
    showPrefix: false,
    prefixType: 'dropdown',
    prefixStyle: 'solid',
    prefixState: 'default',
    prefixText: 'Prefix',
    showSuffix: false,
    suffixType: 'dropdown',
    suffixStyle: 'solid',
    suffixState: 'default',
    suffixText: 'Suffix',
    rtl: false,
  },
  render: (args) => {
    const [val, setVal] = useState('');
    return (
      <div style={{ fontFamily: FONT, padding: 32, maxWidth: 320 }}>
        <PasswordInput {...args} value={val} onChange={(e) => setVal(e.target.value)} />
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   All States
   ════════════════════════════════════════════════════════════════════ */
export const States = {
  name: 'States — All',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
      {ALL_STATES.map((state) => (
        <div key={state} {...WRAP}>
          <div style={LABEL.style}>{state}</div>
          <PasswordInput
            state={state}
            label="Password"
            placeholder="Enter your password"
            showHelperText
            helperText="Helper text"
            defaultValue={state === 'read-only' || state === 'disabled' ? 'mySecretPassword' : undefined}
          />
        </div>
      ))}
      <div {...WRAP}>
        <div style={LABEL.style}>Error</div>
        <PasswordInput
          error
          label="Password"
          placeholder="Enter your password"
          showHelperText
          helperText="Password is incorrect"
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
        <PasswordInput size="medium" label="Password" placeholder="Enter your password" showHelperText helperText="Helper text" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Large — 40px</div>
        <PasswordInput size="large" label="Password" placeholder="Enter your password" showHelperText helperText="Helper text" />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Variants
   ════════════════════════════════════════════════════════════════════ */
export const Variants = {
  name: 'Variants',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div {...WRAP}>
        <div style={LABEL.style}>Default</div>
        <PasswordInput label="Password" placeholder="Enter your password" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Filled Darker</div>
        <PasswordInput variant="filled-darker" label="Password" placeholder="Enter your password" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Filled Lighter</div>
        <PasswordInput variant="filled-lighter" label="Password" placeholder="Enter your password" />
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
        <PasswordInput label="Password" labelType="regular" placeholder="Enter your password" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Semibold label</div>
        <PasswordInput label="Password" labelType="semibold" placeholder="Enter your password" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Required (*)</div>
        <PasswordInput label="Password" required placeholder="Enter your password" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Disabled label</div>
        <PasswordInput label="Password" state="disabled" placeholder="Enter your password" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>No label</div>
        <PasswordInput showLabel={false} placeholder="Enter your password" />
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
        <PasswordInput label="Password" placeholder="Enter your password" showHelperText helperText="Minimum 8 characters" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Error with helper text</div>
        <PasswordInput error label="Password" placeholder="Enter your password" showHelperText helperText="Password is incorrect" />
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
          <PasswordInput
            state={state}
            showIcon
            label="Password"
            placeholder="Enter your password"
            defaultValue={state === 'read-only' || state === 'disabled' ? 'mySecretPassword' : undefined}
          />
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   With Prefix
   ════════════════════════════════════════════════════════════════════ */
export const WithPrefix = {
  name: 'With Prefix',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div {...WRAP}>
        <div style={LABEL.style}>Solid</div>
        <PasswordInput label="Password" placeholder="Enter your password" showPrefix prefixType="text" prefixStyle="solid" prefixText="user@" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>Subtle</div>
        <PasswordInput label="Password" placeholder="Enter your password" showPrefix prefixType="text" prefixStyle="subtle" prefixText="user@" />
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
        <PasswordInput rtl label="كلمة المرور" placeholder="أدخل كلمة المرور" showHelperText helperText="8 أحرف على الأقل" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>RTL — Error</div>
        <PasswordInput rtl error label="كلمة المرور" placeholder="أدخل كلمة المرور" showHelperText helperText="كلمة المرور غير صحيحة" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>RTL — Disabled</div>
        <PasswordInput rtl state="disabled" label="كلمة المرور" placeholder="أدخل كلمة المرور" />
      </div>
      <div {...WRAP}>
        <div style={LABEL.style}>RTL — Required</div>
        <PasswordInput rtl label="كلمة المرور" required placeholder="أدخل كلمة المرور" />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Full Matrix
   ════════════════════════════════════════════════════════════════════ */
export const FullMatrix = {
  name: 'Full Matrix',
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
            <PasswordInput state={state} label="Password" placeholder="Enter your password"
              defaultValue={state === 'read-only' || state === 'disabled' ? 'mySecretPassword' : undefined} />
          ))}
          {col('error', <PasswordInput error label="Password" placeholder="Enter your password" showHelperText helperText="Password is incorrect" />)}
        </div>

        <h3 style={{ margin: '16px 0 8px', fontSize: 16, fontWeight: 600, color: '#111827' }}>Filled Darker — All States</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {ALL_STATES.map((state) => col(state,
            <PasswordInput variant="filled-darker" state={state} label="Password" placeholder="Enter your password"
              defaultValue={state === 'read-only' || state === 'disabled' ? 'mySecretPassword' : undefined} />
          ))}
          {col('error', <PasswordInput variant="filled-darker" error label="Password" placeholder="Enter your password" showHelperText helperText="Password is incorrect" />)}
        </div>

        <h3 style={{ margin: '16px 0 8px', fontSize: 16, fontWeight: 600, color: '#111827' }}>Large — All States</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {ALL_STATES.map((state) => col(state + ' · large',
            <PasswordInput size="large" state={state} label="Password" placeholder="Enter your password"
              defaultValue={state === 'read-only' || state === 'disabled' ? 'mySecretPassword' : undefined} />
          ))}
          {col('error · large', <PasswordInput size="large" error label="Password" placeholder="Enter your password" showHelperText helperText="Password is incorrect" />)}
        </div>

        <h3 style={{ margin: '16px 0 8px', fontSize: 16, fontWeight: 600, color: '#111827' }}>With Leading Icon — All States</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {ALL_STATES.map((state) => col(state + ' + icon',
            <PasswordInput state={state} showIcon label="Password" placeholder="Enter your password"
              defaultValue={state === 'read-only' || state === 'disabled' ? 'mySecretPassword' : undefined} />
          ))}
          {col('error + icon', <PasswordInput error showIcon label="Password" placeholder="Enter your password" />)}
        </div>

      </div>
    );
  },
};
