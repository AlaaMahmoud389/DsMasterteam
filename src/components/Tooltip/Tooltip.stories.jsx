import { Tooltip } from './Tooltip';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4404-4368&t=ohnsyAtOEvJbxf9o-4';

const label = (text) => (
  <span style={{
    fontSize: 11, fontWeight: 600, color: '#6b7280',
    textTransform: 'uppercase', letterSpacing: '0.05em',
    fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
    display: 'block', marginBottom: 8,
  }}>
    {text}
  </span>
);

/* Wraps a tooltip in a neutral padded box — drop shadow provides visual definition.
   Extra padding is added on the beak side so the triangle is never clipped. */
const BeakBox = ({ placement = 'None', children }) => {
  const pad = {
    None:   '24px',
    Top:    '28px 24px 20px',
    Bottom: '20px 24px 28px',
    Left:   '24px 24px 24px 28px',
    Right:  '24px 28px 24px 24px',
  }[placement] ?? '24px';
  return (
    <div style={{ background: '#f4f5f7', borderRadius: 10, padding: pad, display: 'inline-flex' }}>
      {children}
    </div>
  );
};

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    inverted: {
      control: 'boolean',
      description: 'Dark background theme',
      table: { defaultValue: { summary: 'false' } },
    },
    beakPlacement: {
      control: 'select',
      options: ['None', 'Top', 'Bottom', 'Left', 'Right'],
      description: 'Side where the beak (pointer) appears',
      table: { defaultValue: { summary: 'None' } },
    },
    beakAlignment: {
      control: 'radio',
      options: ['Start', 'Center'],
      description: 'Beak position on its edge — Start = leading corner, Center = midpoint',
      table: { defaultValue: { summary: 'Start' } },
    },
    icon: {
      control: 'boolean',
      description: 'Show feedback icon',
      table: { defaultValue: { summary: 'true' } },
    },
    rtl: {
      control: 'boolean',
      description: 'Right-to-left layout for Arabic',
      table: { defaultValue: { summary: 'false' } },
    },
    title: {
      control: 'text',
      description: 'Tooltip title text',
    },
    body: {
      control: 'text',
      description: 'Tooltip body/description text',
    },
  },
  args: {
    inverted:      false,
    beakPlacement: 'None',
    beakAlignment: 'Start',
    icon:          true,
    rtl:           false,
    title:         'Tooltip title',
    body:          'Max width of tooltips is 240px - text will wrap automatically',
  },
};

export const Playground = {};

export const LightTheme = {
  name: 'Light Theme',
  render: (args) => (
    <BeakBox><Tooltip {...args} inverted={false} /></BeakBox>
  ),
};

export const DarkTheme = {
  name: 'Dark Theme',
  render: (args) => (
    <BeakBox><Tooltip {...args} inverted={true} /></BeakBox>
  ),
};

export const WithoutIcon = {
  name: 'Without Icon',
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div>
        {label('Light')}
        <BeakBox><Tooltip {...args} icon={false} inverted={false} /></BeakBox>
      </div>
      <div>
        {label('Dark')}
        <BeakBox><Tooltip {...args} icon={false} inverted={true} /></BeakBox>
      </div>
    </div>
  ),
};

/* ── Beak placement stories ─────────────────────────────────── */

export const BeakTop = {
  name: 'Beak — Top',
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div>
        {label('Light')}
        <BeakBox placement="Top">
          <Tooltip {...args} beakPlacement="Top" beakAlignment="Center" inverted={false} />
        </BeakBox>
      </div>
      <div>
        {label('Dark')}
        <BeakBox placement="Top">
          <Tooltip {...args} beakPlacement="Top" beakAlignment="Center" inverted={true} />
        </BeakBox>
      </div>
    </div>
  ),
};

export const BeakBottom = {
  name: 'Beak — Bottom',
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div>
        {label('Light')}
        <BeakBox placement="Bottom">
          <Tooltip {...args} beakPlacement="Bottom" beakAlignment="Center" inverted={false} />
        </BeakBox>
      </div>
      <div>
        {label('Dark')}
        <BeakBox placement="Bottom">
          <Tooltip {...args} beakPlacement="Bottom" beakAlignment="Center" inverted={true} />
        </BeakBox>
      </div>
    </div>
  ),
};

export const BeakLeft = {
  name: 'Beak — Left',
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div>
        {label('Light')}
        <BeakBox placement="Left">
          <Tooltip {...args} beakPlacement="Left" beakAlignment="Center" inverted={false} />
        </BeakBox>
      </div>
      <div>
        {label('Dark')}
        <BeakBox placement="Left">
          <Tooltip {...args} beakPlacement="Left" beakAlignment="Center" inverted={true} />
        </BeakBox>
      </div>
    </div>
  ),
};

export const BeakRight = {
  name: 'Beak — Right',
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div>
        {label('Light')}
        <BeakBox placement="Right">
          <Tooltip {...args} beakPlacement="Right" beakAlignment="Center" inverted={false} />
        </BeakBox>
      </div>
      <div>
        {label('Dark')}
        <BeakBox placement="Right">
          <Tooltip {...args} beakPlacement="Right" beakAlignment="Center" inverted={true} />
        </BeakBox>
      </div>
    </div>
  ),
};

export const AllFourSides = {
  name: 'All 4 Beak Sides',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
      {[
        { placement: 'Top',    symbol: '▲' },
        { placement: 'Bottom', symbol: '▽' },
        { placement: 'Left',   symbol: '◄' },
        { placement: 'Right',  symbol: '►' },
      ].map(({ placement, symbol }) => (
        <div key={placement}>
          {label(`${symbol} ${placement}`)}
          <BeakBox placement={placement}>
            <Tooltip {...args} beakPlacement={placement} beakAlignment="Center" inverted={false} />
          </BeakBox>
        </div>
      ))}
    </div>
  ),
};

