# Storybook Design System Documentation Rules
# Masterteam Design System — ds-storybook

## Core Principle

Storybook documents the Figma design system. It does not redesign it.

**Source of truth priority (highest → lowest):**
1. Figma component (MCP: `get_design_context`, `get_screenshot`)
2. Figma variables / tokens (MCP: `get_variable_defs`)
3. Existing token files (`src/components/tokens.css`)
4. Reference HTML documentation files (`output/*.html`)
5. Existing component implementation

---

## Never Invent

Do not create:
- New colors
- New spacing values
- New typography scale values
- New border-radius values
- New shadows
- New variants not in Figma
- New states not in Figma
- New component behavior not in Figma

If a value is missing from tokens or Figma:
- Stop.
- Do not guess.
- Do not use a "reasonable" approximation.
- Add it to a **Missing token / Missing design decision** report and surface it to the team.

---

## Workflow for Every New Component

### Step 1 — Read Figma first
```
get_design_context(fileKey, nodeId)  — extract all variants, sizes, states, anatomy, tokens
get_screenshot(fileKey, nodeId)      — visual reference (source of truth)
get_variable_defs(fileKey)           — resolve all variable values
```

### Step 2 — Extract
- All variants and their token values
- All sizes (height, padding, icon size, font, line-height, gap, radius)
- All states (default, hover, pressed, focus, disabled, loading if applicable)
- Anatomy (container, slots, focus ring, etc.)
- RTL behavior
- Accessibility requirements

### Step 3 — Audit existing implementation
Compare each extracted value against the current component and produce a mismatch report:

| Area | Figma value | Current Storybook value | Match? | Required fix | File |
|---|---|---|---|---|---|

Check areas:
- Variants (all of them, including destructive sub-variants)
- Sizes (height, padding, icon, font, line-height, gap, radius)
- States (all 5+)
- Colors (background, text, border, icon per state)
- Typography (font-family, size, weight, line-height, Arabic rendering)
- Spacing (padding, gap, alignment)
- Radius and borders
- Shadows
- Icons (size per size, slot position)
- RTL behavior (layout flip, icon mirroring rules)
- Accessibility (focus ring, ARIA, keyboard)
- Props (all props documented)
- Documentation sections (all required sections present)
- Token usage (no hardcoded values outside tokens.css)

### Step 4 — Cleanup
- Remove old/demo/placeholder stories not in Figma.
- Remove duplicate stories.
- Remove default Storybook components.
- Keep: `.storybook/` config, `package.json`, `tokens.css`, `variables.css`, shared styles.

### Step 5 — Rebuild component files
```
src/components/[Name]/[Name].jsx        (or .tsx)
src/components/[Name]/[Name].module.css (or .css)
src/components/[Name]/[Name].stories.jsx
src/components/[Name]/[Name].mdx
src/components/[Name]/index.js
```

### Step 6 — Apply fixes from mismatch report
Fix in order: tokens first, then CSS, then JSX, then stories, then MDX.

### Step 7 — Verify against Figma screenshot
Side-by-side comparison. All states, all variants, all sizes.

### Step 8 — Final report
```
Deleted files:
Created files:
Updated files:
Added stories:
Added documentation sections:
Figma mismatches fixed:
Remaining mismatches:
Missing tokens / design decisions:
```

---

## Required MDX Documentation Sections

Every component MDX page must include these sections in this order:

1. **Overview** — one paragraph, component purpose, Canvas of all variants
2. **Anatomy** — ASCII diagram + numbered element table
3. **Variants** — Canvas + table (variant name, Figma style, bg, text, when to use)
4. **Destructive** (if applicable) — Canvas + table + warning notice
5. **Sizes** — Canvas + table (prop, Figma label, height, padding, icon, font, line-height)
6. **States** — Canvas + table (state, trigger, visual change)
7. **State × Variant token table** — resolved token values for every state × variant
8. **RTL Support** — Canvas + mirroring rules + code example
9. **Icon Usage** — Canvas for lead/trail/both/icon-only + size table
10. **Token Reference** — tables per category (spacing, colors per variant)
11. **Properties** — full prop table (name, type, default, description)
12. **Accessibility** — ARIA, keyboard, focus ring, disabled behavior
13. **Usage Guidelines** — Do / Don't lists
14. **Code Examples** — copyable JSX for all major use cases
15. **Mismatch Report** — audit table (always present, updated after each audit)

---

## Storybook Story Requirements

Every component stories file must include:

**Individual variant stories:**
- One story per variant (named to match Figma style name)
- One story per size
- Disabled state story
- Loading state story (if applicable)

