import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitize rich-text HTML (from TipTap) before persisting to Postgres.
 * `style` is allowed because the Color and TextAlign extensions emit inline
 * styles (color, text-align). Run this in the Server Action, never trust the
 * client's getHTML() directly.
 */
const ALLOWED_TAGS = [
  "h1", "h2", "h3", "p", "br", "hr",
  "strong", "em", "u", "s", "code", "pre",
  "blockquote", "ul", "ol", "li",
  "a", "span", "mark", "img", "div",
];
const ALLOWED_ATTR = [
  "href", "target", "rel", "src", "alt", "title", "style", "class", "color",
];

export function sanitizeBlogHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  });
}
