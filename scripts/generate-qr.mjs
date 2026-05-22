// Generates the banner-print QR codes. Run via `pnpm qr`.
// Each entry below produces one PNG at public/<name>.
// High error correction so smudged/partial scans still resolve.

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import QRCode from 'qrcode';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const codes = [
	{ name: 'ns-qr.png', url: 'https://zcash.school/ns' },
	{ name: 'airdrops-qr.png', url: 'https://zcash.school/airdrops' },
	{ name: 'start-qr.png', url: 'https://zcash.school/start' },
];

for (const { name, url } of codes) {
	const out = join(root, 'public', name);
	await QRCode.toFile(out, url, {
		type: 'png',
		errorCorrectionLevel: 'H',
		margin: 2,
		width: 1024,
		color: { dark: '#0C0D10', light: '#FFFFFF' },
	});
	console.log(`Wrote public/${name}  →  ${url}`);
}
