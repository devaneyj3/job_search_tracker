import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import business from "moment-business";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const itemLength = (status, items) => {
	return items.filter((item) => {
		return item.status === status && item.archived !== true;
	});
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
