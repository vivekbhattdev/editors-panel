import type { Article } from "$lib/types/article";
import type { Pagination } from "$lib/types/pagination";


export type ArticleListResponse = {
	items: Article[];
	pagination: Pagination;
};

export async function fetchArticles(params: URLSearchParams): Promise<ArticleListResponse> {
    const res = await fetch(`/api/articles?${params}`);
    if (!res.ok) throw new Error(`Failed to load articles (${res.status})`);
    return res.json();
}

export async function fetchArticle(id: string): Promise<Article> {
	const res = await fetch(`/api/articles/${id}`);
	if (!res.ok) throw new Error(`Failed to load article (${res.status})`);
	return res.json();
}