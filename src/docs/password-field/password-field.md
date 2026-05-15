# Password Field

## Purpose
A specialised text input for entering passwords and other sensitive credentials. Masks the value by default and provides a visibility toggle to reveal the input.

---

## Variants (Style)

| Style | Description |
|---|---|
| `Default` | Outlined field. General use. |
| `Filled lighter` | Subtle fill on white surfaces. |
| `Filled darker` | Stronger fill on light-grey surfaces. |

---

## Sizes

| Size | Height | Use case |
|---|---|---|
| `Large` | 48 px | Login pages, prominent auth flows |
| `Medium` | 40 px | Settings pages, embedded forms |

---

## States

| State | Description |
|---|---|
| `Default` | Resting — placeholder visible |
| `Filled` | Password entered — masked with `••••••••` |
| `Hovered` | Border darkens |
| `Pressed` | Active click/tap |
| `Focused` | Keyboard focus — border highlights |
| `Read-only` | Value visible (masked), cannot be edited |
| `Disabled` | Non-interactive |
| `Error` | Validation failed — red border + error text |

---

## Tokens Used

| Property | Token |
|---|---|
| Border (default) | `semantic/action/neutral-subtle/border/default` |
| Border (focused) | `component/button/primary/border/focused` |
| Border (error) | `semantic/background/error` |
| Background | `semantic/background/Surface/Primary` |
| Background (disabled) | `semantic/background/neutral-100` |
| Label text | `semantic/action/neutral-subtle/text/default` |
| Placeholder / masked text | `semantic/background/neutral-400` |
| Helper text | `semantic/background/neutral-400` |
| Error text | `semantic/background/error` |
| Visibility toggle icon | `semantic/action/neutral-subtle/icon/default` |

---

## Usage Rules

- **Always include the visibility toggle** — users make more errors when they cannot verify their input. The icon toggles between "show password" (eye-open) and "hide password" (eye-closed) icons.
- **Never auto-reveal the password** on initial render. Default state must be masked.
- **Do not prevent copy-paste** — this forces users to type passwords manually and discourages strong passwords.
- **Include a helper text slot** for communicating password requirements (e.g., minimum length, required characters) _before_ submission, not only on error.
- **Do not use `autocomplete="off"`** on login fields — this breaks password manager compatibility.  Use `autocomplete="current-password"` for login and `autocomplete="new-password"` for registration.
- **Prefix / suffix** slots are available for adding a leading lock icon or a strength indicator.

---

## Accessibility Notes

- Use `<input type="password">`. Do not substitute with `<input type="text">` styled to look masked.
- The visibility toggle is a `<button>` with `aria-label` that updates dynamically: `"Show password"` / `"Hide password"`.
- When password is revealed, dynamically update `aria-label` so screen reader users know the state.
- Do not use `aria-live` on the input itself — announcing each character as it is typed is a privacy risk.
- Error messages must be associated via `aria-describedby` and `aria-invalid="true"`.
- `autocomplete="new-password"` signals to browsers and password managers to generate/save a new credential.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Include the visibility toggle | Remove the toggle "for security" — it reduces accuracy |
| Use `autocomplete="current-password"` on login | Use `autocomplete="off"` to block password managers |
| Show password requirements in helper text before submission | Surface requirements only after a failed attempt |
| Allow paste into the field | Block paste events |
| Label the toggle button accessibly | Use an icon-only button with no accessible name |

---

## Example HTML Usage

```html
<!-- Login password field -->
<div class="password-field password-field--large">
  <label for="login-password" class="password-field__label">Password</label>
  <div class="password-field__wrapper">
    <input
      type="password"
      id="login-password"
      name="password"
      class="password-field__control"
      placeholder="Enter password"
      autocomplete="current-password"
      aria-describedby="login-password-helper"
    />
    <button
      type="button"
      class="password-field__toggle"
      aria-label="Show password"
      aria-controls="login-password"
    >
      <svg class="password-field__icon" aria-hidden="true" focusable="false"><!-- eye icon --></svg>
    </button>
  </div>
  <p id="login-password-helper" class="password-field__helper">
    Enter your account password.
  </p>
</div>

<!-- Registration password field with requirements -->
<div class="password-field password-field--large">
  <label for="new-password" class="password-field__label">Create password</label>
  <div class="password-field__wrapper">
    <input
      type="password"
      id="new-password"
      name="new-password"
      class="password-field__control"
      placeholder="Create a strong password"
      autocomplete="new-password"
      aria-describedby="new-password-helper"
    />
    <button
      type="button"
      class="password-field__toggle"
      aria-label="Show password"
      aria-controls="new-password"
    >
      <svg class="password-field__icon" aria-hidden="true" focusable="false"><!-- eye icon --></svg>
    </button>
  </div>
  <p id="new-password-helper" class="password-field__helper">
    Must be 8–64 characters and include at least one number.
  </p>
</div>

<!-- Error state -->
<div class="password-field password-field--medium password-field--error">
  <label for="confirm-password" class="password-field__label">Confirm password</label>
  <div class="password-field__wrapper">
    <input
      type="password"
      id="confirm-password"
      name="confirm-password"
      class="password-field__control"
      autocomplete="new-password"
      aria-describedby="confirm-password-error"
      aria-invalid="true"
    />
    <button type="button" class="password-field__toggle" aria-label="Show password">
      <svg class="password-field__icon" aria-hidden="true" focusable="false"><!-- eye icon --></svg>
    </button>
  </div>
  <p id="confirm-password-error" class="password-field__error" role="alert">
    Passwords do not match. Please try again.
  </p>
</div>

<!-- Visibility toggle JavaScript -->
<script>
  document.querySelectorAll('.password-field__toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = document.getElementById(toggle.getAttribute('aria-controls'));
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      toggle.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
    });
  });
</script>
```
