export const findMatching = (companies, connections = []) => {
  const matchingConnections = companies.map((company) => connections.find((conn) => conn.companyId === company.id))
  console.log(matchingConnections)

};