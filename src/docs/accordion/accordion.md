# Accordion

## Purpose
A vertically stacked set of interactive headings that expand to reveal — and collapse to hide — their associated content. Used for FAQs, settings panels, navigation menus, and any content that benefits from progressive disclosure.

---

## Variants

| Component | Description |
|---|---|
| `Accordion` | Single accordion item (header + body) |
| `Accordion list` | Pre-composed list of multiple accordion items |

---

## Sizes

| Size | Header height | Use case |
|---|---|---|
| `Large` | 56 px | Feature sections, prominent FAQ |
| `Medium` | 48 px | Settings panels, general content |
| `Small` | 40 px | Dense lists, sidebars |

---

## Configuration

| Property | Options | Description |
|---|---|---|
| `Icon alignment` | `Leading` / `Trailing` | Chevron/expand icon position |
| `Flush` | `True` / `False` | Removes borders and card-like styling for edge-to-edge layouts |
| `RTL` | `True` / `False` | Arabic / right-to-left layout |
| `Expanded` | `True` / `False` | Open vs. closed state |

---

## States

| State | Description |
|---|---|
| `Default` | Collapsed — only header visible |
| `Hovered` | Background shift on header |
| `Pressed` | Active click/tap on header |
| `Focused` | Keyboard focus ring on header |
| `Disabled` | Non-expandable; reduced opacity |
| `Expanded` | Content panel is open |

---

## Tokens Used

| Property | Token |
|---|---|
| Header background (default) | `semantic/background/Surface/Primary` |
| Header background (hovered) | `semantic/action/neutral-subtle/background/hover` |
| Header background (pressed) | `semantic/action/neutral-subtle/background/pressed` |
| Header text | `semantic/action/neutral-subtle/text/default` |
| Chevron icon | `semantic/action/neutral-subtle/icon/default` |
| Body background | `semantic/background/Surface/Primary` |
| Body text | `semantic/action/neutral-subtle/text/default` |
| Border | `semantic/action/neutral-subtle/border/default` |
| Focus ring | `component/button/primary/border/focused` |
| Padding (header) | `semantic/spacing/lg` |
| Padding (body) | `semantic/spacing/lg` |

---

## Usage Rules

- **One accordion at a time (exclusive) vs. independent.** Decide at the product level. The component supports both — control it via the `Accordion list` wrapper and JavaScript logic.
- **`Flush=True`** removes borders and padding, suitable for edge-to-edge container usage (e.g., inside a card body or full-width section).
- **`Trailing` icon alignment** is the default and most familiar convention. Use `Leading` only when the layout requires it (e.g., tree views, settings with leading icons).
- **Do not use an accordion to hide important information** that users need to complete a task — put critical fields outside the accordion.
- **Keep headers short and self-explanatory.** Users should know what they'll find before expanding.
- If all items in an accordion are almost always expanded, consider showing the content flat instead.

---

## Accessibility Notes

- The header trigger is a `<button>` inside the heading element. Use the correct heading level in context (`<h2>`, `<h3>`, etc.).
- The header button has `aria-expanded="true/false"` and `aria-controls="[panel-id]"`.
- The content panel has `id` matching `aria-controls`, and `hidden` (or `display:none`) when collapsed so it is removed from the accessibility tree.
- Do not use `visibility:hidden` for collapsed panels — screen readers may still announce the content.
- Keyboard: `Enter` / `Space` toggles the panel. Arrow keys are optional for accordion navigation.
- The accordion wrapper has no required ARIA role — the semantic structure of `<button>` and heading is sufficient.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use correct heading level for the accordion header | Wrap headers in `<div>` without heading semantics |
| Set `aria-expanded` dynamically on the trigger | Forget to update `aria-expanded` on toggle |
| Fully remove collapsed content from the accessibility tree | Use `opacity:0` or `height:0` alone |
| Allow independent expand/collapse when multiple sections may be relevant | Force a single-open-only pattern for FAQ use cases |
| Use `Flush=True` inside cards or sections | Apply the bordered variant inside already-bordered containers |

---

## Example HTML Usage

```html
<!-- Single accordion item -->
<div class="accordion accordion--large">
  <h3 class="accordion__heading">
    <button
      type="button"
      class="accordion__trigger"
      aria-expanded="false"
      aria-controls="faq-1-panel"
      id="faq-1-trigger"
    >
      <span class="accordion__title">How do I reset my password?</span>
      <svg class="accordion__chevron" aria-hidden="true" focusable="false"><!-- chevron --></svg>
    </button>
  </h3>
  <div
    id="faq-1-panel"
    class="accordion__panel"
    role="region"
    aria-labelledby="faq-1-trigger"
    hidden
  >
    <div class="accordion__body">
      <p>Go to the Sign In page and click "Forgot password". Enter your email and we'll send a reset link.</p>
    </div>
  </div>
</div>

<!-- Accordion list (multiple items) -->
<div class="accordion-list" role="list">
  <div class="accordion accordion--medium" role="listitem">
    <h3 class="accordion__heading">
      <button
        type="button"
        class="accordion__trigger"
        aria-expanded="true"
        aria-controls="faq-2-panel"
        id="faq-2-trigger"
      >
        <span class="accordion__title">What payment methods are accepted?</span>
        <svg class="accordion__chevron" aria-hidden="true" focusable="false"><!-- chevron --></svg>
      </button>
    </h3>
    <div
      id="faq-2-panel"
      class="accordion__panel"
      role="region"
      aria-labelledby="faq-2-trigger"
    >
      <div class="accordion__body">
        <p>We accept Visa, Mastercard, and bank transfers. PayPal is not currently supported.</p>
      </div>
    </div>
  </div>
</div>

<script>
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
    });
  });
</script>
```
