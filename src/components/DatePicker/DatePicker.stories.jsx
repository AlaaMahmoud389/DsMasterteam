import { useState } from 'react';
import { DatePicker } from './DatePicker';

/* ── Story meta ─────────────────────────────────────────────── */

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: { layout: 'padded' },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['single', 'range'],
      description: 'Selection mode',
    },
    inline: {
      control: 'boolean',
      description: 'Show calendar inline without a trigger field',
    },
    showInputField: {
      control: 'boolean',
      description: 'Show date display input field(s) above the calendar',
    },
    dualMonth: {
      control: 'boolean',
      description: 'Show two consecutive calendar months side-by-side',
    },
    showQuickOptions: {
      control: 'boolean',
      description: 'Show quick-select shortcuts sidebar (Today, This Week, Last 7 Days …)',
    },
    showSubmitButton: {
      control: 'boolean',
      description: 'Show Apply / Cancel action bar — selection only fires onChange on Apply',
    },
    dir: {
      control: 'radio',
      options: ['ltr', 'rtl'],
      description: 'Text direction',
    },
    disabled: { control: 'boolean' },
    readOnly:  { control: 'boolean' },
    onChange:  { action: 'date changed' },
    onApply:   { action: 'apply clicked' },
    onCancel:  { action: 'cancel clicked' },
  },
};

/* ── Playground ─────────────────────────────────────────────── */

export const Playground = {
  args: {
    mode:             'single',
    inline:           false,
    showInputField:   false,
    dualMonth:        false,
    showQuickOptions: false,
    showSubmitButton: false,
    disabled:         false,
    readOnly:         false,
    dir:              'ltr',
    label:            '',
    helperText:       '',
    errorMessage:     '',
    placeholder:      '',
  },
  render: (args) => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 8 }}>
      <DatePicker {...args} />
    </div>
  ),
};

/* ══════════════════════════════════════════════════════════════════════════
   SINGLE DATE
══════════════════════════════════════════════════════════════════════════ */

export const SingleInline = {
  name: 'Single — Inline Calendar',
  render: () => {
    const [date, setDate] = useState(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <DatePicker inline onChange={setDate} />
        <div style={{ fontSize: 13, color: '#6b7280' }}>
          Selected: <code style={{ fontWeight: 700, color: '#111827' }}>{date ? date.toLocaleDateString() : 'none'}</code>
        </div>
      </div>
    );
  },
};

export const SingleWithTrigger = {
  name: 'Single — With Trigger Field',
  render: () => {
    const [date, setDate] = useState(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minHeight: 520, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <DatePicker
          label="Date"
          helperText="Date will automatically detect Hijri or Georgian date"
          placeholder="DD/MM/YY"
          onChange={setDate}
        />
        <div style={{ fontSize: 13, color: '#6b7280' }}>
          Selected: <code style={{ fontWeight: 700, color: '#111827' }}>{date ? date.toLocaleDateString() : 'none'}</code>
        </div>
      </div>
    );
  },
};

