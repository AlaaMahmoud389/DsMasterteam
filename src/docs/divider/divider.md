# Divider

## Purpose
A thin line that visually separates content sections, list items, or interface regions. Improves scannability by creating clear visual breaks without adding spacing elements.

---

## Variants

| Variant | Description |
|---|---|
| `Horizontal` | Full-width line separating vertical content blocks |
| `Vertical` | Full-height line separating side-by-side content |

---

## Colour Options

| Colour | Use case |
|---|---|
| `Neutral` | Default — separates content on white/light backgrounds |
| `White` | On dark backgrounds (cards, sidebars) |
| `Alpha-white` | Semi-transparent white for layered surfaces |
| `Primary` | Accent-coloured divider for section emphasis |

---

## Sizes / Thickness

The divider renders at 1 px. Thickness is not a configurable variant — use spacing adjustments for visual weight.

---

## Tokens Used

| Colour | Token |
|---|---|
| Neutral | `semantic/action/neutral-subtle/border/default` |
| White | `primitive/color/base/white` |
| Alpha-white | `semantic/background/opacity-10` |
| Primary | `semantic/background/primary-700` |

---

## Usage Rules

- **Use `Neutral`** dividers on all light surfaces (white, grey backgrounds).
- **Use `White` or `Alpha-white`** dividers on dark surfaces (dark sidebars, images, dark cards).
- **Use `Primary`** dividers only for deliberate emphasis — e.g., the active tab underline or a section that should stand out. Do not overuse.
- **Do not substitute margin/padding with dividers.** Dividers are for semantic section separation, not spacing. If content needs breathing room but does not need a visible line, use spacing only.
- **Horizontal dividers** in lists should span the full container width (no indent unless nesting requires it).
- **Vertical dividers** are appropriate in horizontal toolbars and split-view layouts. Keep them short (limited to the height of adjacent items).
- Avoid placing two dividers back-to-back — remove the intermediate element or merge the sections.

---

## Accessibility Notes

- A presentational divider uses `role="separator"` (or `<hr>` for horizontal). Its `aria-hidden="true"` is appropriate when the section separation is already communicated by the content structure.
- When the divider separates a named section, use `<hr aria-label="End of [section name]">` to provide context for screen readers.
- Do not use colour alone to communicate content grouping — heading hierarchy (`<h2>`, `<h3>`) and landmark regions provide semantic structure that a divider does not.
- Vertical dividers (`aria-orientation="vertical"`) on a toolbar are implicitly presentational and can be `aria-hidden="true"`.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use `<hr>` for semantic section separation | Use a `<div>` styled as a divider without `role="separator"` |
| Match divider colour to the background context | Use Neutral divider on dark backgrounds |
| Use to separate logically distinct content sections | Add a divider between every item in a list |
| Use Vertical in toolbars to group related controls | Use Vertical in running paragraph text |

---

## Example HTML Usage

```html
<!-- Horizontal neutral divider (semantic) -->
<section>
  <h2>Account Details</h2>
  <p>Manage your personal information.</p>
</section>

<hr class="divider divider--horizontal divider--neutral" aria-hidden="true" />

<section>
  <h2>Security</h2>
  <p>Change your password and two-factor settings.</p>
</section>

<!-- Horizontal divider in a list -->
<ul class="list" role="list">
  <li class="list__item">Item one</li>
  <hr class="divider divider--horizontal divider--neutral" role="separator" aria-hidden="true" />
  <li class="list__item">Item two</li>
  <hr class="divider divider--horizontal divider--neutral" role="separator" aria-hidden="true" />
  <li class="list__item">Item three</li>
</ul>

<!-- Vertical divider in a toolbar -->
<div class="toolbar" role="toolbar" aria-label="Text formatting">
  <button type="button" class="btn btn--icon-only btn--small" aria-label="Bold">B</button>
  <button type="button" class="btn btn--icon-only btn--small" aria-label="Italic">I</button>

  <div
    class="divider divider--vertical divider--neutral"
    role="separator"
    aria-orientation="vertical"
    aria-hidden="true"
  ></div>

  <button type="button" class="btn btn--icon-only btn--small" aria-label="Align left">⬅</button>
  <button type="button" class="btn btn--icon-only btn--small" aria-label="Align center">↔</button>
</div>

<!-- White divider on dark background -->
<div class="sidebar sidebar--dark">
  <nav><!-- nav items --></nav>
  <hr class="divider divider--horizontal divider--white" aria-hidden="true" />
  <div class="sidebar__footer"><!-- footer --></div>
</div>
```
