import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, fetch }) => {
  const id = params.id;
	if (!id) throw error(400, 'Missing article id');

  const res = await fetch(`/api/articles/${id}`);
	if (!res.ok) throw error(res.status, await res.text());

  return { article: await res.json() };

}