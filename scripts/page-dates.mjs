// Writes src/data/page-dates.json: the first and newest git commit time of
// every docs page. Vercel builds run without git history, so Starlight's
// automatic "Last updated" date and the JSON-LD dates fall back to this file.
// Run `npm run dates` after editing content, then commit the JSON.
import { execFileSync } from 'node:child_process';
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const docs = join(root, 'src/content/docs');

function walk(dir) {
	return readdirSync(dir).flatMap((name) => {
		const full = join(dir, name);
		return statSync(full).isDirectory() ? walk(full) : /\.mdx?$/.test(name) ? [full] : [];
	});
}

const out = {};
for (const file of walk(docs).sort()) {
	const rel = relative(root, file).split('\\').join('/');
	const log = execFileSync('git', ['log', '--follow', '--format=%ct', '--', rel], { cwd: root, encoding: 'utf8' })
		.split('\n')
		.filter(Boolean)
		.map(Number);
	if (!log.length) continue;
	out[rel] = {
		published: new Date(Math.min(...log) * 1000).toISOString(),
		modified: new Date(Math.max(...log) * 1000).toISOString(),
	};
}

writeFileSync(join(root, 'src/data/page-dates.json'), JSON.stringify(out, null, '\t') + '\n');
console.log(`page-dates: ${Object.keys(out).length} pages`);
