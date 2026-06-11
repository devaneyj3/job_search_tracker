import { createNewEmail, deleteEmail, getEmailsByConnectionId, updateEmail } from "@/lib/emailService";
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
		const { emailId, subject, body, sequence, sent } = await req.json();
		const newEmail = await createNewEmail({
			emailId,
			subject,
			body,
			sequence,
			sent
		});

		return NextResponse.json({ success: true, email: newEmail });
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

export async function PATCH(req) {
	try {
		const { id, fields } = await req.json();

		if (fields) {
			const updatedEmail = await updateEmail(id, fields);
			return NextResponse.json({
				success: true,
				email: updatedEmail,
			});
		}

		return NextResponse.json(
			{ success: false, error: "Fields required" },
			{ status: 400 },
		);
	} catch (error) {
		console.error("Error updating email:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to update email" },
			{ status: 500 },
		);
	}
}
