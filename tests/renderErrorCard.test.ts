import { renderErrorCard } from '../scripts/renderers/renderErrorCard';
import { CARD_WIDTH, CARD_HEIGHT } from '../scripts/utils/constants';

describe('renderErrorCard', () => {
	test('returns an SVG string', () => {
		const result = renderErrorCard('Test error');
		expect(result).toContain('<svg');
		expect(result).toContain('</svg>');
	});

	test('includes the error message', () => {
		const message = 'Could not fetch data';
		const result = renderErrorCard(message);
		expect(result).toContain(message);
	});

	test('uses the correct card dimensions', () => {
		const result = renderErrorCard('Test');
		expect(result).toContain(`width="${ CARD_WIDTH }"`);
		expect(result).toContain(`height="${ CARD_HEIGHT }"`);
	});
});
