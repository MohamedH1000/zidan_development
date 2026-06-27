# UI Rules

Concise rules for building Zidan Development UI. Match existing patterns before
inventing new ones. Tokens are defined in `ui-tokens.md` — never hardcode hex
or raw color classes.

## Font

- Body/UI: `font-sans` (Plus Jakarta Sans for Latin; Tajawal for Arabic via
  per-glyph fallback). Headings: `font-display` (same families).
  Decorative script accents only: `font-script` (Great Vibes, Latin).
- **Arabic house style:** sentences never end with a trailing full stop. This
  is enforced centrally in `lib/i18n.ts` (`pick`/`pickList` strip a trailing
  `.` for `ar`) and in `messages/ar.json`. Never add a trailing `.` to Arabic.
- Long headlines use `text-balance`. Don't set inline `font-family`.

## Layout

- Every page is a list of `<Section tone>` blocks. Inside, a `<Container>`.
  Don't reinvent width/padding — use those primitives.
- Alternate section tones for rhythm: dark hero → dark strip → dark stats →
  cream → ivory → dark → ivory → gold CTA → cream contact is the home pattern.
- Page tops always render `<PageHero>` (dark) so the transparent header sits
  over dark content on every route.
- Use logical properties for direction-aware spacing: `ps-*`/`pe-*`/`ms-*`/
  `me-*`/`start-*`/`end-*`, and `text-start`/`text-end`. Avoid `pl/pr/left/right`
  so Arabic RTL mirrors correctly.

## Navbar (Header)

- Fixed, transparent over hero → `bg-ivory/90 backdrop-blur` after `scrollY>24`.
- Light text over hero (`text-cream`), dark text when solid (`text-ink-*`).
- Active link uses a shared `layoutId="nav-active"` underline spring.
- Projects dropdown reveals on hover **and** click (keyboard-accessible,
  `aria-expanded`). Mobile: slide-down drawer with body-scroll lock.
- Language toggle: `<Link href={pathname} locale={otherLocale}>` showing the
  *target* language label (`العربية` on EN, `English` on AR).

## Cards

- Surface: `rounded-2xl border-ink-900/8 bg-white` + soft shadow.
- Interactive lift: `hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-lg`.
- Media zoom on hover: wrap `<Scene>` in `scale-105 group-hover:scale-110`.
- See `ui-registry.md` for `ProjectCard` / `PostCard` contracts.

## Typography Hierarchy

- Eyebrow: `text-xs font-semibold uppercase tracking-[0.25em] text-gold-600`
  (light) / `text-gold-400` (dark), preceded by a `h-px w-8` gold rule.
- H1 (page hero): `font-display text-4xl sm:text-5xl lg:text-6xl font-semibold`.
- H2 (section): `font-display text-3xl sm:text-4xl lg:text-5xl font-semibold`.
- Lead: `text-base sm:text-lg` muted. Body: `text-sm`/`text-base`.
- Always use `<SectionHeading>` for eyebrows+title+description.

## Badges

- `<Badge tone="neutral|gold|dark|outline">` — rounded-full, `text-xs`.
- Project status badge uses `t(\`status.\${project.status}\`)` for locale.

## Buttons

- Always via `buttonVariants({ variant, size })`. Variants:
  `primary` (ink), `gold`, `outline` (gold border), `ghost`, `dark`.
- Sizes: `sm` (h-9), `md` (h-12), `lg` (h-14). All `rounded-full`.
- For internal links: `<Link className={buttonVariants(...)}>`.
- Arrow icons flip in RTL: `<ArrowRight className="rtl:rotate-180" />`.

## Form Inputs

- Shared `inputClass` from `components/ui/field.tsx`. Wrap fields in `<Field>`.
- Gold focus: `focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30`.
- Required marker: gold `*`. Errors: `text-red-600`.
- Include a hidden honeypot (`company`/`website`) on every form.
- Submit buttons show a `<Loader2 className="animate-spin">` pending state.

## Motion

- Reveal on scroll: `<Reveal>` / `<Stagger>` + `<StaggerItem>`. Use `whileInView`
  once. Default ease `[0.22,1,0.36,1]`.
- Counters: `<Counter value prefix suffix>` (animates once in view).
- Filter pills share a `layoutId` spring between groups on a page.
- **Always** respect reduced motion: motion hooks already gate via
  `useReducedMotion()`; CSS animations are killed globally under
  `prefers-reduced-motion`.

## RTL (Arabic)

- Direction comes from `<html dir>` (set in `[locale]/layout.tsx`).
- Flex rows auto-mirror with `dir`. Use logical utilities for insets/padding.
- Icons that imply direction (arrows, chevrons) add `rtl:rotate-180`.
- The Arabic tagline is wrapped `dir="rtl"` where it appears inline with Latin.

## Empty / Loading States

- Form success: gold-bordered card with `<CheckCircle2>` + localized message.
- 404: localised `<Scene variant="abstract">` + script "Lost in New Cairo".
- No skeleton loaders needed (static site).

## Tailwind v4 Note

- Config is **CSS-first** (`@theme` in `globals.css`). There is no
  `tailwind.config.ts`. Add tokens by editing `@theme`.

## Do Nots

- ❌ Hardcode hex in components (`#c8a45c`) — use `gold-500`.
- ❌ Use `next/link` or `next/navigation` directly — use `@/i18n/navigation`.
- ❌ Hardcode English copy in JSX — route through messages or `content/*`.
- ❌ Add `"use client"` to a component that has no client-only need.
- ❌ `dangerouslySetInnerHTML` with anything but trusted JSON-LD.
- ❌ Call `useTranslations` in a Server Component — use `getTranslations`.
