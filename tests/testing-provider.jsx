import React from "react";
import { render } from "@testing-library/react";
import { vi } from "vitest";

// Mock the context hooks directly - this is faster and avoids provider issues
vi.mock("@/context/jobContext", () => ({
	useJob: () => ({
		jobs: [],
		selectedJob: null,
		createJob: vi.fn().mockResolvedValue({ id: 1 }),
		sendEmail: vi.fn().mockResolvedValue({}),
		createCalendarEvent: vi.fn().mockResolvedValue({}),
		updateJobFields: vi.fn(),
		updateJobStatus: vi.fn(),
		deleteJob: vi.fn(),
		modalOpen: false,
		setModalOpen: vi.fn(),
		error: null,
		isLoading: false,
		noJobMsg: "",
	}),
	JobItemProvider: ({ children }) => children,
}));

vi.mock("@/context/authContext", () => ({
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

vi.mock("@/context/connectionContext", () => ({
	useConnection: () => ({
		connections: [],
		selectedConnection: null,
		createConnection: vi.fn(),
		deleteConnection: vi.fn(),
		updateConnectionFields: vi.fn(),
		updateConnectionStatus: vi.fn(),
		modalOpen: false,
		setModalOpen: vi.fn(),
		error: null,
		isLoading: false,
		noConnectionMsg: "",
	}),
	ConnectionProvider: ({ children }) => children,
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
