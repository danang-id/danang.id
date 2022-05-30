import "@testing-library/jest-dom"

import { render, screen } from "@testing-library/react"
import React from "react"
import { I18nextProvider } from "react-i18next"
import { MemoryRouter } from "react-router-dom"
import { beforeEach, describe, expect, test } from "vitest"

import HomePage from "../../src/pages/home/HomePage"
import i18n from "../i18n"

describe("Home Page test", () => {
	beforeEach(() => {
		render(
			<I18nextProvider i18n={i18n}>
				<MemoryRouter>
					<HomePage />
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

	test("Should show the short job description", () => {
		const text = /Full-stack software developer./i
		const elements = screen.getAllByText(text) as HTMLElement[]
		expect(elements[0]).toBeInTheDocument()
	})
})
