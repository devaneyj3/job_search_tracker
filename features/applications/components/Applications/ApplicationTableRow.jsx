"use client";

import styles from "@/styles/ItemList.module.scss";
import Link from "next/link";
import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "@/features/shared/components/ItemStatusSelect";
import { ItemCard, ItemCardField } from "@/features/shared/components/ItemCard";
import { readableDate } from "@/features/shared/lib/utils";
import { applicationStatus } from "@/Constants";
import { useApplication } from "../../context/applicationContext";

const ApplicationTableRow = ({ item }) => {
	const {
		selectedApplication,
		setSelectedApplication,
		setModalOpen,
		updateApplication,
	} = useApplication();
	const date = readableDate(item.createdAt);
	const displayName = item.company?.name || "Unknown Company";
	const isActive = item.id === selectedApplication?.id;

	const openSheet = () => {
		setSelectedApplication(item);
		setModalOpen(true);
	};

	return (
		<ItemCard
			isActive={isActive}
			onClick={openSheet}
			title={displayName}
			badge={
				<Badge className={styles.cardStatus}>
					{item.status} · {date}
				</Badge>
			}
			footer={
				<ItemStatusSelect
					id={item.id}
					update={updateApplication}
					status={applicationStatus}
				/>
			}>
			<ItemCardField label="Position">{item.position || "N/A"}</ItemCardField>
			<ItemCardField label="Type">{item.jobType || "N/A"}</ItemCardField>
			<ItemCardField label="Location">{item.location || "N/A"}</ItemCardField>
			<ItemCardField label="Link">
				{item.applicationLink ? (
					<Link
						href={item.applicationLink}
						target="_blank"
						className={styles.cardLink}
						onClick={(event) => event.stopPropagation()}>
						View posting
					</Link>
				) : (
					"N/A"
				)}
			</ItemCardField>
		</ItemCard>
	);
};

export default ApplicationTableRow;
