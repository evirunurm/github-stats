import { GitHubApiResponse } from '../../../types';

const MOCK_RESPONSE: GitHubApiResponse = {
  data: {
    user: {
      followers: { totalCount: 42 },
      repositories: {
        edges: [
          {
            node: {
              stargazerCount: 15,
              forkCount: 3,
              languages: {
                edges: [
                  { node: { name: 'TypeScript', color: '#3178c6' } },
                  { node: { name: 'JavaScript', color: '#f1e05a' } },
                  { node: { name: 'SCSS', color: '#f15add' } },
                ],
              },
            },
          },
          {
            node: {
              stargazerCount: 8,
              forkCount: 1,
              languages: {
                edges: [
                  { node: { name: 'TypeScript', color: '#3178c6' } },
                  { node: { name: 'CSS', color: '#563d7c' } },
                ],
              },
            },
          },
          {
            node: {
              stargazerCount: 5,
              forkCount: 0,
              languages: {
                edges: [{ node: { name: 'Python', color: '#3572A5' } }],
              },
            },
          },
        ],
      },
      contributionsCollection: {
        contributionCalendar: { totalContributions: 847 },
      },
    },
  },
};

export { MOCK_RESPONSE };
