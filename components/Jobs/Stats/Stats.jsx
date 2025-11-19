import React from "react";
import { jobsLength } from "@/utils";
import Metrics from "@/components/shared/Metrics/Metrics";

export default function Stats({ jobs }) {
	// placeholder metrics
	const appliedJobs = jobsLength("Applied", jobs);
	const interviewsJobs = jobsLength("Interview", jobs);
	const offersJobs = jobsLength("Offer", jobs);
	const rejectedJobs = jobsLength("Rejected", jobs);
	const archivedJobs = jobs.filter((job) => job.archived);

	const metrics = [
		{ id: "applied", label: "Applied", value: appliedJobs.length },
		{ id: "interviews", label: "Interviews", value: interviewsJobs.length },
		{ id: "offers", label: "Offers", value: offersJobs.length },
		{ id: "rejected", label: "Rejected", value: rejectedJobs.length },
		{ id: "archived", label: "Archived", value: archivedJobs.length },
	];

	return <Metrics metrics={metrics} title="Stats" />;
}
