export function initCitations(): void {
	const maybePopover = document.getElementById("cite-popover");
	if (!maybePopover) {
		return;
	}
	const popover: HTMLElement = maybePopover;

	const sourceEl = popover.querySelector<HTMLElement>(".cite-source");
	const linkEl = popover.querySelector<HTMLAnchorElement>(".cite-link");
	let active: HTMLButtonElement | null = null;
	let hideTimer: ReturnType<typeof setTimeout> | null = null;

	function show(btn: HTMLButtonElement): void {
		if (!sourceEl || !linkEl) {
			return;
		}
		if (hideTimer !== null) {
			clearTimeout(hideTimer);
			hideTimer = null;
		}
		if (active && active !== btn) {
			active.setAttribute("aria-expanded", "false");
			active = null;
		}
		sourceEl.textContent = btn.dataset.source ?? "";
		linkEl.href = btn.dataset.url ?? "#";
		popover.removeAttribute("hidden");
		requestAnimationFrame(() => {
			popover.classList.add("is-visible");
			popover.focus();
		});

		const rect = btn.getBoundingClientRect();
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const popW = 296;
		const popH = 80;
		const gap = 6;

		let top = rect.bottom + gap;
		let left = rect.left;

		if (top + popH > vh) {
			top = rect.top - popH - gap;
		}
		if (left + popW > vw) {
			left = Math.max(8, vw - popW - 8);
		}

		popover.style.top = `${top}px`;
		popover.style.left = `${left}px`;

		btn.setAttribute("aria-expanded", "true");
		active = btn;
	}

	function hide(returnFocus = false): void {
		const trigger = active;
		popover.classList.remove("is-visible");
		if (active) {
			active.setAttribute("aria-expanded", "false");
			active = null;
		}
		if (returnFocus && trigger) {
			trigger.focus();
		}
		hideTimer = setTimeout(() => {
			popover.setAttribute("hidden", "");
			hideTimer = null;
		}, 350);
	}

	for (const btn of document.querySelectorAll<HTMLButtonElement>(".cite-ref")) {
		btn.addEventListener("click", (e) => {
			e.stopPropagation();
			if (active === btn) {
				hide(true);
			} else {
				show(btn);
			}
		});
	}

	document.addEventListener("click", () => hide());
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			hide(true);
		}
	});
}

document.addEventListener("DOMContentLoaded", initCitations);
