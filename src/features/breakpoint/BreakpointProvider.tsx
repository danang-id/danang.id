import isEqual from "lodash.isequal"
import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react"

import { BreakpointName, getTailwindBreakpoints } from "@/features/breakpoint/breakpoint"
import BreakpointContext, {
	BreakpointContextInfo,
	BreakpointListenCallback,
	BreakpointListenerOptions,
} from "@/features/breakpoint/breakpoint.context"
import useLogger from "@/features/logger/logger.hook"

type WindowSize = {
	height: number
	width: number
}

interface BreakpointProviderProps {
	children: ReactNode
}

function BreakpointProvider({ children }: BreakpointProviderProps) {
	const breakpoints = getTailwindBreakpoints()
	const logger = useLogger(BreakpointProvider)
	const listeners = useRef<[BreakpointName, BreakpointListenCallback][]>([])
	const [actives, setActives] = useState<BreakpointName[]>(["xs"])
	const [current, setCurrent] = useState<BreakpointName>("xs")
	const [windowSize, setWindowSize] = useState<WindowSize>({
		height: 0,
		width: 0,
	})

	function isActive(name: string) {
		return actives.findIndex((n) => n === name) !== -1
	}

	function isValid(name: string) {
		return Object.keys(breakpoints).findIndex((n) => n === name) !== -1
	}

	function addListener(
		name: BreakpointName,
		callback: BreakpointListenCallback,
		options: BreakpointListenerOptions = { immediate: true }
	) {
		if (!isValid(name)) {
			throw new Error(`listen(): ${name} is not a valid breakpoint.`)
		}

		listeners.current = [...listeners.current, [name, callback]]

		if (options.immediate && typeof name === "string" && typeof callback === "function") {
			callback(isActive(name))
		}
	}

	function removeListeners() {
		listeners.current = []
	}

	function onActiveBreakpointsChanged() {
		const minWidth = breakpoints[current]
		logger.info(`Current: ${current} (min-width: ${minWidth})`)

		for (const [name, callback] of listeners.current) {
			if (typeof name === "string" && typeof callback === "function") {
				callback(isActive(name))
			}
		}
	}

	function onWindowResized() {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		})
	}

	function onWindowSizeChanged() {
		let currentBiggestWidth = 0
		let currentBreakpoint = current

		const activeBreakpoints: string[] = []
		for (const [name, minWidth] of Object.entries(breakpoints)) {
			if (!windowSize.width) {
				return
			}
			if (windowSize.width >= minWidth) {
				activeBreakpoints.push(name)

				if (minWidth > currentBiggestWidth) {
					currentBiggestWidth = minWidth
					currentBreakpoint = name
				}
			}
		}

		if (activeBreakpoints.length === 1 && currentBreakpoint !== activeBreakpoints[0]) {
			const [cb] = activeBreakpoints
			currentBreakpoint = cb
		}

		if (currentBreakpoint !== current) {
			setCurrent(currentBreakpoint)
		}
		if (!isEqual(activeBreakpoints, actives)) {
			setActives(activeBreakpoints)
		}
	}

	useEffect(() => {
		window.addEventListener("resize", onWindowResized)
		onWindowResized()

		return () => {
			removeListeners()
			window.removeEventListener("resize", onWindowResized)
		}
	}, [])

	useEffect(onWindowSizeChanged, [windowSize])

	useEffect(onActiveBreakpointsChanged, [actives])

	const value = useMemo<BreakpointContextInfo>(
		() => ({
			actives,
			current,
			breakpoints,
			isActive,
			addListener,
			removeListeners,
		}),
		[current]
	)

	return <BreakpointContext.Provider value={value}>{children}</BreakpointContext.Provider>
}

export default BreakpointProvider
