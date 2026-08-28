# CLAUDE.md

Guidance for Claude Code (and other agents) working in this repository. `AGENTS.md` at the repo root just points here.

## About

Extraction (`site: https://extraction.timothybrits.co.za`) is a single-page data-visualisation site making a data-driven case about wealth inequality in South Africa (colonial land dispossession, apartheid labour system, post-1994 GEAR-era neoliberalism), plus a `/privacy` page. Built with **Astro v7** (`astro@7.1.5` — `package.json` pins `^7.1.5`; do not assume v6, an earlier version of this file said v6 and was wrong). Charts are custom SVG rendered at build time — no client-side charting library.

## Commands

```bash
npm run dev             # Astro dev server
npm run check           # astro check only
npm run build            # astro check && astro build (this is what CI runs)
npm run preview          # Preview production build
npm run biome:fix        # Auto-fix all formatting and lint issues (biome format --write . && biome lint --write .)
npm run test              # vitest run (single run)
npm run test:watch        # vitest watch mode
npm run test:coverage     # vitest run --coverage
npm run test src/animations.test.ts   # single test file
```

Test files live next to the code they cover (`src/*.test.ts`), not in a separate `__tests__` tree — e.g. `src/animations.test.ts` tests `src/scripts/animations.ts`, `src/charts.test.ts` tests `src/data/charts.ts`. `src/__mocks__/setup.ts` is the global Vitest setup (mocks `IntersectionObserver` and `matchMedia`; loaded via `vitest.config.ts`'s `setupFiles`). Tests only cover `src/scripts/*.ts` behaviour and `src/data/charts.ts` data transforms/invariants — there is no rendering test for the `.astro` chart components themselves; a broken chart component won't be caught by `npm run test`, only by `astro check` (types) or a manual look at the build output.

Node: `engines.node` in `package.json` requires `>=24.0.0` and `.nvmrc` pins `24`. `npm ci`/`npm run build` still work under Node 22 (just an `EBADENGINE` warning), so don't assume a warning-free `npm ci` means you're on the right Node version — check `node -v` if something version-sensitive is failing.

Lefthook (`lefthook.yml`) runs `npx biome check --write {staged_files}` on `{src,public}/**/*.{ts,js,json,css,html,astro}` before every commit and re-stages fixed files. Run `npx lefthook install` after cloning to activate it. **It does not cover root-level files** — `package.json`, `astro.config.mjs`, `biome.json`, `CLAUDE.md`, etc. are never auto-fixed by the hook; run `npx biome check <file>` on those by hand if you touch them.

CI (`.github/workflows/ci.yml`) on push/PR to `main`: `npm ci` → `npx biome check .` → `npm run build` → `npm run test`, on Node 24. There is no deploy step in CI or anywhere else in this repo — see Deployment below.

## Safety

- **Never deploy to production without explicit permission from the user.** Always ask first and wait for confirmation.

## Deployment

There's no Dockerfile, wrangler config, Netlify/Vercel config, or deploy workflow in this repo, but the site is served through **Cloudflare**:
- `src/pages/privacy.astro` states the site uses **Cloudflare Web Analytics**, and `src/layouts/Base.astro`'s CSP explicitly allowlists `https://static.cloudflareinsights.com` (script-src) and `https://cloudflareinsights.com` (connect-src) — but **no `<script>` tag anywhere in the codebase loads the Cloudflare beacon**. It's injected automatically by Cloudflare's edge (enabled via the Cloudflare dashboard for the zone, not via code), which is why the CSP has to allow it even though grepping the repo finds no reference to loading it. Don't "clean up" those CSP entries thinking they're dead — removing them will silently break analytics in production with no local symptom.
- This implies the actual host is Cloudflare Pages (or an equivalent Cloudflare-fronted static host) pulling from `main` — deploys happen outside this repo's visibility. Ask the user before assuming you can trigger or verify a deploy.

**CSP gotcha:** `Base.astro`'s `<meta http-equiv="Content-Security-Policy">` is `default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; connect-src 'self' https://cloudflareinsights.com; img-src 'self' data:; font-src 'self'; base-uri 'self'; object-src 'none'`. Because it's a `<meta>` tag it applies in dev too, so a blocked resource fails the same way locally as in prod — but it's easy to miss in a quick visual check since the page still renders, just with a missing font/script and a console warning. `font-src 'self'` means fonts must be self-hosted (see Fonts below) — you cannot add a Google Fonts `<link>` and expect it to load. Adding any new external script, XHR/fetch target, or font source requires updating this CSP string or it will be silently blocked (no network request even attempted) in both dev and prod.

## Architecture

Static site, single scrollable page with anchor-linked sections (`#hero`, `#wealth`, `#tax`, `#labor`, `#imperialism`, `#ecology`, `#action`), plus `/privacy`. `astro.config.mjs` sets `build: { format: "file" }`, so the privacy page builds to `dist/privacy.html`, **not** the Astro default `dist/privacy/index.html` — relevant if you're inspecting build output or reasoning about routing.

**Directory structure:**
- `src/pages/` — `index.astro` (composes all section components into `<main>`) and `privacy.astro`
- `src/layouts/Base.astro` — shared HTML shell: meta/OG/Twitter tags, CSP, JSON-LD, `<Font>` tags, global CSS imports, and the fixed list of `<script src="../scripts/*.ts">` tags that load every client script
- `src/components/sections/` — one component per page section: `Hero`, `Wealth`, `Tax`, `Labor`, `Imperialism`, `Ecology`, `Action`
- `src/components/charts/` — build-time SVG chart components: `BarChart`, `GiniChart`, `HistoryChart`, `LaborChart`, `DonutChart`, `TreemapChart`, `SankeyChart`
- `src/components/` — shared UI: `Nav.astro`, `Footer.astro`, `CitePopover.astro`, `BackToTop.astro`, `StatNumber.astro`
- `src/data/charts.ts` — all chart data constants, TS types, and `buildMobileData()` (derives the mobile bar-chart fallback data from the desktop datasets — see Data flow below)
- `src/scripts/` — client-side scripts, each self-initializing (`DOMContentLoaded` listener or immediate call) and loaded via `<script>` tags in `Base.astro`, in this fixed order: `nav.ts`, `animations.ts`, `counters.ts`, `lines.ts`, `chart-animations.ts`, `citations.ts`, `share.ts`, `back-to-top.ts`
- `src/styles/` — global CSS, `@import`-ed in `Base.astro`'s `<style is:global>` in this order: `base.css`, `typography.css`, `layout.css`, `components.css`, `charts.css`, `animations.css`, `accessibility.css`, `responsive.css`
- `src/__mocks__/setup.ts` — Vitest global setup (see Commands)

**Charts are hand-built SVG, computed at build time in Astro frontmatter** — not a runtime charting library. That said, **`d3-scale` and `d3-shape` are real dependencies**, used only inside the frontmatter of `DonutChart.astro`, `GiniChart.astro`, `HistoryChart.astro`, `LaborChart.astro`, and `SankeyChart.astro` — e.g. `HistoryChart.astro` does `scaleLinear().domain([1914, 2025]).range([50, 795])` and builds the trend path with `line()`/`area()` from `d3-shape`, then emits the resulting `d` attribute into static SVG markup. There's no d3 in the client bundle and no DOM-based d3 selection/rendering anywhere — d3 here is purely a build-time geometry/scale helper. `BarChart.astro` and `TreemapChart.astro` don't use d3 at all; their layout math is plain arithmetic in frontmatter.

**Desktop/mobile chart swap is CSS-only.** Every non-bar chart section renders *both* a `.desktop-chart` (the real `d3`-computed SVG, e.g. `GiniChart`) and a `.mobile-chart` (a `BarChart` built from `mobileData.*`), and `responsive.css` toggles which is visible via `display: none` at the 900px breakpoint (see `Wealth.astro` for the pattern: both `#gini-desktop-chart`/`#gini-mobile-chart` are always in the DOM). No JS decides which to show — if you add a new chart type, you must supply both a desktop SVG component and a `mobileData` entry, or the mobile viewport will simply have nothing to show.

**Client scripts are tightly coupled to specific hardcoded element IDs set by the chart/section components**, with no error if the coupling breaks (a missing element is just silently skipped — every script guards with `if (!el) return`):
- `src/scripts/lines.ts` looks for `#labor-line`, `#capital-line`, `#hist-line`, `#sankey-unequal-exchange`, `#sankey-debt-service`, `#sankey-illicit-flows`, `#sankey-aid` (drawn via stroke-dashoffset), observed inside `#labor-svg`, `#history-svg`, `#sankey-svg`.
- `src/scripts/chart-animations.ts` looks for `#gini-svg` (`.gini-bar` stagger), `#treemap-svg` (`.treemap-rect` stagger), `#tax-donut-svg` (`.donut-segment` stroke-dasharray), and any `.chart-box` for generic `.bar-fill` width animation.
- Renaming an SVG `id` in a chart `.astro` component silently kills its entrance animation — nothing errors, the chart just renders static/unanimated. Grep both the chart component and the relevant script (`lines.ts` or `chart-animations.ts`) together when touching chart markup.
- `src/scripts/share.ts` **hardcodes** the list of sections that get a share button: `"#wealth, #tax, #labor, #imperialism, #ecology"`. `#hero` and `#action` are deliberately excluded. If you add a new top-level section that should be shareable, you must add its selector to this string by hand — nothing derives it from `index.astro`.

**Animation contract:** CSS transitions/keyframes drive the actual motion; JS only toggles classes or sets inline style properties (widths, dash offsets, transition-delay), timing lives in CSS. Chart animation initial states (e.g. `scaleY(0)` bars) are set in `charts.css`. `prefers-reduced-motion` is checked directly in each script (`window.matchMedia("(prefers-reduced-motion: reduce)").matches`) — most scripts `return` early and skip animation setup entirely rather than relying on CSS alone, so a new animated script must add this check itself.

**Fonts** are loaded via Astro's Fonts API (`fontProviders.fontsource()` in `astro.config.mjs`): Fraunces Variable (`--font-display`) and Inter Variable (`--font-body`; `--font-ui` is just `var(--font-body)`, set in `base.css`). **This fetches font metadata from `api.fontsource.org` at build time** (both `astro check`/types generation and `astro build` do this independently — it happens twice per `npm run build`). If that request fails — offline, a restricted CI runner, a corporate proxy — the build does **not** fail; it logs `Could not fetch...` and `No data found for font family ...` warnings and continues, silently falling back to the CSS fallback stack (`Georgia, Times New Roman` / `Arial, Helvetica Neue`). A successful `npm run build` is therefore not proof the real variable fonts are actually being shipped — check the warnings in the build log if font rendering looks off.

## Data flow

`src/data/charts.ts` is the single source of truth for every number on the site — section components import typed consts from it (`giniDesktopData`, `laborSeriesData`, `historySeriesData`, `wealthDistributionData`, `ceoPayData`, `donutData`, `treemapData`, `sankeyFlows`, `taxRatesData`, `homeownershipData`, `debtServiceData`, `emissionsData`) and pass them straight into chart components as props. `mobileData` (built once at module load by `buildMobileData()`) derives every mobile bar-chart's `{label, width, value, color}` from the corresponding desktop dataset using per-chart normalisation constants (`HISTORY_SHARE_MAX = 30`, `DONUT_MAX_PERCENT = 23`) — **except `mobileData.sankey`, which is a fully hardcoded literal array, not derived from `sankeyFlows`.** If you change `sankeyFlows`, the desktop Sankey chart updates but the mobile bar fallback will silently go stale unless you also hand-edit the `sankey` array inside `buildMobileData()`. `charts.test.ts` asserts the derivation logic and data invariants (percentages summing to 100, gini in `[0,1]`, labor+capital = 100, etc.) for everything except this hardcoded sankey array, so a drifted sankey mobile value won't be caught by tests either.

Colours in `charts.ts` are either raw hex (`#444`, `#0a8f8f`, ...) or the literal string `"var(--accent)"` — the latter is emitted straight into `style="background: ..."` / `fill="..."` attributes, so it resolves against whichever theme (light/dark) is active at render time. When adding a data point, match this convention: use `var(--accent)` for the highlighted/worst value in a series, hardcoded greys for the rest.

Citations use a manual, per-chart pattern, not a shared data structure: each `<figcaption>` embeds a `<button class="cite-ref" data-source="..." data-url="..." aria-controls="cite-popover">` (see `Wealth.astro`), and `src/scripts/citations.ts` wires all `.cite-ref` buttons to a single shared `#cite-popover` element (`CitePopover.astro`) at the bottom of `index.astro`/`privacy.astro`. There's no central citations data file — sources are hardcoded inline in each section component, alongside a redundant human-readable `<p class="source">` block and (for chart data) a `<table class="sr-only">` fallback for accessibility/no-JS. Adding a new sourced chart means writing all three by hand: the `cite-ref` button, the `.source` paragraph, and (if it's a chart) the sr-only table.

