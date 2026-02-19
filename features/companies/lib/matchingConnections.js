export const findMatching = (companyId, connections = []) => {
	const targetId = Number(companyId);
	if (!Number.isFinite(targetId)) return [];

	return connections.filter((conn) => Number(conn.companyId) === targetId);
};