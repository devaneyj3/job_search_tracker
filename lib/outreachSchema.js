import { z } from "zod";
import { connectionStatus } from "@/Constants";

export const outreachFormSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: "Name must be at least 2 characters",
		})
		.optional()
		.or(z.literal("")),
	email: z
		.email({
			message: "Invalid email address",
		})
		.optional()
		.or(z.literal("")),
	company: z
		.string()
		.min(2, {
			message: "Company must be at least 2 characters",
		})
		.optional()
		.or(z.literal("")),
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
	statusDate: z.string().optional().or(z.literal("")),
	emailSent: z.boolean().optional(),
	firstEmailDate: z.string().optional().or(z.literal("")),
	emailCount: z.number().int().min(0).optional(),
	notes: z.string().optional().or(z.literal("")),
});
