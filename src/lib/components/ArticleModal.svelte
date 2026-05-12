<script lang="ts">
	import { X } from '@lucide/svelte';
	import { flattenError, z } from 'zod';

  import Button from './ui/button/Button.svelte';
	import TextInput from '$lib/components/ui/textinput/TextInput.svelte';
	import { ARTICLE_STATUSES } from '$lib/constants/article';
	import TextArea from './ui/textarea/TextArea.svelte';
	import Select from './ui/select/Select.svelte';

	let { 
    isOpen, 
    onClose,
    onSave
  } = $props();
	

	$effect(() => {
		if(!isOpen) {
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
	}

	let errors = $state<Record<string, string>>({});	

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

  async function handleSubmit(e: SubmitEvent){
    e.preventDefault();
		const parsed = ArticleFormSchema.safeParse(form);
    if (!parsed.success) {
			validate();
      return;
    }
    await onSave(parsed.data);
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
          Create Article
				</h2>
				<Button
					variant="ghost"
					onclick={onClose}
					aria-label="Close"
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

        <Button
          type="submit">
          Create Article
        </Button>

      </form>
		</div>
	</div>
{/if}
