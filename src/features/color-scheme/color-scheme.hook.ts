import { useContext } from "react"

import ColorSchemeContext from "@/features/color-scheme/color-scheme.context"

function useColorScheme() {
	return useContext(ColorSchemeContext)
}

export default useColorScheme
