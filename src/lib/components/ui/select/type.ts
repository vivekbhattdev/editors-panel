import type { HTMLSelectAttributes } from 'svelte/elements';

export type SelectVariant = 'default' | 'ghost';
export type SelectSize = 'sm' | 'md' | 'lg';

export type SelectOption = {
	value: string;
	label: string;
};

export type SelectProps = Omit<HTMLSelectAttributes, 'class' | 'size'> & {
	value?: string;
	options: readonly SelectOption[];
	className?: string;
	variant?: SelectVariant;
	size?: SelectSize;
	invalid?: boolean;
	label?: string;
	error?: string;
	required?: boolean;
};