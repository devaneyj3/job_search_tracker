import { NextResponse } from "next/server";
import {
	getCompaniesByUserId,
	createNewCompany,
	deleteCompany,
	updateCompanyStatus,
	updateCompanyFields,
} from "@/features/companies/lib/services";

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const userId = searchParams.get("userId");

		if (!userId) {
			return NextResponse.json(
				{ error: "User ID is required" },
				{ status: 400 }
			);
		}

		const companies = await getCompaniesByUserId(userId);
		return NextResponse.json(companies);
	} catch (error) {
		console.error("Error fetching companies:", error);
		return NextResponse.json(
			{ error: "Failed to fetch companies" },
			{ status: 500 }
		);
	}
}

export async function POST(req) {
	try {
		const {
			userId,
			name,
			website,
			industry,
			size,
			location,
			description,
			linkedinUrl,
			status,
			notes,
		} = await req.json();

		const newCompany = await createNewCompany({
			userId,
			name,
			website,
			industry,
			size,
			location,
			description,
			linkedinUrl,
			status,
			notes,
		});

		return NextResponse.json({ success: true, company: newCompany });
	} catch (error) {
		console.error("Error creating Company:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to create Company" },
			{ status: 500 }
		);
	}
}

export async function DELETE(req) {
	try {
		const { id } = await req.json();
		await deleteCompany(id);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error deleting Company:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to delete Company" },
			{ status: 500 }
		);
	}
}

export async function PATCH(req) {
	try {
		const { id, status, fields } = await req.json();

		if (status) {
			const updatedCompany = await updateCompanyStatus(id, status);
			return NextResponse.json({ success: true, company: updatedCompany });
		}

		if (fields) {
			const updatedCompany = await updateCompanyFields(id, fields);
			return NextResponse.json({ success: true, company: updatedCompany });
		}

		return NextResponse.json(
			{ success: false, error: "Status or fields required" },
			{ status: 400 }
		);
	} catch (error) {
		console.error("Error updating Company:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to update Company" },
			{ status: 500 }
		);
	}
}
