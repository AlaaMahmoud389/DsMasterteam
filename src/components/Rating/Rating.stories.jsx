import React, { useState } from 'react';
import { RatingStar, Rating } from './Rating';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4250-1940';

const FONT = "'IBM Plex Sans Arabic', system-ui, sans-serif";

export default {
  title: 'Components/Rating',
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
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
   Playground — Rating (interactive)
   ════════════════════════════════════════════════════════════════════ */
export const PlaygroundRating = {
  name: 'Playground — Rating',
  argTypes: {
    size:     { control: 'select', options: ['large', 'medium', 'small'] },
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
      <div style={{ fontFamily: FONT, padding: 24 }}>
        <Rating {...args} value={val} onChange={setVal} />
        <div style={{ marginTop: 12, fontSize: 13, color: '#6b7280', fontFamily: FONT }}>
          Value: {val}
        </div>
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Playground — RatingStar
   ════════════════════════════════════════════════════════════════════ */
export const PlaygroundRatingStar = {
  name: 'Playground — RatingStar',
  argTypes: {
    size:  { control: 'select', options: ['large', 'medium', 'small'] },
    state: { control: 'select', options: ['normal', 'selected', 'half', 'pressed'] },
    brand: { control: 'boolean' },
  },
  args: {
    size: 'large',
    state: 'normal',
    brand: false,
  },
  render: (args) => (
    <div style={{ fontFamily: FONT, padding: 24 }}>
      <RatingStar {...args} />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   _RatingStar — All States × Sizes × Styles
   Mirrors the 24-variant Figma component set
   ════════════════════════════════════════════════════════════════════ */
export const AllStarVariants = {
  name: '_RatingStar — All Variants',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 24, display: 'flex', flexDirection: 'column', gap: 32 }}>

      {/* Normal */}
      <div>
        <div style={LABEL.style}>State: Normal</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          {['large', 'medium', 'small'].map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <RatingStar size={size} state="normal" />
              <span style={{ fontSize: 11, color: '#9ca3af', textTransform: 'capitalize', fontFamily: FONT }}>{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected — Default (amber) */}
      <div>
        <div style={LABEL.style}>State: Selected / Style: Default (Amber)</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          {['large', 'medium', 'small'].map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <RatingStar size={size} state="selected" brand={false} />
              <span style={{ fontSize: 11, color: '#9ca3af', textTransform: 'capitalize', fontFamily: FONT }}>{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected — Brand (blue) */}
      <div>
        <div style={LABEL.style}>State: Selected / Style: Brand (Blue)</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          {['large', 'medium', 'small'].map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <RatingStar size={size} state="selected" brand={true} />
              <span style={{ fontSize: 11, color: '#9ca3af', textTransform: 'capitalize', fontFamily: FONT }}>{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Half — Default (amber) */}
      <div>
        <div style={LABEL.style}>State: Half / Style: Default (Amber)</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          {['large', 'medium', 'small'].map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <RatingStar size={size} state="half" brand={false} />
              <span style={{ fontSize: 11, color: '#9ca3af', textTransform: 'capitalize', fontFamily: FONT }}>{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Half — Brand (blue) */}
      <div>
        <div style={LABEL.style}>State: Half / Style: Brand (Blue)</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          {['large', 'medium', 'small'].map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <RatingStar size={size} state="half" brand={true} />
              <span style={{ fontSize: 11, color: '#9ca3af', textTransform: 'capitalize', fontFamily: FONT }}>{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pressed */}
      <div>
        <div style={LABEL.style}>State: Pressed</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          {['large', 'medium', 'small'].map((size) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <RatingStar size={size} state="pressed" />
              <span style={{ fontSize: 11, color: '#9ca3af', textTransform: 'capitalize', fontFamily: FONT }}>{size}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Rating — Sizes (Default / Amber)
   ════════════════════════════════════════════════════════════════════ */
export const RatingSizes = {
  name: 'Rating — Sizes (Default)',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {['large', 'medium', 'small'].map((size) => (
        <div key={size}>
          <div style={LABEL.style}>{size.charAt(0).toUpperCase() + size.slice(1)}</div>
          <Rating size={size} value={3.5} readOnly />
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Rating — Sizes (Brand / Blue)
   ════════════════════════════════════════════════════════════════════ */
export const RatingSizesBrand = {
  name: 'Rating — Sizes (Brand)',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {['large', 'medium', 'small'].map((size) => (
        <div key={size}>
          <div style={LABEL.style}>{size.charAt(0).toUpperCase() + size.slice(1)} — Brand</div>
          <Rating size={size} value={3.5} brand readOnly />
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Rating — Values
   ════════════════════════════════════════════════════════════════════ */
export const RatingValues = {
  name: 'Rating — Values',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[0, 0.5, 1, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((v) => (
        <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 13, color: '#6b7280', width: 28, fontFamily: FONT, textAlign: 'right' }}>{v}</span>
          <Rating size="large" value={v} readOnly />
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Rating — Interactive
   ════════════════════════════════════════════════════════════════════ */
export const RatingInteractive = {
  name: 'Rating — Interactive',
  render: () => {
    const [valLarge, setValLarge] = useState(3);
    const [valMedium, setValMedium] = useState(3);
    const [valSmall, setValSmall] = useState(3);
    const [valBrand, setValBrand] = useState(3);

    return (
      <div style={{ fontFamily: FONT, padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <div style={LABEL.style}>Large — Default</div>
          <Rating size="large" value={valLarge} onChange={setValLarge} />
          <div style={{ marginTop: 6, fontSize: 12, color: '#6b7280', fontFamily: FONT }}>Value: {valLarge}</div>
        </div>
        <div>
          <div style={LABEL.style}>Medium — Default</div>
          <Rating size="medium" value={valMedium} onChange={setValMedium} />
          <div style={{ marginTop: 6, fontSize: 12, color: '#6b7280', fontFamily: FONT }}>Value: {valMedium}</div>
        </div>
        <div>
          <div style={LABEL.style}>Small — Default</div>
          <Rating size="small" value={valSmall} onChange={setValSmall} />
          <div style={{ marginTop: 6, fontSize: 12, color: '#6b7280', fontFamily: FONT }}>Value: {valSmall}</div>
        </div>
        <div>
          <div style={LABEL.style}>Large — Brand</div>
          <Rating size="large" brand value={valBrand} onChange={setValBrand} />
          <div style={{ marginTop: 6, fontSize: 12, color: '#6b7280', fontFamily: FONT }}>Value: {valBrand}</div>
        </div>
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Full Figma Matrix — all 6 Rating variants
   ════════════════════════════════════════════════════════════════════ */
export const FullMatrix = {
  name: 'Rating — Full Figma Matrix',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 24, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 16, fontFamily: FONT }}>
          Rating Component — 6 Variants (Size × Brand)
        </div>
        {[false, true].map((brand) =>
          ['large', 'medium', 'small'].map((size) => (
            <div key={`${brand}-${size}`} style={{ marginBottom: 16, padding: 16, background: '#f9fafb', borderRadius: 8, border: '1px solid #e5e7eb' }}>
              <div style={LABEL.style}>
                {size.charAt(0).toUpperCase() + size.slice(1)} · {brand ? 'Brand' : 'Default'}
              </div>
              <Rating size={size} brand={brand} value={3.5} readOnly />
            </div>
          ))
        )}
      </div>

      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 16, fontFamily: FONT }}>
          _RatingStar Component — 24 Variants (Size × State × Style)
        </div>
        {['normal', 'selected', 'half', 'pressed'].map((state) => (
          <div key={state} style={{ marginBottom: 16, padding: 16, background: '#f9fafb', borderRadius: 8, border: '1px solid #e5e7eb' }}>
            <div style={LABEL.style}>State: {state.charAt(0).toUpperCase() + state.slice(1)}</div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {['large', 'medium', 'small'].map((size) => {
                const styles = state === 'pressed' ? [] : [false, true];
                const variants = state === 'pressed' ? [{ brand: false }] : [{ brand: false }, { brand: true }];
                return variants.map(({ brand }) => (
                  <div
                    key={`${size}-${brand}`}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
                  >
                    <RatingStar size={size} state={state} brand={brand} />
                    <span style={{ fontSize: 10, color: '#9ca3af', fontFamily: FONT }}>
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
