import { Footer } from './Footer';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=5005-14313';

/* ── Custom viewport: matches Figma's <600 breakpoint ─────── */

const MOBILE_VPTS = {
  viewport: {
    viewports: {
      footerMobile: {
        name: 'Mobile <600px',
        styles: { width: '599px', height: '900px' },
        type: 'mobile',
      },
    },
    defaultViewport: 'footerMobile',
  },
};

/* ── Default export ──────────────────────────────────────── */

export default {
  title: 'UI Shells/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    rtl: {
      control: 'boolean',
      description: 'Right-to-left layout — reverses legal row order and renders Arabic labels',
      table: { defaultValue: { summary: 'false' } },
    },
    variant: {
      control: 'select',
      options: ['Default', 'Primary'],
      description:
        'Visual style variant — `Default` uses a light (`#f9fafb`) background; `Primary` uses blue (`#1849a9`) with white text (maps to Figma prop "style")',
      table: { defaultValue: { summary: "'Default'" } },
    },
    showNavLinks: {
      control: 'boolean',
      description: 'Show/hide the nav links section (5 link groups + social/accessibility buttons)',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  args: {
    rtl:          false,
    variant:      'Default',
    showNavLinks: true,
  },
};

/* ── Playground ──────────────────────────────────────────── */

export const Playground = {};

/* ═══════════════════════════════════════════════════════════
   DESKTOP BREAKPOINT  (600px+)
   Figma nodes: 5005:14314 · 5005:14403 · 5005:14492 · 5005:14581
   ═══════════════════════════════════════════════════════════ */

export const DefaultLTR = {
  name: 'Default — LTR',
  parameters: {
    docs: {
      description: {
        story:
          'Light (`#f9fafb`) background, LTR layout. Five link groups + social/accessibility icon buttons on the left of the nav links row. Legal bar: footer links + copyright on the left, logo placeholders on the right. Divider: `#d2d6db`. **Breakpoint:** 600px+. Matches Figma node `5005:14314`.',
      },
    },
  },
  args: { rtl: false, variant: 'Default' },
};

export const DefaultRTL = {
  name: 'Default — RTL',
  parameters: {
    docs: {
      description: {
        story:
          'Light (`#f9fafb`) background, RTL layout. Arabic labels on all elements. Legal bar: logo placeholders on the left, Arabic copyright + links on the right. **Breakpoint:** 600px+. Matches Figma node `5005:14403`.',
      },
    },
  },
  args: { rtl: true, variant: 'Default' },
};

export const PrimaryLTR = {
  name: 'Primary — LTR',
  parameters: {
    docs: {
      description: {
        story:
          'Blue (`#1849a9`) background, LTR layout. All text is white (`#f9fafb`). Links are white, dividers are `rgba(255,255,255,0.3)`. Icon buttons have a transparent bg with a white border. **Breakpoint:** 600px+. Matches Figma node `5005:14492`.',
      },
    },
  },
  args: { rtl: false, variant: 'Primary' },
};

export const PrimaryRTL = {
  name: 'Primary — RTL',
  parameters: {
    docs: {
      description: {
        story:
          'Blue (`#1849a9`) background, RTL layout. White text and icons, Arabic labels. Logo placeholders on the left of the legal bar. **Breakpoint:** 600px+. Matches Figma node `5005:14581`.',
      },
    },
  },
  args: { rtl: true, variant: 'Primary' },
};

/* ═══════════════════════════════════════════════════════════
   MOBILE BREAKPOINT  (<600px)
   Viewport locked to 599px wide to trigger the CSS media query.
   Figma nodes: 5005:14670 · 5005:14756 · 5005:14842 · 5005:14928
   ═══════════════════════════════════════════════════════════ */

export const DefaultLTRMobile = {
  name: 'Default — LTR / Mobile',
  parameters: {
    ...MOBILE_VPTS,
    docs: {
      description: {
        story:
          'Light (`#f9fafb`) background, LTR layout at 599px width. Link groups form a 2-column grid, labels become semibold (600), dividers stretch full width, Social/Accessibility sub-groups appear side-by-side. Legal section stacks vertically and centers. **Breakpoint:** &lt;600px. Matches Figma node `5005:14670`.',
      },
    },
  },
  args: { rtl: false, variant: 'Default' },
};

export const DefaultRTLMobile = {
  name: 'Default — RTL / Mobile',
  parameters: {
    ...MOBILE_VPTS,
    docs: {
      description: {
        story:
          'Light (`#f9fafb`) background, RTL layout at 599px width. Arabic labels. 2-column link-group grid, semibold labels, centered legal section. **Breakpoint:** &lt;600px. Matches Figma node `5005:14756`.',
      },
    },
  },
  args: { rtl: true, variant: 'Default' },
};

export const PrimaryLTRMobile = {
  name: 'Primary — LTR / Mobile',
  parameters: {
    ...MOBILE_VPTS,
    docs: {
      description: {
        story:
          'Blue (`#1849a9`) background, LTR layout at 599px width. White text and white-border icon buttons. 2-column link-group grid, semibold labels, centered legal section. **Breakpoint:** &lt;600px. Matches Figma node `5005:14842`.',
      },
    },
  },
  args: { rtl: false, variant: 'Primary' },
};

