import React from 'react';
import { Card } from './Card';

const IMG = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=720&q=80';

const LABEL = {
  fontSize: 11, fontWeight: 700, color: '#9ca3af',
  marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em',
};

const FIGMA_URL = 'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4112-13&t=GbrZIJyJ1y1Cbin4-1';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: FIGMA_URL,
    },
  },
  argTypes: {
    type:            { control: 'radio', options: ['default', 'expandable', 'selectable'] },
    state:           { control: 'radio', options: ['default', 'hover', 'focused', 'disabled'] },
    shadow:          { control: 'boolean' },
    stroke:          { control: 'boolean' },
    image:           { control: 'boolean' },
    featuredIcon:    { control: 'boolean' },
    selected:        { control: 'boolean' },
    expanded:        { control: 'boolean' },
    showTitle:       { control: 'boolean' },
    showDescription: { control: 'boolean' },
    showTags:        { control: 'boolean' },
    showRating:      { control: 'boolean' },
    showActions:     { control: 'boolean' },
    rating:          { control: { type: 'range', min: 0, max: 5, step: 0.5 } },
    dir:             { control: 'radio', options: ['ltr', 'rtl'] },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 1. FIGMA CANVAS — all key variants
// ═══════════════════════════════════════════════════════════════════════════════
export const FigmaCanvas = {
  name: 'Figma Canvas — All Variants',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, padding: 24, background: '#f8fafc', maxWidth: 1200 }}>
      <Card uid="c1" />
      <Card uid="c2" image imageSrc={IMG} featuredIcon={false} />
      <Card uid="c3" image imageSrc={IMG} />
      <Card uid="c4" showTags />
      <Card uid="c5" showRating />
      <Card uid="c6" showTags showRating />
      <Card uid="c7" featuredIcon={false} />
      <Card uid="c8" shadow={false} />
      <Card uid="c9" stroke />
      <Card
        uid="c10"
        image imageSrc={IMG} showTags showRating rating={4} ratingCount={28}
        tags={['Design', 'UI/UX', 'Research']} title="Full Card Example"
        description="This card shows all available content slots enabled together."
      />
      <Card uid="c11" showActions={false} />
      <Card
        uid="c12" dir="rtl"
        title="عنوان البطاقة" description="نص توضيحي للمحتوى"
        neutralLabel="زر" primaryLabel="زر" showTags tags={['تسمية', 'تسمية', 'تسمية']}
      />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. INTERACTIVE — single card with all controls
