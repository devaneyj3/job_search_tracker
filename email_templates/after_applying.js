import nodemailer from "nodemailer";
export const sendEmail = async (
	base64String,
	contactName,
	position,
	company,
	contactEmail,
	skill1,
	problem
) => {
	try {
		// Convert base64 string back to buffer
		const pdfBuffer = Buffer.from(base64String, "base64");

		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});
		const info = await transporter.sendMail({
			from: "Jordan Devaney <jordandevaney28@gmail.com>",
			to: contactEmail || "jordandevaney28@gmail.com", // Fallback to your email if no contact email
			subject: `Application for ${position} - Jordan Devaney`,
			text: `Hi ${contactName}
I just applied to ${position} at ${company}. I was so excited about the opportunity I wanted to directly reach out.
I’m confident that my ${skill1} experience would help your team achieve ${problem}.
One more quick line about why you are a good fit and how you are UNIQUELY positioned to do well in the role.

Thank you for your consideration. I look forward to speaking with you soon!
Best regards,
Jordan Devaney`,
			html: `
  <!DOCTYPE html>
  <html lang="en" style="margin:0;padding:0;">
    <head>
      <meta charset="utf-8" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>Job Application Follow-up</title>
    </head>
    <body style="margin:0;padding:0;background:#f1f5f9;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;">
        <tr>
          <td align="center" style="padding:24px;">
            <table role="presentation" width="100%" style="max-width:600px;">
              <tr>
                <td style="text-align:center;padding:12px 8px;">
                  <div style="font:bold 18px Arial;color:#0f172a;">Jordan Devaney</div>
                  <div style="font:12px Arial;color:#64748b;">
                    Whitmore Lake, MI • 810.772-0086 • jordandevaney28@gmail.com
                  </div>
                </td>
              </tr>
              <tr>
                <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:28px;">
                  <p style="font:16px Arial;color:#0f172a;margin:0 0 14px 0;">Hi ${contactName},</p>
                  <p style="margin:0 0 14px 0;">
                    I just applied for the <strong>${position}</strong> role at <strong>${company}</strong> and was excited to reach out directly.
                  </p>
                  <p style="margin:0 0 14px 0;">
                    I’m confident that my experience with <strong>${skill1}</strong> can help your team achieve <strong>${problem}</strong>.
                  </p>
                  <p style="margin:0 0 18px 0;">
                    One more quick line about why you are a good fit and how you are UNIQUELY positioned to do well in the role.
                  </p>
                  <p style="margin:0 0 18px 0;">
                    Thank you for your consideration—I’d love to connect and share how I can contribute to ${company}.
                  </p>
                  <p style="margin:0 0 4px 0;">Best regards,</p>
                  <p style="margin:0;"><strong>Jordan Devaney</strong></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `,
			attachments: [
				{
					filename: `Jordan Devaney Resume.pdf`,
					content: pdfBuffer,
					contentType: "application/pdf",
				},
			],
		});

		return `Message sent: ${info.messageId}`;
	} catch (error) {
		console.error("Email error:", error);
		throw new Error(`Failed to send email: ${error.message}`);
	}
};
