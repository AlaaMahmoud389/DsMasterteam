# Inline Alert

## Purpose
A contextual message displayed within a page section or form area to communicate status, guidance, or feedback without interrupting the user with a modal or overlay. Unlike banners, inline alerts are embedded in content flow.

---

## Variants (Type)

| Type | Description |
|---|---|
| `Neutral` | General information, no urgency |
| `Info` | Informational message — blue palette |
| `Warning` | Caution / advisory — amber palette |
| `Success` | Confirmation of a positive outcome — green palette |
| `Destructive` | Error or destructive warning — red palette |

---

## Layout Options

| Property | Options | Description |
|---|---|---|
| `RTL` | `True` / `False` | Arabic/RTL layout |
| `Mobile` | `True` / `False` | Stacks actions vertically on mobile |
| `Background Color` | `White` / `Color` | White background or tinted status background |
| `Actions` | `True` / `False` | Displays action buttons |
| `Secondary Action` | `True` / `False` | Displays a secondary text button |
| `Helper Text` | `True` / `False` | Shows a body / description line |
| `Close Button` | `True` / `False` | Shows dismiss ✕ button |

---

## Tokens Used

| Style | Background (Color variant) | Icon / border accent |
|---|---|---|
| Neutral | `semantic/background/State/Neutral/nuetral-subtle` | `semantic/action/neutral-subtle/icon/default` |
| Info | `semantic/background/State/Info/info-subtle` | `semantic/background/State/Info/info-strong` |
| Warning | `semantic/background/State/Warning/warning-subtle` | `semantic/background/State/Warning/warning-strong` |
| Success | `semantic/background/State/Success/success-subtle` | `semantic/background/State/Success/success-strong` |
| Destructive | `semantic/background/State/Danger/danger-subtle` | `semantic/background/State/Danger/danger-strong` |

| Property | Token |
|---|---|
| Title text | `semantic/action/neutral-subtle/text/default` |
| Body text | `semantic/action/neutral-subtle/text/default` |
| White background | `semantic/background/Surface/Primary` |
| Border (left accent) | Style-matched `strong` token |
| Border radius | `semantic/spacing/xs` |
| Padding | `semantic/spacing/md` |

---

## Usage Rules

- **Place inline alerts immediately adjacent to the content they relate to.** A form-level error alert sits above the submit button; a field-level issue uses the field's own error state.
- **Use `Background Color=Color`** when the alert must stand out on a white page. Use `White` when the alert appears on a tinted surface.
- **Do not use Inline Alert for form field errors** — use the field component's built-in error state instead. Inline Alert is for section-level or group-level messages.
- **`Destructive` type** should include a clear action path — what the user should do next.
- Keep `Lead Text` (title) to 1 short sentence. Use `Helper Text` for additional explanation.
- **Persistent alerts** (`Close Button=False`) communicate a state that remains until the underlying condition is resolved. **Dismissible alerts** are for transient feedback.

---

## Accessibility Notes

- Use `role="alert"` for `Destructive` and `Warning` (immediately announced).
- Use `role="status"` for `Success` and `Info` (polite announcement).
- For `Neutral`, a plain `<div>` with `aria-label` or a `<section>` is sufficient.
- Do not rely on colour alone — the status icon and `Lead Text` must convey the type.
- Action buttons inside the alert should be standard `<button>` elements — do not make the entire alert clickable.
- When dynamically injected, ensure the element is placed in a live region or use `aria-live` on the container.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Position the alert near the affected content | Show a generic page-top alert for a section-specific issue |
| Use `role="alert"` for destructive/error types | Ignore live region semantics and expect screen readers to announce |
| Include a next-step action for destructive messages | Leave users without a recovery path on error |
| Use the `Color` background variant for high visibility | Use `White` background when the alert needs to stand out |
| Keep the lead text brief | Write a paragraph as the title |

---

## Example HTML Usage

```html
<!-- Info inline alert (no actions) -->
<div
  class="inline-alert inline-alert--info inline-alert--color"
  role="status"
>
  <svg class="inline-alert__icon" aria-hidden="true" focusable="false"><!-- info icon --></svg>
  <div class="inline-alert__content">
    <p class="inline-alert__title">Your session will expire in 5 minutes</p>
    <p class="inline-alert__helper">
      Save your work to avoid losing unsaved changes.
    </p>
  </div>
</div>

<!-- Destructive inline alert with actions -->
<div
  class="inline-alert inline-alert--destructive inline-alert--color"
  role="alert"
>
  <svg class="inline-alert__icon" aria-hidden="true" focusable="false"><!-- error icon --></svg>
  <div class="inline-alert__content">
    <p class="inline-alert__title">Payment failed</p>
    <p class="inline-alert__helper">
      Your card was declined. Please check your card details and try again.
    </p>
    <div class="inline-alert__actions">
      <button type="button" class="btn btn--primary btn--small">
        Update payment
      </button>
      <button type="button" class="btn btn--transparent btn--small">
        Contact support
      </button>
    </div>
  </div>
  <button
    type="button"
    class="inline-alert__close btn-close btn-close--small"
    aria-label="Dismiss alert"
  >
    <svg aria-hidden="true" focusable="false"><!-- X --></svg>
  </button>
</div>

<!-- Success alert (white background) -->
<div
  class="inline-alert inline-alert--success inline-alert--white"
  role="status"
>
  <svg class="inline-alert__icon" aria-hidden="true" focusable="false"><!-- check icon --></svg>
  <div class="inline-alert__content">
    <p class="inline-alert__title">Profile updated successfully</p>
  </div>
  <button
    type="button"
    class="inline-alert__close btn-close btn-close--small"
    aria-label="Dismiss"
  >
    <svg aria-hidden="true" focusable="false"><!-- X --></svg>
  </button>
</div>

<!-- RTL -->
<div
  class="inline-alert inline-alert--warning inline-alert--color"
  role="alert"
  dir="rtl"
  lang="ar"
>
  <svg class="inline-alert__icon" aria-hidden="true" focusable="false"><!-- warning icon --></svg>
  <div class="inline-alert__content">
    <p class="inline-alert__title">عنوان رسالة الاشعار أو التنبيه</p>
    <p class="inline-alert__helper">
      يكتب المحتوى الإضافي هنا في حال ان رسالة الاشعار تحتاج الى شرح.
    </p>
  </div>
</div>
```
