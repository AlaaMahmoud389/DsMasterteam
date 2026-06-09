import React, { useState } from 'react';
import { RatingStar, Rating } from './Rating';

export default {
  title: 'Components/Rating',
  parameters: { layout: 'padded' },
};

/* ── Playground — Rating ────────────────────────────────────── */
export const PlaygroundRating = {
  name: 'Playground — Rating',
  argTypes: {
    size:     { control: 'radio', options: ['large', 'medium', 'small'] },
    brand:    { control: 'boolean' },
    readOnly: { control: 'boolean' },
    value:    { control: { type: 'number', min: 0, max: 5, step: 0.5 } },
    count:    { control: { type: 'number', min: 1, max: 10, step: 1 } },
  },
  args: {
    size: 'large',
    brand: false,
    readOnly: false,
    value: 3,
    count: 5,
  },
  render: (args) => {
    const [val, setVal] = useState(args.value);
    return (
      <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 24 }}>
        <Rating {...args} value={val} onChange={setVal} />
        <div style={{ marginTop: 12, fontSize: 13, color: '#6b7280' }}>
          Value: {val}
        </div>
      </div>
    );
  },
};

/* ── Playground — RatingStar ────────────────────────────────── */
export const PlaygroundRatingStar = {
  name: 'Playground — RatingStar',
  argTypes: {
    size:  { control: 'radio', options: ['large', 'medium', 'small'] },
    state: { control: 'radio', options: ['normal', 'selected', 'half', 'pressed'] },
    brand: { control: 'boolean' },
  },
  args: {
    size: 'large',
    state: 'normal',
    brand: false,
  },
  render: (args) => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 24 }}>
      <RatingStar {...args} />
    </div>
  ),
};

/* ── RatingStar — All Variants ──────────────────────────────── */
export const AllStarVariants = {
  name: '_RatingStar — All Variants',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 24, display: 'flex', flexDirection: 'column', gap: 32 }}>

      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>State: Normal</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          {['large', 'medium', 'small'].map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <RatingStar size={size} state="normal" />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#6C7C96', textTransform: 'capitalize' }}>{size}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>State: Selected / Style: Default (Amber)</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          {['large', 'medium', 'small'].map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <RatingStar size={size} state="selected" brand={false} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#6C7C96', textTransform: 'capitalize' }}>{size}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>State: Selected / Style: Brand (Blue)</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          {['large', 'medium', 'small'].map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <RatingStar size={size} state="selected" brand={true} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#6C7C96', textTransform: 'capitalize' }}>{size}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>State: Half / Style: Default (Amber)</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          {['large', 'medium', 'small'].map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <RatingStar size={size} state="half" brand={false} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#6C7C96', textTransform: 'capitalize' }}>{size}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>State: Half / Style: Brand (Blue)</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          {['large', 'medium', 'small'].map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <RatingStar size={size} state="half" brand={true} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#6C7C96', textTransform: 'capitalize' }}>{size}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>State: Pressed</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          {['large', 'medium', 'small'].map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <RatingStar size={size} state="pressed" />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#6C7C96', textTransform: 'capitalize' }}>{size}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  ),
};

/* ── Rating — Sizes (Default / Amber) ───────────────────────── */
export const RatingSizes = {
  name: 'Rating — Sizes (Default)',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {['large', 'medium', 'small'].map((size) => (
        <div key={size}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>{size.charAt(0).toUpperCase() + size.slice(1)}</p>
          <Rating size={size} value={3.5} readOnly />
        </div>
      ))}
    </div>
  ),
};

/* ── Rating — Sizes (Brand / Blue) ─────────────────────────── */
export const RatingSizesBrand = {
  name: 'Rating — Sizes (Brand)',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {['large', 'medium', 'small'].map((size) => (
        <div key={size}>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>{size.charAt(0).toUpperCase() + size.slice(1)} — Brand</p>
          <Rating size={size} value={3.5} brand readOnly />
        </div>
      ))}
    </div>
  ),
};

/* ── Rating — Values ────────────────────────────────────────── */
export const RatingValues = {
  name: 'Rating — Values',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[0, 0.5, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((v) => (
        <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 13, color: '#6b7280', width: 28, textAlign: 'right' }}>{v}</span>
          <Rating size="large" value={v} readOnly />
        </div>
      ))}
    </div>
  ),
};

/* ── Rating — Interactive ───────────────────────────────────── */
export const RatingInteractive = {
  name: 'Rating — Interactive',
  render: () => {
    const [valLarge, setValLarge] = useState(3);
    const [valMedium, setValMedium] = useState(3);
    const [valSmall, setValSmall] = useState(3);
    const [valBrand, setValBrand] = useState(3);

    return (
      <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Large — Default</p>
          <Rating size="large" value={valLarge} onChange={setValLarge} />
          <div style={{ marginTop: 6, fontSize: 12, color: '#6b7280' }}>Value: {valLarge}</div>
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Medium — Default</p>
          <Rating size="medium" value={valMedium} onChange={setValMedium} />
          <div style={{ marginTop: 6, fontSize: 12, color: '#6b7280' }}>Value: {valMedium}</div>
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Small — Default</p>
          <Rating size="small" value={valSmall} onChange={setValSmall} />
          <div style={{ marginTop: 6, fontSize: 12, color: '#6b7280' }}>Value: {valSmall}</div>
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>Large — Brand</p>
          <Rating size="large" brand value={valBrand} onChange={setValBrand} />
          <div style={{ marginTop: 6, fontSize: 12, color: '#6b7280' }}>Value: {valBrand}</div>
        </div>
      </div>
    );
  },
};

/* ── Full Matrix ────────────────────────────────────────────── */
export const FullMatrix = {
  name: 'Rating — Full Matrix',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 24, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 600, color: '#000b36' }}>Rating Component — 6 Variants (Size × Style)</p>
        {[false, true].map((brand) =>
          ['large', 'medium', 'small'].map((size) => (
            <div key={`${brand}-${size}`} style={{ marginBottom: 16, padding: 16, background: '#f9fafb', borderRadius: 8, border: '1px solid #e5e7eb' }}>
              <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>
                {size.charAt(0).toUpperCase() + size.slice(1)} · {brand ? 'Brand' : 'Default'}
              </p>
              <Rating size={size} brand={brand} value={3.5} readOnly />
            </div>
          ))
        )}
      </div>

      <div>
        <p style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 600, color: '#000b36' }}>_RatingStar Component — 24 Variants (Size × State × Style)</p>
        {['normal', 'selected', 'half', 'pressed'].map((state) => (
          <div key={state} style={{ marginBottom: 16, padding: 16, background: '#f9fafb', borderRadius: 8, border: '1px solid #e5e7eb' }}>
            <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>State: {state.charAt(0).toUpperCase() + state.slice(1)}</p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {['large', 'medium', 'small'].map((size) => {
                const variants = state === 'pressed' ? [{ brand: false }] : [{ brand: false }, { brand: true }];
                return variants.map(({ brand }) => (
                  <div key={`${size}-${brand}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <RatingStar size={size} state={state} brand={brand} />
                    <span style={{ fontSize: 11, color: '#6C7C96' }}>
                      {size}{state !== 'pressed' ? ` / ${brand ? 'brand' : 'default'}` : ''}
                    </span>
                  </div>
                ));
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
