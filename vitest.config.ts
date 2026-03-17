import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "happy-dom",
		css: false,
		setupFiles: ["src/__mocks__/setup.ts"],
		clearMocks: true,
		restoreMocks: true,
		include: ["src/**/*.test.ts"],
	},
});
