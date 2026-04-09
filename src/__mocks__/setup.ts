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

const observers: MockObserver[] = [];

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

export function triggerIntersection(
	observer: MockObserver,
	el: Element,
	isIntersecting = true,
): void {
	observer.cb([{ target: el, isIntersecting } as IntersectionObserverEntry]);
}

export function getObservers(): MockObserver[] {
	return observers;
}

export function clearObservers(): void {
	observers.length = 0;
}

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
