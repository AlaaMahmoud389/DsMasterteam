import { Carousel, CarouselNavButton } from './Carousel';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4112-16';

/* ── Demo slide cards ─────────────────────────────────────── */

const slides = [
  <div key="1" style={{ background: '#eff8ff', border: '1px dashed #1849a9', borderRadius: 8, padding: '48px 32px', textAlign: 'center', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
    <div style={{ fontSize: 20, fontWeight: 600, color: '#1849a9', marginBottom: 8 }}>Slide 1</div>
    <div style={{ fontSize: 14, color: '#6b7280' }}>Swap this content component with any element</div>
  </div>,
  <div key="2" style={{ background: '#f0fdf4', border: '1px dashed #059669', borderRadius: 8, padding: '48px 32px', textAlign: 'center', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
    <div style={{ fontSize: 20, fontWeight: 600, color: '#059669', marginBottom: 8 }}>Slide 2</div>
    <div style={{ fontSize: 14, color: '#6b7280' }}>Any component can be placed inside the carousel</div>
  </div>,
  <div key="3" style={{ background: '#fffbeb', border: '1px dashed #d97706', borderRadius: 8, padding: '48px 32px', textAlign: 'center', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
    <div style={{ fontSize: 20, fontWeight: 600, color: '#d97706', marginBottom: 8 }}>Slide 3</div>
    <div style={{ fontSize: 14, color: '#6b7280' }}>Cards, images, forms — all valid carousel content</div>
  </div>,
  <div key="4" style={{ background: '#fef2f2', border: '1px dashed #dc2626', borderRadius: 8, padding: '48px 32px', textAlign: 'center', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
    <div style={{ fontSize: 20, fontWeight: 600, color: '#dc2626', marginBottom: 8 }}>Slide 4</div>
    <div style={{ fontSize: 14, color: '#6b7280' }}>Navigation wraps when loop=true is set</div>
  </div>,
];

const slidesAr = [
  <div key="1" style={{ background: '#eff8ff', border: '1px dashed #1849a9', borderRadius: 8, padding: '48px 32px', textAlign: 'center', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", direction: 'rtl' }}>
    <div style={{ fontSize: 20, fontWeight: 600, color: '#1849a9', marginBottom: 8 }}>الشريحة الأولى</div>
    <div style={{ fontSize: 14, color: '#6b7280' }}>استبدل هذا العنصر بأي عنصر آخر</div>
  </div>,
  <div key="2" style={{ background: '#f0fdf4', border: '1px dashed #059669', borderRadius: 8, padding: '48px 32px', textAlign: 'center', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", direction: 'rtl' }}>
    <div style={{ fontSize: 20, fontWeight: 600, color: '#059669', marginBottom: 8 }}>الشريحة الثانية</div>
    <div style={{ fontSize: 14, color: '#6b7280' }}>يمكن وضع أي مكوّن داخل الكاروسيل</div>
  </div>,
  <div key="3" style={{ background: '#fffbeb', border: '1px dashed #d97706', borderRadius: 8, padding: '48px 32px', textAlign: 'center', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", direction: 'rtl' }}>
    <div style={{ fontSize: 20, fontWeight: 600, color: '#d97706', marginBottom: 8 }}>الشريحة الثالثة</div>
    <div style={{ fontSize: 14, color: '#6b7280' }}>البطاقات والصور والنماذج — كلها محتوى صالح</div>
  </div>,
];

/* ── Story meta ───────────────────────────────────────────── */

export default {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    navVariant: {
      control: 'select',
      options: ['primary', 'subtle'],
      description: 'Navigation button visual style',
      table: { defaultValue: { summary: 'primary' } },
    },
    navSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Navigation button size — sm=32px · md=40px · lg=48px',
      table: { defaultValue: { summary: 'md' } },
    },
    showNavigation: {
      control: 'boolean',
      description: 'Show prev/next arrow buttons',
      table: { defaultValue: { summary: 'true' } },
    },
    showDots: {
      control: 'boolean',
      description: 'Show dot step indicators',
      table: { defaultValue: { summary: 'true' } },
    },
    loop: {
      control: 'boolean',
      description: 'Wrap around at first/last slide',
      table: { defaultValue: { summary: 'false' } },
    },
    autoPlay: {
      control: 'boolean',
      description: 'Auto-advance slides on a timer',
      table: { defaultValue: { summary: 'false' } },
    },
    interval: {
      control: 'number',
      description: 'Auto-advance interval in milliseconds',
      table: { defaultValue: { summary: '3000' } },
    },
    dir: {
      control: 'select',
      options: ['ltr', 'rtl'],
      description: 'Text direction — rtl flips arrow orientation',
      table: { defaultValue: { summary: 'ltr' } },
    },
    slides: { control: false, description: 'Array of slide content (React nodes)' },
  },
  args: {
    slides,
    navVariant: 'primary',
    navSize: 'md',
    showNavigation: true,
    showDots: true,
    loop: false,
    autoPlay: false,
    interval: 3000,
    dir: 'ltr',
  },
};

/* ── Carousel stories ────────────────────────────────────── */

export const Playground = {};

export const Primary = {
  name: 'Primary Navigation',
  args: { navVariant: 'primary', navSize: 'md' },
};

export const Subtle = {
  name: 'Subtle Navigation',
  args: { navVariant: 'subtle', navSize: 'md' },
};

export const DotsOnly = {
  name: 'Dots Only (no nav)',
  args: { showNavigation: false, showDots: true },
};

export const NavigationOnly = {
  name: 'Navigation Only (no dots)',
  args: { showNavigation: true, showDots: false },
};

export const SmallNav = {
  name: 'Small Nav (32px)',
  args: { navVariant: 'primary', navSize: 'sm' },
};

export const LargeNav = {
  name: 'Large Nav (48px)',
  args: { navVariant: 'primary', navSize: 'lg' },
};

export const WithLoop = {
  name: 'With Loop',
  args: { loop: true },
};

export const AutoPlayStory = {
  name: 'Auto Play',
  args: { autoPlay: true, loop: true, interval: 2000 },
};

export const RTLArabic = {
  name: 'RTL Arabic',
  args: {
    dir: 'rtl',
    navVariant: 'primary',
    navSize: 'md',
    slides: slidesAr,
  },
};

export const SubtleRTL = {
  name: 'Subtle RTL',
  args: {
    dir: 'rtl',
    navVariant: 'subtle',
    navSize: 'md',
    slides: slidesAr,
  },
};

/* ── CarouselNavButton stories ────────────────────────────── */

export const NavButtonPrimaryAllStates = {
  name: 'Nav Button — Primary States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { label: 'Default', extra: {} },
        { label: 'Disabled', extra: { disabled: true } },
      ].map(({ label, extra }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ minWidth: 80, fontSize: 12, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</span>
          <CarouselNavButton direction="prev" variant="primary" size="sm" {...extra} />
          <CarouselNavButton direction="next" variant="primary" size="sm" {...extra} />
          <CarouselNavButton direction="prev" variant="primary" size="md" {...extra} />
          <CarouselNavButton direction="next" variant="primary" size="md" {...extra} />
          <CarouselNavButton direction="prev" variant="primary" size="lg" {...extra} />
          <CarouselNavButton direction="next" variant="primary" size="lg" {...extra} />
        </div>
      ))}
    </div>
  ),
};

export const NavButtonSubtleAllStates = {
  name: 'Nav Button — Subtle States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { label: 'Default', extra: {} },
        { label: 'Disabled', extra: { disabled: true } },
      ].map(({ label, extra }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ minWidth: 80, fontSize: 12, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</span>
          <CarouselNavButton direction="prev" variant="subtle" size="sm" {...extra} />
          <CarouselNavButton direction="next" variant="subtle" size="sm" {...extra} />
          <CarouselNavButton direction="prev" variant="subtle" size="md" {...extra} />
          <CarouselNavButton direction="next" variant="subtle" size="md" {...extra} />
          <CarouselNavButton direction="prev" variant="subtle" size="lg" {...extra} />
          <CarouselNavButton direction="next" variant="subtle" size="lg" {...extra} />
        </div>
      ))}
    </div>
  ),
};
