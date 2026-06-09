import React from 'react';
import { ListItem, List } from './Lists';

export default {
  title: 'Components/Lists',
  parameters: { layout: 'padded' },
};

/* ── Playground — List Item ─────────────────────────────────── */
export const PlaygroundListItem = {
  name: 'Playground — List Item',
  argTypes: {
    type:     { control: 'radio',   options: ['ordered', 'unordered', 'with-icon'] },
    level:    { control: 'radio',   options: [1, 2] },
    style:    { control: 'radio',   options: ['primary', 'neutral', 'on-color'] },
    rtl:      { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    type: 'unordered',
    level: 1,
    style: 'primary',
    rtl: false,
    children: 'List item',
  },
  render: (args) => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 16 }}>
      <ListItem {...args} />
    </div>
  ),
};

/* ── Playground — List ──────────────────────────────────────── */
export const PlaygroundList = {
  name: 'Playground — List',
  argTypes: {
    type:  { control: 'radio', options: ['ordered', 'unordered', 'with-icon'] },
    style: { control: 'radio', options: ['primary', 'neutral', 'on-color'] },
    rtl:   { control: 'boolean' },
  },
  args: {
    type: 'ordered',
    style: 'primary',
    rtl: false,
  },
  render: (args) => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 16 }}>
      <List
        {...args}
        items={[
          { children: 'First item',  level: 1 },
          { children: 'Sub-item one', level: 2 },
          { children: 'Sub-item two', level: 2 },
          { children: 'Second item', level: 1 },
        ]}
      />
    </div>
  ),
};

/* ── List Item — Types × Levels ─────────────────────────────── */
export const ListItemTypes = {
  name: 'List Item — Types × Levels',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { label: 'Ordered — Level One',   type: 'ordered',   level: 1, marker: '1-' },
        { label: 'Ordered — Level Two',   type: 'ordered',   level: 2, marker: 'a-' },
        { label: 'Unordered — Level One', type: 'unordered', level: 1, marker: '-'  },
        { label: 'Unordered — Level Two', type: 'unordered', level: 2, marker: '•'  },
        { label: 'With Icon — Level One', type: 'with-icon', level: 1 },
        { label: 'With Icon — Level Two', type: 'with-icon', level: 2 },
      ].map(({ label, type, level, marker }) => (
        <div key={label}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>{label}</p>
          <ListItem type={type} level={level} style="primary" marker={marker}>List item</ListItem>
        </div>
      ))}
    </div>
  ),
};

/* ── List Item — All Styles ─────────────────────────────────── */
export const ListItemStyles = {
  name: 'List Item — All Styles',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Style = Primary</p>
        <ListItem type="unordered" style="primary">List item</ListItem>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Style = Neutral</p>
        <ListItem type="unordered" style="neutral">List item</ListItem>
      </div>
      <div style={{ background: '#000b36', padding: 16, borderRadius: 8 }}>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Style = On-Color</p>
        <ListItem type="unordered" style="on-color">List item</ListItem>
      </div>
    </div>
  ),
};

/* ── List Item — RTL ────────────────────────────────────────── */
export const ListItemRTL = {
  name: 'List Item — RTL',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Ordered — Level One — RTL</p>
        <ListItem type="ordered" level={1} style="primary" rtl marker="1-">عنصر قائمة</ListItem>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Ordered — Level Two — RTL</p>
        <ListItem type="ordered" level={2} style="primary" rtl marker="أ-">عنصر قائمة</ListItem>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Unordered — Level One — RTL</p>
        <ListItem type="unordered" level={1} style="primary" rtl>عنصر قائمة</ListItem>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Unordered — Level Two — RTL</p>
        <ListItem type="unordered" level={2} style="primary" rtl>عنصر قائمة</ListItem>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>With Icon — RTL — Primary</p>
        <ListItem type="with-icon" level={1} style="primary" rtl>عنصر قائمة</ListItem>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>With Icon — RTL — Neutral</p>
        <ListItem type="with-icon" level={1} style="neutral" rtl>عنصر قائمة</ListItem>
      </div>
    </div>
  ),
};

