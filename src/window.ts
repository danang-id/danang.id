import config from "@/common/config"

export default function attachWindow() {
	// @ts-expect-error just ignore
	window.env = import.meta.env
	// @ts-expect-error just ignore
	window.metadata = config
}
