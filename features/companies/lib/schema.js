import { z } from "zod";
import { companyStatus } from "@/Constants";

export const companyFormSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: "Company name must be at least 2 characters",
		})
		.optional()
		.or(z.literal("")),
	website: z
		.string()
		.url({
			message: "Invalid website URL",
		})
		.optional()
		.or(z.literal("")),
	industry: z
		.string()
		.min(2, {
			message: "Industry must be at least 2 characters",
		})
		.optional()
		.or(z.literal("")),
	size: z
		.string()
		.optional()
		.or(z.literal("")),
	location: z
		.string()
		.optional()
		.or(z.literal("")),
	description: z
		.string()
		.optional()
		.or(z.literal("")),
	linkedinUrl: z
		.string()
		.url({
			message: "Invalid LinkedIn URL",
		})
		.optional()
		.or(z.literal("")),
	status: z.enum(companyStatus),
	notes: z.string().optional().or(z.literal("")),
});
