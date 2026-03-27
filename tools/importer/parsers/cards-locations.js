/* eslint-disable */
/* global WebImporter */
/** Parser for cards-locations. Base: cards. Source: https://www.whiteladyfunerals.com.au/. Generated: 2026-03-27 */
export default function parse(element, { document }) {
  // Cards container model: each row is a card with image (col1) + text (col2)
  // cards-locations: State location cards with count and link, no images
  // Source: .jw-locations-callout__locations with .jw-locations-callout__location children

  const locations = element.querySelectorAll('.jw-locations-callout__location, .jw-location-card');
  const cells = [];

  locations.forEach((loc) => {
    const stateName = loc.querySelector('h3, h4, .jw-locations-callout__state, [class*="state"]');
    const count = loc.querySelector('.jw-locations-callout__count, [class*="count"], span');
    const link = loc.querySelector('a');

    // Column 1: Empty image cell
    const imgFrag = document.createDocumentFragment();

    // Column 2: Text content with field hint
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));
    if (stateName) {
      const h = document.createElement('h3');
      h.textContent = stateName.textContent.trim();
      textFrag.appendChild(h);
    }
    if (count && (!stateName || count.textContent.trim() !== stateName.textContent.trim())) {
      const p = document.createElement('p');
      p.textContent = count.textContent.trim();
      textFrag.appendChild(p);
    }
    if (link) {
      const a = document.createElement('a');
      a.href = link.getAttribute('href') || '#';
      a.textContent = link.textContent.trim() || stateName?.textContent?.trim() || 'View locations';
      const p = document.createElement('p');
      p.appendChild(a);
      textFrag.appendChild(p);
    }

    cells.push([imgFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-locations', cells });
  element.replaceWith(block);
}
