import React from 'react';
import { Divider } from './Divider';

/* ── Story meta ─────────────────────────────────────────────── */

export default {
  title: 'Components/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the divider line',
    },
    color: {
      control: 'radio',
      options: ['neutral', 'primary', 'solidWhite'],
      description: 'Color token applied to the divider',
    },
    onColor: {
      control: 'boolean',
      description: 'Place the divider on the dark (#000B36) background',
    },
  },
};

/* ── Playground ─────────────────────────────────────────────── */
export const Playground = {
  args: {
    orientation: 'horizontal',
    color: 'primary',
    onColor: false,
  },
  render: (args) => (
    <div
      style={{
        fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
        background: args.onColor ? '#000b36' : '#f3f4f6',
        padding: 32,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: args.orientation === 'vertical' ? 120 : 'auto',
      }}
    >
      <Divider {...args} />
    </div>
  ),
};

/* ── Horizontal — Default ────────────────────────────────────── */
export const HorizontalDefault = {
  name: 'Horizontal — Default (Neutral · Primary)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { color: 'neutral', label: 'Neutral  (#ffffff / 30%)' },
        { color: 'primary', label: 'Primary  (#1849A9)' },
      ].map(({ color, label }) => (
        <div key={color}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>
            {label}
          </p>
          <div style={{ background: '#f3f4f6', padding: '20px 24px', borderRadius: 6 }}>
            <Divider orientation="horizontal" color={color} />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── Horizontal — OnColor ────────────────────────────────────── */
export const HorizontalOnColor = {
  name: 'Horizontal — OnColor (Neutral · Solid White)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { color: 'neutral',    label: 'Neutral  (#ffffff / 30%)' },
        { color: 'solidWhite', label: 'Solid White  (#ffffff)' },
      ].map(({ color, label }) => (
        <div key={color}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>
            {label}
          </p>
          <div style={{ background: '#000b36', padding: '20px 24px', borderRadius: 6 }}>
            <Divider orientation="horizontal" color={color} onColor />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── Vertical — Default ──────────────────────────────────────── */
export const VerticalDefault = {
  name: 'Vertical — Default (Neutral · Primary)',
  render: () => (
    <div style={{ display: 'flex', gap: 48, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { color: 'neutral', label: 'Neutral  (#ffffff / 30%)' },
        { color: 'primary', label: 'Primary  (#1849A9)' },
      ].map(({ color, label }) => (
        <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96', textAlign: 'center' }}>
            {label}
          </p>
          <div style={{ background: '#f3f4f6', padding: '16px 24px', borderRadius: 6, height: 100, display: 'flex', alignItems: 'stretch' }}>
            <Divider orientation="vertical" color={color} />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── Vertical — OnColor ──────────────────────────────────────── */
export const VerticalOnColor = {
  name: 'Vertical — OnColor (Neutral · Solid White)',
  render: () => (
    <div style={{ display: 'flex', gap: 48, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { color: 'neutral',    label: 'Neutral  (#ffffff / 30%)' },
        { color: 'solidWhite', label: 'Solid White  (#ffffff)' },
      ].map(({ color, label }) => (
        <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96', textAlign: 'center' }}>
            {label}
          </p>
          <div style={{ background: '#000b36', padding: '16px 24px', borderRadius: 6, height: 100, display: 'flex', alignItems: 'stretch' }}>
            <Divider orientation="vertical" color={color} onColor />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── Full Matrix ─────────────────────────────────────────────── */
export const FullMatrix = {
  name: 'Full Matrix — All Orientations × Colors × Modes',
  render: () => {
    const rows = [
      { orientation: 'horizontal', color: 'neutral',    onColor: false, label: 'Horizontal · Neutral · Default' },
      { orientation: 'horizontal', color: 'primary',    onColor: false, label: 'Horizontal · Primary · Default' },
      { orientation: 'horizontal', color: 'neutral',    onColor: true,  label: 'Horizontal · Neutral · OnColor' },
      { orientation: 'horizontal', color: 'solidWhite', onColor: true,  label: 'Horizontal · Solid White · OnColor' },
    ];
    const cols = [
      { orientation: 'vertical', color: 'neutral',    onColor: false, label: 'Vertical · Neutral · Default' },
      { orientation: 'vertical', color: 'primary',    onColor: false, label: 'Vertical · Primary · Default' },
      { orientation: 'vertical', color: 'neutral',    onColor: true,  label: 'Vertical · Neutral · OnColor' },
      { orientation: 'vertical', color: 'solidWhite', onColor: true,  label: 'Vertical · Solid White · OnColor' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        {rows.map(({ orientation, color, onColor, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#6C7C96', minWidth: 260 }}>{label}</span>
            <div style={{ flex: 1, background: onColor ? '#000b36' : '#f3f4f6', padding: '16px 20px', borderRadius: 6 }}>
              <Divider orientation={orientation} color={color} onColor={onColor} />
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 8 }}>
          {cols.map(({ orientation, color, onColor, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#6C7C96', maxWidth: 150 }}>{label}</span>
              <div style={{ background: onColor ? '#000b36' : '#f3f4f6', padding: '12px 24px', borderRadius: 6, height: 80, display: 'flex', alignItems: 'stretch' }}>
                <Divider orientation={orientation} color={color} onColor={onColor} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/* ── In Context — Horizontal ─────────────────────────────────── */
export const InContextHorizontal = {
  name: 'In Context — Horizontal separating content',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Default context</p>
        <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 14, color: '#111827' }}>Section heading</div>
          <Divider orientation="horizontal" color="primary" />
          <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>
            Body content below the divider line. The divider visually separates distinct regions.
          </div>
          <Divider orientation="horizontal" color="neutral" />
          <div style={{ fontSize: 13, color: '#6b7280' }}>Another content region.</div>
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>OnColor context (#000B36)</p>
        <div style={{ background: '#000b36', borderRadius: 8, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 14, color: '#f9fafb' }}>Section heading</div>
          <Divider orientation="horizontal" color="solidWhite" onColor />
          <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>
            Body content below the solid white divider.
          </div>
          <Divider orientation="horizontal" color="neutral" onColor />
          <div style={{ fontSize: 13, color: '#d1d5db' }}>Another content region.</div>
        </div>
      </div>
    </div>
  ),
};

/* ── In Context — Vertical ───────────────────────────────────── */
export const InContextVertical = {
  name: 'In Context — Vertical separating columns',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Default context</p>
        <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '20px 24px', display: 'inline-flex', alignItems: 'stretch', gap: 20 }}>
          <div style={{ fontSize: 13, color: '#374151' }}>Left column</div>
          <Divider orientation="vertical" color="primary" />
          <div style={{ fontSize: 13, color: '#374151' }}>Middle column</div>
          <Divider orientation="vertical" color="neutral" />
          <div style={{ fontSize: 13, color: '#374151' }}>Right column</div>
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>OnColor context (#000B36)</p>
        <div style={{ background: '#000b36', borderRadius: 8, padding: '20px 24px', display: 'inline-flex', alignItems: 'stretch', gap: 20 }}>
          <div style={{ fontSize: 13, color: '#f9fafb' }}>Left column</div>
          <Divider orientation="vertical" color="solidWhite" onColor />
          <div style={{ fontSize: 13, color: '#f9fafb' }}>Middle column</div>
          <Divider orientation="vertical" color="neutral" onColor />
          <div style={{ fontSize: 13, color: '#f9fafb' }}>Right column</div>
        </div>
      </div>
    </div>
  ),
};
