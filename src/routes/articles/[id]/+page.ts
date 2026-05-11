import { fetchArticle } from "$lib/api/articles";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const article = await fetchArticle(params?.id);
  return { article };
}