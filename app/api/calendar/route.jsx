import icalendar from "ical-generator";
import moment from "moment";

export async function POST(req) {
	if (req.method !== "POST") {
		return new Response("Method Not Allowed", {
			headers: { Allow: "POST" },
			status: 405,
		});
	}

	try {
		const data = await req.json();

		// Detect if this is a job application or connection
		const isJob = !!data.jobTitle;

		let title, company, url, contactName, contactEmail, secondContactDate;

		if (isJob) {
			// Job application fields
			title = data.jobTitle;
			company = data.companyName;
			url = data.jobUrl;
			contactName = data.contactName;
			contactEmail = data.contactEmail;
			secondContactDate = data.secondContactDate;
		} else {
			// Connection fields - map from DB names to expected names
			title = `Connection with ${data.name || data.contactName || "Contact"}`;
			company = data.company || data.companyName || "";
			url = data.linkedinUrl || "";
			contactName = data.name || data.contactName || "";
			contactEmail = data.email || data.contactEmail || "";
			// Connections don't have secondContactDate, use a default follow-up date (5 days from now)
			secondContactDate =
				data.secondContactDate || moment().add(5, "days").toDate();
		}

		const filename = "contact_calendar.ics";
		const calendar = icalendar({
			events: [
				{
					description: `${title} at ${company} - Initial Contact: ${contactName} at ${contactEmail}`,
					allDay: true,
					start: moment(),
					summary: `${title} at ${company} - Initial Contact: ${contactName} at ${contactEmail}`,
					url: url,
				},
				{
					description: `${title} at ${company} - Follow-Up Email: ${contactName} at ${contactEmail}`,
					allDay: true,
					start: secondContactDate,
					summary: `${title} at ${company} - Follow-Up Email: ${contactName} at ${contactEmail}`,
					url: url,
				},
			],
			prodId: "//superman-industries.com//ical-generator//EN",
		});

		return new Response(calendar.toString(), {
			headers: {
				"Content-Disposition": `attachment; filename=${filename}`,
				"Content-Type": "text/calendar; charset=utf-8",
			},
			status: 200,
		});
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify(err), { status: 500 });
	}
}
