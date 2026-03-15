import { FontaineTransform } from "fontaine";
import { defineConfig } from "vite";

export default defineConfig({
	cacheDir: "node_modules/.vite",
	plugins: [
		FontaineTransform.vite({
			fallbacks: {
				"Bebas Neue": ["Impact", "Arial Narrow", "Arial"],
				"Special Elite": ["Courier New", "Courier", "Georgia"],
				"Roboto Condensed Variable": ["Arial Narrow", "Arial", "Helvetica"],
			},
			resolvePath: (id) => {
				if (id.startsWith("@fontsource")) {
					return new URL(`./node_modules/${id}`, import.meta.url);
				}
				return new URL(`./public${id}`, import.meta.url);
			},
		}),
	],
});
