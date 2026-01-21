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

		// Connection fields - map from DB names to expected names
		const title = `Connection with ${data.name || data.contactName || "Contact"}`;
		const company = data.company || data.companyName || "";
		const url = data.linkedinUrl || "";
		const contactName = data.name || data.contactName || "";
		const contactEmail = data.email || data.contactEmail || "";
		// Connections don't have secondContactDate, use a default follow-up date (5 days from now)
		const secondContactDate =
			data.secondContactDate || moment().add(5, "days").toDate();

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
