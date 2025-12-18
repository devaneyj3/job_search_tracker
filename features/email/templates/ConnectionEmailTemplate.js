// High-conversion connection/networking email builder
// Optimized for maximum response rate using proven email psychology
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
		// FOLLOW-UP EMAIL - Optimized for re-engagement
		preheader = `Quick follow-up - ${contactName}`;

		body = `
      <p style="margin:0 0 16px 0;color:#000000;font-size:17px;line-height:1.6;">
        Hi ${contactName},
      </p>

      <p style="margin:0 0 16px 0;color:#000000;font-size:17px;line-height:1.6;">
        I wanted to follow up on my message from ${lastDateSent}. I know inboxes get overwhelming, so I'll keep this brief.
      </p>

      <p style="margin:0 0 16px 0;color:#000000;font-size:17px;line-height:1.6;">
        I'm genuinely interested in learning about your experience${
					companyName
						? ` at <strong style="font-weight:600;color:#1e40af;">${companyName}</strong>`
						: ""
				}${
			position
				? ` as a <strong style="font-weight:600;color:#1e40af;">${position}</strong>`
				: ""
		}. Would you be open to a quick 15-minute chat?
      </p>

      <p style="margin:0 0 20px 0;color:#000000;font-size:17px;line-height:1.6;">
        If now's not a good time, no worries at all — just let me know when might work better for you.
      </p>
    `;
	} else {
		// FIRST EMAIL - Optimized for initial connection
		// Uses proven formula: Hook + Value + Ask + Easy Response
		preheader = `${contactName} - Connection request`;

		// Build personalized hook based on available info
		const personalizedHook = companyName
			? `I noticed your work at <strong style="font-weight:600;color:#1e40af;">${companyName}</strong>${
					position ? ` as a ${position}` : ""
			  }`
			: position
			? `I came across your profile as a <strong style="font-weight:600;color:#1e40af;">${position}</strong>`
			: "I came across your profile";

		body = `
      <p style="margin:0 0 16px 0;color:#000000;font-size:17px;line-height:1.6;">
        Hi ${contactName},
      </p>

      <p style="margin:0 0 16px 0;color:#000000;font-size:17px;line-height:1.6;">
        ${personalizedHook} and thought it would be great to connect. I'm a software engineer building full-stack applications, and I'm always looking to learn from experienced professionals in the industry.
      </p>

      <p style="margin:0 0 16px 0;color:#000000;font-size:17px;line-height:1.6;">
        I'd love to hear about your journey${
					companyName ? ` at ${companyName}` : ""
				} and any insights you'd be willing to share about your career path. I've attached my resume in case you're curious about my background.
      </p>

      <p style="margin:0 0 20px 0;color:#000000;font-size:17px;line-height:1.6;">
        Would you be open to a brief conversation? I'm happy to work around your schedule — even 15 minutes would be valuable.
      </p>
    `;
	}

	return `<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
<head>
  <meta charset="utf-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Connection Request - Jordan Devaney</title>

  <style>
    @media only screen and (max-width: 600px) {
      .card { padding:24px 20px !important; }
      .text { font-size:16px !important; }
      .header-name { font-size:20px !important; }
    }
  </style>
</head>

<body style="margin:0;padding:0;background-color:#f8fafc;">

  <!-- Preheader -->
  <div style="display:none;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;mso-hide:all;">
    ${preheader}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="text-align:center;padding:0 8px 24px;">
              <div class="header-name" style="font:700 24px/1.2 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1e293b;margin-bottom:8px;">
                Jordan Devaney
              </div>
              <div style="font:400 14px/1.5 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#64748b;">
                Software Engineer · Whitmore Lake, MI
              </div>
              <div style="font:400 13px/1.5 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#64748b;margin-top:4px;">
                <a href="mailto:jordandevaney28@gmail.com" style="color:#1e40af;text-decoration:none;font-weight:500;">jordandevaney28@gmail.com</a> · 810.772-0086
              </div>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td class="card" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 4px 6px rgba(0,0,0,0.05);">
              <div class="text" style="font:400 17px/1.7 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
                ${body}

                <!-- Signature -->
                <p style="margin:24px 0 8px 0;color:#1e293b;font-size:17px;">Best regards,</p>
                <p style="margin:0 0 24px 0;color:#1e293b;font-size:17px;"><strong style="font-weight:600;color:#1e293b;">Jordan Devaney</strong></p>

                <!-- CTA Button (only for first email) -->
                ${
									!sendSecondEmail
										? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 0 0;">
                  <tr>
                    <td>
                      <a href="https://jordandevaney.com" target="_blank"
                        style="display:inline-block;background:#1e40af;color:#ffffff;text-decoration:none;font:600 15px/1 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:12px 24px;border-radius:8px;box-shadow:0 2px 4px rgba(30,64,175,0.2);">
                        View My Portfolio →
                      </a>
                    </td>
                  </tr>
                </table>`
										: ""
								}
              </div>

              <!-- Divider -->
              <div style="height:1px;background:#e2e8f0;margin:32px 0 24px 0;"></div>

              <!-- Footer Links -->
              <div style="font:400 13px/1.6 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#64748b;">
                <div style="margin:6px 0;">
                  <a href="https://github.com/devaneyj3" target="_blank" style="color:#1e40af;text-decoration:none;font-weight:500;">GitHub</a> · 
                  <a href="https://www.linkedin.com/in/jordandevaney/" target="_blank" style="color:#1e40af;text-decoration:none;font-weight:500;">LinkedIn</a> · 
                  <a href="https://jordandevaney.com" target="_blank" style="color:#1e40af;text-decoration:none;font-weight:500;">Portfolio</a>
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer Note -->
          <tr>
            <td style="text-align:center;padding:20px 8px 0;">
              <div style="font:400 12px/1.5 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#94a3b8;">
                Open to connecting and sharing experiences
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
