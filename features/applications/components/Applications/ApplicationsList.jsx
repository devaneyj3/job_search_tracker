import React, { useMemo } from "react";
import { useApplication } from "@/features/applications/context/applicationContext";
import { applicationStatus } from "@/Constants";
import styles from "@/styles/ItemList.module.scss";
import ApplicationTableRow from "@/features/applications/components/Applications/ApplicationTableRow";
import AddApplicationButton from "@/features/applications/components/Applications/AddApplicationButton";
import ApplicationDetailsSheet from "@/features/applications/components/Applications/ApplicationDetailsSheet";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/features/shared/ui/table";

export default function ApplicationsList({ filteredApplications }) {
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
		],
	);
	const { selectedItem, items, noItemMsg } = context;

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>
				{filteredApplications.length} TOTAL APPLICATIONS
			</h1>
			<AddApplicationButton />
			{!noItemMsg && items.length > 0 ? (
				<div className={styles.tableWrapper}>
					<Table className={styles.table}>
						<TableHeader>
							<TableRow>
								<TableHead>Company</TableHead>
								<TableHead>Position</TableHead>
								<TableHead>Job Type</TableHead>
								<TableHead>Location</TableHead>
								<TableHead>Link</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Update Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredApplications.map((item) => (
								<ApplicationTableRow
									key={item.id}
									item={item}
									context={context}
									status={applicationStatus}
								/>
							))}
						</TableBody>
					</Table>
				</div>
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
