import { renderErrorCard } from './renderErrorCard';
import { CARD_WIDTH, CARD_HEIGHT } from '../utils/constants';

describe('renderErrorCard', () => {
	test('returns an SVG string', async () => {
		const result = await renderErrorCard('Test error');
		expect(result).toContain('<svg');
		expect(result).toContain('</svg>');
	});

	test('renders different output for different messages', async () => {
		const result1 = await renderErrorCard('Could not fetch data');
		const result2 = await renderErrorCard('Invalid username');
		expect(result1).not.toBe(result2);
	});

	test('uses the correct card dimensions', async () => {
		const result = await renderErrorCard('Test');
		expect(result).toContain(`width="${CARD_WIDTH}"`);
		expect(result).toContain(`height="${CARD_HEIGHT}"`);
	});
});
