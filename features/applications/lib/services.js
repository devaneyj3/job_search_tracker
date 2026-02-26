import prisma from "@/features/shared/lib/prisma";

export async function getApplicationsByUserId(userId) {
	if (!userId) {
		throw new Error("User ID is required");
	}

	try {
		const applications = await prisma.application.findMany({
			where: { userId },
			orderBy: { createdAt: "desc" },
			include: {
				company: true,
			},
		});

		return applications;
	} catch (error) {
		console.error("Error fetching applications by userId:", error);
		throw new Error(`Failed to fetch applications: ${error.message}`);
	}
}

export async function createNewApplication({
	userId,
	companyId,
	jobType,
	location,
	applicationLink,
	position,
	jobDescription,
	status,
	notes,
}) {
	if (!userId) {
		throw new Error("User ID is required");
	}
	if (!companyId) {
		throw new Error("Associated company is required");
	}
	if (!jobType?.trim()) {
		throw new Error("Job type is required");
	}
	if (!location?.trim()) {
		throw new Error("Location is required");
	}
	if (!applicationLink?.trim()) {
		throw new Error("Application link is required");
	}
	if (!position?.trim()) {
		throw new Error("Position is required");
	}
	if (!jobDescription?.trim()) {
		throw new Error("Job description is required");
	}

	try {
		const application = await prisma.application.create({
			data: {
				userId,
				companyId,
				jobType: jobType.trim(),
				location: location.trim(),
				applicationLink: applicationLink.trim(),
				position: position.trim(),
				jobDescription: jobDescription.trim(),
				status: status || "Researching",
				notes: notes || null,
			},
			include: {
				company: true,
			},
		});

		return application;
	} catch (error) {
		console.error("Error creating application:", error);

		// Handle Prisma-specific errors
		if (error.code === "P2002") {
			// Check which field caused the unique constraint violation
			const target = error.meta?.target || [];
			
			// If the constraint is on 'id', it means the sequence is out of sync
			if (target.includes("id") || target.length === 0) {
				throw new Error("Database sequence error. Please contact support or reset the database sequence.");
			}
			
			throw new Error(`An application with this ${target.join(", ")} already exists`);
		}
		if (error.code === "P2003") {
			throw new Error("Invalid user ID or foreign key constraint failed");
		}

		// Re-throw the error with its original message
		throw error;
	}
}

export async function deleteApplication(id) {
	if (!id) {
		throw new Error("Application ID is required");
	}

	try {
		const deletedApplication = await prisma.application.delete({
			where: {
				id: id,
			},
		});

		return deletedApplication;
	} catch (error) {
		console.error("Error deleting application:", error);

		// Handle Prisma-specific errors
		if (error.code === "P2025") {
			throw new Error("Application not found");
		}

		throw new Error(`Failed to delete application: ${error.message}`);
	}
}

export async function updateApplicationStatus(applicationId, status) {
	if (!applicationId) {
		throw new Error("Application ID is required");
	}
	if (!status) {
		throw new Error("Status is required");
	}

	try {
		const updatedApplication = await prisma.application.update({
			where: {
				id: applicationId,
			},
			data: {
				status: status,
				statusDate: new Date(),
			},
			include: {
				company: true,
			},
		});

		return updatedApplication;
	} catch (error) {
		console.error("Error updating application status:", error);

		// Handle Prisma-specific errors
		if (error.code === "P2025") {
			throw new Error("Application not found");
		}

		throw new Error(`Failed to update application status: ${error.message}`);
	}
}

/**
 * Update application fields
 * @param {number} applicationId - Application ID
 * @param {Object} data - Fields to update
 * @returns {Promise<Object>} Updated application
 * @throws {Error} If applicationId is missing or database operation fails
 */
export async function updateApplicationFields(applicationId, data) {
	if (!applicationId) {
		throw new Error("Application ID is required");
	}
	if ("applicationLink" in data && !String(data.applicationLink ?? "").trim()) {
		throw new Error("Application link is required");
	}
	if ("jobType" in data && !String(data.jobType ?? "").trim()) {
		throw new Error("Job type is required");
	}
	if ("location" in data && !String(data.location ?? "").trim()) {
		throw new Error("Location is required");
	}
	if ("position" in data && !String(data.position ?? "").trim()) {
		throw new Error("Position is required");
	}
	if ("jobDescription" in data && !String(data.jobDescription ?? "").trim()) {
		throw new Error("Job description is required");
	}

	try {
		const updatedApplication = await prisma.application.update({
			where: {
				id: applicationId,
			},
			data: {
				...data,
			},
			include: {
				company: true,
			},
		});

		return updatedApplication;
	} catch (error) {
		console.error("Error updating application:", error);

		// Handle Prisma-specific errors
		if (error.code === "P2025") {
			throw new Error("Application not found");
		}

		throw new Error(`Failed to update application: ${error.message}`);
	}
}
