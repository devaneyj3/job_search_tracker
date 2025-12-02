import { sendEmail } from "@/email/sendEmail";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
	const { values, sendSecondEmail } = await req.json();
	const { id } = values;

	try {
		const res = await sendEmail(values, sendSecondEmail);

		let updateContactDate = null;
		if (res.success && sendSecondEmail) {
			updateContactDate = await prisma.application.update({
				where: { id },
				data: {
					secondContactEmailSent: true,
					lastContactedDate: new Date(),
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
