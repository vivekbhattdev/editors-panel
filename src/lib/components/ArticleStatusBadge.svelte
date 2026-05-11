<script lang="ts">
	import type { ArticleStatus } from "$lib/types/article";
	import Badge from "./ui/badge/Badge.svelte";
	import type { BadgeVariant } from "./ui/badge/types";

  let {
    status
  } = $props();


  function statusBadgeVariant(status: ArticleStatus): BadgeVariant {
    switch (status) {
      case 'Draft':
        return 'warning';
      case 'Published':
        return 'success';
    }
  }
</script>

<Badge
  variant={statusBadgeVariant(status)}>
  {status}
</Badge>