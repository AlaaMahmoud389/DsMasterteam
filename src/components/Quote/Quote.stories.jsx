import React from 'react';
import { Quote } from './Quote';

const FIGMA_URL =
  'https://www.figma.com/design/WTmRAkJVvw0IvZMA7wBdTC/Masterteam-Ds-For-Experiment-ONLY?node-id=4482-3649';

const FONT = "'IBM Plex Sans Arabic', system-ui, sans-serif";

export default {
  title: 'Components/Quote',
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA_URL },
  },
  tags: [],
};

const LABEL = {
  style: {
    fontSize: 11,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '.06em',
    marginBottom: 12,
    fontFamily: FONT,
  },
};

/* ════════════════════════════════════════════════════════════════════
   Playground
   ════════════════════════════════════════════════════════════════════ */
export const Playground = {
  name: 'Playground — Quote',
  argTypes: {
    size:             { control: 'select', options: ['large', 'small'] },
    whiteBackground:  { control: 'boolean' },
    showQuoteTitle:   { control: 'boolean' },
    showDescription:  { control: 'boolean' },
    showAuthorDetails:{ control: 'boolean' },
    showAvatar:       { control: 'boolean' },
    rtl:              { control: 'boolean' },
    quoteTitle:       { control: 'text' },
    quoteText:        { control: 'text' },
    authorName:       { control: 'text' },
    authorBrief:      { control: 'text' },
  },
  args: {
    size: 'large',
    whiteBackground: true,
    showQuoteTitle: true,
    showDescription: true,
    showAuthorDetails: true,
    showAvatar: false,
    rtl: false,
    quoteTitle: 'Title of quote',
    quoteText:
      'The quote is placed here to highlight a specific saying or to present a brief quote that expresses an important idea or concept.',
    authorName: "Author's name",
    authorBrief: 'Brief or description.',
  },
  render: (args) => (
    <div style={{ fontFamily: FONT, padding: 24, background: args.whiteBackground ? '#f3f4f6' : '#ffffff' }}>
      <Quote {...args} />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Large — White Background
   ════════════════════════════════════════════════════════════════════ */
export const LargeWhite = {
  name: 'Quote — Large / White Background',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 24, background: '#f3f4f6' }}>
      <Quote
        size="large"
        whiteBackground
        quoteTitle="Title of quote"
        quoteText="The quote is placed here to highlight a specific saying or to present a brief quote that expresses an important idea or concept."
        authorName="Author's name"
        authorBrief="Brief or description."
        showAuthorDetails
        showQuoteTitle
        showDescription
      />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Large — Transparent Background
   ════════════════════════════════════════════════════════════════════ */
export const LargeTransparent = {
  name: 'Quote — Large / Transparent Background',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 24, background: '#ffffff' }}>
      <Quote
        size="large"
        whiteBackground={false}
        quoteTitle="Title of quote"
        quoteText="The quote is placed here to highlight a specific saying or to present a brief quote that expresses an important idea or concept."
        authorName="Author's name"
        authorBrief="Brief or description."
        showAuthorDetails
        showQuoteTitle
        showDescription
      />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Small — White Background
   ════════════════════════════════════════════════════════════════════ */
export const SmallWhite = {
  name: 'Quote — Small / White Background',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 24, background: '#f3f4f6' }}>
      <Quote
        size="small"
        whiteBackground
        quoteTitle="Title of quote"
        quoteText="The quote is placed here to highlight a specific saying or to present a brief quote that expresses an important idea or concept."
        authorName="Author's name"
        authorBrief="Brief or description."
        showAuthorDetails
        showQuoteTitle
        showDescription
      />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Small — Transparent Background
   ════════════════════════════════════════════════════════════════════ */
export const SmallTransparent = {
  name: 'Quote — Small / Transparent Background',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 24, background: '#ffffff' }}>
      <Quote
        size="small"
        whiteBackground={false}
        quoteTitle="Title of quote"
        quoteText="The quote is placed here to highlight a specific saying or to present a brief quote that expresses an important idea or concept."
        authorName="Author's name"
        authorBrief="Brief or description."
        showAuthorDetails
        showQuoteTitle
        showDescription
      />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   RTL — Large / White
   ════════════════════════════════════════════════════════════════════ */
export const RTLLargeWhite = {
  name: 'Quote — RTL / Large / White Background',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 24, background: '#f3f4f6' }}>
      <Quote
        size="large"
        whiteBackground
        rtl
        quoteTitle="عنوان الاقتباس"
        quoteText="يُوضع الاقتباس هنا لإبراز قول معين أو لتقديم عبارة موجزة تعبّر عن فكرة أو مفهوم مهم."
        authorName="اسم المؤلف"
        authorBrief="وصف مختصر."
        showAuthorDetails
        showQuoteTitle
        showDescription
      />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   RTL — Large / Transparent
   ════════════════════════════════════════════════════════════════════ */
export const RTLLargeTransparent = {
  name: 'Quote — RTL / Large / Transparent Background',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 24, background: '#ffffff' }}>
      <Quote
        size="large"
        whiteBackground={false}
        rtl
        quoteTitle="عنوان الاقتباس"
        quoteText="يُوضع الاقتباس هنا لإبراز قول معين أو لتقديم عبارة موجزة تعبّر عن فكرة أو مفهوم مهم."
        authorName="اسم المؤلف"
        authorBrief="وصف مختصر."
        showAuthorDetails
        showQuoteTitle
        showDescription
      />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   RTL — Small / White
   ════════════════════════════════════════════════════════════════════ */
