// File: components/followup/sections/KeyStatsTable.jsx
import React from "react";
import styles from "./KeyStatsTable.module.scss";

export default function KeyStatsTable({ rows = [] }) {
	return (
		<section className={styles.card}>
			<div className={styles.tableWrap}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Metric</th>
							<th>Value</th>
							<th>Source</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((row, i) => (
							<tr key={i}>
								<td className={styles.metric}>{row.label}</td>
								<td className={styles.value}>
									<span className={styles.pill}>{row.value}</span>
								</td>
								<td className={styles.source}>
									<a
										href={row.source.href}
										target="_blank"
										rel="noreferrer noopener">
										{row.source.text}
									</a>
									{row.extraLinks?.length ? (
										<>
											{" · "}
											{row.extraLinks.map((ex, idx) => (
												<a
													key={idx}
													href={ex.href}
													target="_blank"
													rel="noreferrer noopener">
													{ex.text}
												</a>
											))}
										</>
									) : null}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
