import { json, type RequestHandler } from "@sveltejs/kit";
import articles from '$lib/mocks/articles.json';

export const GET: RequestHandler = () => {
    return json(articles)
}