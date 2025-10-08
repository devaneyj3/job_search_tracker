import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { daysFromNow } from "@/utils";

const prisma = new PrismaClient();

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

		const applications = await prisma.application.findMany({
			where: { userId },
			orderBy: { appliedDate: "asc" },
		});

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

		const company = await prisma.companyInfo.create({
			data: {
				industry: "Software",
				size: "2",
				website: "www.jordandevaney.com",
				linkedin: "linkedin.com",
			},
		});

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
		await prisma.companyInfo.delete({
			where: {
				id: companyInfoId,
			},
		});
		const deletedJob = await prisma.application.delete({
			where: {
				id: id,
			},
		});
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
		const updateJobStatus = await prisma.application.update({
			where: {
				id: jobId,
			},
			data: {
				status: status,
			},
		});
		return NextResponse.json({
			success: true,
			id: `Change job id: ${updateJobStatus.id} to status: ${updateJobStatus.status}`,
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
