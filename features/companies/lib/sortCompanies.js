/** Returns a new array of companies sorted alphabetically by name. */
export function sortCompaniesByName(companies) {
	return [...companies].sort((a, b) =>
		String(a.name ?? "").localeCompare(String(b.name ?? ""), undefined, {
			sensitivity: "base",
		}),
	);
}
