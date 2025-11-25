// File: components/followup/sections/WhatToSend.jsx
import React from "react";
import styles from "@/styles/WhatToSend.module.scss";

export default function WhatToSend() {
	return (
		<section className={styles.block}>
			<h2 className={styles.h2}>What to send (keep it tight)</h2>
			<ul className={styles.ul}>
				<li>
					<span className={styles.strong}>Subject:</span> “Follow‑up on
					application — <em>[Role Title]</em> (<em>Req/Job ID</em>)”.
				</li>
				<li>
					<span className={styles.strong}>Body (3–6 sentences):</span> 1)
					One‑line value prop matched to JD keywords. 2) One proof point
					(project, metric, repo link). 3) Polite ask about next steps. 4) Thank
					you.
				</li>
				<li>
					<span className={styles.strong}>Attach/Link:</span> Resume +
					portfolio/GitHub. Keep formatting ATS‑friendly even in attachments.
				</li>
			</ul>
		</section>
	);
}
