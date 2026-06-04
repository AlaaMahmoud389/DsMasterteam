import styles from './Card.module.css';

// ─── Design tokens (Figma node 4258:83698) ────────────────────────
// Background  : white · hover: #f9fafb · focused: #f5faff · disabled: #f3f4f6
// Border      : transparent (default) · focused: 1.5px #1849a9 · stroke: #e5e7eb
// Radius      : 16px · Padding: 16px · Gap: 24px · Width: 360px
// Shadow      : 0 4px 4px rgba(16,24,40,.1), 0 2px 2px rgba(16,24,40,.06)
// Title       : Bold 18px/28px #000b36 · disabled: #6c7c96
// Description : Regular 16px/24px #3c5073 · disabled: #6c7c96
// Featured icon bg : #e6f4ee (default) · disabled: #ffffff
// Tag         : bg #f9fafb · border #e5e7eb · 24px h · Medium 12px · #1f2a37
// Rating star : 24×24 · filled #f79009 · empty #e4e7ec
// Neutral btn : #f3f4f6 bg · #000b36 text · 40px h · radius 4px
// Primary btn : #1849a9 bg · #f9fafb text
// Checkbox    : 20×20 · unchecked: #6c7c96 outline · checked: #1849a9 fill
// Expand btn  : 40×40 transparent · chevron icon

// ─── Icons ────────────────────────────────────────────────────────
function CheckCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#1b8354" strokeWidth="1.5" />
      <path d="M8.5 12l2.5 2.5 4.5-4.5" stroke="#1b8354" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon({ color = '#000b36' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckmarkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="#000b36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 15l-6-6-6 6" stroke="#000b36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Star rating ──────────────────────────────────────────────────
const STAR_PATH = 'M12 2l2.9 6.26 6.1.89-4.5 4.37 1.1 6.4L12 16.9l-5.6 2.96 1.1-6.4L3 8.15l6.1-.89z';

function Star({ fill = 'full', id }) {
  if (fill === 'full') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <path d={STAR_PATH} fill="#f79009" />
      </svg>
    );
  }
  if (fill === 'empty') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <path d={STAR_PATH} fill="#e4e7ec" />
      </svg>
    );
  }
  // half star — left half filled, right half empty
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <clipPath id={`star-left-${id}`}><rect x="0" y="0" width="12" height="24" /></clipPath>
      </defs>
      <path d={STAR_PATH} fill="#e4e7ec" />
      <path d={STAR_PATH} fill="#f79009" clipPath={`url(#star-left-${id})`} />
    </svg>
  );
}

function StarRating({ value = 3.5, total = 5, count, uid = 'r' }) {
  const fills = Array.from({ length: total }, (_, i) => {
    const v = value - i;
    if (v >= 1) return 'full';
    if (v >= 0.5) return 'half';
    return 'empty';
  });
  return (
    <div className={styles.ratingWrap}>
      <div className={styles.stars} role="img" aria-label={`${value} out of ${total} stars`}>
        {fills.map((f, i) => <Star key={i} fill={f} id={`${uid}-${i}`} />)}
      </div>
      {count != null && (
        <span className={styles.ratingCount}>{count} reviews</span>
      )}
    </div>
  );
}

// ─── Tag chip ─────────────────────────────────────────────────────
function Tag({ label = 'Label' }) {
  return <span className={styles.tag}>{label}</span>;
}

// ─── Checkbox ─────────────────────────────────────────────────────
function Checkbox({ checked, disabled, dir }) {
  const wrapCls = [styles.checkboxWrap, dir === 'rtl' && styles.checkboxWrapRtl].filter(Boolean).join(' ');
  if (disabled) {
    return <div className={wrapCls} aria-hidden="true"><span className={styles.checkboxDisabledBox} /></div>;
  }
  if (checked) {
    return (
      <div className={wrapCls} aria-hidden="true">
        <div className={styles.checkboxChecked}><CheckmarkIcon /></div>
      </div>
    );
  }
  return <div className={wrapCls} aria-hidden="true"><span className={styles.checkboxEmpty} /></div>;
}

