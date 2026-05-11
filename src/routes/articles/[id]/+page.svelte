<script lang="ts">
	import type { Article } from "$lib/types/article";

  let {
    data
  } = $props<{data: {article: Article}}>();
</script>
<div>
  <div>
    {data?.article?.content}
  </div>
</div>