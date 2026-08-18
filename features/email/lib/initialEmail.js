const initialEmail = (company, firstName, companyMission = "") => {
	const mission = companyMission?.trim();
	const missionLine = mission
		? `I'd love to contribute to ${company}'s mission: ${mission}.`
		: `${company} is on my list for data analyst roles.`;

	const subject = `How can I make a contribution to your company?`;
	const body = `Hi ${firstName},

My name is Jordan Devaney, a software engineer transitioning into data analytics. 

I love helping companies turn messy data into clear revenue and operational insights because I see the value data brings to a company's mission. I bring a systems-first engineering mindset—focusing on reliability, scalable data pipelines, and clean architecture.

I have taken ownership of many projects as the sole developer. A few recent projects I am proud of include:

Custom Operations Dashboard: Tracks peak seasonal demand, busiest windows, and top product velocity to directly drive inventory and staffing decisions.

Automated Compliance Pipeline: Built a Python workflow that ingests CRM data, converts volume metrics by state, and generates automated executive reports.

I'd love to talk with you more about what ${company} is doing and explore opportunities to join your team. If there is someone else that I should connect please forward along this email.

Jordan Devaney
https://www.linkedin.com/in/jordandevaney/`;

	return { subject, body };
};

export default initialEmail;
