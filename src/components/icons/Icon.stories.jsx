import { Icon, ICON_NAMES } from './Icon';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=258-3';

export default {
  title: 'Foundations/Icons/Icon',
  component: Icon,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    name: {
      control: 'select',
      options: ICON_NAMES,
      description: 'Icon name from Huge Icon Set v2.0 · Sharp style',
    },
    size: {
      control: 'select',
      options: [16, 20, 24, 32],
      description: 'Icon size in px (16 / 20 / 24 / 32)',
      table: { defaultValue: { summary: '24' } },
    },
    color: {
      control: 'color',
      description: 'CSS color — overrides currentColor',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label (required for standalone icons)',
    },
  },
  args: {
    name: 'arrow-right',
    size: 24,
  },
};

/* ── Playground ─────────────────────────────────────────────────── */

export const Playground = {};

/* ── Sizes ──────────────────────────────────────────────────────── */

export const Sizes = {
  name: 'All Sizes',
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: 16 }}>
      {[16, 20, 24, 32].map((s) => (
        <div key={s} style={{ textAlign: 'center' }}>
          <Icon {...args} size={s} />
          <div style={{ fontSize: 10, color: '#6b7280', marginTop: 6 }}>{s}px</div>
        </div>
      ))}
    </div>
  ),
  args: { name: 'arrow-right' },
};

/* ── All Icons Gallery ───────────────────────────────────────────── */

const GROUPS = {
  'Arrows': ['arrow-right', 'arrow-left', 'arrow-up', 'arrow-down', 'arrow-up-right', 'arrow-down-left', 'arrow-reload'],
  'Chevrons': ['chevron-right', 'chevron-left', 'chevron-up', 'chevron-down', 'chevron-right-double', 'chevron-left-double'],
  'Actions': ['cancel', 'cancel-circle', 'add', 'add-circle', 'minus', 'minus-circle', 'tick', 'tick-double', 'tick-circle'],
  'Edit': ['edit', 'delete', 'copy'],
  'Search & Filter': ['search', 'filter', 'sort'],
  'Eye': ['eye', 'eye-off'],
  'Home & Navigation': ['home', 'link', 'external-link'],
  'User': ['user', 'user-circle', 'users'],
  'Notifications': ['bell', 'bell-off', 'notification', 'alert', 'information-circle', 'help-circle'],
  'Settings': ['setting'],
  'Media': ['star', 'heart', 'bookmark'],
  'Calendar & Time': ['calendar', 'time'],
  'Transfer': ['download', 'upload', 'share'],
  'Layout': ['grid', 'list', 'menu', 'more-horizontal', 'more-vertical'],
  'Communication': ['message', 'mail', 'phone'],
  'Data': ['chart-bar', 'chart-line', 'database'],
};

export const Gallery = {
  name: 'Full Gallery',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {Object.entries(GROUPS).map(([group, names]) => (
        <div key={group} style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: '#6b7280', marginBottom: 12 }}>
            {group}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {names.map((name) => (
              <div
                key={name}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  padding: '12px 10px', border: '1px solid #e5e7eb', borderRadius: 8,
                  minWidth: 72, background: '#fff', cursor: 'default',
                }}
                title={name}
              >
                <Icon name={name} size={24} style={{ color: '#1849a9' }} />
                <span style={{ fontSize: 9, color: '#6b7280', textAlign: 'center', lineHeight: 1.3, maxWidth: 64, wordBreak: 'break-all' }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};

/* ── RTL Directional ─────────────────────────────────────────────── */

export const RTLDirectional = {
  name: 'RTL Mirroring',
  render: () => (
    <div style={{ display: 'flex', gap: 48, padding: 16, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {['arrow-right', 'arrow-left', 'arrow-up-right', 'chevron-right', 'external-link'].map((name) => (
        <div key={name} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: '#1849a9', fontWeight: 600, marginBottom: 8 }}>LTR</div>
          <Icon name={name} size={24} style={{ color: '#374151', display: 'block', margin: '0 auto 12px' }} />
          <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 8 }}>RTL (mirrored)</div>
          <Icon name={name} size={24} style={{ color: '#374151', display: 'block', margin: '0 auto 12px', transform: 'scaleX(-1)' }} />
          <div style={{ fontSize: 9, color: '#9ca3af' }}>{name}</div>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};

/* ── Colors ─────────────────────────────────────────────────────── */

export const Colors = {
  name: 'Color Variants',
  render: () => {
    const colors = [
      { label: 'Primary', value: '#1849a9' },
      { label: 'Error', value: '#dc2626' },
      { label: 'Success', value: '#16a34a' },
      { label: 'Warning', value: '#d97706' },
      { label: 'Muted', value: '#9ca3af' },
    ];
    return (
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', padding: 16, flexWrap: 'wrap' }}>
        {colors.map(({ label, value }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <Icon name="bell" size={24} color={value} />
            <div style={{ fontSize: 10, color: '#6b7280', marginTop: 6 }}>{label}</div>
            <div style={{ fontSize: 9, color: '#d1d5db', fontFamily: 'monospace' }}>{value}</div>
          </div>
        ))}
      </div>
    );
  },
  parameters: { layout: 'padded' },
};
