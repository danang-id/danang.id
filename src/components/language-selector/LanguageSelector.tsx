import "@/components/language-selector/language-selector.css"

import classNames from "classnames"
import React, { ChangeEvent, CSSProperties } from "react"
import { useTranslation } from "react-i18next"

import useLogger from "@/features/logger/logger.hook"

export interface LanguageSelectorProps {
	className?: string
	style?: CSSProperties
}

function LanguageSelector({ className, style }: LanguageSelectorProps) {
	const logger = useLogger(LanguageSelector)
	const { i18n } = useTranslation()

	function onLanguageChanged(event: ChangeEvent<HTMLSelectElement>) {
		i18n.changeLanguage(event.target.value).catch(logger.error)
	}
	return (
		<select
			className={classNames("language-selector", className)}
			style={style}
			onChange={onLanguageChanged}
			value={i18n.language}
		>
			<option value="en">English (International)</option>
			<option value="id">Bahasa Indonesia</option>
		</select>
	)
}

export default LanguageSelector
