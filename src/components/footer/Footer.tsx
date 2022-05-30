import "@/components/footer/footer.css"

import { Temporal } from "@js-temporal/polyfill"
import classNames from "classnames"
import React, { CSSProperties } from "react"
import { useTranslation } from "react-i18next"

import config from "@/common/config"
import LanguageSelector from "@/components/language-selector/LanguageSelector"

export interface FooterProps {
	className?: string
	style?: CSSProperties
}

function Footer({ className, style }: FooterProps) {
	const { t } = useTranslation("footer")

	return (
		<div className={classNames("footer", className)} style={style}>
			<LanguageSelector />
			<div className="copyright-and-application-information">
				<div className="copyright">
					© {Temporal.Now.plainDateISO().year} {t("common:name.first", "Danang")}&nbsp;
					{t("common:name.last", "Galuh Tegar Prasetyo")}.
				</div>
				<div className="version">
					{config.application.name} v{config.application.version} (build&nbsp;
					{config.application.build})
				</div>
				<a
					className="view-source-link"
					href={config.application.sourceUrl}
					target="_blank"
					rel="noreferrer"
				>
					{t("link.viewSource", "View Source")}
				</a>
			</div>
		</div>
	)
}

export default Footer
