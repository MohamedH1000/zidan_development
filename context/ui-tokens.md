# UI Tokens

> The single source of truth for design values. Defined in `app/globals.css`
> under Tailwind v4's `@theme`. **Never hardcode hex in components** — use the
> token utilities (`bg-gold-500`, `text-ink-900`, etc.). The only place raw hex
> is allowed is `components/visual/scene.tsx` (SVG illustration fills) and
> `scripts/generate-og.mjs`.

## How to Use

Tokens are CSS variables declared in `@theme`. Tailwind v4 auto-generates
utilities from them: `--color-gold-500` → `bg-gold-500`, `text-gold-500`,
`border-gold-500`, `ring-gold-500`, etc. Fonts: `--font-display` → `font-display`.

## Color Tokens (from `@theme`)

### Ink — near-black charcoal scale (text, dark surfaces)
| Token | Hex | Use |
|-------|-----|-----|
| `ink-950` | `#0a0a0a` | darkest surfaces (hero, footer, dark sections) |
| `ink-900` | `#111111` | primary foreground / dark buttons |
| `ink-800` | `#1a1a1a` | hover on dark surfaces |
| `ink-700` | `#262626` | secondary text on light |
| `ink-600` | `#3a3a3a` | body muted text |
| `ink-500` | `#525252` | hints / captions |

### Gold — champagne accent (brand primary)
| Token | Hex | Use |
|-------|-----|-----|
| `gold-200` | `#f0e4c7` | lightest highlight |
| `gold-300` | `#e6d2a4` | gradient end / blog accents |
| `gold-400` | `#d9bc7a` | on-dark gold text / links hover |
| `gold-500` | `#c8a45c` | **brand primary** — buttons, rules, icons |
| `gold-600` | `#b8924a` | deep gold / on-light gold text |
| `gold-700` | `#9c7a38` | pressed / strong gold text |

### Warm neutrals
| Token | Hex | Use |
|-------|-----|-----|
| `cream`  | `#f7f3ec` | alt light section background |
| `ivory`  | `#fbf8f2` | default page background (`--color-background`) |
| `sand`   | `#efe9dd` | subtle fills |
| `stone`  | `#e0d8c8` | dividers on light |
| `mist`   | `#c9c2b5` | scrollbar thumb |

### Semantic
- `--color-background: var(--color-ivory)`
- `--color-foreground: var(--color-ink-900)`

## Color Usage Guide

- **Light sections:** `bg-ivory` or `bg-cream`, text `text-ink-900` / `text-ink-600`.
- **Dark sections:** `bg-ink-950`, text `text-cream` / `text-cream/70`, accents `text-gold-400`.
- **Primary CTA:** `bg-gold-500 text-ink-950` (hover `bg-gold-400`).
- **Dark CTA:** `bg-ink-950 text-cream` (hover `bg-ink-800`).
- **Eyebrows / rules / icon chips:** `text-gold-600` (light) / `text-gold-400` (dark), `bg-gold-500/12`.
- **Emphasis headline gradient:** class `.text-gold-gradient` (animated gold sweep).

## Typography

| Token | Family (next/font) | Role |
|-------|--------------------|------|
| `--font-sans` (`font-sans`) | Plus Jakarta Sans → Tajawal (per-glyph fallback) | body / UI (default on `<body>`) |
| `--font-display` (`font-display`) | Plus Jakarta Sans → Tajawal | headings, brand wordmark, hero |
| `--font-script` (`font-script`) | Great Vibes | decorative accents ("Let's build", tagline) |

- Headings: `font-display`, `font-semibold`/`font-bold`, tight leading, `text-balance` where long.
- English (Latin) glyphs render in **Plus Jakarta Sans**; Arabic glyphs fall
  through the stack to **Tajawal** automatically (per-glyph fallback). The script
  accent (`--font-script`, Great Vibes) is Latin-only, used sparingly.

## Spacing & Rhythm

- Page width: `Container` = `max-w-7xl` + `px-5 sm:px-8 lg:px-12`.
- Section vertical padding: `py-20 sm:py-24 lg:py-32` (via `<Section>`).
- Card padding: `p-6` / `p-7` / `p-8`.
- Stack gaps: `gap-4` (forms), `gap-6` (card grids), `gap-12`/`gap-16` (2-col layouts).

## Radii

| Token | Value | Use |
|-------|-------|-----|
| default | `rounded-xl` (0.75rem) | inputs, chips |
| `--radius-xl` | 1.25rem | cards (`rounded-2xl`) |
| `--radius-2xl` | 1.75rem | large panels |
| pills | `rounded-full` | buttons, badges, filter chips |

## Animations (`--animate-*` tokens)

| Utility | Keyframes | Use |
|---------|-----------|-----|
| `animate-marquee` | `marquee` (translateX 0→-50%) | areas strip |
| `animate-marquee-reverse` | `marquee-reverse` | reverse marquee |
| `animate-shimmer` | `shimmer` | gold text sweep |
| `animate-float` | `float` | decorative lift |
| `animate-pulse-soft` | `pulse-soft` | soft pulse |

All animations are **disabled under `prefers-reduced-motion`** (global rule in `globals.css`).

## Component Tokens (shared classes)

- Input surface: exported `inputClass` from `components/ui/field.tsx`.
- Buttons: `buttonVariants({variant,size})` from `components/ui/button.tsx`.
- Section tones: `<Section tone="light|cream|dark|gold">`.
- Gold rule / grain: `.gold-rule`, `.grain-overlay` (component-layer utilities).

## Invariants

- Default motion easing: `[0.22, 1, 0.36, 1]` (ease-out-quint-ish).
- Focus ring: `:focus-visible { outline: 2px solid var(--color-gold-500); offset 2px; }`.
- Selection: `::selection { background gold-500; color ink-950; }`.
- Page always scrolls behind a fixed header → sections needing anchor offset use `scroll-mt-24`.
