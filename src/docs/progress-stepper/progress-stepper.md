# Progress Stepper

## Purpose
Guides users through a multi-step process (onboarding, checkout, form wizard) by visually indicating which steps are completed, which is current, and which are upcoming. Provides orientation and a sense of progress in sequential flows.

---

## Variants

| Component | Description |
|---|---|
| `Progress Indicator` | Full step — with step name and optional description |
| `_StepperBase` | The step indicator visual only (circle or dot) |

---

## Step Styles

| Style | Description |
|---|---|
| `Circles` | Numbered circle or checkmark per step. Default. |
| `dot` | Minimal dot indicator. Use for very compact or mobile-first steppers. |

---

## Alignment

| Alignment | Use case |
|---|---|
| `Horizontal` | Multi-step flows across the top of a page |
| `Vertical` | Sidebar flows, narrower layouts, mobile |

---

## Step States

| State | Description |
|---|---|
| `Completed` | Finished step — checkmark visible |
| `Current` | Active step — highlighted ring |
| `Upcoming` (Upcomming) | Not yet reached — neutral/greyed |
| `Hover` | Pointer over a navigable step |
| `Focused` | Keyboard focus ring |

---

## Configuration

| Property | Options | Description |
|---|---|---|
| `RTL` | `yes` / `no` | Arabic / right-to-left layout |
| `Show Step Name` | `True` / `False` | Show the step label below/beside the indicator |
| `Show Description` | `True` / `False` | Show supplementary description text |
| `Next Step` | `True` / `False` | Show a connector line to the next step |

---

## Tokens Used

| Property | Token |
|---|---|
| Step (Completed) background | `semantic/background/primary-700` |
| Step (Completed) icon | `primitive/color/base/white` |
| Step (Current) border | `semantic/background/primary-700` |
| Step (Current) background | `semantic/background/primary-50` |
| Step (Upcoming) background | `semantic/background/neutral-100` |
| Step (Upcoming) border | `semantic/action/neutral-subtle/border/default` |
| Connector line | `semantic/action/neutral-subtle/border/default` |
| Connector line (completed) | `semantic/background/primary-700` |
| Step label (current) | `semantic/action/neutral-subtle/text/default` |
| Step label (upcoming) | `semantic/background/neutral-500` |
| Description text | `semantic/background/neutral-400` |
| Focus ring | `component/button/primary/border/focused` |

---

## Usage Rules

- **Use for sequential processes with 2–7 steps.** Fewer than 2 steps needs no stepper; more than 7 should be broken into sub-flows.
- **Steps must be clearly labelled.** `Show Step Name=True` is the default — only suppress labels in very compact single-line mobile steppers.
- **Completed steps can be navigable** (user can return to review earlier steps). If a step is not navigable, it must not appear as a clickable link.
- **Do not skip the `Current` state** — always communicate where the user is in the flow.
- **`Vertical` alignment** is preferred on mobile and in narrow sidepanels.
- Progress stepper is structural — do not use it for filtering, sorting, or status communication (use Progress Bar or Badge for those).

---

## Accessibility Notes

- Wrap the stepper in `<nav aria-label="Progress">` or `<ol>` if steps are not navigable, `<nav>` + `<ol>` if navigable.
- Each step is an `<li>`. Current step has `aria-current="step"`.
- Completed navigable steps are `<a>` or `<button>` with `aria-label="Step N: [Name] (Completed)"`.
- Upcoming steps are `<span>` or disabled `<button>` — they must not be interactive if the flow must be sequential.
- Connector lines are decorative — `aria-hidden="true"`.
- Screen reader users need the full sequence announced, not just the visual indicators.

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Mark the current step with `aria-current="step"` | Leave screen readers with no indication of where the user is |
| Allow back-navigation to completed steps | Force linear-only navigation with no way to review earlier steps |
| Show both step name and number | Rely on the number alone with no label |
| Keep step labels to 2–3 words | Write full sentence labels on horizontal steppers |
| Use Vertical alignment on mobile | Force horizontal steppers on narrow viewports |

---

## Example HTML Usage

```html
<!-- Horizontal progress stepper (3 steps) -->
<nav aria-label="Order progress" class="progress-stepper progress-stepper--horizontal">
  <ol class="progress-stepper__list">
    <!-- Completed step -->
    <li class="progress-stepper__step progress-stepper__step--completed">
      <a
        href="/checkout/cart"
        class="progress-stepper__trigger"
        aria-label="Step 1: Cart (Completed)"
      >
        <span class="progress-stepper__indicator" aria-hidden="true">
          <svg class="progress-stepper__check"><!-- check icon --></svg>
        </span>
        <span class="progress-stepper__label">Cart</span>
      </a>
      <span class="progress-stepper__connector" aria-hidden="true"></span>
    </li>

    <!-- Current step -->
    <li class="progress-stepper__step progress-stepper__step--current">
      <div
        class="progress-stepper__trigger"
        aria-current="step"
        aria-label="Step 2: Shipping (Current)"
      >
        <span class="progress-stepper__indicator" aria-hidden="true">2</span>
        <span class="progress-stepper__label">Shipping</span>
        <span class="progress-stepper__description">Enter your address</span>
      </div>
      <span class="progress-stepper__connector" aria-hidden="true"></span>
    </li>

    <!-- Upcoming step -->
    <li class="progress-stepper__step progress-stepper__step--upcoming">
      <div
        class="progress-stepper__trigger"
        aria-label="Step 3: Payment (Not yet reached)"
        aria-disabled="true"
      >
        <span class="progress-stepper__indicator" aria-hidden="true">3</span>
        <span class="progress-stepper__label">Payment</span>
      </div>
    </li>
  </ol>
</nav>

<!-- Vertical stepper (mobile-friendly) -->
<nav aria-label="Setup progress" class="progress-stepper progress-stepper--vertical">
  <ol class="progress-stepper__list">
    <li class="progress-stepper__step progress-stepper__step--completed">
      <button type="button" class="progress-stepper__trigger" aria-label="Step 1: Account (Completed)">
        <span class="progress-stepper__indicator" aria-hidden="true">
          <svg class="progress-stepper__check"><!-- check --></svg>
        </span>
        <div class="progress-stepper__content">
          <span class="progress-stepper__label">Account</span>
          <span class="progress-stepper__description">Create your login</span>
        </div>
      </button>
      <span class="progress-stepper__connector" aria-hidden="true"></span>
    </li>
    <li class="progress-stepper__step progress-stepper__step--current">
      <div class="progress-stepper__trigger" aria-current="step">
        <span class="progress-stepper__indicator" aria-hidden="true">2</span>
        <div class="progress-stepper__content">
          <span class="progress-stepper__label">Profile</span>
          <span class="progress-stepper__description">Add your details</span>
        </div>
      </div>
    </li>
  </ol>
</nav>
```
