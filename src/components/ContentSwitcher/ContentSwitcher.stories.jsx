import React, { useState } from 'react';
import { ContentSwitcher } from './ContentSwitcher';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4140-89803';

const TWO_ITEMS   = [{ label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' }];
const THREE_ITEMS = [{ label: 'List', value: 'list' }, { label: 'Grid', value: 'grid' }, { label: 'Map', value: 'map' }];
const FOUR_ITEMS  = [{ label: 'Day', value: 'day' }, { label: 'Week', value: 'week' }, { label: 'Month', value: 'month' }, { label: 'Year', value: 'year' }];

export default {
  title: 'Components/ContentSwitcher',
  component: ContentSwitcher,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size — Small / Medium / Large',
    },
    onColor: { control: 'boolean', description: 'On-colour variant (dark background)' },
    disabled: { control: 'boolean' },
    dir: { control: 'radio', options: ['ltr', 'rtl'] },
  },
};

/* ── Playground ─────────────────────────────────────────────── */
export const Playground = {
  args: {
    items: THREE_ITEMS,
    value: 'list',
    size: 'sm',
    onColor: false,
    disabled: false,
    dir: 'ltr',
  },
  render: (args) => {
    const [val, setVal] = React.useState(args.value);
    return <ContentSwitcher {...args} value={val} onChange={setVal} />;
  },
};

/* ── Sizes ──────────────────────────────────────────────────── */
export const Sizes = {
  name: 'Size — Small · Medium · Large',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {['sm', 'md', 'lg'].map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontSize: 12, color: '#6b7280', minWidth: 80, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
            {size === 'sm' ? 'Small (sm)' : size === 'md' ? 'Medium (md)' : 'Large (lg)'}
          </span>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontSize: 12, color: '#6b7280', minWidth: 60, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>2 items</span>
        <ContentSwitcher items={TWO_ITEMS} value="a" size="sm" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontSize: 12, color: '#6b7280', minWidth: 60, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>3 items</span>
        <ContentSwitcher items={THREE_ITEMS} value="list" size="sm" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontSize: 12, color: '#6b7280', minWidth: 60, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>4 items</span>
        <ContentSwitcher items={FOUR_ITEMS} value="day" size="sm" />
      </div>
    </div>
  ),
};

/* ── States ─────────────────────────────────────────────────── */
export const States = {
  name: 'States — Normal · Hovered · Selected · Disabled',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontSize: 12, color: '#6b7280', minWidth: 90, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>No selection</span>
        <ContentSwitcher items={THREE_ITEMS} size="sm" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontSize: 12, color: '#6b7280', minWidth: 90, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>First selected</span>
        <ContentSwitcher items={THREE_ITEMS} value="list" size="sm" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontSize: 12, color: '#6b7280', minWidth: 90, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>Mid selected</span>
        <ContentSwitcher items={THREE_ITEMS} value="grid" size="sm" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontSize: 12, color: '#6b7280', minWidth: 90, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>Last selected</span>
        <ContentSwitcher items={THREE_ITEMS} value="map" size="sm" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontSize: 12, color: '#6b7280', minWidth: 90, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>Disabled</span>
        <ContentSwitcher items={THREE_ITEMS} value="list" size="sm" disabled />
      </div>
    </div>
  ),
};

/* ── On Colour ──────────────────────────────────────────────── */
export const OnColor = {
  name: 'On-colour — All sizes',
  render: () => (
    <div
      style={{
        background: '#00001C',
        padding: 24,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {['sm', 'md', 'lg'].map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontSize: 12, color: '#f9fafb', minWidth: 80, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
            {size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}
          </span>
          <ContentSwitcher items={THREE_ITEMS} value="list" size={size} onColor />
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontSize: 12, color: '#f9fafb', minWidth: 80, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>Disabled</span>
        <ContentSwitcher items={THREE_ITEMS} value="list" size="sm" onColor disabled />
      </div>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
            Default — selected: <strong>{val}</strong>
          </div>
          <ContentSwitcher items={THREE_ITEMS} value={val} onChange={setVal} size="sm" />
        </div>
        <div style={{ background: '#00001C', padding: 16, borderRadius: 8 }}>
          <div style={{ fontSize: 12, color: '#f9fafb', marginBottom: 8, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
            On-colour — selected: <strong>{valOC}</strong>
          </div>
          <ContentSwitcher items={THREE_ITEMS} value={valOC} onChange={setValOC} size="sm" onColor />
        </div>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ContentSwitcher items={arItems} value="list" size="sm" dir="rtl" />
        <ContentSwitcher items={arItems} value="grid" size="md" dir="rtl" />
        <div style={{ background: '#00001C', padding: 16, borderRadius: 8 }}>
          <ContentSwitcher items={arItems} value="list" size="sm" dir="rtl" onColor />
        </div>
      </div>
    );
  },
};

/* ── Full Matrix ────────────────────────────────────────────── */
export const FullMatrix = {
  name: 'Full Matrix — All Sizes × Colour Modes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {['sm', 'md', 'lg'].map((size) => (
        <div key={size}>
          <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
            {size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}
          </div>
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
