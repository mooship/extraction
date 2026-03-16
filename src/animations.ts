export function initAnimations(): void {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		return;
	}

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
		".reveal, .reveal-left",
	)) {
		observer.observe(el);
	}

	setTimeout(() => {
		for (const el of document.querySelectorAll<HTMLElement>(
			"#hero .reveal, #hero .reveal-left",
		)) {
			el.classList.add("visible");
		}
	}, 100);
}
