import { json, type RequestHandler } from "@sveltejs/kit";
import type { ArticleStatus } from "$lib/types/article";
import { filterArticles } from "$lib/store/article";

export const GET: RequestHandler = async ({url}) => {

  const search = url.searchParams.get('search') || '';
	const status = (url.searchParams.get('status') || 'All') as ArticleStatus | 'All';
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = parseInt(url.searchParams.get('limit') || '5', 10);

  const filtered = filterArticles(search, status);
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;

  const paginated = filtered.slice(start, start + limit);

    
  return json({
		items: paginated,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
	});
}