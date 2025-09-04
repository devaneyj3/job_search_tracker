import { IBM_Plex_Sans } from "next/font/google";

export const plex = IBM_Plex_Sans({
	weight: ["100", "200", "300", "400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-plex",
	display: "swap",
});
