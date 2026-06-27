# Library Docs

Project-specific usage rules for every third-party library in this project.
This file covers **how we use each one here** — not general docs.

## Before Using Any Library

1. Check if it's already a dependency (`package.json`). Prefer what's installed.
2. If adding new: load its installed skill first (if any), then read this file.
3. After adopting, add an entry here with the project-specific rules.

## next-intl (v4) — i18n

- **Config:** `i18n/routing.ts` (`defineRouting`, `localePrefix: "always"` + `localeDetection: false`),
  `i18n/navigation.ts` (`createNavigation`), `i18n/request.ts` (`getRequestConfig`).
- **Always** navigate via `@/i18n/navigation` (`Link`, `usePathname`,
  `useRouter`), not `next/link`.
- **Server:** `getLocale`, `getTranslations`, `setRequestLocale` from
  `next-intl/server`. **Client:** `useLocale`, `useTranslations` from `next-intl`.
- Wrap the app in `NextIntlClientProvider` **and pass `messages`** explicitly
  (layout fetches via `getMessages()`).
- `useLocale()` returns `string` — cast to `"en" | "ar"` when passing to typed
  helpers.
- Messages use ICU; rich text uses `<tag>…</tag>` rendered via `t.rich`.
- Middleware lives in **`proxy.ts`** (Next 16 deprecated `middleware.ts`).

## motion (Framer Motion v12) — animation

- Import from `motion/react`: `motion`, `useScroll`, `useSpring`, `useTransform`,
  `useInView`, `useReducedMotion`, `animate`, `AnimatePresence`, `type Variants`.
- Default easing tuple `[0.22, 1, 0.36, 1]`.
- **Variants typing gotcha:** when defining a variant object that contains a
  `transition.ease` array inline, annotate the object `: Variants` (otherwise TS
  infers `number[]` and rejects it). See `components/sections/hero.tsx`.
- `whileInView` with `viewport={{ once: true }}` for reveals.
- Shared layout animations use `layoutId` (active nav underline, filter pills).
- Always gate motion on `useReducedMotion()` in custom hooks (see `Counter`,
  `Reveal`).

## zod (v4) — validation

- Schemas in `lib/validations/`. Used by both the client form and the server
  action (single source of truth).
- **v4 changes from v3:** no `required_error` / `invalid_type_error`; use
  `{ error }` or `{ message }`. `errorMap` is gone — pass `{ error }` to
  `z.enum`. `z.string({ required_error })` → `z.string().min(n, msg)`.
- `z.enum` needs a `[string, ...string[]]` tuple; cast derived arrays
  (`areas.map(a => a.slug) as [string, ...string[]]`).

## clsx + tailwind-merge — `cn()`

- Single helper in `lib/utils.ts`: `cn(...inputs)` = `twMerge(clsx(inputs))`.
- Use for all conditional className composition. `twMerge` resolves conflicting
  Tailwind classes (later wins).

## lucide-react — icons

- Tree-shakeable; import named icons per-file.
- **Brand icons were removed from lucide.** Do **not** import
  `Facebook`/`Instagram`/`Linkedin` — they don't exist. Brand glyphs are
  hand-written inline SVG in `components/layout/footer.tsx` (and referenced by
  the `SocialIcon` union).
- Directional icons (arrows/chevrons) add `rtl:rotate-180` for Arabic.

## sharp — OG image generation

- Used **only** in `scripts/generate-og.mjs` (build-time), not in the app.
- Rasterizes a branded SVG → `public/og.png` (1200×630).
- We use sharp instead of `next/og` (satori) because satori's WASM font
  subsetter throws `lookupType: 5 - substFormat: 3 is not yet supported` in this
  environment. If you re-introduce `next/og`, supply an explicit TTF font.
- The SVG uses web-safe fonts (Arial) — do **not** put Arabic text in the OG SVG
  (the rasterizer mis-shapes it). Arabic tagline is shown via web fonts elsewhere.
- Re-run `npm run gen:og` (or `npm run build`, which runs `prebuild`) after
  changing the brand mark.

## Tailwind CSS (v4)

- **CSS-first config.** No `tailwind.config.ts`. Tokens live in `app/globals.css`
  under `@theme`; utilities are auto-generated from `--color-*` / `--font-*` /
  `--animate-*`.
- Custom keyframes (`marquee`, `shimmer`, `float`, `pulse-soft`) defined in
  `globals.css`, referenced via `--animate-*` tokens.
- Logical properties (`ps/pe/ms/me/start/end`) for RTL correctness.
- `@layer components` holds `.gold-rule`, `.grain-overlay`, `.text-gold-gradient`,
  `.text-balance`.

## next/font (Google)

- Loaded in `app/[locale]/layout.tsx`: `Plus_Jakarta_Sans` (English UI/display),
  `Tajawal` (Arabic), `Great_Vibes` (Latin script accents), each exposing a CSS
  variable consumed by `@theme` (`--font-jakarta`, `--font-arabic`,
  `--font-great-vibes`). The `--font-sans`/`--font-display` stacks fall through
  per-glyph: Latin → Jakarta, Arabic → Tajawal.
- Self-hosted at build; no runtime requests to Google.
