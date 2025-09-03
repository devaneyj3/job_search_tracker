import React from "react";
import Stats from "@/components/Stats/Stats";
import AllJobs from "@/components/AllJobs/AllJobs";

export const metadata = {
	title: "Profile | Job Tracker",
	description: "Track your jobs",
};

//   TODO: What and how should I display this data? What properties should I use? jobTitle, companyName, jobUrl, appliedDate, statusDate, archived, salary, location, contactName, contactEmail, nextFollowUpDate, lastContactedDate, jobDescription, interviewNotes, interviewDate, offerDetails, rejectionReason, dateArchived, notes

const jobs = [
	{
		id: 1,
		title: "Full Stack Engineer",
		company: "Gravity",
		appliedDate: "9/2/25",
		status: "Applied",
	},
	{
		id: 2,
		title: "Backend Engineer",
		company: "Beta",
		appliedDate: "9/2/25",
		status: "Interview",
	},
	{
		id: 3,
		title: "Backend Engineer",
		company: "Beta",
		appliedDate: "9/2/25",
		status: "Applied",
	},
	{
		id: 4,
		title: "Backend Engineer",
		company: "Beta",
		appliedDate: "9/2/25",
		status: "Offer",
	},
];

export default function ProfilePage() {
	return (
		<>
			<Stats jobs={jobs} />
			<AllJobs jobs={jobs} />
		</>
	);
}
