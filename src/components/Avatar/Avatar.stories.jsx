import { Avatar, AvatarGroup, AvatarWithLabel, AvatarAddButton, FIGMA_PHOTO, ARAB_PHOTOS, LABEL_PHOTO } from './Avatar';
// FIGMA_PHOTO = avatar-1 (woman in colorful headscarf)
// ARAB_PHOTOS = [avatar-1, avatar-2, avatar-3, avatar-4, avatar-1] — real Figma photos
// LABEL_PHOTO = avatar-2 (man in thobe)

// ─── Figma canvas layout constants ───────────────────────────────
// Source: node 4113:655 — 7 columns × 6 rows (Round + Square sections)
const SIZES    = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
const COL_GAP  = 32;
const ROW_GAP  = 56;
const SEC_GAP  = 75;

// ─── Single avatar row (bottom-aligned) ──────────────────────────
function AvatarRow({ type, square = false }) {
  return (
    <div style={{ display: 'flex', gap: COL_GAP, alignItems: 'flex-end' }}>
      {SIZES.map(s => (
        <Avatar
          key={s}
          type={type}
          size={s}
          square={square}
          initials="AB"
          src={FIGMA_PHOTO}
          alt="User"
        />
      ))}
    </div>
  );
}

const Gap = ({ h }) => <div style={{ height: h, flexShrink: 0 }} />;

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'padded' },
  argTypes: {
    type:      { control: 'select', options: ['initials', 'icon', 'image'] },
    size:      { control: 'select', options: SIZES },
    status:    { control: 'select', options: [null, 'online', 'offline', 'away', 'notify', 'primary', 'badge'] },
    square:    { control: 'boolean' },
    border:    { control: 'boolean' },
    color:     { control: 'color' },
    textColor: { control: 'color' },
  },
};

// ═══════════════════════════════════════════════════════════════════
// 1. FIGMA CANVAS — exact replica of node 4113:655
//    6 rows × 7 columns · Round section then Square section
// ═══════════════════════════════════════════════════════════════════
export const FigmaCanvas = {
  name: 'Figma Canvas — All Variants',
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{ background: '#ffffff', display: 'inline-flex', flexDirection: 'column', padding: 16 }}>
      {/* ── ROUND ─────────────────────────────────── */}
      <AvatarRow type="initials" />
      <Gap h={ROW_GAP} />
      <AvatarRow type="icon" />
      <Gap h={ROW_GAP} />
      <AvatarRow type="image" />

      <Gap h={SEC_GAP} />

      {/* ── SQUARE ────────────────────────────────── */}
      <AvatarRow type="initials" square />
      <Gap h={ROW_GAP} />
      <AvatarRow type="icon" square />
      <Gap h={ROW_GAP} />
      <AvatarRow type="image" square />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════
// 2. INTERACTIVE — single avatar with all controls
// ═══════════════════════════════════════════════════════════════════
export const Default = {
  name: 'Interactive (Controls)',
  args: {
    type: 'initials',
    size: 'md',
    square: false,
    initials: 'AB',
    textColor: '#233a61',
    status: null,
    border: false,
  },
  render: args => <Avatar {...args} src={FIGMA_PHOTO} />,
};

// ═══════════════════════════════════════════════════════════════════
// 3. TYPES — initials / icon / image at xl
// ═══════════════════════════════════════════════════════════════════
export const AllTypes = {
  name: 'Types',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: COL_GAP }}>
      <Avatar type="initials" size="xl" initials="AB" />
      <Avatar type="icon"     size="xl" />
      <Avatar type="image"    size="xl" src={FIGMA_PHOTO} alt="User" />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════
// 4. SIZES — all 7 sizes, bottom-aligned
// ═══════════════════════════════════════════════════════════════════
export const AllSizes = {
  name: 'Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: COL_GAP }}>
        {SIZES.map(s => <Avatar key={s} type="initials" size={s} initials="AB" />)}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: COL_GAP }}>
        {SIZES.map(s => <Avatar key={s} type="icon" size={s} />)}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: COL_GAP }}>
        {SIZES.map(s => <Avatar key={s} type="image" size={s} src={FIGMA_PHOTO} alt="User" />)}
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════
// 5. SHAPE — round vs square, all sizes
// ═══════════════════════════════════════════════════════════════════
export const Shape = {
  name: 'Shape — Round & Square',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Initials */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: COL_GAP }}>
        {SIZES.map(s => <Avatar key={s} type="initials" size={s} initials="AB" />)}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: COL_GAP }}>
        {SIZES.map(s => <Avatar key={s} type="initials" size={s} square initials="AB" />)}
      </div>
      {/* Icon */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: COL_GAP }}>
        {SIZES.map(s => <Avatar key={s} type="icon" size={s} />)}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: COL_GAP }}>
        {SIZES.map(s => <Avatar key={s} type="icon" size={s} square />)}
      </div>
      {/* Image */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: COL_GAP }}>
        {SIZES.map(s => <Avatar key={s} type="image" size={s} src={FIGMA_PHOTO} alt="User" />)}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: COL_GAP }}>
        {SIZES.map(s => <Avatar key={s} type="image" size={s} square src={FIGMA_PHOTO} alt="User" />)}
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════
// 6. BORDER RING — with / without ring overlay
// ═══════════════════════════════════════════════════════════════════
export const WithBorder = {
  name: 'Border Ring',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: COL_GAP, background: '#dbeafe', padding: 24, borderRadius: 12 }}>
      <Avatar type="initials" size="lg" initials="AB" border />
      <Avatar type="icon"     size="lg" border />
      <Avatar type="image"    size="lg" src={FIGMA_PHOTO} alt="User" border />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════
