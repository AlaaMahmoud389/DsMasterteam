import React, { useState } from 'react';
import { MenuListItem, MenuSection, Menu } from './Menu';

export default {
  title: 'Components/Menu',
  parameters: { layout: 'padded' },
};

/* ── Playground — MenuListItem ──────────────────────────────── */
export const PlaygroundListItem = {
  name: 'Playground — Menu List Item',
  argTypes: {
    trailElement: { control: 'radio', options: ['none', 'text', 'icon', 'button', 'tag', 'switch'] },
    state:        { control: 'radio', options: ['default', 'hovered', 'pressed', 'focused', 'disabled', 'selected'] },
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
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 16, width: 260 }}>
      <MenuListItem {...args} />
    </div>
  ),
};

/* ── All States ─────────────────────────────────────────────── */
export const AllStates = {
  name: 'Menu List Item — All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { state: 'default',  label: 'Default' },
        { state: 'hovered',  label: 'Hovered' },
        { state: 'pressed',  label: 'Pressed' },
        { state: 'focused',  label: 'Focused' },
        { state: 'selected', label: 'Selected' },
        { state: 'disabled', label: 'Disabled' },
      ].map(({ state, label }) => (
        <div key={state}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>{label}</p>
          <MenuListItem label="Item Label" leadIcon="list" state={state} />
        </div>
      ))}
    </div>
  ),
};

/* ── Trail Elements ─────────────────────────────────────────── */
export const AllTrailElements = {
  name: 'Menu List Item — Trail Elements',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Trail = None</p>
        <MenuListItem label="Item Label" leadIcon="list" trailElement="none" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Trail = Text (+99)</p>
        <MenuListItem label="Item Label" leadIcon="list" trailElement="text" trailText="+99" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Trail = Icon (tick)</p>
        <MenuListItem label="Item Label" leadIcon="list" trailElement="icon" trailIcon="tick" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Trail = Button (chevron)</p>
        <MenuListItem label="Item Label" leadIcon="list" trailElement="button" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Trail = Tag</p>
        <MenuListItem label="Item Label" leadIcon="list" trailElement="tag" trailTagText="Label" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Trail = Switch (off)</p>
        <MenuListItem label="Item Label" leadIcon="list" trailElement="switch" switchChecked={false} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Trail = Switch (on)</p>
        <MenuListItem label="Item Label" leadIcon="list" trailElement="switch" switchChecked={true} />
      </div>
    </div>
  ),
};

/* ── Sub Item ────────────────────────────────────────────────── */
export const SubItems = {
  name: 'Menu List Item — Sub Item',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", width: 260 }}>
      <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Main item followed by sub items</p>
      <MenuListItem label="Main Item" leadIcon="list" />
      <MenuListItem label="Sub Item A" leadIcon="list" subItem />
      <MenuListItem label="Sub Item B" leadIcon="list" subItem />
      <MenuListItem label="Another Main Item" leadIcon="list" />
    </div>
  ),
};

/* ── RTL variants ────────────────────────────────────────────── */
export const RTLItems = {
  name: 'Menu List Item — RTL',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>RTL — None</p>
        <MenuListItem label="نص العنصر" leadIcon="list" rtl />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>RTL — Text trail</p>
        <MenuListItem label="نص العنصر" leadIcon="list" trailElement="text" trailText="+99" rtl />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>RTL — Icon trail</p>
        <MenuListItem label="نص العنصر" leadIcon="list" trailElement="icon" trailIcon="tick" rtl />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>RTL — Tag trail</p>
        <MenuListItem label="نص العنصر" leadIcon="list" trailElement="tag" trailTagText="وسم" rtl />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>RTL — Switch trail</p>
        <MenuListItem label="نص العنصر" leadIcon="list" trailElement="switch" rtl />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>RTL — Selected</p>
        <MenuListItem label="نص العنصر" leadIcon="list" trailElement="icon" trailIcon="tick" state="selected" rtl />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>RTL — Disabled</p>
        <MenuListItem label="نص العنصر" leadIcon="list" state="disabled" rtl />
      </div>
    </div>
  ),
};

/* ── Interactive Switch demo ─────────────────────────────────── */
export const InteractiveSwitch = {
  name: 'Menu List Item — Interactive Switch',
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 16, width: 280 }}>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Click switch to toggle</p>
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

/* ── Menu — Style=All (LTR) ─────────────────────────────────── */
export const MenuStyleAll = {
  name: 'Menu — Style=All (LTR)',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 16 }}>
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

/* ── Menu — Style=Text Only ─────────────────────────────────── */
export const MenuTextOnly = {
  name: 'Menu — Style=Text Only',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 16 }}>
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

/* ── Menu — Style=Text + Icon ───────────────────────────────── */
export const MenuTextIcon = {
  name: 'Menu — Style=Text + Icon',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 16 }}>
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

/* ── Menu — RTL ─────────────────────────────────────────────── */
export const MenuRTL = {
  name: 'Menu — RTL',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 16, display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>RTL — Style=All</p>
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

/* ── All Menu Styles Side by Side ───────────────────────────── */
export const AllMenuStyles = {
  name: 'Menu — All Styles Side by Side',
  render: () => {
    const baseItems = [
      { label: 'Item Label', trailElement: 'icon', trailIcon: 'tick', state: 'selected' },
      { label: 'Item Label', trailElement: 'none' },
      { label: 'Item Label', trailElement: 'none' },
    ];
    return (
      <div style={{ display: 'flex', gap: 32, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", flexWrap: 'wrap' }}>
        {[
          { style: 'all', label: 'Style = All' },
          { style: 'text-only', label: 'Style = Text Only' },
          { style: 'text-icon', label: 'Style = Text + Icon' },
        ].map(({ style, label }) => (
          <div key={style}>
            <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>{label}</p>
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
