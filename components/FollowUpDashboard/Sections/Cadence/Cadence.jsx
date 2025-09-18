// File: components/followup/sections/Cadence.jsx
import React from "react";
import styles from "./Cadence.module.scss";
import Link from "next/link";

export default function Cadence() {
	return (
		<section className={styles.block}>
			<h2 className={styles.h2}>Recommended follow‑up cadence</h2>
			<ol className={styles.ol}>
				<li>
					<span className={styles.strong}>Application day:</span> Submit via ATS
					with a targeted resume <em>and</em> cover letter. An email to a
					company contact is automatically sent out after you create an
					application through tech tracker.
				</li>
				<li>
					<span className={styles.strong}>1 week after applying:</span> Send
					your <span className={styles.strong}>follow‑up email</span>.
				</li>
			</ol>
			<p className={styles.note}>
				Most guidance caps follow‑ups at{" "}
				<span className={styles.strong}>1–2 total</span> and roughly a week
				apart. See{" "}
				<Link
					href="https://www.indeed.com/career-advice/finding-a-job/how-long-should-you-wait-to-hear-back-about-a-job"
					target="_blank"
					rel="noreferrer noopener">
					Indeed
				</Link>
				{" / "}
				<Link
					href="https://joinhandshake.com/blog/students/how-to-follow-up-on-job-applications/"
					target="_blank"
					rel="noreferrer noopener">
					Handshake
				</Link>
				{" / "}
				<Link
					href="https://bilingualsource.com/should-you-really-follow-up-after-applying-heres-what-works/"
					target="_blank"
					rel="noreferrer noopener">
					BilingualSource
				</Link>
				.
			</p>
		</section>
	);
}
