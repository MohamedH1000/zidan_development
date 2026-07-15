# Progress Tracker

> Update after every completed feature. Reflects what is actually shipped.

## Current Status

**Phase: Admin + DB foundation built (Phase A). Marketing site fully working & green with DB-backed public blogs.**
Build + lint pass with 0 errors.

- Public (marketing) site: bilingual, with DB-backed published blogs.
- Contact form can send through Resend when env vars are configured; project
  detail unit cards include plan imagery and WhatsApp enquiry CTAs.
- Contact validation now allows "Not sure yet" as the default area, sends a
  polished bilingual EN/AR email template, and the shared homepage/contact map
  uses an embedded OpenStreetMap card. Contact submissions normalize nullable
  FormData, avoid hidden autofill traps, and accept Arabic/Persian phone
  digits so the shared homepage and contact-page form validate consistently.
- Careers applications send through the same Resend notification service with
  a polished language-aware EN/AR email and the validated CV attached.
- **Admin + DB (new):** Prisma 7 → Supabase Postgres (pg driver adapter),
  NextAuth credentials auth, `/admin` protected dashboard shell + login, schema
  for `admin_users` / `projects` / `units` (bilingual `_en`/`_ar` columns).
  DB live (migrated); admin can log in. **Phase B done:** Projects + Units CRUD
  (list/create/edit/delete) with Cloudinary image upload (gallery, 3D render,
  unit plan) and unit count/availability control.
  **Blog public wiring fixed:** published DB blog posts now appear on public
  blog index/detail pages; admin publish saves stamp `publishedAt` when needed
  and revalidate EN/AR public blog paths. New admin blog posts default to
  Published so the public listing reflects the editor's publish action.
  Public article pages render TipTap HTML with richer typography plus DB-backed
  article metadata, related project, tags, gallery, SEO, OG and Twitter fields.
  **Pending:** Phase C — wire the public projects/units pages to read Postgres
  via Prisma + ISR (currently they still read the static `content/*` files).
- **Admin UX (2026-07-14):**
  - Mobile admin menu converted from a native `<details>` to a controlled
    `<MobileNav>` client component — closes on nav-link click and on
    outside-click / Escape (desktop sidebar unchanged).
  - Free map picker added to the project form (Leaflet + react-leaflet on
    OpenStreetMap tiles, click-or-drag pin → `mapLat`/`mapLng`). The public
    project page renders a keyless Google Maps embed from those coordinates.
    Legacy `googleMapLink`/`mapEmbed` fields kept as an optional override.
    New `Project.mapLat`/`mapLng` Float columns (sync via
    `prisma db push --url "$DIRECT_URL"`).
- **SEO indexing fix (2026-07-15):** root-caused every GSC "not indexed" row
  against the live site and fixed all four systemic causes:
  1. **Canonical host** → `www.` (`config/site.ts` default), so canonicals,
     sitemap, hreflang, OG and JSON-LD URLs all match the www production host
     (was non-www → every canonical 308-redirected).
  2. **Sitemap now DB-driven** (`app/sitemap.ts`) — projects + *published* blogs
     only, real `updatedAt`. No more advertising static-`content/*` slugs that
     404 against the empty DB. Falls back to static-only routes if DB is down.
  3. **Killed soft-404s** — `generateMetadata` on projects/blog/units `[slug]`
     pages returns `noIndex: true` when the DB lookup misses (was rendering a
     200 "Project not found" page). Units detail page gained a `generateMetadata`.
  4. **Admin noindexed** — `(protected)/layout.tsx` + `login/page.tsx` export
     `robots: { index:false, follow:false }`. robots.txt sitemap/host auto-www.
  5. **JSON-LD assets fixed** — Article/Organization/LocalBusiness now reference
     `/icon.png` (was dead `/icon.svg` + 307 `/opengraph-image`).
  GSC follow-up: submit the www sitemap, set preferred domain to www.

Last verified build: 2026-07-15 · Next.js 16.2.9 · React 19 · Turbopack.

## Progress

### Foundation
- [x] Next.js 16 App Router + TypeScript strict + Tailwind v4 tokens
- [x] Design system: tokens, fonts (Plus Jakarta Sans [EN] + Cairo [AR] + Great Vibes), primitives
- [x] Layout shell: sticky Header, Footer, PageHero, ScrollProgress, 404
- [x] `cn()` util, `buttonVariants`, `Section`/`Container`/`SectionHeading`

### Content layer (bilingual)
- [x] `content/company` (hero, whoWeAre, mission, vision, pillars, chairman)
- [x] `content/stats`, `content/company → getValues`
- [x] `content/projects` (8 areas, `getX(locale)` resolvers, `projectSlugs`)
- [x] `content/faqs` (15 Q&As, bilingual)
- [x] `content/specs` (6 categories, bilingual)
- [x] `content/posts` (4 posts, bilingual, `postSlugs`)

### Pages (all bilingual, SSG)
- [x] Home (with per-page SEO metadata — title/desc/keywords/canonical/hreflang/OG)
- [x] Home showreel: YouTube iframe (`bH72vA8iHyg`, same as WP site) via
  `youtube-nocookie`, click-to-load so the player JS does not execute during
  initial page load; CSP `frame-src` allow-listed. Excellence section uses an
  animated `MovingTags` wall (replaced the architectural SVG).
- [x] About, Careers, Contact, Delivery, FAQs, Privacy
- [x] Projects index (+ filter) + `/projects/[slug]` detail
- [x] Blog index + `/blog/[slug]` post (DB-backed published posts)
- [x] Localised 404

