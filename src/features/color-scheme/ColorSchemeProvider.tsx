import React, { ReactNode, useEffect, useMemo, useState } from "react"

import ColorSchemeContext, {
	ColorScheme,
	ColorSchemeContextInfo,
} from "@/features/color-scheme/color-scheme.context"
import useLogger from "@/features/logger/logger.hook"

interface ColorSchemeProviderProps {
	children: ReactNode
}

function ColorSchemeProvider({ children }: ColorSchemeProviderProps) {
	const logger = useLogger(ColorSchemeProvider)
	const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null>(null)
	const [colorScheme, setColorScheme] = useState<ColorScheme>("light")
	const value = useMemo<ColorSchemeContextInfo>(
		() => [colorScheme, setColorScheme],
		[colorScheme]
	)

	function onMediaMatches(matches: boolean) {
		setColorScheme(matches ? "dark" : "light")
	}

	function onMediaQueryListChanged(event: MediaQueryListEvent) {
		if (event.type === "change") {
			onMediaMatches(event.matches)
		}
	}

	useEffect(() => {
		if ("matchMedia" in window) {
			setMediaQueryList(window.matchMedia("(prefers-color-scheme: dark)"))
		}
	}, [])

	useEffect(() => {
		if (mediaQueryList !== null) {
			onMediaMatches(mediaQueryList.matches)

			if ("addEventListener" in mediaQueryList) {
				mediaQueryList.addEventListener("change", onMediaQueryListChanged)
			} else if ("addListener" in mediaQueryList) {
				// @ts-expect-error just ignore
				// noinspection JSDeprecatedSymbols
				mediaQueryList.addListener(onMediaQueryListChanged)
			} else {
				logger.warn("Unable to add event listener to non-null media query list.")
			}
		}
		return () => {
			if (mediaQueryList !== null) {
				if ("removeEventListener" in mediaQueryList) {
					mediaQueryList.removeEventListener("change", onMediaQueryListChanged)
				} else if ("removeListener" in mediaQueryList) {
					// @ts-expect-error just ignore
					// noinspection JSDeprecatedSymbols
					mediaQueryList.removeListener(onMediaQueryListChanged)
				} else {
					logger.warn("Unable to remove event listener from non-null media query list.")
				}
			}
		}
	}, [mediaQueryList])

	useEffect(() => {
		logger.info("Color Scheme: " + colorScheme)

		// TailwindCSS Dark Mode: Set "dark" class when dark color scheme is active.
		// daisyUI Theme: Set "data-theme" attribute to the active color scheme.
		if (colorScheme === "dark") {
			document.documentElement.classList.add("dark")
			document.documentElement.setAttribute("data-theme", "dark")
		} else {
			document.documentElement.classList.remove("dark")
			document.documentElement.setAttribute("data-theme", "light")
		}
	}, [colorScheme])

	return <ColorSchemeContext.Provider value={value}>{children}</ColorSchemeContext.Provider>
}

export default ColorSchemeProvider
