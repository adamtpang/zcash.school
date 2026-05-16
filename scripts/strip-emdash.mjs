// One-shot: remove every em dash (U+2014) from site content.
// Heuristics, applied per line outside fenced code blocks:
//   1. numeric/letter ranges  "2020 — 2024" / "150s—75s"  -> " to "
//   2. spaced em dash         "a — b"                      -> "a, b"
//   3. tight em dash          "a—b"                        -> "a, b"
//   4. cleanups for the artifacts those produce
// Run: node scripts/strip-emdash.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Files to process: all docs MDX/MD + custom.css
import { readdirSync, statSync } from 'node:fs';
function walk(dir, acc = []) {
	for (const e of readdirSync(dir)) {
		const p = join(dir, e);
		const s = statSync(p);
		if (s.isDirectory()) walk(p, acc);
		else if (/\.(mdx?|css)$/.test(e)) acc.push(p);
	}
	return acc;
}
const targets = [
	...walk(join(root, 'src', 'content', 'docs')),
	join(root, 'src', 'styles', 'custom.css'),
];

const EM = '—';
let totalBefore = 0;
let filesChanged = 0;

for (const file of targets) {
	const src = readFileSync(file, 'utf8');
	const before = (src.match(/—/g) || []).length;
	if (before === 0) continue;
	totalBefore += before;

	const lines = src.split('\n');
	let inFence = false;
	const out = lines.map((line) => {
		if (/^\s*```/.test(line)) {
			inFence = !inFence;
			return line;
		}
		if (inFence) return line;
		if (!line.includes(EM)) return line;

		let l = line;
		// 1. ranges: digit/letter — digit  (keep units like 150s—75s)
		l = l.replace(/(\w)\s*—\s*(\d)/g, '$1 to $2');
		// 2. spaced em dash -> comma
		l = l.replace(/\s*—\s+/g, ', ');
		// 3. any remaining tight em dash -> comma+space
		l = l.replace(/\s*—\s*/g, ', ');

		// ---- cleanups ----
		l = l.replace(/,\s*,/g, ',');
		l = l.replace(/\s+,/g, ',');
		l = l.replace(/,\s*\./g, '.');
		l = l.replace(/,\s*:/g, ':');
		l = l.replace(/:\s*,\s*/g, ': ');
		l = l.replace(/\(\s*,\s*/g, '(');
		l = l.replace(/,\s*\)/g, ')');
		l = l.replace(/\.\s*,\s*/g, '. ');
		l = l.replace(/^(\s*)[-*]?\s*,\s*/, '$1'); // leading comma after list bullet/start
		l = l.replace(/,\s*$/, ''); // trailing comma left by "word —\n"
		l = l.replace(/(\S) {2,}/g, '$1 '); // collapse double spaces, never leading indentation
		return l;
	});

	const result = out.join('\n');
	writeFileSync(file, result, 'utf8');
	filesChanged++;
	const after = (result.match(/—/g) || []).length;
	console.log(`${file.replace(root, '.')}  ${before} -> ${after}`);
}

console.log(`\nDone. ${filesChanged} files, ${totalBefore} em dashes removed.`);
