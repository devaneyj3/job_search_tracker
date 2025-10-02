import React from "react";
import styles from "./Stats.module.scss";
import { jobsLength } from "@/utils";

export default function Stats({ jobs }) {
	// placeholder metrics
	const appliedJobs = jobsLength("Applied", jobs);
	const interviewsJobs = jobsLength("Interview", jobs);
	const offersJobs = jobsLength("Offer", jobs);
	const rejectedJobs = jobsLength("Rejected", jobs);
	const archivedJobs = jobs.filter((job) => job.archived);

	const metrics = [
		{ id: "applied", label: "Applied", value: appliedJobs.length },
		{ id: "interviews", label: "Interviews", value: interviewsJobs.length },
		{ id: "offers", label: "Offers", value: offersJobs.length },
		{ id: "rejected", label: "Rejected", value: rejectedJobs.length },
		{ id: "archived", label: "Archived", value: archivedJobs.length },
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
