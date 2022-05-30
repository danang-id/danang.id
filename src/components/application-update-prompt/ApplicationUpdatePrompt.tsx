import "@/components/application-update-prompt/application-update-prompt.css"

import React, { MouseEvent } from "react"
import { useRegisterSW } from "virtual:pwa-register/react"

import useLogger from "@/features/logger/logger.hook"

function ApplicationUpdatePrompt() {
	const logger = useLogger(ApplicationUpdatePrompt)

	// replaced dynamically
	// const buildDate = "__DATE__"
	// replaced dynamically
	const reloadSW = "__RELOAD_SW__"

	function onRefreshButtonClicked(event: MouseEvent<HTMLButtonElement>) {
		updateServiceWorker(true)
			.catch(logger.error)
			.finally(() => {
				setNeedRefresh(false)
			})
	}

	function onServiceWorkerRegistered(registration?: ServiceWorkerRegistration) {
		// @ts-expect-error just ignore
		if (reloadSW === "true") {
			registration?.update().catch(logger.error)
		}
	}

	function onServiceWorkerRegisterError(error: Error) {
		logger.error(error)
	}

	const {
		offlineReady: [offlineReady],
		needRefresh: [needRefresh, setNeedRefresh],
		updateServiceWorker,
	} = useRegisterSW({
		onRegistered: onServiceWorkerRegistered,
		onRegisterError: onServiceWorkerRegisterError,
	})

	if (offlineReady) {
		return (
			<div className="ui-alert shadow-lg">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="stroke-info flex-shrink-0 w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
					<span>Application is ready for offline use.</span>
				</div>
			</div>
		)
	}

	return (
		<div className="application-update-prompt">
			<input
				type="checkbox"
				id="refresh-modal"
				className="ui-modal-toggle"
				defaultChecked={needRefresh}
			/>
			<div className="ui-modal ui-modal-bottom sm:ui-modal-middle">
				<div className="ui-modal-box">
					<h3 className="font-bold text-lg">Update Available!</h3>
					<p className="py-4">
						An update is available for this website. Please refresh to continue.
					</p>
					<div className="modal-action">
						<button className="ui-btn" onClick={onRefreshButtonClicked}>
							Refresh
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ApplicationUpdatePrompt
