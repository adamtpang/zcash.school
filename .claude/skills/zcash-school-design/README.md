# zcash.school — Design System

A design system distilled from [adamtpang/zcash.school](https://github.com/adamtpang/zcash.school):
a free, opinionated, end-to-end course on **Zcash** — the privacy-preserving cryptocurrency
that uses zero-knowledge proofs to keep transaction amounts and parties private by default.

> *Enrollment is open. Attendance is anonymous.*

This system captures the brand's voice, color, type, motifs, and component
recreations so a design agent can ship pixel-faithful mocks, slides, and
marketing artifacts without reinventing the look each time.

## Source material

Everything here is derived from one repo. Read the source for full context:

- **GitHub:** <https://github.com/adamtpang/zcash.school> (Astro + Starlight)
- **Live site:** <https://zcash.school>
- **Foundation thread:** [Zcash Network School grant](https://forum.zcashcommunity.com/t/zcash-network-school/55269)

Files we lifted directly:

- `src/styles/custom.css` → `assets/source-custom.css` (the canonical brand CSS)
- `public/favicon.svg`, `public/og-image.svg`, `public/og-image.png`,
  `public/apple-touch-icon.png` — the identity mark in every format
- `public/zebra-bg.svg` — the editorial background pattern
- `public/{airdrops,ns,start}-qr.png` — printable QR codes used at IRL events
- `src/data/schedule.json` → `assets/source-schedule.json` — event schedule shape

You can explore the repo for deeper reference — it has extensive Starlight
MDX content under `src/content/docs/` (lessons, blog posts, merchant guides)
that we did not import but is the source of truth for voice and tone.

---

## What this site/program actually is

There are really **three concentric things** wearing the same wordmark; design
work should respect which layer a given artifact belongs to.

1. **The course / curriculum** — five modules: Why Privacy Matters, Zero-Knowledge
   Proofs, How Zcash Works, Using Zcash, Ecosystem & Economics. Calm, primary-source,
   "Last reviewed" dates.
2. **Zcash Network School (ZNS)** — the 90-day Zcash Foundation–funded program in
   Malaysia that the site is a deliverable of. Events, office hours, $5-in-ZEC
   airdrops, merchant onboarding, monthly grant reports. The IRL layer.
3. **The sister projects** — zcash.me (onboarding), zcash.school (curriculum),
   zcashnames.com (usability). The brand co-signs all three but does not own them.

The visual system makes both temperatures available: a calm white **editorial card**
for reading, and a punchy near-black surface for identity moments (OG image,
hero, splash pages).

---

## Index — what's in this folder

```
README.md                      — this file
SKILL.md                       — entry point when used as a Claude Code skill
colors_and_type.css            — every CSS var (color, type, radius, shadow)
fonts/                         — webfonts (currently Google Fonts via @import)
assets/
  favicon.svg                  — the yellow-square + red-square identity mark
  og-image.svg / og-image.png  — the social card (1200×630)
  zebra-bg.svg                 — the cream + red zebra editorial background
  apple-touch-icon.png         — iOS home-screen icon
  {airdrops,ns,start}-qr.png   — printable QR posters used at events
  source-custom.css            — the original brand CSS, untouched
  source-schedule.json         — schedule data shape (event entries)
preview/                       — design-system cards for the Design System tab
ui_kits/
  zcash-school/
    README.md                  — how the kit is structured
    index.html                 — interactive recreation of the site
    *.jsx                      — reusable components (Header, Hero, Cards, …)
```

---

## CONTENT FUNDAMENTALS

> *Tuition free, knowledge zero.*

The voice is the brand. If you only follow one rule from this document, follow
this one: **write like the README, not like marketing.** Confident, declarative,
calm, and occasionally funny in a dry cypherpunk way.

### Voice

- **First-person plural for the project, second-person for the reader.** "We
  teach the principles; you hold the keys." Never "us at zcash.school" or
  corporate "the team here." Plain *we* and plain *you*.
- **Declarative sentences. Short paragraphs.** Lessons read like a smart friend
  explaining, not like a whitepaper. Compound sentences are fine; nested
  qualifications are not.
- **Hedges live in the spec, not the prose.** When the protocol may change, say
  "as of NU5" and move on — don't pile on disclaimers.
- **Primary sources, not paraphrases.** Real lessons link to zips.z.cash, the
  Zcash forum, the actual manifestos. Mocks should imply that posture too.

### Tone

- **Confidently anti-hype.** "We don't take a cut of anything." "We aren't
  pumping ZEC." "We aren't your wallet. Self-custody, write down your seed, etc."
- **Dry humor as punctuation, not as content.** One zinger per page, max:
  *"Chainalysis hates this one weird trick." / "The vibe is immaculate." /
  "Speak friend and enter."* Never quippy headlines back-to-back.
- **Cypherpunk cadence in italicized pull-quotes.** Every major page opens with
  a one-line italic epigraph: *"Enrollment is open. Attendance is anonymous." /
  "Transparent chains are just public diaries with extra steps." / "Tuition
  free, knowledge zero." / "The only school where attendance isn't tracked."*
- **Cards / CTAs get a single emoji prefix.** 🛡️ 🪙 📱 🛍️ 🎓 — never sprinkled
  through paragraph copy, only as a leading glyph on a CardGrid link title.

### Casing

- **Sentence case for headings**, not Title Case. ("Why privacy matters", not
  "Why Privacy Matters" — except for the canonical Module names which act as
  proper nouns: *Module 1 — Why Privacy Matters*.)
- **Wordmark is lowercase:** `zcash.school` (with a colored dot when set in
  display type — see Visual Foundations).
- **Brand and protocol terms are capitalized:** Zcash, Orchard, Sapling,
  Halo 2, Project Tachyon, Unified Address, Zashi/Zodl, Electric Coin Company,
  Network School.
- **Code is `code-styled` and address-coded:** `u1...`, `pnpm dev`, `NU5`.

### What "we" vs "you" sound like, in practice

| Situation | Yes | No |
|---|---|---|
| Explaining a concept | "A UA is the modern Zcash address format." | "In this section we will explore what a UA is." |
| Calling the reader to action | "Bring your phone with Zashi installed." | "Users should bring their phone." |
| The project's own posture | "We post monthly so anyone can see what the grant funds." | "Our team is committed to transparency." |
| Warning | "Whoever has the seed has the money." | "Please be aware of seed-phrase security." |
| Self-deprecation | "We aren't anonymous. Accountability matters." | "Disclaimer: the views expressed…" |

### Vibe checks (examples from the source)

- ✅ *"Cash was always private. A public ledger flipped that default. If your
  money has a leaderboard, it isn't yours."*
- ✅ *"Bring two things: your phone with Zashi installed and a u1… address
  visible. Yourself, to an event or office hours."*
- ✅ *"The fee is fractions of a cent. The vibe is immaculate."*
- ❌ "Unlock the future of decentralized finance with privacy-first money."
- ❌ "Our innovative platform empowers users to…"

---

## VISUAL FOUNDATIONS

The brand operates in two modes that share a token system:

### A) Editorial card (light, default reading surface)

A near-black page with a cream + red zebra background — but the **reading
surface is a calm white card** floating on top, with hairline rounding and a
deep drop shadow. Print-magazine framing, calm core. The hero's `h1` and body
text stay on the white card; the zebra never bleeds into copy.

### B) Splash / identity (dark, near-black)

Used for OG images, the home hero in dark mode, banners, slide section
breaks. Near-black background (`#0C0D10`) with yellow as the link/identity
accent and red as the call-to-action.

### Color system

- **Yellow `#F4B728` = "this is Zcash"** — links, dots in the wordmark, hover
  borders on educational cards, accent in OG marks. Pops on dark.
- **Red `#E5322D` = "do this"** — primary CTAs in *both* themes, hover borders
  on `.cta-grid .card`, the brand's "spin" color (we own this; ECC owns yellow).
- **Near-black `#0C0D10` + Cream `#FBF3E4`** — surfaces. The yellow + red dots
  identity mark sits comfortably on either.
- **Yellow and red never fight.** Yellow = link. Red = button. Same page is
  fine; same component, no.
- **Mode behavior:**
  - Dark mode (default): yellow accent on near-black. Red stays for action.
  - Light mode: red accent (the spin), tuned slightly toward
    `#D7263D` for AA contrast on white.

### Typography

The hybrid type system is the **NS × Zcash crossover** — Space Grotesk for
display (Network School flavor), Inter for body (z.cash + curriculum), and
JetBrains Mono for code. All three are free Google Fonts.

- **Space Grotesk** — every `h1`, `h2`, `h3`, the wordmark, and `.t-display`.
  Geometric, slightly architectural, max weight 700. Used at 700 for hero
  display, 600 for section headings, with `-0.025em` tracking for display
  and `-0.01em` for headings.
- **Inter** — body, lede, lists, buttons, sidebar, callouts. Used at 400
  (body), 500 (lede), 600 (buttons / nav), 700 (active states). Body
  line-height is `1.72` — generous on purpose, the source CSS calls it
  "more readable."
- **JetBrains Mono** for `code`, `u1...` addresses, and shell commands.
- **Measure is intentionally narrow:** `--content-width: 47rem`. The page
  makes you slow down.
- **Hero pattern:** one big tight Space Grotesk headline; one **accented
  character** in yellow (typically the period in `zcash.school`, never a
  gradient wash); a 38–50ch Inter tagline below in gray-2; two buttons —
  primary (red) + secondary (outline) — never three.

### Backgrounds & textures

- **Zebra editorial background.** `zebra-bg.svg` is a fractal-turbulence
  hard-edge two-tone — red shapes on cream — fixed-positioned behind the
  whole site at `inset: 0; background-attachment: fixed`. It frames the
  page; it does **not** sit behind copy. The white editorial card always
  intervenes.
- **No gradients in content** — there's exactly one (`linear-gradient(135deg,
  yellow → red)`) and it lives only on **avatar fallback initials** in the
  team grid. Otherwise: solid fills, hairline borders, drop shadows.
- **No purple, no neon, no glow.** Resist all bluish-purple gradients.

### Layout rules

- **Editorial card with margin air.** The main reading pane has
  `margin: clamp(0.75rem, 2.5vw, 2.25rem)` — never edge-to-edge. The
  sidebar mirrors this. The zebra shows around all four sides.
- **Reading width 47rem.** Don't blow it out.
- **CardGrid as the structural unit.** Most landing-page composition is just
  a 2- or 3-up CardGrid. Use `stagger` for the syllabus grid; flat for CTAs.
- **One "brand keyline" detail.** The reading card has a 3px yellow border
  on its top edge — tiny but consistent across pages.

### Borders, radii, shadows

- **Hairlines, not heavy strokes.** Cards and dividers use 1px borders in
  `--hairline` (`#E6E8EE` light / `#21232B` dark).
- **Radii ladder:** `999px` pills · `16px` editorial cards · `12px` panels
  (TOC, mobile cards) · `10px` team tiles · `8px` chips · `6px` buttons/inputs
  · `3px` inline-code & identity dots.
- **Shadow system, light only:**
  - `0 14px 40px rgba(12,13,16,0.22), 0 2px 6px rgba(12,13,16,0.12)` — the
    editorial card lift (deep, slightly stacked).
  - `0 14px 40px rgba(12,13,16,0.18)` — sidebar.
  - `0 8px 24px rgba(12,13,16,0.14)` — TOC margin note.
- **Dark mode has no shadow.** Surfaces sit flat; hairlines + accent borders
  do the lift instead.

### Hover & press states

- **Buttons (primary, red):** `background → --zs-red-hover (#C2241F)` plus
  `transform: translateY(-1px)`. 120ms ease, no opacity tricks.
- **Cards:** `transform: translateY(-2px)` + `border-color` swap to yellow
  (`.cta-grid .card` swaps to red instead). 140ms ease.
- **Nav links:** color swap to red + a 2px bottom-border drop-in. No fades.
- **Active sidebar item:** color = red, font-weight = 700. No background.
- **No press-state scaling** — the system uses lift on hover and nothing
  special on press; let the browser default suffice.

### Animation

- **Restraint first.** Two transitions exist site-wide:
  `transition: background 120ms ease, transform 120ms ease` and the 140ms
  variant for cards. **No bounce, no spring, no parallax, no scroll-jacking.**
- Reveal animations are out of scope; if a mock needs motion, use a single
  120-140ms ease on color/transform/border and stop.

### Transparency & blur

- The header bar uses `rgba(255,255,255,0.96)` + `backdrop-filter:
  saturate(140%) blur(6px)` so it stays legible over the zebra. The
  sidebar uses `rgba(255,255,255,0.97)` solid-ish.
- Right-rail TOC uses `rgba(255,255,255,0.94)` at ≥72rem.
- **Body copy is never on a translucent surface.** Translucency is for chrome
  only.

### Imagery & color vibe of photos

- The source site uses **no photography** in lessons. Team photos are a
  square crop, head + shoulders, ~600×600+, JPG/WebP < 200KB — and right now
  every slot is filled with a yellow→red gradient initial avatar instead.
  Keep this aesthetic in mocks: real photos warm, slightly desaturated, on
  white; or fall back to monogram + brand gradient.
- No b&w treatment, no heavy grain, no duotone. Photography (when present)
  should feel editorial-warm, not crypto-shiny.

### Cards (the visual unit)

- **1px hairline border** in `--hairline`.
- **Background** matches the surface (`--bg-1` on the editorial card,
  `--sl-color-bg-nav` on the splash hero — basically a slightly darker
  near-black).
- **Border-radius 10–16px** depending on density (10 for team tiles, 12 for
  panels, 16 for the editorial card itself).
- **Hover lifts by 2px** with the accent border swap.
- **No left-border accent stripe.** No emoji-card style. No colored
  drop-shadow.

---

## ICONOGRAPHY

The site uses **Starlight's built-in icon set** (Astro Starlight's
component library exposes a handful of named icons via `<Card icon="…">`
and `<LinkCard>`). What we observed in source:

