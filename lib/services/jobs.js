import prisma from "@/lib/prisma";
import { daysFromNow } from "@/lib/utils";

/**
 * Get all applications for a user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} Array of applications
 * @throws {Error} If userId is missing or database query fails
 */
export async function getApplicationsByUserId(userId) {
	if (!userId) {
		throw new Error("User ID is required");
	}

	try {
		const applications = await prisma.application.findMany({
			where: { userId },
			orderBy: { appliedDate: "asc" },
		});

		return applications;
	} catch (error) {
		console.error("Error fetching applications by userId:", error);
		throw new Error(`Failed to fetch applications: ${error.message}`);
	}
}

/**
 * Create a new job application
 * @param {Object} jobData - Job application data
 * @param {string} jobData.userId - User ID
 * @param {string} jobData.jobTitle - Job title
 * @param {string} jobData.companyName - Company name
 * @param {string} jobData.jobUrl - Job URL
 * @param {string} jobData.status - Application status
 * @param {string} [jobData.salary] - Salary
 * @param {string} [jobData.location] - Location
 * @param {string} [jobData.contactName] - Contact name
 * @param {string} [jobData.contactEmail] - Contact email
 * @param {Date} [jobData.lastContactedDate] - Last contacted date
 * @param {boolean} [jobData.initialContactEmailSent] - Initial email sent flag
 * @param {string} [jobData.jobDescription] - Job description
 * @returns {Promise<Object>} Created job application
 * @throws {Error} If required fields are missing or database operation fails
 */
export async function createJobApplication({
	userId,
	jobTitle,
	companyName,
	jobUrl,
	status,
	salary,
	location,
	contactName,
	contactEmail,
	lastContactedDate,
	initialContactEmailSent,
	jobDescription,
}) {
	// Validate required fields
	if (!userId) {
		throw new Error("User ID is required");
	}
	if (!jobTitle) {
		throw new Error("Job title is required");
	}
	if (!companyName) {
		throw new Error("Company name is required");
	}
	if (!jobUrl) {
		throw new Error("Job URL is required");
	}

	try {
		// Create company info
		const company = await prisma.companyInfo.create({
			data: {
				industry: "Software",
				size: "2",
				website: "www.jordandevaney.com",
				linkedin: "linkedin.com",
			},
		});

		// Create job application
		const newJob = await prisma.application.create({
			data: {
				userId,
				jobTitle,
				companyName,
				jobUrl,
				status,
				secondContactDate: daysFromNow(new Date.now(), "5"),
				lastContactedDate,
				initialContactEmailSent,
				salary,
				location,
				contactName,
				contactEmail,
				heard_back: false,
				heard_back_date: null,
				jobDescription,
				companyInfoId: company.id,
			},
		});

		return newJob;
	} catch (error) {
		console.error("Error creating job application:", error);

		// Handle Prisma-specific errors
		if (error.code === "P2002") {
			throw new Error("A job application with this information already exists");
		}
		if (error.code === "P2003") {
			throw new Error("Invalid user ID or foreign key constraint failed");
		}

		throw new Error(`Failed to create job application: ${error.message}`);
	}
}

/**
 * Delete a job application and its associated company info
 * @param {number} id - Application ID
 * @param {number} companyInfoId - Company info ID
 * @returns {Promise<Object>} Deleted job application
 * @throws {Error} If IDs are missing or database operation fails
 */
export async function deleteJobApplication(id, companyInfoId) {
	if (!id) {
		throw new Error("Application ID is required");
	}
	if (!companyInfoId) {
		throw new Error("Company info ID is required");
	}

	try {
		// Delete company info first (due to foreign key constraint)
		await prisma.companyInfo.delete({
			where: {
				id: companyInfoId,
			},
		});

		// Delete the application
		const deletedJob = await prisma.application.delete({
			where: {
				id: id,
			},
		});

		return deletedJob;
	} catch (error) {
		console.error("Error deleting job application:", error);

		// Handle Prisma-specific errors
		if (error.code === "P2025") {
			throw new Error("Job application or company info not found");
		}

		throw new Error(`Failed to delete job application: ${error.message}`);
	}
}

/**
 * Update job application status
 * @param {number} jobId - Job application ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Updated job application
 * @throws {Error} If jobId or status is missing or database operation fails
 */
export async function updateJobStatus(jobId, status) {
	if (!jobId) {
		throw new Error("Job ID is required");
	}
	if (!status) {
		throw new Error("Status is required");
	}

	//if job.status = 'rejected'' change job.archived to false and job.dateArchived to now else archive == false
	let archived = false;
	let dateArchived = null;
	if (status === "Rejected") {
		archived = true;
		dateArchived = new Date();
	}

	try {
		const updatedJob = await prisma.application.update({
			where: {
				id: jobId,
			},
			data: {
				status: status,
				archived: archived,
				dateArchived: dateArchived,
			},
		});

		return updatedJob;
	} catch (error) {
		console.error("Error updating job status:", error);

		// Handle Prisma-specific errors
		if (error.code === "P2025") {
			throw new Error("Job application not found");
		}

		throw new Error(`Failed to update job status: ${error.message}`);
	}
}

/**
 * Update job application fields
 * @param {number} jobId - Job application ID
 * @param {Object} data - Fields to update
 * @returns {Promise<Object>} Updated job application
 * @throws {Error} If jobId is missing or database operation fails
 */
export async function updateJobApplication(jobId, data, originalEmail) {
	//if new edited contact email is different that original change the email dates and sent email = false
	console.log(
		`The new email is ${data.contactEmail}. The original email was ${originalEmail}`
	);
	if (!jobId) {
		throw new Error("Job ID is required");
	}

	// Handle auto-archiving on rejection
	if (data.status === "Rejected") {
		data.archived = true;
		data.dateArchived = new Date();
	}

	try {
		const updatedJob = await prisma.application.update({
			where: {
				id: jobId,
			},
			data: {
				...data,
			},
		});

		return updatedJob;
	} catch (error) {
		console.error("Error updating job application:", error);

		// Handle Prisma-specific errors
		if (error.code === "P2025") {
			throw new Error("Job application not found");
		}

		throw new Error(`Failed to update job application: ${error.message}`);
	}
}
