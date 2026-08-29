/**
 * Reveals `.reveal`/`.reveal-left` elements as they scroll into view.
 *
 * Elements inside `#hero` are shown immediately rather than observed, since
 * the hero is visible on load and would otherwise never intersect. Each
 * other element is unobserved once it becomes visible — the reveal never
 * re-triggers on scroll-back. No-ops entirely under `prefers-reduced-motion`,
 * leaving those elements in their static (non-`visible`) CSS state.
 */
export function initAnimations(): void {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		return;
	}

	document.documentElement.classList.add("js-ready");

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
					observer.unobserve(entry.target);
				}
			}
		},
		{ threshold: 0.15 },
	);

	for (const el of document.querySelectorAll<HTMLElement>(
		".reveal:not(#hero *), .reveal-left:not(#hero *)",
	)) {
		observer.observe(el);
	}

	for (const el of document.querySelectorAll<HTMLElement>(
		"#hero .reveal, #hero .reveal-left",
	)) {
		el.classList.add("visible");
	}
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initAnimations);
} else {
	initAnimations();
}
