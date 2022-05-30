import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"

import useLogger from "@/features/logger/logger.hook"
import ErrorPage from "@/pages/errors/ErrorPage"

function NotFoundPage() {
	const location = useLocation()
	const logger = useLogger(NotFoundPage)
	const navigate = useNavigate()
	const { t } = useTranslation("error")

	function onBackButtonClicked() {
		navigate(-1)
	}

	function onHomePageButtonClicked() {
		navigate("/")
	}

	useEffect(() => {
		logger.warn("Page not found, location:", location.pathname + location.search)
	}, [])

	return (
		<ErrorPage
			documentTitle={t("notFound.documentTitle", "Page Not Found")}
			title={t("notFound.title", "Oops!")}
			message={t("notFound.message", "The page you are looking for is not found.")}
		>
			<button type="button" className="back-button" onClick={onBackButtonClicked}>
				{t("button.back", "Back")}
			</button>
			&nbsp; &nbsp;
			<button type="button" className="home-page-button" onClick={onHomePageButtonClicked}>
				{t("button.homePage", "Home Page")}
			</button>
		</ErrorPage>
	)
}

export default NotFoundPage
