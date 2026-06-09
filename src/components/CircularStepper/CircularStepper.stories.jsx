import React, { useState } from 'react';
import { CircularStepper } from './CircularStepper';

/* ── Story meta ─────────────────────────────────────────────── */

export default {
  title: 'Components/CircularStepper',
  component: CircularStepper,
  parameters: { layout: 'padded' },
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 1, max: 8 },
      description: 'Current step (1-indexed)',
    },
    totalSteps: {
      control: { type: 'number', min: 2, max: 8 },
      description: 'Total number of steps',
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Circle diameter — xs=40 · sm=48 · md=64 · lg=80 · xl=120',
    },
    variant: {
      control: 'radio',
      options: ['primary', 'neutral'],
      description: 'Arc fill color',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Color theme',
    },
    label: {
      control: 'text',
      description: 'Step title — shows text content area when provided',
    },
    description: {
      control: 'text',
      description: 'Step description shown below the label',
    },
    dir: {
      control: 'radio',
      options: ['ltr', 'rtl'],
      description: 'Text direction',
    },
    onNext: { action: 'next clicked' },
    onBack: { action: 'back clicked' },
  },
  args: {
    currentStep: 1,
    totalSteps:  4,
    size:        'md',
    variant:     'primary',
    theme:       'light',
    label:       '',
    description: '',
    dir:         'ltr',
  },
};

/* ── Playground ─────────────────────────────────────────────── */
export const Playground = {
  render: (args) => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif", padding: 8 }}>
      <CircularStepper {...args} />
    </div>
  ),
};

/* ── Variants ────────────────────────────────────────────────── */
export const Variants = {
  name: 'Variants — Primary & Neutral',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { variant: 'primary', label: 'Primary (default)' },
        { variant: 'neutral', label: 'Neutral' },
      ].map(({ variant, label }) => (
        <div key={variant}>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>{label}</p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            {[1, 2, 3, 4].map(step => (
              <CircularStepper key={step} size="lg" currentStep={step} totalSteps={4} variant={variant} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── All Sizes ───────────────────────────────────────────────── */
export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {[
        { size: 'xl', label: 'X-Large — 120 px' },
        { size: 'lg', label: 'Large — 80 px' },
        { size: 'md', label: 'Medium — 64 px' },
        { size: 'sm', label: 'Small — 48 px' },
        { size: 'xs', label: 'X-Small — 40 px' },
      ].map(({ size, label }) => (
        <div key={size}>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>{label}</p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <CircularStepper size={size} currentStep={2} totalSteps={4} variant="primary" />
            <CircularStepper size={size} currentStep={2} totalSteps={4} variant="neutral" />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── Step Progression ────────────────────────────────────────── */
export const StepProgression = {
  name: 'Step Progression (1 → 4)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {['primary', 'neutral'].map(v => (
        <div key={v}>
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: '#6C7C96', textTransform: 'capitalize' }}>{v}</p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            {[1, 2, 3, 4].map(step => (
              <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <CircularStepper size="xl" currentStep={step} totalSteps={4} variant={v} />
                <span style={{ fontSize: 11, color: '#6b7280' }}>{Math.round(step / 4 * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── With Content ────────────────────────────────────────────── */
export const WithContent = {
  name: 'With Label + Description + Navigation',
  render: () => {
    const [step, setStep] = useState(1);
    const total = 4;
    return (
      <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <CircularStepper
          size="xl"
          currentStep={step}
          totalSteps={total}
          variant="primary"
          label={`Step ${step}`}
          description="This is the step description. It provides additional context about what the user should do."
          onBack={step > 1     ? () => setStep(s => s - 1) : undefined}
          onNext={step < total ? () => setStep(s => s + 1) : undefined}
        />
        <p style={{ marginTop: 12, fontSize: 12, color: '#6C7C96' }}>
          Interactive — click Next and Back to advance through the steps.
        </p>
      </div>
    );
  },
};

/* ── All Sizes With Content ──────────────────────────────────── */
export const AllSizesWithContent = {
  name: 'All Sizes — With Content',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {(['xl', 'lg', 'md', 'sm', 'xs']).map(s => (
        <div key={s}>
          <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 600, color: '#6C7C96', textTransform: 'uppercase' }}>
            {s}
          </p>
          <CircularStepper
            size={s}
            currentStep={1}
            totalSteps={4}
            variant="primary"
            label="Step One"
            description="This is step description"
            onNext={() => {}}
          />
        </div>
      ))}
    </div>
  ),
};

/* ── Dark Theme ──────────────────────────────────────────────── */
export const DarkTheme = {
  name: 'Dark Theme',
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div style={{ background: '#0d121c', padding: 32, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: '#6c737f' }}>Primary — Steps 1–4</p>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          {[1, 2, 3, 4].map(step => (
            <CircularStepper key={step} size="lg" currentStep={step} totalSteps={4} variant="primary" theme="dark" />
          ))}
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: '#6c737f' }}>Full variant on dark</p>
        <CircularStepper
          size="xl"
          currentStep={2}
          totalSteps={4}
          variant="primary"
          theme="dark"
          label="Step Two"
          description="This is step description"
          onBack={() => {}}
          onNext={() => {}}
        />
      </div>
    </div>
  ),
};

/* ── Dark + Neutral ──────────────────────────────────────────── */
export const DarkNeutral = {
  name: 'Dark Theme — Neutral',
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div style={{ background: '#0d121c', padding: 32, borderRadius: 12, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: '#6c737f' }}>Neutral — Steps 1–4</p>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        {[1, 2, 3, 4].map(step => (
          <CircularStepper key={step} size="lg" currentStep={step} totalSteps={4} variant="neutral" theme="dark" />
        ))}
      </div>
    </div>
  ),
};

/* ── RTL Arabic ──────────────────────────────────────────────── */
export const RTLArabic = {
  name: 'RTL Arabic',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>RTL — Indicator steps</p>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          {[1, 2, 3, 4].map(step => (
            <CircularStepper key={step} size="lg" currentStep={step} totalSteps={4} variant="primary" dir="rtl" />
          ))}
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: '#6C7C96' }}>RTL — Full variant with Arabic label</p>
        <CircularStepper
          size="xl"
          currentStep={1}
          totalSteps={4}
          variant="primary"
          dir="rtl"
          label="الخطوة الأولى"
          description="يكتب المحتوى الإضافي هنا في حال ان عنوان الاختيار يحتاج إلى شرح أو تفصيل."
          onBack={() => {}}
          onNext={() => {}}
        />
      </div>
      <p style={{ margin: 0, fontSize: 12, color: '#6C7C96' }}>
        dir="rtl" — text content area moves to the left of the circle. Inner counter switches to N من M format. Arc always fills clockwise.
      </p>
    </div>
  ),
};

/* ── RTL Dark ────────────────────────────────────────────────── */
export const RTLDark = {
  name: 'RTL Dark Theme',
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div style={{ background: '#0d121c', padding: 32, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: '#6c737f' }}>RTL Dark — Indicator steps</p>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          {[1, 2, 3, 4].map(step => (
            <CircularStepper key={step} size="lg" currentStep={step} totalSteps={4} variant="primary" theme="dark" dir="rtl" />
          ))}
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: '#6c737f' }}>RTL Dark — Full variant</p>
        <CircularStepper
          size="xl"
          currentStep={1}
          totalSteps={4}
          variant="primary"
          theme="dark"
          dir="rtl"
          label="الخطوة الأولى"
          description="يكتب المحتوى الإضافي هنا في حال ان عنوان الاختيار يحتاج إلى شرح أو تفصيل."
          onNext={() => {}}
        />
      </div>
    </div>
  ),
};

