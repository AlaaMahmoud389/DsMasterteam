# Input (Text Field)

## Purpose
Accepts free-form text entry from the user. Used for names, emails, descriptions, and any single-line or multi-line textual data.

---

## Variants (Style)

| Style | Description |
|---|---|
| `Default` | Outlined field with transparent background. General-purpose. |
| `Filled lighter` | Subtle filled background with no visible border at rest. Use on white surfaces. |
| `Filled darker` | Stronger filled background. Use on light-grey surfaces to create contrast. |

---

## Sizes

| Size | Height | Use case |
|---|---|---|
| `Large` | 48 px | Prominent forms, landing pages, auth flows |
| `Medium` | 40 px | General forms, modals, sidebars |

---

## States

| State | Description |
|---|---|
| `Default` | Resting — label and placeholder visible |
| `Hovered` | Border darkens |
| `Pressed` | Transitional — cursor active |
| `Focused` | Active typing — border highlights with primary colour |
| `Filled` | Has a value entered |
| `Read-only` | Displays value; cannot be edited |
| `Disabled` | Non-interactive; reduced opacity |
| `Error` | Validation failed — red border + error helper text |

---

## Tokens Used

| Property | Token |
|---|---|
| Border (default) | `semantic/action/neutral-subtle/border/default` |
| Border (focused) | `component/button/primary/border/focused` |
| Border (error) | `semantic/background/error` |
| Background (default) | `semantic/background/Surface/Primary` |
| Background (filled lighter) | `semantic/background/neutral-50` |
| Background (filled darker) | `semantic/background/neutral-100` |
| Background (disabled) | `semantic/background/neutral-100` |
| Label text | `semantic/action/neutral-subtle/text/default` |
| Placeholder text | `semantic/background/neutral-400` |
| Helper text | `semantic/background/neutral-400` |
| Error text | `semantic/background/error` |
| Spacing (inner padding) | `semantic/spacing/sm` / `semantic/spacing/md` |

---

## Usage Rules

- **Always provide a label.** `Show label=False` is only acceptable when the field is embedded in a table or toolbar where the column header or icon serves as the label. Always maintain `aria-label` in those cases.
- **Placeholder text is not a label substitute.** It disappears on input, which harms usability for users who scan or return to check values.
- **Helper text** should explain format or constraints proactively (e.g., "Must be 8–20 characters"). Do not save it only for errors.
- **Error messages** must describe the problem and how to fix it. Avoid generic messages like "Invalid input".
- Use `prefix` and `suffix` slots for units (e.g., "kg", "$") or icons that clarify expected format.
- Do not use an Input for selecting from a finite list — use Dropdown Input instead.

---

## Accessibility Notes

- Every input must have a `<label>` associated via `for` / `id` or via `aria-label` / `aria-labelledby`.
- Pair helper and error text using `aria-describedby` pointing to the helper/error element's `id`.
- Use `aria-invalid="true"` on the input when in the error state.
- `autocomplete` attributes improve usability for common fields (name, email, tel, etc.). Apply the appropriate token.
- Do not rely on placeholder colour alone to communicate constraints — it often fails contrast requirements (WCAG 1.4.3).
- Read-only fields use `readonly` attribute (focusable); disabled fields use `disabled` (not focusable).

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use a visible label above every field | Use placeholder as the only label |
| Show helper text to pre-explain format | Show helper text only after an error |
| Write specific error messages | Show "Invalid" or "Error" with no guidance |
| Use `readonly` for reference values user may want to copy | Use `disabled` when the value is still useful to the user |
| Set appropriate `type` (email, tel, url) | Default every field to `type="text"` |

---

## Example HTML Usage

```html
<!-- Default large input with label and helper text -->
<div class="input-field input-field--large">
  <label for="full-name" class="input-field__label">Full name</label>
  <input
    type="text"
    id="full-name"
    name="full-name"
    class="input-field__control"
    placeholder="e.g. Ahmed Al-Rashidi"
    autocomplete="name"
    aria-describedby="full-name-helper"
  />
  <p id="full-name-helper" class="input-field__helper">
    Enter your name as it appears on your ID.
  </p>
</div>

<!-- Error state -->
<div class="input-field input-field--medium input-field--error">
  <label for="email" class="input-field__label">Email address</label>
  <input
    type="email"
    id="email"
    name="email"
    class="input-field__control"
    value="not-an-email"
    aria-describedby="email-error"
    aria-invalid="true"
    autocomplete="email"
  />
  <p id="email-error" class="input-field__error" role="alert">
    Please enter a valid email address (e.g. user@example.com).
  </p>
</div>

<!-- With prefix and suffix -->
<div class="input-field input-field--large">
  <label for="amount" class="input-field__label">Amount</label>
  <div class="input-field__wrapper">
    <span class="input-field__prefix" aria-hidden="true">$</span>
    <input
      type="number"
      id="amount"
      name="amount"
      class="input-field__control"
      placeholder="0.00"
    />
    <span class="input-field__suffix" aria-hidden="true">USD</span>
  </div>
</div>

<!-- Read-only -->
<div class="input-field input-field--medium">
  <label for="ref-code" class="input-field__label">Reference code</label>
  <input
    type="text"
    id="ref-code"
    name="ref-code"
    class="input-field__control"
    value="REF-20260515-001"
    readonly
    aria-describedby="ref-code-helper"
  />
  <p id="ref-code-helper" class="input-field__helper">
    Use this code when contacting support.
  </p>
</div>
```
