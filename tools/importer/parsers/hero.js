/* eslint-disable */
/* global WebImporter */
/** Parser for hero. Base: hero. Source: https://www.whiteladyfunerals.com.au/. Generated: 2026-03-27 */
export default function parse(element, { document }) {
  // Hero model fields: image (row 1), text (row 2) - imageAlt is collapsed
  // Source: .jw-primary-hero with h1, description span, CTA button, video/image background

  // Row 1: Background image
  const bgImage = element.querySelector('.jw-primary-hero__video-container video source[src*=".mp4"], .jw-primary-hero__media-container img.jw-image__image');
  const imgRow = [];
  if (bgImage) {
    const img = document.createElement('img');
    img.src = bgImage.src || bgImage.getAttribute('src') || '';
    img.alt = 'White Lady Funerals hero background';
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(' field:image '));
    frag.appendChild(img);
    imgRow.push(frag);
  }

  // Row 2: Heading + description + CTA
  const heading = element.querySelector('.jw-primary-hero__heading h1, .jw-primary-hero__heading h2');
  const description = element.querySelector('.jw-primary-hero__description .typography');
  const ctaEl = element.querySelector('.jw-primary-hero__cta-container .jw-cta');

  const contentFrag = document.createDocumentFragment();
  contentFrag.appendChild(document.createComment(' field:text '));
  if (heading) contentFrag.appendChild(heading);
  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    contentFrag.appendChild(p);
  }
  if (ctaEl) {
    const ctaText = ctaEl.querySelector('.jw-cta__label')?.textContent?.trim() || ctaEl.textContent.trim();
    const href = ctaEl.getAttribute('href') || ctaEl.getAttribute('title') || '#';
    const a = document.createElement('a');
    a.href = href;
    a.textContent = ctaText;
    const strong = document.createElement('strong');
    strong.appendChild(a);
    contentFrag.appendChild(strong);
  }

  const cells = [];
  if (imgRow.length) cells.push(imgRow);
  cells.push([contentFrag]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero', cells });
  element.replaceWith(block);
}
