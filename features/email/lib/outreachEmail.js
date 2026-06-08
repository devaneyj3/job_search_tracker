import followUpEmail from "./followUpEmail";
import initialEmail from "./initialEmail";

export function buildOutreachEmailDraft({ contactName, companyName, emailCount, firstEmailDate = null }) {
	const firstName = contactName?.trim().split(/\s+/)[0] || "there";
	const company = companyName?.trim() || "your company";
	if (emailCount == 0) {
		return initialEmail(company, firstName)
	} else {
		return followUpEmail(company, firstName, firstEmailDate)
	}
}

export function buildGmailComposeUrl({ to, subject, body }) {
	const params = new URLSearchParams({
		view: "cm",
		fs: "1",
		to: to.trim(),
		su: subject,
		body,
	});

	return `https://mail.google.com/mail/?${params.toString()}`;
}
