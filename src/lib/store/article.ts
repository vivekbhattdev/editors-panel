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
