import React, { useState } from 'react';
import { Chip, ChipGroup } from './Chip';

/* ── Story meta ─────────────────────────────────────────────── */

export default {
  title: 'Components/Chip',
  component: Chip,
  parameters: { layout: 'padded' },
  argTypes: {
    chipStyle: {
      control: 'radio',
      options: ['primary', 'neutral'],
      description: 'Style variant — Primary or Neutral',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Chip size — Small / Medium / Large',
    },
    state: {
      control: 'radio',
      options: ['default', 'hovered', 'focused', 'pressed', 'selected', 'disabled'],
      description: 'Controlled Figma state (for docs only)',
    },
    rounded:         { control: 'boolean', description: 'Pill-shaped border radius' },
    onColor:         { control: 'boolean', description: 'On-color variant (solid dark bg)' },
    selected:        { control: 'boolean', description: 'Selected / active state' },
    disabled:        { control: 'boolean' },
    dir:             { control: 'radio', options: ['ltr', 'rtl'] },
    showLeadIcon:    { control: 'boolean' },
    showTrailIcon:   { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    label:           { control: 'text' },
    labelAr:         { control: 'text' },
  },
};

/* ── Playground ─────────────────────────────────────────────── */
export const Playground = {
  args: {
    label:           'Item',
    labelAr:         'اختيار',
    chipStyle:       'primary',
    size:            'lg',
    rounded:         true,
    onColor:         false,
    selected:        false,
    disabled:        false,
    dir:             'ltr',
    showLeadIcon:    false,
    showTrailIcon:   false,
    showCloseButton: false,
  },
  render: (args) => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 8 }}>
      <Chip {...args} />
    </div>
  ),
};

