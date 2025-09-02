import React from "react";
import Link from "next/link";
import styles from "./AllJobs.module.scss";

export default function AllJobsPage() {
	// replace with real data later
	const jobs = [
		{ id: 1, title: "Frontend Engineer", company: "Acme" },
		{ id: 2, title: "Backend Engineer", company: "Beta" },
	];

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>All Jobs</h1>

			<ul className={styles.list}>
				{jobs.map((j) => (
					<li key={j.id} className={styles.item}>
						<div className={styles.jobTitle}>{j.title}</div>
						<div className={styles.company}>{j.company}</div>
					</li>
				))}
			</ul>

			<div className={styles.footer}>
				<Link href="/add-job" className={styles.link}>
					Add job
				</Link>
				<Link href="/stats" className={styles.link}>
					View stats
				</Link>
			</div>
		</main>
	);
}
