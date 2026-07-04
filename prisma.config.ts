import { defineConfig } from "prisma/config";

/**
 * Prisma 7 configuration. Connection URLs moved here from schema.prisma.
 *
 *  - url:        runtime queries → Supabase TRANSACTION pooler (port 6543)
 *  - directUrl:  DDL / `db push` → Supabase SESSION pooler (port 5432)
 *
 * `directUrl` is the non-pooled connection, so `prisma db push` runs schema
 * sync on it automatically. Supabase doesn't allow a separate shadow database,
 * so we don't set `shadowDatabaseUrl` (use `db push`, not `migrate dev`).
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
    directUrl: process.env.DIRECT_URL,
  },
});
