import { VitePWAOptions } from "vite-plugin-pwa"

const pwaConfig: Partial<VitePWAOptions> = {
	devOptions: {
		enabled: false,
	},
	manifestFilename: "site.webmanifest",
	manifest: {
		id: "danang.id",
		name: "Danang Galuh Tegar Prasetyo",
		short_name: "danang.id",
		description: "Full-Stack Software Developer",
		icons: [
			{
				src: "/assets/light/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/assets/light/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
		orientation: "natural",
		theme_color: "#DB2D2A",
		background_color: "#E1DDDC",
		display: "standalone",
		start_url: "/",
	},
	workbox: {
		runtimeCaching: [
			{
				urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
				handler: "CacheFirst",
				options: {
					cacheName: "cloudinary-resource-cache",
					expiration: {
						maxEntries: 10,
						maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
					},
					cacheableResponse: {
						statuses: [0, 200],
					},
				},
			},
			{
				urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
				handler: "CacheFirst",
				options: {
					cacheName: "google-fonts-cache",
					expiration: {
						maxEntries: 10,
						maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
					},
					cacheableResponse: {
						statuses: [0, 200],
					},
				},
			},
			{
				urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
				handler: "CacheFirst",
				options: {
					cacheName: "google-fonts-cache",
					expiration: {
						maxEntries: 10,
						maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
					},
					cacheableResponse: {
						statuses: [0, 200],
					},
				},
			},
			{
				urlPattern: ({ url }) => url.pathname.startsWith("/assets"),
				handler: "CacheFirst",
				options: {
					cacheName: "local-assets-cache",
					expiration: {
						maxEntries: 10,
						maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
					},
					cacheableResponse: {
						statuses: [0, 200],
					},
				},
			},
			{
				urlPattern: ({ url }) =>
					url.pathname.startsWith("/browserconfig.xml") &&
					url.pathname.startsWith("/favicon.ico") &&
					url.pathname.startsWith("/site.webmanifest"),
				handler: "CacheFirst",
				options: {
					cacheName: "web-metadata-cache",
					expiration: {
						maxEntries: 10,
						maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
					},
					cacheableResponse: {
						statuses: [0, 200],
					},
				},
			},
			{
				urlPattern: ({ url }) => url.pathname.startsWith("/locales"),
				handler: "CacheFirst",
				options: {
					cacheName: "local-locales-cache",
					expiration: {
						maxEntries: 10,
						maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
					},
					cacheableResponse: {
						statuses: [0, 200],
					},
				},
			},
		],
	},
}

export default pwaConfig
