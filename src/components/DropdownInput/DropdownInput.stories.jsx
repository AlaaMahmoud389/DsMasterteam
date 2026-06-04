import React, { useState } from 'react';
import { DropdownInput } from './DropdownInput';

/* ── Sample icon (reused across stories) ─────────────────────────── */
function SampleIcon({ color = '#000B36' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="8" r="3.5" stroke={color} strokeWidth="1.5" />
      <path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FlagIcon({ color = '#000B36' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 3v14M4 3h10l-2 4 2 4H4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon({ color = '#000B36' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2l2.4 5 5.6.8-4 3.9.9 5.3L10 14.5l-4.9 2.5.9-5.3L2 7.8l5.6-.8L10 2z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Item sets ───────────────────────────────────────────────────── */
const TEXT_ITEMS = [
  { type: 'group', label: 'Fruits' },
  { type: 'item', value: 'apple',  label: 'Apple' },
  { type: 'item', value: 'banana', label: 'Banana' },
  { type: 'item', value: 'cherry', label: 'Cherry', disabled: true },
  { type: 'group', label: 'Vegetables' },
  { type: 'item', value: 'carrot',  label: 'Carrot' },
  { type: 'item', value: 'spinach', label: 'Spinach' },
  { type: 'item', value: 'broccoli', label: 'Broccoli' },
];

const ICON_ITEMS = [
  { type: 'item', value: 'user',  label: 'User',  icon: <SampleIcon /> },
  { type: 'item', value: 'flag',  label: 'Flag',  icon: <FlagIcon /> },
  { type: 'item', value: 'star',  label: 'Star',  icon: <StarIcon />, disabled: true },
];

const ICON_TEXT_ITEMS = [
  { type: 'group', label: 'People' },
  { type: 'item', value: 'user',  label: 'User Profile', icon: <SampleIcon /> },
  { type: 'item', value: 'flag',  label: 'Country Flag', icon: <FlagIcon /> },
  { type: 'group', label: 'Ratings' },
  { type: 'item', value: 'star',  label: 'Starred', icon: <StarIcon /> },
  { type: 'item', value: 'none',  label: 'No Icon',  disabled: true },
];

export default {
  title: 'Components/DropdownInput',
  component: DropdownInput,
  parameters: { layout: 'padded' },
  argTypes: {
    label:          { control: 'text' },
    showLabel:      { control: 'boolean' },
    labelType:      { control: 'select', options: ['regular', 'semibold'] },
    required:       { control: 'boolean' },
    size:           { control: 'radio', options: ['medium', 'large'] },
    state:          { control: 'select', options: ['default', 'hovered', 'pressed', 'focused', 'read-only', 'disabled'] },
    error:          { control: 'boolean' },
    variant:        { control: 'select', options: ['default', 'filled-darker', 'filled-lighter'] },
    placeholder:    { control: 'text' },
    listType:       { control: 'select', options: ['text', 'text-multi', 'icon', 'icon-text-multi'] },
    showHelperText: { control: 'boolean' },
    helperText:     { control: 'text' },
    rtl:            { control: 'boolean' },
  },
};

/* ── Playground ─────────────────────────────────────────────────── */
export const Playground = {
  render: (args) => {
    const [val, setVal] = useState(null);
    return (
      <div style={{ width: 320, paddingBottom: 300 }}>
        <DropdownInput
          {...args}
          items={TEXT_ITEMS}
          selectedValue={val}
          onSelectionChange={setVal}
        />
      </div>
    );
  },
  args: {
    label: 'Fruit',
    showLabel: true,
    labelType: 'regular',
    required: false,
    size: 'medium',
    state: 'default',
    error: false,
    variant: 'default',
    placeholder: 'Select a fruit',
    listType: 'text',
    showHelperText: false,
    helperText: 'Helper text',
    rtl: false,
  },
};

/* ── Text Only — Single Select ───────────────────────────────────── */
export const TextSingleSelect = {
  name: 'Text Only (Single Select)',
  render: () => {
    const [val, setVal] = useState(null);
    return (
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start', paddingBottom: 300 }}>
        <div style={{ width: 280 }}>
          <DropdownInput
            label="Select a fruit"
            items={TEXT_ITEMS}
            listType="text"
            selectedValue={val}
            onSelectionChange={setVal}
            placeholder="Choose one"
          />
        </div>
        <div style={{ width: 280 }}>
          <DropdownInput
            label="With helper text"
            items={TEXT_ITEMS}
            listType="text"
            selectedValue={val}
            onSelectionChange={setVal}
            placeholder="Choose one"
            showHelperText
            helperText="Pick your favourite"
          />
        </div>
        <div style={{ width: 280 }}>
          <DropdownInput
            label="Error state"
            items={TEXT_ITEMS}
            listType="text"
            selectedValue={val}
            onSelectionChange={setVal}
            placeholder="Choose one"
            error
            showHelperText
            helperText="Selection is required"
          />
        </div>
      </div>
    );
  },
};

/* ── Text Only — Multi Select ────────────────────────────────────── */
export const TextMultiSelect = {
  name: 'Text Only (Multi Select)',
  render: () => {
    const [vals, setVals] = useState([]);
    return (
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start', paddingBottom: 300 }}>
        <div style={{ width: 280 }}>
          <DropdownInput
            label="Select fruits"
            items={TEXT_ITEMS}
            listType="text-multi"
            selectedValues={vals}
            onSelectionChange={setVals}
            placeholder="Choose multiple"
          />
          <p style={{ marginTop: 8, fontSize: 12, color: '#6C7C96', fontFamily: 'IBM Plex Sans Arabic, sans-serif' }}>
            Selected: {vals.join(', ') || 'none'}
          </p>
        </div>
        <div style={{ width: 280 }}>
          <DropdownInput
            label="Large size"
            items={TEXT_ITEMS}
            listType="text-multi"
            selectedValues={vals}
            onSelectionChange={setVals}
            placeholder="Choose multiple"
            size="large"
          />
        </div>
      </div>
    );
  },
};

/* ── Icon Only — Single Select ───────────────────────────────────── */
export const IconSingleSelect = {
  name: 'Icon Only (Single Select)',
  render: () => {
    const [val, setVal] = useState(null);
    return (
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start', paddingBottom: 200 }}>
        <div style={{ width: 280 }}>
          <DropdownInput
            label="Select icon"
            items={ICON_ITEMS}
            listType="icon"
            selectedValue={val}
            onSelectionChange={setVal}
            placeholder="Choose an icon"
          />
          <p style={{ marginTop: 8, fontSize: 12, color: '#6C7C96', fontFamily: 'IBM Plex Sans Arabic, sans-serif' }}>
            Selected: {val || 'none'}
          </p>
        </div>
        <div style={{ width: 280 }}>
          <DropdownInput
            label="Large size"
            items={ICON_ITEMS}
            listType="icon"
            selectedValue={val}
            onSelectionChange={setVal}
            placeholder="Choose an icon"
            size="large"
          />
        </div>
      </div>
    );
  },
};

/* ── Icon + Text — Multi Select ──────────────────────────────────── */
export const IconTextMultiSelect = {
  name: 'Icon + Text (Multi Select)',
  render: () => {
    const [vals, setVals] = useState([]);
    return (
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start', paddingBottom: 280 }}>
        <div style={{ width: 280 }}>
          <DropdownInput
            label="Select items"
            items={ICON_TEXT_ITEMS}
            listType="icon-text-multi"
            selectedValues={vals}
            onSelectionChange={setVals}
            placeholder="Choose multiple"
          />
          <p style={{ marginTop: 8, fontSize: 12, color: '#6C7C96', fontFamily: 'IBM Plex Sans Arabic, sans-serif' }}>
            Selected: {vals.join(', ') || 'none'}
          </p>
        </div>
        <div style={{ width: 280 }}>
          <DropdownInput
            label="With helper text"
            items={ICON_TEXT_ITEMS}
            listType="icon-text-multi"
            selectedValues={vals}
            onSelectionChange={setVals}
            placeholder="Choose multiple"
            showHelperText
            helperText="Select all that apply"
          />
        </div>
      </div>
    );
  },
};

/* ── Field States ────────────────────────────────────────────────── */
const STATES = ['default', 'hovered', 'pressed', 'focused', 'read-only', 'disabled'];

export const FieldStates = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320, paddingBottom: 16 }}>
      {STATES.map((s) => (
        <DropdownInput
          key={s}
          label={s.charAt(0).toUpperCase() + s.slice(1)}
          items={TEXT_ITEMS}
          listType="text"
          state={s}
          placeholder="Select an option"
        />
      ))}
    </div>
  ),
};

/* ── Sizes ──────────────────────────────────────────────────────── */
export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320, paddingBottom: 300 }}>
      <DropdownInput label="Medium (32px)" size="medium" items={TEXT_ITEMS} listType="text" placeholder="Select..." />
      <DropdownInput label="Large (40px)"  size="large"  items={TEXT_ITEMS} listType="text" placeholder="Select..." />
    </div>
  ),
};

