<script lang="ts">
	import type { TextAreaProps } from './type';

	let {
		id,
		label,
		error,
		required = false,
		value = $bindable(''),
		className = '',
		variant = 'default',
		size = 'md',
		invalid = false,
		...rest
	}: TextAreaProps = $props();

	const message = $derived((error ?? '').trim());

	const base =
		'w-full resize-y rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50';

	const sizes = {
		sm: 'min-h-[4.5rem] px-3 py-2 text-sm',
		md: 'min-h-[6.5rem] px-3 py-2.5 text-sm',
		lg: 'min-h-[9rem] px-4 py-3 text-base'
	} as const;

	const variants = {
		default: 'border-border bg-card text-foreground placeholder:text-muted-foreground',
		ghost: 'border-transparent bg-transparent text-foreground placeholder:text-muted-foreground'
	} as const;

	const invalidClass = $derived(invalid ? 'border-destructive focus:ring-destructive' : '');
</script>

<div class="space-y-2">
	{#if label}
		<label class="text-foreground block text-sm font-medium" for={id}>
			{label}
			{#if required}
				{' '}<span class="text-destructive">*</span>
			{/if}
		</label>
	{/if}
	<textarea
		{id}
		bind:value
		class="{base} {sizes[size]} {variants[variant]} {invalidClass} {className}"
		{...rest}
	></textarea>
	{#if message}
		<p class="text-destructive text-sm" role="alert">{message}</p>
	{/if}
</div>