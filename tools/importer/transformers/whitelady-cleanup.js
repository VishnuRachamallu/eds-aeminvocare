/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: White Lady Funerals cleanup.
 * Selectors from captured DOM of https://www.whiteladyfunerals.com.au/
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove overlays and elements that may block parsing
    // Found in captured HTML: .jw-header__overlay, .jw-header__clone
    WebImporter.DOMUtils.remove(element, [
      '.jw-header__overlay',
      '.jw-header__clone',
      'noscript',
      'script',
    ]);
  }
  if (hookName === H.after) {
    // Remove non-authorable content: header, footer, nav
    // Found in captured HTML: header.jw-header, footer.jw-footer, nav.jw-navigation
    WebImporter.DOMUtils.remove(element, [
      'header.jw-header',
      'footer.jw-footer',
      'nav.jw-navigation',
      'iframe',
      'link',
    ]);
    // Remove tracking/interaction attributes
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('data-track');
      el.removeAttribute('onclick');
      el.removeAttribute('data-analytics');
    });
  }
}
