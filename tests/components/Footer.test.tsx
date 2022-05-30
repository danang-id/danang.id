import "@testing-library/jest-dom"

import { Temporal } from "@js-temporal/polyfill"
import { render, screen } from "@testing-library/react"
import React from "react"
import { I18nextProvider } from "react-i18next"
import { MemoryRouter } from "react-router-dom"
import { beforeEach, describe, expect, test } from "vitest"

import Footer from "@/components/footer/Footer"

import config from "../../src/common/config"
import i18n from "../i18n"

describe("Footer test", () => {
	beforeEach(() => {
		render(
			<I18nextProvider i18n={i18n}>
				<MemoryRouter>
					<Footer />
				</MemoryRouter>
			</I18nextProvider>
		)
	})

	test("Should show the first name", () => {
		const text = /Danang/i
		const elements = screen.getAllByText(text) as HTMLElement[]
		expect(elements[0]).toBeInTheDocument()
	})

	test("Should show the last name", () => {
		const text = /Galuh Tegar Prasetyo/i
		const elements = screen.getAllByText(text) as HTMLElement[]
		expect(elements[0]).toBeInTheDocument()
	})

	test("Should show copyright information", () => {
		const text = `© ${Temporal.Now.plainDateISO().year} Danang Galuh Tegar Prasetyo.`
		const elements = screen.getAllByText(text) as HTMLElement[]
		expect(elements[0]).toBeInTheDocument()
	})

	test("Should show the version and build information", () => {
		const text = `${config.application.name} v${config.application.version} (build ${config.application.build})`
		const elements = screen.getAllByText(text) as HTMLElement[]
		expect(elements[0]).toBeInTheDocument()
	})
})
