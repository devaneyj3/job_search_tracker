const thirdEmail = (company, firstName) => {
	const subject = `Analyst roles at ${company}`;
	const body = `Hi ${firstName},

I am still interested in analyst work at ${company}.

If now's bad timing, reply "later" and I'll check back in a few months. If you know who makes hiring decisions, please send me their name.

Thanks for reading either way.

Jordan Devaney
https://www.linkedin.com/in/jordandevaney/`;

	return { subject, body };
};

export default thirdEmail;
