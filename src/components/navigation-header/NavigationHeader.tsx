import "@/components/navigation-header/navigation-header.css"

import React from "react"
import { useTranslation } from "react-i18next"
import Image from "react-image-webp"
import { Link } from "react-router-dom"

import NavigationBrandingDarkImage from "@/assets/navigation-branding-dark.png"
import NavigationBrandingDarkWebPImage from "@/assets/navigation-branding-dark.webp"
import NavigationBrandingLightImage from "@/assets/navigation-branding-light.png"
import NavigationBrandingLightWebPImage from "@/assets/navigation-branding-light.webp"
import ColorSchemeSwitcher from "@/components/color-scheme-switcher/ColorSchemeSwitcher"
import LanguageSelector from "@/components/language-selector/LanguageSelector"
import useColorScheme from "@/features/color-scheme/color-scheme.hook"

export interface NavigationHeaderProps {
	showBrandingFullName?: boolean
}

function NavigationHeader({ showBrandingFullName = false }: NavigationHeaderProps) {
	const [colorScheme] = useColorScheme()
	const { t } = useTranslation()

	const firstName = t("common:name.first", "Danang")
	const lastName = t("common:name.last", "Galuh Tegar Prasetyo")
	const fullName = `${firstName} ${lastName}`

	return (
		<div className="navigation-header">
			<Link to={{ pathname: "/" }}>
				<Image
					alt={fullName}
					src={
						colorScheme === "dark"
							? NavigationBrandingDarkImage
							: NavigationBrandingLightImage
					}
					webp={
						colorScheme === "dark"
							? NavigationBrandingDarkWebPImage
							: NavigationBrandingLightWebPImage
					}
				/>
			</Link>

			{showBrandingFullName && (
				<Link to={{ pathname: "/" }}>
					<div className="branding">
						<span className="first-name">{firstName}</span>&nbsp;
						<span className="last-name">{lastName}</span>
					</div>
				</Link>
			)}

			<ColorSchemeSwitcher />

			<LanguageSelector />
		</div>
	)
}

export default NavigationHeader
