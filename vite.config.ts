import react from "@vitejs/plugin-react"
import * as path from "path"
import mkcert from "vite-plugin-mkcert"
import { VitePWA } from "vite-plugin-pwa"
import { qrcode } from "vite-plugin-qrcode"
import terminal from "vite-plugin-terminal"
import { defineConfig } from "vitest/config"

import pwaConfig from "./vite-pwa.config"
import terminalConfig from "./vite-terminal.config"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		define: {
			__VITE_MODE__: JSON.stringify(mode),
		},
		plugins: [terminal(terminalConfig), mkcert(), qrcode(), react(), VitePWA(pwaConfig)],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		server: {
			cors: true,
			host: false,
			https: true,
			port: 3000,
			strictPort: true,
		},
		test: {
			dir: "tests",
			environment: "jsdom",
			globals: true,
		},
	}
})
