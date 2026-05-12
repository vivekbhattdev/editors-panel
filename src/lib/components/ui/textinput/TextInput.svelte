<script lang="ts">
	import type { TextInputProps } from "./type";


  let {
    id,
		label,
		error,
		required = false,
    value = $bindable(''),
    className = '',
    variant = 'default',
    size = 'lg',
    invalid = false,
    ...rest
  }: TextInputProps = $props();

  const message = $derived((error ?? '').trim());

  const base =
		'w-full rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50';

  const sizes = {
		sm: 'h-8 px-3 text-sm',
		md: 'h-9 px-3 text-sm',
		lg: 'h-10 px-4 text-base'
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
	<input
		id={id}
		bind:value
		class="{base} {sizes[size]} {variants[variant]} {invalidClass} {className}"
		type="text"
		{...rest}
	/>
	{#if message}
		<p class="text-destructive text-sm" role="alert">{message}</p>
	{/if}
</div>
