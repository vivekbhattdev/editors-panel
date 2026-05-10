<script lang="ts">
	import {
		Pencil,
		Trash2,
		FileText
	} from '@lucide/svelte';
	import { formatDate } from "$lib/utils/date";
	import { onMount } from 'svelte';
	import { fetchArticles } from '$lib/api/articles';
	import type { ArticleListResponse } from '$lib/api/articles';

  let data = $state<ArticleListResponse>();
  let isLoading = $state(true);
  let loadError = $state("");

  onMount(async () => {
    try {
      const res = await fetchArticles();
      data = res;
    } catch (err) {
      loadError = `Something went wrong`;
    } finally {
      isLoading = false;
    }
  })
</script>


<div class="bg-background">
  <div class="mx-auto max-w-5xl p-6 md:p-8">

    <div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 class="text-foreground text-2xl font-semibold">Articles</h1>
        <p class="text-muted-foreground mt-1">Manage and organize your content</p>
      </div>
    </div>

    <div class="border-border bg-card overflow-hidden rounded-lg border">
      {#if isLoading}
        <div class="p-12 text-center">
          <div
            class="border-muted-foreground border-t-foreground mx-auto h-8 w-8 animate-spin rounded-full border-2"
          ></div>
          <p class="text-muted-foreground mt-4">Loading articles...</p>
        </div>
      {:else if loadError}
        <div class="p-12 text-center">
          <p class="text-destructive">Failed to load articles</p>
        </div>
      {:else if data?.items?.length === 0}
        <div class="p-12 text-center">
          <FileText class="text-muted-foreground mx-auto mb-4 h-12 w-12" />
          <p class="text-foreground font-medium">No articles found</p>          
        </div>
      {:else}
        <div
          class="border-border bg-secondary/50 text-muted-foreground hidden grid-cols-[1fr_120px_140px_140px_80px] gap-4 border-b px-6 py-3 text-xs font-medium tracking-wider uppercase md:grid"
        >
          <span>Title</span>
          <span>Status</span>
          <span>Author</span>
          <span>Created</span>
          <span class="text-right">Actions</span>
        </div>

        <div class="divide-border divide-y">
          {#each data?.items ?? [] as article (article.id)}
            <div
              class="hover:bg-secondary/30 flex flex-col gap-2 px-6 py-4 transition-colors md:grid md:grid-cols-[1fr_120px_140px_140px_80px] md:items-center md:gap-4"
            >
              <div class="min-w-0 flex-1">
                <button
                  type="button"
                  class="text-foreground hover:text-primary block truncate text-left font-medium transition-colors"
                >
                  {article.title}
                </button>
                <p class="text-muted-foreground mt-0.5 truncate text-sm md:hidden">
                  {article.author} · {formatDate(article.createdAt)}
                </p>
              </div>
              <div class="mt-2 flex items-center gap-3 md:hidden">
                {article.status}
              </div>
              <div class="hidden md:block">
                {article.status}
              </div>
              <span class="text-muted-foreground hidden truncate text-sm md:block">
                {article.author}
              </span>
              <span class="text-muted-foreground hidden text-sm md:block">
                {formatDate(article.createdAt)}
              </span>
              <div class="flex items-center justify-end gap-1">
                <button
                  type="button"
                  class="text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md p-2 transition-colors"
                  title="Edit"
                >
                  <Pencil class="h-4 w-4" />
                </button>
                <button
                  type="button"
                  class="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md p-2 transition-colors"
                  title="Delete"
                >
                  <Trash2 class="h-4 w-4" />
                </button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>

  </div>

</div>