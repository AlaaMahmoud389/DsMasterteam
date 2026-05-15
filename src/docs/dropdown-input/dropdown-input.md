# Dropdown Input

## Purpose
Allows users to select one or more values from a predefined list. Use when the list of options is too long for inline radio buttons or checkboxes, or when options are dynamically populated.

---

## Variants (Style)

| Style | Description |
|---|---|
| `Default` | Outlined field on a white background. General use. |
| `Filled lighter` | Subtle fill, no visible border at rest. Use on white surfaces. |
| `Filled darker` | Stronger fill. Use on light-grey backgrounds. |

### List Item Types
| Type | Description |
|---|---|
| `Single Select` | One option selectable |
| `Multi Select` | Multiple options selectable with checkboxes |
| `Multi Select + Icon` | Multi-select with a leading icon per item |
| `Icon only` | Icon-driven list items |
| `Group label` | Non-selectable header for a group of items |

---

## Sizes

| Size | Height | Use case |
|---|---|---|
| `Large` | 48 px | Prominent forms, landing pages |
| `Medium` | 40 px | General forms, modals |

---

## States

### Trigger (closed field)
| State | Description |
|---|---|
| `Default` | Resting — placeholder or selected value visible |
| `Hovered` | Border darkens |
| `Pressed` | Click/tap to open |
| `Focused` | Keyboard focus |
| `Filled` | Has a selected value |
| `Read-only` | Displays value, cannot be changed |
| `Disabled` | Non-interactive |
| `Error` | Validation failed |

### List Item
| State | Description |
|---|---|
| `Default` | Resting |
| `Hovered` | Hover highlight |
| `Pressed` | Click/tap |
| `Focused` | Keyboard focus |
| `Disabled` | Non-selectable item |
| `Selected` | Current selection — check mark visible |

---

## Tokens Used

| Property | Token |
|---|---|
| Trigger border (default) | `semantic/action/neutral-subtle/border/default` |
| Trigger border (focused/open) | `component/button/primary/border/focused` |
| Trigger border (error) | `semantic/background/error` |
| Trigger background | `semantic/background/Surface/Primary` |
| List background | `semantic/background/Surface/Primary` |
| List item hover | `semantic/action/neutral-subtle/background/hover` |
| List item selected | `semantic/background/primary-50` |
| Selected check icon | `semantic/background/primary-700` |
| Label text | `semantic/action/neutral-subtle/text/default` |
| Placeholder text | `semantic/background/neutral-400` |
| Helper text | `semantic/background/neutral-400` |
| Error text | `semantic/background/error` |

---

## Usage Rules

- **Use Dropdown for 5+ options.** For 2–4 mutually exclusive options, Radio buttons are often clearer.
- **Use Multi Select** when users can legitimately pick more than one item.
- **Group label items** organise long lists semantically. They are non-interactive — never make them selectable.
- **The `Clear` toggle** (`Clear=True`) lets users reset the field. Enable it whenever the default empty state is valid.
- **`Type Cursor`** enables a search/filter input within the dropdown trigger for long lists.
- **Scroll bar** appears automatically when the list exceeds the visible area — do not suppress it.
- List items should be in a predictable order: alphabetical, most-used-first, or grouped logically.

---

## Accessibility Notes

- Implement as a `<select>` for simple single-select, or as a custom combobox (`role="combobox"`) for searchable/multi-select variants.
- The trigger must have `aria-haspopup="listbox"` and `aria-expanded` reflecting open/closed state.
- The listbox element must have `role="listbox"` with `aria-label` or `aria-labelledby`.
- Each list item uses `role="option"` with `aria-selected="true/false"`.
- Keyboard: `Enter` / `Space` opens the list; arrow keys navigate; `Escape` closes; `Enter` selects.
- Multi-select: `aria-multiselectable="true"` on the listbox.
- Group labels use `role="group"` with `aria-label`.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use Group labels to organise lists longer than 10 items | Dump 30+ options in a flat unsorted list |
| Enable `Clear` when an empty selection is valid | Force a selection when "none" is a meaningful state |
| Use `Multi Select` for genuinely multi-value fields | Use Multi Select when only one value makes sense |
| Show the selected count in the trigger for multi-select | Show a comma-separated string that truncates badly |
| Load options asynchronously with a loading state | Block the UI while fetching options |

---

## Example HTML Usage

```html
<!-- Native single-select (simple cases) -->
<div class="dropdown-input dropdown-input--large">
  <label for="country" class="dropdown-input__label">Country</label>
  <select
    id="country"
    name="country"
    class="dropdown-input__control"
    aria-describedby="country-helper"
  >
    <option value="" disabled selected>Select a country</option>
    <option value="sa">Saudi Arabia</option>
    <option value="ae">United Arab Emirates</option>
    <option value="kw">Kuwait</option>
  </select>
  <p id="country-helper" class="dropdown-input__helper">
    Select your billing country.
  </p>
</div>

<!-- Custom combobox (rich dropdown) -->
<div class="dropdown-input dropdown-input--large" role="group" aria-labelledby="role-label">
  <label id="role-label" class="dropdown-input__label">Role</label>
  <button
    type="button"
    class="dropdown-input__trigger"
    aria-haspopup="listbox"
    aria-expanded="false"
    aria-controls="role-list"
    aria-describedby="role-helper"
  >
    <span class="dropdown-input__value">Select a role</span>
    <svg class="dropdown-input__chevron" aria-hidden="true" focusable="false"><!-- chevron --></svg>
  </button>
  <ul
    id="role-list"
    role="listbox"
    aria-label="Role options"
    class="dropdown-input__list"
    hidden
  >
    <li role="option" aria-selected="false" class="dropdown-input__item">Admin</li>
    <li role="option" aria-selected="false" class="dropdown-input__item">Editor</li>
    <li role="option" aria-selected="false" class="dropdown-input__item">Viewer</li>
  </ul>
  <p id="role-helper" class="dropdown-input__helper">
    Determines access level in the workspace.
  </p>
</div>

<!-- Error state -->
<div class="dropdown-input dropdown-input--medium dropdown-input--error">
  <label for="department" class="dropdown-input__label">Department</label>
  <select
    id="department"
    name="department"
    class="dropdown-input__control"
    aria-describedby="department-error"
    aria-invalid="true"
  >
    <option value="" selected>Select a department</option>
  </select>
  <p id="department-error" class="dropdown-input__error" role="alert">
    Please select a department before continuing.
  </p>
</div>
```
