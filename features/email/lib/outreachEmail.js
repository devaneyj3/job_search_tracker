import followUpEmail from "./followUpEmail";
import initialEmail from "./initialEmail";
import thirdEmail from "./thirdEmail";

function parseContact(contactName, companyName) {
	const firstName = contactName?.trim().split(/\s+/)[0] || "there";
	const company = companyName?.trim() || "your company";
	return { firstName, company };
}

export function buildOutreachEmailDraft({
	contactName,
	companyName,
	emailCount,
	firstEmailDate = null,
}) {
	const { firstName, company } = parseContact(contactName, companyName);

	if (emailCount === 0) return initialEmail(company, firstName);
	if (emailCount === 1) return followUpEmail(company, firstName, firstEmailDate);
	return thirdEmail(company, firstName);
}

export function buildOutreachEmailPreview({
	contactName,
	companyName,
	template,
	firstEmailDate = null,
}) {
	const { firstName, company } = parseContact(contactName, companyName);

	if (template === "Initial") return initialEmail(company, firstName);
	if (template === "Follow-Up") return followUpEmail(company, firstName, firstEmailDate);
	return thirdEmail(company, firstName);
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
