import { createContext } from "react"

import { BreakpointName, Breakpoints, BreakpointState } from "@/features/breakpoint/breakpoint"

export type BreakpointListenCallback = (active: BreakpointState) => void
export type BreakpointListenerOptions = {
	immediate: boolean
}

export type BreakpointContextInfo = {
	actives: BreakpointName[]
	breakpoints: Breakpoints
	current: BreakpointName
	addListener: (
		name: BreakpointName,
		callback: BreakpointListenCallback,
		options?: BreakpointListenerOptions
	) => void
	isActive: (name: BreakpointName) => BreakpointState
	removeListeners: () => void
}

const BreakpointContext = createContext<BreakpointContextInfo>({
	actives: [],
	current: "",
	breakpoints: {},
	isActive: () => false,
	addListener: () => ({}),
	removeListeners: () => ({}),
})

export default BreakpointContext
