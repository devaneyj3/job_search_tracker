"use client";
import styles from "@/styles/ItemList.module.scss";
import Link from "next/link";

import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "@/features/shared/components/ItemStatusSelect";
import { readableDate } from "@/features/shared/lib/utils";
import { TableCell, TableRow } from "@/features/shared/ui/table";
import { applicationStatus } from "@/Constants";

	const ApplicationTableRow = ({ item }) => {
		const {
		selectedItem,
		setSelectedItem,
		setModalOpen,
		update
	} = useApplication();
		const date = readableDate(item.createdAt);
		const displayName = item.company?.name || "Unknown Company";
		const isActive = item.id === selectedItem?.id;

		return (
			<TableRow
				className={`${styles.tableRow} ${isActive ? styles.tableRowActive : ""}`}
				onClick={() => {
					setSelectedItem(item);
					setModalOpen(true);
				}}>
				<TableCell className={styles.tableCell}>
					<div className={styles.companyName}>{displayName}</div>
				</TableCell>
				<TableCell className={styles.tableCell}>{item.position || "N/A"}</TableCell>
				<TableCell className={styles.tableCell}>{item.jobType || "N/A"}</TableCell>
				<TableCell className={styles.tableCell}>{item.location || "N/A"}</TableCell>
				<TableCell className={styles.tableCell}>
					{item.applicationLink ? (
						<Link href={item.applicationLink} target="_blank" onClick={(event) => event.stopPropagation()}>
							Application Link
						</Link>
					) : (
						"N/A"
					)}
				</TableCell>
				<TableCell className={styles.tableCell}>
					<Badge className={styles.tableStatus}>
						{item.status} on {date}
					</Badge>
				</TableCell>
				<TableCell className={styles.tableCell}>
					<div onClick={(event) => event.stopPropagation()}>
						<ItemStatusSelect id={item.id} update={update} status={applicationStatus} />
					</div>
				</TableCell>
			</TableRow>
		);
	},

export default ApplicationTableRow;
