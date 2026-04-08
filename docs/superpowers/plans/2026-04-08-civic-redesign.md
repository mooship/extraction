# Civic/Advocacy Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the brutalist red/black aesthetic with a civic/advocacy visual system — teal accent, Fraunces + Inter fonts, warm off-white light theme, deep navy dark theme — with WCAG AA compliance throughout.

**Architecture:** All changes are in CSS (token redefinition + component restyling), `charts.ts` (color palette swap), `vite.config.ts` (fontaine fallbacks), and `index.html` (stamp → callout, class cleanups). No JS logic changes. Existing unit tests cover JS behaviour only and require no changes to the test assertions themselves (chart colour values are not asserted).

**Tech Stack:** Vanilla TypeScript, Vite, Biome, `@fontsource-variable/fraunces`, `@fontsource-variable/inter`. Fontaine for fallback `@font-face` injection.

---

## File Map

| File | Change |
|---|---|
| `package.json` | Remove `@fontsource/bebas-neue`, `@fontsource/special-elite`, `@fontsource-variable/roboto-condensed`; add `@fontsource-variable/fraunces`, `@fontsource-variable/inter` |
| `vite.config.ts` | Update `fallbacks` map for new fonts |
| `src/styles/base.css` | Replace `@font-face` blocks; rewrite `:root` token definitions and light-mode override; remove grain texture `body::before` |
| `src/styles/typography.css` | Rewrite type scale; update section-label pattern |
| `src/styles/layout.css` | Remove thick coloured `border-top`; adjust section padding |
| `src/styles/components.css` | Nav, hero, stat grid, stamp→callout, manifesto, country cards, footer, share-btn, back-to-top |
| `src/styles/charts.css` | Remove light-mode dark override block; update `.chart-title` font; remove `var(--ls-xwide)` reference |
| `src/styles/animations.css` | Remove `stamp-appear` keyframes and reduced-motion `.stamp` override |
| `src/styles/accessibility.css` | Update focus ring to teal; update skip-link colours |
| `src/styles/responsive.css` | Fix mobile nav (was red bg); remove `var(--ls-wide)` / `var(--ls-xwide)` references; update hardcoded `var(--white)` / `var(--black)` |
| `src/charts.ts` | Replace all red/dark colour values with teal palette |
| `index.html` | Replace `.stamp` with `.callout`; change `section-label-black` → `section-label` |
| `CLAUDE.md` | Update font documentation |

---

## Task 1: Install new fonts, remove old ones

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Uninstall old font packages**

```bash
pnpm remove @fontsource/bebas-neue @fontsource/special-elite @fontsource-variable/roboto-condensed
```

- [ ] **Step 2: Install new font packages**

```bash
pnpm add @fontsource-variable/fraunces @fontsource-variable/inter
```

- [ ] **Step 3: Verify packages are installed**

```bash
ls node_modules/@fontsource-variable/fraunces/files/ | head -5
ls node_modules/@fontsource-variable/inter/files/ | head -5
```

