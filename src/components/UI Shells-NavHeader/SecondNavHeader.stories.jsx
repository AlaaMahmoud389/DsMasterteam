import { SecondNavHeader } from './SecondNavHeader';
import { Icon } from '../icons/Icon';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=5005-13162';

/* ── Default export ──────────────────────────────────────── */

export default {
  title: 'UI Shells/Secondary Nav Header',
  component: SecondNavHeader,
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    rtl: {
      control: 'boolean',
      description: 'Right-to-left layout — reverses content order; actions move to the left, text rendered right-to-left',
      table: { defaultValue: { summary: 'false' } },
    },
    variant: {
      control: 'select',
      options: ['Gray', 'Primary'],
      description: 'Visual style variant — `Gray` uses a white background with dark text; `Primary` uses a blue (`#1849a9`) background with white text (maps to Figma prop "style")',
      table: { defaultValue: { summary: "'Gray'" } },
    },
    showContent: {
      control: 'boolean',
      description: 'Show/hide content item 1 — weather label ("Cloudy" / "غائم")',
      table: { category: 'Content Items', defaultValue: { summary: 'true' } },
    },
    showItem2: {
      control: 'boolean',
      description: 'Show/hide content item 2 — date label ("3-Sep-2024" / "3-سبتمبر-2024")',
      table: { category: 'Content Items', defaultValue: { summary: 'true' } },
    },
    showItem3: {
      control: 'boolean',
      description: 'Show/hide content item 3 — time label ("2:30 PM" / "2:30 مساءً")',
      table: { category: 'Content Items', defaultValue: { summary: 'true' } },
    },
    showItem4: {
      control: 'boolean',
      description: 'Show/hide content item 4 — location label ("Al-Riyadh" / "الرياض")',
      table: { category: 'Content Items', defaultValue: { summary: 'true' } },
    },
    showActions: {
      control: 'boolean',
      description: 'Show/hide the entire actions area',
      table: { category: 'Action Buttons', defaultValue: { summary: 'true' } },
    },
    showAction4: {
      control: 'boolean',
      description: 'Show/hide action button 1 — mic-01 (record audio)',
      table: { category: 'Action Buttons', defaultValue: { summary: 'true' } },
    },
    showAction3: {
      control: 'boolean',
      description: 'Show/hide action button 2 — zoom-out-area (reduce/minimize view)',
      table: { category: 'Action Buttons', defaultValue: { summary: 'true' } },
    },
    showAction2: {
      control: 'boolean',
      description: 'Show/hide action button 3 — zoom-in-area (expand/enlarge view)',
      table: { category: 'Action Buttons', defaultValue: { summary: 'true' } },
    },
    showDivider: {
      control: 'boolean',
      description: 'Show/hide the 1px bottom divider line',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  args: {
    rtl:         false,
    variant:     'Gray',
    showContent: true,
    showItem2:   true,
    showItem3:   true,
    showItem4:   true,
    showActions: true,
    showAction4: true,
    showAction3: true,
    showAction2: true,
    showDivider: true,
  },
};

/* ── Playground ──────────────────────────────────────────── */

export const Playground = {};

/* ── LTR Gray ────────────────────────────────────────────── */

export const DefaultLTRGray = {
  name: 'Default — LTR Gray',
  parameters: {
    docs: {
      description: {
        story:
          'White background, LTR layout. Content items (cloud-loading icon + label) on the left; three icon-only action buttons (mic, zoom-out, zoom-in) on the right. Bottom divider: `#e5e7eb`. Matches Figma node `5005:13163`.',
      },
    },
  },
  args: { rtl: false, variant: 'Gray' },
};

/* ── RTL Gray ────────────────────────────────────────────── */

export const DefaultRTLGray = {
  name: 'Default — RTL Gray',
  parameters: {
    docs: {
      description: {
        story:
          'White background, RTL layout. Action buttons on the left; Arabic-labelled content items on the right (icon after text). Matches Figma node `5005:13176`.',
      },
    },
  },
  args: { rtl: true, variant: 'Gray' },
};

/* ── LTR Primary ─────────────────────────────────────────── */

export const DefaultLTRPrimary = {
  name: 'Default — LTR Primary',
  parameters: {
    docs: {
      description: {
        story:
          'Blue (`#1849a9`) background, LTR layout. All text and icons are white (`#f9fafb`). Bottom divider: white. Matches Figma node `5005:13189`.',
      },
    },
  },
  args: { rtl: false, variant: 'Primary' },
};

/* ── RTL Primary ─────────────────────────────────────────── */

export const DefaultRTLPrimary = {
  name: 'Default — RTL Primary',
  parameters: {
    docs: {
      description: {
        story:
          'Blue (`#1849a9`) background, RTL layout. White text and icons, Arabic labels. Matches Figma node `5005:13202`.',
      },
    },
  },
  args: { rtl: true, variant: 'Primary' },
};

/* ── All 4 variants stacked ──────────────────────────────── */

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

export const AllVariants = {
  name: 'All Variants',
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        story:
          'All 4 Figma variants stacked: LTR Gray, RTL Gray, LTR Primary, RTL Primary. Visual reference against Figma node `5005:13162`.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', background: '#f3f4f6', gap: 12, paddingBottom: 16 }}>
      <div>
        <p style={sectionLabel('LTR — Gray')}>LTR — Gray</p>
        <SecondNavHeader rtl={false} variant="Gray" />
      </div>
      <div>
        <p style={sectionLabel('RTL — Gray', 'right')}>RTL — Gray</p>
        <SecondNavHeader rtl={true} variant="Gray" />
      </div>
      <div>
        <p style={sectionLabel('LTR — Primary')}>LTR — Primary</p>
        <SecondNavHeader rtl={false} variant="Primary" />
      </div>
      <div>
        <p style={sectionLabel('RTL — Primary', 'right')}>RTL — Primary</p>
        <SecondNavHeader rtl={true} variant="Primary" />
      </div>
    </div>
  ),
};

