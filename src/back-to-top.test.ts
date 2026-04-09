import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	clearObservers,
	getObservers,
	triggerIntersection,
} from "./__mocks__/setup";
import { initBackToTop } from "./scripts/back-to-top";

function buildFixture(): { btn: HTMLButtonElement; hero: HTMLElement } {
	const btn = document.createElement("button");
	btn.className = "back-to-top";
	const hero = document.createElement("section");
	hero.id = "hero";
	document.body.appendChild(btn);
	document.body.appendChild(hero);
	return { btn, hero };
}

describe("initBackToTop", () => {
	beforeEach(() => {
		document.body.textContent = "";
		clearObservers();
	});

	it("does not create observers when button is absent", () => {
		const hero = document.createElement("section");
		hero.id = "hero";
		document.body.appendChild(hero);
		initBackToTop();
		expect(getObservers()).toHaveLength(0);
	});

	it("does not create observers when hero is absent", () => {
		const btn = document.createElement("button");
		btn.className = "back-to-top";
		document.body.appendChild(btn);
		initBackToTop();
		expect(getObservers()).toHaveLength(0);
	});

	it("observes the hero element", () => {
		const { hero } = buildFixture();
		initBackToTop();
		expect(getObservers()).toHaveLength(1);
		expect(getObservers()[0].targets).toContain(hero);
	});

	it("hides button when hero is intersecting", () => {
		const { btn, hero } = buildFixture();
		btn.hidden = false;
		btn.classList.add("visible");
		initBackToTop();
		triggerIntersection(getObservers()[0], hero, true);
		expect(btn.hidden).toBe(true);
		expect(btn.classList.contains("visible")).toBe(false);
	});

	it("shows button when hero is not intersecting", () => {
		vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
			cb(0);
			return 0;
		});
		const { btn, hero } = buildFixture();
		btn.hidden = true;
		initBackToTop();
		triggerIntersection(getObservers()[0], hero, false);
		expect(btn.hidden).toBe(false);
		expect(btn.classList.contains("visible")).toBe(true);
	});

	it("scrolls to top on click", () => {
		const scrollTo = vi.fn();
		vi.stubGlobal("scrollTo", scrollTo);
		const { btn } = buildFixture();
		initBackToTop();
		btn.click();
		expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
	});
});