**Composition stories (no controls):**
- `AllVariants` — all variants side by side
- `AllSizes` — all sizes side by side
- `AllStates` — default + loading + disabled
- `AllVariantsDisabled` — all variants in disabled state
- `DestructiveAll` — all destructive variants (if applicable)
- `IconOnlyAll` — icon-only at all sizes (if applicable)
- `RTLAll` — all variants in RTL direction

**Story metadata requirements:**
- `tags: []` — NOT `['autodocs']` when an MDX file handles docs
- `parameters.design` with Figma URL (Figma addon)
- `parameters.docs.description.component` — brief markdown description
- `argTypes` for every prop with `control`, `description`, and `table.defaultValue`

---

## RTL Rules

- Add RTL stories for every component that contains text, icons, layout direction, or alignment.
- **Directional icons** (arrows →, ←, chevrons) MUST be mirrored with `transform: scaleX(-1)` in RTL.
- **Non-directional icons** (✕, +, ⋯, settings gear) must NOT be mirrored.
- Test Arabic text rendering.
- Spacing and alignment must match Figma RTL behavior.
- Use `dir="rtl"` prop or wrap in `dir="rtl"` ancestor — never use `text-align` as a substitute.

---

## Accessibility Rules

- Every interactive component must support full keyboard navigation.
- Focus state must be visible and meet WCAG 2.2 Focus Appearance (3:1 contrast minimum).
- Disabled state: use `disabled` HTML attribute AND `aria-disabled="true"`. Do not use `opacity` for disabled styling — use dedicated disabled tokens.
- Icon-only interactive elements MUST have `aria-label` or `aria-labelledby`.
- Loading states: set `aria-busy="true"`. Hide spinner from AT with `aria-hidden`.
- Components must not rely on color alone to communicate state — pair with label, icon, or ARIA role.
- Use semantic HTML elements. Do not use `div` or `span` for interactive elements.

---

## Token Rules

- All values must come from `tokens.css` CSS custom properties.
- No hardcoded color hex values in component CSS (exception: `transparent`, `currentColor`).
- No hardcoded spacing values in component CSS (use token variables).
- Token naming convention: `--color-[variant]-[property]-[state]`
  - Example: `--color-primary-bg-hover`, `--color-neutral-text`, `--color-disabled-bg`
- When adding a new token, add it to `tokens.css` with a Figma token path comment:
  ```css
  --color-danger-secondary-bg: #fcdad7; /* component/button/danger-secondary/background/default */
  ```

---

## Storybook Cleanup Rules

Before rebuilding any component:
- Remove all demo/placeholder stories not matching a Figma component.
- Remove duplicate story definitions (same `title` in multiple files).
- Remove default Storybook generated examples (e.g., `src/stories/`).
- Do NOT delete: `.storybook/main.js`, `.storybook/preview.jsx`, `.storybook/preview-head.html`, `package.json`, `tokens.css`, `variables.css`.

---

## Focus Ring Implementation

The Masterteam DS focus ring is a double-ring pattern:
- **Inner ring**: 2px, matches the variant's background/border color
- **Outer ring**: 3px, matches the variant's icon/text color (often white `#f9fafb`)

Implementation — use `box-shadow` only, no `outline`:
```css
.primary:focus-visible {
  box-shadow: 0 0 0 2px var(--color-primary-bg), 0 0 0 5px var(--color-primary-text);
}
.neutral:focus-visible {
  box-shadow: 0 0 0 2px var(--color-neutral-bg), 0 0 0 5px var(--color-primary-bg);
}
```

---

## Disabled State Implementation

Use dedicated tokens. Do not use `opacity`:
```css
.button:disabled,
.button[aria-disabled='true'] {
  background-color: var(--color-disabled-bg) !important;   /* #d2d6db */
  border-color:     var(--color-disabled-bg) !important;
  color:            var(--color-disabled-text) !important;  /* #6c7c96 */
  cursor: not-allowed;
  pointer-events: none;
}
```

---

## MDX Section Visualization Patterns

The following JSX patterns must be used for four key sections in every component MDX page.
These replace plain markdown tables with scannable, visually structured layouts.

---

### Token Table

Two stacked cards: **Sizing & Spacing** and **Colors** (add **Typography** if applicable).
Each card has: section header → column header row → alternating data rows.
Color tokens include an inline color swatch (`<span>` with `background: hex`).

```jsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 16 }}>
<div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
<div style={{ background: '#f9fafb', padding: '10px 16px', borderBottom: '1px solid #e5e7eb', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: '#6b7280' }}>Sizing & Spacing</div>
<div style={{ display: 'grid', gridTemplateColumns: '200px 68px 1fr 1fr', background: '#f0f1f3', padding: '7px 16px', gap: 12, fontSize: 11, fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}><span>Token</span><span>Value</span><span>Figma token</span><span>Usage</span></div>
{[{t:'--token-name',v:'VALUE',f:'figma/token/path',u:'Usage description'}].map(({t,v,f,u},i)=>(
<div key={t} style={{display:'grid',gridTemplateColumns:'200px 68px 1fr 1fr',padding:'9px 16px',background:i%2===0?'#fff':'#fafafa',borderBottom:'1px solid #f3f4f6',gap:12,alignItems:'center'}}>
<code style={{fontSize:12,background:'#eff3fb',padding:'2px 6px',borderRadius:4,color:'#1849a9'}}>{t}</code>
<span style={{fontSize:13,fontWeight:700,color:'#111827'}}>{v}</span>
<code style={{fontSize:11,color:'#6b7280'}}>{f}</code>
<span style={{fontSize:12,color:'#6b7280'}}>{u}</span>
</div>
))}
</div>
<div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
<div style={{ background: '#f9fafb', padding: '10px 16px', borderBottom: '1px solid #e5e7eb', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: '#6b7280' }}>Colors</div>
<div style={{ display: 'grid', gridTemplateColumns: '210px 145px 1fr 1fr', background: '#f0f1f3', padding: '7px 16px', gap: 12, fontSize: 11, fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}><span>Token</span><span>Value</span><span>Figma token</span><span>Usage</span></div>
{[{t:'--color-token',h:'#hexval',f:'figma/token/path',u:'Usage'}].map(({t,h,f,u},i)=>(
<div key={t} style={{display:'grid',gridTemplateColumns:'210px 145px 1fr 1fr',padding:'9px 16px',background:i%2===0?'#fff':'#fafafa',borderBottom:'1px solid #f3f4f6',gap:12,alignItems:'center'}}>
<code style={{fontSize:12,background:'#eff3fb',padding:'2px 6px',borderRadius:4,color:'#1849a9'}}>{t}</code>
<span style={{display:'inline-flex',alignItems:'center',gap:6}}>
<span style={{display:'inline-block',width:14,height:14,borderRadius:3,background:h,border:'1px solid rgba(0,0,0,0.12)',flexShrink:0}}/>
<code style={{fontSize:11,color:'#111827'}}>{h}</code>
</span>
<code style={{fontSize:11,color:'#6b7280'}}>{f}</code>
<span style={{fontSize:12,color:'#6b7280'}}>{u}</span>
</div>
))}
</div>
</div>
```

**Type badge color key for color swatches:**
- `background: '#eff3fb'` → token name code background (always)
- Color swatch: inline `<span>` with actual hex as `background` — handles rgba() too

---

### Properties

Single card with column header row + alternating data rows.
Each prop row: name (blue code tag), type (colored badge), default (gray code), description.

**Type badge colors:**
| Type | Background | Text |
|---|---|---|
| `node` | `#ecfdf5` | `#059669` |
| `enum` | `#fff7ed` | `#c2410c` |
| `boolean` | `#f3f0ff` | `#7c3aed` |
| `function` | `#fdf4ff` | `#9333ea` |
| `array` | `#f0fdf4` | `#166534` |
| `string` | `#eff3fb` | `#1849a9` |

```jsx
<div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
<div style={{ display: 'grid', gridTemplateColumns: '130px 110px 76px 1fr', background: '#f0f1f3', padding: '7px 16px', gap: 12, fontSize: 11, fontWeight: 600, color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}><span>Prop</span><span>Type</span><span>Default</span><span>Description</span></div>
{[{n:'propName',type:'enum',tb:'#fff7ed',tc:'#c2410c',def:'defaultVal',d:'Description text'}].map(({n,type,tb,tc,def,d},i)=>(
<div key={n} style={{display:'grid',gridTemplateColumns:'130px 110px 76px 1fr',padding:'10px 16px',background:i%2===0?'#fff':'#fafafa',borderBottom:'1px solid #f3f4f6',gap:12,alignItems:'start'}}>
<code style={{fontSize:12,background:'#eff3fb',padding:'2px 6px',borderRadius:4,color:'#1849a9',fontWeight:600}}>{n}</code>
<span style={{background:tb,color:tc,fontSize:11,padding:'2px 7px',borderRadius:4,fontWeight:600,display:'inline-block',alignSelf:'center'}}>{type}</span>
<code style={{fontSize:12,color:'#6b7280',alignSelf:'center'}}>{def}</code>
<span style={{fontSize:13,color:'#374151',lineHeight:1.5}}>{d}</span>
</div>
))}
</div>
```

---

### Accessibility

