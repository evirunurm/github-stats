import https from "https";
import dotenv from "dotenv";
import {
	GitHubApiResponse,
	GitHubRepositoryEdge,
	UserStats,
} from "../../types";

dotenv.config();

const fetchUserData = async (user: string): Promise<UserStats> => {
	const headers: Record<string, string> = {
		"user-agent": "Github-Stats",
		Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
		"Content-Type": "application/json",
		Accept: "application/json",
	};

	const query = `{
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

	const options: https.RequestOptions = {
		hostname: "api.github.com",
		path: "/graphql",
		method: "POST",
		headers: headers,
	};

	const request = (
		resolve: (value: GitHubApiResponse) => void,
		reject: (reason: Error) => void
	): void => {
		const req = https.request(options, (res) => {
			let body = "";

			res.on("data", (d: Buffer) => {
				body += d;
			});

			res.on("end", () => {
				try {
					resolve(JSON.parse(body) as GitHubApiResponse);
				} catch (e) {
					reject(
						new Error(
							`Failed to parse GitHub API response: ${(e as Error).message}`
						)
					);
				}
			});
		});

		req.on("error", (error: Error) => {
			console.log(error);
			reject(error);
		});

		req.write(JSON.stringify({ query }));
		req.end();
	};

	const countProperty = (
		nodes: GitHubRepositoryEdge[],
		property: "stargazerCount" | "forkCount"
	): number => {
		return Object.values(nodes).reduce(
			(t, { node }) => t + (node[property] ?? 0),
			0
		);
	};

	const getDataObj = (json: GitHubApiResponse): UserStats => {
		const dataObj: UserStats = {
			user: user,
			amountFollowers: json.data.user.followers?.totalCount ?? 0,
			amountRepos: json.data.user.repositories.edges.length,
			amountStars: countProperty(
				json.data.user.repositories.edges,
				"stargazerCount"
			),
			amountForks: countProperty(
				json.data.user.repositories.edges,
				"forkCount"
			),
			totalContributions:
				json.data.user.contributionsCollection?.contributionCalendar
					.totalContributions ?? 0,
		};
		return dataObj;
	};

	const data = await new Promise<GitHubApiResponse>((resolve, reject) =>
		request(resolve, reject)
	);

	return getDataObj(data);
};

exports.fetchUserData = fetchUserData;
