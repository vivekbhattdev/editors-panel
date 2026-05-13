import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('article store', () => {
	let articleStore: typeof import('./article');

	beforeEach(async () => {
		vi.resetModules();
		articleStore = await import('./article');
	});

	it('getArticles: returns a new array instance each time', () => {
		const a = articleStore.getArticles();
		const b = articleStore.getArticles();
		expect(a).not.toBe(b);
		expect(a).toEqual(b);
	});

	it('filterArticles: with empty search and All, returns all articles ', () => {
		const all = articleStore.getArticles();
		expect(articleStore.filterArticles('', 'All')).toEqual(all);
	});

	it('filterArticles matches title case-insensitively', () => {
		const hits = articleStore.filterArticles('TAILWIND', 'All');
		expect(hits).toHaveLength(1);
		expect(hits[0]?.id).toBe('4');
	});

	it('filterArticles filters by status', () => {
		const drafts = articleStore.filterArticles('', 'Draft');
		expect(drafts.every((a) => a.status === 'Draft')).toBe(true);
		expect(drafts.length).toBeGreaterThan(0);
	});

	it('getArticleById returns an article or undefined', () => {
		expect(articleStore.getArticleById('1')?.title).toContain('Architectures');
		expect(articleStore.getArticleById('missing')).toBeUndefined();
	});

	it('createArticle add article to store', () => {
		vi.setSystemTime(new Date('2025-06-01T12:00:00.000Z'));

		const created = articleStore.createArticle({
			title: 'New',
			content: 'Body',
			status: 'Draft',
			author: 'Me'
		});

		expect(created).toMatchObject({
			title: 'New',
			content: 'Body',
			status: 'Draft',
			author: 'Me',
			id: Date.now().toString(),
			createdAt: new Date().toISOString()
		});
		expect(articleStore.getArticles()[0]).toEqual(created);

	});

	it('deleteArticle removes the article and returns true', () => {
		expect(articleStore.deleteArticle('1')).toBe(true);
		expect(articleStore.getArticleById('1')).toBeUndefined();
	});

	it('updateArticle update article based on id', () => {
		const before = articleStore.getArticleById('2');
		expect(before).toBeDefined();

		const updated = articleStore.updateArticle('2', {
			title: 'Updated title',
			content: 'Updated content',
			status: 'Draft',
			author: 'Someone else'
		});

		expect(updated).toMatchObject({
			id: '2',
			createdAt: before!.createdAt,
			title: 'Updated title',
			content: 'Updated content',
			status: 'Draft',
			author: 'Someone else'
		});
		expect(articleStore.getArticleById('2')).toEqual(updated);
	});

	it('updateArticle returns undefined when id is missing', () => {
		expect(
			articleStore.updateArticle('nope', {
				title: 'x',
				content: 'y',
				status: 'Published',
				author: 'z'
			})
		).toBeUndefined();
	});
});