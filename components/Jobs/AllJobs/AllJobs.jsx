import React from "react";
import styles from "./AllJobs.module.scss";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import JobBox from "./JobBox/JobBox";

export default function AllJobs({ jobs, noJobMsg }) {
	if (jobs.length < 1 && !noJobMsg) {
		return (
			<div className={styles.container}>
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>All Jobs</h1>
			{!noJobMsg && jobs.length > 0 ? (
				jobs.map((j, index) => {
					return <JobBox key={index} j={j} />;
				})
			) : (
				<div>{noJobMsg}</div>
			)}
		</main>
	);
}
