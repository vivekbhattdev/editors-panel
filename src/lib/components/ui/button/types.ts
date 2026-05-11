import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = Omit<HTMLButtonAttributes, 'class' | 'size'> & {
	children: Snippet;
	className?: string;
	variant?: ButtonVariant;
	size?: ButtonSize;
	iconOnlyLabel?: string;
};