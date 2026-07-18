# Feature Prompts

Ready-to-hand-off prompts for the next round of Zidan Development features.
Each file is self-contained: paste its contents to Claude Code (or another
engineer) to implement that feature in isolation. They assume the reader has
already read `context/*.md` per `AGENTS.md`.

Ordered by recommended priority (highest-impact / lowest-effort first), not
by number — the number is just a stable filename.

| # | Feature | Why |
|---|---------|-----|
| 01 | [Legacy URL redirects](01-legacy-url-redirects.md) | Closes out the 2026-07-18 GSC indexing report; needs exported URL lists first |
| 02 | [Analytics & conversion tracking](02-analytics-and-conversion-tracking.md) | You can't grow visits you don't measure |
| 03 | [Payment / installment calculator](03-payment-calculator.md) | #1 requested tool on every Egyptian real-estate site; direct lead driver |
| 04 | [WhatsApp click-to-chat widget](04-whatsapp-live-chat-widget.md) | Lowest-effort, highest-conversion channel for this market |
| 05 | [Testimonials & reviews with schema](05-testimonials-and-reviews.md) | Trust signal + Review/AggregateRating rich snippets |
| 06 | [Downloadable brochure lead capture](06-downloadable-brochures-lead-capture.md) | Turns anonymous browsers into contactable leads |
| 07 | [Saved / favorite listings](07-favorites-saved-listings.md) | No-auth-required engagement loop, brings visitors back |
| 08 | [Interactive areas map](08-interactive-area-map.md) | Visual navigation across all 8 districts from one view |
| 09 | [Project comparison tool](09-project-comparison-tool.md) | Helps undecided visitors self-serve instead of bouncing |
| 10 | [Site search](10-site-search.md) | Projects + blog + FAQs are growing; visitors need to find things fast |
| 11 | [Core Web Vitals & accessibility audit](11-core-web-vitals-and-accessibility-audit.md) | Speed/a11y are ranking + retention factors, not yet measured |
| 12 | [Blog topic-cluster expansion](12-blog-content-expansion.md) | Compounding organic traffic once indexing is fixed |

## How to use one

1. Open the file, read it in full.
2. Paste the "Prompt" section verbatim (or adapt it) to Claude Code.
3. Update `context/progress-tracker.md` and `context/ui-registry.md` when done,
   per the repo's own rules in `AGENTS.md`.
