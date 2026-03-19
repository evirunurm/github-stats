export interface GitHubLanguageNode {
  name: string;
  color: string;
}

export interface GitHubLanguageEdge {
  node: GitHubLanguageNode;
}

export interface GitHubRepositoryNode {
  forkCount?: number;
  stargazerCount?: number;
  languages?: {
    edges: GitHubLanguageEdge[];
  };
}

export interface GitHubRepositoryEdge {
  node: GitHubRepositoryNode;
}

export interface GitHubUser {
  repositories: {
    edges: GitHubRepositoryEdge[];
  };
  contributionsCollection?: {
    contributionCalendar: {
      totalContributions: number;
    };
  };
  followers?: {
    totalCount: number;
  };
}

export interface GitHubApiResponse {
  data: {
    user: GitHubUser;
  };
}
