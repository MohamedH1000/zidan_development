# Code Standards

Non-negotiable conventions. Follow in every session to prevent pattern drift.

## Engineering Mindset

- Read `context/*` (in the order `AGENTS.md` lists) before touching code.
- Match existing patterns; extend before inventing.
- Keep the build green: `npm run lint` + `npm run build` must pass with 0 errors.
- Small, single-responsibility components. Composition over inheritance.
- SOLID where it pays: the notification service is the canonical example
  (depend on `INotificationService`, not a concrete provider).

## TypeScript

- `strict: true`. No `any` without justification; prefer `unknown` + narrowing.
- Domain types live in `types/index.ts` and describe the **resolved**
  (locale-specific) shapes components consume.
- Bilingual source uses `LocalizedString` / `LocalizedStringList` from `lib/i18n.ts`.
- `Locale` is imported from `@/i18n/routing`.

## Next.js 16 Conventions

- **App Router only.** No `pages/`.
- `params` and `searchParams` are **Promises** — `await` them.
- Locale routing under `app/[locale]/`. Every page/layout calls
  `setRequestLocale(locale)` before render for static generation.
- `generateStaticParams` returns locale (and slug) combos for dynamic routes.
- Use `proxy.ts` (not `middleware.ts`) for the next-intl middleware — the
  `middleware` convention is **deprecated** in Next 16.
- File-based metadata: `app/sitemap.ts`, `app/robots.ts`, `app/favicon.ico`,
  `app/icon.png`.

## Internationalization (next-intl)

- **Navigation:** import `Link, usePathname, useRouter, redirect` from
  `@/i18n/navigation` — never from `next/link` / `next/navigation`.
- **Server reads:** `getLocale()`, `getTranslations()`,
  `getTranslations({ locale, namespace })` (all async).
- **Client reads:** `useLocale()`, `useTranslations(namespace)`.
- UI strings → `messages/{en,ar}.json`. **Both files must stay in sync** —
  every key added to one is added to the other.
- Rich text in messages uses tags (`<link>…</link>`); pass render functions to
  `t.rich`. Do **not** pass functions as plain `{placeholder}` values.
- Namespaced `getTranslations("nav")` + `t("home")` resolves `nav.home` —
  message keys passed to a scoped translator must be **relative**.

## File and Folder Naming

- Components/Pages: `kebab-case` files (e.g. `cta-band.tsx`, `page-hero.tsx`).
  Exception: a few early sections use `lowercase.tsx` (keep as-is unless moved).
- TS modules: `kebab-case`. Types: `PascalCase`.
- One default export per page/layout. Named exports for components.

## Component Structure

- Server Component by default. Mark `"use client"` only when needed.
- Props typed inline or via a shared type.
- No business logic in presentation components — they receive resolved data.
- Async server sections may call `getLocale`/`getTranslations` directly
  (cached per request).

## Server Actions (`app/actions/`)

- Top-of-file `"use server"`.
- Signature: `(prevState, formData: FormData) => Promise<State>`.
- **Always** `safeParse` with the matching Zod schema before doing work.
- Read honeypot field; reject if filled.
- Forward side effects through `createNotificationService()` (the interface).
- Return a discriminated `status: "idle" | "error" | "success"` state.

## Validation (`lib/validations/`)

- Zod v4. Note: `required_error`/`errorMap` were removed — use
  `{ error: "..." }` / `{ message: "..." }`.
- Schemas double as the client and server contract (DRY).
- File uploads validated separately (type + size).

## Error Handling

- Server actions return error states with localized-safe messages.
- `notFound()` for missing dynamic content (project/blog slug).
- A localized `app/[locale]/not-found.tsx` renders within the locale layout.
- Never swallow errors silently in actions — always return a state.

## Security

- Security headers in `next.config.ts` (CSP, frame-ancestors none, nosniff,
  referrer, permissions, HSTS). `reactStrictMode`, `poweredByHeader: false`.
- Validate all input at the trust boundary (Zod). Never trust `formData`.
- No `dangerouslySetInnerHTML` except trusted JSON-LD objects.
- No user-supplied HTML rendered anywhere.

## Import Aliases

- `@/*` → project root (tsconfig). Use `@/components`, `@/lib`, `@/content`,
  `@/config`, `@/i18n`, `@/types`.

## Comments

- Explain *why*, not *what*. Match surrounding density.
- JSDoc on exported APIs that aren't self-evident (e.g. `pick`, `localizedPath`).

## Dependencies

- Before adding a third-party lib: check `context/library-docs.md` and load its
  installed skill if one exists.
- Prefer platform features over new deps. Current runtime deps are intentional
  (`motion`, `next-intl`, `zod`, `clsx`, `tailwind-merge`, `lucide-react`).

## SEO Checklist (per page)

- `generateMetadata` with localized `title`/`description`, canonical
  (`localizedPath`), and `openGraph`/`twitter`.
- `setRequestLocale(locale)`.
- Breadcrumb JSON-LD via `getBreadcrumbJsonLd` where appropriate.
- FAQ pages emit `getFaqJsonLd`; blog posts emit `getArticleJsonLd`.

## Commit / Build

- `npm run dev` to develop. `npm run build` (runs `prebuild` → regenerates
  `public/og.png` via sharp). `npm run lint` to type/lint-check.
- Don't commit `.next/`. `public/og.png` is generated — re-run `npm run gen:og`
  if you change the brand mark.