Three grouped cards: **Keyboard Navigation** (blue), **ARIA & Semantics** (purple), **Visual & Focus** (green).
Each item has a green ✓ circle + title (bold) + description (smaller gray).

```jsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16 }}>
{[
{cat:'Keyboard Navigation',catBg:'#eff3fb',catBorder:'#dbeafe',catIconBg:'#1849a9',catIcon:'⌨',items:[
{title:'Rule title',desc:'Detailed description of the keyboard rule.'},
]},
{cat:'ARIA & Semantics',catBg:'#fdf4ff',catBorder:'#e9d5ff',catIconBg:'#9333ea',catIcon:'A',items:[
{title:'Rule title',desc:'Detailed description of the ARIA rule.'},
]},
{cat:'Visual & Focus',catBg:'#ecfdf5',catBorder:'#a7f3d0',catIconBg:'#059669',catIcon:'◎',items:[
{title:'Rule title',desc:'Detailed description of the visual rule.'},
]},
].map(({cat,catBg,catBorder,catIconBg,catIcon,items})=>(
<div key={cat} style={{border:'1px solid #e5e7eb',borderRadius:10,overflow:'hidden'}}>
<div style={{display:'flex',alignItems:'center',gap:10,padding:'11px 16px',background:catBg,borderBottom:`1px solid ${catBorder}`}}>
<span style={{width:24,height:24,borderRadius:'50%',background:catIconBg,color:'#fff',fontSize:12,fontWeight:800,display:'inline-flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{catIcon}</span>
<span style={{fontSize:13,fontWeight:700,color:'#111827'}}>{cat}</span>
</div>
{items.map(({title,desc},j)=>(
<div key={j} style={{display:'flex',alignItems:'flex-start',gap:10,padding:'11px 16px',borderBottom:j<items.length-1?'1px solid #f3f4f6':'none',background:'#fff'}}>
<span style={{width:17,height:17,borderRadius:'50%',background:'#059669',color:'#fff',fontSize:10,fontWeight:800,display:'inline-flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:2}}>✓</span>
<div>
<div style={{fontSize:13,fontWeight:600,color:'#111827',marginBottom:2}}>{title}</div>
<div style={{fontSize:12,color:'#6b7280',lineHeight:1.5}}>{desc}</div>
</div>
</div>
))}
</div>
))}
</div>
```

---

### Do's & Don'ts

Two parts stacked vertically:
1. **Preview cards** (2-column grid) — live component with border (green `#a7f3d0` / red `#fecaca`), caption + 3 bullet rules in the footer.
2. **Full rules cards** (2-column grid) — Do and Don't lists with ✓ / ✕ row items.

```jsx
{/* Part 1 — preview cards with inline bullet rules */}
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
<div style={{ borderRadius: 10, overflow: 'hidden', border: '2px solid #a7f3d0' }}>
<div style={{ padding: '28px 20px', minHeight: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 10, background: '#fff' }}>
{/* LIVE DO EXAMPLE */}
</div>
<div style={{ padding: '10px 14px', background: '#ecfdf5', borderTop: '1px solid #a7f3d0' }}>
<div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 700, color: '#059669', marginBottom: 6 }}><span style={{ width: 16, height: 16, borderRadius: '50%', background: '#059669', color: '#fff', fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✓</span>Do caption</div>
{['Rule 1','Rule 2','Rule 3'].map((r,i)=>(
<div key={i} style={{ display: 'flex', gap: 6, fontSize: 12, color: '#065f46', marginTop: 4, lineHeight: 1.4 }}><span style={{ color: '#059669', fontWeight: 700, flexShrink: 0 }}>·</span>{r}</div>
))}
</div>
</div>
<div style={{ borderRadius: 10, overflow: 'hidden', border: '2px solid #fecaca' }}>
<div style={{ padding: '28px 20px', minHeight: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: '#fff' }}>
{/* LIVE DON'T EXAMPLE */}
</div>
<div style={{ padding: '10px 14px', background: '#fef2f2', borderTop: '1px solid #fecaca' }}>
<div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 700, color: '#dc2626', marginBottom: 6 }}><span style={{ width: 16, height: 16, borderRadius: '50%', background: '#dc2626', color: '#fff', fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✕</span>Don't caption</div>
{["Don't rule 1","Don't rule 2","Don't rule 3"].map((r,i)=>(
<div key={i} style={{ display: 'flex', gap: 6, fontSize: 12, color: '#991b1b', marginTop: 4, lineHeight: 1.4 }}><span style={{ color: '#dc2626', fontWeight: 700, flexShrink: 0 }}>·</span>{r}</div>
))}
</div>
</div>
</div>
{/* Part 2 — full rules list */}
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
<div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
<div style={{ background: '#ecfdf5', padding: '9px 14px', borderBottom: '1px solid #a7f3d0', fontSize: 12, fontWeight: 700, color: '#059669', display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ width: 16, height: 16, borderRadius: '50%', background: '#059669', color: '#fff', fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>Do</div>
{['Rule 1','Rule 2','Rule 3'].map((r,i)=>(
<div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 14px', borderBottom: '1px solid #f3f4f6', background: '#fff', fontSize: 13, color: '#111827', lineHeight: 1.45 }}><span style={{ color: '#059669', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>{r}</div>
))}
</div>
<div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
<div style={{ background: '#fef2f2', padding: '9px 14px', borderBottom: '1px solid #fecaca', fontSize: 12, fontWeight: 700, color: '#dc2626', display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ width: 16, height: 16, borderRadius: '50%', background: '#dc2626', color: '#fff', fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>✕</span>Don't</div>
{["Don't rule 1","Don't rule 2","Don't rule 3"].map((r,i)=>(
<div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 14px', borderBottom: '1px solid #f3f4f6', background: '#fff', fontSize: 13, color: '#111827', lineHeight: 1.45 }}><span style={{ color: '#dc2626', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✕</span>{r}</div>
))}
</div>
</div>
```

