# Checkbox

## Purpose
Allows users to select one or more options from a list, or to toggle a single boolean setting on or off. Each checkbox acts independently; selecting one does not affect others.

---

## Variants

| Style | Description |
|---|---|
| `Primary` | Brand-coloured fill when checked. Default for most forms. |
| `Neutral` | Neutral-coloured fill. Use on coloured backgrounds or where the brand colour would conflict. |

The `Checkbox Label` compound component wraps the bare checkbox with a label, optional helper text, and an optional alert/error message.

---

## Sizes

| Size | Checkbox dimensions | Use case |
|---|---|---|
| `Medium` | 20 × 20 px | Default — general forms |
| `Small` | 16 × 16 px | Dense lists, tables, toolbars |
| `x Small` | 12 × 12 px | Very tight layouts; use sparingly |

---

## States

| State | Description |
|---|---|
| `Default` | Unchecked, resting |
| `Checked` | Selected — check mark visible |
| `Indeterminate` | Partial selection in a parent–child group |
| `Hovered` | Cursor over the control |
| `Pressed` | Active click/tap |
| `Focused` | Keyboard focus — visible focus ring |
| `Read-only` | Value visible but cannot be changed |
| `Disabled` | Non-interactive; inherits checked/unchecked state |

---

## Tokens Used

| Property | Token |
|---|---|
| Background (checked) | `semantic/background/primary-700` |
| Background (unchecked border) | `semantic/action/neutral-subtle/border/default` |
| Background (hovered) | `semantic/action/neutral-subtle/background/hover` |
| Focus ring | `component/button/primary/border/focused` |
| Label text | `semantic/action/neutral-subtle/text/default` |
| Disabled background | `semantic/background/neutral-100` |
| Helper text | `semantic/background/neutral-400` |

---

## Usage Rules

- **Use checkboxes for multi-select.** If only one option can be active at a time, use Radio buttons.
- **Always pair a visible label** with the checkbox. Standalone checkboxes without labels require `aria-label` or `aria-labelledby`.
- **Indeterminate state** is programmatic only — do not design it as an initial user-facing state. Use it only when a parent checkbox partially reflects the state of child checkboxes.
- **Group related checkboxes** inside a `<fieldset>` with a `<legend>` that describes the group.
- **Avoid pre-selecting checkboxes** for privacy-sensitive options (marketing consent, data sharing).
- Position helper text below the label, not beside the checkbox control.

---

## Accessibility Notes

- Use `<input type="checkbox">`. For custom implementations, apply `role="checkbox"` with `aria-checked="true"`, `aria-checked="false"`, or `aria-checked="mixed"` for indeterminate.
- The clickable / tappable hit area must be at least 44 × 44 px regardless of the visual checkbox size.
- Keyboard: `Space` toggles the checkbox. Do not override this behaviour.
- Disabled checkboxes should have `disabled` attribute. Do not remove them from the DOM — keep them visible so users understand the form structure.
- Error messages linked to checkboxes must be associated via `aria-describedby`.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use for multi-select or boolean toggles | Use for single-select lists (use Radio instead) |
| Provide a clear, concise label for every checkbox | Rely on position alone to communicate meaning |
| Use `Indeterminate` only for parent–child select-all patterns | Show indeterminate as an initial form state |
| Group checkboxes in a `<fieldset>` with `<legend>` | Float checkboxes without a group label |
| Show inline error messages via the alert slot | Block form submission silently without feedback |

---

## Example HTML Usage

```html
<!-- Single checkbox with label -->
<div class="checkbox-label">
  <input
    type="checkbox"
    id="terms"
    name="terms"
    class="checkbox checkbox--medium checkbox--primary"
    aria-describedby="terms-helper"
  />
  <label for="terms">I agree to the terms and conditions</label>
  <p id="terms-helper" class="checkbox__helper-text">
    Read the full terms before agreeing.
  </p>
</div>

<!-- Checked state -->
<input type="checkbox" id="newsletter" name="newsletter" checked />
<label for="newsletter">Subscribe to newsletter</label>

<!-- Indeterminate (set via JavaScript) -->
<input type="checkbox" id="select-all" name="select-all" />
<label for="select-all">Select all</label>
<script>
  document.getElementById('select-all').indeterminate = true;
</script>

<!-- Disabled -->
<input type="checkbox" id="archived" name="archived" disabled />
<label for="archived">Archived (read-only)</label>

<!-- Grouped checkboxes -->
<fieldset>
  <legend>Notification preferences</legend>
  <div class="checkbox-label">
    <input type="checkbox" id="email" name="notifications" value="email" />
    <label for="email">Email</label>
  </div>
  <div class="checkbox-label">
    <input type="checkbox" id="sms" name="notifications" value="sms" />
    <label for="sms">SMS</label>
  </div>
</fieldset>
```
