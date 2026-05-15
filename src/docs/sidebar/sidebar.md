# Sidebar

## Purpose
A persistent or collapsible vertical navigation panel anchored to the left (or right in RTL) of the layout. Provides primary application navigation, workspace switching, and quick access to key sections.

---

## Variants

| Component | Description |
|---|---|
| `Sidebar` | The full navigation panel |
| `Saidebar Header` (Sidebar Header) | Top section of the sidebar — logo and workspace name |
| `_Nav featured card` | Highlighted card within the sidebar for featured content |
| `Logo` | Brand logomark for the sidebar header |

---

## States

### Sidebar Item
| State | Description |
|---|---|
| `Default` | Resting nav item |
| `Hovered` | Pointer over item |
| `Active / Selected` | Currently active page — highlighted |
| `Focused` | Keyboard focus ring |
| `Disabled` | Item not available in current context |
| `Collapsed` | Sidebar is icon-only (collapsed mode) |

---

## Tokens Used

| Property | Token |
|---|---|
| Background | `semantic/background/neutral-950` (dark) or `semantic/background/Surface/Primary` (light) |
| Item background (active) | `semantic/background/primary-700` |
| Item background (hovered) | `semantic/action/neutral-subtle/background/hover` |
| Item text | `primitive/color/base/white` (dark sidebar) |
| Item text (active) | `primitive/color/base/white` |
| Item icon | `primitive/color/base/white` |
| Header background | `semantic/background/neutral-800` |
| Logo mark | `primitive/color/base/white` |
| Divider | `semantic/background/neutral-700` |
| Focus ring | `component/button/primary/border/focused` |
| Width (expanded) | 240–280 px |
| Width (collapsed) | 64 px |
| Padding (item) | `semantic/spacing/sm` `semantic/spacing/md` |

---

## Usage Rules

- **Use the Sidebar for global/primary application navigation.** Content-level or section-level navigation should use Tabs or a Content Switcher instead.
- **Active item** must always be visually distinct — not just from hover, but persistently. Use the `Active/Selected` state and `aria-current="page"`.
- **Collapsible sidebars** should preserve the active item's icon in the collapsed state and show tooltip labels on hover.
- **Group nav items** with labelled sections (group headers) for applications with more than 8–10 navigation items.
- **The sidebar header** should always show the product logo or wordmark. On multi-tenant apps, show the workspace name and a switcher.
- **Avoid placing primary actions** (Create, Submit) inside the sidebar — those belong in the main content area.
- On mobile, the sidebar must be replaced with a drawer (overlay) pattern triggered by a hamburger button.

---

## Accessibility Notes

- Wrap the sidebar in `<nav aria-label="Main navigation">`.
- Use `<ul>` / `<li>` for nav item lists.
- The currently active nav link gets `aria-current="page"`.
- Collapsible sidebar toggle button: `aria-expanded="true/false"` and `aria-label="Collapse navigation"` / `"Expand navigation"`.
- When collapsed (icon-only), each nav item must have a `title` attribute and a tooltip — the icon alone is not sufficient without a text label accessible to screen readers.
- Group headers: `<li role="presentation">` with a visible label; items inside use `<a>` or `<button>`.
- Sub-navigation disclosure buttons: `aria-expanded` and `aria-controls`.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Mark active page with `aria-current="page"` | Use only visual styling to show the active item |
| Show tooltips on collapsed icon-only items | Leave icon-only items without accessible labels |
| Group items with labelled sections for long nav lists | Dump 15 items in an ungrouped flat list |
| Collapse to an icon-only strip with a toggle | Remove the sidebar entirely on resize without a replacement |
| Use `<nav aria-label="Main navigation">` | Use a `<div>` for the navigation landmark |

---

## Example HTML Usage

```html
<!-- Application sidebar -->
<nav aria-label="Main navigation" class="sidebar">
  <!-- Header -->
  <div class="sidebar__header">
    <div class="sidebar__logo" aria-hidden="true">
      <svg><!-- Logomark --></svg>
    </div>
    <span class="sidebar__workspace">Masterteam</span>
    <button
      type="button"
      class="sidebar__collapse-btn"
      aria-label="Collapse navigation"
      aria-expanded="true"
      aria-controls="sidebar-nav"
    >
      <svg aria-hidden="true" focusable="false"><!-- collapse icon --></svg>
    </button>
  </div>

  <!-- Navigation items -->
  <ul id="sidebar-nav" class="sidebar__nav" role="list">
    <li>
      <a
        href="/dashboard"
        class="sidebar__item sidebar__item--active"
        aria-current="page"
      >
        <svg class="sidebar__icon" aria-hidden="true" focusable="false"><!-- dashboard icon --></svg>
        <span class="sidebar__label">Dashboard</span>
      </a>
    </li>
    <li>
      <a href="/projects" class="sidebar__item">
        <svg class="sidebar__icon" aria-hidden="true" focusable="false"><!-- projects icon --></svg>
        <span class="sidebar__label">Projects</span>
      </a>
    </li>

    <!-- Group with section label -->
    <li class="sidebar__group" role="none">
      <span class="sidebar__group-label" id="manage-label">Manage</span>
      <ul role="list" aria-labelledby="manage-label">
        <li>
          <a href="/team" class="sidebar__item">
            <svg class="sidebar__icon" aria-hidden="true" focusable="false"><!-- team icon --></svg>
            <span class="sidebar__label">Team</span>
          </a>
        </li>
        <li>
          <a href="/settings" class="sidebar__item">
            <svg class="sidebar__icon" aria-hidden="true" focusable="false"><!-- settings icon --></svg>
            <span class="sidebar__label">Settings</span>
          </a>
        </li>
      </ul>
    </li>
  </ul>
</nav>

<!-- Mobile sidebar (drawer overlay) -->
<button
  type="button"
  class="sidebar__mobile-trigger"
  aria-label="Open navigation menu"
  aria-expanded="false"
  aria-controls="mobile-sidebar"
>
  <svg aria-hidden="true" focusable="false"><!-- hamburger icon --></svg>
</button>

<div
  id="mobile-sidebar"
  class="sidebar sidebar--mobile"
  role="dialog"
  aria-label="Navigation menu"
  aria-modal="true"
  hidden
>
  <!-- Same nav content -->
</div>
<div class="sidebar__backdrop" hidden aria-hidden="true"></div>
```
