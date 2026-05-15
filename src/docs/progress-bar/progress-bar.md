# Progress Bar

## Purpose
Communicates how far along a process, upload, or task is. Provides visual feedback so users know the system is working and approximately how long remains.

---

## Variants

| Component | Description |
|---|---|
| `Progress Bar` | Horizontal linear bar |
| `Circular Progress Bar` | Ring-shaped radial indicator |

---

## Sizes

### Linear Progress Bar
| Size | Height | Use case |
|---|---|---|
| `Small` | 4 px | Compact/inline use, page load indicators |
| `Medium` | 8 px | Standard forms and upload progress |
| `Large` | 12 px | Prominent progress tracking |

### Circular Progress Bar
| Size | Diameter | Use case |
|---|---|---|
| `64px` | 64 px | Inline metric widgets |
| `80px` | 80 px | Dashboard cards |
| `120px` | 120 px | Detailed progress views |
| `160px` | 160 px | Feature progress sections |
| `200px` | 200 px | Hero / full-section indicators |

---

## Styles

| Style | Description |
|---|---|
| `Primary` | Brand-coloured bar |
| `Neutral` | Grey bar for non-primary metrics |
| `Success` | Green — 100% complete |
| `Error` | Red — failed or blocked state |

---

## States (Progress Bar)

| State / Percentage | Description |
|---|---|
| `20%` | In progress |
| `50%` | Mid-progress |
| `100% - Success` | Complete — bar turns green |
| `0% - Error` | Blocked / failed — bar turns red |

---

## Tokens Used

| Property | Token |
|---|---|
| Fill (Primary) | `semantic/background/primary-700` |
| Fill (Neutral) | `semantic/background/neutral-500` |
| Fill (Success) | `semantic/background/success` |
| Fill (Error) | `semantic/background/error` |
| Track background | `semantic/background/neutral-100` |
| Label text | `semantic/action/neutral-subtle/text/default` |
| Percentage text | `semantic/action/neutral-subtle/text/default` |
| Helper text | `semantic/background/neutral-400` |
| Border radius (bar) | `semantic/spacing/4xl` |

---

## Usage Rules

- **Always pair with a label** (`Show label=True`) so users know what is being measured.
- **Show percentage** for deterministic progress. Use an indeterminate animation (pulsing/shimmer) only when completion time is genuinely unknown.
- **Success state** (`100% - Success`) gives clear positive confirmation. Do not silently stop the bar at 100% — update the style to Success.
- **Error state** (`0% - Error`) should be accompanied by an Inline Alert or Toast explaining what failed and what the user should do.
- **Circular variant** is suited for dashboard metric cards showing a single key value (e.g., "Active users: 72%").
- Do not use Progress Bar for multi-step workflows — use Progress Stepper instead.
- Helper text can show absolute values (e.g., "4.2 GB of 10 GB") alongside the percentage.

---

## Accessibility Notes

- Use `role="progressbar"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, and `aria-valuetext` for descriptive announcements.
- For indeterminate progress, omit `aria-valuenow` and set `aria-valuetext="Loading…"`.
- Associate the label using `aria-labelledby` or `aria-label`.
- Update `aria-valuenow` dynamically as progress changes. Screen readers will not announce each change automatically — use an `aria-live="polite"` region to announce milestones (e.g., "Upload 50% complete") instead of every 1% increment.
- Do not rely on colour alone (green = done, red = error) — include text confirmation.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Change to Success style at 100% | Leave the bar at 100% Primary with no feedback |
| Show an error message alongside the Error state | Change bar to red with no explanation |
| Announce progress milestones via `aria-live` | Update `aria-valuenow` on every percent tick |
| Use label + percentage for deterministic progress | Use progress bar for unknown-duration tasks without indeterminate state |

---

## Example HTML Usage

```html
<!-- Linear progress bar (50%) -->
<div class="progress-bar progress-bar--medium">
  <div class="progress-bar__header">
    <label id="upload-label" class="progress-bar__label">Uploading files</label>
    <span class="progress-bar__percentage">50%</span>
  </div>
  <div
    class="progress-bar__track"
    role="progressbar"
    aria-valuenow="50"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuetext="50% uploaded"
    aria-labelledby="upload-label"
  >
    <div class="progress-bar__fill progress-bar__fill--primary" style="width: 50%"></div>
  </div>
  <p class="progress-bar__helper">4.2 GB of 8.4 GB</p>
</div>

<!-- Success state (100%) -->
<div class="progress-bar progress-bar--medium">
  <div class="progress-bar__header">
    <label id="upload-label-done" class="progress-bar__label">Upload complete</label>
    <span class="progress-bar__percentage">100%</span>
  </div>
  <div
    class="progress-bar__track"
    role="progressbar"
    aria-valuenow="100"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuetext="Upload complete"
    aria-labelledby="upload-label-done"
  >
    <div class="progress-bar__fill progress-bar__fill--success" style="width: 100%"></div>
  </div>
</div>

<!-- Error state -->
<div class="progress-bar progress-bar--medium">
  <div class="progress-bar__header">
    <label id="upload-label-err" class="progress-bar__label">Upload failed</label>
    <span class="progress-bar__percentage">0%</span>
  </div>
  <div
    class="progress-bar__track"
    role="progressbar"
    aria-valuenow="0"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuetext="Upload failed"
    aria-labelledby="upload-label-err"
  >
    <div class="progress-bar__fill progress-bar__fill--error" style="width: 0%"></div>
  </div>
  <p class="progress-bar__helper progress-bar__helper--error" role="alert">
    Connection lost. Please try again.
  </p>
</div>

<!-- Circular progress bar -->
<div class="circular-progress circular-progress--120px">
  <svg
    role="progressbar"
    aria-valuenow="72"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuetext="72% active users"
    aria-label="Active users"
    class="circular-progress__svg"
    viewBox="0 0 120 120"
  >
    <circle class="circular-progress__track" cx="60" cy="60" r="54" />
    <circle
      class="circular-progress__fill circular-progress__fill--primary"
      cx="60"
      cy="60"
      r="54"
      stroke-dasharray="339.29"
      stroke-dashoffset="94.8"
    />
  </svg>
  <div class="circular-progress__label">
    <span class="circular-progress__percentage">72%</span>
    <span class="circular-progress__text">Active users</span>
  </div>
</div>
```
