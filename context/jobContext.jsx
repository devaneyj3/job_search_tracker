"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";

import { useSession, SessionProvider } from "next-auth/react";

export const JobItemContext = createContext({});

export const JobItemProvider = ({ children }) => {
	const { data: session, status } = useSession();
	const [modalOpen, setModalOpen] = useState(false);

	const [jobs, setJobs] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedJob, setSelectedJob] = useState({});
	const [noJobMsg, setNoJobsMsg] = useState("");

	useEffect(() => {
		const getJobs = async () => {
			if (!session?.user?.id) {
				setJobs([]);
				setSelectedJob(null);
				setIsLoading(false);
				setError("No User session");
				return;
			}
			setIsLoading(true);
			setError(null);
			try {
				const res = await fetch(`/api/job?userId=${session.user.id}`);
				if (!res.ok) throw new Error("Failed to fetch job");
				const data = await res.json();

				//If there are jobs that the user applied to unless set no job applied to
				if (data.length > 0) {
					const sortedJobs = data.sort(
						(a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)
					);

					setJobs(sortedJobs);
					if (data.length > 0) setSelectedJob(data[0]);
				} else {
					setNoJobsMsg("You haven't applied to any jobs yet");
					setJobs([]);
				}
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		// Handle session loading state
		if (status === "loading") {
			setIsLoading(true);
			return;
		}

		if (status === "authenticated") {
			getJobs();
		} else {
			// Session is not authenticated or unauthenticated
			setJobs([]);
			setSelectedJob(null);
			setIsLoading(false);
			setError(null);
		}
	}, [session?.user?.id, status]);

	const createJob = async (newJob) => {
		const res = await fetch("/api/job", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...newJob, userId: session?.user.id }),
		});
		const data = await res.json();
		setJobs((prev) => [...prev, data.job]);
		setModalOpen(false);
		setSelectedJob(newJob);
		if (!res.ok) throw new Error("Failed to save job to database");
		return newJob;
	};
	const deleteJob = async (id, companyInfoId) => {
		const res = await fetch("/api/job", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: id, companyInfoId: companyInfoId }),
		});
		const deletedJobId = await res.json();
		setJobs((prev) => jobs.filter((job) => job.id != deletedJobId.id));
		setModalOpen(false);
		if (!res.ok) throw new Error("Failed to delete job");
		return deletedJobId;
	};

	const values = useMemo(
		() => ({
			jobs,
			setJobs,
			selectedJob,
			setSelectedJob,
			noJobMsg,
			createJob,
			deleteJob,
			modalOpen,
			setModalOpen,
			error,
			isLoading,
		}),
		[
			jobs,
			setJobs,
			selectedJob,
			setSelectedJob,
			createJob,
			deleteJob,
			modalOpen,
			setModalOpen,
			error,
			isLoading,
			noJobMsg,
		]
	);
	return (
		<SessionProvider>
			<JobItemContext.Provider value={values}>
				{children}
			</JobItemContext.Provider>
		</SessionProvider>
	);
};

export const useJob = () => useContext(JobItemContext);
