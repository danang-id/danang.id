import "@/pages/misc/loading-page.css"

import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import Image from "react-image-webp"

import RhombusDarkAnimation from "@/assets/rhombus-dark.png"
import RhombusDarkWebPAnimation from "@/assets/rhombus-dark.webp"
import RhombusLightAnimation from "@/assets/rhombus-light.png"
import RhombusLightWebPAnimation from "@/assets/rhombus-light.webp"
import useColorScheme from "@/features/color-scheme/color-scheme.hook"
import BaseLayout from "@/layouts/base/BaseLayout"

export interface LoadingPageProps {
	message?: string
}

function LoadingPage({ message }: LoadingPageProps) {
	const [colorScheme] = useColorScheme()
	const { t } = useTranslation("common")

	if (!message) {
		message = t("loading.message", "Gearing up")
	}

	return (
		<BaseLayout className="loading-page" disableNavigationHeader>
			<div className="content">
				<Image
					className="animation"
					alt={message}
					src={colorScheme === "dark" ? RhombusDarkAnimation : RhombusLightAnimation}
					webp={
						colorScheme === "dark"
							? RhombusDarkWebPAnimation
							: RhombusLightWebPAnimation
					}
				/>
				<span className="message">{message}</span>
			</div>
		</BaseLayout>
	)
}

export default LoadingPage
