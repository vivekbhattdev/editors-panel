import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes } from 'svelte/elements';

export type LinkVariant = 'default' | 'muted' | 'ghost';
export type LinkSize = 'sm' | 'md';

export type LinkProps = Omit<HTMLAnchorAttributes, 'class'> & {
	children: Snippet;
	className?: string;
	variant?: LinkVariant;
	size?: LinkSize;
};