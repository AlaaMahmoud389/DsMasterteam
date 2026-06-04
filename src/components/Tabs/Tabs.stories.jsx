import React, { useState } from 'react';
import { VerticalTab, HorizontalTab, HorizontalMoreTab, VerticalTabList, HorizontalTabList } from './Tabs';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4747-83313';

const FONT = "'IBM Plex Sans Arabic', system-ui, sans-serif";

export default {
  title: 'Components/Tabs',
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
};

const SECTION = {
  style: {
    fontSize: 11,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '.06em',
    marginBottom: 12,
    fontFamily: FONT,
  },
};

const SAMPLE_TABS = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' },
  { id: 'tab4', label: 'Tab 4', disabled: true },
];

const SAMPLE_TABS_AR = [
  { id: 'tab1', label: 'الأول' },
  { id: 'tab2', label: 'الثاني' },
  { id: 'tab3', label: 'الثالث' },
  { id: 'tab4', label: 'الرابع', disabled: true },
];

/* ════════════════════════════════════════════════════════════════════
   Playground — Vertical Tab (single)
   ════════════════════════════════════════════════════════════════════ */
export const PlaygroundVerticalTab = {
  name: 'Playground — Vertical Tab',
  argTypes: {
    label:    { control: 'text' },
    size:     { control: 'select', options: ['small', 'medium', 'large'] },
    selected: { control: 'boolean' },
    state:    { control: 'select', options: ['default', 'hovered', 'pressed', 'focused', 'disabled'] },
    showIcon: { control: 'boolean' },
    rtl:      { control: 'boolean' },
  },
  args: {
    label: 'Tab',
    size: 'medium',
    selected: false,
    state: 'default',
    showIcon: false,
    rtl: false,
  },
  render: (args) => (
    <div style={{ fontFamily: FONT, padding: 32 }}>
      <VerticalTab {...args} />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Playground — Horizontal Tab (single)
   ════════════════════════════════════════════════════════════════════ */
export const PlaygroundHorizontalTab = {
  name: 'Playground — Horizontal Tab',
  argTypes: {
    label:    { control: 'text' },
    size:     { control: 'select', options: ['small', 'medium', 'large'] },
    selected: { control: 'boolean' },
    state:    { control: 'select', options: ['default', 'hovered', 'pressed', 'focused', 'disabled'] },
    showIcon: { control: 'boolean' },
    rtl:      { control: 'boolean' },
  },
  args: {
    label: 'Tab',
    size: 'medium',
    selected: false,
    state: 'default',
    showIcon: false,
    rtl: false,
  },
  render: (args) => (
    <div style={{ fontFamily: FONT, padding: 32 }}>
      <HorizontalTab {...args} />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Playground — Vertical Tab List (interactive)
   ════════════════════════════════════════════════════════════════════ */
export const PlaygroundVerticalTabList = {
  name: 'Playground — Vertical Tab List',
  argTypes: {
    size:      { control: 'select', options: ['small', 'medium', 'large'] },
    showIcons: { control: 'boolean' },
    rtl:       { control: 'boolean' },
  },
  args: {
    size: 'medium',
    showIcons: false,
    rtl: false,
  },
  render: (args) => {
    const [active, setActive] = useState('tab1');
    return (
      <div style={{ fontFamily: FONT, padding: 32 }}>
        <VerticalTabList
          tabs={SAMPLE_TABS}
          activeTab={active}
          onTabChange={setActive}
          {...args}
        />
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Playground — Horizontal Tab List (interactive)
   ════════════════════════════════════════════════════════════════════ */
export const PlaygroundHorizontalTabList = {
  name: 'Playground — Horizontal Tab List',
  argTypes: {
    size:      { control: 'select', options: ['small', 'medium', 'large'] },
    showIcons: { control: 'boolean' },
    flush:     { control: 'boolean' },
    divider:   { control: 'boolean' },
    showMore:  { control: 'boolean' },
    rtl:       { control: 'boolean' },
  },
  args: {
    size: 'medium',
    showIcons: false,
    flush: false,
    divider: true,
    showMore: false,
    rtl: false,
  },
  render: (args) => {
    const [active, setActive] = useState('tab1');
    return (
      <div style={{ fontFamily: FONT, padding: 32 }}>
        <HorizontalTabList
          tabs={SAMPLE_TABS}
          activeTab={active}
          onTabChange={setActive}
          {...args}
        />
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Vertical Tab — All States
   ════════════════════════════════════════════════════════════════════ */
export const VerticalTabStates = {
  name: 'Vertical Tab — All States',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      {['small', 'medium', 'large'].map((size) => (
        <div key={size}>
          <div style={SECTION.style}>{size}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 150 }}>
            <VerticalTab size={size} label="Default" state="default" />
            <VerticalTab size={size} label="Selected" state="default" selected />
            <VerticalTab size={size} label="Hovered" state="hovered" />
            <VerticalTab size={size} label="Pressed" state="pressed" />
            <VerticalTab size={size} label="Focused" state="focused" />
            <VerticalTab size={size} label="Disabled" state="disabled" />
            <VerticalTab size={size} label="Disabled Selected" state="disabled" selected />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Vertical Tab — With Icon
   ════════════════════════════════════════════════════════════════════ */
export const VerticalTabWithIcon = {
  name: 'Vertical Tab — With Icon',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      {['small', 'medium', 'large'].map((size) => (
        <div key={size}>
          <div style={SECTION.style}>{size} — with icon</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 150 }}>
            <VerticalTab size={size} label="Default" showIcon />
            <VerticalTab size={size} label="Selected" selected showIcon />
            <VerticalTab size={size} label="Disabled" state="disabled" showIcon />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Vertical Tab — RTL
   ════════════════════════════════════════════════════════════════════ */
export const VerticalTabRTL = {
  name: 'Vertical Tab — RTL',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      {['small', 'medium', 'large'].map((size) => (
        <div key={size}>
          <div style={SECTION.style}>{size} RTL</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 150, direction: 'rtl' }}>
            <VerticalTab size={size} label="افتراضي" rtl />
            <VerticalTab size={size} label="محدد" rtl selected />
            <VerticalTab size={size} label="معطّل" rtl state="disabled" />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Horizontal Tab — All States
   ════════════════════════════════════════════════════════════════════ */
export const HorizontalTabStates = {
  name: 'Horizontal Tab — All States',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      {['small', 'medium', 'large'].map((size) => (
        <div key={size}>
          <div style={SECTION.style}>{size}</div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 4, flexWrap: 'wrap' }}>
            <HorizontalTab size={size} label="Default" state="default" />
            <HorizontalTab size={size} label="Selected" state="default" selected />
            <HorizontalTab size={size} label="Hovered" state="hovered" />
            <HorizontalTab size={size} label="Pressed" state="pressed" />
            <HorizontalTab size={size} label="Focused" state="focused" />
            <HorizontalTab size={size} label="Disabled" state="disabled" />
            <HorizontalTab size={size} label="Disabled Selected" state="disabled" selected />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Horizontal Tab — With Icon
   ════════════════════════════════════════════════════════════════════ */
export const HorizontalTabWithIcon = {
  name: 'Horizontal Tab — With Icon',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      {['small', 'medium', 'large'].map((size) => (
        <div key={size}>
          <div style={SECTION.style}>{size} — with icon</div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
            <HorizontalTab size={size} label="Default" showIcon />
            <HorizontalTab size={size} label="Selected" selected showIcon />
            <HorizontalTab size={size} label="Disabled" state="disabled" showIcon />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Horizontal More Tab — States
   ════════════════════════════════════════════════════════════════════ */
export const HorizontalMoreTabStates = {
  name: 'Horizontal More Tab — States',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      {['small', 'medium', 'large'].map((size) => (
        <div key={size}>
          <div style={SECTION.style}>{size}</div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
            <HorizontalMoreTab size={size} state="default" />
            <HorizontalMoreTab size={size} state="hovered" />
            <HorizontalMoreTab size={size} state="pressed" />
            <HorizontalMoreTab size={size} state="focused" />
            <HorizontalMoreTab size={size} state="disabled" />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Horizontal Tab List — With More Button
   ════════════════════════════════════════════════════════════════════ */
export const HorizontalTabListWithMore = {
  name: 'Horizontal Tab List — With More Button',
  render: () => {
    const [active, setActive] = useState('tab1');
    return (
      <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 48 }}>
        <div>
          <div style={SECTION.style}>Small — with more button</div>
          <HorizontalTabList size="small" showMore tabs={SAMPLE_TABS} activeTab={active} onTabChange={setActive} />
        </div>
        <div>
          <div style={SECTION.style}>Medium — with more button</div>
          <HorizontalTabList size="medium" showMore tabs={SAMPLE_TABS} activeTab={active} onTabChange={setActive} />
        </div>
        <div>
          <div style={SECTION.style}>Large — with more button</div>
          <HorizontalTabList size="large" showMore tabs={SAMPLE_TABS} activeTab={active} onTabChange={setActive} />
        </div>
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Horizontal Tab — RTL
   ════════════════════════════════════════════════════════════════════ */
export const HorizontalTabRTL = {
  name: 'Horizontal Tab — RTL',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      {['small', 'medium', 'large'].map((size) => (
        <div key={size}>
          <div style={SECTION.style}>{size} RTL</div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 4, direction: 'rtl' }}>
            <HorizontalTab size={size} label="افتراضي" rtl />
            <HorizontalTab size={size} label="محدد" rtl selected />
            <HorizontalTab size={size} label="معطّل" rtl state="disabled" />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Vertical Tab List — Sizes
   ════════════════════════════════════════════════════════════════════ */
export const VerticalTabListSizes = {
  name: 'Vertical Tab List — Sizes',
  render: () => {
    const [activeS, setActiveS] = useState('tab1');
    const [activeM, setActiveM] = useState('tab2');
    const [activeL, setActiveL] = useState('tab3');

    return (
      <div style={{ fontFamily: FONT, padding: 32, display: 'flex', gap: 48 }}>
        <div>
          <div style={SECTION.style}>Small</div>
          <VerticalTabList size="small" tabs={SAMPLE_TABS} activeTab={activeS} onTabChange={setActiveS} />
        </div>
        <div>
          <div style={SECTION.style}>Medium</div>
          <VerticalTabList size="medium" tabs={SAMPLE_TABS} activeTab={activeM} onTabChange={setActiveM} />
        </div>
        <div>
          <div style={SECTION.style}>Large</div>
          <VerticalTabList size="large" tabs={SAMPLE_TABS} activeTab={activeL} onTabChange={setActiveL} />
        </div>
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Vertical Tab List — With Icons
   ════════════════════════════════════════════════════════════════════ */
export const VerticalTabListWithIcons = {
  name: 'Vertical Tab List — With Icons',
  render: () => {
    const [active, setActive] = useState('tab1');
    return (
      <div style={{ fontFamily: FONT, padding: 32 }}>
        <div style={SECTION.style}>Medium — with icons</div>
        <VerticalTabList size="medium" showIcons tabs={SAMPLE_TABS} activeTab={active} onTabChange={setActive} />
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Vertical Tab List — RTL
   ════════════════════════════════════════════════════════════════════ */
export const VerticalTabListRTL = {
  name: 'Vertical Tab List — RTL',
  render: () => {
    const [activeM, setActiveM] = useState('tab1');
    const [activeL, setActiveL] = useState('tab2');
    return (
      <div style={{ fontFamily: FONT, padding: 32, display: 'flex', gap: 48 }}>
        <div>
          <div style={SECTION.style}>Medium RTL</div>
          <VerticalTabList size="medium" rtl tabs={SAMPLE_TABS_AR} activeTab={activeM} onTabChange={setActiveM} />
        </div>
        <div>
          <div style={SECTION.style}>Large RTL</div>
          <VerticalTabList size="large" rtl tabs={SAMPLE_TABS_AR} activeTab={activeL} onTabChange={setActiveL} />
        </div>
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Horizontal Tab List — Sizes
   ════════════════════════════════════════════════════════════════════ */
export const HorizontalTabListSizes = {
  name: 'Horizontal Tab List — Sizes',
  render: () => {
    const [activeS, setActiveS] = useState('tab1');
    const [activeM, setActiveM] = useState('tab2');
    const [activeL, setActiveL] = useState('tab3');

    return (
      <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 48 }}>
        <div>
          <div style={SECTION.style}>Small</div>
          <HorizontalTabList size="small" tabs={SAMPLE_TABS} activeTab={activeS} onTabChange={setActiveS} />
        </div>
        <div>
          <div style={SECTION.style}>Medium</div>
          <HorizontalTabList size="medium" tabs={SAMPLE_TABS} activeTab={activeM} onTabChange={setActiveM} />
        </div>
        <div>
          <div style={SECTION.style}>Large</div>
          <HorizontalTabList size="large" tabs={SAMPLE_TABS} activeTab={activeL} onTabChange={setActiveL} />
        </div>
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Horizontal Tab List — With Icons
   ════════════════════════════════════════════════════════════════════ */
export const HorizontalTabListWithIcons = {
  name: 'Horizontal Tab List — With Icons',
  render: () => {
    const [active, setActive] = useState('tab1');
    return (
      <div style={{ fontFamily: FONT, padding: 32 }}>
        <div style={SECTION.style}>Medium — with icons</div>
        <HorizontalTabList size="medium" showIcons tabs={SAMPLE_TABS} activeTab={active} onTabChange={setActive} />
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Horizontal Tab List — Flush
   ════════════════════════════════════════════════════════════════════ */
export const HorizontalTabListFlush = {
  name: 'Horizontal Tab List — Flush',
  render: () => {
    const [active, setActive] = useState('tab1');
    return (
      <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 48 }}>
        <div style={{ background: '#f9fafb', padding: 16, borderRadius: 8, border: '1px solid #e5e7eb' }}>
          <div style={SECTION.style}>flush=false (default)</div>
          <HorizontalTabList size="medium" flush={false} tabs={SAMPLE_TABS} activeTab={active} onTabChange={setActive} />
        </div>
        <div style={{ background: '#f9fafb', padding: 16, borderRadius: 8, border: '1px solid #e5e7eb' }}>
          <div style={SECTION.style}>flush=true</div>
          <HorizontalTabList size="medium" flush tabs={SAMPLE_TABS} activeTab={active} onTabChange={setActive} />
        </div>
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Horizontal Tab List — No Divider
   ════════════════════════════════════════════════════════════════════ */
export const HorizontalTabListNoDivider = {
  name: 'Horizontal Tab List — No Divider',
  render: () => {
    const [active, setActive] = useState('tab1');
    return (
      <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 48 }}>
        <div>
          <div style={SECTION.style}>With divider (default)</div>
          <HorizontalTabList size="medium" divider tabs={SAMPLE_TABS} activeTab={active} onTabChange={setActive} />
        </div>
        <div>
          <div style={SECTION.style}>No divider</div>
          <HorizontalTabList size="medium" divider={false} tabs={SAMPLE_TABS} activeTab={active} onTabChange={setActive} />
        </div>
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Horizontal Tab List — RTL
   ════════════════════════════════════════════════════════════════════ */
export const HorizontalTabListRTL = {
  name: 'Horizontal Tab List — RTL',
  render: () => {
    const [activeM, setActiveM] = useState('tab1');
    const [activeL, setActiveL] = useState('tab2');
    return (
      <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 48 }}>
        <div>
          <div style={SECTION.style}>Medium RTL</div>
          <HorizontalTabList size="medium" rtl tabs={SAMPLE_TABS_AR} activeTab={activeM} onTabChange={setActiveM} />
        </div>
        <div>
          <div style={SECTION.style}>Large RTL</div>
          <HorizontalTabList size="large" rtl tabs={SAMPLE_TABS_AR} activeTab={activeL} onTabChange={setActiveL} />
        </div>
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Full Matrix — all variants
   ════════════════════════════════════════════════════════════════════ */
export const FullMatrix = {
  name: 'Full Matrix — All Variants',
  render: () => {
    const [vS, setVS] = useState('tab1');
    const [vM, setVM] = useState('tab1');
    const [vL, setVL] = useState('tab1');
    const [vRS, setVRS] = useState('tab1');
    const [vRM, setVRM] = useState('tab1');
    const [vRL, setVRL] = useState('tab1');
    const [hS, setHS] = useState('tab1');
    const [hM, setHM] = useState('tab1');
    const [hL, setHL] = useState('tab1');
    const [hRS, setHRS] = useState('tab1');
    const [hRM, setHRM] = useState('tab1');
    const [hRL, setHRL] = useState('tab1');

    const card = (label, children) => (
      <div key={label} style={{ padding: 16, background: '#f9fafb', borderRadius: 8, border: '1px solid #e5e7eb' }}>
        <div style={SECTION.style}>{label}</div>
        {children}
      </div>
    );

    return (
      <div style={{ fontFamily: FONT, padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>

        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600, color: '#111827' }}>Vertical Tab List</h3>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {card('Small LTR', <VerticalTabList size="small" tabs={SAMPLE_TABS} activeTab={vS} onTabChange={setVS} />)}
          {card('Medium LTR', <VerticalTabList size="medium" tabs={SAMPLE_TABS} activeTab={vM} onTabChange={setVM} />)}
          {card('Large LTR', <VerticalTabList size="large" tabs={SAMPLE_TABS} activeTab={vL} onTabChange={setVL} />)}
          {card('Small RTL', <VerticalTabList size="small" rtl tabs={SAMPLE_TABS_AR} activeTab={vRS} onTabChange={setVRS} />)}
          {card('Medium RTL', <VerticalTabList size="medium" rtl tabs={SAMPLE_TABS_AR} activeTab={vRM} onTabChange={setVRM} />)}
          {card('Large RTL', <VerticalTabList size="large" rtl tabs={SAMPLE_TABS_AR} activeTab={vRL} onTabChange={setVRL} />)}
        </div>

        <h3 style={{ margin: '16px 0 8px', fontSize: 16, fontWeight: 600, color: '#111827' }}>Horizontal Tab List</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {card('Small LTR', <HorizontalTabList size="small" tabs={SAMPLE_TABS} activeTab={hS} onTabChange={setHS} />)}
          {card('Medium LTR', <HorizontalTabList size="medium" tabs={SAMPLE_TABS} activeTab={hM} onTabChange={setHM} />)}
          {card('Large LTR', <HorizontalTabList size="large" tabs={SAMPLE_TABS} activeTab={hL} onTabChange={setHL} />)}
          {card('Small RTL', <HorizontalTabList size="small" rtl tabs={SAMPLE_TABS_AR} activeTab={hRS} onTabChange={setHRS} />)}
          {card('Medium RTL', <HorizontalTabList size="medium" rtl tabs={SAMPLE_TABS_AR} activeTab={hRM} onTabChange={setHRM} />)}
          {card('Large RTL', <HorizontalTabList size="large" rtl tabs={SAMPLE_TABS_AR} activeTab={hRL} onTabChange={setHRL} />)}
        </div>

        <h3 style={{ margin: '16px 0 8px', fontSize: 16, fontWeight: 600, color: '#111827' }}>Individual Tab States</h3>
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          <div>
            <div style={SECTION.style}>Vertical — all states (medium)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 150 }}>
              {[
                { label: 'Default', state: 'default', selected: false },
                { label: 'Selected', state: 'default', selected: true },
                { label: 'Hovered', state: 'hovered', selected: false },
                { label: 'Pressed', state: 'pressed', selected: false },
                { label: 'Focused', state: 'focused', selected: false },
                { label: 'Disabled', state: 'disabled', selected: false },
                { label: 'Dis. Selected', state: 'disabled', selected: true },
              ].map(({ label, state, selected }) => (
                <VerticalTab key={label} size="medium" label={label} state={state} selected={selected} />
              ))}
            </div>
          </div>
          <div>
            <div style={SECTION.style}>Horizontal — all states (medium)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                { label: 'Default', state: 'default', selected: false },
                { label: 'Selected', state: 'default', selected: true },
                { label: 'Hovered', state: 'hovered', selected: false },
                { label: 'Pressed', state: 'pressed', selected: false },
                { label: 'Focused', state: 'focused', selected: false },
                { label: 'Disabled', state: 'disabled', selected: false },
                { label: 'Dis. Selected', state: 'disabled', selected: true },
              ].map(({ label, state, selected }) => (
                <HorizontalTab key={label} size="medium" label={label} state={state} selected={selected} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
};
