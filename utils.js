export const jobsLength = (status, jobs) => {
	return jobs.filter((job) => job.status == status).length;
};

export const readableDate = (date) => {
	return new Intl.DateTimeFormat("en-US", {
		year: "2-digit",
		month: "numeric",
		day: "numeric",
	}).format(new Date(date));
};
