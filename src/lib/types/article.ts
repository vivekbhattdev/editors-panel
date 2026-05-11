export type ArticleStatus = 'Published' | 'Draft';

export interface Article {
    id: string;
    title: string;
    content: string;
    status: ArticleStatus;
    author: string;
    createdAt: string;
}
