import React from "react";
import styles from "./Metrics.module.scss";
export default function Metrics({ metrics, title }) {
	return (
		<main className={styles.container}>
			<h1 className={styles.title}>{title}</h1>

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
