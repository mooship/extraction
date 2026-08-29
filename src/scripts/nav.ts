/**
 * Wires the mobile nav's hamburger `.nav-toggle` button: toggles the
 * `.nav-open` class and `aria-expanded`/`aria-label`, moves focus into the
 * menu on open, traps Tab/Shift+Tab between the toggle and the last link
 * while open, closes on Escape or on any nav link click, and restores
 * focus to the toggle button on close.
 */
export function initNavToggle(): void {
	const nav = document.querySelector<HTMLElement>("nav");
	const btn = document.querySelector<HTMLButtonElement>(".nav-toggle");
	if (!nav || !btn) {
		return;
	}

	let keydownHandler: ((e: KeyboardEvent) => void) | null = null;
	const links = Array.from(
		nav.querySelectorAll<HTMLAnchorElement>(".nav-links a"),
	);
	const lastLink = links[links.length - 1];

	const closeNav = () => {
		nav.classList.remove("nav-open");
		btn.setAttribute("aria-expanded", "false");
		btn.setAttribute("aria-label", "Open navigation");
		if (keydownHandler) {
			document.removeEventListener("keydown", keydownHandler);
			keydownHandler = null;
		}
	};

	btn.addEventListener("click", () => {
		const open = nav.classList.toggle("nav-open");
		btn.setAttribute("aria-expanded", String(open));
		btn.setAttribute(
			"aria-label",
			open ? "Close navigation" : "Open navigation",
		);
		if (open) {
			links[0]?.focus();
			keydownHandler = (e: KeyboardEvent) => {
				if (e.key === "Escape") {
					closeNav();
					btn.focus();
				} else if (
					e.key === "Tab" &&
					!e.shiftKey &&
					document.activeElement === lastLink
				) {
					e.preventDefault();
					btn.focus();
				} else if (
					e.key === "Tab" &&
					e.shiftKey &&
					document.activeElement === btn
				) {
					e.preventDefault();
					lastLink?.focus();
				}
			};
			document.addEventListener("keydown", keydownHandler);
		} else if (keydownHandler) {
			document.removeEventListener("keydown", keydownHandler);
			keydownHandler = null;
		}
	});

	for (const link of links) {
		link.addEventListener("click", closeNav);
	}
}

/**
 * Highlights the nav link for whichever `section[id]` is currently in the
 * "active" scroll band, using a `rootMargin` that treats a section as
 * active once it crosses 20% down from the top of the viewport and until
 * it's 60% up from the bottom.
 */
export function initActiveNav(): void {
	const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-links a");
	const sections = document.querySelectorAll<HTMLElement>("section[id]");

	if (!navLinks.length || !sections.length) {
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					const id = entry.target.id;
					for (const link of navLinks) {
						const href = link.getAttribute("href");
						if (href === `#${id}`) {
							link.classList.add("nav-active");
						} else {
							link.classList.remove("nav-active");
						}
					}
				}
			}
		},
		{ rootMargin: "-20% 0px -60% 0px" },
	);

	for (const section of sections) {
		observer.observe(section);
	}
}

/** Entry point registered on `DOMContentLoaded` — runs both nav behaviours. */
function initNav(): void {
	initNavToggle();
	initActiveNav();
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initNav);
} else {
	initNav();
}
