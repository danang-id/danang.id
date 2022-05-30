import { ComponentType, lazy as reactLazy, LazyExoticComponent } from "react"

import useLogger from "@/features/logger/logger.hook"

function lazy<T extends ComponentType<unknown>>(
	factory: () => Promise<{ default: T }>
): LazyExoticComponent<T> {
	const logger = useLogger("LazyComponentLoader")
	return reactLazy(async () => {
		const component = await factory()
		logger.info("Loaded: " + component.default.name)
		return component
	})
}

export default lazy
