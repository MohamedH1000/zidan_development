# Progress Tracker

> Update after every completed feature. Reflects what is actually shipped.

## Current Status

**Phase: Admin + DB foundation built (Phase A). Marketing site still fully working & green.**
Build + lint pass with 0 errors.

- Public (marketing) site: unchanged, bilingual, SSG.
- **Admin + DB (new):** Prisma 7 → Supabase Postgres (pg driver adapter),
  NextAuth credentials auth, `/admin` protected dashboard shell + login, schema
  for `admin_users` / `projects` / `units` (bilingual `_en`/`_ar` columns).
  DB live (migrated); admin can log in. **Phase B done:** Projects + Units CRUD
  (list/create/edit/delete) with Cloudinary image upload (gallery, 3D render,
  unit plan) and unit count/availability control.
  **Pending:** Phase C — wire the public projects/units pages to read Postgres
  via Prisma + ISR (currently they still read the static `content/*` files).

Last verified build: Next.js 16.2.9 · React 19 · Turbopack.

## Progress

### Foundation
- [x] Next.js 16 App Router + TypeScript strict + Tailwind v4 tokens
- [x] Design system: tokens, fonts (Plus Jakarta Sans [EN] + Tajawal [AR] + Great Vibes), primitives
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
  `youtube-nocookie`, lazy-loaded; CSP `frame-src` allow-listed. Excellence
  section uses an animated `MovingTags` wall (replaced the architectural SVG).
- [x] About, Careers, Contact, Delivery, FAQs, Privacy
- [x] Projects index (+ filter) + `/projects/[slug]` detail
- [x] Blog index + `/blog/[slug]` post
- [x] Localised 404

### i18n (next-intl v4)
- [x] `routing`/`navigation`/`request` config, `proxy.ts` middleware
- [x] `app/[locale]` routing, locale-aware root layout (`lang`/`dir`)
- [x] `messages/{en,ar}.json` UI catalogs (in sync)
- [x] Header **language toggle** (EN ⇄ ع), RTL throughout

### Forms & backend
- [x] Contact form → `submitContact` Server Action + Zod + honeypot
- [x] Careers form → `submitCareers` + CV validation + consent
- [x] `INotificationService` + `ConsoleNotificationService` + factory
  (ready to wire Resend/nodemailer — Recipe H)

### Motion
- [x] Parallax hero, staggered reveals, animated counters, marquee
- [x] Filter pills + accordion (shared `layoutId` springs)
- [x] `prefers-reduced-motion` handling (hooks + global CSS)

### SEO
- [x] Per-page `generateMetadata` (incl. home), `metadataBase`, canonical, hreflang
- [x] `sitemap.ts` (locale-aware + alternates), `robots.ts`
- [x] JSON-LD: Organization, RealEstateAgent, WebSite, FAQ, Article, Breadcrumb
- [x] Generated `public/og.png` (sharp, build-time) + `icon.svg`

### Security
- [x] Headers in `next.config.ts` (CSP, frame/options/referrer/permissions/HSTS)
- [x] `reactStrictMode`, `poweredByHeader: false`, Zod validation, honeypots

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
  Playfair Display). Arabic = Tajawal (replaced Cairo). Great Vibes kept only
  for Latin script accents. Per-glyph CSS fallback (Jakarta → Tajawal) means no
  per-locale font CSS.
- **Dev CSP:** `script-src` adds `'unsafe-eval'` only when `NODE_ENV ===
  "development"` (React dev runtime needs eval for stack reconstruction; never
  in prod). See `next.config.ts` `buildSecurityHeaders()`.
- **`suppressHydrationWarning` on `<body>`:** silences false hydration mismatches
  caused by browser extensions injecting attributes (e.g. `bis_register`).
- **Arabic punctuation:** Arabic sentences never end with a trailing `.`.
  Enforced in `lib/i18n.ts` `pick`/`pickList` (content) and `messages/ar.json`
  (UI strings) via `scripts/fix-ar-periods.mjs`.

## Known Limitations / Next Up

- [ ] Email sending is a logging stub — wire a provider (Recipe H).
- [ ] No CMS — content edits require code changes.
- [ ] Map is a static link, not an embedded map.
- [ ] No automated tests yet (consider Playwright for the two forms + locale switch).
- [ ] `public/og.png` is English-only by design.

## Notes

- Context docs were rewritten on 2026-06-22 to replace stale foreign-project
  content with accurate Zidan Development docs.
- The 9 `context/*.md` files must be kept in sync with the code; update them
  whenever architecture/tokens/components/libraries change.
