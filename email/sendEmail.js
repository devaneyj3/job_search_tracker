import nodemailer from "nodemailer";
import path from "path";
import { buildApplicationHtml } from "./EmalHTML";

export const sendEmail = async (values) => {
	const { contactName, jobTitle, companyName, contactEmail, skill1, goal } =
		values;
	const filePath = path.join(process.cwd(), "public", "resume.pdf");

	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
	});

	const info = await transporter.sendMail({
		from: "Jordan Devaney <jordandevaney28@gmail.com>",
		to: contactEmail || "jordandevaney28@gmail.com",
		subject: `Application for ${jobTitle} - Jordan Devaney`,
		text: `Hi ${contactName}
I recently applied for the ${jobTitle} role at ${companyName}.
My background in ${skill1} would help your team achieve ${goal}.
I've attached my resume and would welcome a quick conversation.

Best regards,
Jordan Devaney`,
		html: buildApplicationHtml({
			contactName,
			jobTitle,
			companyName,
			skill1,
			goal,
		}),
		attachments: [
			{
				filename: "Jordan-Devaney-Resume.pdf",
				path: filePath,
				contentType: "application/pdf",
			},
		],
	});

	return `Message sent: ${info.messageId}`;
};
