const initialEmail = (company, firstName) => {
	const subject = `Analyst role at ${company}? (dashboard + automated reporting)`;
	const body = `Hi ${firstName},

${company} is on my short list for data analyst roles. Before I apply, I wanted to reach the right person.

I'm a software engineer moving into data analysis (SQL, Python, dashboards). At AG USA, the main things I've shipped:

- Next.js dashboard tracking busiest seasons, peak days/weeks, and top products—used for inventory and staffing decisions
- Python pipeline that automates monthly compliance reporting: pulls CRM CSV exports, converts sales volume to tons by state, and outputs clean, formatted reports

I work across IT, ops, and marketing at a small company, so I'm used to owning a problem from raw data to something the team actually uses.

Are you hiring analysts now, or should I talk to someone else on your team? A name or a "not yet" is enough.

Jordan Devaney
https://www.linkedin.com/in/jordandevaney/`;

	return { subject, body };
};

export default initialEmail;
