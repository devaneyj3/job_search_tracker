
const companyStatus = [
	"Researching",
	"Interested",
	"Applied",
	"Interviewing",
	"Rejected",
	"Contacted"
];
const applicationStatus = [...companyStatus];
const jobTypeOptions = ["Full Time", "Part Time"];
const jobLocationOptions = ["On-site", "Hybrid", "Remote"];
const companySizeOptions = [
	"1-10",
	"11-50",
	"51-200",
	"201-500",
	"501-1000",
	"1000+",
];
const contactPosition = [
	"Software Engineer",
	"Recruiter",
	"HR",
	"Manager",
	"Other",
];

const LINKEDIN_COMPANY_MESSAGE = `Hey I would love to work at your company, and have experience in Javascript, React and NextJS. I was wondering if you could point me to the person I could reach out to.`;
const LINKEDIN_APPLICATION_MESSAGE = `Hey I am excited about this role, and have experience in Javascript, React and NextJS. I would love to learn more about next steps for this application.`;
const connectionStatus = [
	"Prospecting",
	"Contacted",
	"Follow-up",
	"Responded",
	"Meeting",
];
export {
	companyStatus,
	applicationStatus,
	jobTypeOptions,
	jobLocationOptions,
	companySizeOptions,
	contactPosition,
	LINKEDIN_COMPANY_MESSAGE,
	LINKEDIN_APPLICATION_MESSAGE,
	connectionStatus,
};
