"use client";
import { memo } from "react";
import { Building } from "lucide-react";
import styles from "@/styles/ItemBox.module.scss";

import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "@/features/shared/components/ItemStatusSelect";
import { readableDate } from "@/features/shared/lib/utils";
import { Label } from "@/features/shared/ui/label";
const CompanyCard = memo(
	function CompanyCard({ item, context, status }) {
		if (!context) return null;

		const { selectedItem, setSelectedItem, setModalOpen, update } = context;
		const date = readableDate(item.createdAt);

		return (
			<div
				className={`${styles.item} ${item.id === selectedItem?.id && styles.active
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
					<div className={styles.itemTitle}>{item.name}</div>
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
					{item.conne  && item.connections.length > 0 ? (
						<div className={styles.contact}>
							<Label>Connections ({item.connections.length})</Label>
							<div>
								{item.connections.map((connection) => (
									<p key={connection.id}>
										{connection.name} - {connection.position}
									</p>
								))}
							</div>
						</div>
					): <>No Connections</>}
				<ItemStatusSelect id={item.id} update={update} status={status} />
			</div>
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
