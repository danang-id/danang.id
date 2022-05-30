// noinspection SpellCheckingInspection

import buildFile from "../../build.json"
import { name, repository, version } from "../../package.json"

const now = new Date()
const monthDigitList = "ABCDEFGHIJKL"
const dateDigitList = "abcdefghijklmnopqrstuvwxyzABCDE"
const yearDigit = now.getFullYear().toString().substring(2)
const monthDigit = monthDigitList.charAt(now.getMonth())
const dateDigit = dateDigitList.charAt(now.getDate() - 1)
const timeDigit = now.getHours() >= 10 ? now.getHours().toString() : `0${now.getHours()}`

const build =
	__VITE_MODE__ === "production"
		? buildFile.number ?? "00000000"
		: yearDigit + monthDigit + dateDigit + timeDigit

const config = {
	mode: __VITE_MODE__,
	application: {
		name,
		version,
		build,
		title: import.meta.env.VITE_APP_TITLE ?? "Danang Galuh Tegar Prasetyo",
		description: import.meta.env.VITE_APP_DESCRIPTION ?? "Full-Stack Software Developer",
		sourceUrl: repository.url,
	},
	developerMenu: {
		enabled: __VITE_MODE__ === "development",

		enable(enabled = true, force = false) {
			if (__VITE_MODE__ !== "development" && !force) {
				return
			}

			this.enabled = enabled
		},
	},
	engine: {
		baseUrl: import.meta.env.VITE_ENGINE_BASE_URL ?? "https://engine.danang.id/",
		version: import.meta.env.VITE_ENGINE_VERSION ?? "1.0.0",
	},
	cloudinary: {
		cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
	},
	googleRecaptcha: {
		siteKey: import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY,
	},
	googleAnalytics: {
		measurementID: import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID,
	},
	i18n: {
		debug: import.meta.env.VITE_I18N_DEBUG == true ?? __VITE_MODE__ !== "production",
	},
	sentry: {
		DSN: import.meta.env.VITE_SENTRY_DSN,
	},
}

export default config
