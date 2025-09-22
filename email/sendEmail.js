import nodemailer from "nodemailer";
import path from "path";
import { buildApplicationHtml } from "./EmalHTML";

export const sendEmail = async (values) => {
	const { contactName, jobTitle, companyName, contactEmail, skill1, skill2 } =
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
		to: contactEmail,
		subject: `Application for ${jobTitle} - Jordan Devaney`,
		text: `Hi ${contactName}
I recently applied for the ${jobTitle} role at ${companyName}.
I believe my skills are a great match for the position as the role combines my interests and experience in ${skill1} and ${skill2} , and I’d be excited to contribute from day one.
I've attached my resume and would welcome a quick conversation.

Best regards,
Jordan Devaney`,
		html: buildApplicationHtml({
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

	return `Message sent: ${info.messageId}`;
};
