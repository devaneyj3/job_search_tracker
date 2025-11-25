// app/api/generate-pdf/route.ts
export const runtime = "nodejs";

import React from "react";
import { NextResponse } from "next/server";
import { pdf, Document, Page, View, Text } from "@react-pdf/renderer";
import ResumePDF from "@/components/ResumePDF";

// Keep TestPDF minimal to verify the route/environment first.
function TestPDF() {
	return (
		<Document>
			<Page size="LETTER">
				<View>
					<Text>Hello from react-pdf</Text>
				</View>
			</Page>
		</Document>
	);
}

export async function POST() {
	try {
		// Server-side: use toBuffer()
		const buffer = await pdf(<ResumePDF />).toBuffer();

		return new NextResponse(buffer, {
			status: 200,
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition":
					'attachment; filename="Jordan-Devaney-Resume.pdf"',
				"Cache-Control": "public, max-age=3600",
			},
		});
	} catch (error) {
		console.error("Error generating PDF:", error?.message || error);
		return NextResponse.json(
			{ error: "Failed to generate PDF. Please try again." },
			{ status: 500 }
		);
	}
}
