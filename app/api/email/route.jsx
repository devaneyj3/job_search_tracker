import { sendEmail } from "@/email/sendEmail";
import { NextResponse } from "next/server";
export async function POST(req) {
	const { values } = await req.json();
	try {
		const res = await sendEmail(values);
		return new NextResponse(res, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Failed to send email", status: 500 });
	}
}
