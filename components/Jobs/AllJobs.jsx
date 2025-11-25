import React from "react";
import { useJob } from "@/context/jobContext";
import ItemList from "@/components/shared/ItemList";

export default function AllJobs({ filteredJobs, statuses, setChosenStatus }) {
	const jobContext = useJob();

	// Map job context to generic context format
	const context = {
		selectedItem: jobContext.selectedJob,
		setSelectedItem: jobContext.setSelectedJob,
		setModalOpen: jobContext.setModalOpen,
		items: jobContext.jobs,
		noItemMsg: jobContext.noJobMsg,
		sendEmail: jobContext.sendEmail,
		modalOpen: jobContext.modalOpen,
	};

	return (
		<ItemList
			filteredItems={filteredJobs}
			statuses={statuses}
			setChosenStatus={setChosenStatus}
			type="job"
			context={context}
			title="TOTAL JOBS"
		/>
	);
}
