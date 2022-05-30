import React, { ReactNode, useEffect, useMemo, useRef } from "react"

import config from "@/common/config"
import useColorScheme from "@/features/color-scheme/color-scheme.hook"
import MetaContext, { MetaContextInfo } from "@/features/meta/meta.context"

interface MetaProviderProps {
	children: ReactNode
}

function MetaProvider({ children }: MetaProviderProps) {
	const applicationTitle = config.application.title
	const [colorScheme] = useColorScheme()

	document.title = applicationTitle

	function setTitle(title?: string) {
		useEffect(() => {
			document.title = !title ? applicationTitle : `${title} - ${applicationTitle}`
			return () => {
				document.title = applicationTitle
			}
		}, [])
	}

	function onInit() {
		const applicationTitle = config.application.title

		const appleMobileWebAppTitle = document.getElementById(
			"head-meta-apple-mobile-web-app-title"
		) as HTMLMetaElement | null
		if (appleMobileWebAppTitle) {
			appleMobileWebAppTitle.content = applicationTitle
		}

		const applicationName = document.getElementById(
			"head-meta-application-name"
		) as HTMLMetaElement | null
		if (applicationName) {
			applicationName.content = applicationTitle
		}

		onColorSchemeChanged()
	}

	function onColorSchemeChanged() {
		const appleTouchIcon = document.getElementById(
			"head-link-apple-touch-icon"
		) as HTMLLinkElement | null
		if (appleTouchIcon) {
			appleTouchIcon.href = `/assets/${colorScheme}/apple-touch-icon.png`
		}

		const icon32 = document.getElementById("head-link-icon-32") as HTMLLinkElement | null
		if (icon32) {
			icon32.href = `/assets/${colorScheme}/favicon-32x32.png`
		}

		const icon16 = document.getElementById("head-link-icon-16") as HTMLLinkElement | null
		if (icon16) {
			icon16.href = `/assets/${colorScheme}/favicon-16x16.png`
		}

		const maskIcon = document.getElementById("head-link-mask-icon") as HTMLLinkElement | null
		if (maskIcon) {
			maskIcon.href = `/assets/${colorScheme}/safari-pinned-tab.svg`
		}

		const msapplicationTileColor = document.getElementById(
			"head-meta-msapplication-TileColor"
		) as HTMLMetaElement | null
		if (msapplicationTileColor) {
			msapplicationTileColor.content = colorScheme === "light" ? "#E1DDDC" : "#121212"
		}
	}

	useEffect(onInit, [])
	useEffect(onColorSchemeChanged, [colorScheme])

	const value = useMemo<MetaContextInfo>(
		() => ({
			title: document.title,
			setTitle,
		}),
		[document.title]
	)

	return <MetaContext.Provider value={value}>{children}</MetaContext.Provider>
}

export default MetaProvider
