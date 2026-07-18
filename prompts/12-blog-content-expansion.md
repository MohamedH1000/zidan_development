# Blog Topic-Cluster Expansion

## Why

Once the indexing fixes from 2026-07-18 (see `context/progress-tracker.md`
and `prompts/01-legacy-url-redirects.md`) take effect, the blog is the
compounding-growth lever: it's the only content type that can rank for
non-branded, top-of-funnel searches ("payment plans New Cairo", "best areas
to invest Fifth Settlement", etc.) that a project/area page can't naturally
target. The blog is DB-backed and admin-editable already
(`app/[locale]/(admin)/admin/(protected)/blogs/`) — this is a content and
information-architecture task more than an engineering one.

## What to add

A topic-cluster content plan (pillar page + supporting articles) targeting
the actual buyer questions this developer's audience searches for, backed
by real keyword/competitor research — not invented topics.

## Prompt

```
Use the searchfit-seo content-strategy and keyword-clustering skills (or
content-strategist/competitor-analyzer agents) against
https://www.zidandevelopments.com to build a topic-cluster plan for the
existing DB-backed blog (app/[locale]/(marketing)/blog/, admin CRUD at
app/[locale]/(admin)/admin/(protected)/blogs/).

1. Research actual search demand and competitor content for New Cairo real
   estate topics (payment plans, area comparisons — Al Narges vs Bait Al
   Watan vs Al Andalus vs Lotus vs Gardenia Heights vs Al Takmely vs South
   Investors vs Fifth Settlement — buyer/investor guides, delivery
   timelines, finishing specs) rather than inventing topics from the
   existing `content/faqs.ts` alone.
2. Propose one pillar page (e.g. "New Cairo Real Estate Buyer's Guide") and
   6-10 supporting articles that internally link to it and to relevant
   project pages (/projects/[slug]) — internal linking from blog → project
   pages is the actual SEO payoff here, not just publishing volume.
3. For each proposed article, specify: target keyword, search intent,
   suggested title/meta description (following the existing buildMetadata
   pattern's length constraints — see lib/seo.ts), and which existing
   project(s)/area(s) it should link to.
4. Write 2-3 of the highest-priority articles fully (title, excerpt, body
   HTML compatible with the existing TipTap-rendered `bodyHtml` field per
   the Blog schema, tags, SEO fields) and create them via the admin blog
   form or directly via Prisma seed, matching the existing bilingual
   (_en/_ar equivalent per-locale row) content pattern used by
   content/posts.ts and the Blog model.
5. Do not fabricate statistics, pricing, or delivery-date claims not sourced
   from the developer's real project data (content/projects.ts / the DB) —
   real-estate marketing claims are subject to advertising-standards
   scrutiny in addition to being an SEO/trust risk if wrong.
6. Update context/progress-tracker.md with the content plan and what
   shipped vs. what's queued.
```
