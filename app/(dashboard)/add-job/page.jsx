import React from "react";
import Link from "next/link";
import styles from "./AddJob.module.scss";
import AddJobForm from "@/components/AddJobForm/AddJobForm";

export default function AddJobPage() {
	return (
		<main className={styles.container}>
			<AddJobForm />
			<Link href="/all-jobs" className={styles.link}>
				View all jobs
			</Link>
		</main>
	);
}
