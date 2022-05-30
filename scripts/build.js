/* eslint-disable @typescript-eslint/no-var-requires */
// noinspection SpellCheckingInspection,NpmUsedModulesInstalled

const fs = require("fs-extra")
const path = require("path")
const { Temporal } = require("@js-temporal/polyfill")

async function main() {
	const now = Temporal.Now.plainDateTimeISO()
	const yearDigit = now.year.toString().substring(2)
	const monthDigit = "ABCDEFGHIJKL".charAt(now.month - 1)
	const dateDigit = "abcdefghijklmnopqrstuvwxyzABCDE".charAt(now.day - 1)
	const timeDigit = now.hour >= 10 ? now.hour.toString() : `0${now.hour}`

	const build = {
		number: yearDigit + monthDigit + dateDigit + timeDigit,
	}
	const buildFilePath = path.join(__dirname, "..", "build.json")
	await fs.writeJSON(buildFilePath, build, { encoding: "utf-8", spaces: 4 })
}

main().catch(console.error)
