# Privacy Policy Page — Design Spec

**Date:** 2026-04-08
**Status:** Approved

## Overview

A standalone privacy policy page at `/privacy` for the Extraction site. The only data processing disclosed is Cloudflare Web Analytics. No personal data is collected, no cookies are set, no forms or user accounts exist.

## Architecture

- New file: `privacy.html` at project root — second Vite MPA entry
- New file: `src/privacy.ts` — minimal TS entry that imports all CSS modules, no JS logic
- Modified: `vite.config.ts` — add `privacy.html` to `build.rollupOptions.input`
- Modified: `index.html` footer — add "Privacy Policy" link pointing to `/privacy`

### Vite MPA entry

```ts
build: {
  rollupOptions: {
    input: {
      main: resolve(__dirname, 'index.html'),
      privacy: resolve(__dirname, 'privacy.html'),
    },
  },
},
```

## Page Structure

`privacy.html` reuses the same `<nav>` and `<footer>` HTML as `index.html`, with one difference: nav section links use absolute `/#section` hrefs (e.g. `/#wealth`) so they still navigate correctly from `/privacy`.

The `.back-to-top` button is omitted (not needed on a short page).

The `<script>` tag points to `/src/privacy.ts` instead of `/src/main.ts`.

### Layout

```
<nav>          — same as index.html, section hrefs prefixed with /
<main>
  <article class="privacy-policy">
    <h1>Privacy Policy</h1>
    [sections below]
  </article>
</main>
<footer>       — same as index.html
```

## Content

All copy in British English. Four sections:

### 1. What this site collects
This site uses Cloudflare Web Analytics to understand how it is used. No cookies are set. No personal information is collected or stored.

### 2. What Cloudflare records
Cloudflare Web Analytics records aggregate, anonymised data: page views, referrer URL, browser type and version, operating system, device type, and country-level location. IP addresses are not stored beyond the initial request. There is no cross-site tracking.

Link to Cloudflare's privacy policy: `https://www.cloudflare.com/privacypolicy/`

### 3. What this site does not do
- No user accounts or login
- No contact forms or data submission
- No advertising networks
- No third-party tracking scripts
- No fingerprinting

### 4. Last updated
"Last updated: April 2026"

No contact section.

## Styling

No new CSS file. `src/privacy.ts` imports all existing CSS modules. The `<article>` uses a scoped `.privacy-policy` class with:
- `max-width` matching prose sections (approx 720px)
- `margin: 0 auto`
- `padding` consistent with existing sections
- `<h1>` uses `var(--font-display)` (Bebas Neue), matching site headings
- `<h2>` subheadings use `var(--font-ui)` (Roboto Condensed Variable)
- Body copy uses `var(--font-body)` (Special Elite), `var(--text-body)` colour
- `<ul>` list in section 3 uses existing list styles

Styles are scoped to `.privacy-policy` and added to `src/styles/components.css`, consistent with how other components are styled.

## CSP

The same `<head>` boilerplate from `index.html` is copied to `privacy.html`, including the Content-Security-Policy meta tag and the Cloudflare Web Analytics script tag, so that analytics fires on this page too. The page title and meta description are updated to reflect the privacy policy.
