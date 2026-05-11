import { json, type RequestHandler } from "@sveltejs/kit";
import type { ArticleStatus } from "$lib/types/article";
import { filterArticles } from "$lib/store/article";

export const GET: RequestHandler = async ({url}) => {

  const search = url.searchParams.get('search') || '';
	const status = (url.searchParams.get('status') || 'All') as ArticleStatus | 'All';

  const items = filterArticles(search, status);
    
  return json({
		items
	});
}