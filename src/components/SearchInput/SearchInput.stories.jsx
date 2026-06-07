import React, { useState } from 'react';
import { SearchInput } from './SearchInput';

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: { layout: 'padded' },
  argTypes: {
    label:          { control: 'text' },
    showLabel:      { control: 'boolean' },
    labelType:      { control: 'select', options: ['regular', 'semibold'] },
    required:       { control: 'boolean' },
    size:           { control: 'radio', options: ['medium', 'large'] },
    state:          { control: 'select', options: ['default', 'hovered', 'pressed', 'focused', 'read-only', 'disabled'] },
    variant:        { control: 'select', options: ['default', 'filled-darker', 'filled-lighter'] },
    placeholder:    { control: 'text' },
    value:          { control: 'text' },
    showHelperText: { control: 'boolean' },
    helperText:     { control: 'text' },
    rtl:            { control: 'boolean' },
  },
};

/* ── Playground ─────────────────────────────────────────────────── */
export const Playground = {
  render: (args) => {
    const [val, setVal] = useState(args.value ?? '');
    return (
      <div style={{ width: 320 }}>
        <SearchInput
          {...args}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onClear={() => setVal('')}
        />
      </div>
    );
  },
  args: {
    label: 'Search',
    showLabel: true,
    labelType: 'regular',
    required: false,
    size: 'medium',
    state: 'default',
    variant: 'default',
    placeholder: 'Search...',
    value: '',
    showHelperText: false,
    helperText: 'Enter a keyword to search',
    rtl: false,
  },
};

/* ── Field States ────────────────────────────────────────────────── */
const STATES = ['default', 'hovered', 'pressed', 'focused', 'read-only', 'disabled'];

export const FieldStates = {
  name: 'Field States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      {STATES.map((s) => (
        <SearchInput
          key={s}
          label={s.charAt(0).toUpperCase() + s.slice(1)}
          state={s}
          value={s === 'read-only' ? 'Read-only value' : ''}
          onChange={() => {}}
          placeholder="Search..."
        />
      ))}
    </div>
  ),
};

/* ── Clear Button (focused + value) ─────────────────────────────── */
export const ClearButton = {
  name: 'Clear Button Visible',
  render: () => {
    const [val, setVal] = useState('Design system');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
        <p style={{ margin: '0 0 8px', fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 13, color: '#6C7C96' }}>
          Focused state with text — clear button appears
        </p>
        <SearchInput
          label="Search"
          state="focused"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onClear={() => setVal('')}
          placeholder="Search..."
        />
        <p style={{ margin: '0 0 8px', fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 13, color: '#6C7C96' }}>
          Focused state without text — clear button hidden
        </p>
        <SearchInput
          label="Search"
          state="focused"
          value=""
          onChange={() => {}}
          placeholder="Search..."
        />
      </div>
    );
  },
};

/* ── Sizes ──────────────────────────────────────────────────────── */
export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <SearchInput label="Medium (32px)" size="medium" value="" onChange={() => {}} placeholder="Search..." />
      <SearchInput label="Large (40px)"  size="large"  value="" onChange={() => {}} placeholder="Search..." />
    </div>
  ),
};

/* ── Variants ───────────────────────────────────────────────────── */
export const Variants = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {['default', 'filled-darker', 'filled-lighter'].map((v) => (
        <div key={v} style={{ width: 280 }}>
          <p style={{ fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 12, fontWeight: 600, color: '#6C7C96', marginBottom: 12, marginTop: 0 }}>
            {v}
          </p>
          <SearchInput
            label="Search"
            variant={v}
            value=""
            onChange={() => {}}
            placeholder="Search..."
          />
        </div>
      ))}
    </div>
  ),
};

/* ── With Helper Text ────────────────────────────────────────────── */
export const WithHelperText = {
  name: 'With Helper Text',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
        <SearchInput
          label="Product search"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onClear={() => setVal('')}
          placeholder="Search products..."
          showHelperText={true}
          helperText="Search by name, SKU, or category"
        />
        <SearchInput
          label="Large with helper"
          size="large"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onClear={() => setVal('')}
          placeholder="Search products..."
          showHelperText={true}
          helperText="Search by name, SKU, or category"
        />
      </div>
    );
  },
};

/* ── RTL ────────────────────────────────────────────────────────── */
export const RTL = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320 }}>
        <SearchInput
          label="بحث"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onClear={() => setVal('')}
          placeholder="ابحث هنا..."
          rtl={true}
        />
        <SearchInput
          label="بحث مع نص مساعد"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onClear={() => setVal('')}
          placeholder="ابحث هنا..."
          showHelperText={true}
          helperText="أدخل كلمة للبحث"
          rtl={true}
        />
        <SearchInput
          label="معطّل"
          state="disabled"
          value=""
          onChange={() => {}}
          placeholder="ابحث هنا..."
          rtl={true}
        />
      </div>
    );
  },
};

/* ── Full Matrix ─────────────────────────────────────────────────── */
export const FullMatrix = {
  name: 'Full Matrix',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
      {STATES.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ margin: 0, fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 11, fontWeight: 600, color: '#6C7C96', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {s}
          </p>
          <SearchInput
            label="Search"
            state={s}
            value={s === 'focused' ? 'with text' : (s === 'read-only' ? 'Read-only value' : '')}
            onChange={() => {}}
            placeholder="Search..."
            size="medium"
          />
          <SearchInput
            showLabel={false}
            state={s}
            value={s === 'focused' ? 'with text' : (s === 'read-only' ? 'Read-only value' : '')}
            onChange={() => {}}
            placeholder="Search..."
            size="large"
          />
        </div>
      ))}
    </div>
  ),
};
