/* eslint-disable @typescript-eslint/no-explicit-any,no-console */
import { Temporal } from "@js-temporal/polyfill"
import ShortUniqueId from "short-unique-id"
import { terminal } from "virtual:terminal"

import config from "@/common/config"
import environment from "@/common/environment"
import ILogger, { LoggerOptions, WriterFunction } from "@/common/logger"

const defaultLoggerOptions: LoggerOptions = {
	disableOnProduction: true,
	showName: true,
	showClientIdentifier: true,
	showTime: true,
}

const generateUniqueId = new ShortUniqueId({ length: 10 })

class Logger implements ILogger {
	private static readonly CLIENT_IDENTIFIER_KEY = `${config.application.name}:client-identifier`

	private readonly name: string
	private readonly options: LoggerOptions

	public readonly clientIdentifier: string

	constructor(name: string, options: LoggerOptions = defaultLoggerOptions) {
		this.name = name
		this.options = { ...defaultLoggerOptions, ...options }

		const clientIdentifier = localStorage.getItem(Logger.CLIENT_IDENTIFIER_KEY)
		if (!clientIdentifier) {
			const generatedClientIdentifier = generateUniqueId()
			localStorage.setItem(Logger.CLIENT_IDENTIFIER_KEY, generatedClientIdentifier)
			this.clientIdentifier = generatedClientIdentifier
		} else {
			this.clientIdentifier = clientIdentifier
		}
	}

	private write(write: WriterFunction, ...args: string[]) {
		if (this.options.disableOnProduction && environment.isProduction()) {
			return
		}

		const now = Temporal.Now.instant()
		const header: string[] = []

		if (this.options.showName || this.options.showClientIdentifier) {
			header.push("[")
		}

		if (this.options.showClientIdentifier) {
			header.push(this.clientIdentifier)
			if (this.options.showName) {
				header.push(" ")
			}
		}

		if (this.options.showName) {
			header.push(this.name)
		}

		if (this.options.showName || this.options.showClientIdentifier) {
			header.push("]")
		}

		if (this.options.showTime) {
			const time = now.toLocaleString()
			header.push(
				this.options.showName || this.options.showClientIdentifier ? ` ${time}` : time
			)
		}

		if (this.options.showName || this.options.showClientIdentifier || this.options.showTime) {
			header.push("\n")
		}

		write(header.join(""), ...args)
	}

	public clear() {
		terminal.clear()
	}

	public error(...args: any[]) {
		this.write(terminal.error.bind(this), ...args)
	}

	public info(...args: any[]) {
		this.write(terminal.info.bind(this), ...args)
	}

	public warn(...args: any[]) {
		this.write(terminal.warn.bind(this), ...args)
	}
}

export default Logger
