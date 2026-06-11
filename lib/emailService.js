import prisma from "@/features/shared/lib/prisma";

export async function getEmailsByConnectionId(connectionId) {
	if (!connectionId) {
		throw new Error("Connection ID is required");
	}

	try {
		return await prisma.email.findMany({
			where: { connectionId: Number(connectionId) },
			orderBy: { createdAt: "desc" },
		});
	} catch (error) {
		console.error("Error fetching emails:", error);
		throw new Error(`Failed to fetch emails: ${error.message}`);
	}
}

export async function recordConnectionEmail({
	connectionId,
	subject,
	body,
	sequence,
}) {
	if (!connectionId) {
		throw new Error("Connection ID is required");
	}
	if (!subject?.trim()) {
		throw new Error("Subject is required");
	}
	if (body == null) {
		throw new Error("Body is required");
	}
	if (!sequence || sequence < 1) {
		throw new Error("Sequence must be at least 1");
	}

	try {
		return await prisma.$transaction(async (tx) => {
			const email = await tx.email.create({
				data: {
					connectionId: Number(connectionId),
					subject,
					body,
					sequence: Number(sequence),
					sent: true,
					sentAt: new Date(),
				},
			});

			const connection = await tx.connection.update({
				where: { id: Number(connectionId) },
				data: {
					emailSent: true,
					emailCount: { increment: 1 },
					lastEmailDate: new Date(),
					status: "Contacted",
					statusDate: new Date(),
				},
				include: {
					company: true,
					emails: true,
				},
			});

			return { email, connection };
		});
	} catch (error) {
		console.error("Error recording email:", error);

		if (error.code === "P2025") {
			throw new Error("Connection not found");
		}
		if (error.code === "P2003") {
			throw new Error("Invalid connection ID");
		}

		throw error;
	}
}

export const createNewEmail = recordConnectionEmail;

export async function deleteEmail(emailId) {
	if (!emailId) {
		throw new Error("Email ID is required");
	}

	try {
		return await prisma.email.delete({
			where: {
				id: emailId,
			},
		});
	} catch (error) {
		console.error("Error deleting email:", error);

		if (error.code === "P2025") {
			throw new Error("Email not found");
		}

		throw new Error(`Failed to delete email: ${error.message}`);
	}
}