---

### Mismatch Report

Three parts:
1. **Summary pill row** — colored pills showing counts (Match, Deviation, New token, Enhancement, Pending).
2. **Deviations card** (amber border) — only items that differ from Figma and need attention.
3. **New tokens & enhancements card** (blue border) — tokens added to tokens.css + additions not in Figma.
4. **`<details>` expandable** — full match list for all properties that passed audit.
5. **Missing decisions note** — small gray card for anything not specified in Figma.

**Status badge colors:**
| Status | Background | Text | Border |
|---|---|---|---|
| Match | `#ecfdf5` | `#059669` | `#a7f3d0` |
| Fixed | `#ecfdf5` | `#059669` | `#a7f3d0` |
| Deviation | `#fffbeb` | `#d97706` | `#fde68a` |
| New token | `#eff3fb` | `#1849a9` | `#bfdbfe` |
| Enhancement | `#f3f4f6` | `#6b7280` | `#e5e7eb` |
| Pending | `#fff7ed` | `#c2410c` | `#fed7aa` |

```jsx
{/* 1 — Summary pills */}
<div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
<span style={{ background: '#ecfdf5', color: '#059669', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100, border: '1px solid #a7f3d0' }}>N Match</span>
<span style={{ background: '#fffbeb', color: '#d97706', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100, border: '1px solid #fde68a' }}>N Deviation</span>
<span style={{ background: '#eff3fb', color: '#1849a9', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100, border: '1px solid #bfdbfe' }}>N New token</span>
<span style={{ background: '#f3f4f6', color: '#6b7280', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100, border: '1px solid #e5e7eb' }}>N Enhancement</span>
</div>
{/* 2 — Deviations card (only render if there are deviations) */}
<div style={{ border: '1px solid #fde68a', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
<div style={{ background: '#fffbeb', padding: '10px 16px', borderBottom: '1px solid #fde68a', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: '#d97706' }}>Deviations — requires attention</div>
{/* For each deviation: show area, Figma vs Implementation side by side, note */}
</div>
{/* 3 — New tokens & enhancements card */}
<div style={{ border: '1px solid #bfdbfe', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
<div style={{ background: '#eff3fb', padding: '10px 16px', borderBottom: '1px solid #bfdbfe', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: '#1849a9' }}>New tokens & enhancements added</div>
{/* Rows with status badge + token name + explanation */}
</div>
{/* 4 — Expandable full match list */}
<details style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
<summary style={{ background: '#f9fafb', padding: '10px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#374151', borderBottom: '1px solid #e5e7eb', listStyle: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
<span style={{ background: '#ecfdf5', color: '#059669', fontSize: 11, padding: '2px 8px', borderRadius: 4, fontWeight: 700, border: '1px solid #a7f3d0' }}>N Match</span>
View all matched properties
</summary>
{/* 3-column grid: area · Figma value · implementation */}
</details>
{/* 5 — Missing decisions note */}
<div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>
<span style={{ fontWeight: 700, color: '#374151' }}>Missing design decisions</span> — not specified in Figma: ...
</div>
```

---

## MDX 3 Constraints (Critical)

