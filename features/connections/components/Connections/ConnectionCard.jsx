"use client";
import { memo } from "react";
import styles from "@/styles/ItemList.module.scss";

import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "@/features/shared/components/ItemStatusSelect";
import { readableDate } from "@/features/shared/lib/utils";
import { TableCell, TableRow } from "@/features/shared/ui/table";

const ConnectionCard = memo(
	function ConnectionCard({ item, context, status }) {
		if (!context) return null;

		const { selectedItem, setSelectedItem, setModalOpen, update } = context;
		const date = readableDate(item.createdAt);
		const companyName =
			typeof item.company === "string" ? item.company : item.company?.name;
		const isActive = item.id === selectedItem?.id;

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
				<TableCell className={styles.tableCell}>{companyName || "N/A"}</TableCell>
				<TableCell className={styles.tableCell}>{item.position || "N/A"}</TableCell>
				<TableCell className={styles.tableCell}>{item.email || "N/A"}</TableCell>
				<TableCell className={styles.tableCell}>
					<Badge className={styles.tableStatus}>
						{item.status} on {date}
					</Badge>
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
		prevProps.item.companyId === nextProps.item.companyId &&
		(prevProps.item.company?.name ?? prevProps.item.company) ===
			(nextProps.item.company?.name ?? nextProps.item.company) &&
		prevProps.item.position === nextProps.item.position &&
		prevProps.item.email === nextProps.item.email &&
		prevProps.context.selectedItem?.id === nextProps.context.selectedItem?.id &&
		prevProps.status === nextProps.status
);

export default ConnectionCard;
