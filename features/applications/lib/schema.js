import { z } from "zod";
import { applicationStatus } from "@/Constants";

export const applicationFormSchema = z.object({
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
	companyId: z.coerce
		.number({
			message: "Associated company is required",
		})
		.int()
		.positive({
			message: "Associated company is required",
		}),
	notes: z.string().optional().or(z.literal("")),
});
