export type ArticleStatus = 'Published' | 'Draft' | 'Archived';

export interface Article {
    id: string;
    title: string;
    status: ArticleStatus;
    author: string;
    createdAt: string;
}
