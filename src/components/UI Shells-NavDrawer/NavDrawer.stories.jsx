import { NavDrawer, NavDrawerItem } from './NavDrawer';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=5005-10501';

/* ── Sample nav data ─────────────────────────────────── */

const ITEMS = [
  { label: 'Dashboard',    labelAr: 'لوحة التحكم',    type: 'link',   level: 1, state: 'Default',  icon: true,  badge: false },
  { label: 'Products',     labelAr: 'المنتجات',        type: 'parent', level: 1, state: 'Default',  icon: true,  badge: true,  badgeCount: '+5', expanded: false },
  { label: 'All Products', labelAr: 'كل المنتجات',     type: 'link',   level: 2, state: 'Default',  icon: false, badge: false },
  { label: 'Categories',   labelAr: 'التصنيفات',       type: 'link',   level: 2, state: 'Selected', icon: false, badge: false },
  { label: 'Analytics',    labelAr: 'التحليلات',       type: 'link',   level: 1, state: 'Default',  icon: true,  badge: true,  badgeCount: '+99' },
  { label: 'Settings',     labelAr: 'الإعدادات',       type: 'link',   level: 1, state: 'Default',  icon: true,  badge: false },
  { label: 'Help',         labelAr: 'المساعدة',        type: 'link',   level: 1, state: 'Disabled', icon: true,  badge: false },
];

const ITEMS_EXPANDED = [
  { label: 'Dashboard',    labelAr: 'لوحة التحكم',    type: 'link',   level: 1, state: 'Default',  icon: true,  badge: false },
  { label: 'Products',     labelAr: 'المنتجات',        type: 'parent', level: 1, state: 'Default',  icon: true,  badge: true,  badgeCount: '+5', expanded: true },
  { label: 'All Products', labelAr: 'كل المنتجات',     type: 'link',   level: 2, state: 'Default',  icon: false, badge: false },
  { label: 'Categories',   labelAr: 'التصنيفات',       type: 'link',   level: 2, state: 'Selected', icon: false, badge: false },
  { label: 'Reviews',      labelAr: 'المراجعات',       type: 'link',   level: 2, state: 'Default',  icon: false, badge: true,  badgeCount: '+3' },
  { label: 'Analytics',    labelAr: 'التحليلات',       type: 'link',   level: 1, state: 'Default',  icon: true,  badge: false },
  { label: 'Settings',     labelAr: 'الإعدادات',       type: 'link',   level: 1, state: 'Default',  icon: true,  badge: false },
];

/* ── Default export ──────────────────────────────────── */

