import "@/pages/errors/error-page.css"

import React, { ReactNode } from "react"

import useMeta from "@/features/meta/meta.hook"
import BaseLayout from "@/layouts/base/BaseLayout"

export interface ErrorPageProps {
	documentTitle: string
	title: string
	message: string
	children?: ReactNode
}

function ErrorPage({ children, documentTitle, title, message }: ErrorPageProps) {
	const meta = useMeta()
	meta.setTitle(documentTitle)

	return (
		<BaseLayout className="error-page">
			<div className="content">
				<p className="title">{title}</p>
				<p className="description">{message}</p>
			</div>

			<div className="click-to-action">{children}</div>
		</BaseLayout>
	)
}

export default ErrorPage
