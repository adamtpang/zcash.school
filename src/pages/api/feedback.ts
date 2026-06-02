import type { APIRoute } from 'astro';

export const prerender = false;

/**
 * /feedback submission endpoint.
 *
 * Reuses the same Google Apps Script Web App as /airdrops — one
 * webhook, one spreadsheet, one tab per submission type. The script
 * branches on `data.type` and writes the feedback row to a sheet tab
 * named "Feedback" (create it once; same workbook as Airdrops).
 *
 * If the user has not yet updated their deployed Apps Script to the
 * branching version, the row degrades gracefully: the feedback text
 * is also packed into the `event` field so an old script captures it
 * in the existing Airdrops tab rather than losing the message.
 */

const json = (status: number, body: Record<string, unknown>) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { 'content-type': 'application/json' },
	});

const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
	const now = Date.now();
	const arr = (hits.get(ip) || []).filter((t) => now - t < 60_000);
	arr.push(now);
	hits.set(ip, arr);
	return arr.length > 5;
}

function looksLikeEmail(v: string): boolean {
	const s = v.trim();
	if (!s) return true; // optional
	if (s.length < 5 || s.length > 320) return false;
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
	let data: Record<string, string> = {};
	try {
		const ct = request.headers.get('content-type') || '';
		if (ct.includes('application/json')) {
			data = await request.json();
		} else {
			const form = await request.formData();
			data = Object.fromEntries(
				[...form.entries()].map(([k, v]) => [k, String(v)])
			);
		}
	} catch {
		return json(400, { ok: false, error: 'Could not read the form. Try again.' });
	}

	// Honeypot
	if (data.company && data.company.trim() !== '') {
		return json(200, { ok: true });
	}

	const ip = clientAddress || 'unknown';
	if (rateLimited(ip)) {
		return json(429, {
			ok: false,
			error: 'Too many submissions. Wait a minute and try again.',
		});
	}

	const feedback = (data.feedback || '').trim();
	const email = (data.email || '').trim();
	const name = (data.name || '').trim();
	const context = (data.context || '').trim();
	const rating = (data.rating || '').trim();

	if (!feedback) {
		return json(400, { ok: false, error: 'Write something in the feedback box.' });
	}
	if (feedback.length > 5000) {
		return json(400, { ok: false, error: 'Keep feedback under 5000 characters.' });
	}
	if (!looksLikeEmail(email)) {
		return json(400, { ok: false, error: 'That email does not look valid (or leave it blank).' });
	}

	const userAgent = request.headers.get('user-agent') || '';
	const source = (data.source || 'zcash.school /feedback').trim();

	const payload = {
		// Explicit feedback fields — the new Apps Script writes these to
		// the "Feedback" tab.
		type: 'feedback',
		name,
		email,
		context,
		rating,
		feedback,
		// Airdrops-shaped fallback so an old (un-upgraded) Apps Script
		// still captures the feedback text in the Airdrops tab's `event`
		// column instead of dropping it.
		unifiedAddress: '',
		event: `[feedback] ${feedback}`.slice(0, 1000),
		contact: [name, context].filter(Boolean).join(' · '),
		source,
		userAgent,
	};

	console.log(
		JSON.stringify({ at: new Date().toISOString(), kind: 'feedback', ip, ...payload })
	);

	const webhook = import.meta.env.AIRDROPS_WEBHOOK_URL;
	if (webhook) {
		try {
			const res = await fetch(webhook, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(payload),
			});
			if (!res.ok) {
				console.error('Apps Script non-2xx (feedback):', res.status, await res.text());
			}
		} catch (err) {
			console.error('Apps Script request failed (feedback):', err);
		}
	} else {
		console.warn('AIRDROPS_WEBHOOK_URL not set; feedback logged only.');
	}

	return json(200, {
		ok: true,
		message: 'Thank you. Sent. We read every one.',
	});
};

export const ALL: APIRoute = () => json(405, { ok: false, error: 'Use POST.' });
