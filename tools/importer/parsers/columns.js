/* eslint-disable */
/* global WebImporter */
/** Parser for columns. Base: columns. Source: https://www.whiteladyfunerals.com.au/. Generated: 2026-03-27 */
export default function parse(element, { document }) {
  // Columns block: NO field hints required (per xwalk hinting rules)
  // Source: .jw-pin-scrolled-feature-panels__pinned-panels with multiple panels
  // Each panel has image + text (heading, description, CTA) side by side

  const panels = element.querySelectorAll('.jw-pin-scrolled-feature-panel');
  const cells = [];

  panels.forEach((panel) => {
    const image = panel.querySelector('.jw-pin-scrolled-feature-panel__image-container img.jw-image__image');
    const heading = panel.querySelector('.jw-pin-scrolled-feature-panel__heading');
    const description = panel.querySelector('.jw-pin-scrolled-feature-panel__description');
    const ctaEl = panel.querySelector('.jw-pin-scrolled-feature-panel__cta-container a.jw-cta');

    // Column 1: Image
    const imgCell = document.createDocumentFragment();
    if (image) {
      const img = document.createElement('img');
      img.src = image.getAttribute('src') || '';
      img.alt = image.getAttribute('alt') || '';
      imgCell.appendChild(img);
    }

    // Column 2: Text content (heading + description + CTA)
    const textCell = document.createDocumentFragment();
    if (heading) {
      const h3 = document.createElement('h3');
      h3.textContent = heading.textContent.trim();
      textCell.appendChild(h3);
    }
    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent.trim();
      textCell.appendChild(p);
    }
    if (ctaEl) {
      const ctaText = ctaEl.querySelector('.jw-cta__label')?.textContent?.trim() || ctaEl.textContent.trim();
      const href = ctaEl.getAttribute('href') || '#';
      const a = document.createElement('a');
      a.href = href;
      a.textContent = ctaText;
      const p = document.createElement('p');
      p.appendChild(a);
      textCell.appendChild(p);
    }

    cells.push([imgCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns', cells });
  element.replaceWith(block);
}