/* ── Style variants ─────────────────────────────────────────── */
export const Styles = {
  name: 'Style — Primary & Neutral',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { style: 'primary', label: 'Primary (default)' },
        { style: 'neutral', label: 'Neutral' },
      ].map(({ style, label }) => (
        <div key={style}>
          <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>
            {label}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Chip label="Rounded" chipStyle={style} size="lg" rounded={true} />
            <Chip label="Squared" chipStyle={style} size="lg" rounded={false} />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── Sizes ──────────────────────────────────────────────────── */
export const Sizes = {
  name: 'Size — Small · Medium · Large',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { size: 'sm', label: 'Small — 20 × 20 px' },
        { size: 'md', label: 'Medium — 24 × 24 px' },
        { size: 'lg', label: 'Large — 32 × 32 px' },
      ].map(({ size, label }) => (
        <div key={size}>
          <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>
            {label}
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <Chip label={label} size={size} chipStyle="primary" rounded />
            <Chip label={label} size={size} chipStyle="neutral" rounded />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── Rounded vs Square ──────────────────────────────────────── */
export const RoundedVariants = {
  name: 'Rounded — True & False',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { rounded: true,  label: 'Rounded=True — pill shape (9999 px)' },
        { rounded: false, label: 'Rounded=False — squared corners (2 px)' },
      ].map(({ rounded, label }) => (
        <div key={String(rounded)}>
          <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>
            {label}
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <Chip label="Primary" chipStyle="primary" size="lg" rounded={rounded} />
            <Chip label="Neutral" chipStyle="neutral" size="lg" rounded={rounded} />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── All States ─────────────────────────────────────────────── */
export const States = {
  name: 'State — All 6',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {['primary', 'neutral'].map((style) => (
        <div key={style}>
          <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 600, color: '#6C7C96', textTransform: 'capitalize' }}>
            {style}
          </p>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            {['default', 'hovered', 'pressed', 'focused', 'selected', 'disabled'].map((st) => (
              <Chip
                key={st}
                label={st.charAt(0).toUpperCase() + st.slice(1)}
                chipStyle={style}
                size="lg"
                rounded
                state={st}
                selected={st === 'selected'}
                disabled={st === 'disabled'}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── On-color ───────────────────────────────────────────────── */
export const OnColor = {
  name: 'On-color — Primary & Neutral all states',
  render: () => (
    <div
      style={{
        background: '#00001C',
        padding: 24,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
      }}
    >
      {['primary', 'neutral'].map((style) => (
        <div key={style}>
          <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 600, color: '#93aee5', textTransform: 'capitalize' }}>
            {style}
          </p>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            {['default', 'hovered', 'selected', 'focused', 'disabled'].map((st) => (
              <Chip
                key={st}
                label={st.charAt(0).toUpperCase() + st.slice(1)}
                chipStyle={style}
                size="lg"
                rounded
                onColor
                state={st}
                selected={st === 'selected'}
                disabled={st === 'disabled'}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── Icons ──────────────────────────────────────────────────── */
export const Icons = {
  name: 'Icons — Lead · Trail · Both',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { label: 'Primary — Lead · Trail · Both', style: 'primary' },
        { label: 'Neutral — Lead · Trail · Both', style: 'neutral' },
      ].map(({ label, style }) => (
        <div key={style}>
          <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>{label}</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <Chip label="Lead Icon"  chipStyle={style} size="lg" rounded showLeadIcon />
            <Chip label="Trail Icon" chipStyle={style} size="lg" rounded showTrailIcon />
            <Chip label="Both Icons" chipStyle={style} size="lg" rounded showLeadIcon showTrailIcon />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── Close Button ───────────────────────────────────────────── */
export const CloseButton = {
  name: 'Close Button (Dismissible)',
  render: () => {
    const [chips, setChips] = React.useState(['Design', 'Development', 'Research', 'Testing']);
    return (
      <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          {chips.map((c) => (
            <Chip
              key={c}
              label={c}
              chipStyle="primary"
              size="lg"
              rounded
              showCloseButton
              onClose={() => setChips((prev) => prev.filter((x) => x !== c))}
            />
          ))}
          {chips.length === 0 && (
            <button
              onClick={() => setChips(['Design', 'Development', 'Research', 'Testing'])}
              style={{ fontSize: 12, cursor: 'pointer', padding: '4px 8px', borderRadius: 4 }}
            >
              Reset
            </button>
          )}
        </div>
        <p style={{ marginTop: 10, fontSize: 12, color: '#6C7C96' }}>
          Click the ✕ button on any chip to dismiss it. The close button is a native &lt;button&gt; — independently Tab-focusable.
        </p>
      </div>
    );
  },
};

/* ── Interactive Toggle ─────────────────────────────────────── */
export const InteractiveToggle = {
  name: 'Interactive — Toggle Selected',
  render: () => {
    const [selected, setSelected] = useState([]);
    const options = ['All', 'Design', 'Development', 'UX', 'Research'];
    const toggle = (o) =>
      setSelected((prev) => (prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o]));
    return (
      <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {options.map((o) => (
            <Chip
              key={o}
              label={o}
              chipStyle="primary"
              size="lg"
              rounded
              selected={selected.includes(o)}
              onClick={() => toggle(o)}
            />
          ))}
        </div>
        <p style={{ marginTop: 10, fontSize: 12, color: '#6C7C96' }}>
          Click chips to toggle the selected state. Selected chips use a solid fill.
        </p>
      </div>
    );
  },
};

/* ── RTL ────────────────────────────────────────────────────── */
export const RTL = {
  name: 'RTL — Arabic',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div>
        <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>RTL — Primary &amp; Neutral</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Chip label="اختيار" dir="rtl" chipStyle="primary" size="lg" rounded />
          <Chip label="اختيار" dir="rtl" chipStyle="primary" size="lg" rounded selected />
          <Chip label="اختيار" dir="rtl" chipStyle="neutral" size="lg" rounded />
          <Chip label="اختيار" dir="rtl" chipStyle="neutral" size="lg" rounded selected />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>RTL — with icons &amp; close button</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Chip label="مع أيقونة"   dir="rtl" chipStyle="primary" size="lg" rounded showLeadIcon />
          <Chip label="مع زر إغلاق" dir="rtl" chipStyle="primary" size="lg" rounded showCloseButton />
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 12, color: '#6C7C96' }}>
        dir="rtl" — lead icon moves to the right, close button moves to the left, matching Arabic reading direction.
      </p>
    </div>
  ),
};

/* ── ChipGroup ──────────────────────────────────────────────── */
export const Group = {
  name: 'ChipGroup',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <ChipGroup
        items={[
          { label: 'Design' },
          { label: 'Development', selected: true },
          { label: 'UX Research' },
          { label: 'Testing' },
          { label: 'Strategy' },
        ]}
        chipStyle="primary"
        size="lg"
        rounded
      />
      <p style={{ marginTop: 10, fontSize: 12, color: '#6C7C96' }}>
        ChipGroup renders an accessible list of chips from an items array, forwarding shared variant props to each chip.
      </p>
    </div>
  ),
};

/* ── Full Matrix ─────────────────────────────────────────────── */
export const FullMatrix = {
  name: 'Full Matrix — All Sizes × Styles',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {['lg', 'md', 'sm'].map((size) => (
        <div key={size}>
          <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 600, color: '#6C7C96', textTransform: 'uppercase', letterSpacing: 1 }}>
            Size: {size === 'lg' ? 'Large' : size === 'md' ? 'Medium' : 'Small'}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {[false, true].map((rnd) =>
              ['primary', 'neutral'].map((style) =>
                [false, true].map((oc) => (
                  <Chip
                    key={`${size}-${style}-${rnd}-${oc}`}
                    label={`${style[0].toUpperCase()}${oc ? '+OC' : ''}${rnd ? '+R' : ''}`}
                    chipStyle={style}
                    size={size}
                    rounded={rnd}
                    onColor={oc}
                  />
                ))
              )
            )}
          </div>
        </div>
      ))}
    </div>
  ),
};
