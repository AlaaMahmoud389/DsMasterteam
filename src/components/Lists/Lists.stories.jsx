import React from 'react';
import { ListItem, List } from './Lists';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4140-89810';

const FONT = "'IBM Plex Sans Arabic', system-ui, sans-serif";

export default {
  title: 'Components/Lists',
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
};

const LABEL = {
  style: {
    fontSize: 11,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '.06em',
    marginBottom: 8,
    fontFamily: FONT,
  },
};

/* ════════════════════════════════════════════════════════════════════
   Playground — ListItem
   ════════════════════════════════════════════════════════════════════ */
export const PlaygroundListItem = {
  name: 'Playground — List Item',
  argTypes: {
    type:      { control: 'select', options: ['ordered', 'unordered', 'with-icon'] },
    level:     { control: 'select', options: [1, 2] },
    style:     { control: 'select', options: ['primary', 'neutral', 'on-color'] },
    rtl:       { control: 'boolean' },
    children:  { control: 'text' },
  },
  args: {
    type: 'unordered',
    level: 1,
    style: 'primary',
    rtl: false,
    children: 'List item',
  },
  render: (args) => (
    <div style={{ fontFamily: FONT, padding: 16 }}>
      <ListItem {...args} />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Playground — List
   ════════════════════════════════════════════════════════════════════ */
export const PlaygroundList = {
  name: 'Playground — List',
  argTypes: {
    type:  { control: 'select', options: ['ordered', 'unordered', 'with-icon'] },
    style: { control: 'select', options: ['primary', 'neutral', 'on-color'] },
    rtl:   { control: 'boolean' },
  },
  args: {
    type: 'ordered',
    style: 'primary',
    rtl: false,
  },
  render: (args) => (
    <div style={{ fontFamily: FONT, padding: 16 }}>
      <List
        {...args}
        items={[
          { children: 'First item', level: 1 },
          { children: 'Sub-item one', level: 2 },
          { children: 'Sub-item two', level: 2 },
          { children: 'Second item', level: 1 },
        ]}
      />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   List Item — All Types × Level
   ════════════════════════════════════════════════════════════════════ */
export const ListItemTypes = {
  name: 'List Item — Types × Levels',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: FONT }}>
      {[
        { label: 'Ordered — Level One',   type: 'ordered',    level: 1, marker: '1-' },
        { label: 'Ordered — Level Two',   type: 'ordered',    level: 2, marker: 'a-' },
        { label: 'Unordered — Level One', type: 'unordered',  level: 1, marker: '-' },
        { label: 'Unordered — Level Two', type: 'unordered',  level: 2, marker: '•' },
        { label: 'With Icon — Level One', type: 'with-icon',  level: 1 },
        { label: 'With Icon — Level Two', type: 'with-icon',  level: 2 },
      ].map(({ label, type, level, marker }) => (
        <div key={label}>
          <div style={LABEL.style}>{label}</div>
          <ListItem type={type} level={level} style="primary" marker={marker}>List item</ListItem>
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   List Item — All Styles
   ════════════════════════════════════════════════════════════════════ */
export const ListItemStyles = {
  name: 'List Item — All Styles',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: FONT }}>
      <div>
        <div style={LABEL.style}>Style = Primary</div>
        <ListItem type="unordered" style="primary">List item</ListItem>
      </div>
      <div>
        <div style={LABEL.style}>Style = Neutral</div>
        <ListItem type="unordered" style="neutral">List item</ListItem>
      </div>
      <div style={{ background: '#000b36', padding: 16, borderRadius: 8 }}>
        <div style={{ ...LABEL.style, color: '#6b7280' }}>Style = On-Color</div>
        <ListItem type="unordered" style="on-color">List item</ListItem>
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   List Item — RTL
   ════════════════════════════════════════════════════════════════════ */
export const ListItemRTL = {
  name: 'List Item — RTL',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: FONT }}>
      <div>
        <div style={LABEL.style}>Ordered — Level One — RTL</div>
        <ListItem type="ordered" level={1} style="primary" rtl marker="1-">عنصر قائمة</ListItem>
      </div>
      <div>
        <div style={LABEL.style}>Ordered — Level Two — RTL</div>
        <ListItem type="ordered" level={2} style="primary" rtl marker="أ-">عنصر قائمة</ListItem>
      </div>
      <div>
        <div style={LABEL.style}>Unordered — Level One — RTL</div>
        <ListItem type="unordered" level={1} style="primary" rtl>عنصر قائمة</ListItem>
      </div>
      <div>
        <div style={LABEL.style}>Unordered — Level Two — RTL</div>
        <ListItem type="unordered" level={2} style="primary" rtl>عنصر قائمة</ListItem>
      </div>
      <div>
        <div style={LABEL.style}>With Icon — RTL — Primary</div>
        <ListItem type="with-icon" level={1} style="primary" rtl>عنصر قائمة</ListItem>
      </div>
      <div>
        <div style={LABEL.style}>With Icon — RTL — Neutral</div>
        <ListItem type="with-icon" level={1} style="neutral" rtl>عنصر قائمة</ListItem>
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   List — Ordered  (Primary / Neutral / On-Color)
   ════════════════════════════════════════════════════════════════════ */
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
      <div style={{ display: 'flex', gap: 64, fontFamily: FONT, flexWrap: 'wrap' }}>
        <div>
          <div style={LABEL.style}>Primary</div>
          <List type="ordered" style="primary" items={items} />
        </div>
        <div>
          <div style={LABEL.style}>Neutral</div>
          <List type="ordered" style="neutral" items={items} />
        </div>
        <div style={{ background: '#000b36', padding: 16, borderRadius: 8 }}>
          <div style={{ ...LABEL.style, color: '#6b7280' }}>On-Color</div>
          <List type="ordered" style="on-color" items={items} />
        </div>
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   List — Unordered  (Primary / Neutral / On-Color)
   ════════════════════════════════════════════════════════════════════ */
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
      <div style={{ display: 'flex', gap: 64, fontFamily: FONT, flexWrap: 'wrap' }}>
        <div>
          <div style={LABEL.style}>Primary</div>
          <List type="unordered" style="primary" items={items} />
        </div>
        <div>
          <div style={LABEL.style}>Neutral</div>
          <List type="unordered" style="neutral" items={items} />
        </div>
        <div style={{ background: '#000b36', padding: 16, borderRadius: 8 }}>
          <div style={{ ...LABEL.style, color: '#6b7280' }}>On-Color</div>
          <List type="unordered" style="on-color" items={items} />
        </div>
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   List — With Icon  (Primary / Neutral / On-Color)
   ════════════════════════════════════════════════════════════════════ */
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
      <div style={{ display: 'flex', gap: 64, fontFamily: FONT, flexWrap: 'wrap' }}>
        <div>
          <div style={LABEL.style}>Primary</div>
          <List type="with-icon" style="primary" items={items} />
        </div>
        <div>
          <div style={LABEL.style}>Neutral</div>
          <List type="with-icon" style="neutral" items={items} />
        </div>
        <div style={{ background: '#000b36', padding: 16, borderRadius: 8 }}>
          <div style={{ ...LABEL.style, color: '#6b7280' }}>On-Color</div>
          <List type="with-icon" style="on-color" items={items} />
        </div>
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   List — RTL
   ════════════════════════════════════════════════════════════════════ */
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
      <div style={{ display: 'flex', gap: 64, fontFamily: FONT, flexWrap: 'wrap' }}>
        <div>
          <div style={LABEL.style}>Ordered — RTL — Primary</div>
          <List type="ordered" style="primary" rtl items={arItems} />
        </div>
        <div>
          <div style={LABEL.style}>Unordered — RTL — Primary</div>
          <List type="unordered" style="primary" rtl items={arItems} />
        </div>
        <div>
          <div style={LABEL.style}>With Icon — RTL — Primary</div>
          <List type="with-icon" style="primary" rtl items={arItems} />
        </div>
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Full Matrix — All Styles × Types
   ════════════════════════════════════════════════════════════════════ */
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
      <div style={{ fontFamily: FONT }}>
        <table style={{ borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{ padding: '6px 16px', textAlign: 'left', color: '#9ca3af', fontWeight: 400 }}>Style</th>
              {types.map((t) => (
                <th key={t} style={{ padding: '6px 16px', textAlign: 'left', color: '#9ca3af', fontWeight: 400 }}>{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listStyles.map((s) => (
              <tr key={s} style={{ borderTop: '1px solid #f3f4f6', background: s === 'on-color' ? '#000b36' : 'transparent' }}>
                <td style={{ padding: '12px 16px', color: s === 'on-color' ? '#6b7280' : '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>{s}</td>
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