export const RTLSmallWhite = {
  name: 'Quote — RTL / Small / White Background',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 24, background: '#f3f4f6' }}>
      <Quote
        size="small"
        whiteBackground
        rtl
        quoteTitle="عنوان الاقتباس"
        quoteText="يُوضع الاقتباس هنا لإبراز قول معين أو لتقديم عبارة موجزة تعبّر عن فكرة أو مفهوم مهم."
        authorName="اسم المؤلف"
        authorBrief="وصف مختصر."
        showAuthorDetails
        showQuoteTitle
        showDescription
      />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   RTL — Small / Transparent
   ════════════════════════════════════════════════════════════════════ */
export const RTLSmallTransparent = {
  name: 'Quote — RTL / Small / Transparent Background',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 24, background: '#ffffff' }}>
      <Quote
        size="small"
        whiteBackground={false}
        rtl
        quoteTitle="عنوان الاقتباس"
        quoteText="يُوضع الاقتباس هنا لإبراز قول معين أو لتقديم عبارة موجزة تعبّر عن فكرة أو مفهوم مهم."
        authorName="اسم المؤلف"
        authorBrief="وصف مختصر."
        showAuthorDetails
        showQuoteTitle
        showDescription
      />
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   With Avatar
   ════════════════════════════════════════════════════════════════════ */
export const WithAvatar = {
  name: 'Quote — With Avatar',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 24, background: '#f3f4f6', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <div style={LABEL.style}>LTR — With Avatar (initials)</div>
        <Quote
          size="large"
          whiteBackground
          showAvatar
          authorName="Author Name"
          authorBrief="Brief or description."
          showAuthorDetails
          showQuoteTitle
          showDescription
        />
      </div>
      <div>
        <div style={LABEL.style}>RTL — With Avatar (initials)</div>
        <Quote
          size="large"
          whiteBackground
          showAvatar
          rtl
          authorName="اسم المؤلف"
          authorBrief="وصف مختصر."
          showAuthorDetails
          showQuoteTitle
          quoteTitle="عنوان الاقتباس"
          quoteText="يُوضع الاقتباس هنا لإبراز قول معين أو لتقديم عبارة موجزة تعبّر عن فكرة أو مفهوم مهم."
          showDescription
        />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Content Visibility Variants
   ════════════════════════════════════════════════════════════════════ */
export const ContentVariants = {
  name: 'Quote — Content Visibility',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 24, background: '#f3f4f6', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <div style={LABEL.style}>Show Title = Off</div>
        <Quote whiteBackground showQuoteTitle={false} showDescription showAuthorDetails />
      </div>
      <div>
        <div style={LABEL.style}>Show Description = Off</div>
        <Quote whiteBackground showQuoteTitle showDescription={false} showAuthorDetails />
      </div>
      <div>
        <div style={LABEL.style}>Show Author Details = Off</div>
        <Quote whiteBackground showQuoteTitle showDescription showAuthorDetails={false} />
      </div>
      <div>
        <div style={LABEL.style}>Quote text only (no title, no author)</div>
        <Quote whiteBackground showQuoteTitle={false} showDescription showAuthorDetails={false} />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Sizes Side-by-Side
   ════════════════════════════════════════════════════════════════════ */
export const Sizes = {
  name: 'Quote — Sizes',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 24, background: '#f3f4f6', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <div style={LABEL.style}>Large (max-width 848px)</div>
        <Quote
          size="large"
          whiteBackground
          quoteTitle="Title of quote"
          quoteText="The quote is placed here to highlight a specific saying or to present a brief quote that expresses an important idea or concept."
          authorName="Author's name"
          authorBrief="Brief or description."
          showAuthorDetails
          showQuoteTitle
          showDescription
        />
      </div>
      <div>
        <div style={LABEL.style}>Small (max-width 640px)</div>
        <Quote
          size="small"
          whiteBackground
          quoteTitle="Title of quote"
          quoteText="The quote is placed here to highlight a specific saying or to present a brief quote that expresses an important idea or concept."
          authorName="Author's name"
          authorBrief="Brief or description."
          showAuthorDetails
          showQuoteTitle
          showDescription
        />
      </div>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════════════════
   Full Figma Matrix (all 8 variants)
   ════════════════════════════════════════════════════════════════════ */
export const FullMatrix = {
  name: 'Quote — Full Figma Matrix',
  render: () => (
    <div style={{ fontFamily: FONT, padding: 24, display: 'flex', flexDirection: 'column', gap: 40 }}>
      {[false, true].map((rtl) =>
        ['large', 'small'].map((size) =>
          [true, false].map((whiteBackground) => (
            <div key={`${rtl}-${size}-${whiteBackground}`} style={{ background: whiteBackground ? '#f3f4f6' : '#ffffff', padding: 24, borderRadius: 8, border: '1px solid #e5e7eb' }}>
              <div style={LABEL.style}>
                {rtl ? 'RTL' : 'LTR'} · {size} · {whiteBackground ? 'white bg' : 'transparent bg'}
              </div>
              <Quote
                size={size}
                whiteBackground={whiteBackground}
                rtl={rtl}
                quoteTitle={rtl ? 'عنوان الاقتباس' : 'Title of quote'}
                quoteText={rtl
                  ? 'يُوضع الاقتباس هنا لإبراز قول معين أو لتقديم عبارة موجزة تعبّر عن فكرة أو مفهوم مهم.'
                  : 'The quote is placed here to highlight a specific saying or to present a brief quote that expresses an important idea or concept.'}
                authorName={rtl ? 'اسم المؤلف' : "Author's name"}
                authorBrief={rtl ? 'وصف مختصر.' : 'Brief or description.'}
                showAuthorDetails
                showQuoteTitle
                showDescription
              />
            </div>
          ))
        )
      )}
    </div>
  ),
};
