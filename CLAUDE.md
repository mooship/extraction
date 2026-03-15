# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Vite dev server
npm run build        # tsc + vite build
npm run preview      # Preview production build
npm run biome:fix    # Auto-fix all formatting and lint issues
```

There are no tests. TypeScript type-checking is done via `tsc --noEmit` (runs as part of `build`). Run Biome checks before committing with `npx biome check src/ index.html`.

## Architecture

Single-page vanilla TypeScript site built with Vite. No framework. All HTML lives in `index.html`; `src/main.ts` is the entry point and imports `style.css` plus all modules.

**Module responsibilities:**
- `animations.ts` — `IntersectionObserver` scroll reveals. `.reveal` (translateY) and `.reveal-left` (translateX) elements start hidden; observer adds `.visible`. Hero elements are made visible immediately (100ms timeout). Checks `prefers-reduced-motion` and skips animation setup if set.
- `counters.ts` — RAF-based counter animation on `.stat-box .num` elements. Reads `data-target`, `data-prefix`, `data-suffix`. Skips animation when `prefers-reduced-motion` is set.
- `charts.ts` — Two concerns: (1) `.bar-fill` widths are set to `data-width + '%'` on first `.chart-box` entering the viewport; (2) Gini SVG bars (`.gini-bar`) start at `height=0` and are restored via `setAttribute` with a 120ms stagger.
- `lines.ts` — Sets `strokeDashoffset = '0'` on SVG polylines (`#labor-line`, `#capital-line`, `#hist-line`) when their parent SVG enters the viewport. CSS transitions handle the draw animation.

**SVG charts are hand-coded** — no D3, Chart.js, or Recharts. All coordinates are pre-calculated and hardcoded in `index.html`. Do not replace them with a library.

**Animation contract:** CSS transitions/keyframes drive the actual motion. JS only toggles classes or sets properties; timing lives in CSS. The `prefers-reduced-motion` media query in `style.css` disables all transitions and keyframe animations.

**Fonts** are served from `@fontsource` npm packages (not Google CDN). `vite.config.ts` runs Fontaine to inject computed `@font-face` fallback rules at build time, eliminating layout shift. The three fonts are Bebas Neue (display/headings), Special Elite (body), and Roboto Condensed Variable (labels/UI).

**Ticker** — seamless loop via duplicated content inside `.ticker`. JS in `main.ts` wires the `.ticker-pause` button. CSS pauses animation on hover/`:focus-within`.

## Conventions

- **British English** in all user-visible copy (`labour`, `organised`, `programme`, etc.). Technical identifiers (IDs, class names, variables) remain in American English.
- **No comments** anywhere — not in HTML, CSS, or TypeScript.
- Biome enforces tabs, double quotes (JS), and recommended lint rules. Run `npm run biome:fix` after edits.
- CSS custom properties are defined in `:root` in `style.css`. Core palette: `--black #0a0a0a`, `--white #f0ece0`, `--red #cc1111`, `--red-dark #8b0000`.
- All scroll animations use `IntersectionObserver` — no scroll event listeners.
