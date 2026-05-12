import type { HTMLInputAttributes } from 'svelte/elements';

export type TextInputVariant = 'default' | 'ghost';
export type TextInputSize = 'sm' | 'md' | 'lg';
export type TextInputProps = Omit<HTMLInputAttributes, 'class' | 'size'> & {
  value?: string;
  className?: string;
  variant?: TextInputVariant;
  size?: TextInputSize;
  invalid?: boolean;
  label?: string;
  error?: string;
	required?: boolean;
};
