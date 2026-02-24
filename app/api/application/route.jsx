import { NextResponse } from "next/server";
import {
	getApplicationsByUserId,
	createNewApplication,
	deleteApplication,
	updateApplicationStatus,
	updateApplicationFields,
} from "@/features/applications/lib/services";

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const userId = searchParams.get("userId");

		if (!userId) {
			return NextResponse.json({ error: "User ID is required" }, { status: 400 });
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
			companyId,
			position,
			jobDescription,
			status,
			notes,
		} = await req.json();
		const newApplication = await createNewApplication({
			userId,
			companyId,
			position,
			jobDescription,
			status,
			notes,
		});

		return NextResponse.json({ success: true, application: newApplication });
	} catch (error) {
		console.error("Error creating application:", error);
		return NextResponse.json(
			{ success: false, error: error.message || "Failed to create application" },
			{ status: 500 }
		);
	}
}

export async function DELETE(req) {
	try {
		const { id } = await req.json();
		await deleteApplication(id);
		return NextResponse.json({ success: true, id });
	} catch (error) {
		console.error("Error deleting application:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to delete application" },
			{ status: 500 }
		);
	}
}

export async function PATCH(req) {
	try {
		const { id, status, fields } = await req.json();

		if (status) {
			const updatedApplication = await updateApplicationStatus(id, status);
			return NextResponse.json({ success: true, application: updatedApplication });
		}

		if (fields) {
			const updatedApplication = await updateApplicationFields(id, fields);
			return NextResponse.json({ success: true, application: updatedApplication });
		}

		return NextResponse.json(
			{ success: false, error: "Status or fields required" },
			{ status: 400 }
		);
	} catch (error) {
		console.error("Error updating application:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to update application" },
			{ status: 500 }
		);
	}
}
