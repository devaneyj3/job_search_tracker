export const jobsLength = (status, jobs) => {
	return jobs.filter((job) => job.status == status).length;
};
