import { toast } from "sonner";
export const processJobSubmission = async (data) => {
	const { customFn, sendEmail, createCalendarEvent, values, setDialogOpen } =
		data;
	const hasContact = Boolean(values.contactEmail?.trim());

	// Choose one format and stick with it:
	// If your DB uses Prisma DateTime, pass a Date object.
	const lastContacted = hasContact ? new Date() : null;

	// Build one payload
	const jobPayload = {
		...values,
		lastContactedDate: lastContacted, // Date (preferred for Prisma)
		initialContactEmailSent: hasContact, // boolean
	};
	try {
		const job = await customFn(jobPayload);

		// 2) Optional side effects if contact email exists
		if (hasContact) {
			// If these don't depend on each other, do them in parallel:
			await Promise.allSettled([
				sendEmail(values), // or sendEmail({ ...values, jobId: job.id })
				createCalendarEvent(job), // needs the created job
			]);
			toast("Application has been created and email sent!", {
				action: { label: "Close", onClick: () => {} },
			});
		}

		toast("Application has been created", {
			action: { label: "Close", onClick: () => {} },
		});
		setDialogOpen(false);
	} catch (error) {
		console.error("Error in onSubmit:", error);
		toast("Application created, but failed to send email. Please try again.", {
			action: { label: "Close", onClick: () => {} },
		});
	}
};
