export function initCounters(): void {
	const reducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	setTimeout(() => {
		const nums = document.querySelectorAll<HTMLElement>(".stat-box .num");

		for (const el of nums) {
			const target = Number.parseInt(el.dataset.target ?? "0", 10);
			const prefix = el.dataset.prefix ?? "";
			const suffix = el.dataset.suffix ?? "";

			if (reducedMotion) {
				el.textContent = `${prefix}${target}${suffix}`;
				continue;
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
	}, 600);
}
