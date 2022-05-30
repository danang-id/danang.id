import React, { ReactNode } from "react"

import BreakpointProvider from "@/features/breakpoint/BreakpointProvider"
import ColorSchemeProvider from "@/features/color-scheme/ColorSchemeProvider"
import MetaProvider from "@/features/meta/MetaProvider"
import NetworkConnectivityProvider from "@/features/network-connectivity/NetworkConnectivityProvider"

interface ApplicationProviderProps {
	children: ReactNode
}

function ApplicationProvider({ children }: ApplicationProviderProps) {
	return (
		<NetworkConnectivityProvider>
			<ColorSchemeProvider>
				<MetaProvider>
					<BreakpointProvider>{children}</BreakpointProvider>
				</MetaProvider>
			</ColorSchemeProvider>
		</NetworkConnectivityProvider>
	)
}

export default ApplicationProvider
