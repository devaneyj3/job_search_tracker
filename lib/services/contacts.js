import prisma from "@/lib/prisma";

export async function getConnectionsByUserId(userId) {
	if (!userId) {
		throw new Error("User ID is required");
	}

	try {
		const connections = await prisma.connection.findMany({
			where: { userId },
			orderBy: { connectedDate: "desc" },
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
	notes,
}) {
	// Validate required fields
	if (!userId) {
		throw new Error("User ID is required");
	}
	if (!name) {
		throw new Error("Connection name is required");
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
				status: "Connected",
				notes,
			},
		});

		return connection;
	} catch (error) {
		console.error("Error creating connection:", error);

		// Handle Prisma-specific errors
		if (error.code === "P2002") {
			throw new Error("A connection with this information already exists");
		}
		if (error.code === "P2003") {
			throw new Error("Invalid user ID or foreign key constraint failed");
		}

		throw new Error(`Failed to create connection: ${error.message}`);
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

		// Handle Prisma-specific errors
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
			},
		});

		return updatedConnection;
	} catch (error) {
		console.error("Error updating connection status:", error);

		// Handle Prisma-specific errors
		if (error.code === "P2025") {
			throw new Error("Connection not found");
		}

		throw new Error(`Failed to update connection status: ${error.message}`);
	}
}
