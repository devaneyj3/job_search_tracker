import moment from "moment";
import business from "moment-business";
export const jobsLength = (status, jobs) => {
	return jobs.filter((job) => job.status == status);
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

//calculation for sending the follow up emails after so many business days
export const daysFromNow = (date, daysFromNow) => {
	const today = moment.utc(date);
	return business.addWeekDays(today, daysFromNow);
};
