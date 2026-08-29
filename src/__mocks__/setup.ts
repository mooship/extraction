/**
 * Global Vitest setup (registered as `vitest.config.ts`'s `setupFiles`).
 * Stubs `IntersectionObserver` and `matchMedia`, neither of which exist in
 * the happy-dom test environment, so `src/scripts/*.ts` can be imported
 * and exercised directly against a hand-built DOM fixture.
 */
import { vi } from "vitest";

type IntersectionCallback = (entries: IntersectionObserverEntry[]) => void;

export type MockObserver = {
	cb: IntersectionCallback;
	options: IntersectionObserverInit | undefined;
	targets: Element[];
	observe: (el: Element) => void;
	unobserve: (el: Element) => void;
	disconnect: () => void;
};

/** All `MockIntersectionObserver` instances created since the last `clearObservers()` call. */
const observers: MockObserver[] = [];

/**
 * Records every constructed instance in `observers` and tracks `observe`d
 * targets, but never fires callbacks on its own — tests trigger
 * intersections manually via `triggerIntersection`.
 */
class MockIntersectionObserver {
	cb: IntersectionCallback;
	options: IntersectionObserverInit | undefined;
	targets: Element[] = [];

	constructor(cb: IntersectionCallback, options?: IntersectionObserverInit) {
		this.cb = cb;
		this.options = options;
		observers.push(this);
	}

	observe(el: Element): void {
		this.targets.push(el);
	}

	unobserve(el: Element): void {
		this.targets = this.targets.filter((t) => t !== el);
	}

	disconnect(): void {
		this.targets = [];
	}
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

/** Manually fires `observer`'s callback with a single-entry intersection event for `el`. */
export function triggerIntersection(
	observer: MockObserver,
	el: Element,
	isIntersecting = true,
): void {
	observer.cb([{ target: el, isIntersecting } as IntersectionObserverEntry]);
}

/** Returns every `MockIntersectionObserver` constructed so far, oldest first. */
export function getObservers(): MockObserver[] {
	return observers;
}

/** Clears the observer registry; call between tests that assert on observer state. */
export function clearObservers(): void {
	observers.length = 0;
}

/**
 * Stubs `window.matchMedia` so `prefers-reduced-motion` queries resolve to
 * `prefersReducedMotion`; all other media queries resolve to `false`.
 */
export function mockMatchMedia(prefersReducedMotion = false): void {
	vi.stubGlobal("matchMedia", (query: string) => ({
		matches: prefersReducedMotion && query.includes("prefers-reduced-motion"),
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	}));
}
