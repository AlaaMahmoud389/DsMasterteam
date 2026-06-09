import React, { useState } from 'react';
import { ContentSwitcher } from './ContentSwitcher';

const TWO_ITEMS   = [{ label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' }];
const THREE_ITEMS = [{ label: 'List', value: 'list' }, { label: 'Grid', value: 'grid' }, { label: 'Map', value: 'map' }];
const FOUR_ITEMS  = [{ label: 'Day', value: 'day' }, { label: 'Week', value: 'week' }, { label: 'Month', value: 'month' }, { label: 'Year', value: 'year' }];

/* ── Story meta ─────────────────────────────────────────────── */

export default {
  title: 'Components/ContentSwitcher',
  component: ContentSwitcher,
  parameters: { layout: 'padded' },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size — Small / Medium / Large',
    },
    onColor: { control: 'boolean', description: 'On-colour variant (dark background)' },
    disabled: { control: 'boolean', description: 'Disable all items' },
    dir:      { control: 'radio', options: ['ltr', 'rtl'], description: 'Text direction' },
  },
};

/* ── Playground ─────────────────────────────────────────────── */
export const Playground = {
  args: {
    items:    THREE_ITEMS,
    value:    'list',
    size:     'sm',
    onColor:  false,
    disabled: false,
    dir:      'ltr',
  },
  render: (args) => {
    const [val, setVal] = React.useState(args.value);
    return (
      <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 8 }}>
        <ContentSwitcher {...args} value={val} onChange={setVal} />
      </div>
    );
  },
};

/* ── Sizes ──────────────────────────────────────────────────── */
export const Sizes = {
  name: 'Size — Small · Medium · Large',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { size: 'sm', label: 'Small (sm) — 32 px height' },
        { size: 'md', label: 'Medium (md) — 40 px height' },
        { size: 'lg', label: 'Large (lg) — 48 px height' },
      ].map(({ size, label }) => (
        <div key={size}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>{label}</p>
          <ContentSwitcher items={THREE_ITEMS} value="list" size={size} />
        </div>
      ))}
    </div>
  ),
};

/* ── Item Count ─────────────────────────────────────────────── */
export const ItemCount = {
  name: 'Item Count — 2 · 3 · 4',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { label: '2 items — binary toggle', items: TWO_ITEMS,   value: 'a' },
        { label: '3 items — recommended',   items: THREE_ITEMS, value: 'list' },
        { label: '4 items — maximum',       items: FOUR_ITEMS,  value: 'day' },
      ].map(({ label, items, value }) => (
        <div key={label}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>{label}</p>
          <ContentSwitcher items={items} value={value} size="sm" />
        </div>
      ))}
    </div>
  ),
};

/* ── States ─────────────────────────────────────────────────── */
export const States = {
  name: 'States — Normal · Selected · Disabled',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { label: 'No selection',    props: { size: 'sm' } },
        { label: 'First selected',  props: { size: 'sm', value: 'list' } },
        { label: 'Middle selected', props: { size: 'sm', value: 'grid' } },
        { label: 'Last selected',   props: { size: 'sm', value: 'map' } },
        { label: 'Disabled',        props: { size: 'sm', value: 'list', disabled: true } },
      ].map(({ label, props }) => (
        <div key={label}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>{label}</p>
          <ContentSwitcher items={THREE_ITEMS} {...props} />
        </div>
      ))}
    </div>
  ),
};

/* ── On Colour ──────────────────────────────────────────────── */
export const OnColor = {
  name: 'On-colour — All sizes',
  render: () => (
    <div style={{ background: '#00001C', padding: 24, borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { label: 'Small (sm)',  size: 'sm' },
        { label: 'Medium (md)', size: 'md' },
        { label: 'Large (lg)',  size: 'lg' },
        { label: 'Disabled',   size: 'sm', extra: { disabled: true } },
      ].map(({ label, size, extra = {} }) => (
        <div key={label}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#93aee5' }}>{label}</p>
          <ContentSwitcher items={THREE_ITEMS} value="list" size={size} onColor {...extra} />
        </div>
      ))}
    </div>
  ),
};

/* ── Interactive ────────────────────────────────────────────── */
export const Interactive = {
  name: 'Interactive — Toggle selection',
  render: () => {
    const [val, setVal] = useState('list');
    const [valOC, setValOC] = useState('list');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>
            Default — selected: <strong>{val}</strong>
          </p>
          <ContentSwitcher items={THREE_ITEMS} value={val} onChange={setVal} size="sm" />
        </div>
        <div style={{ background: '#00001C', padding: 16, borderRadius: 8 }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#93aee5' }}>
            On-colour — selected: <strong style={{ color: '#f9fafb' }}>{valOC}</strong>
          </p>
          <ContentSwitcher items={THREE_ITEMS} value={valOC} onChange={setValOC} size="sm" onColor />
        </div>
        <p style={{ margin: 0, fontSize: 12, color: '#6C7C96' }}>
          Click any item to switch the active selection. The active value is shown above each switcher.
        </p>
      </div>
    );
  },
};

/* ── RTL ────────────────────────────────────────────────────── */
export const RTL = {
  name: 'RTL — Arabic',
  render: () => {
    const arItems = [
      { label: 'قائمة', value: 'list' },
      { label: 'شبكة',  value: 'grid' },
      { label: 'خريطة', value: 'map'  },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>RTL — Small</p>
          <ContentSwitcher items={arItems} value="list" size="sm" dir="rtl" />
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>RTL — Medium</p>
          <ContentSwitcher items={arItems} value="grid" size="md" dir="rtl" />
        </div>
        <div style={{ background: '#00001C', padding: 16, borderRadius: 8 }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#93aee5' }}>RTL — On-colour</p>
          <ContentSwitcher items={arItems} value="list" size="sm" dir="rtl" onColor />
        </div>
        <p style={{ margin: 0, fontSize: 12, color: '#6C7C96' }}>
          dir="rtl" — corner radii mirror automatically via CSS logical properties. First item's rounded corners appear on the right.
        </p>
      </div>
    );
  },
};

/* ── Full Matrix ────────────────────────────────────────────── */
export const FullMatrix = {
  name: 'Full Matrix — All Sizes × Colour Modes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { size: 'sm', label: 'Small (sm)' },
        { size: 'md', label: 'Medium (md)' },
        { size: 'lg', label: 'Large (lg)' },
      ].map(({ size, label }) => (
        <div key={size}>
          <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>{label}</p>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            <ContentSwitcher items={THREE_ITEMS} value="list" size={size} />
            <div style={{ background: '#00001C', padding: '8px 12px', borderRadius: 6 }}>
              <ContentSwitcher items={THREE_ITEMS} value="list" size={size} onColor />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};
