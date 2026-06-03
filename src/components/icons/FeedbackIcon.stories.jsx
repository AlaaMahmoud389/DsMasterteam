import { FeedbackIcon } from './FeedbackIcon';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4404-4429';

export default {
  title: 'Foundations/Icons/FeedbackIcon',
  component: FeedbackIcon,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    size: {
      control: 'select',
      options: [14, 16, 18, 20, 24],
      description: 'Rendered size in px (Figma default: 18)',
      table: { defaultValue: { summary: '18' } },
    },
    color: {
      control: 'color',
      description: 'Fill color — inherits currentColor when unset',
    },
  },
  args: {
    size: 18,
    color: '#3c5073',
  },
};

/* ── Playground ─────────────────────────────────────────────────── */

export const Playground = {};

/* ── Theme Colors ────────────────────────────────────────────────── */

export const ThemeColors = {
  name: 'Theme Colors',
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ padding: 12, background: '#ffffff', borderRadius: 8, border: '1px solid #e5e7eb', marginBottom: 8 }}>
          <FeedbackIcon size={18} color="#3c5073" />
        </div>
        <div style={{ fontSize: 11, color: '#6b7280', fontWeight: 600 }}>Light</div>
        <div style={{ fontSize: 10, color: '#9ca3af', fontFamily: 'monospace' }}>#3c5073</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ padding: 12, background: '#1f2a37', borderRadius: 8, marginBottom: 8 }}>
          <FeedbackIcon size={18} color="#b6bdca" />
        </div>
        <div style={{ fontSize: 11, color: '#6b7280', fontWeight: 600 }}>Dark</div>
        <div style={{ fontSize: 10, color: '#9ca3af', fontFamily: 'monospace' }}>#b6bdca</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ padding: 12, background: '#f4f5f7', borderRadius: 8, border: '1px solid #e5e7eb', marginBottom: 8 }}>
          <FeedbackIcon size={18} color="#d2d6db" />
        </div>
        <div style={{ fontSize: 11, color: '#6b7280', fontWeight: 600 }}>Default (Figma)</div>
        <div style={{ fontSize: 10, color: '#9ca3af', fontFamily: 'monospace' }}>#d2d6db</div>
      </div>
    </div>
  ),
};

/* ── Sizes ──────────────────────────────────────────────────────── */

export const Sizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: 16, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[14, 16, 18, 20, 24].map((s) => (
        <div key={s} style={{ textAlign: 'center' }}>
          <FeedbackIcon size={s} color="#3c5073" />
          <div style={{ fontSize: 10, color: '#6b7280', marginTop: 6 }}>{s}px</div>
        </div>
      ))}
    </div>
  ),
};

/* ── Tooltip Context ─────────────────────────────────────────────── */

export const TooltipContext = {
  name: 'In Tooltip Context',
  render: () => (
    <div style={{ display: 'flex', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {/* Light */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Light</div>
        <div style={{
          display: 'inline-flex', gap: 8, padding: 8,
          background: '#ffffff', borderRadius: 4,
          boxShadow: '0px 2px 4px rgba(16,24,40,0.08), 0px 8px 20px rgba(16,24,40,0.14)',
          width: 240, boxSizing: 'border-box',
        }}>
          <FeedbackIcon size={18} color="#3c5073" />
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#000b36', lineHeight: '18px' }}>Tooltip title</p>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 400, color: '#3c5073', lineHeight: '18px' }}>Max width of tooltips is 240px - text will wrap automatically</p>
          </div>
        </div>
      </div>

      {/* Dark */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Dark</div>
        <div style={{
          display: 'inline-flex', gap: 8, padding: 8,
          background: '#1f2a37', borderRadius: 4,
          boxShadow: '0px 2px 4px rgba(16,24,40,0.08), 0px 8px 20px rgba(16,24,40,0.14)',
          width: 240, boxSizing: 'border-box',
        }}>
          <FeedbackIcon size={18} color="#b6bdca" />
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#f9fafb', lineHeight: '18px' }}>Tooltip title</p>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 400, color: '#b6bdca', lineHeight: '18px' }}>Max width of tooltips is 240px - text will wrap automatically</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};
