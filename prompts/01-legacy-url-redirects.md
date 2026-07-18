# Legacy URL Redirects (WordPress → Next.js migration cleanup)

## Background

On 2026-07-18 Google Search Console flagged "Not found (404)", "Page with
redirect", "Alternative page with proper canonical tag", "Blocked by
robots.txt" and "Blocked due to other 4xx issue" as new reasons preventing
indexing. A live-site audit that day found:

- The four systemic causes from the 2026-07-15 fix (canonical host, DB-driven
  sitemap, soft-404 noindex, admin noindex) are correctly implemented in code.
- `app/robots.ts` and `app/sitemap.ts` are correct; canonical/hreflang tags on
  `/en/*` and `/ar/*` self-reference correctly.
- Old WordPress-style URLs (e.g. `/2024/01/some-post/`, `/category/news/`)
  correctly return a **real HTTP 404** today — that part is fine.
- What's *not* fine: there's no mapping from the old `zidandevelopments.com`
  WordPress site's actual indexed URLs to their new Next.js equivalents. Every
  one of those old URLs Google still has indexed is a hard 404 today, which is
  exactly what's populating the GSC "Not found (404)" bucket, and it's costing
  accumulated link equity from any inbound links that pointed at the old URLs.
- `app/robots.ts` had no `revalidate` export, so a robots.txt change only ships
  on a fresh deploy — already fixed (see `context/progress-tracker.md`,
  2026-07-18 entry) by adding `export const revalidate = 3600`.

## Why this needs real data, not guesses

Redirecting a guessed-at old URL to the *wrong* new page is worse for SEO and
UX than leaving it as a 404. Do not invent redirect targets from assumptions
about what the old WordPress site's URL structure "probably" was.

## Prompt

```
Before writing any redirects, get the exact list of affected URLs from Google
Search Console: Search Console → Indexing → Pages → click each of "Not found
(404)", "Page with redirect", "Blocked by robots.txt" → Export → CSV.

Given that CSV (ask the user for it if not attached), for zidan_development:

1. Group the "Not found (404)" URLs by pattern (old blog post permalinks,
   category/tag archives, author archives, /wp-content/, /wp-json/, etc.).
2. For each URL that has an obvious 1:1 new equivalent (e.g. an old post slug
   that matches a slug in the `Blog` Prisma model, or an old project/area name
   that matches an `areas` entry in config/site.ts), add a permanent redirect
   in `next.config.ts`'s `redirects()` function: old path → new localized path
   (remember the site is locale-prefixed: redirect to `/en/...` and let
   next-intl's proxy handle language negotiation, or add both /en and /ar
   targets if you can infer the visitor's history).
3. For URLs with no real new equivalent (old category archives, WP system
   paths, thin/spam content), do NOT redirect to a plausible-but-wrong page.
   Leave them as genuine 404s — Google drops these from the index over time
   once it re-crawls and confirms they're gone. Redirecting a WP category
   archive to an unrelated page is against Google's own redirect guidelines
   (SoftContent/ misleading redirect) and can look like sneaky redirects.
4. Review the "Page with redirect" export — most of these are the intentional
   next-intl locale-detection redirect (bare `/about` → `/en/about`, 307).
   That's expected/correct; only act if you find a *sitemap-listed* URL that
   itself resolves through a redirect (the sitemap should never advertise a
   URL that isn't already canonical).
5. After adding redirects, verify each new rule with curl against the local
   dev server (`npm run dev`) before considering this done — check status
   code and final Location header, not just that the app builds.
6. Update context/progress-tracker.md with what was added and why.
```
