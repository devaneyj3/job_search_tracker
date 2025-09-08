import React from "react";
import styles from "./AllJobs.module.scss";
import { MapPinned, Building } from "lucide-react";
import { readableDate } from "@/utils";

export default function AllJobs({
	jobs,
	selectedJob,
	setSelectedJob,
	noJobMsg,
}) {
	console.log(selectedJob);

	if (jobs.length < 1 && !noJobMsg) {
		return (
			<div className={styles.container}>
				<p>Loading</p>
			</div>
		);
	}

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>All Jobs</h1>
			{!noJobMsg && jobs.length > 0 ? (
				jobs.map((j) => {
					const date = readableDate(j.appliedDate);
					return (
						<div
							key={j.id}
							className={`${styles.job} ${
								j.id === selectedJob.id && styles.active
							}`}
							onClick={() => setSelectedJob(j)}>
							<div>
								<div className={styles.jobTitle}>{j.jobTitle}</div>
								<div className={styles.company}>
									<Building size={15} className={styles.icon} />
									{j.companyName}
								</div>
								<div className={styles.location}>
									<MapPinned size={15} className={styles.icon} />
									{j.location}
								</div>
							</div>
							<div>
								<div className={styles.status}>{j.status}</div>
								<div className={styles.appliedDate}>{date}</div>
							</div>
						</div>
					);
				})
			) : (
				<div>{noJobMsg}</div>
			)}
		</main>
	);
}
