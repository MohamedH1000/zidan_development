# Progress Tracker

> Update after every completed feature. Reflects what is actually shipped.

## Current Status

**Phase: Bilingual marketing site — feature-complete & green.**
Build + lint pass with 0 errors. Both locales (en/ar) prerender and render
correctly, including RTL for Arabic.

Last verified build: Next.js 16.2.9 · React 19 · Turbopack. All routes SSG.

## Progress

### Foundation
- [x] Next.js 16 App Router + TypeScript strict + Tailwind v4 tokens
- [x] Design system: tokens, fonts (Inter/Playfair/Great Vibes), primitives
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
- **i18n prefix:** `as-needed` (English at root, Arabic at `/ar`).
- **Middleware:** renamed `middleware.ts` → `proxy.ts` (Next 16 deprecation).
- **Locale prefix in metadata:** localized via `localizedPath()`.

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
