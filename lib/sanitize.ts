import sanitizeHtml from "sanitize-html";

/**
 * Sanitize rich-text HTML (from TipTap) before persisting to Postgres.
 *
 * Uses `sanitize-html` (pure JS, no jsdom) so it works in serverless runtimes
 * where isomorphic-dompurify's jsdom dependency fails (CJS/ESM conflict).
 *
 * `style` + `allowedStyles` are configured because the TipTap Color and
 * TextAlign extensions emit inline styles (color, text-align, background-color).
 */
const config: sanitizeHtml.IOptions = {
  allowedTags: [
    "h1", "h2", "h3", "p", "br", "hr",
    "strong", "em", "u", "s", "code", "pre",
    "blockquote", "ul", "ol", "li",
    "a", "span", "mark", "img", "div",
  ],
  allowedAttributes: {
    "*": ["style", "class"],
    a: ["href", "target", "rel"],
    img: ["src", "alt", "title"],
    span: ["style", "color"],
    mark: ["style", "data-color"],
  },
  allowedStyles: {
    "*": {
      color: [/^#?[0-9a-fA-F]{3,8}$/],
      "text-align": [/^(left|center|right|justify)$/],
    },
    mark: {
      "background-color": [/^#?[0-9a-fA-F]{3,8}$/],
    },
    span: {
      "background-color": [/^#?[0-9a-fA-F]{3,8}$/],
    },
  },
  allowedSchemes: ["http", "https", "mailto"],
};

export function sanitizeBlogHtml(dirty: string): string {
  return sanitizeHtml(dirty, config);
}
