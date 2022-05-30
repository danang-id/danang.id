import React, { useEffect, useState } from "react"
import { FallbackProps } from "react-error-boundary"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import environment from "@/common/environment"
import useLogger from "@/features/logger/logger.hook"
import ErrorPage from "@/pages/errors/ErrorPage"

interface FallbackPageProps extends FallbackProps {
	error: Error & { supportId?: string }
}

function FallbackPage({ error, resetErrorBoundary }: FallbackPageProps) {
	const [showMessage, setShowMessage] = useState<boolean>(false)
	const logger = useLogger(FallbackPage)
	const navigate = useNavigate()
	const { t } = useTranslation("error")

	function onBackButtonClicked() {
		navigate(-1)
		resetErrorBoundary()
	}

	function onHomePageButtonClicked() {
		navigate("/")
		resetErrorBoundary()
	}

	useEffect(() => {
		const hasErrorMessage = typeof error?.message !== "undefined" && error.message.length > 0
		setShowMessage(environment.isDevelopment() && hasErrorMessage)
		if (hasErrorMessage) {
			logger.error(error)
		}
	}, [error])

	return (
		<ErrorPage
			documentTitle={t("fallback.documentTitle", "Error Occurred")}
			title={t("fallback.title", "Something went wrong")}
			message={
				showMessage
					? error?.message
					: t("fallback.message", "We are sorry about that. You may try again later.")
			}
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

export default FallbackPage
