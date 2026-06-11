"use client";
import styles from "@/styles/ItemList.module.scss";

import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "@/features/shared/components/ItemStatusSelect";
import { readableDate } from "@/features/shared/lib/utils";
import { TableCell, TableRow } from "@/features/shared/ui/table";
import { useConnection } from "../../context/connectionContext";
import { connectionStatus } from "@/Constants";

const ConnectionTableRow = ({ connection }) => {
	const {
		selectedConnection,
		setSelectedConnection,
		setModalOpen,
		updateConnection,
	} = useConnection();

	const date = readableDate(connection.createdAt);
	const isActive = connection.id === selectedConnection?.id;

	return (
		<TableRow
			className={`${styles.tableRow} ${isActive ? styles.tableRowActive : ""}`}
			onClick={() => {
				setSelectedConnection(connection);
				setModalOpen(true);
			}}>
			<TableCell className={styles.tableCell}>
				<div className={styles.companyName}>{connection.name || "N/A"}</div>
			</TableCell>
			<TableCell className={styles.tableCell}>
				{connection.company?.name || "N/A"}
			</TableCell>
			<TableCell className={styles.tableCell}>
				{connection.position || "N/A"}
			</TableCell>
			<TableCell className={styles.tableCell}>
				{connection.email || "N/A"}
			</TableCell>
			<TableCell className={styles.tableCell}>
				{connection.emailCount ?? 0}
			</TableCell>
			<TableCell className={styles.tableCell}>
				{connection.emailSent && connection.lastEmailDate
					? readableDate(connection.lastEmailDate)
					: "—"}
			</TableCell>
			<TableCell className={styles.tableCell}>
				{connection.emailSent ? "Yes" : "No"}
			</TableCell>
			<TableCell className={styles.tableCell}>
				<Badge className={styles.tableStatus}>
					{connection.status} on {date}
				</Badge>
			</TableCell>
			<TableCell className={styles.tableCell}>
				<div onClick={(event) => event.stopPropagation()}>
					<ItemStatusSelect
						id={connection.id}
						update={updateConnection}
						status={connectionStatus}
					/>
				</div>
			</TableCell>
		</TableRow>
	);
};
export default ConnectionTableRow;
