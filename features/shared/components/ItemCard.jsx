"use client";
import { memo } from "react";
import { Building } from "lucide-react";
import styles from "@/styles/ItemBox.module.scss";

import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "./ItemStatusSelect";
import { readableDate } from "@/features/shared/lib/utils";

const ItemCard = memo(
	function ItemCard({ item, type = "company", context, status }) {
		if (!context) return null;

		const { selectedItem, setSelectedItem, setModalOpen, update } = context;

		// Get date field for company
		const date = readableDate(item.createdAt);

		// Get title
		const title = item.name;

		return (
			<div
				className={`${styles.item} ${
					item.id === selectedItem?.id && styles.active
				}`}
				onClick={() => {
					setSelectedItem(item);
					setModalOpen(true);
				}}>
				<div>
					<div>
						<Badge className={styles.status}>
							{item.status} on {date}
						</Badge>
					</div>
					<div className={styles.itemTitle}>{title}</div>
					{item.industry && (
						<div className={styles.company}>
							<Building size={15} className={styles.icon} />
							{item.industry}
						</div>
					)}
					{item.location && (
						<div className={styles.company}>
							<Building size={15} className={styles.icon} />
							{item.location}
						</div>
					)}
					{item.size && (
						<div className={styles.company}>
							<Building size={15} className={styles.size} />
							{item.size}
						</div>
					)}
				</div>
				<ItemStatusSelect id={item.id} update={update} status={status} />
			</div>
		);
	},
	(prevProps, nextProps) => {
		// Custom comparison function for memo
		return (
			prevProps.item.id === nextProps.item.id &&
			prevProps.item.status === nextProps.item.status &&
			prevProps.item.name === nextProps.item.name &&
			prevProps.item.industry === nextProps.item.industry &&
			prevProps.item.location === nextProps.item.location &&
			prevProps.context.selectedItem?.id === nextProps.context.selectedItem?.id &&
			prevProps.type === nextProps.type &&
			prevProps.status === nextProps.status
		);
	}
);

export default ItemCard;
