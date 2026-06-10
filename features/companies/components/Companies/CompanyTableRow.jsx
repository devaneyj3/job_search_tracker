"use client";
import styles from "@/styles/ItemList.module.scss";

import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "@/features/shared/components/ItemStatusSelect";
import { readableDate } from "@/features/shared/lib/utils";
import { TableCell, TableRow } from "@/features/shared/ui/table";
import { useCompany } from "../../context/companyContext";
import { companyStatus } from "@/Constants";

const CompanyTableRow = ({ item }) => {
	const { selectedCompany, setSelectedCompany, setModalOpen, updateCompany } = useCompany();
	const date = readableDate(item.createdAt);
	const isActive = item.id === selectedCompany?.id;
	const connectionCount = item.connections?.length ?? 0;

	return (
		<TableRow
			className={`${styles.tableRow} ${isActive ? styles.tableRowActive : ""}`}
			onClick={() => {
				setSelectedCompany(item);
				setModalOpen(true);
			}}>
			<TableCell className={styles.tableCell}>
				<div className={styles.companyName}>{item.name || "N/A"}</div>
			</TableCell>
			<TableCell className={styles.tableCell}>
				{item.industry || "N/A"}
			</TableCell>
			<TableCell className={styles.tableCell}>
				{item.location || "N/A"}
			</TableCell>
			<TableCell className={styles.tableCell}>{item.size || "N/A"}</TableCell>
			<TableCell className={styles.tableCell}>
				<Badge className={styles.tableStatus}>
					{item.status} on {date}
				</Badge>
			</TableCell>
			<TableCell className={styles.tableCell}>
				{connectionCount > 0
					? `${connectionCount} connection(s)`
					: "No connections"}
			</TableCell>
			<TableCell className={styles.tableCell}>
				<div onClick={(event) => event.stopPropagation()}>
					<ItemStatusSelect
						id={item.id}
						update={updateCompany}
						status={companyStatus}
					/>
				</div>
			</TableCell>
		</TableRow>
	);
};

export default CompanyTableRow;
