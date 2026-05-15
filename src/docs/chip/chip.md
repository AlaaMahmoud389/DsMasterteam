# Chip

## Purpose
A compact, interactive tag-like element used for filtering, selection, categorisation, or displaying metadata. Chips can be static labels or interactive toggles depending on the context.

---

## Variants (Style)

| Style | Description |
|---|---|
| `Primary` | Brand-coloured. Use for selected/active filter states. |
| `Neutral` | Low-contrast. Use for inactive filters or tags. |

---

## Sizes

| Size | Height | Use case |
|---|---|---|
| `Large` | 36 px | Filter bars, tag lists |
| `Medium` | 28 px | Inline within content, form selections |
| `Small` | 22 px | Dense metadata, compact lists |

---

## Shape

| Option | Description |
|---|---|
| `Rounded=True` | Pill shape — full border radius. Default. |
| `Rounded=False` | Slight radius — more rectangular. Use in table cells. |

---

## States

| State | Description |
|---|---|
| `Default` | Resting |
| `Hovered` | Subtle background shift |
| `Pressed` | Darker background |
| `Selected` | Active — fills with Primary or Neutral colour |
| `Focused` | Keyboard focus ring |
| `Disabled` | Non-interactive; reduced opacity |

---

## Content Options

| Property | Description |
|---|---|
| `Show Lead Icon` | Icon before the label |
| `Show Trail Icon` | Icon after the label |
| `Close Button` | Dismiss/remove button (×) appended to the chip |
| `On-color` | Inverted style for use on dark/branded backgrounds |

---

## Tokens Used

| Property | Token |
|---|---|
| Background (Primary default) | `semantic/background/primary-50` |
| Background (Primary selected) | `semantic/background/primary-700` |
| Background (Neutral default) | `semantic/background/neutral-100` |
| Background (Neutral selected) | `semantic/background/neutral-800` |
| Background (Hovered) | `semantic/action/neutral-subtle/background/hover` |
| Text (Primary default) | `semantic/background/primary-700` |
| Text (Primary selected) | `primitive/color/base/white` |
| Text (Neutral default) | `semantic/action/neutral-subtle/text/default` |
| Border | `semantic/action/neutral-subtle/border/default` |
| Close icon | `semantic/action/neutral-subtle/icon/default` |
| Spacing (horizontal padding) | `semantic/spacing/sm` |
| Border radius (Rounded) | `semantic/spacing/4xl` |

---

## Usage Rules

- **Filter chips** should toggle between selected (Primary) and unselected (Neutral) states. Multiple filters can be active simultaneously.
- **Tag / label chips** (non-interactive) do not have a hover or selected state — use the `Disabled` style and remove tabindex.
- **Removable chips** (`Close Button=True`) are used in multi-value inputs (e.g., selected tags). The `×` button removes only the chip, not the whole selection. The label click should not remove the chip.
- **Do not use chips as navigation items.** Use tabs, links, or buttons for navigation.
- **Icon-only chips are not recommended** — always include a text label for clarity.
- Chips in a filter bar should be horizontally scrollable if they exceed the container width, not wrap to a second line.

---

## Accessibility Notes

- **Filter chips**: `role="checkbox"` with `aria-checked="true/false"`, grouped inside `role="group"` with `aria-label`.
- **Tag chips** (non-interactive): `role="listitem"` inside `role="list"`. No tabindex.
- **Removable chips**: The label and the close button are separate focusable elements. The close button has `aria-label="Remove [chip label]"`.
- Keyboard: `Space` / `Enter` toggles filter chips. `Delete` / `Backspace` on a focused removable chip triggers removal (mirrors convention from tag inputs).
- Colour alone must not convey selected state — rely on a filled background + icon or checkmark.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use for filters, tags, and multi-select values | Use as navigation tabs or links |
| Distinguish selected vs. unselected with background fill | Use only a border change to show selection |
| Label the close button `aria-label="Remove [label]"` | Use an unlabelled `×` icon as the remove action |
| Allow horizontal scrolling in chip filters | Wrap filter chips into multiple rows |
| Keep chip labels short (1–3 words) | Write full sentences on chips |

---

## Example HTML Usage

```html
<!-- Filter chip group -->
<div role="group" aria-label="Filter by category" class="chip-group">
  <button
    type="button"
    class="chip chip--primary chip--large chip--rounded"
    role="checkbox"
    aria-checked="true"
  >
    Design
  </button>
  <button
    type="button"
    class="chip chip--neutral chip--large chip--rounded"
    role="checkbox"
    aria-checked="false"
  >
    Development
  </button>
  <button
    type="button"
    class="chip chip--neutral chip--large chip--rounded"
    role="checkbox"
    aria-checked="false"
  >
    Marketing
  </button>
</div>

<!-- Tag list (non-interactive) -->
<ul class="chip-list" role="list" aria-label="Project tags">
  <li class="chip chip--neutral chip--medium chip--rounded" role="listitem">UI/UX</li>
  <li class="chip chip--neutral chip--medium chip--rounded" role="listitem">Mobile</li>
</ul>

<!-- Removable chip (in a tag input) -->
<div class="chip-input" role="group" aria-label="Selected team members">
  <div class="chip chip--primary chip--medium chip--rounded chip--removable">
    <span class="chip__label">Ahmed Al-Rashidi</span>
    <button
      type="button"
      class="chip__close"
      aria-label="Remove Ahmed Al-Rashidi"
    >
      <svg aria-hidden="true" focusable="false"><!-- X icon --></svg>
    </button>
  </div>
  <div class="chip chip--primary chip--medium chip--rounded chip--removable">
    <span class="chip__label">Sara Khalid</span>
    <button
      type="button"
      class="chip__close"
      aria-label="Remove Sara Khalid"
    >
      <svg aria-hidden="true" focusable="false"><!-- X icon --></svg>
    </button>
  </div>
</div>

<!-- Chip with lead icon -->
<button
  type="button"
  class="chip chip--neutral chip--large chip--rounded"
  role="checkbox"
  aria-checked="false"
>
  <svg class="chip__icon" aria-hidden="true" focusable="false"><!-- calendar icon --></svg>
  This week
</button>
```
