import React from 'react';
import { Breadcrumb } from './Breadcrumb';

// ─── Sample item sets ──────────────────────────────────────────────────────────
const L = { label: 'Link', href: '#' };
const C = { label: 'Link' }; // current (no href)

const AR_L = { label: 'رابط', href: '#' };
const AR_C = { label: 'رابط' };

const ROW_GAP = 20;

function Row({ label, ltr, rtl }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32, marginBottom: ROW_GAP }}>
      <div>{ltr}</div>
      <div>{rtl}</div>
    </div>
  );
}

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'padded' },
  argTypes: {
    dir:            { control: 'radio', options: ['ltr', 'rtl'] },
    withIcon:       { control: 'boolean' },
    withBackground: { control: 'boolean' },
    withBorder:     { control: 'boolean' },
    maxVisible:     { control: { type: 'number', min: 2, max: 10 } },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 1. FIGMA CANVAS — exact replica of node 4113:3779
//    All levels · All modifiers · LTR + RTL
// ═══════════════════════════════════════════════════════════════════════════════
export const FigmaCanvas = {
  name: 'Figma Canvas — All Variants',
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{ background: '#ffffff', display: 'inline-flex', flexDirection: 'column', padding: 24, minWidth: 640 }}>

      {/* ── Levels (no modifiers) ────────────────── */}
      <Row
        ltr={<Breadcrumb items={[L, C]} dir="ltr" />}
        rtl={<Breadcrumb items={[AR_L, AR_C]} dir="rtl" />}
      />
      <Row
        ltr={<Breadcrumb items={[L, L, C]} dir="ltr" />}
        rtl={<Breadcrumb items={[AR_L, AR_L, AR_C]} dir="rtl" />}
      />
      <Row
        ltr={<Breadcrumb items={[L, L, L, C]} dir="ltr" />}
        rtl={<Breadcrumb items={[AR_L, AR_L, AR_L, AR_C]} dir="rtl" />}
      />
      <Row
        ltr={<Breadcrumb items={[L, L, L, L, C]} dir="ltr" />}
        rtl={<Breadcrumb items={[AR_L, AR_L, AR_L, AR_L, AR_C]} dir="rtl" />}
      />

      {/* ── >5 levels — overflow ─────────────────── */}
      <Row
        ltr={<Breadcrumb items={[L, L, L, L, L, C]} dir="ltr" />}
        rtl={<Breadcrumb items={[AR_L, AR_L, AR_L, AR_L, AR_L, AR_C]} dir="rtl" />}
      />

      {/* ── withIcon ─────────────────────────────── */}
      <Row
        ltr={<Breadcrumb items={[L, L, L, L, L, C]} withIcon dir="ltr" />}
        rtl={<Breadcrumb items={[AR_L, AR_L, AR_L, AR_L, AR_L, AR_C]} withIcon dir="rtl" />}
      />

      {/* ── withIcon + withBorder ─────────────────── */}
      <Row
        ltr={<Breadcrumb items={[L, L, L, L, L, C]} withIcon withBorder dir="ltr" />}
        rtl={<Breadcrumb items={[AR_L, AR_L, AR_L, AR_L, AR_L, AR_C]} withIcon withBorder dir="rtl" />}
      />

      {/* ── withIcon + withBackground ─────────────── */}
      <Row
        ltr={<Breadcrumb items={[L, L, L, L, L, C]} withIcon withBackground dir="ltr" />}
        rtl={<Breadcrumb items={[AR_L, AR_L, AR_L, AR_L, AR_L, AR_C]} withIcon withBackground dir="rtl" />}
      />

      <div style={{ height: 12 }} />

      {/* ── 2-level base ─────────────────────────── */}
      <Row
        ltr={<Breadcrumb items={[L, C]} dir="ltr" />}
        rtl={<Breadcrumb items={[AR_L, AR_C]} dir="rtl" />}
      />

      {/* ── 2-level + withBackground ─────────────── */}
      <Row
        ltr={<Breadcrumb items={[L, C]} withBackground dir="ltr" />}
        rtl={<Breadcrumb items={[AR_L, AR_C]} withBackground dir="rtl" />}
      />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. INTERACTIVE — single breadcrumb with all controls
// ═══════════════════════════════════════════════════════════════════════════════
export const Default = {
  name: 'Interactive (Controls)',
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Section', href: '#' },
      { label: 'Current Page' },
    ],
    withIcon: false,
    withBackground: false,
    withBorder: false,
    maxVisible: 5,
    dir: 'ltr',
  },
  render: args => <Breadcrumb {...args} />,
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. ALL LEVELS — 2 through >5 stacked
// ═══════════════════════════════════════════════════════════════════════════════
export const AllLevels = {
  name: 'All Levels',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Breadcrumb items={[L, C]} />
      <Breadcrumb items={[L, L, C]} />
      <Breadcrumb items={[L, L, L, C]} />
      <Breadcrumb items={[L, L, L, L, C]} />
      <Breadcrumb items={[L, L, L, L, L, C]} />
      <Breadcrumb items={[L, L, L, L, L, L, C]} />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. WITH ICON — home icon at root
// ═══════════════════════════════════════════════════════════════════════════════
export const WithIcon = {
  name: 'With Icon',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Breadcrumb items={[L, L, L, L, L, C]} withIcon dir="ltr" />
      <Breadcrumb items={[AR_L, AR_L, AR_L, AR_L, AR_L, AR_C]} withIcon dir="rtl" />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. BACKGROUND + BORDER modifiers
// ═══════════════════════════════════════════════════════════════════════════════
export const WithBackground = {
  name: 'With Background',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Breadcrumb items={[L, L, C]} withBackground dir="ltr" />
      <Breadcrumb items={[L, L, L, L, L, C]} withIcon withBackground dir="ltr" />
      <Breadcrumb items={[AR_L, AR_L, C]} withBackground dir="rtl" />
    </div>
  ),
};

export const WithBorder = {
  name: 'With Border',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Breadcrumb items={[L, L, C]} withBorder dir="ltr" />
      <Breadcrumb items={[L, L, L, L, L, C]} withIcon withBorder dir="ltr" />
      <Breadcrumb items={[AR_L, AR_L, C]} withBorder dir="rtl" />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. RTL SUPPORT
// ═══════════════════════════════════════════════════════════════════════════════
export const RTLSupport = {
  name: 'RTL Support',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Breadcrumb items={[{ label: 'الرئيسية', href: '#' }, { label: 'القسم', href: '#' }, { label: 'الصفحة الحالية' }]} dir="rtl" />
      <Breadcrumb items={[{ label: 'الرئيسية', href: '#' }, { label: 'القسم', href: '#' }, { label: 'الصفحة الحالية' }]} withBackground dir="rtl" />
      <Breadcrumb items={[{ label: 'الرئيسية', href: '#' }, { label: 'المجموعة', href: '#' }, { label: 'القسم', href: '#' }, { label: 'العنصر', href: '#' }, { label: 'الصفحة الحالية', href: '#' }, { label: 'المستوى السادس' }]} withIcon dir="rtl" />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// 7. OVERFLOW — demonstrates the "…" collapse behaviour
// ═══════════════════════════════════════════════════════════════════════════════
export const Overflow = {
  name: 'Overflow (>5 items)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Breadcrumb
        items={[
          { label: 'Home', href: '#' },
          { label: 'Level 2', href: '#' },
          { label: 'Level 3', href: '#' },
          { label: 'Level 4', href: '#' },
          { label: 'Level 5', href: '#' },
          { label: 'Level 6', href: '#' },
          { label: 'Current Page' },
        ]}
      />
      <Breadcrumb
        items={[
          { label: 'Home', href: '#' },
          { label: 'Level 2', href: '#' },
          { label: 'Level 3', href: '#' },
          { label: 'Level 4', href: '#' },
          { label: 'Level 5', href: '#' },
          { label: 'Level 6', href: '#' },
          { label: 'Current Page' },
        ]}
        withIcon
        withBackground
      />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// 8. MIDDLE-OVERFLOW-CLOSED — "…" visible; middle items are hidden.
//    Clicking "…" opens the dropdown menu (Middle-overflow menu state).
// ═══════════════════════════════════════════════════════════════════════════════
const DEEP_ITEMS = [
  { label: 'Home',    href: '#' },
  { label: 'Level 2', href: '#' },
  { label: 'Level 3', href: '#' },
  { label: 'Level 4', href: '#' },
  { label: 'Level 5', href: '#' },
  { label: 'Level 6', href: '#' },
  { label: 'Current Page' },
];
const DEEP_AR = [
  { label: 'الرئيسية', href: '#' },
  { label: 'المستوى الثاني', href: '#' },
  { label: 'المستوى الثالث', href: '#' },
  { label: 'المستوى الرابع', href: '#' },
  { label: 'المستوى الخامس', href: '#' },
  { label: 'المستوى السادس', href: '#' },
  { label: 'الصفحة الحالية' },
];

export const MiddleOverflowClosed = {
  name: 'Middle-overflow — Closed',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* LTR */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>LTR — plain</div>
        <Breadcrumb items={DEEP_ITEMS} defaultExpanded={false} dir="ltr" />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>LTR — with icon</div>
        <Breadcrumb items={DEEP_ITEMS} withIcon defaultExpanded={false} dir="ltr" />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>LTR — with background</div>
        <Breadcrumb items={DEEP_ITEMS} withIcon withBackground defaultExpanded={false} dir="ltr" />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>LTR — with border</div>
        <Breadcrumb items={DEEP_ITEMS} withIcon withBorder defaultExpanded={false} dir="ltr" />
      </div>
      {/* RTL */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>RTL — plain</div>
        <Breadcrumb items={DEEP_AR} defaultExpanded={false} dir="rtl" />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>RTL — with icon</div>
        <Breadcrumb items={DEEP_AR} withIcon defaultExpanded={false} dir="rtl" />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>RTL — with background</div>
        <Breadcrumb items={DEEP_AR} withIcon withBackground defaultExpanded={false} dir="rtl" />
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// 9. MIDDLE-OVERFLOW MENU — dropdown open, showing hidden items + "Show all"
//    Rendered by clicking "…" in the closed state.
//    Click a menu item to navigate; click "Show all" to expand inline.
// ═══════════════════════════════════════════════════════════════════════════════

function BreadcrumbWithOpenMenu(props) {
  // Renders a breadcrumb that starts with its overflow menu already open,
  // by dispatching a click on the "…" button after mount.
  const ref = React.useRef(null);
  React.useEffect(() => {
    const btn = ref.current?.querySelector('[aria-haspopup="menu"]');
    if (btn) btn.click();
  }, []);
  return <div ref={ref}><Breadcrumb {...props} /></div>;
}

export const MiddleOverflowMenu = {
  name: 'Middle-overflow — Menu',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>LTR — plain</div>
        <BreadcrumbWithOpenMenu items={DEEP_ITEMS} dir="ltr" />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>LTR — with icon + background</div>
        <BreadcrumbWithOpenMenu items={DEEP_ITEMS} withIcon withBackground dir="ltr" />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>RTL — plain</div>
        <BreadcrumbWithOpenMenu items={DEEP_AR} dir="rtl" />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>RTL — with icon + background</div>
        <BreadcrumbWithOpenMenu items={DEEP_AR} withIcon withBackground dir="rtl" />
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// 10. MIDDLE-OVERFLOW OPEN — all items expanded inline; "…" resolved.
//     Reached via "Show all" in the dropdown menu.
//     A "←" collapse button re-closes the overflow.
// ═══════════════════════════════════════════════════════════════════════════════
export const MiddleOverflow = {
  name: 'Middle-overflow — Open',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* LTR */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>LTR — plain (all items visible)</div>
        <Breadcrumb items={DEEP_ITEMS} defaultExpanded dir="ltr" />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>LTR — with icon</div>
        <Breadcrumb items={DEEP_ITEMS} withIcon defaultExpanded dir="ltr" />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>LTR — with background</div>
        <Breadcrumb items={DEEP_ITEMS} withIcon withBackground defaultExpanded dir="ltr" />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>LTR — with border</div>
        <Breadcrumb items={DEEP_ITEMS} withIcon withBorder defaultExpanded dir="ltr" />
      </div>
      {/* RTL */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>RTL — plain</div>
        <Breadcrumb items={DEEP_AR} defaultExpanded dir="rtl" />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>RTL — with icon</div>
        <Breadcrumb items={DEEP_AR} withIcon defaultExpanded dir="rtl" />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>RTL — with background</div>
        <Breadcrumb items={DEEP_AR} withIcon withBackground defaultExpanded dir="rtl" />
      </div>
    </div>
  ),
};
