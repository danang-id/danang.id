import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"

import useLogger from "@/features/logger/logger.hook"
import ErrorPage from "@/pages/errors/ErrorPage"

function OfflinePage() {
	const logger = useLogger(OfflinePage)
	const { t } = useTranslation("error")

	useEffect(() => {
		logger.warn("Offline state detected")
		return () => {
			logger.info("Online state detected")
		}
	}, [])

	return (
		<ErrorPage
			documentTitle={t("offline.documentTitle", "Network Offline")}
			title={t("offline.title", "Oops!")}
			message={t(
				"offline.message",
				"You are seems to be offline. Please make sure you are connected to the Internet to access this application."
			)}
		/>
	)
}

export default OfflinePage
