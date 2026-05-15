# Pagination

## Purpose
Allows users to navigate through multi-page content sets — tables, lists, search results, and galleries. Provides explicit page numbers and prev/next controls so users can orient themselves in the data.

---

## Variants

| Component | Description |
|---|---|
| `Pagination` | Full pagination bar with prev/next and numbered pages |
| `_PaginationItem` | Individual page number button |

---

## Sizes

| Size | Button height | Use case |
|---|---|---|
| `Small` | 32 px | Dense tables, compact UI |
| `Medium` (Meduim) | 36 px | Standard pages |
| `Large` | 40 px | Feature areas, prominent data tables |

---

## Pagination Item States

| State | Description |
|---|---|
| `Default` | Unvisited, available page |
| `Hovered` | Pointer over a non-current item |
| `Current Page` | Active page — highlighted with primary background |
| `Focused` (Focsed) | Keyboard focus ring |
| `Opened` | Overflow / ellipsis item expanded |
| Overflow (`Yes`) | `…` item replacing hidden middle pages |

---

## Tokens Used

| Property | Token |
|---|---|
| Item background (default) | `semantic/background/Surface/Primary` |
| Item background (hovered) | `semantic/action/neutral-subtle/background/hover` |
| Item background (current) | `semantic/background/primary-700` |
| Item text (default) | `semantic/action/neutral-subtle/text/default` |
| Item text (current) | `primitive/color/base/white` |
| Item border | `semantic/action/neutral-subtle/border/default` |
| Focus ring | `component/button/primary/border/focused` |
| Disabled text / arrows | `semantic/background/neutral-300` |
| Border radius | `semantic/spacing/xs` |
| Spacing between items | `semantic/spacing/xs` |

---

## Usage Rules

- **Always show prev/next arrows** alongside page numbers so users have both directional and direct access.
- **Show the current page count** (e.g., "Page 3 of 24") either inside the pagination or above the table for orientation.
- **Use overflow (`…`)** to collapse the middle range when the total pages exceed the visible slots. Always show the first and last page.
- **Disable (not hide) the prev arrow** on page 1, and the next arrow on the last page.
- **Match page size to content.** Default to a standard rows-per-page that fits the viewport without scrolling.
- Do not use pagination for infinite-scroll patterns — use a "Load more" button or intersection-observer-based loading instead.
- Pagination should update the URL (`?page=3`) so users can bookmark and share links to specific pages.

---

## Accessibility Notes

- Wrap the pagination in a `<nav aria-label="Pagination">` landmark.
- Current page item: `aria-current="page"` and `aria-disabled="true"` (it is not navigable).
- Page number links: `<a href="?page=N" aria-label="Page N">N</a>`.
- Prev/next: `<a href="?page=N" aria-label="Go to previous page">` / `"Go to next page"`.
- Disabled arrows (first/last page): use `aria-disabled="true"` and `tabindex="-1"` or a `<span>` instead of `<a>`.
- Overflow `…` button: `aria-label="More pages"` with `aria-haspopup` if it opens a list.
- Announce page changes via an `aria-live="polite"` region: e.g., "Showing page 3 of 24".

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Disable — not hide — prev/next at boundaries | Remove prev/next buttons on first/last page |
| Update the URL to reflect the current page | Keep pagination in a non-URL-reflected JS-only state |
| Show total page count for orientation | Show page numbers with no total count |
| Use `aria-current="page"` on current item | Use only visual styling to indicate current page |
| Announce page changes to screen readers | Silently replace table content without announcement |

---

## Example HTML Usage

```html
<!-- Pagination nav -->
<nav aria-label="Pagination" class="pagination pagination--medium">
  <!-- Previous -->
  <a
    href="/results?page=2"
    class="pagination__arrow pagination__arrow--prev"
    aria-label="Go to previous page"
  >
    <svg aria-hidden="true" focusable="false"><!-- left arrow --></svg>
  </a>

  <!-- Page 1 -->
  <a href="/results?page=1" class="pagination__item" aria-label="Page 1">1</a>

  <!-- Page 2 -->
  <a href="/results?page=2" class="pagination__item" aria-label="Page 2">2</a>

  <!-- Current page 3 -->
  <a
    href="/results?page=3"
    class="pagination__item pagination__item--current"
    aria-label="Page 3"
    aria-current="page"
  >3</a>

  <!-- Page 4 -->
  <a href="/results?page=4" class="pagination__item" aria-label="Page 4">4</a>

  <!-- Overflow -->
  <span class="pagination__overflow" aria-hidden="true">…</span>

  <!-- Last page -->
  <a href="/results?page=24" class="pagination__item" aria-label="Page 24">24</a>

  <!-- Next -->
  <a
    href="/results?page=4"
    class="pagination__arrow pagination__arrow--next"
    aria-label="Go to next page"
  >
    <svg aria-hidden="true" focusable="false"><!-- right arrow --></svg>
  </a>
</nav>

<!-- Live region for page change announcements -->
<div aria-live="polite" aria-atomic="true" class="sr-only" id="pagination-status">
  Showing page 3 of 24
</div>

<!-- Disabled prev (first page) -->
<span
  class="pagination__arrow pagination__arrow--prev pagination__arrow--disabled"
  aria-disabled="true"
  aria-label="Previous page (unavailable)"
>
  <svg aria-hidden="true" focusable="false"><!-- left arrow --></svg>
</span>
```
