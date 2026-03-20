import { calcPercentages as calcPercentagesPie } from './renderLangPie';
import { calcPercentages as calcPercentagesBar } from './renderLangPercent';
import { LanguageData } from '../../types';

const mockLanguages: LanguageData[] = [
	{ name: 'JavaScript', color: '#f1e05a', count: 50 },
	{ name: 'Python', color: '#3572A5', count: 30 },
	{ name: 'TypeScript', color: '#2b7489', count: 10 },
	{ name: 'CSS', color: '#563d7c', count: 7 },
	{ name: 'HTML', color: '#e34c26', count: 3 },
];

describe('calcPercentages (pie chart)', () => {
	test('returns exactly 5 items', () => {
		const result = calcPercentagesPie(mockLanguages);
		expect(result).toHaveLength(5);
	});

	test('percentages sum to exactly 100', () => {
		const result = calcPercentagesPie(mockLanguages);
		const sum = result.reduce((acc, lang) => acc + lang.count, 0);
		expect(sum).toBe(100);
	});

	test('each item has an accum property', () => {
		const result = calcPercentagesPie(mockLanguages);
		result.forEach(lang => {
			expect(typeof lang.accum).toBe('number');
		});
	});

	test('does not mutate the original array', () => {
		const original = mockLanguages.map(l => ({ ...l }));
		calcPercentagesPie(mockLanguages);
		expect(mockLanguages).toEqual(original);
	});

	test('limits to top 5 when given more languages', () => {
		const sixLanguages = [...mockLanguages, { name: 'Go', color: '#00ADD8', count: 100 }];
		const result = calcPercentagesPie(sixLanguages);
		expect(result).toHaveLength(5);
	});
});

describe('calcPercentages (bar chart)', () => {
	test('returns exactly 5 items', () => {
		const result = calcPercentagesBar(mockLanguages);
		expect(result).toHaveLength(5);
	});

	test('counts are integers between 0 and 100', () => {
		const result = calcPercentagesBar(mockLanguages);
		result.forEach(lang => {
			expect(Number.isInteger(lang.count)).toBe(true);
			expect(lang.count).toBeGreaterThanOrEqual(0);
			expect(lang.count).toBeLessThanOrEqual(100);
		});
	});

	test('does not mutate the original array', () => {
		const original = mockLanguages.map(l => ({ ...l }));
		calcPercentagesBar(mockLanguages);
		expect(mockLanguages).toEqual(original);
	});

	test('limits to top 5 when given more languages', () => {
		const sixLanguages = [...mockLanguages, { name: 'Go', color: '#00ADD8', count: 100 }];
		const result = calcPercentagesBar(sixLanguages);
		expect(result).toHaveLength(5);
	});
});
