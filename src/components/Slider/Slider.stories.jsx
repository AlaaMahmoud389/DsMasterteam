import React, { useState } from 'react';
import { Slider } from './Slider';

export default {
  title: 'Components/Slider',
  parameters: { layout: 'padded' },
};

/* ── Playground ─────────────────────────────────────────────── */
export const Playground = {
  name: 'Playground — Slider',
  argTypes: {
    size:          { control: 'radio',   options: ['small', 'medium'] },
    range:         { control: 'boolean' },
    rtl:           { control: 'boolean' },
    disabled:      { control: 'boolean' },
    showLabel:     { control: 'boolean' },
    label:         { control: 'text' },
    labelType:     { control: 'radio',   options: ['regular', 'semibold'] },
    required:      { control: 'boolean' },
    showHelperText:{ control: 'boolean' },
    helperText:    { control: 'text' },
    value:         { control: { type: 'number', min: 0, max: 100, step: 1 } },
    minValue:      { control: { type: 'number', min: 0, max: 100, step: 1 } },
    maxValue:      { control: { type: 'number', min: 0, max: 100, step: 1 } },
  },
  args: {
    size: 'medium',
    range: false,
    rtl: false,
    disabled: false,
    showLabel: true,
    label: 'Label',
    labelType: 'regular',
    required: false,
    showHelperText: true,
    helperText: 'Help Text',
    value: 20,
    minValue: 0,
    maxValue: 50,
  },
  render: (args) => {
    const [val, setVal] = useState(args.value);
    const [rangeVals, setRangeVals] = useState({ min: args.minValue, max: args.maxValue });
    return (
      <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 32 }}>
        <Slider
          {...args}
          value={val}
          onChange={setVal}
          minValue={rangeVals.min}
          maxValue={rangeVals.max}
          onRangeChange={setRangeVals}
        />
        <div style={{ marginTop: 16, fontSize: 12, color: '#6b7280' }}>
          {args.range ? `Range: ${rangeVals.min}% – ${rangeVals.max}%` : `Value: ${val}%`}
        </div>
      </div>
    );
  },
};

/* ── Single Slider — Sizes ──────────────────────────────────── */
export const SingleSizes = {
  name: 'Single Slider — Sizes',
  render: () => {
    const [sm, setSm] = useState(20);
    const [md, setMd] = useState(20);
    return (
      <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Small — 20%</p>
          <Slider size="small" value={sm} onChange={setSm} label="Label" helperText="Help Text" />
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Medium — 20%</p>
          <Slider size="medium" value={md} onChange={setMd} label="Label" helperText="Help Text" />
        </div>
      </div>
    );
  },
};

/* ── Single Slider — Values ─────────────────────────────────── */
export const SingleValues = {
  name: 'Single Slider — Values (0 / 20 / 50 / 100)',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[0, 20, 50, 100].map((v) => (
        <div key={v}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>{v}%</p>
          <Slider size="medium" value={v} showHelperText={false} showLabel={false} />
        </div>
      ))}
    </div>
  ),
};

/* ── Range Slider — Sizes ───────────────────────────────────── */
export const RangeSizes = {
  name: 'Range Slider — Sizes',
  render: () => {
    const [smRange, setSmRange] = useState({ min: 0, max: 50 });
    const [mdRange, setMdRange] = useState({ min: 20, max: 70 });
    return (
      <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Small — Range 0%–50%</p>
          <Slider
            size="small" range
            minValue={smRange.min} maxValue={smRange.max}
            onRangeChange={setSmRange}
            label="Label" helperText="Help Text"
          />
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Medium — Range 20%–70%</p>
          <Slider
            size="medium" range
            minValue={mdRange.min} maxValue={mdRange.max}
            onRangeChange={setMdRange}
            label="Label" helperText="Help Text"
          />
        </div>
      </div>
    );
  },
};

/* ── RTL — Single ───────────────────────────────────────────── */
export const RTLSingle = {
  name: 'RTL — Single Slider',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Small RTL — 50%</p>
        <Slider size="small" rtl value={50} label="عنوان" helperText="نص مساعد" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Medium RTL — 50%</p>
        <Slider size="medium" rtl value={50} label="عنوان" helperText="نص مساعد" />
      </div>
    </div>
  ),
};

/* ── RTL — Range ────────────────────────────────────────────── */
export const RTLRange = {
  name: 'RTL — Range Slider',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Small RTL — Left 30% / Right 70%</p>
        <Slider
          size="small" range rtl
          minValue={30} maxValue={70}
          label="عنوان" helperText="نص مساعد"
        />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Medium RTL — Left 30% / Right 70%</p>
        <Slider
          size="medium" range rtl
          minValue={30} maxValue={70}
          label="عنوان" helperText="نص مساعد"
        />
      </div>
    </div>
  ),
};

