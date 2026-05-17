import type { APIRoute } from 'astro';

// On-demand (serverless on Vercel). Everything else on the site stays static.
export const prerender = false;

/**
 * /claim submission endpoint.
 *
 * SCOPE: collects a PUBLIC unified address + an event name + optional
 * contact. It NEVER touches seed phrases, private keys, or funds, and
 * does no payout. The $5 ZEC payout stays a manual, owner-run step.
 *
 * Delivery: emails the claim to the owner via Resend (env below). If
 * Resend is not configured or errors, we still return success to the
 * visitor (a dropped lead is worse than a missing email) and log the
 * full claim to the serverless function log so it is recoverable from
 * Vercel logs. Optional KV persistence/dedupe is intentionally not
 * built here to keep this lean.
 *
 * Env (set in Vercel, documented in .env.example):
 *   RESEND_API_KEY     - Resend API key. If absent, email is skipped.
 *   CLAIM_NOTIFY_EMAIL - where claims are sent.
 *   CLAIM_FROM_EMAIL   - verified Resend sender (defaults below).
 */

const BECH32 = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';

/**
 * Light unified-address sanity check. NOT a full bech32m decode (no
 * checksum verification): a prefix + charset + length screen is enough
 * to reject obvious garbage on a form without pulling in a bech32 lib.
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

// Best-effort in-memory rate limit. Persists only within a warm
// serverless instance, so it deters casual flooding, not a determined
// attacker. The honeypot below is the primary bot screen.
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
	const now = Date.now();
	const windowMs = 60_000;
	const max = 5;
	const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
	arr.push(now);
	hits.set(ip, arr);
	return arr.length > max;
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
		return json(200, { ok: true }); // silently accept, drop on the floor
	}

	const ip = clientAddress || 'unknown';
	if (rateLimited(ip)) {
		return json(429, {
			ok: false,
			error: 'Too many submissions. Wait a minute and try again.',
		});
	}

	const unifiedAddress = (data.unifiedAddress || '').trim();
	const event = (data.event || '').trim();
	const contact = (data.contact || '').trim();

	if (!looksLikeUnifiedAddress(unifiedAddress)) {
		return json(400, {
			ok: false,
			error:
				'That does not look like a unified address. It should start with "u1" and be a long string. In Zodl: tap Receive and copy the u1 address.',
		});
	}
	if (!event) {
		return json(400, {
			ok: false,
			error: 'Tell us which event or office hours you attended.',
		});
	}

	const summary = [
		'New ZEC claim from zcash.school',
		'',
		`Unified address: ${unifiedAddress}`,
		`Event: ${event}`,
		`Contact: ${contact || '(none given)'}`,
		`IP: ${ip}`,
		`Time: ${new Date().toISOString()}`,
	].join('\n');

	// Always log so the claim is recoverable from Vercel function logs
	// even if email delivery fails.
	console.log(summary);

	const key = import.meta.env.RESEND_API_KEY;
	const to = import.meta.env.CLAIM_NOTIFY_EMAIL;
	const from = import.meta.env.CLAIM_FROM_EMAIL || 'claims@zcash.school';

	if (key && to) {
		try {
			const res = await fetch('https://api.resend.com/emails', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${key}`,
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					from: `zcash.school claims <${from}>`,
					to: [to],
					subject: `ZEC claim · ${event}`.slice(0, 120),
					text: summary,
					reply_to: contact && contact.includes('@') ? contact : undefined,
				}),
			});
			if (!res.ok) {
				console.error('Resend non-2xx:', res.status, await res.text());
			}
		} catch (err) {
			console.error('Resend request failed:', err);
		}
	} else {
		console.warn(
			'RESEND_API_KEY / CLAIM_NOTIFY_EMAIL not set; claim logged only.'
		);
	}

	return json(200, {
		ok: true,
		message: 'Claim received. ZEC sent within 24 hours. See you at the next event.',
	});
};

// Anything other than POST.
export const ALL: APIRoute = () =>
	json(405, { ok: false, error: 'Use POST.' });
