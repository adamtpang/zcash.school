// Pass 2: fix the definitional-comma artifacts left by strip-emdash.mjs.
// Where an em dash separated a LABEL from its explanation, a comma reads
// wrong; a colon is the correct editorial substitute.
//   "**Term**, explanation"          -> "**Term**: explanation"
//   "### Option A, In-person POS"     -> "### Option A: In-person POS"
//   title="ZGo, turn any phone..."    -> title="ZGo: turn any phone..."
// Run: node scripts/fix-emdash-artifacts.mjs

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
function walk(dir, acc = []) {
	for (const e of readdirSync(dir)) {
		const p = join(dir, e);
		statSync(p).isDirectory() ? walk(p, acc) : /\.mdx?$/.test(e) && acc.push(p);
	}
	return acc;
}

let changed = 0;
for (const file of walk(join(root, 'src', 'content', 'docs'))) {
	const src = readFileSync(file, 'utf8');
	const lines = src.split('\n');
	let inFence = false;
	const out = lines.map((line) => {
		if (/^\s*```/.test(line)) {
			inFence = !inFence;
			return line;
		}
		if (inFence) return line;
		let l = line;
		// list item: "- **Term**, rest"  ->  "- **Term**: rest"
		l = l.replace(/^(\s*[-*]\s+\*\*[^*\n]+\*\*(?:\s*\([^)]*\))?),\s+/, '$1: ');
		// list item: "- `code`, rest"    ->  "- `code`: rest"
		l = l.replace(/^(\s*[-*]\s+`[^`\n]+`),\s+/, '$1: ');
		// heading: "### Option A, In-person"  ->  "### Option A: In-person"
		l = l.replace(/^(#{2,6}\s+[^,:\n]+),\s+/, '$1: ');
		// JSX prop: title="Name, tagline"  ->  title="Name: tagline" (first only, none already)
		l = l.replace(/(title=")([^":\n]+),\s+/, '$1$2: ');
		// bold lead-in mid-line: "**Term**, lowercaseword"  -> "**Term**: ..."
		l = l.replace(/(\*\*[^*\n]{2,40}\*\*),\s+(?=[a-z])/g, '$1: ');
		return l;
	});
	const result = out.join('\n');
	if (result !== src) {
		writeFileSync(file, result, 'utf8');
		changed++;
		console.log(`fixed ${file.replace(root, '.')}`);
	}
}
console.log(`\nPass 2 done. ${changed} files adjusted.`);
