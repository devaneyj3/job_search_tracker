"use client";
import React from "react";
import styles from "./OutreachDashboard.module.scss";
import Metrics from "@/components/shared/Metrics/Metrics";
import Link from "next/link";
export default function OutreachDashboard() {
	const metrics = [
		{ id: "connections", label: "Connections", value: 100 },
		{ id: "responses", label: "Responses", value: 50 },
		{ id: "conversion", label: "Conversion", value: 50 },
	];
	return (
		<div className={styles.outreachDashboard}>
			<div className={styles.container}>
				<h1 className={styles.title}>How to Outreach</h1>
				<p className={styles.subtitle}>
					Follow these steps to outreach to your connections
				</p>
				<ol className={styles.steps}>
					<li>
						<h2>
							Find connections on{" "}
							<Link
								href="https://www.linkedin.com/search/results/people/?keywords=react&origin=CLUSTER_EXPANSION"
								target="_blank"
								rel="noreferrer noopener">
								LinkedIn
							</Link>
						</h2>
						<p>
							Find people that work in the same tech stack as you do and got to
							their profile to find their company.
						</p>
					</li>
				</ol>
				<Metrics metrics={metrics} title="Outreach" />
			</div>
		</div>
	);
}
