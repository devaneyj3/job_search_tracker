import followUpEmail from "./followUpEmail";
import initialEmail from "./initialEmail";
import thirdEmail from "./thirdEmail";

function parseContact(contactName, companyName, companyMission) {
	const firstName = contactName?.trim().split(/\s+/)[0] || "there";
	const company = companyName?.trim() || "your company";
	const mission = companyMission?.trim() || "";
	return { firstName, company, mission };
}

export function buildOutreachEmailDraft({
	contactName,
	companyName,
	companyMission,
	emailCount,
	firstEmailDate = null,
}) {
	const { firstName, company, mission } = parseContact(
		contactName,
		companyName,
		companyMission,
	);

	if (emailCount === 0) return initialEmail(company, firstName, mission);
	if (emailCount === 1) return followUpEmail(company, firstName, firstEmailDate);
	return thirdEmail(company, firstName);
}

export function buildOutreachEmailPreview({
	contactName,
	companyName,
	companyMission,
	template,
	firstEmailDate = null,
}) {
	const { firstName, company, mission } = parseContact(
		contactName,
		companyName,
		companyMission,
	);

	if (template === "Initial") return initialEmail(company, firstName, mission);
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
