/**
 * One-off: strip a single trailing full stop from Arabic UI strings in
 * messages/ar.json (Arabic house style — sentences must not end with ".").
 * Content/* Arabic strings are handled at render time by lib/i18n pick().
 *
 * Run: node scripts/fix-ar-periods.mjs
 */
import { readFile, writeFile } from "node:fs/promises";

const PATH = "messages/ar.json";

function trimTrailingPeriod(value) {
  if (typeof value !== "string") return value;
  return value.replace(/\s*\.+\s*$/, "");
}

function walk(node) {
  if (typeof node === "string") return trimTrailingPeriod(node);
  if (Array.isArray(node)) return node.map(walk);
  if (node && typeof node === "object") {
    const out = {};
    for (const [key, val] of Object.entries(node)) out[key] = walk(val);
    return out;
  }
  return node;
}

const raw = await readFile(PATH, "utf8");
const data = JSON.parse(raw);
const cleaned = walk(data);
await writeFile(PATH, JSON.stringify(cleaned, null, 2) + "\n", "utf8");
console.log(`✓ Cleaned trailing periods in ${PATH}`);
