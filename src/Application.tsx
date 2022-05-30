import React from "react"

import ApplicationBase from "@/ApplicationBase"
import config from "@/common/config"
import lazy from "@/common/lazy"
import useNetworkConnectivity from "@/features/network-connectivity/network-connectivity.hook"
import OfflinePage from "@/pages/errors/OfflinePage"
import RootRoutes from "@/pages/RootRoutes"

const DeveloperMenu = config.developerMenu.enabled
	? lazy(() => import("@/components/developer-menu/DeveloperMenu"))
	: lazy(() => import("@/components/developer-menu/NoDeveloperMenu"))

function Application() {
	const { onLine } = useNetworkConnectivity()

	if (!onLine) {
		return (
			<ApplicationBase>
				<OfflinePage />
			</ApplicationBase>
		)
	}

	return (
		<ApplicationBase>
			<DeveloperMenu />
			<RootRoutes />
		</ApplicationBase>
	)
}

export default Application