/* ── Interactive ─────────────────────────────────────────────── */
export const Interactive = {
  name: 'Interactive — Click to Advance',
  render: () => {
    const [step, setStep] = useState(1);
    const total = 5;
    const steps = ['Introduction', 'Select Option', 'Review Details', 'Confirm Action', 'Complete'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
        <CircularStepper
          size="xl"
          currentStep={step}
          totalSteps={total}
          variant="primary"
          label={steps[step - 1]}
          description={`Complete the actions required in step ${step} before moving forward.`}
          onBack={step > 1     ? () => setStep(s => s - 1) : undefined}
          onNext={step < total ? () => setStep(s => s + 1) : undefined}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i + 1)}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                border: '2px solid ' + (i + 1 === step ? '#1849a9' : '#e5e7eb'),
                background: i + 1 <= step ? '#1849a9' : '#fff',
                color: i + 1 <= step ? '#fff' : '#6b7280',
                fontSize: 12, fontWeight: 700, cursor: 'pointer',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <p style={{ margin: 0, fontSize: 12, color: '#6C7C96' }}>
          Click the step dots or Next / Back to navigate. The arc fills progressively as steps advance.
        </p>
      </div>
    );
  },
};

/* ── Size × Variant Grid ─────────────────────────────────────── */
export const SizeVariantGrid = {
  name: 'Size × Variant Grid',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(4, 1fr)', gap: 16, alignItems: 'center' }}>
        <div />
        {[1, 2, 3, 4].map(s => (
          <div key={s} style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#6b7280', textAlign: 'center' }}>Step {s} of 4</div>
        ))}
        {['xs', 'sm', 'md', 'lg', 'xl'].flatMap(sz =>
          ['primary', 'neutral'].flatMap(v => [
            <div key={`${sz}-${v}-label`} style={{ fontSize: 11, color: '#6b7280', whiteSpace: 'nowrap' }}>{sz} / {v}</div>,
            ...[1, 2, 3, 4].map(step => (
              <div key={`${sz}-${v}-${step}`} style={{ display: 'flex', justifyContent: 'center' }}>
                <CircularStepper size={sz} currentStep={step} totalSteps={4} variant={v} />
              </div>
            ))
          ])
        )}
      </div>
    </div>
  ),
};
