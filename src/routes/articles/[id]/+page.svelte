<script lang="ts">
	import type { Article } from "$lib/types/article";
	import { renderArticleHtml } from "$lib/utils/content";

  let {
    data
  } = $props<{data: {article: Article}}>();

  const html = $derived(renderArticleHtml(data?.article.content));

</script>
<div>
  <article>
    {@html html}
  </article>
</div>