/* ── Label Variants ─────────────────────────────────────────── */
export const LabelVariants = {
  name: 'Label — Variants',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Regular label</p>
        <Slider value={20} label="Regular Label" labelType="regular" showHelperText={false} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Semibold label</p>
        <Slider value={20} label="Semibold Label" labelType="semibold" showHelperText={false} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Required (*) LTR</p>
        <Slider value={20} label="Required Label" required showHelperText={false} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Required (*) RTL</p>
        <Slider value={20} label="عنوان مطلوب" required rtl showHelperText={false} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Disabled label</p>
        <Slider value={20} label="Disabled Label" disabled showHelperText={false} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>No label</p>
        <Slider value={20} showLabel={false} showHelperText={false} />
      </div>
    </div>
  ),
};

/* ── Visibility ─────────────────────────────────────────────── */
export const Visibility = {
  name: 'Visibility — Label & Helper Text',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Show Label + Show Helper Text</p>
        <Slider value={20} showLabel showHelperText label="Label" helperText="Help Text" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Show Label only</p>
        <Slider value={20} showLabel showHelperText={false} label="Label" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Show Helper Text only</p>
        <Slider value={20} showLabel={false} showHelperText helperText="Help Text" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Neither (track only)</p>
        <Slider value={20} showLabel={false} showHelperText={false} />
      </div>
    </div>
  ),
};

/* ── Disabled ───────────────────────────────────────────────── */
export const Disabled = {
  name: 'Disabled',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Single — Disabled</p>
        <Slider value={50} disabled label="Label" helperText="Help Text" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Range — Disabled</p>
        <Slider range minValue={20} maxValue={70} disabled label="Label" helperText="Help Text" />
      </div>
    </div>
  ),
};

/* ── Full Figma Matrix ───────────────────────────────────────── */
export const FullMatrix = {
  name: 'Full Figma Matrix — All 24 Variants',
  render: () => {
    const variants = [
      { size: 'small',  range: false, rtl: false, value: 20,  label: '20% · Small · LTR' },
      { size: 'small',  range: false, rtl: true,  value: 20,  label: '20% · Small · RTL' },
      { size: 'small',  range: false, rtl: false, value: 0,   label: '0% · Small · LTR' },
      { size: 'small',  range: false, rtl: true,  value: 0,   label: '0% · Small · RTL' },
      { size: 'small',  range: false, rtl: false, value: 50,  label: '50% · Small · LTR' },
      { size: 'small',  range: false, rtl: true,  value: 50,  label: '50% · Small · RTL' },
      { size: 'small',  range: false, rtl: false, value: 100, label: '100% · Small · LTR' },
      { size: 'small',  range: false, rtl: true,  value: 100, label: '100% · Small · RTL' },
      { size: 'small',  range: true,  rtl: false, minValue: 0,  maxValue: 50, label: '0–50% · Small · LTR' },
      { size: 'small',  range: true,  rtl: true,  minValue: 0,  maxValue: 50, label: '0–50% · Small · RTL' },
      { size: 'small',  range: true,  rtl: false, minValue: 20, maxValue: 70, label: '20–70% · Small · LTR' },
      { size: 'small',  range: true,  rtl: true,  minValue: 20, maxValue: 70, label: '20–70% · Small · RTL' },
      { size: 'medium', range: false, rtl: false, value: 20,  label: '20% · Medium · LTR' },
      { size: 'medium', range: false, rtl: true,  value: 20,  label: '20% · Medium · RTL' },
      { size: 'medium', range: false, rtl: false, value: 0,   label: '0% · Medium · LTR' },
      { size: 'medium', range: false, rtl: true,  value: 0,   label: '0% · Medium · RTL' },
      { size: 'medium', range: false, rtl: false, value: 50,  label: '50% · Medium · LTR' },
      { size: 'medium', range: false, rtl: true,  value: 50,  label: '50% · Medium · RTL' },
      { size: 'medium', range: false, rtl: false, value: 100, label: '100% · Medium · LTR' },
      { size: 'medium', range: false, rtl: true,  value: 100, label: '100% · Medium · RTL' },
      { size: 'medium', range: true,  rtl: false, minValue: 0,  maxValue: 50, label: '0–50% · Medium · LTR' },
      { size: 'medium', range: true,  rtl: true,  minValue: 0,  maxValue: 50, label: '0–50% · Medium · RTL' },
      { size: 'medium', range: true,  rtl: false, minValue: 20, maxValue: 70, label: '20–70% · Medium · LTR' },
      { size: 'medium', range: true,  rtl: true,  minValue: 20, maxValue: 70, label: '20–70% · Medium · RTL' },
    ];

    return (
      <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
        {variants.map(({ label, size, range, rtl, value, minValue, maxValue }) => (
          <div key={label} style={{ padding: 16, background: '#f9fafb', borderRadius: 8, border: '1px solid #e5e7eb' }}>
            <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>{label}</p>
            <Slider
              size={size}
              range={range}
              rtl={rtl}
              value={value ?? 20}
              minValue={minValue ?? 0}
              maxValue={maxValue ?? 50}
              label={rtl ? 'عنوان' : 'Label'}
              helperText={rtl ? 'نص مساعد' : 'Help Text'}
            />
          </div>
        ))}
      </div>
    );
  },
};
