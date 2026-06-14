import { readableDate } from "@/features/shared/lib/utils";

const followUpEmail = (company, firstName, firstEmailDate = null) => {
	const when = firstEmailDate ? readableDate(firstEmailDate) : "my last message";
	const subject = `Re: ${company} — following up`;
	const body = `Hi ${firstName},

Quick follow-up on my note from ${when}. I know you're busy.

One thing I didn't mention: I've also built and shipped revenue-generating sites on my own, on top of the AG USA work I shared earlier.

Still interested in ${company} if timing opens up. Happy to keep it to a short call if useful.

Jordan Devaney
https://www.linkedin.com/in/jordandevaney/`;

	return { subject, body };
};

export default followUpEmail;
