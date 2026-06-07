import { SubMenu, CheckmarkSquareIcon } from './SubMenu';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=5005-5487';

const FIGMA_STATES_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=5005-4793';

/* ── Column datasets ─────────────────────────────────────── */

const COLUMNS_TEXT = [
  {
    label: 'Group Label', labelAr: 'تسمية المجموعة',
    items: [
      { text: 'Menu Item Label', textAr: 'عنصر القائمة' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة' },
    ],
  },
  {
    label: 'Group Label', labelAr: 'تسمية المجموعة',
    items: [
      { text: 'Menu Item Label', textAr: 'عنصر القائمة' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة' },
    ],
  },
  {
    label: 'Group Label', labelAr: 'تسمية المجموعة',
    items: [
      { text: 'Menu Item Label', textAr: 'عنصر القائمة' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة' },
    ],
  },
  {
    label: 'Group Label', labelAr: 'تسمية المجموعة',
    items: [
      { text: 'Menu Item Label', textAr: 'عنصر القائمة' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة' },
    ],
  },
];

const COLUMNS_BOXED = [
  {
    label: 'Group Label', labelAr: 'تسمية المجموعة',
    items: [
      { text: 'Menu Item Label', textAr: 'عنصر القائمة', helperText: 'Menu item helper text', helperTextAr: 'نص مساعد للعنصر' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة', helperText: 'Menu item helper text', helperTextAr: 'نص مساعد للعنصر' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة', helperText: 'Menu item helper text', helperTextAr: 'نص مساعد للعنصر' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة', helperText: 'Menu item helper text', helperTextAr: 'نص مساعد للعنصر' },
    ],
  },
  {
    label: 'Group Label', labelAr: 'تسمية المجموعة',
    items: [
      { text: 'Menu Item Label', textAr: 'عنصر القائمة', helperText: 'Menu item helper text', helperTextAr: 'نص مساعد للعنصر' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة', helperText: 'Menu item helper text', helperTextAr: 'نص مساعد للعنصر' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة', helperText: 'Menu item helper text', helperTextAr: 'نص مساعد للعنصر' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة', helperText: 'Menu item helper text', helperTextAr: 'نص مساعد للعنصر' },
    ],
  },
  {
    label: 'Group Label', labelAr: 'تسمية المجموعة',
    items: [
      { text: 'Menu Item Label', textAr: 'عنصر القائمة', helperText: 'Menu item helper text', helperTextAr: 'نص مساعد للعنصر' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة', helperText: 'Menu item helper text', helperTextAr: 'نص مساعد للعنصر' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة', helperText: 'Menu item helper text', helperTextAr: 'نص مساعد للعنصر' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة', helperText: 'Menu item helper text', helperTextAr: 'نص مساعد للعنصر' },
    ],
  },
  {
    label: 'Group Label', labelAr: 'تسمية المجموعة',
    items: [
      { text: 'Menu Item Label', textAr: 'عنصر القائمة', helperText: 'Menu item helper text', helperTextAr: 'نص مساعد للعنصر' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة', helperText: 'Menu item helper text', helperTextAr: 'نص مساعد للعنصر' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة', helperText: 'Menu item helper text', helperTextAr: 'نص مساعد للعنصر' },
      { text: 'Menu Item Label', textAr: 'عنصر القائمة', helperText: 'Menu item helper text', helperTextAr: 'نص مساعد للعنصر' },
    ],
  },
];

const COLUMNS_REAL = [
  {
    label: 'Design', labelAr: 'التصميم',
    items: [
      { text: 'Components',   textAr: 'المكوّنات',   helperText: 'Reusable UI building blocks',    helperTextAr: 'وحدات واجهة المستخدم القابلة لإعادة الاستخدام' },
      { text: 'Foundations',  textAr: 'الأسس',       helperText: 'Colors, typography and spacing', helperTextAr: 'الألوان والطباعة والتباعد' },
      { text: 'Iconography',  textAr: 'الأيقونات',   helperText: 'System icon library',            helperTextAr: 'مكتبة أيقونات النظام' },
    ],
  },
  {
    label: 'Development', labelAr: 'التطوير',
    items: [
      { text: 'Getting Started', textAr: 'البدء السريع',   helperText: 'Installation and setup guide', helperTextAr: 'دليل التثبيت والإعداد' },
      { text: 'Tokens',          textAr: 'رموز التصميم',  helperText: 'Design token reference',       helperTextAr: 'مرجع رموز التصميم' },
      { text: 'Changelog',       textAr: 'سجل التغييرات', helperText: 'Latest updates and releases',  helperTextAr: 'آخر التحديثات والإصدارات' },
    ],
  },
  {
    label: 'Resources', labelAr: 'الموارد',
    items: [
      { text: 'Figma Library', textAr: 'مكتبة فيغما',  helperText: 'Design assets and templates',   helperTextAr: 'أصول التصميم والقوالب' },
      { text: 'Storybook',     textAr: 'ستوريبوك',     helperText: 'Interactive component explorer', helperTextAr: 'مستكشف المكوّنات التفاعلي' },
      { text: 'Contributing',  textAr: 'المساهمة',      helperText: 'How to contribute to the DS',   helperTextAr: 'كيفية المساهمة في نظام التصميم' },
    ],
  },
];

/* ── Default export ──────────────────────────────────────── */

export default {
  title: 'UI Shells/Nav Header/Sub Menu',
  component: SubMenu,
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    background: {
      control: 'radio',
      options: ['Default', 'Dark green'],
      description: 'Panel background colour',
      table: { defaultValue: { summary: 'Default' } },
    },
    linkStyle: {
      control: 'radio',
      options: ['Text only', 'Simple icon', 'Boxed icon'],
      description: 'Icon style used for each menu item. Boxed icon also shows helper text.',
      table: { defaultValue: { summary: 'Text only' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Expand panel to 1440 px (true) or 1320 px (false)',
      table: { defaultValue: { summary: 'false' } },
    },
    rtl: {
      control: 'boolean',
      description: 'Right-to-left layout — physical CSS + DOM reorder, no dir="rtl" wrapper',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    background: 'Default',
    linkStyle:  'Text only',
    fullWidth:  false,
    rtl:        false,
    columns:    COLUMNS_TEXT,
  },
};

/* ── Playground ──────────────────────────────────────────── */

export const Playground = {};

/* ── Background variants ─────────────────────────────────── */

export const DefaultBackground = {
  name: 'Default Background — LTR',
  parameters: {
    docs: {
      description: {
        story: 'White panel (`Default`) with Text only links — the most compact variant, ideal for simple mega-menus.',
      },
    },
  },
  args: { background: 'Default', linkStyle: 'Text only', rtl: false, columns: COLUMNS_TEXT },
};

export const DarkGreenBackground = {
  name: 'Dark Green Background — LTR',
  parameters: {
    docs: {
      description: {
        story: 'Dark green (`#102a56`) background — all text and icon colours invert to `#f9fafb` to stay legible.',
      },
    },
  },
  args: { background: 'Dark green', linkStyle: 'Text only', rtl: false, columns: COLUMNS_TEXT },
};

/* ── Link style variants ─────────────────────────────────── */

export const TextOnly = {
  name: 'Link Style — Text Only',
  parameters: {
    docs: {
      description: {
        story: 'Items show only the label. No icon, no helper text. The most compact option for large link lists.',
      },
    },
  },
  args: { background: 'Default', linkStyle: 'Text only', columns: COLUMNS_TEXT },
};

export const SimpleIcon = {
  name: 'Link Style — Simple Icon',
  parameters: {
    docs: {
      description: {
        story: 'A 24×24 `checkmark-square-02` icon sits flush beside the label. Fill is `#000b36` on white, `#f9fafb` on dark green.',
      },
    },
  },
  args: { background: 'Default', linkStyle: 'Simple icon', columns: COLUMNS_TEXT },
};

export const SimpleIconDark = {
  name: 'Link Style — Simple Icon, Dark Green',
  parameters: {
    docs: {
      description: {
        story: 'Simple icon on dark green background — icon fill switches to `#f9fafb` (white).',
      },
    },
  },
  args: { background: 'Dark green', linkStyle: 'Simple icon', columns: COLUMNS_TEXT },
};

export const BoxedIcon = {
  name: 'Link Style — Boxed Icon',
  parameters: {
    docs: {
      description: {
        story: '24×24 icon inside a 48×48 rounded container (`#eff8ff` bg, 12px padding, 8px radius). Blue `#1849a9` fill. Boxed icon items also show helper text below the label.',
      },
    },
  },
  args: { background: 'Default', linkStyle: 'Boxed icon', columns: COLUMNS_BOXED },
};

export const BoxedIconDark = {
  name: 'Link Style — Boxed Icon, Dark Green',
  parameters: {
    docs: {
      description: {
        story: 'Boxed icon on dark green — container uses `rgba(255,255,255,0.1)`, icon fill is `#f9fafb`.',
      },
    },
  },
  args: { background: 'Dark green', linkStyle: 'Boxed icon', columns: COLUMNS_BOXED },
};

/* ── RTL variants ────────────────────────────────────────── */

export const DefaultRTL = {
  name: 'Default Background — RTL',
  parameters: {
    docs: {
      description: {
        story: 'RTL layout on white background. Columns flow right-to-left. Each item renders text block first in DOM (right side), icon second (left side). `justify-content: flex-end` on item container. No `dir="rtl"` on any container.',
      },
    },
  },
  args: { background: 'Default', linkStyle: 'Text only', rtl: true, columns: COLUMNS_TEXT },
};

export const DarkGreenRTL = {
  name: 'Dark Green Background — RTL',
  parameters: {
    docs: {
      description: {
        story: 'Arabic RTL combined with dark green background.',
      },
    },
  },
  args: { background: 'Dark green', linkStyle: 'Text only', rtl: true, columns: COLUMNS_TEXT },
};

export const SimpleIconRTL = {
  name: 'Link Style — Simple Icon, RTL',
  parameters: {
    docs: {
      description: {
        story: 'Simple icon RTL — text block is in DOM before the icon. Icon appears on the left side (trailing/end in RTL reading direction).',
      },
    },
  },
  args: { background: 'Default', linkStyle: 'Simple icon', rtl: true, columns: COLUMNS_TEXT },
};

export const BoxedIconRTL = {
  name: 'Link Style — Boxed Icon, RTL',
  parameters: {
    docs: {
      description: {
        story: 'Boxed icon RTL with Arabic helper text.',
      },
    },
  },
  args: { background: 'Default', linkStyle: 'Boxed icon', rtl: true, columns: COLUMNS_BOXED },
};

/* ── Full width ──────────────────────────────────────────── */

export const FullWidth = {
  name: 'Full Width Panel',
  parameters: {
    docs: {
      description: {
        story: '`fullWidth=true` — panel stretches to 1440 px instead of the default 1320 px.',
      },
    },
  },
  args: { background: 'Default', linkStyle: 'Text only', fullWidth: true, columns: COLUMNS_TEXT },
};

/* ── Real content ────────────────────────────────────────── */

export const RealContentTextOnly = {
  name: 'Real Content — Text Only, LTR',
  parameters: {
    docs: {
      description: {
        story: 'Design system site navigation — Design, Development, and Resources sections with real labels.',
      },
    },
  },
  args: { background: 'Default', linkStyle: 'Text only', rtl: false, columns: COLUMNS_REAL },
};

export const RealContentBoxed = {
  name: 'Real Content — Boxed Icon, LTR',
  parameters: {
    docs: {
      description: {
        story: 'Real content with Boxed icon style — each item shows a meaningful helper text alongside the label.',
      },
    },
  },
  args: { background: 'Default', linkStyle: 'Boxed icon', rtl: false, columns: COLUMNS_REAL },
};

export const RealContentRTL = {
  name: 'Real Content — Boxed Icon, RTL',
  parameters: {
    docs: {
      description: {
        story: 'Arabic RTL with real content in Boxed icon style.',
      },
    },
  },
  args: { background: 'Default', linkStyle: 'Boxed icon', rtl: true, columns: COLUMNS_REAL },
};

export const RealContentDark = {
  name: 'Real Content — Simple Icon, Dark Green',
  parameters: {
    docs: {
      description: {
        story: 'Real content on dark green background with Simple icon style.',
      },
    },
  },
  args: { background: 'Dark green', linkStyle: 'Simple icon', rtl: false, columns: COLUMNS_REAL },
};

/* ── Item States (shared helpers) ───────────────────────── */
/* Figma node 5005:4793: w-320px, px-16px, py-8px, r-8px   */

const STATES = [
  { key: 'Default',  label: 'Default',     labelAr: 'افتراضي',    bg: 'transparent',         border: 'none' },
  { key: 'Hovered',  label: 'Hovered',     labelAr: 'تمرير',      bg: '#f3f4f6',             border: 'none' },
  { key: 'Pressed',  label: 'Pressed',     labelAr: 'ضغط',        bg: '#e5e7eb',             border: 'none' },
  { key: 'Focused',  label: 'Focused',     labelAr: 'تركيز',      bg: 'transparent',         border: '2px solid #1849a9' },
];

const STATES_DARK = [
  { key: 'Default',  label: 'Default',     labelAr: 'افتراضي',    bg: 'transparent',              border: 'none' },
  { key: 'Hovered',  label: 'Hovered',     labelAr: 'تمرير',      bg: 'rgba(22,22,22,0.2)',        border: 'none' },
  { key: 'Pressed',  label: 'Pressed',     labelAr: 'ضغط',        bg: 'rgba(22,22,22,0.5)',        border: 'none' },
  { key: 'Focused',  label: 'Focused',     labelAr: 'تركيز',      bg: 'transparent',              border: '2px solid #ffffff' },
];

function StateItem({ state, rtl, dark }) {
  const underline = state.key !== 'Default';
  const textColor  = dark ? '#f9fafb' : '#000b36';
  const helperColor = dark ? '#f9fafb' : '#233a61';
  const iconColor  = dark ? '#f9fafb' : '#000b36';

  const textBlock = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 0 0', minWidth: 1 }}>
      <p style={{
        margin: 0,
        fontSize: 16,
        fontWeight: 500,
        lineHeight: '24px',
        color: textColor,
        textDecoration: underline ? 'underline' : 'none',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        textAlign: rtl ? 'right' : 'left',
      }} dir="auto">
        {rtl ? 'عنوان عنصر القائمة' : 'Menu Item Label'}
      </p>
      <p style={{
        margin: 0,
        fontSize: 14,
        fontWeight: 400,
        lineHeight: '20px',
        color: helperColor,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        textAlign: rtl ? 'right' : 'left',
      }} dir="auto">
        {rtl ? 'محتوى مساند لعنصر الوصول' : 'Menu item helper text'}
      </p>
    </div>
  );

  const icon = (
    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, flexShrink: 0 }}>
      <CheckmarkSquareIcon color={iconColor} />
    </span>
  );

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: rtl ? 'flex-end' : 'flex-start',
      gap: 16,
      padding: '8px 16px',
      borderRadius: 8,
      width: 320,
      boxSizing: 'border-box',
      background: state.bg,
      border: state.border,
      fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
      cursor: 'pointer',
    }}>
      {rtl ? <>{textBlock}{icon}</> : <>{icon}{textBlock}</>}
    </div>
  );
}

/* ── Item States — LTR + RTL ─────────────────────────────── */
/* Matches Figma node 5005:4793: 4 states × LTR+RTL × light+dark */

export const ItemStatesLTR = {
  name: 'Item States — LTR',
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_STATES_URL },
    docs: {
      description: {
        story: 'All Header Sub-Menu Item states from Figma node 5005:4793. Default → Hovered → Pressed → Focused. Icon: `checkmark-square-02`. Label underlines on Hovered/Pressed/Focused. Helper text is shown below the label. Bottom half: dark green (`onColor`) variant with `rgba(22,22,22,x)` overlays and white focus border.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {/* ── Light bg header ── */}
      <div style={{ padding: '24px 32px 8px', display: 'flex', gap: 8 }}>
        <div style={{ width: 80, fontSize: 11, color: '#6c7c96', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }} />
        <div style={{ fontSize: 11, color: '#233a61', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>LTR — Light bg</div>
      </div>
      <div style={{ padding: '0 32px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {STATES.map((s) => (
          <div key={s.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <span style={{ width: 80, flexShrink: 0, fontSize: 11, color: '#6c7c96', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', paddingTop: 10 }}>{s.label}</span>
            <StateItem state={s} rtl={false} dark={false} />
          </div>
        ))}
      </div>

      {/* ── Dark bg (onColor) ── */}
      <div style={{ background: '#102a56', padding: '24px 32px' }}>
        <div style={{ fontSize: 11, color: 'rgba(249,250,251,0.6)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>LTR — Dark green (onColor)</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {STATES_DARK.map((s) => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <span style={{ width: 80, flexShrink: 0, fontSize: 11, color: 'rgba(249,250,251,0.5)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', paddingTop: 10 }}>{s.label}</span>
              <StateItem state={s} rtl={false} dark={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

/* ── Item States — RTL ───────────────────────────────────── */

export const ItemStatesRTL = {
  name: 'Item States — RTL',
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_STATES_URL },
    docs: {
      description: {
        story: 'RTL Arabic mirror of node 5005:4793. Text block renders before icon in DOM; item uses `justify-content: flex-end`. Icon sits to the left of the label (trailing position in Arabic reading direction). Label underlines on Hovered/Pressed/Focused.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {/* ── Light bg ── */}
      <div style={{ padding: '24px 32px 8px', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <div style={{ fontSize: 11, color: '#233a61', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>RTL — خلفية فاتحة</div>
        <div style={{ width: 80, flexShrink: 0 }} />
      </div>
      <div style={{ padding: '0 32px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {STATES.map((s) => (
          <div key={s.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, justifyContent: 'flex-end' }}>
            <StateItem state={s} rtl={true} dark={false} />
            <span style={{ width: 80, flexShrink: 0, fontSize: 11, color: '#6c7c96', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', paddingTop: 10, textAlign: 'right' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Dark bg (onColor) ── */}
      <div style={{ background: '#102a56', padding: '24px 32px' }}>
        <div style={{ fontSize: 11, color: 'rgba(249,250,251,0.6)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12, textAlign: 'right' }}>RTL — خلفية داكنة</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {STATES_DARK.map((s) => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, justifyContent: 'flex-end' }}>
              <StateItem state={s} rtl={true} dark={true} />
              <span style={{ width: 80, flexShrink: 0, fontSize: 11, color: 'rgba(249,250,251,0.5)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', paddingTop: 10, textAlign: 'right' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

/* ── Figma Reference ─────────────────────────────────────── */

export const FigmaReference = {
  name: 'Figma Reference — LTR + RTL',
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        story: 'Side-by-side LTR and RTL renders with Figma placeholder data — for direct visual comparison against Figma node `5005:5487`.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div>
        <p style={{ margin: '0 0 4px 32px', fontSize: 11, color: '#6c7c96', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          LTR — Default, Text only
        </p>
        <SubMenu background="Default" linkStyle="Text only" rtl={false} columns={COLUMNS_TEXT} />
      </div>
      <div>
        <p style={{ margin: '0 32px 4px 0', fontSize: 11, color: '#6c7c96', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'right' }}>
          RTL — Default, Text only
        </p>
        <SubMenu background="Default" linkStyle="Text only" rtl={true} columns={COLUMNS_TEXT} />
      </div>
      <div>
        <p style={{ margin: '0 0 4px 32px', fontSize: 11, color: '#6c7c96', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          LTR — Dark green, Simple icon
        </p>
        <SubMenu background="Dark green" linkStyle="Simple icon" rtl={false} columns={COLUMNS_TEXT} />
      </div>
      <div>
        <p style={{ margin: '0 0 4px 32px', fontSize: 11, color: '#6c7c96', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          LTR — Default, Boxed icon
        </p>
        <SubMenu background="Default" linkStyle="Boxed icon" rtl={false} columns={COLUMNS_BOXED} />
      </div>
      <div>
        <p style={{ margin: '0 32px 4px 0', fontSize: 11, color: '#6c7c96', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'right' }}>
          RTL — Default, Boxed icon
        </p>
        <SubMenu background="Default" linkStyle="Boxed icon" rtl={true} columns={COLUMNS_BOXED} />
      </div>
    </div>
  ),
};
