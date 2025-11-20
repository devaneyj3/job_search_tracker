import { NextResponse } from "next/server";
import {
	getConnectionsByUserId,
	createNewConnection,
	deleteConnection,
	updateConnection,
} from "@/lib/services/contacts";

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
		} = await req.json();

		const newConnection = await createNewConnection({
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
		const { connectionId, userId, updateData } = await req.json();
		const updatedConnection = await updateConnection(
			connectionId,
			userId,
			updateData
		);
		return NextResponse.json({
			success: true,
			id: `Change connection id: ${updatedConnection.id} to updated data`,
		});
	} catch (error) {
		console.log("Error updating connection");
		return NextResponse.json(
			{
				success: false,
				error: "Error Updating connection",
			},
			{ status: 500 }
		);
	}
}
