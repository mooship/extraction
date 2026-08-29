/**
 * Wires every `.cite-ref` button to the single shared `#cite-popover`
 * element, positioning it near whichever button was activated and
 * flipping it above/left when it would otherwise overflow the viewport.
 * No-ops if `#cite-popover` isn't present on the page.
 */
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

	/**
	 * Populates the popover from `btn`'s `data-source`/`data-url`, positions
	 * it below-left of `btn` (flipping above and/or clamping horizontally if
	 * that would overflow the viewport), and marks `btn` as the active
	 * trigger.
	 */
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

		popover.style.top = `${top + window.scrollY}px`;
		popover.style.left = `${left + window.scrollX}px`;

		btn.setAttribute("aria-expanded", "true");
		active = btn;
	}

	/**
	 * Hides the popover and clears the active trigger's `aria-expanded`.
	 * The `hidden` attribute is applied after a 350ms delay so the CSS
	 * hide transition can finish first. Pass `returnFocus` to move focus
	 * back to the trigger button (e.g. on Escape), skipped on outside
	 * clicks since focus has already moved elsewhere.
	 */
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

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initCitations);
} else {
	initCitations();
}
