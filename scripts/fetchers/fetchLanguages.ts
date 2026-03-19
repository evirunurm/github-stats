import https from "https";
import dotenv from "dotenv";
import {
	GitHubApiResponse,
	GitHubRepositoryEdge,
	LanguageData,
	UserLanguageStats,
} from "../../types";

dotenv.config();

const fetchUserData = async (user: string): Promise<UserLanguageStats> => {
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

	const countLanguages = (edges: GitHubRepositoryEdge[]): LanguageData[] => {
		const languageMap = new Map<string, LanguageData>();

		edges.forEach(function (repoEdge) {
			repoEdge.node.languages?.edges.forEach(function (languageEdge) {
				const { name, color } = languageEdge.node;
				if (languageMap.has(name)) {
					(languageMap.get(name) as LanguageData).count++;
				} else {
					languageMap.set(name, { name, color, count: 1 });
				}
			});
		});

		return Array.from(languageMap.values());
	};

	const getDataObj = (json: GitHubApiResponse): UserLanguageStats => {
		const dataObj: UserLanguageStats = {
			user: user,
			languages: countLanguages(json.data.user.repositories.edges),
		};
		return dataObj;
	};

	// PROD
	const data = await new Promise<GitHubApiResponse>((resolve, reject) =>
		request(resolve, reject)
	);

	return getDataObj(data);
};

export { fetchUserData };
