import config from "@/common/config"

const environment = {
	isDevelopment: () => config.mode === "development",
	isProduction: () => config.mode === "production",
}

export default environment
