import { useState } from 'react';
import { CircularStepper } from './CircularStepper';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4250-1945';

/* ── Story meta ───────────────────────────────────────────── */

export default {
  title: 'Components/CircularStepper',
  component: CircularStepper,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 1, max: 8 },
      description: 'Current step (1-indexed)',
      table: { defaultValue: { summary: '1' } },
    },
    totalSteps: {
      control: { type: 'number', min: 2, max: 8 },
      description: 'Total number of steps',
      table: { defaultValue: { summary: '4' } },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Circle diameter — xs=40 · sm=48 · md=64 · lg=80 · xl=120',
      table: { defaultValue: { summary: 'md' } },
    },
    variant: {
      control: 'select',
      options: ['primary', 'neutral'],
      description: 'Arc fill color',
      table: { defaultValue: { summary: 'primary' } },
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Color theme',
      table: { defaultValue: { summary: 'light' } },
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
      control: 'select',
      options: ['ltr', 'rtl'],
      description: 'Text direction',
      table: { defaultValue: { summary: 'ltr' } },
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

/* ── Playground ──────────────────────────────────────────── */

export const Playground = {};

/* ── Variants ────────────────────────────────────────────── */

export const Primary = {
  name: 'Primary Variant',
  args: { variant: 'primary', currentStep: 2, totalSteps: 4 },
};

export const Neutral = {
  name: 'Neutral Variant',
  args: { variant: 'neutral', currentStep: 2, totalSteps: 4 },
};

/* ── All sizes ───────────────────────────────────────────── */

export const AllSizes = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {(['xs','sm','md','lg','xl']).map(s => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <CircularStepper size={s} currentStep={2} totalSteps={4} variant="primary" />
          <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 600 }}>{s}</span>
        </div>
      ))}
    </div>
  ),
};

/* ── Step progression ────────────────────────────────────── */

export const StepProgression = {
  name: 'Step Progression (1 → 4)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {['primary','neutral'].map(v => (
        <div key={v}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: '#6b7280', marginBottom: 12 }}>{v}</div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            {[1,2,3,4].map(step => (
              <CircularStepper key={step} size="lg" currentStep={step} totalSteps={4} variant={v} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── With full content ───────────────────────────────────── */

export const WithContent = {
  name: 'With Label + Description + Navigation',
  render: () => {
    const [step, setStep] = useState(1);
    const total = 4;
    return (
      <CircularStepper
        size="xl"
        currentStep={step}
        totalSteps={total}
        variant="primary"
        label={`Step ${step}`}
        description="This is the step description. It provides additional context about what the user should do."
        onBack={step > 1 ? () => setStep(s => s - 1) : undefined}
        onNext={step < total ? () => setStep(s => s + 1) : undefined}
      />
    );
  },
};

/* ── All sizes with content ──────────────────────────────── */

export const AllSizesWithContent = {
  name: 'All Sizes — With Content',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      {(['xs','sm','md','lg','xl']).map(s => (
        <CircularStepper
          key={s}
          size={s}
          currentStep={1}
          totalSteps={4}
          variant="primary"
          label="Step One"
          description="This is step description"
          onNext={() => {}}
        />
      ))}
    </div>
  ),
};

/* ── Dark theme ──────────────────────────────────────────── */

export const DarkTheme = {
  name: 'Dark Theme',
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div style={{ background: '#0d121c', padding: 32, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        {[1,2,3,4].map(step => (
          <CircularStepper key={step} size="lg" currentStep={step} totalSteps={4} variant="primary" theme="dark" />
        ))}
      </div>
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
  ),
};

/* ── Dark + Neutral ──────────────────────────────────────── */

export const DarkNeutral = {
  name: 'Dark Theme — Neutral',
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div style={{ background: '#0d121c', padding: 32, borderRadius: 12 }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        {[1,2,3,4].map(step => (
          <CircularStepper key={step} size="lg" currentStep={step} totalSteps={4} variant="neutral" theme="dark" />
        ))}
      </div>
    </div>
  ),
};

/* ── RTL Arabic ──────────────────────────────────────────── */

export const RTLArabic = {
  name: 'RTL Arabic',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        {[1,2,3,4].map(step => (
          <CircularStepper key={step} size="lg" currentStep={step} totalSteps={4} variant="primary" dir="rtl" />
        ))}
      </div>
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
  ),
};

/* ── RTL Dark ────────────────────────────────────────────── */

export const RTLDark = {
  name: 'RTL Dark Theme',
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div style={{ background: '#0d121c', padding: 32, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        {[1,2,3,4].map(step => (
          <CircularStepper key={step} size="lg" currentStep={step} totalSteps={4} variant="primary" theme="dark" dir="rtl" />
        ))}
      </div>
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
  ),
};

/* ── Interactive stepper ─────────────────────────────────── */

export const Interactive = {
  name: 'Interactive — Click to advance',
  render: () => {
    const [step, setStep] = useState(1);
    const total = 5;
    const steps = ['Introduction','Select Option','Review Details','Confirm Action','Complete'];
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
      </div>
    );
  },
};

/* ── Size × Variant grid ─────────────────────────────────── */

export const SizeVariantGrid = {
  name: 'Size × Variant Grid',
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(4, 1fr)', gap: 16, alignItems: 'center' }}>
        <div />
        {[1,2,3,4].map(s => (
          <div key={s} style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#6b7280', textAlign: 'center' }}>Step {s} of 4</div>
        ))}
        {['xs','sm','md','lg','xl'].flatMap(sz =>
          ['primary','neutral'].flatMap(v => [
            <div key={`${sz}-${v}-label`} style={{ fontSize: 11, color: '#6b7280', whiteSpace: 'nowrap' }}>{sz} / {v}</div>,
            ...[1,2,3,4].map(step => (
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
