import { createContext } from "react"

export type NetworkConnectivityContextInfo = {
	onLine: boolean
}

const NetworkConnectivityContext = createContext<NetworkConnectivityContextInfo>({
	onLine: true,
})

export default NetworkConnectivityContext
