import React, { useState } from 'react';
import { MenuListItem, MenuSection, Menu } from './Menu';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4250-1938';

const FONT = "'IBM Plex Sans Arabic', system-ui, sans-serif";

export default {
  title: 'Components/Menu',
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
    marginBottom: 10,
    fontFamily: FONT,
  },
};

/* ════════════════════════════════════════════════════════════════════
   Playground — MenuListItem
   ════════════════════════════════════════════════════════════════════ */
export const PlaygroundListItem = {
  name: 'Playground — Menu List Item',
  argTypes: {
    trailElement: { control: 'select', options: ['none', 'text', 'icon', 'button', 'tag', 'switch'] },
    state:        { control: 'select', options: ['default', 'hovered', 'pressed', 'focused', 'disabled', 'selected'] },
    label:        { control: 'text' },
    rtl:          { control: 'boolean' },
    subItem:      { control: 'boolean' },
  },
  args: {
    label: 'Item Label',
    trailElement: 'none',
    state: 'default',
    rtl: false,
    subItem: false,
  },
  render: (args) => (
    <div style={{ fontFamily: FONT, padding: 16, width: 260 }}>
      <MenuListItem {...args} />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   All States — No trail element
   ════════════════════════════════════════════════════════════════════ */
export const AllStates = {
  name: 'Menu List Item — All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: FONT }}>
      {[
        { state: 'default',  label: 'Default' },
        { state: 'hovered',  label: 'Hovered' },
        { state: 'pressed',  label: 'Pressed' },
        { state: 'focused',  label: 'Focused' },
        { state: 'selected', label: 'Selected' },
        { state: 'disabled', label: 'Disabled' },
      ].map(({ state, label }) => (
        <div key={state}>
          <div style={LABEL.style}>{label}</div>
          <MenuListItem label="Item Label" leadIcon="list" state={state} />
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   All Trail Elements — Default state
   ════════════════════════════════════════════════════════════════════ */
export const AllTrailElements = {
  name: 'Menu List Item — Trail Elements',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: FONT }}>
      <div>
        <div style={LABEL.style}>Trail = None</div>
        <MenuListItem label="Item Label" leadIcon="list" trailElement="none" />
      </div>
      <div>
        <div style={LABEL.style}>Trail = Text (+99)</div>
        <MenuListItem label="Item Label" leadIcon="list" trailElement="text" trailText="+99" />
      </div>
      <div>
        <div style={LABEL.style}>Trail = Icon (tick)</div>
        <MenuListItem label="Item Label" leadIcon="list" trailElement="icon" trailIcon="tick" />
      </div>
      <div>
        <div style={LABEL.style}>Trail = Button (chevron)</div>
        <MenuListItem label="Item Label" leadIcon="list" trailElement="button" />
      </div>
      <div>
        <div style={LABEL.style}>Trail = Tag</div>
        <MenuListItem label="Item Label" leadIcon="list" trailElement="tag" trailTagText="Label" />
      </div>
      <div>
        <div style={LABEL.style}>Trail = Switch (off)</div>
        <MenuListItem label="Item Label" leadIcon="list" trailElement="switch" switchChecked={false} />
      </div>
      <div>
        <div style={LABEL.style}>Trail = Switch (on)</div>
        <MenuListItem label="Item Label" leadIcon="list" trailElement="switch" switchChecked={true} />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Sub Item
   ════════════════════════════════════════════════════════════════════ */
export const SubItems = {
  name: 'Menu List Item — Sub Item',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: FONT, width: 260 }}>
      <div style={LABEL.style}>Main item followed by sub items</div>
      <MenuListItem label="Main Item" leadIcon="list" />
      <MenuListItem label="Sub Item A" leadIcon="list" subItem />
      <MenuListItem label="Sub Item B" leadIcon="list" subItem />
      <MenuListItem label="Another Main Item" leadIcon="list" />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   RTL variants
   ════════════════════════════════════════════════════════════════════ */
export const RTLItems = {
  name: 'Menu List Item — RTL',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: FONT }}>
      <div>
        <div style={LABEL.style}>RTL — None</div>
        <MenuListItem label="نص العنصر" leadIcon="list" rtl />
      </div>
      <div>
        <div style={LABEL.style}>RTL — Text trail</div>
        <MenuListItem label="نص العنصر" leadIcon="list" trailElement="text" trailText="+99" rtl />
      </div>
      <div>
        <div style={LABEL.style}>RTL — Icon trail</div>
        <MenuListItem label="نص العنصر" leadIcon="list" trailElement="icon" trailIcon="tick" rtl />
      </div>
      <div>
        <div style={LABEL.style}>RTL — Tag trail</div>
        <MenuListItem label="نص العنصر" leadIcon="list" trailElement="tag" trailTagText="وسم" rtl />
      </div>
      <div>
        <div style={LABEL.style}>RTL — Switch trail</div>
        <MenuListItem label="نص العنصر" leadIcon="list" trailElement="switch" rtl />
      </div>
      <div>
        <div style={LABEL.style}>RTL — Selected</div>
        <MenuListItem label="نص العنصر" leadIcon="list" trailElement="icon" trailIcon="tick" state="selected" rtl />
      </div>
      <div>
        <div style={LABEL.style}>RTL — Disabled</div>
        <MenuListItem label="نص العنصر" leadIcon="list" state="disabled" rtl />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Interactive Switch demo
   ════════════════════════════════════════════════════════════════════ */
export const InteractiveSwitch = {
  name: 'Menu List Item — Interactive Switch',
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ fontFamily: FONT, padding: 16, width: 280 }}>
        <div style={LABEL.style}>Click switch to toggle</div>
        <MenuListItem
          label="Dark Mode"
          leadIcon="eye"
          trailElement="switch"
          switchChecked={checked}
          onSwitchChange={setChecked}
        />
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Menu — Style=All  (LTR)
   ════════════════════════════════════════════════════════════════════ */
export const MenuStyleAll = {
  name: 'Menu — Style=All (LTR)',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 16 }}>
      <Menu
        style="all"
        sections={[
          {
            groupLabel: 'GROUP LABEL',
            items: [
              { label: 'Item Label', leadIcon: 'list', trailElement: 'icon', trailIcon: 'tick', state: 'selected' },
              { label: 'Item Label', leadIcon: 'list', trailElement: 'none' },
              { label: 'Item Label', leadIcon: 'list', trailElement: 'none' },
              { label: 'Item Label', leadIcon: 'list', trailElement: 'none' },
            ],
          },
          {
            groupLabel: 'GROUP LABEL',
            items: [
              { label: 'Item Label', leadIcon: 'list', trailElement: 'switch', switchChecked: false },
              { label: 'Item Label', leadIcon: 'list', trailElement: 'switch', switchChecked: true },
              { label: 'Item Label', leadIcon: 'list', trailElement: 'switch', switchChecked: false },
            ],
          },
          {
            groupLabel: 'GROUP LABEL',
            items: [
              { label: 'Item Label', leadIcon: 'list', trailElement: 'tag', trailTagText: 'Label' },
              { label: 'Item Label', leadIcon: 'list', trailElement: 'tag', trailTagText: 'Label' },
              { label: 'Item Label', leadIcon: 'list', trailElement: 'text', trailText: '+99' },
              { label: 'Item Label', leadIcon: 'list', trailElement: 'button' },
              { label: 'Item Label', leadIcon: 'list', trailElement: 'none', state: 'disabled' },
            ],
          },
        ]}
      />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Menu — Style=Text Only
   ════════════════════════════════════════════════════════════════════ */
export const MenuTextOnly = {
  name: 'Menu — Style=Text Only',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 16 }}>
      <Menu
        style="text-only"
        sections={[
          {
            groupLabel: 'GROUP LABEL',
            items: [
              { label: 'Item Label', trailElement: 'icon', trailIcon: 'tick', state: 'selected' },
              { label: 'Item Label', trailElement: 'none' },
              { label: 'Item Label', trailElement: 'none' },
              { label: 'Item Label', trailElement: 'none' },
            ],
          },
          {
            groupLabel: 'GROUP LABEL',
            items: [
              { label: 'Item Label', trailElement: 'switch', switchChecked: false },
              { label: 'Item Label', trailElement: 'switch', switchChecked: true },
              { label: 'Item Label', trailElement: 'switch', switchChecked: false },
            ],
          },
          {
            groupLabel: 'GROUP LABEL',
            items: [
              { label: 'Item Label', trailElement: 'tag', trailTagText: 'Label' },
              { label: 'Item Label', trailElement: 'tag', trailTagText: 'Label' },
              { label: 'Item Label', trailElement: 'text', trailText: '+99' },
              { label: 'Item Label', trailElement: 'button' },
              { label: 'Item Label', trailElement: 'none', state: 'disabled' },
            ],
          },
        ]}
      />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Menu — Style=Text + Icon
   ════════════════════════════════════════════════════════════════════ */
