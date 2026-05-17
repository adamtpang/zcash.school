// Builds public/favicon.ico from the brand identity mark:
// yellow square (= "zcash", Zcash yellow) + red square (= "school"),
// on the near-black tile. Matches public/favicon.svg and the site title.
// Run: pnpm favicon

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Identity mark. Left square Zcash yellow (#F4B728), right square our
// red (#E5322D), rounded near-black field. Geometry tuned to read at 16px.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0C0D10"/>
  <rect x="14" y="25" width="15" height="15" rx="3" fill="#F4B728"/>
  <rect x="35" y="25" width="15" height="15" rx="3" fill="#E5322D"/>
</svg>`;

const sizes = [16, 32, 48, 64];
const pngs = [];
for (const s of sizes) {
	pngs.push(await sharp(Buffer.from(svg)).resize(s, s).png().toBuffer());
}

const ico = await pngToIco(pngs);
writeFileSync(join(root, 'public', 'favicon.ico'), ico);

// Also keep a crisp 180px apple-touch PNG (rounded look stays).
const touch = await sharp(Buffer.from(svg)).resize(180, 180).png().toBuffer();
writeFileSync(join(root, 'public', 'apple-touch-icon.png'), touch);

console.log(`Wrote public/favicon.ico (${ico.length} bytes, ${sizes.join('/')}px) + apple-touch-icon.png`);
