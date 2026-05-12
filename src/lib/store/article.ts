import { initialArticles } from "$lib/mocks/article";
import type { Article, ArticleStatus } from "$lib/types/article";

let articles: Article[] = [...initialArticles];

export function getArticles(): Article[] {
	return [...articles];
}

export function filterArticles(search: string, status: ArticleStatus | 'All'): Article[] {
	return articles.filter((article) => {
		const matchesSearch = search ? article.title.toLowerCase().includes(search.toLowerCase()) : true;
		const matchesStatus = status === 'All' ? true : article.status === status;
		return matchesSearch && matchesStatus;
	});
}

export function getArticleById(id: string): Article | undefined {
	return articles.find((article) => article.id === id);
}

export function createArticle(data: Omit<Article, 'id' | 'createdAt'>): Article {
	const now = new Date().toISOString();
	const newArticle: Article = {
		...data,
		id: Date.now().toString(),
		createdAt: now
	};
	articles = [newArticle, ...articles];
	return newArticle;
}

export function deleteArticle(id: string): boolean {
	articles = articles.filter(item => item.id !== id);
	return true;
}

export function updateArticle(id: string, data: Omit<Article, 'id' | 'createdAt'>): Article | undefined{

	const index = articles.findIndex(item => item.id === id);
	if (index === -1) return undefined;

	const updatedArticle = {
		...articles[index],
		...data,
	}
	articles = [...articles.slice(0, index), updatedArticle, ...articles.slice(index + 1)];
	return updatedArticle;
}