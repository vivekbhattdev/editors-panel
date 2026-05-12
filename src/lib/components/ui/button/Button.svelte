<script lang="ts">
	import type { ButtonProps } from './types';

  let {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    iconOnlyLabel,
    ...rest
  }: ButtonProps = $props();


  const sizes = {
		sm: 'h-8 px-3 text-sm gap-2',
		md: 'h-9 px-4 text-sm gap-2',
		lg: 'h-10 px-5 text-base gap-2',
		icon: 'h-9 w-9 p-0'
	} as const;

  const isIconOnly = $derived(Boolean(iconOnlyLabel?.trim()));
  const sizeClass = $derived(isIconOnly ? sizes.icon : sizes[size]);


  const base =
		'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50';

  const variants = {
		primary: "bg-blue-600 text-white hover:bg-blue-700",
		secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
		outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "border border-transparent bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground",
    danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive"
	};
</script>

<button
	class="{base} {sizeClass} {variants[variant]} {className}"
  aria-label={isIconOnly ? iconOnlyLabel : undefined}
  type="button"
	{...rest}
  >
  {@render children()}
</button>