import { useState } from 'react';
import { Radio, RadioGroup } from './Radio';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4250-1933&t=fWTlS4h9RZJZvHwC-1';

export default {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    radioStyle: {
      control: 'radio',
      options: ['primary', 'neutral'],
      description: 'Color style of the radio button',
      table: { defaultValue: { summary: 'primary' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    readOnly: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    rtl: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    label: { control: 'text' },
    helperText: { control: 'text' },
    errorText: { control: 'text' },
  },
  args: {
    label:      'Radio Label',
    helperText: 'When a selection needs a further explanation, it goes here.',
    radioStyle: 'primary',
    disabled:   false,
    readOnly:   false,
    rtl:        false,
  },
};

/* ── Playground ─────────────────────────────────────────────── */

export const Playground = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Radio
        {...args}
        id="playground"
        name="playground"
        value="a"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    );
  },
};

/* ── States grid — Primary ───────────────────────────────────── */

export const PrimaryStates = {
  name: 'Primary — All States',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      {[
        { label: 'Default (unselected)',   checked: false, disabled: false },
        { label: 'Default (selected)',     checked: true,  disabled: false },
        { label: 'Disabled (unselected)',  checked: false, disabled: true  },
        { label: 'Disabled (selected)',    checked: true,  disabled: true  },
        { label: 'Read-only (unselected)', checked: false, readOnly: true  },
        { label: 'Read-only (selected)',   checked: true,  readOnly: true  },
      ].map(({ label, ...props }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</span>
          <Radio
            name="primary-states"
            value={label}
            label="Option label"
            helperText="Helper text"
            radioStyle="primary"
            onChange={() => {}}
            {...props}
          />
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};

/* ── States grid — Neutral ───────────────────────────────────── */

export const NeutralStates = {
  name: 'Neutral — All States',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      {[
        { label: 'Default (unselected)',  checked: false, disabled: false },
        { label: 'Default (selected)',    checked: true,  disabled: false },
        { label: 'Disabled (unselected)', checked: false, disabled: true  },
        { label: 'Disabled (selected)',   checked: true,  disabled: true  },
        { label: 'Read-only (unsel.)',    checked: false, readOnly: true  },
        { label: 'Read-only (selected)', checked: true,  readOnly: true  },
      ].map(({ label, ...props }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</span>
          <Radio
            name="neutral-states"
            value={label}
            label="Option label"
            helperText="Helper text"
            radioStyle="neutral"
            onChange={() => {}}
            {...props}
          />
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};

/* ── Styles side-by-side ─────────────────────────────────────── */

export const StyleComparison = {
  name: 'Primary vs Neutral',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
      {['primary', 'neutral'].map((s) => (
        <div key={s}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: 12 }}>{s}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Radio name={s} value="a" label="Unselected" radioStyle={s} defaultChecked={false} onChange={() => {}} />
            <Radio name={s} value="b" label="Selected"   radioStyle={s} defaultChecked={true}  onChange={() => {}} />
            <Radio name={s} value="c" label="Disabled"   radioStyle={s} disabled onChange={() => {}} />
            <Radio name={s} value="d" label="Read-only"  radioStyle={s} readOnly defaultChecked={true} onChange={() => {}} />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};

/* ── With error ──────────────────────────────────────────────── */

export const WithError = {
  name: 'With Error Message',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <RadioGroup
        legend="Select a subscription plan"
        name="plan-error"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        radioStyle="primary"
        errorText={!val ? 'Please select an option to continue.' : undefined}
        options={[
          { value: 'free',  label: 'Free',    helperText: 'Up to 3 projects' },
          { value: 'pro',   label: 'Pro',     helperText: 'Unlimited projects + analytics' },
          { value: 'team',  label: 'Team',    helperText: 'Collaboration for up to 10 people' },
        ]}
      />
    );
  },
  parameters: { layout: 'padded' },
};

/* ── RadioGroup — vertical ───────────────────────────────────── */

export const GroupVertical = {
  name: 'Radio Group — Vertical',
  render: () => {
    const [val, setVal] = useState('email');
    return (
      <RadioGroup
        legend="Preferred contact method"
        name="contact"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        radioStyle="primary"
        options={[
          { value: 'email', label: 'Email',       helperText: 'We will send updates to your inbox' },
          { value: 'sms',   label: 'SMS',         helperText: 'Text messages to your phone number' },
          { value: 'push',  label: 'Push notification', helperText: 'Requires app installed' },
          { value: 'none',  label: 'No notifications' },
        ]}
      />
    );
  },
  parameters: { layout: 'padded' },
};

/* ── RadioGroup — horizontal ─────────────────────────────────── */

export const GroupHorizontal = {
  name: 'Radio Group — Horizontal',
  render: () => {
    const [val, setVal] = useState('m');
    return (
      <RadioGroup
        legend="Size"
        name="size"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        radioStyle="primary"
        orientation="horizontal"
        options={[
          { value: 's', label: 'Small'  },
          { value: 'm', label: 'Medium' },
          { value: 'l', label: 'Large'  },
          { value: 'xl', label: 'X-Large' },
        ]}
      />
    );
  },
  parameters: { layout: 'padded' },
};

/* ── RTL ─────────────────────────────────────────────────────── */

export const RTLArabic = {
  name: 'RTL / Arabic',
  render: () => {
    const [val, setVal] = useState('email');
    return (
      <RadioGroup
        legend="طريقة التواصل المفضلة"
        name="contact-ar"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        radioStyle="primary"
        rtl
        options={[
          { value: 'email', label: 'البريد الإلكتروني', helperText: 'سيتم إرسال التحديثات إلى بريدك الوارد' },
          { value: 'sms',   label: 'الرسائل القصيرة',   helperText: 'رسائل نصية إلى رقم هاتفك' },
          { value: 'push',  label: 'الإشعارات الفورية', helperText: 'يتطلب تثبيت التطبيق' },
        ]}
      />
    );
  },
  parameters: { layout: 'padded' },
};

/* ── Neutral group ───────────────────────────────────────────── */

export const NeutralGroup = {
  name: 'Neutral Style Group',
  render: () => {
    const [val, setVal] = useState('light');
    return (
      <RadioGroup
        legend="Color theme"
        name="theme"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        radioStyle="neutral"
        options={[
          { value: 'light',  label: 'Light',  helperText: 'White background, dark text' },
          { value: 'dark',   label: 'Dark',   helperText: 'Dark background, light text' },
          { value: 'system', label: 'System', helperText: 'Matches your OS preference' },
        ]}
      />
    );
  },
  parameters: { layout: 'padded' },
};

/* ── Disabled group ──────────────────────────────────────────── */

export const DisabledGroup = {
  name: 'Disabled State',
  render: () => (
    <RadioGroup
      legend="Account type (read-only)"
      name="account"
      value="premium"
      onChange={() => {}}
      radioStyle="primary"
      disabled
      options={[
        { value: 'free',    label: 'Free plan' },
        { value: 'premium', label: 'Premium plan' },
        { value: 'team',    label: 'Team plan' },
      ]}
    />
  ),
  parameters: { layout: 'padded' },
};
