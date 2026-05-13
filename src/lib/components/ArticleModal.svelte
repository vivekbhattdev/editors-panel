<script lang="ts">
	import { Loader, X } from '@lucide/svelte';
	import { flattenError, z } from 'zod';

  import Button from './ui/button/Button.svelte';
	import TextInput from '$lib/components/ui/textinput/TextInput.svelte';
	import { ARTICLE_STATUSES } from '$lib/constants/article';
	import TextArea from './ui/textarea/TextArea.svelte';
	import Select from './ui/select/Select.svelte';
	import type { Article } from '$lib/types/article';

	type ArticleModalProps = {
		isOpen: boolean;
		onClose: () => void;
		onSuccess?: () => void | Promise<void>;
		article?: Article | null;
	}

	let {
		isOpen,
		onClose,
		onSuccess,
		article = null
	}: ArticleModalProps = $props();

	$effect(() => {
		if (!isOpen) {
			isSaving = false;
			resetForm();
			return;
		}
		if (article) {
			form = {
				title: article.title,
				author: article.author,
				content: article.content,
				status: article.status
			}
			errors = {};
		} else {
			resetForm();
		}
	})

  const ArticleFormSchema = z.object({
		title: z.string().trim().min(1, 'Title is required'),
		author: z.string().trim().min(1, 'Author is required'),
		content: z.string().trim().min(1, 'Content is required'),
    status: z.enum(ARTICLE_STATUSES)
	});

  type ArticleFormValues = z.infer<typeof ArticleFormSchema>;

	let form = $state<ArticleFormValues>({
		title: '',
		author: '',
		content: '',
		status: 'Draft'
	})

	function resetForm() {
		form = { title: '', author: '', content: '', status: 'Draft' };
		errors = {};
		saveError = null;
	}

	let errors = $state<Record<string, string>>({});
	let saveError = $state<string | null>(null);
	let isSaving = $state(false);

	async function persistArticle(data: ArticleFormValues): Promise<boolean> {
		const url = article ? `/api/articles/${article.id}` : '/api/articles';
		const method = article ? 'PUT' : 'POST';

		let res: Response;
		try {
			res = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});
		} catch {
			saveError = 'Network error. Please try again.';
			return false;
		}

		const payload = (await res.json().catch(() => ({}))) as {
			errors?: Record<string, string>;
			error?: string;
		};

		if (!res.ok) {
			if (payload.errors && typeof payload.errors === 'object') {
				errors = { ...payload.errors };
			} else {
				saveError = payload.error ?? 'Something went wrong';
			}
			return false;
		}

		return true;
	}

	function validate(): boolean {
		const result = ArticleFormSchema.safeParse(form);
		if (result.success) {
			errors = {};
			return true;
		}

		const { fieldErrors } = flattenError(result.error);
		const next: Record<string, string> = {};

		for (const [key, messages] of Object.entries(fieldErrors)) {
			const message = messages?.[0];
			if (message) next[key] = message;
		}
		errors = next;

		return false;
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const parsed = ArticleFormSchema.safeParse(form);
		if (!parsed.success) {
			validate();
			return;
		}
		saveError = null;
		errors = {};
		isSaving = true;
		try {
			if (await persistArticle(parsed.data)) {
				await onSuccess?.();
				onClose();
			}
		} finally {
			isSaving = false;
		}
	}
  
</script>

{#if isOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center">
		<div
			class="absolute inset-0 bg-black/60 backdrop-blur-sm"
			aria-label="Close dialog backdrop"
		></div>
		<div
			class="z-10 mx-4 w-full max-w-2xl rounded-lg border border-border bg-card shadow-2xl"
			role="dialog"
			aria-modal="true"
		>
			<div class="flex items-center justify-between border-b border-border p-6">
				<h2 class="text-xl font-semibold text-foreground">
					{!!article ? 'Update' : 'Create'} Article
				</h2>
				<Button
					variant="ghost"
					onclick={onClose}
					aria-label="Close"
					disabled={isSaving}
				>
					<X class="h-5 w-5" />
				</Button>
			</div>

      <form onsubmit={handleSubmit} class="space-y-5 p-6">
				<TextInput
					label="Title"
					id="title"
					required
					bind:value={form.title}
					placeholder="Enter article title..."
					error={errors.title}
				/>
        
				<TextInput
					label="Author"
					id="author"
					required
					bind:value={form.author}
					placeholder="Enter author name..."
					error={errors.author}
				/>

				<Select
					label="Status"
					id="status"
					bind:value={form.status}
					options={[
						{ value: 'Draft', label: 'Draft' },
						{ value: 'Published', label: 'Published' }
					]}
					error={errors.status}
				/>

				<TextArea
					label="Content"
					id="content"
					required
					bind:value={form.content}
					placeholder="Enter article content..."
					error={errors.content}
					rows={5}
				/>

				{#if saveError}
					<p class="text-destructive text-sm" role="alert">{saveError}</p>
				{/if}

				<div class="flex justify-end gap-3 pt-4">
					<Button variant="secondary" onclick={onClose} disabled={isSaving}>Cancel</Button>
					<Button type="submit" disabled={isSaving} aria-busy={isSaving}>
						{#if isSaving}
							<Loader class="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
						{/if}
						{!!article ? 'Update' : 'Create'}
					</Button>
				</div>

      </form>
		</div>
	</div>
{/if}
