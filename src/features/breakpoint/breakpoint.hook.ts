import { useContext } from "react"

import BreakpointContext from "@/features/breakpoint/breakpoint.context"

function useBreakpoint() {
	return useContext(BreakpointContext)
}

export default useBreakpoint
