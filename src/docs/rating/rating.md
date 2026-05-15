# Rating

## Purpose
Allows users to submit or view a star-based rating for a product, service, content item, or experience. Typically displayed as a 1–5 star scale.

---

## Variants

| Component | Description |
|---|---|
| `Rating` | The full interactive rating bar |
| `_RatingStar` | An individual star icon |

---

## Star States

| State | Description |
|---|---|
| `Empty` | Unselected / below current rating |
| `Filled` | Selected — within the current rating |
| `Hovered` | Stars fill up to the hovered star on pointer over |
| `Focused` | Keyboard focus ring on the current star |

---

## Tokens Used

| Property | Token |
|---|---|
| Star (filled) | `semantic/background/warning` |
| Star (empty) | `semantic/background/neutral-200` |
| Star (hovered) | `semantic/background/warning-100` |
| Focus ring | `component/button/primary/border/focused` |
| Label text | `semantic/action/neutral-subtle/text/default` |

---

## Usage Rules

- **For interactive rating**, each star is a button (or a radio input). The user's hover and selection update the filled star count in real time.
- **For display-only rating**, render the stars as static content with no hover or focus interaction (`aria-hidden` on decorative stars, with a textual label).
- **Default to a full 5-star scale.** Use a fixed scale — do not make the total configurable without a clear label indicating the scale.
- **Always pair with a numeric or label summary** (e.g., "4.2 out of 5", "4.2 (128 reviews)") so users who cannot distinguish the fill level can still read the value.
- **Allow clearing the rating** (deselecting all stars) if "no rating" is a valid state for the form.
- Avoid using the Rating component for non-star scales — use a Slider or Radio group instead.

---

## Accessibility Notes

- **Interactive rating**: Implement as a group of radio inputs (`role="radio"`) inside `role="radiogroup"` with an `aria-label` (e.g., "Rate this product").
- Each radio input has `aria-label="N star"` (or "N stars" for values > 1).
- **Display-only rating**: Use a single `<span>` with `aria-label="Rated 4.2 out of 5 stars"` and mark the SVG stars `aria-hidden="true"`.
- Keyboard: arrow keys move between stars in the radio group; `Enter` / `Space` selects.
- Do not rely on visual star fill alone — announce the numeric value.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Show a numeric summary alongside the star visual | Use stars alone without any accessible text value |
| Implement interactive stars as radio inputs | Use clickable `<div>`s as star buttons |
| Allow clearing the rating if empty is valid | Force users to always have at least 1 star selected |
| Use the same fixed scale (1–5) consistently | Change the scale between components in the same product |

---

## Example HTML Usage

```html
<!-- Interactive star rating -->
<fieldset class="rating" aria-label="Rate this product">
  <legend class="sr-only">Rating (out of 5)</legend>

  <div class="rating__stars" role="radiogroup" aria-label="Select a rating">
    <label class="rating__star">
      <input type="radio" name="product-rating" value="1" class="sr-only" />
      <svg class="rating__icon" aria-hidden="true" focusable="false"><!-- star --></svg>
      <span class="sr-only">1 star</span>
    </label>
    <label class="rating__star">
      <input type="radio" name="product-rating" value="2" class="sr-only" />
      <svg class="rating__icon" aria-hidden="true" focusable="false"><!-- star --></svg>
      <span class="sr-only">2 stars</span>
    </label>
    <label class="rating__star">
      <input type="radio" name="product-rating" value="3" class="sr-only" />
      <svg class="rating__icon" aria-hidden="true" focusable="false"><!-- star --></svg>
      <span class="sr-only">3 stars</span>
    </label>
    <label class="rating__star">
      <input type="radio" name="product-rating" value="4" class="sr-only" checked />
      <svg class="rating__icon rating__icon--filled" aria-hidden="true" focusable="false"><!-- star --></svg>
      <span class="sr-only">4 stars</span>
    </label>
    <label class="rating__star">
      <input type="radio" name="product-rating" value="5" class="sr-only" />
      <svg class="rating__icon" aria-hidden="true" focusable="false"><!-- star --></svg>
      <span class="sr-only">5 stars</span>
    </label>
  </div>
  <p class="rating__summary" aria-live="polite">4 out of 5 stars</p>
</fieldset>

<!-- Display-only rating (with review count) -->
<div class="rating rating--display">
  <span
    class="rating__visual"
    aria-label="Rated 4.2 out of 5 stars"
  >
    <svg class="rating__icon rating__icon--filled" aria-hidden="true" focusable="false"><!-- star --></svg>
    <svg class="rating__icon rating__icon--filled" aria-hidden="true" focusable="false"><!-- star --></svg>
    <svg class="rating__icon rating__icon--filled" aria-hidden="true" focusable="false"><!-- star --></svg>
    <svg class="rating__icon rating__icon--filled" aria-hidden="true" focusable="false"><!-- star --></svg>
    <svg class="rating__icon rating__icon--partial" aria-hidden="true" focusable="false"><!-- star --></svg>
  </span>
  <span class="rating__text">4.2 <span class="rating__count">(128 reviews)</span></span>
</div>
```
