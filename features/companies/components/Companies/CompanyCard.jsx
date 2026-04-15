"use client";
import { memo } from "react";
import styles from "@/styles/ItemList.module.scss";

import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "@/features/shared/components/ItemStatusSelect";
import { readableDate } from "@/features/shared/lib/utils";
import { TableCell, TableRow } from "@/features/shared/ui/table";
const CompanyCard = memo(
	function CompanyCard({ item, context, status }) {
		if (!context) return null;

		const { selectedItem, setSelectedItem, setModalOpen, update } = context;
		const date = readableDate(item.createdAt);
		const isActive = item.id === selectedItem?.id;
		const connectionCount = item.connections?.length ?? 0;

		return (
			<TableRow
				className={`${styles.tableRow} ${isActive ? styles.tableRowActive : ""}`}
				onClick={() => {
					setSelectedItem(item);
					setModalOpen(true);
				}}>
				<TableCell className={styles.tableCell}>
					<div className={styles.companyName}>{item.name || "N/A"}</div>
				</TableCell>
				<TableCell className={styles.tableCell}>{item.industry || "N/A"}</TableCell>
				<TableCell className={styles.tableCell}>{item.location || "N/A"}</TableCell>
				<TableCell className={styles.tableCell}>{item.size || "N/A"}</TableCell>
				<TableCell className={styles.tableCell}>
					<Badge className={styles.tableStatus}>
						{item.status} on {date}
					</Badge>
				</TableCell>
				<TableCell className={styles.tableCell}>
					{connectionCount > 0 ? `${connectionCount} connection(s)` : "No connections"}
				</TableCell>
				<TableCell className={styles.tableCell}>
					<div onClick={(event) => event.stopPropagation()}>
						<ItemStatusSelect id={item.id} update={update} status={status} />
					</div>
				</TableCell>
			</TableRow>
		);
	},
	(prevProps, nextProps) =>
		prevProps.item.id === nextProps.item.id &&
		prevProps.item.status === nextProps.item.status &&
		prevProps.item.name === nextProps.item.name &&
		prevProps.item.industry === nextProps.item.industry &&
		prevProps.item.location === nextProps.item.location &&
		prevProps.item.size === nextProps.item.size &&
		(prevProps.item.connections?.length ?? 0) ===
		(nextProps.item.connections?.length ?? 0) &&
		prevProps.context.selectedItem?.id === nextProps.context.selectedItem?.id &&
		prevProps.status === nextProps.status
);

export default CompanyCard;