export default {
  title: 'UI Shells/Nav Drawer/Nav Items',
  component: NavDrawer,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    rtl: {
      control: 'boolean',
      description: 'Right-to-left layout — mirrors indicator side and flex direction',
      table: { defaultValue: { summary: 'false' } },
    },
    onColor: {
      control: 'boolean',
      description: 'Dark sidebar variant — inverts text and badge colors',
      table: { defaultValue: { summary: 'false' } },
    },
    full: {
      control: 'boolean',
      description: 'Full (224 px) vs icon-only (48×32) items',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  args: {
    rtl:     false,
    onColor: false,
    full:    true,
    items:   ITEMS,
  },
};

/* ── Playground ──────────────────────────────────────── */

export const Playground = {};

/* ── LTR — Default ───────────────────────────────────── */

export const DefaultLTR = {
  name: 'Default — LTR',
  parameters: {
    docs: {
      description: {
        story:
          'Light sidebar, LTR. Includes Level 1 link items, a Level 1 parent with sub-menu (collapsed), Level 2 children, a badge, and a disabled item. Selected item shows blue `#1849a9` left-edge indicator + blue text.',
      },
    },
  },
  args: { rtl: false, onColor: false, full: true, items: ITEMS },
};

/* ── RTL — Default ───────────────────────────────────── */

export const DefaultRTL = {
  name: 'Default — RTL',
  parameters: {
    docs: {
      description: {
        story:
          'Light sidebar, RTL. All items are mirrored — icon appears on the right, label in the centre, badge/chevron on the left. Selection indicator moves to the right edge.',
      },
    },
  },
  args: { rtl: true, onColor: false, full: true, items: ITEMS },
};

/* ── Expanded sub-menu ───────────────────────────────── */

export const WithExpandedSubmenu = {
  name: 'With Expanded Sub-menu',
  parameters: {
    docs: {
      description: {
        story:
          'Parent item (`type="parent"`, `expanded=true`) shows chevron rotated 180°. Level 2 children are indented with 40px left padding (LTR).',
      },
    },
  },
  args: { rtl: false, onColor: false, full: true, items: ITEMS_EXPANDED },
};

/* ── On-color (dark) LTR ─────────────────────────────── */

export const OnColorLTR = {
  name: 'On-Color — LTR (Dark Sidebar)',
  parameters: {
    docs: {
      description: {
        story:
          '`onColor=true` — dark sidebar (`#111827` bg). Text switches to `#f9fafb`, badges use `#1f2a37` background with no border. Hover/pressed use semi-transparent white overlays.',
      },
    },
  },
  args: { rtl: false, onColor: true, full: true, items: ITEMS },
};

/* ── On-color RTL ────────────────────────────────────── */

export const OnColorRTL = {
  name: 'On-Color — RTL (Dark Sidebar)',
  parameters: {
    docs: {
      description: {
        story: 'Dark sidebar, RTL — combines `onColor=true` with `rtl=true`. Indicator on right edge.',
      },
    },
  },
  args: { rtl: true, onColor: true, full: true, items: ITEMS },
};

/* ── Icon-only (collapsed) ───────────────────────────── */

export const IconOnlyLTR = {
  name: 'Icon-Only — LTR (Collapsed)',
  parameters: {
    docs: {
      description: {
        story:
          '`full=false` — collapsed sidebar shows 48×32 icon-only buttons. Each renders as a single house icon. Labels are still set as `aria-label` for accessibility.',
      },
    },
  },
  args: { rtl: false, onColor: false, full: false, items: ITEMS },
};

export const IconOnlyRTL = {
  name: 'Icon-Only — RTL (Collapsed)',
  parameters: {
    docs: {
      description: {
        story: 'Collapsed sidebar, RTL.',
      },
    },
  },
  args: { rtl: true, onColor: false, full: false, items: ITEMS },
};

/* ── Helpers for state matrix ────────────────────────── */

const col = (text) => ({
  fontSize: 11,
  fontWeight: 700,
  color: '#233a61',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  flexShrink: 0,
  fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
});

const stateLabel = (text) => ({
  fontSize: 11,
  fontWeight: 600,
  color: '#6c7c96',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  width: 80,
  flexShrink: 0,
  fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
});

const STATES = ['Default', 'Hovered', 'Pressed', 'Focused', 'Selected', 'Disabled'];

/* ── Draw Item States — LTR ──────────────────────────── */

export const DrawerItemStatesLTR = {
  name: 'Drawer Item States — LTR',
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        story:
          'All states × three item types, LTR. **L1 Link** — icon + label + optional badge. **L1 Parent** — icon + label + chevron (collapsed/expanded). **L2 Link** — indented label, no leading icon. Selected state: `#e5e7eb` bg, `#1849a9` text, blue left-edge indicator.',
      },
    },
  },
  render: () => (
    <div style={{ padding: 32, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ width: 80, flexShrink: 0 }} />
        <div style={{ width: 224, flexShrink: 0, ...col() }}>L1 — Link</div>
        <div style={{ width: 224, flexShrink: 0, ...col() }}>L1 — Parent</div>
        <div style={{ width: 224, flexShrink: 0, ...col() }}>L2 — Link</div>
      </div>

      {/* State rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {STATES.map((state) => (
          <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={stateLabel(state)}>{state}</span>

            {/* L1 Link */}
            <div style={{ width: 224, flexShrink: 0 }}>
              <NavDrawerItem
                label="Link"
                state={state}
                type="link"
                level={1}
                rtl={false}
                full
                icon
                badge={state !== 'Disabled'}
                badgeCount="+99"
              />
            </div>

            {/* L1 Parent */}
            <div style={{ width: 224, flexShrink: 0 }}>
              <NavDrawerItem
                label="Link"
                state={state}
                type="parent"
                level={1}
                rtl={false}
                full
                icon
                expanded={false}
              />
            </div>

            {/* L2 Link */}
            <div style={{ width: 224, flexShrink: 0 }}>
              <NavDrawerItem
                label="Link"
                state={state}
                type="link"
                level={2}
                rtl={false}
                full
                icon={false}
                badge={state !== 'Disabled'}
                badgeCount="+99"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ── Drawer Item States — RTL ─────────────────────────── */

export const DrawerItemStatesRTL = {
  name: 'Drawer Item States — RTL',
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        story:
          'Same state matrix as LTR but mirrored. Icon on right, badge/chevron on left, indicator on right edge for selected/hovered.',
      },
    },
  },
  render: () => (
    <div style={{ padding: 32, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ width: 80, flexShrink: 0 }} />
        <div style={{ width: 224, flexShrink: 0, ...col() }}>L1 — Link</div>
        <div style={{ width: 224, flexShrink: 0, ...col() }}>L1 — Parent</div>
        <div style={{ width: 224, flexShrink: 0, ...col() }}>L2 — Link</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {STATES.map((state) => (
          <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={stateLabel(state)}>{state}</span>

            <div style={{ width: 224, flexShrink: 0 }}>
              <NavDrawerItem labelAr="رابط" state={state} type="link"   level={1} rtl full icon badge={state !== 'Disabled'} badgeCount="+99" />
            </div>
            <div style={{ width: 224, flexShrink: 0 }}>
              <NavDrawerItem labelAr="رابط" state={state} type="parent" level={1} rtl full icon expanded={false} />
            </div>
            <div style={{ width: 224, flexShrink: 0 }}>
              <NavDrawerItem labelAr="رابط" state={state} type="link"   level={2} rtl full icon={false} badge={state !== 'Disabled'} badgeCount="+99" />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ── On-Color State Matrix ───────────────────────────── */

export const DrawerItemStatesOnColor = {
  name: 'Drawer Item States — On-Color',
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        story:
          'On-color (dark sidebar) state matrix. Text `#f9fafb`, badges use `#1f2a37` background with no border. LTR only.',
      },
    },
  },
  render: () => (
    <div style={{ padding: 32, background: '#111827', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ width: 80, flexShrink: 0 }} />
        <div style={{ width: 224, flexShrink: 0, fontSize: 11, fontWeight: 700, color: '#9da4ae', letterSpacing: '0.05em', textTransform: 'uppercase' }}>L1 — Link</div>
        <div style={{ width: 224, flexShrink: 0, fontSize: 11, fontWeight: 700, color: '#9da4ae', letterSpacing: '0.05em', textTransform: 'uppercase' }}>L1 — Parent</div>
        <div style={{ width: 224, flexShrink: 0, fontSize: 11, fontWeight: 700, color: '#9da4ae', letterSpacing: '0.05em', textTransform: 'uppercase' }}>L2 — Link</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {STATES.map((state) => (
          <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ ...stateLabel(state), color: '#6b7280' }}>{state}</span>
            <div style={{ width: 224, flexShrink: 0 }}>
              <NavDrawerItem label="Link" state={state} type="link"   level={1} rtl={false} full icon onColor badge={state !== 'Disabled'} badgeCount="+99" />
            </div>
            <div style={{ width: 224, flexShrink: 0 }}>
              <NavDrawerItem label="Link" state={state} type="parent" level={1} rtl={false} full icon onColor />
            </div>
            <div style={{ width: 224, flexShrink: 0 }}>
              <NavDrawerItem label="Link" state={state} type="link"   level={2} rtl={false} full icon={false} onColor badge={state !== 'Disabled'} badgeCount="+99" />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ── Icon-only State Matrix ──────────────────────────── */

export const IconOnlyStates = {
  name: 'Icon-Only States',
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        story:
          'Icon-only (`full=false`) state matrix. All states shown for both light (off-color) and dark (on-color) variants. Each cell is a 48×32 button with only the house icon.',
      },
    },
  },
  render: () => (
    <div style={{ padding: 32, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 16 }}>
        <div style={{ width: 80, flexShrink: 0 }} />
        <div style={{ width: 48, flexShrink: 0, fontSize: 11, fontWeight: 700, color: '#233a61', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Light</div>
        <div style={{ width: 48, flexShrink: 0, fontSize: 11, fontWeight: 700, color: '#233a61', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Dark</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {STATES.map((state) => (
          <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={stateLabel(state)}>{state}</span>
            <div style={{ width: 48, flexShrink: 0 }}>
              <NavDrawerItem label="Dashboard" state={state} full={false} />
            </div>
            <div style={{ width: 48, flexShrink: 0, background: '#111827', borderRadius: 4 }}>
              <NavDrawerItem label="Dashboard" state={state} full={false} onColor />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
