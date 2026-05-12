import { json, type RequestHandler } from "@sveltejs/kit";
import type { ArticleStatus } from "$lib/types/article";
import { createArticle, filterArticles } from "$lib/store/article";
import { ARTICLE_STATUSES } from "$lib/constants/article";

export const GET: RequestHandler = async ({ url }) => {

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

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();

    const errors: Record<string, string> = {};

    if (!body.title?.trim()) {
      errors.title = 'Title is required';
    }
    if (!body.author?.trim()) {
      errors.author = 'Author is required';
    }
    if (!body.content?.trim()) {
      errors.content = 'Content is required';
    }
    if (!ARTICLE_STATUSES.includes(body.status)) {
      errors.status = 'Invalid Status';
    }

    if (Object.keys(errors).length > 0) {
      return json({ errors }, { status: 400 });
    }

    const article = createArticle({
      title: body.title.trim(),
      author: body.author.trim(),
      content: body.content.trim(),
      status: body.status
    })
    return json(
      article,
      { status: 201 }
    )
  } catch {
    return json({
      error: 'Invalid request body'
    }, {
      status: 400
    })
  }

}