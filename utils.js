export const jobsLength = (status, jobs) => {
	return jobs.filter((job) => job.status == status).length;
};

export const readableDate = (date) => {
	const parsed = date instanceof Date ? date : new Date(date);
	if (isNaN(parsed)) return "";
	return new Intl.DateTimeFormat("en-US", {
		year: "2-digit",
		month: "numeric",
		day: "numeric",
	}).format(parsed);
};
