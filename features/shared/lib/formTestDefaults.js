/** Flip to true to pre-fill create forms with sample data. */
export const USE_FORM_TEST_DEFAULTS = true;

export const companyFormEmptyDefaults = {
	name: "",
	website: "",
	industry: "",
	size: "",
	location: "",
	description: "",
	linkedinUrl: "",
	status: "Researching",
	notes: "",
};

export const companyFormTestDefaults = {
	name: "Acme Corp",
	website: "https://example.com",
	industry: "Software",
	size: "11-50",
	location: "Atlanta, GA",
	description: "Test company for local development.",
	linkedinUrl: "https://www.linkedin.com/company/example",
	status: "Researching",
	notes: "Created with test defaults.",
};

export const applicationFormEmptyDefaults = {
	jobType: "",
	location: "",
	applicationLink: "",
	position: "",
	jobDescription: "",
	status: "Researching",
	companyId: "",
	notes: "",
};

export const applicationFormTestDefaults = {
	jobType: "Full Time",
	location: "Remote",
	applicationLink: "https://example.com/jobs/software-engineer",
	position: "Software Engineer",
	jobDescription: "Test application for local development.",
	status: "Researching",
	companyId: "1",
	notes: "Created with test defaults.",
};

export const connectionFormEmptyDefaults = {
	name: "",
	email: "",
	companyId: "",
	position: "",
	linkedinUrl: "",
	status: "Prospecting",
	notes: "",
};

export const connectionFormTestDefaults = {
	name: "Jane Doe",
	email: "jane.doe@example.com",
	companyId: "1",
	position: "Software Engineer",
	linkedinUrl: "https://www.linkedin.com/in/janedoe",
	status: "Prospecting",
	notes: "Created with test defaults.",
};

export function getFormDefaults(emptyValues, testValues) {
	return USE_FORM_TEST_DEFAULTS ? testValues : emptyValues;
}
