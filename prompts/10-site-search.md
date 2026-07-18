# Site Search

## Why

The content surface has grown past what nav-only discovery covers well:
8 project areas, per-project units, a growing blog, and 15+ FAQs. There's
already a `WebSite` JSON-LD in `lib/seo.ts` with a `SearchAction` pointing at
`/en/projects?q={search_term_string}` — that schema promise isn't backed by
an actual search implementation yet. A real site search closes that gap and
gives Google a legitimate sitelinks searchbox target.

## What to add

A single search entry point (header search icon or `/search` page) querying
across projects, blog posts, and FAQs, backed by Postgres full-text search
(no need for a separate search service like Algolia at this content volume).

## Prompt

```
Add site search to zidan_development, backing the SearchAction JSON-LD
already declared in lib/seo.ts's websiteJsonLd (currently a promise with no
implementation — targets /en/projects?q={search_term_string}).

1. Decide the search surface: either (a) a dedicated /search page reading
   ?q= from searchParams, or (b) inline filtering on /projects as the
   JSON-LD currently implies. Prefer (a) — a real cross-content search page —
   and update the SearchAction target in lib/seo.ts to match
   (/en/search?q={search_term_string}).
2. Use Postgres full-text search (tsvector/tsquery) via Prisma raw queries
   across Project (name/description/district), Blog (title/excerpt/body),
   and the static bilingual FAQ content in content/faqs.ts — don't reach for
   an external search service at this content volume (a few dozen projects/
   units/posts + 15 FAQs).
3. Build app/[locale]/(marketing)/search/page.tsx (server component, reads
   searchParams.q) rendering grouped results (Projects / Blog / FAQs) reusing
   existing ProjectCard / PostCard components rather than new result-row
   components.
4. Add a search trigger to components/layout/header.tsx — a magnifier icon
   opening either a dropdown-with-input or navigating to /search, following
   whatever interaction pattern the existing mobile drawer / language toggle
   already establishes (don't invent a new UI paradigm for one feature).
5. This page should be indexable ONLY when it has meaningful content — set
   noIndex when q is empty or the query returns zero results (avoid Google
   indexing a wall of empty/thin search-result pages, a classic soft-404-
   adjacent SEO trap for site-search pages).
6. Debounce/guard against querying on every keystroke if you build a live
   dropdown variant — this hits Postgres per request, so add reasonable
   debounce/rate-limiting client-side.
7. All UI strings in messages/{en,ar}.json (locale-aware placeholder text,
   "no results" copy, etc.).
8. Update context/progress-tracker.md and context/architecture.md (note the
   SearchAction is now actually implemented, not just declared).
```
