import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";
import path from "path";

const dev = process.env.NODE_ENV === "development";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			style: "postcss",
			postcss: true
		})
	],

	kit: {
		adapter: adapter({
			// precompress: 'br',
			fallback: "app.html"
		}),
		// paths: {
		// 	base: dev ? '' : '/static'
		// }

		vite: {
			resolve: {
				alias: {
					// these are the aliases and paths to them
					$store: path.resolve("./src/lib/store"),
					$urls: path.resolve("./src/lib/constants/backend/urls")
				}
			},
			build: {
				rollupOptions: {
					output: {
						manualChunks: {
							md5: ["md5"],
							anime: ["animejs"],
							dayjs: ["dayjs"],
							swiper: ["swiper"],
							"tippy.js": ["tippy.js"],
							// VideoJs specific
							"video.js": ["video.js"],
							"videojs-vtt.js": ["videojs-vtt.js"]
						}
					}
				}
			}
		}
	}
};

export default config;
