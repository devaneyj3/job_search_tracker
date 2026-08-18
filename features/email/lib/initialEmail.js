const initialEmail = (company, firstName, companyMission = "") => {
	const mission = companyMission?.trim();
	const missionLine = mission
		? `I'd love to contribute to ${company}'s mission: ${mission}.`
		: `${company} is on my list for data analyst roles.`;

	const subject = `Analyst role at ${company}? (dashboard + automated reporting)`;
	const body = `Hi ${firstName},

I love helping companies turn messy data into clear revenue and operational insights.

I am a software engineer transitioning into data analytics (SQL, Python, dashboards) because I see the value data brings to a company's mission. I bring a systems-first engineering mindset—focusing on reliability, scalable data pipelines, and clean architecture.

A few recent projects I am proud of include:

Custom Operations Dashboard: Tracks peak seasonal demand, busiest windows, and top product velocity to directly drive inventory and staffing decisions.

Automated Compliance Pipeline: Built a Python workflow that ingests CRM data, converts volume metrics by state, and generates automated executive reports.

Because I work cross-functionally across IT, Ops, and Marketing, I'm comfortable taking full ownership of a problem—from messy to insightful dashboards.

${missionLine} Are you currently open to bringing on an analyst with an engineering backbone, or is there someone else on your team I should connect with? A name or a simple "not right now" is plenty.

Jordan Devaney
https://www.linkedin.com/in/jordandevaney/`;

	return { subject, body };
};

export default initialEmail;
