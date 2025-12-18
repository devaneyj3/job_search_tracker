import React from "react";
import styles from "@/styles/Metrics.module.scss";
import LoadingSpinner from "@/features/shared/components/LoadingSpinner";
export default function Metrics({ items, title, noItemMsg }) {
	if (items.length < 1 && !noItemMsg) {
		return (
			<div className={styles.container}>
				<LoadingSpinner />
			</div>
		);
	}
	return (
		<main className={styles.container}>
			<h1 className={styles.title}>{title}</h1>

			<div className={styles.grid}>
				{items.length > 0 &&
					items.map((m) => (
						<div key={m.id} className={styles.card}>
							<div className={styles.value}>{m.value}</div>
							<div className={styles.label}>{m.label}</div>
						</div>
					))}
			</div>
		</main>
	);
}
