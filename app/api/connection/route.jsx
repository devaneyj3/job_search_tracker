import { NextResponse } from "next/server";
import {
	getConnectionsByUserId,
	createNewConnection,
	deleteConnection,
	updateConnectionStatus,
	updateConnectionFields,
} from "@/features/connections/lib/services";

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
			companyId,
			position,
			linkedinUrl,
			status,
			notes,
		} = await req.json();

		const newConnection = await createNewConnection({
			userId,
			name,
			email,
			companyId,
			position,
			linkedinUrl,
			status,
			notes,
		});

		return NextResponse.json({ success: true, connection: newConnection });
	} catch (error) {
		console.error("Error creating Connection:", error);
		return NextResponse.json(
			{ success: false, error: error.message || "Failed to create Connection" },
			{ status: 500 }
		);
	}
}

export async function DELETE(req) {
	try {
		const { id } = await req.json();
		await deleteConnection(id);
		return NextResponse.json({ success: true, id });
	} catch (error) {
		console.error("Error deleting Connection:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to delete Connection" },
			{ status: 500 }
		);
	}
}

export async function PATCH(req) {
	try {
		const { id, status, fields } = await req.json();

		if (status) {
			const updatedConnection = await updateConnectionStatus(id, status);
			return NextResponse.json({ success: true, connection: updatedConnection });
		}

		if (fields) {
			const updatedConnection = await updateConnectionFields(id, fields);
			return NextResponse.json({ success: true, connection: updatedConnection });
		}

		return NextResponse.json(
			{ success: false, error: "Status or fields required" },
			{ status: 400 }
		);
	} catch (error) {
		console.error("Error updating Connection:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to update Connection" },
			{ status: 500 }
		);
	}
}
