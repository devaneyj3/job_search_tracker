import prisma from "@/features/shared/lib/prisma";

export async function getConnectionsByUserId(userId) {
	if (!userId) {
		throw new Error("User ID is required");
	}

	try {
		const connections = await prisma.connection.findMany({
			where: { userId },
			orderBy: { createdAt: "desc" },
		});

		return connections;
	} catch (error) {
		console.error("Error fetching connections by userId:", error);
		throw new Error(`Failed to fetch connections: ${error.message}`);
	}
}

export async function createNewConnection({
	userId,
	name,
	email,
	company,
	position,
	linkedinUrl,
	status,
	notes,
}) {
	if (!userId) {
		throw new Error("User ID is required");
	}
	if (!name) {
		throw new Error("Contact name is required");
	}
	if (!email) {
		throw new Error("Email is required");
	}
	if (!company) {
		throw new Error("Company is required");
	}
	if (!position) {
		throw new Error("Position is required");
	}
	if (!linkedinUrl) {
		throw new Error("LinkedIn URL is required");
	}

	try {
		const connection = await prisma.connection.create({
			data: {
				userId,
				name,
				email,
				company,
				position,
				linkedinUrl,
				status: status || "Prospecting",
				notes,
			},
		});

		return connection;
	} catch (error) {
		console.error("Error creating connection:", error);

		if (error.code === "P2002") {
			const target = error.meta?.target || [];
			if (target.includes("id") || target.length === 0) {
				throw new Error("Database sequence error. Please reset the database sequence.");
			}
			throw new Error(`A connection with this ${target.join(", ")} already exists`);
		}
		if (error.code === "P2003") {
			throw new Error("Invalid user ID or foreign key constraint failed");
		}

		throw error;
	}
}

export async function deleteConnection(id) {
	if (!id) {
		throw new Error("Connection ID is required");
	}

	try {
		const deletedConnection = await prisma.connection.delete({
			where: {
				id: id,
			},
		});

		return deletedConnection;
	} catch (error) {
		console.error("Error deleting connection:", error);

		if (error.code === "P2025") {
			throw new Error("Connection not found");
		}

		throw new Error(`Failed to delete connection: ${error.message}`);
	}
}

export async function updateConnectionStatus(connectionId, status) {
	if (!connectionId) {
		throw new Error("Connection ID is required");
	}
	if (!status) {
		throw new Error("Status is required");
	}

	try {
		const updatedConnection = await prisma.connection.update({
			where: {
				id: connectionId,
			},
			data: {
				status: status,
				statusDate: new Date(),
			},
		});

		return updatedConnection;
	} catch (error) {
		console.error("Error updating connection status:", error);

		if (error.code === "P2025") {
			throw new Error("Connection not found");
		}

		throw new Error(`Failed to update connection status: ${error.message}`);
	}
}

export async function updateConnectionFields(connectionId, data) {
	if (!connectionId) {
		throw new Error("Connection ID is required");
	}

	try {
		const updatedConnection = await prisma.connection.update({
			where: {
				id: connectionId,
			},
			data: {
				...data,
			},
		});

		return updatedConnection;
	} catch (error) {
		console.error("Error updating connection:", error);

		if (error.code === "P2025") {
			throw new Error("Connection not found");
		}

		throw new Error(`Failed to update connection: ${error.message}`);
	}
}
