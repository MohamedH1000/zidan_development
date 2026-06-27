# Project Overview

> Source of truth for *what* this product is. Update when product scope changes.

## About the Project

**Zidan Development** is a bilingual (English / Arabic), luxury real-estate
**marketing website** for an Egyptian developer building across New Cairo
(Al Narges, Bait Al Watan, Al Andalus, Lotus, Gardenia Heights, Al Takmely,
South Investors, Fifth Settlement).

It is a re-imagining of the original WordPress site
(`zidandevelopments.com`) as a fast, secure, SEO-optimised **Next.js 16**
App Router app with premium motion design. Not an app with auth/dashboards —
a content-driven marketing site with two lead-capture forms.

## The Problem It Solves

The original WordPress/Elementor site was heavy, slow, English-only, and hard
to maintain. This project replaces it with a statically-generated, fully
bilingual, accessible, SEO-rich site that loads fast, ranks well, and lets
non-developers reason about content via a typed content layer.

## Brand

- **Name:** Zidan Development · **Arabic:** زيدان للتطوير
- **Tagline (AR):** تطور يحكي الواقع · **(EN):** Development that narrates reality
- **Phone:** 17534 · **Email:** info@zidandevelopments.com
- **Location:** New Cairo / Fifth Settlement, Cairo, Egypt
- **Chairman / CEO:** Eng. Refaat Zidan

## Tech Stack

| Concern        | Choice                                              |
| -------------- | --------------------------------------------------- |
| Framework      | Next.js **16** (App Router, Turbopack, React 19)    |
| Language       | TypeScript (strict)                                 |
| Styling        | Tailwind CSS **v4** (CSS-first `@theme` tokens)     |
| Animation      | `motion` (Framer Motion v12)                         |
| i18n           | `next-intl` v4 — locales `en` + `ar`, RTL aware     |
| Validation     | `zod` v4 (server actions + forms)                   |
| Icons          | `lucide-react` (brand glyphs hand-written as SVG)    |
| Utilities      | `clsx` + `tailwind-merge` via `cn()`                |
| OG image       | `sharp` rasterizes a branded SVG → `public/og.png`  |

## Locales & Routing

- Locales: `en` (default) and `ar`.
- Prefix strategy: **`always`** → both locales prefixed (`/en/…`, `/ar/…`).
  Bare `/` redirects to the default (`/en`). This keeps the URL the single source
  of truth so a stale `NEXT_LOCALE` cookie can't flip the language on navigation.
- All routes live under `app/[locale]/`. A `proxy.ts` (Next 16 proxy
  convention, formerly `middleware.ts`) negotiates the locale.
- `<html lang dir>` is set per locale; Arabic flips to `dir="rtl"`.

## Pages

```
/                       → Home (hero, stats, about, projects, values, specs, CTA, contact)
/about                  → Who we are, mission, vision, values, chairman
/careers                → Culture + application form (CV upload)
/projects               → Filterable project area grid
/projects/[slug]        → Area detail (specs, highlights, enquiry CTA)
/delivery               → Construction & finishing specifications
/blog                   → Insights index (featured + grid)
/blog/[slug]            → Article
/faqs                   → Filterable accordion + FAQ JSON-LD
/contact                → Contact info + "Request a call back" form
/privacy                → Privacy policy
```

All of the above exist in both `en` and `ar`. Unknown paths render a localised 404.

## Navigation

Sticky header, transparent over the (dark) hero, solidifies to ivory on scroll.
Primary nav: Home · About Us · Careers · Projects (dropdown: New Narges,
Bait Al Watan, Lotus, View all) · Delivery · Blogs · FAQs.
Desktop CTAs: **language toggle (EN ⇄ ع)**, phone, "Get in touch".
Mobile: hamburger drawer.

## Data Architecture

No database. Content is a **typed, bilingual TS layer** in `content/`
(company, stats, values, projects, faqs, specs, posts) exposing
`getX(locale)` resolvers. UI strings live in `messages/{en,ar}.json`.
Forms submit to **Server Actions** validated by Zod and forwarded through an
abstracted notification service (`ConsoleNotificationService` today; swap for
Resend/nodemailer later via the `INotificationService` interface).

## Features In Scope

- Full bilingual EN/AR with RTL and a header language toggle.
- Premium motion (scroll reveal, stagger, animated counters, parallax hero,
  filter pills) — all `prefers-reduced-motion` aware.
- Two validated, spam-protected forms (contact + careers).
- SEO: per-page metadata, `sitemap.ts`, `robots.ts`, JSON-LD
  (Organization, RealEstateAgent, FAQ, Article, Breadcrumb), generated OG image.
- Security headers (CSP, frame/options/referrer/permissions/HSTS) in `next.config`.

## Features Out of Scope (for now)

- Real email sending (notification service is a logging stub).
- CMS / admin dashboard (content is code).
- Auth, user accounts, payments.
- Live property availability/inventory API.
- Maps embedding beyond a static link.

## Target User

Prospective buyers and investors in New Cairo real estate, plus job
applicants (careers). Bilingual: Egyptian/Arabic-first and English audiences.

## Success Criteria

- `npm run build` + `npm run lint` pass with **0 errors**.
- Both locales prerender and render correctly (RTL for AR).
- Lighthouse: strong performance/SEO/accessibility on the static output.
- Every user-facing string is localised — no hard-coded English in components.
