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
		const {
			jobTitle,
			companyName,
			jobUrl,
			salary,
			secondContactDate,
			thirdContactDate,
			location,
			contactName,
			contactEmail,
		} = await req.json();

		const filename = "calendar.ics";
		const calendar = icalendar({
			events: [
				{
					description: `${companyName} - Initial Contact: Email ${contactName} at ${contactEmail}`,
					allDay: true,
					start: moment(),
					summary: `${companyName} - Initial Contact: Email ${contactName} at ${contactEmail}`,
					url: jobUrl,
				},
				{
					description: `${companyName} - Contact Follow-Up 1: Email ${contactName} at ${contactEmail}`,
					allDay: true,
					start: secondContactDate,
					summary: `${companyName} - Contact Follow-Up 1: Email ${contactName} at ${contactEmail}`,
					url: jobUrl,
				},
				{
					description: `${companyName} - Contact Follow-Up 2: Email ${contactName} at ${contactEmail}`,
					allDay: true,
					start: thirdContactDate,
					summary: `${companyName} - Contact Follow-Up 2: Email ${contactName} at ${contactEmail}`,
					url: jobUrl,
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
