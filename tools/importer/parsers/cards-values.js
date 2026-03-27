/* eslint-disable */
/* global WebImporter */
/** Parser for cards-values. Base: cards. Source: https://www.whiteladyfunerals.com.au/. Generated: 2026-03-27 */
export default function parse(element, { document }) {
  // Cards container model: each row is a card with image (col1) + text (col2)
  // cards-values: text-only USP items (Grace, Compassion, Presence) - no images
  // Source: .jw-usp-grid with .jw-usp-grid__item children

  const items = element.querySelectorAll('.jw-usp-grid__item, .jw-usp-item');
  const cells = [];

  items.forEach((item) => {
    const heading = item.querySelector('h2, h3, h4, .jw-usp-item__heading');
    const description = item.querySelector('p, .jw-usp-item__description, .typography');

    // Column 1: Empty image cell (no images for values variant)
    const imgFrag = document.createDocumentFragment();

    // Column 2: Text content with field hint
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));
    if (heading) {
      const h = document.createElement('h3');
      h.textContent = heading.textContent.trim();
      textFrag.appendChild(h);
    }
    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent.trim();
      textFrag.appendChild(p);
    }

    cells.push([imgFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-values', cells });
  element.replaceWith(block);
}
