import { sendEmail } from "@/features/email/lib/sendEmail";
import { NextResponse } from "next/server";
import prisma from "@/features/shared/lib/prisma";

export async function POST(req) {
	const { values, sendSecondEmail } = await req.json();
	const { id } = values;
	console.log("sending email with, ", values);
	try {
		const res = await sendEmail(values, sendSecondEmail);

		let updateContactDate = null;
		if (res.success && sendSecondEmail) {
			// Update connection for follow-up email
			updateContactDate = await prisma.connection.update({
				where: { id },
				data: {
					emailSent: true,
					lastEmailDate: new Date(),
				},
			});
		} else if (res.success && !sendSecondEmail) {
			// First email sent - update connection
			updateContactDate = await prisma.connection.update({
				where: { id },
				data: {
					emailSent: true,
					firstEmailDate: new Date(),
					lastEmailDate: new Date(),
				},
			});
		}

		return NextResponse.json(updateContactDate, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to send email" },
			{ status: 500 }
		);
	}
}
