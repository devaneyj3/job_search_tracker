// High-conversion connection/networking email builder
export function buildConnectionHtml({
	sendSecondEmail,
	lastDateSent,
	contactName,
	companyName,
	position,
}) {
	let body = "";
	let preheader = "";

	if (sendSecondEmail) {
		// FOLLOW-UP EMAIL FOR CONNECTIONS
		preheader = `Quick follow-up on our connection`;

		body = `
      <p style="margin:0 0 20px 0;color:#000000;">
        Hi ${contactName},
      </p>

      <p style="margin:0 0 20px 0;color:#000000;">
        I wanted to follow up on my message from ${lastDateSent}. I know you're busy, so I'll keep this brief.
      </p>

      <p style="margin:0 0 20px 0;color:#000000;">
        I'd love to connect and learn more about your work${
					companyName
						? ` at <strong style="font-weight:700;color:#000000;">${companyName}</strong>`
						: ""
				}${
			position
				? ` as a <strong style="font-weight:700;color:#000000;">${position}</strong>`
				: ""
		}. If you have a moment, I'd appreciate the opportunity to chat.
      </p>

      <p style="margin:0 0 20px 0;color:#000000;">
        No rush at all — even a quick response would be great. And if there's a better time to connect, I'm happy to work around your schedule.
      </p>
    `;
	} else {
		// FIRST EMAIL FOR CONNECTIONS
		preheader = `Connection request from Jordan Devaney`;

		body = `
      <p style="margin:0 0 20px 0;color:#000000;">
        Hi ${contactName},
      </p>

      <p style="margin:0 0 20px 0;color:#000000;">
        I hope this email finds you well. I came across your profile${
					companyName
						? ` at <strong style="font-weight:700;color:#000000;">${companyName}</strong>`
						: ""
				}${
			position
				? ` as a <strong style="font-weight:700;color:#000000;">${position}</strong>`
				: ""
		} and would love to connect.
      </p>

      <p style="margin:0 0 20px 0;color:#000000;">
        I'm always interested in connecting with professionals in the tech industry and learning about different career paths and experiences. I'd welcome the opportunity to learn more about your work and share a bit about mine.
      </p>

      <p style="margin:0 0 20px 0;color:#000000;">
        If you're open to it, I'd love to schedule a quick conversation. I've attached my resume for your reference, and I'm happy to work around your schedule.
      </p>

      <p style="margin:0 0 20px 0;color:#000000;">
        Looking forward to connecting!
      </p>
    `;
	}

	return `<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
<head>
  <meta charset="utf-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Connection Request</title>

  <style>

    @media only screen and (max-width: 600px) {
      .card { padding:24px 20px !important; }
      .text { font-size:17px !important; }
    }
  </style>
</head>

<body style="margin:0;padding:0;">

  <!-- Preheader -->
  <div style="display:none;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;mso-hide:all;">
    ${preheader}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="bg" style="background:#ffffff;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="text-align:center;padding:8px 8px 20px;">
              <div class="text" style="font:700 22px/1.3 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#000000;">
                Jordan Devaney
              </div>
              <div class="muted" style="font:400 14px/1.6 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;margin-top:6px;">
                Whitmore Lake, MI · 810.772-0086 · 
                <a href="mailto:jordandevaney28@gmail.com" style="color:#1e40af;text-decoration:none;font-weight:600;">jordandevaney28@gmail.com</a>
              </div>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td class="card" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
              <div class="text" style="font:400 17px/1.75 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#000000;">
                ${body}

                <!-- CTA -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 28px 0;">
                  <tr>
                    <td>
                      <a href="https://jordandevaney.com" target="_blank"
                        style="display:inline-block;background:#1e40af;color:#ffffff;text-decoration:none;font:600 15px/1 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:14px 24px;border-radius:8px;">
                        View Portfolio
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin:24px 0 8px 0;color:#000000;">Best regards,</p>
                <p style="margin:0;color:#000000;"><strong style="font-weight:700;color:#000000;">Jordan Devaney</strong></p>
              </div>

              <!-- Divider -->
              <div style="height:1px;background:#e2e8f0;margin:28px 0;"></div>

              <!-- Footer -->
              <div class="muted" style="font:400 14px/1.6 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;">
                <div style="margin:4px 0;">
                  GitHub: <a href="https://github.com/devaneyj3" style="color:#1e40af;text-decoration:none;font-weight:600;">github.com/devaneyj3</a>
                </div>
                <div style="margin:4px 0;">
                  LinkedIn: <a href="https://www.linkedin.com/in/jordandevaney/" style="color:#1e40af;text-decoration:none;font-weight:600;">linkedin.com/in/jordandevaney</a>
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer Note -->
          <tr>
            <td style="text-align:center;padding:16px 8px 0;">
              <div class="muted" style="font:400 13px/1.5 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#333333;">
                Looking forward to connecting and learning from each other.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
