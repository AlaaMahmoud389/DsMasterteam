# Loading (Spinner)

## Purpose
Communicates that the system is processing a request or loading content. Used when the duration is unknown or brief enough that a full progress bar is unnecessary.

---

## Variants (Style)

| Style | Description |
|---|---|
| `Primary` | Brand-coloured spinner. Use on white/light backgrounds. |
| `Neutral` | Grey spinner. Use in contexts where Primary colour would be overly prominent. |
| `On-Color` | White spinner. Use on dark/brand-coloured backgrounds. |

### Indicator Animation Frames
The spinner has 4 animation keyframes (`Indicator = 1/2/3/4`) representing the rotation sequence. These are internal animation states — do not expose as user-facing variants.

---

## Sizes

| Size | Diameter | Use case |
|---|---|---|
| `xx Small` | 12 px | Inline with text, button loading state |
| `x Small` | 16 px | Icon-sized contexts |
| `Small` | 20 px | Compact cards, table cells |
| `Medium` | 24 px | Default — general purpose |
| `Large` | 32 px | Section-level loading |
| `x Large` | 40 px | Page section loading |
| `xx Large` | 48 px | Full-page loading overlays |

---

## Tokens Used

| Property | Token |
|---|---|
| Spinner fill (Primary) | `semantic/background/primary-700` |
| Spinner fill (Neutral) | `semantic/background/neutral-500` |
| Spinner fill (On-Color) | `primitive/color/base/white` |
| Track (background arc) | `semantic/background/neutral-100` |

---

## Usage Rules

- **Show a spinner only when the wait is < 10 seconds.** For longer operations, use a Progress Bar with a percentage.
- **Replace the entire content area** with a spinner + optional label (e.g., "Loading projects…"). Do not show a spinner overlaid on partially loaded content that shifts when it finishes.
- **Button loading state:** Replace the button label with a spinner (`xx Small`) and disable the button. Keep the button at its original size so the layout does not shift.
- **Use `On-Color`** on dark backgrounds (hero sections, coloured banners). Never use `Primary` on a dark surface.
- **Do not show spinners for instantaneous operations** (< 100 ms). Flashing a spinner for a network round-trip that completes in 200 ms is more disruptive than no indicator at all.
- Pair with a text label whenever the loading context is not obvious.

---

## Accessibility Notes

- The spinner container should have `role="status"` and `aria-label="Loading"` (or more specific: `"Loading projects"`).
- For inline spinners that replace content, use `aria-live="polite"` on the parent region.
- When the spinner is replaced by loaded content, the live region update announces the change.
- The spinning animation itself must be `aria-hidden="true"`.
- Respect `prefers-reduced-motion`: pause or stop rotation animation when the OS motion preference is "reduce".

```css
@media (prefers-reduced-motion: reduce) {
  .spinner { animation: none; opacity: 0.7; }
}
```

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Pair spinner with a loading message for context | Show a spinner with no label in an ambiguous location |
| Disable the triggering button while loading | Leave the button active during a loading operation |
| Use `On-Color` on dark backgrounds | Use `Primary` spinner on dark/coloured backgrounds |
| Respect `prefers-reduced-motion` | Animate spinner without considering motion sensitivity |
| Show spinner for unknown-duration tasks | Show spinner for operations that take > 10 s — use Progress Bar |

---

## Example HTML Usage

```html
<!-- Standalone page-section loading -->
<div
  class="loading loading--large loading--primary"
  role="status"
  aria-label="Loading dashboard"
>
  <svg class="loading__spinner" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
    <circle
      class="loading__track"
      cx="12" cy="12" r="10"
      fill="none"
      stroke-width="2"
    />
    <path
      class="loading__arc"
      d="M12 2 A10 10 0 0 1 22 12"
      fill="none"
      stroke-width="2"
    />
  </svg>
  <span class="sr-only">Loading dashboard…</span>
</div>

<!-- Button loading state -->
<button
  type="button"
  class="btn btn--primary btn--medium"
  disabled
  aria-disabled="true"
  aria-label="Saving (loading)"
>
  <span
    class="loading loading--xx-small loading--on-color"
    role="status"
    aria-hidden="true"
  >
    <svg class="loading__spinner" viewBox="0 0 12 12"><!-- spinner arc --></svg>
  </span>
  <span class="btn__text">Saving…</span>
</button>

<!-- Inline loading for a data table -->
<div class="data-table" aria-live="polite" aria-busy="true">
  <div class="data-table__loading" role="status" aria-label="Loading results">
    <span class="loading loading--medium loading--neutral" aria-hidden="true">
      <svg class="loading__spinner" viewBox="0 0 24 24"><!-- spinner --></svg>
    </span>
    <p class="loading__message">Loading results…</p>
  </div>
</div>

<style>
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading__spinner { animation: spin 0.8s linear infinite; }
  @media (prefers-reduced-motion: reduce) {
    .loading__spinner { animation: none; opacity: 0.6; }
  }
</style>
```
