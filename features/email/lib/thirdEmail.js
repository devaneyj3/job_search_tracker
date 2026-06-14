const thirdEmail = (company, firstName) => {
	const subject = `Last note from me — ${company}`;
	const body = `Hi ${firstName},

I'll keep this short—this is my last follow-up unless you want to connect.

I'm still interested in engineering roles at ${company}. If now isn't the right time, let me know how I can best demonstrate my skills and stand out for future opportunities.

Jordan Devaney
https://www.linkedin.com/in/jordandevaney/`;

	return { subject, body };
};

export default thirdEmail;