Expected: both directories exist and contain `.woff2` files.

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: swap font packages — Fraunces + Inter replace Bebas/Special Elite/Roboto Condensed"
```

---

## Task 2: Update vite.config.ts — Fontaine fallbacks

**Files:**
- Modify: `vite.config.ts`

Fontaine reads the `@font-face` src URLs from your CSS, downloads/reads the font files to extract metrics (ascent, descent, line-gap), then generates matching `@font-face` rules for the fallback fonts. The `resolvePath` tells it where to find local files. The existing `resolvePath` logic is correct — it handles both `@fontsource-variable/*` packages (from `node_modules`) and public assets. Only the `fallbacks` map needs to change.

- [ ] **Step 1: Update the fallbacks map**

In `vite.config.ts`, replace:

```ts
fallbacks: {
  "Bebas Neue": ["Impact", "Arial Narrow", "Arial"],
  "Special Elite": ["Courier New", "Courier", "Georgia"],
  "Roboto Condensed Variable": ["Arial Narrow", "Arial", "Helvetica"],
},
```

With:

```ts
fallbacks: {
  "Fraunces Variable": ["Georgia", "Times New Roman"],
  "Inter Variable": ["Arial", "Helvetica Neue"],
},
```

The full updated file:

```ts
import { FontaineTransform } from "fontaine";
import { defineConfig } from "vite";

export default defineConfig({
	cacheDir: "node_modules/.vite",
	plugins: [
		FontaineTransform.vite({
			fallbacks: {
				"Fraunces Variable": ["Georgia", "Times New Roman"],
				"Inter Variable": ["Arial", "Helvetica Neue"],
			},
			resolvePath: (id) => {
				if (id.startsWith("@fontsource")) {
					return new URL(`./node_modules/${id}`, import.meta.url);
				}
				return new URL(`./public${id}`, import.meta.url);
			},
		}),
	],
	build: {
		rollupOptions: {
			input: {
				main: new URL("index.html", import.meta.url).pathname,
				privacy: new URL("privacy.html", import.meta.url).pathname,
			},
		},
	},
});
```

- [ ] **Step 2: Commit**

```bash
git add vite.config.ts
git commit -m "chore: update fontaine fallbacks for Fraunces + Inter"
```

---

## Task 3: Rewrite base.css — font loading and color tokens

**Files:**
- Modify: `src/styles/base.css`

This is the largest single change. Replace the entire file.

- [ ] **Step 1: Replace the full content of `src/styles/base.css`**

```css
@font-face {
	font-family: "Fraunces Variable";
	font-style: normal;
	font-display: swap;
	font-weight: 100 900;
	src: url("@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2")
		format("woff2-variations");
	unicode-range:
		U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
		U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122,
		U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
	font-family: "Inter Variable";
	font-style: normal;
	font-display: swap;
	font-weight: 100 900;
	src: url("@fontsource-variable/inter/files/inter-latin-wght-normal.woff2")
		format("woff2-variations");
	unicode-range:
		U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
		U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122,
		U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

:root {
	color-scheme: light dark;

	--bg:             #f8f7f4;
	--bg-elevated:    #f2efe9;
	--bg-surface:     #ebe7df;
	--bg-inset:       #e0dbd1;
	--bg-section-alt: #f4f1ec;
	--border-subtle:  #d6d1c9;

	--fg:          #1c1917;
	--text-body:   #292524;
	--text-muted:  #57534e;
	--text-label:  #6b7280;

	--accent:      #0d6e70;
	--accent-fg:   #ffffff;

	--semantic-green: #2e7d32;
	--semantic-red:   #c62828;

	--font-display: "Fraunces Variable", Georgia, serif;
	--font-body:    "Inter Variable", system-ui, sans-serif;
	--font-ui:      "Inter Variable", system-ui, sans-serif;

	--duration-fast:   0.3s;
	--duration-medium: 0.8s;
	--duration-slow:   1.1s;
	--ease-out-expo:   cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-color-scheme: dark) {
	:root {
		--bg:             #0e1117;
		--bg-elevated:    #141b24;
		--bg-surface:     #1a2333;
		--bg-inset:       #1e2840;
		--bg-section-alt: #111820;
		--border-subtle:  #253045;

		--fg:          #e8edf5;
		--text-body:   #d1d9e6;
		--text-muted:  #8b9ab3;
		--text-label:  #6b7d97;

		--accent:    #2ec4c4;
		--accent-fg: #0e1117;

		--semantic-green: #4caf4c;
		--semantic-red:   #ef5350;
	}
}

*,
*::before,
*::after {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

html {
	font-size: 100%;
	scroll-behavior: smooth;
}

body {
	background: var(--bg);
	color: var(--fg);
	font-family: var(--font-body);
	overflow-x: hidden;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
```

Key changes from the old file:
- Two `@font-face` blocks (Fraunces Variable, Inter Variable) replace the previous three
- `:root` is now light-theme by default; dark theme is in `@media (prefers-color-scheme: dark)` (matches `color-scheme: light dark` order)
- `--red`, `--black`, `--white`, `--gray`, all `--ls-*` variables removed
- `--semantic-red` and `--semantic-green` added
- `body::before` grain texture block removed entirely
- The light-mode `@media` block that set `body::before` opacity and `h1 span` / `nav` overrides is removed

- [ ] **Step 2: Run existing tests to verify nothing is broken**

```bash
pnpm vitest run
```

Expected: all tests pass (CSS changes don't affect JS unit tests).

- [ ] **Step 3: Run Biome**

```bash
pnpm biome:fix
```

- [ ] **Step 4: Commit**

```bash
git add src/styles/base.css
git commit -m "style: rewrite base.css — new color tokens and font loading"
```

---

## Task 4: Rewrite typography.css

**Files:**
- Modify: `src/styles/typography.css`

- [ ] **Step 1: Replace the full content of `src/styles/typography.css`**

```css
p {
	font-size: 1rem;
	line-height: 1.75;
	color: var(--text-body);
}

h1 {
	font-family: var(--font-display);
	font-size: clamp(2.8rem, 5vw, 4.5rem);
	font-weight: 700;
	line-height: 1.05;
	color: var(--fg);
}

h2 {
	font-family: var(--font-display);
	font-size: clamp(1.75rem, 3vw, 2.5rem);
	font-weight: 600;
	line-height: 1.1;
	color: var(--fg);
	margin: 16px 0 24px;
}

h3 {
	font-family: var(--font-display);
	font-size: 1.125rem;
	font-weight: 600;
	line-height: 1.3;
	color: var(--fg);
}

.section-label,
.section-label-black {
	display: flex;
	align-items: center;
	gap: 10px;
	font-family: var(--font-ui);
	font-size: 0.8125rem;
	font-weight: 500;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	color: var(--accent);
}

.section-label::before,
.section-label-black::before {
	content: "■";
	font-size: 0.5rem;
	color: var(--accent);
	flex-shrink: 0;
}

.pull-quote {
	border-left: 3px solid var(--accent);
	padding: 24px 32px;
	background: var(--bg-elevated);
	margin: 32px 0;
	border-radius: 0 4px 4px 0;
}

.pull-quote blockquote {
	font-family: var(--font-display);
	font-size: 1.25rem;
	color: var(--fg);
	line-height: 1.5;
}

.pull-quote cite {
	display: block;
	font-family: var(--font-ui);
	font-size: 0.8125rem;
	letter-spacing: 0.06em;
	color: var(--text-muted);
	font-style: normal;
	margin-top: 10px;
	text-transform: uppercase;
}

.source {
	font-size: 0.75rem;
	color: var(--text-muted);
	line-height: 1.6;
}

.source a {
	color: var(--text-muted);
	text-decoration: none;
	border-bottom: 1px solid var(--border-subtle);
	transition:
		color 0.2s,
		border-color 0.2s;
}

.source a:hover,
.source a:focus-visible {
	color: var(--fg);
	border-color: var(--accent);
}

.section-intro,
.manifesto-intro {
	line-height: 1.85;
}
```

Key changes:
- All Bebas Neue (`var(--font-display)` was Bebas) replaced by Fraunces — headings now mixed case
- `h1 span` large red block removed (the hero heading no longer has a coloured sub-span)
- `h3` colour changed from `var(--red)` to `var(--fg)`
- `section-label` uses teal `■` prefix instead of a line; `.section-label-black` is kept as an alias with identical styling (no HTML changes needed)
- Pull quote: border-left changes to teal, cite colour to `--text-muted`
- All `var(--ls-*)` references removed

- [ ] **Step 2: Commit**

```bash
git add src/styles/typography.css
git commit -m "style: rewrite typography — Fraunces/Inter scale, teal section labels"
```

---

## Task 5: Update layout.css

**Files:**
- Modify: `src/styles/layout.css`

- [ ] **Step 1: Remove the red border-top from `#wealth`**

Find and replace:

```css
#wealth {
	border-top: 4px solid var(--red);
}
```

With:

```css
#wealth {
	border-top: 1px solid var(--border-subtle);
}
```

- [ ] **Step 2: Add a consistent section top-border rule**

After the `section` rule (which currently sets `padding: 80px 60px`), add:

```css
section {
	border-top: 1px solid var(--border-subtle);
}
```

But the hero section should not have a top border since it's the first element. Add an exception:

```css
#hero {
	border-top: none;
}
```

- [ ] **Step 3: Remove `#hero::after`**

The current `#hero::after` draws a 6px red bottom border — a brutalist divider. Remove it from `components.css` (it lives there, see Task 6 below).

- [ ] **Step 4: Remove `.section-divider`**

Find and remove this rule entirely from `layout.css`:

```css
.section-divider {
	height: 1px;
	background: linear-gradient(
		90deg,
		transparent,
		var(--red) 20%,
		var(--red) 80%,
		transparent
	);
	margin-bottom: 60px;
	opacity: 0.6;
}
```

If `.section-divider` elements appear in `index.html`, remove those elements too (search `index.html` for `class="section-divider"`).

- [ ] **Step 5: Commit**

```bash
git add src/styles/layout.css
git commit -m "style: update layout — replace thick red borders with subtle dividers"
```

---

## Task 6: Update navigation — components.css + responsive.css

**Files:**
- Modify: `src/styles/components.css` (nav block, lines 1–56)
- Modify: `src/styles/responsive.css` (mobile nav block)

- [ ] **Step 1: Replace the nav block in `components.css`**

Replace lines 1–56 (the entire nav section):

```css
nav {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 32px;
	height: 60px;
	background: var(--bg-elevated);
	border-bottom: 1px solid var(--border-subtle);
}

.nav-logo {
	font-family: var(--font-display);
	font-size: 1.25rem;
	font-weight: 600;
	color: var(--fg);
	text-decoration: none;
	letter-spacing: normal;
}

.nav-links {
	display: flex;
	gap: 24px;
	list-style: none;
	margin: 0;
	padding: 0;
}

.nav-links a {
	font-family: var(--font-ui);
	font-size: 0.8125rem;
	font-weight: 500;
	color: var(--text-muted);
	text-decoration: none;
	transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a:focus-visible {
	color: var(--fg);
}

.nav-links a.nav-active {
	color: var(--fg);
	border-bottom: 2px solid var(--accent);
	padding-bottom: 2px;
}

.nav-toggle {
	display: none;
}
```

- [ ] **Step 2: Update mobile nav in `responsive.css`**

Find the mobile nav block at `@media (max-width: 700px)`. Replace the `.nav-toggle` and `.nav-links` rules:

```css
.nav-toggle {
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 44px;
	min-height: 44px;
	background: none;
	border: none;
	color: var(--fg);
	cursor: pointer;
	padding: 0;
}

.nav-links {
	display: none;
	position: fixed;
	top: 56px;
	left: 0;
	right: 0;
	background: var(--bg-elevated);
	border-bottom: 1px solid var(--border-subtle);
	flex-direction: column;
	gap: 0;
	padding: 8px 0;
}

nav.nav-open .nav-links {
	display: flex;
}

.nav-links a {
	padding: 12px 16px;
	font-size: 0.8125rem;
}
```

Also remove `letter-spacing: var(--ls-wide);` from the mobile `.nav-links a` rule in responsive.css.

And in `responsive.css` at `@media (max-width: 420px)`, remove the `.nav-logo` `letter-spacing: var(--ls-wide)` declaration:

Change:
```css
.nav-logo {
	font-size: 1.1rem;
	letter-spacing: var(--ls-wide);
}
```

To:
```css
.nav-logo {
	font-size: 1.1rem;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/components.css src/styles/responsive.css
git commit -m "style: update navigation — remove red bar, add subtle bg and teal active indicator"
```

---

## Task 7: Update hero section — components.css + index.html

**Files:**
- Modify: `src/styles/components.css` (hero, stamp, stat-grid, stat-box blocks)
- Modify: `index.html` (stamp element)

- [ ] **Step 1: Replace the hero + stat grid section in `components.css`**

Replace the `#hero`, `#hero::after`, `.hero-grid`, `.hero-left`, `.stamp`, `.stat-grid`, `.stat-box` blocks:

```css
#hero {
	min-height: 100vh;
	display: flex;
	align-items: center;
	padding: 80px;
	position: relative;
	border-top: none;
}

.hero-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 60px;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
}

.hero-left {
	display: flex;
	flex-direction: column;
	gap: 28px;
}

.hero-left p {
	font-size: 1rem;
	line-height: 1.75;
	max-width: 460px;
}

.callout {
	border-left: 3px solid var(--accent);
	padding: 14px 20px;
	font-family: var(--font-ui);
	font-size: 0.9375rem;
	font-weight: 500;
	color: var(--accent);
	background: var(--bg-elevated);
	border-radius: 0 4px 4px 0;
	align-self: flex-start;
}

.stat-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 12px;
}

.stat-box {
	background: var(--bg-surface);
	border: 1px solid var(--border-subtle);
	border-radius: 6px;
	padding: 24px 20px;
	animation: flash-in 0.5s both;
}

.stat-box:nth-child(1) { animation-delay: 0s; }
.stat-box:nth-child(2) { animation-delay: 0.2s; }
.stat-box:nth-child(3) { animation-delay: 0.4s; }
.stat-box:nth-child(4) { animation-delay: 0.6s; }
.stat-box:nth-child(5) { animation-delay: 0.8s; }

.stat-box-full {
	grid-column: 1 / -1;
}

.stat-box .num {
	font-family: var(--font-display);
	font-size: 3rem;
	font-weight: 700;
	color: var(--accent);
	line-height: 1;
	display: block;
}

.stat-box .label {
	font-family: var(--font-ui);
	font-size: 0.75rem;
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: var(--text-label);
	margin-top: 8px;
	display: block;
}
```

Key changes:
- `#hero::after` (red bottom border) removed
- `.stamp` replaced with `.callout`
- `.stat-grid`: `2px` gap tile pattern replaced with `12px` gap, individual card borders
- `.stat-box`: `background: var(--black)` replaced with `var(--bg-surface)`, added `border` and `border-radius`
- `.stat-box .num`: Fraunces 700, `var(--accent)` colour
- `.stat-box .label`: Inter 500, `0.06em` tracking replaces `var(--ls-normal)`

- [ ] **Step 2: Update `.stamp` to `.callout` in `index.html`**

Search for:

```html
<div class="stamp" aria-hidden="true">THE DATA IS UNAMBIGUOUS</div>
```

Replace with:

```html
<div class="callout">The data is unambiguous</div>
```

- [ ] **Step 3: Check `index.html` for `section-label-black` and replace**

Run:

```bash
grep -n "section-label-black" index.html
```

For every match, change `class="section-label-black"` to `class="section-label"`.

- [ ] **Step 4: Commit**

```bash
git add src/styles/components.css index.html
git commit -m "style: update hero — callout replaces stamp, clean stat cards replace tile grid"
```

---

## Task 8: Update ticker — components.css

**Files:**
- Modify: `src/styles/components.css` (ticker block)

The ticker currently uses `background: var(--red)`. Update it to use the accent colour.

- [ ] **Step 1: Replace the ticker section in components.css**

Find and replace the `.ticker-wrap` block:

```css
.ticker-wrap {
	background: var(--accent);
	overflow: hidden;
	padding: 10px 0;
	white-space: nowrap;
	position: relative;
}

.ticker span {
	font-family: var(--font-ui);
	font-size: 0.875rem;
	font-weight: 600;
	letter-spacing: 0.06em;
	color: var(--accent-fg);
	padding-right: 40px;
}

.ticker-pause {
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	padding: 0 18px;
	min-width: 44px;
	min-height: 44px;
	background: color-mix(in srgb, var(--accent) 80%, black);
	border: none;
	border-left: 1px solid color-mix(in srgb, var(--accent) 60%, black);
	color: var(--accent-fg);
	cursor: pointer;
	transition: background 0.2s;
	display: inline-flex;
	align-items: center;
	justify-content: center;
}

.ticker-pause:hover,
.ticker-pause:focus-visible {
	background: color-mix(in srgb, var(--accent) 60%, black);
}

.ticker-wrap:hover .ticker,
.ticker-wrap:focus-within .ticker {
	animation-play-state: paused;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/components.css
git commit -m "style: update ticker — teal background replaces red"
```

---

## Task 9: Update manifesto and demands — components.css + index.html

**Files:**
- Modify: `src/styles/components.css` (manifesto block)
- Modify: `index.html` (manifesto section)

- [ ] **Step 1: Replace the `#manifesto` block in components.css**

```css
#manifesto {
	background: #1c1917;
	padding: 80px 60px;
	color: #e8edf5;
}

@media (prefers-color-scheme: dark) {
	#manifesto {
		background: var(--bg-surface);
		border-top: 2px solid var(--border-subtle);
	}
}

.manifesto-title {
	color: #e8edf5;
	margin: 16px 0 24px;
}

@media (prefers-color-scheme: dark) {
	.manifesto-title {
		color: var(--fg);
	}
}

.manifesto-intro {
	color: #d1d9e6;
	max-width: 680px;
	margin-bottom: 50px;
}

@media (prefers-color-scheme: dark) {
	.manifesto-intro {
		color: var(--text-body);
	}
}

.demands {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 12px;
}

.demand {
	background: #262220;
	border: 1px solid #333;
	border-radius: 6px;
	padding: 28px 24px;
	cursor: default;
	transition: background 0.2s;
	position: relative;
	overflow: hidden;
}

@media (prefers-color-scheme: dark) {
	.demand {
		background: var(--bg-inset);
		border-color: var(--border-subtle);
	}
}

.demand-full {
	grid-column: 1 / -1;
}

.demand:hover,
.demand:focus-visible {
	background: #2e2a28;
}

@media (prefers-color-scheme: dark) {
	.demand:hover,
	.demand:focus-visible {
		background: var(--bg-elevated);
	}
}

.demand-num {
	font-family: var(--font-display);
	font-size: 3.5rem;
	font-weight: 700;
	color: rgba(255, 255, 255, 0.06);
	line-height: 1;
	position: absolute;
	top: 12px;
	right: 16px;
}

.demand-text {
	font-family: var(--font-display);
	font-size: 1.375rem;
	font-weight: 600;
	color: #e8edf5;
	line-height: 1.15;
	margin-bottom: 10px;
	position: relative;
}

@media (prefers-color-scheme: dark) {
	.demand-text {
		color: var(--fg);
	}
}

.demand-sub {
	font-family: var(--font-ui);
	font-size: 0.75rem;
	font-weight: 400;
	color: #8b9ab3;
	line-height: 1.5;
	position: relative;
}

@media (prefers-color-scheme: dark) {
	.demand-sub {
		color: var(--text-muted);
	}
}
```

- [ ] **Step 2: Remove the transition-delay stagger rules from the demand block**

Remove these (they were a brutalist animation signal):

```css
.demand:nth-child(2) { transition-delay: 0.07s; }
.demand:nth-child(3) { transition-delay: 0.14s; }
/* ... etc through :nth-child(8) */
```

- [ ] **Step 3: Update manifesto section-label in index.html**

The manifesto section currently has a `.section-label-black` that reads "Manifesto". This was changed to `.section-label` in Task 7 Step 3. Verify it's been updated.

- [ ] **Step 4: Commit**

```bash
git add src/styles/components.css index.html
git commit -m "style: update manifesto — dark contrast panel replaces red block, clean demand cards"
```

---

## Task 10: Update country cards and remaining component blocks

**Files:**
- Modify: `src/styles/components.css` (country cards, footer, action section, share-btn, back-to-top, cite blocks)

- [ ] **Step 1: Replace the country cards block**

```css
.country-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 12px;
	margin-top: 40px;
}