// ═══════════════════════════════════════════════════════════════════════════════
export const Default = {
  name: 'Interactive (Controls)',
  args: {
    title: 'Card Title',
    description: 'Card content placeholder text goes here',
    type: 'default',
    state: 'default',
    featuredIcon: true,
    showTitle: true,
    showDescription: true,
    showTags: false,
    showRating: false,
    showActions: true,
    image: false,
    shadow: true,
    stroke: false,
    selected: false,
    expanded: false,
    rating: 3.5,
    ratingCount: 12,
    tags: ['Label', 'Label', 'Label'],
    dir: 'ltr',
    uid: 'interactive',
  },
  render: args => <Card {...args} />,
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. STATES — default / hover / focused / disabled
// ═══════════════════════════════════════════════════════════════════════════════
export const CardStates = {
  name: 'States',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, background: '#f8fafc', padding: 24 }}>

      {/* Default type */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>Default Type</div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div><div style={LABEL}>Default</div><Card uid="ds1" /></div>
          <div><div style={LABEL}>Hover</div><Card uid="ds2" state="hover" /></div>
        </div>
      </div>

      {/* Selectable type */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>Selectable Type</div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div><div style={LABEL}>Default</div><Card uid="ss1" type="selectable" /></div>
          <div><div style={LABEL}>Hover</div><Card uid="ss2" type="selectable" state="hover" /></div>
          <div><div style={LABEL}>Focused</div><Card uid="ss3" type="selectable" state="focused" /></div>
          <div><div style={LABEL}>Disabled</div><Card uid="ss4" type="selectable" state="disabled" /></div>
        </div>
      </div>

      {/* Expandable type */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>Expandable Type</div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div><div style={LABEL}>Default</div><Card uid="es1" type="expandable" /></div>
          <div><div style={LABEL}>Hover</div><Card uid="es2" type="expandable" state="hover" /></div>
          <div><div style={LABEL}>Focused</div><Card uid="es3" type="expandable" state="focused" /></div>
          <div><div style={LABEL}>Disabled</div><Card uid="es4" type="expandable" state="disabled" /></div>
        </div>
      </div>

    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. SELECTABLE — checkbox states
// ═══════════════════════════════════════════════════════════════════════════════
export const SelectableCards = {
  name: 'Selectable (Checkbox)',
  parameters: { layout: 'padded' },
  render: () => {
    function InteractiveSelectable() {
      const [checked, setChecked] = React.useState(false);
      return (
        <Card
          uid="sel-int"
          type="selectable"
          selected={checked}
          state={checked ? 'focused' : 'default'}
          onCardClick={() => setChecked(c => !c)}
          title={checked ? 'Selected Card' : 'Click to Select'}
          description="Click anywhere on this card to toggle selection."
        />
      );
    }
    return (
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', background: '#f8fafc', padding: 24 }}>
        <div><div style={LABEL}>Unchecked</div><Card uid="sel1" type="selectable" /></div>
        <div><div style={LABEL}>Checked</div><Card uid="sel2" type="selectable" selected state="focused" /></div>
        <div><div style={LABEL}>Hover (unchecked)</div><Card uid="sel3" type="selectable" state="hover" /></div>
        <div><div style={LABEL}>Disabled</div><Card uid="sel4" type="selectable" state="disabled" /></div>
        <div><div style={LABEL}>Interactive ↓</div><InteractiveSelectable /></div>
      </div>
    );
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. EXPANDABLE — expand/collapse toggle
// ═══════════════════════════════════════════════════════════════════════════════
export const ExpandableCards = {
  name: 'Expandable',
  parameters: { layout: 'padded' },
  render: () => {
    function InteractiveExpandable() {
      const [open, setOpen] = React.useState(false);
      return (
        <Card
          uid="exp-int"
          type="expandable"
          expanded={open}
          onExpand={() => setOpen(o => !o)}
          title="Expandable Card"
          description={open
            ? 'This card is now expanded. The chevron button above collapses it.'
            : 'Click the chevron button to expand this card.'}
        />
      );
    }
    return (
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', background: '#f8fafc', padding: 24 }}>
        <div><div style={LABEL}>Collapsed</div><Card uid="exp1" type="expandable" expanded={false} /></div>
        <div><div style={LABEL}>Expanded</div><Card uid="exp2" type="expandable" expanded /></div>
        <div><div style={LABEL}>Hover</div><Card uid="exp3" type="expandable" state="hover" /></div>
        <div><div style={LABEL}>Disabled</div><Card uid="exp4" type="expandable" state="disabled" /></div>
        <div><div style={LABEL}>Interactive ↓</div><InteractiveExpandable /></div>
      </div>
    );
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. EFFECTS — Shadow / No Shadow / Stroke
// ═══════════════════════════════════════════════════════════════════════════════
export const EffectsVariants = {
  name: 'Effects',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', background: '#f8fafc', padding: 24 }}>
      <div><div style={LABEL}>With Shadow (default)</div><Card uid="ef1" /></div>
      <div><div style={LABEL}>No Shadow</div><Card uid="ef2" shadow={false} /></div>
      <div><div style={LABEL}>Stroke</div><Card uid="ef3" stroke /></div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// 7. WITH IMAGE
// ═══════════════════════════════════════════════════════════════════════════════
export const WithImage = {
  name: 'With Image',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', background: '#f8fafc', padding: 24 }}>
      <Card uid="img1" image imageSrc={IMG} featuredIcon={false} />
      <Card uid="img2" image imageSrc={IMG} />
      <Card uid="img3" image />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// 8. WITH TAGS
// ═══════════════════════════════════════════════════════════════════════════════
export const WithTags = {
  name: 'With Tags',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', background: '#f8fafc', padding: 24 }}>
      <Card uid="t1" showTags tags={['Label', 'Label', 'Label']} />
      <Card uid="t2" showTags tags={['Design', 'UI/UX', 'Research', 'Figma']} />
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// 9. WITH RATING
// ═══════════════════════════════════════════════════════════════════════════════
export const WithRating = {
  name: 'With Rating',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', background: '#f8fafc', padding: 24 }}>
      {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(r => (
        <Card
          key={r}
          uid={`rat${r}`}
          featuredIcon={false}
          showActions={false}
          showRating
          rating={r}
          ratingCount={Math.round(r * 8)}
          title={`${r} / 5`}
          showDescription={false}
        />
      ))}
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// 10. FULL CARD
// ═══════════════════════════════════════════════════════════════════════════════
export const FullCard = {
  name: 'Full Card',
  parameters: { layout: 'centered' },
  render: () => (
    <Card
      uid="full"
      image imageSrc={IMG}
      showTags showRating
      rating={4} ratingCount={28}
      tags={['Design', 'UI/UX', 'Research']}
      title="Full Featured Card"
      description="This card demonstrates every available content slot enabled simultaneously."
      neutralLabel="Learn More"
      primaryLabel="Get Started"
    />
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// 11. RTL SUPPORT
// ═══════════════════════════════════════════════════════════════════════════════
export const RTLSupport = {
  name: 'RTL Support',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', background: '#f8fafc', padding: 24 }}>
      <Card
        uid="rtl1" dir="rtl"
        title="عنوان البطاقة"
        description="نص توضيحي للمحتوى يظهر هنا بشكل افتراضي"
        neutralLabel="زر" primaryLabel="زر"
      />
      <Card
        uid="rtl2" dir="rtl"
        title="عنوان البطاقة"
        description="نص توضيحي للمحتوى"
        showTags tags={['تسمية', 'تسمية', 'تسمية']}
        showRating rating={3.5} ratingCount={12}
        neutralLabel="زر" primaryLabel="زر"
      />
      <Card
        uid="rtl3" dir="rtl"
        type="selectable" selected
        state="focused"
        title="بطاقة قابلة للتحديد"
        description="انقر لتحديد هذه البطاقة"
        neutralLabel="زر" primaryLabel="زر"
      />
      <Card
        uid="rtl4" dir="rtl"
        image imageSrc={IMG}
        title="عنوان البطاقة مع صورة"
        description="نص توضيحي للمحتوى يظهر هنا"
        neutralLabel="زر" primaryLabel="زر"
      />
    </div>
  ),
};
