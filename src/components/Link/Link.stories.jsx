import React from 'react';
import { Link } from './Link';

export default {
  title: 'Components/Link',
  component: Link,
  parameters: { layout: 'padded' },
  argTypes: {
    style:    { control: 'radio', options: ['primary', 'neutral', 'on-color'] },
    size:     { control: 'radio', options: ['medium', 'small'] },
    inline:   { control: 'boolean' },
    icon:     { control: 'boolean' },
    disabled: { control: 'boolean' },
    rtl:      { control: 'boolean' },
  },
};

/* ── Playground ─────────────────────────────────────────────── */
export const Playground = {
  args: {
    children: 'Link',
    href: '#',
    style: 'primary',
    size: 'medium',
    inline: false,
    icon: false,
    disabled: false,
    rtl: false,
  },
  render: (args) => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 16 }}>
      <Link {...args} />
    </div>
  ),
};

/* ── Style=Primary — All states ─────────────────────────────── */
export const PrimaryStates = {
  name: 'Style=Primary — All states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { label: 'Default',  extra: {} },
        { label: 'Hovered',  extra: { className: 'force-hover' }, hint: '(apply :hover in browser)' },
        { label: 'Pressed',  extra: {}, hint: '(apply :active in browser)' },
        { label: 'Focused',  extra: {}, hint: '(Tab to focus)' },
        { label: 'Visited',  extra: {}, hint: '(browser-tracked)' },
        { label: 'Disabled', extra: { disabled: true } },
      ].map(({ label, extra, hint }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ display: 'inline-block', width: 70, fontSize: 12, fontWeight: 600, color: '#6C7C96', flexShrink: 0 }}>{label}</span>
          <Link href="#" style="primary" size="medium" {...extra}>Link</Link>
          {hint && <span style={{ fontSize: 11, color: '#d1d5db' }}>{hint}</span>}
        </div>
      ))}
    </div>
  ),
};

/* ── Style=Neutral — All states ─────────────────────────────── */
export const NeutralStates = {
  name: 'Style=Neutral — All states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { label: 'Default',  extra: {} },
        { label: 'Hovered',  hint: '(apply :hover)' },
        { label: 'Pressed',  hint: '(apply :active)' },
        { label: 'Focused',  hint: '(Tab to focus)' },
        { label: 'Visited',  hint: '(browser-tracked)' },
        { label: 'Disabled', extra: { disabled: true } },
      ].map(({ label, extra = {}, hint }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ display: 'inline-block', width: 70, fontSize: 12, fontWeight: 600, color: '#6C7C96', flexShrink: 0 }}>{label}</span>
          <Link href="#" style="neutral" size="medium" {...extra}>Link</Link>
          {hint && <span style={{ fontSize: 11, color: '#d1d5db' }}>{hint}</span>}
        </div>
      ))}
    </div>
  ),
};

/* ── Style=On-color — All states ────────────────────────────── */
export const OnColorStates = {
  name: 'Style=On-color — All states',
  render: () => (
    <div style={{ background: '#000b36', padding: 24, borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", maxWidth: 360 }}>
      {[
        { label: 'Default',  extra: {} },
        { label: 'Hovered',  hint: '(apply :hover)' },
        { label: 'Pressed',  hint: '(apply :active)' },
        { label: 'Focused',  hint: '(Tab to focus)' },
        { label: 'Visited',  hint: '(browser-tracked)' },
        { label: 'Disabled', extra: { disabled: true } },
      ].map(({ label, extra = {}, hint }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ display: 'inline-block', width: 70, fontSize: 12, fontWeight: 600, color: '#6C7C96', flexShrink: 0 }}>{label}</span>
          <Link href="#" style="on-color" size="medium" {...extra}>Link</Link>
          {hint && <span style={{ fontSize: 11, color: '#4b5563' }}>{hint}</span>}
        </div>
      ))}
    </div>
  ),
};

/* ── Size — Medium & Small ──────────────────────────────────── */
export const Sizes = {
  name: 'Size — Medium & Small',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Medium (16px)</p>
          <Link href="#" style="primary" size="medium">Link</Link>
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Small (14px)</p>
          <Link href="#" style="primary" size="small">Link</Link>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Neutral Medium</p>
          <Link href="#" style="neutral" size="medium">Link</Link>
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Neutral Small</p>
          <Link href="#" style="neutral" size="small">Link</Link>
        </div>
      </div>
    </div>
  ),
};

