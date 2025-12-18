import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/features/shared/lib/prisma";

let handlers, signIn, signOut, auth;

try {
	const nextAuthResult = NextAuth({
		providers: [
			Google({
				clientId: process.env.GOOGLE_CLIENT_ID ?? "",
				clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
			}),
		],
		trustHost: true,
		adapter: PrismaAdapter(prisma),
		callbacks: {
			async jwt({ token, user }) {
				try {
					if (user) {
						token.id = user.id;
						token.phone = user.phone;
						token.address = user.address;
						token.city = user.city;
						token.state = user.state;
						token.zip = user.zip;
						token.profileComplete = user.profileComplete;
					}
				} catch (err) {
					console.error("JWT callback error:", err);
				}
				return token;
			},
			async session({ session, token }) {
				try {
					if (token) {
						session.user.id = token.id;
						session.user.phone = token.phone;
						session.user.address = token.address;
						session.user.city = token.city;
						session.user.state = token.state;
						session.user.zip = token.zip;
						session.user.profileComplete = token.profileComplete;
					}
				} catch (err) {
					console.error("Session callback error:", err);
				}
				return session;
			},
		},
	});

	handlers = nextAuthResult.handlers;
	signIn = nextAuthResult.signIn;
	signOut = nextAuthResult.signOut;
	auth = nextAuthResult.auth;
} catch (err) {
	console.error("NextAuth initialization failed:", err);
	console.error("Error details:", err.message, err.stack);
	// Export fallbacks to prevent runtime crash
	handlers = {};
	signIn = async () => {
		throw new Error("Auth not initialized");
	};
	signOut = async () => {
		throw new Error("Auth not initialized");
	};
	auth = async () => {
		throw new Error("Auth not initialized");
	};
}

// Ensure signIn is always a function
if (typeof signIn !== "function") {
	console.error("signIn is not a function, setting fallback");
	signIn = async () => {
		throw new Error("Auth not initialized - signIn is not available");
	};
}

export { handlers, signIn, signOut, auth };
