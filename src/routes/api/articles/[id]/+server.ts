import { getArticleById } from "$lib/store/article"
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({params}) => {
  const id = params.id;
  if (!id) throw error(400, 'Missing article id');

  const article = getArticleById(id);
  if (!article) throw error(404, 'Article not found');
  return json(article);

}