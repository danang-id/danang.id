/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs-extra")
const path = require("path")
const webp = require("webp-converter")

async function main() {
	webp.grant_permission()

	const assetsPath = path.join(__dirname, "..", "src", "assets")
	if (!(await fs.pathExists(assetsPath))) {
		return
	}

	let convertedCount = 0
	const assets = await fs.readdir(assetsPath)
	for (const asset of assets) {
		const inputImage = path.join(assetsPath, asset)
		const stat = await fs.stat(inputImage)
		if (!stat.isFile()) {
			continue
		}

		const ext = path.extname(asset)
		const name = path.basename(asset, ext)
		const outputImage = path.join(assetsPath, name + ".webp")

		const result = await webp.cwebp(inputImage, outputImage, "-q 80", "-v")
		console.log(result)

		convertedCount++
	}

	console.log(`Converted ${convertedCount} 'assets' image(s) to WebP format`)
}

main().catch(console.error)
