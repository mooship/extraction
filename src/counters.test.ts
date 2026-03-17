import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockMatchMedia } from "./__mocks__/setup";
import { initCounters } from "./counters";

function buildStatBox(target: string | null, prefix: string, suffix: string) {
	document.body.textContent = "";
	const box = document.createElement("div");
	box.className = "stat-box";
	const num = document.createElement("span");
	num.className = "num";
	if (target !== null) {
		num.dataset.target = target;
	}
	num.dataset.prefix = prefix;
	num.dataset.suffix = suffix;
	box.appendChild(num);
	document.body.appendChild(box);
}

describe("initCounters", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.unstubAllGlobals();
	});

	it("sets the final value directly when prefers-reduced-motion is set", () => {
		mockMatchMedia(true);
		buildStatBox("100", "$", "%");
		initCounters();
		vi.advanceTimersByTime(600);
		expect((document.querySelector(".num") as HTMLElement).textContent).toBe(
			"$100%",
		);
	});

	it("animates to the final value without reduced motion", () => {
		mockMatchMedia(false);
		let mockNow = 0;
		vi.stubGlobal("performance", { now: () => mockNow });
		vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
			mockNow += 2000;
			cb(mockNow);
			return 0;
		});
		buildStatBox("100", "$", "%");
		initCounters();
		vi.advanceTimersByTime(600);
		expect((document.querySelector(".num") as HTMLElement).textContent).toBe(
			"$100%",
		);
	});

	it("applies data-prefix and data-suffix", () => {
		mockMatchMedia(true);
		buildStatBox("42", "~", "x");
		initCounters();
		vi.advanceTimersByTime(600);
		expect((document.querySelector(".num") as HTMLElement).textContent).toBe(
			"~42x",
		);
	});

	it("defaults to 0 when data-target is absent", () => {
		mockMatchMedia(true);
		buildStatBox(null, "#", "");
		initCounters();
		vi.advanceTimersByTime(600);
		expect((document.querySelector(".num") as HTMLElement).textContent).toBe(
			"#0",
		);
	});
});
