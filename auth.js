import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	adapter: PrismaAdapter(prisma),
	pages: {
		signIn: "/sign-in",
		signOut: "/sign-out",
	},
	// finding if the user exists in the database, if it does creat new session properties with the existing database properties
	callbacks: {
		async jwt({ token, user }) {
			// This runs when user first signs in (user is defined)
			if (user) {
				// Store user data in JWT token
				token.id = user.id;
				token.phone = user.phone;
				token.address = user.address;
				token.city = user.city;
				token.state = user.state;
				token.zip = user.zip;
				token.profileComplete = user.profileComplete;
			}
			return token;
		},
		async session({ session, token }) {
			// This runs on every session check, but uses JWT data (no database query)
			if (token) {
				session.user.id = token.id;
				session.user.phone = token.phone;
				session.user.address = token.address;
				session.user.city = token.city;
				session.user.state = token.state;
				session.user.zip = token.zip;
				session.user.profileComplete = token.profileComplete;
			}
			return session;
		},
	},
});
