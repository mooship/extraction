export function initAnimations(): void {
	const reveals = document.querySelectorAll<HTMLElement>(
		".reveal, .reveal-left",
	);
	for (const el of reveals) {
		el.classList.add("visible");
	}
}
