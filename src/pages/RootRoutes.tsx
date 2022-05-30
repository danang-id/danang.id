import "@/i18n"

import React from "react"
import { Route, Routes } from "react-router-dom"

import lazy from "@/common/lazy"

const HomePage = lazy(() => import("@/pages/home/HomePage"))
const NotFoundPage = lazy(() => import("@/pages/errors/NotFoundPage"))

function RootRoutes() {
	return (
		<Routes>
			<Route index element={<HomePage />} />

			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	)
}

export default RootRoutes
