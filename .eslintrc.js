module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:jsx-a11y/recommended",
		"plugin:prettier/recommended", // Make sure this is always the last element in the array.
	],
	plugins: ["simple-import-sort", "prettier"],
	settings: {
		react: {
			version: "detect",
		},
		"import/resolver": {
			typescript: {}, // this loads tsconfig.json to eslint
		},
	},
	rules: {
		"prettier/prettier": ["error", {}, { usePrettierrc: true }],
		"react/react-in-jsx-scope": "off",
		"jsx-a11y/accessible-emoji": "off",
		"react/prop-types": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"simple-import-sort/imports": "error",
		"simple-import-sort/exports": "error",
		"jsx-a11y/anchor-is-valid": [
			"error",
			{
				components: ["Link"],
				specialLink: ["hrefLeft", "hrefRight"],
				aspects: ["invalidHref", "preferButton"],
			},
		],
	},
}
