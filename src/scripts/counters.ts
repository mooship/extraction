export function initCounters(): void {
	const reducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	function animateCounter(el: HTMLElement): void {
		const target = Number.parseInt(el.dataset.target ?? "0", 10);
		const prefix = el.dataset.prefix ?? "";
		const suffix = el.dataset.suffix ?? "";

		if (reducedMotion) {
			el.textContent = `${prefix}${target}${suffix}`;
			return;
		}

		const duration = 1500;
		const startTime = performance.now();

		function tick(now: number): void {
			const elapsed = now - startTime;
			const t = Math.min(elapsed / duration, 1);
			const progress = 1 - (1 - t) ** 3;
			const current = Math.round(progress * target);
			el.textContent = `${prefix}${current}${suffix}`;
			if (t < 1) {
				requestAnimationFrame(tick);
			}
		}

		requestAnimationFrame(tick);
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) {
					continue;
				}
				const num = entry.target.querySelector<HTMLElement>(".num");
				if (num) {
					animateCounter(num);
				}
				observer.unobserve(entry.target);
			}
		},
		{ threshold: 0.5 },
	);

	for (const box of document.querySelectorAll<HTMLElement>(".stat-box")) {
		const num = box.querySelector<HTMLElement>(".num");
		if (num) {
			num.setAttribute("aria-live", "polite");
			num.setAttribute("aria-atomic", "true");
		}
		observer.observe(box);
	}
}

window.addEventListener("load", initCounters);