/* ── Variants ───────────────────────────────────────────────────── */
export const Variants = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start', paddingBottom: 300 }}>
      {['default', 'filled-darker', 'filled-lighter'].map((v) => (
        <div key={v} style={{ width: 280 }}>
          <p style={{ fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 12, fontWeight: 600, color: '#6C7C96', marginBottom: 12 }}>
            {v}
          </p>
          <DropdownInput
            label="Select option"
            items={TEXT_ITEMS}
            listType="text"
            variant={v}
            placeholder="Select..."
          />
        </div>
      ))}
    </div>
  ),
};

/* ── RTL ────────────────────────────────────────────────────────── */
export const RTL = {
  render: () => {
    const [single, setSingle] = useState(null);
    const [multi, setMulti] = useState([]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320, paddingBottom: 300 }}>
        <DropdownInput
          label="اختر فاكهة"
          items={TEXT_ITEMS}
          listType="text"
          selectedValue={single}
          onSelectionChange={setSingle}
          placeholder="اختيار..."
          rtl
        />
        <DropdownInput
          label="اختر عدة عناصر"
          items={TEXT_ITEMS}
          listType="text-multi"
          selectedValues={multi}
          onSelectionChange={setMulti}
          placeholder="اختيار متعدد..."
          rtl
        />
        <DropdownInput
          label="حالة الخطأ"
          items={TEXT_ITEMS}
          listType="text"
          placeholder="اختيار..."
          error
          showHelperText
          helperText="يرجى اختيار قيمة"
          rtl
        />
      </div>
    );
  },
};

/* ── Group Labels ────────────────────────────────────────────────── */
export const GroupLabels = {
  render: () => (
    <div style={{ width: 320, paddingBottom: 320 }}>
      <DropdownInput
        label="Grouped list"
        items={TEXT_ITEMS}
        listType="text"
        placeholder="Select from a group"
      />
    </div>
  ),
};

/* ── Error States ───────────────────────────────────────────────── */
export const ErrorStates = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320, paddingBottom: 16 }}>
      {['default', 'hovered', 'pressed', 'focused'].map((s) => (
        <DropdownInput
          key={s}
          label={`Error — ${s}`}
          items={TEXT_ITEMS}
          listType="text"
          state={s}
          error
          showHelperText
          helperText="This field has an error"
          placeholder="Select an option"
        />
      ))}
    </div>
  ),
};