/* ── Actions only ────────────────────────────────────────── */

export const ActionsOnly = {
  name: 'Actions Only',
  parameters: {
    docs: {
      description: {
        story: 'All content items hidden — only the three icon-only action buttons remain.',
      },
    },
  },
  args: {
    rtl:         false,
    variant:     'Gray',
    showContent: false,
    showItem2:   false,
    showItem3:   false,
    showItem4:   false,
  },
};

/* ── Content only ────────────────────────────────────────── */

export const ContentOnly = {
  name: 'Content Only',
  parameters: {
    docs: {
      description: {
        story: 'Action buttons hidden — only the four contextual content items are visible.',
      },
    },
  },
  args: {
    rtl:         false,
    variant:     'Gray',
    showActions: false,
  },
};

/* ── Partial items ───────────────────────────────────────── */

export const PartialItems = {
  name: 'Partial Items',
  parameters: {
    docs: {
      description: {
        story: 'Only item 1 (weather) and item 3 (time) visible, with action buttons 1 and 3 only.',
      },
    },
  },
  args: {
    rtl:         false,
    variant:     'Gray',
    showContent: true,
    showItem2:   false,
    showItem3:   true,
    showItem4:   false,
    showAction4: true,
    showAction3: true,
    showAction2: false,
  },
};

/* ── No divider ──────────────────────────────────────────── */

export const NoDivider = {
  name: 'No Divider',
  parameters: {
    docs: {
      description: {
        story: '`showDivider=false` — the bottom 1px separator is hidden. Useful when the SecondNavHeader is not directly adjacent to another element.',
      },
    },
  },
  args: { rtl: false, variant: 'Gray', showDivider: false },
};

/* ── Icons Reference ─────────────────────────────────────── */
/* Shows every icon imported from Figma node 5005:13162,
   in both colour contexts, at the exact Figma sizes.       */

const ICON_REF = [
  { name: 'cloud-loading', size: 24, usage: 'Content item — weather / context indicator (×4)' },
  { name: 'mic-01',        size: 20, usage: 'Action button 1 — record audio'                  },
  { name: 'zoom-out-area', size: 20, usage: 'Action button 2 — reduce / minimize view'        },
  { name: 'zoom-in-area',  size: 20, usage: 'Action button 3 — expand / enlarge view'         },
];

export const IconsReference = {
  name: 'Icons Reference',
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=5005-13162',
    },
    docs: {
      description: {
        story:
          'All icons imported from Figma node `5005:13162` (SecondNavHeader). ' +
          '`cloud-loading` (24px) appears once per content item; ' +
          '`mic-01`, `zoom-out-area`, `zoom-in-area` (20px each) are the three action buttons. ' +
          'Shown in both the **Gray** (`#000b36`) and **Primary** (`#f9fafb` on `#1849a9`) colour contexts. ' +
          'See also: **Foundations › Icons › Icon › SecondNavHeader Icons**.',
      },
    },
  },
  render: () => {
    const card = (bg, border) => ({
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      padding: '14px 12px', borderRadius: 8, minWidth: 108,
      background: bg, border,
    });
    const lbl = (color) => ({
      fontSize: 9, color, textAlign: 'center', lineHeight: 1.3,
      fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
      maxWidth: 96, wordBreak: 'break-all',
    });
    const note = (color) => ({
      fontSize: 8, color, textAlign: 'center', lineHeight: 1.4,
      fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
      maxWidth: 96,
    });
    const heading = (text) => (
      <div style={{
        fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '.08em', color: '#6b7280', marginBottom: 10,
        fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
      }}>
        {text}
      </div>
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        {/* Gray (#000b36) */}
        <div>
          {heading('Gray context — color: #000b36')}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ICON_REF.map(({ name, size, usage }) => (
              <div key={name} style={card('#fff', '1px solid #e5e7eb')}>
                <Icon name={name} size={size} color="#000b36" />
                <span style={lbl('#374151')}>{name}</span>
                <span style={note('#9ca3af')}>{size}px</span>
                <span style={note('#9ca3af')}>{usage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Primary (#f9fafb on blue) */}
        <div>
          {heading('Primary context — color: #f9fafb  (on #1849a9)')}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ICON_REF.map(({ name, size, usage }) => (
              <div key={name} style={card('#1849a9', 'none')}>
                <Icon name={name} size={size} color="#f9fafb" />
                <span style={lbl('#e5e7eb')}>{name}</span>
                <span style={note('rgba(255,255,255,.5)')}>{size}px</span>
                <span style={note('rgba(255,255,255,.5)')}>{usage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* In-context preview */}
        <div>
          {heading('In-context preview — all 4 variants')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <SecondNavHeader rtl={false} variant="Gray" />
            <SecondNavHeader rtl={true}  variant="Gray" />
            <SecondNavHeader rtl={false} variant="Primary" />
            <SecondNavHeader rtl={true}  variant="Primary" />
          </div>
        </div>
      </div>
    );
  },
};

/* ── Figma Reference ─────────────────────────────────────── */

export const FigmaReference = {
  name: 'Figma Reference — All 4 Variants',
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        story:
          'Direct pixel comparison against Figma node `5005:13162`. Shows all 4 variants rendered consecutively without labels.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <SecondNavHeader rtl={false} variant="Gray" />
      <SecondNavHeader rtl={true}  variant="Gray" />
      <SecondNavHeader rtl={false} variant="Primary" />
      <SecondNavHeader rtl={true}  variant="Primary" />
    </div>
  ),
};
