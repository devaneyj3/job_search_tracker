import { z } from "zod";
import { connectionStatus } from "@/Constants";

export const connectionFormSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: "Name must be at least 2 characters",
		})
		.optional()
		.or(z.literal("")),
	email: z
		.string()
		.email({
			message: "Invalid email address",
		})
		.optional()
		.or(z.literal("")),
	companyId: z.coerce
		.number({
			message: "Company is required",
		})
		.int()
		.positive({
			message: "Company is required",
		}),
	position: z
		.string()
		.min(2, {
			message: "Position must be at least 2 characters",
		})
		.optional()
		.or(z.literal("")),
	linkedinUrl: z
		.string()
		.url({
			message: "Invalid LinkedIn URL",
		})
		.optional()
		.or(z.literal("")),
	status: z.enum(connectionStatus),
	notes: z.string().optional().or(z.literal("")),
});
