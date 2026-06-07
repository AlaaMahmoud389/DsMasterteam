import {
  SkeletonLine,
  SkeletonRectangle,
  SkeletonCircle,
  SkeletonSquare,
  SkeletonTemplate,
} from './Skeleton';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4250-1948';

export default {
  title: 'Components/Skeleton',
  component: SkeletonTemplate,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'chart-content',
        'image-content',
        'image-profile',
        'image-button-text',
        'icon-list',
      ],
      description: 'Composite layout template type',
      table: { defaultValue: { summary: 'chart-content' } },
    },
  },
  args: { type: 'chart-content' },
};

/* ── Template (composite) ────────────────────────────────────── */

export const Playground = {};

export const ChartContent = {
  name: 'Template — Chart + Content',
  args: { type: 'chart-content' },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export const ImageContent = {
  name: 'Template — Image + Content',
  args: { type: 'image-content' },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export const ImageProfile = {
  name: 'Template — Image + Profile + Content',
  args: { type: 'image-profile' },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export const ImageButtonText = {
  name: 'Template — Icon + Button + Text',
  args: { type: 'image-button-text' },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export const IconList = {
  name: 'Template — Icon + List',
  args: { type: 'icon-list' },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export const AllTemplates = {
  name: 'All Templates',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'flex-start', padding: 16 }}>
      {['chart-content', 'image-content', 'image-profile', 'image-button-text', 'icon-list'].map((type) => (
        <div key={type} style={{ width: 280 }}>
          <p style={{ margin: '0 0 8px', fontSize: 11, color: '#6b7280', fontFamily: 'monospace' }}>{type}</p>
          <SkeletonTemplate type={type} />
        </div>
      ))}
    </div>
  ),
};

/* ── Line ────────────────────────────────────────────────────── */

export const LineSizes = {
  name: 'Line — All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      {[
        { size: 'large', label: 'Large — 22 px' },
        { size: 'small', label: 'Small — 14 px' },
      ].map(({ size, label }) => (
        <div key={size}>
          <p style={{ margin: '0 0 4px', fontSize: 11, color: '#6b7280' }}>{label}</p>
          <SkeletonLine size={size} />
        </div>
      ))}
    </div>
  ),
};

/* ── Rectangle ───────────────────────────────────────────────── */

export const RectangleSizes = {
  name: 'Rectangle — All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[
        { size: 'large',  length: 'long',  label: 'Large + Long (40 × 320 px)' },
        { size: 'large',  length: 'short', label: 'Large + Short (40 × 90 px)' },
        { size: 'medium', length: 'long',  label: 'Medium + Long (32 × 320 px)' },
        { size: 'medium', length: 'short', label: 'Medium + Short (32 × 75 px)' },
        { size: 'small',  length: 'long',  label: 'Small + Long (24 × 320 px)' },
        { size: 'small',  length: 'short', label: 'Small + Short (24 × 59 px)' },
      ].map(({ size, length, label }) => (
        <div key={label}>
          <p style={{ margin: '0 0 4px', fontSize: 11, color: '#6b7280' }}>{label}</p>
          <SkeletonRectangle size={size} length={length} />
        </div>
      ))}
    </div>
  ),
};

/* ── Circle ──────────────────────────────────────────────────── */

export const CircleSizes = {
  name: 'Circle — All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end', padding: 8 }}>
      {[24, 48, 64, 80, 120, 170, 240].map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <SkeletonCircle size={size} />
          <span style={{ fontSize: 11, color: '#6b7280' }}>{size}px</span>
        </div>
      ))}
    </div>
  ),
};

/* ── Square ──────────────────────────────────────────────────── */

export const SquareSizes = {
  name: 'Square — All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end', padding: 8 }}>
      {[24, 48, 64, 80, 120, 170, 240].map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <SkeletonSquare size={size} />
          <span style={{ fontSize: 11, color: '#6b7280' }}>{size}px</span>
        </div>
      ))}
    </div>
  ),
};

/* ── All Primitives ──────────────────────────────────────────── */

export const AllPrimitives = {
  name: 'All Primitives',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, padding: 16 }}>
      <div>
        <p style={{ margin: '0 0 12px', fontWeight: 600, fontSize: 13 }}>Line</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 320 }}>
          <SkeletonLine size="large" />
          <SkeletonLine size="small" />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 12px', fontWeight: 600, fontSize: 13 }}>Rectangle</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <SkeletonRectangle size="large"  length="long"  />
          <SkeletonRectangle size="medium" length="long"  />
          <SkeletonRectangle size="small"  length="long"  />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 12px', fontWeight: 600, fontSize: 13 }}>Circle</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' }}>
          {[24, 48, 64, 80, 120].map((s) => <SkeletonCircle key={s} size={s} />)}
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 12px', fontWeight: 600, fontSize: 13 }}>Square</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' }}>
          {[24, 48, 64, 80, 120].map((s) => <SkeletonSquare key={s} size={s} />)}
        </div>
      </div>
    </div>
  ),
};