export const MenuTextIcon = {
  name: 'Menu — Style=Text + Icon',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 16 }}>
      <Menu
        style="text-icon"
        sections={[
          {
            groupLabel: 'GROUP LABEL',
            items: [
              { label: 'Item Label', leadIcon: 'list', trailElement: 'icon', trailIcon: 'tick', state: 'selected' },
              { label: 'Item Label', leadIcon: 'star', trailElement: 'none' },
              { label: 'Item Label', leadIcon: 'heart', trailElement: 'none' },
              { label: 'Item Label', leadIcon: 'bookmark', trailElement: 'none' },
            ],
          },
          {
            groupLabel: 'GROUP LABEL',
            items: [
              { label: 'Item Label', leadIcon: 'user', trailElement: 'switch', switchChecked: false },
              { label: 'Item Label', leadIcon: 'bell', trailElement: 'switch', switchChecked: true },
              { label: 'Item Label', leadIcon: 'setting', trailElement: 'switch', switchChecked: false },
            ],
          },
          {
            groupLabel: 'GROUP LABEL',
            items: [
              { label: 'Item Label', leadIcon: 'download', trailElement: 'tag', trailTagText: 'Label' },
              { label: 'Item Label', leadIcon: 'share', trailElement: 'tag', trailTagText: 'Label' },
              { label: 'Item Label', leadIcon: 'edit', trailElement: 'text', trailText: '+99' },
              { label: 'Item Label', leadIcon: 'delete', trailElement: 'button' },
              { label: 'Item Label', leadIcon: 'cancel', trailElement: 'none', state: 'disabled' },
            ],
          },
        ]}
      />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Menu — RTL
   ════════════════════════════════════════════════════════════════════ */
