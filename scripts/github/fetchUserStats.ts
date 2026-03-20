import { GitHubRepositoryEdge, UserStats } from "../../types";
import { makeGraphQLRequest } from "./githubApiClient";
import { USER_STATS_QUERY } from "./queries";

const fetchUserStats = async (user: string): Promise<UserStats> => {
	const countProperty = (
		nodes: GitHubRepositoryEdge[],
		property: "stargazerCount" | "forkCount"
	): number =>
		nodes.reduce((t, { node }) => t + (node[property] ?? 0), 0);

	const data = await makeGraphQLRequest(USER_STATS_QUERY(user));

	return {
		user,
		amountFollowers: data.data.user.followers?.totalCount ?? 0,
		amountRepos: data.data.user.repositories.edges.length,
		amountStars: countProperty(
			data.data.user.repositories.edges,
			"stargazerCount"
		),
		amountForks: countProperty(data.data.user.repositories.edges, "forkCount"),
		totalContributions:
			data.data.user.contributionsCollection?.contributionCalendar
				.totalContributions ?? 0,
	};
};

export { fetchUserStats };
