"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	useMemo,
	useCallback,
} from "react";
import { useSession } from "next-auth/react";

export const ConnectionContext = createContext({});

export const ConnectionProvider = ({ children }) => {
	const { data: session, status } = useSession();
	const [modalOpen, setModalOpen] = useState(false);
	const [connections, setConnections] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedConnection, setSelectedConnection] = useState(null);
	const [noConnectionMsg, setNoConnectionMsg] = useState("");
	const [connectionFilter, setConnectionFilter] = useState("All");

	console.log(connections);
	const mergeConnectionUpdate = (existing, updated) => ({
		...existing,
		...updated,
		company: updated.company ?? existing.company,
	});

	useEffect(() => {
		if (status === "loading") {
			setIsLoading(true);
			return;
		}
		if (!session?.user?.id) {
			setConnections([]);
			setSelectedConnection(null);
			setIsLoading(false);
			setError("No User session");
			return;
		}
		const load = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const res = await fetch(`/api/connection?userId=${session.user.id}`);
				if (!res.ok) throw new Error("Failed to fetch connections");
				const data = await res.json();

				if (data.length > 0) {
					const sortedConnections = data.sort(
						(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
					);
					setConnections(sortedConnections);
					setSelectedConnection(sortedConnections[0]);
					setNoConnectionMsg("");
				} else {
					setConnections([]);
					setSelectedConnection(null);
					setNoConnectionMsg("You haven't added any connections yet");
				}
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		load();
	}, [session?.user?.id, status]);

	const createConnection = useCallback(
		async (newConnection) => {
			const res = await fetch("/api/connection", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...newConnection,
					userId: session?.user?.id,
				}),
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || "Failed to save connection to database");
			}
			setConnections((prev) => [data.connection, ...prev]);
			setModalOpen(false);
			setSelectedConnection(data.connection);
			setNoConnectionMsg("");
			return data.connection;
		},
		[session?.user?.id],

		//TODO: When adding connections I want the connection to sync to the company state so that I get the value without refreashing
	);
	const deleteConnection = useCallback(
		async (id) => {
			const res = await fetch("/api/connection", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id }),
			});

			const deletedConnectionId = await res.json();
			if (!res.ok) throw new Error("Failed to delete connection");

			setConnections((prev) =>
				prev.filter((c) => c.id !== deletedConnectionId.id),
			);
			setSelectedConnection((prev) => (prev.id === id ? null : prev));
			setModalOpen(false);
			return deletedConnectionId;
		},

		//TODO: When deleting connections I want the connection to sync to the company state so that I get the value without refreashing

		[selectedConnection],
	);

	const updateConnection = useCallback(async (connectionId, data) => {
		const response = await fetch("/api/connection", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: connectionId,
				data,
			}),
		});

		if (!response.ok) throw new Error(`Response status: ${response.status}`);
		const result = await response.json();
		const updatedConnection = result.connection;

		setConnections((prevConnections) =>
			prevConnections.map((connection) =>
				connection.id === connectionId
					? mergeConnectionUpdate(connection, updatedConnection)
					: connection,
			),
		);

		setSelectedConnection((prev) =>
			prev && prev.id === connectionId
				? mergeConnectionUpdate(prev, updatedConnection)
				: prev,
		);

		return updatedConnection;

		//TODO: When updating connection.companyId I want the connection to sync to the company state so that I get the value without refreashing
	}, []);

	const values = useMemo(
		() => ({
			connections,
			setConnections,
			selectedConnection,
			setSelectedConnection,
			noConnectionMsg,
			createConnection,
			deleteConnection,
			modalOpen,
			setModalOpen,
			error,
			isLoading,
			updateConnection,
			connectionFilter,
			setConnectionFilter,
		}),
		[
			connections,
			selectedConnection,
			noConnectionMsg,
			createConnection,
			deleteConnection,
			modalOpen,
			error,
			isLoading,
			updateConnection,
			connectionFilter,
			setConnectionFilter,
		],
	);

	return (
		<ConnectionContext.Provider value={values}>
			{children}
		</ConnectionContext.Provider>
	);
};

export const useConnection = () => useContext(ConnectionContext);
