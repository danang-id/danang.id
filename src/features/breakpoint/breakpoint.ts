import defaultTheme from "tailwindcss/defaultTheme"

export type Breakpoints = Record<BreakpointName, BreakpointMinWidth>
export type BreakpointName = string
export type BreakpointState = boolean
export type BreakpointMinWidth = number

export function getTailwindBreakpoints(): Breakpoints {
	const breakpoints: Breakpoints = {
		xs: 0,
	}
	if (!defaultTheme.screens) {
		return breakpoints
	}

	for (const [name, value] of Object.entries({ ...defaultTheme.screens })) {
		if (typeof value === "string" && value.endsWith("px")) {
			breakpoints[name] = +value.substring(0, value.length - 2)
		}
	}

	return breakpoints
}
