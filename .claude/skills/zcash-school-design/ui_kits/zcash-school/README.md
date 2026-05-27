# zcash.school — UI Kit

Pixel-faithful recreation of the [zcash.school](https://zcash.school) marketing /
curriculum site, derived from the Astro + Starlight source at
[adamtpang/zcash.school](https://github.com/adamtpang/zcash.school).

## What's here

- **`index.html`** — interactive click-thru. Four screens you can navigate
  between: splash, a lesson page, the team page, and the Network School
  (ZNS) landing. The zebra editorial background and the white floating
  content card are both faithful to the source CSS.
- **Components** (all in `components.jsx`, exported to `window`):
  - `Frame` — the zebra-bg → white editorial card scaffold
  - `Header` — sticky white top bar with wordmark + identity dots + topnav
  - `Sidebar` — Starlight-style left rail with module groups and active state
  - `Hero` — display headline + tagline + primary/secondary buttons
  - `CardGrid`, `LinkCard`, `Card` — landing-page composition units
  - `LessonBody` — the main reading column: last-reviewed pill, h1/h2 with
    top rule, body, Aside, blockquote epigraph
  - `Aside` — tip / caution / note callouts
  - `TeamGrid` + `TeamTile` — initial-monogram avatars on yellow→red gradient
  - `RightRail` — the floating "On this page" TOC margin note
  - `Button` — primary / secondary / minimal

## How to view

Open `index.html`. Top nav lets you swap between screens.

## Fidelity notes

- Layout / spacing / radii / shadows are lifted from `src/styles/custom.css`
  in the source repo (kept here as `../../assets/source-custom.css`).
- Iconography is **substituted** with Lucide icons (closest visual match to
  Starlight's built-in set). Where the source uses `seti:lock`, `puzzle`,
  `rocket`, etc., we use `lucide-shield-check`, `lucide-puzzle`,
  `lucide-rocket`, etc.
- The kit is light-mode only (the editorial card mode). Dark mode tokens
  exist in `../../colors_and_type.css` if needed.
