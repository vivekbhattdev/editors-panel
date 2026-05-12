<script lang="ts">
	import type { InputProps } from "./type";


  let {
    value = $bindable(''),
    className = '',
    variant = 'default',
    size = 'md',    
    ...rest
  }: InputProps = $props();

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

</script>

<input 
  bind:value
  class="{base} {sizes[size]} {className}"
  type="text"
  {...rest}
  />