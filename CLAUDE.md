# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

Extraction is a data visualization site exploring wealth extraction and inequality, built with vanilla TypeScript and Vite. All charts are custom SVG — no charting libraries.

## Commands

```bash
pnpm dev             # Vite dev server
pnpm build           # tsc + vite build
pnpm preview         # Preview production build
pnpm biome:fix       # Auto-fix all formatting and lint issues
```

There are tests — run with `pnpm vitest run`. Run a single test file with `pnpm vitest run src/charts.test.ts`. TypeScript type-checking is done via `tsc --noEmit` (runs as part of `build`). Lefthook runs `biome check --write` on staged files automatically on pre-commit (fixed files are re-staged). Run `pnpm exec lefthook install` after cloning to activate hooks. Run Biome checks manually with `pnpm exec biome check src/ index.html`.

## Safety

- **Never deploy to production without explicit permission from the user.** Always ask first and wait for confirmation.

## Architecture

Single-page vanilla TypeScript site built with Vite. No framework. `index.html` defines page structure and chart mount points; `src/main.ts` is the entry point and imports `style.css` plus all modules.

**Module responsibilities:**
- `animations.ts` — `IntersectionObserver` scroll reveals. `.reveal` (translateY) and `.reveal-left` (translateX) elements start hidden; observer adds `.visible`. Hero elements are made visible immediately (100ms timeout). Checks `prefers-reduced-motion` and skips animation setup if set.
- `counters.ts` — RAF-based counter animation on `.stat-box .num` elements. Reads `data-target`, `data-prefix`, `data-suffix`. Skips animation when `prefers-reduced-motion` is set.
- `charts.ts` — Owns chart datasets and renders both desktop SVG and mobile bar chart variants into HTML containers. Chart types: horizontal bar charts, vertical Gini bars, donut chart (stroke-dasharray circles), treemap (squarified rects), and Sankey flow diagram (cubic bezier paths). Handles animation concerns: (1) `.bar-fill` widths are set to `data-width + '%'` on first `.chart-box` entering the viewport; (2) Gini SVG bars (`.gini-bar`) and treemap rects (`.treemap-rect`) start at `scaleY(0)` and are restored with a stagger; (3) donut segments start with `strokeDasharray: 0` and are restored on intersection.
- `lines.ts` — Sets `strokeDashoffset = '0'` on SVG polylines and paths (`#labor-line`, `#capital-line`, `#hist-line`, and `#sankey-*` paths) when their parent SVG enters the viewport. CSS transitions handle the draw animation.

**SVG charts are data-driven but still custom** — no D3, Chart.js, or Recharts. Desktop SVG geometry is generated in `charts.ts` and injected into mount points in `index.html`. Do not replace this with a charting library.

**Animation contract:** CSS transitions/keyframes drive the actual motion. JS only toggles classes or sets properties; timing lives in CSS. The `prefers-reduced-motion` media query in `animations.css` disables all transitions and keyframe animations.

**Fonts** are served from `@fontsource` npm packages (not Google CDN). `vite.config.ts` runs Fontaine to inject computed `@font-face` fallback rules at build time, eliminating layout shift. The three fonts are Bebas Neue (display/headings), Special Elite (body), and Roboto Condensed Variable (labels/UI).

**Ticker** — seamless loop via duplicated content inside `.ticker`. JS in `main.ts` wires the `.ticker-pause` button. CSS pauses animation on hover/`:focus-within`.

## Conventions

- **British English** in all user-visible copy (`labour`, `organised`, `programme`, etc.). Technical identifiers (IDs, class names, variables) remain in American English.
- **No inline comments** — never use trailing `//` comments on the same line as code. No block comments in HTML or CSS either. JSDoc block comments (`/** */`) are fine where genuinely useful.
- Biome enforces tabs, double quotes (JS), and recommended lint rules. Run `pnpm biome:fix` after edits.
- CSS custom properties are defined in `:root` in `src/styles/base.css`. Core palette: `--black #0a0a0a`, `--white #f0ece0`, `--red #cc1111`, `--red-dark #8b0000`.
- All scroll animations use `IntersectionObserver` — no scroll event listeners.
