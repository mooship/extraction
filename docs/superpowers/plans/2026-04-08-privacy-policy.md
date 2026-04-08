# Privacy Policy Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a standalone `/privacy` page disclosing Cloudflare Web Analytics use, styled to match the site.

**Architecture:** A second Vite MPA entry (`privacy.html` + `src/privacy.ts`) that shares all existing CSS modules. The nav toggle is initialised by importing `initNavToggle` from `src/main.ts`. Styles for the article are added to `src/styles/components.css`. The footer on `index.html` gets a link to `/privacy`.

**Tech Stack:** Vanilla TypeScript, Vite MPA, existing CSS custom properties, Biome for formatting.

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Modify | `vite.config.ts` | Add `build.rollupOptions.input` for MPA |
| Create | `src/privacy.ts` | CSS-only entry + `initNavToggle` for mobile nav |
| Create | `privacy.html` | Standalone privacy policy page |
| Modify | `src/styles/components.css` | Add `.privacy-policy` scoped styles |
| Modify | `index.html` | Add Privacy Policy link in footer |

---

## Task 1: Update vite.config.ts for MPA

**Files:**
- Modify: `vite.config.ts`

- [ ] **Step 1: Add `resolve` import and `build` config**

Open `vite.config.ts`. Add `import { resolve } from "path";` at the top and extend `defineConfig` with a `build` key:

```ts
import { resolve } from "path";
import { FontaineTransform } from "fontaine";
import { defineConfig } from "vite";

export default defineConfig({
	cacheDir: "node_modules/.vite",
	plugins: [
		FontaineTransform.vite({
			fallbacks: {
				"Bebas Neue": ["Impact", "Arial Narrow", "Arial"],
				"Special Elite": ["Courier New", "Courier", "Georgia"],
				"Roboto Condensed Variable": ["Arial Narrow", "Arial", "Helvetica"],
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
				main: resolve(__dirname, "index.html"),
				privacy: resolve(__dirname, "privacy.html"),
			},
		},
	},
});
```

- [ ] **Step 2: Run build to verify config is valid**

```bash
pnpm build
```

Expected: build succeeds (it will warn that `privacy.html` doesn't exist yet — that's fine). If TypeScript errors appear on `__dirname`, add `import { fileURLToPath } from "url"; import { dirname } from "path"; const __dirname = dirname(fileURLToPath(import.meta.url));` before the `resolve` import and remove `resolve` from the `path` import.

- [ ] **Step 3: Format and commit**

```bash
pnpm biome:fix
git add vite.config.ts
git commit -m "feat: configure vite for multi-page build with privacy entry"
```

---

## Task 2: Add `.privacy-policy` styles to components.css

**Files:**
- Modify: `src/styles/components.css`

- [ ] **Step 1: Append styles to the end of components.css**

Add the following block at the very end of `src/styles/components.css`:

```css
.privacy-policy {
	max-width: 720px;
	margin: 0 auto;
	padding: 120px 60px 80px;
}

.privacy-policy h1 {
	font-size: clamp(2.5rem, 5vw, 4rem);
	color: var(--white);
	margin-bottom: 48px;
}

.privacy-policy section {
	padding: 0;
	margin-bottom: 48px;
	border-top: 1px solid var(--border-subtle);
	padding-top: 32px;
}

.privacy-policy h2 {
	font-family: var(--font-ui);
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: var(--ls-xwide);
	color: var(--red);
	margin-bottom: 16px;
}

.privacy-policy p {
	margin-bottom: 16px;
}

.privacy-policy p:last-child {
	margin-bottom: 0;
}

.privacy-policy a {
	color: var(--red);
	text-decoration: underline;
	text-underline-offset: 3px;
}

.privacy-policy a:hover,
.privacy-policy a:focus-visible {
	color: var(--white);
}

.privacy-policy ul {
	list-style: none;
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.privacy-policy ul li::before {
	content: "—";
	color: var(--red);
	margin-right: 10px;
}

.privacy-updated {
	font-family: var(--font-ui);
	font-size: 0.75rem;
	text-transform: uppercase;
	letter-spacing: var(--ls-wide);
	color: var(--text-muted);
	margin-top: 48px;
	padding-top: 32px;
	border-top: 1px solid var(--border-subtle);
}
```

