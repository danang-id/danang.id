import React, { ReactNode, useEffect, useMemo, useState } from "react"

import useLogger from "@/features/logger/logger.hook"
import NetworkConnectivityContext, {
	NetworkConnectivityContextInfo,
} from "@/features/network-connectivity/network-connectivity.context"

interface NetworkConnectivityProviderProps {
	children: ReactNode
}

function NetworkConnectivityProvider({ children }: NetworkConnectivityProviderProps) {
	const logger = useLogger(NetworkConnectivityProvider)
	const [onLine, setOnLine] = useState<boolean>(
		"navigator" in window ? window.navigator.onLine : true
	)
	const value = useMemo<NetworkConnectivityContextInfo>(() => ({ onLine }), [onLine])

	function onNetworkConnectivityChanged(event: Event) {
		switch (event.type) {
			case "offline":
				setOnLine(false)
				break
			case "online":
				setOnLine(true)
				break
			default:
			// Intentionally empty
		}
	}

	useEffect(() => {
		window.addEventListener("offline", onNetworkConnectivityChanged)
		window.addEventListener("online", onNetworkConnectivityChanged)
		return () => {
			window.removeEventListener("offline", onNetworkConnectivityChanged)
			window.removeEventListener("online", onNetworkConnectivityChanged)
		}
	}, [])

	useEffect(() => {
		if (onLine) {
			logger.info("Status: online")
		} else {
			logger.warn("Status: offline")
		}
	}, [onLine])

	return (
		<NetworkConnectivityContext.Provider value={value}>
			{children}
		</NetworkConnectivityContext.Provider>
	)
}

export default NetworkConnectivityProvider
