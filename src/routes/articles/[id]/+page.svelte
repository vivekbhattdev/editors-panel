<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import ArticleModal from '$lib/components/ArticleModal.svelte';
	import ArticleStatusBadge from '$lib/components/ArticleStatusBadge.svelte';
	import Button from '$lib/components/ui/button/Button.svelte';
	import Link from '$lib/components/ui/link/Link.svelte';
	import type { Article } from '$lib/types/article';
	import { renderArticleHtml } from '$lib/utils/content';
	import { formatDate } from '$lib/utils/date';
	import { ArrowLeft, Pencil } from '@lucide/svelte';

	let { data } = $props<{ data: { article: Article } }>();

	const html = $derived(renderArticleHtml(data?.article.content));

	let isModalOpen = $state(false);

	function openEdit() {
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
	}
</script>

<div class="bg-background">
	<div class="mx-auto max-w-5xl p-6 md:p-8">
		<header class="mb-6 flex items-center justify-between gap-3">
			<Link href="/articles" variant="ghost" className="gap-4">
				<ArrowLeft class="h-4 w-4" />
				Back
			</Link>
			<div class="flex items-center gap-3 sm:gap-4">
				<ArticleStatusBadge status={data.article.status} />

				<Button onclick={openEdit}>
					<Pencil class="h-4 w-4" />
					Edit Article
				</Button>
			</div>
		</header>
		<h1 class="mb-6 text-4xl font-bold text-balance">
			{data?.article.title}
		</h1>
		<div class="mb-8 border-b pb-4">
			<p class="font-medium text-foreground">{data?.article.author}</p>
			<p class="text-sm text-muted-foreground">
				{formatDate(data?.article.createdAt)}
			</p>
		</div>
		<article>
			{@html html}
		</article>

		<ArticleModal
			isOpen={isModalOpen}
			onClose={closeModal}
			onSuccess={invalidateAll}
			article={data.article}
		/>
	</div>
</div>
