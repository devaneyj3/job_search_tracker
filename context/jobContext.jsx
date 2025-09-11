"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";

import { useSession, SessionProvider } from "next-auth/react";

export const JobItemContext = createContext({});

export const JobItemProvider = ({ children }) => {
	const { data: session, status } = useSession();

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
				console.log(data);

				//If there are jobs that the user applied to unless set no job applied to
				if (data.length > 0) {
					const sortedJobs = data.sort(
						(a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)
					);

					setJobs(sortedJobs);
					console.log(jobs);
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

	const createJob = async (data) => {
		const res = await fetch("/api/job", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...data, userId: session?.user.id }),
		});
		const newJob = await res.json();
		setJobs((prev) => [...prev, newJob]);
		setSelectedJob(newJob);
		if (!res.ok) throw new Error("Failed to save job to database");
		return newJob;
	};

	const values = useMemo(
		() => ({
			jobs,
			setJobs,
			selectedJob,
			setSelectedJob,
			noJobMsg,
			createJob,
			error,
			isLoading,
		}),
		[
			jobs,
			setJobs,
			selectedJob,
			setSelectedJob,
			createJob,
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
