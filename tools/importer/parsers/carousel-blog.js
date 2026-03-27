/* eslint-disable */
/* global WebImporter */
/** Parser for carousel-blog. Base: carousel. Source: https://www.whiteladyfunerals.com.au/. Generated: 2026-03-27 */
export default function parse(element, { document }) {
  // Carousel model: each slide row has image (col1) + content (col2)
  // carousel-blog: Blog article cards with image, category, heading, description
  // Source: .jw-blog-carousel__carousel with .jw-blog-carousel__card children

  const cards = element.querySelectorAll('.jw-blog-carousel__card, .jw-card-guide');
  const cells = [];

  cards.forEach((card) => {
    // The card might be a link wrapper or contain one
    const link = card.closest('a') || card.querySelector('a');
    const image = card.querySelector('.jw-card-guide__image img, .jw-card-guide__image-container img, img');
    const category = card.querySelector('.jw-card-guide__category, [class*="category"]');
    const heading = card.querySelector('.jw-card-guide__heading, h3, h4, [class*="heading"]');
    const description = card.querySelector('.jw-card-guide__description, p, [class*="description"]');

    // Column 1: Image with field hint
    const imgFrag = document.createDocumentFragment();
    if (image) {
      imgFrag.appendChild(document.createComment(' field:image '));
      const img = document.createElement('img');
      img.src = image.getAttribute('src') || '';
      img.alt = image.getAttribute('alt') || '';
      imgFrag.appendChild(img);
    }

    // Column 2: Content with field hint
    const contentFrag = document.createDocumentFragment();
    contentFrag.appendChild(document.createComment(' field:content '));
    if (category) {
      const catP = document.createElement('p');
      catP.textContent = category.textContent.trim();
      contentFrag.appendChild(catP);
    }
    if (heading) {
      const h = document.createElement('h3');
      h.textContent = heading.textContent.trim();
      contentFrag.appendChild(h);
    }
    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent.trim();
      contentFrag.appendChild(p);
    }
    if (link) {
      const a = document.createElement('a');
      a.href = link.getAttribute('href') || '#';
      a.textContent = 'Read more';
      const p = document.createElement('p');
      p.appendChild(a);
      contentFrag.appendChild(p);
    }

    cells.push([imgFrag, contentFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-blog', cells });
  element.replaceWith(block);
}
