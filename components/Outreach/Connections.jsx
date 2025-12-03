import React, { useMemo } from "react";
import { useConnection } from "@/context/connectionContext";
import ItemList from "@/components/shared/ItemList";
import { connectionStatus } from "@/Constants";

export default function Connections({
	filteredConnections,
	statuses,
	setChosenStatus,
}) {
	const connectionContext = useConnection();

	// Map connection context to generic context format
	const context = useMemo(
		() => ({
		selectedItem: connectionContext.selectedConnection,
		setSelectedItem: connectionContext.setSelectedConnection,
		setModalOpen: connectionContext.setModalOpen,
		items: connectionContext.connections,
		noItemMsg: connectionContext.noConnectionMsg,
		sendEmail: connectionContext.sendEmail,
		update: connectionContext.updateConnectionStatus,
			updateConnectionFields: connectionContext.updateConnectionFields,
		modalOpen: connectionContext.modalOpen,
		}),
		[
			connectionContext.selectedConnection,
			connectionContext.setSelectedConnection,
			connectionContext.setModalOpen,
			connectionContext.connections,
			connectionContext.noConnectionMsg,
			connectionContext.sendEmail,
			connectionContext.updateConnectionStatus,
			connectionContext.updateConnectionFields,
			connectionContext.modalOpen,
		]
	);

	return (
		<ItemList
			filteredItems={filteredConnections}
			statuses={statuses}
			setChosenStatus={setChosenStatus}
			type="connection"
			context={context}
			title="TOTAL CONNECTIONS"
			status={connectionStatus}
		/>
	);
}
