import React, { useState } from 'react';
import { Chip, ChipGroup, ChipLeadIcon, ChipTrailIcon } from './Chip';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4140-89804';

export default {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
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
      control: 'select',
      options: ['default', 'hovered', 'focused', 'pressed', 'selected', 'disabled'],
      description: 'Controlled Figma state (for docs only)',
    },
    rounded: { control: 'boolean', description: 'Pill-shaped border radius' },
    onColor:  { control: 'boolean', description: 'On-color variant (solid dark bg)' },
    selected: { control: 'boolean', description: 'Selected / active state' },
    disabled: { control: 'boolean' },
    dir:      { control: 'radio', options: ['ltr', 'rtl'] },
    showLeadIcon:  { control: 'boolean' },
    showTrailIcon: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    label: { control: 'text' },
    labelAr: { control: 'text' },
  },
};

/* ── Playground ─────────────────────────────────────────────── */
export const Playground = {
  args: {
    label: 'Item',
    labelAr: 'اختيار',
    chipStyle: 'primary',
    size: 'lg',
    rounded: true,
    onColor: false,
    selected: false,
    disabled: false,
    dir: 'ltr',
    showLeadIcon: false,
    showTrailIcon: false,
    showCloseButton: false,
  },
};

/* ── Style variants ─────────────────────────────────────────── */
export const Styles = {
  name: 'Style — Primary & Neutral',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Chip label="Primary" chipStyle="primary" size="lg" rounded />
      <Chip label="Neutral" chipStyle="neutral" size="lg" rounded />
      <Chip label="Primary" chipStyle="primary" size="lg" rounded={false} />
      <Chip label="Neutral" chipStyle="neutral" size="lg" rounded={false} />
    </div>
  ),
};

/* ── Sizes ──────────────────────────────────────────────────── */
export const Sizes = {
  name: 'Size — Small · Medium · Large',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip label="Small"  size="sm" chipStyle="primary" rounded />
      <Chip label="Medium" size="md" chipStyle="primary" rounded />
      <Chip label="Large"  size="lg" chipStyle="primary" rounded />
      <Chip label="Small"  size="sm" chipStyle="neutral" rounded />
      <Chip label="Medium" size="md" chipStyle="neutral" rounded />
      <Chip label="Large"  size="lg" chipStyle="neutral" rounded />
    </div>
  ),
};

/* ── Rounded vs Square ──────────────────────────────────────── */
export const RoundedVariants = {
  name: 'Rounded — True & False',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip label="Rounded=True"  chipStyle="primary" size="lg" rounded={true} />
      <Chip label="Rounded=False" chipStyle="primary" size="lg" rounded={false} />
      <Chip label="Rounded=True"  chipStyle="neutral" size="lg" rounded={true} />
      <Chip label="Rounded=False" chipStyle="neutral" size="lg" rounded={false} />
    </div>
  ),
};

/* ── All States ─────────────────────────────────────────────── */
export const States = {
  name: 'State — All 6',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {['primary', 'neutral'].map((style) => (
        <div key={style} style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ width: 60, fontSize: 12, color: '#6D7D97', textTransform: 'capitalize' }}>{style}</span>
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
        background: '#194AAA',
        padding: 24,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {['primary', 'neutral'].map((style) => (
        <div key={style} style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ width: 60, fontSize: 12, color: '#FAFBFC', textTransform: 'capitalize' }}>{style}</span>
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
      ))}
    </div>
  ),
};

/* ── Icons ──────────────────────────────────────────────────── */
export const Icons = {
  name: 'Icons — Lead · Trail · Both',
  render: () => (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
      <Chip label="Lead Icon"  chipStyle="primary" size="lg" rounded showLeadIcon />
      <Chip label="Trail Icon" chipStyle="primary" size="lg" rounded showTrailIcon />
      <Chip label="Both Icons" chipStyle="primary" size="lg" rounded showLeadIcon showTrailIcon />
      <Chip label="Lead Icon"  chipStyle="neutral" size="lg" rounded showLeadIcon />
      <Chip label="Trail Icon" chipStyle="neutral" size="lg" rounded showTrailIcon />
      <Chip label="Both Icons" chipStyle="neutral" size="lg" rounded showLeadIcon showTrailIcon />
    </div>
  ),
};

/* ── Close Button ───────────────────────────────────────────── */
export const CloseButton = {
  name: 'Close Button (Dismissible)',
  render: () => {
    const [chips, setChips] = React.useState(['Design', 'Development', 'Research', 'Testing']);
    return (
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
    );
  },
};

/* ── RTL ────────────────────────────────────────────────────── */
export const RTL = {
  name: 'RTL — Arabic',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Chip label="اختيار" dir="rtl" chipStyle="primary" size="lg" rounded />
        <Chip label="اختيار" dir="rtl" chipStyle="primary" size="lg" rounded selected />
        <Chip label="اختيار" dir="rtl" chipStyle="neutral" size="lg" rounded />
        <Chip label="اختيار" dir="rtl" chipStyle="neutral" size="lg" rounded selected />
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Chip label="مع أيقونة" labelAr="مع أيقونة" dir="rtl" chipStyle="primary" size="lg" rounded showLeadIcon />
        <Chip label="مع زر إغلاق" labelAr="مع زر إغلاق" dir="rtl" chipStyle="primary" size="lg" rounded showCloseButton />
      </div>
    </div>
  ),
};

/* ── Full variant matrix ─────────────────────────────────────── */
export const FullMatrix = {
  name: 'Full Matrix — All Sizes × Styles',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {['lg', 'md', 'sm'].map((size) => (
        <div key={size}>
          <div style={{ fontSize: 11, color: '#6D7D97', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
            Size: {size === 'lg' ? 'Large' : size === 'md' ? 'Medium' : 'Small'}
          </div>
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
                    style={oc ? { background: oc && style === 'primary' ? undefined : undefined } : {}}
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

/* ── ChipGroup ──────────────────────────────────────────────── */
export const Group = {
  name: 'ChipGroup',
  render: () => (
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
  ),
};
