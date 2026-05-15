# Notification (Banner)

## Purpose
A full-width banner that communicates important system-level messages — warnings, critical alerts, successes, or informational updates — that affect the entire page or application state.

---

## Variants (Style)

| Style | Description |
|---|---|
| `Neutral` | General information, no urgency |
| `Info` | Informational — blue palette |
| `Warning` | Caution needed — amber palette |
| `Success` | Positive confirmation — green palette |
| `Critical` | Urgent / error state — red palette |

---

## Layout Options

| Property | Options | Description |
|---|---|---|
| `RTL` | `True` / `False` | Mirrors for Arabic/RTL layouts |
| `Icon` | `True` / `False` | Shows/hides the status icon |
| `Lead Text` | `True` / `False` | Bolded introductory label (e.g., "Important:") |
| `Dismissible` | `True` / `False` | Shows a close button to dismiss the banner |
| `Link` | `True` / `False` | Shows an inline link within the message |
| `Button` | `True` / `False` | Shows an action button alongside the message |

---

## Tokens Used

| Style | Background token | Text / icon token |
|---|---|---|
| Neutral | `semantic/background/State/Neutral/nuetral-subtle` | `semantic/action/neutral-subtle/text/default` |
| Info | `semantic/background/State/Info/info-subtle` | `semantic/background/info` |
| Warning | `semantic/background/State/Warning/warning-subtle` | `semantic/background/warning` |
| Success | `semantic/background/State/Success/success-subtle` | `semantic/background/success` |
| Critical | `semantic/background/State/Danger/danger-subtle` | `semantic/background/error` |

| Property | Token |
|---|---|
| Border (left accent) | Matches style's strong token (e.g., `semantic/background/State/Info/info-strong`) |
| Close button | `semantic/action/neutral-subtle/icon/default` |
| Padding | `semantic/spacing/md` / `semantic/spacing/lg` |

---

## Usage Rules

- **Place at the top of the page or content area**, below the global navigation bar. Do not float it over content.
- **Use `Critical` sparingly** — reserve it for system errors, outages, or actions that have already caused data loss.
- **`Lead Text`** (e.g., "Important:", "Warning:") front-loads meaning for scanning users and screen readers.
- **One notification banner at a time.** If multiple messages are needed, prioritise Critical > Warning > Info > Success, and stack them vertically.
- **Dismissible** should be `True` for transient messages (success confirmations, promotional notices) and `False` for persistent blocking issues (service disruption, incomplete onboarding).
- Notifications should not auto-dismiss — unlike Toast, they are persistent system messages.

---

## Accessibility Notes

- Use `role="alert"` for Critical and Warning styles (announced immediately by screen readers).
- Use `role="status"` for Info and Success styles (polite announcement).
- For Neutral, use a `<section>` or `<aside>` with an appropriate `aria-label`.
- The close button must have `aria-label="Dismiss notification"`.
- Do not rely on colour alone — always pair with a status icon and textual label.
- If the notification disappears after being dismissed, use `aria-live="polite"` on a status region to announce "Notification dismissed".

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use `Critical` for system-level blocking errors | Use `Critical` for minor validation warnings |
| Include a `Lead Text` label for screen reader context | Rely on icon colour alone to convey severity |
| Place banner at page top below navigation | Float banner over interactive content |
| Keep message text short and scannable | Write multi-paragraph banners |
| Use `Dismissible=False` for service outages | Allow users to dismiss unresolved blocking issues |

---

## Example HTML Usage

```html
<!-- Critical notification (auto-announces to screen readers) -->
<div
  class="notification notification--critical"
  role="alert"
  aria-live="assertive"
>
  <svg class="notification__icon" aria-hidden="true" focusable="false"><!-- error icon --></svg>
  <div class="notification__content">
    <span class="notification__lead">Service disruption:</span>
    <span class="notification__message">
      Payments are temporarily unavailable. Our team is working on a fix.
    </span>
    <a href="/status" class="link link--neutral link--small notification__link">
      View status page
    </a>
  </div>
  <button
    type="button"
    class="notification__close btn-close btn-close--small"
    aria-label="Dismiss notification"
  >
    <svg aria-hidden="true" focusable="false"><!-- X icon --></svg>
  </button>
</div>

<!-- Success notification -->
<div
  class="notification notification--success"
  role="status"
  aria-live="polite"
>
  <svg class="notification__icon" aria-hidden="true" focusable="false"><!-- check icon --></svg>
  <div class="notification__content">
    <span class="notification__lead">Done!</span>
    <span class="notification__message">
      Your report has been generated and is ready to download.
    </span>
    <button type="button" class="btn btn--neutral btn--small">
      Download
    </button>
  </div>
  <button
    type="button"
    class="notification__close btn-close btn-close--small"
    aria-label="Dismiss notification"
  >
    <svg aria-hidden="true" focusable="false"><!-- X icon --></svg>
  </button>
</div>

<!-- Info notification (RTL) -->
<div
  class="notification notification--info"
  role="status"
  dir="rtl"
  lang="ar"
>
  <svg class="notification__icon" aria-hidden="true" focusable="false"><!-- info icon --></svg>
  <div class="notification__content">
    <span class="notification__lead">مهم:</span>
    <span class="notification__message">
      هذه رسالة تنبيهية مهمة للغاية تستدعي التركيز.
    </span>
  </div>
</div>
```
