import { beforeEach, describe, expect, it } from "vitest";
import {
	clearObservers,
	getObservers,
	mockMatchMedia,
	triggerIntersection,
} from "./__mocks__/setup";
import { initActiveNav, initNavToggle } from "./scripts/nav";

function buildNavFixture() {
	document.body.textContent = "";
	const nav = document.createElement("nav");

	const btn = document.createElement("button");
	btn.className = "nav-toggle";
	btn.setAttribute("aria-expanded", "false");
	btn.setAttribute("aria-label", "Open navigation");
	nav.appendChild(btn);

	const ul = document.createElement("ul");
	ul.className = "nav-links";
	for (const [href, text] of [
		["#wealth", "Wealth"],
		["#labor", "Labour"],
	]) {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.href = href;
		a.textContent = text;
		li.appendChild(a);
		ul.appendChild(li);
	}
	nav.appendChild(ul);
	document.body.appendChild(nav);
}

describe("initNavToggle", () => {
	beforeEach(() => {
		mockMatchMedia(false);
		buildNavFixture();
		initNavToggle();
	});

	it("adds .nav-open and sets aria-expanded on first click", () => {
		const btn = document.querySelector<HTMLButtonElement>(
			".nav-toggle",
		) as HTMLButtonElement;
		btn.click();
		expect(document.querySelector("nav")?.classList.contains("nav-open")).toBe(
			true,
		);
		expect(btn.getAttribute("aria-expanded")).toBe("true");
		expect(btn.getAttribute("aria-label")).toBe("Close navigation");
	});

	it("removes .nav-open and resets aria-expanded on second click", () => {
		const btn = document.querySelector<HTMLButtonElement>(
			".nav-toggle",
		) as HTMLButtonElement;
		btn.click();
		btn.click();
		expect(document.querySelector("nav")?.classList.contains("nav-open")).toBe(
			false,
		);
		expect(btn.getAttribute("aria-expanded")).toBe("false");
		expect(btn.getAttribute("aria-label")).toBe("Open navigation");
	});

	it("closes nav when Escape is pressed while open", () => {
		const btn = document.querySelector<HTMLButtonElement>(
			".nav-toggle",
		) as HTMLButtonElement;
		btn.click();
		document.dispatchEvent(
			new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
		);
		expect(document.querySelector("nav")?.classList.contains("nav-open")).toBe(
			false,
		);
	});

	it("closes nav when a nav link is clicked", () => {
		const btn = document.querySelector<HTMLButtonElement>(
			".nav-toggle",
		) as HTMLButtonElement;
		btn.click();
		const link = document.querySelector<HTMLAnchorElement>(
			".nav-links a",
		) as HTMLAnchorElement;
		link.click();
		expect(document.querySelector("nav")?.classList.contains("nav-open")).toBe(
			false,
		);
	});

	it("Tab on last link wraps focus to the toggle button", () => {
		const btn = document.querySelector<HTMLButtonElement>(
			".nav-toggle",
		) as HTMLButtonElement;
		btn.click();
		const links = document.querySelectorAll<HTMLAnchorElement>(".nav-links a");
		const lastLink = links[links.length - 1];
		lastLink.focus();
		document.dispatchEvent(
			new KeyboardEvent("keydown", {
				key: "Tab",
				shiftKey: false,
				bubbles: true,
				cancelable: true,
			}),
		);
		expect(document.activeElement).toBe(btn);
	});

	it("Shift+Tab on the toggle button wraps focus to the last link", () => {
		const btn = document.querySelector<HTMLButtonElement>(
			".nav-toggle",
		) as HTMLButtonElement;
		btn.click();
		btn.focus();
		document.dispatchEvent(
			new KeyboardEvent("keydown", {
				key: "Tab",
				shiftKey: true,
				bubbles: true,
				cancelable: true,
			}),
		);
		const links = document.querySelectorAll<HTMLAnchorElement>(".nav-links a");
		expect(document.activeElement).toBe(links[links.length - 1]);
	});

	it("does not throw when nav elements are absent", () => {
		document.body.textContent = "";
		expect(() => initNavToggle()).not.toThrow();
	});
});

function buildActiveNavFixture() {
	document.body.textContent = "";
	const nav = document.createElement("nav");
	const ul = document.createElement("ul");
	ul.className = "nav-links";
	for (const id of ["wealth", "labor"]) {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.href = `#${id}`;
		a.textContent = id;
		li.appendChild(a);
		ul.appendChild(li);
	}
	nav.appendChild(ul);
	document.body.appendChild(nav);

	for (const id of ["wealth", "labor"]) {
		const section = document.createElement("section");
		section.id = id;
		document.body.appendChild(section);
	}
}

describe("initActiveNav", () => {
	beforeEach(() => {
		clearObservers();
		buildActiveNavFixture();
	});

	it("observes all section[id] elements", () => {
		initActiveNav();
		const observer = getObservers()[0];
		const sections = document.querySelectorAll("section[id]");
		expect(observer.targets).toHaveLength(sections.length);
		for (const section of sections) {
			expect(observer.targets).toContain(section);
		}
	});

	it("adds nav-active to the matching link on intersection", () => {
		initActiveNav();
		const section = document.getElementById("wealth") as HTMLElement;
		triggerIntersection(getObservers()[0], section, true);
		const link = document.querySelector('a[href="#wealth"]') as HTMLElement;
		expect(link.classList.contains("nav-active")).toBe(true);
	});

	it("removes nav-active from other links when a new section intersects", () => {
		initActiveNav();
		const wealth = document.getElementById("wealth") as HTMLElement;
		const labor = document.getElementById("labor") as HTMLElement;
		triggerIntersection(getObservers()[0], wealth, true);
		triggerIntersection(getObservers()[0], labor, true);
		const wealthLink = document.querySelector(
			'a[href="#wealth"]',
		) as HTMLElement;
		const laborLink = document.querySelector('a[href="#labor"]') as HTMLElement;
		expect(wealthLink.classList.contains("nav-active")).toBe(false);
		expect(laborLink.classList.contains("nav-active")).toBe(true);
	});

	it("uses the correct rootMargin", () => {
		initActiveNav();
		expect(getObservers()[0].options?.rootMargin).toBe("-20% 0px -60% 0px");
	});

	it("does not throw when nav links or sections are absent", () => {
		document.body.textContent = "";
		expect(() => initActiveNav()).not.toThrow();
		expect(getObservers()).toHaveLength(0);
	});
});
