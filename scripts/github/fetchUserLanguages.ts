import {
	GitHubRepositoryEdge,
	LanguageData,
	UserLanguageStats,
} from "../../types";
import { makeGraphQLRequest } from "./githubApiClient";
import { USER_LANGUAGES_QUERY } from "./queries";

const fetchUserLanguages = async (user: string): Promise<UserLanguageStats> => {
	const countLanguages = (edges: GitHubRepositoryEdge[]): LanguageData[] => {
		const languageMap = new Map<string, LanguageData>();

		edges.forEach((repoEdge) => {
			repoEdge.node.languages?.edges.forEach((languageEdge) => {
				const { name, color } = languageEdge.node;
				if (languageMap.has(name)) {
					languageMap.get(name)!.count++;
				} else {
					languageMap.set(name, { name, color, count: 1 });
				}
			});
		});

		return Array.from(languageMap.values());
	};

	const data = await makeGraphQLRequest(USER_LANGUAGES_QUERY(user));

	return {
		user,
		languages: countLanguages(data.data.user.repositories.edges),
	};
};

export { fetchUserLanguages };
