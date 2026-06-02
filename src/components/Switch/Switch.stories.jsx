import React, { useState } from 'react';
import { Switch, SwitchLabel } from './Switch';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4250-1937';

const FONT = "'IBM Plex Sans Arabic', system-ui, sans-serif";

export default {
  title: 'Components/Switch',
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
   Playground — Switch
   ════════════════════════════════════════════════════════════════════ */
export const PlaygroundSwitch = {
  name: 'Playground — Switch',
  argTypes: {
    state:    { control: 'select', options: ['default', 'hovered', 'pressed', 'focused', 'disabled'] },
    checked:  { control: 'boolean' },
    showIcon: { control: 'boolean' },
    rtl:      { control: 'boolean' },
  },
  args: {
    checked: false,
    showIcon: false,
    state: 'default',
    rtl: false,
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return (
      <div style={{ fontFamily: FONT, padding: 16 }}>
        <Switch {...args} checked={checked} onChange={setChecked} />
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   All States — Off
   ════════════════════════════════════════════════════════════════════ */
export const AllStatesOff = {
  name: 'Switch — All States (Off)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: FONT }}>
      {['default', 'hovered', 'pressed', 'focused', 'disabled'].map((state) => (
        <div key={state}>
          <div style={LABEL.style}>{state}</div>
          <Switch checked={false} state={state} />
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   All States — On (no icon)
   ════════════════════════════════════════════════════════════════════ */
export const AllStatesOn = {
  name: 'Switch — All States (On)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: FONT }}>
      {['default', 'hovered', 'pressed', 'focused', 'disabled'].map((state) => (
        <div key={state}>
          <div style={LABEL.style}>{state}</div>
          <Switch checked={true} state={state} />
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   All States — On with Icon
   ════════════════════════════════════════════════════════════════════ */
export const AllStatesOnWithIcon = {
  name: 'Switch — All States (On + Icon)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: FONT }}>
      {['default', 'hovered', 'pressed', 'focused', 'disabled'].map((state) => (
        <div key={state}>
          <div style={LABEL.style}>{state}</div>
          <Switch checked={true} showIcon state={state} />
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   On vs Off side by side
   ════════════════════════════════════════════════════════════════════ */
export const OnOff = {
  name: 'Switch — On / Off',
  render: () => (
    <div style={{ display: 'flex', gap: 32, fontFamily: FONT, flexWrap: 'wrap' }}>
      <div>
        <div style={LABEL.style}>Off</div>
        <Switch checked={false} />
      </div>
      <div>
        <div style={LABEL.style}>On (no icon)</div>
        <Switch checked={true} />
      </div>
      <div>
        <div style={LABEL.style}>On + Icon</div>
        <Switch checked={true} showIcon />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   RTL Switches
   ════════════════════════════════════════════════════════════════════ */
export const RTLSwitch = {
  name: 'Switch — RTL',
  render: () => (
    <div style={{ display: 'flex', gap: 32, fontFamily: FONT, flexWrap: 'wrap' }}>
      <div>
        <div style={LABEL.style}>RTL — Off</div>
        <Switch checked={false} rtl />
      </div>
      <div>
        <div style={LABEL.style}>RTL — On</div>
        <Switch checked={true} rtl />
      </div>
      <div>
        <div style={LABEL.style}>RTL — On + Icon</div>
        <Switch checked={true} showIcon rtl />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Interactive Switch
   ════════════════════════════════════════════════════════════════════ */
export const InteractiveSwitch = {
  name: 'Switch — Interactive',
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ fontFamily: FONT, padding: 16 }}>
        <div style={LABEL.style}>Click to toggle</div>
        <Switch checked={checked} showIcon onChange={setChecked} />
        <p style={{ marginTop: 12, fontSize: 14, color: '#6c7c96' }}>
          State: <strong>{checked ? 'On' : 'Off'}</strong>
        </p>
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Playground — Switch Label
   ════════════════════════════════════════════════════════════════════ */
export const PlaygroundSwitchLabel = {
  name: 'Playground — Switch Label',
  argTypes: {
    state:       { control: 'select', options: ['default', 'hovered', 'pressed', 'focused', 'disabled'] },
    checked:     { control: 'boolean' },
    showIcon:    { control: 'boolean' },
    trailSwitch: { control: 'boolean' },
    helperText:  { control: 'boolean' },
    alertMessage:{ control: 'boolean' },
    rtl:         { control: 'boolean' },
    label:       { control: 'text' },
  },
  args: {
    checked: false,
    showIcon: false,
    state: 'default',
    trailSwitch: false,
    helperText: false,
    alertMessage: false,
    rtl: false,
    label: 'Switch Label',
  },
  render: ({ helperText, alertMessage, label, ...args }) => {
    const [checked, setChecked] = useState(args.checked);
    return (
      <div style={{ fontFamily: FONT, padding: 16, maxWidth: 400 }}>
        <SwitchLabel
          {...args}
          label={label}
          checked={checked}
          onChange={setChecked}
          helperText={helperText ? 'When a selection needs a further detailed explanation, it goes here.' : null}
          alertMessage={alertMessage ? 'Error/Warning message' : null}
        />
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Switch Label — Trail Switch positions
   ════════════════════════════════════════════════════════════════════ */
export const TrailSwitchPositions = {
  name: 'Switch Label — Trail Switch (LTR)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: FONT, maxWidth: 400 }}>
      <div>
        <div style={LABEL.style}>Trail Switch = False (switch leads)</div>
        <SwitchLabel label="Switch Label" checked={false} trailSwitch={false} />
      </div>
      <div>
        <div style={LABEL.style}>Trail Switch = True (switch trails)</div>
        <SwitchLabel label="Switch Label" checked={true} trailSwitch={true} />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Switch Label — Helper Text
   ════════════════════════════════════════════════════════════════════ */
export const WithHelperText = {
  name: 'Switch Label — With Helper Text',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: FONT, maxWidth: 400 }}>
      <div>
        <div style={LABEL.style}>Helper text only</div>
        <SwitchLabel
          label="Switch Label"
          checked={false}
          helperText="When a selection needs a further detailed explanation, it goes here."
        />
      </div>
      <div>
        <div style={LABEL.style}>Helper text + On + Trail</div>
        <SwitchLabel
          label="Switch Label"
          checked={true}
          showIcon
          trailSwitch
          helperText="When a selection needs a further detailed explanation, it goes here."
        />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Switch Label — Alert Message
   ════════════════════════════════════════════════════════════════════ */
export const WithAlertMessage = {
  name: 'Switch Label — With Alert Message',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: FONT, maxWidth: 400 }}>
      <div>
        <div style={LABEL.style}>Alert message only</div>
        <SwitchLabel
          label="Switch Label"
          checked={false}
          alertMessage="Error/Warning message"
        />
      </div>
      <div>
        <div style={LABEL.style}>Helper + Alert message</div>
        <SwitchLabel
          label="Switch Label"
          checked={false}
          helperText="When a selection needs a further detailed explanation, it goes here."
          alertMessage="Error/Warning message"
        />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Switch Label — RTL
   ════════════════════════════════════════════════════════════════════ */
export const RTLSwitchLabel = {
  name: 'Switch Label — RTL',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: FONT, maxWidth: 420 }}>
      <div>
        <div style={LABEL.style}>RTL — Trail Switch = False</div>
        <SwitchLabel label="عنوان المفتاح" checked={false} rtl trailSwitch={false} />
      </div>
      <div>
        <div style={LABEL.style}>RTL — Trail Switch = True</div>
        <SwitchLabel label="عنوان المفتاح" checked={true} showIcon rtl trailSwitch={true} />
      </div>
      <div>
        <div style={LABEL.style}>RTL — With Helper Text</div>
        <SwitchLabel
          label="عنوان المفتاح"
          checked={true}
          rtl
          helperText="يكتب المحتوى الإضافي هنا في حال ان عنوان الاختيار يحتاج الى شرح أو تفصيل."
        />
      </div>
      <div>
        <div style={LABEL.style}>RTL — With Alert Message</div>
        <SwitchLabel
          label="عنوان المفتاح"
          checked={false}
          rtl
          helperText="يكتب المحتوى الإضافي هنا في حال ان عنوان الاختيار يحتاج الى شرح أو تفصيل."
          alertMessage="رسالة خطأ أو تحذير"
        />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Switch Label — All States
   ════════════════════════════════════════════════════════════════════ */
export const AllLabelStates = {
  name: 'Switch Label — All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: FONT, maxWidth: 400 }}>
      {['default', 'hovered', 'pressed', 'focused', 'disabled'].map((state) => (
        <div key={state}>
          <div style={LABEL.style}>{state}</div>
          <SwitchLabel
            label="Switch Label"
            checked={state !== 'disabled'}
            state={state}
            helperText="Helper text appears here."
          />
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Full Matrix
   ════════════════════════════════════════════════════════════════════ */
export const FullMatrix = {
  name: 'Switch — Full Matrix',
  render: () => (
    <div style={{ display: 'flex', gap: 40, fontFamily: FONT, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {/* Off states */}
      <div>
        <div style={{ ...LABEL.style, fontSize: 13, color: '#000b36', textTransform: 'none', marginBottom: 16 }}>Off states</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {['default', 'hovered', 'pressed', 'focused', 'disabled'].map((state) => (
            <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ ...LABEL.style, width: 70, marginBottom: 0 }}>{state}</div>
              <Switch checked={false} state={state} />
            </div>
          ))}
        </div>
      </div>

      {/* On states (no icon) */}
      <div>
        <div style={{ ...LABEL.style, fontSize: 13, color: '#000b36', textTransform: 'none', marginBottom: 16 }}>On states</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {['default', 'hovered', 'pressed', 'focused', 'disabled'].map((state) => (
            <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ ...LABEL.style, width: 70, marginBottom: 0 }}>{state}</div>
              <Switch checked={true} state={state} />
            </div>
          ))}
        </div>
      </div>

      {/* On + Icon states */}
      <div>
        <div style={{ ...LABEL.style, fontSize: 13, color: '#000b36', textTransform: 'none', marginBottom: 16 }}>On + Icon states</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {['default', 'hovered', 'pressed', 'focused', 'disabled'].map((state) => (
            <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ ...LABEL.style, width: 70, marginBottom: 0 }}>{state}</div>
              <Switch checked={true} showIcon state={state} />
            </div>
          ))}
        </div>
      </div>

      {/* RTL */}
      <div>
        <div style={{ ...LABEL.style, fontSize: 13, color: '#000b36', textTransform: 'none', marginBottom: 16 }}>RTL</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {['default', 'hovered', 'pressed', 'focused', 'disabled'].map((state) => (
            <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ ...LABEL.style, width: 70, marginBottom: 0 }}>{state}</div>
              <Switch checked={state !== 'default' && state !== 'disabled'} showIcon state={state} rtl />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
