import type { HTMLTextareaAttributes } from 'svelte/elements';
export type TextAreaVariant = 'default' | 'ghost';
export type TextAreaSize = 'sm' | 'md' | 'lg';
export type TextAreaProps = Omit<HTMLTextareaAttributes, 'class' | 'size'> & {
	value?: string;
	className?: string;
	variant?: TextAreaVariant;
	size?: TextAreaSize;
	invalid?: boolean;
	label?: string;
	error?: string;
	required?: boolean;
};