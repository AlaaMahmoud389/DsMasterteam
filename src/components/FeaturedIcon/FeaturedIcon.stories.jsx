import React from 'react';
import { FeaturedIcon } from './FeaturedIcon';
import { Icon, ICON_NAMES } from '../icons/Icon';

/* ── Shared data ─────────────────────────────────────────────── */
const ALL_COLORS = ['default', 'info', 'success', 'warning', 'error', 'brand', 'gray-attention'];
const ALL_SIZES  = ['sm', 'md', 'lg', 'xl'];

const COLOR_ICON = {
  'default':        'setting',
  'info':           'information-circle',
  'success':        'tick-circle',
  'warning':        'alert',
  'error':          'cancel-circle',
  'brand':          'star',
  'gray-attention': 'bell',
};

const COLOR_LABEL = {
  'default':        'Default',
  'info':           'Info',
  'success':        'Success',
  'warning':        'Warning',
  'error':          'Error',
  'brand':          'Brand',
  'gray-attention': 'Gray-attention',
};

/* ── Story meta ─────────────────────────────────────────────── */

export default {
  title: 'Components/FeaturedIcon',
  component: FeaturedIcon,
  parameters: { layout: 'padded' },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Container + icon size',
    },
    color: {
      control: 'radio',
      options: ALL_COLORS,
      description: 'Semantic color token',
    },
    circle: {
      control: 'boolean',
      description: 'true → full circle  ·  false → 4 px rounded rect',
    },
    onColor: {
      control: 'boolean',
      description: 'true → colored background fill  ·  false → white bg with border',
    },
    icon: {
      control: 'radio',
      options: ICON_NAMES,
      description: 'Icon name from the design-system registry',
    },
  },
};

/* ── Playground ─────────────────────────────────────────────── */
export const Playground = {
  args: {
    size:    'md',
    color:   'brand',
    circle:  false,
    onColor: true,
    icon:    'star',
  },
  render: (args) => (
    <div style={{
      fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
      background: args.onColor ? '#00001c' : '#ffffff',
      padding: 24,
      borderRadius: 8,
      display: 'inline-flex',
    }}>
      <FeaturedIcon {...args} />
    </div>
  ),
};

/* ── Colors — OnColor=Yes ────────────────────────────────────── */
export const ColorsOnBackground = {
  name: 'Colors — OnColor=Yes (on #00001C)',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", background: '#00001c', padding: 24, borderRadius: 8, display: 'inline-flex', gap: 20, flexWrap: 'wrap' }}>
      {ALL_COLORS.map((color) => (
        <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <FeaturedIcon size="md" color={color} onColor icon={COLOR_ICON[color]} />
          <span style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>{COLOR_LABEL[color]}</span>
        </div>
      ))}
    </div>
  ),
};

/* ── Colors — OnColor=No ─────────────────────────────────────── */
export const ColorsWhiteBackground = {
  name: 'Colors — OnColor=No (white background + border)',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      {ALL_COLORS.map((color) => (
        <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <FeaturedIcon size="md" color={color} onColor={false} icon={COLOR_ICON[color]} />
          <span style={{ fontSize: 11, color: '#6b7280', textAlign: 'center' }}>{COLOR_LABEL[color]}</span>
        </div>
      ))}
    </div>
  ),
};

