import { NavHeader, NavMenuItem, NavAction } from './NavHeader';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=5005-5361';

const FIGMA_MENU_ITEM_STATES_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=5005-4922';

const FIGMA_ACTION_STATES_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=5005-5055';

/* ── Sample data ─────────────────────────────────────────── */

const MENU_ITEMS = [
  { label: 'Home',      labelAr: 'الرئيسية',  selected: false },
  { label: 'Products',  labelAr: 'المنتجات',  selected: false },
  { label: 'Solutions', labelAr: 'الحلول',    selected: true  },
  { label: 'Resources', labelAr: 'الموارد',   selected: false },
  { label: 'About',     labelAr: 'حول',       selected: false },
];

const ACTIONS = [
  { label: 'Sign In',  labelAr: 'تسجيل دخول',   selected: false },
  { label: 'Settings', labelAr: 'الإعدادات',     selected: false },
  { label: 'Profile',  labelAr: 'الملف الشخصي',  selected: false },
];

/* ── Default export ──────────────────────────────────────── */

export default {
  title: 'UI Shells/Nav Header/Nav Items',
  component: NavHeader,
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    rtl: {
      control: 'boolean',
      description: 'Right-to-left layout — physical CSS mirroring, no dir="rtl" wrapper',
      table: { defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Expand bar to 1728 px max-width (only applies to >960 breakpoint)',
      table: { defaultValue: { summary: 'false' } },
    },
    breakpoint: {
      control: 'select',
      options: ['>960', '600>960', '<600'],
      description: 'Responsive breakpoint variant — matches Figma prop of the same name',
      table: { defaultValue: { summary: "'>960'" } },
    },
  },
  args: {
    rtl:        false,
    fullWidth:  false,
    breakpoint: '>960',
    menuItems:  MENU_ITEMS,
    actions:    ACTIONS,
  },
};

/* ── Playground ──────────────────────────────────────────── */

export const Playground = {};

/* ── LTR — Desktop ───────────────────────────────────────── */

export const DefaultLTR = {
  name: 'Default — LTR Desktop',
  parameters: {
    docs: {
      description: {
        story: 'Full navigation bar at desktop breakpoint (`>960` px). Logo (Figma sparkle mark + text image) on the left, followed by menu items with `arrow-down-01` chevrons (no leading icon in the bar). Actions on the right with `login-square-01` icon + label. Fourth menu item is selected (bg `#f9fafb`, SemiBold, blue `#1849a9` bottom indicator). Third action is selected.',
      },
    },
  },
  args: { rtl: false, fullWidth: false, breakpoint: '>960', menuItems: MENU_ITEMS, actions: ACTIONS },
};

/* ── RTL — Desktop ───────────────────────────────────────── */

export const DefaultRTL = {
  name: 'Default — RTL Desktop',
  parameters: {
    docs: {
      description: {
        story: 'RTL desktop layout — actions appear first in DOM (left side), logo and menu items are on the right. Menu item chevrons appear before the text (`flex-direction: row-reverse`). Action icons appear after the text.',
      },
    },
  },
  args: { rtl: true, fullWidth: false, breakpoint: '>960', menuItems: MENU_ITEMS, actions: ACTIONS },
};

/* ── Full Width ──────────────────────────────────────────── */

export const FullWidth = {
  name: 'Full Width Bar',
  parameters: {
    docs: {
      description: {
        story: '`fullWidth=true` — bar inner container stretches to 1728 px max-width instead of the default 1320 px. Only relevant for the `>960` breakpoint.',
      },
    },
  },
  args: { rtl: false, fullWidth: true, breakpoint: '>960', menuItems: MENU_ITEMS, actions: ACTIONS },
};

/* ── Tablet LTR ──────────────────────────────────────────── */

export const TabletLTR = {
  name: 'Tablet — LTR (600>960)',
  parameters: {
    docs: {
      description: {
        story: 'Tablet breakpoint (600–960 px), LTR. Three-column layout: **Nav Menu** button (40×40, `arrow-down-01`) on the left, **Logo** centered, and on the right an icon-only action + **Utility Menu** button (40×40, `arrow-down-01`). Max-width 960 px, padding 32 px.',
      },
    },
  },
  args: { rtl: false, fullWidth: false, breakpoint: '600>960', menuItems: MENU_ITEMS, actions: ACTIONS },
};

/* ── Tablet RTL ──────────────────────────────────────────── */

