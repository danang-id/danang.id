/* eslint-disable @typescript-eslint/no-explicit-any */
export type WriterFunction = (...args: any[]) => void

export type LoggerOptions = {
	disableOnProduction?: boolean
	showName?: boolean
	showClientIdentifier?: boolean
	showTime?: boolean
}

export default interface ILogger {
	clientIdentifier: string
	clear(): void
	error(...args: any[]): void
	info(...args: any[]): void
	warn(...args: any[]): void
}
