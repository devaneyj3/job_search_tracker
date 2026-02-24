import React, { useMemo } from "react";
import { useApplication } from "@/features/applications/context/applicationContext";
import { applicationStatus } from "@/Constants";
import styles from "@/styles/ItemList.module.scss";
import ApplicationCard from "@/features/applications/components/Applications/ApplicationCard";
import AddApplicationButton from "@/features/applications/components/Applications/AddApplicationButton";
import ApplicationDetailsSheet from "@/features/applications/components/Applications/ApplicationDetailsSheet";
import { Button } from "@/features/shared/ui/button";

export default function ApplicationsList({ filteredApplications, statuses, setChosenStatus }) {
	const applicationContext = useApplication();

	const context = useMemo(
		() => ({
			selectedItem: applicationContext.selectedApplication,
			setSelectedItem: applicationContext.setSelectedApplication,
			setModalOpen: applicationContext.setModalOpen,
			items: applicationContext.applications,
			noItemMsg: applicationContext.noApplicationMsg,
			update: applicationContext.updateApplicationStatus,
			updateApplicationFields: applicationContext.updateApplicationFields,
			modalOpen: applicationContext.modalOpen,
		}),
		[
			applicationContext.selectedApplication,
			applicationContext.setSelectedApplication,
			applicationContext.setModalOpen,
			applicationContext.applications,
			applicationContext.noApplicationMsg,
			applicationContext.updateApplicationStatus,
			applicationContext.updateApplicationFields,
			applicationContext.modalOpen,
		]
	);
	const { selectedItem, items, noItemMsg } = context;

	return (
		<main className={styles.container}>
			<section className={styles.btn_container}>
				<AddApplicationButton />
			</section>
			<h1 className={styles.title}>
				{filteredApplications.length} TOTAL APPLICATIONS
			</h1>
			{statuses && statuses.length > 0 && (
				<div className={styles.filter_container}>
					{statuses.map((status, index) => (
						<div key={index}>
							<Button
								onClick={() => setChosenStatus(status)}
								className={styles.filter_btn}
								variant="outline">
								{status}
							</Button>
						</div>
					))}
				</div>
			)}
			{!noItemMsg && items.length > 0 ? (
				filteredApplications.map((item) => (
					<ApplicationCard
						key={item.id}
						item={item}
						context={context}
						status={applicationStatus}
						/>
					))
				) : (
					<div>{noItemMsg}</div>
				)}
			{selectedItem && (
				<ApplicationDetailsSheet
				item={selectedItem}
				context={context}
				status={applicationStatus}
				/>
			)}
		</main>
	);
}
