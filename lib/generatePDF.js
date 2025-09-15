export const generatePdf = async () => {
	try {
		const response = await fetch("/api/generate-pdf", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"X-Requested-With": "XMLHttpRequest",
			},
		});
		console.log(response);
		if (!response.ok) {
			throw new Error("Failed to generate PDF");
		}

		// Get the blob from the response
		const blob = await response.blob();

		// Convert blob to base64 for sending via email
		const arrayBuffer = await blob.arrayBuffer();
		const base64String = btoa(
			String.fromCharCode(...new Uint8Array(arrayBuffer))
		);

		// Create download link
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `Jordan Devaney Resume.pdf`;
		document.body.appendChild(link);
		link.click();
		link.remove();

		// Clean up the URL
		window.URL.revokeObjectURL(url);

		return blob;
	} catch (error) {
		console.error("Error generating PDF:", error);
		alert("Failed to generate PDF. Please try again.");
	}
};
