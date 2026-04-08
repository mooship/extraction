# Redesign: Civic/Advocacy Aesthetic

**Date:** 2026-04-08
**Scope:** Full redesign — color system, typography, layout, and component patterns

## Goal

Replace the existing brutalist aesthetic with a civic/advocacy register (think Our World in Data, Oxfam). Both light and dark themes must be polished, intentional, and WCAG AA compliant throughout. The redesign avoids overt political colour coding (no Soviet red as the dominant signal) while retaining the site's authority and seriousness. The eco-socialist content's ecological angle informs the accent colour choice.

---

## 1. Color System

### Shared tokens

```css
--accent-fg: #ffffff;   /* text on accent backgrounds (light mode) */
```

### Light theme (default)

```css
--bg:              #f8f7f4;
--bg-elevated:     #f2efe9;
--bg-surface:      #ebe7df;
--bg-inset:        #e0dbd1;
--bg-section-alt:  #f4f1ec;
--border-subtle:   #d6d1c9;

--fg:              #1c1917;   /* ~17:1 on --bg */
--text-body:       #292524;   /* ~14:1 */
--text-muted:      #57534e;   /* ~7:1  */
--text-label:      #6b7280;   /* ~5:1  */

--accent:          #0d6e70;   /* deep teal, ~5.5:1 on --bg */
--accent-fg:       #ffffff;
```

### Dark theme (`prefers-color-scheme: dark`)

```css
--bg:              #0e1117;
--bg-elevated:     #141b24;
--bg-surface:      #1a2333;
--bg-inset:        #1e2840;
--bg-section-alt:  #111820;
--border-subtle:   #253045;

--fg:              #e8edf5;   /* ~14:1 on --bg */
--text-body:       #d1d9e6;   /* ~11:1 */
--text-muted:      #8b9ab3;   /* ~5:1  */
--text-label:      #6b7d97;   /* ~4.5:1 */

--accent:          #2ec4c4;   /* brighter teal for dark bg, ~7:1 */
--accent-fg:       #0e1117;
```

### Semantic / data colours

Retained exclusively for data indicators (good/bad values on country cards). Not used as decorative or brand colours anywhere.

Light theme:
```css
--semantic-green: #2e7d32;
--semantic-red:   #c62828;
```

Dark theme:
```css
--semantic-green: #4caf4c;
--semantic-red:   #ef5350;
```

The existing `--red` and `--green` custom properties in `:root` are renamed to `--semantic-red` and `--semantic-green` to make their limited, data-only role explicit. All previous brand uses of `--red` are replaced with `--accent`.

### Manifesto section override

In light mode: `background: #1c1917` (forced dark panel), `color: #e8edf5`.
In dark mode: `background: var(--bg-surface)` with a stronger top border.

---

## 2. Typography

### Font system

| Role | Font | Package |
|---|---|---|
| Display (h1, h2, h3) | Fraunces Variable | `@fontsource-variable/fraunces` |
| Body + UI | Inter Variable | `@fontsource-variable/inter` |

Replaces: Bebas Neue, Special Elite, Roboto Condensed Variable.

### Type scale

| Element | Font | Size | Weight | Line height | Notes |
|---|---|---|---|---|---|
| `h1` | Fraunces | `clamp(2.8rem, 5vw, 4.5rem)` | 700 | 1.05 | Mixed case |
| `h2` | Fraunces | `clamp(1.75rem, 3vw, 2.5rem)` | 600 | 1.1 | Mixed case |
| `h3` | Fraunces | `1.125rem` | 600 | 1.3 | Mixed case |
| Body `p` | Inter | `1rem` | 400 | 1.75 | — |
| Label/UI | Inter | `0.8125rem` | 500 | — | Uppercase, 0.06em tracking |
| Caption | Inter | `0.75rem` | 400 | 1.5 | — |

### Letter spacing

