import { ProgressIndicator } from './ProgressIndicator';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4399-23099&t=fWTlS4h9RZJZvHwC-4';

export default {
  title: 'Components/Progress Indicator',
  component: ProgressIndicator,
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
    docs: { canvas: { sourceState: 'shown' } },
  },
  argTypes: {
    currentStep: {
      control: { type: 'range', min: 0, max: 4, step: 1 },
      description: '0-based index of the active step',
      table: { defaultValue: { summary: '1' } },
    },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      table: { defaultValue: { summary: 'vertical' } },
    },
    variant: {
      control: 'radio',
      options: ['default', 'dot', 'outlined'],
      description: 'Visual style of the step indicator',
      table: { defaultValue: { summary: 'default' } },
    },
    showDescription: {
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    rtl: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    currentStep:     1,
    orientation:     'vertical',
    variant:         'default',
    showDescription: true,
    rtl:             false,
    steps: [
      { label: 'Personal Information', description: 'Enter your name and contact details' },
      { label: 'Account Setup',        description: 'Choose a username and password' },
      { label: 'Verify Email',         description: 'Confirm your email address' },
      { label: 'Complete Profile',     description: 'Add photo and preferences' },
    ],
  },
};

/* ── Playground ─────────────────────────────────────────────── */

export const Playground = {};

/* ── States ─────────────────────────────────────────────────── */

export const AllCompleted = {
  name: 'All Steps Completed',
  args: { currentStep: 4 },
};

export const FirstStep = {
  name: 'First Step (Current)',
  args: { currentStep: 0 },
};

export const MiddleStep = {
  name: 'Middle Step (2 of 4)',
  args: { currentStep: 2 },
};

export const LastStep = {
  name: 'Last Step (Current)',
  args: { currentStep: 3 },
};

export const NoneStarted = {
  name: 'None Started',
  args: { currentStep: -1 },
};

/* ── Orientations ───────────────────────────────────────────── */

export const HorizontalLayout = {
  name: 'Horizontal Layout',
  args: {
    orientation: 'horizontal',
    currentStep: 1,
    steps: [
      { label: 'Details',  description: 'Fill in your info'   },
      { label: 'Payment',  description: 'Enter card details'  },
      { label: 'Confirm',  description: 'Review and submit'   },
    ],
  },
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ minWidth: 480 }}><Story /></div>],
};

export const HorizontalNoDescription = {
  name: 'Horizontal — No Description',
  args: {
    orientation:     'horizontal',
    showDescription: false,
    currentStep:     1,
    steps: [
      { label: 'Details'  },
      { label: 'Payment'  },
      { label: 'Confirm'  },
    ],
  },
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ minWidth: 360 }}><Story /></div>],
};

/* ── No description ─────────────────────────────────────────── */

export const NoDescription = {
  name: 'Without Descriptions',
  args: {
    showDescription: false,
    steps: [
      { label: 'Personal Info' },
      { label: 'Account Setup' },
      { label: 'Verify Email'  },
      { label: 'Complete'      },
    ],
  },
};

/* ── RTL ────────────────────────────────────────────────────── */

export const RTLArabic = {
  name: 'RTL / Arabic',
  args: {
    rtl:         true,
    currentStep: 1,
    steps: [
      { label: 'المعلومات الشخصية',   description: 'أدخل اسمك وتفاصيل التواصل' },
      { label: 'إعداد الحساب',        description: 'اختر اسم المستخدم وكلمة المرور' },
      { label: 'التحقق من البريد',    description: 'تأكيد عنوان بريدك الإلكتروني' },
      { label: 'إكمال الملف الشخصي', description: 'أضف الصورة والتفضيلات' },
    ],
  },
};

export const RTLHorizontal = {
  name: 'RTL — Horizontal',
  args: {
    rtl:         true,
    orientation: 'horizontal',
    currentStep: 1,
    steps: [
      { label: 'التفاصيل',   description: 'أدخل بياناتك' },
      { label: 'الدفع',     description: 'بيانات البطاقة' },
      { label: 'التأكيد',   description: 'مراجعة وإرسال'  },
    ],
  },
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ minWidth: 480 }}><Story /></div>],
};

/* ── All states grid ────────────────────────────────────────── */

const SAMPLE_STEPS = [
  { label: 'Personal Information', description: 'Enter your name and contact details' },
  { label: 'Account Setup',        description: 'Choose a username and password' },
  { label: 'Verify Email',         description: 'Confirm your email address' },
  { label: 'Complete Profile',     description: 'Add photo and preferences' },
];

export const AllStates = {
  name: 'All States Grid',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
      {[0, 1, 2, 4].map(cs => (
        <div key={cs}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 12 }}>
            {cs === 0 ? 'Step 1 Current' : cs === 4 ? 'All Completed' : `Step ${cs + 1} Current`}
          </div>
          <ProgressIndicator steps={SAMPLE_STEPS} currentStep={cs} />
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};

export const AllStatesRTL = {
  name: 'All States RTL Grid',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
      {[0, 1, 4].map(cs => (
        <div key={cs}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 12, direction: 'rtl' }}>
            {cs === 0 ? 'الخطوة الأولى' : cs === 4 ? 'مكتمل' : `الخطوة ${cs + 1}`}
          </div>
          <ProgressIndicator
            steps={[
              { label: 'المعلومات الشخصية', description: 'أدخل اسمك' },
              { label: 'إعداد الحساب',      description: 'كلمة المرور' },
              { label: 'التحقق',            description: 'تأكيد البريد' },
              { label: 'الإكمال',           description: 'الملف الشخصي' },
            ]}
            currentStep={cs}
            rtl
          />
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};

/* ── Dot variant ─────────────────────────────────────────────── */

export const DotVariant = {
  name: 'Dot Variant',
  args: {
    variant: 'dot',
    currentStep: 1,
  },
};

export const DotHorizontal = {
  name: 'Dot — Horizontal',
  args: {
    variant:     'dot',
    orientation: 'horizontal',
    currentStep: 1,
    steps: [
      { label: 'Details',  description: 'Fill in your info'  },
      { label: 'Payment',  description: 'Enter card details' },
      { label: 'Confirm',  description: 'Review and submit'  },
    ],
  },
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ minWidth: 480 }}><Story /></div>],
};

/* ── Outlined variant ────────────────────────────────────────── */

export const OutlinedVariant = {
  name: 'Outlined Variant',
  args: {
    variant: 'outlined',
    currentStep: 1,
  },
};

export const OutlinedHorizontal = {
  name: 'Outlined — Horizontal',
  args: {
    variant:     'outlined',
    orientation: 'horizontal',
    currentStep: 1,
    steps: [
      { label: 'Details',  description: 'Fill in your info'  },
      { label: 'Payment',  description: 'Enter card details' },
      { label: 'Confirm',  description: 'Review and submit'  },
    ],
  },
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ minWidth: 480 }}><Story /></div>],
};

/* ── Variant comparison ──────────────────────────────────────── */

export const VariantComparison = {
  name: 'Variant Comparison',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
      {['default', 'dot', 'outlined'].map(v => (
        <div key={v}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 16 }}>{v}</div>
          <ProgressIndicator
            variant={v}
            currentStep={1}
            steps={[
              { label: 'Personal Info',  description: 'Name and contact' },
              { label: 'Account Setup',  description: 'Username and password' },
              { label: 'Verify Email',   description: 'Confirm your email' },
            ]}
          />
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};
