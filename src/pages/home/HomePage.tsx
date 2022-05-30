import "@/pages/home/home-page.css"

import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { AiFillLinkedin, AiOutlineGithub, AiOutlineMail, AiOutlineTwitter } from "react-icons/ai"
import { isWebpSupported } from "react-image-webp/dist/utils"

import HomeBrandBackgroundImage from "@/assets/home-brand-background.png"
import HomeBrandBackgroundWebPImage from "@/assets/home-brand-background.webp"
import useBreakpoint from "@/features/breakpoint/breakpoint.hook"
import BaseLayout from "@/layouts/base/BaseLayout"

function HomePage() {
	const breakpoint = useBreakpoint()
	const [backgroundImage, setBackgroundImage] = useState<string>("none")
	const { t } = useTranslation("home")

	const firstName = t("common:name.first", "Danang")
	const lastName = t("common:name.last", "Galuh Tegar Prasetyo")
	const shortJobDescription = t("common:jobDescription.short", "Full-stack software developer.")
	const homeBrandBackground = isWebpSupported()
		? HomeBrandBackgroundWebPImage
		: HomeBrandBackgroundImage

	useEffect(() => {
		breakpoint.addListener("md", (active) => {
			setBackgroundImage(active ? `url("${homeBrandBackground}")` : "none")
		})

		return () => {
			breakpoint.removeListeners()
		}
	}, [])

	return (
		<BaseLayout className="home-page">
			<div className="branding" style={{ backgroundImage }}>
				<div className="content">
					<div className="full-name">
						<span className="first-name">{firstName}</span>&nbsp;
						<span className="last-name">{lastName}</span>
					</div>

					<div className="short-description">{shortJobDescription}</div>

					<div className="social-media">
						<a
							href="https://www.linkedin.com/in/dananggaluht/"
							target="_blank"
							rel="noreferrer"
						>
							<AiFillLinkedin size="2em" />
						</a>
						<a href="https://github.com/danang-id/" target="_blank" rel="noreferrer">
							<AiOutlineGithub size="2em" />
						</a>
						<a href="https://twitter.com/DanangGaluhT" target="_blank" rel="noreferrer">
							<AiOutlineTwitter size="2em" />
						</a>
						<a href="mailto:connect@danang.id" target="_blank" rel="noreferrer">
							<AiOutlineMail size="2em" />
						</a>
					</div>
				</div>
			</div>
		</BaseLayout>
	)
}

export default HomePage