/* ── Inline — Off vs On ─────────────────────────────────────── */
export const InlineVariants = {
  name: 'Inline — Off vs On',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Inline = False (no underline by default)</p>
        <p style={{ margin: 0, fontSize: 16, color: '#111827', lineHeight: '24px' }}>
          Visit our{' '}
          <Link href="#" style="primary" size="medium" inline={false}>documentation</Link>
          {' '}for more information.
        </p>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Inline = True (always underlined — for use within body text)</p>
        <p style={{ margin: 0, fontSize: 16, color: '#111827', lineHeight: '24px' }}>
          Visit our{' '}
          <Link href="#" style="primary" size="medium" inline={true}>documentation</Link>
          {' '}for more information.
        </p>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Neutral Inline = True</p>
        <p style={{ margin: 0, fontSize: 16, color: '#111827', lineHeight: '24px' }}>
          Read the full{' '}
          <Link href="#" style="neutral" size="medium" inline={true}>terms and conditions</Link>
          {' '}before proceeding.
        </p>
      </div>
    </div>
  ),
};

/* ── Icon — Trailing icon ───────────────────────────────────── */
export const WithIcon = {
  name: 'Icon — Trailing icon',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Primary — Medium — Icon</p>
        <Link href="#" style="primary" size="medium" icon>Link</Link>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Primary — Small — Icon</p>
        <Link href="#" style="primary" size="small" icon>Link</Link>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Neutral — Medium — Icon</p>
        <Link href="#" style="neutral" size="medium" icon>Link</Link>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Primary — Inline + Icon</p>
        <Link href="#" style="primary" size="medium" inline icon>Link</Link>
      </div>
    </div>
  ),
};

/* ── RTL — Right-to-left ────────────────────────────────────── */
export const RTLVariants = {
  name: 'RTL — Right-to-left',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Primary — RTL — Medium</p>
        <Link href="#" style="primary" size="medium" rtl>رابط</Link>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Neutral — RTL — Medium</p>
        <Link href="#" style="neutral" size="medium" rtl>رابط</Link>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Primary — RTL — Icon</p>
        <Link href="#" style="primary" size="medium" rtl icon>رابط</Link>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Primary — RTL — Inline</p>
        <Link href="#" style="primary" size="medium" rtl inline>رابط</Link>
      </div>
    </div>
  ),
};

/* ── Style × Size matrix ────────────────────────────────────── */
export const StyleMatrix = {
  name: 'Style × Size matrix',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <table style={{ borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ padding: '6px 16px', textAlign: 'left', color: '#6C7C96', fontWeight: 600, fontSize: 12 }}>Style</th>
            <th style={{ padding: '6px 16px', textAlign: 'left', color: '#6C7C96', fontWeight: 600, fontSize: 12 }}>Medium</th>
            <th style={{ padding: '6px 16px', textAlign: 'left', color: '#6C7C96', fontWeight: 600, fontSize: 12 }}>Small</th>
            <th style={{ padding: '6px 16px', textAlign: 'left', color: '#6C7C96', fontWeight: 600, fontSize: 12 }}>Medium + Inline</th>
            <th style={{ padding: '6px 16px', textAlign: 'left', color: '#6C7C96', fontWeight: 600, fontSize: 12 }}>Medium + Icon</th>
          </tr>
        </thead>
        <tbody>
          {['primary', 'neutral'].map((s) => (
            <tr key={s} style={{ borderTop: '1px solid #f3f4f6' }}>
              <td style={{ padding: '12px 16px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>{s}</td>
              <td style={{ padding: '12px 16px' }}><Link href="#" style={s} size="medium">Link</Link></td>
              <td style={{ padding: '12px 16px' }}><Link href="#" style={s} size="small">Link</Link></td>
              <td style={{ padding: '12px 16px' }}><Link href="#" style={s} size="medium" inline>Link</Link></td>
              <td style={{ padding: '12px 16px' }}><Link href="#" style={s} size="medium" icon>Link</Link></td>
            </tr>
          ))}
          <tr style={{ borderTop: '1px solid #f3f4f6', background: '#000b36' }}>
            <td style={{ padding: '12px 16px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>on-color</td>
            <td style={{ padding: '12px 16px' }}><Link href="#" style="on-color" size="medium">Link</Link></td>
            <td style={{ padding: '12px 16px' }}><Link href="#" style="on-color" size="small">Link</Link></td>
            <td style={{ padding: '12px 16px' }}><Link href="#" style="on-color" size="medium" inline>Link</Link></td>
            <td style={{ padding: '12px 16px' }}><Link href="#" style="on-color" size="medium" icon>Link</Link></td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