export const TabletRTL = {
  name: 'Tablet — RTL (600>960)',
  parameters: {
    docs: {
      description: {
        story: 'Tablet breakpoint RTL. **Utility Menu** + icon-only action on the left, **Logo** centered, **Nav Menu** button on the right.',
      },
    },
  },
  args: { rtl: true, fullWidth: false, breakpoint: '600>960', menuItems: MENU_ITEMS, actions: ACTIONS },
};

/* ── Mobile LTR ──────────────────────────────────────────── */

export const MobileLTR = {
  name: 'Mobile — LTR (<600)',
  parameters: {
    docs: {
      description: {
        story: 'Mobile breakpoint (< 600 px), LTR. Three-column layout: **Nav Menu** button with `more-horizontal` (3 dots) on the left, **Logo** centered (`shrink-0`), **Utility Menu** button with `menu-01` (hamburger, 3 lines) on the right. Max-width 600 px, padding 16 px.',
      },
    },
  },
  args: { rtl: false, fullWidth: false, breakpoint: '<600', menuItems: MENU_ITEMS, actions: ACTIONS },
};

/* ── Mobile RTL ──────────────────────────────────────────── */

export const MobileRTL = {
  name: 'Mobile — RTL (<600)',
  parameters: {
    docs: {
      description: {
        story: 'Mobile breakpoint RTL. **Utility Menu** (hamburger) on the left, **Logo** centered, **Nav Menu** (3 dots) on the right.',
      },
    },
  },
  args: { rtl: true, fullWidth: false, breakpoint: '<600', menuItems: MENU_ITEMS, actions: ACTIONS },
};

/* ── All Breakpoints side-by-side ────────────────────────── */

export const AllBreakpoints = {
  name: 'All Breakpoints — LTR',
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        story: 'All three breakpoints stacked for visual comparison. Desktop (`>960`), Tablet (`600>960`), Mobile (`<600`), all LTR.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {['>960', '600>960', '<600'].map((bp) => (
        <div key={bp}>
          <p style={{ margin: '0 0 0 32px', padding: '12px 0 4px', fontSize: 11, color: '#6c7c96', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {bp}
          </p>
          <NavHeader breakpoint={bp} rtl={false} menuItems={MENU_ITEMS} actions={ACTIONS} />
        </div>
      ))}
    </div>
  ),
};

/* ── Figma Reference — LTR + RTL ─────────────────────────── */

