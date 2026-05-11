// Generates public/ns-qr.png — the QR code printed on ZNS banners.
// Run via `pnpm qr`.

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import QRCode from 'qrcode';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const target = 'https://zcash.school/ns';
const out = join(root, 'public', 'ns-qr.png');

await QRCode.toFile(out, target, {
	type: 'png',
	errorCorrectionLevel: 'H',
	margin: 2,
	width: 1024,
	color: {
		dark: '#1A1F2E',
		light: '#FFFFFF',
	},
});

console.log(`Wrote ${out} → encodes ${target}`);
