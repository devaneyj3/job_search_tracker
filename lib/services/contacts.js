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
	connectedDate,
	emailSent,
	firstEmailDate,
	lastEmailDate,
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
				connectedDate: connectedDate || new Date(),
				emailSent: emailSent || false,
				firstEmailDate,
				lastEmailDate,
				emailCount: emailSent ? 1 : 0,
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

/**
 * Update a connection
 * @param {number} connectionId - Connection ID
 * @param {string} userId - User ID (for authorization)
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Updated connection
 * @throws {Error} If connection not found, unauthorized, or update fails
 */
export async function updateConnection(connectionId, userId, updateData) {
	if (!connectionId) {
		throw new Error("Connection ID is required");
	}
	if (!userId) {
		throw new Error("User ID is required");
	}

	try {
		// Verify connection belongs to user
		const existing = await prisma.connection.findFirst({
			where: {
				id: connectionId,
				userId,
			},
		});

		if (!existing) {
			throw new Error("Connection not found or unauthorized");
		}

		const updatedConnection = await prisma.connection.update({
			where: {
				id: connectionId,
			},
			data: updateData,
		});

		return updatedConnection;
	} catch (error) {
		console.error("Error updating connection:", error);

		if (error.message === "Connection not found or unauthorized") {
			throw error;
		}

		// Handle Prisma-specific errors
		if (error.code === "P2025") {
			throw new Error("Connection not found");
		}

		throw new Error(`Failed to update connection: ${error.message}`);
	}
}
