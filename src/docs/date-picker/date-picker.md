# Date Picker

## Purpose
Allows users to select a specific date from a visual calendar grid. Used in booking flows, scheduling, filtering by date range, and any form requiring a structured date value.

---

## Variants

| Component | Description |
|---|---|
| `Date Picker` | Full calendar panel (trigger + month grid) |
| `Date cell` | Individual day cell within the calendar |
| `_Year Dropdown` | Year navigation dropdown |

---

## Date Cell Types / States

| State | Description |
|---|---|
| `Default` | Available day |
| `Hovered` | Pointer over a day |
| `Focused` | Keyboard focus ring |
| `Selected` | Chosen date — primary fill |
| `Today` | Current date — accented border |
| `Range start` | First day in a date range |
| `Range end` | Last day in a date range |
| `In range` | Day within a selected range |
| `Disabled` | Past/unavailable date |

---

## Tokens Used

| Property | Token |
|---|---|
| Cell (default) background | `semantic/background/Surface/Primary` |
| Cell (hovered) background | `semantic/action/neutral-subtle/background/hover` |
| Cell (selected) background | `semantic/background/primary-700` |
| Cell (selected) text | `primitive/color/base/white` |
| Cell (today) border | `semantic/background/primary-700` |
| Cell (today) text | `semantic/background/primary-700` |
| Cell (in range) background | `semantic/background/primary-50` |
| Cell (disabled) text | `semantic/background/neutral-300` |
| Header text (month/year) | `semantic/action/neutral-subtle/text/default` |
| Day labels | `semantic/background/neutral-500` |
| Nav arrow | `semantic/action/neutral-subtle/icon/default` |
| Focus ring | `component/button/primary/border/focused` |
| Border radius | `semantic/spacing/xs` |
| Panel shadow | Effect style: `shadow/lg` |

---

## Usage Rules

- **Always pair the Date Picker with a text input field** so users can type a date directly (especially important for power users and users who know the exact date).
- **Validate typed dates in real time** and highlight errors inline. Accept common formats (DD/MM/YYYY, MM-DD-YYYY) and parse gracefully.
- **Disable future dates** for date-of-birth fields. **Disable past dates** for scheduling future events.
- **Today's date** should always be visually distinguished from other dates without being pre-selected.
- **Month/year navigation** must be accessible — prev/next buttons and the year dropdown for jumping across long date ranges.
- For date-range selection, require users to select start date first, then end date. Show the range highlight in real time as the end date is hovered.
- Do not require a Date Picker for year-only or month-only inputs — use Dropdown Inputs instead.

---

## Accessibility Notes

- Implement the calendar as a `role="grid"` (for the month grid), `role="gridcell"` for each day, and `role="columnheader"` for day labels (Mon, Tue, etc.).
- The trigger button has `aria-haspopup="dialog"` and `aria-expanded`.
- Wrap the popover in `role="dialog"` with `aria-label="Choose a date"` or `aria-labelledby`.
- Keyboard navigation in the grid: arrows move between days, `Enter` / `Space` selects, `Page Up/Down` changes months, `Ctrl+Page Up/Down` changes years.
- Selected date: `aria-selected="true"` on the cell; today: `aria-label="[date], today"`.
- Disabled cells: `aria-disabled="true"` and `tabindex="-1"`.
- Announce the current month/year in the dialog heading.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Pair with a text input for direct date entry | Force users to use only the calendar picker |
| Distinguish today visually without pre-selecting it | Auto-select today as the default date silently |
| Disable unavailable dates with `aria-disabled` | Let users select invalid dates and fail at submission |
| Support keyboard navigation through the grid | Block keyboard users from navigating the calendar |
| Close the picker after date selection (unless range) | Leave the calendar open after a single date is chosen |

---

## Example HTML Usage

```html
<!-- Date picker trigger + text input -->
<div class="date-picker date-picker--large">
  <label for="start-date" class="date-picker__label">Start date</label>
  <div class="date-picker__wrapper">
    <input
      type="text"
      id="start-date"
      name="start-date"
      class="date-picker__input"
      placeholder="DD / MM / YYYY"
      inputmode="numeric"
      autocomplete="off"
      aria-describedby="start-date-helper"
      aria-haspopup="dialog"
    />
    <button
      type="button"
      class="date-picker__trigger"
      aria-label="Open calendar to choose start date"
      aria-haspopup="dialog"
      aria-expanded="false"
      aria-controls="date-picker-dialog"
    >
      <svg class="date-picker__icon" aria-hidden="true" focusable="false"><!-- calendar icon --></svg>
    </button>
  </div>
  <p id="start-date-helper" class="date-picker__helper">Format: DD / MM / YYYY</p>
</div>

<!-- Calendar dialog -->
<div
  id="date-picker-dialog"
  role="dialog"
  aria-modal="true"
  aria-label="Choose a start date"
  class="date-picker__panel"
  hidden
>
  <!-- Month navigation -->
  <div class="date-picker__header">
    <button type="button" class="date-picker__nav" aria-label="Previous month">
      <svg aria-hidden="true" focusable="false"><!-- left --></svg>
    </button>
    <h2 class="date-picker__month-year" aria-live="polite">May 2026</h2>
    <button type="button" class="date-picker__nav" aria-label="Next month">
      <svg aria-hidden="true" focusable="false"><!-- right --></svg>
    </button>
  </div>

  <!-- Day labels -->
  <div role="grid" class="date-picker__grid" aria-label="May 2026">
    <div role="row">
      <div role="columnheader" abbr="Sunday">Su</div>
      <div role="columnheader" abbr="Monday">Mo</div>
      <div role="columnheader" abbr="Tuesday">Tu</div>
      <div role="columnheader" abbr="Wednesday">We</div>
      <div role="columnheader" abbr="Thursday">Th</div>
      <div role="columnheader" abbr="Friday">Fr</div>
      <div role="columnheader" abbr="Saturday">Sa</div>
    </div>
    <div role="row">
      <!-- Example cells -->
      <div role="gridcell" aria-disabled="true" class="date-cell date-cell--disabled">
        <button tabindex="-1" aria-disabled="true">27</button>
      </div>
      <div role="gridcell" class="date-cell date-cell--today">
        <button tabindex="0" aria-label="16 May 2026, today">16</button>
      </div>
      <div role="gridcell" class="date-cell date-cell--selected">
        <button tabindex="0" aria-selected="true" aria-label="17 May 2026">17</button>
      </div>
    </div>
  </div>
</div>
```