export const MenuRTL = {
  name: 'Menu — RTL',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 16, display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div>
        <div style={LABEL.style}>RTL — Style=All</div>
        <Menu
          style="all"
          rtl
          sections={[
            {
              groupLabel: 'عنوان مجموعة',
              items: [
                { label: 'نص العنصر', leadIcon: 'list', trailElement: 'icon', trailIcon: 'tick', state: 'selected' },
                { label: 'نص العنصر', leadIcon: 'list', trailElement: 'none' },
                { label: 'نص العنصر', leadIcon: 'list', trailElement: 'none' },
              ],
            },
            {
              groupLabel: 'عنوان مجموعة',
              items: [
                { label: 'نص العنصر', leadIcon: 'list', trailElement: 'switch', switchChecked: false },
                { label: 'نص العنصر', leadIcon: 'list', trailElement: 'switch', switchChecked: true },
                { label: 'نص العنصر', leadIcon: 'list', trailElement: 'switch', switchChecked: false },
              ],
            },
            {
              groupLabel: 'عنوان مجموعة',
              items: [
                { label: 'نص العنصر', leadIcon: 'list', trailElement: 'tag', trailTagText: 'وسم' },
                { label: 'نص العنصر', leadIcon: 'list', trailElement: 'tag', trailTagText: 'وسم' },
                { label: 'نص العنصر', leadIcon: 'list', trailElement: 'text', trailText: '+99' },
                { label: 'نص العنصر', leadIcon: 'list', trailElement: 'button' },
                { label: 'نص العنصر', leadIcon: 'list', state: 'disabled' },
              ],
            },
          ]}
        />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Side-by-side — All Menu Styles
   ════════════════════════════════════════════════════════════════════ */
export const AllMenuStyles = {
  name: 'Menu — All Styles Side by Side',
  render: () => {
    const baseItems = [
      { label: 'Item Label', trailElement: 'icon', trailIcon: 'tick', state: 'selected' },
      { label: 'Item Label', trailElement: 'none' },
      { label: 'Item Label', trailElement: 'none' },
    ];
    return (
      <div style={{ display: 'flex', gap: 32, fontFamily: FONT, flexWrap: 'wrap' }}>
        {[
          { style: 'all', label: 'Style = All' },
          { style: 'text-only', label: 'Style = Text Only' },
          { style: 'text-icon', label: 'Style = Text + Icon' },
        ].map(({ style, label }) => (
          <div key={style}>
            <div style={LABEL.style}>{label}</div>
            <Menu
              style={style}
              sections={[{ groupLabel: 'GROUP LABEL', items: baseItems }]}
            />
          </div>
        ))}
      </div>
    );
  },
};
