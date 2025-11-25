// File: components/followup/sections/PrevalenceTable.jsx
import React from "react";
import styles from "@/styles/PrevalenceTable.module.scss";

export default function PrevalenceTable({ rows = [] }) {
	return (
		<section className={styles.card}>
			<div className={styles.header}>
				How common is following up? (with sources)
			</div>
			<div className={styles.tableWrap}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Metric</th>
							<th>Estimate</th>
							<th>Source</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((s, i) => (
							<tr key={i}>
								<td>
									<div className={styles.metric}>{s.label}</div>
									<div className={styles.note}>{s.note}</div>
								</td>
								<td>
									<span className={styles.pill}>{s.value}</span>
								</td>
								<td>
									<a href={s.href} target="_blank" rel="noreferrer noopener">
										{s.linkText}
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className={styles.footerSources}>
				Sources:{" "}
				<a
					href="https://www.prnewswire.com/news-releases/careerbuilder-survey-reveals-five-common-job-seeker-pitfalls-that-will-hinder-any-career-search-300304908.html"
					target="_blank"
					rel="noreferrer noopener">
					CareerBuilder (2016)
				</a>
				{" · "}
				<a
					href="https://www.ihire.com/about/press/ihire-uncovers-what-job-candidates-want-in-new-research-report"
					target="_blank"
					rel="noreferrer noopener">
					iHire (2023)
				</a>
				{" · "}
				<a
					href="https://recruitingdaily.com/startwire-survey-reveals-companies-risk-reputation-by-not-responding-to-job-applicants/"
					target="_blank"
					rel="noreferrer noopener">
					StartWire via RecruitingDaily
				</a>
				{" · "}
				<a
					href="https://press.roberthalf.com/2017-09-19-The-Art-of-Following-Up"
					target="_blank"
					rel="noreferrer noopener">
					Robert Half / Accountemps
				</a>
			</div>
		</section>
	);
}
