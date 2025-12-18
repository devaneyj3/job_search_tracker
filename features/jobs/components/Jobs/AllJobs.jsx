import React, { useMemo } from "react";
import { useJob } from "../../context/jobContext";
import ItemList from "@/features/shared/components/ItemList";
import { jobStatus } from "@/Constants";

export default function AllJobs({ filteredJobs, statuses, setChosenStatus }) {
	const jobContext = useJob();

	// In AllJobs.jsx
	const context = useMemo(
		() => ({
			selectedItem: jobContext.selectedJob,
			setSelectedItem: jobContext.setSelectedJob,
			setModalOpen: jobContext.setModalOpen,
			items: jobContext.jobs,
			noItemMsg: jobContext.noJobMsg,
			update: jobContext.updateJobStatus,
			updateJobFields: jobContext.updateJobFields,
			sendEmail: jobContext.sendEmail,
			createCalendarEvent: jobContext.createCalendarEvent,
			modalOpen: jobContext.modalOpen,
		}),
		[
			jobContext.selectedJob,
			jobContext.setSelectedJob,
			jobContext.setModalOpen,
			jobContext.jobs,
			jobContext.noJobMsg,
			jobContext.updateJobStatus,
			jobContext.updateJobFields,
			jobContext.sendEmail,
			jobContext.modalOpen,
			jobContext.createCalendarEvent,
		]
	);

	return (
		<ItemList
			filteredItems={filteredJobs}
			statuses={statuses}
			setChosenStatus={setChosenStatus}
			type="job"
			context={context}
			status={jobStatus}
			title="TOTAL JOBS"
		/>
	);
}
