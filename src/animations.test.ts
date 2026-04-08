import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	clearObservers,
	getObservers,
	mockMatchMedia,
	triggerIntersection,
} from "./__mocks__/setup";
import { initAnimations } from "./animations";

function buildFixture(heroRevealCount: number, outerRevealCount: number) {
	document.body.textContent = "";
	const hero = document.createElement("div");
	hero.id = "hero";
	for (let i = 0; i < heroRevealCount; i++) {
		const el = document.createElement("div");
		el.className = "reveal";
		el.id = `hero-reveal-${i}`;
		hero.appendChild(el);
	}
	document.body.appendChild(hero);
	for (let i = 0; i < outerRevealCount; i++) {
		const el = document.createElement("div");
		el.className = i % 2 === 0 ? "reveal" : "reveal-left";
		el.id = `outer-reveal-${i}`;
		document.body.appendChild(el);
	}
}

describe("initAnimations", () => {
	beforeEach(() => {
		mockMatchMedia(false);
		clearObservers();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("observes all .reveal and .reveal-left elements", () => {
		buildFixture(1, 2);
		initAnimations();
		expect(getObservers()[0].targets).toHaveLength(3);
	});

	it("adds .visible when observer fires with isIntersecting true", () => {
		buildFixture(0, 1);
		initAnimations();
		const el = document.getElementById("outer-reveal-0") as HTMLElement;
		triggerIntersection(getObservers()[0], el, true);
		expect(el.classList.contains("visible")).toBe(true);
	});

	it("does not add .visible when isIntersecting is false", () => {
		buildFixture(0, 1);
		initAnimations();
		const el = document.getElementById("outer-reveal-0") as HTMLElement;
		triggerIntersection(getObservers()[0], el, false);
		expect(el.classList.contains("visible")).toBe(false);
	});

	it("unobserves the element after adding .visible", () => {
		buildFixture(0, 1);
		initAnimations();
		const obs = getObservers()[0];
		const el = document.getElementById("outer-reveal-0") as HTMLElement;
		triggerIntersection(obs, el, true);
		expect(obs.targets).not.toContain(el);
	});

	it("makes #hero .reveal elements visible immediately", () => {
		buildFixture(1, 0);
		initAnimations();
		const el = document.getElementById("hero-reveal-0") as HTMLElement;
		expect(el.classList.contains("visible")).toBe(true);
	});

	it("does not create an observer when prefers-reduced-motion is set", () => {
		mockMatchMedia(true);
		buildFixture(0, 1);
		initAnimations();
		expect(getObservers()).toHaveLength(0);
	});
});
