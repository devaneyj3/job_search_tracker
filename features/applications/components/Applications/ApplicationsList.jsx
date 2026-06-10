import React from "react";
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
								<ApplicationTableRow key={item.id} item={item} />
							))}
						</TableBody>
					</Table>
				</div>
			) : (
				<div>{noApplicationMsg}</div>
			)}
			{selectedApplication && <ApplicationDetailsSheet item={selectedApplication} />}
		</main>
	);
}
