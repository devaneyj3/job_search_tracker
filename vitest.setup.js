import "@testing-library/jest-dom";
import { vi, beforeEach } from "vitest";

// Mock fetch globally - this prevents the context providers from making real API calls
global.fetch = vi.fn();

// Mock next-auth/react BEFORE providers use it
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
	signIn: vi.fn(),
	signOut: vi.fn(),
	SessionProvider: ({ children }) => children,
}));

// Setup default fetch mock before each test
beforeEach(() => {
	// Reset fetch mock
	fetch.mockClear();

	// Default successful response for API calls
	fetch.mockResolvedValue({
		ok: true,
		status: 200,
		json: async () => [],
		blob: async () => new Blob(),
	});
});
