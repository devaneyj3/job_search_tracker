// File: components/followup/sections/Tips.jsx
import React from "react";
import styles from "@/styles/Tips.module.scss";

export default function Tips() {
	return (
		<section className={styles.block}>
			<h2 className={styles.h2}>Tips that move the needle</h2>
			<ul className={styles.ul}>
				<li>
					<span className={styles.strong}>Subject lines matter:</span> Use a
					specific, value‑forward subject (e.g., “Next steps on [role]
					discussion + quick question”). See{" "}
					<a
						href="https://blog.theinterviewguys.com/how-to-follow-up-after-no-response/#:~:text=There%E2%80%99s%20a%20delicate%20balance%20between,up%20too%20frequently%20or%20aggressively"
						target="_blank"
						rel="noreferrer noopener">
						their guide
					</a>
					.
				</li>
				<li>
					<span className={styles.strong}>Prioritize referrals:</span> A warm
					intro often outperforms any follow‑up cadence. Ask for a brief
					referral after you apply.
				</li>
				<li>
					<span className={styles.strong}>Respect cadence:</span> One or two
					thoughtful nudges beat frequent pings in a short window.
				</li>
			</ul>
		</section>
	);
}
