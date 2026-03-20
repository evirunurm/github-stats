import https from "https";
import dotenv from "dotenv";
import { GitHubApiResponse } from "../../types";

dotenv.config();

const createHeaders = (): Record<string, string> => ({
	"user-agent": "Github-Stats",
	Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
	"Content-Type": "application/json",
	Accept: "application/json",
});

const makeGraphQLRequest = (query: string): Promise<GitHubApiResponse> => {
	const options: https.RequestOptions = {
		hostname: "api.github.com",
		path: "/graphql",
		method: "POST",
		headers: createHeaders(),
	};

	return new Promise<GitHubApiResponse>((resolve, reject) => {
		const req = https.request(options, (res) => {
			const buffers: Buffer[] = [];

			res.on("data", (d: Buffer) => {
				buffers.push(d);
			});

			res.on("end", () => {
				try {
					resolve(
						JSON.parse(
							Buffer.concat(buffers).toString()
						) as GitHubApiResponse
					);
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

		req.setTimeout(30000, () => {
			req.destroy();
			reject(new Error("GitHub API request timed out"));
		});

		req.write(JSON.stringify({ query }));
		req.end();
	});
};

export { makeGraphQLRequest };
