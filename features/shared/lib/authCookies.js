const isProduction = process.env.NODE_ENV === "production";

export function getAuthCookieDomain() {
	if (process.env.AUTH_COOKIE_DOMAIN) {
		return process.env.AUTH_COOKIE_DOMAIN;
	}

	const authUrl = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
	if (!authUrl) return undefined;

	try {
		const { hostname } = new URL(authUrl);
		if (hostname === "localhost" || hostname.endsWith(".vercel.app")) {
			return undefined;
		}

		const parts = hostname.split(".");
		if (parts.length >= 2) {
			return `.${parts.slice(-2).join(".")}`;
		}
	} catch {
		return undefined;
	}

	return undefined;
}

export function authCookieOptions(maxAge) {
	const domain = getAuthCookieDomain();

	return {
		httpOnly: true,
		sameSite: "lax",
		path: "/",
		secure: isProduction,
		...(maxAge ? { maxAge } : {}),
		...(domain ? { domain } : {}),
	};
}
