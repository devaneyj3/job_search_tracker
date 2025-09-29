import React from "react";
import JobBox from "../JobBox/JobBox";

export default function EmailContacts({ jobs }) {
	return (
		<>
			{jobs.map((j, index) => {
				return <JobBox key={index} j={j} />;
			})}
		</>
	);
}
