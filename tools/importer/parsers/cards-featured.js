/* eslint-disable */
/* global WebImporter */
/** Parser for cards-featured. Base: cards. Source: https://www.whiteladyfunerals.com.au/. Generated: 2026-03-27 */
export default function parse(element, { document }) {
  // Cards container model: each row is a card with image (col1) + text (col2)
  // cards-featured: Large action cards with background images and CTAs
  // Source: .jw-card-featured-grid with .jw-card-featured children

  const cards = element.querySelectorAll('.jw-card-featured, .jw-card-featured-grid__card');
  const cells = [];

  cards.forEach((card) => {
    const image = card.querySelector('img.jw-image__image, .jw-card-featured__image img, img[class*="image"]');
    const heading = card.querySelector('h2, h3, .jw-card-featured__heading');
    const description = card.querySelector('p, .jw-card-featured__description, .typography');
    const ctaEl = card.querySelector('a.jw-cta, a[class*="cta"]');

    // Column 1: Image with field hint
    const imgFrag = document.createDocumentFragment();
    if (image) {
      imgFrag.appendChild(document.createComment(' field:image '));
      const img = document.createElement('img');
      img.src = image.getAttribute('src') || '';
      img.alt = image.getAttribute('alt') || '';
      imgFrag.appendChild(img);
    }

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
    if (ctaEl) {
      const ctaText = ctaEl.querySelector('.jw-cta__label')?.textContent?.trim() || ctaEl.textContent.trim();
      const href = ctaEl.getAttribute('href') || '#';
      const a = document.createElement('a');
      a.href = href;
      a.textContent = ctaText;
      const p = document.createElement('p');
      p.appendChild(a);
      textFrag.appendChild(p);
    }

    cells.push([imgFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-featured', cells });
  element.replaceWith(block);
}
