/**
 * Generates a static Open Graph image (public/og.png) from a branded SVG using
 * sharp. We avoid next/og (satori) here because its WASM font subsetter throws
 * "lookupType: 5 - substFormat: 3 is not yet supported" in some environments.
 *
 * Run with: node scripts/generate-og.mjs  (wired as a prebuild step).
 */
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const W = 1200;
const H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow1" cx="78%" cy="22%" r="45%">
      <stop offset="0%" stop-color="#c8a45c" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#c8a45c" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="14%" cy="86%" r="40%">
      <stop offset="0%" stop-color="#c8a45c" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#c8a45c" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="goldLine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#c8a45c" stop-opacity="0"/>
      <stop offset="50%" stop-color="#c8a45c" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#c8a45c" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#0a0a0a"/>
  <rect width="${W}" height="${H}" fill="url(#glow1)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>

  <!-- Monogram + wordmark -->
  <g transform="translate(80, 78)">
    <rect x="0" y="0" width="66" height="66" rx="15" fill="none" stroke="#c8a45c" stroke-opacity="0.45" stroke-width="1.5"/>
    <text x="33" y="48" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700" fill="#c8a45c" text-anchor="middle">Z</text>
    <text x="92" y="34" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" letter-spacing="1" fill="#f7f3ec">ZIDAN</text>
    <text x="92" y="58" font-family="Arial, Helvetica, sans-serif" font-size="15" letter-spacing="6" fill="#c8a45c">DEVELOPMENT</text>
  </g>

  <!-- Headline block -->
  <g transform="translate(80, 320)">
    <text x="0" y="0" font-family="Arial, Helvetica, sans-serif" font-size="66" font-weight="700" fill="#f7f3ec">Building Value.</text>
    <text x="0" y="70" font-family="Arial, Helvetica, sans-serif" font-size="66" font-weight="700" fill="#c8a45c">Creating Landmarks.</text>
    <text x="0" y="124" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#f7f3ec" fill-opacity="0.7">New Cairo&#8217;s most strategic districts &#8212; built with precision.</text>
  </g>

  <!-- Gold rule -->
  <rect x="80" y="560" width="1040" height="2" fill="url(#goldLine)"/>
  <text x="80" y="592" font-family="Arial, Helvetica, sans-serif" font-size="15" letter-spacing="3" fill="#f7f3ec" fill-opacity="0.55">NEW CAIRO &#183; FIFTH SETTLEMENT &#183; AL NARGES &#183; BAIT AL WATAN &#183; LOTUS</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();

await writeFile("public/og.png", png);
console.log(`✓ Generated public/og.png (${W}x${H}, ${png.length} bytes)`);