1. **No blank lines inside JSX elements.** Blank lines between children of a JSX element trigger MDX's markdown mode, which wraps text in `<p>` — causing `<p>` inside `<p>` hydration errors.
2. **Use `<div>` not `<p>` for non-heading text** inside JSX layouts. `<p>` elements cannot have block children.
3. **No blank line after the opening outer wrapper div.** The outer `<div style={{ fontFamily: ... }}>` must have its first child immediately on the next line.
4. **Top-level MDX separators** (`---`, `## headings`) between JSX blocks ARE safe with blank lines around them — they produce `<hr>` and `<h2>` (block elements), not `<p>`.
5. **JSX expressions `{...}`** are expression mode — blank lines inside `.map()` callbacks are fine.
6. **Import path:** `import { Meta } from '@storybook/addon-docs/blocks'` — NOT `@storybook/blocks`.
7. **Disable autodocs:** `tags: []` in the stories file (not `['autodocs']`) when an MDX file controls the docs page.

---

## Reference Files

- Figma file: `WTmRAkJVvw0IvZMA7wBdTC` (Masterteam-Ds-For-Experiment-ONLY)
- Button Figma node: `4159:280` / `4159:296`
- Button reference HTML: `../output/button.html`
- Design tokens: `src/components/tokens.css`
- DGA Guidelines: https://design.dga.gov.sa/guidelines/components/actions/buttons

---

## Interactive Charts Rules

These rules apply to **all** chart components:
Horizontal Bar Chart · Vertical Bar Chart · Line Chart · Area Chart · Donut Chart · Radar Chart · Heatmap · Risk Matrix · Map Chart · any future chart.

**Goal:** consistent, accessible, token-based interactivity across the design system.
Do not redesign charts. Do not invent visual styles. Source of truth: Figma + existing chart tokens.

---

### Chart Plot Area — Margin System (Required for Every Chart)

All charts must use a **margin-based layout**, not ad-hoc padding constants.

```js
const margin = {
  top:    24,                          // space above top-most element (bars, line, arc)
  right:  dir === 'rtl' ? 120 : 24,   // RTL: label gutter on right; LTR: small padding
  bottom: 56,                          // axis tick labels + axis title
  left:   dir === 'rtl' ? 24 : 100,   // LTR: label gutter on left; RTL: small padding
};

const plotX     = margin.left;
const plotY     = margin.top;
const plotWidth  = viewWidth  - margin.left - margin.right;
const plotHeight = viewHeight - margin.top  - margin.bottom;
```

Rules:
- All bars, grid lines, arcs, polylines must be drawn inside `plotX / plotY / plotWidth / plotHeight`.
- No element may be drawn at SVG x=0 or y=0 directly.
- Tick labels must sit **outside** the plot area (below or to the side).
- Category labels must sit **outside** the plot area edge, separated by ≥ 12px gap.
- Adjust `margin.right` or `margin.left` when preview is wider or text is longer — never shrink text.

#### RTL Horizontal Bar Chart Margins

```js
margin = {
  top:    24,
  right:  120,   // Arabic category labels + Y-axis title column
  bottom: 56,    // value-axis tick labels + axis title
  left:   24,    // small — bars grow leftward from left edge
};
```

Bars grow from `plotX + plotWidth` leftward:
```js
const barWidth = (value / maxValue) * plotWidth;
const barX     = dir === 'rtl' ? plotX + plotWidth - barWidth : plotX;
```

Category labels sit after the right edge:
```js
const labelX      = dir === 'rtl' ? plotX + plotWidth + 12 : plotX - 12;
const labelAnchor = dir === 'rtl' ? 'start' : 'end';
```

Y-axis title sits in the outermost right column:
```js
const yTitleX = dir === 'rtl' ? viewWidth - 16 : 16;
```

#### RTL Vertical Bar Chart Margins

In RTL vertical charts, the **Y-axis (value axis) moves to the right**.
Category order reverses via `colCenterX` index reversal.

```js
margin = {
  top:    32,
  right:  72,    // RTL: Y-axis tick labels + title on right
  bottom: 56,
  left:   24,    // RTL: small left padding
};
```

Tick labels and title on the correct side:
```js
const tickLabelX      = dir === 'rtl' ? plotX + plotWidth + 8 : plotX - 8;
const tickLabelAnchor = dir === 'rtl' ? 'start' : 'end';
const yTitleX         = dir === 'rtl' ? viewWidth - 14 : 14;
const yTitleRotate    = dir === 'rtl' ? 90 : -90;
```

---

### Tooltip Rules

Every chart must show a tooltip on **hover** and **keyboard focus** of a data element.

**Applies to:** bar segments · line/area points · donut segments · radar points · heatmap cells · risk matrix cells · map regions.

Tooltip content:
| Field | Required | Example |
|---|---|---|
| Title | Yes | "Jan" (category) |
| Series label | Multi-series only | "Active Users" |
| Value | Yes | "500" |
| Percentage | Conditional | "42%" (donut) |
| Row / Column | Heatmap | "Monday / January" |

