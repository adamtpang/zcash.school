// Sync the `design.zcash.school` design system from the user's Desktop
// folder into this repo. Run after every Claude.ai /design refresh:
//
//   pnpm design:sync             copy files + print what changed
//   pnpm design:sync --commit    copy + stage + create a commit
//
// What it copies:
//   <Desktop>/design.zcash.school/slides/zcash-school-deck.html
//     → public/showcase/index.html   (with relative ../assets paths
//        rewritten to site-root paths so /showcase/ Just Works)
//   <Desktop>/design.zcash.school/slides/deck-stage.js
//     → public/showcase/deck-stage.js
//   <Desktop>/design.zcash.school/**
//     → .claude/skills/zcash-school-design/**   (whole folder, so the
//        Claude Code skill picks up updates without manual work)
//
// The two `public/showcase/*` files are the live slide deck served at
// https://zcash.school/showcase/. The .claude/skills mirror keeps the
// design-system skill (SKILL.md, README, tokens, preview HTML, ui_kits)
// in sync with whatever you exported.

import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, statSync, readdirSync, rmSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { homedir } from 'node:os';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const COMMIT = process.argv.includes('--commit');

function locateDesignFolder() {
	const candidates = [
		join(homedir(), 'OneDrive', 'Desktop', 'design.zcash.school'),
		join(homedir(), 'Desktop', 'design.zcash.school'),
	];
	for (const p of candidates) if (existsSync(p)) return p;
	throw new Error(
		'design.zcash.school folder not found on Desktop. Looked in:\n  ' +
			candidates.join('\n  ')
	);
}

function ensureDir(d) {
	if (!existsSync(d)) mkdirSync(d, { recursive: true });
}

function copyTree(src, dst) {
	const stat = statSync(src);
	if (stat.isDirectory()) {
		ensureDir(dst);
		for (const entry of readdirSync(src)) {
			copyTree(join(src, entry), join(dst, entry));
		}
	} else {
		ensureDir(dirname(dst));
		copyFileSync(src, dst);
	}
}

function copyAndPatchDeck(src, dst) {
	let html = readFileSync(src, 'utf8');
	// Deck references ../assets/* relative to slides/. Rewrite to site-root
	// so /showcase/index.html resolves via Astro's static public/ tree.
	html = html
		.replace(/href="\.\.\/assets\/favicon\.svg"/g, 'href="/favicon.svg"')
		.replace(/src="\.\.\/assets\/start-qr\.png"/g, 'src="/start-qr.png"')
		.replace(/src="\.\.\/assets\/ns-qr\.png"/g, 'src="/ns-qr.png"')
		.replace(/src="\.\.\/assets\/airdrops-qr\.png"/g, 'src="/airdrops-qr.png"')
		.replace(/src="\.\.\/assets\/og-image\.png"/g, 'src="/og-image.png"')
		.replace(/src="\.\.\/assets\/zebra-bg\.svg"/g, 'src="/zebra-bg.svg"');
	ensureDir(dirname(dst));
	writeFileSync(dst, html);
}

const SRC = locateDesignFolder();
console.log(`Sourcing design system from: ${SRC}`);

// 1) Slide deck → public/showcase/
const deckSrc = join(SRC, 'slides', 'zcash-school-deck.html');
const stageSrc = join(SRC, 'slides', 'deck-stage.js');
const showcase = join(REPO, 'public', 'showcase');
if (existsSync(deckSrc) && existsSync(stageSrc)) {
	copyAndPatchDeck(deckSrc, join(showcase, 'index.html'));
	copyFileSync(stageSrc, join(showcase, 'deck-stage.js'));
	console.log('  ✓ public/showcase/{index.html,deck-stage.js}');
} else {
	console.warn('  - slides/ missing; skipped deck copy');
}

// 2) Whole design-system folder → .claude/skills/zcash-school-design/
//    Mirror: wipe and recopy so deleted files do not linger.
const skillDst = join(REPO, '.claude', 'skills', 'zcash-school-design');
if (existsSync(skillDst)) rmSync(skillDst, { recursive: true, force: true });
copyTree(SRC, skillDst);
console.log(`  ✓ .claude/skills/zcash-school-design/  (mirror of ${relative(REPO, SRC) || SRC})`);

if (COMMIT) {
	console.log('\nStaging and committing…');
	execSync('git add public/showcase .claude/skills/zcash-school-design', {
		cwd: REPO,
		stdio: 'inherit',
	});
	const status = execSync('git status --porcelain', { cwd: REPO }).toString().trim();
	if (!status) {
		console.log('  - nothing changed; no commit.');
	} else {
		execSync(
			'git commit -m "chore(design): sync design.zcash.school from Desktop"',
			{ cwd: REPO, stdio: 'inherit' }
		);
	}
} else {
	console.log(
		'\nDone. Review with `git status` / `git diff`, then commit yourself or rerun with --commit.'
	);
}
