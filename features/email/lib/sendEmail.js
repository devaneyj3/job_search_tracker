import nodemailer from "nodemailer";
import { buildConnectionHtml } from "../templates/ConnectionEmailTemplate";
import { readableDate } from "@/features/shared/lib/utils";

export const sendEmail = async (values, sendSecondEmail) => {
	// Map fields - handle both form field names and DB field names
	const contactName = values.contactName || values.name || "";
	const companyName = values.companyName || values.company || "";
	const contactEmail = values.contactEmail || values.email || "";
	const lastContactedDate =
		values.lastContactedDate || values.lastEmailDate || new Date();
	const contactPosition = values.contactPosition || values.position || "";

	const lastDateSent = readableDate(lastContactedDate);

	// Use connection email template
	const buildHtml = buildConnectionHtml;

	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
		});

		let info = "Email not sent";
		// determine if send email is to be sent
		if (sendSecondEmail) {
			const subject = `Following up on our connection - Jordan Devaney`;
			const text = `Hi ${contactName}

	I wanted to follow up on my previous email sent on ${lastDateSent}. I understand you're likely busy, but I'm checking in to see if you've had a chance to review it or if there's anything further I can assist with.

	Please don't hesitate to reach out if you need additional information or clarification. I appreciate your time and look forward to hearing from you.

	Best regards,
	Jordan Devaney`;

			info = await transporter.sendMail({
				from: "Jordan Devaney <jordandevaney28@gmail.com>",
				to: `${contactEmail}`,
				subject,
				text,
				html: buildHtml({
					sendSecondEmail,
					lastDateSent,
					contactName,
					companyName,
					position: contactPosition,
				}),
			});
		} else {
			const subject = `Connection Request - Jordan Devaney`;
			const text = `Hi ${contactName}
		I hope this email finds you well. I came across your profile and would love to connect with you${
			companyName ? ` at ${companyName}` : ""
		}.
		I'd welcome the opportunity to connect and learn more about your work.

		Best regards,
		Jordan Devaney`;

			info = await transporter.sendMail({
				from: "Jordan Devaney <jordandevaney28@gmail.com>",
				to: contactEmail,
				subject,
				text,
				html: buildHtml({
					sendSecondEmail,
					lastDateSent,
					contactName,
					companyName,
					position: contactPosition,
				}),
			});
		}
		return { success: true, messageId: info.messageId };
	} catch (e) {
		console.error("Failed to send email:", e);

		return { success: false, error: e.message };
	}
};
