<script lang="ts">
	import type { LinkProps } from './types';

	let {
		children,
		className = '',
		variant = 'default',
		size = 'md',
		...rest
	}: LinkProps = $props();

	const base =
		'inline-flex items-center rounded-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring transition-colors';

	const sizes = {
		sm: 'text-sm',
		md: 'text-base'
	} as const;

	const variants = {
		default: 'text-foreground hover:text-primary underline-offset-4 hover:underline',
		muted: 'text-muted-foreground hover:text-foreground',
		ghost: 'text-muted-foreground hover:text-foreground hover:bg-secondary px-2 py-1 rounded-md'
	} as const;
</script>

<a 
  class="{base} {sizes[size]} {variants[variant]} {className}" 
  {...rest}>
	{@render children()}
</a>