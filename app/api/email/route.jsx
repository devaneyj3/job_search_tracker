import {
	recordConnectionEmail,
	deleteEmail,
	getEmailsByConnectionId,
} from "@/lib/emailService";
import { NextResponse } from "next/server";

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const connectionId = searchParams.get("connectionId");
		if (!connectionId) {
			return NextResponse.json(
				{ error: "Connection ID is required" },
				{ status: 400 },
			);
		}

		const emails = await getEmailsByConnectionId(connectionId);
		return NextResponse.json(emails);
	} catch (error) {
		console.error("Error fetching emails:", error);
		return NextResponse.json(
			{ error: "Failed to fetch emails" },
			{ status: 500 },
		);
	}
}

export async function POST(req) {
	try {
		const { connectionId, subject, body, sequence } = await req.json();
		const { email, connection } = await recordConnectionEmail({
			connectionId,
			subject,
			body,
			sequence,
		});

		return NextResponse.json({ success: true, email, connection });
	} catch (error) {
		console.error("Error creating email:", error);
		return NextResponse.json(
			{
				success: false,
				error: error.message || "Failed to create email",
			},
			{ status: 500 },
		);
	}
}

export async function DELETE(req) {
	try {
		const { id } = await req.json();
		await deleteEmail(id);
		return NextResponse.json({ success: true, id });
	} catch (error) {
		console.error("Error deleting email:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to delete email" },
			{ status: 500 },
		);
	}
}
