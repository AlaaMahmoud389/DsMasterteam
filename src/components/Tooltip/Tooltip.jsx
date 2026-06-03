import PropTypes from 'prop-types';
import styles from './Tooltip.module.css';
import { FeedbackIcon } from '../icons/FeedbackIcon';

/**
 * Tooltip — Masterteam Design System
 * Figma: node 4404:4368
 *
 * Displays a short informational bubble with optional beak (pointer),
 * light/dark themes, and RTL support.
 */
export function Tooltip({
  inverted,
  beakPlacement,
  beakAlignment,
  icon,
  rtl,
  title,
  body,
}) {
  const dark = inverted;

  /* Beak position on the card edge — applied to the outer wrap flex container.
     Start (default) uses align-items: flex-start from .wrap base style.
     Center and End override via modifier classes. */
  const wrapAlignClass =
    beakAlignment === 'Center'
      ? styles.beakAlignCenter
      : beakAlignment === 'End'
      ? styles.beakAlignEnd
      : '';

  const isRow = beakPlacement === 'Left' || beakPlacement === 'Right';

  const wrapClass = [
    styles.wrap,
    isRow ? styles.wrapRow : styles.wrapCol,
    wrapAlignClass,
  ].filter(Boolean).join(' ');

  const BEAK = {
    Top:    { w: 28, h: 6,  points: '14,0 0,6 28,6',  style: { marginBottom: '-1px' } },
    Bottom: { w: 28, h: 6,  points: '0,0 28,0 14,6',  style: { marginTop:    '-1px' } },
    Left:   { w: 6,  h: 28, points: '0,14 6,0 6,28',  style: { marginRight:  '-1px' } },
    Right:  { w: 6,  h: 28, points: '6,14 0,0 0,28',  style: { marginLeft:   '-1px' } },
  };

  // BEAK lookup is undefined for 'None', undefined, or any unrecognised value — all render no beak.
  const beakConfig = BEAK[beakPlacement] ?? null;
  const beakEl = beakConfig && (
    <svg
      width={beakConfig.w}
      height={beakConfig.h}
      viewBox={`0 0 ${beakConfig.w} ${beakConfig.h}`}
      fill={dark ? '#1f2a37' : '#ffffff'}
      style={{ display: 'block', flexShrink: 0, ...beakConfig.style }}
      aria-hidden="true"
    >
      <polygon points={beakConfig.points} />
    </svg>
  );

  const iconEl = icon && (
    <FeedbackIcon
      className={[styles.iconWrap, dark ? styles.iconDark : styles.iconLight].join(' ')}
      size={18}
    />
  );

  const content = (
    <div
      className={[
        styles.content,
        isRow ? styles.contentRow : '',
        dark ? styles.contentDark : styles.contentLight,
      ].filter(Boolean).join(' ')}
      dir={rtl ? 'rtl' : undefined}
    >
      {iconEl}
      <div className={styles.textWrap}>
        <p className={[styles.title, dark ? styles.titleDark : styles.titleLight].join(' ')}>
          {title}
        </p>
        <p className={[styles.body, dark ? styles.bodyDark : styles.bodyLight].join(' ')}>
          {body}
        </p>
      </div>
    </div>
  );

  const topOrLeft = beakPlacement === 'Top' || beakPlacement === 'Left';

  return (
    <div className={wrapClass}>
      {topOrLeft && beakEl}
      {content}
      {!topOrLeft && beakEl}
    </div>
  );
}

Tooltip.propTypes = {
  inverted:      PropTypes.bool,
  beakPlacement: PropTypes.oneOf(['None', 'Top', 'Bottom', 'Left', 'Right']),
  beakAlignment: PropTypes.oneOf(['Start', 'Center']),
  icon:          PropTypes.bool,
  rtl:           PropTypes.bool,
  title:         PropTypes.string,
  body:          PropTypes.string,
};

Tooltip.defaultProps = {
  inverted:      false,
  beakPlacement: 'None',
  beakAlignment: 'Start',
  icon:          true,
  rtl:           false,
  title:         'Tooltip title',
  body:          'Max width of tooltips is 240px - text will wrap automatically',
};
