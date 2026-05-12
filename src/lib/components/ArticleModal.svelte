<script lang="ts">
	import { X } from '@lucide/svelte';
	import { z } from 'zod';

  import Button from './ui/button/Button.svelte';
	import Input from './ui/input/Input.svelte';

	let { isOpen, onClose } = $props();


  const ArticleFormSchema = z.object({
		title: z.string().trim().min(1, 'Title is required'),
		author: z.string().trim().min(1, 'Author is required'),
	});

  type ArticleFormValues = z.infer<typeof ArticleFormSchema>;

  let title = $state('');
	let author = $state('');

  function currentValues(): ArticleFormValues {
		return {
			title,
			author,
		};
	}

  function handleSubmit(e: SubmitEvent){
    e.preventDefault();
		const parsed = ArticleFormSchema.safeParse(currentValues());
    console.log('parsed : ', parsed);
  }
  
</script>

{#if isOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center">
		<!-- <Button onclick={onClose}>Close</Button> -->
		<div
			class="relative z-10 mx-4 w-full max-w-2xl rounded-lg border border-border bg-card shadow-2xl"
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

      <form onsubmit={handleSubmit}>
        <Input 
          bind:value={title}
          placeholder="Enter article title..."/>

        
        <Input 
          bind:value={author}
          placeholder="Enter author name..."/>


        <Button
          type="submit">
          Create Article
        </Button>

      </form>


		</div>
	</div>
{/if}
