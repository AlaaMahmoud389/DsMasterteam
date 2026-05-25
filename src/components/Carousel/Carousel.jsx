import { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Carousel.module.css';

/**
 * Carousel — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4112-16
 *
 * Nav variants : primary (solid blue) | subtle (gray fill)
 * Nav sizes    : sm (32px) | md (40px) | lg (48px)
 * Features     : dot indicators · prev/next navigation · loop · autoPlay · RTL
 *
 * In RTL mode the visual prev/next arrows swap their logical roles so the
 * "previous" button sits on the right side (inline-end) and moves backward
 * through slides — matching Arabic reading order.
 */

/* ── Internal icon components ──────────────────────────────── */

function ChevronLeftIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── CarouselNavButton (exportable sub-component) ───────────── */

/**
 * Stand-alone circular navigation button used inside the Carousel.
 * Can also be used independently when a carousel-style prev/next control is needed.
 */
export function CarouselNavButton({
  direction = 'next',
  variant = 'primary',
  size = 'md',
  disabled = false,
  dir = 'ltr',
  onClick,
  'aria-label': ariaLabel,
  ...rest
}) {
  const iconSize = size === 'lg' ? 24 : size === 'sm' ? 16 : 20;
  const isRtl = dir === 'rtl';

  // In RTL, arrows flip visually (chevron-right becomes the "back" arrow)
  const showLeft  = direction === 'prev' ? !isRtl : isRtl;
  const defaultLabel = direction === 'prev' ? 'Previous slide' : 'Next slide';

  const className = [
    styles.navBtn,
    styles[`variant_${variant}`],
    styles[`size_${size}`],
  ].join(' ');

  return (
    <button
      type="button"
      className={className}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel ?? defaultLabel}
      onClick={onClick}
      {...rest}
    >
      {showLeft
        ? <ChevronLeftIcon size={iconSize} />
        : <ChevronRightIcon size={iconSize} />}
    </button>
  );
}

CarouselNavButton.propTypes = {
  /** Which arrow direction this button represents */
  direction: PropTypes.oneOf(['prev', 'next']),
  /** Visual style */
  variant: PropTypes.oneOf(['primary', 'subtle']),
  /** Button size — sm=32px · md=40px · lg=48px */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  /** Text direction; flips chevron orientation in RTL */
  dir: PropTypes.oneOf(['ltr', 'rtl']),
  onClick: PropTypes.func,
  'aria-label': PropTypes.string,
};

/* ── Carousel (main component) ──────────────────────────────── */

export function Carousel({
  slides = [],
  navVariant = 'primary',
  navSize = 'md',
  showNavigation = true,
  showDots = true,
  loop = false,
  autoPlay = false,
  interval = 3000,
  dir = 'ltr',
}) {
  const isRtl  = dir === 'rtl';
  const count  = slides.length;
  const cardRef = useRef(null);

  const [current, setCurrent] = useState(0);

  const canGoPrev = loop || current > 0;
  const canGoNext = loop || current < count - 1;

  const goPrev = useCallback(() => {
    setCurrent(c => (c === 0 ? (loop ? count - 1 : 0) : c - 1));
  }, [loop, count]);

  const goNext = useCallback(() => {
    setCurrent(c => (c === count - 1 ? (loop ? 0 : count - 1) : c + 1));
  }, [loop, count]);

  useEffect(() => {
    if (!autoPlay || count <= 1) return;
    const id = setInterval(goNext, interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, goNext, count]);

  if (count === 0) return null;

  return (
    <div
      className={styles.carousel}
      dir={dir}
      ref={cardRef}
      aria-roledescription="carousel"
      aria-label="Content carousel"
    >
      {/* ── Track: [prev] [viewport] [next] ── */}
      <div className={styles.track}>
        {showNavigation && (
          <CarouselNavButton
            direction="prev"
            variant={navVariant}
            size={navSize}
            dir={dir}
            disabled={isRtl ? !canGoNext : !canGoPrev}
            onClick={isRtl ? goNext : goPrev}
          />
        )}

        <div
          className={styles.viewport}
          aria-live="polite"
          aria-atomic="true"
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className={[styles.slide, i === current ? styles.slideVisible : ''].filter(Boolean).join(' ')}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${count}`}
              aria-hidden={i !== current ? 'true' : undefined}
            >
              {slide}
            </div>
          ))}
        </div>

        {showNavigation && (
          <CarouselNavButton
            direction="next"
            variant={navVariant}
            size={navSize}
            dir={dir}
            disabled={isRtl ? !canGoPrev : !canGoNext}
            onClick={isRtl ? goPrev : goNext}
          />
        )}
      </div>

      {/* ── Dot indicators ── */}
      {showDots && count > 1 && (
        <div
          className={styles.dots}
          role="tablist"
          aria-label="Slide indicators"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              className={[styles.dot, i === current ? styles.dotActive : ''].filter(Boolean).join(' ')}
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

Carousel.propTypes = {
  /** Array of slide content — each item is rendered as a full slide */
  slides: PropTypes.arrayOf(PropTypes.node),
  /** Navigation button visual style */
  navVariant: PropTypes.oneOf(['primary', 'subtle']),
  /** Navigation button size: sm=32px · md=40px · lg=48px */
  navSize: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Show prev/next arrow buttons flanking the slide */
  showNavigation: PropTypes.bool,
  /** Show dot step indicators below the slide */
  showDots: PropTypes.bool,
  /** Wrap from last slide back to first (and vice-versa) */
  loop: PropTypes.bool,
  /** Auto-advance slides on a timer */
  autoPlay: PropTypes.bool,
  /** Milliseconds between auto-advances (requires autoPlay=true) */
  interval: PropTypes.number,
  /** Text direction — rtl flips arrow orientation and logical navigation */
  dir: PropTypes.oneOf(['ltr', 'rtl']),
};
