import { ARTICLE_STATUSES } from "$lib/constants/article";
import { deleteArticle, getArticleById, updateArticle } from "$lib/store/article"
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({params}) => {
  const id = params.id;
  if (!id) throw error(400, 'Missing article id');

  const article = getArticleById(id);
  if (!article) throw error(404, 'Article not found');
  return json(article);

}

export const DELETE: RequestHandler = async({params}) => {
  const id = params.id;
  if (!id) throw error(400, 'Missing article id');
  const deleted = deleteArticle(id);
  
  if (!deleted) {
    return json({
      error: 'Article not found'
    }, {status: 404});
  }
  return json({success: true});
}

export const PUT: RequestHandler = async ({params, request}) => {
  try {
    const id = params.id;
    if (!id) throw error(400, 'Missing article id');
  
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

    const article = updateArticle(id, {
      title: body.title.trim(),
      author: body.author.trim(),
      content: body.content.trim(),
      status: body.status
    })

    if (!article) {
			return json({ error: 'Article not found' }, { status: 404 });
		}

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