/* eslint-disable @typescript-eslint/ban-types */
import ILogger from "@/common/logger"
import Logger from "@/features/logger/logger"
import NullLogger from "@/features/logger/null-logger"

function useLogger(fun: Function): ILogger
function useLogger(name: string): ILogger
function useLogger(nameOrFunction: Function | string): ILogger {
	if (process.env.NODE_ENV === "production") {
		return new NullLogger()
	}

	const name = typeof nameOrFunction === "string" ? nameOrFunction : nameOrFunction.name

	return new Logger(name)
}

export default useLogger
