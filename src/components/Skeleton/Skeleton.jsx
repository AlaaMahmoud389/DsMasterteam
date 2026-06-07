import PropTypes from 'prop-types';
import styles from './Skeleton.module.css';

/* ── helpers ───────────────────────────────────────────────── */

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

/* ── SkeletonLine ──────────────────────────────────────────── */

export function SkeletonLine({ size = 'large', style, className, ...rest }) {
  return (
    <span
      className={cx(
        styles.shimmer,
        styles.line,
        size === 'small' ? styles.lineSmall : styles.lineLarge,
        className
      )}
      style={style}
      aria-hidden="true"
      {...rest}
    />
  );
}

SkeletonLine.propTypes = {
  /** Text-row height: large = 22 px, small = 14 px */
  size: PropTypes.oneOf(['large', 'small']),
};

/* ── SkeletonRectangle ─────────────────────────────────────── */

const RECT_SHORT_WIDTH = { large: styles.rectangleShortLarge, medium: styles.rectangleShortMedium, small: styles.rectangleShortSmall };
const RECT_HEIGHT      = { large: styles.rectangleLarge,      medium: styles.rectangleMedium,      small: styles.rectangleSmall };

export function SkeletonRectangle({ size = 'large', length = 'long', fullWidth = false, style, className, ...rest }) {
  const widthClass = fullWidth
    ? styles.rectangleFull
    : length === 'long'
      ? styles.rectangleLong
      : RECT_SHORT_WIDTH[size];

  return (
    <span
      className={cx(styles.shimmer, styles.rectangle, RECT_HEIGHT[size], widthClass, className)}
      style={style}
      aria-hidden="true"
      {...rest}
    />
  );
}

SkeletonRectangle.propTypes = {
  size:      PropTypes.oneOf(['large', 'medium', 'small']),
  length:    PropTypes.oneOf(['long', 'short']),
  fullWidth: PropTypes.bool,
};

/* ── SkeletonCircle ────────────────────────────────────────── */

const SIZES = [24, 48, 64, 80, 120, 170, 240];
const sizeClass = (n) => styles[`size${n}`];

export function SkeletonCircle({ size = 48, style, className, ...rest }) {
  return (
    <span
      className={cx(styles.shimmer, styles.circle, sizeClass(size), className)}
      style={style}
      aria-hidden="true"
      {...rest}
    />
  );
}

SkeletonCircle.propTypes = {
  size: PropTypes.oneOf(SIZES),
};

/* ── SkeletonSquare ────────────────────────────────────────── */

export function SkeletonSquare({ size = 48, style, className, ...rest }) {
  return (
    <span
      className={cx(styles.shimmer, styles.square, sizeClass(size), className)}
      style={style}
      aria-hidden="true"
      {...rest}
    />
  );
}

SkeletonSquare.propTypes = {
  size: PropTypes.oneOf(SIZES),
};

/* ── SkeletonTemplate ──────────────────────────────────────── */
/*
 * Composite skeleton layouts that mirror common content patterns.
 *
 * chart-content      — large circle + 3 text lines (stacked)
 * image-content      — image block + 3 text lines + small button (stacked)
 * image-profile      — image block + avatar/name row + 3 text lines + small button (stacked)
 * image-button-text  — small circle icon + text line + medium button (horizontal)
 * icon-list          — small square icon + 3 small text lines (horizontal)
 */

export function SkeletonTemplate({ type = 'chart-content', style, className, ...rest }) {
  if (type === 'chart-content') {
    return (
      <div className={cx(styles.template, styles.templateColumn, className)} style={style} aria-hidden="true" {...rest}>
        <SkeletonCircle size={240} />
        <div className={styles.linesGroup}>
          <SkeletonLine size="large" />
          <SkeletonLine size="large" />
          <SkeletonLine size="large" />
        </div>
      </div>
    );
  }

  if (type === 'image-content') {
    return (
      <div className={cx(styles.template, styles.templateColumn, className)} style={style} aria-hidden="true" {...rest}>
        <span className={cx(styles.shimmer, styles.imagePlaceholder)} />
        <div className={styles.linesGroup}>
          <SkeletonLine size="large" />
          <SkeletonLine size="large" />
          <SkeletonLine size="large" />
        </div>
        <span className={cx(styles.shimmer, styles.btnSmall)} />
      </div>
    );
  }

  if (type === 'image-profile') {
    return (
      <div className={cx(styles.template, styles.templateColumn, className)} style={style} aria-hidden="true" {...rest}>
        <span className={cx(styles.shimmer, styles.imagePlaceholder)} />
        <div className={styles.profileRow}>
          <SkeletonCircle size={24} />
          <SkeletonLine size="small" style={{ width: 120 }} />
        </div>
        <div className={styles.linesGroup}>
          <SkeletonLine size="large" />
          <SkeletonLine size="large" />
          <SkeletonLine size="large" />
        </div>
        <span className={cx(styles.shimmer, styles.btnSmall)} />
      </div>
    );
  }

  if (type === 'image-button-text') {
    return (
      <div className={cx(styles.template, styles.templateRow, className)} style={style} aria-hidden="true" {...rest}>
        <SkeletonCircle size={48} />
        <div className={styles.rowContent}>
          <SkeletonLine size="small" />
          <span className={cx(styles.shimmer, styles.btnMedium)} />
        </div>
      </div>
    );
  }

  /* icon-list */
  return (
    <div className={cx(styles.template, styles.templateRow, className)} style={style} aria-hidden="true" {...rest}>
      <SkeletonSquare size={48} />
      <div className={styles.rowContent}>
        <SkeletonLine size="small" />
        <SkeletonLine size="small" />
        <SkeletonLine size="small" />
      </div>
    </div>
  );
}

SkeletonTemplate.propTypes = {
  type: PropTypes.oneOf([
    'chart-content',
    'image-content',
    'image-profile',
    'image-button-text',
    'icon-list',
  ]),
};
