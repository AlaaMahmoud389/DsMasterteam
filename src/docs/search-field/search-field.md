# Search Field

## Purpose
Allows users to enter a query string to filter or find content within a page, list, or global scope. Combines a text input with a search icon and an optional clear (trailing) icon.

---

## Variants (Style)

| Style | Description |
|---|---|
| `Default` | Outlined. General use in headers and toolbars. |
| `Filled lighter` | Subtle fill on white surfaces. |
| `Filled darker` | Stronger fill on light-grey surfaces. |

---

## Sizes

| Size | Height | Use case |
|---|---|---|
| `Large` | 48 px | Global search, prominent hero sections |
| `Medium` | 40 px | Page-level or list-level filtering |

---

## States

| State | Description |
|---|---|
| `Default` | Resting — placeholder "Search" visible |
| `Filled` | Query entered — trailing clear icon appears |
| `Hovered` | Border darkens |
| `Pressed` | Click/tap activating field |
| `Focused` | Keyboard focus — primary-coloured border |
| `Read-only` | Displays query; cannot be edited |
| `Disabled` | Non-interactive |

---

## Tokens Used

| Property | Token |
|---|---|
| Border (default) | `semantic/action/neutral-subtle/border/default` |
| Border (focused) | `component/button/primary/border/focused` |
| Background | `semantic/background/Surface/Primary` |
| Background (filled lighter) | `semantic/background/neutral-50` |
| Background (filled darker) | `semantic/background/neutral-100` |
| Search icon | `semantic/action/neutral-subtle/icon/default` |
| Placeholder text | `semantic/background/neutral-400` |
| Input text | `semantic/action/neutral-subtle/text/default` |
| Helper text | `semantic/background/neutral-400` |
| Clear (trailing) icon | `semantic/action/neutral-subtle/icon/default` |

---

## Usage Rules

- **Always show the search icon** (`Icon=True`) inside the field so users immediately recognise its purpose.
- **Show the clear (trailing) icon** (`Show Trailing Icon=True`) when the field has a value, so users can reset without selecting all text.
- **Label** (`Show label=True`) should read "Search" or a more specific label ("Search products", "Search members"). The label can be visually hidden on compact layouts but must always be present for accessibility.
- **Submit search on `Enter` key.** Do not require the user to click a separate button for basic search.
- **Live filtering** (results update as you type) should debounce by at least 300 ms to avoid excessive requests.
- **Keep placeholder text generic.** Avoid placing example queries in the placeholder — they suggest the field is already filled.

---

## Accessibility Notes

- Use `<input type="search">` so browsers and assistive technologies can expose native search semantics.
- Associate a `<label>` via `for` / `id` even when visually hidden (`class="sr-only"`).
- The clear button must have `aria-label="Clear search"` and only appear when there is a value (`aria-hidden="true"` otherwise).
- For live search, announce result counts with an `aria-live="polite"` region (e.g., "12 results found").
- Use `role="search"` on the wrapping `<form>` or landmark to mark the search region for screen readers.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Include the clear icon when a query is entered | Force users to manually select-all to clear |
| Debounce live search to reduce API calls | Fire a request on every keystroke |
| Announce result count changes via `aria-live` | Let screen readers miss that results changed |
| Use `type="search"` | Use `type="text"` for search fields |
| Show a "No results" empty state when search returns nothing | Show a blank list with no feedback |

---

## Example HTML Usage

```html
<!-- Search field in a toolbar -->
<form role="search" class="search-field search-field--medium">
  <label for="product-search" class="search-field__label sr-only">
    Search products
  </label>
  <div class="search-field__wrapper">
    <svg class="search-field__lead-icon" aria-hidden="true" focusable="false"><!-- search icon --></svg>
    <input
      type="search"
      id="product-search"
      name="q"
      class="search-field__control"
      placeholder="Search"
      autocomplete="off"
      aria-describedby="product-search-helper"
    />
    <button
      type="reset"
      class="search-field__clear"
      aria-label="Clear search"
      hidden
    >
      <svg aria-hidden="true" focusable="false"><!-- clear icon --></svg>
    </button>
  </div>
  <p id="product-search-helper" class="search-field__helper sr-only">
    Press Enter to search or Escape to clear.
  </p>
</form>

<!-- Live result count announcement -->
<div aria-live="polite" aria-atomic="true" class="sr-only" id="search-status"></div>

<script>
  const input = document.getElementById('product-search');
  const clearBtn = input.nextElementSibling;
  const status = document.getElementById('search-status');

  input.addEventListener('input', debounce(async () => {
    clearBtn.hidden = input.value.length === 0;
    if (input.value.length > 1) {
      const count = await fetchResultCount(input.value);
      status.textContent = `${count} result${count !== 1 ? 's' : ''} found`;
    }
  }, 300));

  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.hidden = true;
    input.focus();
    status.textContent = '';
  });

  function debounce(fn, ms) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  }
</script>
```