Visual rules:
- Use only design system tokens (see Token Requirements section below).
- Tooltip must not cover the focused data point when avoidable.
- Must stay within the chart card boundaries where possible.
- Position flips in RTL.

Accessibility rules:
- Appears on `hover` AND `focus`.
- Content available to screen readers via `aria-describedby`.
- Not the only way to access data — provide accessible data table.
- `Escape` closes persistent tooltips.
- Never traps focus.

Tooltip state machine:
```
hidden  →  (hover | focus)   →  visible
visible →  (mouseleave | blur | Escape)  →  hidden
```

---

### Legend Filtering Rules

All **multi-series** charts must support legend filtering.

**Applies to:** group bar · stacked bar · line · area · radar · donut (if Figma defines toggleable segments).
**Does NOT apply to:** single-series charts · heatmap color scale (unless Figma defines filterable ranges).

Behavior:
- Click / Enter / Space on legend item toggles its series visibility.
- Hidden series appear visually muted (reduced opacity or dedicated muted token).
- **At least one series must remain visible** — prevent hiding the last visible series.
- Tooltip shows only visible series.
- Axis scale: stay fixed unless Figma/product explicitly defines rescaling.

Legend item must be a `<button>`, not a `<div>`:
```jsx
<button
  role="button"
  aria-pressed={isVisible}
  aria-label={`Toggle ${series.label} visibility`}
  onClick={() => onLegendToggle(series.id)}
>
  <span style={{ background: series.color }} />
  <span>{series.label}</span>
</button>
```

States: default · hover · focus (visible focus ring) · active/visible · hidden/muted · disabled.

---

### Unified Chart Interaction Props

Add these shared props to every chart component where applicable:

| Prop | Type | Default | Description |
|---|---|---|---|
| `interactive` | `boolean` | `true` | Enables hover/focus interactions |
| `showTooltip` | `boolean` | `true` | Shows tooltip on hover/focus |
| `tooltipFormatter` | `function` | `undefined` | Custom tooltip content function |
| `legendInteractive` | `boolean` | `true` | Allows legend item filtering |
| `hiddenSeries` | `string[]` | `[]` | Controlled hidden series IDs |
| `onLegendToggle` | `(id) => void` | `undefined` | Callback when legend toggled |
| `onDatumFocus` | `(datum) => void` | `undefined` | Callback when datum focused |
| `onDatumBlur` | `() => void` | `undefined` | Callback when datum blurs |
| `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Chart layout direction |

Do not add props that conflict with existing component APIs.

---

### Shared Chart Files

Create the following shared files if they do not exist:

```
src/components/charts/shared/ChartTooltip.jsx
src/components/charts/shared/ChartTooltip.module.css
src/components/charts/shared/ChartLegend.jsx
src/components/charts/shared/ChartLegend.module.css
src/components/charts/shared/useChartInteractions.js
```

`ChartTooltip` must:
- Accept: `title`, `subtitle`, `rows` (array of `{ color, label, value }`), `dir`.
- Use design system tokens only.
- Support LTR and RTL.
- Be reusable across all chart types.

`ChartLegend` must:
- Render items as accessible `<button>` elements.
- Expose `aria-pressed` and `aria-label`.
- Support `hidden` state with muted visual.
- Support RTL layout.

`useChartInteractions` hook manages:
- Hovered / focused datum
- Tooltip visibility and position
- Hidden series set
- Legend toggle with last-visible-series guard
- `Escape` key handler

---

### Keyboard Rules

| Element | Key | Action |
|---|---|---|
| Legend item | `Tab` | Move to next legend item |
| Legend item | `Enter` / `Space` | Toggle series visibility |
| Data point (bar/cell) | `Tab` | Move to next focusable point |
| Data point | `Enter` / `Space` | Show tooltip / select |
| Data point | Arrow keys | Move between points (heatmap, grouped bars) |
| Tooltip (persistent) | `Escape` | Close tooltip |

Bars, cells, and data points must have `aria-label`:
```jsx
<rect aria-label={`${category}: ${value}`} tabIndex={0} />
```

---

### Storybook Story Requirements for Interactive Charts

Required stories per chart:

| Story | Required for |
|---|---|
| `Playground` | All charts |
| `Default` | All charts |
| `With Tooltip` | All interactive charts |
| `Legend Filtering` | Multi-series charts only |
| `Keyboard Navigation` | All interactive charts |
| `RTL Arabic` | All charts |
| `Data Table Fallback` | All charts |

Do not create a story for every micro-state — interaction examples live in the Docs MDX page.

Sidebar structure:
```
Components
  Charts
    Horizontal Bar Chart
      Docs
      Playground
      Single Bar
      Group Bar
      Stacked Bar
      RTL Arabic
