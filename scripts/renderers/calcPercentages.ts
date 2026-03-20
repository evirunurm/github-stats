import { LanguageData } from "../../types";
import { LanguageDataWithAccum } from "./types";

export const calcPercentagesPie = (languages: LanguageData[]): LanguageDataWithAccum[] => {
	// Deep copy of an array of objects
	const langStats: LanguageDataWithAccum[] = JSON.parse(JSON.stringify(languages))
		.slice(0, 5);

	const totalCount = langStats
		.reduce((accumulator: number, language: LanguageDataWithAccum) => {
			return accumulator + language.count;
		}, 0);

	for (let i = 0; i < langStats.length - 1; i++) {
		langStats[i].count = Math.round((100 * langStats[i].count) / totalCount);
	}
	const sumOfOthers = langStats.slice(0, -1).reduce((acc: number, lang: LanguageDataWithAccum) => acc + lang.count, 0);
	langStats[langStats.length - 1].count = 100 - sumOfOthers;

	langStats
		.sort((a: LanguageDataWithAccum, b: LanguageDataWithAccum) => {
			return a.count - b.count;
		})
		.reduce((accumulator: number, language: LanguageDataWithAccum) => {
			language.accum = accumulator;
			return accumulator + language.count
		}, 0);

	return langStats;
}

export const calcPercentagesBar = (languages: LanguageData[]): LanguageData[] => {
	// Deep copy of an array of objects
	const langStats: LanguageData[] = JSON.parse(JSON.stringify(languages))
		.slice(0, 5);

	const totalCount = langStats
		.reduce((accumulator: number, language: LanguageData) => {
			return accumulator + language.count;
		}, 0);

	for (let i = 0; i < langStats.length; i++) {
		langStats[i].count = Math.round((100 * langStats[i].count) / totalCount);
	}

	return langStats;
}
