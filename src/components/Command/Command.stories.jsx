import { useState } from 'react';
import {
  Command,
  CommandInput,
  CommandMenuItem,
  CommandMenuSection,
  CommandFooter,
  AVATAR_SM_ICON,
  DOT_IMG,
} from './Command';

// ─── Shared layout helpers ────────────────────────────────────────
const LABEL = {
  fontSize: 11, fontWeight: 700, color: '#9ca3af',
  marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em',
};

const STATE_LABEL = { fontSize: 10, color: '#9ca3af', marginBottom: 6, letterSpacing: '.04em', textAlign: 'center' };

// ─── Sample data (matches Figma node 4807:133549) ─────────────────
const RECENT_ITEMS = [
  { type: 'icon', state: 'default', label: 'Marketing site redesign', supportingText: null,   shortcut: null },
  { type: 'icon', state: 'hover',   label: 'Create new document',      supportingText: null,   shortcut: '⌘N' },
  { type: 'icon', state: 'default', label: 'Invite colleagues',        supportingText: null,   shortcut: '⌘I' },
];

const ACTION_ITEMS = [
  { type: 'icon', state: 'default', label: 'My profile',        supportingText: null, shortcut: ['⌘K', 'P'] },
  { type: 'icon', state: 'default', label: 'Team profile',      supportingText: null, shortcut: ['⌘K', 'T'] },
  { type: 'icon', state: 'default', label: 'Invite colleagues', supportingText: null, shortcut: '⌘I' },
  { type: 'icon', state: 'default', label: 'Create new project',supportingText: null, shortcut: '⌘N' },
  { type: 'icon', state: 'default', label: 'Support',           supportingText: null, shortcut: '⌘H' },
  { type: 'icon', state: 'default', label: 'Changelog',         supportingText: null, shortcut: '⌘C' },
  { type: 'icon', state: 'default', label: 'Keyboard shortcuts',supportingText: null, shortcut: '⌘?' },
];

export default {
  title: 'Components/Command',
  component: Command,
  parameters: { layout: 'padded' },
  argTypes: {
    footer: { control: 'boolean' },
    rtl:    { control: 'boolean' },
  },
};

