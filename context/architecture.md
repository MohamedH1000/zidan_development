# Architecture

## Overview

Next.js 16 **App Router** with **`[locale]` dynamic routing** driven by
`next-intl`. Server Components by default; Client Components only where
interactivity is required (forms, motion, header/dropdown/explorers).
No database — content is a typed bilingual TS layer; UI strings are JSON
message catalogs. Forms use Server Actions + Zod.

## Folder Structure

```
zidandevelopment/
├─ app/
│  ├─ [locale]/                 # ALL routed pages live here (i18n segment)
│  │  ├─ layout.tsx             # root <html lang dir>, fonts, providers, header/footer
│  │  ├─ page.tsx               # home
│  │  ├─ not-found.tsx          # localised 404
│  │  ├─ about|careers|contact|delivery|faqs|privacy/page.tsx
│  │  ├─ projects/page.tsx + [slug]/page.tsx
│  │  └─ blog/page.tsx + [slug]/page.tsx
│  ├─ actions/                  # "use server" — contact.ts, careers.ts
│  ├─ globals.css               # Tailwind v4 @theme tokens + base layers
│  ├─ sitemap.ts                # locale-aware, hreflang alternates
│  ├─ robots.ts
│  ├─ favicon.ico               # browser favicon generated from brand PNG
│  └─ icon.png                  # Next.js file-based app icon
├─ components/
│  ├─ ui/                       # primitives: Container, Section, Button, SectionHeading,
│  │                            #   Badge, Card, Field, Reveal/Stagger, Counter, Marquee
│  ├─ layout/                   # Header, Footer, Logo, PageHero, ScrollProgress
│  ├─ sections/                 # page sections (Hero, Stats, Excellence, FeaturedProjects,
│  │                            #   Values, DeliveryPreview, CtaBand, ContactSection, …)
│  ├─ forms/                    # ContactForm, CareersForm (client)
│  ├─ visual/                   # Scene (inline SVG architectural illustrations)
│  └─ seo/                      # JsonLd
├─ config/site.ts               # brand, contact, areas, navigation, social
├─ content/                     # bilingual domain data + getX(locale) resolvers
│  └─ company|stats|projects|faqs|specs|posts.ts
├─ i18n/                        # routing.ts, navigation.ts, request.ts
├─ lib/
│  ├─ i18n.ts                   # Locale, LocalizedString, pick(), localizedPath()
│  ├─ utils.ts                  # cn(), formatNumber(), formatDate(iso, locale)
│  ├─ seo.ts                    # buildMetadata(), JSON-LD builders, absoluteUrl()
│  ├─ validations/              # contact.ts, careers.ts (Zod schemas)
│  └─ notifications/            # INotificationService + Console impl + factory
├─ messages/                    # en.json, ar.json (UI string catalogs)
├─ types/index.ts               # shared domain types (resolved/locale-specific shapes)
├─ scripts/generate-og.mjs      # sharp SVG→PNG for public/og.png
├─ proxy.ts                     # next-intl locale middleware (Next 16 "proxy")
├─ next.config.ts               # withNextIntl + security headers
└─ middleware.ts                # (DELETED — use proxy.ts)
```

## System Boundaries & Ownership

- **Routing** → `app/[locale]/*` + `i18n/routing.ts` + `proxy.ts`.
- **Content (domain data)** → `content/*` (typed, bilingual, resolved per locale).
- **UI strings (labels/copy)** → `messages/{en,ar}.json` via `useTranslations` /
  `getTranslations`.
- **Presentation** → `components/*` (consume resolved content + translations;
  never own copy).
- **Validation & I/O trust boundary** → `lib/validations/*` (Zod) + `app/actions/*`.
- **Side effects (email/CRM)** → `lib/notifications/*` behind `INotificationService`.
- **SEO** → `lib/seo.ts` + `app/sitemap.ts` + `app/robots.ts` + `components/seo`.

## i18n Architecture (next-intl v4)

- `i18n/routing.ts` — `defineRouting({ locales: ["en","ar"], defaultLocale: "en", localePrefix: "always", localeDetection: false })`. Every URL is prefixed (`/en`, `/ar`) so a stale `NEXT_LOCALE` cookie can never redirect a path to the wrong locale (the bug that previously made the logo flip language under `as-needed`).
- `i18n/navigation.ts` — `createNavigation(routing)` → export `Link, usePathname, useRouter, redirect, getPathname`. **Always** use these instead of `next/link` / `next/navigation` so hrefs gain the right locale prefix.
- `i18n/request.ts` — `getRequestConfig` loads `messages/<locale>.json`.
- `proxy.ts` — `createMiddleware(routing)`; matcher excludes `api|_next|_vercel|*.*`.
- **Static rendering:** every page/layout calls `setRequestLocale(locale)` before render; `[locale]/layout.tsx` exports `generateStaticParams` (locales); dynamic `[slug]` pages return locale×slug combos.
- **Server reads:** `getLocale()`, `getTranslations()` / `getTranslations({locale, namespace})`.
- **Client reads:** `useLocale()`, `useTranslations()` (available via `NextIntlClientProvider` in the layout, which is passed `messages`).
- **Language toggle:** header renders `<Link href={pathname} locale={otherLocale}>`.

## Server vs Client Components

- **Server (default):** pages, `Section`/`Container`/`SectionHeading`/`Card`/`Badge`, `Scene`, `ProjectCard` consumers, `PostCard`, `PageHero`, `Footer`, and all async sections (`Stats`, `Excellence`, …) that call `getLocale`/`getTranslations`.
- **Client (`"use client"`):** `Header`, `ScrollProgress`, `Reveal`/`Stagger`/`StaggerItem`, `Counter`, `Marquee`, `Hero`, `ProjectsExplorer`, `FaqExplorer`, `ProjectCard`, `ContactForm`, `CareersForm`.
- Rule: a component is client **only if** it uses hooks, motion, browser APIs, or `useActionState`.

## Data Flow

1. Request → `proxy.ts` negotiates locale → `app/[locale]/...`.
2. Layout calls `setRequestLocale(locale)` + `getMessages()` → wraps app in `NextIntlClientProvider`.
3. Page reads `params.locale`, fetches translations (`getTranslations`) and resolved content (`getX(locale)`), passes to sections.
4. Async sections independently call `getLocale`/`getTranslations` (cached per request) + read `content/*`.
5. Forms post to Server Actions → Zod `safeParse` → `INotificationService.send()` → state returned to `useActionState`.

## Security Posture

- Strict headers in `next.config.ts` (CSP, `X-Frame-Options: DENY`, `nosniff`, referrer, permissions, HSTS). `reactStrictMode`, `poweredByHeader: false`. CSP `frame-src` allow-lists `youtube-nocookie`/`youtube` for the showreel; `script-src` adds `'unsafe-eval'` only in dev.
- All form input validated server-side with Zod; honeypot fields; no `dangerouslySetInnerHTML` except trusted JSON-LD.
- No user-supplied HTML is ever rendered.
