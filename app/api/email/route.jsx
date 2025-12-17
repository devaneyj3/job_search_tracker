import { sendEmail } from "@/email/sendEmail";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
	const { values, sendSecondEmail } = await req.json();
	const { id } = values;
	console.log("sending email with, ", values);
	try {
		const res = await sendEmail(values, sendSecondEmail);

		// Detect if this is a job application or connection
		const isJob = !!values.jobTitle;

		let updateContactDate = null;
		if (res.success && sendSecondEmail) {
			if (isJob) {
				// Update job application
				updateContactDate = await prisma.application.update({
					where: { id },
					data: {
						secondContactEmailSent: true,
						lastContactedDate: new Date(),
					},
				});
			} else {
				// Update connection
				updateContactDate = await prisma.connection.update({
					where: { id },
					data: {
						emailSent: true,
						lastEmailDate: new Date(),
					},
				});
			}
		} else if (res.success && !sendSecondEmail) {
			// First email sent - update accordingly
			if (isJob) {
				updateContactDate = await prisma.application.update({
					where: { id },
					data: {
						initialContactEmailSent: true,
						lastContactedDate: new Date(),
					},
				});
			} else {
				updateContactDate = await prisma.connection.update({
					where: { id },
					data: {
						emailSent: true,
						firstEmailDate: new Date(),
						lastEmailDate: new Date(),
					},
				});
			}
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
