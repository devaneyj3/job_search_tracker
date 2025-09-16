import React from "react";
import styles from "./FollowUpEvidence.module.scss";

export default function FollowUpEvidence() {
	return (
		<section className={styles.card}>
			<h2>Does following up help?</h2>
			<p>
				There’s no exact peer-reviewed <em>% more likely to get hired</em>{" "}
				number, but reputable surveys and large-scale outreach data show
				follow-ups improve outcomes—especially being seen and getting a
				response.
			</p>

			<ul>
				<li>
					<strong>Hiring managers notice thank-yous:</strong> In a Robert Half
					survey,
					<strong> 27%</strong> of hiring managers said a thank-you email can
					<em> tip the scales</em> between equally qualified candidates.{" "}
					<a
						href="https://www.roberthalf.com/us/en/insights/landing-job/how-to-write-thank-you-emails-after-interviews"
						target="_blank"
						rel="noreferrer">
						(Robert Half)
					</a>
				</li>
				<li>
					<strong>Reasonable cadence:</strong> Robert Half advises sending a
					thank-you within 24 hours and, if no reply, a brief follow-up about a
					week later.{" "}
					<a
						href="https://www.roberthalf.com/us/en/insights/landing-job/no-response-after-an-interview-heres-what-to-do-if-youve-been-ghosted"
						target="_blank"
						rel="noreferrer">
						(Robert Half – ghosted guide)
					</a>
				</li>
				<li>
					<strong>Follow-ups lift reply rates:</strong> Outreach datasets show
					the
					<em> first follow-up</em> yields the biggest bump—about{" "}
					<strong>~40% higher</strong> replies vs. the initial email; example:
					<strong> 6% → 8.5%</strong>.{" "}
					<a
						href="https://woodpecker.co/blog/follow-up-statistics/"
						target="_blank"
						rel="noreferrer">
						(Woodpecker)
					</a>
				</li>
				<li>
					<strong>Independent replications:</strong> Other analyses show reply
					rates can jump by ~<strong>49%</strong> after the first follow-up in
					high-performing campaigns.{" "}
					<a
						href="https://belkins.io/blog/cold-email-response-rates"
						target="_blank"
						rel="noreferrer">
						(Belkins)
					</a>{" "}
					<a
						href="https://mailmeteor.com/cold-email/statistics"
						target="_blank"
						rel="noreferrer">
						(Lemlist)
					</a>
				</li>
			</ul>

			<hr />

			<h3>What to do in your job tracker</h3>
			<ol>
				<li>
					Log the <strong>apply date</strong> → auto-suggest a{" "}
					<strong>thank-you (post-interview)</strong> or{" "}
					<strong>single application follow-up</strong> at{" "}
					<strong>+5–7 business days</strong>.
				</li>
				<li>
					If they gave an internal timeline and it passes, surface one{" "}
					<strong>second follow-up</strong> option (only if new info/value to
					add).
				</li>
				<li>Keep emails short, personalized, and value-focused.</li>
			</ol>

			<p className={styles.note}>
				Note: outreach data measures <em>reply rates</em> (visibility), not
				guaranteed hiring decisions—still, being seen matters in competitive
				funnels.
			</p>
		</section>
	);
}
