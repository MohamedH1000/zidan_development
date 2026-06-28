# Admin Dashboard — Setup Guide

The admin controls **Projects** and **Units** (stored in Supabase Postgres via
Prisma). This guide gets the database, storage and auth running.

> One-time setup. Once done, edits in `/admin` flow live to the site (via ISR).

## 1. Create a Supabase project

1. https://supabase.com → New project.
2. Note the **Project REF** and **region**.
3. Set a strong database password.

## 2. Copy connection strings + keys

From **Project Settings → Database → Connection string**:

- **Transaction pooler** (port `6543`) → `DATABASE_URL`
- **Session pooler** (port `5432`) → `DIRECT_URL`

From **Project Settings → API**:

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (server only — keep secret!)

Paste them into `.env.local` (copy from `.env.example`).

## 3. Generate the NextAuth secret

```bash
openssl rand -base64 32
```

Put the value in `NEXTAUTH_SECRET`. Set `NEXTAUTH_URL` to your origin
(`http://localhost:3000` in dev).

## 4. Create Storage buckets (for images)

In **Storage**, create **public** buckets:

- `projects` — project gallery images + 3D render
- `units` — unit plan images

(Admin uploads use the service-role key on the server, so RLS can stay locked
down for non-admin writes.)

## 5. Push the database schema

```bash
npx prisma migrate dev --name init
npx prisma generate
```

This creates the `admin_users`, `projects`, and `units` tables (+ enums).

## 6. Create your first admin

```bash
npm run seed:admin -- --email you@example.com --password 'YourStrongPassword'
```

This inserts a row into `admin_users` with a bcrypt hash.

## 7. Log in

Open `/admin` (redirects to `/admin/login`) and sign in with the email/password.

---

## Daily commands

| Task | Command |
|------|---------|
| Apply schema change | `npx prisma migrate dev --name <change>` |
| Regenerate client after schema edit | `npx prisma generate` |
| Explore data | `npx prisma studio` |
| Re-seed an admin | `npm run seed:admin -- --email … --password …` |

## Notes

- **Bilingual:** every text field has `_en` / `_ar` columns. The admin form
  shows both side-by-side; the public site renders the active locale.
- **Images:** uploaded to Supabase Storage; only the resulting public URL is
  stored in Postgres.
- **Public pages** read Postgres via Prisma with ISR (on-demand revalidation
  after admin edits), so they stay fast.
