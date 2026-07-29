import { readableDate } from "@/features/shared/lib/utils";

const followUpEmail = (company, firstName, firstEmailDate = null) => {
	const when = firstEmailDate ? readableDate(firstEmailDate) : "my last message";
	const subject = `Re: analyst at ${company}?`;
	const body = `Hi ${firstName},

Following up on my last email from ${when}.

One big project I'm proud of is my tonnage reporting project. I built a repeatable Python script with the help of AI to streamline compliance.  It runs every month—extract from the CRM, calculate and convert units, clean the data, format the output. That's the kind of repeatable work I'd bring to ${company}, not just ad hoc spreadsheets.

If you have an analyst opening—or will soon—can we do 15 minutes this week?

If you're not the right person, who should I email? A forward or a "no" works.

Jordan Devaney
https://www.linkedin.com/in/jordandevaney/`;

	return { subject, body };
};

export default followUpEmail;
