# Avatar

## Purpose
Visually represents a user, entity, or account. Used in profiles, comment threads, navigation headers, lists, and anywhere a person or entity identity needs to be shown at a glance.

---

## Variants (Type)

| Type | Description |
|---|---|
| `Image` | Photo or uploaded image |
| `Initials` | 1–2 letter monogram when no image is available |
| `Icon` | Generic user icon when neither image nor name is available |

Additional variants:
- **`Avatar Group`** — stacked or inline row of multiple avatars
- **`Avatar label group`** — avatar with name and optional supporting text
- **`.Dot Indicators`** — presence/status badges overlaid on the avatar

---

## Sizes

| Size | Dimensions | Use case |
|---|---|---|
| `24px` | 24 × 24 px | Dense lists, breadcrumbs, inline mentions |
| `32px` | 32 × 32 px | Compact comment threads, table rows |
| `40px` | 40 × 40 px | Standard cards and feeds |
| `48px` | 48 × 48 px | Profile headers, modals |
| `64px` | 64 × 64 px | Profile pages, user settings |
| `80px` | 80 × 80 px | Account detail pages |
| `120px` | 120 × 120 px | Large profile views |

Shape: `Square=True` gives rounded-square corners; `Square=False` gives a full circle.

---

## Status Indicators (.Dot Indicators)

| Type | Meaning |
|---|---|
| `Online` | User is active / connected |
| `Away` | User is present but not active |
| `Offline` | User is not connected |
| `Notify` | Notification badge with a count |
| `Badge` | Custom badge (count or icon) |
| `Primary` | Branded accent indicator |

---

## Tokens Used

| Property | Token |
|---|---|
| Background (initials) | `semantic/background/primary-100` |
| Text (initials) | `semantic/background/primary-700` |
| Background (icon) | `semantic/background/neutral-100` |
| Icon color | `semantic/action/neutral-subtle/icon/default` |
| Border (with border) | `semantic/background/Surface/Primary` |
| Status: Online | `semantic/background/success` |
| Status: Away | `semantic/background/warning` |
| Status: Offline | `semantic/background/neutral-400` |
| Badge background | `semantic/background/error` |
| Badge text | `primitive/color/base/white` |
| Group overlap border | `semantic/background/Surface/Primary` |

---

## Usage Rules

- **Always define a fallback.** If an image fails to load, the component should fall back to `Initials`, then to `Icon`.
- **Use `Initials` before `Icon`** when the user's name is known. Initials aid recognition.
- **`Square` shape** is appropriate for brand entities, organisations, and bots. **Circle** is preferred for human users.
- **`Avatar Group` stacked** (`Stacked=True`) is the default — use unstacked only in horizontal toolbars with enough space.
- **Status indicators** must not be the only way to communicate availability — pair with a visible label in accessible contexts.
- **Do not enlarge avatars beyond `120px`** — use a dedicated image/media component for full-size profile photos.
- `Avatar label group` is the preferred pattern for rows or headers where the user's name is also visible.

---

## Accessibility Notes

- Avatar images must have `alt` text describing the person/entity (e.g., `alt="Ahmed Al-Rashidi"`). Decorative-only avatars use `alt=""`.
- Initials-based avatars: `aria-label="Ahmed Al-Rashidi"` on the container.
- Icon-only avatars with no associated name: `aria-label="Unknown user"` or `aria-hidden="true"` if the name is shown elsewhere.
- Status indicators need a visually hidden `<span>` (e.g., `<span class="sr-only">Online</span>`) for screen readers.
- Notification badges should expose their count: `aria-label="3 unread notifications"`.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Provide image alt text or aria-label | Leave avatars without any accessible name |
| Fall back to Initials, then Icon when image is unavailable | Show a broken image icon |
| Use circle for humans, square for organisations | Apply square shape to personal accounts |
| Use `Avatar label group` when the name must be legible | Use a small avatar alone when the context needs the full name |
| Add a screen-reader label to status indicators | Rely on colour alone (green dot) to communicate status |

---

## Example HTML Usage

```html
<!-- Image avatar -->
<div class="avatar avatar--40px avatar--circle">
  <img
    src="/avatars/ahmed.jpg"
    alt="Ahmed Al-Rashidi"
    class="avatar__image"
    width="40"
    height="40"
  />
</div>

<!-- Initials avatar with status -->
<div class="avatar avatar--40px avatar--circle" aria-label="Sara Khalid">
  <span class="avatar__initials" aria-hidden="true">SK</span>
  <span class="avatar__status avatar__status--online" role="img" aria-label="Online"></span>
</div>

<!-- Icon fallback -->
<div class="avatar avatar--40px avatar--circle" aria-label="Unknown user">
  <svg class="avatar__icon" aria-hidden="true" focusable="false"><!-- person icon --></svg>
</div>

<!-- Avatar with label group -->
<div class="avatar-label-group avatar-label-group--md">
  <div class="avatar avatar--40px avatar--circle">
    <img src="/avatars/omar.jpg" alt="" aria-hidden="true" width="40" height="40" />
  </div>
  <div class="avatar-label-group__text">
    <p class="avatar-label-group__name">Omar Nasser</p>
    <p class="avatar-label-group__sub">omar@example.com</p>
  </div>
</div>

<!-- Avatar group (stacked) -->
<div class="avatar-group" aria-label="4 team members: Ahmed, Sara, Omar, and 1 more">
  <div class="avatar avatar--32px avatar--circle">
    <img src="/avatars/ahmed.jpg" alt="Ahmed" width="32" height="32" />
  </div>
  <div class="avatar avatar--32px avatar--circle">
    <img src="/avatars/sara.jpg" alt="Sara" width="32" height="32" />
  </div>
  <div class="avatar avatar--32px avatar--circle" aria-label="+1 more">
    <span class="avatar__initials" aria-hidden="true">+1</span>
  </div>
</div>

<!-- Notification badge -->
<div class="avatar avatar--40px avatar--circle" aria-label="Ahmed Al-Rashidi, 3 notifications">
  <img src="/avatars/ahmed.jpg" alt="" aria-hidden="true" width="40" height="40" />
  <span class="avatar__badge" aria-hidden="true">3</span>
</div>
```
