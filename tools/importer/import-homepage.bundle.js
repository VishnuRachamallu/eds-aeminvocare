var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero.js
  function parse(element, { document }) {
    var _a, _b;
    const bgImage = element.querySelector('.jw-primary-hero__video-container video source[src*=".mp4"], .jw-primary-hero__media-container img.jw-image__image');
    const imgRow = [];
    if (bgImage) {
      const img = document.createElement("img");
      img.src = bgImage.src || bgImage.getAttribute("src") || "";
      img.alt = "White Lady Funerals hero background";
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(" field:image "));
      frag.appendChild(img);
      imgRow.push(frag);
    }
    const heading = element.querySelector(".jw-primary-hero__heading h1, .jw-primary-hero__heading h2");
    const description = element.querySelector(".jw-primary-hero__description .typography");
    const ctaEl = element.querySelector(".jw-primary-hero__cta-container .jw-cta");
    const contentFrag = document.createDocumentFragment();
    contentFrag.appendChild(document.createComment(" field:text "));
    if (heading) contentFrag.appendChild(heading);
    if (description) {
      const p = document.createElement("p");
      p.textContent = description.textContent.trim();
      contentFrag.appendChild(p);
    }
    if (ctaEl) {
      const ctaText = ((_b = (_a = ctaEl.querySelector(".jw-cta__label")) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim()) || ctaEl.textContent.trim();
      const href = ctaEl.getAttribute("href") || ctaEl.getAttribute("title") || "#";
      const a = document.createElement("a");
      a.href = href;
      a.textContent = ctaText;
      const strong = document.createElement("strong");
      strong.appendChild(a);
      contentFrag.appendChild(strong);
    }
    const cells = [];
    if (imgRow.length) cells.push(imgRow);
    cells.push([contentFrag]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns.js
  function parse2(element, { document }) {
    const panels = element.querySelectorAll(".jw-pin-scrolled-feature-panel");
    const cells = [];
    panels.forEach((panel) => {
      var _a, _b;
      const image = panel.querySelector(".jw-pin-scrolled-feature-panel__image-container img.jw-image__image");
      const heading = panel.querySelector(".jw-pin-scrolled-feature-panel__heading");
      const description = panel.querySelector(".jw-pin-scrolled-feature-panel__description");
      const ctaEl = panel.querySelector(".jw-pin-scrolled-feature-panel__cta-container a.jw-cta");
      const imgCell = document.createDocumentFragment();
      if (image) {
        const img = document.createElement("img");
        img.src = image.getAttribute("src") || "";
        img.alt = image.getAttribute("alt") || "";
        imgCell.appendChild(img);
      }
      const textCell = document.createDocumentFragment();
      if (heading) {
        const h3 = document.createElement("h3");
        h3.textContent = heading.textContent.trim();
        textCell.appendChild(h3);
      }
      if (description) {
        const p = document.createElement("p");
        p.textContent = description.textContent.trim();
        textCell.appendChild(p);
      }
      if (ctaEl) {
        const ctaText = ((_b = (_a = ctaEl.querySelector(".jw-cta__label")) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim()) || ctaEl.textContent.trim();
        const href = ctaEl.getAttribute("href") || "#";
        const a = document.createElement("a");
        a.href = href;
        a.textContent = ctaText;
        const p = document.createElement("p");
        p.appendChild(a);
        textCell.appendChild(p);
      }
      cells.push([imgCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "columns", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-values.js
  function parse3(element, { document }) {
    const items = element.querySelectorAll(".jw-usp-grid__item, .jw-usp-item");
    const cells = [];
    items.forEach((item) => {
      const heading = item.querySelector("h2, h3, h4, .jw-usp-item__heading");
      const description = item.querySelector("p, .jw-usp-item__description, .typography");
      const imgFrag = document.createDocumentFragment();
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (heading) {
        const h = document.createElement("h3");
        h.textContent = heading.textContent.trim();
        textFrag.appendChild(h);
      }
      if (description) {
        const p = document.createElement("p");
        p.textContent = description.textContent.trim();
        textFrag.appendChild(p);
      }
      cells.push([imgFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-values", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-featured.js
  function parse4(element, { document }) {
    const cards = element.querySelectorAll(".jw-card-featured, .jw-card-featured-grid__card");
    const cells = [];
    cards.forEach((card) => {
      var _a, _b;
      const image = card.querySelector('img.jw-image__image, .jw-card-featured__image img, img[class*="image"]');
      const heading = card.querySelector("h2, h3, .jw-card-featured__heading");
      const description = card.querySelector("p, .jw-card-featured__description, .typography");
      const ctaEl = card.querySelector('a.jw-cta, a[class*="cta"]');
      const imgFrag = document.createDocumentFragment();
      if (image) {
        imgFrag.appendChild(document.createComment(" field:image "));
        const img = document.createElement("img");
        img.src = image.getAttribute("src") || "";
        img.alt = image.getAttribute("alt") || "";
        imgFrag.appendChild(img);
      }
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (heading) {
        const h = document.createElement("h3");
        h.textContent = heading.textContent.trim();
        textFrag.appendChild(h);
      }
      if (description) {
        const p = document.createElement("p");
        p.textContent = description.textContent.trim();
        textFrag.appendChild(p);
      }
      if (ctaEl) {
        const ctaText = ((_b = (_a = ctaEl.querySelector(".jw-cta__label")) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim()) || ctaEl.textContent.trim();
        const href = ctaEl.getAttribute("href") || "#";
        const a = document.createElement("a");
        a.href = href;
        a.textContent = ctaText;
        const p = document.createElement("p");
        p.appendChild(a);
        textFrag.appendChild(p);
      }
      cells.push([imgFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-featured", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-locations.js
  function parse5(element, { document }) {
    const locations = element.querySelectorAll(".jw-locations-callout__location, .jw-location-card");
    const cells = [];
    locations.forEach((loc) => {
      var _a;
      const stateName = loc.querySelector('h3, h4, .jw-locations-callout__state, [class*="state"]');
      const count = loc.querySelector('.jw-locations-callout__count, [class*="count"], span');
      const link = loc.querySelector("a");
      const imgFrag = document.createDocumentFragment();
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (stateName) {
        const h = document.createElement("h3");
        h.textContent = stateName.textContent.trim();
        textFrag.appendChild(h);
      }
      if (count && (!stateName || count.textContent.trim() !== stateName.textContent.trim())) {
        const p = document.createElement("p");
        p.textContent = count.textContent.trim();
        textFrag.appendChild(p);
      }
      if (link) {
        const a = document.createElement("a");
        a.href = link.getAttribute("href") || "#";
        a.textContent = link.textContent.trim() || ((_a = stateName == null ? void 0 : stateName.textContent) == null ? void 0 : _a.trim()) || "View locations";
        const p = document.createElement("p");
        p.appendChild(a);
        textFrag.appendChild(p);
      }
      cells.push([imgFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-locations", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-testimonial.js
  function parse6(element, { document }) {
    const testimonials = element.querySelectorAll('.jw-testimonial-card, .jw-testimonials__card, [class*="testimonial-card"]');
    const cells = [];
    testimonials.forEach((card) => {
      const quote = card.querySelector('.jw-testimonial-card__quote, .jw-testimonial-card__text, p, [class*="quote"]');
      const author = card.querySelector('.jw-testimonial-card__author, .jw-testimonial-card__name, [class*="author"], [class*="name"]');
      const rating = card.querySelector('.jw-testimonial-card__rating, [class*="rating"], [class*="stars"]');
      const imgFrag = document.createDocumentFragment();
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (rating) {
        const ratingP = document.createElement("p");
        ratingP.textContent = rating.textContent.trim() || "\u2605\u2605\u2605\u2605\u2605";
        textFrag.appendChild(ratingP);
      }
      if (quote) {
        const blockquote = document.createElement("p");
        blockquote.textContent = quote.textContent.trim();
        textFrag.appendChild(blockquote);
      }
      if (author) {
        const em = document.createElement("em");
        em.textContent = author.textContent.trim();
        const p = document.createElement("p");
        p.appendChild(em);
        textFrag.appendChild(p);
      }
      cells.push([imgFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-blog.js
  function parse7(element, { document }) {
    const cards = element.querySelectorAll(".jw-blog-carousel__card, .jw-card-guide");
    const cells = [];
    cards.forEach((card) => {
      const link = card.closest("a") || card.querySelector("a");
      const image = card.querySelector(".jw-card-guide__image img, .jw-card-guide__image-container img, img");
      const category = card.querySelector('.jw-card-guide__category, [class*="category"]');
      const heading = card.querySelector('.jw-card-guide__heading, h3, h4, [class*="heading"]');
      const description = card.querySelector('.jw-card-guide__description, p, [class*="description"]');
      const imgFrag = document.createDocumentFragment();
      if (image) {
        imgFrag.appendChild(document.createComment(" field:image "));
        const img = document.createElement("img");
        img.src = image.getAttribute("src") || "";
        img.alt = image.getAttribute("alt") || "";
        imgFrag.appendChild(img);
      }
      const contentFrag = document.createDocumentFragment();
      contentFrag.appendChild(document.createComment(" field:content "));
      if (category) {
        const catP = document.createElement("p");
        catP.textContent = category.textContent.trim();
        contentFrag.appendChild(catP);
      }
      if (heading) {
        const h = document.createElement("h3");
        h.textContent = heading.textContent.trim();
        contentFrag.appendChild(h);
      }
      if (description) {
        const p = document.createElement("p");
        p.textContent = description.textContent.trim();
        contentFrag.appendChild(p);
      }
      if (link) {
        const a = document.createElement("a");
        a.href = link.getAttribute("href") || "#";
        a.textContent = "Read more";
        const p = document.createElement("p");
        p.appendChild(a);
        contentFrag.appendChild(p);
      }
      cells.push([imgFrag, contentFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-blog", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/whitelady-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        ".jw-header__overlay",
        ".jw-header__clone",
        "noscript",
        "script"
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "header.jw-header",
        "footer.jw-footer",
        "nav.jw-navigation",
        "iframe",
        "link"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("data-track");
        el.removeAttribute("onclick");
        el.removeAttribute("data-analytics");
      });
    }
  }

  // tools/importer/transformers/whitelady-sections.js
  var H2 = { before: "beforeTransform", after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const { document } = payload;
      const template = payload.template;
      if (!template || !template.sections || template.sections.length < 2) return;
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selector = section.selector;
        const sectionEl = element.querySelector(selector);
        if (!sectionEl) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metaBlock);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero": parse,
    "columns": parse2,
    "cards-values": parse3,
    "cards-featured": parse4,
    "cards-locations": parse5,
    "cards-testimonial": parse6,
    "carousel-blog": parse7
  };
  var transformers = [
    transform
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "White Lady Funerals homepage with hero, services overview, and company information",
    urls: [
      "https://www.whiteladyfunerals.com.au/"
    ],
    blocks: [
      {
        name: "hero",
        instances: [".jw-primary-hero"]
      },
      {
        name: "columns",
        instances: [".jw-pin-scrolled-feature-panels__pinned-panels"]
      },
      {
        name: "cards-values",
        instances: [".jw-usp-grid"]
      },
      {
        name: "cards-featured",
        instances: [".jw-card-featured-grid"]
      },
      {
        name: "cards-locations",
        instances: [".jw-locations-callout__locations"]
      },
      {
        name: "cards-testimonial",
        instances: [".jw-testimonials__testimonials"]
      },
      {
        name: "carousel-blog",
        instances: [".jw-blog-carousel__carousel"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: ".jw-primary-hero",
        style: null,
        blocks: ["hero"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Text Block with Badges",
        selector: ".jw-text-block",
        style: null,
        blocks: [],
        defaultContent: [
          ".jw-text-block__content h2",
          ".jw-text-block__content .typography-body-large",
          ".jw-facilities-block__facilities"
        ]
      },
      {
        id: "section-3",
        name: "Feature Panels",
        selector: ".jw-pin-scrolled-feature-panels",
        style: null,
        blocks: ["columns"],
        defaultContent: [
          ".jw-pin-scrolled-feature-panels .jw-section-wrap__heading h2"
        ]
      },
      {
        id: "section-4",
        name: "Featured Cards Breakout",
        selector: ".jw-featured-cards-breakout",
        style: "dark",
        blocks: ["cards-values", "cards-featured"],
        defaultContent: [
          ".jw-scrolling-text"
        ]
      },
      {
        id: "section-5",
        name: "Locations Callout",
        selector: ".jw-locations-callout",
        style: null,
        blocks: ["cards-locations"],
        defaultContent: [
          ".jw-locations-callout .jw-section-wrap__heading h2",
          ".jw-locations-callout .jw-section-wrap__cta-container a"
        ]
      },
      {
        id: "section-6",
        name: "Testimonials",
        selector: ".jw-testimonials",
        style: "dark",
        blocks: ["cards-testimonial"],
        defaultContent: [
          ".jw-testimonials .jw-section-wrap__heading h2"
        ]
      },
      {
        id: "section-7",
        name: "Blog Carousel",
        selector: ".jw-blog-carousel",
        style: null,
        blocks: ["carousel-blog"],
        defaultContent: [
          ".jw-blog-carousel .jw-section-wrap__heading h2",
          ".jw-blog-carousel .jw-section-wrap__cta-container a"
        ]
      },
      {
        id: "section-8",
        name: "Footer CTA",
        selector: ".jw-cta-block",
        style: "dark",
        blocks: [],
        defaultContent: [
          ".jw-cta-block h2",
          ".jw-cta-block a"
        ]
      }
    ]
  };
  var allTransformers = [
    ...transformers,
    transform2
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    allTransformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path: path || "/index",
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
