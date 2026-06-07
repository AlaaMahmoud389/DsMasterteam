import { Toc } from './Toc';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=5005-13679';

/* ── Item lists ──────────────────────────────────────────── */

const FIGMA_ITEMS = [
  { level: 'Level 1 (H2)', selected: true,  textEn: 'Page Section',       textAr: 'قسم صفحة' },
  { level: 'Level 2 (H3)', selected: false, textEn: 'Nested Page Section', textAr: 'قسم صفحة' },
  { level: 'Level 2 (H3)', selected: false, textEn: 'Nested Page Section', textAr: 'قسم صفحة' },
  { level: 'Level 3 (H4)', selected: false, textEn: 'Nested Page Section', textAr: 'قسم صفحة' },
  { level: 'Level 3 (H4)', selected: false, textEn: 'Nested Page Section', textAr: 'قسم صفحة' },
  { level: 'Level 2 (H3)', selected: false, textEn: 'Nested Page Section', textAr: 'قسم صفحة' },
  { level: 'Level 1 (H2)', selected: false, textEn: 'Page Section',        textAr: 'قسم صفحة' },
  { level: 'Level 1 (H2)', selected: false, textEn: 'Page Section',        textAr: 'قسم صفحة' },
  { level: 'Level 2 (H3)', selected: false, textEn: 'Nested Page Section', textAr: 'قسم صفحة' },
  { level: 'Level 2 (H3)', selected: false, textEn: 'Nested Page Section', textAr: 'قسم صفحة' },
  { level: 'Level 2 (H3)', selected: false, textEn: 'Nested Page Section', textAr: 'قسم صفحة' },
  { level: 'Level 1 (H2)', selected: false, textEn: 'Page Section',        textAr: 'قسم صفحة' },
  { level: 'Level 1 (H2)', selected: false, textEn: 'Page Section',        textAr: 'قسم صفحة' },
  { level: 'Level 1 (H2)', selected: false, textEn: 'Page Section',        textAr: 'قسم صفحة' },
  { level: 'Level 1 (H2)', selected: false, textEn: 'Page Section',        textAr: 'قسم صفحة' },
  { level: 'Level 1 (H2)', selected: false, textEn: 'Page Section',        textAr: 'قسم صفحة' },
  { level: 'Level 1 (H2)', selected: false, textEn: 'Page Section',        textAr: 'قسم صفحة' },
  { level: 'Level 1 (H2)', selected: false, textEn: 'Page Section',        textAr: 'قسم صفحة' },
  { level: 'Level 1 (H2)', selected: false, textEn: 'Page Section',        textAr: 'قسم صفحة' },
];

const REAL_ITEMS = [
  { level: 'Level 1 (H2)', selected: true,  textEn: 'Introduction',      textAr: 'مقدمة' },
  { level: 'Level 2 (H3)', selected: false, textEn: 'What is the DS?',   textAr: 'ما هو نظام التصميم؟' },
  { level: 'Level 2 (H3)', selected: false, textEn: 'Design principles', textAr: 'مبادئ التصميم' },
  { level: 'Level 1 (H2)', selected: false, textEn: 'Getting started',   textAr: 'البدء السريع' },
  { level: 'Level 2 (H3)', selected: false, textEn: 'Installation',      textAr: 'التثبيت' },
  { level: 'Level 3 (H4)', selected: false, textEn: 'npm / yarn',        textAr: 'npm / yarn' },
  { level: 'Level 3 (H4)', selected: false, textEn: 'CDN link',          textAr: 'رابط CDN' },
  { level: 'Level 2 (H3)', selected: false, textEn: 'Configuration',     textAr: 'الإعدادات' },
  { level: 'Level 1 (H2)', selected: false, textEn: 'Components',        textAr: 'المكوّنات' },
  { level: 'Level 2 (H3)', selected: false, textEn: 'Button',            textAr: 'الزر' },
  { level: 'Level 2 (H3)', selected: false, textEn: 'Table',             textAr: 'الجدول' },
  { level: 'Level 2 (H3)', selected: false, textEn: 'TOC Item',          textAr: 'عنصر قائمة المحتويات' },
  { level: 'Level 1 (H2)', selected: false, textEn: 'Guidelines',        textAr: 'الإرشادات' },
  { level: 'Level 1 (H2)', selected: false, textEn: 'Accessibility',     textAr: 'إمكانية الوصول' },
];

/* ── Default export ──────────────────────────────────────── */

export default {
  title: 'UI Shells/TOC/TOC',
  component: Toc,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    rtl: {
      control: 'boolean',
      description: 'Right-to-left layout for Arabic',
      table: { defaultValue: { summary: 'false' } },
    },
    pageName: {
      control: 'text',
      description: 'English page title shown below the "On this page" label',
    },
    pageNameAr: {
      control: 'text',
      description: 'Arabic page title (shown when rtl=true)',
    },
  },
  args: {
    rtl:        false,
    pageName:   '[Page Name]',
    pageNameAr: '[اسم الصفحة]',
    items:      FIGMA_ITEMS,
  },
};

/* ── Playground ──────────────────────────────────────────── */

export const Playground = {};

/* ── Default LTR ─────────────────────────────────────────── */

export const DefaultLTR = {
  name: 'Default — LTR',
  args: { rtl: false },
};

/* ── Default RTL ─────────────────────────────────────────── */

export const DefaultRTL = {
  name: 'Default — RTL',
  args: { rtl: true },
};

/* ── Figma Reference ─────────────────────────────────────── */

export const FigmaReference = {
  name: 'Figma Reference — LTR + RTL',
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  render: () => (
    <div style={{
      display: 'flex',
      gap: 32,
      alignItems: 'flex-start',
      fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
    }}>
      <Toc rtl={false} pageName="[Page Name]" pageNameAr="[اسم الصفحة]" items={FIGMA_ITEMS} />
      <Toc rtl={true}  pageName="[Page Name]" pageNameAr="[اسم الصفحة]" items={FIGMA_ITEMS} />
    </div>
  ),
};

/* ── Real Content ────────────────────────────────────────── */

export const RealContentLTR = {
  name: 'Real Content — LTR',
  parameters: { layout: 'centered' },
  render: () => (
    <Toc
      rtl={false}
      pageName="Design System Documentation"
      pageNameAr="توثيق نظام التصميم"
      items={REAL_ITEMS}
    />
  ),
};

export const RealContentRTL = {
  name: 'Real Content — RTL',
  parameters: { layout: 'centered' },
  render: () => (
    <Toc
      rtl={true}
      pageName="Design System Documentation"
      pageNameAr="توثيق نظام التصميم"
      items={REAL_ITEMS}
    />
  ),
};

export const RealContentBilingual = {
  name: 'Real Content — LTR + RTL',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{
      display: 'flex',
      gap: 48,
      alignItems: 'flex-start',
      fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
    }}>
      <Toc rtl={false} pageName="Design System Documentation" pageNameAr="توثيق نظام التصميم" items={REAL_ITEMS} />
      <Toc rtl={true}  pageName="Design System Documentation" pageNameAr="توثيق نظام التصميم" items={REAL_ITEMS} />
    </div>
  ),
};
