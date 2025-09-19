// put this near your sendEmail (same file or a small util)
export function buildApplicationHtml({
	contactName,
	jobTitle,
	companyName,
	skill1,
	goal,
}) {
	const preheader = `Regarding my application for ${jobTitle} at ${companyName}`;
	return `<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
<head>
  <meta charset="utf-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Application for ${jobTitle}</title>
  <style>
    /* dark mode friendly tweaks (supported in many clients) */
    @media (prefers-color-scheme: dark) {
      .bg { background:#0f172a !important; }
      .card { background:#111827 !important; border-color:#1f2937 !important; }
      .text { color:#e5e7eb !important; }
      .muted { color:#9ca3af !important; }
      .btn { background:#3b82f6 !important; color:#ffffff !important; }
      a { color:#93c5fd !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f5f7fb;">
  <!-- Preheader (hidden preview text) -->
  <div style="display:none;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;mso-hide:all;">
    ${preheader}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="bg" style="background:#f5f7fb;">
    <tr>
      <td align="center" style="padding:28px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;">
          <!-- Header -->
          <tr>
            <td style="text-align:center;padding:6px 8px 14px;">
              <div class="text" style="font:700 20px/1.2 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
                Jordan Devaney
              </div>
              <div class="muted" style="font:400 13px/1.5 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#64748b;margin-top:4px;">
                Whitmore Lake, MI · 810.772-0086 · <a href="mailto:jordandevaney28@gmail.com" style="color:#2563eb;text-decoration:none;">jordandevaney28@gmail.com</a>
              </div>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td class="card" style="background:#ffffff;border:1px solid #e6e8ee;border-radius:14px;padding:28px;">
              <div class="text" style="font:400 16px/1.6 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
                <p style="margin:0 0 16px 0;">Hi ${contactName},</p>

                <p style="margin:0 0 14px 0;">
                  I recently applied for the <strong>${jobTitle}</strong> role at <strong>${companyName}</strong> and wanted to introduce myself directly.
                </p>

                <p style="margin:0 0 14px 0;">
                  My background in <strong>${skill1}</strong> would help your team achieve <strong>${goal}</strong>, and I’d be excited to contribute from day one.
                </p>

                <p style="margin:0 0 18px 0;">
                  If helpful, I’m happy to share more details on relevant projects and outcomes. I’ve attached my resume for your convenience.
                </p>

                <!-- Bulletproof CTA button -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 22px 0;">
                  <tr>
                    <td>
                      <a href="https://jordandevaney.com" target="_blank"
                        style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;
                               font:600 14px/1 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
                               padding:12px 18px;border-radius:10px;">
                        View Portfolio
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 6px 0;">Best regards,</p>
                <p style="margin:0;"><strong>Jordan Devaney</strong></p>
              </div>

              <!-- Divider -->
              <div style="height:1px;background:#eceff4;margin:22px 0;"></div>

              <!-- Footer links -->
              <div class="muted" style="font:400 13px/1.5 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#6b7280;">
                <div style="margin:2px 0;">
                  GitHub: <a href="https://github.com/devaneyj3" style="color:#2563eb;text-decoration:none;">github.com/devaneyj3</a>
                </div>
                <div style="margin:2px 0;">
                  LinkedIn: <a href="https://www.linkedin.com/in/jordandevaney/" style="color:#2563eb;text-decoration:none;">linkedin.com/in/jordandevaney</a>
                </div>
              </div>
            </td>
          </tr>

          <!-- Small footer note -->
          <tr>
            <td style="text-align:center;padding:12px 6px 0;">
              <div class="muted" style="font:400 12px/1.4 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#94a3b8;">
                If this reached the wrong contact, I’d appreciate a forward to the appropriate recruiter or hiring manager.
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