export const FigmaReference = {
  name: 'Figma Reference — LTR + RTL',
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        story: 'Side-by-side LTR and RTL renders for direct visual comparison against Figma node `5005:5361`.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div>
        <p style={{ margin: '0 0 4px 32px', padding: '12px 0 4px', fontSize: 11, color: '#6c7c96', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          LTR — Default Desktop
        </p>
        <NavHeader rtl={false} menuItems={MENU_ITEMS} actions={ACTIONS} />
      </div>
      <div>
        <p style={{ margin: '12px 32px 4px 0', fontSize: 11, color: '#6c7c96', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'right' }}>
          RTL — Default Desktop
        </p>
        <NavHeader rtl={true} menuItems={MENU_ITEMS} actions={ACTIONS} />
      </div>
    </div>
  ),
};

/* ── Header Menu Item States — LTR ──────────────────────── */
/* Figma reference: node 5005:4922                           */

const stateLabel = (text, width = 120) => ({
  fontSize: 11,
  color: '#6c7c96',
  fontWeight: 600,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  width,
  flexShrink: 0,
  fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
});

export const MenuItemStatesLTR = {
  name: 'Menu Item States — LTR',
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_MENU_ITEM_STATES_URL },
    docs: {
      description: {
        story: 'All Header Menu Item states from Figma node 5005:4922 — Default / Hovered / Pressed / Focused / Disabled × Selected / Unselected × LTR. Each item shows: leading `login-square-01` icon + label + `arrow-down-01` chevron. Focused+Selected: blue `#1849a9` bg, white text+icons, white inner border.',
      },
    },
  },
  render: () => (
    <div style={{ padding: 32, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", isolation: 'isolate' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <div style={{ width: 120, flexShrink: 0 }} />
        <div style={{ width: 160, flexShrink: 0, fontSize: 11, fontWeight: 700, color: '#233a61', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Unselected</div>
        <div style={{ width: 160, flexShrink: 0, fontSize: 11, fontWeight: 700, color: '#233a61', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Selected</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {['Default', 'Hovered', 'Pressed', 'Focused', 'Disabled'].map((state) => (
          <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 16, isolation: 'isolate' }}>
            <span style={stateLabel(state)}>{state}</span>
            <div style={{ width: 160, flexShrink: 0, overflow: 'hidden' }}>
              <NavMenuItem label="Link" state={state} selected={false} rtl={false} icon={true} />
            </div>
            <div style={{ width: 160, flexShrink: 0, overflow: 'hidden' }}>
              <NavMenuItem label="Link" state={state} selected={true}  rtl={false} icon={true} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ── Header Menu Item States — RTL ──────────────────────── */

export const MenuItemStatesRTL = {
  name: 'Menu Item States — RTL',
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_MENU_ITEM_STATES_URL },
    docs: {
      description: {
        story: 'Same states as LTR but mirrored for RTL Arabic — chevron appears before the text (on the left), matching Figma node 5005:4922.',
      },
    },
  },
  render: () => (
    <div style={{ padding: 32, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", isolation: 'isolate' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <div style={{ width: 120, flexShrink: 0 }} />
        <div style={{ width: 160, flexShrink: 0, fontSize: 11, fontWeight: 700, color: '#233a61', letterSpacing: '0.05em', textTransform: 'uppercase' }}>غير محدد</div>
        <div style={{ width: 160, flexShrink: 0, fontSize: 11, fontWeight: 700, color: '#233a61', letterSpacing: '0.05em', textTransform: 'uppercase' }}>محدد</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {['Default', 'Hovered', 'Pressed', 'Focused', 'Disabled'].map((state) => (
          <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 16, isolation: 'isolate' }}>
            <span style={stateLabel(state)}>{state}</span>
            <div style={{ width: 160, flexShrink: 0, overflow: 'hidden' }}>
              <NavMenuItem labelAr="تبويب" state={state} selected={false} rtl={true} icon={true} />
            </div>
            <div style={{ width: 160, flexShrink: 0, overflow: 'hidden' }}>
              <NavMenuItem labelAr="تبويب" state={state} selected={true}  rtl={true} icon={true} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ── Header Action States — LTR ─────────────────────────── */

export const ActionStatesLTR = {
  name: 'Action States — LTR',
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_ACTION_STATES_URL },
    docs: {
      description: {
        story: 'Header Action button states from Figma node 5005:5055 — Default / Hovered / Pressed / Focused / Disabled × Selected / Unselected × LTR. Action icon: `login-square-01`. Focused+Selected: `#e5e7eb` bg + `#1849a9` blue border + white inner overlay (dark text/icon stays unchanged — different from menu item focused+selected).',
      },
    },
  },
  render: () => (
    <div style={{ padding: 32, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", isolation: 'isolate' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <div style={{ width: 120, flexShrink: 0 }} />
        <div style={{ width: 160, flexShrink: 0, fontSize: 11, fontWeight: 700, color: '#233a61', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Unselected</div>
        <div style={{ width: 160, flexShrink: 0, fontSize: 11, fontWeight: 700, color: '#233a61', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Selected</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {['Default', 'Hovered', 'Pressed', 'Focused', 'Disabled'].map((state) => (
          <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 16, isolation: 'isolate' }}>
            <span style={stateLabel(state)}>{state}</span>
            <div style={{ width: 160, flexShrink: 0, overflow: 'hidden' }}>
              <NavAction label="Action" state={state} selected={false} rtl={false} />
            </div>
            <div style={{ width: 160, flexShrink: 0, overflow: 'hidden' }}>
              <NavAction label="Action" state={state} selected={true}  rtl={false} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ── Header Action States — RTL ─────────────────────────── */

export const ActionStatesRTL = {
  name: 'Action States — RTL',
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_ACTION_STATES_URL },
    docs: {
      description: {
        story: 'Action states RTL — text appears before icon (right-to-left order). Matching Figma node 5005:5055.',
      },
    },
  },
  render: () => (
    <div style={{ padding: 32, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", isolation: 'isolate' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <div style={{ width: 120, flexShrink: 0 }} />
        <div style={{ width: 160, flexShrink: 0, fontSize: 11, fontWeight: 700, color: '#233a61', letterSpacing: '0.05em', textTransform: 'uppercase' }}>غير محدد</div>
        <div style={{ width: 160, flexShrink: 0, fontSize: 11, fontWeight: 700, color: '#233a61', letterSpacing: '0.05em', textTransform: 'uppercase' }}>محدد</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {['Default', 'Hovered', 'Pressed', 'Focused', 'Disabled'].map((state) => (
          <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 16, isolation: 'isolate' }}>
            <span style={stateLabel(state)}>{state}</span>
            <div style={{ width: 160, flexShrink: 0, overflow: 'hidden' }}>
              <NavAction labelAr="إجراء" state={state} selected={false} rtl={true} />
            </div>
            <div style={{ width: 160, flexShrink: 0, overflow: 'hidden' }}>
              <NavAction labelAr="إجراء" state={state} selected={true}  rtl={true} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
