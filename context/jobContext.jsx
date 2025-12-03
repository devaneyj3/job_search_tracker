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

export const JobItemContext = createContext({});

export const JobItemProvider = ({ children }) => {
	const { data: session, status } = useSession();
	const [modalOpen, setModalOpen] = useState(false);
	const [jobs, setJobs] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedJob, setSelectedJob] = useState(null);
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

				if (data.length > 0) {
					const sortedJobs = data.sort(
						(a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)
					);
					setJobs(sortedJobs);
					setSelectedJob(sortedJobs[0]);
					setNoJobsMsg("");
				} else {
					setJobs([]);
					setSelectedJob(null);
					setNoJobsMsg("You haven't applied to any jobs yet");
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
			getJobs();
		} else {
			setJobs([]);
			setSelectedJob(null);
			setIsLoading(false);
			setError(null);
			setNoJobsMsg("");
		}
	}, [session?.user?.id, status]);

	const createJob = useCallback(
		async (newJob) => {
			const res = await fetch("/api/job", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...newJob, userId: session?.user?.id }),
			});

			const data = await res.json();
			if (!res.ok) throw new Error("Failed to save job to database");

			let nextJobs;
			setJobs((prev) => {
				nextJobs = [...prev, data.job];
				return nextJobs;
			});
			setModalOpen(false);
			setSelectedJob(data.job);
			setNoJobsMsg("");

			return data.job;
		},
		[session?.user?.id]
	);

	const deleteJob = useCallback(
		async (id, companyInfoId) => {
			const res = await fetch("/api/job", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id, companyInfoId }),
			});

			const deletedJobId = await res.json();
			if (!res.ok) throw new Error("Failed to delete job");

			setJobs((prev) => {
				const next = prev.filter((job) => job.id !== deletedJobId.id);
				if (next.length === 0) {
					setNoJobsMsg("You haven't applied to any jobs yet");
					setSelectedJob(null);
				} else if (selectedJob && selectedJob.id === deletedJobId.id) {
					// pick a sensible fallback selection
					setSelectedJob(next[0] ?? null);
				}
				return next;
			});

			setModalOpen(false);
			return deletedJobId;
		},
		[selectedJob]
	);

	//create calendar event
	const createCalendarEvent = useCallback(
		async (job) => {
			const res = await fetch("/api/calendar", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...job }),
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
			const { lastContactedDate, secondContactEmailSent, id, archived } = data;

			setJobs((prev) =>
				prev.map((job) =>
					job.id === id
						? { ...job, secondContactEmailSent, lastContactedDate, archived }
						: job
				)
			);
			setSelectedJob(data);

			if (!res.ok) throw new Error("Failed to send email");
		},
		[session?.user?.id]
	);

	const updateJobStatus = useCallback(
		async (jobId, status) => {
			const response = await fetch("/api/job", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					jobId,
					status,
				}),
			});

			if (!response.ok) throw new Error(`Response status: ${response.status}`);
			const data = await response.json();
			const { archived, dateArchived } = data;

			setJobs((prevJobs) =>
				prevJobs.map((job) =>
					job.id === jobId ? { ...job, status, archived, dateArchived } : job
				)
			);

			setSelectedJob((prev) =>
				prev && prev.id === jobId
					? { ...prev, status, archived, dateArchived }
					: prev
			);
		},

		[session?.user?.id]
	);

	const updateJobFields = useCallback(
		async (jobId, data) => {
			const response = await fetch("/api/job", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					jobId,
					data,
				}),
			});

			if (!response.ok) throw new Error(`Response status: ${response.status}`);
			const result = await response.json();
			const updatedJob = result.job;

			setJobs((prevJobs) =>
				prevJobs.map((job) => (job.id === jobId ? updatedJob : job))
			);

			setSelectedJob((prev) => (prev && prev.id === jobId ? updatedJob : prev));

			return updatedJob;
		},
		[session?.user?.id]
	);

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
			createCalendarEvent,
			sendEmail,
			setModalOpen,
			error,
			isLoading,
			updateJobStatus,
			updateJobFields,
		}),
		[
			jobs,
			selectedJob,
			createCalendarEvent,
			noJobMsg,
			createJob,
			deleteJob,
			modalOpen,
			error,
			isLoading,
			updateJobStatus,
			updateJobFields,
		]
	);
	return (
		<JobItemContext.Provider value={values}>{children}</JobItemContext.Provider>
	);
};

export const useJob = () => useContext(JobItemContext);
