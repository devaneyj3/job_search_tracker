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

export const ApplicationContext = createContext({});

export const ApplicationProvider = ({ children }) => {
	const { data: session, status } = useSession();
	const [modalOpen, setModalOpen] = useState(false);
	const [applications, setApplications] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedApplication, setSelectedApplication] = useState(null);
	const [noApplicationMsg, setNoApplicationMsg] = useState("");
	const [applicationFilter, setApplicationFilter] = useState("All");

	useEffect(() => {
		if (status === "loading") {
			setIsLoading(true);
			return;
		}
		if (!session?.user?.id) {
			setApplications([]);
			setSelectedApplication(null);
			setIsLoading(false);
			setError("No User session");
			return;
		}
		const load = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const res = await fetch(`/api/application?userId=${session.user.id}`);
				if (!res.ok) throw new Error("Failed to fetch applications");
				const data = await res.json();

				if (data.length > 0) {
					const sortedApplications = data.sort(
						(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
					);
					setApplications(sortedApplications);
					setSelectedApplication(sortedApplications[0]);
					setNoApplicationMsg("");
				} else {
					setApplications([]);
					setSelectedApplication(null);
					setNoApplicationMsg("You haven't added any applications yet");
				}
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};
		load();
	}, [(session?.user?.id, status)]);

	const createApplication = useCallback(
		async (newApplication) => {
			const res = await fetch("/api/application", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...newApplication, userId: session?.user?.id }),
			});

			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || "Failed to save application to database");
			}
			setApplications((prev) => [data.application, ...prev]);
			setModalOpen(false);
			setSelectedApplication(data.application);
			setNoApplicationMsg("");
			return data.application;
		},
		[session?.user?.id],
	);

	const deleteApplication = useCallback(
		async (id) => {
			const res = await fetch("/api/application", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id }),
			});

			const deletedApplicationId = await res.json();
			if (!res.ok) throw new Error("Failed to delete application");

			setApplications((prev) =>
				prev.filter((a) => a.id !== deletedApplicationId.id),
			);
			setSelectedApplication((prev) => (prev.id === id ? null : prev));

			setModalOpen(false);
		},
		[selectedApplication],
	);

	const updateApplication = useCallback(
		async (applicationId, data) => {
			const response = await fetch("/api/application", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: applicationId,
					fields: data,
				}),
			});

			if (!response.ok) throw new Error(`Response status: ${response.status}`);
			const result = await response.json();
			const updatedApplication = result.application;

			setApplications((prevApplications) =>
				prevApplications.map((application) =>
					application.id === applicationId ? updatedApplication : application,
				),
			);

			setSelectedApplication((prev) =>
				prev && prev.id === applicationId ? updatedApplication : prev,
			);

			return updatedApplication;
		},
		[session?.user?.id],
	);

	const values = useMemo(
		() => ({
			applications,
			setApplications,
			selectedApplication,
			setSelectedApplication,
			noApplicationMsg,
			createApplication,
			deleteApplication,
			modalOpen,
			setModalOpen,
			error,
			isLoading,
			updateApplication,
			applicationFilter,
			setApplicationFilter,
		}),
		[
			applications,
			selectedApplication,
			noApplicationMsg,
			createApplication,
			deleteApplication,
			updateApplication,
			modalOpen,
			error,
			isLoading,
			applicationFilter,
			setApplicationFilter,
		],
	);
	return (
		<ApplicationContext.Provider value={values}>
			{children}
		</ApplicationContext.Provider>
	);
};

export const useApplication = () => useContext(ApplicationContext);