export const PrimaryRTLMobile = {
  name: 'Primary — RTL / Mobile',
  parameters: {
    ...MOBILE_VPTS,
    docs: {
      description: {
        story:
          'Blue (`#1849a9`) background, RTL layout at 599px width. White text, Arabic labels. 2-column grid, semibold labels, centered legal section. **Breakpoint:** &lt;600px. Matches Figma node `5005:14928`.',
      },
    },
  },
  args: { rtl: true, variant: 'Primary' },
};

/* ═══════════════════════════════════════════════════════════
   OVERVIEW STORIES
   ═══════════════════════════════════════════════════════════ */

/* ── No Nav Links ────────────────────────────────────────── */

export const NoNavLinks = {
  name: 'No Nav Links',
  parameters: {
    docs: {
      description: {
        story:
          '`showNavLinks=false` — only the legal bar is displayed. Useful for minimal footer contexts.',
      },
    },
  },
  args: { rtl: false, variant: 'Default', showNavLinks: false },
};

/* ── Helper: section label ───────────────────────────────── */

const sectionLabel = (text, align = 'left') => ({
  margin: '0',
  padding: '6px 32px 2px',
  fontSize: 11,
  color: '#6c7c96',
  fontWeight: 600,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  textAlign: align,
  fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
});

/* ── All Variants — Desktop (600px+) ─────────────────────── */

export const AllVariants = {
  name: 'All Variants — Desktop',
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        story:
          'All 4 desktop variants (600px+) stacked: Default LTR, Default RTL, Primary LTR, Primary RTL. Figma nodes `5005:14314` – `5005:14581`.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', background: '#e5e7eb', gap: 12 }}>
      <div>
        <p style={sectionLabel('LTR — Default')}>LTR — Default</p>
        <Footer rtl={false} variant="Default" />
      </div>
      <div>
        <p style={sectionLabel('RTL — Default', 'right')}>RTL — Default</p>
        <Footer rtl={true} variant="Default" />
      </div>
      <div>
        <p style={sectionLabel('LTR — Primary')}>LTR — Primary</p>
        <Footer rtl={false} variant="Primary" />
      </div>
      <div>
        <p style={sectionLabel('RTL — Primary', 'right')}>RTL — Primary</p>
        <Footer rtl={true} variant="Primary" />
      </div>
    </div>
  ),
};

/* ── All Variants — Mobile (<600px) ─────────────────────── */

export const AllVariantsMobile = {
  name: 'All Variants — Mobile',
  parameters: {
    ...MOBILE_VPTS,
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        story:
          'All 4 mobile variants (<600px) stacked at 599px viewport width: Default LTR, Default RTL, Primary LTR, Primary RTL. Figma nodes `5005:14670` – `5005:14928`.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', background: '#e5e7eb', gap: 12 }}>
      <div>
        <p style={sectionLabel('LTR — Default (Mobile)')}>LTR — Default (Mobile)</p>
        <Footer rtl={false} variant="Default" />
      </div>
      <div>
        <p style={sectionLabel('RTL — Default (Mobile)', 'right')}>RTL — Default (Mobile)</p>
        <Footer rtl={true} variant="Default" />
      </div>
      <div>
        <p style={sectionLabel('LTR — Primary (Mobile)')}>LTR — Primary (Mobile)</p>
        <Footer rtl={false} variant="Primary" />
      </div>
      <div>
        <p style={sectionLabel('RTL — Primary (Mobile)', 'right')}>RTL — Primary (Mobile)</p>
        <Footer rtl={true} variant="Primary" />
      </div>
    </div>
  ),
};

/* ── Legal Only (all variants) ───────────────────────────── */

export const LegalOnlyVariants = {
  name: 'Legal Only — All Variants',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'All 4 variants with `showNavLinks=false`, showing only the legal bar. Useful for comparison of the legal section in isolation.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', background: '#e5e7eb', gap: 2 }}>
      <Footer rtl={false} variant="Default"  showNavLinks={false} />
      <Footer rtl={true}  variant="Default"  showNavLinks={false} />
      <Footer rtl={false} variant="Primary"  showNavLinks={false} />
      <Footer rtl={true}  variant="Primary"  showNavLinks={false} />
    </div>
  ),
};

/* ── Figma Reference ─────────────────────────────────────── */

export const FigmaReference = {
  name: 'Figma Reference — All 8 Variants',
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        story:
          'All 8 Figma variants rendered consecutively: 4 desktop (600px+) then 4 mobile (<600px, shown at full width for reference — switch to the individual mobile stories to see the responsive layout). Nodes `5005:14314` – `5005:14928`.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", background: '#e5e7eb', gap: 12 }}>
      <div>
        <p style={sectionLabel('Desktop 600px+', 'left')}>Desktop 600px+</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Footer rtl={false} variant="Default" />
          <Footer rtl={true}  variant="Default" />
          <Footer rtl={false} variant="Primary" />
          <Footer rtl={true}  variant="Primary" />
        </div>
      </div>
      <div>
        <p style={sectionLabel('Mobile &lt;600px (use mobile stories for live responsive view)')}>Mobile &lt;600px</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 599, margin: '0 auto', width: '100%' }}>
          <Footer rtl={false} variant="Default" />
          <Footer rtl={true}  variant="Default" />
          <Footer rtl={false} variant="Primary" />
          <Footer rtl={true}  variant="Primary" />
        </div>
      </div>
    </div>
  ),
};
