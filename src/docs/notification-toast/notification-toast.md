# Notification Toast

## Purpose
A short-lived floating message that briefly informs the user of a system event triggered by their action (save, send, delete). Unlike Notification Banners, toasts appear over the interface and auto-dismiss after a timeout.

---

## Variants (Type)

| Type | Description |
|---|---|
| `Neutral` | General status update |
| `Info` | Informational message — blue palette |
| `Warning` | Caution / non-blocking advisory — amber palette |
| `Success` | Successful action confirmed — green palette |
| `Critical/Error` | Action failed or error occurred — red palette |

---

## Layout Options

| Property | Options | Description |
|---|---|---|
| `RTL` | `True` / `False` | Mirrors for Arabic/RTL |
| `Mobile` | `True` / `False` | Full-width bottom toast on mobile |
| `Actions` | `True` / `False` | Shows primary action + secondary action buttons |
| `Helper Text` | `True` / `False` | Shows a supporting body line |
| `Close Button` | `True` / `False` | Allows manual early dismissal |
| `Secondary Action` | `True` / `False` | Shows a second text-button action |

---

## Tokens Used

| Style | Background token | Text / icon token |
|---|---|---|
| Neutral | `semantic/background/neutral-800` | `primitive/color/base/white` |
| Info | `semantic/background/State/Info/info-strong` | `primitive/color/base/white` |
| Warning | `semantic/background/State/Warning/warning-strong` | `primitive/color/base/white` |
| Success | `semantic/background/State/Success/success-strong` | `primitive/color/base/white` |
| Critical | `semantic/background/State/Danger/danger-strong` | `primitive/color/base/white` |

| Property | Token |
|---|---|
| Close button | `primitive/color/base/white` (on-color) |
| Border radius | `semantic/spacing/sm` |
| Shadow | Effect style: `shadow/lg` |
| Padding | `semantic/spacing/md` |
| Gap between toasts | `semantic/spacing/xs` |

---

## Usage Rules

- **Position in the bottom-right corner** on desktop (bottom-center on mobile). Avoid top-right — it competes with browser-level notifications.
- **Auto-dismiss after 5 seconds** for Neutral/Info/Success. Use 8+ seconds for Critical/Warning, or keep persistent until dismissed.
- **Always offer a manual dismiss** (`Close Button=True`) so users who read slowly are not cut off.
- **Provide an "Undo" action** whenever the triggering action is reversible (e.g., delete, archive). The `Actions` slot is the correct place for this.
- **Limit to one toast at a time** where possible. If multiple toasts queue, show them sequentially rather than stacking infinitely.
- **Keep titles to 4–6 words.** Move detail into the helper text slot.
- Do not use toasts for errors that require the user to take action in a form — use Inline Alert or the form's error state instead.

---

## Accessibility Notes

- Inject toasts into an `aria-live="polite"` region for Neutral/Info/Success. Use `aria-live="assertive"` only for Critical/Error toasts that require immediate attention.
- The live region element should be present in the DOM at page load (empty), and toasts injected into it dynamically.
- `role="status"` for non-urgent toasts; `role="alert"` for critical.
- Auto-dismiss timers must pause when the user focuses or hovers over the toast (WCAG 2.2.1 — Pause, Stop, Hide).
- The close button needs `aria-label="Dismiss"`.
- Do not rely on colour alone — always include a status icon and text.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Auto-dismiss after 5 s for non-critical messages | Dismiss critical errors automatically |
| Pause the timer when user hovers or focuses | Dismiss toast while user is reading it |
| Provide Undo in `Actions` for reversible events | Show no undo for a destructive action toast |
| Use `aria-live="polite"` for general toasts | Use `aria-live="assertive"` for every toast |
| Keep the toast message to 1–2 lines | Write long paragraphs in a toast |

---

## Example HTML Usage

```html
<!-- Toast live region (must exist on page load) -->
<div
  id="toast-region"
  aria-live="polite"
  aria-atomic="false"
  class="toast-region"
></div>

<!-- Toast template (injected dynamically) -->
<div class="toast toast--success" role="status">
  <svg class="toast__icon" aria-hidden="true" focusable="false"><!-- check icon --></svg>
  <div class="toast__content">
    <p class="toast__title">Project saved</p>
    <p class="toast__helper">All changes have been saved to your workspace.</p>
    <div class="toast__actions">
      <button type="button" class="btn btn--transparent btn--small toast__undo">
        Undo
      </button>
    </div>
  </div>
  <button
    type="button"
    class="toast__close btn-close btn-close--small"
    aria-label="Dismiss"
  >
    <svg aria-hidden="true" focusable="false"><!-- X icon --></svg>
  </button>
</div>

<script>
  function showToast({ type = 'success', title, helper, undoFn } = {}) {
    const region = document.getElementById('toast-region');
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.setAttribute('role', type === 'critical' ? 'alert' : 'status');
    toast.innerHTML = `
      <div class="toast__content">
        <p class="toast__title">${title}</p>
        ${helper ? `<p class="toast__helper">${helper}</p>` : ''}
        ${undoFn ? `<button type="button" class="btn btn--transparent btn--small toast__undo">Undo</button>` : ''}
      </div>
      <button type="button" class="toast__close" aria-label="Dismiss">✕</button>
    `;

    const dismiss = () => toast.remove();
    let timer = setTimeout(dismiss, type === 'critical' ? 8000 : 5000);

    toast.addEventListener('mouseenter', () => clearTimeout(timer));
    toast.addEventListener('mouseleave', () => { timer = setTimeout(dismiss, 3000); });
    toast.querySelector('.toast__close').addEventListener('click', dismiss);
    if (undoFn) toast.querySelector('.toast__undo').addEventListener('click', () => { undoFn(); dismiss(); });

    region.appendChild(toast);
  }

  // Usage
  showToast({ type: 'success', title: 'Project saved', helper: 'All changes saved.', undoFn: () => console.log('Undo!') });
</script>
```
