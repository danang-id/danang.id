/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				brand: "#DB2D2A",
				primary: "#1D95A3",
				secondary: "#D6DC2A",
				light: "#E1DDDC",
				"light-accent": "#F2EDED",
				dark: "#121212",
				"dark-accent": "#010101",
			},
			fontFamily: {
				sans: [...defaultTheme.fontFamily.sans],
			},
		},
		fontFamily: {
			brand: ["'Montserrat'"],
		},
	},
	daisyui: {
		styled: true,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: "ui-",
		darkTheme: "dark",
		themes: [
			{
				light: {
					primary: "#1D95A3",
					secondary: "#D6DC2A",
					accent: "#37CDBE",
					neutral: "#DB2D2A",
					"base-100": "#E1DDDC",
					info: "#3ABFF8",
					success: "#36D399",
					warning: "#FBBD23",
					error: "#F87272",
				},
				dark: {
					primary: "#1D95A3",
					secondary: "#D6DC2A",
					accent: "#37CDBE",
					neutral: "#DB2D2A",
					"base-100": "#121212",
					info: "#3ABFF8",
					success: "#36D399",
					warning: "#FBBD23",
					error: "#F87272",
				},
			},
		],
	},
	plugins: [require("daisyui")],
}
