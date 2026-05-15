# Menu

## Purpose
A floating list of contextual actions or options that appears on demand, typically triggered by a button or right-click. Used for context menus, action menus, and navigation overflow lists.

---

## Variants

| Component | Description |
|---|---|
| `Menu` | The full menu panel (container + list of items) |
| `Menu list item` | An individual option within the menu |

---

## Menu List Item Types

| Type variant | Description |
|---|---|
| Default (text only) | Label-only item |
| With leading icon | Icon + label |
| With trailing icon/badge | Label + trailing element |
| Destructive | Red-coloured item for dangerous actions |
| Disabled | Non-selectable item |
| Divider | Visual separator between groups |
| Group header | Non-interactive label for a group of items |

---

## States

### Menu Item
| State | Description |
|---|---|
| `Default` | Resting |
| `Hovered` | Pointer over item — background highlight |
| `Pressed` | Active click/tap |
| `Focused` | Keyboard focus |
| `Selected` | Checkmark visible for toggleable items |
| `Disabled` | Non-interactive; reduced opacity |

---

## Tokens Used

| Property | Token |
|---|---|
| Menu background | `semantic/background/Surface/Primary` |
| Menu border | `semantic/action/neutral-subtle/border/default` |
| Menu shadow | Effect style: `shadow/lg` |
| Item background (default) | Transparent |
| Item background (hovered) | `semantic/action/neutral-subtle/background/hover` |
| Item background (focused) | `semantic/action/neutral-subtle/background/focused` |
| Item text (default) | `semantic/action/neutral-subtle/text/default` |
| Item text (destructive) | `semantic/background/error` |
| Item text (disabled) | `semantic/background/neutral-300` |
| Item icon | `semantic/action/neutral-subtle/icon/default` |
| Divider | `semantic/action/neutral-subtle/border/default` |
| Border radius (menu) | `semantic/spacing/sm` |
| Padding (item) | `semantic/spacing/xs` `semantic/spacing/md` |

---

## Usage Rules

- **Trigger menus from a Button, icon button, or right-click** — never reveal them without a clear trigger.
- **Close the menu on:**  item selection, Escape key, click outside the menu, or focus moving out.
- **Limit to 8–10 items.** More items indicate the content should be restructured into a dedicated page or section.
- **Use dividers** to group logically related actions. Each group should have 2–5 items.
- **Destructive items** (Delete, Remove, Revoke) must be placed at the bottom of the list, separated by a divider.
- **Do not nest menus more than one level** (a single sub-menu is acceptable; deeper nesting is not).
- **Position** the menu below and left-aligned with the trigger by default. Reposition automatically when the menu would clip the viewport.

---

## Accessibility Notes

- The trigger button has `aria-haspopup="menu"` and `aria-expanded="true/false"` and `aria-controls="[menu-id]"`.
- The menu container has `role="menu"`.
- Each item: `role="menuitem"`, `role="menuitemcheckbox"` (for toggleable items), or `role="menuitemradio"`.
- Group headers: `role="group"` with `aria-label`.
- Keyboard navigation: arrow keys move between items; `Enter` / `Space` activates; `Escape` closes; `Home` / `End` jump to first/last item.
- When closed, focus returns to the trigger.
- Do not put interactive elements inside menu items — the item itself is the interactive element.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Return focus to trigger on close | Drop focus to document body on menu close |
| Use `role="menu"` + `role="menuitem"` | Use `<ul>` + `<li>` without ARIA roles |
| Place destructive actions at the bottom | Mix destructive and safe actions without a divider |
| Close on Escape and outside-click | Keep menu open until an item is explicitly selected |
| Limit to 8–10 items | Create menus with 20+ items |

---

## Example HTML Usage

```html
<!-- Menu trigger -->
<button
  type="button"
  class="btn btn--neutral btn--medium"
  id="actions-trigger"
  aria-haspopup="menu"
  aria-expanded="false"
  aria-controls="actions-menu"
>
  Actions
  <svg aria-hidden="true" focusable="false"><!-- chevron --></svg>
</button>

<!-- Menu panel -->
<ul
  id="actions-menu"
  role="menu"
  class="menu"
  aria-labelledby="actions-trigger"
  hidden
>
  <!-- Group: Edit actions -->
  <li role="none" class="menu__group-header" aria-hidden="true">Edit</li>

  <li role="none">
    <button type="button" role="menuitem" class="menu__item">
      <svg class="menu__icon" aria-hidden="true" focusable="false"><!-- edit icon --></svg>
      Edit
    </button>
  </li>
  <li role="none">
    <button type="button" role="menuitem" class="menu__item">
      <svg class="menu__icon" aria-hidden="true" focusable="false"><!-- copy icon --></svg>
      Duplicate
    </button>
  </li>
  <li role="none">
    <button type="button" role="menuitem" class="menu__item">
      <svg class="menu__icon" aria-hidden="true" focusable="false"><!-- move icon --></svg>
      Move to folder
    </button>
  </li>

  <!-- Divider -->
  <li role="separator" class="menu__divider" aria-hidden="true"></li>

  <!-- Destructive action -->
  <li role="none">
    <button
      type="button"
      role="menuitem"
      class="menu__item menu__item--destructive"
    >
      <svg class="menu__icon" aria-hidden="true" focusable="false"><!-- trash icon --></svg>
      Delete
    </button>
  </li>
</ul>

<script>
  const trigger = document.getElementById('actions-trigger');
  const menu = document.getElementById('actions-menu');
  const items = () => [...menu.querySelectorAll('[role="menuitem"]')];

  function open() {
    menu.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    items()[0]?.focus();
  }
  function close() {
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus();
  }

  trigger.addEventListener('click', () => menu.hidden ? open() : close());
  document.addEventListener('click', e => { if (!menu.contains(e.target) && e.target !== trigger) close(); });

  menu.addEventListener('keydown', e => {
    const list = items();
    const i = list.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); list[(i + 1) % list.length].focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); list[(i - 1 + list.length) % list.length].focus(); }
    if (e.key === 'Escape') close();
    if (e.key === 'Home') { e.preventDefault(); list[0].focus(); }
    if (e.key === 'End') { e.preventDefault(); list[list.length - 1].focus(); }
  });
</script>
```
