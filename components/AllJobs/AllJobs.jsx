import React from "react";
import styles from "./AllJobs.module.scss";
import { MapPinned, Building } from "lucide-react";
import { readableDate } from "@/utils";

export default function AllJobs({ jobs }) {
	const sortedJobs = jobs.sort(
		(a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)
	);

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>All Jobs</h1>
			{sortedJobs.map((j, index) => {
				const date = readableDate(j.appliedDate);
				return (
					<div key={index} className={styles.job}>
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
			})}
		</main>
	);
}
