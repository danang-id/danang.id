import "@/components/developer-menu/developer-menu.css"

import React, { useEffect } from "react"
import { useErrorHandler } from "react-error-boundary"
import { IoBug, IoMoon, IoMoonOutline, IoWarning } from "react-icons/io5"
import { Action, Fab } from "react-tiny-fab"

import config from "@/common/config"
import useColorScheme from "@/features/color-scheme/color-scheme.hook"
import useLogger from "@/features/logger/logger.hook"

function DeveloperMenu() {
	const errorHandler = useErrorHandler()
	const logger = useLogger(DeveloperMenu)
	const [colorScheme, setColorScheme] = useColorScheme()

	function onSwitchColorSchemeButtonClicked() {
		const newColorScheme = colorScheme === "dark" ? "light" : "dark"
		logger.info("Color scheme set to: " + newColorScheme)
		setColorScheme(newColorScheme)
	}

	function onThrowError() {
		const error = new Error("This is a fake error thrown by the developer.")
		errorHandler(error)
	}

	useEffect(() => {
		logger.info("Development environment detected.")
	}, [])

	if (!config.developerMenu.enabled) {
		return null
	}

	return (
		<div className="developer-menu">
			<Fab event="hover" icon={<IoBug />} text="Developer Menu">
				<Action text="Switch Light/Dark Mode" onClick={onSwitchColorSchemeButtonClicked}>
					{colorScheme === "dark" ? <IoMoon /> : <IoMoonOutline />}
				</Action>
				<Action text="Throw Error" onClick={onThrowError}>
					<IoWarning />
				</Action>
			</Fab>
		</div>
	)
}

export default DeveloperMenu