## Conventions

- **British English** in all user-visible copy (`labour`, `organised`, `programme`, etc.). Technical identifiers (IDs, class names, variables) remain American English (e.g. `.color`, `labor.ts`, `#labor-svg`).
- **No inline comments** — never a trailing `//` comment on the same line as code. No block comments in HTML or CSS. JSDoc block comments (`/** */`) are fine where genuinely useful.
- Biome (`biome.json`) enforces tabs, double quotes (JS/TS), import organizing (`assist.actions.source.organizeImports`), and `linter.rules.recommended`. `.astro` files have `noUnusedImports`/`noUnusedVariables` turned **off** in the override block — Biome's static analysis can't see that a frontmatter import/const is used inside the template, so it would otherwise false-positive on every chart component. Run `npm run biome:fix` after edits; `biome.json`'s `linter.rules.recommended` field is flagged deprecated by Biome 2.5 (suggests `biome migrate`) but still works — not yet actioned in this repo.
- CSS custom properties are defined in `:root` (light theme, default) in `src/styles/base.css`, redefined in `@media (prefers-color-scheme: dark)` — there's no `[data-theme]` toggle, theme follows OS preference only (`color-scheme: light dark` in `:root`). Core tokens: `--accent` (teal, `#0d6e70` light / `#2ec4c4` dark), `--bg`/`--bg-elevated`/`--bg-surface`/`--bg-inset`/`--bg-section-alt`, `--fg`/`--text-body`/`--text-muted`/`--text-label`, `--border-subtle`, `--semantic-red`/`--semantic-green` (reserved for data good/bad indicators on country cards — never used decoratively), `--radius-sm`/`-md`/`-lg`, `--duration-fast`/`-medium`/`-slow`, `--ease-out-expo`.
- All scroll animations use `IntersectionObserver` — no scroll event listeners anywhere in `src/scripts/`.
- New client scripts follow the existing self-init pattern: `export function initX(): void { ... }` plus a bottom-of-file `if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", initX); } else { initX(); }`, and are registered by adding a `<script src="../scripts/x.ts">` tag to `Base.astro`. The exported `initX` (not just the side-effecting bottom block) is what the `*.test.ts` files import and call directly against a hand-built DOM fixture.

## Stale documentation

`docs/superpowers/plans/2026-04-08-civic-redesign.md` and `docs/superpowers/specs/2026-04-08-redesign-design.md` describe migrating this site's visual design from a "brutalist red/black" theme to the current civic/teal one. **The colour tokens and typography in the spec match the current codebase** (compare its `--bg`/`--accent`/etc. values to `src/styles/base.css` — they're identical), so the *design decisions* it documents did land. But the **plan's mechanics are stale and don't describe how it actually happened**: it's written against a Vite build (`vite.config.ts`, `fontaine`, `pnpm`, a root `index.html`/`privacy.html`) that doesn't exist in this repo — this is an Astro project (`astro.config.mjs`, `npm`, `src/pages/*.astro`) with no `vite.config.ts`, no `fontaine` dependency, and no root HTML files. Either the plan predates an Astro migration that isn't otherwise documented, or it was written for a hypothetical Vite rewrite that was abandoned in favour of implementing the same design directly in Astro. Don't follow this plan's file-level steps (they reference files that don't exist); treat it only as historical record of the colour/type decisions, not as an implementation guide. Left in place rather than deleted — flag to the user if you want it cleaned up or reconciled.
