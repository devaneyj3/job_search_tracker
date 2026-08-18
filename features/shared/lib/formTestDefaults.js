/** Flip to true to pre-fill create forms with sample data. */
export const USE_FORM_TEST_DEFAULTS = true;

export const applicationFormEmptyDefaults = {
	jobType: "",
	location: "",
	applicationLink: "",
	position: "",
	jobDescription: "",
	status: "Researching",
	companyName: "",
	notes: "",
};

export const applicationFormTestDefaults = {
	jobType: "Full Time",
	location: "Remote",
	applicationLink: "https://example.com/jobs/software-engineer",
	position: "Software Engineer",
	jobDescription: "Test application for local development.",
	status: "Researching",
	companyName: "Acme Corp",
	notes: "Created with test defaults.",
};

export const connectionFormEmptyDefaults = {
	name: "",
	email: "",
	companyName: "",
	companyMission: "",
	position: "",
	linkedinUrl: "",
	status: "Prospecting",
	notes: "",
};

export const connectionFormTestDefaults = {
	name: "Jane Doe",
	email: "jane.doe@example.com",
	companyName: "Acme Corp",
	companyMission: "helping small businesses make smarter inventory decisions",
	position: "Software Engineer",
	linkedinUrl: "https://www.linkedin.com/in/janedoe",
	status: "Prospecting",
	notes: "Created with test defaults.",
};

export function getFormDefaults(emptyValues, testValues) {
	return USE_FORM_TEST_DEFAULTS ? testValues : emptyValues;
}
