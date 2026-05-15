# Radio

## Purpose
Allows users to select exactly one option from a set of mutually exclusive choices. Selecting one radio button automatically deselects any previously selected sibling.

---

## Variants

| Style | Description |
|---|---|
| `Primary` | Brand-coloured fill when selected. Default for most forms. |
| `Neutral` | Neutral-coloured fill. Use on coloured backgrounds or where the brand colour would conflict. |

`Radio Label` is the compound component that wraps the control with a label, optional helper text, and optional alert/error message.

---

## Sizes

Radio buttons render at a single default size (20 × 20 px). The touch target is expanded to at least 44 × 44 px via the label hit area.

---

## States

| State | Description |
|---|---|
| `Default` | Unselected, resting |
| `Selected` | Active choice — inner dot visible |
| `Hovered` | Cursor over the control |
| `Pressed` | Active click/tap |
| `Focused` | Keyboard focus — visible focus ring |
| `Read-only` | Value visible but cannot be changed |
| `Disabled` | Non-interactive; inherits selected/unselected state |

---

## Tokens Used

| Property | Token |
|---|---|
| Ring (unselected border) | `semantic/action/neutral-subtle/border/default` |
| Fill (selected) | `semantic/background/primary-700` |
| Background (hovered) | `semantic/action/neutral-subtle/background/hover` |
| Focus ring | `component/button/primary/border/focused` |
| Label text | `semantic/action/neutral-subtle/text/default` |
| Helper text | `semantic/background/neutral-400` |
| Disabled opacity | `semantic/background/neutral-100` |

---

## Usage Rules

- **Use radio buttons for mutually exclusive single-select** from 2–7 options. For more than 7 options, use a Dropdown Input instead.
- **Always group radios with a shared `name` attribute** so the browser enforces mutual exclusivity.
- **Always display all options simultaneously.** Do not hide or reveal radio options dynamically based on other inputs — use conditional sections instead.
- **Pre-select a default** when one option is most common, as long as the choice is reversible. Do not pre-select for binary yes/no questions where the absence of a selection is meaningful.
- **Never use a single radio button** — use a Checkbox for a binary toggle instead.
- Wrap all radios in a `<fieldset>` with a `<legend>` that describes the group.

---

## Accessibility Notes

- Use `<input type="radio">`. For custom implementations, use `role="radio"` with `aria-checked` and group using `role="radiogroup"` with `aria-labelledby`.
- Keyboard navigation within a group uses **arrow keys**, not Tab. Tab moves focus to the first (or currently selected) button in the group; arrow keys move between options.
- Disabled radios retain their `disabled` attribute but must not be removed from the DOM.
- Error messages must be linked to the group via `aria-describedby` on the `<fieldset>` or via `aria-errormessage`.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use for exactly one choice from a fixed list | Use when multiple selections are allowed (use Checkbox) |
| Group with `<fieldset>` and `<legend>` | Render radios as orphaned controls without a group label |
| Provide 2–7 options; use Dropdown for more | Show more than 7 inline radio options |
| Pre-select the most common default | Pre-select for sensitive choices (consent, preferences) |
| Use `Read-only` to display a saved answer | Use `Disabled` when the user needs to see why they can't change the value |

---

## Example HTML Usage

```html
<!-- Radio group -->
<fieldset>
  <legend>Preferred contact method</legend>

  <div class="radio-label">
    <input
      type="radio"
      id="contact-email"
      name="contact"
      value="email"
      class="radio radio--primary"
      checked
      aria-describedby="contact-helper"
    />
    <label for="contact-email">Email</label>
  </div>

  <div class="radio-label">
    <input
      type="radio"
      id="contact-phone"
      name="contact"
      value="phone"
      class="radio radio--primary"
    />
    <label for="contact-phone">Phone</label>
  </div>

  <div class="radio-label">
    <input
      type="radio"
      id="contact-sms"
      name="contact"
      value="sms"
      class="radio radio--primary"
      disabled
    />
    <label for="contact-sms">SMS (unavailable in your region)</label>
  </div>

  <p id="contact-helper" class="radio__helper-text">
    We will only contact you using the selected method.
  </p>
</fieldset>

<!-- With error message -->
<fieldset aria-describedby="plan-error">
  <legend>Select a plan</legend>
  <!-- ...radio inputs... -->
  <p id="plan-error" class="radio__alert" role="alert">
    Please select a plan to continue.
  </p>
</fieldset>
```
