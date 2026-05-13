import { describe, expect, it } from 'vitest';
import { formatDate } from './date';

describe('formatDate', () => {
	it('returns an en-US short month, numeric day, and full year', () => {
		const result = formatDate('2024-06-15T12:00:00.000Z');
		expect(result).toMatch(/^[A-Z][a-z]{2} \d{1,2}, \d{4}$/);
	});
});