# Architecture

## Overview
This is a modern Next.js website for **Zidan Developments** — an Egyptian real estate development company specializing in premium residential projects in New Cairo.

The architecture follows **Next.js App Router best practices**, emphasizes **type safety**, **performance**, **SEO**, and **scalability**. It is designed for easy future migration to a dedicated backend (NestJS) + Supabase.

### Current Stack (Phase 1 — Next.js Only)
| Layer              | Tool                          | Purpose |
|--------------------|-------------------------------|---------|
| Framework          | Next.js 15/16 (App Router)    | Full-stack React framework with SSR/SSG |
| Styling            | Tailwind CSS + shadcn/ui      | Utility-first styling + accessible components |
| Language           | TypeScript (strict)           | Type safety across the project |
| State Management   | React Server Components + Server Actions | Primary data flow |
| Forms              | React Hook Form + Zod         | Form handling & validation |
| Database (future)  | Supabase (PostgreSQL)         | Auth, DB, Storage, Realtime |
| Backend (future)   | NestJS                        | API layer, business logic, agents |
| Image Optimization | Next.js Image + Cloudinary/Supabase | Fast image delivery |
| Analytics          | PostHog / Vercel Analytics    | User behavior & performance |
| SEO                | Next.js Metadata + sitemap    | Search engine optimization |
| Deployment         | Vercel                        | Optimized for Next.js |

### Future Stack (Phase 2)
- **Frontend**: Next.js (kept as is)
- **Backend**: NestJS (modular, clean architecture)
- **Database**: Supabase (Postgres + Auth + Storage + Edge Functions)
- **Realtime**: Supabase Realtime + optional WebSockets
- **File Storage**: Supabase Storage or Cloudinary

---

## Folder Structure
/
├── context/                  # CLI + developer context files
│   ├── project-overview.md
│   ├── architecture.md       # ← You are here
│   ├── ui-tokens.md
│   ├── ui-rules.md
│   ├── ui-registry.md
│   ├── code-standards.md
│   ├── library-docs.md
│   ├── build-plan.md
│   └── progress-tracker.md
├── app/                      # Next.js App Router
│   ├── (marketing)/          # Public marketing pages
│   │   ├── layout.tsx
│   │   ├── page.tsx          # Homepage
│   │   ├── projects/
│   │   ├── about-us/
│   │   └── contact/
│   ├── (dashboard)/          # Protected area (future admin/CRM)
│   │   └── layout.tsx
│   ├── api/                  # Route Handlers (thin layer)
│   │   └── webhooks/
│   ├── globals.css
│   └── layout.tsx            # Root layout + providers
├── components/
│   ├── ui/                   # shadcn/ui components only
│   ├── layout/               # Navbar, Footer, Sidebar, etc.
│   ├── marketing/
│   │   ├── Hero.tsx
│   │   ├── ProjectsGrid.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── AboutSection.tsx
│   │   └── ContactForm.tsx
│   ├── project-detail/       # Dynamic project pages
│   └── common/               # Reusable (Button, Modal, etc.)
├── features/                 # Feature-sliced modules (recommended)
│   ├── projects/
│   │   ├── api.ts
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types.ts
│   ├── contact/
│   └── auth/                 # Future auth feature slice
├── lib/
│   ├── supabase/             # Client & server Supabase instances
│   ├── utils.ts
│   ├── constants.ts
│   └── validations.ts        # Zod schemas
├── hooks/                    # Custom React hooks
├── types/                    # Global TypeScript definitions
├── public/                   # Static assets
├── styles/                   # Global styles if needed
├── middleware.ts             # Auth, i18n, etc.
└── next.config.mjs


---

## System Boundaries & Ownership

| Folder            | Responsibility |
|-------------------|----------------|
| `app/`            | Routing, layouts, metadata, API route handlers. **No heavy business logic.** |
| `components/`     | Pure UI components. No data fetching (except via Server Components). |
| `features/`       | Feature-sliced business logic, hooks, types, and lightweight API calls. |
| `lib/`            | Third-party clients, utilities, config. |
| `context/`        | Developer documentation and CLI context. |
| `types/`          | Shared TypeScript interfaces. |

---

## Data Flow (Current)

**Server Components (preferred)**
```tsx
// app/projects/page.tsx
async function ProjectsPage() {
  const projects = await getProjects(); // Server-side fetch
  return <ProjectsGrid projects={projects} />;
}

Server Actions (for mutations)
tsx// features/contact/actions.ts
'use server';
export async function submitContactForm(data: FormData) { ... }
Route Handlers (for webhooks, complex API logic)
TypeScript// app/api/webhooks/stripe/route.ts
export async function POST(req: Request) { ... }

Future Data Flow (with NestJS + Supabase)

Frontend → calls NestJS REST/GraphQL APIs
NestJS → handles business logic, validation, orchestration
NestJS → interacts with Supabase (or Prisma)
Supabase Edge Functions for lightweight serverless logic


Authentication (Future)

Supabase Auth (Email + Google + possibly OTP for Egypt)
Protected routes via middleware + Server Components
Role-based access (admin, sales, viewer)


Key Best Practices

Server-First: Prefer Server Components and Server Actions.
Feature-Sliced Design: Scale cleanly as the app grows.
Type Safety: Strict TS, Zod for runtime validation.
Performance:
Static rendering where possible (generateStaticParams)
Dynamic segments only when needed
Image optimization
Proper caching (revalidatePath, revalidateTag)

SEO: Use Metadata API, structured data (JSON-LD for projects), sitemap.
Accessibility: shadcn/ui + proper ARIA.
i18n: Ready for Arabic/English (RTL support).
Error Handling: Global error boundaries + Sentry (future).
Testing: Vitest + React Testing Library + Playwright.


Invariants (Never Violate)

No business logic in app/ route handlers beyond orchestration.
Components are dumb (receive props or use hooks).
All data fetching goes through features/ or lib/.
Use Server Components by default.
Never commit sensitive keys — use .env.local + Vercel env vars.
All forms use Zod + React Hook Form.
Arabic content must support proper RTL and font fallbacks.
Project images are optimized and served via Next.js Image component.