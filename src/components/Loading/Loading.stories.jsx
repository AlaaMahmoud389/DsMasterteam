import React from 'react';
import { Loading } from './Loading';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4389-1155';

const FONT = "'IBM Plex Sans Arabic', system-ui, sans-serif";

export default {
  title: 'Components/Loading',
  component: Loading,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    size:  { control: 'select', options: ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'] },
    style: { control: 'select', options: ['primary', 'neutral', 'on-color'] },
    label: { control: 'text' },
  },
};

const LABEL = {
  style: {
    fontSize: 11,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '.06em',
    marginBottom: 10,
    fontFamily: FONT,
  },
};

/* ════════════════════════════════════════════════════════════════════
   Playground
   ════════════════════════════════════════════════════════════════════ */
export const Playground = {
  args: {
    size: 'medium',
    style: 'primary',
    label: 'Loading',
  },
  render: (args) => (
    <div style={{ fontFamily: FONT, padding: 24 }}>
      <Loading {...args} />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   All Sizes — Primary
   ════════════════════════════════════════════════════════════════════ */
export const AllSizesPrimary = {
  name: 'Style=Primary — All Sizes',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', fontFamily: FONT, padding: 16 }}>
      {[
        { size: 'xx-small', label: 'xx Small\n20px / 2px' },
        { size: 'x-small',  label: 'x Small\n24px / 2px' },
        { size: 'small',    label: 'Small\n28px / 2px' },
        { size: 'medium',   label: 'Medium\n32px / 3px' },
        { size: 'large',    label: 'Large\n36px / 3px' },
        { size: 'x-large',  label: 'x Large\n40px / 3px' },
        { size: 'xx-large', label: 'xx Large\n44px / 4px' },
      ].map(({ size, label }) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <Loading size={size} style="primary" />
          <span style={{ ...LABEL.style, marginBottom: 0, textAlign: 'center', whiteSpace: 'pre-line' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   All Sizes — Neutral
   ════════════════════════════════════════════════════════════════════ */
export const AllSizesNeutral = {
  name: 'Style=Neutral — All Sizes',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', fontFamily: FONT, padding: 16 }}>
      {[
        { size: 'xx-small', label: 'xx Small\n20px / 2px' },
        { size: 'x-small',  label: 'x Small\n24px / 2px' },
        { size: 'small',    label: 'Small\n28px / 2px' },
        { size: 'medium',   label: 'Medium\n32px / 3px' },
        { size: 'large',    label: 'Large\n36px / 3px' },
        { size: 'x-large',  label: 'x Large\n40px / 3px' },
        { size: 'xx-large', label: 'xx Large\n44px / 4px' },
      ].map(({ size, label }) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <Loading size={size} style="neutral" />
          <span style={{ ...LABEL.style, marginBottom: 0, textAlign: 'center', whiteSpace: 'pre-line' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   All Sizes — On-Color  (dark surface)
   ════════════════════════════════════════════════════════════════════ */
export const AllSizesOnColor = {
  name: 'Style=On-Color — All Sizes',
  render: () => (
    <div style={{ background: '#000b36', padding: 32, borderRadius: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', fontFamily: FONT }}>
        {[
          { size: 'xx-small', label: 'xx Small\n20px / 2px' },
          { size: 'x-small',  label: 'x Small\n24px / 2px' },
          { size: 'small',    label: 'Small\n28px / 2px' },
          { size: 'medium',   label: 'Medium\n32px / 3px' },
          { size: 'large',    label: 'Large\n36px / 3px' },
          { size: 'x-large',  label: 'x Large\n40px / 3px' },
          { size: 'xx-large', label: 'xx Large\n44px / 4px' },
        ].map(({ size, label }) => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <Loading size={size} style="on-color" />
            <span style={{ ...LABEL.style, marginBottom: 0, textAlign: 'center', whiteSpace: 'pre-line', color: '#6b7280' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   All Styles — Medium size
   ════════════════════════════════════════════════════════════════════ */
export const AllStylesMedium = {
  name: 'Style Comparison — Medium',
  render: () => (
    <div style={{ display: 'flex', gap: 48, fontFamily: FONT, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={LABEL.style}>Primary</div>
        <Loading size="medium" style="primary" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={LABEL.style}>Neutral</div>
        <Loading size="medium" style="neutral" />
      </div>
      <div style={{ background: '#000b36', padding: 20, borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ ...LABEL.style, color: '#6b7280' }}>On-Color</div>
        <Loading size="medium" style="on-color" />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Full Matrix — All Sizes × All Styles
   ════════════════════════════════════════════════════════════════════ */
export const FullMatrix = {
  name: 'Full Matrix — Size × Style',
  render: () => {
    const sizes = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
    const sizeLabels = {
      'xx-small': 'xx Small (20px)',
      'x-small':  'x Small (24px)',
      'small':    'Small (28px)',
      'medium':   'Medium (32px)',
      'large':    'Large (36px)',
      'x-large':  'x Large (40px)',
      'xx-large': 'xx Large (44px)',
    };
    return (
      <div style={{ fontFamily: FONT }}>
        <table style={{ borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{ padding: '6px 16px', textAlign: 'left', color: '#9ca3af', fontWeight: 400 }}>Size</th>
              <th style={{ padding: '6px 16px', textAlign: 'left', color: '#9ca3af', fontWeight: 400 }}>Primary</th>
              <th style={{ padding: '6px 16px', textAlign: 'left', color: '#9ca3af', fontWeight: 400 }}>Neutral</th>
              <th style={{ padding: '6px 16px', textAlign: 'left', color: '#9ca3af', fontWeight: 400, background: '#000b36' }}>On-Color</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((size) => (
              <tr key={size} style={{ borderTop: '1px solid #f3f4f6' }}>
                <td style={{ padding: '16px', color: '#6b7280', fontSize: 12 }}>{sizeLabels[size]}</td>
                <td style={{ padding: '16px' }}><Loading size={size} style="primary" /></td>
                <td style={{ padding: '16px' }}><Loading size={size} style="neutral" /></td>
                <td style={{ padding: '16px', background: '#000b36' }}><Loading size={size} style="on-color" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
