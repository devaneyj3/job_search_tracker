import { readableDate } from "@/features/shared/lib/utils";

const followUpEmail = (company, firstName, firstEmailDate = null) => {
	const when = firstEmailDate ? readableDate(firstEmailDate) : "my last message";
	const subject = `Re: ${company} — following up`;
	const body = `Hi ${firstName},

I wanted to follow-up on my email from ${when}.

A lot of software engineers just want to stay in their chosen domain. One thing that sets me apart is flexibility to work across many business domains.

Since I currently work for a small business I have the benefit of working across many business areas, such as IT Support, System Administration, and Marketing.

I'm still interested in ${company}. Happy to keep it to a short call.

Jordan Devaney
https://www.linkedin.com/in/jordandevaney/`;

	return { subject, body };
};

export default followUpEmail;
