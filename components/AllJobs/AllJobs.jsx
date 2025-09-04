import React from "react";
import styles from "./AllJobs.module.scss";

export default function AllJobs({ jobs }) {
	const sortedJobs = jobs.sort(
		(a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)
	);

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>All Jobs</h1>

			<ul className={styles.list}>
				{sortedJobs.map((j, index) => (
					<li key={index} className={styles.item}>
						<div className={styles.jobTitle}>{j.jobTitle}</div>
						<div className={styles.company}>{j.companyName}</div>
						<div className={styles.status}>{j.status}</div>
						<div className={styles.appliedDate}>{j.appliedDate}</div>
					</li>
				))}
			</ul>
		</main>
	);
}
