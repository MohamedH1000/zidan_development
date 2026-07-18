# Core Web Vitals & Accessibility Audit

## Why

`context/project-overview.md`'s success criteria calls for "strong
performance/SEO/accessibility on the static output" via Lighthouse, but
there's no evidence in `context/progress-tracker.md` that this has actually
been measured since the DB-backed admin/blog work landed (project/blog detail
pages now hit Postgres per request — see the 2026-07-18 `force-dynamic`
change in those pages, made to fix a soft-404 status-code issue, which
trades a little TTFB for correctness and makes this audit more relevant, not
less). Speed and accessibility are both ranking factors and direct retention
factors — a slow or inaccessible page loses visitors before the content
matters.

## What to check

Run this as a genuine audit, not a rubber-stamp — use real Lighthouse/PSI
runs against the live site, not just a code read.

## Prompt

```
Run a Core Web Vitals + accessibility audit on zidan_development
(https://www.zidandevelopments.com) covering both locales.

1. Run Lighthouse (or PageSpeed Insights) against: home (/en, /ar), a project
   detail page, a blog detail page, and /projects — both mobile and desktop
   profiles. Do not guess scores from reading code; actually run the tool.
2. For any LCP/CLS/INP regression, check whether it correlates with the
   2026-07-18 change that made projects/[slug], blog/[slug], and
   projects/[slug]/units/[unitSlug] `force-dynamic` (per-request DB reads
   instead of static generation) — if DB latency is now on the critical
   path for LCP, consider adding narrowly-scoped `revalidatePath` calls in
   app/actions/admin-projects.ts and admin-units.ts for the individual
   detail routes (they currently only revalidate the /projects index — see
   admin-projects.ts:113-123) as an alternative to full force-dynamic, or add
   a short `unstable_cache`/`use cache` wrapper around the Prisma reads
   instead of removing static optimization entirely. Read
   node_modules/next/dist/docs/01-app/02-guides/incremental-static-
   regeneration.md and the caching docs first — this is Next.js 16, caching
   APIs changed from what you may know.
3. Run an accessibility pass: color contrast (check against
   context/ui-tokens.md's actual token values, not assumed defaults), focus
   states on the header dropdown/mobile drawer, form label associations on
   ContactForm/CareersForm, alt text completeness on all next/image usages
   (grep for `alt=""` or missing alt props), and keyboard navigability of the
   FAQ accordion and project filter pills.
4. Check that `prefers-reduced-motion` is actually honored end-to-end (the
   project claims this throughout context/progress-tracker.md) — verify with
   the OS-level reduced-motion setting, not just a code read of the hook.
5. Produce a punch list ranked by impact, and only fix issues you've verified
   against a running instance (npm run dev or the live site) — don't apply
   speculative fixes.
6. Update context/progress-tracker.md with the audit date, scores, and what
   was fixed vs. deferred.
```
