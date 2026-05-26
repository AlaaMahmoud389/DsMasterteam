import { Filtration, FilterTrigger } from './Filtration';

const CARD = {
  border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', background: '#fff',
};

export default {
  title: 'Components/Filtration',
  component: Filtration,
  parameters: { layout: 'padded' },
  argTypes: {
    rtl: { control: 'boolean' },
  },
};

// ═══════════════════════════════════════════════════════════════
// 1. INTERACTIVE — Controls
// ═══════════════════════════════════════════════════════════════
export const Default = {
  name: 'Interactive (Controls)',
  args: { rtl: false },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 32, background: '#f8fafc', minHeight: '100vh' }}>
      <Filtration {...args} />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════
// 2. ALL FILTER TYPES — LTR + RTL side by side
// ═══════════════════════════════════════════════════════════════
export const AllStates = {
  name: 'All States — LTR & RTL',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', background: '#f8fafc', padding: 32, alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#d1d5db', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 8 }}>LTR</div>
        <Filtration rtl={false} />
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#d1d5db', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 8 }}>RTL</div>
        <Filtration rtl />
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════
// 3. RTL SUPPORT
// ═══════════════════════════════════════════════════════════════
export const RTLSupport = {
  name: 'RTL Support',
  args: { rtl: true },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 32, background: '#f8fafc', minHeight: '100vh' }}>
      <Filtration {...args} />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════
// 4. FILTER TRIGGER — closed state with result chips
// ═══════════════════════════════════════════════════════════════
export const FilterTriggerStory = {
  name: 'Filter Trigger — With Results',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, padding: 32, background: '#f8fafc', alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#d1d5db', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 12 }}>LTR — Closed with selections</div>
        <FilterTrigger results={['Item', 'Item', 'Item']} />
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#d1d5db', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 12 }}>RTL — Closed with selections</div>
        <FilterTrigger rtl results={['عنصر', 'عنصر', 'عنصر']} />
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#d1d5db', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 12 }}>No results</div>
        <FilterTrigger results={[]} />
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════
// 5. FILTER TYPES — individual previews
// ═══════════════════════════════════════════════════════════════
export const FilterTypes = {
  name: 'Filter Types Overview',
  parameters: { layout: 'padded' },
  render: () => {
    const LABEL = { fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 };
    const types = [
      { label: 'Multi-Select Checkbox', desc: 'Search + checkbox list + show more' },
      { label: 'Single Select',         desc: 'List with active checkmark' },
      { label: 'Radio Button',          desc: 'Single-choice radio group' },
      { label: 'Chips Multi-Select',    desc: 'Removable chip tags' },
      { label: 'Slider Range',          desc: 'Dual-handle range slider' },
      { label: 'Input Range',           desc: 'Min / Max numeric inputs with currency suffix' },
      { label: 'Date Picker',           desc: 'Date field input' },
      { label: 'Rating Text-Based',     desc: 'Highest / Lowest option list' },
    ];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24, background: '#f8fafc', padding: 32 }}>
        {types.map(({ label, desc }) => (
          <div key={label} style={CARD}>
            <div style={{ padding: '10px 16px', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#374151' }}>{label}</div>
              <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{desc}</div>
            </div>
            <div style={{ padding: 16 }}>
              <Filtration />
            </div>
          </div>
        ))}
      </div>
    );
  },
};
