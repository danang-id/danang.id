import React, { ReactNode, Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { BrowserRouter } from "react-router-dom"

import FallbackPage from "./pages/errors/FallbackPage"
import LoadingPage from "./pages/misc/LoadingPage"

export interface ApplicationBaseProps {
	children: ReactNode
}

function ApplicationBase({ children }: ApplicationBaseProps) {
	return (
		<BrowserRouter>
			<ErrorBoundary FallbackComponent={FallbackPage}>
				<Suspense fallback={<LoadingPage />}>{children}</Suspense>
			</ErrorBoundary>
		</BrowserRouter>
	)
}

export default ApplicationBase
