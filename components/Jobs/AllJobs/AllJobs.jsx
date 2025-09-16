import React from "react";
import styles from "./AllJobs.module.scss";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import JobBox from "./JobBox/JobBox";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
			<Link
				href={"/resume.pdf"}
				download="Jordan-Devaney-Resume.pdf"
				target="_blank"
				rel="noreferrer">
				<Button>Download Resume</Button>
			</Link>
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
