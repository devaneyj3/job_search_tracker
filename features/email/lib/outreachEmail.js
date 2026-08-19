import followUpEmail from "./followUpEmail";
import initialEmail from "./initialEmail";
import thirdEmail from "./thirdEmail";

function parseContact(contactName, companyName, appliedPosition, companyMission) {
	const firstName = contactName?.trim().split(/\s+/)[0] || "there";
	const company = companyName?.trim() || "your company";
	const position = appliedPosition?.trim() || "";
	const mission = companyMission?.trim() || "";
	return { firstName, company, position, mission };
}

export function buildOutreachEmailDraft({
	contactName,
	companyName,
	appliedPosition,
	companyMission,
	emailCount,
	firstEmailDate = null,
}) {
	const { firstName, company, position, mission } = parseContact(
		contactName,
		companyName,
		appliedPosition,
		companyMission,
	);

	if (emailCount === 0) return initialEmail(company, firstName, position, mission);
	if (emailCount === 1) return followUpEmail(company, firstName, firstEmailDate);
	return thirdEmail(company, firstName);
}

export function buildOutreachEmailPreview({
	contactName,
	companyName,
	appliedPosition,
	companyMission,
	template,
	firstEmailDate = null,
}) {
	const { firstName, company, position, mission } = parseContact(
		contactName,
		companyName,
		appliedPosition,
		companyMission,
	);

	if (template === "Initial") return initialEmail(company, firstName, position, mission);
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
