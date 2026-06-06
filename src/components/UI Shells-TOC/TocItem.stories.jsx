import { TocItem } from './TocItem';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=5005-13372';

/* ── Helpers ─────────────────────────────────────────────── */

const NavBox = ({ children, gap = 2, align = 'flex-start' }) => (
  <div style={{
    background: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    display: 'inline-flex',
    flexDirection: 'column',
    gap,
    alignItems: align,
  }}>
    {children}
  </div>
);

const Cell = ({ children }) => (
  <div style={{ background: '#f9fafb', borderRadius: 6, padding: 8, display: 'inline-flex' }}>
    {children}
  </div>
);

/* ── Default export ──────────────────────────────────────── */

export default {
  title: 'UI Shells/TOC/TocItem',
  component: TocItem,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    level: {
      control: 'radio',
      options: ['Level 1 (H2)', 'Level 2 (H3)', 'Level 3 (H4)'],
      description: 'Heading level — controls nesting indentation depth',
      table: { defaultValue: { summary: 'Level 1 (H2)' } },
    },
    state: {
      control: 'radio',
      options: ['Default', 'Hovered', 'Pressed', 'Focused'],
      description: 'Interaction state of the item',
      table: { defaultValue: { summary: 'Default' } },
    },
    selected: {
      control: 'boolean',
      description: 'Whether this is the currently active TOC entry',
      table: { defaultValue: { summary: 'true' } },
    },
    rtl: {
      control: 'boolean',
      description: 'Right-to-left layout (Arabic). Physical CSS mirroring — no dir="rtl" on container.',
      table: { defaultValue: { summary: 'false' } },
    },
    textEn: { control: 'text', description: 'English label (shown when rtl=false)' },
    textAr: { control: 'text', description: 'Arabic label (shown when rtl=true)' },
  },
  args: {
    level: 'Level 1 (H2)',
    state: 'Default',
    selected: true,
    rtl: false,
    textEn: 'Page Section',
    textAr: 'قسم صفحة',
  },
};

/* ── Playground ──────────────────────────────────────────── */

export const Playground = {};

/* ═══════════════════════════════════════════════════════════
   SELECTED — all 4 states
   ═══════════════════════════════════════════════════════════ */

export const SelectedDefault = {
  name: 'Selected / Default',
  parameters: {
    docs: {
      description: {
        story: 'No background. Semi-bold text (`#000b36`) and a blue indicator bar (`#194185`) mark the selected item.',
      },
    },
  },
  render: (args) => <NavBox><TocItem {...args} selected state="Default" /></NavBox>,
};

export const SelectedHovered = {
  name: 'Selected / Hovered',
  parameters: {
    docs: {
      description: {
        story: '`#eff8ff` background appears on pointer entry. Blue indicator bar remains visible.',
      },
    },
  },
  render: (args) => <NavBox><TocItem {...args} selected state="Hovered" /></NavBox>,
};

export const SelectedPressed = {
  name: 'Selected / Pressed',
  parameters: {
    docs: {
      description: {
        story: '`#eff8ff` background, same visual treatment as Hovered. Blue indicator bar persists.',
      },
    },
  },
  render: (args) => <NavBox><TocItem {...args} selected state="Pressed" /></NavBox>,
};

export const SelectedFocused = {
  name: 'Selected / Focused',
  parameters: {
    docs: {
      description: {
        story: '2 px `#1849a9` border ring. No background. The focus ring replaces the indicator bar visually.',
      },
    },
  },
  render: (args) => <NavBox><TocItem {...args} selected state="Focused" /></NavBox>,
};

/* ═══════════════════════════════════════════════════════════
   UNSELECTED — all 4 states
   ═══════════════════════════════════════════════════════════ */

export const UnselectedDefault = {
  name: 'Unselected / Default',
  parameters: {
    docs: {
      description: {
        story: 'No background, no indicator bar. Regular-weight secondary text (`#6c7c96`).',
      },
    },
  },
  render: (args) => <NavBox><TocItem {...args} selected={false} state="Default" /></NavBox>,
};

export const UnselectedHovered = {
  name: 'Unselected / Hovered',
  parameters: {
    docs: {
      description: {
        story: '`#eff8ff` background on hover. Text flips to primary (`#000b36`) and a gray indicator bar (`#9da4ae`) appears.',
      },
    },
  },
  render: (args) => <NavBox><TocItem {...args} selected={false} state="Hovered" /></NavBox>,
};

export const UnselectedPressed = {
  name: 'Unselected / Pressed',
  parameters: {
    docs: {
      description: {
        story: '`#eff8ff` background. Same visual as Hovered — gray indicator bar, primary text color.',
      },
    },
  },
  render: (args) => <NavBox><TocItem {...args} selected={false} state="Pressed" /></NavBox>,
};

