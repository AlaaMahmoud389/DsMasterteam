# Carousel

## Purpose
Displays a horizontally scrollable sequence of content items (images, cards, media) where only a subset is visible at one time. Allows users to cycle through content without navigating away.

---

## Variants

| Component | Description |
|---|---|
| `Carousel` | The main sliding container |
| `Carousel Controls` | Dot indicators showing current position |
| `Carousel Arrows` | Previous/Next navigation arrows |

---

## States

### Carousel Controls (dots)
| State | Description |
|---|---|
| `Active` | Current slide indicator — larger/filled dot |
| `Inactive` | Other slides — smaller/unfilled dot |

### Carousel Arrows
| State | Description |
|---|---|
| `Default` | Available navigation direction |
| `Disabled` | At the start (prev) or end (next) of the sequence |
| `Hovered` | Pointer over arrow |
| `Pressed` | Click/tap |
| `Focused` | Keyboard focus ring |

---

## Tokens Used

| Property | Token |
|---|---|
| Arrow background | `semantic/background/Surface/Primary` |
| Arrow icon | `semantic/action/neutral-subtle/icon/default` |
| Arrow border | `semantic/action/neutral-subtle/border/default` |
| Arrow shadow | Effect style: `shadow/sm` |
| Dot (active) | `semantic/background/primary-700` |
| Dot (inactive) | `semantic/background/neutral-300` |
| Focus ring | `component/button/primary/border/focused` |

---

## Usage Rules

- **Do not autoplay carousels.** Autoplaying content is distracting, inaccessible, and fails WCAG 2.2.2 (Pause, Stop, Hide). If autoplay is a product requirement, include a clear pause button.
- **Carousels are not a navigation pattern.** Use tabs, accordions, or pages for large amounts of distinct content.
- **Limit to 3–7 slides.** More than 7 slides lose users — they stop browsing after the third item.
- **Show dots (controls) + arrows together** for the best discoverability. Dots alone are insufficient for keyboard users.
- **Disable arrows** at the first and last slide (rather than wrapping infinitely) for linear sequences.
- **Each slide should be a meaningful unit** — do not split a single piece of content across multiple slides.
- Ensure each slide is fully visible within the viewport on its own — avoid partially-revealed items that suggest scrolling without a clear mechanism.

---

## Accessibility Notes

- Wrap in `<section aria-label="[Carousel name]" aria-roledescription="carousel">`.
- The slides container has `aria-live="polite"` (or off during animation, polite after).
- Each slide: `role="group"` with `aria-roledescription="slide"` and `aria-label="N of M"`.
- Inactive slides: `aria-hidden="true"` (or `inert`) so screen readers don't read off-screen items.
- Prev/Next buttons: `aria-label="Previous slide"` / `"Next slide"` with `aria-controls` pointing to the slides container.
- Dot controls: `role="tab"` within `role="tablist"` or simple buttons with `aria-label="Go to slide N"` and `aria-pressed` for the active dot.
- Pause any animations when `prefers-reduced-motion` is "reduce".

---

## Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Always provide arrow controls alongside dots | Rely on dot indicators alone |
| Mark inactive slides `aria-hidden="true"` | Allow screen readers to reach off-screen slides |
| Disable arrows at boundaries for linear carousels | Silently wrap from last slide back to first |
| Respect `prefers-reduced-motion` | Autoplay or animate without a pause mechanism |
| Label the carousel region and each slide | Use an unlabelled `<div>` as the outer container |

---

## Example HTML Usage

```html
<section
  class="carousel"
  aria-label="Featured projects"
  aria-roledescription="carousel"
>
  <!-- Slides wrapper -->
  <div
    class="carousel__slides"
    aria-live="polite"
    aria-atomic="false"
    id="carousel-slides"
  >
    <div
      class="carousel__slide"
      role="group"
      aria-roledescription="slide"
      aria-label="Slide 1 of 3"
    >
      <img src="project-a.jpg" alt="Dashboard redesign project screenshot" />
      <h3>Dashboard Redesign</h3>
    </div>
    <div
      class="carousel__slide"
      role="group"
      aria-roledescription="slide"
      aria-label="Slide 2 of 3"
      aria-hidden="true"
    >
      <img src="project-b.jpg" alt="Mobile app onboarding screens" />
      <h3>Mobile Onboarding</h3>
    </div>
    <div
      class="carousel__slide"
      role="group"
      aria-roledescription="slide"
      aria-label="Slide 3 of 3"
      aria-hidden="true"
    >
      <img src="project-c.jpg" alt="E-commerce checkout flow" />
      <h3>Checkout Flow</h3>
    </div>
  </div>

  <!-- Arrow controls -->
  <button
    type="button"
    class="carousel__arrow carousel__arrow--prev"
    aria-label="Previous slide"
    aria-controls="carousel-slides"
    disabled
    aria-disabled="true"
  >
    <svg aria-hidden="true" focusable="false"><!-- left arrow --></svg>
  </button>
  <button
    type="button"
    class="carousel__arrow carousel__arrow--next"
    aria-label="Next slide"
    aria-controls="carousel-slides"
  >
    <svg aria-hidden="true" focusable="false"><!-- right arrow --></svg>
  </button>

  <!-- Dot controls -->
  <div class="carousel__controls" role="tablist" aria-label="Slide navigation">
    <button type="button" role="tab" class="carousel__dot carousel__dot--active"
      aria-label="Go to slide 1" aria-selected="true" tabindex="0"></button>
    <button type="button" role="tab" class="carousel__dot"
      aria-label="Go to slide 2" aria-selected="false" tabindex="-1"></button>
    <button type="button" role="tab" class="carousel__dot"
      aria-label="Go to slide 3" aria-selected="false" tabindex="-1"></button>
  </div>
</section>
```
