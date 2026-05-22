import type { APIRoute } from 'astro';

export const prerender = false;

/**
 * /airdrops submission endpoint.
 *
 * Validates a public unified address + an email, then proxies to the
 * Google Apps Script Web App bound to the Airdrops Team spreadsheet
 * (scripts/airdrops-sheet.gs). Every successful submission appends a
 * row to the sheet, so the team works directly in Sheets — no Resend,
 * no separate inbox.
 *
 * SCOPE: collects PUBLIC u1... address + email + (optional) event.
 * Never touches seed phrases, private keys, or funds.
 *
 * Env (Vercel → Settings → Environment Variables):
 *   AIRDROPS_WEBHOOK_URL  the Apps Script Web App deployment URL.
 * Without it, submissions still succeed for the visitor and are
 * logged to Vercel function logs (recoverable). Set it to record
 * directly into the sheet.
 */

const BECH32 = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';

/**
 * Light unified-address sanity check. Not a full bech32m decode (no
 * checksum), just prefix + charset + length — enough to reject the
 * obvious typos and paste-failures without pulling in a bech32 lib.
 */
function looksLikeUnifiedAddress(value: string): boolean {
	const v = value.trim().toLowerCase();
	if (!v.startsWith('u1')) return false;
	if (v.length < 60 || v.length > 600) return false;
	for (const ch of v.slice(2)) {
		if (!BECH32.includes(ch)) return false;
	}
	return true;
}

function looksLikeEmail(value: string): boolean {
	const v = value.trim();
	if (v.length < 5 || v.length > 320) return false;
	// Pragmatic regex: one @, dot in the domain part, no whitespace.
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
	const now = Date.now();
	const arr = (hits.get(ip) || []).filter((t) => now - t < 60_000);
	arr.push(now);
	hits.set(ip, arr);
	return arr.length > 5;
}

const json = (status: number, body: Record<string, unknown>) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { 'content-type': 'application/json' },
	});

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

	// Honeypot: real users never fill this hidden field.
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

	const unifiedAddress = (data.unifiedAddress || '').trim();
	const email = (data.email || '').trim();
	const event = (data.event || '').trim();
	const contact = (data.contact || '').trim();
	const source = (data.source || 'zcash.school /airdrops').trim();
	const userAgent = request.headers.get('user-agent') || '';

	if (!looksLikeUnifiedAddress(unifiedAddress)) {
		return json(400, {
			ok: false,
			error:
				'That does not look like a unified address. It should start with "u1" and be a long string. In Zodl: tap Receive and copy the u1 address.',
		});
	}
	if (!looksLikeEmail(email)) {
		return json(400, {
			ok: false,
			error: 'That email does not look valid. Try again.',
		});
	}

	// Always log so the row is recoverable from Vercel logs even if
	// the Apps Script call fails or the env var is missing.
	console.log(
		JSON.stringify({ at: new Date().toISOString(), unifiedAddress, email, event, contact, source, ip })
	);

	const webhook = import.meta.env.AIRDROPS_WEBHOOK_URL;
	if (webhook) {
		try {
			const res = await fetch(webhook, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					unifiedAddress,
					email,
					event,
					contact,
					source,
					userAgent,
				}),
				// Apps Script Web Apps redirect through googleusercontent;
				// fetch follows redirects by default on Vercel runtime.
			});
			if (!res.ok) {
				console.error('Apps Script non-2xx:', res.status, await res.text());
			}
		} catch (err) {
			console.error('Apps Script request failed:', err);
		}
	} else {
		console.warn('AIRDROPS_WEBHOOK_URL not set; submission logged only.');
	}

	return json(200, {
		ok: true,
		message:
			"You're in. ZEC arrives within 24 hours (often sooner). We'll email you when the shielded newsletter ships.",
	});
};

export const ALL: APIRoute = () => json(405, { ok: false, error: 'Use POST.' });
