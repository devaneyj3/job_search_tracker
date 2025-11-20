import nodemailer from "nodemailer";
import path from "path";
import { buildApplicationHtml } from "./EmalHTML";
import { readableDate } from "@/lib/utils";

export const sendEmail = async (values, sendSecondEmail) => {
	const {
		contactName,
		jobTitle,
		companyName,
		contactEmail,
		skill1,
		skill2,
		lastContactedDate,
	} = values;

	const lastDateSent = readableDate(lastContactedDate);
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
			info = await transporter.sendMail({
				from: "Jordan Devaney <jordandevaney28@gmail.com>",
				to: `${contactEmail}`,
				subject: `Following up on the ${jobTitle} role - Jordan Devaney`,
				text: `Hi ${contactName}

	I wanted to follow up on my previous email sent on ${lastDateSent} regarding the ${jobTitle} role. I understand you’re likely busy, but I’m checking in to see if you’ve had a chance to review it or if there’s anything further I can assist with.

	Please don’t hesitate to reach out if you need additional information or clarification. I appreciate your time and look forward to hearing from you.

	Best regards,
	Jordan Devaney`,
				html: buildApplicationHtml({
					sendSecondEmail,
					lastDateSent,
					contactName,
					jobTitle,
					companyName,
					skill1,
					skill2,
				}),
			});
		} else {
			const filePath = path.join(process.cwd(), "public", "resume.pdf");

			info = await transporter.sendMail({
				from: "Jordan Devaney <jordandevaney28@gmail.com>",
				to: contactEmail,
				subject: `Application for ${jobTitle} - Jordan Devaney`,
				text: `Hi ${contactName}
		I recently applied for the ${jobTitle} role at ${companyName}.
		I believe my skills are a great match for the position as the role combines my interests and experience in ${skill1} and ${skill2} , and I’d be excited to contribute from day one.
		I've attached my resume and would welcome a quick conversation.

		Best regards,
		Jordan Devaney`,
				html: buildApplicationHtml({
					sendSecondEmail,
					lastDateSent,
					contactName,
					jobTitle,
					companyName,
					skill1,
					skill2,
				}),
				attachments: [
					{
						filename: "Jordan-Devaney-Resume.pdf",
						path: filePath,
						contentType: "application/pdf",
					},
				],
			});
		}
		return { success: true, messageId: info.messageId };
	} catch (e) {
		console.error("Failed to send email:", e);

		return { success: false, error: e.message };
	}
};
