/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
		],
	},
	sassOptions: {
		api: "modern-compiler",
	},
	webpack: (config, { isServer }) => {
		// Fix Prisma 7 generated TypeScript files with .js imports
		config.resolve.extensionAlias = {
			".js": [".ts", ".tsx", ".js", ".jsx"],
			".jsx": [".tsx", ".jsx"],
		};

		// Allow importing from generated/prisma directory
		config.resolve.alias = {
			...config.resolve.alias,
		};

		return config;
	},
};

export default nextConfig;
