import { defineConfig } from "prisma/config";

/**
 * Prisma 7 configuration.
 *
 * The only datasource keys supported here are `url` (and optional
 * `shadowDatabaseUrl`) — there is NO `directUrl` key, and schema.prisma's
 * datasource block must contain only `provider`. Adding `directUrl` here
 * breaks `next build` (TS: "directUrl does not exist in type ...").
 *
 *  - url:  CLI default (e.g. `prisma generate`, which doesn't connect).
 *          Points at the Supabase TRANSACTION pooler (port 6543).
 *
 * The transaction pooler can't run DDL reliably, so for schema sync run
 * `prisma db push --url "$DIRECT_URL"` against the SESSION pooler (port 5432).
 * Runtime queries don't use this file — they go through the driver adapter
 * with DATABASE_URL directly (see scripts/seed-admin.mjs).
 *
 * Supabase allows no separate shadow database, so we don't set
 * `shadowDatabaseUrl` (use `db push`, not `migrate dev`).
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
