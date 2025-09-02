import React from "react";
import Link from "next/link";
import styles from "./AddJob.module.scss";

export default function AddJobPage() {
	return (
		<main className={styles.container}>
			<h1 className={styles.title}>Add Job</h1>

			<form className={styles.form}>
				<label className={styles.field}>
					<span className={styles.label}>Job Title</span>
					<input className={styles.input} type="text" name="title" />
				</label>

				<label className={styles.field}>
					<span className={styles.label}>Company</span>
					<input className={styles.input} type="text" name="company" />
				</label>

				<div className={styles.actions}>
					<button className={styles.button} type="submit">
						Add
					</button>
					<Link href="/all-jobs" className={styles.link}>
						View all jobs
					</Link>
				</div>
			</form>
		</main>
	);
}
