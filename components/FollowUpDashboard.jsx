import React from "react";
import styles from "@/styles/FollowUpDashboard.module.scss";

import KeyStatsTable from "@/components/KeyStatsTable";
import Cadence from "@/components/Cadence";
import WhatToSend from "@/components/WhatToSend";
import Tips from "@/components/Tips";
import PrevalenceTable from "@/components/PrevalenceTable";
import Extras from "@/components/Extras";

export default function FollowUpDashboard() {
	const playbookStats = [
		{
			label: "Fortune 500 using an ATS",
			value: "98.4%",
			source: {
				text: "Jobscan (2025)",
				href: "https://www.jobscan.co/blog/8-things-you-need-to-know-about-applicant-tracking-systems/",
			},
		},
		{
			label: "Interview boost when you include a cover letter",
			value: "1.9× more likely",
			source: {
				text: "Jobscan (1M apps, 2024)",
				href: "https://www.jobscan.co/blog/interview-rates-study/",
			},
		},
		{
			label: "When to send 1st follow‑up after applying",
			value: "≈ 1 week",
			source: {
				text: "Indeed (2025)",
				href: "https://www.indeed.com/career-advice/finding-a-job/how-long-should-you-wait-to-hear-back-about-a-job",
			},
		},
		{
			label: "How many application follow‑ups to send",
			value: "1–2 total",
			source: {
				text: "Indeed (2025)",
				href: "https://www.indeed.com/career-advice/finding-a-job/how-long-should-you-wait-to-hear-back-about-a-job",
			},
		},
		{
			label: "Alt. cadence guidance",
			value: "~1 week apart",
			source: {
				text: "Handshake / BilingualSource",
				href: "https://joinhandshake.com/blog/students/how-to-follow-up-on-job-applications/",
			},
			extraLinks: [
				{
					text: "BilingualSource (2025)",
					href: "https://bilingualsource.com/should-you-really-follow-up-after-applying-heres-what-works/",
				},
			],
		},
	];

	const prevalenceStats = [
		{
			label: "Applicants who follow up (implied)",
			value: "≈63%",
			note: "CareerBuilder found 37% do not follow up",
			linkText: "CareerBuilder (PR Newswire)",
			href: "https://www.prnewswire.com/news-releases/careerbuilder-survey-reveals-five-common-job-seeker-pitfalls-that-will-hinder-any-career-search-300304908.html",
		},
		{
			label: "Applicants who follow up (always/most of the time)",
			value: "74.5%",
			note: "U.S. job seekers (iHire 2023)",
			linkText: "iHire press summary",
			href: "https://www.ihire.com/about/press/ihire-uncovers-what-job-candidates-want-in-new-research-report",
		},
		{
			label: "Applicants who follow up (another survey)",
			value: "90%+",
			note: "StartWire survey cited by RecruitingDaily",
			linkText: "RecruitingDaily coverage",
			href: "https://recruitingdaily.com/startwire-survey-reveals-companies-risk-reputation-by-not-responding-to-job-applicants/",
		},
		{
			label: "HR managers who say candidates should follow up",
			value: "100%",
			note: "Accountemps/Robert Half",
			linkText: "Robert Half press release",
			href: "https://press.roberthalf.com/2017-09-19-The-Art-of-Following-Up",
		},
	];

	const extras = [
		{
			text: "Many roles get low interview call‑through rates (≈2–3%). Following up helps you stand out—use it, don't abuse it.",
			href: "https://blog.theinterviewguys.com/how-many-applications-does-it-take-to-get-one-interview/",
			source: "Interview Guys (2025)",
		},
		{
			text: "Cover letters still matter—submit one in the portal, and optionally send a short direct email to a relevant recruiter/hiring manager.",
			href: "https://www.jobscan.co/blog/should-you-include-cover-letter/",
			source: "Jobscan (2024)",
		},
	];

	return (
		<div className={styles.wrap}>
			<header className={styles.header}>
				<h1 className={styles.title}>
					Tech Job Application Follow‑Up: What Actually Works
				</h1>
			</header>

			<KeyStatsTable rows={playbookStats} />

			<Cadence />
			<WhatToSend />
			<Tips />

			<PrevalenceTable rows={prevalenceStats} />

			<Extras items={extras} />

			<footer className={styles.footer}>
				Data last reviewed Sep 2025. Always check each posting for specific
				instructions (some forbid direct emails).
			</footer>
		</div>
	);
}
