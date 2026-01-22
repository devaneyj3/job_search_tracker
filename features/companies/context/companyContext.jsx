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

export const CompanyContext = createContext({});

export const CompanyProvider = ({ children }) => {
	const { data: session, status } = useSession();
	const [modalOpen, setModalOpen] = useState(false);
	const [companies, setCompanies] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedCompany, setSelectedCompany] = useState(null);
	const [noCompanyMsg, setNoCompanyMsg] = useState("");

	useEffect(() => {
		const getCompanies = async () => {
			if (!session?.user?.id) {
				setCompanies([]);
				setSelectedCompany(null);
				setIsLoading(false);
				setError("No User session");
				return;
			}
			setIsLoading(true);
			setError(null);
			try {
				const res = await fetch(`/api/company?userId=${session.user.id}`);
				if (!res.ok) throw new Error("Failed to fetch companies");
				const data = await res.json();

				if (data.length > 0) {
					const sortedCompanies = data.sort(
						(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
					);
					setCompanies(sortedCompanies);
					setSelectedCompany(sortedCompanies[0]);
					setNoCompanyMsg("");
				} else {
					setCompanies([]);
					setSelectedCompany(null);
					setNoCompanyMsg("You haven't added any companies yet");
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
			getCompanies();
		} else {
			setCompanies([]);
			setSelectedCompany(null);
			setIsLoading(false);
			setError(null);
			setNoCompanyMsg("");
		}
	}, [session?.user?.id, status]);

	const createCompany = useCallback(
		async (newCompany) => {
			const res = await fetch("/api/company", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...newCompany, userId: session?.user?.id }),
			});

			const data = await res.json();
			if (!res.ok) throw new Error("Failed to save company to database");

			let nextCompanies;
			setCompanies((prev) => {
				nextCompanies = [...prev, data.company];
				return nextCompanies;
			});
			setModalOpen(false);
			setSelectedCompany(data.company);
			setNoCompanyMsg("");

			return data.company;
		},
		[session?.user?.id]
	);

	const deleteCompany = useCallback(
		async (id) => {
			const res = await fetch("/api/company", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id }),
			});

			const deletedCompanyId = await res.json();
			if (!res.ok) throw new Error("Failed to delete company");

			setCompanies((prev) => {
				const next = prev.filter(
					(company) => company.id !== deletedCompanyId.id
				);
				if (next.length === 0) {
					setNoCompanyMsg("You haven't added any companies yet");
					setSelectedCompany(null);
				} else if (
					selectedCompany &&
					selectedCompany.id === deletedCompanyId.id
				) {
					setSelectedCompany(next[0] ?? null);
				}
				return next;
			});

			setModalOpen(false);
			return deletedCompanyId;
		},
		[selectedCompany]
	);

	const updateCompanyStatus = useCallback(
		async (companyId, status) => {
			const response = await fetch("/api/company", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: companyId,
					status,
				}),
			});

			if (!response.ok) throw new Error(`Response status: ${response.status}`);
			setCompanies((prevCompanies) =>
				prevCompanies.map((company) =>
					company.id === companyId ? { ...company, status } : company
				)
			);

			setSelectedCompany((prev) => (prev ? { ...prev, status } : prev));
		},
		[session?.user?.id]
	);

	const updateCompanyFields = useCallback(
		async (companyId, data) => {
			const response = await fetch("/api/company", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: companyId,
					fields: data,
				}),
			});

			if (!response.ok) throw new Error(`Response status: ${response.status}`);
			const result = await response.json();
			const updatedCompany = result.company;

			setCompanies((prevCompanies) =>
				prevCompanies.map((company) =>
					company.id === companyId ? updatedCompany : company
				)
			);

			setSelectedCompany((prev) =>
				prev && prev.id === companyId ? updatedCompany : prev
			);

			return updatedCompany;
		},
		[session?.user?.id]
	);

	const values = useMemo(
		() => ({
			companies,
			setCompanies,
			selectedCompany,
			setSelectedCompany,
			noCompanyMsg,
			createCompany,
			deleteCompany,
			modalOpen,
			setModalOpen,
			error,
			isLoading,
			updateCompanyStatus,
			updateCompanyFields,
		}),
		[
			companies,
			selectedCompany,
			noCompanyMsg,
			createCompany,
			deleteCompany,
			modalOpen,
			error,
			isLoading,
			updateCompanyStatus,
			updateCompanyFields,
		]
	);
	return (
		<CompanyContext.Provider value={values}>
			{children}
		</CompanyContext.Provider>
	);
};

export const useCompany = () => useContext(CompanyContext);
