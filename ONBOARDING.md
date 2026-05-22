# Masterteam DS — Storybook Onboarding

## Project

**ds-storybook** — Component library documentation for the Masterteam Design System.  
Stack: React 19 · Vite · Storybook 10 · CSS Modules · MDX 3  
Figma file: `WTmRAkJVvw0IvZMA7wBdTC` (Masterteam-Ds-For-Experiment-ONLY)

---

## Workflow for every new component

Follow the 8-step rule in `.cursor/rules/storybook-design-system-documentation.md`:

1. **Figma first** — `get_design_context` → `get_screenshot` → `get_variable_defs`
2. **Extract** — all variants, sizes, states, tokens, RTL, accessibility
3. **Audit** — compare Figma vs existing code, produce mismatch table
4. **Cleanup** — remove stories not in Figma
5. **Rebuild** — `[Name].jsx`, `[Name].module.css`, `[Name].stories.jsx`, `[Name].mdx`, `index.js`
6. **Fix** — tokens first, then CSS, then JSX, then stories, then MDX
7. **Verify** — side-by-side screenshot comparison
8. **Report** — 10-item final report

---

## MDX Docs Page — Required Sections (in order)

1. Overview · 2. Anatomy · 3. Variants · 4. Destructive · 5. Sizes · 6. States · 7. State Table · 8. RTL Support · 9. Icon Usage · 10. Token Table · 11. Properties · 12. Accessibility · 13. Usage Guidelines · 14. Code Examples · 15. Mismatch Report

---

## MDX Visualization Patterns

All four key sections use JSX card layouts — not plain markdown tables.

### Token Table
Stacked cards: **Sizing & Spacing** and **Colors** (+ Typography if applicable).  
Color tokens include an inline 14×14 px color swatch next to the hex value.  
Token names in blue `#eff3fb` code tags. Alternating row backgrounds.

### Properties
Single card with a **type badge** per prop.

| Type | Badge bg | Badge text |
|---|---|---|
| `node` | `#ecfdf5` | `#059669` green |
| `enum` | `#fff7ed` | `#c2410c` orange |
| `boolean` | `#f3f0ff` | `#7c3aed` purple |
| `function` | `#fdf4ff` | `#9333ea` violet |
| `array` | `#f0fdf4` | `#166534` dark-green |

### Accessibility
Three grouped cards with colored headers:
- **Keyboard Navigation** — blue `#eff3fb / #1849a9`, icon `⌨`
- **ARIA & Semantics** — purple `#fdf4ff / #9333ea`, icon `A`
- **Visual & Focus** — green `#ecfdf5 / #059669`, icon `◎`

Each item: green ✓ circle + bold title + gray description.

### Do's & Don'ts
Two stacked grids:
1. Live preview cards — green border `#a7f3d0` (Do) / red `#fecaca` (Don't) + 3 inline bullet rules
2. Full rules list cards — ✓ / ✕ row items

### Mismatch Report
Four parts: summary pills → Deviations card (amber) → New tokens card (blue) → `<details>` expandable full match list → missing decisions note.

**Status badge colors:**

| Status | bg | text |
|---|---|---|
| Match / Fixed | `#ecfdf5` | `#059669` |
| Deviation | `#fffbeb` | `#d97706` |
| New token | `#eff3fb` | `#1849a9` |
| Enhancement | `#f3f4f6` | `#6b7280` |
| Pending | `#fff7ed` | `#c2410c` |

---

## MDX 3 Critical Rules

1. **No blank lines inside JSX elements** — triggers `<p>` wrapping → hydration error
2. **Use `<div>` not `<p>`** for text inside JSX layouts
3. **No blank line** after the opening `<div style={{ fontFamily: ... }}>` page wrapper
4. **Import:** `@storybook/addon-docs/blocks` — NOT `@storybook/blocks`
5. **`tags: []`** in stories — NOT `['autodocs']` when MDX controls the docs page

---

## Tokens

All values from `src/components/tokens.css`. No hardcoded hex values in component CSS.  
When adding a new token, include a Figma path comment:
```css
--color-danger-secondary-bg: #fcdad7; /* component/button/danger-secondary/background/default */
```

## Focus Ring

Double box-shadow — no `outline`:
```css
.trigger:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #1849a9, 0 0 0 5px #ffffff;
}
```

## Disabled State

Dedicated tokens, no opacity:
```css
background-color: var(--color-disabled-bg);  /* #d2d6db */
color:            var(--color-disabled-text); /* #6c7c96 */
cursor: not-allowed;
pointer-events: none;
```

---

## Completed Components

| Component | Figma node | Status |
|---|---|---|
| Button | `4159:280` | Done — reference implementation |
| Accordion | `4113:1059` | Done |