export const UnselectedFocused = {
  name: 'Unselected / Focused',
  parameters: {
    docs: {
      description: {
        story: '2 px `#1849a9` border ring only. No background, no indicator bar, text stays secondary gray.',
      },
    },
  },
  render: (args) => <NavBox><TocItem {...args} selected={false} state="Focused" /></NavBox>,
};

/* ═══════════════════════════════════════════════════════════
   HEADING LEVELS
   ═══════════════════════════════════════════════════════════ */

const LEVEL_LABEL_STYLE = {
  fontSize: 11, fontWeight: 600, color: '#6b7280',
  textTransform: 'uppercase', letterSpacing: '0.06em',
  fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
  marginBottom: 6,
};

export const LevelsLTR = {
  name: 'Levels — LTR (L1 / L2 / L3)',
  parameters: { layout: 'centered' },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={LEVEL_LABEL_STYLE}>Level 1 (H2) — No indent</div>
        <NavBox>
          <TocItem {...args} level="Level 1 (H2)" selected state="Default" />
          <TocItem {...args} level="Level 1 (H2)" selected={false} state="Default" />
        </NavBox>
      </div>
      <div>
        <div style={LEVEL_LABEL_STYLE}>Level 2 (H3) — 1× indent (16 px nesting bar)</div>
        <NavBox>
          <TocItem {...args} level="Level 2 (H3)" selected state="Default" />
          <TocItem {...args} level="Level 2 (H3)" selected={false} state="Default" />
        </NavBox>
      </div>
      <div>
        <div style={LEVEL_LABEL_STYLE}>Level 3 (H4) — 2× indent (2 × 16 px nesting bars)</div>
        <NavBox>
          <TocItem {...args} level="Level 3 (H4)" selected state="Default" />
          <TocItem {...args} level="Level 3 (H4)" selected={false} state="Default" />
        </NavBox>
      </div>
    </div>
  ),
};

export const LevelsRTL = {
  name: 'Levels — RTL (L1 / L2 / L3)',
  parameters: { layout: 'centered' },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-end' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <div style={{ ...LEVEL_LABEL_STYLE, textAlign: 'right' }}>Level 1 (H2) — لا مسافة بادئة</div>
        <NavBox align="flex-end">
          <TocItem {...args} level="Level 1 (H2)" rtl selected state="Default" />
          <TocItem {...args} level="Level 1 (H2)" rtl selected={false} state="Default" />
        </NavBox>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <div style={{ ...LEVEL_LABEL_STYLE, textAlign: 'right' }}>Level 2 (H3) — شريط واحد</div>
        <NavBox align="flex-end">
          <TocItem {...args} level="Level 2 (H3)" rtl selected state="Default" />
          <TocItem {...args} level="Level 2 (H3)" rtl selected={false} state="Default" />
        </NavBox>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <div style={{ ...LEVEL_LABEL_STYLE, textAlign: 'right' }}>Level 3 (H4) — شريطان</div>
        <NavBox align="flex-end">
          <TocItem {...args} level="Level 3 (H4)" rtl selected state="Default" />
          <TocItem {...args} level="Level 3 (H4)" rtl selected={false} state="Default" />
        </NavBox>
      </div>
    </div>
  ),
};

/* ═══════════════════════════════════════════════════════════
   ALL STATES MATRIX
   ═══════════════════════════════════════════════════════════ */

const STATES = ['Default', 'Hovered', 'Pressed', 'Focused'];
const LEVELS = ['Level 1 (H2)', 'Level 2 (H3)', 'Level 3 (H4)'];

