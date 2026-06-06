import { NavDrawerPanel } from './NavDrawer';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=5005-11026';

/* ── Sample panel items ─────────────────────────────── */

const PANEL_ITEMS = [
  { label: 'Dashboard',    labelAr: 'لوحة التحكم',  type: 'link',   level: 1, state: 'Selected', icon: true,  badge: false },
  { label: 'Orders',       labelAr: 'الطلبات',       type: 'link',   level: 1, state: 'Default',  icon: true,  badge: true,  badgeCount: '+12' },
  { label: 'Products',     labelAr: 'المنتجات',      type: 'parent', level: 1, state: 'Default',  icon: true,  badge: false, expanded: true },
  { label: 'All Products', labelAr: 'كل المنتجات',   type: 'link',   level: 2, state: 'Default',  icon: false, badge: false },
  { label: 'Categories',   labelAr: 'التصنيفات',     type: 'link',   level: 2, state: 'Default',  icon: false, badge: false, externalLink: true },
  { divider: true },
  { label: 'Analytics',    labelAr: 'التحليلات',     type: 'link',   level: 1, state: 'Default',  icon: true,  badge: false },
  { label: 'Reports',      labelAr: 'التقارير',      type: 'link',   level: 1, state: 'Default',  icon: true,  badge: true,  badgeCount: '+3' },
  { divider: true },
  { label: 'Settings',     labelAr: 'الإعدادات',     type: 'link',   level: 1, state: 'Default',  icon: true,  badge: false },
  { label: 'Help',         labelAr: 'المساعدة',      type: 'link',   level: 1, state: 'Disabled', icon: true,  badge: false },
];

/* ── Default export ──────────────────────────────────── */

export default {
  title: 'UI Shells/Nav Drawer/Nav Panel',
  component: NavDrawerPanel,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    rtl: {
      control: 'boolean',
      description: 'Right-to-left layout — mirrors indicator side, flex direction, and logo/button order',
      table: { defaultValue: { summary: 'false' } },
    },
    onColor: {
      control: 'boolean',
      description: 'Dark panel (`#102a56` bg, `#3c5073` header)',
      table: { defaultValue: { summary: 'false' } },
    },
    full: {
      control: 'boolean',
      description: 'Full 256px panel vs 64px icon-only collapsed sidebar',
      table: { defaultValue: { summary: 'true' } },
    },
    showHeader: {
      control: 'boolean',
      description: 'Show the header with logo mark and sidebar-toggle button',
      table: { defaultValue: { summary: 'true' } },
    },
    border: {
      control: 'select',
      options: ['none', 'right', 'left'],
      description: 'Add a 1px border on the right (LTR) or left (RTL) edge',
      table: { defaultValue: { summary: '"none"' } },
    },
    overlay: {
      control: 'boolean',
      description: 'Apply `box-shadow` + `backdrop-filter: blur(12px)` for an overlay/floating panel',
      table: { defaultValue: { summary: 'false' } },
    },
    items: { table: { disable: true } },
  },
  args: {
    rtl:        false,
    onColor:    false,
    full:       true,
    showHeader: true,
    overlay:    false,
    border:     'none',
    items:      PANEL_ITEMS,
  },
};

/* ── Playground ──────────────────────────────────────── */

export const Playground = {};

/* ── Full Panel — Dark LTR ───────────────────────────── */

export const FullPanelDarkLTR = {
  name: 'Full Panel — Dark LTR',
  parameters: {
    docs: {
      description: {
        story:
          'Dark sidebar panel (`onColor=true`). Panel bg `#102a56`, header bg `#3c5073`. All text `#f9fafb`. Dividers use `rgba(255,255,255,0.12)`. Badge bg `#1f2a37` with no border.',
      },
    },
  },
  args: { rtl: false, onColor: true, full: true, showHeader: true, border: 'none', overlay: false, items: PANEL_ITEMS },
};

/* ── Full Panel — White LTR ──────────────────────────── */

export const FullPanelWhiteLTR = {
  name: 'Full Panel — White LTR',
  parameters: {
    docs: {
      description: {
        story:
          'Light sidebar panel, LTR. White bg and header. Right border `#d2d6db` marks the edge of the panel.',
      },
    },
  },
  args: { rtl: false, onColor: false, full: true, showHeader: true, border: 'right', overlay: false, items: PANEL_ITEMS },
};

/* ── Full Panel — White RTL ──────────────────────────── */

export const FullPanelWhiteRTL = {
  name: 'Full Panel — White RTL',
  parameters: {
    docs: {
      description: {
        story:
          'Light sidebar panel, RTL. Logo on the right, toggle button on the left, indicator on the right edge of items. Left border applied.',
      },
    },
  },
  args: { rtl: true, onColor: false, full: true, showHeader: true, border: 'left', overlay: false, items: PANEL_ITEMS },
};

/* ── Full Panel — Dark RTL ───────────────────────────── */

export const FullPanelDarkRTL = {
  name: 'Full Panel — Dark RTL',
  parameters: {
    docs: {
      description: {
        story: 'Dark panel, RTL. Combines `onColor=true` with `rtl=true`.',
      },
    },
  },
  args: { rtl: true, onColor: true, full: true, showHeader: true, border: 'none', overlay: false, items: PANEL_ITEMS },
};

/* ── Full Panel — Overlay ────────────────────────────── */

export const FullPanelOverlay = {
  name: 'Full Panel — White Overlay',
  parameters: {
    docs: {
      description: {
        story:
          'Floating overlay panel. `overlay=true` applies `box-shadow: 4px 16px 24px 0px rgba(0,0,0,0.1)` and `backdrop-filter: blur(12px)`. Use when the panel overlaps page content.',
      },
    },
  },
  args: { rtl: false, onColor: false, full: true, showHeader: true, border: 'right', overlay: true, items: PANEL_ITEMS },
};

/* ── Full Panel — Icon-Only (Collapsed) ──────────────── */

export const FullPanelIconOnly = {
  name: 'Full Panel — Icon-Only (Collapsed)',
  parameters: {
    docs: {
      description: {
        story:
          '`full=false` — collapsed sidebar 64px wide. Header shows only the sidebar-toggle button. Items render as 48×32 icon-only buttons. Divider items are hidden in collapsed mode.',
      },
    },
  },
  args: { rtl: false, onColor: false, full: false, showHeader: true, border: 'right', overlay: false, items: PANEL_ITEMS },
};
