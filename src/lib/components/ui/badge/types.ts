import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type BadgeVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning';

export type BadgeSize = 'sm' | 'md';

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'class' | 'children'> & {
	children: Snippet;
	className?: string;
	variant?: BadgeVariant;
	size?: BadgeSize;
};