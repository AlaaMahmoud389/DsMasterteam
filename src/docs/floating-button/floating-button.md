# Floating Button (FAB)

## Purpose
A prominent circular or pill-shaped button that floats above the page content. Used for the single most important action available on the screen — creating a new item, opening a compose window, or initiating a primary workflow.

---

## Variants

The Floating Button (FAB) is defined by a single `Floating Button` component set. Internally it supports:

| Layout | Description |
|---|---|
| Icon only | Circular — default FAB. Shows only an icon. |
| Icon + label | Extended FAB (pill-shaped) — shows icon and text label. |

---

## States

| State | Description |
|---|---|
| `Default` | Resting |
| `Hovered` | Elevation increases; slight background shift |
| `Pressed` | Scale or colour press feedback |
| `Focused` | Visible focus ring |
| `Disabled` | Non-interactive; opacity reduced |

---

## Tokens Used

| Property | Token |
|---|---|
| Background (default) | `semantic/background/primary-700` |
| Background (hovered) | `semantic/background/primary-800` |
| Background (pressed) | `semantic/background/primary-900` |
| Icon / text colour | `primitive/color/base/white` |
| Shadow (default) | Effect style: `shadow/lg` |
| Shadow (hovered) | Effect style: `shadow/xl` |
| Focus ring | `component/button/primary/border/focused` |
| Border radius (icon-only) | `50%` (full circle) |
| Border radius (extended) | `semantic/spacing/4xl` |
| Size (icon-only) | 56 × 56 px |
| Size (extended) | 48 px height, width: content |

---

## Usage Rules

- **Use one FAB per screen.** A FAB represents a single, primary action — not a group of actions.
- **Position in the bottom-right corner** (bottom-center on mobile). Keep consistent across all screens that use a FAB.
- **Use an icon + label (extended FAB)** on screens where users may not immediately recognise the icon alone.
- **Do not use a FAB for destructive actions** (delete, remove). FABs are for positive, constructive actions.
- **The FAB must always be reachable.** Ensure it is not obscured by a bottom navigation bar, keyboard, or toast.
- **Use sparingly** — one per application feature, not one per page. If every page has a FAB for a different action, reconsider the information architecture.
- FABs can optionally transform to a speed-dial (mini menu) on press, revealing 2–5 secondary actions. Each speed-dial item must also have a label.

---

## Accessibility Notes

- The FAB is a `<button type="button">` with `aria-label="[Action]"` when icon-only.
- Extended FABs have visible label text — `aria-label` is not required if the text is descriptive.
- Focus ring must be clearly visible at minimum 3:1 contrast against the button background (WCAG 2.4.11).
- The FAB must be reachable by keyboard (Tab order). Its position in the DOM should reflect a logical tab order — typically after the main content.
- For speed-dial FABs: `aria-haspopup="true"` and `aria-expanded` on the main FAB; each sub-action button has its own `aria-label`.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use one FAB per screen for the primary action | Place multiple FABs on the same screen |
| Provide `aria-label` for icon-only FABs | Use a FAB with an ambiguous icon and no label |
| Use for constructive, positive actions | Use for delete, archive, or destructive actions |
| Ensure FAB is not obscured by other UI elements | Place FAB behind a sticky bottom nav or toast region |
| Use extended (label + icon) in unfamiliar contexts | Assume all users recognise icon-only FABs |

---

## Example HTML Usage

```html
<!-- Icon-only FAB -->
<button
  type="button"
  class="fab fab--icon-only"
  aria-label="Create new project"
>
  <svg class="fab__icon" aria-hidden="true" focusable="false"><!-- plus icon --></svg>
</button>

<!-- Extended FAB (icon + label) -->
<button
  type="button"
  class="fab fab--extended"
  aria-label="Compose new message"
>
  <svg class="fab__icon" aria-hidden="true" focusable="false"><!-- edit icon --></svg>
  <span class="fab__label">Compose</span>
</button>

<!-- Speed-dial FAB -->
<div class="fab-speed-dial">
  <button
    type="button"
    class="fab fab--icon-only fab--speed-dial-trigger"
    aria-label="Create new item"
    aria-haspopup="true"
    aria-expanded="false"
    aria-controls="speed-dial-menu"
  >
    <svg class="fab__icon fab__icon--open" aria-hidden="true" focusable="false"><!-- plus icon --></svg>
    <svg class="fab__icon fab__icon--close" aria-hidden="true" focusable="false" hidden><!-- X icon --></svg>
  </button>

  <div id="speed-dial-menu" class="fab-speed-dial__menu" hidden>
    <button
      type="button"
      class="fab fab--mini"
      aria-label="Upload document"
    >
      <svg aria-hidden="true" focusable="false"><!-- upload icon --></svg>
      <span class="fab__tooltip">Upload document</span>
    </button>
    <button
      type="button"
      class="fab fab--mini"
      aria-label="Add photo"
    >
      <svg aria-hidden="true" focusable="false"><!-- photo icon --></svg>
      <span class="fab__tooltip">Add photo</span>
    </button>
  </div>
</div>

<style>
  .fab {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 100;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--semantic-background-primary-700);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-lg);
  }
  .fab--extended {
    width: auto;
    border-radius: 28px;
    padding: 0 20px;
    gap: 8px;
  }
  .fab:hover { background: var(--semantic-background-primary-800); box-shadow: var(--shadow-xl); }
  .fab:focus-visible { outline: 3px solid var(--component-button-primary-border-focused); outline-offset: 2px; }
</style>
```
