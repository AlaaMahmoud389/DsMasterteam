# Card

## Purpose
A contained surface that groups related content and actions into a scannable unit. Cards are used for lists of items, content previews, dashboard widgets, and entity summaries.

---

## Variants (Type)

| Type | Description |
|---|---|
| `Default` | Static card — purely informational, no selection state |
| `Expandable` | Has a chevron; can be toggled open/closed to reveal additional content |
| `Selectable` | Can be chosen; enters `Selected` state when clicked |

---

## Appearance (Effect)

| Effect | Description |
|---|---|
| `With Shadow` | Elevated appearance using drop shadow. Default. |
| `No Shadow` | Flat surface. Use on already-elevated backgrounds. |
| `Stroke` | Defined border instead of shadow. Use in dense grid layouts. |

---

## States

| State | Description |
|---|---|
| `Default` | Resting state |
| `Hover` | Subtle background/shadow shift on pointer over |
| `Focused` | Keyboard focus ring visible |
| `Disabled` | Non-interactive; reduced opacity |
| `Expanded` | (`Expandable` type) Body content visible |
| `Selected` | (`Selectable` type) Active selection — highlighted border |

---

## Content Slots

| Slot / Property | Description |
|---|---|
| Image | Optional hero image above content |
| Featured Icon | Optional icon in the header area |
| Title | Card heading |
| Description | Supporting body copy |
| Tags | Optional chip group |
| Rating | Optional star rating |
| Primary Action | Main CTA button |
| Secondary Action | Supporting text button |
| Custom Component | Freeform slot for non-standard content |

---

## Tokens Used

| Property | Token |
|---|---|
| Background | `semantic/background/Surface/Primary` |
| Border | `semantic/action/neutral-subtle/border/default` |
| Shadow (With Shadow) | Effect style: `shadow/md` |
| Shadow (Hover) | Effect style: `shadow/lg` |
| Selected border | `component/button/primary/border/focused` |
| Selected background tint | `semantic/background/primary-50` |
| Title text | `semantic/action/neutral-subtle/text/default` |
| Body text | `semantic/background/neutral-600` |
| Border radius | `semantic/spacing/md` |
| Padding | `semantic/spacing/xl` |
| Disabled overlay | `semantic/background/opacity-10` |

---

## Usage Rules

- **Use `Default`** for read-only content displays (articles, user profiles, metrics).
- **Use `Expandable`** for FAQ-style items or collapsible detail panels within a list — not as an alternative to Accordion.
- **Use `Selectable`** for item pickers (plan selection, entity assignment, tag selection). Always confirm the selection state visually with a border or checkmark.
- **Do not nest cards inside cards.** Use list items or rows for nested content.
- **Primary Action** should be the most important action for the card entity. If every card has the same action ("View"), consider making the entire card a link instead.
- **Tags and Rating** are supplementary — do not show both simultaneously in compact layouts.
- Maintain consistent card widths in a grid layout. Avoid mixing narrow and wide cards without intentional hierarchy.

---

## Accessibility Notes

- **Selectable cards** must be keyboard operable: `role="checkbox"` (multi-select) or `role="radio"` (single-select within a group), or a `<button>` if selection is one-shot.
- **Expandable cards** follow the Disclosure pattern: the trigger is a `<button>` with `aria-expanded` and `aria-controls` pointing to the content panel.
- Do not wrap the entire card in a `<a>` tag if it contains multiple interactive elements — this creates a large, ambiguous link target. Use a specific CTA link/button instead.
- If using an image, always provide `alt` text that describes the image in context. Decorative images use `alt=""`.
- Keyboard users must be able to reach and activate every interactive element in a card via Tab.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Choose card type to match interaction pattern | Use `Selectable` when no selection logic exists |
| Keep card actions to 1–2 maximum | Add 4+ buttons to a single card |
| Use consistent card sizes in grid layouts | Mix portrait and landscape card orientations without reason |
| Provide `alt` text on card images | Use empty `alt` for meaningful images |
| Use `Stroke` effect in dense grids | Apply `With Shadow` in tables or tight rows |

---

## Example HTML Usage

```html
<!-- Default card -->
<article class="card card--shadow">
  <div class="card__image">
    <img src="project-thumbnail.jpg" alt="Screenshot of the dashboard project" />
  </div>
  <div class="card__body">
    <div class="card__icon">
      <svg aria-hidden="true" focusable="false"><!-- featured icon --></svg>
    </div>
    <h3 class="card__title">Dashboard Redesign</h3>
    <p class="card__description">
      A full rebuild of the analytics dashboard using the new design system.
    </p>
  </div>
  <div class="card__footer">
    <button type="button" class="btn btn--primary btn--medium">View project</button>
    <button type="button" class="btn btn--transparent btn--medium">Share</button>
  </div>
</article>

<!-- Selectable card (single-select) -->
<div role="radiogroup" aria-label="Select a plan" class="card-grid">
  <div
    class="card card--selectable card--stroke"
    role="radio"
    aria-checked="false"
    tabindex="0"
    id="plan-starter"
  >
    <h3 class="card__title">Starter</h3>
    <p class="card__description">Up to 5 users · 10 GB storage</p>
    <p class="card__price">Free</p>
  </div>
  <div
    class="card card--selectable card--stroke card--selected"
    role="radio"
    aria-checked="true"
    tabindex="0"
    id="plan-pro"
  >
    <h3 class="card__title">Pro</h3>
    <p class="card__description">Up to 25 users · 100 GB storage</p>
    <p class="card__price">$29 / month</p>
  </div>
</div>

<!-- Expandable card -->
<div class="card card--expandable card--shadow">
  <button
    type="button"
    class="card__toggle"
    aria-expanded="false"
    aria-controls="card-details"
  >
    <h3 class="card__title">Q3 Financial Summary</h3>
    <svg class="card__chevron" aria-hidden="true" focusable="false"><!-- chevron icon --></svg>
  </button>
  <div id="card-details" class="card__expand-content" hidden>
    <p>Revenue: $4.2M · Expenses: $3.1M · Net: $1.1M</p>
  </div>
</div>
```
