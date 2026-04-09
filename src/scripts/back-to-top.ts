export function initBackToTop(): void {
	const btn = document.querySelector<HTMLButtonElement>(".back-to-top");
	const hero = document.querySelector<HTMLElement>("#hero");
	if (!btn || !hero) {
		return;
	}

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				btn.hidden = true;
				btn.classList.remove("visible");
			} else {
				btn.hidden = false;
				requestAnimationFrame(() => btn.classList.add("visible"));
			}
		},
		{ threshold: 0 },
	);

	observer.observe(hero);

	btn.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initBackToTop);
} else {
	initBackToTop();
}