/* ── Sizes ───────────────────────────────────────────────────── */
export const Sizes = {
  name: 'Sizes — Small · Medium · Large · X Large',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>OnColor=Yes</p>
        <div style={{ background: '#00001c', padding: '16px 20px', borderRadius: 8, display: 'inline-flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {ALL_SIZES.map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <FeaturedIcon size={size} color="brand" onColor icon="star" />
              <span style={{ fontSize: 11, color: '#9ca3af' }}>
                {size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : size === 'lg' ? 'Large' : 'X Large'}
              </span>
              <span style={{ fontSize: 10, color: '#6b7280' }}>
                {size === 'sm' ? '32px' : size === 'md' ? '40px' : size === 'lg' ? '48px' : '56px'}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>OnColor=No</p>
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {ALL_SIZES.map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <FeaturedIcon size={size} color="brand" onColor={false} icon="star" />
              <span style={{ fontSize: 11, color: '#6b7280' }}>
                {size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : size === 'lg' ? 'Large' : 'X Large'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

/* ── Shape — Circle vs Rounded Rect ─────────────────────────── */
export const Shape = {
  name: 'Shape — Circle=Yes vs Circle=No',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Circle=No — 4 px rounded rect</p>
        <div style={{ background: '#00001c', padding: '16px 20px', borderRadius: 8, display: 'inline-flex', gap: 14, flexWrap: 'wrap' }}>
          {ALL_COLORS.map((color) => (
            <FeaturedIcon key={color} size="md" color={color} circle={false} onColor icon={COLOR_ICON[color]} />
          ))}
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Circle=Yes — full circle (50%)</p>
        <div style={{ background: '#00001c', padding: '16px 20px', borderRadius: 8, display: 'inline-flex', gap: 14, flexWrap: 'wrap' }}>
          {ALL_COLORS.map((color) => (
            <FeaturedIcon key={color} size="md" color={color} circle onColor icon={COLOR_ICON[color]} />
          ))}
        </div>
      </div>
    </div>
  ),
};

/* ── OnColor modes side-by-side ──────────────────────────────── */
export const OnColorModes = {
  name: 'OnColor — Yes vs No side by side',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>OnColor=Yes — #00001C surface</p>
        <div style={{ background: '#00001c', padding: '16px 20px', borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {ALL_COLORS.map((color) => (
              <FeaturedIcon key={color} size="md" color={color} onColor icon={COLOR_ICON[color]} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {ALL_COLORS.map((color) => (
              <FeaturedIcon key={color} size="md" color={color} onColor circle icon={COLOR_ICON[color]} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>OnColor=No — light background</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {ALL_COLORS.map((color) => (
              <FeaturedIcon key={color} size="md" color={color} onColor={false} icon={COLOR_ICON[color]} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {ALL_COLORS.map((color) => (
              <FeaturedIcon key={color} size="md" color={color} onColor={false} circle icon={COLOR_ICON[color]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

/* ── Sizes Matrix ────────────────────────────────────────────── */
export const SizesMatrix = {
  name: 'Matrix — All Sizes × Circle × OnColor (Brand)',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", display: 'flex', flexDirection: 'column', gap: 28 }}>
      {ALL_SIZES.map((size) => (
        <div key={size}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>
            {size === 'sm' ? 'Small (32px)' : size === 'md' ? 'Medium (40px)' : size === 'lg' ? 'Large (48px)' : 'X Large (56px)'}
          </p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ background: '#00001c', padding: '12px 16px', borderRadius: 8, display: 'flex', gap: 16, alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <FeaturedIcon size={size} color="brand" circle={false} onColor icon="star" />
                <span style={{ fontSize: 10, color: '#9ca3af' }}>Rect · OnColor</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <FeaturedIcon size={size} color="brand" circle onColor icon="star" />
                <span style={{ fontSize: 10, color: '#9ca3af' }}>Circle · OnColor</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <FeaturedIcon size={size} color="brand" circle={false} onColor={false} icon="star" />
                <span style={{ fontSize: 10, color: '#9ca3af' }}>Rect · No BG</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <FeaturedIcon size={size} color="brand" circle onColor={false} icon="star" />
                <span style={{ fontSize: 10, color: '#9ca3af' }}>Circle · No BG</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── Full Color × Shape × OnColor matrix ─────────────────────── */
export const FullMatrix = {
  name: 'Full Matrix — All Colors × Shape × Mode',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", display: 'flex', flexDirection: 'column', gap: 24 }}>
      {ALL_COLORS.map((color) => (
        <div key={color}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>
            {COLOR_LABEL[color]}
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ background: '#00001c', padding: '12px 16px', borderRadius: 8, display: 'flex', gap: 16 }}>
              {[false, true].map((circ) => (
                <div key={`on-${circ}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <FeaturedIcon size="md" color={color} circle={circ} onColor icon={COLOR_ICON[color]} />
                  <span style={{ fontSize: 10, color: '#9ca3af' }}>{circ ? 'Circle' : 'Rect'} · Yes</span>
                </div>
              ))}
            </div>
            {[false, true].map((circ) => (
              <div key={`off-${circ}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <FeaturedIcon size="md" color={color} circle={circ} onColor={false} icon={COLOR_ICON[color]} />
                <span style={{ fontSize: 10, color: '#9ca3af' }}>{circ ? 'Circle' : 'Rect'} · No</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── In Context ──────────────────────────────────────────────── */
export const InContext = {
  name: 'In Context — Cards and alerts',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 560 }}>
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, display: 'flex', gap: 16, alignItems: 'flex-start', background: '#fff' }}>
        <FeaturedIcon size="md" color="success" onColor icon="tick-circle" />
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 4 }}>Payment confirmed</div>
          <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>Your payment of $240.00 was processed successfully.</div>
        </div>
      </div>
      <div style={{ border: '1px solid #fedf89', borderRadius: 8, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start', background: '#fffaeb' }}>
        <FeaturedIcon size="sm" color="warning" onColor icon="alert" />
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#92400e', marginBottom: 2 }}>Session expiring soon</div>
          <div style={{ fontSize: 12, color: '#92400e', lineHeight: 1.5 }}>You will be logged out in 5 minutes due to inactivity.</div>
        </div>
      </div>
      <div style={{ border: '1px solid #fda29b', borderRadius: 8, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start', background: '#fef3f2' }}>
        <FeaturedIcon size="sm" color="error" onColor icon="cancel-circle" />
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#b42318', marginBottom: 2 }}>Upload failed</div>
          <div style={{ fontSize: 12, color: '#b42318', lineHeight: 1.5 }}>File size exceeds the 10 MB limit. Please try again.</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {[
          { color: 'brand',   icon: 'star',               label: 'Premium',  desc: 'Exclusive features' },
          { color: 'info',    icon: 'information-circle',  label: 'Updates',  desc: 'Latest changes' },
          { color: 'success', icon: 'tick-circle',          label: 'Verified', desc: 'Trusted source' },
        ].map(({ color, icon, label, desc }) => (
          <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: '1 1 120px' }}>
            <FeaturedIcon size="lg" color={color} circle onColor icon={icon} />
            <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{label}</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ── Custom children ─────────────────────────────────────────── */
export const CustomChildren = {
  name: 'Custom children — pass any SVG / icon element',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <FeaturedIcon size="md" color="info" onColor>
          <Icon name="download" size={20} />
        </FeaturedIcon>
        <span style={{ fontSize: 11, color: '#6b7280' }}>Via children</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <FeaturedIcon size="md" color="success" circle onColor>
          <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </FeaturedIcon>
        <span style={{ fontSize: 11, color: '#6b7280' }}>Custom SVG</span>
      </div>
    </div>
  ),
};
