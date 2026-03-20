import { renderLanguageCard as renderLangPie } from './renderLangPie';
import { renderLanguageCard as renderLangPercent } from './renderLangPercent';
import { CARD_WIDTH, CARD_HEIGHT } from '../utils/constants';
import { UserLanguageStats } from '../../types';

const testUser: UserLanguageStats = {
	user: 'testuser',
	languages: [
		{ name: 'TypeScript', color: '#3178C6', count: 50000 },
		{ name: 'JavaScript', color: '#F7DF1E', count: 30000 },
		{ name: 'Python', color: '#3776AB', count: 10000 },
		{ name: 'Go', color: '#00ADD8', count: 6000 },
		{ name: 'Rust', color: '#DEA584', count: 4000 },
	],
};

describe('renderLangPie', () => {
	test('returns an SVG string', async () => {
		const result = await renderLangPie(testUser, '');
		expect(result).toContain('<svg');
		expect(result).toContain('</svg>');
	});

	test('uses the correct card dimensions', async () => {
		const result = await renderLangPie(testUser, '');
		expect(result).toContain(`width="${CARD_WIDTH}"`);
		expect(result).toContain(`height="${CARD_HEIGHT}"`);
	});

	test('renders different output for dark and white color variants', async () => {
		const dark = await renderLangPie(testUser, '');
		const white = await renderLangPie(testUser, 'white');
		expect(dark).not.toBe(white);
	});

	test('renders different output for different language data', async () => {
		const user1 = await renderLangPie(testUser, '');
		const user2 = await renderLangPie({
			...testUser,
			languages: [{ name: 'Rust', color: '#DEA584', count: 10000 }],
		}, '');
		expect(user1).not.toBe(user2);
	});
});

describe('renderLangPercent', () => {
	test('returns an SVG string', async () => {
		const result = await renderLangPercent(testUser, '');
		expect(result).toContain('<svg');
		expect(result).toContain('</svg>');
	});

	test('uses the correct card dimensions', async () => {
		const result = await renderLangPercent(testUser, '');
		expect(result).toContain(`width="${CARD_WIDTH}"`);
		expect(result).toContain(`height="${CARD_HEIGHT}"`);
	});

	test('renders different output for dark and white color variants', async () => {
		const dark = await renderLangPercent(testUser, '');
		const white = await renderLangPercent(testUser, 'white');
		expect(dark).not.toBe(white);
	});

	test('renders different output compared to pie chart', async () => {
		const pie = await renderLangPie(testUser, '');
		const percent = await renderLangPercent(testUser, '');
		expect(pie).not.toBe(percent);
	});
});
