import React from 'react';
import { Link } from './Link';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4388-104291';

const FONT = "'IBM Plex Sans Arabic', system-ui, sans-serif";

export default {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    style:    { control: 'select', options: ['primary', 'neutral', 'on-color'] },
    size:     { control: 'select', options: ['medium', 'small'] },
    inline:   { control: 'boolean' },
    icon:     { control: 'boolean' },
    disabled: { control: 'boolean' },
    rtl:      { control: 'boolean' },
  },
};

const LABEL = { sm: 11, style: { color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8, fontFamily: FONT } };

/* ════════════════════════════════════════════════════════════════════
   Playground
   ════════════════════════════════════════════════════════════════════ */
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
    <div style={{ fontFamily: FONT, padding: 16 }}>
      <Link {...args} />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   All States — Primary
   ════════════════════════════════════════════════════════════════════ */
export const PrimaryStates = {
  name: 'Style=Primary — All states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: FONT }}>
      {[
        { label: 'Default',  extra: {} },
        { label: 'Hovered',  extra: { className: 'force-hover' }, hint: '(apply :hover in browser)' },
        { label: 'Pressed',  extra: {}, hint: '(apply :active in browser)' },
        { label: 'Focused',  extra: {}, hint: '(Tab to focus)' },
        { label: 'Visited',  extra: {}, hint: '(browser-tracked)' },
        { label: 'Disabled', extra: { disabled: true } },
      ].map(({ label, extra, hint }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ ...LABEL.style, fontSize: LABEL.sm, width: 70 }}>{label}</span>
          <Link href="#" style="primary" size="medium" {...extra}>Link</Link>
          {hint && <span style={{ fontSize: 11, color: '#d1d5db' }}>{hint}</span>}
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   All States — Neutral
   ════════════════════════════════════════════════════════════════════ */
export const NeutralStates = {
  name: 'Style=Neutral — All states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: FONT }}>
      {[
        { label: 'Default',  extra: {} },
        { label: 'Hovered',  hint: '(apply :hover)' },
        { label: 'Pressed',  hint: '(apply :active)' },
        { label: 'Focused',  hint: '(Tab to focus)' },
        { label: 'Visited',  hint: '(browser-tracked)' },
        { label: 'Disabled', extra: { disabled: true } },
      ].map(({ label, extra = {}, hint }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ ...LABEL.style, fontSize: LABEL.sm, width: 70 }}>{label}</span>
          <Link href="#" style="neutral" size="medium" {...extra}>Link</Link>
          {hint && <span style={{ fontSize: 11, color: '#d1d5db' }}>{hint}</span>}
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   All States — On-color  (dark surface wrapper)
   ════════════════════════════════════════════════════════════════════ */
export const OnColorStates = {
  name: 'Style=On-color — All states',
  render: () => (
    <div style={{ background: '#000b36', padding: 24, borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 20, fontFamily: FONT, maxWidth: 360 }}>
      {[
        { label: 'Default',  extra: {} },
        { label: 'Hovered',  hint: '(apply :hover)' },
        { label: 'Pressed',  hint: '(apply :active)' },
        { label: 'Focused',  hint: '(Tab to focus)' },
        { label: 'Visited',  hint: '(browser-tracked)' },
        { label: 'Disabled', extra: { disabled: true } },
      ].map(({ label, extra = {}, hint }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ ...LABEL.style, fontSize: LABEL.sm, width: 70, color: '#6b7280' }}>{label}</span>
          <Link href="#" style="on-color" size="medium" {...extra}>Link</Link>
          {hint && <span style={{ fontSize: 11, color: '#4b5563' }}>{hint}</span>}
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Sizes — Medium & Small
   ════════════════════════════════════════════════════════════════════ */
export const Sizes = {
  name: 'Size — Medium & Small',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
        <div>
          <div style={{ ...LABEL.style, fontSize: LABEL.sm }}>Medium (16px)</div>
          <Link href="#" style="primary" size="medium">Link</Link>
        </div>
        <div>
          <div style={{ ...LABEL.style, fontSize: LABEL.sm }}>Small (14px)</div>
          <Link href="#" style="primary" size="small">Link</Link>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
        <div>
          <div style={{ ...LABEL.style, fontSize: LABEL.sm }}>Neutral Medium</div>
          <Link href="#" style="neutral" size="medium">Link</Link>
        </div>
        <div>
          <div style={{ ...LABEL.style, fontSize: LABEL.sm }}>Neutral Small</div>
          <Link href="#" style="neutral" size="small">Link</Link>
        </div>
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Inline = True (always underlined)
   ════════════════════════════════════════════════════════════════════ */
export const InlineVariants = {
  name: 'Inline — Off vs On',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: FONT }}>
      <div>
        <div style={{ ...LABEL.style, fontSize: LABEL.sm }}>Inline = False (no underline by default)</div>
        <p style={{ margin: 0, fontSize: 16, color: '#111827', lineHeight: '24px' }}>
          Visit our{' '}
          <Link href="#" style="primary" size="medium" inline={false}>documentation</Link>
          {' '}for more information.
        </p>
      </div>
      <div>
        <div style={{ ...LABEL.style, fontSize: LABEL.sm }}>Inline = True (always underlined — for use within body text)</div>
        <p style={{ margin: 0, fontSize: 16, color: '#111827', lineHeight: '24px' }}>
          Visit our{' '}
          <Link href="#" style="primary" size="medium" inline={true}>documentation</Link>
          {' '}for more information.
        </p>
      </div>
      <div>
        <div style={{ ...LABEL.style, fontSize: LABEL.sm }}>Neutral Inline = True</div>
        <p style={{ margin: 0, fontSize: 16, color: '#111827', lineHeight: '24px' }}>
          Read the full{' '}
          <Link href="#" style="neutral" size="medium" inline={true}>terms and conditions</Link>
          {' '}before proceeding.
        </p>
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Icon = True (trailing icon)
   ════════════════════════════════════════════════════════════════════ */
export const WithIcon = {
  name: 'Icon — Trailing icon',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: FONT }}>
      <div>
        <div style={{ ...LABEL.style, fontSize: LABEL.sm }}>Primary — Medium — Icon</div>
        <Link href="#" style="primary" size="medium" icon>Link</Link>
      </div>
      <div>
        <div style={{ ...LABEL.style, fontSize: LABEL.sm }}>Primary — Small — Icon</div>
        <Link href="#" style="primary" size="small" icon>Link</Link>
      </div>
      <div>
        <div style={{ ...LABEL.style, fontSize: LABEL.sm }}>Neutral — Medium — Icon</div>
        <Link href="#" style="neutral" size="medium" icon>Link</Link>
      </div>
      <div>
        <div style={{ ...LABEL.style, fontSize: LABEL.sm }}>Primary — Inline + Icon</div>
        <Link href="#" style="primary" size="medium" inline icon>Link</Link>
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   RTL
   ════════════════════════════════════════════════════════════════════ */
export const RTLVariants = {
  name: 'RTL — Right-to-left',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: FONT }}>
      <div>
        <div style={{ ...LABEL.style, fontSize: LABEL.sm }}>Primary — RTL — Medium</div>
        <Link href="#" style="primary" size="medium" rtl>رابط</Link>
      </div>
      <div>
        <div style={{ ...LABEL.style, fontSize: LABEL.sm }}>Neutral — RTL — Medium</div>
        <Link href="#" style="neutral" size="medium" rtl>رابط</Link>
      </div>
      <div>
        <div style={{ ...LABEL.style, fontSize: LABEL.sm }}>Primary — RTL — Icon</div>
        <Link href="#" style="primary" size="medium" rtl icon>رابط</Link>
      </div>
      <div>
        <div style={{ ...LABEL.style, fontSize: LABEL.sm }}>Primary — RTL — Inline</div>
        <Link href="#" style="primary" size="medium" rtl inline>رابط</Link>
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Full matrix — All styles × sizes
   ════════════════════════════════════════════════════════════════════ */
export const StyleMatrix = {
  name: 'Style × Size matrix',
  render: () => (
    <div style={{ fontFamily: FONT }}>
      <table style={{ borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ padding: '6px 16px', textAlign: 'left', color: '#9ca3af', fontWeight: 400 }}>Style</th>
            <th style={{ padding: '6px 16px', textAlign: 'left', color: '#9ca3af', fontWeight: 400 }}>Medium</th>
            <th style={{ padding: '6px 16px', textAlign: 'left', color: '#9ca3af', fontWeight: 400 }}>Small</th>
            <th style={{ padding: '6px 16px', textAlign: 'left', color: '#9ca3af', fontWeight: 400 }}>Medium + Inline</th>
            <th style={{ padding: '6px 16px', textAlign: 'left', color: '#9ca3af', fontWeight: 400 }}>Medium + Icon</th>
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
