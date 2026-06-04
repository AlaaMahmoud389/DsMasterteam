import { useState, useId } from 'react';
import PropTypes from 'prop-types';
import styles from './Accordion.module.css';
import { ChevronDownIcon } from './AccordionIcons';

/**
 * Accordion — Masterteam Design System
 * Figma: https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4113-1059
 *
 * Sizes  : lg (56px) | md (48px) | sm (40px)
 * States : default | hover | pressed | focused | disabled | expanded
 * Modes  : single (one open at a time) | multiple (any number open)
 * Layout : flush=false (bordered) | flush=true (edge-to-edge)
 * Icon   : trailing (end) | leading (start)
 */
export function Accordion({
  items = [],
  type = 'single',
  size = 'lg',
  iconAlignment = 'trailing',
  flush = false,
  dir,
}) {
  const baseId = useId();

  const initialOpen = new Set(
    items.flatMap((item, i) => (item.defaultOpen && !item.disabled ? [i] : []))
  );
  const [openItems, setOpenItems] = useState(initialOpen);

  function toggle(index) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (type === 'single') next.clear();
        next.add(index);
      }
      return next;
    });
  }

  const wrapperClass = [
    styles.accordion,
    flush && styles.flush,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClass} dir={dir}>
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        const panelId = `${baseId}-panel-${index}`;
        const triggerId = `${baseId}-trigger-${index}`;

        const itemClass = [
          styles.item,
          styles[size],
          item.disabled && styles.disabled,
        ]
          .filter(Boolean)
          .join(' ');

        const chevronClass = [
          styles.chevron,
          isOpen && styles.chevronOpen,
        ]
          .filter(Boolean)
          .join(' ');

        const icon = (
          <span className={styles.iconSlot} aria-hidden="true">
            <ChevronDownIcon className={chevronClass} />
          </span>
        );

        return (
          <div key={index} className={itemClass}>
            <button
              type="button"
              id={triggerId}
              className={styles.trigger}
              aria-expanded={isOpen}
              aria-controls={panelId}
              disabled={item.disabled}
              onClick={() => toggle(index)}
            >
              {iconAlignment === 'leading' && icon}
              <span className={styles.title}>{item.title}</span>
              {iconAlignment === 'trailing' && icon}
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
            >
              <div className={styles.content}>{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

Accordion.propTypes = {
  /** Array of accordion items */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title:       PropTypes.node.isRequired,
      content:     PropTypes.node.isRequired,
      disabled:    PropTypes.bool,
      defaultOpen: PropTypes.bool,
    })
  ),
  /** single: only one item open at a time. multiple: any number can be open. */
  type: PropTypes.oneOf(['single', 'multiple']),
  /** Header height: lg=56px · md=48px · sm=40px */
  size: PropTypes.oneOf(['lg', 'md', 'sm']),
  /** Chevron position relative to the title */
  iconAlignment: PropTypes.oneOf(['trailing', 'leading']),
  /** Remove item borders for edge-to-edge / flush placement */
  flush: PropTypes.bool,
  /** Text direction for RTL/Arabic layouts */
  dir: PropTypes.oneOf(['ltr', 'rtl']),
};
