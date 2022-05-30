import { Cloudinary } from "@cloudinary/url-gen"

import config from "@/common/config"

function useCloudinary() {
	return new Cloudinary({
		cloud: {
			cloudName: config.cloudinary.cloudName,
		},
	})
}

export default useCloudinary