/* ── Alignment stories ──────────────────────────────────────── */

export const BeakAlignStart = {
  name: 'Alignment — Start',
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div>
        {label('Light')}
        <BeakBox placement="Top">
          <Tooltip {...args} beakPlacement="Top" beakAlignment="Start" inverted={false} />
        </BeakBox>
      </div>
      <div>
        {label('Dark')}
        <BeakBox placement="Top">
          <Tooltip {...args} beakPlacement="Top" beakAlignment="Start" inverted={true} />
        </BeakBox>
      </div>
    </div>
  ),
};

export const BeakAlignCenter = {
  name: 'Alignment — Center',
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div>
        {label('Light')}
        <BeakBox placement="Top">
          <Tooltip {...args} beakPlacement="Top" beakAlignment="Center" inverted={false} />
        </BeakBox>
      </div>
      <div>
        {label('Dark')}
        <BeakBox placement="Top">
          <Tooltip {...args} beakPlacement="Top" beakAlignment="Center" inverted={true} />
        </BeakBox>
      </div>
    </div>
  ),
};

/* ── RTL stories ────────────────────────────────────────────── */

export const RTLArabic = {
  name: 'RTL — Light',
  render: (args) => (
    <BeakBox>
      <Tooltip
        {...args}
        rtl={true}
        inverted={false}
        title="عنوان التلميح"
        body="أقصى عرض للتلميحات هو 240px - سيتم محاذاة النص بشكل تلقائي"
      />
    </BeakBox>
  ),
};

export const RTLDark = {
  name: 'RTL — Dark',
  render: (args) => (
    <BeakBox>
      <Tooltip
        {...args}
        rtl={true}
        inverted={true}
        title="عنوان التلميح"
        body="أقصى عرض للتلميحات هو 240px - سيتم محاذاة النص بشكل تلقائي"
      />
    </BeakBox>
  ),
};

export const RTLWithBeak = {
  name: 'RTL — With Top Beak',
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div>
        {label('Light')}
        <BeakBox placement="Top">
          <Tooltip {...args} rtl={true} inverted={false} beakPlacement="Top" beakAlignment="Center"
            title="عنوان التلميح" body="أقصى عرض للتلميحات هو 240px - سيتم محاذاة النص بشكل تلقائي" />
        </BeakBox>
      </div>
      <div>
        {label('Dark')}
        <BeakBox placement="Top">
          <Tooltip {...args} rtl={true} inverted={true} beakPlacement="Top" beakAlignment="Center"
            title="عنوان التلميح" body="أقصى عرض للتلميحات هو 240px - سيتم محاذاة النص بشكل تلقائي" />
        </BeakBox>
      </div>
    </div>
  ),
};

export const LightVsDark = {
  name: 'Light vs Dark',
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div>
        {label('Light')}
        <BeakBox><Tooltip {...args} inverted={false} /></BeakBox>
      </div>
      <div>
        {label('Dark')}
        <BeakBox><Tooltip {...args} inverted={true} /></BeakBox>
      </div>
    </div>
  ),
};

/* ── Figma matrix: all placements × all themes (LTR + RTL) ─── */

const MATRIX_ROWS = [
  { placement: 'None',   alignment: 'Start',  symbol: '—' },
  { placement: 'Top',    alignment: 'Center', symbol: '▲' },
  { placement: 'Bottom', alignment: 'Center', symbol: '▽' },
  { placement: 'Left',   alignment: 'Center', symbol: '◄' },
  { placement: 'Right',  alignment: 'Center', symbol: '►' },
];

const BEAK_PAD = {
  None:   '24px',
  Top:    '28px 24px 20px',
  Bottom: '20px 24px 28px',
  Left:   '24px 24px 24px 28px',
  Right:  '24px 28px 24px 24px',
};

export const AllStates = {
  name: 'All States (Figma Matrix)',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif" }}>
      <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(4, 1fr)', gap: 12, marginBottom: 8 }}>
        <div />
        {['LTR — Light', 'LTR — Dark', 'RTL — Light', 'RTL — Dark'].map((h) => (
          <div key={h} style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>{h}</div>
        ))}
      </div>

      {MATRIX_ROWS.map(({ placement, alignment, symbol }) => (
        <div key={placement} style={{ display: 'grid', gridTemplateColumns: '80px repeat(4, 1fr)', gap: 12, marginBottom: 12, alignItems: 'start' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', paddingTop: 12, textAlign: 'right', paddingRight: 8 }}>
            {symbol} {placement}
          </div>
          {[
            { rtl: false, inverted: false },
            { rtl: false, inverted: true },
            { rtl: true,  inverted: false },
            { rtl: true,  inverted: true },
          ].map(({ rtl, inverted }, ci) => (
            <div key={ci} style={{ background: '#f4f5f7', borderRadius: 10, padding: BEAK_PAD[placement], display: 'inline-flex', justifyContent: 'center' }}>
              <Tooltip
                beakPlacement={placement}
                beakAlignment={alignment}
                inverted={inverted}
                rtl={rtl}
                icon={true}
                title={rtl ? 'عنوان التلميح' : 'Tooltip title'}
                body={rtl
                  ? 'أقصى عرض للتلميحات هو 240px - سيتم محاذاة النص بشكل تلقائي'
                  : 'Max width of tooltips is 240px - text will wrap automatically'}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};
