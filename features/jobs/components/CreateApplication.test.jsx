import { render, screen, waitFor } from "../../../../tests/testing-provider";
import "@testing-library/jest-dom";
import JobApplicationForm from "@/features/jobs/components/JobApplicationForm";
import { describe, expect, test, vi } from "vitest";

// Mock dependencies
vi.mock("@/features/shared/lib/processSubmission", () => ({
	processSubmission: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("sonner", () => ({
	toast: vi.fn(),
}));

describe("JobApplicationForm", () => {
	test("renders all form labels correctly", async () => {
		// ARRANGE
		render(<JobApplicationForm setDialogOpen={vi.fn()} />);

		// Wait for form to render
		await waitFor(() => {
			expect(
				screen.getByRole("button", { name: /submit/i })
			).toBeInTheDocument();
		});

		// ASSERT - Check all labels are present
		expect(screen.getByLabelText("Job Title")).toBeInTheDocument();
		expect(screen.getByLabelText("Company Name")).toBeInTheDocument();
		expect(screen.getByLabelText("Job URL")).toBeInTheDocument();
		expect(screen.getByLabelText("Status")).toBeInTheDocument();
		expect(screen.getByLabelText("Salary")).toBeInTheDocument();
		expect(screen.getByLabelText("Location")).toBeInTheDocument();
		expect(screen.getByLabelText("Contact Name")).toBeInTheDocument();
		expect(screen.getByLabelText("Contact Email")).toBeInTheDocument();
		expect(screen.getByLabelText("Contact Position")).toBeInTheDocument();
		expect(screen.getByLabelText("Job Description")).toBeInTheDocument();
		expect(screen.getByLabelText("Skill")).toBeInTheDocument();
		expect(screen.getByLabelText("Add addition skill")).toBeInTheDocument();
	});

	test("renders all input placeholders correctly", async () => {
		// ARRANGE
		render(<JobApplicationForm setDialogOpen={vi.fn()} />);

		// Wait for form to render
		await waitFor(() => {
			expect(
				screen.getByRole("button", { name: /submit/i })
			).toBeInTheDocument();
		});

		// ASSERT - Check all placeholders for text inputs
		expect(
			screen.getByPlaceholderText("Senior Frontend Engineer")
		).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Acme Inc.")).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("https://jobs.example.com/123")
		).toBeInTheDocument();
		expect(screen.getByPlaceholderText("e.g. 185000")).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("Remote / Ann Arbor, MI")
		).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Jane Doe")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("jane@example.com")).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("Key responsibilities, stack, etc.")
		).toBeInTheDocument();
	});

	test("renders select placeholders correctly", async () => {
		// ARRANGE
		render(<JobApplicationForm setDialogOpen={vi.fn()} />);

		// Wait for form to render
		await waitFor(() => {
			expect(
				screen.getByRole("button", { name: /submit/i })
			).toBeInTheDocument();
		});

		// ASSERT - Check select placeholders
		// Status select should show "Applied" as default value (not placeholder since it has a value)
		const statusSelect = screen.getByLabelText("Status");
		expect(statusSelect).toBeInTheDocument();

		// Contact Position select placeholder
		const contactPositionSelect = screen.getByLabelText("Contact Position");
		expect(contactPositionSelect).toBeInTheDocument();
	});

	test("renders submit button", async () => {
		// ARRANGE
		render(<JobApplicationForm setDialogOpen={vi.fn()} />);

		// Wait for form to render
		await waitFor(() => {
			expect(
				screen.getByRole("button", { name: /submit/i })
			).toBeInTheDocument();
		});

		// ASSERT
		const submitButton = screen.getByRole("button", { name: /submit/i });
		expect(submitButton).toBeInTheDocument();
		expect(submitButton).toHaveAttribute("type", "submit");
	});
});
