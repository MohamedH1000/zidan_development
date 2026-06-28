/**
 * Create or update an admin user (bcrypt-hashed password).
 * Usage: npm run seed:admin -- --email you@example.com --password 'YourPassword'
 */
import "./load-env.mjs";
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : undefined;
}

const email = arg("email")?.trim().toLowerCase();
const password = arg("password");
const name = arg("name");

if (!email || !password) {
  console.error("Usage: npm run seed:admin -- --email you@example.com --password 'YourPassword' [--name 'Name']");
  process.exit(1);
}
if (password.length < 8) {
  console.error("Password must be at least 8 characters.");
  process.exit(1);
}

const passwordHash = await bcryptjs.hash(password, 10);

await prisma.adminUser.upsert({
  where: { email },
  update: { passwordHash, role: "ADMIN", ...(name ? { name } : {}) },
  create: { email, passwordHash, role: "ADMIN", ...(name ? { name } : {}) },
});

console.log(`✓ Admin ready: ${email}`);
await prisma.$disconnect();
