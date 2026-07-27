import { z } from "zod";
import { applicationStatus, jobLocationOptions, jobTypeOptions } from "@/Constants";

export const applicationFormSchema = z.object({
	jobType: z.enum(jobTypeOptions),
	location: z.enum(jobLocationOptions),
	applicationLink: z.string().url({
		message: "A valid application link is required",
	}),
	position: z
		.string()
		.min(2, {
			message: "Position must be at least 2 characters",
		}),
	jobDescription: z
		.string()
		.min(1, {
			message: "Job description is required",
		}),
	status: z.enum(applicationStatus),
	companyName: z
		.string()
		.min(2, {
			message: "Employer name must be at least 2 characters",
		}),
	notes: z.string().optional().or(z.literal("")),
});