- **`seti:lock`** — used on the "Why Privacy" landing card.
- **`puzzle`** — used on the "How ZK Works" card.
- **`rocket`** — used on the "Send Your First Shielded Transaction" card.
- **`right-arrow` / `external`** — used on hero CTA buttons.
- **GitHub / Discord / X (Twitter)** — Starlight social icon set, in the header.

In editorial copy, **emoji are used as card-title prefixes only** —
🛡️ 🪙 📱 🛍️ 🎓 — never inline in prose, never decoratively on a page.

There is **no custom icon font, no Lucide / Heroicons / Phosphor**, and
**no SVG icon library** beyond Starlight's defaults and the identity mark.

**For mocks made in this design system, use [Lucide](https://lucide.dev) icons
via CDN** as a near-match substitute (same stroke weight as Starlight's set,
ubiquitous, free). Treat it as a **substitution**: if you can map to one of
the icons the source actually uses, prefer the literal name (e.g. `lock`,
`puzzle`, `rocket`, `arrow-right`, `external-link`, `github`, `mail`,
`qr-code`, `wallet`). **Flag the substitution in any handoff** so the user
can swap if they want.

### Logos & marks

- **Identity mark = two squares:** yellow `#F4B728` then red `#E5322D`,
  each `14×14` (favicon) / `46×46` (OG) with `rx=3` / `rx=9`. Spacing
  between is `4px` / `12px`. The mark appears as **inline dots in the
  wordmark too**: a 0.62rem yellow square with a red box-shadow offset.
- **Wordmark** is `zcash.school` set in Inter, weight 760+, with the **dot
  in `zcash.school`** colored yellow (`#F4B728`) when set in display type
  (see `og-image.svg`).
- All identity assets live in `assets/`:
  - `favicon.svg` — 64×64, primary identity
  - `og-image.svg` / `og-image.png` — 1200×630 social card
  - `apple-touch-icon.png` — iOS home screen

### QR codes

The site ships **three printable QR posters** (`/start-qr.png`,
`/ns-qr.png`, `/airdrops-qr.png`) used on physical banners at Network
School. They're plain black-on-white QRs — no logo overlay, no fancy
shapes. Generated via `pnpm qr`. When designing print or signage,
generate fresh QRs to match (don't reuse these; they're URL-specific).

---

## Index of UI kits

- **`ui_kits/zcash-school/`** — the marketing/curriculum site. A click-thru
  recreation of the Astro+Starlight site: header, splash hero, CardGrid
  syllabus, lesson page with the "Last reviewed" pill, team grid, and the
  zebra editorial frame.

---

## Caveats & substitutions

- **Fonts:** the upstream zcash.school CSS specifies Inter for everything;
  this design system **upgrades** the display family to **Space Grotesk**
  to thread the Network School aesthetic through the brand. Inter remains
  the body family (matching the source). Both load from Google Fonts; if
  you want self-hosted `.ttf`s in `fonts/`, drop them in and swap the
  `@import` to `@font-face`.
- **Icons** use Lucide as a flagged substitute for Starlight's icon set; if
  fidelity matters, hand-pick replacements per usage.
- **Photography** is unspecified in the source; mocks should default to the
  initial-monogram avatar pattern unless real headshots are provided.
- **"Zashi" vs "Zodl"** — most of the source still says Zashi; the rebrand
  to Zodl is acknowledged. When writing new copy, prefer "Zodl (formerly
  Zashi)" the first time on a page, then "Zodl" after.
