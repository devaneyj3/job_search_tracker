import React from "react";
import styles from "./AllJobs.module.scss";

export default function AllJobs({ jobs }) {
	return (
		<main className={styles.container}>
			<h1 className={styles.title}>All Jobs</h1>

			<ul className={styles.list}>
				{jobs.map((j) => (
					<li key={j.id} className={styles.item}>
						<div className={styles.jobTitle}>{j.title}</div>
						<div className={styles.company}>{j.company}</div>
						<div className={styles.company}>{j.status}</div>
						<div className={styles.company}>{j.appliedDate}</div>
					</li>
				))}
			</ul>
		</main>
	);
}
