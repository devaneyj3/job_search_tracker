import { readableDate } from "@/features/shared/lib/utils";

const followUpEmail = (company, firstName, firstEmailDate = null) => {
	const when = firstEmailDate ? readableDate(firstEmailDate) : "my last message";
	const subject = `Re: How can I make a contribution to your ${company}?`;
	const body = `Hi ${firstName},

Following up on my last email from ${when}.

What is it that your company needs to bring in more profit? I can certainly help with that. The dashboard I made used SQL to extract the right product information from the database to find the highest grossing product and the busiset seasons of the year. This report created tremendous value to the company.

The data pipeline I have made with Python extracts CSV reports from the CRM, calculates and convert units, cleans the data to format the output. What used to take hours doing manual calculations of every entry now is only a click of button. This save hours of manpower and money. That's the kind of repeatable work I'd bring to ${company}, not just ad hoc spreadsheets.

I would love to talk with you or someone elese about joing your team?

If you're not the right person, who should I email?

Jordan Devaney
https://www.linkedin.com/in/jordandevaney/`;

	return { subject, body };
};

export default followUpEmail;