// ─── Card ─────────────────────────────────────────────────────────
// type         : 'default' | 'expandable' | 'selectable'
// state        : 'default' | 'hover' | 'focused' | 'disabled'
// selected     : boolean — checkbox checked (selectable type only)
// expanded     : boolean — expanded state (expandable type only)
// stroke       : boolean — stroke effect (visible border, no shadow)
// shadow       : boolean — drop shadow (default true)
// image        : show 250px image header
// imageSrc     : URL for the image
// featuredIcon : show 48×48 icon circle
// icon         : custom ReactNode to override checkmark circle
// showTitle / title
// showDescription / description
// showTags / tags
// showRating / rating / ratingCount
// showActions
// neutralLabel / primaryLabel / onNeutral / onPrimary
// onCardClick  : click handler for expandable/selectable cards
// onExpand     : handler for the expand toggle button
// dir          : 'ltr' | 'rtl'
export function Card({
  image = false,
  imageSrc,
  featuredIcon = true,
  icon,
  showTitle = true,
  title = 'Card Title',
  showDescription = true,
  description = 'Card content placeholder text goes here',
  showTags = false,
  tags = ['Label', 'Label', 'Label'],
  showRating = false,
  rating = 3.5,
  ratingCount = 12,
  showActions = true,
  neutralLabel = 'Button',
  primaryLabel = 'Button',
  onNeutral,
  onPrimary,
  shadow = true,
  stroke = false,
  type = 'default',
  state = 'default',
  selected = false,
  expanded = false,
  onCardClick,
  onExpand,
  dir = 'ltr',
  className,
  uid = 'card',
}) {
  const isDisabled = state === 'disabled';
  const isExpandable = type === 'expandable';
  const isSelectable = type === 'selectable';
  const hasShadow = shadow && !stroke && !isDisabled;

  const rootCls = [
    styles.root,
    isExpandable && styles.typeExpandable,
    isSelectable && styles.typeSelectable,
    hasShadow && styles.shadow,
    stroke && styles.stroke,
    state === 'hover' && styles.stateHover,
    state === 'focused' && styles.stateFocused,
    isDisabled && styles.stateDisabled,
    className,
  ].filter(Boolean).join(' ');

  return (
    <article
      className={rootCls}
      dir={dir}
      onClick={!isDisabled && (isSelectable || isExpandable) ? onCardClick : undefined}
    >
      {/* ── Image ── */}
      {image && (
        <div className={styles.imageWrap}>
          {imageSrc
            ? <img src={imageSrc} alt="" className={styles.image} />
            : <div className={styles.imagePlaceholder} />
          }
        </div>
      )}

      {/* ── Checkbox (selectable type only) ── */}
      {isSelectable && (
        <Checkbox checked={selected} disabled={isDisabled} dir={dir} />
      )}

      {/* ── Featured icon ── */}
      {featuredIcon && (
        <div className={styles.featuredIcon} aria-hidden="true">
          {icon || <CheckCircleIcon />}
        </div>
      )}

      {/* ── Content ── */}
      <div className={styles.content}>
        {showTitle && <h3 className={styles.title}>{title}</h3>}
        {showDescription && <p className={styles.description}>{description}</p>}
      </div>

      {/* ── Tags ── */}
      {showTags && (
        <div className={styles.tags}>
          {tags.map((t, i) => <Tag key={i} label={t} />)}
        </div>
      )}

      {/* ── Rating ── */}
      {showRating && (
        <StarRating value={rating} count={ratingCount} uid={uid} />
      )}

      {/* ── Actions: Expandable type — single chevron button ── */}
      {isExpandable && showActions && (
        <div className={styles.actionsExpandable}>
          <button
            type="button"
            className={styles.expandBtn}
            onClick={e => { e.stopPropagation(); onExpand && onExpand(); }}
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse card' : 'Expand card'}
            disabled={isDisabled}
          >
            {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
        </div>
      )}

      {/* ── Actions: Default / Selectable type — two buttons ── */}
      {!isExpandable && showActions && (
        <div className={styles.actions}>
          <button
            type="button"
            className={[styles.btn, styles.btnNeutral].join(' ')}
            onClick={onNeutral}
            disabled={isDisabled}
          >
            <ArrowRightIcon color="#000b36" />
            <span>{neutralLabel}</span>
          </button>
          <button
            type="button"
            className={[styles.btn, styles.btnPrimary].join(' ')}
            onClick={onPrimary}
            disabled={isDisabled}
          >
            <ArrowRightIcon color="#f9fafb" />
            <span>{primaryLabel}</span>
          </button>
        </div>
      )}
    </article>
  );
}
