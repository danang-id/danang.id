/* eslint-disable class-methods-use-this */
import ILogger from "@/common/logger"

class NullLogger implements ILogger {
	public readonly clientIdentifier: string

	constructor() {
		this.clientIdentifier = ""
	}

	public clear() {
		// Intentionally empty
	}

	public error() {
		// Intentionally empty
	}

	public info() {
		// Intentionally empty
	}

	public warn() {
		// Intentionally empty
	}
}

export default NullLogger
