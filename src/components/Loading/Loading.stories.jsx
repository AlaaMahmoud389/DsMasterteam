import React from 'react';
import { Loading } from './Loading';

export default {
  title: 'Components/Loading',
  component: Loading,
  parameters: { layout: 'padded' },
  argTypes: {
    size:  { control: 'radio', options: ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'] },
    style: { control: 'radio', options: ['primary', 'neutral', 'on-color'] },
    label: { control: 'text' },
  },
};

/* ── Playground ─────────────────────────────────────────────── */
export const Playground = {
  args: {
    size: 'medium',
    style: 'primary',
    label: 'Loading',
  },
  render: (args) => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 24 }}>
      <Loading {...args} />
    </div>
  ),
};

/* ── Style=Primary — All Sizes ──────────────────────────────── */
export const AllSizesPrimary = {
  name: 'Style=Primary — All Sizes',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 16 }}>
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
          <span style={{ fontSize: 12, fontWeight: 600, color: '#6C7C96', textAlign: 'center', whiteSpace: 'pre-line', display: 'block' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

/* ── Style=Neutral — All Sizes ──────────────────────────────── */
export const AllSizesNeutral = {
  name: 'Style=Neutral — All Sizes',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 16 }}>
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
          <span style={{ fontSize: 12, fontWeight: 600, color: '#6C7C96', textAlign: 'center', whiteSpace: 'pre-line', display: 'block' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

/* ── Style=On-Color — All Sizes ─────────────────────────────── */
export const AllSizesOnColor = {
  name: 'Style=On-Color — All Sizes',
  render: () => (
    <div style={{ background: '#000b36', padding: 32, borderRadius: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
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
            <span style={{ fontSize: 12, fontWeight: 600, color: '#6C7C96', textAlign: 'center', whiteSpace: 'pre-line', display: 'block' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ── Style Comparison — Medium ──────────────────────────────── */
export const AllStylesMedium = {
  name: 'Style Comparison — Medium',
  render: () => (
    <div style={{ display: 'flex', gap: 48, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Primary</p>
        <Loading size="medium" style="primary" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Neutral</p>
        <Loading size="medium" style="neutral" />
      </div>
      <div style={{ background: '#000b36', padding: 20, borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>On-Color</p>
        <Loading size="medium" style="on-color" />
      </div>
    </div>
  ),
};

/* ── Full Matrix — Size × Style ─────────────────────────────── */
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
      <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <table style={{ borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{ padding: '6px 16px', textAlign: 'left', color: '#6C7C96', fontWeight: 600, fontSize: 12 }}>Size</th>
              <th style={{ padding: '6px 16px', textAlign: 'left', color: '#6C7C96', fontWeight: 600, fontSize: 12 }}>Primary</th>
              <th style={{ padding: '6px 16px', textAlign: 'left', color: '#6C7C96', fontWeight: 600, fontSize: 12 }}>Neutral</th>
              <th style={{ padding: '6px 16px', textAlign: 'left', color: '#6C7C96', fontWeight: 600, fontSize: 12, background: '#000b36' }}>On-Color</th>
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
