// Rasterizes public/og-image.svg → public/og-image.png at 1200×630.
// Run via `pnpm og`.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const svgPath = join(root, 'public', 'og-image.svg');
const pngPath = join(root, 'public', 'og-image.png');

const svg = readFileSync(svgPath);
const png = await sharp(svg, { density: 192 })
	.resize(1200, 630, { fit: 'contain', background: '#1A1F2E' })
	.png({ compressionLevel: 9 })
	.toBuffer();

writeFileSync(pngPath, png);
console.log(`Wrote ${pngPath} (${png.length.toLocaleString()} bytes)`);
