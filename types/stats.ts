import { LanguageData } from "./language";

export interface UserStats {
  user: string;
  amountFollowers: number;
  amountRepos: number;
  amountStars: number;
  amountForks: number;
  totalContributions: number;
}

export interface UserLanguageStats {
  user: string;
  languages: LanguageData[];
}
