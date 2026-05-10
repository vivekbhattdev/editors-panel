import type { Article } from "$lib/types/article";


export type ArticleListResponse = {
    items: Article[];
}

export async function fetchArticles(): Promise<ArticleListResponse> {
    const res = await fetch('/api/articles');
    if (!res.ok) throw new Error(`Failed to load articles (${res.status})`);
    return res.json();
}