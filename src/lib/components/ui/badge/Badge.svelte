<script lang="ts">
	import type { BadgeProps } from "./types";


  let {
    children,
    variant = 'primary',
		size = 'md',
		className = '',
		...rest
  }: BadgeProps = $props();

  const sizes = {
		sm: 'text-xs px-2 py-0.5',
		md: 'text-sm px-2.5 py-0.5'
	} as const;

	const base =
		'inline-flex items-center justify-center rounded-md border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background';

  const variants = {
		primary: 'border-transparent bg-primary text-primary-foreground',
		secondary: 'border-transparent bg-secondary text-secondary-foreground',
		outline: 'border-border bg-transparent text-foreground',
		ghost: 'border-transparent bg-transparent text-muted-foreground',
		success: 'border-transparent bg-success/15 text-success',
		warning: 'border bg-warning/15 text-warning'
	} as const;

</script>

<span class="{base} {sizes[size]} {variants[variant]} {className}" {...rest}>
	{@render children()}
</span>