.country-card {
	background: var(--bg-surface);
	border: 1px solid var(--border-subtle);
	border-radius: 6px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	transition: border-color 0.2s;
}

.country-card:hover,
.country-card:focus-visible {
	border-color: var(--accent);
}

.country-name {
	font-family: var(--font-display);
	font-size: 1.25rem;
	font-weight: 600;
	color: var(--fg);
}

.system-tag {
	display: inline-block;
	font-family: var(--font-ui);
	font-size: 0.75rem;
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	padding: 3px 8px;
	border: 1px solid;
	border-radius: 4px;
	align-self: flex-start;
}

.system-tag.socialist {
	color: var(--accent);
	border-color: var(--accent);
}

.system-tag.capitalist {
	color: var(--text-muted);
	border-color: var(--border-subtle);
}

.country-card dl {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.metric-row {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	border-bottom: 1px solid var(--border-subtle);
	padding-bottom: 6px;
}

.metric-row dd {
	margin: 0;
}

.metric-label {
	font-family: var(--font-ui);
	font-size: 0.75rem;
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: var(--text-label);
}

.metric-val {
	font-family: var(--font-display);
	font-size: 1rem;
	font-weight: 600;
	color: var(--fg);
}

.metric-val.good {
	color: var(--semantic-green);
}

.metric-val.good::before {
	content: "▲ ";
	font-size: 0.6em;
}

.metric-val.bad {
	color: var(--semantic-red);
}

.metric-val.bad::before {
	content: "▼ ";
	font-size: 0.6em;
}
```

- [ ] **Step 2: Update the footer block**

Replace the footer section:

```css
footer {
	background: var(--bg-elevated);
	border-top: 1px solid var(--border-subtle);
	padding: 28px 60px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 40px;
}

.footer-logo {
	font-family: var(--font-display);
	font-size: 1.4rem;
	font-weight: 600;
	color: var(--accent);
	flex-shrink: 0;
}

.footer-right {
	display: flex;
	flex-direction: column;
	gap: 6px;
	text-align: right;
}

.footer-right p {
	font-family: var(--font-ui);
	font-size: 0.75rem;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: var(--text-muted);
	line-height: 1.5;
}

.footer-right a {
	color: var(--text-muted);
	text-decoration: underline;
	text-underline-offset: 3px;
}

.footer-right a:hover,
.footer-right a:focus-visible {
	color: var(--fg);
}
```

- [ ] **Step 3: Update `#action` section**

Replace the `#action` overrides:

```css
#action {
	background: var(--bg-surface);
	border-top: 1px solid var(--border-subtle);
}
```

Remove the old `#action .section-label-black`, `#action .manifesto-title`, `#action .manifesto-intro` overrides — they were needed only because section-label-black used `var(--black)` and is now unified.

- [ ] **Step 4: Update `.action-grid` and `.action-list`**

```css
.action-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 12px;
	margin-bottom: 50px;
}

.action-column {
	background: var(--bg-elevated);
	border: 1px solid var(--border-subtle);
	border-radius: 6px;
	padding: 28px 24px;
}

.action-column h3 {
	margin-bottom: 1rem;
}

.action-list {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.action-list li {
	font-family: var(--font-ui);
	font-size: 0.8125rem;
	color: var(--text-body);
	line-height: 1.5;
	padding-left: 12px;
	border-left: 2px solid var(--border-subtle);
}

.action-list li em {
	color: var(--fg);
	font-style: normal;
	font-weight: 600;
}

.action-list a {
	color: var(--text-body);
	text-decoration: none;
	border-bottom: 1px solid var(--border-subtle);
	transition:
		color 0.2s,
		border-color 0.2s;
}

.action-list a:hover,
.action-list a:focus-visible {
	color: var(--fg);
	border-color: var(--accent);
}

.action-stamp {
	display: inline-block;
	border: 2px solid var(--accent);
	border-radius: 4px;
	padding: 16px 24px;
	font-family: var(--font-display);
	font-size: 1rem;
	font-weight: 600;
	color: var(--accent);
	line-height: 1.5;
}
```

Note: `.action-stamp` loses the `rotate(-2deg)` and `box-shadow` — those are brutalist decoration.

- [ ] **Step 5: Update `.share-btn` and `.back-to-top`**

```css
.share-btn {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	margin-top: 2rem;
	padding: 8px 16px;
	min-height: 44px;
	background: transparent;
	border: 1px solid var(--border-subtle);
	border-radius: 4px;
	color: var(--text-muted);
	font-family: var(--font-ui);
	font-size: 0.8125rem;
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	cursor: pointer;
	transition:
		color 0.2s,
		border-color 0.2s;
}

.share-btn:hover,
.share-btn:focus-visible {
	color: var(--fg);
	border-color: var(--accent);
}

.back-to-top {
	position: fixed;
	bottom: 24px;
	right: 24px;
	z-index: 900;
	width: 44px;
	height: 44px;
	border: 1px solid var(--border-subtle);
	border-radius: 4px;
	background: var(--bg-elevated);
	color: var(--fg);
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity 0.2s;
}

.back-to-top[hidden] {
	display: none;
}

.back-to-top.visible {
	display: flex;
	opacity: 1;
}

.back-to-top:hover,
.back-to-top:focus-visible {
	border-color: var(--accent);
	color: var(--accent);
}
```

- [ ] **Step 6: Update citation components**

```css
.cite-ref {
	display: inline;
	background: none;
	border: none;
	padding: 0 1px;
	margin: 0;
	font-family: var(--font-ui);
	font-size: 0.8em;
	font-weight: 600;
	vertical-align: super;
	color: var(--accent);
	cursor: pointer;
	line-height: 1;
	transition: color var(--duration-fast);
}

.cite-ref:hover,
.cite-ref:focus-visible {
	color: var(--fg);
}

.cite-ref:focus-visible {
	outline: 2px solid var(--accent);
	outline-offset: 2px;
}

#cite-popover {
	position: fixed;
	z-index: 900;
	max-width: 300px;
	background: var(--bg-elevated);
	border: 1px solid var(--border-subtle);
	border-left: 2px solid var(--accent);
	border-radius: 0 4px 4px 0;
	padding: 10px 14px;
	display: flex;
	flex-direction: column;
	gap: 6px;
	opacity: 0;
	pointer-events: none;
	transition: opacity var(--duration-fast);
}

#cite-popover.is-visible {
	opacity: 1;
	pointer-events: auto;
}

.cite-source {
	font-family: var(--font-ui);
	font-size: 0.8125rem;
	color: var(--text-body);
	line-height: 1.4;
}

.cite-link {
	font-family: var(--font-ui);
	font-size: 0.75rem;
	color: var(--accent);
	text-decoration: none;
}

.cite-link:hover,
.cite-link:focus-visible {
	color: var(--fg);
}
```

- [ ] **Step 7: Update `.global-south-callout` and `.privacy-policy`**

Replace `.global-south-callout`:
```css
.global-south-callout {
	border-left: 3px solid var(--accent);
	border-radius: 0 4px 4px 0;
	background: var(--bg-surface);
	padding: 1.5rem 2rem;
	margin: 3rem 0 0;
}

.global-south-callout h3 {
	margin-bottom: 1rem;
}

.global-south-callout p {
	margin-bottom: 1rem;
}
```

In `.privacy-policy`, replace all `var(--red)` references with `var(--accent)`.

- [ ] **Step 8: Commit**

```bash
git add src/styles/components.css
git commit -m "style: update country cards, footer, action section, and utility components"
```

---

## Task 11: Update charts.css

**Files:**
- Modify: `src/styles/charts.css`

- [ ] **Step 1: Remove the light-mode chart dark override**

Remove the entire block at the bottom of charts.css:

```css
@media (prefers-color-scheme: light) {
	.chart-box {
		--bg-elevated: #0f0f0f;
		--border-subtle: #222;
		--text-label: #d8d2c4;
		--text-muted: #d0d0d0;
		--bg-inset: #1a1a1a;
	}
}
```

- [ ] **Step 2: Update `.chart-title`**

Replace:
```css
.chart-title {
	font-family: var(--font-ui);
	font-size: 0.75rem;
	text-transform: uppercase;
	letter-spacing: var(--ls-xwide);
	color: var(--text-label);
	margin-bottom: 20px;
}
```

With:
```css
.chart-title {
	font-family: var(--font-ui);
	font-size: 0.8125rem;
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: var(--text-label);
	margin-bottom: 20px;
}
```

- [ ] **Step 3: Update `.bar-label`**

Replace `letter-spacing: var(--ls-normal)` with `letter-spacing: 0.03em`.

- [ ] **Step 4: Update `.bar-fill::after` text colour**

Replace `color: var(--white)` with `color: #ffffff` (a static white that always reads on dark bar fills — bar fills are always the teal/dark palette).

- [ ] **Step 5: Add `border-radius` to `.chart-box` and `.bar-track`**

```css
.chart-box {
	background: var(--bg-elevated);
	border: 1px solid var(--border-subtle);
	border-radius: 6px;
	padding: 30px;
}

.bar-track {
	background: var(--bg-inset);
	height: 28px;
	flex: 1;
	overflow: hidden;
	border-radius: 2px;
	position: relative;
}
```

- [ ] **Step 6: Commit**

```bash
git add src/styles/charts.css
git commit -m "style: update charts.css — remove dark override, tighten spacing, add radius"
```

---

## Task 12: Update chart colours in charts.ts

**Files:**
- Modify: `src/charts.ts`

The chart data arrays and SVG render functions contain hardcoded red/dark hex colours. Replace them with a teal palette. The teal scale to use:

| Old | New | Role |
|---|---|---|
| `var(--red)` / `#cc1111` | `var(--accent)` | Primary highlight (highest/worst data) |
| `#aa2222` | `#0a8f8f` | Secondary |
| `#883333` | `#0d7676` | Tertiary |
| `#664444` | `#0a5e5e` | Quaternary |
| `#7a2a2a` | `#0a7575` | (mobile labor) |
| `#888` | `#888` | Neutral — keep |
| `#666` | `#666` | Neutral — keep |
| `#444` | `#444` | Neutral dark — keep |
| `#2a2a2a` | `#2a2a2a` | Neutral darker — keep |
| `#222` | `#222` | Neutral darkest — keep |
| `#333` | `#333` | Neutral — keep |
| `#3a3a3a` | `#3a3a3a` | Neutral — keep |
| `#4caf4c` | `#4caf4c` | Semantic green — keep (Sankey Aid, Peak Equality marker) |
| `var(--white)` | `#f0f0f0` | Text on dark SVG backgrounds — use static value |

- [ ] **Step 1: Update `giniDesktopData`**

```ts
const giniDesktopData: GiniItem[] = [
	{ label: "FR", value: 0.7, color: "#444" },
	{ label: "UK", value: 0.706, color: "#444" },
	{ label: "DE", value: 0.788, color: "#888" },
	{ label: "USA", value: 0.85, color: "var(--accent)", highlight: true },
	{ label: "SE", value: 0.881, color: "#0a8f8f" },
	{ label: "ZA", value: 0.886, color: "#0a7676", highlight: true },
	{ label: "BR", value: 0.892, color: "#0d6e6e" },
];
```

Also update the `labelColor` line in `renderGiniDesktopChart`:

```ts
const labelColor = item.highlight ? "var(--accent)" : "#888";
```

- [ ] **Step 2: Update `wealthDistributionData`**

```ts
const wealthDistributionData: BarChartItem[] = [
	{ label: "Top 1%", width: 31, value: "31%", color: "var(--accent)" },
	{ label: "Next 9%", width: 37, value: "37%", color: "#444" },
	{ label: "Next 40%", width: 30, value: "30%", color: "#2a2a2a" },
	{ label: "Bottom 50%", width: 2, value: "2%", color: "#222" },
];
```

- [ ] **Step 3: Update `ceoPayData`**

```ts
const ceoPayData: BarChartItem[] = [
	{ label: "1965", width: 5.5, value: "21:1", color: "#333" },
	{ label: "1989", width: 16.1, value: "61:1", color: "#3a3a3a" },
	{ label: "2000", width: 100, value: "380:1", color: "#0a8f8f" },
	{ label: "2023", width: 76.3, value: "290:1", color: "var(--accent)" },
];
```

- [ ] **Step 4: Update `donutData`**

```ts
const donutData: DonutSegment[] = [
	{ label: "UK Dependencies", percent: 23, color: "var(--accent)" },
	{ label: "Netherlands", percent: 22, color: "#0a8f8f" },
	{ label: "Bermuda / Cayman", percent: 18, color: "#0d7676" },
	{ label: "Luxembourg", percent: 15, color: "#0a5e5e" },
	{ label: "Ireland", percent: 12, color: "#444" },
	{ label: "Other", percent: 10, color: "#2a2a2a" },
];
```

- [ ] **Step 5: Update `treemapData`**

```ts
const treemapData: TreemapItem[] = [
	{
		label: "Real Estate",
		value: 380,
		displayValue: "$380T",
		color: "var(--accent)",
	},
	{ label: "Equities", value: 109, displayValue: "$109T", color: "#444" },
	{
		label: "Govt Debt",
		value: 66,
		displayValue: "$66T",
		color: "#2a2a2a",
	},
	{ label: "Gold", value: 14, displayValue: "$14T", color: "#222" },
];
```

- [ ] **Step 6: Update `sankeyFlows`**

```ts
const sankeyFlows: SankeyFlow[] = [
	{
		label: "Unequal Exchange",
		displayValue: "$10.8T",
		color: "var(--accent)",
		strokeWidth: 44,
		path: "M 80,70 C 250,70 350,55 520,55",
		direction: "left",
	},
	{
		label: "Debt Service",
		displayValue: "$443B",
		color: "#0a8f8f",
		strokeWidth: 12,
		path: "M 80,130 C 250,130 350,125 520,120",
		direction: "left",
	},
	{
		label: "Illicit Flows",
		displayValue: "$89B",
		color: "#0d7676",
		strokeWidth: 6,
		path: "M 80,165 C 250,165 350,160 520,155",
		direction: "left",
	},
	{
		label: "Aid",
		displayValue: "$200B",
		color: "#4caf4c",
		strokeWidth: 8,
		path: "M 520,220 C 350,225 250,230 80,235",
		direction: "right",
	},
];
```

- [ ] **Step 7: Update `taxRatesData`**

```ts
const taxRatesData: BarChartItem[] = [
	{
		label: "Richest 400",
		width: 62,
		value: "23%",
		color: "var(--accent)",
	},
	{
		label: "Median Household",
		width: 68,
		value: "25%",
		color: "#444",
	},
	{
		label: "Top Statutory",
		width: 100,
		value: "37%",
		color: "#2a2a2a",
	},
];
```

- [ ] **Step 8: Update `homeownershipData`**

```ts
const homeownershipData: BarChartItem[] = [
	{ label: "25–34 (c.2000)", width: 59, value: "~59%", color: "#888" },
	{ label: "25–34 (2025)", width: 28, value: "28%", color: "var(--accent)" },
	{ label: "35–44 (1997)", width: 68, value: "68%", color: "#888" },
	{ label: "35–44 (2025)", width: 51, value: "51%", color: "#0a8f8f" },
	{ label: "45–54 (1997)", width: 75, value: "75%", color: "#888" },
	{ label: "45–54 (2025)", width: 65, value: "65%", color: "#444" },
	{ label: "55–64 (1997)", width: 78, value: "78%", color: "#888" },
	{ label: "55–64 (2025)", width: 74, value: "74%", color: "#333" },
];
```

- [ ] **Step 9: Update `debtServiceData`**

```ts
const debtServiceData: BarChartItem[] = [
	{ label: "Sri Lanka", width: 100, value: "73%", color: "var(--accent)" },
	{ label: "Ghana", width: 64, value: "47%", color: "#0a8f8f" },
	{ label: "Pakistan", width: 55, value: "40%", color: "#0d7676" },
	{ label: "Kenya", width: 41, value: "30%", color: "#444" },
	{ label: "USA", width: 12, value: "9%", color: "#2a2a2a" },
	{ label: "UK", width: 10, value: "7%", color: "#222" },
];
```

- [ ] **Step 10: Update `emissionsData`**

```ts
const emissionsData: BarChartItem[] = [
	{ label: "Top 1%", width: 16, value: "16%", color: "var(--accent)" },
	{ label: "Next 9%", width: 34, value: "34%", color: "#0a8f8f" },
	{ label: "Middle 40%", width: 42, value: "42%", color: "#444" },
	{ label: "Bottom 50%", width: 8, value: "8%", color: "#2a2a2a" },
];
```

- [ ] **Step 11: Update mobile data in `buildMobileData()`**

In the `labor` array inside `buildMobileData()`:

```ts
const labor = [
	{
		label: `Labour ${firstLabor.year}`,
		width: firstLabor.labor,
		value: `${firstLabor.labor}%`,
		color: "#888",
	},
	{
		label: `Labour ${lastLabor.year}`,
		width: lastLabor.labor,
		value: `${lastLabor.labor}%`,
		color: "#666",
	},
	{
		label: `Capital ${firstLabor.year}`,
		width: firstLabor.capital,
		value: `${firstLabor.capital}%`,
		color: "#0a7575",
	},
	{
		label: `Capital ${lastLabor.year}`,
		width: lastLabor.capital,
		value: `${lastLabor.capital}%`,
		color: "var(--accent)",
	},
];
```

In the `history` colorMap:

```ts
const colorMap: Record<number, string> = {
	1913: "#0a7575",
	1929: "var(--accent)",
	1970: "#4caf4c",
	2025: "#0a8f8f",
};
```

In the `sankey` array:

```ts
const sankey: BarChartItem[] = [
	{
		label: "Unequal Exchange",
		width: 100,
		value: "$10.8T",
		color: "var(--accent)",
	},
	{
		label: "Debt Service",
		width: 12,
		value: "$443B",
		color: "#0a8f8f",
	},
	{
		label: "Illicit Flows",
		width: 4,
		value: "$89B",
		color: "#0d7676",
	},
	{ label: "Aid Received", width: 7, value: "$200B", color: "#4caf4c" },
];
```

- [ ] **Step 12: Update hardcoded SVG colour strings in render functions**

In `renderLaborDesktopChart`, the inline SVG string contains:

```
style="stroke: var(--red)"
style="fill: var(--red)"
```

Replace both with:

```
style="stroke: var(--accent)"
style="fill: var(--accent)"
```

In `renderHistoryDesktopChart`, replace:

```
fill="rgba(204,17,17,0.06)"
fill="rgba(204,17,17,0.10)"
fill="rgba(204,17,17,0.08)"
fill="rgba(204,17,17,0.5)"
fill="rgba(204,17,17,0.4)"
stroke="#cc1111"
style="fill: var(--red)"
```

With:

```
fill="rgba(14,110,112,0.06)"
fill="rgba(14,110,112,0.10)"
fill="rgba(14,110,112,0.08)"
fill="rgba(14,110,112,0.5)"
fill="rgba(14,110,112,0.4)"
stroke="var(--accent)"
style="fill: var(--accent)"
```

Note: `rgba(14,110,112,...)` is the RGB equivalent of `#0d6e70` (the light-mode accent). These are purely decorative SVG fills so using the light-mode value is acceptable — they're subtle tints.

In `renderSankeyDesktopChart`, replace:

```
fill="#cc1111"
style="fill: var(--red)"
style="fill: var(--red)"
```

With:

```
fill="var(--accent)"
style="fill: var(--accent)"
style="fill: var(--accent)"
```

Also replace `fill="var(--white)"` references in the treemap render function with `fill="#ffffff"`.

- [ ] **Step 13: Run tests**

```bash
pnpm vitest run
```

Expected: all tests pass.

- [ ] **Step 14: Commit**

```bash
git add src/charts.ts
git commit -m "style: update chart colour palette — red scale replaced with teal"
```

---

## Task 13: Update animations.css and accessibility.css

**Files:**
- Modify: `src/styles/animations.css`
- Modify: `src/styles/accessibility.css`

- [ ] **Step 1: Remove `stamp-appear` keyframes from animations.css**

Remove:

```css
@keyframes stamp-appear {
	from {
		transform: rotate(-3deg) scale(2);
		opacity: 0;
	}
	to {
		transform: rotate(-3deg) scale(1);
		opacity: 0.85;
	}
}
```

- [ ] **Step 2: Remove stamp reduced-motion override from animations.css**

Remove from the `@media (prefers-reduced-motion: reduce)` block:

```css
.stamp {
	animation: none;
	opacity: 0.85;
}
```

- [ ] **Step 3: Update accessibility.css — focus rings and skip link**

Replace the full file:

```css
.skip-link {
	position: absolute;
	left: -9999px;
	top: 0;
	width: 1px;
	height: 1px;
	overflow: hidden;
	z-index: 10000;
}

.skip-link:focus {
	position: fixed;
	top: 0;
	left: 0;
	width: auto;
	height: auto;
	overflow: visible;
	padding: 12px 24px;
	background: var(--fg);
	color: var(--bg);
	font-family: var(--font-ui);
	font-size: 0.875rem;
	font-weight: 600;
	text-decoration: none;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	outline: 3px solid var(--accent);
	outline-offset: 0;
}

:focus-visible {
	outline: 2px solid var(--accent);
	outline-offset: 3px;
}

nav :focus-visible {
	outline-color: var(--accent);
}

#manifesto :focus-visible {
	outline-color: #2ec4c4;
}

.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}
```

Note: `#manifesto :focus-visible` uses the static dark-theme teal `#2ec4c4` because the manifesto always has a dark background.

- [ ] **Step 4: Commit**

```bash
git add src/styles/animations.css src/styles/accessibility.css
git commit -m "style: update animations and accessibility — teal focus rings, remove stamp animation"
```

---

## Task 14: Clean up responsive.css

**Files:**
- Modify: `src/styles/responsive.css`

- [ ] **Step 1: Remove all `var(--ls-wide)` and `var(--ls-xwide)` references**

```bash
grep -n "var(--ls-" src/styles/responsive.css
```

For each match, replace the `letter-spacing` declaration with either `letter-spacing: 0.06em` (if it's on a label) or remove the declaration entirely (if it was purely decorative spacing).

- [ ] **Step 2: Fix mobile stat-box font sizes**

The `@media (max-width: 700px)` block has:

```css
.stat-box .num {
	font-size: 2.6rem;
}
```

And `@media (max-width: 420px)` has:

```css
.stat-box .num {
	font-size: 2.2rem;
}
```

These are fine — keep as-is.

- [ ] **Step 3: Remove hardcoded h1 span rule**

In `@media (max-width: 700px)`, remove:

```css
h1 span {
	font-size: clamp(3rem, 12vw, 4.5rem);
}
```

The `h1 span` in the new design is no longer a large coloured sub-heading — it's a standard part of the `h1`. The `h1` clamp handles responsive sizing already.

- [ ] **Step 4: Update the `#manifesto` padding rules**

Existing responsive overrides for `#manifesto` padding are fine — keep them.

- [ ] **Step 5: Commit**

```bash
git add src/styles/responsive.css
git commit -m "style: clean up responsive — remove ls-* vars, remove h1 span override"
```

---

## Task 15: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update font documentation in CLAUDE.md**

Find the fonts section. It currently reads:

> **Fonts** are served from `@fontsource` npm packages (not Google CDN). `vite.config.ts` runs Fontaine to inject computed `@font-face` fallback rules at build time, eliminating layout shift. The three fonts are Bebas Neue (display/headings), Special Elite (body), and Roboto Condensed Variable (labels/UI).

Replace with:

> **Fonts** are served from `@fontsource-variable` npm packages (not Google CDN). `vite.config.ts` runs Fontaine to inject computed `@font-face` fallback rules at build time, eliminating layout shift. The two fonts are Fraunces Variable (display/headings) and Inter Variable (body and labels/UI). Font variables: `--font-display`, `--font-body`, `--font-ui` (body and UI both use Inter).

- [ ] **Step 2: Update CSS custom properties note**

Find:

> CSS custom properties are defined in `:root` in `src/styles/base.css`. Core palette: `--black #0a0a0a`, `--white #f0ece0`, `--red #cc1111`, `--red-dark #8b0000`.

Replace with:

> CSS custom properties are defined in `:root` (light theme) and `@media (prefers-color-scheme: dark)` in `src/styles/base.css`. Core tokens: `--accent` (teal, `#0d6e70` light / `#2ec4c4` dark), `--bg`, `--fg`, `--text-body`, `--text-muted`, `--text-label`, `--semantic-red`, `--semantic-green` (data indicators only).

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md — new font system and token documentation"
```

---

## Task 16: Final verification

- [ ] **Step 1: Run full test suite**

```bash
pnpm vitest run
```

Expected: all tests pass.

- [ ] **Step 2: Run Biome on all files**

```bash
pnpm exec biome check src/ index.html
```

Expected: no errors (run `pnpm biome:fix` to auto-fix any formatting issues).

- [ ] **Step 3: Build check**

```bash
pnpm build
```

Expected: no TypeScript errors, build completes successfully.

- [ ] **Step 4: Visual check via dev server**

```bash
pnpm dev
```

Open in browser. Check:
- Light mode (system preference light): warm off-white background, ink-dark text, teal accents
- Dark mode (system preference dark): deep navy background, soft light text, bright teal accents
- Navigation: clean bg, teal active indicator, no red bar
- Hero: Fraunces headings, callout box, clean stat cards
- Charts: teal-family fills (no red)
- Manifesto: dark contrast panel in light mode
- Focus rings: teal on all interactive elements

- [ ] **Step 5: Check SVG axis text contrast in light mode**

The SVG chart render functions in `charts.ts` use hardcoded `fill="#888"` for axis labels and grid text. In light mode, `#888` on `--bg-elevated` (`#f2efe9`) is approximately 4.2:1 contrast — borderline WCAG AA for small text. Visually inspect axis labels in light mode. If they fail, update the SVG text fill to `#555` (≥7:1 on light bg, still readable on dark bg).

- [ ] **Step 6: Grep for any remaining `var(--red)` and `var(--ls-*)` in CSS**

```bash
grep -rn "var(--red)\|var(--ls-\|var(--black)\|var(--white)\|var(--gray)\|letter-spacing.*var" src/styles/
```

Expected: no matches (all replaced).

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: final cleanup — verify build, fix any remaining token references"
```
