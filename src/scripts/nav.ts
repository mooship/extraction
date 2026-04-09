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

function initActiveNav(): void {
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

document.addEventListener("DOMContentLoaded", () => {
	initNavToggle();
	initActiveNav();
});
