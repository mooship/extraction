import { FontaineTransform } from "fontaine";
import { defineConfig } from "vite";

export default defineConfig({
	cacheDir: "node_modules/.vite",
	plugins: [
		FontaineTransform.vite({
			fallbacks: {
				"Fraunces Variable": ["Georgia", "Times New Roman"],
				"Inter Variable": ["Arial", "Helvetica Neue"],
			},
			resolvePath: (id) => {
				if (id.startsWith("@fontsource")) {
					return new URL(`./node_modules/${id}`, import.meta.url);
				}
				return new URL(`./public${id}`, import.meta.url);
			},
		}),
	],
	build: {
		rollupOptions: {
			input: {
				main: new URL("index.html", import.meta.url).pathname,
				privacy: new URL("privacy.html", import.meta.url).pathname,
			},
		},
	},
});
