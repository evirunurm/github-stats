import { VALID_USERNAME } from './validators';

describe('VALID_USERNAME', () => {
	test('accepts valid usernames', () => {
		expect(VALID_USERNAME.test('octocat')).toBe(true);
		expect(VALID_USERNAME.test('user-name')).toBe(true);
		expect(VALID_USERNAME.test('a')).toBe(true);
		expect(VALID_USERNAME.test('A1b2C3')).toBe(true);
		expect(VALID_USERNAME.test('a'.repeat(39))).toBe(true);
	});

	test('rejects empty string', () => {
		expect(VALID_USERNAME.test('')).toBe(false);
	});

	test('rejects usernames longer than 39 characters', () => {
		expect(VALID_USERNAME.test('a'.repeat(40))).toBe(false);
	});

	test('rejects usernames with underscores', () => {
		expect(VALID_USERNAME.test('user_name')).toBe(false);
	});

	test('rejects usernames with spaces', () => {
		expect(VALID_USERNAME.test('user name')).toBe(false);
	});

	test('rejects usernames with special characters', () => {
		expect(VALID_USERNAME.test('user@name')).toBe(false);
		expect(VALID_USERNAME.test('user.name')).toBe(false);
		expect(VALID_USERNAME.test('user/name')).toBe(false);
	});
});
