export function initAnimations(): void {
	const heroReveals = document.querySelectorAll<HTMLElement>("#hero .reveal");
	setTimeout(() => {
		for (const el of heroReveals) {
			el.classList.add("visible");
		}
	}, 100);

	const revealObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
					revealObserver.unobserve(entry.target);
				}
			}
		},
		{ threshold: 0.15 },
	);

	const reveals = document.querySelectorAll<HTMLElement>(
		".reveal:not(#hero .reveal)",
	);
	for (const el of reveals) {
		revealObserver.observe(el);
	}

	const revealLeftObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
					revealLeftObserver.unobserve(entry.target);
				}
			}
		},
		{ threshold: 0.15 },
	);

	const revealsLeft = document.querySelectorAll<HTMLElement>(".reveal-left");
	for (const el of revealsLeft) {
		revealLeftObserver.observe(el);
	}
}
