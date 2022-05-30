import "@/layouts/base/base-layout.css"

import classNames from "classnames"
import React, { CSSProperties, ReactNode } from "react"

import Footer from "@/components/footer/Footer"
import NavigationHeader from "@/components/navigation-header/NavigationHeader"

export interface BaseLayoutProps {
	children?: ReactNode
	className?: string
	disableNavigationHeader?: boolean
	disableFooter?: boolean
	ignoreTheme?: boolean
	showBrandingFullName?: boolean
	style?: CSSProperties
}

function BaseLayout({
	children,
	className,
	disableNavigationHeader = false,
	disableFooter = false,
	ignoreTheme = false,
	showBrandingFullName = false,
	style,
}: BaseLayoutProps) {
	const layoutClassName = classNames("layout", { "layout-theme": !ignoreTheme })
	const layoutContainerClassName = classNames("layout-container", className)

	return (
		<div className={layoutClassName}>
			{disableNavigationHeader ? (
				<></>
			) : (
				<NavigationHeader showBrandingFullName={showBrandingFullName} />
			)}
			<div className={layoutContainerClassName} style={style}>
				{children}
			</div>
			{disableFooter ? <></> : <Footer />}
		</div>
	)
}

export default BaseLayout
