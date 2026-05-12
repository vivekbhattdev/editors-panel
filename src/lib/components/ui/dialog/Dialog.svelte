<script lang="ts">
	import { X } from '@lucide/svelte';
	import type { DialogProps } from './type';
	import Button from '../button/Button.svelte';

	let {
    open = false,
		title,
		message,
    variant = 'primary',
		okLabel = 'OK',
		cancelLabel = 'Cancel',
		onOk,
		onCancel,
		showClose = true
	}: DialogProps = $props();

	function closeFromCancel() {
		onCancel?.();
	}

	function handleOk() {
		onOk?.();
	}

</script>

{#if open}
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
		<div
			class="absolute inset-0 bg-black/60 backdrop-blur-sm"
			aria-hidden="true"
		></div>
		<div
			class="relative z-10 w-full max-w-md rounded-lg border border-border bg-card shadow-2xl"
			role="alertdialog"
			aria-modal="true"
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
		>
			<div class="flex items-start justify-between gap-3 border-b border-border p-6">
				<div class="flex min-w-0 flex-1 gap-4">
					<div class="min-w-0 flex-1">
						<h2 id="dialog-title" class="text-lg font-semibold text-foreground">
							{title}
						</h2>
					</div>
				</div>
				{#if showClose}
					<Button variant="ghost" onclick={closeFromCancel} aria-label="Close" className="shrink-0 -m-2">
						<X class="h-5 w-5" />
					</Button>
				{/if}
			</div>
			<div class="px-6 pb-2 pt-2">
				<p id="dialog-description" class="text-muted-foreground text-sm leading-relaxed">
					{message}
				</p>
			</div>
			<div class="flex justify-end gap-2 border-t border-border p-4 sm:p-6">
				<Button variant="ghost" onclick={closeFromCancel}>
					{cancelLabel}
				</Button>
				<Button variant={variant} onclick={handleOk}>
					{okLabel}
				</Button>
			</div>
		</div>
	</div>
{/if}