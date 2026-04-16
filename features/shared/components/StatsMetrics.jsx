import React from "react";
import styles from "@/styles/Metrics.module.scss";
import LoadingIndicator from "@/features/shared/components/LoadingIndicator";
export default function StatsMetrics({ items, noItemMsg, setFilter }) {
	if (items.length < 1 && !noItemMsg) {
		return (
			<div className={styles.container}>
				<LoadingIndicator />
			</div>
		);
	}
	return (
		<main className={styles.container}>
			<div className={styles.grid}>
				{items.length > 0 &&
					items.map((m) => (
						<button
							key={m.id}
							className={styles.card}
							onClick={() => setFilter(m.label)}>
							<div
								className={
									styles.value
								}>{`${m.value > "0" ? m.value : "--"}`}</div>
							<div className={styles.label}>{m.label}</div>
						</button>
					))}
			</div>
		</main>
	);
}
