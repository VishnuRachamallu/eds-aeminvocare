/* eslint-disable */
/* global WebImporter */
/** Parser for cards-testimonial. Base: cards. Source: https://www.whiteladyfunerals.com.au/. Generated: 2026-03-27 */
export default function parse(element, { document }) {
  // Cards container model: each row is a card with image (col1) + text (col2)
  // cards-testimonial: Testimonial quote cards with star ratings and attribution
  // Source: .jw-testimonials__testimonials with .jw-testimonial-card children

  const testimonials = element.querySelectorAll('.jw-testimonial-card, .jw-testimonials__card, [class*="testimonial-card"]');
  const cells = [];

  testimonials.forEach((card) => {
    const quote = card.querySelector('.jw-testimonial-card__quote, .jw-testimonial-card__text, p, [class*="quote"]');
    const author = card.querySelector('.jw-testimonial-card__author, .jw-testimonial-card__name, [class*="author"], [class*="name"]');
    const rating = card.querySelector('.jw-testimonial-card__rating, [class*="rating"], [class*="stars"]');

    // Column 1: Empty image cell
    const imgFrag = document.createDocumentFragment();

    // Column 2: Text content with field hint
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));

    if (rating) {
      const ratingP = document.createElement('p');
      ratingP.textContent = rating.textContent.trim() || '★★★★★';
      textFrag.appendChild(ratingP);
    }
    if (quote) {
      const blockquote = document.createElement('p');
      blockquote.textContent = quote.textContent.trim();
      textFrag.appendChild(blockquote);
    }
    if (author) {
      const em = document.createElement('em');
      em.textContent = author.textContent.trim();
      const p = document.createElement('p');
      p.appendChild(em);
      textFrag.appendChild(p);
    }

    cells.push([imgFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-testimonial', cells });
  element.replaceWith(block);
}
