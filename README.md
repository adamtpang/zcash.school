# Zcash School

A free, opinionated, end-to-end course on **Zcash** — the privacy-preserving
cryptocurrency that uses zero-knowledge proofs to keep transaction amounts and
parties private by default.

> *Enrollment is open. Attendance is anonymous.*

Live site: <https://zcash.school>

## What's here

- **Module 1 — Why Privacy Matters** — financial privacy as the historical
  default, the Bitcoin transparency problem, the cypherpunk lineage, and the
  Zcash thesis.
- **Module 2 — Zero-Knowledge Proofs** — intuition, zk-SNARKs, and the
  trustless Halo 2 setup behind Zcash's Orchard pool.
- **Module 3 — How Zcash Works** — addresses, pools, notes, nullifiers,
  Orchard, and Project Tachyon (the next major upgrade).
- **Module 4 — Using Zcash** — wallets, your first shielded transaction,
  selective disclosure, and accepting Zcash as a merchant.
- **Module 5 — Ecosystem & Economics** — the orgs (post Q1 2026 five-org
  restructure), ZIPs and upgrades, the supply schedule.

## About the Zcash Network School

This site is part of the **Zcash Network School (ZNS)**, a three-month
educational program supported by a Zcash Foundation community grant. ZNS
deliverables include educational events, office hours, wallet activations,
and POS/vendor onboarding. Forum thread:
<https://forum.zcashcommunity.com/t/zcash-network-school/55269>.

Sister sites:

- [zcash.me](https://zcash.me)
- [zcashnames.com](https://zcashnames.com)

## Stack

- [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/)
- TypeScript (strict)
- pnpm
- Deployed on Vercel as a static site

## Local development

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # production build to ./dist
pnpm preview  # preview the production build
pnpm og       # regenerate the social OG image from the SVG source
```

## Contributing

Issues and pull requests welcome. Lessons aim to:

- Be accurate against the spec ([zips.z.cash](https://zips.z.cash/))
- Link to primary sources where possible
- Hedge with "as of NU5" or similar where the protocol may change
- Include a "Last reviewed" date at the top of each lesson

## License

Content and code are released under the MIT License unless otherwise noted.

## Affiliation

This is an independent educational project. It is not affiliated with the
Electric Coin Company or the Zcash Foundation. Tuition free, knowledge zero.
