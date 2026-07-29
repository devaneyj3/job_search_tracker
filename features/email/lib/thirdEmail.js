const thirdEmail = (company, firstName) => {
	const subject = `Last note — analyst roles at ${company}`;
	const body = `Hi ${firstName},

I'll stop after this one.

Still interested in analyst work at ${company}. I also built a metrics dashboard (seasonality, peak days, top products) on a popular framework and using SQL to extract data from our database.

If now's bad timing, reply "later" and I'll check back in a few months. If you know who owns hiring, send me their name.

Thanks for reading either way.

Jordan Devaney
https://www.linkedin.com/in/jordandevaney/`;

	return { subject, body };
};

export default thirdEmail;
