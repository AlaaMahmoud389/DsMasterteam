import React from 'react';
import styles from './Quote.module.css';
import { Avatar } from '../Avatar/Avatar';

/**
 * Quote — Masterteam Design System
 * Figma: node 4482:3649
 *
 * Props:
 *   quoteTitle        string   — title above the quote text          (default 'Title of quote')
 *   showQuoteTitle    boolean  — show / hide the title               (default true)
 *   quoteText         string   — the main quote body
 *   showDescription   boolean  — show / hide quote text              (default true)
 *   authorName        string   — author's name
 *   authorBrief       string   — author's short description
 *   showAuthorDetails boolean  — show / hide the author row          (default true)
 *   avatarSrc         string   — image URL for the avatar
 *   showAvatar        boolean  — show avatar beside author           (default false)
 *   whiteBackground   boolean  — white card bg vs transparent        (default true)
 *   size              'large' | 'small'                              (default 'large')
 *   rtl               boolean
 *   className         string
 */

/* ── Decorative SVG quote marks — exact Figma vector paths ─────────
   LTR: opening at top-left, closing at bottom-right
   RTL: opening at top-right, closing at bottom-left
   Each SVG uses viewBox cropping to isolate the relevant glyph from
   the original Figma vector coordinates.
   ─────────────────────────────────────────────────────────────────── */

function QuoteOpen({ rtl }) {
  if (!rtl) {
    return (
      <svg
        className={[styles.quoteMark, styles.quoteOpen].join(' ')}
        width="46" height="32"
        viewBox="0 0 46 32"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M33.552 0C28.1734 0 25.7403 3.07347 25.7403 7.5556V9.34846C25.7403 16.2638 30.0943 25.7403 37.3938 32.0153H45.9739C40.8515 26.6367 37.778 22.1546 36.3693 16.1357C39.827 15.3673 41.3637 12.8061 41.3637 9.34846V7.5556C41.3637 3.07347 38.9306 0 33.552 0ZM7.81173 0C2.43316 0 0 3.07347 0 7.5556V9.34846C0 16.2638 4.35408 25.7403 11.6536 32.0153H20.2336C15.1112 26.6367 12.0377 22.1546 10.6291 16.1357C14.0867 15.3673 15.6234 12.8061 15.6234 9.34846V7.5556C15.6234 3.07347 13.1903 0 7.81173 0Z"
          fill="#1849A9"
        />
      </svg>
    );
  }
  /* RTL opening — top-right corner, paths from Figma RTL vector (798×172) */
  return (
    <svg
      className={[styles.quoteMark, styles.quoteOpen].join(' ')}
      width="46" height="32"
      viewBox="752 0 46 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M764.448 0C769.827 0 772.26 3.07347 772.26 7.55559V9.34844C772.26 16.2637 767.906 25.7402 760.606 32.0152H752.026C757.149 26.6367 760.222 22.1545 761.631 16.1357C758.173 15.3673 756.636 12.8061 756.636 9.34844V7.55559C756.636 3.07347 759.07 0 764.448 0ZM790.188 0C795.567 0 798 3.07347 798 7.55559V9.34844C798 16.2637 793.646 25.7402 786.347 32.0152H777.766C782.889 26.6367 785.962 22.1545 787.371 16.1357C783.913 15.3673 782.377 12.8061 782.377 9.34844V7.55559C782.377 3.07347 784.81 0 790.188 0Z"
        fill="#1849A9"
      />
    </svg>
  );
}

function QuoteClose({ rtl }) {
  if (!rtl) {
    /* LTR closing — bottom-right corner, paths from Figma LTR vector (795×172) */
    return (
      <svg
        className={[styles.quoteMark, styles.quoteClose].join(' ')}
        width="47" height="33"
        viewBox="748 139 47 33"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M787.188 171.362C792.567 171.362 795 168.288 795 163.806V162.013C795 155.098 790.646 145.621 783.346 139.346H774.766C779.889 144.725 782.962 149.207 784.371 155.226C780.913 155.994 779.377 158.556 779.377 162.013V163.806C779.377 168.288 781.81 171.362 787.188 171.362ZM761.32 171.362C766.698 171.362 769.132 168.288 769.132 163.806V162.013C769.132 155.098 764.778 145.621 757.478 139.346H748.898C754.02 144.725 757.094 149.207 758.503 155.226C755.045 155.994 753.508 158.556 753.508 162.013V163.806C753.508 168.288 755.941 171.362 761.32 171.362Z"
          fill="#1849A9"
        />
      </svg>
    );
  }
  /* RTL closing — bottom-left corner, paths from Figma RTL vector (798×172) */
  return (
    <svg
      className={[styles.quoteMark, styles.quoteClose].join(' ')}
      width="47" height="33"
      viewBox="0 139 47 33"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7.81171 171.361C2.43316 171.361 0 168.288 0 163.806V162.013C0 155.098 4.35407 145.621 11.6535 139.346H20.2336C15.1112 144.725 12.0377 149.207 10.6291 155.226C14.0867 155.994 15.6234 158.555 15.6234 162.013V163.806C15.6234 168.288 13.1903 171.361 7.81171 171.361ZM33.68 171.361C28.3014 171.361 25.8683 168.288 25.8683 163.806V162.013C25.8683 155.098 30.2224 145.621 37.5218 139.346H46.1019C40.9795 144.725 37.906 149.207 36.4973 155.226C39.955 155.994 41.4917 158.555 41.4917 162.013V163.806C41.4917 168.288 39.0586 171.361 33.68 171.361Z"
        fill="#1849A9"
      />
    </svg>
  );
}

/* ── Quote ─────────────────────────────────────────────────────────── */
export function Quote({
  quoteTitle = 'Title of quote',
  showQuoteTitle = true,
  quoteText = 'The quote is placed here to highlight a specific saying or to present a brief quote that expresses an important idea or concept.',
  showDescription = true,
  authorName = "Author's name",
  authorBrief = 'brief or description.',
  showAuthorDetails = true,
  avatarSrc,
  showAvatar = false,
  whiteBackground = true,
  size = 'large',
  rtl = false,
  className,
  ...rest
}) {
  const containerCls = [
    styles.container,
    whiteBackground ? styles.whiteBg : styles.transparentBg,
    size === 'small' && styles.sizeSmall,
    rtl && styles.rtl,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerCls}
      dir={rtl ? 'rtl' : undefined}
      {...rest}
    >
      {/* Decorative opening mark — top-start corner */}
      <QuoteOpen rtl={rtl} />

      {/* Body: title + quote text */}
      <div className={styles.body}>
        {showQuoteTitle && (
          <div className={styles.quoteTitle}>{quoteTitle}</div>
        )}
        {showDescription && (
          <p className={styles.quoteText}>{quoteText}</p>
        )}
      </div>

      {/* Author row */}
      {showAuthorDetails && (
        <div className={styles.authorDetails}>
          {showAvatar && (
            <div className={styles.avatarWrap}>
              <Avatar
                type={avatarSrc ? 'image' : 'initials'}
                size="2xl"
                src={avatarSrc}
                initials={authorName ? authorName.slice(0, 2).toUpperCase() : 'AU'}
              />
            </div>
          )}
          <div className={styles.authorInfo}>
            <div className={styles.authorName}>{authorName}</div>
            <div className={styles.authorBrief}>{authorBrief}</div>
          </div>
        </div>
      )}

      {/* Decorative closing mark — bottom-end corner */}
      <QuoteClose rtl={rtl} />
    </div>
  );
}
