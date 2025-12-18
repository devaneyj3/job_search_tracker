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

	useEffect(() => {
		const getConnections = async () => {
			if (!session?.user?.id) {
				setConnections([]);
				setSelectedConnection(null);
				setIsLoading(false);
				setError("No User session");
				return;
			}
			setIsLoading(true);
			setError(null);
			try {
				const res = await fetch(`/api/connection?userId=${session.user.id}`);
				if (!res.ok) throw new Error("Failed to fetch connection");
				const data = await res.json();

				if (data.length > 0) {
					const sortedConnections = data.sort(
						(a, b) => new Date(b.connectedDate) - new Date(a.connectedDate)
					);
					setConnections(sortedConnections);
					setSelectedConnection(sortedConnections[0]);
					setNoConnectionMsg("");
				} else {
					setConnections([]);
					setSelectedConnection(null);
					setNoConnectionMsg("You haven't connected with anyone yet");
				}
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		if (status === "loading") {
			setIsLoading(true);
			return;
		}

		if (status === "authenticated") {
			getConnections();
		} else {
			setConnections([]);
			setSelectedConnection(null);
			setIsLoading(false);
			setError(null);
			setNoConnectionMsg("");
		}
	}, [session?.user?.id, status]);

	const createConnection = useCallback(
		async (newConnection) => {
			const res = await fetch("/api/connection", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...newConnection, userId: session?.user?.id }),
			});

			const data = await res.json();
			if (!res.ok) throw new Error("Failed to save connection to database");

			let nextConnections;
			setConnections((prev) => {
				nextConnections = [...prev, data.connection];
				return nextConnections;
			});
			setModalOpen(false);
			setSelectedConnection(data.connection);
			setNoConnectionMsg("");

			return data.connection;
		},
		[session?.user?.id]
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

			setConnections((prev) => {
				const next = prev.filter(
					(connection) => connection.id !== deletedConnectionId.id
				);
				if (next.length === 0) {
					setNoConnectionMsg("You haven't connected with anyone yet");
					setSelectedConnection(null);
				} else if (
					selectedConnection &&
					selectedConnection.id === deletedConnectionId.id
				) {
					// pick a sensible fallback selection
					setSelectedConnection(next[0] ?? null);
				}
				return next;
			});

			setModalOpen(false);
			return deletedConnectionId;
		},
		[selectedConnection]
	);

	//create calendar event
	const createCalendarEvent = useCallback(
		async (connection) => {
			const res = await fetch("/api/calendar", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...connection }),
			});
			if (!res.ok) throw new Error("Failed to create calendar event");

			const blob = await res.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = "calendar.ics";
			document.body.appendChild(link);
			link.click();
			link.remove();
		},

		// Get the blob from the response
		[session?.user?.id]
	);

	const sendEmail = useCallback(
		async (values, isSecondEmail) => {
			const sendSecondEmail = isSecondEmail | null;
			const res = await fetch("/api/email", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					values,
					sendSecondEmail,
				}),
			});
			const data = await res.json();
			const { lastEmailDate, emailSent, id, archived } = data;

			setConnections((prev) =>
				prev.map((connection) =>
					connection.id === id
						? { ...connection, emailSent, lastEmailDate, archived }
						: connection
				)
			);
			setSelectedConnection(data);

			if (!res.ok) throw new Error("Failed to send email");
		},
		[session?.user?.id]
	);

	const updateConnectionStatus = useCallback(
		async (connectionId, status) => {
			const response = await fetch("/api/connection", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					connectionId,
					status,
				}),
			});

			if (!response.ok) throw new Error(`Response status: ${response.status}`);
			setConnections((prevConnections) =>
				prevConnections.map((connection) =>
					connection.id === connectionId
						? { ...connection, status }
						: connection
				)
			);

			setSelectedConnection((prev) => (prev ? { ...prev, status } : prev));
		},

		[session?.user?.id]
	);

	const updateConnectionFields = useCallback(
		async (connectionId, data) => {
			const response = await fetch("/api/connection", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					connectionId,
					data,
				}),
			});

			if (!response.ok) throw new Error(`Response status: ${response.status}`);
			const result = await response.json();
			const updatedConnection = result.connection;

			setConnections((prevConnections) =>
				prevConnections.map((connection) =>
					connection.id === connectionId ? updatedConnection : connection
				)
			);

			setSelectedConnection((prev) =>
				prev && prev.id === connectionId ? updatedConnection : prev
			);

			return updatedConnection;
		},
		[session?.user?.id]
	);

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
			createCalendarEvent,
			sendEmail,
			setModalOpen,
			error,
			isLoading,
			updateConnectionStatus,
			updateConnectionFields,
		}),
		[
			connections,
			selectedConnection,
			createCalendarEvent,
			noConnectionMsg,
			createConnection,
			deleteConnection,
			modalOpen,
			error,
			isLoading,
			updateConnectionStatus,
			updateConnectionFields,
		]
	);
	return (
		<ConnectionContext.Provider value={values}>
			{children}
		</ConnectionContext.Provider>
	);
};

export const useConnection = () => useContext(ConnectionContext);
