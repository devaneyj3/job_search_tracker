import React from "react";
import styles from "./AllJobs.module.scss";

export default function AllJobs() {
	//   TODO: What and how should I display this data? What properties should I use? jobTitle, companyName, jobUrl, appliedDate, status, statusDate, archived, salary, location, contactName, contactEmail, nextFollowUpDate, lastContactedDate, jobDescription, interviewNotes, interviewDate, offerDetails, rejectionReason, dateArchived, notes

	const jobs = [
		{
			id: 1,
			title: "Full Stack Engineer",
			company: "Gravity",
			appliedDate: "9/2/25",
		},
		{
			id: 2,
			title: "Backend Engineer",
			company: "Beta",
			appliedDate: "9/2/25",
		},
	];

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>All Jobs</h1>

			<ul className={styles.list}>
				{jobs.map((j) => (
					<li key={j.id} className={styles.item}>
						<div className={styles.jobTitle}>{j.title}</div>
						<div className={styles.company}>{j.company}</div>
						<div className={styles.company}>{j.appliedDate}</div>
					</li>
				))}
			</ul>
		</main>
	);
}