All `--ls-*` custom properties (`--ls-tight`, `--ls-normal`, `--ls-wide`, `--ls-xwide`, `--ls-logo`) are removed from `:root`. Wide tracking was a decorative brutalism signal. The only tracking retained is `letter-spacing: 0.06em` applied directly on UI labels for legibility at small sizes.

### Font variables

```css
--font-display: "Fraunces Variable", Georgia, serif;
--font-body:    "Inter Variable", system-ui, sans-serif;
--font-ui:      "Inter Variable", system-ui, sans-serif;
```

---

## 3. Layout & Component Patterns

### Navigation

- Background: `var(--bg-elevated)` in both themes (no solid red bar)
- Logo: Fraunces 600, mixed case ("Extraction")
- Active link: teal bottom border (`2px solid var(--accent)`)
- Bottom border on nav: `1px solid var(--border-subtle)`

### Hero section

- Keep 2-column grid layout, increase padding to `100px 80px`
- Remove `body::before` grain texture overlay
- The `.stamp` element replaced with a refined callout: `border-left: 3px solid var(--accent)`, Inter 500, mixed case, no transform/rotation
- Stat grid: remove `2px` gap tile pattern. Replace with `gap: 12px`, `border-radius: 6px` cards, `border: 1px solid var(--border-subtle)`
- Stat numbers: Fraunces 700, `var(--accent)` colour

### Sections

- Remove all thick coloured `border-top` rules used as visual separators
- Use `border-top: 1px solid var(--border-subtle)` or whitespace
- Alternating section backgrounds: `var(--bg-section-alt)` (already in the design, retained)
- Section labels: replace line + all-caps Bebas Neue with: `■` square prefix (teal), Inter 500 uppercase, `0.06em` tracking

### Manifesto / Demands

- Full red section → dark contrast panel (see colour section above)
- Demands grid: clean cards with `border: 1px solid var(--border-subtle)`, `border-radius: 6px`; Fraunces headings
- Remove the red-on-red tiling and stagger-delay hover effects

### Charts

- All chart fill colours using `--red` replaced with `--accent`
- This affects: horizontal bar fills, Gini bars, treemap rects, donut segments, Sankey paths, and line strokes
- `--red` is renamed to `--semantic-red` (see colour section); all chart colour references update from `--red` to `--accent`

### Country cards

- Remove `2px` gap grid pattern, use `gap: 12px` with `border-radius: 6px`
- `system-tag.socialist` and `system-tag.capitalist` colours: use `--accent` for socialist, `--text-muted` for capitalist (removes red political signal from the tag)
- Good/bad `.metric-val` indicators retain semantic green/red (data context, not brand)

### General

- Border radius: `4px` buttons/inputs, `6px` cards/panels — subtle, not bubbly
- Box shadow: `0 1px 3px rgba(0,0,0,0.08)` on cards in light mode only; none in dark
- No box shadows used as decoration; only for elevation/depth

---

## 4. Accessibility Requirements

- All text/background combinations must meet WCAG AA (4.5:1 normal text, 3:1 large text/UI)
- Focus indicators: `outline: 2px solid var(--accent)`, `outline-offset: 3px` on all interactive elements
- `prefers-reduced-motion` support: already implemented, must be preserved
- Semantic HTML structure: unchanged
- Colour is never the sole means of conveying information (already true; confirmed by chart table fallbacks)

---

## 5. Build Config

`vite.config.ts` uses Fontaine to inject `@font-face` fallbacks. The `fallbacks` map must be updated to replace Bebas Neue / Special Elite / Roboto Condensed entries with:

```ts
fallbacks: {
  "Fraunces Variable": ["Georgia", "Times New Roman", "serif"],
  "Inter Variable":    ["Arial", "Helvetica Neue", "system-ui", "sans-serif"],
}
```

---

## 6. Out of Scope

- Chart data and content copy: unchanged
- JS behaviour (animations, counters, lines, citations): unchanged
- HTML structure beyond what is needed to support new component patterns
- Privacy page: receives the same color/font tokens but no layout changes
