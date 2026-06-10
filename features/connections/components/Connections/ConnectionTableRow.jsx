"use client";
import styles from "@/styles/ItemList.module.scss";

import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "@/features/shared/components/ItemStatusSelect";
import { readableDate } from "@/features/shared/lib/utils";
import { TableCell, TableRow } from "@/features/shared/ui/table";
import { useConnection } from "../../context/connectionContext";
import { connectionStatus } from "@/Constants";

const ConnectionTableRow = ({ item }) => {
	const { selectedConnection, setSelectedConnection, setModalOpen, updateConnection } = useConnection();

	const date = readableDate(item.createdAt);
	const companyName =
		typeof item.company === "string" ? item.company : item.company?.name;
	const isActive = item.id === selectedConnection?.id;

	return (
		<TableRow
			className={`${styles.tableRow} ${isActive ? styles.tableRowActive : ""}`}
			onClick={() => {
				setSelectedConnection(item);
				setModalOpen(true);
			}}>
			<TableCell className={styles.tableCell}>
				<div className={styles.companyName}>{item.name || "N/A"}</div>
			</TableCell>
			<TableCell className={styles.tableCell}>{companyName || "N/A"}</TableCell>
			<TableCell className={styles.tableCell}>
				{item.position || "N/A"}
			</TableCell>
			<TableCell className={styles.tableCell}>{item.email || "N/A"}</TableCell>
			<TableCell className={styles.tableCell}>{item.emailCount ?? 0}</TableCell>
			<TableCell className={styles.tableCell}>
				{item.emailSent && item.lastEmailDate
					? readableDate(item.lastEmailDate)
					: "—"}
			</TableCell>
			<TableCell className={styles.tableCell}>
				{item.emailSent ? "Yes" : "No"}
			</TableCell>
			<TableCell className={styles.tableCell}>
				<Badge className={styles.tableStatus}>
					{item.status} on {date}
				</Badge>
			</TableCell>
			<TableCell className={styles.tableCell}>
				<div onClick={(event) => event.stopPropagation()}>
					<ItemStatusSelect
						id={item.id}
						update={updateConnection}
						status={connectionStatus}
					/>
				</div>
			</TableCell>
		</TableRow>
	);
};
export default ConnectionTableRow;
