# UI Registry

Living document of every reusable component. **Read before building a new
component** — extend an existing one if it almost fits. Update this file when a
component is added or its API changes.

## How to Use

Components live in `components/{ui,layout,sections,forms,visual,seo}`. Server
components by default; client ones are marked. Import via the `@/` alias.

## Primitives — `components/ui/`

| Component | Type | API / Notes |
|-----------|------|-------------|
| `Container` | server | `className`, `as`. `max-w-7xl` + responsive gutters. |
| `Section` | server | `id`, `tone="light\|cream\|dark\|gold"`, `className`, `containerClassName`. Owns Container. |
| `Button` / `buttonVariants` | server | `variant`, `size`, `href?`. Use `buttonVariants()` for `<Link>`. |
| `SectionHeading` | server | `eyebrow?`, `title`, `description?`, `align`, `tone="light\|dark"`. |
| `Badge` | server | `tone="neutral\|gold\|dark\|outline"`. |
| `Card` | server | `interactive`. Base surface; prefer dedicated cards. |
| `Field` / `FieldLabel` / `FieldError` / `inputClass` | server | Form field wrapper + shared input classes. |
| `Reveal` / `Stagger` / `StaggerItem` | **client** | Scroll reveal. `direction`, `delay`, `stagger`. Reduced-motion aware. |
| `Counter` | **client** | `value`, `prefix?`, `suffix?`, `duration?`. Animates in view. |
| `Marquee` | **client** | `items`, `reverse?`, `separator?`. Pauses on hover. |

## Layout — `components/layout/`

| Component | Type | Notes |
|-----------|------|-------|
| `Header` | **client** | Sticky, transparent→solid, Projects dropdown, mobile drawer, **language toggle**, phone CTA. Uses `useTranslations("nav")`, `useLocale`, `@/i18n/navigation`. |
| `Footer` | server (async) | CTA band + brand + nav + districts + contact + bottom bar. `getLocale`/`getTranslations`. |
| `Logo` | server | `tone="light\|dark"`, `href?`. Z monogram SVG + wordmark. |
| `PageHero` | server (async) | `eyebrow`, `title`, `description`, `crumbs[]`, `sceneVariant`. Translates the "Home" crumb. |
| `ScrollProgress` | **client** | Top gold bar via `useScroll`/`useSpring`. |

## Sections — `components/sections/` (most are async server, locale-aware)

| Component | Type | Used on |
|-----------|------|---------|
| `Hero` | **client** | Home. Props: `content={headline,subtitle,taglineAr,tagline}`. Parallax + stagger. |
| `AreasStrip` | async server | Home. Marquee of localized area names. |
| `Stats` | async server | Home, About. Animated counters from `getStats(locale)`. |
| `Excellence` | async server | Home. About preview + pillar tags + floating card. |
| `FeaturedProjects` | async server | Home. `getFeaturedProjects(locale)` grid. |
| `Values` | async server | Home, About. `getValues(locale)` cards. |
| `DeliveryPreview` | async server | Home. Spec category icons. |
| `MovingTags` | **client** | Home (Excellence). Animated keyword wall (alternating marquee rows, edge fade, pause-on-hover). Replaces the old architectural SVG. |
| `VideoSection` | async server | Home. Brand showreel — lazy `youtube-nocookie` iframe (ID in `siteConfig.video.youtubeId`), responsive 16:9. `frame-src` allow-listed in CSP. |
| `CtaBand` | async server | Most pages. Gold CTA + social proof. |
| `ContactSection` | async server | Home, Contact. Info + `<ContactForm>`. |
| `AboutIntro` | async server | About. Who/mission/vision. |
| `ChairmanMessage` | async server | About. Monogram portrait + message. |
| `CareersContent` | async server | Careers. Perks + `<CareersForm>`. |
| `DeliverySpecs` | async server | Delivery. Full spec categories. |
| `ProjectsExplorer` | **client** | Projects. Status filter (animated pills) + grid of `<ProjectCard>`. |
| `FaqExplorer` | **client** | FAQs. Category filter + animated accordion. |
| `ProjectCard` | **client** | Projects/featured/detail. Status badge + specs via `useTranslations("project")`. |
| `PostCard` | server | Blog. `post`, `locale`, `featured?`. |

## Forms — `components/forms/` (client, `useActionState`)

| Component | Action | Notes |
|-----------|--------|-------|
| `ContactForm` | `submitContact` | `compact` prop. Area select from `areas` config (value=slug). Honeypot `company`. |
| `CareersForm` | `submitCareers` | CV upload (PDF/DOC/DOCX ≤5MB), cover letter, consent rich-link. Honeypot `website`. |

## Visual & SEO

| Component | Type | Notes |
|-----------|------|-------|
| `Scene` | server | Inline SVG architectural illustration. `variant`, `accent`, `showLabel?`. Stand-in for photography. |
| `JsonLd` | server | Renders `<script type="application/ld+json">`. Only trusted objects. |

## Conventions for new components

- Default to **server**. Add `"use client"` only for hooks/motion/browser APIs.
- Localize via `getTranslations` (server) or `useTranslations` (client); never
  hardcode copy.
- Accept already-localized data as props when the page can resolve it.
- Use `cn()` for conditional classes; pull values from tokens, not hex.
- Log the new component here (name, type, where used) when added.
