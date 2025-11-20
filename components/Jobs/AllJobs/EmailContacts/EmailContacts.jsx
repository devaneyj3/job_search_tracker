import React from "react";
import ItemBox from "@/components/shared/ItemBox/ItemBox";
import { useJob } from "@/context/jobContext";

export default function EmailContacts({ jobs }) {
	const jobContext = useJob();

	// Map job context to generic context format
	const context = {
		selectedItem: jobContext.selectedJob,
		setSelectedItem: jobContext.setSelectedJob,
		setModalOpen: jobContext.setModalOpen,
	};

	return (
		<>
			{jobs.map((job, index) => {
				return <ItemBox key={index} item={job} type="job" context={context} />;
			})}
		</>
	);
}
