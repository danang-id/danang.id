import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import HttpBackend from "i18next-http-backend"
import { initReactI18next } from "react-i18next"

i18n.use(HttpBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		supportedLngs: ["en", "id"],
		nonExplicitSupportedLngs: false,
		fallbackLng: "en",
		debug: false,
		interpolation: {
			escapeValue: false,
		},
		resources: {
			en: {},
			id: {},
		},
	})
	.catch(console.error)

export default i18n
