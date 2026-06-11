import React from "react";
import { useConnection } from "@/features/connections/context/connectionContext";
import AddConnectionButton from "./AddConnectionButton";
import styles from "@/styles/ItemList.module.scss";
import ConnectionTableRow from "./ConnectionTableRow";
import ConnectionDetailsSheet from "./ConnectionDetailsSheet";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/features/shared/ui/table";

export default function ConnectionsList({ filteredConnections }) {
	const { selectedConnection, connections, noConnectionMsg } = useConnection();

	console.log(connections);

	return (
		<main className={styles.container}>
			<div className={styles.row}>
				<h1 className={styles.title}>
					{filteredConnections.length} TOTAL CONNECTIONS
				</h1>
				<AddConnectionButton />
			</div>
			{!noConnectionMsg && connections.length > 0 ? (
				<div className={styles.tableWrapper}>
					<Table className={styles.table}>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Company</TableHead>
								<TableHead>Position</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Emails Sent</TableHead>
								<TableHead>Last Email</TableHead>
								<TableHead>Email Sent</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Update Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredConnections.map((item) => (
								<ConnectionTableRow key={item.id} item={item} />
							))}
						</TableBody>
					</Table>
				</div>
			) : (
				<div>{noConnectionMsg}</div>
			)}
			{selectedConnection && (
				<ConnectionDetailsSheet item={selectedConnection} />
			)}
		</main>
	);
}
