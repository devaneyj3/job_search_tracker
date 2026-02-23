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
import { useCompany } from "@/features/companies/context/companyContext";

export const ConnectionContext = createContext({});

export const ConnectionProvider = ({ children }) => {
	const { data: session, status } = useSession();
	const {
		companies,
		isLoading: isCompaniesLoading,
		setCompanies,
		setSelectedCompany,
	} = useCompany();
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
				if (!res.ok) throw new Error("Failed to fetch connections");
				const data = await res.json();

				if (data.length > 0) {
					const sortedConnections = data.sort(
						(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
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
				body: JSON.stringify({
					...newConnection,
					userId: session?.user?.id,
				}),
			});

			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || "Failed to save connection to database");
			}

			let nextConnections;
			setConnections((prev) => {
				nextConnections = [...prev, data.connection];
				return nextConnections;
			});

			// Keep company context in sync so new connection appears immediately in company UI.
			setCompanies((prevCompanies) =>
				prevCompanies.map((company) => {
					if (company.id !== data.connection.companyId) return company;
					const currentConnections = company.connections ?? [];
					const alreadyExists = currentConnections.some(
						(connection) => connection.id === data.connection.id
					);
					return alreadyExists
						? company
						: { ...company, connections: [data.connection, ...currentConnections] };
				})
			);
			setSelectedCompany((prevCompany) => {
				if (!prevCompany || prevCompany.id !== data.connection.companyId) {
					return prevCompany;
				}
				const currentConnections = prevCompany.connections ?? [];
				const alreadyExists = currentConnections.some(
					(connection) => connection.id === data.connection.id
				);
				return alreadyExists
					? prevCompany
					: { ...prevCompany, connections: [data.connection, ...currentConnections] };
			});

			setModalOpen(false);
			setSelectedConnection(data.connection);
			setNoConnectionMsg("");

			return data.connection;
		},
		[session?.user?.id, setCompanies, setSelectedCompany]
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
					setNoConnectionMsg("You haven't added any connections yet");
					setSelectedConnection(null);
				} else if (
					selectedConnection &&
					selectedConnection.id === deletedConnectionId.id
				) {
					setSelectedConnection(next[0] ?? null);
				}
				return next;
			});

			// Remove deleted connection from all company.connection arrays.
			setCompanies((prevCompanies) =>
				prevCompanies.map((company) => ({
					...company,
					connections: (company.connections ?? []).filter(
						(connection) => connection.id !== deletedConnectionId.id
					),
				}))
			);
			setSelectedCompany((prevCompany) =>
				prevCompany
					? {
							...prevCompany,
							connections: (prevCompany.connections ?? []).filter(
								(connection) => connection.id !== deletedConnectionId.id
							),
					  }
					: prevCompany
			);

			setModalOpen(false);
			return deletedConnectionId;
		},
		[selectedConnection, setCompanies, setSelectedCompany]
	);

	const updateConnectionStatus = useCallback(async (connectionId, statusValue) => {
		const response = await fetch("/api/connection", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: connectionId,
				status: statusValue,
			}),
		});

		if (!response.ok) throw new Error(`Response status: ${response.status}`);
		setConnections((prevConnections) =>
			prevConnections.map((connection) =>
				connection.id === connectionId
					? { ...connection, status: statusValue }
					: connection
			)
		);

		setSelectedConnection((prev) =>
			prev ? { ...prev, status: statusValue } : prev
		);

		// Mirror status update into company.connection arrays.
		setCompanies((prevCompanies) =>
			prevCompanies.map((company) => ({
				...company,
				connections: (company.connections ?? []).map((connection) =>
					connection.id === connectionId
						? { ...connection, status: statusValue }
						: connection
				),
			}))
		);
		setSelectedCompany((prevCompany) =>
			prevCompany
				? {
						...prevCompany,
						connections: (prevCompany.connections ?? []).map((connection) =>
							connection.id === connectionId
								? { ...connection, status: statusValue }
								: connection
						),
				  }
				: prevCompany
		);
	}, [setCompanies, setSelectedCompany]);

	const updateConnectionFields = useCallback(async (connectionId, data) => {
		const response = await fetch("/api/connection", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: connectionId,
				fields: data,
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

		// Remove from all companies, then add to updatedConnection.companyId.
		setCompanies((prevCompanies) =>
			prevCompanies.map((company) => {
				const withoutConnection = (company.connections ?? []).filter(
					(connection) => connection.id !== connectionId
				);
				if (company.id !== updatedConnection.companyId) {
					return { ...company, connections: withoutConnection };
				}
				return {
					...company,
					connections: [updatedConnection, ...withoutConnection],
				};
			})
		);
		setSelectedCompany((prevCompany) => {
			if (!prevCompany) return prevCompany;
			const withoutConnection = (prevCompany.connections ?? []).filter(
				(connection) => connection.id !== connectionId
			);
			if (prevCompany.id !== updatedConnection.companyId) {
				return { ...prevCompany, connections: withoutConnection };
			}
			return {
				...prevCompany,
				connections: [updatedConnection, ...withoutConnection],
			};
		});

		return updatedConnection;
	}, [setCompanies, setSelectedCompany]);

	useEffect(() => {
		if (!connections.length) return;
		if (isCompaniesLoading) return;
		if (!Array.isArray(companies)) return;
		if (companies.length === 0) return;
		const companyIds = new Set(companies.map((company) => Number(company.id)));
		setConnections((prevConnections) =>
			prevConnections.filter(
				(connection) =>
					connection.companyId == null ||
					companyIds.has(Number(connection.companyId))
			)
		);
	}, [companies, connections.length, isCompaniesLoading]);

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
			updateConnectionStatus,
			updateConnectionFields,
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