export const SingleWithInputField = {
  name: 'Single — With Input Field',
  render: () => {
    const [date, setDate] = useState(null);
    return (
      <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <DatePicker inline showInputField onChange={setDate} />
      </div>
    );
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   RANGE
══════════════════════════════════════════════════════════════════════════ */

export const RangeInline = {
  name: 'Range — Inline',
  render: () => {
    const [range, setRange] = useState([null, null]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <DatePicker inline mode="range" onChange={setRange} />
        <div style={{ fontSize: 13, color: '#6b7280' }}>
          <code style={{ fontWeight: 700, color: '#111827' }}>
            {range[0] ? range[0].toLocaleDateString() : '—'}
            {' → '}
            {range[1] ? range[1].toLocaleDateString() : '—'}
          </code>
        </div>
      </div>
    );
  },
};

export const RangeWithTrigger = {
  name: 'Range — With Trigger Field',
  render: () => {
    const [range, setRange] = useState([null, null]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minHeight: 540, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <DatePicker
          mode="range"
          label="Date Range"
          helperText="Click start date then end date"
          onChange={setRange}
        />
        <div style={{ fontSize: 13, color: '#6b7280' }}>
          {range[0] ? range[0].toLocaleDateString() : '—'} → {range[1] ? range[1].toLocaleDateString() : '—'}
        </div>
      </div>
    );
  },
};

export const RangeWithInputField = {
  name: 'Range — With Input Field',
  render: () => {
    const [range, setRange] = useState([null, null]);
    return (
      <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <DatePicker inline mode="range" showInputField onChange={setRange} />
      </div>
    );
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   DUAL-MONTH VIEW
══════════════════════════════════════════════════════════════════════════ */

export const DualMonthSingle = {
  name: 'Dual-Month — Single Date',
  render: () => {
    const [date, setDate] = useState(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <DatePicker inline dualMonth onChange={setDate} />
        <div style={{ fontSize: 13, color: '#6b7280' }}>
          Selected: <code style={{ fontWeight: 700, color: '#111827' }}>{date ? date.toLocaleDateString() : 'none'}</code>
        </div>
      </div>
    );
  },
};

export const DualMonthRange = {
  name: 'Dual-Month — Range',
  render: () => {
    const [range, setRange] = useState([null, null]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <DatePicker inline dualMonth mode="range" onChange={setRange} />
        <div style={{ fontSize: 13, color: '#6b7280' }}>
          <code style={{ fontWeight: 700, color: '#111827' }}>
            {range[0] ? range[0].toLocaleDateString() : '—'} → {range[1] ? range[1].toLocaleDateString() : '—'}
          </code>
        </div>
      </div>
    );
  },
};

export const DualMonthWithInputField = {
  name: 'Dual-Month — Range + Input Field',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <DatePicker inline dualMonth mode="range" showInputField />
    </div>
  ),
};

/* ══════════════════════════════════════════════════════════════════════════
   QUICK OPTIONS
══════════════════════════════════════════════════════════════════════════ */

export const QuickOptionsSingle = {
  name: 'Quick Options — Single Month',
  render: () => {
    const [range, setRange] = useState([null, null]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <DatePicker inline mode="range" showQuickOptions onChange={setRange} />
        <div style={{ fontSize: 13, color: '#6b7280' }}>
          <code style={{ fontWeight: 700, color: '#111827' }}>
            {range[0] ? range[0].toLocaleDateString() : '—'} → {range[1] ? range[1].toLocaleDateString() : '—'}
          </code>
        </div>
      </div>
    );
  },
};

export const QuickOptionsDualMonth = {
  name: 'Quick Options — Dual-Month Range',
  render: () => {
    const [range, setRange] = useState([null, null]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <DatePicker inline dualMonth mode="range" showQuickOptions onChange={setRange} />
        <div style={{ fontSize: 13, color: '#6b7280' }}>
          <code style={{ fontWeight: 700, color: '#111827' }}>
            {range[0] ? range[0].toLocaleDateString() : '—'} → {range[1] ? range[1].toLocaleDateString() : '—'}
          </code>
        </div>
      </div>
    );
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   SUBMIT BUTTON
══════════════════════════════════════════════════════════════════════════ */

export const SubmitButtonSingle = {
  name: 'Submit Button — Single Date',
  render: () => {
    const [confirmed, setConfirmed] = useState(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <DatePicker
          inline
          showSubmitButton
          onChange={setConfirmed}
          onApply={() => {}}
          onCancel={() => setConfirmed(null)}
        />
        <div style={{ fontSize: 13, color: '#6b7280' }}>
          Confirmed: <code style={{ fontWeight: 700, color: confirmed ? '#059669' : '#d97706' }}>
            {confirmed ? confirmed.toLocaleDateString() : 'none — click Apply to confirm'}
          </code>
        </div>
      </div>
    );
  },
};

export const SubmitButtonRange = {
  name: 'Submit Button — Range',
  render: () => {
    const [range, setRange] = useState([null, null]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <DatePicker
          inline
          mode="range"
          showSubmitButton
          onChange={setRange}
        />
        <div style={{ fontSize: 13, color: '#6b7280' }}>
          Confirmed:
          <code style={{ fontWeight: 700, color: '#111827', marginLeft: 6 }}>
            {range[0] ? range[0].toLocaleDateString() : '—'} → {range[1] ? range[1].toLocaleDateString() : '—'}
          </code>
        </div>
      </div>
    );
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   FULL-FEATURED
══════════════════════════════════════════════════════════════════════════ */

export const FullFeatured = {
  name: 'Full Featured (All Options)',
  render: () => {
    const [range, setRange] = useState([null, null]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>
          dualMonth + showInputField + showQuickOptions + showSubmitButton + mode="range"
        </p>
        <DatePicker
          inline
          mode="range"
          dualMonth
          showInputField
          showQuickOptions
          showSubmitButton
          onChange={setRange}
        />
        <div style={{ fontSize: 13, color: '#6b7280' }}>
          Confirmed:
          <code style={{ fontWeight: 700, color: '#111827', marginLeft: 6 }}>
            {range[0] ? range[0].toLocaleDateString() : '—'} → {range[1] ? range[1].toLocaleDateString() : '—'}
          </code>
        </div>
      </div>
    );
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   RTL
══════════════════════════════════════════════════════════════════════════ */

export const RTLSingle = {
  name: 'RTL — Single Inline',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <DatePicker inline dir="rtl" />
    </div>
  ),
};

export const RTLDualMonthRange = {
  name: 'RTL — Dual-Month Range',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <DatePicker inline dir="rtl" dualMonth mode="range" showInputField showQuickOptions showSubmitButton />
    </div>
  ),
};

export const RTLWithTrigger = {
  name: 'RTL — With Trigger Field',
  render: () => (
    <div style={{ minHeight: 520, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <DatePicker
        dir="rtl"
        label="عنوان"
        helperText="يتم تلقائيا تحويل التاريخ هجري أو ميلادي"
        placeholder="يوم/شهر/سنة"
      />
    </div>
  ),
};

export const RTLFullFeatured = {
  name: 'RTL — Full Featured',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <DatePicker
        inline
        dir="rtl"
        mode="range"
        dualMonth
        showInputField
        showQuickOptions
        showSubmitButton
      />
    </div>
  ),
};

/* ══════════════════════════════════════════════════════════════════════════
   LTR vs RTL
══════════════════════════════════════════════════════════════════════════ */

export const LTRvsRTL = {
  name: 'LTR vs RTL — Single Calendar',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>LTR</p>
        <DatePicker inline dir="ltr" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>RTL</p>
        <DatePicker inline dir="rtl" />
      </div>
    </div>
  ),
};

/* ══════════════════════════════════════════════════════════════════════════
   TRIGGER STATES
══════════════════════════════════════════════════════════════════════════ */

export const TriggerStates = {
  name: 'Trigger Field States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { label: 'Default',     props: { label: 'Date', placeholder: 'DD/MM/YY' } },
        { label: 'With value',  props: { label: 'Date', defaultValue: new Date(2024, 0, 19) } },
        { label: 'Helper text', props: { label: 'Date', helperText: 'Pick your booking date', defaultValue: new Date(2024, 0, 19) } },
        { label: 'Error',       props: { label: 'Date', errorMessage: 'Invalid date', defaultValue: new Date(2024, 0, 19) } },
        { label: 'Read-only',   props: { label: 'Date', readOnly: true, defaultValue: new Date(2024, 0, 19) } },
        { label: 'Disabled',    props: { label: 'Date', disabled: true, defaultValue: new Date(2024, 0, 19) } },
      ].map(({ label, props }) => (
        <div key={label}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>{label}</p>
          <DatePicker {...props} />
        </div>
      ))}
    </div>
  ),
};

/* ══════════════════════════════════════════════════════════════════════════
   MIN / MAX
══════════════════════════════════════════════════════════════════════════ */

export const WithMinMax = {
  name: 'With Min / Max Dates',
  render: () => {
    const today = new Date();
    const min = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3);
    const max = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <div style={{ background: '#eff3fb', border: '1px solid #bfdbfe', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#1849a9' }}>
          Selectable: <strong>{min.toLocaleDateString()}</strong> → <strong>{max.toLocaleDateString()}</strong>
        </div>
        <DatePicker inline minDate={min} maxDate={max} />
      </div>
    );
  },
};
