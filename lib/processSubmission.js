import { toast } from "sonner";
export const processSubmission = async (data) => {
	const { customFn, sendEmail, createCalendarEvent, values, setDialogOpen } =
		data;
	const hasContact = Boolean(values.contactEmail?.trim());

	// Choose one format and stick with it:
	// If your DB uses Prisma DateTime, pass a Date object.
	const lastContacted = hasContact ? new Date() : null;

	// Build one payload
	const payload = {
		...values,
		lastContactedDate: lastContacted, // Date (preferred for Prisma)
		initialContactEmailSent: hasContact, // boolean
	};

	try {
		const object = await customFn(payload);

		// 2) Optional side effects if contact email exists
		if (hasContact) {
			// Merge values with created object to ensure we have both form fields and id
			const emailValues = { ...values, id: object.id };
			// If these don't depend on each other, do them in parallel:
			await Promise.allSettled([
				sendEmail(emailValues), // Pass merged values with id
				createCalendarEvent(object), // needs the created object
			]);
			toast("Item has been created and email sent!", {
				action: { label: "Close", onClick: () => {} },
			});
		} else {
			toast("Item has been created", {
				action: { label: "Close", onClick: () => {} },
			});
		}
		setDialogOpen(false);
	} catch (error) {
		console.error("Error in onSubmit:", error);
		toast("Item created, but failed to send email. Please try again.", {
			action: { label: "Close", onClick: () => {} },
		});
	}
};
