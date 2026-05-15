# Link

## Purpose
Navigates the user to another page, section, or resource. Links are distinct from Buttons — they represent destinations, not actions.

---

## Variants

| Style | Description |
|---|---|
| `Primary` | Brand-coloured link. Default for most navigation contexts. |
| `Neutral` | Low-contrast link that blends with body text. Use in dense editorial content. |
| `On-color` | White or light-coloured link for use on dark/branded backgrounds. |

---

## Sizes

| Size | Use case |
|---|---|
| `Medium` | Default — standalone navigation links, menus |
| `Small` | Body copy inline links, footnotes, help text |

---

## States

| State | Description |
|---|---|
| `Default` | Resting — underline optional per context |
| `Hovered` | Underline appears; colour shifts |
| `Pressed` | Darkened/active colour |
| `Focused` | Visible focus ring (keyboard) |
| `Visited` | Indicates the destination has been viewed before |
| `Disabled` | Non-interactive; use sparingly — prefer removing the link |

---

## Tokens Used

| Property | Token |
|---|---|
| Text (primary default) | `component/button/primary/text/default` |
| Text (neutral default) | `semantic/action/neutral-subtle/text/default` |
| Text (hovered) | `component/button/Transparent/text/hovered` |
| Focus ring | `component/button/primary/border/focused` |
| Disabled text | `semantic/background/neutral-400` |

---

## Usage Rules

- **Use `<a href="...">` for all navigation.** If the element triggers a JS action without changing the URL, use a `<button>` styled as a link instead.
- **Inline links** (`Inline=True`) live within a sentence and inherit the surrounding font size. They always show an underline for discoverability.
- **Standalone links** can suppress the underline at rest if the link colour provides sufficient contrast (≥ 3:1 against surrounding text).
- **Do not open internal links in a new tab** without warning the user. External links in a new tab must have `target="_blank" rel="noopener noreferrer"` and a visual indicator.
- **Visited state** should be applied consistently. Do not suppress it for primary navigation links.
- **Pair with an icon** (`Icon=True`) to indicate external links (`↗`) or file downloads. Always place the icon after the text.

---

## Accessibility Notes

- Link text must describe the destination — avoid "click here", "read more", or bare URLs as labels.
- If the same label is used for multiple links (e.g., "Read more"), differentiate them with `aria-label` or visually hidden text.
- External links opening in a new tab must announce this to screen readers: `aria-label="Annual Report (opens in new tab)"` or include a visually hidden `<span>`.
- `Disabled` links must not use `href="#"` or `javascript:void(0)`. Remove the `href` attribute and add `aria-disabled="true"` so the element remains focusable with proper semantics.
- Ensure link colour contrast against the background is ≥ 4.5:1 (WCAG 1.4.3).

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use `<a>` for navigation to a URL | Use `<a>` for buttons that trigger JS actions |
| Write descriptive link text ("View invoice") | Use vague labels ("Click here", "More") |
| Warn users before opening a new tab | Silently open new tabs without notice |
| Use the `Inline` variant inside paragraphs | Use the standalone variant mid-sentence |
| Apply `Visited` state to navigation links | Disable visited state entirely |

---

## Example HTML Usage

```html
<!-- Primary standalone link -->
<a href="/dashboard" class="link link--primary link--medium">
  Go to Dashboard
</a>

<!-- Neutral inline link (within paragraph) -->
<p>
  Learn more about our
  <a href="/privacy" class="link link--neutral link--small link--inline">
    privacy policy
  </a>
  before submitting.
</p>

<!-- External link with icon and new-tab warning -->
<a
  href="https://example.com"
  class="link link--primary link--medium"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Official documentation (opens in new tab)"
>
  Official documentation
  <svg class="link__icon" aria-hidden="true" focusable="false"><!-- external icon --></svg>
</a>

<!-- On-color link for dark backgrounds -->
<a href="/help" class="link link--on-color link--medium">
  Help &amp; Support
</a>

<!-- Disabled link -->
<a
  class="link link--primary link--medium link--disabled"
  aria-disabled="true"
  tabindex="0"
>
  Download Report
</a>

<!-- RTL layout -->
<a href="/ar/dashboard" class="link link--primary link--medium" dir="rtl">
  الذهاب إلى لوحة التحكم
</a>
```
