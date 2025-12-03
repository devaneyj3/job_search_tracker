import { NextResponse } from "next/server";
import {
	getApplicationsByUserId,
	createJobApplication,
	deleteJobApplication,
	updateJobStatus,
	updateJobApplication,
} from "@/lib/services/jobs";

// GET /api/job?userId=123
export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const userId = searchParams.get("userId");

		if (!userId) {
			return NextResponse.json(
				{ error: "User ID is required" },
				{ status: 400 }
			);
		}

		const applications = await getApplicationsByUserId(userId);

		return NextResponse.json(applications);
	} catch (error) {
		console.error("Error fetching applications:", error);
		return NextResponse.json(
			{ error: "Failed to fetch applications" },
			{ status: 500 }
		);
	}
}

export async function POST(req) {
	try {
		const {
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
		} = await req.json();

		const newJob = await createJobApplication({
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
		});

		return NextResponse.json({ success: true, job: newJob });
	} catch (error) {
		console.error("Error creating Job:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to create Job" },
			{ status: 500 }
		);
	}
}

export async function DELETE(req) {
	try {
		const { id, companyInfoId } = await req.json();
		const deletedJob = await deleteJobApplication(id, companyInfoId);
		return NextResponse.json({ success: true, id: deletedJob.id });
	} catch (error) {
		console.error("Error deleting Job:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to delete Job" },
			{ status: 500 }
		);
	}
}

export async function PUT(req) {
	try {
		const { jobId, status } = await req.json();
		const updatedJob = await updateJobStatus(jobId, status);
		return NextResponse.json({
			success: true,
			message: `Change job id: ${updatedJob.id} to status: ${updatedJob.status}`,
			archived: updatedJob.archived,
			dateArchived: updatedJob.dateArchived,
		});
	} catch (error) {
		console.log("Error updating job");
		return NextResponse.json(
			{
				success: false,
				error: "Error Updating job status",
			},
			{ status: 500 }
		);
	}
}

export async function PATCH(req) {
	try {
		const { jobId, data } = await req.json();
		const updatedJob = await updateJobApplication(jobId, data);
		return NextResponse.json({
			success: true,
			job: updatedJob,
		});
	} catch (error) {
		console.error("Error updating job:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Failed to update job",
			},
			{ status: 500 }
		);
	}
}
