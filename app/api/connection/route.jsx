import { NextResponse } from "next/server";
import {
	getConnectionsByUserId,
	createNewConnection,
	deleteConnection,
	updateConnectionStatus,
	updateConnectionFields,
} from "@/features/connections/lib/services";

// GET /api/connection?userId=123
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

		const connections = await getConnectionsByUserId(userId);

		return NextResponse.json(connections);
	} catch (error) {
		console.error("Error fetching connections:", error);
		return NextResponse.json(
			{ error: "Failed to fetch connections" },
			{ status: 500 }
		);
	}
}

export async function POST(req) {
	try {
		const {
			userId,
			contactName,
			contactEmail,
			companyName,
			contactPosition,
			linkedinUrl,
			status,
			notes,
			lastContactedDate,
			initialContactEmailSent,
		} = await req.json();

		const newConnection = await createNewConnection({
			userId,
			name: contactName,
			email: contactEmail,
			company: companyName,
			position: contactPosition,
			linkedinUrl,
			status,
			notes,
			lastEmailDate: lastContactedDate,
			emailSent: initialContactEmailSent,
			firstEmailDate: initialContactEmailSent ? lastContactedDate : null,
		});

		return NextResponse.json({ success: true, connection: newConnection });
	} catch (error) {
		console.error("Error creating Connection:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to create Connection" },
			{ status: 500 }
		);
	}
}

export async function DELETE(req) {
	try {
		const { id } = await req.json();
		const deletedConnection = await deleteConnection(id);
		return NextResponse.json({ success: true, id: deletedConnection.id });
	} catch (error) {
		console.error("Error deleting Connection:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to delete Connection" },
			{ status: 500 }
		);
	}
}

export async function PUT(req) {
	try {
		const { connectionId, status } = await req.json();
		const updatedConnection = await updateConnectionStatus(
			connectionId,
			status
		);

		return NextResponse.json({
			success: true,
			connection: updatedConnection,
		});
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: "Error Updating connection status",
			},
			{ status: 500 }
		);
	}
}

export async function PATCH(req) {
	try {
		const { connectionId, data } = await req.json();
		const updatedConnection = await updateConnectionFields(connectionId, data);
		return NextResponse.json({
			success: true,
			connection: updatedConnection,
		});
	} catch (error) {
		console.error("Error updating connection:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Failed to update connection",
			},
			{ status: 500 }
		);
	}
}
