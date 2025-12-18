import Link from "next/link";
import React from "react";
import styles from "@/styles/JobBoard.module.scss";

export default function JobBoard() {
	const jobBoards = [
		{
			name: "LinkedIn",
			url: "https://www.linkedin.com/jobs/search/?currentJobId=4311028956&f_E=2&f_TPR=r86400&f_WT=2&keywords=software%20developer&origin=JOB_SEARCH_PAGE_JOB_FILTER",
		},
		{
			name: "Welcome to the Jungle",
			url: "https://app.welcometothejungle.com/",
		},
	];
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Looking for jobs?</h2>
			<p className={styles.subtitle}>Check out these job boards</p>
			{jobBoards.map((jobBoard) => (
				<Link
					key={jobBoard.name}
					href={jobBoard.url}
					target="_blank"
					className={styles.link}>
					{jobBoard.name}
				</Link>
			))}
		</div>
	);
}
