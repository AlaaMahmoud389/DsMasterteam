import React from 'react';
import { Carousel, CarouselNavButton } from './Carousel';

/* ── Demo slide cards ─────────────────────────────────────── */

const slides = [
  <div key="1" style={{ background: '#eff8ff', border: '1px dashed #1849a9', borderRadius: 8, padding: '48px 32px', textAlign: 'center', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
    <div style={{ fontSize: 20, fontWeight: 600, color: '#1849a9', marginBottom: 8 }}>Slide 1</div>
    <div style={{ fontSize: 14, color: '#6b7280' }}>Swap this content with any element</div>
  </div>,
  <div key="2" style={{ background: '#f0fdf4', border: '1px dashed #059669', borderRadius: 8, padding: '48px 32px', textAlign: 'center', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
    <div style={{ fontSize: 20, fontWeight: 600, color: '#059669', marginBottom: 8 }}>Slide 2</div>
    <div style={{ fontSize: 14, color: '#6b7280' }}>Any component can be placed inside</div>
  </div>,
  <div key="3" style={{ background: '#fffbeb', border: '1px dashed #d97706', borderRadius: 8, padding: '48px 32px', textAlign: 'center', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
    <div style={{ fontSize: 20, fontWeight: 600, color: '#d97706', marginBottom: 8 }}>Slide 3</div>
    <div style={{ fontSize: 14, color: '#6b7280' }}>Cards, images, forms — all valid content</div>
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
  parameters: { layout: 'padded' },
  argTypes: {
    navVariant:     { control: 'radio',   options: ['primary', 'subtle'],  description: 'Navigation button visual style' },
    navSize:        { control: 'radio',   options: ['sm', 'md', 'lg'],     description: 'Navigation button size — sm=32px · md=40px · lg=48px' },
    showNavigation: { control: 'boolean',                                  description: 'Show prev/next arrow buttons' },
    showDots:       { control: 'boolean',                                  description: 'Show dot step indicators' },
    loop:           { control: 'boolean',                                  description: 'Wrap around at first/last slide' },
    autoPlay:       { control: 'boolean',                                  description: 'Auto-advance slides on a timer' },
    interval:       { control: 'number',                                   description: 'Auto-advance interval in milliseconds' },
    dir:            { control: 'radio',   options: ['ltr', 'rtl'],         description: 'Text direction — rtl flips arrow orientation' },
    slides:         { control: false,                                      description: 'Array of slide content (React nodes)' },
  },
};

/* ── Playground ─────────────────────────────────────────────── */
export const Playground = {
  args: {
    slides,
    navVariant:     'primary',
    navSize:        'md',
    showNavigation: true,
    showDots:       true,
    loop:           false,
    autoPlay:       false,
    interval:       3000,
    dir:            'ltr',
  },
  render: (args) => (
    <div style={{ maxWidth: 720 }}>
      <Carousel {...args} />
    </div>
  ),
};

/* ── Nav Button — Variants ───────────────────────────────────── */
export const NavVariants = {
  name: 'Nav Button — Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {[
        { variant: 'primary', label: 'Primary (default)' },
        { variant: 'subtle',  label: 'Subtle' },
      ].map(({ variant, label }) => (
        <div key={variant}>
          <p style={{ margin: '0 0 8px', fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>
            {label}
          </p>
          <div style={{ maxWidth: 720 }}>
            <Carousel navVariant={variant} navSize="md" slides={slides.slice(0, 2)} />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── Nav Button — Sizes ──────────────────────────────────────── */
export const NavSizes = {
  name: 'Nav Button — Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {[
        { size: 'sm', label: 'Small — 32 × 32 px' },
        { size: 'md', label: 'Medium — 40 × 40 px' },
        { size: 'lg', label: 'Large — 48 × 48 px' },
      ].map(({ size, label }) => (
        <div key={size}>
          <p style={{ margin: '0 0 8px', fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>
            {label}
          </p>
          <div style={{ maxWidth: 720 }}>
            <Carousel navVariant="primary" navSize={size} slides={slides.slice(0, 2)} showDots={false} />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── Primary ─────────────────────────────────────────────────── */
export const Primary = {
  name: 'Primary Navigation',
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <Carousel navVariant="primary" navSize="md" slides={slides} />
      <p style={{ marginTop: 8, fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 12, color: '#6C7C96' }}>
        Primary — solid blue (#1849a9) with white chevrons. Use on hero and banner areas.
      </p>
    </div>
  ),
};

/* ── Subtle ──────────────────────────────────────────────────── */
export const Subtle = {
  name: 'Subtle Navigation',
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <Carousel navVariant="subtle" navSize="md" slides={slides} />
      <p style={{ marginTop: 8, fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 12, color: '#6C7C96' }}>
        Subtle — light gray (#f3f4f6) with dark chevrons. Use inside cards or on light backgrounds.
      </p>
    </div>
  ),
};

/* ── Dots Only ───────────────────────────────────────────────── */
export const DotsOnly = {
  name: 'Dots Only (no nav)',
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <Carousel showNavigation={false} showDots={true} slides={slides} />
      <p style={{ marginTop: 8, fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 12, color: '#6C7C96' }}>
        Dots-only layout — suitable for auto-play contexts and touch-first surfaces.
      </p>
    </div>
  ),
};

/* ── Navigation Only ─────────────────────────────────────────── */
export const NavigationOnly = {
  name: 'Navigation Only (no dots)',
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <Carousel showNavigation={true} showDots={false} slides={slides} />
      <p style={{ marginTop: 8, fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 12, color: '#6C7C96' }}>
        Nav-only layout — minimal UI when a position indicator is not required.
      </p>
    </div>
  ),
};

/* ── Small Nav ───────────────────────────────────────────────── */
export const SmallNav = {
  name: 'Small Nav (32 × 32 px)',
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <Carousel navVariant="primary" navSize="sm" slides={slides} />
    </div>
  ),
};

/* ── Large Nav ───────────────────────────────────────────────── */
export const LargeNav = {
  name: 'Large Nav (48 × 48 px)',
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <Carousel navVariant="primary" navSize="lg" slides={slides} />
    </div>
  ),
};

/* ── With Loop ───────────────────────────────────────────────── */
export const WithLoop = {
  name: 'With Loop',
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <Carousel loop={true} navVariant="primary" navSize="md" slides={slides} />
      <p style={{ marginTop: 8, fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 12, color: '#6C7C96' }}>
        loop=true — next after last returns to first; prev before first goes to last.
      </p>
    </div>
  ),
};

/* ── Auto Play ───────────────────────────────────────────────── */
export const AutoPlayStory = {
  name: 'Auto Play',
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <Carousel autoPlay={true} loop={true} interval={2000} navVariant="primary" navSize="md" slides={slides} />
      <p style={{ marginTop: 8, fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 12, color: '#6C7C96' }}>
        autoPlay=true + loop=true — slides advance every 2 s indefinitely.
      </p>
    </div>
  ),
};

/* ── RTL Arabic ──────────────────────────────────────────────── */
export const RTLArabic = {
  name: 'RTL Arabic',
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <Carousel dir="rtl" navVariant="primary" navSize="md" slides={slidesAr} />
      <p style={{ marginTop: 8, fontFamily: 'IBM Plex Sans Arabic, sans-serif', fontSize: 12, color: '#6C7C96' }}>
        dir="rtl" — chevrons flip; the right button navigates backward, matching Arabic reading direction.
      </p>
    </div>
  ),
};

/* ── Subtle RTL ──────────────────────────────────────────────── */
export const SubtleRTL = {
  name: 'Subtle RTL',
  render: () => (
    <div style={{ maxWidth: 720 }}>
      <Carousel dir="rtl" navVariant="subtle" navSize="md" slides={slidesAr} />
    </div>
  ),
};

/* ── Nav Button — Primary States ─────────────────────────────── */
export const NavButtonPrimaryAllStates = {
  name: 'Nav Button — Primary States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { label: 'Default',  extra: {} },
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

/* ── Nav Button — Subtle States ──────────────────────────────── */
export const NavButtonSubtleAllStates = {
  name: 'Nav Button — Subtle States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { label: 'Default',  extra: {} },
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
