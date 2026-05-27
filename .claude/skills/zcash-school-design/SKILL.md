---
name: zcash-school-design
description: Use this skill to generate well-branded interfaces and assets for zcash.school (the Zcash curriculum and Zcash Network School program), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

## Installation (one-time)

Drop this folder into either of:

- `<your-repo>/.claude/skills/zcash-school-design/` — scoped to one repo (recommended for `adamtpang/zcash.school`)
- `~/.claude/skills/zcash-school-design/` — available to every Claude Code session on your machine

Claude Code will discover `SKILL.md` automatically.

## How to use

Read the `README.md` file within this skill, and explore the other available
files. The repo at <https://github.com/adamtpang/zcash.school> is the canonical
source of truth — link to it from any handoff.

Key entry points:

- `README.md` — voice / tone / visual / iconography rules
- `colors_and_type.css` — every token (color, type, radii, shadow)
- `assets/` — favicon, OG, zebra background, QR posters
- `ui_kits/zcash-school/` — pixel-faithful React recreation of the site
- `preview/` — design-system cards (live in the Design System tab)

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy
assets out and create static HTML files for the user to view. The site uses an
**editorial card on zebra background** layout in light mode and a **near-black
identity surface** in dark mode — both belong to the same brand, pick whichever
fits the artifact.

If working on production code, you can copy assets and read the rules here to
become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they
want to build or design, ask some questions, and act as an expert designer who
outputs HTML artifacts _or_ production code, depending on the need.

## House style cheat sheet

- **Voice:** confident, anti-hype, dry. First-person plural for the project,
  second-person for the reader. Italic cypherpunk epigraph per page.
- **Color:** yellow `#F4B728` = "this is Zcash" (links). Red `#E5322D` = "do
  this" (actions). Yellow and red never compete on the same component.
- **Type:** Inter for everything — display 820, headings 750, buttons 650.
  JetBrains Mono for code and `u1…` addresses. Measure 47rem.
- **Surfaces:** white editorial card with deep shadow + 3px yellow top
  keyline, floating on the cream-and-red zebra background. Or near-black
  splash for identity moments.
- **Icons:** Lucide stand-ins for Starlight's icon set. Document
  substitutions in handoff.
- **Animation:** 120–140ms ease on color/transform/border. No bounce, no
  spring, no glow.
