import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import HttpBackend from "i18next-http-backend"
import { initReactI18next } from "react-i18next"

import config from "@/common/config"

i18n.use(HttpBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	// https://www.i18next.com/overview/configuration-options
	.init({
		supportedLngs: ["en", "id"],
		nonExplicitSupportedLngs: false,
		fallbackLng: "en",
		debug: config.i18n.debug,
		interpolation: {
			escapeValue: false,
		},
	})
	.catch(console.error)

export default i18n
