"use client";
import React from "react";
import styles from "./OutreachHeader.module.scss";
import Metrics from "@/components/shared/Metrics/Metrics";
import Link from "next/link";
import { useConnection } from "@/context/connectionContext";
import { itemLength } from "@/lib/utils";
export default function OutreachHeader() {
	const { connections, noConnectionMsg } = useConnection();

	const connected = itemLength("Connected", connections);
	const emailed = itemLength("Emailed", connections);
	const responded = itemLength("Responded", connections);
	const scheduled = itemLength("Scheduled", connections);
	const archived = connections.filter((connection) => connection.archived);

	const metrics = [
		{ id: "connected", label: "Connected", value: connected.length },
		{ id: "emailed", label: "Emailed", value: emailed.length },
		{ id: "responded", label: "Responded", value: responded.length },
		{ id: "scheduled", label: "Scheduled", value: scheduled.length },
		{ id: "archived", label: "Archived", value: archived.length },
	];

	return (
		<>
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
			</div>
			<Metrics items={metrics} noItemMsg={noConnectionMsg} title="Outreach" />
		</>
	);
}
