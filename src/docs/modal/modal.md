# Modal

## Purpose
Displays content in a layer above the page, requiring the user to interact with it before returning to the main content. Use for confirmations, forms, detailed views, and alerts that demand immediate attention.

---

## Variants

The Modal is composed of three sub-components:

| Sub-component | Description |
|---|---|
| `Modal` | The full-screen overlay wrapper (backdrop + dialog container) |
| `_Modal Header` | Title, optional featured icon, optional close button |
| `_Modal Body` | Scrollable content area — `Text` or `Placeholder` content slot |

---

## Layout Options

| Property | Options | Description |
|---|---|---|
| `RTL` | `True` / `False` | Mirrors layout for right-to-left languages |
| `Mobile` | `True` / `False` | Adapts to full-width bottom-sheet layout on mobile |
| `Center Align` | `True` / `False` (header & body) | Centres title and content for confirmation/alert modals |
| `Show Featured Icon` | `True` / `False` | Shows a contextual icon above the title |
| `Close Button` | `True` / `False` | Shows the ✕ close button in the header |

---

## States

Modals do not have interactive states beyond open/closed. The close button follows the `Button-Close` state model.

---

## Tokens Used

| Property | Token |
|---|---|
| Overlay background | `semantic/background/opacity-10` |
| Dialog background | `semantic/background/Surface/Primary` |
| Header title text | `semantic/action/neutral-subtle/text/default` |
| Body text | `semantic/action/neutral-subtle/text/default` |
| Divider (header/footer) | `semantic/action/neutral-subtle/border/default` |
| Close button | `component/button/neutral/background/default` |
| Border radius | `semantic/spacing/md` |
| Shadow | Effect style: `shadow/xl` |
| Padding (header) | `semantic/spacing/xl` |
| Padding (body) | `semantic/spacing/xl` |

---

## Usage Rules

- **Use a Modal only when the task requires the user's full attention** and cannot be completed in context. Prefer inline editing or sidepanels for less critical tasks.
- **One modal at a time.** Do not stack modals (modal on top of modal).
- **Always include a close mechanism** — either the close button, backdrop click, or Escape key. Never trap users without an exit path.
- **Focus must move into the modal** when it opens and be trapped within it until the modal is closed (focus trap).
- **The backdrop click should close the modal** unless the modal contains unsaved changes — in that case, prompt for confirmation.
- **`Center Align=True`** is appropriate for confirmations, success states, and short alerts. Use left-aligned for forms and detailed content.
- **Action buttons** (confirm/cancel) live in the modal footer — do not embed them inside the body content area.
- Keep modal titles short (3–6 words). Move detailed explanation into the body text.

---

## Accessibility Notes

- The dialog container must have `role="dialog"` (or `role="alertdialog"` for destructive confirmations) and `aria-modal="true"`.
- Associate the title using `aria-labelledby` pointing to the heading element.
- Associate descriptive body text using `aria-describedby`.
- **Focus trap**: Tab/Shift+Tab must cycle only within modal elements while open.
- **Focus management**: Move focus to the first focusable element (usually the close button or first field) on open. Restore focus to the trigger element on close.
- **Escape** key must close the modal.
- Use `aria-live="assertive"` on `role="alertdialog"` for destructive confirmations that are time-sensitive.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Trap focus inside the open modal | Let focus escape to the page behind |
| Return focus to the trigger element on close | Drop focus to the top of the page on close |
| Use `role="alertdialog"` for irreversible actions | Use `role="dialog"` for delete confirmations |
| Keep body content scrollable for long forms | Make the entire modal scroll with the page |
| Center-align confirmation dialogs | Center-align complex forms |
| Use one modal at a time | Stack multiple modals |

---

## Example HTML Usage

```html
<!-- Modal trigger -->
<button
  type="button"
  class="btn btn--primary btn--medium"
  aria-haspopup="dialog"
  aria-controls="confirm-modal"
  id="open-modal-btn"
>
  Delete account
</button>

<!-- Modal dialog -->
<div
  class="modal__overlay"
  id="confirm-modal"
  role="alertdialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
  hidden
>
  <div class="modal__dialog">
    <!-- Header -->
    <div class="modal__header">
      <svg class="modal__icon modal__icon--danger" aria-hidden="true" focusable="false"><!-- warning icon --></svg>
      <h2 id="modal-title" class="modal__title">Delete account</h2>
      <button
        type="button"
        class="modal__close btn-close btn-close--medium"
        aria-label="Close dialog"
      >
        <svg aria-hidden="true" focusable="false"><!-- X icon --></svg>
      </button>
    </div>

    <!-- Body -->
    <div class="modal__body">
      <p id="modal-desc">
        This action is permanent and cannot be undone. All your data,
        projects, and settings will be deleted.
      </p>
    </div>

    <!-- Footer -->
    <div class="modal__footer">
      <button type="button" class="btn btn--neutral btn--medium" data-modal-close>
        Cancel
      </button>
      <button type="button" class="btn btn--primary btn--destructive btn--medium">
        Delete account
      </button>
    </div>
  </div>
</div>

<script>
  const modal = document.getElementById('confirm-modal');
  const trigger = document.getElementById('open-modal-btn');
  const focusable = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function openModal() {
    modal.hidden = false;
    const first = modal.querySelectorAll(focusable)[0];
    first?.focus();
    document.addEventListener('keydown', trapFocus);
  }

  function closeModal() {
    modal.hidden = true;
    trigger.focus();
    document.removeEventListener('keydown', trapFocus);
  }

  function trapFocus(e) {
    if (e.key === 'Escape') return closeModal();
    if (e.key !== 'Tab') return;
    const items = [...modal.querySelectorAll(focusable)];
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  trigger.addEventListener('click', openModal);
  modal.querySelectorAll('[data-modal-close], .modal__close').forEach(el =>
    el.addEventListener('click', closeModal)
  );
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
</script>
```
