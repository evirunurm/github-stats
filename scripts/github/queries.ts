const USER_STATS_QUERY = (user: string): string => `{
user(login:"${user}"){
repositories(first:100,privacy:PUBLIC,ownerAffiliations:OWNER){
edges{
node{
forkCount
stargazerCount
}
}
}
contributionsCollection{
contributionCalendar{
totalContributions
}
}
followers{
totalCount
}
}
}`;

const USER_LANGUAGES_QUERY = (user: string): string => `{
	user(login:"${user}"){
		repositories(first:100,privacy:PUBLIC,ownerAffiliations:OWNER){
			edges{
				node{
					languages (first:10) {
						edges{
							node {
								name
								color
							}
						}
					}
				}
			}
		}
	}
	}`;

export { USER_STATS_QUERY, USER_LANGUAGES_QUERY };