// ═══════════════════════════════════════════════════════════════════
// 1. FIGMA CANVAS — all item variants from node 4747:83322
// ═══════════════════════════════════════════════════════════════════
export const FigmaCanvas = {
  name: 'Figma Canvas — All Variants',
  parameters: { layout: 'centered' },
  render: () => {
    const TYPES  = ['icon', 'dot'];
    const STATES = ['default', 'hover', 'focus'];
    const TEXTS  = ['default', 'stacked'];

    return (
      <div style={{ background: '#f8fafc', padding: 32, display: 'inline-flex', flexDirection: 'column', gap: 40 }}>

        {/* Icon leading */}
        <div>
          <div style={LABEL}>Icon Leading</div>
          <div style={{ display: 'flex', gap: 24 }}>
            {TEXTS.map(text => (
              <div key={text} style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 280, background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                <div style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6', ...LABEL }}>{text}</div>
                {STATES.map(state => (
                  <CommandMenuItem
                    key={state}
                    type="icon"
                    state={state}
                    text={text}
                    label="Olivia Rhye"
                    supportingText="@olivia"
                    shortcut={state !== 'default' ? '⌘C' : undefined}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dot leading */}
        <div>
          <div style={LABEL}>Dot Leading</div>
          <div style={{ display: 'flex', gap: 24 }}>
            {TEXTS.map(text => (
              <div key={text} style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 280, background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                <div style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6', ...LABEL }}>{text}</div>
                {STATES.map(state => (
                  <CommandMenuItem
                    key={state}
                    type="dot"
                    state={state}
                    text={text}
                    label="Olivia Rhye"
                    supportingText="@olivia"
                    shortcut={state !== 'default' ? '⌘C' : undefined}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* RTL variants */}
        <div>
          <div style={LABEL}>RTL</div>
          <div style={{ display: 'flex', gap: 24 }}>
            {TYPES.map(type => (
              <div key={type} style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 280, background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                <div style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6', ...LABEL }}>{type}</div>
                {STATES.map(state => (
                  <CommandMenuItem
                    key={state}
                    type={type}
                    state={state}
                    text="default"
                    label="أوليفيا راي"
                    supportingText="@أوليفيا"
                    shortcut={state !== 'default' ? '⌘C' : undefined}
                    rtl
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  },
};

// ═══════════════════════════════════════════════════════════════════
// 2. INTERACTIVE — full command bar with controls
// ═══════════════════════════════════════════════════════════════════
export const Default = {
  name: 'Interactive (Controls)',
  args: { footer: true, rtl: false },
  render: ({ footer, rtl }) => {
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(true);
    if (!open) return (
      <div style={{ textAlign: 'center', padding: 32 }}>
        <div style={{ fontSize: 14, color: '#6c7c96', marginBottom: 12 }}>Command closed (Escape pressed)</div>
        <button onClick={() => setOpen(true)} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 14 }}>Reopen</button>
      </div>
    );
    return (
      <div style={{ width: 640 }}>
        {selected && (
          <div style={{ marginBottom: 12, padding: '8px 14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, fontSize: 13, color: '#059669' }}>
            Selected: <strong>{selected.label}</strong>
          </div>
        )}
        <Command
          sections={[
            { heading: 'Recent', items: RECENT_ITEMS },
            { items: ACTION_ITEMS },
          ]}
          footer={footer}
          rtl={rtl}
          onSelect={item => setSelected(item)}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};

// ═══════════════════════════════════════════════════════════════════
// 3. INPUT STATES
// ═══════════════════════════════════════════════════════════════════
export const InputStates = {
  name: 'Input States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 576 }}>
      {[
        { state: 'placeholder', value: '',            label: 'Placeholder' },
        { state: 'filled',      value: 'Olivia Rhye', label: 'Filled' },
        { state: 'focus',       value: 'Olivia Rhye', label: 'Focus' },
      ].map(({ state, value, label }) => (
        <div key={state}>
          <div style={LABEL}>{label}</div>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
            <CommandInput state={state} value={value} />
          </div>
        </div>
      ))}
      <div>
        <div style={LABEL}>RTL — Placeholder</div>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
          <CommandInput state="placeholder" value="" rtl />
        </div>
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════
// 4. MENU ITEM STATES — icon + dot, all states
// ═══════════════════════════════════════════════════════════════════
export const MenuItemStates = {
  name: 'Menu Item States',
  render: () => {
    const COMBOS = [
      { type: 'icon', label: 'Default',  state: 'default', shortcut: '⌘C' },
      { type: 'icon', label: 'Hover',    state: 'hover',   shortcut: '⌘C' },
      { type: 'icon', label: 'Focus',    state: 'focus',   shortcut: '⌘C' },
      { type: 'dot',  label: 'Dot — Default', state: 'default', shortcut: '⌘C' },
      { type: 'dot',  label: 'Dot — Hover',   state: 'hover',   shortcut: '⌘C' },
      { type: 'dot',  label: 'Dot — Focus',   state: 'focus',   shortcut: '⌘C' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 400 }}>
        {COMBOS.map(({ label, ...props }) => (
          <div key={label}>
            <div style={STATE_LABEL}>{label}</div>
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
              <CommandMenuItem
                {...props}
                label="Olivia Rhye"
                supportingText="@olivia"
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// ═══════════════════════════════════════════════════════════════════
// 5. STACKED TEXT
// ═══════════════════════════════════════════════════════════════════
export const StackedText = {
  name: 'Stacked Text',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {['icon', 'dot'].map(type => (
        <div key={type} style={{ width: 300, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6', ...LABEL }}>{type} leading — stacked</div>
          {['default', 'hover', 'focus'].map(state => (
            <CommandMenuItem
              key={state}
              type={type}
              state={state}
              text="stacked"
              label="Olivia Rhye"
              supportingText="@olivia"
              shortcut={state !== 'default' ? '⌘C' : undefined}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════
// 6. SHORTCUT KEYS — single and dual
// ═══════════════════════════════════════════════════════════════════
export const ShortcutKeys = {
  name: 'Shortcut Keys',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 400, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6', ...LABEL }}>Shortcut variants</div>
      <CommandMenuItem type="icon" state="hover"   label="Create new document"  shortcut="⌘N" />
      <CommandMenuItem type="icon" state="hover"   label="Invite colleagues"     shortcut="⌘I" />
      <CommandMenuItem type="icon" state="hover"   label="Keyboard shortcuts"    shortcut="⌘?" />
      <CommandMenuItem type="icon" state="default" label="My profile"            shortcut={['⌘K', 'P']} />
      <CommandMenuItem type="icon" state="default" label="Team profile"          shortcut={['⌘K', 'T']} />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════
// 7. FULL BAR — matches Figma node 4807:133549
// ═══════════════════════════════════════════════════════════════════
export const FullBar = {
  name: 'Full Command Bar',
  parameters: { layout: 'centered' },
  render: () => {
    const [selected, setSelected] = useState(null);
    return (
      <div style={{ width: 640 }}>
        {selected && (
          <div style={{ marginBottom: 12, padding: '8px 14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, fontSize: 13, color: '#059669' }}>
            Selected: <strong>{selected.label}</strong>
          </div>
        )}
        <Command
          sections={[
            { heading: 'Recent', items: RECENT_ITEMS },
            { items: ACTION_ITEMS },
          ]}
          footer
          onSelect={setSelected}
        />
      </div>
    );
  },
};

// ═══════════════════════════════════════════════════════════════════
// 8. RTL SUPPORT
// ═══════════════════════════════════════════════════════════════════
export const RTLSupport = {
  name: 'RTL Support',
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div>
        <div style={{ ...LABEL, marginBottom: 12 }}>LTR</div>
        <div style={{ width: 580 }}>
          <Command
            sections={[{ heading: 'Recent', items: RECENT_ITEMS.slice(0, 3) }, { items: ACTION_ITEMS.slice(0, 3) }]}
            footer
          />
        </div>
      </div>
      <div>
        <div style={{ ...LABEL, marginBottom: 12 }}>RTL</div>
        <div style={{ width: 580 }}>
          <Command
            sections={[{ heading: 'Recent', items: RECENT_ITEMS.slice(0, 3) }, { items: ACTION_ITEMS.slice(0, 3) }]}
            footer
            rtl
          />
        </div>
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════
// 9. FOOTER
// ═══════════════════════════════════════════════════════════════════
export const Footer = {
  name: 'Footer',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 640 }}>
      <div>
        <div style={LABEL}>LTR</div>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
          <CommandFooter />
        </div>
      </div>
      <div>
        <div style={LABEL}>RTL</div>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
          <CommandFooter rtl />
        </div>
      </div>
    </div>
  ),
};
