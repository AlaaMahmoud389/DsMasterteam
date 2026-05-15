# Breadcrumb

## Purpose
Shows the user their current location within the application's navigational hierarchy and provides quick links back to parent pages. Helps orient users in deep navigation structures.

---

## Variants (Levels)

| Levels | Description |
|---|---|
| `2` | Root → Current |
| `3` | Root → Middle → Current |
| `4` | Root → 2× Middle → Current |
| `5` | Root → 3× Middle → Current |
| `>5` | Root → Overflow (collapsed middles) → Current |

### Item Types
| Type | Description |
|---|---|
| `Root` | First item — always the home/top-level anchor |
| `Middle` | Intermediate navigable pages |
| `Middle-overflow` | Collapsed middle items replaced by `…` |
| `Middle-overflow open` | Expanded overflow showing hidden items |
| `Current` | Active page — not a link; indicates where you are |

---

## Appearance Options

| Option | Description |
|---|---|
| `with icon` | Leading icon on each item |
| `With background` | Pill background on each item |
| `With Border` | Bordered container around the full breadcrumb |
| `RTL` | Arabic / right-to-left layout |

---

## Tokens Used

| Property | Token |
|---|---|
| Item text (link) | `component/button/Transparent/text/default` |
| Item text (current) | `semantic/action/neutral-subtle/text/default` |
| Item text (hovered) | `component/button/Transparent/text/hovered` |
| Separator icon | `semantic/background/neutral-400` |
| Background (With background) | `semantic/background/neutral-100` |
| Border (With Border) | `semantic/action/neutral-subtle/border/default` |
| Overflow icon | `semantic/action/neutral-subtle/icon/default` |
| Border radius (background) | `semantic/spacing/xs` |
| Spacing between items | `semantic/spacing/xs` |

---

## Usage Rules

- **Always include the `Root` item** (typically "Home" or the app name). Never start a breadcrumb with the current page.
- **`Current` item must not be a link** — it represents where the user is, not where they can go.
- **Use `>5` overflow** for hierarchies deeper than 5 levels. Collapsing middle items prevents line wrapping and keeps the breadcrumb scannable.
- **Breadcrumbs are supplementary navigation** — they do not replace primary navigation or in-page back buttons. Do not use on top-level pages (level 1 = Home).
- **Use `with icon` sparingly** — only when icons add recognition value at each level (e.g., folder icons in a file tree).
- Breadcrumbs should be placed between the page header and the main content, not inside navigation bars.

---

## Accessibility Notes

- Wrap the entire breadcrumb in `<nav aria-label="Breadcrumb">`.
- Use an ordered list `<ol>` — the sequence matters.
- Each item is an `<li>`. Linked items use `<a href="...">`. The current item uses `<span aria-current="page">`.
- For overflow (`…`), the trigger button must have `aria-label="Show more breadcrumb items"` and `aria-expanded`.
- Separators (`/` or `›`) are decorative — mark them `aria-hidden="true"`.
- Ensure link text is descriptive enough to make sense out of context.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Mark current page with `aria-current="page"` | Make the current item a link |
| Use `<nav aria-label="Breadcrumb">` wrapper | Use a `<div>` without semantic landmark |
| Collapse deep hierarchies with overflow | Let the breadcrumb wrap to multiple lines |
| Show breadcrumb on level 2+ pages | Show breadcrumb on the home page (level 1) |
| Use separators that are `aria-hidden` | Include separator characters in link text |

---

## Example HTML Usage

```html
<!-- 3-level breadcrumb -->
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb__item">
      <a href="/" class="breadcrumb__link">Home</a>
      <svg class="breadcrumb__separator" aria-hidden="true" focusable="false"><!-- chevron --></svg>
    </li>
    <li class="breadcrumb__item">
      <a href="/projects" class="breadcrumb__link">Projects</a>
      <svg class="breadcrumb__separator" aria-hidden="true" focusable="false"><!-- chevron --></svg>
    </li>
    <li class="breadcrumb__item breadcrumb__item--current">
      <span aria-current="page">Dashboard Redesign</span>
    </li>
  </ol>
</nav>

<!-- >5 levels with overflow (collapsed) -->
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb__item">
      <a href="/" class="breadcrumb__link">Home</a>
      <svg class="breadcrumb__separator" aria-hidden="true" focusable="false"><!-- chevron --></svg>
    </li>
    <li class="breadcrumb__item breadcrumb__item--overflow">
      <button
        type="button"
        class="breadcrumb__overflow-toggle"
        aria-label="Show more breadcrumb items"
        aria-expanded="false"
        aria-controls="breadcrumb-overflow"
      >
        <svg aria-hidden="true" focusable="false"><!-- ellipsis icon --></svg>
      </button>
      <!-- Hidden middle items -->
      <ol id="breadcrumb-overflow" class="breadcrumb__overflow-list" hidden>
        <li><a href="/org" class="breadcrumb__link">Organisation</a></li>
        <li><a href="/org/team" class="breadcrumb__link">Team</a></li>
        <li><a href="/org/team/workspace" class="breadcrumb__link">Workspace</a></li>
      </ol>
      <svg class="breadcrumb__separator" aria-hidden="true" focusable="false"><!-- chevron --></svg>
    </li>
    <li class="breadcrumb__item">
      <a href="/projects" class="breadcrumb__link">Projects</a>
      <svg class="breadcrumb__separator" aria-hidden="true" focusable="false"><!-- chevron --></svg>
    </li>
    <li class="breadcrumb__item breadcrumb__item--current">
      <span aria-current="page">Dashboard Redesign</span>
    </li>
  </ol>
</nav>

<!-- RTL breadcrumb -->
<nav aria-label="مسار التنقل" dir="rtl" lang="ar">
  <ol class="breadcrumb">
    <li class="breadcrumb__item">
      <a href="/" class="breadcrumb__link">الرئيسية</a>
      <svg class="breadcrumb__separator" aria-hidden="true" focusable="false"><!-- RTL chevron --></svg>
    </li>
    <li class="breadcrumb__item breadcrumb__item--current">
      <span aria-current="page">المشاريع</span>
    </li>
  </ol>
</nav>
```