- [ ] **Step 2: Format and commit**

```bash
pnpm biome:fix
git add src/styles/components.css
git commit -m "feat: add privacy-policy article styles"
```

---

## Task 3: Create src/privacy.ts

**Files:**
- Create: `src/privacy.ts`

- [ ] **Step 1: Create the file**

Create `src/privacy.ts` with the following content:

```ts
import "./styles/base.css";
import "./styles/typography.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/animations.css";
import "./styles/accessibility.css";
import "./styles/responsive.css";
import { initNavToggle } from "./main";

document.addEventListener("DOMContentLoaded", () => {
	initNavToggle();
});
```

- [ ] **Step 2: Run existing tests to confirm no regressions**

```bash
pnpm vitest run
```

Expected: all tests pass. This confirms the `initNavToggle` export from `main.ts` is still intact.

- [ ] **Step 3: Format and commit**

```bash
pnpm biome:fix
git add src/privacy.ts
git commit -m "feat: add privacy.ts entry point"
```

---

## Task 4: Create privacy.html

**Files:**
- Create: `privacy.html`

- [ ] **Step 1: Create the file**

Create `privacy.html` at the project root with the following content:

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
		<link rel="manifest" href="/site.webmanifest">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta
			http-equiv="Content-Security-Policy"
			content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; img-src 'self' data:; font-src 'self'"
		>
		<title>Privacy Policy — Extraction</title>
		<meta
			name="description"
			content="Privacy policy for Extraction: what data is collected and how it is used."
		>
		<link rel="canonical" href="https://extraction.timothybrits.co.za/privacy">
		<meta name="theme-color" content="#cc1111">
		<meta property="og:type" content="website">
		<meta property="og:url" content="https://extraction.timothybrits.co.za/privacy">
		<meta property="og:title" content="Privacy Policy — Extraction">
		<meta
			property="og:description"
			content="Privacy policy for Extraction: what data is collected and how it is used."
		>
	</head>
	<body>
		<a href="#main-content" class="skip-link">Skip to main content</a>
		<nav aria-label="Main navigation">
			<a href="/" class="nav-logo">Extraction</a>
			<button
				type="button"
				class="nav-toggle"
				aria-label="Open navigation"
				aria-expanded="false"
			>
				<svg
					width="20"
					height="14"
					viewBox="0 0 20 14"
					fill="currentColor"
					aria-hidden="true"
				>
					<rect x="0" y="0" width="20" height="2" />
					<rect x="0" y="6" width="20" height="2" />
					<rect x="0" y="12" width="20" height="2" />
				</svg>
			</button>
			<ul class="nav-links">
				<li><a href="/#wealth">Wealth</a></li>
				<li><a href="/#history">History</a></li>
				<li><a href="/#tax">Tax</a></li>
				<li><a href="/#labor">Labour</a></li>
				<li><a href="/#housing">Housing</a></li>
				<li><a href="/#imperialism">Global South</a></li>
				<li><a href="/#ecology">Ecology</a></li>
				<li><a href="/#public">Public</a></li>
				<li><a href="/#manifesto">Manifesto</a></li>
				<li><a href="/#action">Action</a></li>
			</ul>
		</nav>
		<main id="main-content">
			<article class="privacy-policy">
				<h1>Privacy Policy</h1>

				<section>
					<h2>What this site collects</h2>
					<p>
						This site uses Cloudflare Web Analytics to understand how it is used.
						No cookies are set. No personal information is collected or stored.
					</p>
				</section>

				<section>
					<h2>What Cloudflare records</h2>
					<p>
						Cloudflare Web Analytics records aggregate, anonymised data: page views,
						referrer URL, browser type and version, operating system, device type, and
						country-level location. IP addresses are not stored beyond the initial
						request. There is no cross-site tracking.
					</p>
					<p>
						For full details, see <a
							href="https://www.cloudflare.com/privacypolicy/"
							target="_blank"
							rel="noopener noreferrer"
						>Cloudflare's privacy policy</a>.
					</p>
				</section>

				<section>
					<h2>What this site does not do</h2>
					<ul>
						<li>No user accounts or login</li>
						<li>No contact forms or data submission</li>
						<li>No advertising networks</li>
						<li>No third-party tracking scripts</li>
						<li>No fingerprinting</li>
					</ul>
				</section>

				<p class="privacy-updated">Last updated: April 2026</p>
			</article>
		</main>
		<footer>
			<span class="footer-logo">Extraction</span>
			<div class="footer-right">
				<p>
					Sources: World Inequality Database · Oxfam 2025 · UNDP HDR · WHO ·
					OECD · EPI · US Federal Reserve SCF · IRS · UNICEF · BLS / BEA ·
					Statistics South Africa · National Bureau of Statistics of China ·
					World Bank · CEPAL · Oxfam Carbon Inequality Report · Carbon
					Disclosure Project · IMF Fossil Fuel Subsidies 2025 · IPBES Global
					Assessment · Loss and Damage Collaboration · Tax Justice Network ·
					Saez &amp; Zucman · Global Financial Integrity · UNCTAD · Harvard JCHS
					· Resolution Foundation · Savills · Shelter · Jubilee Debt Campaign ·
					Jason Hickel
				</p>
				<p>
					For educational purposes · Data current as of 2025 · Built with data
					and conviction
				</p>
			</div>
		</footer>
		<script type="module" src="/src/privacy.ts"></script>
	</body>
