import { beforeEach, describe, expect, it } from "vitest";
import { mockMatchMedia } from "./__mocks__/setup";
import { initNavToggle, initTickerPause } from "./main";

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
		["#history", "History"],
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

function buildTickerFixture() {
	document.body.textContent = "";
	const ticker = document.createElement("div");
	ticker.className = "ticker";
	ticker.textContent = "content";
	document.body.appendChild(ticker);

	const btn = document.createElement("button");
	btn.className = "ticker-pause";
	btn.setAttribute("aria-pressed", "false");
	btn.setAttribute("aria-label", "Pause ticker");
	document.body.appendChild(btn);
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

describe("initTickerPause", () => {
	beforeEach(() => {
		mockMatchMedia(false);
		buildTickerFixture();
		initTickerPause();
	});

	it("pauses the ticker and updates aria attributes on first click", () => {
		const btn = document.querySelector<HTMLButtonElement>(
			".ticker-pause",
		) as HTMLButtonElement;
		const ticker = document.querySelector<HTMLElement>(
			".ticker",
		) as HTMLElement;
		btn.click();
		expect(ticker.style.animationPlayState).toBe("paused");
		expect(btn.getAttribute("aria-pressed")).toBe("true");
		expect(btn.getAttribute("aria-label")).toBe("Play ticker");
	});

	it("resumes the ticker and updates aria attributes on second click", () => {
		const btn = document.querySelector<HTMLButtonElement>(
			".ticker-pause",
		) as HTMLButtonElement;
		const ticker = document.querySelector<HTMLElement>(
			".ticker",
		) as HTMLElement;
		btn.click();
		btn.click();
		expect(ticker.style.animationPlayState).toBe("running");
		expect(btn.getAttribute("aria-pressed")).toBe("false");
		expect(btn.getAttribute("aria-label")).toBe("Pause ticker");
	});

	it("does not throw when ticker elements are absent", () => {
		document.body.textContent = "";
		expect(() => initTickerPause()).not.toThrow();
	});
});
