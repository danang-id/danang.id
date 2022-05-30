import { createContext } from "react"

export type MetaContextInfo = {
	title?: string
	setTitle(title?: string): void
}

const MetaContext = createContext<MetaContextInfo>({
	setTitle() {
		// Intentionally empty
	},
})

export default MetaContext
