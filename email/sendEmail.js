import nodemailer from "nodemailer";
import path from "path";
import { buildApplicationHtml } from "./EmalHTML";
import { RecruiterEmailHTML } from "./RecruiterEmailHTML";
import { buildConnectionHtml } from "./ConnectionEmailHTML";
import { readableDate } from "@/lib/utils";

export const sendEmail = async (values, sendSecondEmail) => {
	// Detect if this is a job application or connection
	const isJob = !!values.jobTitle;

	// Map fields - handle both form field names and DB field names
	const contactName = values.contactName || values.name || "";
	const jobTitle = values.jobTitle || `Connection with ${contactName}`;
	const companyName = values.companyName || values.company || "";
	const contactEmail = values.contactEmail || values.email || "";
	const skill1 = values.skill1 || "";
	const skill2 = values.skill2 || "";
	const lastContactedDate =
		values.lastContactedDate || values.lastEmailDate || new Date();
	const contactPosition = values.contactPosition || values.position || "";

	const lastDateSent = readableDate(lastContactedDate);

	// Determine which HTML builder to use
	let buildHtml;
	if (!isJob) {
		// Connection email template
		buildHtml = buildConnectionHtml;
	} else {
		// Job application email templates
		const isRecruiter = contactPosition === "Recruiter";
		buildHtml = isRecruiter ? RecruiterEmailHTML : buildApplicationHtml;
	}

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
			const subject = isJob
				? `Following up on the ${jobTitle} role - Jordan Devaney`
				: `Following up on our connection - Jordan Devaney`;
			const text = isJob
				? `Hi ${contactName}

	I wanted to follow up on my previous email sent on ${lastDateSent} regarding the ${jobTitle} role. I understand you're likely busy, but I'm checking in to see if you've had a chance to review it or if there's anything further I can assist with.

	Please don't hesitate to reach out if you need additional information or clarification. I appreciate your time and look forward to hearing from you.

	Best regards,
	Jordan Devaney`
				: `Hi ${contactName}

	I wanted to follow up on my previous email sent on ${lastDateSent}. I understand you're likely busy, but I'm checking in to see if you've had a chance to review it or if there's anything further I can assist with.

	Please don't hesitate to reach out if you need additional information or clarification. I appreciate your time and look forward to hearing from you.

	Best regards,
	Jordan Devaney`;

			info = await transporter.sendMail({
				from: "Jordan Devaney <jordandevaney28@gmail.com>",
				to: `${contactEmail}`,
				subject,
				text,
				html: isJob
					? buildHtml({
							sendSecondEmail,
							lastDateSent,
							contactName,
							jobTitle,
							companyName,
							skill1,
							skill2,
					  })
					: buildHtml({
							sendSecondEmail,
							lastDateSent,
							contactName,
							companyName,
							position: contactPosition,
					  }),
			});
		} else {
			const filePath = path.join(process.cwd(), "public", "resume.pdf");
			const subject = isJob
				? `Application for ${jobTitle} - Jordan Devaney`
				: `Connection Request - Jordan Devaney`;
			const text = isJob
				? `Hi ${contactName}
		I recently applied for the ${jobTitle} role at ${companyName}.
		I believe my skills are a great match for the position as the role combines my interests and experience in ${skill1} and ${skill2} , and I'd be excited to contribute from day one.
		I've attached my resume and would welcome a quick conversation.

		Best regards,
		Jordan Devaney`
				: `Hi ${contactName}
		I hope this email finds you well. I came across your profile and would love to connect with you${
			companyName ? ` at ${companyName}` : ""
		}.
		I've attached my resume and would welcome the opportunity to connect and learn more about your work.

		Best regards,
		Jordan Devaney`;

			info = await transporter.sendMail({
				from: "Jordan Devaney <jordandevaney28@gmail.com>",
				to: contactEmail,
				subject,
				text,
				html: isJob
					? buildHtml({
							sendSecondEmail,
							lastDateSent,
							contactName,
							jobTitle,
							companyName,
							skill1,
							skill2,
					  })
					: buildHtml({
							sendSecondEmail,
							lastDateSent,
							contactName,
							companyName,
							position: contactPosition,
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
