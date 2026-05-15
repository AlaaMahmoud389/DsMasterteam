# Content Switcher

## Purpose
A segmented control that switches between two or more mutually exclusive views or content sections in-place. Used for toggling between related display modes (e.g., List vs. Grid, Day vs. Week vs. Month).

---

## Variants

| Component | Description |
|---|---|
| `Content Switcher` | The full container with all switch items |
| `_Content Switcher Item` | An individual selectable segment |

---

## Sizes

The component size is defined by the item height:
| Visual size | Description |
|---|---|
| Default | Matches the text size and padding of the items |

Item height scales with the spacing tokens applied to each item's padding.

---

## States

### Switcher Item
| State | Description |
|---|---|
| `Default` | Unselected segment |
| `Hovered` | Pointer over a non-selected segment |
| `Pressed` | Active click/tap |
| `Selected` | Active segment — filled/highlighted |
| `Focused` | Keyboard focus ring |
| `Disabled` | Segment cannot be selected |

---

## Tokens Used

| Property | Token |
|---|---|
| Container background | `semantic/background/neutral-100` |
| Container border | `semantic/action/neutral-subtle/border/default` |
| Selected item background | `semantic/background/Surface/Primary` |
| Selected item shadow | Effect style: `shadow/sm` |
| Selected text | `semantic/action/neutral-subtle/text/default` |
| Default text | `semantic/background/neutral-500` |
| Hovered background | `semantic/action/neutral-subtle/background/hover` |
| Focus ring | `component/button/primary/border/focused` |
| Border radius | `semantic/spacing/xs` |
| Item padding (horizontal) | `semantic/spacing/md` |

---

## Usage Rules

- **Use only for switching between equal-weight views** of the same underlying data or context. Do not use as primary navigation (use Tabs or a Sidebar for that).
- **Minimum 2 items; maximum 4–5 items.** For more than 5 segments, use a Dropdown or Tab component instead.
- **Exactly one item is always selected.** There is no "none selected" state — the default must be the most common view.
- **Keep item labels short** (1–2 words or a single icon). Long labels overflow and break the segmented appearance.
- **Icons with labels** are preferred over icon-only segments for clarity, unless the layout is very space-constrained and the icons are universally recognisable.
- Do not use Content Switcher to toggle settings on/off — use a Toggle Switch instead.

---

## Accessibility Notes

- Use `role="tablist"` on the container and `role="tab"` on each item, with `aria-selected="true/false"`.
- The associated content panels use `role="tabpanel"` with `aria-labelledby` pointing to the active tab's `id`.
- Keyboard navigation: left/right arrow keys move between segments; `Enter` / `Space` activates the focused segment.
- The selected tab should not require `Enter` to activate — arrow key movement should immediately switch the view (automatic activation pattern).
- Inactive panels must be hidden (`hidden` attribute or `display:none`) and removed from the accessibility tree.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Always have one item selected | Allow a state where nothing is selected |
| Use for view-mode toggles (Grid/List, Day/Week) | Use as primary navigation between pages |
| Keep labels 1–2 words | Use long descriptive phrases on each segment |
| Use `role="tablist"` + `role="tab"` | Implement as a group of radio buttons visually (semantics diverge) |
| Show the associated content panel immediately on activation | Require a separate "Apply" button to switch views |

---

## Example HTML Usage

```html
<!-- Content Switcher -->
<div class="content-switcher" role="tablist" aria-label="View mode">
  <button
    type="button"
    class="content-switcher__item content-switcher__item--selected"
    role="tab"
    id="tab-list"
    aria-selected="true"
    aria-controls="panel-list"
    tabindex="0"
  >
    <svg class="content-switcher__icon" aria-hidden="true" focusable="false"><!-- list icon --></svg>
    List
  </button>
  <button
    type="button"
    class="content-switcher__item"
    role="tab"
    id="tab-grid"
    aria-selected="false"
    aria-controls="panel-grid"
    tabindex="-1"
  >
    <svg class="content-switcher__icon" aria-hidden="true" focusable="false"><!-- grid icon --></svg>
    Grid
  </button>
  <button
    type="button"
    class="content-switcher__item"
    role="tab"
    id="tab-map"
    aria-selected="false"
    aria-controls="panel-map"
    tabindex="-1"
  >
    <svg class="content-switcher__icon" aria-hidden="true" focusable="false"><!-- map icon --></svg>
    Map
  </button>
</div>

<!-- Associated panels -->
<div id="panel-list" role="tabpanel" aria-labelledby="tab-list">
  <!-- List view content -->
</div>
<div id="panel-grid" role="tabpanel" aria-labelledby="tab-grid" hidden>
  <!-- Grid view content -->
</div>
<div id="panel-map" role="tabpanel" aria-labelledby="tab-map" hidden>
  <!-- Map view content -->
</div>

<script>
  const tabs = document.querySelectorAll('[role="tab"]');

  function activate(tab) {
    tabs.forEach(t => {
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
      document.getElementById(t.getAttribute('aria-controls')).hidden = true;
    });
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    document.getElementById(tab.getAttribute('aria-controls')).hidden = false;
    tab.focus();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') activate(tabs[(i + 1) % tabs.length]);
      if (e.key === 'ArrowLeft') activate(tabs[(i - 1 + tabs.length) % tabs.length]);
    });
  });
</script>
```