/* ── List — Ordered ─────────────────────────────────────────── */
export const OrderedLists = {
  name: 'List — Ordered',
  render: () => {
    const items = [
      { children: 'List item', level: 1 },
      { children: 'List item', level: 2 },
      { children: 'List item', level: 2 },
      { children: 'List item', level: 2 },
    ];
    return (
      <div style={{ display: 'flex', gap: 64, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", flexWrap: 'wrap' }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Primary</p>
          <List type="ordered" style="primary" items={items} />
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Neutral</p>
          <List type="ordered" style="neutral" items={items} />
        </div>
        <div style={{ background: '#000b36', padding: 16, borderRadius: 8 }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>On-Color</p>
          <List type="ordered" style="on-color" items={items} />
        </div>
      </div>
    );
  },
};

/* ── List — Unordered ───────────────────────────────────────── */
export const UnorderedLists = {
  name: 'List — Unordered',
  render: () => {
    const items = [
      { children: 'List item', level: 1 },
      { children: 'List item', level: 2 },
      { children: 'List item', level: 2 },
      { children: 'List item', level: 2 },
    ];
    return (
      <div style={{ display: 'flex', gap: 64, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", flexWrap: 'wrap' }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Primary</p>
          <List type="unordered" style="primary" items={items} />
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Neutral</p>
          <List type="unordered" style="neutral" items={items} />
        </div>
        <div style={{ background: '#000b36', padding: 16, borderRadius: 8 }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>On-Color</p>
          <List type="unordered" style="on-color" items={items} />
        </div>
      </div>
    );
  },
};

/* ── List — With Icon ───────────────────────────────────────── */
export const WithIconLists = {
  name: 'List — With Icon',
  render: () => {
    const items = [
      { children: 'List item', level: 1 },
      { children: 'List item', level: 2 },
      { children: 'List item', level: 2 },
      { children: 'List item', level: 2 },
    ];
    return (
      <div style={{ display: 'flex', gap: 64, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", flexWrap: 'wrap' }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Primary</p>
          <List type="with-icon" style="primary" items={items} />
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Neutral</p>
          <List type="with-icon" style="neutral" items={items} />
        </div>
        <div style={{ background: '#000b36', padding: 16, borderRadius: 8 }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>On-Color</p>
          <List type="with-icon" style="on-color" items={items} />
        </div>
      </div>
    );
  },
};

/* ── List — RTL ─────────────────────────────────────────────── */
export const RTLLists = {
  name: 'List — RTL',
  render: () => {
    const arItems = [
      { children: 'عنصر قائمة', level: 1 },
      { children: 'عنصر قائمة', level: 2 },
      { children: 'عنصر قائمة', level: 2 },
      { children: 'عنصر قائمة', level: 2 },
    ];
    return (
      <div style={{ display: 'flex', gap: 64, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", flexWrap: 'wrap' }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Ordered — RTL — Primary</p>
          <List type="ordered" style="primary" rtl items={arItems} />
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Unordered — RTL — Primary</p>
          <List type="unordered" style="primary" rtl items={arItems} />
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>With Icon — RTL — Primary</p>
          <List type="with-icon" style="primary" rtl items={arItems} />
        </div>
      </div>
    );
  },
};

/* ── Full Matrix — Style × Type ─────────────────────────────── */
export const FullMatrix = {
  name: 'Full Matrix — Style × Type',
  render: () => {
    const items = [
      { children: 'List item', level: 1 },
      { children: 'List item', level: 2 },
      { children: 'List item', level: 2 },
      { children: 'List item', level: 2 },
    ];
    const types = ['ordered', 'unordered', 'with-icon'];
    const listStyles = ['primary', 'neutral', 'on-color'];
    return (
      <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <table style={{ borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{ padding: '6px 16px', textAlign: 'left', color: '#6C7C96', fontWeight: 600, fontSize: 12 }}>Style</th>
              {types.map((t) => (
                <th key={t} style={{ padding: '6px 16px', textAlign: 'left', color: '#6C7C96', fontWeight: 600, fontSize: 12 }}>{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listStyles.map((s) => (
              <tr key={s} style={{ borderTop: '1px solid #f3f4f6', background: s === 'on-color' ? '#000b36' : 'transparent' }}>
                <td style={{ padding: '12px 16px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>{s}</td>
                {types.map((t) => (
                  <td key={t} style={{ padding: '12px 16px' }}>
                    <List type={t} style={s} items={items} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
