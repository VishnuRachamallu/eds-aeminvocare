/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroParser from './parsers/hero.js';
import columnsParser from './parsers/columns.js';
import cardsValuesParser from './parsers/cards-values.js';
import cardsFeaturedParser from './parsers/cards-featured.js';
import cardsLocationsParser from './parsers/cards-locations.js';
import cardsTestimonialParser from './parsers/cards-testimonial.js';
import carouselBlogParser from './parsers/carousel-blog.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/whitelady-cleanup.js';
import sectionsTransformer from './transformers/whitelady-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero': heroParser,
  'columns': columnsParser,
  'cards-values': cardsValuesParser,
  'cards-featured': cardsFeaturedParser,
  'cards-locations': cardsLocationsParser,
  'cards-testimonial': cardsTestimonialParser,
  'carousel-blog': carouselBlogParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'White Lady Funerals homepage with hero, services overview, and company information',
  urls: [
    'https://www.whiteladyfunerals.com.au/'
  ],
  blocks: [
    {
      name: 'hero',
      instances: ['.jw-primary-hero']
    },
    {
      name: 'columns',
      instances: ['.jw-pin-scrolled-feature-panels__pinned-panels']
    },
    {
      name: 'cards-values',
      instances: ['.jw-usp-grid']
    },
    {
      name: 'cards-featured',
      instances: ['.jw-card-featured-grid']
    },
    {
      name: 'cards-locations',
      instances: ['.jw-locations-callout__locations']
    },
    {
      name: 'cards-testimonial',
      instances: ['.jw-testimonials__testimonials']
    },
    {
      name: 'carousel-blog',
      instances: ['.jw-blog-carousel__carousel']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: '.jw-primary-hero',
      style: null,
      blocks: ['hero'],
      defaultContent: []
    },
    {
      id: 'section-2',
      name: 'Text Block with Badges',
      selector: '.jw-text-block',
      style: null,
      blocks: [],
      defaultContent: [
        '.jw-text-block__content h2',
        '.jw-text-block__content .typography-body-large',
        '.jw-facilities-block__facilities'
      ]
    },
    {
      id: 'section-3',
      name: 'Feature Panels',
      selector: '.jw-pin-scrolled-feature-panels',
      style: null,
      blocks: ['columns'],
      defaultContent: [
        '.jw-pin-scrolled-feature-panels .jw-section-wrap__heading h2'
      ]
    },
    {
      id: 'section-4',
      name: 'Featured Cards Breakout',
      selector: '.jw-featured-cards-breakout',
      style: 'dark',
      blocks: ['cards-values', 'cards-featured'],
      defaultContent: [
        '.jw-scrolling-text'
      ]
    },
    {
      id: 'section-5',
      name: 'Locations Callout',
      selector: '.jw-locations-callout',
      style: null,
      blocks: ['cards-locations'],
      defaultContent: [
        '.jw-locations-callout .jw-section-wrap__heading h2',
        '.jw-locations-callout .jw-section-wrap__cta-container a'
      ]
    },
    {
      id: 'section-6',
      name: 'Testimonials',
      selector: '.jw-testimonials',
      style: 'dark',
      blocks: ['cards-testimonial'],
      defaultContent: [
        '.jw-testimonials .jw-section-wrap__heading h2'
      ]
    },
    {
      id: 'section-7',
      name: 'Blog Carousel',
      selector: '.jw-blog-carousel',
      style: null,
      blocks: ['carousel-blog'],
      defaultContent: [
        '.jw-blog-carousel .jw-section-wrap__heading h2',
        '.jw-blog-carousel .jw-section-wrap__cta-container a'
      ]
    },
    {
      id: 'section-8',
      name: 'Footer CTA',
      selector: '.jw-cta-block',
      style: 'dark',
      blocks: [],
      defaultContent: [
        '.jw-cta-block h2',
        '.jw-cta-block a'
      ]
    }
  ]
};

// Section transformer conditionally added (template has 8 sections)
const allTransformers = [
  ...transformers,
  sectionsTransformer,
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  allTransformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path: path || '/index',
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
