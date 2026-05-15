# Skeleton

## Purpose
A placeholder loading state that mimics the shape of the content about to load. Reduces perceived load time by showing the layout structure immediately, before data arrives.

---

## Variants

| Component | Description |
|---|---|
| `Skeleton Line` | Narrow horizontal bar — replaces a text line |
| `Skeleton Rectangle` | Wide flat block — replaces a card or image |
| `Skeleton Square` | Equal-width/height block — replaces a thumbnail or avatar image |
| `Skeleton Circle` | Circular shape — replaces an avatar or icon |
| `Skeleton Component` | Composed multi-shape placeholder matching a specific component layout |

---

## Sizes

### Skeleton Circle
| Size | Dimensions |
|---|---|
| `24px` | 24 × 24 px |
| `48px` | 48 × 48 px |
| `64px` | 64 × 64 px |
| `80px` | 80 × 80 px |
| `120px` | 120 × 120 px |
| `170px` | 170 × 170 px |
| `240px` | 240 × 240 px |

### Skeleton Square
| Size | Dimensions |
|---|---|
| `24px` | 24 × 24 px |
| `48px` | 48 × 48 px |
| `64px` | 64 × 64 px |
| `80px` | 80 × 80 px |
| `120px` | 120 × 120 px |
| `240px` | 240 × 240 px |
| `282px-Card` | 282 × 282 px |

Lines and Rectangles scale to their container width.

---

## Animation States

| State | Description |
|---|---|
| `Start` | Beginning of shimmer animation (light end) |
| `End` | End of shimmer animation (dark phase) |

The animation cycles continuously between Start and End (shimmer/wave effect).

---

## Tokens Used

| Property | Token |
|---|---|
| Skeleton base colour | `semantic/background/neutral-100` |
| Shimmer highlight | `semantic/background/neutral-200` |
| Border radius (Line/Rectangle) | `semantic/spacing/xs` |
| Border radius (Circle) | `50%` (full) |
| Border radius (Square) | `semantic/spacing/xs` |

---

## Usage Rules

- **Match the skeleton shapes to the actual content.** A skeleton Line replaces a text line; a skeleton Circle replaces an avatar. Do not use a generic rectangle for everything.
- **Use `Skeleton Component`** when a whole component (e.g., a card, a list item) needs a composed placeholder.
- **Limit skeleton screens to the first load.** After content has loaded once (and is cached), show a Loading spinner for refresh actions instead.
- **Do not use skeletons for instant operations** (< 300 ms). A skeleton that flashes in and out creates visual noise.
- **Skeletons should not exceed 2–3 seconds.** If loading takes longer, add a "Still loading…" message or a progress indicator.
- Keep the number of skeleton shapes consistent with the real content — do not show 5 skeleton lines if the real content has 2 lines.

---

## Accessibility Notes

- The skeleton container must have `aria-busy="true"` on the parent region while loading.
- Individual skeleton shapes are `aria-hidden="true"` — they convey no information to screen readers.
- Provide a meaningful `aria-label` on the loading region: `<div aria-label="Loading user list" aria-busy="true" role="status">`.
- When content loads, remove `aria-busy` and update the live region.
- Respect `prefers-reduced-motion` — replace the shimmer animation with a static grey placeholder when motion is reduced.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Match skeleton shapes to actual content layout | Use a single rectangle for every content type |
| Set `aria-busy="true"` on the loading region | Make skeleton shapes focusable or interactive |
| Respect `prefers-reduced-motion` | Animate skeletons without motion preference check |
| Remove skeletons immediately when content loads | Leave skeletons visible after data arrives |
| Use `Skeleton Component` for card/row composites | Manually assemble skeletons from Lines for every card |

---

## Example HTML Usage

```html
<!-- Loading user list (skeleton rows) -->
<ul
  class="user-list"
  role="list"
  aria-label="Loading team members"
  aria-busy="true"
>
  <!-- Skeleton row -->
  <li class="user-list__item" aria-hidden="true">
    <div class="skeleton skeleton--circle skeleton--40px"></div>
    <div class="user-list__text">
      <div class="skeleton skeleton--line" style="width: 60%; height: 14px;"></div>
      <div class="skeleton skeleton--line" style="width: 40%; height: 12px; margin-top: 6px;"></div>
    </div>
  </li>
  <li class="user-list__item" aria-hidden="true">
    <div class="skeleton skeleton--circle skeleton--40px"></div>
    <div class="user-list__text">
      <div class="skeleton skeleton--line" style="width: 55%; height: 14px;"></div>
      <div class="skeleton skeleton--line" style="width: 35%; height: 12px; margin-top: 6px;"></div>
    </div>
  </li>
</ul>

<!-- Skeleton card -->
<div
  class="card card--shadow"
  aria-label="Loading project card"
  aria-busy="true"
>
  <div class="skeleton skeleton--rectangle" style="height: 180px;" aria-hidden="true"></div>
  <div class="card__body" aria-hidden="true">
    <div class="skeleton skeleton--line" style="width: 70%; height: 16px;"></div>
    <div class="skeleton skeleton--line" style="width: 50%; height: 14px; margin-top: 8px;"></div>
    <div class="skeleton skeleton--line" style="width: 90%; height: 14px; margin-top: 6px;"></div>
  </div>
</div>

<style>
  .skeleton {
    background: var(--semantic-background-neutral-100);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }
  .skeleton::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--semantic-background-neutral-200) 50%,
      transparent 100%
    );
    animation: shimmer 1.5s infinite;
  }
  @keyframes shimmer {
    from { transform: translateX(-100%); }
    to { transform: translateX(100%); }
  }
  @media (prefers-reduced-motion: reduce) {
    .skeleton::after { animation: none; }
  }
  .skeleton--circle { border-radius: 50%; }
  .skeleton--40px { width: 40px; height: 40px; }
</style>
```
