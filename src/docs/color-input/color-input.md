# Color Input

## Purpose
Lets users select a colour value via a colour picker panel. Returns a hex code, RGB, or HSL value. Used in theming, design, and customisation workflows.

---

## Variants (Style)

| Style | Description |
|---|---|
| `Default` | Outlined trigger field. General use. |
| `Filled lighter` | Subtle fill on white surfaces. |
| `Filled darker` | Stronger fill on light-grey surfaces. |

### Internal Components
| Component | Description |
|---|---|
| `Color Space` | 2-D saturation/brightness picker |
| `Hue` | Horizontal hue slider (0–360°) |
| `Color code` | Hex/RGB/HSL text input |
| `Color Picker` | Composed panel: colour space + hue + code input |

---

## Sizes

The trigger field follows the standard input sizes:
| Size | Height |
|---|---|
| `Large` | 48 px |
| `Medium` | 40 px |

---

## States

| State | Description |
|---|---|
| `Default` | Resting — shows "Select Color" placeholder |
| `Filled` | Colour chosen — shows colour swatch + hex value (e.g., `#7B52ED`) |
| `Hovered` | Border darkens |
| `Focused` | Primary border on the trigger |
| `Read-only` | Colour visible, cannot be changed |
| `Disabled` | Non-interactive |
| `Error` | Invalid or required-but-empty |

---

## Tokens Used

| Property | Token |
|---|---|
| Trigger border (default) | `semantic/action/neutral-subtle/border/default` |
| Trigger border (focused) | `component/button/primary/border/focused` |
| Trigger border (error) | `semantic/background/error` |
| Trigger background | `semantic/background/Surface/Primary` |
| Colour swatch border | `semantic/background/neutral-200` |
| Placeholder text | `semantic/background/neutral-400` |
| Hex code text | `semantic/action/neutral-subtle/text/default` |
| Helper text | `semantic/background/neutral-400` |
| Error text | `semantic/background/error` |

---

## Usage Rules

- **Always show the hex code** in the trigger once a colour is selected, alongside the colour swatch — hex values help users verify exact selections.
- **Picker panel** should open in a popover positioned below the trigger by default, repositioning to the top if viewport space is insufficient.
- **Support hex input directly** in the `Color code` text field — many users know their exact hex values.
- **Validate hex codes** in real time. A malformed hex should show an error inline in the colour code field, not on the trigger.
- **Prefix slot** defaults to a coloured swatch showing the current value. Do not remove it.
- This component is specialised — use it only when the exact colour value is meaningful. For limited palette choices, use a chip group or radio buttons with colour swatches.

---

## Accessibility Notes

- The trigger opens a popover — use `aria-haspopup="dialog"` and `aria-expanded` on the trigger button.
- The colour picker dialog needs `role="dialog"` with `aria-label="Colour picker"`.
- Hue and saturation/brightness sliders should be `<input type="range">` so keyboard users can operate them.
- The hex code text field should accept keyboard input with live validation.
- Communicate the current colour value to screen readers via `aria-valuenow` on sliders, and announce the hex code when confirmed.
- Do not rely on colour alone to communicate the selected state — always pair the swatch with the hex text.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Show hex code alongside the swatch in the trigger | Show only the swatch with no text value |
| Allow direct hex input in the code field | Force users to drag sliders to reach specific colours |
| Validate hex input in real time | Block submission only at form level for invalid colours |
| Position the picker panel to avoid viewport clipping | Let the panel clip offscreen on small viewports |

---

## Example HTML Usage

```html
<!-- Color input trigger -->
<div class="color-input color-input--large">
  <label for="brand-color" class="color-input__label">Brand colour</label>
  <div class="color-input__wrapper">
    <button
      type="button"
      id="brand-color"
      class="color-input__trigger"
      aria-haspopup="dialog"
      aria-expanded="false"
      aria-controls="brand-color-picker"
      aria-describedby="brand-color-helper"
    >
      <span
        class="color-input__swatch"
        style="background-color: #7B52ED"
        aria-hidden="true"
      ></span>
      <span class="color-input__value">#7B52ED</span>
      <svg class="color-input__chevron" aria-hidden="true" focusable="false"><!-- chevron --></svg>
    </button>
  </div>
  <p id="brand-color-helper" class="color-input__helper">
    Enter a hex code or use the picker.
  </p>
</div>

<!-- Colour picker panel (popover) -->
<div
  id="brand-color-picker"
  role="dialog"
  aria-label="Colour picker"
  class="color-input__panel"
  hidden
>
  <!-- Colour space (2-D gradient) -->
  <div class="color-input__space" aria-label="Saturation and brightness">
    <input type="range" class="color-input__sat" aria-label="Saturation" min="0" max="100" />
    <input type="range" class="color-input__bri" aria-label="Brightness" min="0" max="100" />
  </div>

  <!-- Hue slider -->
  <input
    type="range"
    class="color-input__hue"
    aria-label="Hue"
    min="0"
    max="360"
  />

  <!-- Hex code input -->
  <div class="color-input__code">
    <label for="hex-code" class="sr-only">Hex code</label>
    <input
      type="text"
      id="hex-code"
      class="color-input__code-field"
      value="#7B52ED"
      maxlength="7"
      pattern="^#[0-9A-Fa-f]{6}$"
      aria-label="Hex colour value"
    />
  </div>
</div>
```
