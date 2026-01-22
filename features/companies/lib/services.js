import prisma from "@/features/shared/lib/prisma";

export async function getCompaniesByUserId(userId) {
	if (!userId) {
		throw new Error("User ID is required");
	}

	try {
		const companies = await prisma.company.findMany({
			where: { userId },
			orderBy: { createdAt: "desc" },
		});

		return companies;
	} catch (error) {
		console.error("Error fetching companies by userId:", error);
		throw new Error(`Failed to fetch companies: ${error.message}`);
	}
}

export async function createNewCompany({
	userId,
	name,
	website,
	industry,
	size,
	location,
	description,
	linkedinUrl,
	status,
	notes,
}) {
	// Validate required fields
	if (!userId) {
		throw new Error("User ID is required");
	}
	if (!name) {
		throw new Error("Company name is required");
	}

	try {
		const company = await prisma.company.create({
			data: {
				userId,
				name,
				website,
				industry,
				size,
				location,
				description,
				linkedinUrl,
				status: status || "Researching",
				notes,
			},
		});

		return company;
	} catch (error) {
		console.error("Error creating company:", error);

		// Handle Prisma-specific errors
		if (error.code === "P2002") {
			throw new Error("A company with this name already exists");
		}
		if (error.code === "P2003") {
			throw new Error("Invalid user ID or foreign key constraint failed");
		}

		throw new Error(`Failed to create company: ${error.message}`);
	}
}

export async function deleteCompany(id) {
	if (!id) {
		throw new Error("Company ID is required");
	}

	try {
		const deletedCompany = await prisma.company.delete({
			where: {
				id: id,
			},
		});

		return deletedCompany;
	} catch (error) {
		console.error("Error deleting company:", error);

		// Handle Prisma-specific errors
		if (error.code === "P2025") {
			throw new Error("Company not found");
		}

		throw new Error(`Failed to delete company: ${error.message}`);
	}
}

export async function updateCompanyStatus(companyId, status) {
	if (!companyId) {
		throw new Error("Company ID is required");
	}
	if (!status) {
		throw new Error("Status is required");
	}

	try {
		const updatedCompany = await prisma.company.update({
			where: {
				id: companyId,
			},
			data: {
				status: status,
				statusDate: new Date(),
			},
		});

		return updatedCompany;
	} catch (error) {
		console.error("Error updating company status:", error);

		// Handle Prisma-specific errors
		if (error.code === "P2025") {
			throw new Error("Company not found");
		}

		throw new Error(`Failed to update company status: ${error.message}`);
	}
}

/**
 * Update company fields
 * @param {number} companyId - Company ID
 * @param {Object} data - Fields to update
 * @returns {Promise<Object>} Updated company
 * @throws {Error} If companyId is missing or database operation fails
 */
export async function updateCompanyFields(companyId, data) {
	if (!companyId) {
		throw new Error("Company ID is required");
	}

	try {
		const updatedCompany = await prisma.company.update({
			where: {
				id: companyId,
			},
			data: {
				...data,
			},
		});

		return updatedCompany;
	} catch (error) {
		console.error("Error updating company:", error);

		// Handle Prisma-specific errors
		if (error.code === "P2025") {
			throw new Error("Company not found");
		}

		throw new Error(`Failed to update company: ${error.message}`);
	}
}
