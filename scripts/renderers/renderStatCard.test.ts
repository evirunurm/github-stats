import { renderStatCard } from './renderStatCard';
import { CARD_WIDTH, CARD_HEIGHT } from '../utils/constants';
import { UserStats } from '../../types';

const testUser: UserStats = {
	user: 'testuser',
	amountFollowers: 100,
	amountRepos: 50,
	amountStars: 200,
	amountForks: 30,
	totalContributions: 1000,
};

describe('renderStatCard', () => {
	test('returns an SVG string', async () => {
		const result = await renderStatCard(testUser, '', false);
		expect(result).toContain('<svg');
		expect(result).toContain('</svg>');
	});

	test('uses the correct card dimensions', async () => {
		const result = await renderStatCard(testUser, '', false);
		expect(result).toContain(`width="${CARD_WIDTH}"`);
		expect(result).toContain(`height="${CARD_HEIGHT}"`);
	});

	test('renders different output for dark and white color variants', async () => {
		const dark = await renderStatCard(testUser, '', false);
		const white = await renderStatCard(testUser, 'white', false);
		expect(dark).not.toBe(white);
	});

	test('renders different output when peng is toggled', async () => {
		const withPeng = await renderStatCard(testUser, '', true);
		const withoutPeng = await renderStatCard(testUser, '', false);
		expect(withPeng).not.toBe(withoutPeng);
	});

	test('renders different output for different users', async () => {
		const user1 = await renderStatCard(testUser, '', false);
		const user2 = await renderStatCard({ ...testUser, user: 'otheruser' }, '', false);
		expect(user1).not.toBe(user2);
	});
});
