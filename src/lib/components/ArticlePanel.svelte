<script lang="ts">
	import {
		Pencil,
		Trash2,
    Search,
    Plus,
		FileText
	} from '@lucide/svelte';
	import { formatDate } from "$lib/utils/date";
	import { fetchArticles } from '$lib/api/articles';
	import type { ArticleListResponse } from '$lib/api/articles';
	import Button from './ui/button/Button.svelte';
	import Link from './ui/link/Link.svelte';
	import ArticleStatusBadge from './ArticleStatusBadge.svelte';
	import Pagination from './ui/pagination/Pagination.svelte';
	import ArticleModal from './ArticleModal.svelte';
	import TextInput from './ui/textinput/TextInput.svelte';
	import Dialog from './ui/dialog/Dialog.svelte';
	import type { Article } from '$lib/types/article';

  const STATUS_OPTIONS = ['All', 'Published', 'Draft'] as const;
	type StatusFilter = (typeof STATUS_OPTIONS)[number];

  let statusFilter = $state<StatusFilter>('All');

  let search = $state('');
	let page = $state(1);
  let data = $state<ArticleListResponse>();
  let isLoading = $state(true);
  let loadError = $state("");
  let isModalOpen = $state(false);
  let deleteArticle = $state<Article | null>(null);

	$effect(() => {
		search;
		page = 1;
	});


  async function loadArticles() {
    const params = new URLSearchParams({
			search,
			status: statusFilter,
			page: String(page),
			limit: '5'
		});

    try {
      const res = await fetchArticles(params);
      data = res;
    } catch (err) {
      loadError = `Something went wrong`;
    } finally {
      isLoading = false;
    }
  }

	$effect(() => {
		void loadArticles();
	});

  function handleStatusChange(status: StatusFilter) {
		statusFilter = status;
		page = 1;
	}

  function handleCreate() {
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }

  async function saveArticle(formatData: any) {
    await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formatData)
    })
    
    loadArticles();
    closeModal();
  }

  function closeDeleteModal() {
    deleteArticle = null;
  }

  async function handleDelete() {
    if (!deleteArticle) return;
    try {
			await fetch(`/api/articles/${deleteArticle.id}`, 
        { method: 'DELETE' }
      );
			await loadArticles();
			closeDeleteModal();
		} catch {
      // show error
		}
  }

</script>


<div class="bg-background">
  <div class="mx-auto max-w-5xl p-6 md:p-8">

    <div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 class="text-foreground text-2xl font-semibold">Articles</h1>
        <p class="text-muted-foreground mt-1">Manage and organize your content</p>
      </div>
      <Button 
        onclick={handleCreate}>
        <Plus class="h-4 w-4" />
        New Article
      </Button>
    </div>

    <div class="mb-6 flex flex-col gap-4 sm:flex-row items-center">
      
      <div class="flex-1">
        <TextInput
          id="search"
          bind:value={search}
          placeholder="Search articles..."
        />
      </div>

      <div class="bg-secondary flex items-center gap-1 rounded-md p-1">
        {#each STATUS_OPTIONS as status (status)}          
          <Button 
            variant={statusFilter === status ? 'primary' : 'ghost'}
            onclick={() => handleStatusChange(status)}>
            {status}
          </Button>
        {/each}
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
                <Link
                  href={`/articles/${article.id}`}
                  variant="muted"
                  className="block truncate text-left max-w-[stretch]"
                >
                  {article.title}
                </Link>
                <p class="text-muted-foreground mt-0.5 truncate text-sm md:hidden">
                  {article.author} · {formatDate(article.createdAt)}
                </p>
              </div>
              <div class="mt-2 flex items-center gap-3 md:hidden">
                <ArticleStatusBadge 
                  status={article.status}/>
              </div>
              <div class="hidden md:block">
                <ArticleStatusBadge 
                  status={article.status}/>
              </div>
              <span class="text-muted-foreground hidden truncate text-sm md:block">
                {article.author}
              </span>
              <span class="text-muted-foreground hidden text-sm md:block">
                {formatDate(article.createdAt)}
              </span>
              <div class="flex items-center justify-end gap-1">
                <Button
                  variant="ghost"
                  iconOnlyLabel="Edit"
                  title="Edit"
                >
                  <Pencil class="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  iconOnlyLabel="Delete"
                  title="Delete"
                  onclick={() => (deleteArticle = article)}
                >
                  <Trash2 class="h-4 w-4" />
                </Button>
              </div>
            </div>
          {/each}

        </div>
      {/if}
    </div>
		{#if data?.pagination && data.pagination.total > 0}
			<Pagination
				page={page}
				totalPages={data.pagination.totalPages}
				total={data.pagination.total}
				limit={data.pagination.limit}
				onPageChange={(p) => {
					page = p;
				}}
			/>
		{/if}

    <ArticleModal 
      isOpen={isModalOpen}
      onClose={closeModal}
      onSave={saveArticle}/>

    <Dialog
      open={!!deleteArticle}
      title="Delete article!"
      message="Are you sure you want to delete {deleteArticle?.title}?"
      variant="danger"
      okLabel="Delete"
      cancelLabel="Cancel"
      onOk={handleDelete}
      onCancel={closeDeleteModal}
    />
	</div>

</div>