import React from "react";
import styles from "./Stats.module.scss";

export default function Stats() {
	// placeholder metrics
	const metrics = [
		{ id: "applied", label: "Applied", value: 24 },
		{ id: "interviews", label: "Interviews", value: 5 },
		{ id: "offers", label: "Offers", value: 1 },
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
