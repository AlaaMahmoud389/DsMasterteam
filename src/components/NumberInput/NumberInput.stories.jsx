import React, { useState } from 'react';
import { InputPrefixSuffix, NumberInput } from './NumberInput';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4250-1944';

const FONT = "'IBM Plex Sans Arabic', system-ui, sans-serif";

export default {
  title: 'Components/NumberInput',
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
   Playground — NumberInput
   ════════════════════════════════════════════════════════════════════ */
export const Playground = {
  name: 'Playground — Number Input',
  argTypes: {
    state:          { control: 'select', options: ['default', 'hovered', 'pressed', 'focused', 'disabled', 'read-only'] },
    inputStyle:     { control: 'select', options: ['default', 'filled-lighter', 'filled-darker'] },
    btnStyle:       { control: 'select', options: ['solid', 'subtle'] },
    size:           { control: 'select', options: ['large', 'medium'] },
    labelType:      { control: 'select', options: ['regular', 'semibold'] },
    error:          { control: 'boolean' },
    showLabel:      { control: 'boolean' },
    showHelperText: { control: 'boolean' },
    required:       { control: 'boolean' },
    rtl:            { control: 'boolean' },
    label:          { control: 'text' },
    helperText:     { control: 'text' },
  },
  args: {
    state: 'default',
    inputStyle: 'default',
    btnStyle: 'solid',
    size: 'large',
    labelType: 'regular',
    error: false,
    showLabel: true,
    showHelperText: true,
    required: false,
    rtl: false,
    label: 'Label',
    helperText: 'Help Text',
  },
  render: (args) => {
    const [value, setValue] = useState(0);
    return (
      <div style={{ fontFamily: FONT, padding: 16, maxWidth: 280 }}>
        <NumberInput {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Playground — Input Prefix-Suffix
   ════════════════════════════════════════════════════════════════════ */
export const PlaygroundButton = {
  name: 'Playground — Input Prefix-Suffix',
  argTypes: {
    type:     { control: 'select', options: ['plus', 'minus'] },
    state:    { control: 'select', options: ['default', 'hovered', 'pressed', 'focused', 'selected', 'disabled'] },
    btnStyle: { control: 'select', options: ['solid', 'subtle'] },
    size:     { control: 'select', options: ['large', 'medium'] },
  },
  args: { type: 'plus', state: 'default', btnStyle: 'solid', size: 'large' },
  render: (args) => (
    <div style={{ fontFamily: FONT, padding: 16 }}>
      <InputPrefixSuffix {...args} />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   All States
   ════════════════════════════════════════════════════════════════════ */
export const AllStates = {
  name: 'Number Input — All States',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, fontFamily: FONT }}>
      {['default', 'hovered', 'pressed', 'focused', 'disabled', 'read-only'].map((state) => (
        <div key={state}>
          <div style={LABEL.style}>{state}</div>
          <NumberInput
            label="Label"
            showLabel
            helperText="Help Text"
            showHelperText
            state={state}
            value={state === 'read-only' ? 42 : 0}
            placeholder="00000"
          />
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Error States
   ════════════════════════════════════════════════════════════════════ */
export const ErrorStates = {
  name: 'Number Input — Error States',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, fontFamily: FONT }}>
      {['default', 'hovered', 'focused', 'disabled'].map((state) => (
        <div key={state}>
          <div style={LABEL.style}>{state} + error</div>
          <NumberInput
            label="Label"
            showLabel
            helperText="Help Text"
            showHelperText
            state={state}
            error
            value={0}
          />
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Sizes
   ════════════════════════════════════════════════════════════════════ */
export const Sizes = {
  name: 'Number Input — Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', fontFamily: FONT, alignItems: 'flex-end' }}>
      <div>
        <div style={LABEL.style}>Large</div>
        <NumberInput label="Label" showLabel size="large" value={0} />
      </div>
      <div>
        <div style={LABEL.style}>Medium</div>
        <NumberInput label="Label" showLabel size="medium" value={0} />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Input Styles
   ════════════════════════════════════════════════════════════════════ */
export const InputStyles = {
  name: 'Number Input — Input Styles',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, fontFamily: FONT }}>
      {[
        { inputStyle: 'default',        label: 'Style = Default' },
        { inputStyle: 'filled-lighter', label: 'Style = Filled Lighter' },
        { inputStyle: 'filled-darker',  label: 'Style = Filled Darker' },
      ].map(({ inputStyle, label }) => (
        <div key={inputStyle}>
          <div style={LABEL.style}>{label}</div>
          <NumberInput
            label="Label"
            showLabel
            helperText="Help Text"
            showHelperText
            inputStyle={inputStyle}
            value={42}
          />
        </div>
      ))}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Button Styles — Solid vs Subtle
   ════════════════════════════════════════════════════════════════════ */
export const ButtonStyles = {
  name: 'Number Input — Button Styles',
  render: () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', fontFamily: FONT }}>
      <div>
        <div style={LABEL.style}>Solid buttons</div>
        <NumberInput label="Label" showLabel btnStyle="solid" value={0} />
      </div>
      <div>
        <div style={LABEL.style}>Subtle buttons</div>
        <NumberInput label="Label" showLabel btnStyle="subtle" value={0} />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Label variants
   ════════════════════════════════════════════════════════════════════ */
export const LabelVariants = {
  name: 'Number Input — Label Variants',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, fontFamily: FONT }}>
      <div>
        <div style={LABEL.style}>Show Label = Off</div>
        <NumberInput showLabel={false} value={0} />
      </div>
      <div>
        <div style={LABEL.style}>Regular label</div>
        <NumberInput label="Label" showLabel labelType="regular" value={0} />
      </div>
      <div>
        <div style={LABEL.style}>Semibold label</div>
        <NumberInput label="Label" showLabel labelType="semibold" value={0} />
      </div>
      <div>
        <div style={LABEL.style}>Required</div>
        <NumberInput label="Label" showLabel required value={0} />
      </div>
      <div>
        <div style={LABEL.style}>Disabled label</div>
        <NumberInput label="Label" showLabel state="disabled" value={0} />
      </div>
      <div>
        <div style={LABEL.style}>Large label size</div>
        <NumberInput label="Label" showLabel size="large" value={0} />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Helper Text
   ════════════════════════════════════════════════════════════════════ */
export const HelperTextVariants = {
  name: 'Number Input — Helper Text',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, fontFamily: FONT }}>
      <div>
        <div style={LABEL.style}>No helper text</div>
        <NumberInput label="Label" showLabel showHelperText={false} value={0} />
      </div>
      <div>
        <div style={LABEL.style}>With helper text</div>
        <NumberInput label="Label" showLabel helperText="Help Text" showHelperText value={0} />
      </div>
      <div>
        <div style={LABEL.style}>Helper + Error</div>
        <NumberInput label="Label" showLabel helperText="Help Text" showHelperText error value={0} />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   RTL
   ════════════════════════════════════════════════════════════════════ */
export const RTLNumberInput = {
  name: 'Number Input — RTL',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, fontFamily: FONT }}>
      <div>
        <div style={LABEL.style}>RTL — Default</div>
        <NumberInput label="تسمية" showLabel helperText="نص مساعد" showHelperText rtl value={0} />
      </div>
      <div>
        <div style={LABEL.style}>RTL — Error</div>
        <NumberInput label="تسمية" showLabel helperText="نص مساعد" showHelperText error rtl value={0} />
      </div>
      <div>
        <div style={LABEL.style}>RTL — Disabled</div>
        <NumberInput label="تسمية" showLabel state="disabled" rtl value={0} />
      </div>
      <div>
        <div style={LABEL.style}>RTL — Filled darker</div>
        <NumberInput label="تسمية" showLabel inputStyle="filled-darker" rtl required value={42} />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Prefix-Suffix Button — All States
   ════════════════════════════════════════════════════════════════════ */
export const PrefixSuffixAllStates = {
  name: 'Input Prefix-Suffix — All States',
  render: () => (
    <div style={{ display: 'flex', gap: 48, fontFamily: FONT, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {/* Solid - Plus */}
      <div>
        <div style={{ ...LABEL.style, color: '#000b36', textTransform: 'none', fontSize: 13, marginBottom: 16 }}>Solid — Plus</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['default', 'hovered', 'pressed', 'selected', 'focused', 'disabled'].map((state) => (
            <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ ...LABEL.style, width: 72, marginBottom: 0 }}>{state}</div>
              <InputPrefixSuffix type="plus" state={state} btnStyle="solid" size="large" />
            </div>
          ))}
        </div>
      </div>

      {/* Solid - Minus */}
      <div>
        <div style={{ ...LABEL.style, color: '#000b36', textTransform: 'none', fontSize: 13, marginBottom: 16 }}>Solid — Minus</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['default', 'hovered', 'pressed', 'selected', 'focused', 'disabled'].map((state) => (
            <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ ...LABEL.style, width: 72, marginBottom: 0 }}>{state}</div>
              <InputPrefixSuffix type="minus" state={state} btnStyle="solid" size="large" />
            </div>
          ))}
        </div>
      </div>

      {/* Subtle - Plus */}
      <div>
        <div style={{ ...LABEL.style, color: '#000b36', textTransform: 'none', fontSize: 13, marginBottom: 16 }}>Subtle — Plus</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['default', 'hovered', 'pressed', 'selected', 'focused', 'disabled'].map((state) => (
            <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ ...LABEL.style, width: 72, marginBottom: 0 }}>{state}</div>
              <InputPrefixSuffix type="plus" state={state} btnStyle="subtle" size="large" />
            </div>
          ))}
        </div>
      </div>

      {/* Subtle - Minus */}
      <div>
        <div style={{ ...LABEL.style, color: '#000b36', textTransform: 'none', fontSize: 13, marginBottom: 16 }}>Subtle — Minus</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['default', 'hovered', 'pressed', 'selected', 'focused', 'disabled'].map((state) => (
            <div key={state} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ ...LABEL.style, width: 72, marginBottom: 0 }}>{state}</div>
              <InputPrefixSuffix type="minus" state={state} btnStyle="subtle" size="large" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Prefix-Suffix Button — Sizes
   ════════════════════════════════════════════════════════════════════ */
export const PrefixSuffixSizes = {
  name: 'Input Prefix-Suffix — Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 40, fontFamily: FONT, alignItems: 'flex-end', flexWrap: 'wrap' }}>
      {['solid', 'subtle'].map((btnStyle) =>
        ['plus', 'minus'].map((type) =>
          ['large', 'medium'].map((size) => (
            <div key={`${btnStyle}-${type}-${size}`}>
              <div style={LABEL.style}>{btnStyle} {type} {size}</div>
              <InputPrefixSuffix type={type} btnStyle={btnStyle} size={size} />
            </div>
          ))
        )
      )}
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Interactive demo
   ════════════════════════════════════════════════════════════════════ */
export const InteractiveDemo = {
  name: 'Number Input — Interactive',
  render: () => {
    const [val, setVal] = useState(0);
    return (
      <div style={{ fontFamily: FONT, padding: 16 }}>
        <div style={LABEL.style}>Click +/− to change value</div>
        <NumberInput
          label="Quantity"
          showLabel
          helperText="Enter a number between 0 and 100"
          showHelperText
          value={val}
          onChange={setVal}
          min={0}
          max={100}
          step={1}
          required
        />
        <p style={{ marginTop: 12, fontSize: 14, color: '#6c7c96' }}>
          Current value: <strong>{val}</strong>
        </p>
      </div>
    );
  },
};

/* ════════════════════════════════════════════════════════════════════
   Full Matrix
   ════════════════════════════════════════════════════════════════════ */
export const FullMatrix = {
  name: 'Number Input — Full Matrix',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, fontFamily: FONT }}>
      {/* Large, all states */}
      {['default', 'hovered', 'focused', 'pressed', 'disabled', 'read-only'].map((state) =>
        [false, true].map((error) => (
          <div key={`${state}-${error}`}>
            <div style={LABEL.style}>{state}{error ? ' + error' : ''}</div>
            <NumberInput
              label="Label"
              showLabel
              helperText="Help Text"
              showHelperText
              state={state}
              error={error}
              value={state === 'read-only' ? 42 : 0}
              size="large"
            />
          </div>
        ))
      )}
      {/* Medium size */}
      {['default', 'focused', 'disabled'].map((state) => (
        <div key={`medium-${state}`}>
          <div style={LABEL.style}>medium {state}</div>
          <NumberInput
            label="Label"
            showLabel
            helperText="Help Text"
            showHelperText
            state={state}
            value={0}
            size="medium"
          />
        </div>
      ))}
    </div>
  ),
};