```

---

### MDX Documentation Requirements for Interactive Charts

Every chart MDX page must include these interaction sections:

1. **Interaction Overview** — tooltip · legend filtering · keyboard · data fallback
2. **Tooltip Anatomy** — table: title / series label / value / percentage / metadata
3. **Legend Filtering** — toggle behavior · hidden state · last-visible guard · keyboard
4. **Keyboard Interaction** — key/action table
5. **Axis and Plot Area Spacing** — margin rules table (required for every chart)
6. **Accessibility Checklist** — WCAG checks with status column
7. **Mismatch Report** — always present, updated per audit

Required accessibility checklist table:
```md
| Check | Expected | Status |
|---|---|---|
| Tooltip on hover | Tooltip visible | Pending |
| Tooltip on focus | Tooltip visible | Pending |
| Screen reader announces value | Value announced | Pending |
| Legend item keyboard reachable | Focus ring shown | Pending |
| Enter/Space toggles legend | Series hides/shows | Pending |
| Last visible series protected | Cannot hide all | Pending |
| Data table fallback exists | Data readable | Pending |
| RTL tooltip position | No overflow | Pending |
```

---

### Token Requirements for Chart Interactions

Add to `tokens.css` when implementing interactivity. If not in Figma, document as missing.

**Tooltip tokens:**
```css
--chart-tooltip-bg:      /* background */
--chart-tooltip-text:    /* text color */
--chart-tooltip-border:  /* border color */
--chart-tooltip-radius:  /* border-radius */
--chart-tooltip-shadow:  /* box-shadow */
```

**Legend interaction tokens:**
```css
--chart-legend-muted-opacity:  /* hidden series opacity */
--chart-legend-hover-bg:       /* legend item hover background */
--chart-legend-focus-ring:     /* focus ring color */
```

**Data point interaction tokens:**
```css
--chart-datum-focus-stroke:    /* focused bar/point stroke */
--chart-datum-hover-stroke:    /* hovered bar/point stroke */
```

If any of these are not present in Figma variables: add to Missing token report. Do not invent values silently.

---

### Data Fallback — Required for All Charts

Every chart must include a visually-hidden accessible data table:

```jsx
<table className={styles.srOnly} aria-label={`${title} — data table`}>
  <caption>{title}</caption>
  <thead>
    <tr>
      <th scope="col">Category</th>
      {series.map(s => <th key={s.label} scope="col">{s.label}</th>)}
    </tr>
  </thead>
  <tbody>
    {categories.map((cat, ci) => (
      <tr key={cat}>
        <th scope="row">{cat}</th>
        {series.map(s => <td key={s.label}>{s.data[ci] ?? 0}</td>)}
      </tr>
    ))}
  </tbody>
</table>
```

Required fallback per chart type:
| Chart | Required fallback |
|---|---|
| Bar charts | Category × value table |
| Group/stacked | Category × series table |
| Line/Area | X value × series table |
| Donut | Segment × value × percentage table |
| Heatmap | Row × column × value table |
| Map | Region × value table |
| Risk matrix | Risk × probability × impact table |

---

### Implementation Order for Each Chart

1. Audit current chart for interactivity gaps.
2. Check Figma and uploaded chart docs.
3. Create missing token report.
4. Build or update `ChartTooltip` shared component.
5. Build or update `ChartLegend` shared component.
6. Add legend filtering (multi-series only).
7. Add tooltip on hover/focus.
8. Add keyboard support.
9. Add/verify data table fallback.
10. Update MDX docs (all required sections).
11. Update stories (all required stories).
12. Test LTR and RTL.
13. Run Storybook build.
14. Confirm no MDX indexing errors.

---

### Important Restrictions for Interactive Charts

- Do not change Button, Accordion, or unrelated foundations.
- Do not break existing chart visuals.
- Do not use external chart libraries (unless already in the project).
- Do not invent tooltip/legend styles not in Figma.
- Do not make heatmap legend filtering unless Figma defines filterable color ranges.
- Do not remove existing `aria-label` attributes.
- Do not rely on color alone to communicate data.

---

### Final Report Format (Per Chart)

After applying interactivity to each chart, provide:

```
1. Updated chart files
2. Shared interaction files created/updated
3. Tooltip: added / pending / not applicable
4. Legend filtering: added / pending / not applicable
5. Keyboard support: added / pending / not applicable
6. Data fallback: verified / added
7. Stories updated
8. MDX sections updated
9. Missing tokens (list)
10. Remaining mismatches (list)
11. RTL checks: LTR ✓ / RTL ✓
12. Storybook build: pass / fail
```
