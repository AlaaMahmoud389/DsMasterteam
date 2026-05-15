# Number Input

## Purpose
Accepts numeric values with optional increment/decrement controls. Used for quantities, counts, and bounded numeric settings where stepwise adjustment is helpful.

---

## Variants (Style)

| Style | Description |
|---|---|
| `Default` | Outlined field. General use. |
| `Filled lighter` | Subtle fill on white surfaces. |
| `Filled darker` | Stronger fill on light-grey surfaces. |

### Prefix/Suffix Control Styles
| Style | Description |
|---|---|
| `Solid` | Filled ± buttons with clear visual weight |
| `Subtle` | Low-contrast ± buttons that recede into the field |

---

## Sizes

| Size | Height | Use case |
|---|---|---|
| `Large` | 48 px | Prominent quantity selectors |
| `Medium` | 40 px | Forms, order lines, settings |

---

## States

### Field
| State | Description |
|---|---|
| `Default` | Resting, value visible |
| `Filled` | Value entered |
| `Hovered` | Border darkens |
| `Focused` | Primary border on the text field |
| `Read-only` | Value shown, not editable |
| `Disabled` | Non-interactive |
| `Error` | Out-of-range or invalid value |

### ± Controls (Input Prefix-Suffix)
| State | Description |
|---|---|
| `Default` | Resting |
| `Hovered` | Background lightens |
| `Pressed` | Background darkens |
| `Selected` | Active — button is held |
| `Focused` | Keyboard focus ring |
| `Disabled` | Cannot increment/decrement further (at min/max) |

---

## Tokens Used

| Property | Token |
|---|---|
| Border (default) | `semantic/action/neutral-subtle/border/default` |
| Border (focused) | `component/button/primary/border/focused` |
| Border (error) | `semantic/background/error` |
| Background | `semantic/background/Surface/Primary` |
| Control background (solid) | `semantic/background/neutral-100` |
| Control background (subtle) | `semantic/background/Surface/Primary` |
| Control icon (± symbol) | `semantic/action/neutral-subtle/icon/default` |
| Input text | `semantic/action/neutral-subtle/text/default` |
| Helper text | `semantic/background/neutral-400` |
| Error text | `semantic/background/error` |

---

## Usage Rules

- **Show both + and − controls** (`Prefix=True`, `Suffix=True`) whenever the field is in a context where stepwise adjustment is natural (carts, quantities).
- **Set explicit `min`, `max`, and `step` attributes.** Disable the − button at the minimum value and the + button at the maximum value.
- **Do not use Number Input for arbitrarily large numeric strings** (IDs, zip codes, card numbers) — use a standard Text Input with `inputmode="numeric"`.
- **Helper text** should state the allowed range (e.g., "1–99 items").
- **Solid style** is preferred for standalone quantity selectors. Use Subtle in dense table rows.

---

## Accessibility Notes

- Use `<input type="number">` with `min`, `max`, and `step` attributes.
- Increment/decrement buttons are `<button type="button">` with `aria-label="Increase quantity"` / `"Decrease quantity"`.
- The field and its controls should be grouped inside a `<div role="group" aria-label="Quantity">` when no visible label is present.
- On reaching min or max, disable the corresponding button and announce the boundary via `aria-describedby`.
- `inputmode="numeric"` on mobile shows the numeric keyboard without the browser's native spinner UI.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Disable ± buttons at the boundary values | Let users go below 0 for a quantity field |
| Display min/max in helper text | Silently reject out-of-range values without explanation |
| Use `step` to control increment size | Use a freeform number input where only certain values are valid (use Dropdown) |
| Label ± buttons accessibly | Use "+" / "−" text with no `aria-label` |

---

## Example HTML Usage

```html
<!-- Number input with +/- controls -->
<div class="number-input number-input--large">
  <label for="qty" class="number-input__label">Quantity</label>
  <div class="number-input__wrapper" role="group" aria-labelledby="qty-label">
    <button
      type="button"
      class="number-input__control number-input__control--minus number-input__control--solid"
      aria-label="Decrease quantity"
      aria-controls="qty"
    >
      <svg aria-hidden="true" focusable="false"><!-- minus icon --></svg>
    </button>
    <input
      type="number"
      id="qty"
      name="qty"
      class="number-input__field"
      value="1"
      min="1"
      max="99"
      step="1"
      inputmode="numeric"
      aria-describedby="qty-helper"
    />
    <button
      type="button"
      class="number-input__control number-input__control--plus number-input__control--solid"
      aria-label="Increase quantity"
      aria-controls="qty"
    >
      <svg aria-hidden="true" focusable="false"><!-- plus icon --></svg>
    </button>
  </div>
  <p id="qty-helper" class="number-input__helper">Between 1 and 99 items.</p>
</div>

<!-- Increment/decrement logic -->
<script>
  const input = document.getElementById('qty');
  const minus = input.previousElementSibling;
  const plus = input.nextElementSibling;

  function updateControls() {
    minus.disabled = input.valueAsNumber <= Number(input.min);
    plus.disabled = input.valueAsNumber >= Number(input.max);
  }

  minus.addEventListener('click', () => {
    input.stepDown();
    updateControls();
  });
  plus.addEventListener('click', () => {
    input.stepUp();
    updateControls();
  });
  input.addEventListener('input', updateControls);
  updateControls();
</script>
```
