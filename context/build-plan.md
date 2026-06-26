# Build Plan

How to change this project safely. Every change should follow the relevant
recipe below end-to-end, then update `progress-tracker.md`.

## Core Principle

The site is a **statically-generated, bilingual content site**. Most "features"
are: add localized content + a section/page + metadata. Keep the build green
and both locales rendering.

## Recipe A — Add a new page

1. Create `app/[locale]/<route>/page.tsx`.
2. `export default async function Page({ params })`:
   - `const { locale } = await params;`
   - `setRequestLocale(locale);`
   - `const t = await getTranslations("pages.<route>");`
   - render `<PageHero>` + sections.
3. `export async function generateMetadata({ params })` → `buildMetadata({ title: t("title"), description: t("description"), path: localizedPath(locale, "/<route>") })`.
4. Add breadcrumb JSON-LD (`getBreadcrumbJsonLd`) if appropriate.
5. Add copy to **both** `messages/en.json` and `messages/ar.json` under
   `pages.<route>`.
6. Add the route to `app/sitemap.ts` (`staticRoutes`) and to `navigation` in
   `config/site.ts` (with a `labelKey` + matching `nav.<key>` message).
7. Build + lint. Smoke-test `/` and `/ar/<route>`.

## Recipe B — Add a UI string

1. Add the key to **both** `messages/en.json` and `messages/ar.json` (same path).
2. Use `t("...")` (client) or `await getTranslations(...)` (server).
3. If scoped (`getTranslations("nav")`), pass a **relative** key.
4. Rebuild — next-intl throws `MISSING_MESSAGE` at prerender if a key is absent,
   which catches omissions at build time.

## Recipe C — Add/edit a project area

1. Edit `content/projects.ts` — every text field is `{ en, ar }`.
2. Ensure `slug` matches an entry in `config/site.ts` `areas` (for nav/form).
3. `projectSlugs` is derived automatically; `generateStaticParams` and the
   sitemap pick it up.
4. Build (prerenders `/projects/<slug>` + `/ar/projects/<slug>`).

## Recipe D — Add a blog post

1. Edit `content/posts.ts` — add a `PostSource` with bilingual `title`,
   `excerpt`, `content[]`, `category`, `author`, `date`, `readingTime`,
   `tags`, optional `featured`.
2. Build — new `/blog/<slug>` + `/ar/blog/<slug>` prerender automatically.

## Recipe E — Add a FAQ

1. Edit `content/faqs.ts` — add `{ id, category, question:{en,ar}, answer:{en,ar} }`.
2. The category must exist in `faqCategories` and `messages` `faqCategories.*`.
3. `getFaqJsonLd` on `/faqs` picks it up automatically.

## Recipe F — Add a UI component

1. Read `ui-registry.md`. Extend an existing primitive if possible.
2. Default to server; add `"use client"` only if needed.
3. Localize via translations; accept resolved data as props.
4. Use tokens (`ui-tokens.md`) — no hardcoded hex.
5. Add the component to `ui-registry.md`.

## Recipe G — Add a deliverable spec category

1. Edit `content/specs.ts` — add a `SpecSource` (bilingual) with an `icon` from
   the `SpecIcon` union.
2. Ensure the icon maps in `delivery-preview.tsx` and `delivery-specs.tsx`.
3. Build.

## Recipe H — Wire real email sending

1. Implement `INotificationService` (e.g. `ResendNotificationService`) in
   `lib/notifications/`.
2. Branch in `createNotificationService()` (factory) on an env var
   (`RESEND_API_KEY`).
3. Add the env var to `.env.local` and your host. **No call-site changes** —
   actions depend on the interface.

## Recipe I — Change branding / tokens

1. Edit `@theme` in `app/globals.css` (colors/fonts/animations).
2. If the logo/OG changes, edit `components/layout/logo.tsx` and
   `scripts/generate-og.mjs`, then `npm run gen:og`.
3. Update `config/site.ts` (name/contact/social) and `messages` if copy changes.
4. Rebuild.

## Recipe J — Add a third language

1. Add the locale to `i18n/routing.ts` `locales`.
2. Create `messages/<locale>.json` (copy `en.json`, translate).
3. Add `dir` logic in `[locale]/layout.tsx` if RTL/LTR differs.
4. Extend `Localized*` handling — resolvers already key off `Locale`.
5. Update `sitemap.ts` `locales` list and OG `locale` mapping.
6. Build — all routes prerender for the new locale.

## Definition of Done (every change)

- [ ] `npm run lint` → 0 errors.
- [ ] `npm run build` → succeeds, both locales prerendered.
- [ ] New copy exists in **both** `en` + `ar`.
- [ ] `progress-tracker.md` updated.
