import { createContext } from "react"

export type ColorScheme = "dark" | "light"
export type ColorSchemeContextInfo = [ColorScheme, (scheme: ColorScheme) => void]

const ColorSchemeContext = createContext<ColorSchemeContextInfo>([
	"light",
	() => {
		// Intentionally empty
	},
])

export default ColorSchemeContext
