import { z } from "zod";
import { contactPosition, jobStatus } from "@/Constants";

export const formSchema = z.object({
	jobTitle: z.string().min(2, {
		message: "Job Title must be at least 2 characters.",
	}),
	companyName: z.string().min(2, {
		message: "Company Name must be at least 2 characters.",
	}),
	jobUrl: z.httpUrl().min(2, {
		message: "Job Url must be at least 2 characters.",
	}),
	status: z.enum(jobStatus),
	salary: z.string().nullable(),
	location: z.string().min(2, {
		message: "Location must be 2 characters",
	}),
	contactName: z
		.string()
		.min(2, {
			message: "Contact name must be 2 characters",
		})
		.optional()
		.or(z.literal("")),
	contactEmail: z
		.email()
		.min(2, {
			message: "Email must be 2 characters",
		})
		.optional()
		.or(z.literal("")),
	jobDescription: z.string().min(2, {
		message: "Job description must be 2 characters",
	}),
	skill1: z
		.string()
		.min(1, {
			message: "Enter in a skill",
		})
		.optional()
		.or(z.literal("")),
	skill2: z
		.string()
		.min(1, {
			message: "Goal can not be empty",
		})
		.optional()
		.or(z.literal("")),
	contactPosition: z.enum(contactPosition),
});
