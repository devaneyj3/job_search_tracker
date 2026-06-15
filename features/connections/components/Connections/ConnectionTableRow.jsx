"use client";

import styles from "@/styles/ItemList.module.scss";
import { Badge } from "@/features/shared/ui/badge";
import { ItemStatusSelect } from "@/features/shared/components/ItemStatusSelect";
import { ItemCard, ItemCardField } from "@/features/shared/components/ItemCard";
import { emailToSend, readableDate } from "@/features/shared/lib/utils";
import { useConnection } from "../../context/connectionContext";
import { connectionStatus } from "@/Constants";
import EmailFlow from "@/features/shared/components/EmailFlow/EmailFlow";

const ConnectionTableRow = ({ connection }) => {
	const {
		selectedConnection,
		setSelectedConnection,
		setModalOpen,
		updateConnection,
	} = useConnection();

	const date = readableDate(connection.createdAt);
	const isActive = connection.id === selectedConnection?.id;
	const todoSendString = emailToSend(connection);

	const openSheet = () => {
		setSelectedConnection(connection);
		setModalOpen(true);
	};

	return (
		<ItemCard
			isActive={isActive}
			onClick={openSheet}
			title={connection.name || "N/A"}
			meta={
				connection.responded ? (
					<span className={styles.cardMeta}>Responded</span>
				) : null
			}
			badge={
				<Badge className={styles.cardStatus}>
					{connection.status} · {date}
				</Badge>
			}
			footer={
				<ItemStatusSelect
					id={connection.id}
					update={updateConnection}
					status={connectionStatus}
				/>
			}>
			<ItemCardField label="Company">
				{connection.company?.name || "N/A"}
			</ItemCardField>
			<ItemCardField label="Position">
				{connection.position || "N/A"}
			</ItemCardField>
			<ItemCardField label="Email">
				{connection.email || "N/A"}
			</ItemCardField>
			<ItemCardField label="Email flow">
				<div className={styles.cardStack}>
					{connection.emails.map((email) => (
						<EmailFlow key={email.id} email={email} />
					))}
					{todoSendString && (
						<span className={styles.cardMuted}>{todoSendString}</span>
					)}
				</div>
			</ItemCardField>
		</ItemCard>
	);
};

export default ConnectionTableRow;
