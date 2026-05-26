import { EmptyState } from './EmptyState';

const LABEL = {
  fontSize: 11, fontWeight: 700, color: '#9ca3af',
  textTransform: 'uppercase', letterSpacing: '.06em',
};

const CARD = {
  border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', background: '#fff',
};

const CARD_LABEL = {
  padding: '6px 14px', borderBottom: '1px solid #f3f4f6',
  ...LABEL, marginBottom: 0,
};

export default {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: { layout: 'padded' },
  argTypes: {
    iconType:      { control: 'select', options: ['featured-icon', 'illustration', 'file-type-icon'] },
    size:          { control: 'select', options: ['sm', 'md', 'lg'] },
    rtl:           { control: 'boolean' },
    showArrow:     { control: 'boolean' },
  },
};

// ═══════════════════════════════════════════════════════════════
// 1. INTERACTIVE — Controls
// ═══════════════════════════════════════════════════════════════
export const Default = {
  name: 'Interactive (Controls)',
  args: {
    iconType: 'featured-icon',
    size: 'sm',
    rtl: false,
    title: 'No projects found',
    description: 'Your search "Landing page design" did not match any projects. Please try again.',
    primaryLabel: 'Button',
    secondaryLabel: 'Button',
    showArrow: true,
  },
  render: (args) => (
    <div style={{ maxWidth: 560 }}>
      <div style={CARD}>
        <EmptyState {...args} />
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════
// 2. ALL STATES — Figma canvas (3 types × 3 sizes × LTR + RTL)
// ═══════════════════════════════════════════════════════════════
export const AllStates = {
  name: 'All States — Figma Canvas',
  parameters: { layout: 'padded' },
  render: () => {
    const types = [
      { iconType: 'featured-icon',  label: 'Featured Icon' },
      { iconType: 'illustration',   label: 'Illustration' },
      { iconType: 'file-type-icon', label: 'File Type Icon' },
    ];
    const sizes = ['sm', 'md', 'lg'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, background: '#f8fafc', padding: 32 }}>
        {types.map(({ iconType, label }) => (
          <div key={iconType}>
            <div style={{ ...LABEL, marginBottom: 16 }}>{label}</div>
            {/* LTR row */}
            <div style={{ marginBottom: 8, fontSize: 10, fontWeight: 700, color: '#d1d5db', letterSpacing: '.06em', textTransform: 'uppercase' }}>LTR</div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
              {sizes.map(size => (
                <div key={size} style={{ flex: '1 1 320px', minWidth: 320, ...CARD }}>
                  <div style={CARD_LABEL}>Size — {size}</div>
                  <EmptyState
                    iconType={iconType}
                    size={size}
                    title="No projects found"
                    description='Your search "Landing page design" did not match any projects. Please try again.'
                    primaryLabel="Button"
                    secondaryLabel="Button"
                  />
                </div>
              ))}
            </div>
            {/* RTL row */}
            <div style={{ marginBottom: 8, fontSize: 10, fontWeight: 700, color: '#d1d5db', letterSpacing: '.06em', textTransform: 'uppercase' }}>RTL</div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {sizes.map(size => (
                <div key={size} style={{ flex: '1 1 320px', minWidth: 320, ...CARD }}>
                  <div style={CARD_LABEL}>Size — {size}</div>
                  <EmptyState
                    iconType={iconType}
                    size={size}
                    rtl
                    title="لا يوجد مشاريع"
                    description='بحثك عن "تصميم صفحة الهبوط" لم يطابق أي مشاريع. يرجى المحاولة مرة أخرى.'
                    primaryLabel="إجراء"
                    secondaryLabel="إجراء"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// ═══════════════════════════════════════════════════════════════
// 3. FEATURED ICON — All sizes (sm / md / lg)
// ═══════════════════════════════════════════════════════════════
export const FeaturedIconSizes = {
  name: 'Featured Icon — Sizes',
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 560 }}>
      {['sm', 'md', 'lg'].map(size => (
        <div key={size} style={CARD}>
          <div style={CARD_LABEL}>Size — {size}</div>
          <EmptyState iconType="featured-icon" size={size} primaryLabel="Button" secondaryLabel="Button" />
        </div>
      ))}
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════
// 4. ILLUSTRATION — All sizes (sm / md / lg)
// ═══════════════════════════════════════════════════════════════
export const IllustrationSizes = {
  name: 'Illustration — Sizes',
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 560 }}>
      {['sm', 'md', 'lg'].map(size => (
        <div key={size} style={CARD}>
          <div style={CARD_LABEL}>Size — {size}</div>
          <EmptyState iconType="illustration" size={size} primaryLabel="Button" secondaryLabel="Button" />
        </div>
      ))}
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════
// 5. FILE TYPE ICON — All sizes (sm / md / lg)
// ═══════════════════════════════════════════════════════════════
export const FileTypeSizes = {
  name: 'File Type Icon — Sizes',
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 560 }}>
      {['sm', 'md', 'lg'].map(size => (
        <div key={size} style={CARD}>
          <div style={CARD_LABEL}>Size — {size}</div>
          <EmptyState iconType="file-type-icon" size={size} primaryLabel="Button" secondaryLabel="Button" />
        </div>
      ))}
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════
// 6. RTL SUPPORT — all 3 types side-by-side
// ═══════════════════════════════════════════════════════════════
export const RTLSupport = {
  name: 'RTL Support',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {[
        { iconType: 'featured-icon',  label: 'Featured Icon' },
        { iconType: 'illustration',   label: 'Illustration' },
        { iconType: 'file-type-icon', label: 'File Type Icon' },
      ].map(({ iconType, label }) => (
        <div key={iconType}>
          <div style={{ ...LABEL, marginBottom: 12 }}>{label}</div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px', ...CARD }}>
              <div style={CARD_LABEL}>LTR</div>
              <EmptyState iconType={iconType} size="sm" primaryLabel="Button" secondaryLabel="Button" />
            </div>
            <div style={{ flex: '1 1 400px', ...CARD }}>
              <div style={CARD_LABEL}>RTL</div>
              <EmptyState
                iconType={iconType} size="sm" rtl
                title="لا يوجد مشاريع"
                description='بحثك عن "تصميم صفحة الهبوط" لم يطابق أي مشاريع. يرجى المحاولة مرة أخرى.'
                primaryLabel="إجراء"
                secondaryLabel="إجراء"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════
// 7. BUTTON VARIANTS — arrow / no arrow / one button / none
// ═══════════════════════════════════════════════════════════════
export const ButtonVariants = {
  name: 'Button Variants',
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 560 }}>
      {[
        { label: 'Both buttons',              props: { primaryLabel: 'Button', secondaryLabel: 'Button', showArrow: true } },
        { label: 'Primary only — with arrow', props: { primaryLabel: 'Button', secondaryLabel: null,    showArrow: true } },
        { label: 'Primary only — no arrow',   props: { primaryLabel: 'Button', secondaryLabel: null,    showArrow: false } },
        { label: 'No buttons',                props: { primaryLabel: null,     secondaryLabel: null } },
      ].map(({ label, props }) => (
        <div key={label}>
          <div style={{ ...LABEL, marginBottom: 8 }}>{label}</div>
          <div style={CARD}>
            <EmptyState iconType="featured-icon" size="sm" {...props} />
          </div>
        </div>
      ))}
    </div>
  ),
};
