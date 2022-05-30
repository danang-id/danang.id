import { useContext } from "react"

import MetaContext from "@/features/meta/meta.context"

function useMeta() {
	return useContext(MetaContext)
}

export default useMeta
