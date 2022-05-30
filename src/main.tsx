import "@/main.css"
import "@/i18n"

import React, { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { registerSW } from "virtual:pwa-register"

import Application from "@/Application"
import ApplicationProvider from "@/ApplicationProvider"
import environment from "@/common/environment"
import attachWindow from "@/window"

attachWindow()

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ApplicationProvider>
			<Application />
		</ApplicationProvider>
	</StrictMode>
)

if (environment.isProduction()) {
	const updateSW = registerSW({
		onNeedRefresh: () => {
			updateSW(true).catch(console.error)
		},
	})
}