</html>
```

- [ ] **Step 2: Run full build to confirm both entries compile**

```bash
pnpm build
```

Expected: build succeeds and `dist/` contains both `index.html` and `privacy/index.html` (or `privacy.html` depending on Vite's output). No TypeScript errors.

- [ ] **Step 3: Spot-check in preview**

```bash
pnpm preview
```

Open `http://localhost:4173/privacy` in a browser. Verify:
- Page loads with the dark background and red nav
- All four content sections render
- "Extraction" logo in nav links back to `/`
- Section nav links use `/#wealth` etc.
- Cloudflare link opens in a new tab
- On narrow viewport (< 960px) the hamburger button opens/closes the nav

- [ ] **Step 4: Format and commit**

```bash
pnpm biome:fix
git add privacy.html
git commit -m "feat: add privacy policy page"
```

---

## Task 5: Add Privacy Policy link to index.html footer

**Files:**
- Modify: `index.html` lines 2053–2056

- [ ] **Step 1: Add the link to the footer's second paragraph**

In `index.html`, find the footer paragraph that reads:

```html
				<p>
					For educational purposes · Data current as of 2025 · Built with data
					and conviction
				</p>
```

Replace it with:

```html
				<p>
					For educational purposes · Data current as of 2025 · Built with data
					and conviction · <a href="/privacy">Privacy Policy</a>
				</p>
```

- [ ] **Step 2: Run build and confirm no regressions**

```bash
pnpm build && pnpm vitest run
```

Expected: build succeeds, all tests pass.

- [ ] **Step 3: Format and commit**

```bash
pnpm biome:fix
git add index.html
git commit -m "feat: link to privacy policy from footer"
```

---

## Self-Review Checklist

- [x] **Spec coverage:** Separate page ✓ · `privacy.html` entry ✓ · `privacy.ts` CSS entry ✓ · Vite MPA config ✓ · Nav with `/#` links ✓ · Four content sections ✓ · Cloudflare link ✓ · No contact section ✓ · Footer link ✓ · `.privacy-policy` styles ✓ · Mobile nav (initNavToggle) ✓
- [x] **Placeholders:** None present
- [x] **Type consistency:** `initNavToggle` is exported from `main.ts` (line 35) and imported by name in `privacy.ts`
