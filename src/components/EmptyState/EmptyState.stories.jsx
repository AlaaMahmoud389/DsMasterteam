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
    iconType:           { control: 'select', options: ['featured-icon', 'illustration', 'file-type-icon'] },
    illustrationStyle:  { control: 'select', options: ['Cloud', 'Box', 'Documents', 'Credit card'], description: 'Illustration shape — only active when iconType is "illustration"', table: { category: 'Illustration' } },
    size:               { control: 'select', options: ['sm', 'md', 'lg'] },
    rtl:                { control: 'boolean' },
    showArrow:          { control: 'boolean' },
  },
};

// ═══════════════════════════════════════════════════════════════
// 1. INTERACTIVE — Controls
// ═══════════════════════════════════════════════════════════════
export const Default = {
  name: 'Interactive (Controls)',
  args: {
    iconType: 'featured-icon',
    illustrationStyle: 'Cloud',
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
      { iconType: 'illustration',   label: 'Illustration — Cloud',       illustrationStyle: 'Cloud' },
      { iconType: 'illustration',   label: 'Illustration — Box',         illustrationStyle: 'Box' },
      { iconType: 'illustration',   label: 'Illustration — Documents',   illustrationStyle: 'Documents' },
      { iconType: 'illustration',   label: 'Illustration — Credit card', illustrationStyle: 'Credit card' },
      { iconType: 'file-type-icon', label: 'File Type Icon' },
    ];
    const sizes = ['sm', 'md', 'lg'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, background: '#f8fafc', padding: 32 }}>
        {types.map(({ iconType, label, illustrationStyle }) => (
          <div key={label}>
            <div style={{ ...LABEL, marginBottom: 16 }}>{label}</div>
            <div style={{ marginBottom: 8, fontSize: 10, fontWeight: 700, color: '#d1d5db', letterSpacing: '.06em', textTransform: 'uppercase' }}>LTR</div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
              {sizes.map(size => (
                <div key={size} style={{ flex: '1 1 320px', minWidth: 320, ...CARD }}>
                  <div style={CARD_LABEL}>Size — {size}</div>
                  <EmptyState
                    iconType={iconType}
                    illustrationStyle={illustrationStyle}
                    size={size}
                    title="No projects found"
                    description='Your search "Landing page design" did not match any projects. Please try again.'
                    primaryLabel="Button"
                    secondaryLabel="Button"
                  />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 8, fontSize: 10, fontWeight: 700, color: '#d1d5db', letterSpacing: '.06em', textTransform: 'uppercase' }}>RTL</div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {sizes.map(size => (
                <div key={size} style={{ flex: '1 1 320px', minWidth: 320, ...CARD }}>
                  <div style={CARD_LABEL}>Size — {size}</div>
                  <EmptyState
                    iconType={iconType}
                    illustrationStyle={illustrationStyle}
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
// 4. ILLUSTRATION — All sizes (sm / md / lg) — Cloud style
// ═══════════════════════════════════════════════════════════════
export const IllustrationSizes = {
  name: 'Illustration — Sizes (Cloud)',
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 560 }}>
      {['sm', 'md', 'lg'].map(size => (
        <div key={size} style={CARD}>
          <div style={CARD_LABEL}>Size — {size}</div>
          <EmptyState iconType="illustration" illustrationStyle="Cloud" size={size} primaryLabel="Button" secondaryLabel="Button" />
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
        { iconType: 'illustration',   label: 'Illustration', illustrationStyle: 'Cloud' },
        { iconType: 'file-type-icon', label: 'File Type Icon' },
      ].map(({ iconType, label, illustrationStyle }) => (
        <div key={label}>
          <div style={{ ...LABEL, marginBottom: 12 }}>{label}</div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px', ...CARD }}>
              <div style={CARD_LABEL}>LTR</div>
              <EmptyState iconType={iconType} illustrationStyle={illustrationStyle} size="sm" primaryLabel="Button" secondaryLabel="Button" />
            </div>
            <div style={{ flex: '1 1 400px', ...CARD }}>
              <div style={CARD_LABEL}>RTL</div>
              <EmptyState
                iconType={iconType} illustrationStyle={illustrationStyle} size="sm" rtl
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
// 6b. ILLUSTRATION STYLES — Cloud / Box / Documents / Credit card
// ═══════════════════════════════════════════════════════════════
export const IllustrationStyles = {
  name: 'Illustration Styles — All 4',
  parameters: { layout: 'padded' },
  render: () => {
    const styles = [
      { illustrationStyle: 'Cloud',       label: 'Cloud' },
      { illustrationStyle: 'Box',         label: 'Box' },
      { illustrationStyle: 'Documents',   label: 'Documents' },
      { illustrationStyle: 'Credit card', label: 'Credit card' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, background: '#f8fafc', padding: 32 }}>
        {styles.map(({ illustrationStyle, label }) => (
          <div key={label}>
            <div style={{ ...LABEL, marginBottom: 16 }}>{label}</div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {['sm', 'md', 'lg'].map(size => (
                <div key={size} style={{ flex: '1 1 320px', minWidth: 320, ...CARD }}>
                  <div style={CARD_LABEL}>Size — {size}</div>
                  <EmptyState
                    iconType="illustration"
                    illustrationStyle={illustrationStyle}
                    size={size}
                    title="No projects found"
                    description='Your search "Landing page design" did not match any projects. Please try again.'
                    primaryLabel="Button"
                    secondaryLabel="Button"
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
// 6c. ILLUSTRATIONS REFERENCE — Figma node 4770:11254
// ═══════════════════════════════════════════════════════════════
export const IllustrationsReference = {
  name: 'Illustrations Reference',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'All 4 illustration styles from Figma frame `4770:11254` (Cloud, Box, Documents, Credit card), each at sm / md / lg.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, background: '#f8fafc', padding: 32 }}>
      {['Cloud', 'Box', 'Documents', 'Credit card'].map(s => (
        <div key={s}>
          <div style={{ ...LABEL, marginBottom: 16 }}>{s}</div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {['sm', 'md', 'lg'].map(sz => (
              <div key={sz} style={{ flex: '1 1 280px', minWidth: 280, ...CARD }}>
                <div style={CARD_LABEL}>Size — {sz}</div>
                <EmptyState iconType="illustration" illustrationStyle={s} size={sz} primaryLabel="Button" secondaryLabel="Button" />
              </div>
            ))}
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