// 7. STATUS INDICATORS — all 6 states at lg size
// ═══════════════════════════════════════════════════════════════════
export const StatusIndicators = {
  name: 'Status Indicators',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      {['online', 'offline', 'away', 'notify', 'primary', 'badge'].map(s => (
        <Avatar
          key={s}
          type="initials" size="lg" initials="AB"
          status={s} notifyCount={s === 'notify' ? 2 : undefined}
        />
      ))}
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════
// 8. AVATAR GROUP — stacked and spaced
// ═══════════════════════════════════════════════════════════════════
// 5 photos shown + "+99" overflow — matches Figma node 4113:852 exactly
const GROUP_PHOTOS = [...ARAB_PHOTOS, ARAB_PHOTOS[0]];

export const FigmaGroup = {
  name: 'Avatar Group',
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{ background: '#ffffff', display: 'inline-flex', flexDirection: 'column', padding: 16, gap: 24 }}>
      {/* Stacked — 5 Arab person photos + "+99" overflow */}
      <AvatarGroup stacked size="sm" max={5} overflowLabel="+99">
        {GROUP_PHOTOS.map((src, i) => (
          <Avatar key={i} type="image" size="sm" src={src} alt={`Person ${i + 1}`} />
        ))}
      </AvatarGroup>
      {/* Spaced — same, gap=4px between each */}
      <AvatarGroup stacked={false} size="sm" max={5} overflowLabel="+99">
        {GROUP_PHOTOS.map((src, i) => (
          <Avatar key={i} type="image" size="sm" src={src} alt={`Person ${i + 1}`} />
        ))}
      </AvatarGroup>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════
// 9. AVATAR WITH LABEL
// ═══════════════════════════════════════════════════════════════════
export const FigmaLabelGroup = {
  name: 'Avatar with Label',
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{ background: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: 48, padding: '16px 24px' }}>
      <AvatarWithLabel size="sm" type="image" src={LABEL_PHOTO} name="Nora Al-Rasheed" caption="nora@email.com" dir="ltr" />
      <AvatarWithLabel size="md" type="image" src={LABEL_PHOTO} name="Nora Al-Rasheed" caption="nora@email.com" dir="ltr" />
      <AvatarWithLabel size="lg" type="image" src={LABEL_PHOTO} name="Nora Al-Rasheed" caption="nora@email.com" dir="ltr" />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════
// 10. RTL SUPPORT
// ═══════════════════════════════════════════════════════════════════
export const RTLSupport = {
  name: 'RTL Support',
  render: () => (
    <div style={{ display: 'flex', gap: 48 }}>
      <AvatarWithLabel size="lg" type="image" src={LABEL_PHOTO} name="Nora Al-Rasheed" caption="nora@email.com" dir="ltr" />
      <AvatarWithLabel size="lg" type="image" src={LABEL_PHOTO} name="نورا الرشيد" caption="nora@email.com" dir="rtl" />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════
// 11. ADD BUTTON — Figma node 4120:317
//     3 sizes (xs/sm/md) × 4 states (Default/Hover/Focus/Disabled)
// ═══════════════════════════════════════════════════════════════════
const LABEL_STYLE = {
  fontSize: 11, fontWeight: 700, color: '#9ca3af',
  marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.06em',
};
const SIZE_LABEL_STYLE = {
  fontSize: 10, color: '#9ca3af', marginBottom: 8, textAlign: 'center', letterSpacing: '.04em',
};

export const AddButton = {
  name: 'Add Button',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, background: '#f8fafc', padding: 32 }}>

      {/* Default */}
      <div>
        <div style={LABEL_STYLE}>Default</div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
          {['xs', 'sm', 'md'].map(size => (
            <div key={size}>
              <div style={SIZE_LABEL_STYLE}>{size}</div>
              <AvatarAddButton size={size} state="default" />
            </div>
          ))}
        </div>
      </div>

      {/* Hover — shows tooltip */}
      <div>
        <div style={LABEL_STYLE}>Hover</div>
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-end', paddingTop: 48 }}>
          {['xs', 'sm', 'md'].map(size => (
            <div key={size}>
              <div style={SIZE_LABEL_STYLE}>{size}</div>
              <AvatarAddButton size={size} state="hover" />
            </div>
          ))}
        </div>
      </div>

      {/* Focus */}
      <div>
        <div style={LABEL_STYLE}>Focus</div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
          {['xs', 'sm', 'md'].map(size => (
            <div key={size}>
              <div style={SIZE_LABEL_STYLE}>{size}</div>
              <AvatarAddButton size={size} state="focus" />
            </div>
          ))}
        </div>
      </div>

      {/* Disabled */}
      <div>
        <div style={LABEL_STYLE}>Disabled</div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
          {['xs', 'sm', 'md'].map(size => (
            <div key={size}>
              <div style={SIZE_LABEL_STYLE}>{size}</div>
              <AvatarAddButton size={size} state="disabled" />
            </div>
          ))}
        </div>
      </div>

      {/* Combined — avatar group with add button */}
      <div>
        <div style={LABEL_STYLE}>Avatar Group + Add Button</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {['xs', 'sm', 'md'].map(size => (
            <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <AvatarGroup stacked size={size} max={5} overflowLabel="+99">
                {GROUP_PHOTOS.map((src, i) => (
                  <Avatar key={i} type="image" size={size} src={src} alt={`Person ${i + 1}`} />
                ))}
              </AvatarGroup>
              <AvatarAddButton size={size} state="default" />
            </div>
          ))}
        </div>
      </div>

    </div>
  ),
};