### i18n (next-intl v4)
- [x] `routing`/`navigation`/`request` config, `proxy.ts` middleware
- [x] `app/[locale]` routing, locale-aware root layout (`lang`/`dir`)
- [x] `messages/{en,ar}.json` UI catalogs (in sync)
- [x] Admin dashboard pages, CRUD lists, delete actions, and admin forms use the
  same EN/AR message catalogs, so the admin language toggle localizes page
  content and not only the sidebar shell.
- [x] Admin dashboard is responsive: desktop keeps the sidebar, mobile uses a
  header menu, CRUD headers stack, tables scroll horizontally, and form action
  bars become full-width touch targets.
- [x] Header **language toggle** (EN ⇄ ع), RTL throughout
- [x] Arabic copy reviewed across UI messages and bilingual content, including
  public marketing pages, project descriptions, FAQs, specs, seed blog posts,
  forms, and admin labels. Tone is now more natural for an Egyptian real-estate
  website while preserving placeholders, rich-text tags, and message-key parity.

### Forms & backend
- [x] Contact form → `submitContact` Server Action + Zod + Resend
- [x] Careers form → `submitCareers` + CV validation + consent
- [x] `INotificationService` + `ConsoleNotificationService` + Resend provider factory

### Motion
- [x] Parallax hero, staggered reveals, animated counters, marquee
- [x] Hero LCP text renders statically without entrance opacity/transform so
  PageSpeed does not wait on a client-side text animation before painting the
  main heading.
- [x] Filter pills + accordion (shared `layoutId` springs)
- [x] `prefers-reduced-motion` handling (hooks + global CSS)
- [x] Loading UI: cinematic `app/[locale]/loading.tsx` (black bg, Zidan logo,
  gold left→right sweep) is the single Suspense fallback for every route under
  `[locale]` (marketing + admin). Unified `<Spinner />` + `Button` `loading`
  prop; all action buttons (contact, careers, admin login + CRUD, delete) show
  a pending spinner. CSS-only, hydration-free, reduced-motion safe.

### SEO
- [x] Per-page `generateMetadata` (incl. home), `metadataBase`, canonical, hreflang
- [x] Canonical production domain defaults to `https://zidandevelopments.com`,
  so sitemap and robots URLs use the live custom domain when no host env var is
  provided.
- [x] Canonicals include matching EN/AR/x-default alternates for localized pages
  so Arabic URLs self-canonicalize instead of looking like a different
  hreflang target.
- [x] `sitemap.ts` (locale-aware + alternates), `robots.ts`
- [x] JSON-LD: Organization, RealEstateAgent, WebSite, FAQ, Article, Breadcrumb
- [x] Generated `public/og.png` (sharp, build-time) + file-based favicon
  assets (`app/favicon.ico`, `app/icon.png`)

### Security
- [x] Headers in `next.config.ts` (CSP, frame/options/referrer/permissions/HSTS)
- [x] `reactStrictMode`, `poweredByHeader: false`, Zod validation, careers honeypot

## Decisions Made During Build

- **Brand name:** "Zidan Development" (per owner request) — original site uses
  "Zidan Developments"; kept as a JSON-LD `alternateName`.
- **Imagery:** self-contained inline SVG `Scene` illustrations (no external
  photos) — swappable for real photography later.
- **OG image:** sharp-rasterized PNG, not `next/og` (satori GSUB limitation).
  No Arabic in the OG SVG (rasterizer mis-shapes it).
- **i18n prefix:** `always` (both locales prefixed: `/en`, `/ar`). Switched from
  `as-needed` because next-intl's persisted `NEXT_LOCALE` cookie redirected
  unprefixed paths to the remembered locale — which made clicking the logo from
  the English home jump to Arabic. `always` makes the URL authoritative.
- **Middleware:** renamed `middleware.ts` → `proxy.ts` (Next 16 deprecation).
- **Locale prefix in metadata:** localized via `localizedPath()`.
- **Fonts:** English = Plus Jakarta Sans (clean, structured; replaces Inter +
  Playfair Display). Arabic = Cairo (modern, legible). Great Vibes kept only
  for Latin script accents. Cairo is applied both via per-glyph stack fallback
  (Jakarta → Cairo) and an explicit `html[lang="ar"] body` rule in globals.css,
  so it renders reliably on every browser/device (the fallback chain alone was
  being dropped in some laptop environments, leaving Arabic in a generic font).
- **Dev CSP:** `script-src` adds `'unsafe-eval'` only when `NODE_ENV ===
  "development"` (React dev runtime needs eval for stack reconstruction; never
  in prod). See `next.config.ts` `buildSecurityHeaders()`.
- **`suppressHydrationWarning` on `<body>`:** silences false hydration mismatches
  caused by browser extensions injecting attributes (e.g. Bitdefender's
  `bis_skin_checked`, `bis_register`). The home-page hydration warning users see
  is this extension noise — the code is hydration-safe (verified). Fix is
  environmental (disable extension / Incognito), not code.
- **Arabic punctuation:** Arabic sentences never end with a trailing `.`.
  Enforced in `lib/i18n.ts` `pick`/`pickList` (content) and `messages/ar.json`
  (UI strings) via `scripts/fix-ar-periods.mjs`.

## Known Limitations / Next Up

- [ ] Add automated smoke tests for contact/careers Resend submissions.
- [ ] No CMS — content edits require code changes.
- [ ] No automated tests yet (consider Playwright for the two forms + locale switch).
- [ ] `public/og.png` is English-only by design.

## Notes

- Context docs were rewritten on 2026-06-22 to replace stale foreign-project
  content with accurate Zidan Development docs.
- The 9 `context/*.md` files must be kept in sync with the code; update them
  whenever architecture/tokens/components/libraries change.