const colHead = (text) => (
  <div style={{ fontSize: 10, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center' }}>
    {text}
  </div>
);

const rowHead = (text) => (
  <div style={{ fontSize: 10, fontWeight: 600, color: '#374151', width: 72, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8 }}>
    {text}
  </div>
);

function ItemMatrix({ rtl = false }) {
  return (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div style={{ display: 'grid', gridTemplateColumns: '72px repeat(4, 216px)', gap: 4, marginBottom: 4 }}>
        <div />
        {STATES.map(s => <div key={s}>{colHead(s)}</div>)}
      </div>
      {['Selected', 'Unselected'].map(sel => (
        <div key={sel}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '10px 0 4px 72px' }}>
            {sel}
          </div>
          {LEVELS.map(level => (
            <div
              key={level}
              style={{ display: 'grid', gridTemplateColumns: '72px repeat(4, 216px)', gap: 4, marginBottom: 2, alignItems: 'center' }}
            >
              {rowHead(level === 'Level 1 (H2)' ? 'L1' : level === 'Level 2 (H3)' ? 'L2' : 'L3')}
              {STATES.map(state => (
                <Cell key={state}>
                  <TocItem level={level} state={state} selected={sel === 'Selected'} rtl={rtl} textEn="Page Section" textAr="قسم صفحة" />
                </Cell>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export const AllStatesLTR = {
  name: 'All States Matrix — LTR',
  parameters: { layout: 'padded' },
  render: () => <ItemMatrix />,
};

export const AllStatesRTL = {
  name: 'All States Matrix — RTL',
  parameters: { layout: 'padded' },
  render: () => <ItemMatrix rtl />,
};

/* ═══════════════════════════════════════════════════════════
   FULL NAVIGATION WITH PAGE CONTENT
   ═══════════════════════════════════════════════════════════ */

const PAGE_ITEMS = [
  {
    id: 1, level: 'Level 1 (H2)', en: 'Introduction', ar: 'مقدمة', selected: false,
    bodyEn: 'An overview of the design system, its goals, and how teams use it to build consistent digital products.',
    bodyAr: 'نظرة عامة على نظام التصميم وأهدافه وكيفية استخدام الفرق له لبناء منتجات رقمية متسقة.',
  },
  {
    id: 2, level: 'Level 1 (H2)', en: 'Getting Started', ar: 'البدء السريع', selected: true,
    bodyEn: 'Install the package, import design tokens, and render your first component in minutes.',
    bodyAr: 'قم بتثبيت الحزمة واستيراد رموز التصميم وعرض مكونك الأول في دقائق.',
  },
  {
    id: 3, level: 'Level 2 (H3)', en: 'Installation', ar: 'التثبيت', selected: false,
    bodyEn: 'Add the package via npm or yarn. Requires React 18+ and Node 18+.',
    bodyAr: 'أضف الحزمة عبر npm أو yarn. يتطلب React 18+ و Node 18+.',
  },
  {
    id: 4, level: 'Level 2 (H3)', en: 'Configuration', ar: 'الإعدادات', selected: false,
    bodyEn: 'Import tokens.css at the root of your app and configure theme variables in your bundler.',
    bodyAr: 'استورد tokens.css في جذر تطبيقك وقم بتهيئة متغيرات الثيم في حزمة الدمج.',
  },
  {
    id: 5, level: 'Level 3 (H4)', en: 'Environment Variables', ar: 'متغيرات البيئة', selected: false,
    bodyEn: 'Set DS_THEME and DS_LOCALE at build time to pre-configure the default theme and locale.',
    bodyAr: 'قم بتعيين DS_THEME و DS_LOCALE في وقت البناء لتهيئة الثيم والإعداد المحلي الافتراضيين.',
  },
  {
    id: 6, level: 'Level 3 (H4)', en: 'Default Values', ar: 'القيم الافتراضية', selected: false,
    bodyEn: 'Default theme is light, locale is en-US. Override via props or CSS custom properties.',
    bodyAr: 'الثيم الافتراضي فاتح والإعداد المحلي الافتراضي en-US. تجاوزه عبر props أو خصائص CSS المخصصة.',
  },
  {
    id: 7, level: 'Level 1 (H2)', en: 'Components', ar: 'المكوّنات', selected: false,
    bodyEn: 'Browse the full library of components, each documented with usage guidelines and Figma links.',
    bodyAr: 'تصفح المكتبة الكاملة من المكونات، يتضمن كل منها إرشادات الاستخدام وروابط Figma.',
  },
  {
    id: 8, level: 'Level 2 (H3)', en: 'Button', ar: 'الزر', selected: false,
    bodyEn: 'Primary, secondary, ghost and danger variants. Supports icons, loading state, and full RTL.',
    bodyAr: 'متغيرات أساسية وثانوية وشبحية وخطيرة. يدعم الأيقونات وحالة التحميل وRTL كاملاً.',
  },
  {
    id: 9, level: 'Level 2 (H3)', en: 'Table', ar: 'الجدول', selected: false,
    bodyEn: 'Sortable, paginated data tables with sticky headers, row selection, and inline actions.',
    bodyAr: 'جداول بيانات قابلة للترتيب والترقيم مع رؤوس ثابتة وتحديد الصفوف والإجراءات المضمنة.',
  },
];

const CONTENT_FONT_SIZE = { 'Level 1 (H2)': 18, 'Level 2 (H3)': 15, 'Level 3 (H4)': 13 };
const CONTENT_INDENT   = { 'Level 1 (H2)': 0,  'Level 2 (H3)': 20, 'Level 3 (H4)': 40 };

export const NavigationLTR = {
  name: 'Navigation — LTR with Page Content',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 40, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", alignItems: 'flex-start' }}>

      {/* ── TOC sidebar ── */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ ...LEVEL_LABEL_STYLE, marginBottom: 8 }}>Table of Contents</div>
        <div style={{ background: '#f9fafb', borderRadius: 8, padding: 12, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {PAGE_ITEMS.map(item => (
            <TocItem
              key={item.id}
              level={item.level}
              selected={item.selected}
              state="Default"
              rtl={false}
              textEn={item.en}
              textAr={item.ar}
            />
          ))}
        </div>
      </div>

      {/* ── Page content ── */}
      <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {PAGE_ITEMS.map((item, i) => (
          <div
            key={item.id}
            style={{
              paddingLeft: CONTENT_INDENT[item.level],
              paddingTop: 20,
              paddingBottom: 20,
              borderBottom: '1px solid #f3f4f6',
              borderLeft: item.selected ? '3px solid #194185' : '3px solid transparent',
              paddingLeft: CONTENT_INDENT[item.level] + (item.selected ? 13 : 16),
            }}
          >
            <div style={{
              fontSize: CONTENT_FONT_SIZE[item.level],
              fontWeight: 600,
              color: item.selected ? '#194185' : '#000b36',
              marginBottom: 6,
              lineHeight: 1.4,
            }}>
              {item.en}
            </div>
            <p style={{ fontSize: 13, color: '#6c7c96', lineHeight: 1.7, margin: 0 }}>
              {item.bodyEn}
            </p>
          </div>
        ))}
      </div>

    </div>
  ),
};

export const NavigationRTL = {
  name: 'Navigation — RTL with Page Content',
  parameters: { layout: 'padded' },
  render: () => (
    /* No dir="rtl" — TocItem uses physical CSS mirroring only */
    <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: 40, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", alignItems: 'flex-start' }}>

      {/* ── TOC sidebar (right side in RTL) ── */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <div style={{ ...LEVEL_LABEL_STYLE, textAlign: 'right', marginBottom: 8 }}>جدول المحتويات</div>
        <div style={{ background: '#f9fafb', borderRadius: 8, padding: 12, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
          {PAGE_ITEMS.map(item => (
            <TocItem
              key={item.id}
              level={item.level}
              selected={item.selected}
              state="Default"
              rtl={true}
              textEn={item.en}
              textAr={item.ar}
            />
          ))}
        </div>
      </div>

      {/* ── Page content (left side in RTL) ── */}
      <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {PAGE_ITEMS.map((item) => (
          <div
            key={item.id}
            style={{
              paddingRight: CONTENT_INDENT[item.level] + (item.selected ? 13 : 16),
              paddingLeft: 16,
              paddingTop: 20,
              paddingBottom: 20,
              borderBottom: '1px solid #f3f4f6',
              borderRight: item.selected ? '3px solid #194185' : '3px solid transparent',
              textAlign: 'right',
            }}
          >
            <div style={{
              fontSize: CONTENT_FONT_SIZE[item.level],
              fontWeight: 600,
              color: item.selected ? '#194185' : '#000b36',
              marginBottom: 6,
              lineHeight: 1.4,
            }}>
              {item.ar}
            </div>
            <p style={{ fontSize: 13, color: '#6c7c96', lineHeight: 1.7, margin: 0 }}>
              {item.bodyAr}
            </p>
          </div>
        ))}
      </div>

    </div>
  ),
};

export const LTRvsRTL = {
  name: 'LTR vs RTL — Side by Side',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 64, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", alignItems: 'flex-start' }}>

      {/* LTR */}
      <div>
        <div style={LEVEL_LABEL_STYLE}>LTR — English</div>
        <div style={{ background: '#f9fafb', borderRadius: 8, padding: 12, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {PAGE_ITEMS.map(item => (
            <TocItem key={item.id} level={item.level} selected={item.selected} state="Default" rtl={false} textEn={item.en} textAr={item.ar} />
          ))}
        </div>
      </div>

      {/* RTL — no dir="rtl" on container */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <div style={{ ...LEVEL_LABEL_STYLE, textAlign: 'right' }}>RTL — العربية</div>
        <div style={{ background: '#f9fafb', borderRadius: 8, padding: 12, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
          {PAGE_ITEMS.map(item => (
            <TocItem key={item.id} level={item.level} selected={item.selected} state="Default" rtl={true} textEn={item.en} textAr={item.ar} />
          ))}
        </div>
      </div>

    </div>
  ),
};
