/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-terminal/client" />
declare global {
	interface Window {
		env: Record<string, unknown>
		metadata: Record<string, unknown>
	}
}

declare const __VITE_MODE__: string

interface ImportMetaEnv {
	readonly VITE_APP_TITLE?: string
	readonly VITE_APP_DESCRIPTION?: string

	readonly VITE_ENGINE_BASE_URL?: string
	readonly VITE_ENGINE_VERSION?: string

	readonly VITE_CLOUDINARY_CLOUD_NAME?: string

	readonly VITE_GOOGLE_RECAPTCHA_SITE_KEY?: string

	readonly VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID?: string

	readonly VITE_I18N_DEBUG?: string | number | boolean

	readonly VITE_SENTRY_DSN?: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
