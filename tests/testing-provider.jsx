
import { render } from "@testing-library/react";
import { vi } from "vitest";


vi.mock("@/features/shared/context/authContext", () => ({
	useAuth: () => ({
		signedInUser: {
			id: "test-user-id",
			name: "Test User",
			email: "test@example.com",
		},
		isLoading: false,
	}),
	AuthProvider: ({ children }) => children,
}));

vi.mock("@/features/companies/context/companyContext", () => ({
	useCompany: () => ({
		companies: [],
		selectedCompany: null,
		createCompany: vi.fn(),
		deleteCompany: vi.fn(),
		updateCompanyFields: vi.fn(),
		updateCompanyStatus: vi.fn(),
		modalOpen: false,
		setModalOpen: vi.fn(),
		error: null,
		isLoading: false,
		noCompanyMsg: "",
	}),
	CompanyProvider: ({ children }) => children,
}));

vi.mock("next-auth/react", () => ({
	useSession: () => ({
		data: {
			user: {
				id: "test-user-id",
				name: "Test User",
				email: "test@example.com",
			},
		},
		status: "authenticated",
	}),
	SessionProvider: ({ children }) => children,
}));

// Simple render without real providers (hooks are mocked)
const customRender = (ui, options = {}) => {
	return render(ui, options);
};

export * from "@testing-library/react";
export { customRender as render };
