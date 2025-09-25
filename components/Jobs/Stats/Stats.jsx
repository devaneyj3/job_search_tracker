import React from "react";
import styles from "./Stats.module.scss";
import { jobsLength } from "@/utils";

export default function Stats({ jobs }) {
	// placeholder metrics
	const appliedJobsLength = jobsLength("Applied", jobs);
	const interviewsJobsLength = jobsLength("Interview", jobs);
	const offersJobsLength = jobsLength("Offer", jobs);
	const rejectedJobsLength = jobsLength("Rejected", jobs);

	const metrics = [
		{ id: "applied", label: "Applied", value: appliedJobsLength },
		{ id: "interviews", label: "Interviews", value: interviewsJobsLength },
		{ id: "offers", label: "Offers", value: offersJobsLength },
		{ id: "rejected", label: "Rejected", value: rejectedJobsLength },
	];

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>Stats</h1>

			<div className={styles.grid}>
				{metrics.map((m) => (
					<div key={m.id} className={styles.card}>
						<div className={styles.value}>{m.value}</div>
						<div className={styles.label}>{m.label}</div>
					</div>
				))}
			</div>
		</main>
	);
}
