import { useContext } from "react"

import NetworkConnectivityContext from "@/features/network-connectivity/network-connectivity.context"

function useNetworkConnectivity() {
	return useContext(NetworkConnectivityContext)
}

export default useNetworkConnectivity
