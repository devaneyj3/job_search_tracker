import React from "react";
import styles from "@/styles/ItemList.module.scss";
import ApplicationTableRow from "@/features/applications/components/Applications/ApplicationTableRow";
import AddApplicationButton from "@/features/applications/components/Applications/AddApplicationButton";
import ApplicationDetailsSheet from "@/features/applications/components/Applications/ApplicationDetailsSheet";
import { useApplication } from "../../context/applicationContext";

export default function ApplicationsList({ filteredApplications }) {
	const { selectedApplication, applications, noApplicationMsg } =
		useApplication();

	return (
		<main className={styles.container}>
			<div className={styles.row}>
				<h1 className={styles.title}>
					{filteredApplications.length} TOTAL APPLICATIONS
				</h1>
				<AddApplicationButton />
			</div>
			{!noApplicationMsg && applications.length > 0 ? (
				<div className={styles.cardGrid}>
					{filteredApplications.map((item) => (
						<ApplicationTableRow key={item.id} item={item} />
					))}
				</div>
			) : (
				<p className={styles.emptyMessage}>{noApplicationMsg}</p>
			)}
			{selectedApplication && (
				<ApplicationDetailsSheet item={selectedApplication} />
			)}
		</main>
	);
}
